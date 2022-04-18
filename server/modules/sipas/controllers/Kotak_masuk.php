<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Kotak_masuk extends Base_Controller {

	function __construct(){
        parent::__construct();

        $this->m_account      = $this->model('sipas/account',      true);
        $this->m_notification = $this->model('sipas/notification', true);
        $this->m_pengaturan   = $this->model('sipas/pengaturan',   true);
        $this->m_staf         = $this->model('sipas/staf',         true);

        $this->m_surat          = $this->model('sipas/surat',      true);
        $this->m_surat_view     = $this->model('sipas/surat_view', true);

        $this->m_disposisi       = $this->model('sipas/disposisi',            true);
        $this->m_disposisi_netral_view	= $this->model('sipas/disposisi_netral_view',true);
        $this->m_disposisi_view  		= $this->model('sipas/disposisi_view',       true);

        $this->m_disposisi_masuk       = $this->model('sipas/disposisi_masuk',     true);
        $this->m_disposisi_masuk_view  = $this->model('sipas/disposisi_masuk_view',true);
        $this->m_disposisi_masuk_nonaktif_view  = $this->model('sipas/disposisi_masuk_nonaktif_view',true);
        
        $this->m_mb_disposisi_masuk_netral_blm_tindak_view      = $this->model('sipas/mb_disposisi_masuk_netral_blm_tindak_view',    true);
        $this->m_mb_disposisi_masuk_blm_tindak_view             = $this->model('sipas/mb_disposisi_masuk_blm_tindak_view',           true);
        $this->m_mb_disposisi_masuk_eksternal_blm_tindak_view   = $this->model('sipas/mb_disposisi_masuk_eksternal_blm_tindak_view', true);
        $this->m_mb_disposisi_masuk_internal_blm_tindak_view    = $this->model('sipas/mb_disposisi_masuk_internal_blm_tindak_view',  true);
        $this->m_mb_disposisi_masuk_draf_blm_tindak_view        = $this->model('sipas/mb_disposisi_masuk_draf_blm_tindak_view',      true);

        $this->m_mb_disposisi_masuk_netral_teruskan_view    = $this->model('sipas/mb_disposisi_masuk_netral_teruskan_view',true);

        $this->m_disposisi_masuk_netral_view  = $this->model('sipas/disposisi_masuk_netral_view',true);
        $this->m_disposisi_jumlah_penerima    = $this->model('sipas/disposisi_jumlah_penerima_sama_view',true);
        $this->m_disposisi_jumlah_disposisi   = $this->model('sipas/disposisi_jumlah_penerima_disposisi_sama_view',true);

        $this->m_notadinas_masuk_view     = $this->model('sipas/notadinas_masuk_view', true);
    }

    function index()
    {
        $this->surat_all();
    }

    function testing ($section = null){
        $model = $this->m_notification;

        $data = $model->get_newnotif_of('masuk');
        echo "<pre>";
        print_r($data);
    }

    function tugassaya($section = null){ /*lastest surat + surat blm ditindak (blm di baca + blm ada tindakan)*/
    	$me = $this;

        $account      = $me->m_account;
        $staf         = $me->m_staf;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;
        $pengaturan   = $me->m_pengaturan;

        $disposisi_masuk        = $me->m_disposisi_masuk;
        $disposisi_netral_view  = $me->m_disposisi_netral_view;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_view;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $user       = $account->get_profile();
        $staf_id    = $account->get_profile_id();
        $costumFilter = array();
        $nonCustomFilter = array();
        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        switch ($section) {
            case 'disposisi':
                $model = $me->m_mb_disposisi_masuk_blm_tindak_view;
            break;
            case 'eksternal':
                $model = $me->m_mb_disposisi_masuk_eksternal_blm_tindak_view;
            break;
            case 'internal':
                $model = $me->m_mb_disposisi_masuk_internal_blm_tindak_view;
            break;
            case 'draf':
                $model = $me->m_mb_disposisi_masuk_draf_blm_tindak_view;
            break;
            default:
                $model = $me->m_mb_disposisi_masuk_netral_blm_tindak_view;
            break;
        }

        if(!empty($filter)){
            foreach ($filter as $i => $val) {
                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                        'unit_source_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $disposisi_masuk_view::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
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
                "type"  => "custom",
                "value" => "(" . $disposisi_masuk::$field_receiver_id . " = '" . $staf_id . "' OR " . $disposisi_masuk::$field_receiver_jabatan_id . " = '" . $user['staf_jabatan'] . "')"
            ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }

                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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

    function teruskan(){ /*lastest surat + surat blm ditindak (blm di baca + blm ada tindakan)*/
        $me = $this;

        $account      = $me->m_account;
        $staf         = $me->m_staf;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;
        $pengaturan   = $me->m_pengaturan;

        $disposisi_masuk   = $me->m_disposisi_masuk;
        $disposisi_netral_view  = $me->m_disposisi_netral_view;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_view;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;
        $model   = $me->m_mb_disposisi_masuk_netral_teruskan_view;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $user       = $account->get_profile();
        $staf_id    = $account->get_profile_id();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();


        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                        'unit_source_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $disposisi_masuk_view::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
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
                'property'  => $disposisi_masuk::$field_receiver_id,
                'value'     => $staf_id,
                'type'      =>'exact'
            ));
            // array_unshift($filter, (object)array(
            //     'property'  => $surat::$field_distribusi_lookup,
            //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
            //     'type'      => 'exact'
            // ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }

                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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

    function tercabut(){ /*lastest surat + surat blm ditindak (blm di baca + blm ada tindakan)*/
        $me = $this;

        $account      = $me->m_account;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;

        $disposisi_masuk   = $me->m_disposisi_masuk;
        $disposisi_netral_view  = $me->m_disposisi_netral_view;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_view;
        $model   = $me->m_disposisi_masuk_nonaktif_view;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $staf_id    = $account->get_profile_id();

        $costumFilter = array();
        $nonCustomFilter = array();


        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                        'unit_source_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $disposisi_masuk_view::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);
            $me->response_record($record);

        }else{
            array_unshift($filter, (object)array(
                'property'  => $disposisi_masuk::$field_receiver_id,
                'value'     => $staf_id,
                'type'      =>'exact'
            ));
            // array_unshift($filter, (object)array(
            //     'property'  => $surat::$field_distribusi_lookup,
            //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
            //     'type'      => 'exact'
            // ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => $filter,
                'sorter'    => $sorter
            )); 
            
            $me->response($operation);
        }
    }

    function surat_all(){ /*semua surat*/
    	$me = $this;

        $account      = $me->m_account;
        $staf         = $me->m_staf;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;
        $pengaturan   = $me->m_pengaturan;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;
        $model  = $me->m_disposisi_masuk_netral_view;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $user       = $account->get_profile();
        $staf_id    = $account->get_profile_id();

        $costumFilter = array();
        $nonCustomFilter = array();
        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                        'unit_source_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $model::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $model::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id); 

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
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
                "type"  => "custom",
                "value" => "(" . $disposisi_masuk::$field_receiver_id . " = '" . $staf_id . "' OR " . $disposisi_masuk::$field_receiver_jabatan_id . " = '" . $user['staf_jabatan'] . "')"
            ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }
                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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
            // $operation['query'] = $model->get_lastquery();
            
            $me->response($operation);
        }
    }
	
	function notadinas(){
		$me = $this;

        $account      = $me->m_account;
        $staf         = $me->m_staf;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;
        $pengaturan   = $me->m_pengaturan;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;
        $model   = $me->m_notadinas_masuk_view;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $user       = $account->get_profile();
        $staf_id    = $account->get_profile_id();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();


        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                        'unit_source_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $model::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $model::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
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
                'property'  => $disposisi_masuk::$field_receiver_id,
                'value'     => $staf_id,
                'type'      =>'exact'
            ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => $disposisi::$field_induk.' IS NOT NULL'
            ));
            // array_unshift($filter, (object)array(
            //     'property'  => $surat::$field_distribusi_lookup,
            //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
            //     'type'      => 'exact'
            // ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }

                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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

    function disposisimasuk(){
        $me = $this;

        $account      = $me->m_account;
        $staf         = $me->m_staf;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;
        $pengaturan   = $me->m_pengaturan;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;
        $model   = $me->m_disposisi_masuk_view;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $user       = $account->get_profile();
        $staf_id    = $account->get_profile_id();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                        'unit_source_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $model::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $model::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
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
                'property'  => $disposisi_masuk::$field_receiver_id,
                'value'     => $staf_id,
                'type'      =>'exact'
            ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => $disposisi::$field_induk.' IS NOT NULL'
            ));
            // array_unshift($filter, (object)array(
            //     'property'  => $surat::$field_distribusi_lookup,
            //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
            //     'type'      => 'exact'
            // ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }

                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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

    function suratmasuk_eks(){
        $me                     = $this;
        $account                = $me->m_account;
        $staf                   = $me->m_staf;
        $pengaturan             = $me->m_pengaturan;
        $surat                  = $me->m_surat;
        $surat_view             = $me->m_surat_view;
        $disposisi              = $me->m_disposisi;
        $disposisi_view         = $me->m_disposisi_view;
        $disposisi_masuk        = $me->m_disposisi_masuk;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;
        $model   = $me->m_disposisi_masuk_view;
        
        $user = $account->get_profile();
        $pegawai = $account->get_profile_id();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$pegawai);
            $pgs = json_decode($pgs, true);
        }

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $disposisi_masuk::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $disposisi_masuk::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
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
            $filter = json_decode(varGet('filter','[]'));
            $sorter = json_decode(varGet('sorter',varGet('sort', '[]')));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                        $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                            'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                            'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                            'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                            'unit_source_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }

            array_unshift($filter, (object)array(
                'property'  => $disposisi_masuk::$field_receiver_id,
                'value'     => $pegawai,
                'type'      =>'exact'
            ));
            // array_unshift($filter, (object)array(
            //     'property'  => $surat_view::$field_isdistribusi,
            //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
            //     'type'      =>'exact'
            // ));
            // array_unshift($filter, (object)array(
            //     'type'      =>'custom',
            //     'value'     => $disposisi::$field_induk.' IS NULL'
            // ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'disposisi_mode = "Masuk" AND surat_model = 1'
            ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);

            $records = $model->select(array(
                'limit'     => varGet('limit'),
                'start'     => varGet('start'),
                'filter'    => $filter,
                'sorter'    => $sorter,
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }

                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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
            $me->response($records);
        }
    }

    function suratmasuk_int(){
        $me                     = $this;
        $account                = $me->m_account;
        $staf                   = $me->m_staf;
        $surat                  = $me->m_surat;
        $surat_view             = $me->m_surat_view;
        $disposisi              = $me->m_disposisi;
        $disposisi_view         = $me->m_disposisi_view;
        $disposisi_masuk        = $me->m_disposisi_masuk;
        $model                  = $me->m_disposisi_masuk_view;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;
        $pengaturan             = $me->m_pengaturan;
        
        $user = $account->get_profile();
        $pegawai = $account->get_profile_id();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$pegawai);
            $pgs = json_decode($pgs, true);
        }

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $disposisi_masuk::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $disposisi_masuk::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
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
            $filter = json_decode(varGet('filter','[]'));
            $sorter = json_decode(varGet('sorter',varGet('sort', '[]')));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                        $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                            'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                            'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                            'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                            'unit_source_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }

            array_unshift($filter, (object)array(
                'property'  => $disposisi_masuk::$field_receiver_id,
                'value'     => $pegawai,
                'type'      =>'exact'
            ));
            // array_unshift($filter, (object)array(
            //     'property'  => $surat_view::$field_isdistribusi,
            //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
            //     'type'      =>'exact'
            // ));
            // array_unshift($filter, (object)array(
            //     'type'      =>'custom',
            //     'value'     => $disposisi::$field_induk.' IS NULL'
            // ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'disposisi_mode = "Masuk" AND surat_model = 3'
            ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);

            $records = $model->select(array(
                'limit'     => varGet('limit'),
                'start'     => varGet('start'),
                'filter'    => $filter,
                'sorter'    => $sorter,
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }

                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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
            $me->response($records);
        }
    }

    function tembusan($section = null){
        $me = $this;

        $account      = $me->m_account;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;

        $disposisi_masuk   = $me->m_disposisi_masuk;
        $disposisi_netral_view  = $me->m_disposisi_netral_view;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_view;
        $model   = $me->m_disposisi_masuk_view;

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $user       = $account->get_profile();
        $staf_id    = $account->get_profile_id();

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                        'unit_source_nama');

                    $value = $val->value;
                    $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                    $costumFilter = array(array(
                                'value' => $query,
                                'type'  => 'custom'
                            ));
                }else{
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                    $filter3 = array(array(
                                'value' => $query2,
                                'type'  => 'custom'
                            ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if(varGetHas('id') || varGetHas('disposisi_masuk_id')){
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $disposisi_masuk_view::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $model->read($id);
            $me->response_record($record);

        }else{
            array_unshift($filter, (object)array(
                'property'  => $disposisi_masuk::$field_receiver_id,
                'value'     => $staf_id,
                'type'      =>'exact'
            ));

            array_unshift($filter, (object)array(
                'property'  => 'disposisi_masuk_istembusan',
                'value'     => 1,
                'type'      => 'exact'
            ));

            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => $filter,
                'sorter'    => $sorter
            ));

            // print_r($model->get_lastquery());
            // die;
            
            $me->response($operation);
        }
    }

    function asistensi($section = null){
        $me                     = $this;
        $account                = $me->m_account;
        $staf                   = $me->m_staf;
        $surat                  = $me->m_surat;
        $surat_view             = $me->m_surat_view;
        $disposisi              = $me->m_disposisi;
        $disposisi_view         = $me->m_disposisi_view;
        $disposisi_masuk        = $me->m_disposisi_masuk;
        $pengaturan             = $me->m_pengaturan;
        $disposisi_jumlah_penerima   = $me->m_disposisi_jumlah_penerima;
        $disposisi_jumlah_disposisi   = $me->m_disposisi_jumlah_disposisi;

        $asisten = varGet('asisten');
        $mode    = varGet('mode');
        
        $staf_id = $account->get_profile_id();
        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');

        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

        if($asisten !== null){
            $pegawai = $staf->read($asisten);
            $pegawai_jabatan = $pegawai['staf_jabatan'];
            $pegawai = $asisten;
        }else{
            $pegawai = null;
        }

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $disposisi_masuk->read($id);

            /*patch for flag as read if user acess it*/
            if($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf']))
            {
                if((int)$get_record['disposisi_masuk_isbaca'] == $disposisi_masuk::BACA_INIT)
                {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_isbaca'=> $disposisi_masuk::BACA_ISBACA,
                        'disposisi_masuk_baca_tanggal'=> date('Y-m-d H:i:s')
                    ));
                }
            }
            $record = $disposisi_masuk->read($id);
                
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }
            
            $data_staf = $staf->read($record['disposisi_masuk_staf']);
            if (($data_staf['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($data_staf['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            }else{
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($data_staf['staf_status'] == 1) {
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
        } else {
            $filter = json_decode(varGet('filter','[]'));
            $sorter = json_decode(varGet('sorter',varGet('sort', '[]')));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                        $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                            'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                            'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                            'disposisi_pengirim_jabatan_nama', 'perintah_nama', 'disposisi_pesan', 'disposisi_mode', 
                            'unit_source_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }

            switch ($section) {
                case 'suratmasuk_int' :
                    $model   = $me->m_disposisi_masuk_view;
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "(" . $disposisi_masuk::$field_receiver_id . " = '" . $pegawai . "' OR " . $disposisi_masuk::$field_receiver_jabatan_id . " = '" . $pegawai_jabatan . "')"
                    ));
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
                        'value'     => 'surat_model = 3'
                    ));
                break;
                case 'suratmasuk_eks' :
                    $model   = $me->m_disposisi_masuk_view;
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "(" . $disposisi_masuk::$field_receiver_id . " = '" . $pegawai . "' OR " . $disposisi_masuk::$field_receiver_jabatan_id . " = '" . $pegawai_jabatan . "')"
                    ));
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
                        'value'     => 'surat_model = 1'
                    ));
                break;
                case 'notadinas' :
                    $model   = $me->m_notadinas_masuk_view;
                    array_unshift($filter, (object)array(
                        'property'  => $disposisi_masuk::$field_receiver_id,
                        'value'     => $pegawai,
                        'type'      =>'exact'
                    ));
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => $disposisi::$field_induk.' IS NOT NULL'
                    ));
                    // array_unshift($filter, (object)array(
                    //     'property'  => $surat::$field_distribusi_lookup,
                    //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
                    //     'type'      => 'exact'
                    // ));
                break;
                case 'disposisimasuk' :
                    $model   = $me->m_disposisi_masuk_view;
                    array_unshift($filter, (object)array(
                        'property'  => $disposisi_masuk::$field_receiver_id,
                        'value'     => $pegawai,
                        'type'      =>'exact'
                    ));
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => $disposisi::$field_induk.' IS NOT NULL'
                    ));
                    // array_unshift($filter, (object)array(
                    //     'property'  => $surat::$field_distribusi_lookup,
                    //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
                    //     'type'      => 'exact'
                    // ));
                break;
                case 'surat_all' :
                    $model   = $me->m_disposisi_masuk_netral_view;
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "(" . $disposisi_masuk::$field_receiver_id . " = '" . $pegawai . "' OR " . $disposisi_masuk::$field_receiver_jabatan_id . " = '" . $pegawai_jabatan . "')"
                    ));
                    // array_unshift($filter, (object)array(
                    //     'property'  => $surat::$field_distribusi_lookup,
                    //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
                    //     'type'      => 'exact'
                    // ));
                break;
		        case 'tercabut' :
                    $model   = $me->m_disposisi_masuk_nonaktif_view;
                    array_unshift($filter, (object)array(
                        'property'  => $disposisi_masuk::$field_receiver_id,
                        'value'     => $pegawai,
                        'type'      =>'exact'
                    ));
                    // array_unshift($filter, (object)array(
                    //     'property'  => $surat::$field_distribusi_lookup,
                    //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
                    //     'type'      => 'exact'
                    // ));
                break;
                case 'teruskan' :
                    $model   = $me->m_mb_disposisi_masuk_netral_teruskan_view;
                    array_unshift($filter, (object)array(
                        'property'  => $disposisi_masuk::$field_receiver_id,
                        'value'     => $pegawai,
                        'type'      =>'exact'
                    ));
                    // array_unshift($filter, (object)array(
                    //     'property'  => $surat::$field_distribusi_lookup,
                    //     'value'     => $surat::DISTRIBUSI_DISTRIBUSI,
                    //     'type'      => 'exact'
                    // ));
                break;
                case 'tugassaya' :
                    switch ($mode) {
                        case 'disposisi':
                            $model = $me->m_mb_disposisi_masuk_blm_tindak_view;
                        break;
                        case 'eksternal':
                            $model = $me->m_mb_disposisi_masuk_eksternal_blm_tindak_view;
                        break;
                        case 'internal':
                            $model = $me->m_mb_disposisi_masuk_internal_blm_tindak_view;
                        break;
                        case 'draf':
                            $model = $me->m_mb_disposisi_masuk_draf_blm_tindak_view;
                        break;
                        default:
                            $model = $me->m_mb_disposisi_masuk_netral_blm_tindak_view;
                        break;
                    }
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "(" . $disposisi_masuk::$field_receiver_id . " = '" . $pegawai . "' OR " . $disposisi_masuk::$field_receiver_jabatan_id . " = '" . $pegawai_jabatan . "')"
                    ));
                break;
            }
            
            $filter = json_encode($filter);
            $sorter = json_encode($sorter);
            $operation = $model->select(array(
                'limit'     => varGet('limit'),
                'start'     => varGet('start'),
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
                $data_staf = $staf->read($value['disposisi_masuk_staf']);
                if (($data_staf['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($data_staf['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                }else{
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($data_staf['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }

                // if($value['disposisi_masuk_staf']){
                //     $redis_disposisi = $redis->get(Config()->item('redisPrefix').'disposisi_sama:'.$value['disposisi_surat'].'-'.$value['disposisi_masuk_staf']);
                //      if(!$redis_disposisi){
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
            
            $this->response($operation);
        }
    }

    function disposisiSama(){ /*Semua Penerima dg Disposisi yg Sama*/
        $me = $this;

        $account      = $me->m_account;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $model  = $me->m_disposisi_masuk_netral_view;

        $id = varGet('id');
        $dm_id = varGet('dm_id');
        $stafId = varGet('stafId');
        $jabatanId = varGet('jabatanId');

        if(empty($stafId)) {
            $records = $model->find(array(
                'surat_id' => $id,
                'disposisi_masuk_id <> "'. $dm_id. '"' => null,
                'disposisi_masuk_jabatan' => $jabatanId,
            ), null, null, null, array('disposisi_masuk_terima_tgl'=>'ASC'));
        } else {
            $records = $model->find(array(
                'surat_id' => $id,
                'disposisi_masuk_id <> "'. $dm_id. '"' => null,
                'disposisi_masuk_staf' => $stafId,
            ), null, null, null, array('disposisi_masuk_terima_tgl'=>'ASC'));
        }
        
        foreach ($records as $key => &$value) {
            $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['disposisi_masuk_penerima_id'];
        }
        
        $me->response($records);
    }

    function penerima(){ /*Penerima Lain*/
        $me = $this;

        $account      = $me->m_account;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $model  = $me->m_disposisi_masuk_netral_view;
        // $model   = $me->m_disposisi_masuk_view;

        $id = varGet('id');

        $records = $model->find(array(
            'disposisi_masuk_disposisi'=> $id), null, null, null, 
            array('disposisi_masuk_istembusan'=>'ASC'));
        
        foreach ($records as $key => &$value) {
            $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['disposisi_masuk_penerima_id'];
        }
        
        $me->response($records);
    }
    
    function penerima_new(){ /*Penerima Lain*/
        $me = $this;

        $account      = $me->m_account;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $disposisi    = $me->m_disposisi;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $model  = $me->m_disposisi_masuk_netral_view;
        // $model   = $me->m_disposisi_masuk_view;

        $filter = json_decode(varGet('filter','[]'));
        $sorter = json_decode(varGet('sorter',varGet('sort', '[]')));

        $id = varGet('id');
        $disposisi_id = varGet('disposisi_masuk_id');

        if($disposisi_id){
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'disposisi_masuk_id <> "'.$disposisi_id.'"'
            ));
        }

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => 'disposisi_masuk_disposisi = "'.$id.'"'
        ));

        $filter = json_encode($filter);
        $sorter = json_encode($sorter);
        $operation = $model->select(array(
            'limit'     => varGet('limit'),
            'start'     => varGet('start'),
            'filter'    => $filter,
            'sorter'    => $sorter
        ));
        
        $me->response($operation);
    }

}