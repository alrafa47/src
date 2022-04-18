<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Disposisi_masuk extends Base_Controller {

    // public $report_template = 'sipas/disposisi/penerima';
    public $report_template = 'sipas/disposisi/disposisi';
    public $report_template_pnri = 'sipas/disposisi/disposisi_pnri';
    public $report_title = 'Surat Keterangan Penerima Disposisi';
    public $report_subtitle = 'Surat ini menerangkan bahwa pegawai dibawah ini telah menerima disposisi dengan rincian sebagai berikut:';
      
	function __construct(){
        parent::__construct();
        /*model surat sudah di load di model lain*/
        $this->m_surat                  = $this->model('sipas/surat',                       true);        
        $this->m_surat_view             = $this->model('sipas/surat_view',                  true);        
        $this->m_disposisi              = $this->model('sipas/disposisi',                   true);
        $this->m_disposisi_view         = $this->model('sipas/disposisi_netral_view',       true);
        $this->m_disposisi_masuk        = $this->model('sipas/disposisi_masuk',             true);
        $this->m_disposisi_masuk_view   = $this->model('sipas/disposisi_masuk_netral_view', true);
        $this->m_disposisi_masuk_log    = $this->model('sipas/disposisi_masuk_log',         true);
        $this->m_model_staf             = $this->model('sipas/staf_view',                   true);
        $this->m_account                = $this->model('sipas/account',                     true);
            
        $this->m_disposisi_masuk_aktif_view   = $this->model('sipas/disposisi_masuk_aktif_view',    true);
        $this->m_disposisi_masuk_lite_view    = $this->model('sipas/disposisi_masuk_lite_view',     true);
        $this->m_disposisi_masuk_berkas_view  = $this->model('sipas/disposisi_masuk_berkas_view',   true);
        $this->m_disposisi_jumlah_penerima    = $this->model('sipas/disposisi_jumlah_penerima_sama_view',true);
        $this->m_disposisi_jumlah_disposisi   = $this->model('sipas/disposisi_jumlah_penerima_disposisi_sama_view',true);
        // $this->m_fitur                  = $this->model('sipas/fitur',      true);
        // $this->m_akses                  = $this->model('sipas/akses',      true);
        // $this->m_akses_view             = $this->model('sipas/akses_view', true);
        $this->m_user                   = $this->model('sipas/akun',       true);
        $this->m_staf                   = $this->model('sipas/staf',       true);
        $this->m_staf_view              = $this->model('sipas/staf_view',  true);
        $this->m_perintah               = $this->model('sipas/perintah',  true);
        $this->m_aksi                   = $this->model('sipas/aksi',  true);
            
        $this->m_pengaturan             = $this->model('sipas/pengaturan', true);
        $this->m_report                 = $this->model('sipas/report',     true);
        $this->m_asset                  = $this->model('sipas/asset',      true);
        $this->m_ekspedisi              = $this->model('sipas/surat_ekspedisi', true);

        $this->m_surat_stack_dis_view   = $this->model('sipas/surat_stack_disposisi_view', true);
        $this->m_surat_stack            = $this->model('sipas/surat_stack', true);
    
        $this->m_surat_log              = $this->model('sipas/surat_log',   true);
        $this->m_properti               = $this->model('sipas/properti',    true);
        $this->m_notif_user             = $this->model('sipas/notif_user',  true);
    }

    function index(){
        $this->read();
    }

    function read($section=null){
        $me = $this;

        $account      = $me->m_account;
        $staf         = $me->m_staf;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;
        $pengaturan     = $me->m_pengaturan;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_view;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $profil     = $account->get_profile();
        $staf_id    = $account->get_profile_id();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $record = $disposisi_masuk_view->read($id);
            $record['pengirim_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$record['disposisi_pengirim_id'];
            $record['penerima_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$record['disposisi_masuk_penerima_id'];

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($profil['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($profil['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($profil['staf_status'] == 1) {
                $record['staf_hide'] = 1;
            } else {
                $record['staf_hide'] = 0;
            }
            

            // if($record['disposisi_masuk_staf']){
            //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$record['disposisi_surat'].'-'.$record['disposisi_masuk_staf']);
            //      if(!$redis_disposisi){
            //         $data_jml = $disposisi_jumlah_disposisi->read(array(
            //             'surat_id'=>$record['surat_id'],
            //             'disposisi_masuk_staf'=>$record['disposisi_masuk_staf']
            //         ));
            //         $jml = $data_jml['jumlah_penerima'];
            //         $redis->set(Config()->item('redisPrefix').'disposisi_sama:'.$record['disposisi_surat'].'-'.$record['disposisi_masuk_staf'], $jml);
            //     }else{
            //         $redis_disposisi = $redis_disposisi - 1; 
            //         $record['disposisi_masuk_jumlah_disposisi_sama'] = $redis_disposisi;
            //     }
            // }else{
            //     $redis_penerima = $redis->get(Config()->item('redisPrefix').'penerima_sama:'.$record['disposisi_surat'].'-'.$record['disposisi_masuk_jabatan']);
            //     if(!$redis_penerima){
            //         $data_jml = $disposisi_jumlah_penerima->read(array(
            //             'surat_id'=>$record['surat_id'],
            //             'disposisi_masuk_jabatan'=>$record['disposisi_masuk_jabatan']
            //         ));
            //         $jml = $data_jml['jumlah_penerima'];
            //         $redis->set(Config()->item('redisPrefix').'penerima_sama:'.$record['disposisi_surat'].'-'.$record['disposisi_masuk_jabatan'], $jml);
            //     }else{
            //         $redis_penerima = $redis_penerima - 1; 
            //         $record['disposisi_masuk_jumlah_penerima_sama'] = $redis_penerima;
            //     }
            // }
            
            $me->response_record($record);

        }else{
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => $disposisi::$field_induk.' IS NOT NULL'
            ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $disposisi_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => $filter,
                'sorter'    => $sorter
            ));

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     foreach ($operation['data'] as $key => &$value) {
            //         $value['disposisi_masuk_plt'] = 1;
            //     }
            // }else{
            //     foreach ($operation['data'] as $key => &$value) {
            //         $value['disposisi_masuk_plt'] = 0;
            //     }
            // }

            foreach ($operation['data'] as $key => &$value) {
                if (($profil['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($profil['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($profil['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }
                
                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //     if(!$redis_disposisi){
                //         $data_jml = $disposisi_jumlah_disposisi->read(array(
                //             'surat_id'=>$value['surat_id'],
                //             'disposisi_masuk_staf'=>$value['disposisi_masuk_staf']
                //         ));
                //         $jml = $data_jml['jumlah_penerima'];
                //         $redis->set(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf'], $jml);
                //     }else{
                //         $redis_disposisi = $redis_disposisi - 1; 
                //         $value['disposisi_masuk_jumlah_disposisi_sama'] = $redis_disposisi;
                //     }
                // }else{
                //     $redis_penerima = $redis->get(Config()->item('redisPrefix').'penerima_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_jabatan']);
                //     if(!$redis_penerima){
                //         $data_jml = $disposisi_jumlah_penerima->read(array(
                //             'surat_id'=>$value['surat_id'],
                //             'disposisi_masuk_jabatan'=>$value['disposisi_masuk_jabatan']
                //         ));
                //         $jml = $data_jml['jumlah_penerima'];
                //         $redis->set(Config()->item('redisPrefix').'penerima_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_jabatan'], $jml);
                //     }else{
                //         $redis_penerima = $redis_penerima - 1; 
                //         $value['disposisi_masuk_jumlah_penerima_sama'] = $redis_penerima;
                //     }
                // }
            }

            $me->response($operation);
        }
    }

    function masuk() {
        $me                     = $this;
        $account                = $me->m_account;
        $surat                  = $me->m_surat;
        $surat_view             = $me->m_surat_view;
        $model_staf             = $me->m_staf_view;
        $disposisi              = $me->m_disposisi;
        $disposisi_view         = $me->m_disposisi_view;
        $disposisi_masuk        = $me->m_disposisi_masuk;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_aktif_view;

        $filter = json_decode(varGet('filter','[]'));
        $sorter = json_decode(varGet('sorter',varGet('sort', '[]')));

        // array_unshift($filter, (object)array(
        //     'property'  => $surat_view::$field_isdistribusi,
        //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
        //     'type'      =>'exact'
        // ));
        array_unshift($filter, (object)array(
            'type'      =>'custom',
            'value'     => $disposisi::$field_induk.' IS NULL'
        ));
        array_unshift($filter, (object)array(
            'type'      =>'custom',
            'value'     => 'IFNULL(disposisi_masuk_iscabut, 0) = '.$disposisi_view::AKTIF
        ));

        $filter = json_encode($filter);
        $sorter = json_encode($sorter);

        $records = $disposisi_masuk_view->select(array(
            'limit'     => varGet('limit'),
            'start'     => varGet('start'),
            'filter'    => $filter,
            'sorter'    => $sorter,
        ));
        
        $me->response($records);
    }

    function update($usePayload = true){
        $me     = $this;
        // $me->load->library('queue');
        // $me->queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

        $notif_user           = $me->m_notif_user;
        $disposisi            = $me->m_disposisi;
        $disposisi_masuk      = $me->m_disposisi_masuk;
        $disposisi_masuk_view = $me->m_disposisi_masuk_view;
        $disposisi_masuk_log  = $me->m_disposisi_masuk_log;
        $surat_stack_dis_view = $me->m_surat_stack_dis_view;
        $surat_stack          = $me->m_surat_stack;
        $surat_log            = $me->m_surat_log;
        $model_staf           = $me->m_staf;
        $staf_view            = $me->m_staf_view;
        $model_aksi           = $me->m_aksi;
        $account              = $me->m_account->get_profile();
        $profile_id           = $me->m_account->get_profile_id();

        $id   = varReq('id');

        $primary    = $disposisi_masuk->get_primary();
        $payload    = getRequestPayload();
        $now        = date('Y-m-d H:i:s');
        $data       = (array) ($usePayload ? $payload : varPost());
        $id         = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $stafProfil = $model_staf->read($profile_id);
        $disposisi_masuk_record = $disposisi_masuk_view->read($id);   

        if($disposisi_masuk_record){
            if(isset($data['disposisi_masuk_baca_staf']) != $disposisi_masuk_record['disposisi_masuk_baca_staf']){
                $data['disposisi_masuk_baca_tgl'] = $now;
            }
            if(isset($data['disposisi_masuk_berkasterima_staf']) != $disposisi_masuk_record['disposisi_masuk_berkasterima_staf']){
                $data['disposisi_masuk_berkasterima_tgl'] = $now;
            }
            if(isset($data['disposisi_masuk_aksi_staf']) != $disposisi_masuk_record['disposisi_masuk_aksi_staf']){
                $data['disposisi_masuk_aksi_tgl'] = $now;
            }
            if((isset($data['disposisi_masuk_aksi']) != $disposisi_masuk_record['disposisi_masuk_aksi']) || ($data['disposisi_masuk_pesan'] != $disposisi_masuk_record['disposisi_masuk_pesan'])){
                $data['disposisi_masuk_aksi_tgl'] = $now;
            }
            if(isset($data['disposisi_masuk_terus_staf']) != $disposisi_masuk_record['disposisi_masuk_terus_staf']){
                $data['disposisi_masuk_terus_tgl'] = $now;
            }
        }

        if ($data['disposisi_masuk_terus_staf'] && $data['disposisi_masuk_terus_profil'] == NULL) {
            $terusStaf = $model_staf->read($data['disposisi_masuk_terus_staf']);
            $data['disposisi_masuk_terus_profil'] = $terusStaf['staf_profil'];
        }

        if ($data['disposisi_masuk_berkasterima_staf'] && $data['disposisi_masuk_berkasterima_profil'] == NULL) {
            $berkasStaf = $model_staf->read($data['disposisi_masuk_berkasterima_staf']);
            $data['disposisi_masuk_berkasterima_profil'] = $berkasStaf['staf_profil'];
        }

        if ($data['disposisi_masuk_berkas_status_staf'] && $data['disposisi_masuk_berkas_status_profil'] == NULL) {
            $berkasStaf = $model_staf->read($data['disposisi_masuk_berkas_status_staf']);
            $data['disposisi_masuk_berkas_status_profil'] = $berkasStaf['staf_profil'];
        }

        if ($data['disposisi_masuk_aksi_staf'] && $data['disposisi_masuk_aksi_profil'] == NULL) {
            $aksiStaf = $model_staf->read($data['disposisi_masuk_aksi_staf']);
            $data['disposisi_masuk_aksi_profil'] = $aksiStaf['staf_profil'];
        }

        if ($data['disposisi_masuk_baca_staf'] && $data['disposisi_masuk_baca_profil'] == NULL) {
            $bacaStaf = $model_staf->read($data['disposisi_masuk_baca_staf']);
            $data['disposisi_masuk_baca_profil'] = $bacaStaf['staf_profil'];
        }

        if($data['disposisi_masuk_ispengingat'] == 1 && $data['disposisi_model'] == 0 && ($data['disposisi_masuk_istembusan'] == 1 && $data['disposisi_masuk_baca_tgl']) || ($data['disposisi_masuk_istembusan'] == 0 && ($data['disposisi_masuk_aksi'] || $data['disposisi_masuk_terus_tgl']))) {
            $data['disposisi_masuk_ispengingat'] = 0;
        }
        
        $operation = $disposisi_masuk->update($id, $data, function($response) 
            use($id, $data, $disposisi_masuk, $disposisi_masuk_log, $account, $surat_stack_dis_view, $disposisi, $stafProfil, $surat_log,
                $surat_stack, $now, $queueTube, $queueTubeRedis, $disposisi_masuk_record, $disposisi_masuk_view, $model_staf, $model_aksi, $notif_user, $staf_view){

            if (Config()->item('queueServer')['host']) {
                $data_redis = array(
                    'type'=>'DisposisiMasuk-Staf',
                    'staf_id'=>$data['disposisi_masuk_staf'],
                    'jabatan_id'=>null,
                    'unit_id'=>null,
                    'data'=> $data['disposisi_masuk_staf']
                );
                $addJobStaf = create_job($queueTubeRedis, $data_redis);
            }
            
            $update_data = $disposisi_masuk_view->read($id);
            
            /*insert new disposisi masuk log*/
            if(isset($data['teruskan']) and $data['teruskan'] === 1){
                $exist = $disposisi_masuk_log->read(array(
                    'disposisi_masuk_log_tipe' => 3,
                    'disposisi_masuk_log_staf' => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_tgl' => $now
                ));
                if (empty($exist)) {
                    $disposisi_masuk_log->insert(array(
                        'disposisi_masuk_log_tipe' => 3,
                        'disposisi_masuk_log_staf' => $account['staf_id'],
                        'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                        'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                        'disposisi_masuk_log_tgl' => $now
                    ), null, function($response){});
                }
            }

            if(isset($data['berkas']) and $data['berkas'] === 1){
                $disposisi_masuk_log->insert(array(
                    'disposisi_masuk_log_tipe' => 2,
                    'disposisi_masuk_log_staf' => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_tgl'  => $now
                ), null, function($response){});
            }

            if(isset($data['isaksi']) and $data['isaksi'] === 1){
                if ($data['disposisi_induk'] === NULL) {
                    $notif_user->insert(array(
                        'notif_user_tipe' => 1,
                        'notif_user_model' => $update_data['surat_model'],
                        'notif_user_tgl' => $now,
                        'notif_user_penerima' => $update_data['surat_distribusi_staf'],
                        'notif_user_penerima_profil' => $update_data['surat_distribusi_profil'],
                        'notif_user_pengirim' => $update_data['disposisi_masuk_staf'],
                        'notif_user_pengirim_profil' => $stafProfil['staf_profil'],
                        'notif_user_referensi' => $update_data['surat_id'],
                        'notif_user_isnew' => 1,
                        'notif_user_isbaca' => 0,
                        'notif_user_isi' => $update_data['surat_perihal'].' ('.$update_data['surat_registrasi'].')'
                    ));

                    if ($update_data['surat_model'] == 1) {
                        $model = 'Masuk Eksternal';
                    } else if($update_data['surat_model'] == 2){
                        $model = 'Keluar Eksternal';
                    }else if ($update_data['surat_model'] == 3) {
                        $model = 'Masuk Internal';
                    } else if($update_data['surat_model'] == 4){
                        $model = 'Keluar Internal';
                    }
                    if (Config()->item('queueServer')['host']) {
                        $data_fcm = array(
                            'id' => $update_data['surat_id'],
                            'type' => 'Respon '.$model,
                            'from' => $account['staf_id'],
                            'to' => $update_data['surat_distribusi_staf'],
                            'data' => $update_data['surat_perihal'].' ('.$update_data['surat_registrasi'].')'
                        );
                        $addJob = create_job($queueTube, $data_fcm);
                    }
                }else{
                    if (Config()->item('queueServer')['host']) {
                        $data_fcm = array(
                            'id'   => $data['disposisi_id'],
                            'type' => 'Respon',
                            'from' => $account['staf_id'],
                            'to'   => $disposisi_masuk_record['disposisi_staf'],
                            'data' => $update_data['aksi_nama'],
                        );
                        $addJob = create_job($queueTube, $data_fcm);
                    }
                }

                $disposisi_masuk_log->insert(array(
                    'disposisi_masuk_log_tipe'  => 5,
                    'disposisi_masuk_log_staf'  => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_tgl'   => $now,
                    'disposisi_masuk_log_aksi'  => $data['disposisi_masuk_aksi'],
                    'disposisi_masuk_log_pesan' => $data['disposisi_masuk_pesan']
                ), null, function($response){});
            }
            if(isset($data['baca']) and $data['baca'] === 1){
                $disposisi_masuk_log->insert(array(
                    'disposisi_masuk_log_tipe'  => 1,
                    'disposisi_masuk_log_staf'  => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_tgl'   => $now
                ), null, function($response){});

                if ($data['disposisi_masuk_ispengingat'] == 1) {
                    $disposisi_masuk_log->insert(array(
                        'disposisi_masuk_log_tipe'  => 8,
                        'disposisi_masuk_log_staf'  => $account['staf_id'],
                        'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                        'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                        'disposisi_masuk_log_tgl'   => $now
                    ), null, function($response){});
                }
            }
	    
            if(isset($data['request_berkas']) and $data['request_berkas'] === 1){
                if (Config()->item('queueServer')['host']) {
                    $data_fcm = array(
                        'id'    => $data['disposisi_masuk_id'],
                        'type'  =>'Permintaan Berkas Fisik',
                        'from'  => $account['staf_id'],
                        'to'    => $disposisi_masuk_record['surat_properti_pembuat_id'],
                        'data'  => $update_data['disposisi_masuk_berkas_status'],
                    );
                    $addJob = create_job($queueTube, $data_fcm);
                }

                $disposisi_masuk_log->insert(array(
                    'disposisi_masuk_log_tipe' => 9,
                    'disposisi_masuk_log_staf' => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_berkas_status' => $disposisi_masuk_log::BERKAS_REQUEST,
                    'disposisi_masuk_log_tgl' => $now
                ), null, function($response){});
            }

            if(isset($data['cancel_request_berkas']) and $data['cancel_request_berkas'] === 1){
                if (Config()->item('queueServer')['host']) {
                    $data_fcm = array(
                        'id'    => $data['disposisi_masuk_id'],
                        'type'  =>'Permintaan Berkas Fisik Dibatalkan',
                        'from'  => $account['staf_id'],
                        'to'    => $disposisi_masuk_record['surat_properti_pembuat_id'],
                        'data'  => $update_data['disposisi_masuk_berkas_status'],
                    );
                    $addJob = create_job($queueTube, $data_fcm);
                }

                $disposisi_masuk_log->insert(array(
                    'disposisi_masuk_log_tipe' => 9,
                    'disposisi_masuk_log_staf' => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_berkas_status' => $disposisi_masuk_log::BERKAS_CANCEL,
                    'disposisi_masuk_log_tgl' => $now
                ), null, function($response){});
            }

            if($data['disposisi_masuk_berkas_status'] == 2){
                if (Config()->item('queueServer')['host']) {
                    $data_fcm = array(
                        'id'    => $data['disposisi_masuk_id'],
                        'type'  =>'Permintaan Berkas Fisik Diterima',
                        'from'  => $disposisi_masuk_record['surat_properti_pembuat_id'],
                        'to'    => $data['disposisi_masuk_staf'],
                        'data'  => $update_data['disposisi_masuk_berkas_status'],
                    );
                    $addJob = create_job($queueTube, $data_fcm);
                }

                $surat_log->insert(array(
                    'surat_log_tipe' => 25,
                    'surat_log_surat' => $update_data['surat_id'],
                    'surat_log_staf' => $account['staf_id'],
                    'surat_log_profil' => $stafProfil['staf_profil'],
                    'surat_log_tgl' => $now
                ), null, function($response){});

                $disposisi_masuk_log->insert(array(
                    'disposisi_masuk_log_tipe' => 9,
                    'disposisi_masuk_log_staf' => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_berkas_status' => $disposisi_masuk_log::BERKAS_APPROVE,
                    'disposisi_masuk_log_tgl' => $now
                ), null, function($response){});
            }

            if($data['disposisi_masuk_berkas_status'] == 4){
                if (Config()->item('queueServer')['host']) {
                    $data_fcm = array(
                        'id'    => $data['disposisi_masuk_id'],
                        'type'  =>'Permintaan Berkas Fisik Ditolak',
                        'from'  => $disposisi_masuk_record['surat_properti_pembuat_id'],
                        'to'    => $data['disposisi_masuk_staf'],
                        'data'  => $update_data['disposisi_masuk_berkas_status'],
                    );
                    $addJob = create_job($queueTube, $data_fcm);
                }

                $surat_log->insert(array(
                    'surat_log_tipe' => 26,
                    'surat_log_surat' => $update_data['surat_id'],
                    'surat_log_staf' => $account['staf_id'],
                    'surat_log_profil' => $stafProfil['staf_profil'],
                    'surat_log_catatan' => $data['disposisi_masuk_berkas_komentar'],
                    'surat_log_tgl' => $now
                ), null, function($response){});

                $disposisi_masuk_log->insert(array(
                    'disposisi_masuk_log_tipe' => 9,
                    'disposisi_masuk_log_staf' => $account['staf_id'],
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_berkas_status' => $disposisi_masuk_log::BERKAS_DECLINE,
                    'disposisi_masuk_log_pesan' => $data['disposisi_masuk_berkas_komentar'],
                    'disposisi_masuk_log_tgl' => $now
                ), null, function($response){});
            }
            // /*please update stack too*/
            // $find_stack = $surat_stack_dis_view->find(array(
            //     'surat_stack_surat' => $data['disposisi_surat'],
            //     'surat_stack_model' => $disposisi::MODEL_DISPOSISI,
            //     'surat_stack_staf'  => $data['disposisi_masuk_staf']));
            // // echo "<pre>";
            // // print_r($find_stack[0]['surat_stack_id']);
            // if($find_stack){
            //     $surat_stack->update($find_stack[0]['surat_stack_id'],array(
            //         'surat_stack_baca_tgl' => $data['disposisi_masuk_baca_tgl']),
            //     null, function($response){});
            // }
        });
        $operation[$disposisi->dataProperty] = $disposisi_masuk_view->read($id);
        $this->response($operation);
    }
    
    function report($type=null, $id=null, $mode=null){
        $me = $this;
        $account_model   = $me->m_account;
        $pengaturan      = $me->m_pengaturan;
        $disposisi_view  = $me->m_disposisi_view;

        $id = varGet('id');
        $filter = varGet('filter');
        $filterValue = varGet('value');
        $download = varGet('download',0);
        $withcreator = varGet('tampilkanpembuat',0);
        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;

        $user = $account_model->get_profile();

        $penerima = null;

        $surat_staf = $me->m_disposisi_masuk_view->read($id);

        if($surat_staf){
            $current_surat_staf = $this->m_disposisi_masuk_view->find(array(
                'disposisi_masuk_disposisi'=>$surat_staf['disposisi_id']
            ));
        }else{
            //IMPORTANT, do not remove
            $surat_staf = $me->m_disposisi_masuk_view->read(array(
                'disposisi_id' => $id
                // 'disposisi_penerima_penerima' => $user['staf_id']
            ));
            $id = $surat_staf['disposisi_masuk_id'];
        }        

        // first we should get disposisi record to fetch pegawai sibling
        $records = $this->trace_root($id);
        if(!$withcreator and !empty($records))
        {
            array_shift($records);
        }

        // repack for the output
        
        // generate author of paper


        $createDate = new DateTime($surat_staf['surat_tanggal']);
        $surat_staf['surat_tanggal'] = $createDate->format('d M Y');
        $createDatedis = new DateTime($surat_staf['disposisi_tgl']);
        $surat_staf['disposisi_tgl'] = $createDatedis->format('d M Y');
        $judul = ((int)$surat_staf['disposisi_model_sub'] === 1)? 'LEMBAR NOTA DINAS' : 'LEMBAR DISPOSISI';


        // generate number for each
        foreach ($records as $i => &$r) {
            $r['no'] = $i + 1;
            $pengirim = $r['disposisi_pengirim_nama'];

            if($r['disposisi_pelaku_id']){
                if($r['disposisi_pelaku_id'] != $r['disposisi_pengirim_id']){
                    $r['disposisi_pengirim_nama'] = $pengirim. ', via asistensi oleh ('.$r['disposisi_pelaku_nama'].')';
                }
            }
            $r['perintah_dan_uraian'] = ($r['disposisi_israhasia'])? '(Disposisi bersifat rahasia)' : $r['perintah_nama'].', '.$r['disposisi_pesan'];
            foreach ($r['disposisi_penerima'] as $y => &$x) {
                $penerima_nama = $x['disposisi_masuk_penerima_nama'];
                if($x['disposisi_masuk_iscabut']){
                    $cabut_text = '('.$disposisi_view::$disposisi_iscabut_tpl.' pada '.$x['disposisi_masuk_cabut_tgl'].')';
                    $x['disposisi_masuk_penerima_nama'] = '<font color="#757575">'.$penerima_nama.' '.$cabut_text.'</font>';
                }
                $pesan = ($x['disposisi_masuk_pesan'])? $x['disposisi_masuk_pesan'] : '<font color="#757575">Tidak ada uraian</font>';
                if($x['disposisi_masuk_aksi']){
                    $tanggal_aksi = ', <font color="#757575">memberi respon pada '.$x['disposisi_masuk_aksi_tgl'].'</font>';
                    $x['aksi_dan_pesan'] = ($r['disposisi_israhasia'])? $tanggal_aksi : $tanggal_aksi.' ('.$x['aksi_nama'].', '.$pesan.')';
                }
            }
        }

        $template = $pengaturan->getSettingByCode('template_lembar_disposisi');

        $header_mode = $me->m_report->getHeaderMode($template);

        if ($template !== null){
            $template = html_entity_decode($template);
        } else {
            $template = $this->load->view($this->report_template, null, true);
        }

        // generate data 
        $report_data = array_merge(array(
            'style'     => array( array('params'=>'media="all"', 'content'=>$me->m_asset->css('style.css',false)) ),
            'title'     => $this->report_title,
            'subtitle'  => $this->report_subtitle,
            'records'   => $records,
            'judul'     => $judul,
            'operator'  =>$user[$account_model->field_display],
            'dateReportFormated'=> date('d M Y H:i'),
            $header_mode[0] => $me->m_report->generateHeader($download, 0, $header_mode[1])
        ), $surat_staf);

        if($download){
            $me->m_report->generateReportPdf($template, $reportt_data, 'report');
        }else{
            $me->m_report->generateReport($template, $report_data, true, false);
        }
    }

    protected function trace_root($surat_staf_id = null){
        $surat_staf_record = $this->m_disposisi_masuk_view->read($surat_staf_id);
        $disposisi_id = $surat_staf_record['disposisi_masuk_disposisi'];

        $trace = array();

        $disposisi_pack = $this->get_disposisi_pack($disposisi_id);
        if($disposisi_pack)
        {
            array_unshift($trace, $disposisi_pack);

            if(!empty($disposisi_pack['disposisi_induk']))
            {
                $parent_disposisi_pack = $this->trace_root($disposisi_pack['disposisi_induk']);
                
                if(!empty($parent_disposisi_pack))
                {
                    // array_unshift($trace, $parent_disposisi_pack[0]);
                    array_push($parent_disposisi_pack, $trace[0]);
                    $trace = $parent_disposisi_pack;
                }
            }
        }

        return $trace;
    }

    protected function get_disposisi_pack($disposisi_id = null){
        $disposisi_record = $this->m_disposisi_view->read($disposisi_id);
        if($disposisi_record)
        {
            $disposisi_record['disposisi_penerima'] = $this->m_disposisi_masuk_view->find(array(
                'disposisi_masuk_disposisi' => $disposisi_id
                ));

            $disposisi_tanggal = new DateTime($disposisi_record['disposisi_tgl']);
            $disposisi_record['disposisi_tgl'] = $disposisi_tanggal->format('d-m-Y H:i');
        }

        return $disposisi_record;
    }

    public function isexist(){
        $surat      = $this->m_surat;
        $dis_mas    = $this->m_disposisi_masuk_view;
        $surat_log  = $this->m_surat_log;

        $staf_id    = varReq('user');
        $staf_nama  = varReq('nama');
        $surat_id   = varReq('surat_id');
        $induk      = varReq('induk'); /*if induk true then it's disposisi not surat*/
        $model_sub  = (varReq('model_sub'))? varReq('model_sub') : 0;
        $exist      = 0;
        $exist_name = array();

        if(!empty($staf_id)) {
            foreach ($staf_id as $key => $value) {
                $filter = array(
                    'disposisi_surat' => $surat_id,
                    'disposisi_induk' => NULL,
                    'IFNULL(disposisi_masuk_istembusan, 0) = 0' => NULL,
                    // 'disposisi_model_sub' => $model_sub,
                    'disposisi_masuk_iscabut' => 0,
                    'disposisi_masuk_staf' => $value
                );
                
                if($induk === 'true'){
                    unset($filter['disposisi_induk']);
                    // unset($filter['disposisi_model_sub']);
                }
                $is_dispo = $dis_mas->read($filter);
                // echo $dis_mas->get_lastquery();
                
                if($is_dispo){
                    $exist = $exist + 1;
                    array_push($exist_name, $staf_nama[$key]);
                }
            }

            $this->response(array(
                'exist' => (int)$exist,
                'exist_name' => $exist_name
            ));   
        }else{
            $this->response(array(
                'exist' => (int)0,
                'exist_name' => []
            ));   
        }
    }

    public function isexist_penerima(){
        $surat      = $this->m_surat;
        $dis_mas    = $this->m_disposisi_masuk_view;
        $surat_log  = $this->m_surat_log;

        $staf_id    = varReq('user');
        $staf_nama  = varReq('nama');
        $surat_id   = varReq('surat_id');
        $induk      = varReq('induk'); /*if induk true then it's disposisi not surat*/
        $model_sub  = (varReq('model_sub'))? varReq('model_sub') : 0;
        $exist      = 0;
        $exist_name = array();

        foreach ($staf_id as $key => $value) {
            $filter = array(
                'disposisi_surat' => $surat_id,
                'disposisi_induk' => NULL,
                'IFNULL(disposisi_masuk_istembusan, 0) = 0' => NULL,
                // 'disposisi_model_sub' => $model_sub,
                'disposisi_masuk_iscabut' => 0,
                'disposisi_masuk_jabatan' => $value
            );
            
            if($induk === 'true'){
                unset($filter['disposisi_induk']);
            }
            $is_dispo = $dis_mas->read($filter);
            
            if($is_dispo){
                $exist = $exist + 1;
                array_push($exist_name, $staf_nama[$key]);
            }
        }

        $this->response(array(
            'exist' => (int)$exist,
            'exist_name' => $exist_name
        ));   
    }

    public function isexist_session(){
        $surat      = $this->m_surat;
        $dis_mas    = $this->m_disposisi_masuk_view;
        $surat_log  = $this->m_surat_log;

        $staf_id    = varReq('user');
        $staf_nama  = varReq('nama');
        $surat_id   = varReq('surat_id');
        $induk      = varReq('induk'); /*if induk true then it's disposisi not surat*/
        $model_sub  = (varReq('model_sub'))? varReq('model_sub') : 0;
        $exist      = 0;
        $exist_name = array();

        foreach ($staf_id as $key => $value) {
            $filter = array(
                'disposisi_surat' => $surat_id,
                'disposisi_induk IS NOT NULL' => NULL,
                'disposisi_model_sub' => $model_sub,
                'IFNULL(disposisi_masuk_istembusan, 0) = 0' => NULL,
                'disposisi_masuk_iscabut' => 0,
                'disposisi_masuk_staf' => $value
            );
            
            // if($induk === 'true'){
            //     unset($filter['disposisi_induk']);
            //     // unset($filter['disposisi_model_sub']);
            // }
            $is_dispo = $dis_mas->read($filter);
            // echo $dis_mas->get_lastquery();
            
            if($is_dispo){
                $exist = $exist + 1;
                array_push($exist_name, $staf_nama[$key]);
            }
        }

        $this->response(array(
            'exist' => (int)$exist,
            'exist_name' => $exist_name
        ));
    }

    public function transporter_path(){
        $disposisi = $this->m_disposisi_masuk;
        $disposisi_masuk = $this->m_disposisi_masuk_lite_view;
        $query = $this->db->get_where('v_disposisi_masuk_lite', array('disposisi_masuk_parent_path' => NULL), 1000);
        $data = $query->result_array();
        foreach ($data as $key => &$value){
            $id = $value['disposisi_masuk_id'];
            if($value['disposisi_induk'] && ($value['disposisi_induk'] !== $id) && !$value['disposisi_masuk_parent_path']){
                $data_disposisi =$disposisi_masuk->read($id);
                if(!$data_disposisi['disposisi_masuk_parent_path']){
                    $parent = $disposisi_masuk->read($data_disposisi['disposisi_induk']);
                    if(!$parent['disposisi_masuk_parent_path']){
                        $data_parent = $this->parent_path($parent);
                        $value['disposisi_masuk_parent_path'] = $data_parent['disposisi_masuk_parent_path'].'/'.$data_disposisi['disposisi_masuk_id'];
                    }else{
                        $value['disposisi_masuk_parent_path'] = $parent['disposisi_masuk_parent_path'].'/'.$data_disposisi['disposisi_masuk_id'];
                    }
                    $operation = $disposisi->update($id, $value);
                }else{
                    $value['disposisi_masuk_parent_path'] = $data_disposisi['disposisi_masuk_parent_path'];
                }
            }else{
                $data_disposisi =$disposisi_masuk->read($id);
                if(!$data_disposisi['disposisi_masuk_parent_path']){
                    $value['disposisi_masuk_parent_path'] = '/'.$data_disposisi['disposisi_masuk_id'];
                    $operation = $disposisi->update($id, $value);
                }else{
                    $value['disposisi_masuk_parent_path'] = $data_disposisi['disposisi_masuk_parent_path'];
                }
            }
        }

        $this->response($data);
    }

    public function parent_path($data){
        $disposisi = $this->m_disposisi_masuk;
        $disposisi_masuk = $this->m_disposisi_masuk_lite_view;

        $id = $data['disposisi_masuk_id'];
        if($data['disposisi_induk'] && ($data['disposisi_induk'] !== $id)){
            $parent = $disposisi_masuk->read($data['disposisi_induk']);
            if(!$parent['disposisi_masuk_parent_path']){
                $data_parent = $this->parent_path($parent);
                $data['disposisi_masuk_parent_path'] = $data_parent['disposisi_masuk_parent_path'].'/'.$data['disposisi_masuk_id'];
            }else{
                $data['disposisi_masuk_parent_path'] = $parent['disposisi_masuk_parent_path'].'/'.$data['disposisi_masuk_id'];
            }
        }else{
            $data['disposisi_masuk_parent_path'] = '/'.$data['disposisi_masuk_id'];
        }
        $operation = $disposisi->update($id, $data);
        return $data;
    }

    function pengingat_asisten(){
        $account = $this->m_account;
        $disposisi_masuk = $this->m_disposisi_masuk;
        $disposisi_masuk_view = $this->m_disposisi_masuk_view;
        $disposisi_masuk_log = $this->m_disposisi_masuk_log;
        $model_staf = $this->m_staf;
        $queueTube = Config()->item('queueServer_notifTube');

        $akun = $account->get_profile_id();
        $stafProfil = $model_staf->read($akun);
        $id   = varReq('id');
        $now  = date('Y-m-d H:i:s');

        $operation = $disposisi_masuk->update(array(
                'disposisi_masuk_id' => $id), array(
                'disposisi_masuk_ispengingat' => 1,
                'disposisi_masuk_pengingat_staf' => $akun,
                'disposisi_masuk_pengingat_profil' => $stafProfil['staf_profil'],
                'disposisi_masuk_pengingat_tgl'  => $now,
            ), function ($response) use ($now, $id, $disposisi_masuk_log, $akun, $queueTube, $disposisi_masuk_view, $stafProfil){
            $inserted_data = $disposisi_masuk_view->read($id);
            if (Config()->item('queueServer')['host']) {
                if ($inserted_data['disposisi_mode'] == 'Masuk') {
                    $pesan = 'Anda mendapat pengingat surat dengan perihal '.$inserted_data['surat_perihal'];
                } else {
                    $pesan = 'Anda mendapat pengingat surat dengan perintah '.$inserted_data['perintah_nama'];
                }

                $data_fcm = array(
                    'id'    => $id,
                    'type'  => $inserted_data['disposisi_mode'],
                    'from'  => $akun,
                    'to'    => $inserted_data['disposisi_masuk_staf'],
                    'data'  => $pesan,
                );
                $addJob = create_job($queueTube, $data_fcm);
            }

            $dataLog = array(
                'disposisi_masuk_log_tipe' => 7,
                'disposisi_masuk_log_masuk'=>$id,
                'disposisi_masuk_log_staf'=>$akun,
                'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                'disposisi_masuk_log_tgl'=>$now);
            $operation_log = $disposisi_masuk_log->insert($dataLog, null, function($response){});
        });
        $operation[$disposisi_masuk->dataProperty] = $disposisi_masuk->read($id);
        $this->response($operation);
    }
    
    function request_berkas(){
        $me                     = $this;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_berkas_view;

        $filter = json_decode(varGet('filter','[]'));
        $sorter = json_decode(varGet('sorter',varGet('sort', '[]')));

        $id = varGet('id');
        if (empty($id)) return false;

        array_unshift($filter, (object)array(
            'property'  => 'disposisi_surat',
            'value'     => $id,
            'type'      =>'exact'
        ));

        array_unshift($sorter, (object)array(
            'property'  => 'disposisi_masuk_berkas_status_tgl',
            'direction' => 'DESC'
        ));
        // array_unshift($sorter, (object)array(
        //     'property'  => 'disposisi_masuk_berkas_status',
        //     'direction' => 'ASC'
        // ));
        // array_unshift($sorter, (object)array(
        //     'property'  => 'disposisi_masuk_berkasterima_tgl',
        //     'direction' => 'DESC'
        // ));
        // array_unshift($sorter, (object)array(
        //     'property'  => 'disposisi_masuk_isberkasterima',
        //     'direction' => 'ASC'
        // ));
        // array_unshift($sorter, (object)array(
        //     'property'  => 'disposisi_masuk_cabut_tgl',
        //     'direction' => 'DESC'
        // ));
        // array_unshift($sorter, (object)array(
        //     'property'  => 'disposisi_masuk_iscabut',
        //     'direction' => 'ASC'
        // ));

        $filter = json_encode($filter);
        $sorter = json_encode($sorter);

        $records = $disposisi_masuk_view->select(array(
            'limit'     => varGet('limit'),
            'start'     => varGet('start'),
            'filter'    => $filter,
            'sorter'    => $sorter
        ));
        
        $me->response($records);
    }
}