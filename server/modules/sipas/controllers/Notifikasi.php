<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notifikasi extends Base_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->m_properti       = $this->model('sipas/properti', true);
        $this->m_akun           = $this->model('sipas/akun', true);
        $this->m_pengaturan     = $this->model('sipas/pengaturan', true);
        $this->m_notifikasi     = $this->model('sipas/notifikasi', true);

        $this->load->library('my_email');
        $this->email = $this->my_email;

        $this->load->library('queue');
        $this->queue->connect(
            Config()->item('queueServer')['host'],
            Config()->item('queueServer')['port']
        );
        $this->notifMailTube = Config()->item('queueServer_tubeName_notifEmail');
    }
    
    public function index()
    {
        show_404();
    }

    function notifikasi_test($section = null)
    {
        $notifikasi = $this->m_notifikasi;
        $akun_model = $this->m_akun;
        $now = date('Y-m-d H:i:s');

        $data = $_POST;
        $mail = array(
            'from' => $data['email_from'],
            'to'   => $data['email_to'],
            'subject' => $data['email_subject'],
            'message' => $data['email_message'],
            'name' => $data['email_name'],
            'date_created' => $now
        );
        
        switch ($section) {
            case 'email':
                $config = Array(
                    'protocol'      => $data['email_protocol'],
                    'smtp_host'     => $data['email_host'],
                    'smtp_port'     => $data['email_port'],
                    'smtp_user'     => $data['email_from'],
                    'smtp_pass'     => $data['email_password'],
                    'smtp_timeout'  => "10",
                    'charset'       => "utf-8",
                    'newline'       => "\r\n",
                    'mailtype'      => "html",
                    'validate'      => true
                );
                break;
            
            case 'sms':
                # code...
                break;
            default:
                # code...
                break;
        }

        $queueconf = array(
            'config' => $config,
            'mail' => $mail
        );

        if(!isInBlackListNotif('email', $data['email_to'])){
            $this->queue->tube($this->notifMailTube)->addJob($queueconf);
            $this->response(array(
                'success' => true,
                'data' => $mail
            ));
        }else{
            $this->response(array(
                'success' => false,
                'data' => $mail,
                'message' => 'Email tersebut terdaftar pada blacklist'
            ));
        }
    }

    function getEmailConfig(){
        $setting = $this->m_pengaturan;

        $config = array('init'=>array(),'email'=>array());
        
        $config['init']['protocol']     = $setting->getSettingByCode('email_protocol');
        $config['init']['smtp_host']    = $setting->getSettingByCode('email_host');
        $config['init']['smtp_port']    = $setting->getSettingByCode('email_port');
        $config['init']['smtp_user']    = $setting->getSettingByCode('email_address');
        $config['init']['smtp_pass']    = $setting->getSettingByCode('email_password');
        $config['init']['smtp_timeout'] = "10";
        $config['init']['charset']      = "utf-8";
        $config['init']['newline']      = "\r\n";
        $config['init']['mailtype']     = "html";
        $config['init']['validate']     = true;
        $config['init']['wordwrap']     = true;
                
        $config['email']['name']        = $setting->getSettingByCode('email_name');
        $config['email']['from']        = $setting->getSettingByCode('email_address');
        $config['email']['subject']     = null;
        $config['email']['message']     = null;

        return $config;
    }

    public function create($usePayload = true){
        $model = $this->m_notifikasi;
        $properti = $this->m_properti;
        $account = $this->m_akun;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){

            $inserted_data = $model->read($model->get_insertid());
            $op = $properti->created($akun, $inserted_data, 'notifikasi', $inserted_data['notifikasi_id']);
            if($op){
                $model->update($inserted_data['notifikasi_id'], array(
                    'notifikasi_properti' => $op['properti_id']
                ));
            }
        });
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_notifikasi;
        $properti = $this->m_properti;
        $account = $this->m_akun;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
 
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            $updated_data = $model->read($data['notifikasi_id']);
            $idProp = $updated_data['notifikasi_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'notifikasi', $updated_data['notifikasi_id']);
                if($op){
                    $model->update($updated_data['notifikasi_id'], array(
                        'notifikasi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data);
        });
        $this->response($operation);
    }

    public function notifikasi_queue($section = null){
        $model = $this->m_notifikasi;
        $properti = $this->m_properti;
        $pengaturan = $this->m_pengaturan;
        $account = $this->m_akun;

        $getSetting = $pengaturan->getSettings();
        $limit = $getSetting['email_limit'];

        switch ($section) {
            case 'email':
                $config = $model->getEmailConfig();
                $op = $this->email->send_queue($config, $limit);
                break;

            case 'sms':
                # code...
                break;

            default:
                # code...
                break;
        }
        
        return $op;
    }

    public function notifikasi_retry($section = null){
        $model = $this->m_notifikasi;
        $properti = $this->m_properti;
        $pengaturan = $this->m_pengaturan;
        $account = $this->m_akun;

        $akun = $account->get_profile_id();

        switch ($section) {
            case 'email':
                $config = $model->getEmailConfig();
                $this->email->retry_queue($config);
                break;
            
            case 'sms':
                # code...
                break;

            default:
                # code...
                break;
        }
    }
}