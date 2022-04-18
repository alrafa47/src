<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Asset extends Base_Controller { 

	function __construct(){
		parent::__construct();
		
		$this->load->helper(array(
			'url','assets'
		));
		$this->load->model('sipas/asset');
	}

	function index(){}

	function css($path = null){
		$this->model('sipas/asset')->css($path);
	}

	function js($path = null){
		$this->model('sipas/asset')->js($path);
	}

	function img($path = null){
		$this->model('sipas/asset')->img($path);
	}

	function inst_logo($path = null){
		$this->model('sipas/asset')->inst_logo($path);
	}

	function testurl(){
		print_r($this->config);
	}

}
