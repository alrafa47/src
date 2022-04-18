<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Mobile extends Base_Controller {

	public $modelDefault = 'sipas/account';
	private $path_manualbook = '../handout/manual_book_mobile.pdf';

	public function __construct() {
		parent::__construct();
	}

	public function index() {
		$this->info();
	}

	function info($type = null) {
		return 1;
		// $model = $this->model('sipas/account', true);
		// $this->response($model->info($type));
	}

	function download_manualbook() {
		$CI = get_instance();
		$CI->load->helper('download');
		$file = $this->path_manualbook;
		
		if (file_exists($file)) {
			$data = file_get_contents($file);
			force_download('manual_book_mobile.pdf', $data);
		} else {
			$this->response(array());
		}
	}
}