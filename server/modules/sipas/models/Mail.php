<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Mail extends Base_model {
        
    public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/akun'
        ));
    }
    
    public function sendmail($config){ 
        $this->load->library('email');
        $CI = get_instance();
        $akun_model = $CI->model('sipas/akun',true);
        $akun_pengirim = $akun_model->find(array('akun_surel'=>$config['email']['from']));
        $akun_penerima = $akun_model->find(array('akun_surel'=>$config['email']['to']));

        $this->email->initialize($config['init']);
        $this->email->clear(true);
        $this->email->from($akun_pengirim[0]['akun_id']);
        $this->email->to($akun_penerima[0]['akun_id']);
        $this->email->subject($config['email']['subject']);
        $this->email->message($config['email']['message']);
        $this->email->send(true);

        if($this->email->send()) return true;
        else return false;
    }
}