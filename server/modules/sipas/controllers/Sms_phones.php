<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sms_phones extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array('sipas/Sms_phones'));
        $this->model = $this->model('sipas/Sms_phones', true);
    }

    public function index(){
        $this->check_status();
    }
    
    public function status(){
        $model = $this->model;
        $res = $model->get_status_modem()->row('UpdatedInDB');
        return $res;
    }

    public function check_status(){
        echo "disconnect";
        // $model = $this->model;
        // $status = $this->status();
        // $tolerant = 10;
        // if($status!=NULL) {
        //     $status = $model->get_modem_status($status, $tolerant);

        //     if($status=="connect") echo "connect";
        //     else echo "disconnect";
        // }
        // else echo "Unknown";
    }

}