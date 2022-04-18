<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usermail extends CI_Controller {
      
	public function __construct(){
        parent::__construct();
        $this->load->database();
        $this->load->model(array('suratmasuk_model','archive_model','disposisi_model','usermail_model'));
    }

    public function index(){
        $this->select();
    }

    public function select($section=null){
        $response = $this->usermail_model->select($section);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode($response));
    }

    public function read($id = null){
        $response = $this->usermail_model->read($id);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode($response));
    }

    public function openmail(){
        $response = $this->usermail_model->openmail(varPost('id'));
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode($response));
    }

}