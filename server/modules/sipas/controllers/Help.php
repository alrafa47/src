<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Help extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        $this->load->helper(array('download'));
    }
            
    public function index(){
        return $this->help();
    }

    public function help(){
    	$data = file_get_contents("../asset/support/handout.zip"); // Read the file's contents
        $name = 'handout.zip';
        force_download($name, $data); 
    }

}