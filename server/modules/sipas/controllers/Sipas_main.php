<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_Main extends Base_Controller {
    
    function __construct(){
        parent::__construct();
    }

    function index(){
    	$this->response(array(
			'success'=>false,
			'message'=>'Selamat datang di SIPAS (Sistem Informasi Pengelolaan Arsip Surat)'
		));
    }

	function unauth(){
		$this->response(array(
			'success'=>false, 
			'error'=>401,
			'message'=>'Maaf anda belum login, silahkan login terlebih dahulu untuk mengakses fitur ini.'
		));
	}

	function notfound(){
		$this->response(array(
			'success'=>false, 
			'error'=>404,
			'message'=>'Mohon maaf fitur tersebut tidak tersedia.'
		));
	}

}