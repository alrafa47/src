<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Support extends Base_Controller {

	protected $manual_output = 'Buku Panduan - [E-office ASKRINDO].pdf';
	protected $manual_input = "../resources/support/manual_book.pdf";

	function __construct(){
		parent::__construct();
	}

	function doc(){
		$this->load->helper(array('download'));
		$data = file_get_contents("../resources/support/manual_book.pdf"); // Read the file's contents
        $name = $this->manual_output;
        force_download($name, $data);
	}
}