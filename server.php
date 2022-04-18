<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

if(!isset($_SERVER['argc']))
{
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
		// return only the headers and not the content
		// only allow CORS if we're doing a GET - i.e. no saving for now.
		$methods = array('POST','GET','PUT','DELETE','OPTIONS');
		$requestMethod = $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'];
		if (isset($requestMethod) && in_array($requestMethod, $methods)) {

		}
		exit;
	}

	if ( 
		( !empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https' ) 
		|| ( !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') 
		|| ( !empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') 
	) {
		$_SERVER['REQUEST_SCHEME'] = 'https';
	} else {
		$_SERVER['REQUEST_SCHEME'] = 'http';
	}
}

// sleep(10);
require('server/index.php');
?>