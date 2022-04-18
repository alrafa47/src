<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notifikasi extends Base_model {

    const STATUS_PENDING    = 0;
    const STATUS_SENDING    = 1;
    const STATUS_SENT       = 2;
    const STATUS_FAILED     = 3;

    const MODEL_APP     = 0;
    const MODEL_EMAIL   = 1;
    const MODEL_SMS     = 2;

    public $legenda_notifikasi = array(
        '{nomor_registrasi}'    =>'Nomor Registrasi',
        '{nomor_surat}'         =>'Nomor Surat',
        '{nomor_agenda}'        =>'surat_agenda',
        '{nomor_agenda_sub}'    =>'surat_agenda_sub',          
        '{tanggal_surat}'       =>'surat_tanggal',             
        '{perihal_surat}'       =>'surat_perihal',             
        '{pengirim_surat}'      =>'surat_pengirim',            
        '{tujuan_surat}'        =>'surat_tujuan',              
        '{lampiran_surat}'      =>'surat_lampiran',            
        '{lampiran_sub_surat}'  =>'surat_lampiran_sub',        
        '{ringkasan_surat}'     =>'surat_ringkasan',           
        '{catatan_surat}'       =>'surat_catatan',             
        '{tanggal_disetujui}'   =>'surat_setuju_tgl',
        '{total_penyetuju}'     =>'surat_setuju_total',
     
        '{nip_distributor}' => 'distributor_kode',          
        '{nama_distributor}' => 'distributor_nama',
        '{kode_unit_distributor}' => 'distributor_unit_kode',     
        '{rubrik_unit_distributor}' => 'distributor_unit_rubrik',   
        '{nama_unit_distributor}' => 'distributor_unit_nama',     
        '{kode_jabatan_distributor}' => 'distributor_jabatan_kode',  
        '{nama_jabatan_distributor}' => 'distributor_jabatan_nama',  
      
        '{nip_penyetuju}' => 'penyetuju_kode',            
        '{nama_penyetuju}' => 'penyetuju_nama',            
        '{kode_unit_penyetuju}' => 'penyetuju_unit_kode',       
        '{rubrik_unit_penyetuju}' => 'penyetuju_unit_rubrik',     
        '{nama_unit_penyetuju}' => 'penyetuju_unit_nama',       
        '{kode_jabatan_penyetuju}' => 'penyetuju_jabatan_kode',    
        '{nama_jabatan_penyetuju}' => 'penyetuju_jabatan_nama',    
        '{kode_unit}' => 'unit_kode',
        '{nama_unit}' => 'unit_nama',
        '{nama_ekspedisi}' => 'ekspedisi_nama',
        '{kode_ekspedisi}' => 'ekspedisi_kode',            
        '{nama_media}' => 'media_nama',                
        '{kode_media}' => 'media_kode',                
        '{kode_prioritas}' => 'prioritas_kode',            
        '{nama_prioritas}' => 'prioritas_nama',            
        '{nama_jenis}' => 'jenis_nama',                
        '{kode_jenis}' => 'jenis_kode',                
        '{nama_sifat}' => 'sifat_nama',                
        '{kode_sifat}' => 'sifat_kode',                
        '{nama_kelas}' => 'kelas_nama',                
        '{kode_kelas}' => 'kelas_kode',                
        '{nama_lokasi}' => 'lokasi_nama',               
        '{kode_lokasi}' => 'lokasi_kode',               
        '{nama_tipe_surat_internal}' => 'itipe_nama',               
        '{kode_tipe_surat_internal}' => 'itipe_kode',                          
        '{nip_pembuat}' => 'surat_properti_pembuat_kode',          
        '{nama_pembuat}' => 'surat_properti_pembuat_nama',          
        '{kode_unit_pembuat}' => 'surat_properti_pembuat_unit_kode',     
        '{rubrik_unit_pembuat}' => 'surat_properti_pembuat_unit_rubrik',   
        '{nama_unit_pembuat}' => 'surat_properti_pembuat_unit_nama',     
        '{nama_jabatan_pembuat}' => 'surat_properti_pembuat_jabatan_nama' 
    );

    public $template_notifikasi_markup = array(
        'nomor_registrasi'=>'surat_registrasi',
        'nomor_surat'=>'surat_nomor',
        'nomor_agenda'=>'surat_agenda',
        'nomor_agenda_sub'=>'surat_agenda_sub',          
        'tanggal_surat'=>'surat_tanggal',             
        'perihal_surat'=>'surat_perihal',             
        'pengirim_surat'=>'surat_pengirim',            
        'tujuan_surat'=>'surat_tujuan',              
        'lampiran_surat'=>'surat_lampiran',            
        'lampiran_sub_surat'=>'surat_lampiran_sub',        
        'ringkasan_surat'=>'surat_ringkasan',           
        'catatan_surat'=>'surat_catatan',             
        'tanggal_disetujui'=>'surat_setuju_tgl',
        'total_penyetuju'=>'surat_setuju_total',

        'nip_penerima' => 'staf_kode',          
        'nama_penerima' => 'staf_nama',
        'kode_unit_penerima' => 'staf_unit_kode',     
        'rubrik_unit_penerima' => 'staf_unit_rubrik',   
        'nama_unit_penerima' => 'staf_unit_nama',     
        'kode_jabatan_penerima' => 'staf_jabatan_kode',  
        'nama_jabatan_penerima' => 'staf_jabatan_nama',  
     
        'nip_distributor' => 'distributor_kode',          
        'nama_distributor' => 'distributor_nama',
        'kode_unit_distributor' => 'distributor_unit_kode',     
        'rubrik_unit_distributor' => 'distributor_unit_rubrik',   
        'nama_unit_distributor' => 'distributor_unit_nama',     
        'kode_jabatan_distributor' => 'distributor_jabatan_kode',  
        'nama_jabatan_distributor' => 'distributor_jabatan_nama',  
      
        'nip_penyetuju' => 'penyetuju_kode',            
        'nama_penyetuju' => 'penyetuju_nama',            
        'kode_unit_penyetuju' => 'penyetuju_unit_kode',       
        'rubrik_unit_penyetuju' => 'penyetuju_unit_rubrik',     
        'nama_unit_penyetuju' => 'penyetuju_unit_nama',       
        'kode_jabatan_penyetuju' => 'penyetuju_jabatan_kode',    
        'nama_jabatan_penyetuju' => 'penyetuju_jabatan_nama',    
        'kode_unit' => 'unit_kode',                 
        'nama_unit' => 'unit_nama',                  
        'nama_ekspedisi' => 'ekspedisi_nama',            
        'kode_ekspedisi' => 'ekspedisi_kode',            
        'nama_media' => 'media_nama',                
        'kode_media' => 'media_kode',                
        'kode_prioritas' => 'prioritas_kode',            
        'nama_prioritas' => 'prioritas_nama',            
        'nama_jenis' => 'jenis_nama',                
        'kode_jenis' => 'jenis_kode',                
        'nama_sifat' => 'sifat_nama',                
        'kode_sifat' => 'sifat_kode',                
        'nama_kelas' => 'kelas_nama',                
        'kode_kelas' => 'kelas_kode',                
        'nama_lokasi' => 'lokasi_nama',               
        'kode_lokasi' => 'lokasi_kode',               
        'nama_tipe_surat_internal' => 'itipe_nama',               
        'kode_tipe_surat_internal' => 'itipe_kode',                          
        'nip_pembuat' => 'surat_properti_pembuat_kode',          
        'nama_pembuat' => 'surat_properti_pembuat_nama',          
        'kode_unit_pembuat' => 'surat_properti_pembuat_unit_kode',     
        'rubrik_unit_pembuat' => 'surat_properti_pembuat_unit_rubrik',   
        'nama_unit_pembuat' => 'surat_properti_pembuat_unit_nama',     
        'nama_jabatan_pembuat' => 'surat_properti_pembuat_jabatan_nama',

        'nama_jabatan' => 'jabatan_nama'
    );

    function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'notifikasi',
                'primary'=>'notifikasi_id',
                'fields'=> array(
                    array('name'=>'notifikasi_id','display'=>'Id','update'=>false,'unique'=>true,'notnull'=>true),
                    array('name'=>'notifikasi_pengirim'),
                    array('name'=>'notifikasi_penerima'),
                    array('name'=>'notifikasi_tgl'),
                    array('name'=>'notifikasi_model'),
                    array('name'=>'notifikasi_perihal'),
                    array('name'=>'notifikasi_isi',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }),
                    array('name'=>'notifikasi_data'),
                    array('name'=>'notifikasi_baca_tgl'),
                    array('name'=>'notifikasi_terima_tgl'),
                    array('name'=>'notifikasi_status'),
                    array('name'=>'notifikasi_properti')
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));

        $this->load->library('queue');
        $this->load->library('my_email');
    }

    function getEmailConfig(){
        $CI = get_instance();
        $setting = $CI->model('sipas/pengaturan', true);

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
                
        $config['email']['name']        = $setting->getSettingByCode('email_name');
        $config['email']['from']        = $setting->getSettingByCode('email_address');
        $config['email']['subject']     = null;
        $config['email']['message']     = null;

        return $config;
    }

    function tested($section = null, $config = array(), $data = array(), $akun = array()){
        $model = $this;
        $now = date('Y-m-d H:i:s');

        switch ($section) {
            case 'email':
                $data['notifikasi_pengirim'] = $akun[0]['akun_id'];
                $data['notifikasi_penerima'] = $akun[1]['akun_id'];
                $data['notifikasi_tgl'] = $now;
                $data['notifikasi_model'] = $this::MODEL_EMAIL;
                $data['notifikasi_perihal'] = $data['email_subject'];
                $data['notifikasi_isi'] = $data['email_message'];
                $data['notifikasi_status'] = $this::STATUS_PENDING;
                break;

            case 'sms':
                $data['notifikasi_pengirim'] = $akun[0]['akun_id'];
                $data['notifikasi_penerima'] = $akun[1]['akun_id'];
                $data['notifikasi_tgl'] = $now;
                $data['notifikasi_model'] = $this::MODEL_SMS;
                $data['notifikasi_perihal'] = null;
                $data['notifikasi_isi'] = null;
                $data['notifikasi_status'] = $this::STATUS_PENDING;
                break;

            default:
                $data['notifikasi_model'] = $this::MODEL_APP;
                $data['notifikasi_status'] = $this::STATUS_PENDING;
                break;
        }
        /*default process*/

        $op = $model->insert($data);
        return $op;
    }

    function created($section = null, $data = array(), $penerima_id = null, $jabatan_id = null, $mode = null, $dm_id = null){
        $CI = get_instance();
        $this->load->library('parser');
        $setting = $CI->model('sipas/pengaturan', true);
        $model_account = $CI->model('sipas/account', true);
        $staf_model = $CI->model('sipas/staf_view', true);

        $now = date('Y-m-d H:i:s');
        $logged_profile = $model_account->get_profile();
        $notifMailTube = Config()->item('queueServer_tubeName_notifEmail');

        $config = $this->getEmailConfig();
        $from = $config['email']['from'];
        $name = $config['email']['name'];

        switch ($mode) {
            case 'masuk':
                $subject = $setting->getSettingByCode('notif_email_suratmasuk_subject');
                $isi = $setting->getSettingByCode('notif_email_suratmasuk_template');
                break;

            case 'disposisi':
                $subject = $setting->getSettingByCode('notif_email_disposisi_subject');
                $isi = $setting->getSettingByCode('notif_email_disposisi_template');
                break;

            case 'draf':
                $subject = $setting->getSettingByCode('notif_email_suratdraft_subject');
                $isi = $setting->getSettingByCode('notif_email_suratdraft_template');
                break;
            
            default:
                $subject = $setting->getSettingByCode('notif_email_suratmasuk_subject');
                $isi = $setting->getSettingByCode('notif_email_suratmasuk_template');
                break;
        }

        if($dm_id){
            $data['disposisi_masuk_id'] = $dm_id;
            $data['link_draf'] = 'https://teo.pttimah.co.id/dev/#koreksi?staf='.$penerima_id.'&id='.$dm_id;        
        }
        
        $penerima = $staf_model->read($penerima_id);
        $template = $setting->getMarkedData($this->template_notifikasi_markup,
            array_merge(
                (array)$data,
                (array)$logged_profile,
                (array)$penerima
            )
        );

        $patternTemplate = $this->parser->parse_string($isi, $template);

        if(!empty($dm_id)){    
            $subjectEmail = str_replace('link_email', '<div><a href="'.$data['link_draf'].'"> KLIK DISINI </a></div>', $patternTemplate);
        }else{
            $subjectEmail = $patternTemplate;
        }
        
        $to = $penerima['akun_surel'];

        if($penerima){
            switch ($section) {
                case 'email':
                    $mail = array(
                                'from' => $from,
                                'name' => $name,
                                'to' => $to,
                                'subject' => $subject,
                                'message' => $subjectEmail,
                                'date_created' => $now
                            );

                    // if(!isInBlackListNotif('email', $to)){
                    //     // $this->queue->tube($this->notifMailTube)->addJob(array(
                    //     //     'config' => $config['init'],
                    //     //     'mail' => $mail
                    //     // ));

                    //     $data_email = array(
                    //         'config' => $config['init'],
                    //         'mail' => $mail
                    //     );

                    //     $addJob = create_job($notifMailTube, $data_email);
                    // }
                break;
                
                default:
                    
                break;
            }
        }
                
        return true;
    }
}