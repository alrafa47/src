<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Koreksi_masuk extends Base_Controller {

    public $report_template = 'sipas/koreksi/penerima';
    public $report_title = 'Surat Keterangan Penerima koreksi';
    public $report_subtitle = 'Surat ini menerangkan bahwa pegawai dibawah ini telah menerima koreksi dengan rincian sebagai berikut:';
      
    function __construct(){
        parent::__construct();
        $this->m_user          = $this->model('sipas/akun',         true);
        $this->m_account       = $this->model('sipas/account',      true);
        $this->m_staf          = $this->model('sipas/staf',         true);
        $this->m_staf_view     = $this->model('sipas/staf_view',    true);
        $this->m_pengaturan    = $this->model('sipas/pengaturan',   true);
        $this->m_notifikasi    = $this->model('sipas/notifikasi',   true);
        
        $this->m_report = $this->model('sipas/report',              true);
        $this->m_asset  = $this->model('sipas/asset',               true);
        
        $this->m_surat       = $this->model('sipas/surat',          true);     
        $this->m_surat_log   = $this->model('sipas/surat_log',      true);
        $this->m_surat_view  = $this->model('sipas/surat_view',     true);
        $this->m_surat_stack = $this->model('sipas/surat_stack',    true);
        $this->m_disposisi_masuk_lite_view = $this->model('sipas/disposisi_masuk_lite_view',    true);
        $this->m_surat_stack_view = $this->model('sipas/surat_stack_koreksi_view',              true);
        $this->m_surat_stack_dis_view = $this->model('sipas/surat_stack_disposisi_view',        true);
    
        $this->m_disposisi              = $this->model('sipas/disposisi',            true);
        $this->m_disposisi_view         = $this->model('sipas/disposisi_view',       true);
        $this->m_disposisi_masuk        = $this->model('sipas/disposisi_masuk',      true);
        $this->m_disposisi_masuk_view   = $this->model('sipas/disposisi_masuk_netral_view', true);
        $this->m_koreksi_masuk_view     = $this->model('sipas/koreksi_masuk_view',   true);
        $this->m_koreksi_masuk_log      = $this->model('sipas/disposisi_masuk_log',      true);
        
        // $this->m_addons    = $this->model('sipas/addons_config', true);
        $this->m_properti  = $this->model('sipas/properti', true);
        $this->m_dokumen   = $this->model('sipas/dokumen_view', true);

        $this->load->library('parser');
    }

    function index(){
        $this->read();
    }

    function read(){
        $me = $this;

        $koreksi        = $me->m_disposisi;
        $koreksi_view   = $me->m_disposisi_view;
        $staf           = $me->m_staf;
        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $account        = $me->m_account;        

        $koreksi_penerima = $me->m_disposisi_masuk;
        $penerima_view    = $me->m_koreksi_masuk_view;
        $pengaturan       = $me->m_pengaturan;

        $filter     = json_decode(varGet('filter','[]'));
        $sorter     = json_decode(varGet('sorter',varGet('sort', '[]')));
        $profil     = $account->get_profile();
        $staf_id    = $account->get_profile_id();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')) {
            $id = varGet('id', varGet('disposisi_masuk_id'));
            // $get_record = $penerima_view->read($id);

            // /*patch for flag as read if user acess it*/
            // if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            // {
            //     if((int)$get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT)
            //     {
            //         $get_record['disposisi_masuk_baca_tgl'] = date('Y-m-d H:i:s');
            //         $get_record['disposisi_masuk_baca_staf'] = $staf_id;
            //     }
            // }

            $record = $penerima_view->read($id);

            $record['pengirim_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$record['disposisi_pengirim_id'];

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
            $this->response_record($record);

        }else{
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'IFNULL('.$surat::$field_approval_lookup.', 0) <> '.$surat::SETUJU_INIT
            ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $records = $penerima_view->select(array(
                'limit'     => varGet('limit'),
                'start'     => varGet('start'),
                'filter'    => $filter,
                'sorter'    => $sorter
            ));
            
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     foreach ($records['data'] as $key => &$value) {
            //         $value['disposisi_masuk_plt'] = 1;
            //     }
            // }else{
            //     foreach ($records['data'] as $key => &$value) {
            //         $value['disposisi_masuk_plt'] = 0;
            //     }
            // }

            foreach ($records['data'] as $key => &$value) {
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
            }
            $this->response($records);
        }
    }

    function riwayat(){
        $me = $this;
        $penerima_view = $me->m_koreksi_masuk_view;

        $filter = json_decode(varGet('filter','[]'));
        $sorter = json_decode(varGet('sort','[]'));

        $filter = json_encode($filter);
        $sorter = json_encode($sorter);
        $records = $penerima_view->select(array(
            // 'limit'     => varGet('limit'),
            'start'     => varGet('start'),
            'filter'    => $filter,
            'sorter'    => $sorter
        ));

        $this->response($records);
    }

    function update($usePayload = true){
        $me     = $this;
        // $me->load->library('queue');
        // $me->queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');
        $worker_mode = Config()->item('worker_mode');
        $queuetubeDisposisi = Config()->item('queueServer_tubeDisposisi');
        $queuetubeKoreksi = Config()->item('queueServer_tubeKoreksi');
        $queuetubeKeputusan = Config()->item('queueServer_tubeKeputusan');
        
        $account        = $me->m_account;
        $staf_model     = $me->m_staf;
        $koreksi        = $me->m_disposisi;
        $properti       = $me->m_properti;
        $surat          = $me->m_surat;
        $surat_log      = $me->m_surat_log;
        $surat_view     = $me->m_surat_view;
        $pengaturan     = $me->m_pengaturan;
        $dokumen        = $me->m_dokumen;
            
        $koreksi_masuk        = $me->m_disposisi_masuk;
        $disposisi_masuk_view = $me->m_disposisi_masuk_view;
        $koreksi_masuk_log    = $me->m_koreksi_masuk_log;
        $koreksi_masuk_view   = $me->m_koreksi_masuk_view;
        $disposisi_masuk_lite_view   = $me->m_disposisi_masuk_lite_view;

        $surat_stack        = $me->m_surat_stack;
        $surat_stack_view   = $me->m_surat_stack_view;

        $notifikasi = $me->m_notifikasi;
        $account_id = $account->get_profile_id();
        $auto_nomor_setting = (bool)$pengaturan->getSettingByCode('use_auto_nomor_internal');
        $mergeData = $pengaturan->getSettingByCode('use_data_merge');
        $auto_nomor_keluar_setting = (bool)$pengaturan->getSettingByCode('use_auto_nomor_eksternal');
        $auto_distribusi_setting  = (bool)$pengaturan->getSettingByCode('use_auto_distribusi_internal');
        $use_ttd  = (bool)$pengaturan->getSettingByCode('use_signature');

        $now        = date('Y-m-d H:i:s');
        $payload    = getRequestPayload();
        $data       = (array) ($usePayload ? $payload : varPost());
        $primary    = $koreksi_masuk->get_primary();
        $id         = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $stafProfil = $account->get_profile();
        // $koreksi_masuk_record = $koreksi_masuk->read($id);
        #traceKoreksi
        $koreksi_masuk_id = $data['disposisi_masuk_id'];
        // $traceId = $this->traceIdKoreksi($koreksi_masuk_id);
        $traceId = null;

        if($data['disposisi_masuk_status_tgl'] == NULL){
            $data['disposisi_masuk_status_tgl'] = $now;
        }
        if($data['disposisi_masuk_baca_tgl'] == NULL){
            $data['disposisi_masuk_baca_tgl'] = $now;
        }

        if ($data['disposisi_masuk_baca_staf'] && $data['disposisi_masuk_baca_profil'] == NULL) {
            $baca_profil = $staf_model->read($data['disposisi_masuk_baca_staf']);
            $data['disposisi_masuk_baca_profil'] = $baca_profil['staf_profil'];
        }

        // $data['disposisi_masuk_profil'] = $data['disposisi_masuk_profil'] ? $data['disposisi_masuk_profil'] : $koreksi_masuk_record['disposisi_masuk_profil'];

        if($data['disposisi_masuk_ispengingat'] == 1 && $data['disposisi_masuk_status'] != 0) {
            $data['disposisi_masuk_ispengingat'] = 0;
        }

        if ($data['disposisi_masuk_status_staf'] && $data['disposisi_masuk_status_profil'] == NULL) {
            $stafProfil = $staf_model->read($data['disposisi_masuk_status_staf']);
            $data['disposisi_masuk_status_profil'] = $stafProfil['staf_profil'];
        }



        $operation = $koreksi_masuk->update($id, $data, 
            function($response) use ($me, $now, $id, $data, $surat_stack, $surat_view, $staf_model, $surat, $koreksi, $koreksi_masuk, $surat_stack_view, $traceId, 
            $use_ttd, $account, $account_id, $surat_log, $properti, $auto_nomor_setting, $auto_nomor_keluar_setting, $auto_distribusi_setting, $koreksi_masuk_log, $mergeData, 
            $queueTube, $queueTubeRedis, $disposisi_masuk_lite_view, $worker_mode, $queuetubeDisposisi, $disposisi_masuk_view, $stafProfil, $koreksi_masuk_view, 
            $queuetubeKoreksi, $dokumen, $queuetubeKeputusan, $pengaturan, $notifikasi){
                
            if ($response[$koreksi_masuk->successProperty] !== true) return;

            if (Config()->item('queueServer')['host']) {
                $data_redis = array(
                    'type'=>'KoreksiMasuk-Staf',
                    'staf_id'=>$data['disposisi_masuk_staf'],
                    'jabatan_id'=>null,
                    'unit_id'=>null,
                    'data'=> $data['disposisi_masuk_staf']
                );
                $addJobStaf = create_job($queueTubeRedis, $data_redis);
            }

            $updated_data = $response['data'];
            $properti->updated($updated_data['disposisi_masuk_properti'], $account_id, $updated_data, $updated_data['disposisi_masuk_nomor']);

            if($data['disposisi_model_sub'] == 1) { /* Jika Petikan */
                $stack_penerima = $surat_stack->read(array(
                    'surat_stack_surat'  => $data['surat_id'],
                    'surat_stack_staf'   => $data['disposisi_masuk_staf'],
                    'surat_stack_model'  => $surat_stack::MODEL_PETIKAN
                ));
            } else { /* Jika Penyetuju */
                $stack_penerima = $surat_stack->read(array(
                    'surat_stack_surat'  => $data['surat_id'],
                    'surat_stack_staf'   => $data['disposisi_masuk_staf'],
                    'surat_stack_model'  => $surat_stack::MODEL_PENYETUJU
                ));
            }

            if(isset($data['baca']) and $data['baca'] === 1 and $data['disposisi_masuk_isbaca'] !== 1){
                if($stack_penerima){
                    /*updating stack baca*/
                    $surat_stack->update($stack_penerima['surat_stack_id'], array(
                        'surat_stack_baca_tgl' => $data['disposisi_masuk_baca_tgl']
                    ));                    
                }
                $exist = $koreksi_masuk_log->read(array(
                    'disposisi_masuk_log_tipe' => 1,
                    'disposisi_masuk_log_staf' => $account_id,
                    'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                    'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                    'disposisi_masuk_log_tgl' => $now
                ));
                if (empty($exist)) {
                    $koreksi_masuk_log->insert(array(
                        'disposisi_masuk_log_tipe' => 1,
                        'disposisi_masuk_log_staf' => $account_id,
                        'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
                        'disposisi_masuk_log_masuk' => $data['disposisi_masuk_id'],
                        'disposisi_masuk_log_tgl' => $now
                    ), null, function($response){});   
                }
            }

            if($data['disposisi_model_sub'] == 1){ /* jika petikan */
                // pushEvent(array(
                //     'to' => $data['disposisi_masuk_staf'],
                //     'data' => array(
                //         'api' => 'koreksi_masuk',
                //         'id' => $id
                //     ),
                //     'group' => array('staf', 'asistensi'),
                //     'type' => 'draf'
                // ));

                /*get all petikan sort by level*/
                $petikan_records = $surat_stack->find(array(
                    'surat_stack_surat' => $data['surat_id'],
                    'surat_stack_model' => $surat_stack::MODEL_PETIKAN
                ), false, false, true, array('surat_stack_level'=>'asc'));

                /*get petikan by index*/
                $stack_petikan = $surat_stack->read(array(
                    'surat_stack_surat'  => $data['surat_id'],
                    'surat_stack_staf'   => $data['disposisi_masuk_staf'],
                    'surat_stack_model'  => $surat_stack::MODEL_PETIKAN
                ));

                $urut = $data['surat_petikan_setuju_isurut'];
                $key = $this->getIndex($petikan_records, $data);
                $current_record = $petikan_records[$key];
                $petikan_lvl = $key;

                if($urut){
                    $data_parent_path = $disposisi_masuk_lite_view->read($data['disposisi_masuk_id']);
                    $dispo_parent_path = $data_parent_path['disposisi_parent_path'];
                    $dispo_masuk_parent_path = $data_parent_path['disposisi_masuk_parent_path'];

                    if($data['disposisi_masuk_status_ttd']){
                        if ($use_ttd) {
                            $staf_ttd = $data['disposisi_masuk_status_ttd'];
                        } else {
                            $staf_ttd = null;
                            $ttd = explode(',', $data['disposisi_masuk_status_ttd']);
                            $me->saveTtd($ttd[1], $account_id);
                        }
                    }else{
                        $staf_ttd = null;
                    }

                    if($stack_petikan){ /*updating status and pesan*/
                        $surat_stack->update($stack_petikan['surat_stack_id'], array(
                            'surat_stack_pelaku'        => $account_id,
                            'surat_stack_pelaku_profil' => $stafProfil['staf_profil'],
                            'surat_stack_baca_tgl'      => $data['disposisi_masuk_baca_tgl'],
                            'surat_stack_status'        => $data['disposisi_masuk_status'],
                            'surat_stack_status_tgl'    => $now,
                            'surat_stack_status_ttd'    => $staf_ttd,
                            'surat_stack_komentar'      => ($data['disposisi_masuk_status'] === 0) ? NULL : $data['disposisi_masuk_pesan']
                        ));                    
                    }

                    /*send next koreksi*/
                    if($data['disposisi_masuk_status'] && !is_numeric($data['disposisi_masuk_status'])){
                        $data['disposisi_masuk_status'] = int($data['disposisi_masuk_status']);
                    }

                    $staf_next = null;
                    $staf_next_profil = null;

                    if($data['disposisi_masuk_status'] == $surat::SETUJU_TOLAK){
                        $prev_record = (array_key_exists($key-1, $petikan_records))? $petikan_records[$key-1]: null;
                        
                        if($prev_record){
                            $staf_next = $prev_record['surat_stack_staf'];
                            $staf_next_profil = $prev_record['surat_stack_profil'];
                        }else{
                            $staf_next = null;
                            $staf_next_profil = null;
                        }
                    }else if($data['disposisi_masuk_status'] == $surat::SETUJU_SETUJU){
                        /*if everyone is approving the Petikan*/
                        /*last penyetuju proceed to agenda surat*/

                        $next_record = (array_key_exists($key+1, $petikan_records))? $petikan_records[$key+1]: null;

                        if(!$next_record){
                            $surat_id = $data['surat_id'];

                            if($data['surat_model'] === $surat::MODEL_KEPUTUSAN) {
                                if($data['surat_nomor']){
                                    $surat_nomor = $data['surat_nomor'];
                                    $surat_nomor_format = $data['surat_nomor_format'];
                                    $surat_nomor_otomatis = $data['surat_nomor_otomatis'];
                                    $surat_nomor_tgl = $data['surat_nomor_tgl'];
                                    $surat_nomor_staf = $data['surat_nomor_staf'];
                                    $surat_nomor_profil = $data['surat_nomor_profil'];
                                    $surat_nomor_asli = $data['surat_nomor_asli'];
                                    $surat_nomor_urut = $data['surat_nomor_urut'];
                                    $surat_nomor_backdate = $data['surat_nomor_backdate'];
                                }else{
                                    $gen_nomor = $surat_view->generate_nomor($surat_id, 'keputusan', $petikan_records[$key]['surat_stack_staf']);                                
                                    if($auto_nomor_setting){
                                        $surat_nomor = $gen_nomor['nomor'];
                                        $surat_nomor_asli = $gen_nomor['nomor'];
                                        $surat_nomor_tgl = $now;
                                        $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_internal');
                                        $surat_nomor_otomatis = 1;
                                        $surat_nomor_staf = $petikan_records[$key]['surat_stack_staf'];
                                        $surat_nomor_profil = $petikan_records[$key]['surat_stack_profil'];
                                        $surat_nomor_urut = $gen_nomor['digit'];
                                        $surat_nomor_backdate = $gen_nomor['backdate'];
                                    }else{
                                        $surat_nomor_tgl = NULL;
                                        $surat_nomor_staf = NULL;
                                        $surat_nomor_profil = NULL;
                                        $surat_nomor_format = NULL;
                                        $surat_nomor_otomatis = NULL;
                                        $surat_nomor = NULL;
                                        $surat_nomor_asli = NULL;
                                        $surat_nomor_urut = NULL;
                                        $surat_nomor_backdate = NULL;
                                    }
                                }

                                $updated_record = array(
                                    'surat_petikan_setuju'  => $surat::SETUJU_SETUJU,
                                    'surat_nomor'           => $surat_nomor,
                                    'surat_nomor_tgl'       => $surat_nomor_tgl,
                                    'surat_nomor_staf'      => $surat_nomor_staf,
                                    'surat_nomor_profil'    => $surat_nomor_profil,
                                    'surat_nomor_otomatis'  => $surat_nomor_otomatis,
                                    'surat_nomor_format'    => $surat_nomor_format,
                                    'surat_nomor_asli'      => $surat_nomor_asli,
                                    'surat_nomor_urut'      => $surat_nomor_urut,
                                    'surat_nomor_backdate'  => $surat_nomor_backdate
                                );

                                $surat->update(array('surat_id' => $surat_id), $updated_record, function ($response) use ($surat, $surat_log, $account, $account_id, $surat_nomor, 
                                $data, $surat_id, $properti, $mergeData, $surat_view, $auto_nomor_setting, $pengaturan, $petikan_records, $now, $petikan_lvl, $queueTubeRedis, 
                                $stafProfil, $worker_mode, $dokumen, $queuetubeKeputusan, $auto_distribusi_setting){
                                    if ($response[$surat->successProperty] !== true) return;
                                    $updated_data = $response['data'];
                                    $surat_id = $updated_data['surat_id'];

                                    if(!$updated_data['surat_nomor']){
                                        if (Config()->item('queueServer')['host']) {
                                            $data_redis = array(
                                                'type'=>'KoreksiMasuk-Unit',
                                                'staf_id'=>null,
                                                'jabatan_id'=>null,
                                                'unit_id'=>$updated_data['surat_unit'],
                                                'data'=> $updated_data['surat_unit']
                                            );
                                            $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                        }

                                        // pushEvent(array(
                                        //     'to' => $updated_data['surat_unit'],
                                        //     'data' => array(
                                        //         'api' => 'surat_ikeluar',
                                        //         'id' => $surat_id
                                        //     ),
                                        //     'group' => array('unit'),
                                        //     'type' => 'surat_ikeluar'
                                        // ));
                                    }

                                    $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);

                                    $dataLogSetuju = array(
                                        'surat_log_tipe' => 27,
                                        'surat_log_setuju' => 2,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl']
                                    );
                                    $operation_log = $surat_log->insert($dataLogSetuju, null, function($response){});

                                    // create_docs_petikan SK Kolektif
                                });
                            }
                            return;

                        }else {
                            $staf_next = $next_record['surat_stack_staf'];
                            $staf_next_profil = $next_record['surat_stack_profil'];
                        }
                    }

                    if(!$staf_next){ /*if revisi from first petikan, set status REVISION*/
                        if($data['disposisi_masuk_status'] === $surat::SETUJU_TOLAK){
                            $update_stack = $surat_stack->update(array(
                                'surat_stack_surat' => $data['surat_id'],
                                'surat_stack_staf' => $data['surat_setuju_akhir_staf'],
                                'surat_stack_model' => $surat_stack::MODEL_PENYETUJU
                            ),array(
                                'surat_stack_komentar' => null,
                                'surat_stack_tgl' => null,
                                'surat_stack_status' => 0
                            ));

                            /*update status surat*/
                            $surat->update($data['surat_id'], array(
                                'surat_setuju' => $surat::SETUJU_PROSES,
                                'surat_setuju_tgl' => NULL,
                                'surat_petikan_setuju' => $surat::SETUJU_TOLAK
                            ));

                            $dataLogTolak = array(
                                'surat_log_tipe' => 27,
                                'surat_log_setuju' => 4,
                                'surat_log_surat'=>$data['surat_id'],
                                'surat_log_staf'=>$account_id,
                                'surat_log_profil'=>$stafProfil['staf_profil'],
                                'surat_log_tgl'=>$data['surat_setuju_tgl'],
                                'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                            );
                            
                            $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});

                            $koreksi->insert(array(
                                'disposisi_tgl'     => date('Y-m-d H:i:s'),
                                'disposisi_staf'    => $data['disposisi_masuk_staf'],
                                'disposisi_profil'  => $data['disposisi_masuk_profil'],
                                'disposisi_surat'   => $data['surat_id'],
                                'disposisi_induk'   => $data['disposisi_masuk_id'],
                                'disposisi_model'   => $koreksi::MODEL_KOREKSI,
                                'disposisi_model_sub' => 0,
                                'disposisi_baca_tgl'=> $now
                            ), null, function($response) use ($data, $properti, $koreksi, $account, $account_id, $dispo_parent_path, $dispo_masuk_parent_path, $koreksi_masuk_view, $queuetubeKoreksi, $worker_mode, $staf_model, $pengaturan, $notifikasi){
                                if ($response[$koreksi->successProperty] !== true) return;
                                $inserted_data = $response['data'];
                                $disposisi_id = $koreksi->get_insertid();

                                $updated_data = $koreksi->update($disposisi_id, array('disposisi_parent_path' => $dispo_parent_path.'/'.$disposisi_id));
                                $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                if($op){
                                    $koreksi->update($inserted_data['disposisi_id'], array(
                                        'disposisi_properti' => $op['properti_id']
                                    ));
                                }

                                $penyetuju_terakhir = $staf_model->read($data['surat_setuju_akhir_staf']);
                                $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                                $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');

                                $data_koreksi = array(
                                    'surat_id' => $data['disposisi_surat'],
                                    'surat_perihal' => $data['surat_perihal'],
                                    'surat_registrasi' => $data['surat_registrasi'],
                                    'disposisi_id' => $disposisi_id,
                                    'pengirim_id' => $data['disposisi_masuk_staf'],
                                    'pengirim_nama' => $data['disposisi_masuk_penerima_nama'],
                                    'penerima_id' => $data['surat_setuju_akhir_staf'],
                                    'penerima_profil' => $penyetuju_terakhir['staf_profil'],
                                    'type' => 'KoreksiMasuk-Staf',
                                    'dispo_parent_path' => $dispo_parent_path,
                                    'dispo_masuk_parent_path' => $dispo_masuk_parent_path,
                                    'penyetuju_akhir' => $data['surat_setuju_akhir_staf'],
                                    'use_notif_email' => $useNotifEmail,
                                    'use_notif_email_draft' => $useNotifEmailDraft
                                );

                                if($worker_mode == 'local'){
                                    $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                                }else{
                                    $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                                }

                                /*add ons*/
                                // $akunLogin = $account->get_profile();
                                // $data['distributor_nama'] = $akunLogin['staf_nama'];

                                // if($useNotifEmail && $useNotifEmailDraft){
                                //     $notifikasi->created('email', $data, $data['surat_setuju_akhir_staf'], NULL, 'draf');
                                // }
                            });
                        }
                    }
                    else if($staf_next){ /*create koreksi, send to next petikan*/
                        $update_stack = $surat_stack->update(array(
                            'surat_stack_surat' => $data['surat_id'],
                            'surat_stack_staf' => $staf_next,
                            'surat_stack_model' => $surat_stack::MODEL_PETIKAN
                        ),array(
                            'surat_stack_komentar' => null,
                            'surat_stack_tgl' => null,
                            'surat_stack_status' => 0));

                        $koreksi->insert(array(
                            'disposisi_tgl'     => date('Y-m-d H:i:s'),
                            'disposisi_staf'    => $data['disposisi_masuk_staf'],
                            'disposisi_profil'  => $data['disposisi_masuk_profil'],
                            'disposisi_surat'   => $data['surat_id'],
                            'disposisi_induk'   => $data['disposisi_masuk_id'],
                            'disposisi_model'   => $koreksi::MODEL_KOREKSI,
                            'disposisi_model_sub' => 1,
                            'disposisi_baca_tgl'=> $now
                        ), null, function($response) use ($data, $properti, $koreksi, $account, $account_id, $now, $koreksi_masuk, $staf_next, $staf_next_profil, $mergeData, $queueTube, $queueTubeRedis, $dispo_parent_path, $dispo_masuk_parent_path, $koreksi_masuk_view, $queuetubeKoreksi, $worker_mode, $pengaturan, $notifikasi){
                            if ($response[$koreksi->successProperty] !== true) return;
                            $inserted_data = $response['data'];
                            $disposisi_id = $koreksi->get_insertid();

                            $updated_data = $koreksi->update($disposisi_id, array('disposisi_parent_path' => $dispo_parent_path.'/'.$disposisi_id));
                            $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                            if($op){
                                $koreksi->update($inserted_data['disposisi_id'], array(
                                    'disposisi_properti' => $op['properti_id']
                                ));
                            }

                            $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                            $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');
                             
                            $data_koreksi = array(
                                'surat_id' => $data['disposisi_surat'],
                                'surat_perihal' => $data['surat_perihal'],
                                'surat_registrasi' => $data['surat_registrasi'],
                                'disposisi_id' => $disposisi_id,
                                'pengirim_id' => $data['disposisi_masuk_staf'],
                                'pengirim_nama' => $data['disposisi_masuk_penerima_nama'],
                                'penerima_id' => $staf_next,
                                'penerima_profil' => $staf_next_profil,
                                'type' => 'KoreksiMasuk-Staf',
                                'dispo_parent_path' => $dispo_parent_path,
                                'dispo_masuk_parent_path' => $dispo_masuk_parent_path,
                                'use_notif_email' => $useNotifEmail,
                                'use_notif_email_draft' => $useNotifEmailDraft
                            );

                            if($worker_mode == 'local'){
                                $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                            }else{
                                $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                            }

                            /*add ons*/
                            // $akunLogin = $account->get_profile();
                            // $data['distributor_nama'] = $akunLogin['staf_nama'];

                            // if($useNotifEmail && $useNotifEmailDraft){
                            //     $notifikasi->created('email', $data, $staf_next, NULL, 'draf');
                            // }
                        });
                    }
                }else{
                    $max_petikan = count($petikan_records);
                    $cek_all = array();
                    $cek_x = array();

                    if($stack_petikan){
                        if($data['disposisi_masuk_status_ttd']){
                            if ($use_ttd) {
                                $staf_ttd = $data['disposisi_masuk_status_ttd'];
                            } else {
                                $staf_ttd = null;
                                $ttd = explode(',', $data['disposisi_masuk_status_ttd']);
                                $me->saveTtd($ttd[1], $account_id);
                            }
                        }else{
                            $staf_ttd = null;
                        }

                        $surat_stack->update($stack_petikan['surat_stack_id'], array(
                            'surat_stack_pelaku'        => $account_id,
                            'surat_stack_pelaku_profil' => $stafProfil['staf_profil'],
                            'surat_stack_baca_tgl'      => $data['disposisi_masuk_baca_tgl'],
                            'surat_stack_status'        => $data['disposisi_masuk_status'],
                            'surat_stack_status_tgl'    => date('Y-m-d H:i:s'),
                            'surat_stack_status_ttd'    => $staf_ttd,
                            'surat_stack_komentar'      => $data['disposisi_masuk_pesan']
                        ));
                        /*update data in stack*/
                        $row['surat_stack_status'] = $data['disposisi_masuk_status'];
                    }
                        
                    $stack = $surat_stack->find(array(
                        'surat_stack_surat' => $data['surat_id'],
                        'surat_stack_model' => $surat_stack::MODEL_PETIKAN
                    ));

                    foreach($stack as $index => $row){
                        if($row['surat_stack_status'] == $surat::SETUJU_TOLAK){
                            array_push($cek_x, 1);
                        }

                        if(($row['surat_stack_status'] == $surat::SETUJU_SETUJU) || ($row['surat_stack_status'] == $surat::SETUJU_TOLAK)){
                            array_push($cek_all, 1);
                        }                    
                    }

                    if(count($cek_all) == $max_petikan){
                        $status = (count($cek_x) > 0)? $surat::SETUJU_TOLAK : $surat::SETUJU_SETUJU;
                        $surat_id = $data['surat_id'];
                        
                        if($data['surat_model'] === $surat::MODEL_IKELUAR){
                            if($data['surat_nomor']){
                                $surat_nomor = $data['surat_nomor'];
                                $surat_nomor_format = $data['surat_nomor_format'];
                                $surat_nomor_otomatis = $data['surat_nomor_otomatis'];
                                $surat_nomor_tgl = $data['surat_nomor_tgl'];
                                $surat_nomor_staf = $data['surat_nomor_staf'];
                                $surat_nomor_profil = $data['surat_nomor_profil'];
                                $surat_nomor_asli = $data['surat_nomor_asli'];
                                $surat_nomor_urut = $data['surat_nomor_urut'];
                                $surat_nomor_backdate = $data['surat_nomor_backdate'];
                            }else if($status === $surat::SETUJU_SETUJU){
                                $dataLogSetuju = array(
                                    'surat_log_tipe' => 5,
                                    'surat_log_setuju' => 2,
                                    'surat_log_surat'=>$data['surat_id'],
                                    'surat_log_staf'=>$account_id,
                                    'surat_log_tgl'=>$now
                                );
                                $operation_logSetuju = $surat_log->insert($dataLogSetuju, null, function($response){});

                                $gen_nomor = $surat_view->generate_nomor($surat_id, 'ikeluar', $petikan_records[$petikan_lvl]['surat_stack_staf']);
                                if($auto_nomor_setting){
                                    $surat_nomor = $gen_nomor['nomor'];
                                    $surat_nomor_asli = $gen_nomor['nomor'];
                                    $surat_nomor_tgl = $now;
                                    $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_internal');
                                    $surat_nomor_otomatis = 1;
                                    $surat_nomor_staf = $petikan_records[$petikan_lvl]['surat_stack_staf'];
                                    $surat_nomor_profil = $petikan_records[$petikan_lvl]['surat_stack_profil'];
                                    $surat_nomor_urut = $gen_nomor['digit'];
                                    $surat_nomor_backdate = $gen_nomor['backdate'];
                                }else{
                                    $surat_nomor_tgl = NULL;
                                    $surat_nomor_staf = NULL;
                                    $surat_nomor_profil = NULL;
                                    $surat_nomor_format = NULL;
                                    $surat_nomor_otomatis = NULL;
                                    $surat_nomor = NULL;
                                    $surat_nomor_asli = NULL;
                                    $surat_nomor_urut = NULL;
                                    $surat_nomor_backdate = NULL;
                                }
                            }else{
                                $surat_nomor_tgl = NULL;
                                $surat_nomor_staf = NULL;
                                $surat_nomor_profil = NULL;
                                $surat_nomor_format = NULL;
                                $surat_nomor_otomatis = NULL;
                                $surat_nomor = NULL;
                                $surat_nomor_asli = NULL;
                                $surat_nomor_urut = NULL;
                                $surat_nomor_backdate = NULL;
                            }

                            if ($status == $surat::SETUJU_SETUJU) {
                                $data_surat = array(
                                    'surat_nomor'           => $surat_nomor,
                                    'surat_petikan_setuju'  => $surat::SETUJU_SETUJU,
                                    'surat_nomor_tgl'       => $surat_nomor_tgl,
                                    'surat_nomor_staf'      => $surat_nomor_staf,
                                    'surat_nomor_profil'    => $surat_nomor_profil,
                                    'surat_nomor_otomatis'  => $surat_nomor_otomatis,
                                    'surat_nomor_format'    => $surat_nomor_format,
                                    'surat_nomor_asli'      => $surat_nomor_asli,
                                    'surat_nomor_urut'      => $surat_nomor_urut,
                                    'surat_nomor_backdate'  => $surat_nomor_backdate
                                );
                            }else{
                                $data_surat = array(
                                    'surat_nomor'           => $surat_nomor,
                                    'surat_petikan_setuju'  => $surat::SETUJU_SETUJU,
                                    'surat_nomor_tgl'       => $surat_nomor_tgl,
                                    'surat_nomor_staf'      => $surat_nomor_staf,
                                    'surat_nomor_profil'    => $surat_nomor_profil,
                                    'surat_nomor_otomatis'  => $surat_nomor_otomatis,
                                    'surat_nomor_format'    => $surat_nomor_format,
                                    'surat_nomor_asli'      => $surat_nomor_asli,
                                    'surat_nomor_urut'      => $surat_nomor_urut,
                                    'surat_nomor_backdate'  => $surat_nomor_backdate
                                );
                            }

                            $surat->update(array('surat_id' => $surat_id), $data_surat, function ($response) use ($surat, $surat_nomor, $surat_view, $surat_log, $account_id, $data, $surat_id, $properti, $mergeData, $pengaturan, $petikan_records, $petikan_lvl, $now, $auto_nomor_setting, $queueTubeRedis, $stafProfil){

                                if ($response[$surat->successProperty] !== true) return;
                                $updated_data = $response['data'];

                                if (Config()->item('queueServer')['host']) {
                                    $data_redis = array(
                                        'type'=>'KoreksiMasuk-Unit',
                                        'staf_id'=>null,
                                        'jabatan_id'=>null,
                                        'unit_id'=>$updated_data['surat_unit'],
                                        'data'=> $updated_data['surat_unit']
                                    );
                                    $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                }

                                $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);

                                // pushEvent(array(
                                //     'to' => $updated_data['surat_unit'],
                                //     'data' => array(
                                //         'api' => 'surat_ikeluar',
                                //         'id' => $surat_id
                                //     ),
                                //     'group' => array('unit'),
                                //     'type' => 'surat_ikeluar'
                                // ));
                            });
                        }
                    }
                }
            }else{

                // pushEvent(array(
                //     'to' => $data['disposisi_masuk_staf'],
                //     'data' => array(
                //         'api' => 'koreksi_masuk',
                //         'id' => $id
                //     ),
                //     'group' => array('staf', 'asistensi'),
                //     'type' => 'draf'
                // ));

                /*get records for all penerima ordered by level*/
                $penerima_records = $surat_stack->find(array(
                    'surat_stack_surat' => $data['surat_id'],
                    'surat_stack_model' => $surat_stack::MODEL_PENYETUJU
                ), false, false, true, array('surat_stack_level'=>'asc'));

                /*get level penerima by index of $penerima_records*/
                $stack_penerima = $surat_stack->read(array(
                    'surat_stack_surat'  => $data['surat_id'],
                    'surat_stack_staf'   => $data['disposisi_masuk_staf'],
                    'surat_stack_model'  => $surat_stack::MODEL_PENYETUJU
                ));
                    
                $key = $this->getIndex($penerima_records, $data);
                $current_record = $penerima_records[$key];
                $penerima_lvl = $key;
                $urut = $data['surat_setuju_isurut'];

                if($urut){
                    $data_parent_path = $disposisi_masuk_lite_view->read($data['disposisi_masuk_id']);
                    $dispo_parent_path = $data_parent_path['disposisi_parent_path'];
                    $dispo_masuk_parent_path = $data_parent_path['disposisi_masuk_parent_path'];

                    if($data['disposisi_masuk_status_ttd']){
                        if ($use_ttd) {
                            $staf_ttd = $data['disposisi_masuk_status_ttd'];
                        } else {
                            $staf_ttd = null;
                            $ttd = explode(',', $data['disposisi_masuk_status_ttd']);
                            $me->saveTtd($ttd[1], $account_id);
                        }
                    }else{
                        $staf_ttd = null;
                    }

                    /*send next koreksi*/
                    if($data['disposisi_masuk_status'] && !is_numeric($data['disposisi_masuk_status'])){
                        $data['disposisi_masuk_status'] = int($data['disposisi_masuk_status']);
                    }

                    if($stack_penerima){
                        /*updating status and pesan*/
                        $surat_stack->update($stack_penerima['surat_stack_id'], array(
                            'surat_stack_pelaku'        => $account_id,
                            'surat_stack_pelaku_profil' => $stafProfil['staf_profil'],
                            'surat_stack_baca_tgl'      => $data['disposisi_masuk_baca_tgl'],
                            'surat_stack_status'        => $data['disposisi_masuk_status'],
                            'surat_stack_status_tgl'    => $now,
                            'surat_stack_status_ttd'    => $staf_ttd,
                            'surat_stack_komentar'      => ($data['disposisi_masuk_status'] === 0) ? NULL : $data['disposisi_masuk_pesan']
                        ));                    
                    }

                    $staf_next = null;
                    $staf_next_profil = null;
                
                    if($data['disposisi_masuk_status'] == $surat::SETUJU_TOLAK){
                        $prev_record = (array_key_exists($key-1,$penerima_records))? $penerima_records[$key-1]: null;
                        
                        if($prev_record){
                            $staf_next = $prev_record['surat_stack_staf'];
                            $staf_next_profil = $prev_record['surat_stack_profil'];
                        }else{
                            $staf_next = null;
                            $staf_next_profil = null;
                        }
                    }else if($data['disposisi_masuk_status'] == $surat::SETUJU_SETUJU){
                        /*if everyone is approving the koreksi*/
                        /*last penyetuju proceed to agenda surat*/

                        $next_record = (array_key_exists($key+1,$penerima_records))? $penerima_records[$key+1]: null;

                        if(!$next_record){
                            $surat_id = $data['surat_id'];

                            if($data['surat_model'] === $surat::MODEL_KELUAR){
                                if($data['surat_nomor']){
                                    $surat_nomor = $data['surat_nomor'];
                                    $surat_nomor_asli = $data['surat_nomor_asli'];
                                    $surat_nomor_backdate = $data['surat_nomor_backdate'];
                                    $surat_nomor_urut = $data['surat_nomor_urut'];
                                    $surat_nomor_format = $data['surat_nomor_format'];
                                    $surat_nomor_otomatis = $data['surat_nomor_otomatis'];
                                    $surat_nomor_tgl = $data['surat_nomor_tgl'];
                                    $surat_nomor_staf = $data['surat_nomor_staf'];
                                    $surat_nomor_profil = $data['surat_nomor_profil'];
                                }else{
                                    $gen_nomor = $surat_view->generate_nomor($surat_id, 'keluar', $penerima_records[$penerima_lvl]['surat_stack_staf'], true, $tgl);
                                    if($auto_nomor_keluar_setting){
                                    if(($data['surat_tanggal'] < $data['surat_properti_buat_tgl']) || $data['surat_isbackdate']){
                                            $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_keluar_backdate');
                                        }else{
                                            $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_keluar');
                                        }
                                        $surat_nomor_otomatis = 1;
                                        $surat_nomor = $gen_nomor['nomor'];
                                        $surat_nomor_asli = $gen_nomor['nomor'];
                                        $surat_nomor_backdate = $gen_nomor['backdate'];
                                        $surat_nomor_urut = $gen_nomor['digit'];
                                        $surat_nomor_tgl = $now;
                                        $surat_nomor_staf = $penerima_records[$penerima_lvl]['surat_stack_staf'];
                                        $surat_nomor_profil = $penerima_records[$penerima_lvl]['surat_stack_profil'];
                                    }else{
                                        $surat_nomor_tgl = NULL;
                                        $surat_nomor_format = NULL;
                                        $surat_nomor_otomatis = NULL;
                                        $surat_nomor_staf = NULL;
                                        $surat_nomor_profil = NULL;
                                        $surat_nomor = NULL;
                                        $surat_nomor_asli = NULL;
                                        $surat_nomor_backdate = NULL;
                                        $surat_nomor_urut = NULL;
                                    }
                                }

                                $surat->update(array(
                                    'surat_id' => $surat_id), array(
                                    'surat_setuju'          => $surat::SETUJU_SETUJU,
                                    'surat_setuju_tgl'      => $now,
                                    'surat_setuju_staf'     => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                    'surat_setuju_profil'   => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                    'surat_distribusi_tgl'  => $now,
                                    'surat_distribusi_staf' => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                    'surat_distribusi_profil' => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                    'surat_nomor'           => $surat_nomor,
                                    'surat_nomor_asli'      => $surat_nomor_asli,
                                    'surat_nomor_urut'      => $surat_nomor_urut,
                                    'surat_nomor_backdate'  => $surat_nomor_backdate,
                                    'surat_nomor_tgl'       => $surat_nomor_tgl,
                                    'surat_nomor_staf'      => $surat_nomor_staf,
                                    'surat_nomor_profil'    => $surat_nomor_profil,                                    
                                    'surat_nomor_otomatis'  => $surat_nomor_otomatis,
                                    'surat_nomor_format'    => $surat_nomor_format
                                ), function ($response) use ($surat, $surat_log, $account_id, $data, $surat_id, $properti, $surat_nomor,
                                    $mergeData, $surat_view, $auto_nomor_keluar_setting, $penerima_records, $pengaturan, $now, 
                                    $penerima_lvl, $queueTubeRedis, $stafProfil){
                                    if ($response[$surat->successProperty] !== true) return;
                                    $updated_data = $response['data'];
                                    if(!$updated_data['surat_nomor']){
                                        if (Config()->item('queueServer')['host']) {
                                            $data_redis = array(
                                                'type'=>'KoreksiMasuk-Unit',
                                                'staf_id'=>null,
                                                'jabatan_id'=>null,
                                                'unit_id'=>$updated_data['surat_unit'],
                                                'data'=> $updated_data['surat_unit']
                                            );
                                            $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                        }

                                        // pushEvent(array(
                                        //     'to' => $updated_data['surat_unit'],
                                        //     'data' => array(
                                        //         'api' => 'surat_keluar',
                                        //         'id' => $surat_id
                                        //     ),
                                        //     'group' => array('unit'),
                                        //     'type' => 'surat_keluar'
                                        // ));
                                    }
                                    if($mergeData && $surat_nomor) $surat->compiledDataWithDokumen($surat_id);
                                    $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                    // $surat_log->created($account_id, $updated_data);

                                    /*log disetujui*/
                                    $dataLogSetuju = array(
                                        'surat_log_tipe' => 5,
                                        'surat_log_setuju' => 2,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl']
                                    );
                                    $operation_log = $surat_log->insert($dataLogSetuju, null, function($response){});
                                    
                                    /*log didistribusikan*/
                                    $dataLog2 = array(  
                                        'surat_log_tipe' => 7,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$now
                                    );
                                    $operation_log2 = $surat_log->insert($dataLog2, null, function($response){});
                                });
                            }else if($data['surat_model'] === $surat::MODEL_IKELUAR){
                                if($data['surat_nomor']){
                                    $surat_nomor = $data['surat_nomor'];
                                    $surat_nomor_asli = $data['surat_nomor_asli'];
                                    $surat_nomor_format = $data['surat_nomor_format'];
                                    $surat_nomor_otomatis = $data['surat_nomor_otomatis'];
                                    $surat_nomor_tgl = $data['surat_nomor_tgl'];
                                    $surat_nomor_staf = $data['surat_nomor_staf'];
                                    $surat_nomor_profil = $data['surat_nomor_profil'];
                                    $surat_nomor_urut = $data['surat_nomor_urut'];
                                    $surat_nomor_backdate = $data['surat_nomor_backdate'];
                                }else{
                                    $gen_nomor = $surat_view->generate_nomor($surat_id, 'ikeluar', $penerima_records[$penerima_lvl]['surat_stack_staf']);                                
                                    if($auto_nomor_setting){
                                        $surat_nomor = $gen_nomor['nomor'];
                                        $surat_nomor_asli = $gen_nomor['nomor'];
                                        $surat_nomor_tgl = $now;
                                        $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_internal');
                                        $surat_nomor_otomatis = 1;
                                        $surat_nomor_staf = $penerima_records[$penerima_lvl]['surat_stack_staf'];
                                        $surat_nomor_profil = $penerima_records[$penerima_lvl]['surat_stack_profil'];
                                        $surat_nomor_urut = $gen_nomor['digit'];
                                        $surat_nomor_backdate = $gen_nomor['backdate'];
                                    }else{
                                        $surat_nomor_tgl = NULL;
                                        $surat_nomor_staf = NULL;
                                        $surat_nomor_profil = NULL;
                                        $surat_nomor_format = NULL;
                                        $surat_nomor_otomatis = NULL;
                                        $surat_nomor = NULL;
                                        $surat_nomor_asli = NULL;
                                        $surat_nomor_urut = NULL;
                                        $surat_nomor_backdate = NULL;
                                    }
                                }
                                $updated_record = array(
                                    'surat_setuju'           => $surat::SETUJU_SETUJU,
                                    'surat_setuju_tgl'       => $now,
                                    'surat_setuju_staf'      => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                    'surat_setuju_profil'    => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                    'surat_selesai_tgl'      => $now,
                                    'surat_selesai_staf'     => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                    'surat_selesai_profil'   => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                    'surat_nomor'            => $surat_nomor,
                                    'surat_nomor_asli'       => $surat_nomor_asli,
                                    'surat_nomor_tgl'        => $surat_nomor_tgl,
                                    'surat_nomor_staf'       => $surat_nomor_staf,
                                    'surat_nomor_profil'     => $surat_nomor_profil,
                                    'surat_nomor_otomatis'   => $surat_nomor_otomatis,
                                    'surat_nomor_format'     => $surat_nomor_format,
                                    'surat_nomor_urut'       => $surat_nomor_urut,
                                    'surat_nomor_backdate'   => $surat_nomor_backdate
                                );
    
                                $surat->update(array(
                                        'surat_id' => $surat_id), $updated_record, function ($response) use ($surat, $surat_log, $account_id, 
                                            $surat_nomor, $data, $surat_id, $properti, $mergeData, $surat_view, $auto_nomor_setting, 
                                            $pengaturan, $penerima_records, $now, $penerima_lvl, $queueTubeRedis, $stafProfil){
                                if ($response[$surat->successProperty] !== true) return;

                                    $updated_data = $response['data'];
                                    if(!$updated_data['surat_nomor']){
                                        if (Config()->item('queueServer')['host']) {
                                            $data_redis = array(
                                                'type'=>'KoreksiMasuk-Unit',
                                                'staf_id'=>null,
                                                'jabatan_id'=>null,
                                                'unit_id'=>$updated_data['surat_unit'],
                                                'data'=> $updated_data['surat_unit']
                                            );
                                            $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                        }

                                        // pushEvent(array(
                                        //     'to' => $updated_data['surat_unit'],
                                        //     'data' => array(
                                        //         'api' => 'surat_ikeluar',
                                        //         'id' => $surat_id
                                        //     ),
                                        //     'group' => array('unit'),
                                        //     'type' => 'surat_ikeluar'
                                        // ));
                                    }

                                    if($mergeData && $surat_nomor) $surat->compiledDataWithDokumen($surat_id);
                                    $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);

                                    $dataLogSetuju = array(
                                        'surat_log_tipe' => 5,
                                        'surat_log_setuju' => 2,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl']
                                    );
                                    $operation_log = $surat_log->insert($dataLogSetuju, null, function($response){});
                                });
                            } else if($data['surat_model'] === $surat::MODEL_KEPUTUSAN) {
                                if ($data['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN) {
                                    $updated_record = array(
                                        'surat_setuju'           => $surat::SETUJU_SETUJU,
                                        'surat_setuju_tgl'       => $now,
                                        'surat_setuju_staf'      => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                        'surat_setuju_profil'    => $penerima_records[$penerima_lvl]['surat_stack_profil']
                                    );
    
                                    $surat->update(array(
                                        'surat_id' => $surat_id), $updated_record, function ($response) use ($surat, $surat_log, $account_id, 
                                            $data, $surat_id, $properti, $mergeData, $surat_view, $auto_nomor_setting, 
                                            $pengaturan, $penerima_records, $now, $penerima_lvl, $queueTubeRedis, $stafProfil){
                                        if ($response[$surat->successProperty] !== true) return;
    
                                        $updated_data = $response['data'];
                                        if(!$updated_data['surat_nomor']){
                                            if (Config()->item('queueServer')['host']) {
                                                $data_redis = array(
                                                    'type'=>'KoreksiMasuk-Unit',
                                                    'staf_id'=>null,
                                                    'jabatan_id'=>null,
                                                    'unit_id'=>$updated_data['surat_unit'],
                                                    'data'=> $updated_data['surat_unit']
                                                );
                                                $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                            }
    
                                            // pushEvent(array(
                                            //     'to' => $updated_data['surat_unit'],
                                            //     'data' => array(
                                            //         'api' => 'surat_ikeluar',
                                            //         'id' => $surat_id
                                            //     ),
                                            //     'group' => array('unit'),
                                            //     'type' => 'surat_ikeluar'
                                            // ));
                                        }
                                        // if($mergeData && $surat_nomor) $surat->compiledDataWithDokumen($surat_id);
                                        $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);

                                        $dataLogSetuju = array(
                                            'surat_log_tipe' => 5,
                                            'surat_log_setuju' => 2,
                                            'surat_log_surat'=>$updated_data['surat_id'],
                                            'surat_log_staf'=>$account_id,
                                            'surat_log_profil'=>$stafProfil['staf_profil'],
                                            'surat_log_tgl'=>$updated_data['surat_setuju_tgl']
                                        );
                                        $operation_log = $surat_log->insert($dataLogSetuju, null, function($response){});
                                    });
                                }else{
                                    /* process to penyetuju petikan */
                                    $surat->update(array(
                                        'surat_id' => $surat_id), array(
                                        'surat_setuju'           => $surat::SETUJU_SETUJU,
                                        'surat_petikan_setuju'   => $surat::SETUJU_PROSES,
                                        'surat_setuju_tgl'       => $now,
                                        'surat_setuju_staf'      => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                        'surat_setuju_profil'    => $penerima_records[$penerima_lvl]['surat_stack_profil']
                                    ), function ($response) use ($surat, $surat_log, $account_id, $data, $properti, $stafProfil){
                                        if ($response[$surat->successProperty] !== true) return;
                                        $updated_data = $response['data'];                                        
                                        $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                        
                                        $dataLogSetuju = array(
                                            'surat_log_tipe' => 5,
                                            'surat_log_setuju' => 2,
                                            'surat_log_surat'=>$updated_data['surat_id'],
                                            'surat_log_staf'=>$account_id,
                                            'surat_log_profil'=>$stafProfil['staf_profil'],
                                            'surat_log_tgl'=>$updated_data['surat_setuju_tgl']
                                        );
                                        $operation_log = $surat_log->insert($dataLogSetuju, null, function($response){});
                                    });

                                    /*get records stack petikan*/
                                    $petikan_records = $surat_stack->find(array(
                                        'surat_stack_surat' => $data['surat_id'],
                                        'surat_stack_model' => $surat_stack::MODEL_PETIKAN
                                    ), false, false, true, array('surat_stack_level'=>'asc'));

                                    /* send to petikan */
                                    $first_petikan = (array_key_exists(0,$petikan_records))? $petikan_records[0]: null;
                                    $update_stack = $surat_stack->update(array(
                                        'surat_stack_surat' => $data['surat_id'],
                                        'surat_stack_staf' => $first_petikan['surat_stack_staf'],
                                        'surat_stack_model' => $surat_stack::MODEL_PETIKAN
                                    ),array(
                                        'surat_stack_komentar' => null,
                                        'surat_stack_tgl' => null,
                                        'surat_stack_status' => 0));
            
                                    $koreksi->insert(array(
                                        'disposisi_tgl'     => date('Y-m-d H:i:s'),
                                        'disposisi_staf'    => $data['disposisi_masuk_staf'],
                                        'disposisi_profil'  => $data['disposisi_masuk_profil'],
                                        'disposisi_surat'   => $data['surat_id'],
                                        'disposisi_induk'   => $data['disposisi_masuk_id'],
                                        'disposisi_model'   => $koreksi::MODEL_KOREKSI,
                                        'disposisi_model_sub' => 1,
                                        'disposisi_baca_tgl'=> $now
                                    ), null, function($response) use ($data, $properti, $koreksi, $account, $account_id, $now, $koreksi_masuk, $staf_next, $first_petikan, $staf_next_profil, $mergeData, $queueTube, $queueTubeRedis, $dispo_parent_path, $dispo_masuk_parent_path, $koreksi_masuk_view, $queuetubeKoreksi, $worker_mode, $pengaturan, $notifikasi){
                                        if ($response[$koreksi->successProperty] !== true) return;
                                        $inserted_data = $response['data'];
                                        $disposisi_id = $koreksi->get_insertid();
                                        $updated_data = $koreksi->update($disposisi_id, array('disposisi_parent_path' => $dispo_parent_path.'/'.$disposisi_id));

                                        $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                        if($op){
                                            $koreksi->update($inserted_data['disposisi_id'], array(
                                                'disposisi_properti' => $op['properti_id']
                                            ));
                                        }

                                        $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                                        $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');
                                         
                                        $data_koreksi = array(
                                            'surat_id' => $data['disposisi_surat'],
                                            'surat_perihal' => $data['surat_perihal'],
                                            'surat_registrasi' => $data['surat_registrasi'],
                                            'disposisi_id' => $disposisi_id,
                                            'pengirim_id' => $data['disposisi_masuk_staf'],
                                            'pengirim_nama' => $data['disposisi_masuk_penerima_nama'],
                                            'penerima_id' => $first_petikan['surat_stack_staf'],
                                            'penerima_profil' => $first_petikan['surat_stack_profil'],
                                            'type' => 'KoreksiMasuk-Staf',
                                            'dispo_parent_path' => $dispo_parent_path,
                                            'dispo_masuk_parent_path' => $dispo_masuk_parent_path,
                                            'petikan_awal' => $first_petikan,
                                            'use_notif_email' => $useNotifEmail,
                                            'use_notif_email_draft' => $useNotifEmailDraft
                                        );
        
                                        if($worker_mode == 'local'){
                                            $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                                        }else{
                                            $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                                        }
                                        
                                        /*add ons*/
                                        // $akunLogin = $account->get_profile();
                                        // $data['distributor_nama'] = $akunLogin['staf_nama'];

                                        // if($useNotifEmail && $useNotifEmailDraft){
                                        //     $notifikasi->created('email', $data, $first_petikan['surat_stack_staf'], NULL, 'draf');
                                        // }
                                    });
                                }
                            }

                            if($data['surat_model'] === $surat::MODEL_KELUAR){
                                if($auto_nomor_keluar_setting || $data['surat_nomor']){
                                    $stack = $surat_stack->find(array(
                                        'surat_stack_surat'     => $data['surat_id'],
                                        'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                                    )); 
                                    if(!empty($stack)){
                                        $koreksi_operation = $koreksi->insert(
                                            array(
                                                'disposisi_tgl'      => $now,
                                                'disposisi_pelaku'   => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                                'disposisi_pelaku_profil' => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                                'disposisi_staf'     => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                                'disposisi_profil'   => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                                'disposisi_model'    => $koreksi::MODEL_DISPOSISI,
                                                'disposisi_surat'    => $data['surat_id'],
                                                'disposisi_baca_tgl' => $now
                                            ),null,
                                            function($response) use($koreksi, $koreksi_masuk, $surat_view, $stack, $surat_stack, $data, 
                                                $surat_log, $properti, $account_id, $queueTube, $penerima_records, $penerima_lvl, $staf_model,
                                                $queueTubeRedis, $worker_mode, $queuetubeDisposisi, $disposisi_masuk_view){

                                                if($response[$koreksi->successProperty] !== true) return;

                                                $inserted_data = $response['data'];
                                                $koreksi_id = $inserted_data['disposisi_id'];
                                                $count_penerima = count($stack);
                                                $query = "INSERT INTO disposisi_jumlah_penerima (disposisi_masuk_disposisi, disposisi_jumlah_penerima) VALUES('".$koreksi_id."', ".$count_penerima.")";
                                                $result = $this->db->query($query);
                                                /*insert properti*/
                                                $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                                if($op){
                                                    $koreksi->update($inserted_data['disposisi_id'], array(
                                                        'disposisi_properti' => $op['properti_id']
                                                    ));
                                                }

                                                if(!is_array($stack)){
                                                    $stack = array();
                                                }
                                                
                                                foreach ($stack as $index => $p) {
                                                    if (is_string($p)) {
                                                        $penerima_id = $p;
                                                    } else if (is_object($p)) {
                                                        $penerima_id = property_exists($p, 'surat_stack_staf') ? $p->surat_stack_staf : null;
                                                        // $tembusan = property_exists($p, 'surat_stack_istembusan') ? $p->surat_stack_istembusan : null;
                                                        // $berkas = property_exists($p, 'surat_stack_isberkas') ? $p->surat_stack_isberkas : null;
                                                    } else if (is_array($p)) {
                                                        $penerima_id = array_key_exists('surat_stack_staf', $p) ? $p['surat_stack_staf'] : null;
                                                        // $tembusan = array_key_exists($p, 'surat_stack_istembusan') ? $p->surat_stack_istembusan : null;
                                                        // $berkas = array_key_exists($p, 'surat_stack_isberkas') ? $p->surat_stack_isberkas : null;
                                                    }

                                                    if (empty($penerima_id)) {
                                                        continue;
                                                    }

                                                    $profil = $staf_model->read($penerima_id);

                                                    $data_diposisi_masuk = array(
                                                        'disposisi_id' => $koreksi_id,
                                                        'disposisi_masuk_profil' => $profil['staf_profil'],
                                                        'dispo_masuk_parent' => null,
                                                        'penerima_id' => $penerima_id,
                                                        'penerima_jabatan' => null,
                                                        'pengirim_id' => $account_id,
                                                        'berkas' => $data['surat_useberkas'],
                                                        'tembusan' => 1,
                                                        'key_redis' => Config()->item('redisPrefix').'disposisi_sama:'.$inserted_data['disposisi_surat'].'-'.$penerima_id
                                                    );
                                                    if($worker_mode == 'local'){
                                                        $create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
                                                    }else{
                                                        $addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
                                                    }
                                                }
                                            }
                                        );
                                    }
                                }
                            }else if($data['surat_model'] === $surat::MODEL_IKELUAR){
                                if($auto_nomor_setting || $data['surat_nomor']){
                                    $updated_record = array(
                                        'surat_distribusi_tgl'   => $now,
                                        'surat_distribusi_staf'  => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                        'surat_distribusi_profil'  => $penerima_records[$penerima_lvl]['surat_stack_profil']
                                    );

                                    $surat->update(array(
                                            'surat_id' => $surat_id), $updated_record, function ($response) use ($surat, $surat_log, $account_id, 
                                                $data, $surat_id, $surat_view, $auto_distribusi_setting, $pengaturan, $now, $stafProfil){
                                        if ($response[$surat->successProperty] !== true) return;
                                        $updated_data = $response['data'];
                                        /*log didistribusikan*/
                                        $dataLog2 = array(  
                                            'surat_log_tipe' => 7,
                                            'surat_log_surat'=>$updated_data['surat_id'],
                                            'surat_log_staf'=>$account_id,
                                            'surat_log_profil'  => $stafProfil['staf_profil'],
                                            'surat_log_tgl'=>$now
                                        );
                                        $operation_log2 = $surat_log->insert($dataLog2, null, function($response){});
                                        $surat_view->create_imasuk($account_id, $updated_data, $auto_distribusi_setting);
                                    });
                                }
                            }else if($data['surat_model'] === $surat::MODEL_KEPUTUSAN && $data['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN){
                                // create_docs_petikan SK perorangan
                            }
                            return;
                        }else {
                            $staf_next = $next_record['surat_stack_staf'];
                            $staf_next_profil = $next_record['surat_stack_profil'];
                        }
                    }

                    /*if TOLAK from first penyetuju, set status REVISION*/
                    if(!$staf_next){
                        $surat_id = $data['surat_id'];
                        
                        if($data['disposisi_masuk_status'] === $surat::SETUJU_SETUJU || $data['disposisi_masuk_status'] === $surat::SETUJU_TOLAK){
                            /*updating status surat*/
                            $dist_tgl = ($data['disposisi_masuk_status'] === $surat::SETUJU_TOLAK)? null : $now;
                            $dist_staf = ($data['disposisi_masuk_status'] === $surat::SETUJU_TOLAK)? null : $data['disposisi_masuk_staf'];
                            $dist_profil = ($data['disposisi_masuk_status'] === $surat::SETUJU_TOLAK)? null : $data['disposisi_masuk_profil'];
                            
                            if($data['surat_model'] === $surat::MODEL_IKELUAR){
                                $surat->update(array(
                                    'surat_id' => $surat_id), array(
                                    'surat_setuju' => $data['disposisi_masuk_status'],
                                    'surat_setuju_tgl' => $now,
                                    'surat_setuju_staf' => $data['disposisi_masuk_staf'],
                                    'surat_setuju_profil' => $data['disposisi_masuk_profil'],
                                    'surat_selesai_tgl' => $dist_tgl,
                                    'surat_selesai_staf' => $dist_staf,
                                    'surat_selesai_profil' => $dist_profil
                                ), function ($response) use ($surat, $surat_log, $account_id, $data, $surat_id, $properti, $mergeData, 
                                    $queueTubeRedis, $stafProfil){
                                    if ($response[$surat->successProperty] !== true) return;
                                    $updated_data = $response['data'];
                                    if (Config()->item('queueServer')['host']) {
                                        $data_redis = array(
                                            'type'=>'KoreksiMasuk-Unit',
                                            'staf_id'=>null,
                                            'jabatan_id'=>null,
                                            'unit_id'=>$updated_data['surat_unit'],
                                            'data'=> $updated_data['surat_unit']
                                        );
                                        $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                    }

                                    // pushEvent(array(
                                    //     'to' => $updated_data['surat_unit'],
                                    //     'data' => array(
                                    //         'api' => 'surat_ikeluar',
                                    //         'id' => $surat_id
                                    //     ),
                                    //     'group' => array('unit'),
                                    //     'type' => 'surat_ikeluar'
                                    // ));
                                    
                                    $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                    

                                    //log revisi
                                    $dataLogTolak = array(
                                        'surat_log_tipe' => 5,
                                        'surat_log_setuju' => 4,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl'],
                                        'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                                    );
                                    
                                    $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});
                                });
                            } else if($data['surat_model'] === $surat::MODEL_KELUAR){
                                $surat->update(array(
                                    'surat_id' => $surat_id), array(
                                    'surat_setuju' => $data['disposisi_masuk_status'],
                                    'surat_setuju_tgl' => $now,
                                    'surat_setuju_staf' => $data['disposisi_masuk_staf'],
                                    'surat_setuju_profil' => $data['disposisi_masuk_profil']
                                ), function ($response) use ($surat, $surat_log, $account_id, $data, $surat_id, $properti, $mergeData, 
                                    $queueTubeRedis, $stafProfil){
                                    if ($response[$surat->successProperty] !== true) return;
                                    $updated_data = $response['data'];

                                    if (Config()->item('queueServer')['host']) {
                                        $data_redis = array(
                                            'type'=>'KoreksiMasuk-Unit',
                                            'staf_id'=>null,
                                            'jabatan_id'=>null,
                                            'unit_id'=>$updated_data['surat_unit'],
                                            'data'=> $updated_data['surat_unit']
                                        );
                                        $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                    }

                                    // pushEvent(array(
                                    //     'to' => $updated_data['surat_unit'],
                                    //     'data' => array(
                                    //         'api' => 'surat_keluar',
                                    //         'id' => $surat_id
                                    //     ),
                                    //     'group' => array('unit'),
                                    //     'type' => 'surat_keluar'
                                    // ));

                                    $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                    $dataLogTolak = array(
                                        'surat_log_tipe' => 5,
                                        'surat_log_setuju' => 4,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl'],
                                        'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                                    );
                                    $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});
                                });
                            } else if($data['surat_model'] === $surat::MODEL_KEPUTUSAN){
                                if ($data['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN) {
                                    $surat->update(array(
                                        'surat_id' => $surat_id), array(
                                        'surat_setuju' => $data['disposisi_masuk_status'],
                                        'surat_setuju_tgl' => $now,
                                        'surat_setuju_staf' => $data['disposisi_masuk_staf'],
                                        'surat_setuju_profil' => $data['disposisi_masuk_profil'],
                                        'surat_selesai_tgl' => $dist_tgl,
                                        'surat_selesai_staf' => $dist_staf,
                                        'surat_selesai_profil' => $dist_profil
                                    ), function ($response) use ($surat, $surat_log, $account_id, $data, $surat_id, $properti, $mergeData, 
                                        $queueTubeRedis, $stafProfil){
                                        if ($response[$surat->successProperty] !== true) return;
                                        $updated_data = $response['data'];

                                        if (Config()->item('queueServer')['host']) {
                                            $data_redis = array(
                                                'type'=>'KoreksiMasuk-Unit',
                                                'staf_id'=>null,
                                                'jabatan_id'=>null,
                                                'unit_id'=>$updated_data['surat_unit'],
                                                'data'=> $updated_data['surat_unit']
                                            );
                                            $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                        }
                                        // pushEvent(array(
                                        //     'to' => $updated_data['surat_unit'],
                                        //     'data' => array(
                                        //         'api' => 'surat_ikeluar',
                                        //         'id' => $surat_id
                                        //     ),
                                        //     'group' => array('unit'),
                                        //     'type' => 'surat_ikeluar'
                                        // ));
                                        
                                        $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                        
                                        //log revisi
                                        $dataLogTolak = array(
                                            'surat_log_tipe' => 5,
                                            'surat_log_setuju' => 4,
                                            'surat_log_surat'=>$updated_data['surat_id'],
                                            'surat_log_staf'=>$account_id,
                                            'surat_log_profil'=>$stafProfil['staf_profil'],
                                            'surat_log_tgl'=>$updated_data['surat_setuju_tgl'],
                                            'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                                        );
                                        
                                        $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});
                                    });

                                    if($data['disposisi_masuk_status'] === $surat::SETUJU_SETUJU && $data['surat_model'] === $surat::MODEL_KEPUTUSAN){
                                        if($auto_nomor_setting){
                                            $surat_view->create_imasuk($account_id, $data, $auto_distribusi_setting);
                                        }
                                    }
                                }else{
                                    $surat->update(array(
                                        'surat_id' => $surat_id), array(
                                        'surat_setuju' => $data['disposisi_masuk_status'],
                                        'surat_setuju_tgl' => $now,
                                        'surat_setuju_staf' => $data['disposisi_masuk_staf'],
                                        'surat_setuju_profil' => $data['disposisi_masuk_profil']
                                    ), function ($response) use ($surat, $surat_log, $account_id, $data, $properti, $queueTubeRedis, $stafProfil){
                                        if ($response[$surat->successProperty] !== true) return;
                                        $updated_data = $response['data'];

                                        if (Config()->item('queueServer')['host']) {
                                            $data_redis = array(
                                                'type'=>'KoreksiMasuk-Unit',
                                                'staf_id'=>null,
                                                'jabatan_id'=>null,
                                                'unit_id'=>$updated_data['surat_unit'],
                                                'data'=> $updated_data['surat_unit']
                                            );
                                            $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                        }
                                        
                                        $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);

                                        $dataLogTolak = array(
                                            'surat_log_tipe' => 5,
                                            'surat_log_setuju' => 4,
                                            'surat_log_surat'=>$updated_data['surat_id'],
                                            'surat_log_staf'=>$account_id,
                                            'surat_log_profil'=>$stafProfil['staf_profil'],
                                            'surat_log_tgl'=>$updated_data['surat_setuju_tgl'],
                                            'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                                        );
                                        $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});
                                    });
                                }
                            }

                            if($data['disposisi_masuk_status'] === $surat::SETUJU_SETUJU && $data['surat_model'] === $surat::MODEL_IKELUAR){
                                if($auto_nomor_setting){
                                    $surat_view->create_imasuk($account_id, $data, $auto_distribusi_setting);
                                }
                            }
                        }
                    }
                    /*create koreksi, send to next penyetuju*/
                    else if($staf_next){
                        $update_stack = $surat_stack->update(array(
                            'surat_stack_surat' => $data['surat_id'],
                            'surat_stack_staf' => $staf_next,
                            'surat_stack_model' => $surat_stack::MODEL_PENYETUJU
                        ),array(
                            'surat_stack_komentar' => null,
                            'surat_stack_tgl' => null,
                            'surat_stack_status' => 0));

                        $dpo = $koreksi->insert(array(
                            'disposisi_tgl'     => date('Y-m-d H:i:s'),
                            'disposisi_staf'    => $data['disposisi_masuk_staf'],
                            'disposisi_profil'  => $data['disposisi_masuk_profil'],
                            'disposisi_surat'   => $data['surat_id'],
                            'disposisi_induk'   => $data['disposisi_masuk_id'],
                            'disposisi_model'   => $koreksi::MODEL_KOREKSI,
                            'disposisi_model_sub' => 0,
                            'disposisi_baca_tgl'=> $now
                        ), null, function($response) use ($data, $properti, $koreksi, $account, $account_id, $now, $koreksi_masuk, $staf_next, $staf_next_profil, $mergeData, $queueTube, $queueTubeRedis, $dispo_parent_path, $dispo_masuk_parent_path, $koreksi_masuk_view, $queuetubeKoreksi, $worker_mode, $pengaturan, $notifikasi){
                            if ($response[$koreksi->successProperty] !== true) return;
                            $inserted_data = $response['data'];
                            $disposisi_id = $koreksi->get_insertid();

                            $updated_data = $koreksi->update($disposisi_id, array('disposisi_parent_path' => $dispo_parent_path.'/'.$disposisi_id));
                            $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                            if($op){
                                $koreksi->update($inserted_data['disposisi_id'], array(
                                    'disposisi_properti' => $op['properti_id']
                                ));
                            }


                            $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                            $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');
                             
                            $data_koreksi = array(
                                'surat_id' => $data['disposisi_surat'],
                                'surat_perihal' => $data['surat_perihal'],
                                'surat_registrasi' => $data['surat_registrasi'],
                                'disposisi_id' => $disposisi_id,
                                'pengirim_id' => $data['disposisi_masuk_staf'],
                                'pengirim_nama' => $data['disposisi_masuk_penerima_nama'],
                                'penerima_id' => $staf_next,
                                'penerima_profil' => $staf_next_profil,
                                'type' => 'KoreksiMasuk-Staf',
                                'dispo_parent_path' => $dispo_parent_path,
                                'dispo_masuk_parent_path' => $dispo_masuk_parent_path,
                                'use_notif_email' => $useNotifEmail,
                                'use_notif_email_draft' => $useNotifEmailDraft
                            );

                            if($worker_mode == 'local'){
                                $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                            }else{
                                $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                            }
                            
                            /*add ons*/
                            // $akunLogin = $account->get_profile();
                            // $data['distributor_nama'] = $akunLogin['staf_nama'];

                            // if($useNotifEmail && $useNotifEmailDraft){
                            //     $notifikasi->created('email', $data, $staf_next, NULL, 'draf');
                            // }
                        });
                    }
                }else{
                    $max_penerima = count($penerima_records);
                    $cek_all = array();
                    $cek_x = array();

                    if($stack_penerima){
                        /*updating status and pesan*/
                        if($data['disposisi_masuk_status_ttd']){
                            if ($use_ttd) {
                                $staf_ttd = $data['disposisi_masuk_status_ttd'];
                            } else {
                                $staf_ttd = null;
                                $ttd = explode(',', $data['disposisi_masuk_status_ttd']);
                                $me->saveTtd($ttd[1], $account_id);
                            }
                        }else{
                            $staf_ttd = null;
                        }
                        $surat_stack->update($stack_penerima['surat_stack_id'], array(
                            'surat_stack_pelaku'        => $account_id,
                            'surat_stack_pelaku_profil' => $stafProfil['staf_profil'],
                            'surat_stack_baca_tgl'      => $data['disposisi_masuk_baca_tgl'],
                            'surat_stack_status'        => $data['disposisi_masuk_status'],
                            'surat_stack_status_tgl'    => date('Y-m-d H:i:s'),
                            'surat_stack_status_ttd'    => $staf_ttd,
                            'surat_stack_komentar'      => $data['disposisi_masuk_pesan']
                         ));
                        /*update data in stack*/
                        $row['surat_stack_status'] = $data['disposisi_masuk_status'];
                    }
                        
                    $stack = $surat_stack->find(array(
                        'surat_stack_surat' => $data['surat_id'],
                        'surat_stack_model' => $surat_stack::MODEL_PENYETUJU
                    ));

                    foreach($stack as $index => $row){
                        if($row['surat_stack_status'] == $surat::SETUJU_TOLAK){
                            array_push($cek_x, 1);
                        }

                        if(($row['surat_stack_status'] == $surat::SETUJU_SETUJU) || ($row['surat_stack_status'] == $surat::SETUJU_TOLAK)){
                            array_push($cek_all, 1);
                        }                    
                    }

                    if(count($cek_all) == $max_penerima){
                        $status = (count($cek_x) > 0)? $surat::SETUJU_TOLAK : $surat::SETUJU_SETUJU;
                        $surat_id = $data['surat_id'];
                        
                        if($data['surat_model'] === $surat::MODEL_KELUAR){
                            if($data['surat_nomor']){
                                $surat_nomor = $data['surat_nomor'];
                                $surat_nomor_asli = $data['surat_nomor_asli'];
                                $surat_nomor_format = $data['surat_nomor_format'];
                                $surat_nomor_otomatis = $data['surat_nomor_otomatis'];
                                $surat_nomor_tgl = $data['surat_nomor_tgl'];
                                $surat_nomor_staf = $data['surat_nomor_staf'];
                                $surat_nomor_urut = $data['surat_nomor_urut'];
                                $surat_nomor_backdate = $data['surat_nomor_backdate'];
                            }else if($status === $surat::SETUJU_SETUJU){
                                $gen_nomor = $surat_view->generate_nomor($surat_id, 'keluar', $penerima_records[$penerima_lvl]['surat_stack_staf']);
                                // $gen_nomor = $surat_view->generate_nomor($surat_id, 'keluar');
                                if($auto_nomor_keluar_setting){
                                    if($data['surat_tanggal'] < $data['surat_properti_buat_tgl']){
                                        $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_keluar_backdate');
                                    }else{
                                        $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_keluar');
                                    }
                                    $surat_nomor_otomatis = 1;
                                    $surat_nomor = $gen_nomor['nomor'];
                                    $surat_nomor_asli = $gen_nomor['nomor'];
                                    $surat_nomor_tgl = $now;
                                    $surat_nomor_staf = $penerima_records[$penerima_lvl]['surat_stack_staf'];
                                    $surat_nomor_profil = $penerima_records[$penerima_lvl]['surat_stack_profil'];
                                    $surat_nomor_urut = $gen_nomor['digit'];
                                    $surat_nomor_backdate = $gen_nomor['backdate'];
                                }else{
                                    $surat_nomor_tgl = NULL;
                                    $surat_nomor_format = NULL;
                                    $surat_nomor_otomatis = NULL;
                                    $surat_nomor_staf = NULL;
                                    $surat_nomor_profil = NULL;
                                    $surat_nomor = NULL;
                                    $surat_nomor_asli = NULL;
                                    $surat_nomor_urut = NULL;
                                    $surat_nomor_backdate = NULL;
                                }
                            }else{
                                $surat_nomor_tgl = NULL;
                                $surat_nomor_format = NULL;
                                $surat_nomor_otomatis = NULL;
                                $surat_nomor_staf = NULL;
                                $surat_nomor_profil = NULL;
                                $surat_nomor = NULL;
                                $surat_nomor_asli = NULL;
                                $surat_nomor_urut = NULL;
                                $surat_nomor_backdate = NULL;
                            }

                            $surat->update(array(
                                'surat_id' => $surat_id), array(
                                'surat_setuju' => $status,
                                'surat_setuju_tgl' => $now,
                                'surat_setuju_staf' => $data['disposisi_masuk_staf'],
                                'surat_setuju_profil'   => $data['disposisi_masuk_profil'],
                                'surat_nomor'           => $surat_nomor,
                                'surat_nomor_asli'      => $surat_nomor_asli,
                                'surat_nomor_tgl'       => $surat_nomor_tgl,
                                'surat_nomor_staf'      => $surat_nomor_staf,
                                'surat_nomor_profil'    => $surat_nomor_profil,
                                'surat_nomor_otomatis'  => $surat_nomor_otomatis,
                                'surat_nomor_format'    => $surat_nomor_format,
                                'surat_nomor_urut'      => $surat_nomor_urut,
                                'surat_nomor_backdate'  => $surat_nomor_backdate
                            ), function ($response) use ($surat, $surat_nomor, $surat_log, $account_id, $data, $surat_id, $properti, $mergeData, $surat_view, $queueTubeRedis, $stafProfil, $status){
                                if ($response[$surat->successProperty] !== true) return;

                                $updated_data = $response['data'];
                                if($mergeData && $surat_nomor && $updated_data['surat_setuju'] === $surat::SETUJU_SETUJU) $surat->compiledDataWithDokumen($surat_id);
                                if (Config()->item('queueServer')['host']) {
                                    $data_redis = array(
                                        'type'=>'KoreksiMasuk-Unit',
                                        'staf_id'=>null,
                                        'jabatan_id'=>null,
                                        'unit_id'=>$updated_data['surat_unit'],
                                        'data'=> $updated_data['surat_unit']
                                    );
                                    $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                }

                                // pushEvent(array(
                                //     'to' => $updated_data['surat_unit'],
                                //     'data' => array(
                                //         'api' => 'surat_keluar',
                                //         'id' => $surat_id
                                //     ),
                                //     'group' => array('unit'),
                                //     'type' => 'surat_keluar'
                                // ));
                                $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                if ($status === $surat::SETUJU_TOLAK) {
                                    $dataLogTolak = array(
                                        'surat_log_tipe' => 5,
                                        'surat_log_setuju' => 4,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl'],
                                        'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                                    );
                                    $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});
                                }
                            });

                            if($status === $surat::SETUJU_SETUJU && $surat_nomor){

                                $dataLogDistribusi = array(
                                    'surat_log_tipe' => 7,
                                    'surat_log_surat'=>$data['surat_id'],
                                    'surat_log_staf'=>$account_id,
                                    'surat_log_profil'=>$stafProfil['staf_profil'],
                                    'surat_log_tgl'=>$now
                                );
                                $operation_logDistribusi = $surat_log->insert($dataLogDistribusi, null, function($response){});
                                
                                $surat->update($data['surat_id'], array(
                                    'surat_distribusi_tgl' => $now,
                                    'surat_distribusi_staf' => $account_id,
                                    'surat_distribusi_profil' => $stafProfil['staf_profil']                                            
                                ));
                                $stack = $surat_stack->find(array(
                                    'surat_stack_surat'     => $data['surat_id'],
                                    'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                                    )); 
                                if(!empty($stack)){
                                    $koreksi_operation = $koreksi->insert(
                                        array(
                                            'disposisi_tgl'      => $now,
                                            'disposisi_pelaku'   => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                            'disposisi_pelaku_profil'   => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                            'disposisi_staf'     => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                            'disposisi_profil'   => $penerima_records[$penerima_lvl]['surat_stack_profil'],
                                            'disposisi_model'    => $koreksi::MODEL_DISPOSISI,
                                            'disposisi_surat'    => $data['surat_id'],
                                            'disposisi_baca_tgl' => $now
                                        ),null,
                                        function($response) use($koreksi, $koreksi_masuk, $surat_view, $stack, $surat_stack, $data, $surat_log, $staf_model,
                                            $properti, $account_id, $queueTube, $queueTubeRedis, $penerima_records, $penerima_lvl, $worker_mode, $queuetubeDisposisi, $disposisi_masuk_view){
                                            if($response[$koreksi->successProperty] !== true) return;

                                            $disposisi_id = $koreksi->get_insertid();
                                            $updated_data = $koreksi->update($disposisi_id, array('disposisi_parent_path' => '/'.$disposisi_id));
                                            $inserted_data = $response['data'];
                                            $koreksi_id = $inserted_data['disposisi_id'];
                                            $count_penerima = count($stack);
                                            $query = "INSERT INTO disposisi_jumlah_penerima (disposisi_masuk_disposisi, disposisi_jumlah_penerima) VALUES('".$koreksi_id."', ".$count_penerima.")";
                                            $result = $this->db->query($query);
                                            /*insert properti*/
                                            $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                            if($op){
                                                $koreksi->update($inserted_data['disposisi_id'], array(
                                                    'disposisi_properti' => $op['properti_id']
                                                ));
                                            }

                                            if(!is_array($stack)){
                                                $stack = array();
                                            }
                                            

                                            foreach ($stack as $index => $p) {
                                                if (is_string($p)) {
                                                    $penerima_id = $p;
                                                } else if (is_object($p)) {
                                                    $penerima_id = property_exists($p, 'surat_stack_staf') ? $p->surat_stack_staf : null;
                                                    // $tembusan = property_exists($p, 'surat_stack_istembusan') ? $p->surat_stack_istembusan : null;
                                                    // $berkas = property_exists($p, 'surat_stack_isberkas') ? $p->surat_stack_isberkas : null;
                                                } else if (is_array($p)) {
                                                    $penerima_id = array_key_exists('surat_stack_staf', $p) ? $p['surat_stack_staf'] : null;
                                                    // $tembusan = array_key_exists($p, 'surat_stack_istembusan') ? $p->surat_stack_istembusan : null;
                                                    // $berkas = array_key_exists($p, 'surat_stack_isberkas') ? $p->surat_stack_isberkas : null;
                                                }

                                                if (empty($penerima_id)) {
                                                    continue;
                                                }
                                                
                                                $profil = $staf_model->read($penerima_id);

                                                $data_diposisi_masuk = array(
                                                    'disposisi_id' => $koreksi_id,
                                                    'disposisi_masuk_profil' => $profil['staf_profil'],
                                                    'dispo_masuk_parent' => null,
                                                    'penerima_id' => $penerima_id,
                                                    'penerima_jabatan' => null,
                                                    'pengirim_id' => $penerima_records[$penerima_lvl]['surat_stack_staf'],
                                                    'berkas' => $data['surat_useberkas'],
                                                    'tembusan' => 1,
                                                    'key_redis' => Config()->item('redisPrefix').'disposisi_sama:'.$inserted_data['disposisi_surat'].'-'.$penerima_id
                                                );

                                                if($worker_mode == 'local'){
                                                    $create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
                                                }else{
                                                    $addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
                                                }
                                            }
                                        }
                                    );
                                }
                            }                    
                        }else if($data['surat_model'] === $surat::MODEL_IKELUAR){
                            if($data['surat_nomor']){
                                $surat_nomor = $data['surat_nomor'];
                                $surat_nomor_asli = $data['surat_nomor_asli'];
                                $surat_nomor_backdate = $data['surat_nomor_backdate'];
                                $surat_nomor_urut = $data['surat_nomor_urut'];
                                $surat_nomor_format = $data['surat_nomor_format'];
                                $surat_nomor_otomatis = $data['surat_nomor_otomatis'];
                                $surat_nomor_tgl = $data['surat_nomor_tgl'];
                                $surat_nomor_staf = $data['surat_nomor_staf'];
                                $surat_nomor_profil = $data['surat_nomor_profil'];
                            }else if($status === $surat::SETUJU_SETUJU){

                                $dataLogSetuju = array(
                                    'surat_log_tipe' => 5,
                                    'surat_log_setuju' => 2,
                                    'surat_log_surat'=>$data['surat_id'],
                                    'surat_log_staf'=>$account_id,
                                    'surat_log_tgl'=>$now
                                );
                                $operation_logSetuju = $surat_log->insert($dataLogSetuju, null, function($response){});
                                // $gen_nomor = $surat_view->generate_nomor($surat_id, 'ikeluar', $penerima_records[$penerima_lvl]['surat_stack_staf']);
                                $gen_nomor = $surat_view->generate_nomor($surat_id, 'ikeluar');
                                if($auto_nomor_setting){
                                    $surat_nomor_otomatis = 1;
                                    $surat_nomor = $gen_nomor['nomor'];
                                    $surat_nomor_asli = $gen_nomor['nomor'];
                                    $surat_nomor_backdate = $gen_nomor['backdate'];
                                    $surat_nomor_urut = $gen_nomor['digit'];
                                    $surat_nomor_tgl = $now;
                                    $surat_nomor_format = $pengaturan->getSettingByCode('template_nomor_surat_internal');
                                    $surat_nomor_otomatis = 1;
                                    $surat_nomor_staf = $penerima_records[$penerima_lvl]['surat_stack_staf'];
                                    $surat_nomor_profil = $penerima_records[$penerima_lvl]['surat_stack_profil'];
                                }else{
                                    $surat_nomor_tgl = NULL;
                                    $surat_nomor_staf = NULL;
                                    $surat_nomor_profil = NULL;
                                    $surat_nomor_format = NULL;
                                    $surat_nomor_otomatis = NULL;
                                    $surat_nomor = NULL;
                                    $surat_nomor_asli = NULL;
                                    $surat_nomor_urut = NULL;
                                    $surat_nomor_backdate = NULL;
                                }
                            }else{
                                $surat_nomor_tgl = NULL;
                                $surat_nomor_staf = NULL;
                                $surat_nomor_profil = NULL;
                                $surat_nomor_format = NULL;
                                $surat_nomor_otomatis = NULL;
                                $surat_nomor = NULL;
                                $surat_nomor_asli = NULL;
                                $surat_nomor_urut = NULL;
                                $surat_nomor_backdate = NULL;
                            }

                            $surat->update(array(
                                'surat_id' => $surat_id), array(
                                'surat_setuju' => $status,
                                'surat_setuju_tgl' => $now,
                                'surat_setuju_staf' => $data['disposisi_masuk_staf'],
                                'surat_setuju_profil'  => $data['disposisi_masuk_profil'],
                                // 'surat_selesai_tgl' => $now,
                                // 'surat_selesai_staf' => $data['disposisi_masuk_staf'],
                                'surat_nomor'           => $surat_nomor,
                                'surat_nomor_asli'      => $surat_nomor_asli,
                                'surat_nomor_tgl'       => $surat_nomor_tgl,
                                'surat_nomor_staf'      => $surat_nomor_staf,
                                'surat_nomor_profil'    => $surat_nomor_profil,
                                'surat_nomor_otomatis'  => $surat_nomor_otomatis,
                                'surat_nomor_format'    => $surat_nomor_format,
                                'surat_nomor_urut'      => $surat_nomor_urut,
                                'surat_nomor_backdate'  => $surat_nomor_backdate
                            ), function ($response) use ($surat, $surat_nomor, $surat_view, $surat_log, $account_id, $data, $surat_id, 
                                $properti, $mergeData, $pengaturan, $penerima_records, $penerima_lvl, $now, $auto_nomor_setting, $status,
                                $queueTubeRedis, $stafProfil){
                                if ($response[$surat->successProperty] !== true) return;
                                $updated_data = $response['data'];

                                if (Config()->item('queueServer')['host']) {
                                    $data_redis = array(
                                        'type'=>'KoreksiMasuk-Unit',
                                        'staf_id'=>null,
                                        'jabatan_id'=>null,
                                        'unit_id'=>$updated_data['surat_unit'],
                                        'data'=> $updated_data['surat_unit']
                                    );
                                    $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                }

                                // pushEvent(array(
                                //     'to' => $updated_data['surat_unit'],
                                //     'data' => array(
                                //         'api' => 'surat_ikeluar',
                                //         'id' => $surat_id
                                //     ),
                                //     'group' => array('unit'),
                                //     'type' => 'surat_ikeluar'
                                // ));
                                if($mergeData && $surat_nomor && $updated_data['surat_setuju'] === $surat::SETUJU_SETUJU) $surat->compiledDataWithDokumen($surat_id);
                                $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                if ($status === $surat::SETUJU_TOLAK) {
                                    $dataLogTolak = array(
                                        'surat_log_tipe' => 5,
                                        'surat_log_setuju' => 4,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl'],
                                        'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                                    );
                                    
                                    $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});
                                }
                            });

                            $surat_masuk_id = $data['surat_korespondensi_surat'];

                            /*updating status surat masuk*/
                            if($status === $surat::SETUJU_SETUJU){
                                if($surat_masuk_id){
                                    $surat->update(array(
                                        'surat_id' => $surat_masuk_id), array(
                                        'surat_selesai_tgl'      => $now,
                                        'surat_selesai_staf'     => $data['disposisi_masuk_staf'],
                                        'surat_selesai_profil'  => $data['disposisi_masuk_profil']
                                    ), function ($response) use ($surat, $surat_log, $account_id, $data, $surat_id, $properti, $mergeData, $stafProfil){
                                        if ($response[$surat->successProperty] !== true) return;
                                        $updated_data = $response['data'];
                                        $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                        // $surat_log->created($account_id, $updated_data);
                                        $dataLogSetuju = array(
                                            'surat_log_tipe' => 5,
                                            'surat_log_setuju' => 2,
                                            'surat_log_surat'=>$data['surat_id'],
                                            'surat_log_staf'=>$account_id,
                                            'surat_log_profil'=>$stafProfil['staf_profil'],
                                            'surat_log_tgl'=>$data['surat_setuju_tgl']
                                        );
                                        $operation_logSetuju = $surat_log->insert($dataLogSetuju, null, function($response){});
                                    });
                                }
                            }

                            if($status == $surat::SETUJU_SETUJU && $data['surat_model'] === $surat::MODEL_IKELUAR){
                                if($auto_nomor_setting){
                                    $surat->update(array(
                                        'surat_id' => $surat_id), array(
                                        'surat_distribusi_tgl'   => $now,
                                        'surat_distribusi_staf'  => $data['disposisi_masuk_staf'],
                                        'surat_distribusi_profil'=> $data['disposisi_masuk_profil'],
                                    ), function ($response) use ($surat, $surat_log, $account_id, $data, $surat_id, $surat_view, $auto_distribusi_setting, $pengaturan, $now, $stafProfil){
                                        if ($response[$surat->successProperty] !== true) return;
                                        $updated_data = $response['data'];
                                        /*log didistribusikan*/
                                        $dataLog2 = array(  
                                            'surat_log_tipe' => 7,
                                            'surat_log_surat' => $updated_data['surat_id'],
                                            'surat_log_staf' => $account_id,
                                            'surat_log_profil' => $stafProfil['staf_profil'],
                                            'surat_log_tgl' => $now
                                        );
                                        $operation_log2 = $surat_log->insert($dataLog2, null, function($response){});
                                        $surat_view->create_imasuk($account_id, $updated_data, $auto_distribusi_setting);
                                    });
                                }
                            }
                        }else if($data['surat_model'] === $surat::MODEL_KEPUTUSAN){
                            $surat->update(array(
                                'surat_id' => $surat_id), array(
                                'surat_setuju' => $status,
                                'surat_setuju_tgl' => $now,
                                'surat_setuju_staf' => $data['disposisi_masuk_staf'],
                                'surat_setuju_profil'  => $data['disposisi_masuk_profil'],
                                'surat_petikan_setuju' => $surat::SETUJU_PROSES
                            ), function ($response) use ($surat, $surat_nomor, $surat_view, $surat_log, $account_id, $data, $surat_id, 
                                $properti, $mergeData, $pengaturan, $penerima_records, $penerima_lvl, $now, $auto_nomor_setting, 
                                $queueTubeRedis, $stafProfil, $status){
                                if ($response[$surat->successProperty] !== true) return;
                                $updated_data = $response['data'];
                                
                                if (Config()->item('queueServer')['host']) {
                                    $data_redis = array(
                                        'type'=>'KoreksiMasuk-Unit',
                                        'staf_id'=>null,
                                        'jabatan_id'=>null,
                                        'unit_id'=>$updated_data['surat_unit'],
                                        'data'=> $updated_data['surat_unit']
                                    );
                                    $addJobUnit = create_job($queueTubeRedis, $data_redis);
                                }

                                // pushEvent(array(
                                //     'to' => $updated_data['surat_unit'],
                                //     'data' => array(
                                //         'api' => 'surat_ikeluar',
                                //         'id' => $surat_id
                                //     ),
                                //     'group' => array('unit'),
                                //     'type' => 'surat_ikeluar'
                                // ));
                                
                                $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);

                                if ($status === $surat::SETUJU_TOLAK) {
                                    $dataLogTolak = array(
                                        'surat_log_tipe' => 5,
                                        'surat_log_setuju' => 4,
                                        'surat_log_surat'=>$updated_data['surat_id'],
                                        'surat_log_staf'=>$account_id,
                                        'surat_log_profil'=>$stafProfil['staf_profil'],
                                        'surat_log_tgl'=>$updated_data['surat_setuju_tgl'],
                                        'surat_log_catatan'=>$data['disposisi_masuk_pesan']
                                    );
                                    
                                    $operation_log = $surat_log->insert($dataLogTolak, null, function($response){});
                                }
                            });

                            if($status == $surat::SETUJU_SETUJU && $data['surat_model'] === $surat::MODEL_KEPUTUSAN){
                                /*log setuju*/
                                $dataLogSetuju = array(
                                    'surat_log_tipe' => 5,
                                    'surat_log_setuju' => 2,
                                    'surat_log_surat'=>$data['surat_id'],
                                    'surat_log_staf'=>$account_id,
                                    'surat_log_tgl'=>$now
                                );
                                $operation_logSetuju = $surat_log->insert($dataLogSetuju, null, function($response){});

                                /*get all petikan sort by level*/
                                $petikan_records = $surat_stack->find(array(
                                    'surat_stack_surat' => $data['surat_id'],
                                    'surat_stack_model' => $surat_stack::MODEL_PETIKAN
                                ), false, false, true, array('surat_stack_level'=>'asc'));

                                 /* send to petikan */
                                $first_petikan = (array_key_exists(0,$petikan_records))? $petikan_records[0]: null;
                                $update_stack = $surat_stack->update(array(
                                    'surat_stack_surat' => $data['surat_id'],
                                    'surat_stack_staf' => $first_petikan['surat_stack_staf']
                                ),array(
                                    'surat_stack_komentar' => null,
                                    'surat_stack_tgl' => null,
                                    'surat_stack_status' => 0));
        
                                $koreksi->insert(array(
                                    'disposisi_tgl'     => date('Y-m-d H:i:s'),
                                    'disposisi_staf'    => $data['disposisi_masuk_staf'],
                                    'disposisi_profil'  => $data['disposisi_masuk_profil'],
                                    'disposisi_surat'   => $data['surat_id'],
                                    'disposisi_induk'   => $data['disposisi_masuk_id'],
                                    'disposisi_model'   => $koreksi::MODEL_KOREKSI,
                                    'disposisi_model_sub' => 1,
                                    'disposisi_baca_tgl'=> $now
                                ), null, function($response) use ($data, $properti, $koreksi, $account, $account_id, $first_petikan, $dispo_parent_path, $dispo_masuk_parent_path, $koreksi_masuk_view, $queuetubeKoreksi, $worker_mode, $notifikasi, $pengaturan){
                                    if ($response[$koreksi->successProperty] !== true) return;
                                    $inserted_data = $response['data'];
                                    $disposisi_id = $koreksi->get_insertid();
                                    $updated_data = $koreksi->update($disposisi_id, array('disposisi_parent_path' => $dispo_parent_path.'/'.$disposisi_id));

                                    $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                    if($op){
                                        $koreksi->update($inserted_data['disposisi_id'], array(
                                            'disposisi_properti' => $op['properti_id']
                                        ));
                                    }

                                    $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                                    $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');
                                     
                                    $data_koreksi = array(
                                        'surat_id' => $data['disposisi_surat'],
                                        'surat_perihal' => $data['surat_perihal'],
                                        'surat_registrasi' => $data['surat_registrasi'],
                                        'disposisi_id' => $disposisi_id,
                                        'pengirim_id' => $data['disposisi_masuk_staf'],
                                        'pengirim_nama' => $data['disposisi_masuk_penerima_nama'],
                                        'penerima_id' => $first_petikan['surat_stack_staf'],
                                        'penerima_profil' => $first_petikan['surat_stack_profil'],
                                        'type' => 'KoreksiMasuk-Staf',
                                        'dispo_parent_path' => $dispo_parent_path,
                                        'dispo_masuk_parent_path' => $dispo_masuk_parent_path,
                                        'use_notif_email' => $useNotifEmail,
                                        'use_notif_email_draft' => $useNotifEmailDraft
                                        
                                    );
    
                                    if($worker_mode == 'local'){
                                        $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                                    }else{
                                        $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                                    }
        
                                    /*add ons*/
                                    // $akunLogin = $account->get_profile();
                                    // $data['distributor_nama'] = $akunLogin['staf_nama'];

                                    // if($useNotifEmail && $useNotifEmailDraft){
                                    //     $notifikasi->created('email', $data, $first_petikan['surat_stack_staf'], NULL, 'draf');
                                    // }
                                });
                            }
                        }
                    }
                }
            }
            }

        );
        $operation[$koreksi_masuk->dataProperty] = $koreksi_masuk_view->read($id);
        $this->response($operation);
    }
    
    function getIndex($penerima_records, $data){
        foreach ($penerima_records as $key => $value) {
            if($value['surat_stack_staf'] === $data['disposisi_masuk_staf']){
                return $key;
            }
        }
    }

    function saveTtd($data, $id){
        $upload_config_ttd = $this->config->item('upload_staf_ttd_config');

        define('UPLOAD_DIR', $upload_config_ttd['imagePath']);
        $img = str_replace('data:image/png;base64,', '', $data);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR . $id . '.png';
        $success = file_put_contents($file, $data);
        return $success ? $file : 'Unable to save the file.';
    }

    // function get_ttd(){
    //     $exist = 0;
    //     $model = $this->m_disposisi_masuk;

    //     $id = varReq('id');
    //     $data = $model->read($id);

    //     if($data['disposisi_masuk_status_ttd']){
    //         $exist = 1;
    //     }

    //     $this->response(array(
    //         'exist' => (int)$exist,
    //         'ttd'   => $data['disposisi_masuk_status_ttd']
    //     ));

    //     // echo $model->get_lastquery();
    // }

    function checkImage() {
        $staf_id = varGet('staf_id');
        $upload_config_ttd = $this->config->item('upload_staf_ttd_config');
        $ttd_path          = $upload_config_ttd['imagePath'];
        $ext = '.jpg';
        $exist = 1;

        // $path = Template::compile($ttd_path)->apply(array(
        //     'staf_id'=>$staf_id
        // ));
        // $ext = '.png';
        // $name = $staf_id;
        // $path = $path . $name . $ext;

        // if (file_exists($path)) {
        //     $exist = 1;
        // }
        
        $this->response(array(
            'exist' => (int)$exist
        ));
    }

    function report(){
        $me = $this;

        $dis_penerima_id = varGet('id');

        $filter = varGet('filter');
        $filterValue = varGet('value');
        $download = varGet('download',0);
        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;    

        $user = $me->m_account->get_profile();

        $records = $this->m_koreksi_masuk_view->find(array(
            'koreksi_masuk_id' => $dis_penerima_id,
            )
        );

        $report_data = array(
            'style'=>array( 
                array( 'params'=>'media="all"', 'content'=>$me->m_asset->css('reset.css',false)),
                array( 'params'=>'media="all"', 'content'=>$me->m_asset->css('report.css',false))
            ),
            'title'=> $this->report_title,
            'subtitle'=> $this->report_subtitle,
            'header'=>$me->m_report->generateHeader($download),
            'records'=>$records,
            'operator'=>$user['staf_nama'],
            'operator_nip'=>$user['staf_kode'],
            'pengirim'=>$records[0]['pengirim_nama'],
            'pengirim_nip'=>$records[0]['pengirim_nip']

        );

        if($download){
            $me->m_report->generateReportPdf($this->report_template, $report_data, 'report');
        }else{
            $me->m_report->generateReport($this->report_template, $report_data, true, true);
        }
    }

    function penerima(){
        $me = $this;

        $account        = $me->m_account;
        $penerima_view  = $me->m_surat_stack_view;
        $pegawai        = $me->m_staf_view;

        $id     = varGet('id');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        array_unshift($sorter, (object)array(
            'property'  =>'surat_stack_level',
            'direction' => 'ASC'
        ));

        if($id){
            array_unshift($filter, (object)array(
                'property'  =>'surat_konsep_id',
                'value'     => $id,
                'type'      =>'exact'
            ));
            $record = $penerima_view->select(array(
                'filter' => json_encode($filter),
                'sorter' => json_encode($sorter)
            ));
            $me->response($record);
        }
    }

    function traceKoreksi($id = null){
        $kpenerima_view = $this->m_koreksi_masuk_view;

        if($id){
            $trace = $kpenerima_view->getTraceKoreksi($id);
            $this->response($trace);
        }
    }

    function traceIdKoreksi($id = null){
        $kpenerima_view = $this->m_koreksi_masuk_view;

        if($id){
            $trace = $kpenerima_view->getTraceKoreksi($id);
            return $trace['children']['disposisi_id'];
        }
    }

    function updateKoreksi($id = null){
        $koreksi = $this->m_disposisi;  
        $now = date('Y-m-d H:i');

        if($id){
            $operation = $koreksi->update($id, array(
                'disposisi_baca_tgl' => NULL
            ));
            $this->response($operation);
        }
        else{
            return false;
        }
    }

}