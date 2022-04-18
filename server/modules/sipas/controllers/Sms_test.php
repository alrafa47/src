<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sms_test extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array('sipas/Sms_outbox'));
        $this->model = $this->model('sipas/Sms_outbox', true);
    }

    public function index(){
        // $this->check_status();
    }

    public function send_sms(){
        $model = $this->model;
        $nomor = varGet('nomor');
        $pesan = varGet('pesan');
        $data = array();
        
        $data['DestinationNumber'] = $nomor;
        if($pesan == null) $data['TextDecoded'] = "Anda menerima uji coba notifikasi SMS dari Aplikasi SIPAS";
        else $data['TextDecoded'] = $pesan;
        $data['CreatorID'] = "Gammu";
        $operation = $model->insert($data, null, function($response){});
        $this->response($operation);
    }

}