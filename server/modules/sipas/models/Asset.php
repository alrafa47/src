<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Sipas_model_Asset extends Base_Model {
	public $assets_path = 'assets/'; 
	public $assets_css_path = 'assets/css/';
	public $assets_js_path = 'assets/js/'; 
	public $assets_img_path = 'assets/img/'; 
	public $assets_inst_logo_path = 'data/sistem/'; 

	function __construct(){
		parent::__construct();
		
		$this->load->helper(array(
			'url','assets'
		));
	}

	function index(){}

	function out($path, $contentType = 'text/html', $out = true){
		$content = null;
		$_path = $path;
		if(is_file($_path) and file_exists($_path)){
			$content = file_get_contents($_path);
		}

		if($out){
			ob_clean();
			$this->output->set_content_type($contentType);
			$this->output->set_output($content);
		}else{
			return $content;
		}
	}

	function css($path = null, $out = true){
		return $this->out($this->assets_css_path.$path, 'text/css', $out);
	}

	function js($path = null, $out = true){
		return $this->out($this->assets_css_path.$path, 'text/javasript', $out);
	}

	function img($path = null, $out = true){
		return $this->out($this->assets_img_path.$path, 'image/png', $out);
	}

	function inst_logo($path = null, $out = true){
		return $this->out($this->assets_inst_logo_path.$path, 'image/png', $out);
	}
}
