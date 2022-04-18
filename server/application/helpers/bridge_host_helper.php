<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    Send request to host with curl

*/

if (!function_exists('connect')) { 
    function connect($client='', $section='', $method='get', $params=null) { 

        if(empty($client) OR empty($section)) return false;

        //find in table token by host_name $client
        $CI =& get_instance();
        $bridge = $CI->db->get_where('bridge', array('bridge_client_kode ' => strtoupper($client)), 1)->row();

        $endpoint = $bridge->bridge_client_url;

        $api = $endpoint.$section;

        $request = curl_init();
        $headers = array(
            'Accept: application/json',
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Basic ',
            'Token: '.$bridge->bridge_token,
            'Client: '.$client,
        );

        curl_setopt($request, CURLOPT_URL, $api);
        curl_setopt($request, CURLOPT_HEADER, 0);
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($request, CURLOPT_HTTPHEADER, $headers);

        if(strtolower($method) == 'post'){
            curl_setopt($request, CURLOPT_POSTFIELDS, http_build_query($params));
        }

        $op = curl_exec($request);
        curl_close($request);
        
        return $op;

    }
} 

if(!function_exists('getTokenData')){
    function getTokenData($clientCode, $clientToken){
        $CI =& get_instance();
        $token = $CI->db->get_where('bridge', array(
            'bridge_client_kode' => strtoupper($clientCode),
            'bridge_token' => strtolower($clientToken),
        ), 1)->row();
        return $token;
    }
}