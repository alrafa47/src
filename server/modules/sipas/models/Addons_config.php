<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Addons_config extends Base_model
{

    // email config
    public $notif_email_name    = 'email_name';
    public $notif_email_from    = 'email_address';
    public $is_with_email       = 'notif_email';

    // for email config in setting
    public $is_with_email_suratpengajuan    = 'notif_email_suratpengajuan';
    public $notif_email_suratpengajuan_subject  = 'notif_email_suratpengajuan_subject';
    public $notif_email_suratpengajuan_message  = 'notif_email_suratpengajuan_template';
    
    public $is_with_email_suratmasuk        = 'notif_email_suratmasuk';
    public $notif_email_suratmasuk_subject  = 'notif_email_suratmasuk_subject';
    public $notif_email_suratmasuk_message  = 'notif_email_suratmasuk_template';
    
    public $is_with_email_disposisi         = 'notif_email_disposisi';
    public $notif_email_disposisi_subject   = 'notif_email_disposisi_subject';
    public $notif_email_disposisi_message   = 'notif_email_disposisi_template';
    
    public $is_with_email_suratdraft         = 'notif_email_suratdraft';
    public $notif_email_suratdraft_subject   = 'notif_email_suratdraft_subject';
    public $notif_email_suratdraft_message   = 'notif_email_suratdraft_template';
    
    public $is_with_email_suratedaran       = 'notif_email_suratedaran';
    public $notif_email_suratedaran_subject = 'notif_email_suratedaran_subject';
    public $notif_email_suratedaran_message = 'notif_email_suratedaran_template';
    
    public $is_with_email_memo              = 'notif_email_memo';
    public $notif_email_memo_subject        = 'notif_email_memo_subject';
    public $notif_email_memo_message        = 'notif_email_memo_template';
    
    public $is_with_email_suratkonsep       = 'notif_email_suratkonsep';
    public $notif_email_suratkonsep_subject = 'notif_email_suratkonsep_subject';
    public $notif_email_suratkonsep_message = 'notif_email_suratkonsep_template';
    
    // for sms config
    public $is_with_sms = 'notif_sms';
    
    public $is_with_sms_suratpengajuan          = 'notif_sms_suratpengajuan';
    public $notif_sms_suratpengajuan_template   = 'notif_sms_suratpengajuan_template';
    
    public $is_with_sms_suratmasuk          = 'notif_sms_suratmasuk';
    public $notif_sms_suratmasuk_template   = 'notif_sms_suratmasuk_template';
    
    public $is_with_sms_disposisi           = 'notif_sms_disposisi';
    public $notif_sms_disposisi_template    = 'notif_sms_disposisi_template';
    
    public $is_with_sms_suratedaran         = 'notif_sms_suratedaran';
    public $notif_sms_suratedaran_template  = 'notif_sms_suratedaran_template';
    
    public $is_with_sms_memo                = 'notif_sms_memo';
    public $notif_sms_memo_template         = 'notif_sms_memo_template';
    
    public $is_with_sms_suratkonsep = 'notif_sms_suratkonsep';
    public $notif_sms_suratkonsep_template = 'notif_sms_suratkonsep_template';

    function __construct(){
        parent::__construct();

        $this->load->model(array(
            'sipas/akun',
            'sipas/account',
            'sipas/pengaturan',
            'sipas/staf',
            'sipas/staf_view',
            'sipas/email_queue',
            'sipas/sms_outbox'
        ));

        $this->load->library('parser');
    }

    function email($section = null, $penerima_id = null , $data = array() ){
        $me = $this;

        $CI = get_instance();
        $account = $CI->model('sipas/account',true);
        $setting = $CI->model('sipas/pengaturan',true);
        $pegawai = $CI->model('sipas/staf',true);
        $email_queue = $CI->model('sipas/email_queue',true);
        
        $staf_id = $me->m_account->get_profile_id();
        $now = date('Y-m-d H:i:s');

        /*setting email*/
        $is_with_email = $setting->getSettingByCode($me->is_with_email);
        $notif_email_name = $setting->getSettingByCode($me->notif_email_name);
        $notif_email_from = $setting->getSettingByCode($me->notif_email_from);
        
        /*email disposisi*/
        $is_with_email_disposisi = $setting->getSettingByCode($me->is_with_email_disposisi);
        $notif_email_disposisi_subject = $setting->getSettingByCode($me->notif_email_disposisi_subject);
        $notif_email_disposisi_message = $setting->getSettingByCode($me->notif_email_disposisi_message);
        
        /*email edaran*/
        $is_with_email_suratedaran = $setting->getSettingByCode($me->is_with_email_suratedaran);
        $notif_email_suratedaran_subject = $setting->getSettingByCode($me->notif_email_suratedaran_subject);
        $notif_email_suratedaran_message = $setting->getSettingByCode($me->notif_email_suratedaran_message);
        
        /*email pengajuan*/
        $is_with_email_suratpengajuan = $setting->getSettingByCode($me->is_with_email_suratpengajuan);
        $notif_email_suratpengajuan_subject = $setting->getSettingByCode($me->notif_email_suratpengajuan_subject);
        $notif_email_suratpengajuan_message = $setting->getSettingByCode($me->notif_email_suratpengajuan_message);
        
        /*email masuk*/
        $is_with_email_suratmasuk = $setting->getSettingByCode($me->is_with_email_suratmasuk);
        $notif_email_suratmasuk_subject = $setting->getSettingByCode($me->notif_email_suratmasuk_subject);
        $notif_email_suratmasuk_message = $setting->getSettingByCode($me->notif_email_suratmasuk_message);
        
        /*email memo*/
        $is_with_email_memo = $setting->getSettingByCode($me->is_with_email_memo);
        $notif_email_memo_subject = $setting->getSettingByCode($me->notif_email_memo_subject);
        $notif_email_memo_message = $setting->getSettingByCode($me->notif_email_memo_message);

        /*email konsep*/
        $is_with_email_suratkonsep = $setting->getSettingByCode($me->is_with_email_suratkonsep);
        $notif_email_suratkonsep_subject = $setting->getSettingByCode($me->notif_email_suratkonsep_subject);
        $notif_email_suratkonsep_message = $setting->getSettingByCode($me->notif_email_suratkonsep_message);

        /*email draft*/
        $is_with_email_suratdraft = $setting->getSettingByCode($me->is_with_email_suratdraft);
        $notif_email_suratdraft_subject = $setting->getSettingByCode($me->notif_email_suratdraft_subject);
        $notif_email_suratdraft_message = $setting->getSettingByCode($me->notif_email_suratdraft_message);

        /*patch notif*/
        $penerima_record = $pegawai->read($penerima_id);
        $pengirim_record = $pegawai->read($staf_id);

        $gender = $penerima_record['staf_kelamin'];
        if($gender == 1) $data['jenis_kelamin'] = 'Bapak';
        else $data['jenis_kelamin'] = 'Ibu';

        $data['penerima_nama'] = $penerima_record['staf_nama'];
        $data['pengirim_nama'] = $pengirim_record['staf_nama'];
        $data['tanggal'] = date('d-m-Y H:i');

        switch ($section) {            
            case 'masuk':
                if($is_with_email and $is_with_email_suratmasuk){
                    if($penerima_record['staf_email'])
                    {
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_suratmasuk_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_suratmasuk_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;

            case 'disposisi':
                if($is_with_email and $is_with_email_disposisi){
                    if($penerima_record['staf_email'])
                    {
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_disposisi_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_disposisi_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;

            case 'edaran':
                if($is_with_email and $is_with_email_suratedaran){
                    if($penerima_record['staf_email'])
                    {
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_suratedaran_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_suratedaran_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;

            case 'memo':
                if($is_with_email and $is_with_email_memo){
                    if($penerima_record['staf_email'])
                    {
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_memo_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_memo_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;

            case 'pengajuan':
                if($is_with_email and $is_with_email_suratpengajuan){
                    if($penerima_record['staf_email'])
                    {
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_suratpengajuan_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_suratpengajuan_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;

            case 'suratkonsep':
                if($is_with_email and $is_with_email_suratkonsep){
                    if($penerima_record['staf_email'])
                    {
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_suratkonsep_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_suratkonsep_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;

            case 'draft':
                if($is_with_email and $is_with_email_suratdraft){
                    if($penerima_record['staf_email'])
                    {
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_suratdraft_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_suratdraft_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;

            default:
                if($is_with_email){
                    if($penerima_record['staf_email'])
                    {   
                        $notif_email_default_message = "Yth. {jenis_kelamin} {penerima_nama} <br> Anda menerima Notifikasi dari {pengirim_nama} di Aplikasi SIKASK <br> Silahkan dibuka di Aplikasi SIKASK";
                        $dataparser = $data;
                        $email_message = $me->parser->parse_string($notif_email_default_message,$dataparser);
                        $email_message = html_entity_decode($email_message);
                        
                        $data['to'] = $penerima_record['staf_email'];
                        $data['subject'] = $notif_email_disposisi_subject;
                        $data['message'] = $email_message;
                        $data['status'] = 'pending';
                        $data['date'] = $now;
                        $email_queue->insert($data, null, function($response){});
                    }
                }
                break;
        }

    }

    function sms($section=null, $penerima_id = null, $data = array()){
        $me = $this;
        
        $CI = get_instance();
        $account = $CI->model('sipas/account',true);
        $setting = $CI->model('sipas/pengaturan',true);
        $pegawai = $CI->model('sipas/staf',true);
        $sms_outbox = $CI->model('sipas/sms_outbox',true);
        
        $staf_id = $me->m_account->get_profile_id();
        $now = date('Y-m-d H:i:s');

        //patch notif
        $penerima_record = $pegawai->read($penerima_id);
        $pengirim_record = $pegawai->read($staf_id);

        $gender = $penerima_record['staf_kelamin'];
        if($gender == 1) $data['jenis_kelamin'] = 'Bapak';
        else $data['jenis_kelamin'] = 'Ibu';

        $data['penerima_nama'] = $penerima_record['staf_nama'];
        $data['pengirim_nama'] = $pengirim_record['staf_nama'];
        $data['tanggal'] = date('d-m-Y H:i');

        //setting sms
        $is_with_sms = $setting->getSettingByCode($me->is_with_sms);
        
        $is_with_sms_disposisi = $setting->getSettingByCode($me->is_with_sms_disposisi);
        $notif_sms_disposisi_template = $setting->getSettingByCode($me->notif_sms_disposisi_template);
        
        $is_with_sms_suratmasuk = $setting->getSettingByCode($me->is_with_sms_suratmasuk);
        $notif_sms_suratmasuk_template = $setting->getSettingByCode($me->notif_sms_suratmasuk_template);
        
        $is_with_sms_suratedaran = $setting->getSettingByCode($me->is_with_sms_suratedaran);
        $notif_sms_suratedaran_template = $setting->getSettingByCode($me->notif_sms_suratedaran_template);
        
        $is_with_sms_suratpengajuan = $setting->getSettingByCode($me->is_with_sms_suratpengajuan);
        $notif_sms_suratpengajuan_template = $setting->getSettingByCode($me->notif_sms_suratpengajuan_template);
        
        $is_with_sms_memo = $setting->getSettingByCode($me->is_with_sms_memo);
        $notif_sms_memo_template = $setting->getSettingByCode($me->notif_sms_memo_template);

        $is_with_sms_suratkonsep = $setting->getSettingByCode($me->is_with_sms_suratkonsep);
        $notif_sms_suratkonsep_template = $setting->getSettingByCode($me->notif_sms_suratkonsep_template);

        switch ($section) {
            case 'disposisi':
                if($is_with_sms and $is_with_sms_disposisi){
                    if($penerima_record['staf_ponsel'])
                    {   
                        $dataparser = $data;
                        $sms_message = $me->parser->parse_string($notif_sms_disposisi_template,$dataparser);

                        $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                        $data['TextDecoded'] = $sms_message;
                        $data['CreatorID'] = 'Gammu';
                        $sms_outbox->insert($data, null, function($response){});
                    }
                }
                break;
            case 'masuk':
                if($is_with_sms and $is_with_sms_suratmasuk){
                    if($penerima_record['staf_ponsel'])
                    {   
                        $dataparser = $data;
                        $sms_message = $me->parser->parse_string($notif_sms_suratmasuk_template,$dataparser);

                        $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                        $data['TextDecoded'] = $sms_message;
                        $data['CreatorID'] = 'Gammu';
                        $sms_outbox->insert($data, null, function($response){});
                    }
                }
                break;
            case 'edaran':
                if($is_with_sms and $is_with_sms_suratedaran){
                    if($penerima_record['staf_ponsel'])
                    {   
                        $dataparser = $data;
                        $sms_message = $me->parser->parse_string($notif_sms_suratedaran_template,$dataparser);

                        $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                        $data['TextDecoded'] = $sms_message;
                        $data['CreatorID'] = 'Gammu';
                        $sms_outbox->insert($data, null, function($response){});
                    }
                }
                break;
            case 'memo':
                if($is_with_sms and $is_with_sms_memo){
                    if($penerima_record['staf_ponsel'])
                    {   
                        $dataparser = $data;
                        $sms_message = $me->parser->parse_string($notif_sms_memo_template,$dataparser);

                        $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                        $data['TextDecoded'] = $sms_message;
                        $data['CreatorID'] = 'Gammu';
                        $sms_outbox->insert($data, null, function($response){});
                    }
                }
                break;
            case 'pengajuan':
                if($is_with_sms and $is_with_sms_suratpengajuan){
                    if($penerima_record['staf_ponsel'])
                    {   
                        $dataparser = $data;
                        $sms_message = $me->parser->parse_string($notif_sms_suratpengajuan_template,$dataparser);

                        $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                        $data['TextDecoded'] = $sms_message;
                        $data['CreatorID'] = 'Gammu';
                        $sms_outbox->insert($data, null, function($response){});
                    }
                }
                break;

            case 'suratkonsep':
                if($is_with_sms and $is_with_sms_suratkonsep){
                    if($penerima_record['staf_ponsel'])
                    {   
                        $dataparser = $data;
                        $sms_message = $me->parser->parse_string($notif_sms_suratkonsep_template,$dataparser);

                        $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                        $data['TextDecoded'] = $sms_message;
                        $data['CreatorID'] = 'Gammu';
                        $sms_outbox->insert($data, null, function($response){});
                    }
                }
                break;

            default:
                if($is_with_sms){
                    if($penerima_record['staf_ponsel'])
                    {   
                        $notif_sms_default_template = "Yth. {jenis_kelamin} {penerima_nama}, Anda menerima Notifikasi dari {pengirim_nama}. Silahkan dibuka di Aplikasi SIKASK";
                        $dataparser = $data;
                        $sms_message = $me->parser->parse_string($notif_sms_default_template,$dataparser);

                        $data['DestinationNumber'] = $penerima_record['staf_ponsel'];
                        $data['TextDecoded'] = $sms_message;
                        $data['CreatorID'] = 'Gammu';
                        $sms_outbox->insert($data, null, function($response){});
                    }
                }
                break;
        }
    }
}