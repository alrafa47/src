<?php

/**
 * Token.
 * Digunakan untuk menstandartkan bentuk token, baik untuk me-nyandikan Data ke sebuah bentuk Token,
 * maupun untuk menguraikan sebuah Token ke bentuk Data
 *
 * 	Contoh:
 *  	# menyandikan data ke bentuk token
 *  	$token = Token::with(array(
 *  		'a'=>'a'
 *  	), $cipher);
 *  	
 *  	// memanfaatkan nilai dari sebuah token
 *  	$token->string; // data yang tersandi 
 *
 * 		
 * 		# untuk menguraikan token ke bentuk data
 * 		$token = Token::with('bWQ1|eyJhIjoiYSJ9|11c7e136a9218a8580f1db44297c0be5', $cipher);
 *   	
 *   	// memanfaatkan nilai dari sebuah token
 *  	$token->data; // data dari Sandi Token
 *
 *
 * 		# tambahan
 * 		// baik token dari data maupun dari sandi, jika token tersebut valid dan data yang identik,
 * 		// maka akan bernilai sama
 * 		// memastikan kedua Token tersebut sama, bisa dengan komparasi
 * 		$tokenA = Token::with(array(
 *  		'a'=>'a'
 *  	), $cipher);
 *  	$tokenB = Token::with($tokenA->string, $cipher);
 * 		var_dump($tokenA->string==$tokenB->string and $tokenA->data==$tokenB->data);
 */

class TokenAuth
{
	public $cipher = null;
	public $tokenString = null;
	public $header = array(
		"alg" => "HS256",
    	"typ" => "JWT"
    );
	public $payload = null;
	public $signature = null;

	static function with($dataOrToken = null, $cipher = null)
	{
		$token = new self($dataOrToken, $cipher);
		return $token;
	}

	function __construct($dataOrToken = null, $cipher = null)
	{
		$this->cipher = $cipher;
		
		if(is_string($dataOrToken))
		{
			$this->tokenString = $dataOrToken;
			$this->parseToken();
		}else
		{
			$this->payload = $dataOrToken;
			$this->buildToken();
		}
		return $this;
	}

	function verify()
	{
		if(empty($this->tokenString)) return false;
		
		$tokenstring = explode('.', $this->tokenString);
		
		if(count($tokenstring) < 3) return false;
		
		list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $this->tokenString);

	    $dataEncoded = "$headerEncoded.$payloadEncoded";

	    $signature = $this->base64UrlDecode($signatureEncoded);

	    $rawSignature = hash_hmac('SHA256', $dataEncoded, $this->cipher, true);

	    return hash_equals($rawSignature, $signature);
	}
	
	function isValid()
	{
		return $this->verify();
	}

	function getPayload()
	{
		return $this->payload;
	}

	function getTokenString()
	{
		return $this->tokenString;
	}

	protected function base64UrlEncode(string $data): string
	{
		if(empty($data)) return "";

		$urlSafeData = strtr(base64_encode($data), '+/', '-_');
		$encodedData = rtrim($urlSafeData, '=');

	    return $encodedData; 
	} 

	protected function base64UrlDecode(string $data): string
	{
	    $urlUnsafeData = strtr($data, '-_', '+/');

	    $paddedData = str_pad($urlUnsafeData, strlen($data) % 4, '=', STR_PAD_RIGHT);

	    return base64_decode($paddedData);
	}

	protected function parseToken()
	{
		$raw = explode('.', $this->tokenString);

		$raw = array_merge($raw, array()); // apply default value
		if(!isset($raw[0])) $raw[0] = ""; // header
		if(!isset($raw[1])) $raw[1] = ""; // payload
		if(!isset($raw[2])) $raw[2] = ""; // signature

		$this->header = json_decode($this->base64UrlDecode($raw[0]));
		$this->payload = json_decode($this->base64UrlDecode($raw[1]));
		$this->signature = $raw[2];

		return $this;
	}

	protected function buildToken()
	{
		$header = $this->base64UrlEncode(json_encode($this->header));
		$data = $this->base64UrlEncode(json_encode($this->payload));

		$rawSignature = hash_hmac('SHA256', "$header.$data", $this->cipher, true);
		$signature = $this->base64UrlEncode($rawSignature);

		$this->signature = $signature;
		$this->tokenString = "$header.$data.$signature";

		return $this;
	}
}