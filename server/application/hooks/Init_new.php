<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    
class Init_new
{

	function __construct()
	{
		$ci =& get_instance();
        
        $ci->load->helper(array('mobile/http'));
		$ci->load->library(array('mobile/tokenAuth'));
        $ci->config->load('application_config');
	}

	protected function findRuleAccess($uriKeyOrString = null)
	{
		$ci =& get_instance();

		$accesLib = $ci->config->item('access_route');
		if(!is_array($accesLib)) return;

		foreach ($accesLib as $key => $access)
		{
			if(is_string($access)) $access = array($access);
			if(
				(isset($access[0]) and is_string($access[0]) and $uriKeyOrString == $access[0])
				or
				(isset($access[2]) and is_string($access[2]) and $uriKeyOrString == $access[2])
				or
				(isset($access[2]) and is_array($access[2]) and in_array($uriKeyOrString, $access[2]))
			)
			{
				return $access;
			}
		}
	}

	protected function getRuleAccessPermission($uriKeyOrString = null)
	{
		$ci =& get_instance();

		$accesLib = $ci->config->item('access_route');
		if(!is_array($accesLib)) return -1;

		$access = $this->findRuleAccess($uriKeyOrString);

		if($access)
		{
			return (is_array($access) and array_key_exists(1, $access)) ? $access[1] : 0;
		}

		return -1;
	}

	protected function shouldHaveToken()
	{
		$ci =& get_instance();

		$token = getHttpRequestHeader($ci->config->item('token_key'));
		if(!$token)
        {
        	setHttpResponseStatusHeader(401); // unauthorized
        	header('Content-Type: application/json');
        	echo json_encode(array(
        		'success'=>false,
        		'message'=>'Silahkan login terlebih dahulu !'
        	));
        	die();
        }
        return $token;
	}

	protected function getCurrentRuleAccess()
	{
		$ci =& get_instance();
        $uri = $ci->uri->uri_string();
		return $this->findRuleAccess($uri);
	}

	protected function getCurrentRuleAccessPermission()
	{
		$ci =& get_instance();
        $uri = $ci->uri->uri_string();
		return $this->getRuleAccessPermission($uri);
	}

    function start()
    {
        if(strtolower($_SERVER['REQUEST_METHOD']) == 'options') die();
    	
    	$ruleAccessPermission = $this->getCurrentRuleAccessPermission();

    	// 0 is public access
    	if($ruleAccessPermission == 0)
    	{
    		// do nothing because link is public
    	}

    	// 1 is authenticated users, no matter who is
    	else if($ruleAccessPermission == 1)
    	{
    		$this->shouldHaveToken();
    	}

    	// 2 is authorized users, set by role access
    	else if($ruleAccessPermission == 2)
        {
        	// first, should loggedin / has token
        	$token = $this->shouldHaveToken();

        	// second, token should has the role
        	$ci =& get_instance();
        	$tkn = $ci->tokenauth->with($token);
        	$ruleAccess = $this->getCurrentRuleAccess();
        	$rules = (array)$tkn->data;
        	$rules = array_key_exists('rules', $rules) ? (array)$rules['rules'] : array();

        	if(!(array_key_exists($ruleAccess[0], $rules) and ($rules[$ruleAccess[0]])))
        	{
        		setHttpResponseStatusHeader(403); // forbidden
	        	header('Content-Type: application/json');
	        	echo json_encode(array(
	        		'success'=>false,
	        		'message'=>'Maaf, anda tidak diijinkan mengakses alamat ini'
	        	));
	        	die();
        	}
        }

        // 3 is current user, and only the user who create or prohibitted on itself data
    	else if($ruleAccessPermission == 3)
        {
        	// logic are not defined yet, 
        	// only check the token
        	// the rest is on each conroller
        	$token = $this->shouldHaveToken();
        }

        // any rule outside the registered rulePermission are set to notfound status
        else
        {
    		setHttpResponseStatusHeader(404); // unauthorized
        	header('Content-Type: application/json');
        	echo json_encode(array(
        		'success'=>false,
        		'message'=>'Maaf alamat ini tidak tersedia'
        	));
        	die();
        }
    }

}

/* End of file init.php */
/* Location: ./application/hooks/init.php */