<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Addon extends Base_Controller {

    protected $is_with_email = 'notif_email';
    protected $is_with_email_disposisi = 'notif_email_disposisi';
    protected $notif_email_disposisi_subject = 'notif_email_disposisi_subject';
    protected $notif_email_disposisi_message = 'notif_email_disposisi_template';
    protected $notif_email_name = 'email_name';
    protected $notif_email_from = 'email_address';
    protected $is_with_sms = 'notif_sms';
    protected $notif_sms_template = 'notif_sms_template';

    protected $message = array();

    protected function __construct(){
        parent::__construct();
        // $this->m_fitur              = $this->model('sipas/fitur',                   true);
        // $this->m_akses              = $this->model('sipas/akses',                   true);
        // $this->m_akses_view         = $this->model('sipas/akses_view',              true);
        $this->m_user               = $this->model('sipas/akun',                    true);
        $this->m_account            = $this->model('sipas/account',                 true);
        $this->m_staf_view       = $this->model('sipas/staf_view',            true);
        
        $this->m_report             = $this->model('sipas/report',                  true);
        $this->m_asset              = $this->model('sipas/asset',                   true);
                
        $this->m_surat              = $this->model('sipas/surat',                   true);
        $this->m_surat_view         = $this->model('sipas/surat_view',              true);
        $this->m_staf_view       = $this->model('sipas/staf_view',            true);
        $this->m_disposisi          = $this->model('sipas/disposisi',               true);
        $this->m_disposisi_view     = $this->model('sipas/disposisi_view',          true);
        $this->m_disposisi_penerima = $this->model('sipas/disposisi_masuk',         true);
        $this->m_surat_staf_view = $this->model('sipas/disposisi_masuk_view',    true);
        $this->m_sms_outbox         = $this->model('sipas/sms_outbox',              true);
        $this->m_email_queue        = $this->model('sipas/email_queue',             true);
    }

    protected function index(){
        $this->read();
    }
    
    protected function notifikasi(){
        $me = $this;
        $model = $this->model('sipas/disposisi',true);
        $recent = $this->model('sipas/disposisi_penerima_recent',true);
        $setting = $this->model('sipas/pengaturan',true);
        $mail = $this->model('sipas/mail',true);
        $email_queue = $this->model('sipas/email_queue',true);
        $sms_outbox = $this->model('sipas/sms_outbox',true);
        $staf_model = $this->model('sipas/staf', true);
        
        //setting email
        $is_with_email = $setting->getSettingByCode($me->is_with_email);
        $is_with_email_disposisi = $setting->getSettingByCode($me->is_with_email_disposisi);
        $notif_email_disposisi_subject = $setting->getSettingByCode($me->notif_email_disposisi_subject);
        $notif_email_disposisi_message = $setting->getSettingByCode($me->notif_email_disposisi_message);
        $notif_email_name = $setting->getSettingByCode($me->notif_email_name);
        $notif_email_from = $setting->getSettingByCode($me->notif_email_from);

        //setting sms
        $is_with_sms = $setting->getSettingByCode($me->is_with_sms);
        $notif_sms_template = $setting->getSettingByCode($me->notif_sms_template);

        // loop for notif outside send
        // for save mode outside the mail notif error
        if($is_with_sms || $is_with_email and $is_with_email_disposisi){
            foreach ($penerima as $index => $p) {
                
                if (is_string($p)) {
                    $penerima_id = $p;
                } else if (is_object($p)) {
                    $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                } else if (is_array($p)) {
                    $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                }

                $penerima_record = $staf_model->read($penerima_id);
                if (!$penerima_record) {
                    continue;
                }

                $gender = $penerima_record['staf_kelamin'];
                if($gender == 1) $data['jenis_kelamin'] = 'Bapak';
                else $data['jenis_kelamin'] = 'Ibu';

                $data['penerima_nama'] = $penerima_record['staf_nama'];
                $data['tanggal'] = date('d M Y H:i');
                
                //notif for email
                if($penerima_record['staf_email']){
                    $dataparser = $data;
                    $email_message = $me->parser->parse_string($notif_email_disposisi_message,$dataparser);

                    $data['to'] = $penerima_record['staf_email'];
                    $data['subject'] = $notif_email_disposisi_subject;
                    $data['message'] = $email_message;
                    $data['status'] = 'pending';
                    $data['date'] = $now;
                    $email_queue->insert($data, null, function($response){});
                }

                //notif for sms
                if($penerima_record['staf_ponsel'])
                {   
                    $data['jenis_notifikasi'] = 'Disposisi';
                    $dataparser = $data;
                    $sms_message = $me->parser->parse_string($notif_sms_template,$dataparser);

                    $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                    $data['TextDecoded'] = $sms_message;
                    $data['CreatorID'] = 'Gammu';
                    $sms_outbox->insert($data, null, function($response){});
                }
            }
        }
    }
}