<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Terkirim extends Base_Controller {

	function __construct(){
        parent::__construct();

        $this->m_account      = $this->model('sipas/account',      true);
        $this->m_notification = $this->model('sipas/notification', true);

        $this->m_staf            = $this->model('sipas/staf',                 true);
        $this->m_disposisi       = $this->model('sipas/disposisi',            true);
        $this->m_disposisi_view  = $this->model('sipas/disposisi_view',       true);

        $this->m_disposisi_riwayat_view           = $this->model('sipas/disposisi_riwayat_view',    true);
        $this->m_disposisi_riwayat_aktif_view     = $this->model('sipas/disposisi_riwayat_aktif_view',    true);
        $this->m_disposisi_riwayat_nonaktif_view  = $this->model('sipas/disposisi_riwayat_nonaktif_view', true);
    }

    function index()
    {
        $this->read();
    }

    function testing ($section = null){
        $model = $this->m_notification;

        $data = $model->get_newnotif_of('masuk');
        echo "<pre>";
        print_r($data);
    }

    function read(){ /*semua surat terkirim*/
    	$me = $this;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $disposisi      = $me->m_disposisi;

        $disposisi_riwayat_view = $me->m_disposisi_riwayat_view;

        $pegawai = $user['staf_id'];
        $filter  = json_decode(varGet('filter','[]'));

        $costumFilter = array();
        $nonCustomFilter = array();

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$profileId);
            $pgs = json_decode($pgs, true);
        }

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama', 'perintah_nama', 'disposisi_pesan');

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

        $limit   = varGet('limit');
        $start   = varGet('start', 0);
        $sorter  = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_riwayat_view->read($id);
            
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_pengirim_jabatan']) || ($user['staf_unit'] !== $record['disposisi_pengirim_unit'])) {
                $record['disposisi_profil_isganti'] = 1;
            }else{
                $record['disposisi_profil_isganti'] = 0;
            }
            $this->response_record($record);
        }else{
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'disposisi_staf',
                'value'     => $pegawai
            ));
            $filter = json_encode($filter);
            $operation = $disposisi_riwayat_view->select(array(
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
                if (($user['staf_jabatan'] !== $value['disposisi_pengirim_jabatan']) || ($user['staf_unit'] !== $value['disposisi_pengirim_unit'])) {
                    $value['disposisi_profil_isganti'] = 1;
                }else{
                    $value['disposisi_profil_isganti'] = 0;
                }

            }
            $this->response($operation);
        }
    }

    function tercabut(){ /*semua surat terkirim*/
        $me = $this;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $disposisi      = $me->m_disposisi;

        $disposisi_riwayat_view = $me->m_disposisi_riwayat_nonaktif_view;

        $pegawai = $user['staf_id'];
        $filter  = json_decode(varGet('filter','[]'));

        $now = date('Y-m-d'); 
        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$profileId);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama', 'perintah_nama', 'disposisi_pesan');

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

        $limit   = varGet('limit');
        $start   = varGet('start', 0);
        $sorter  = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_view->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }
            
            $this->response_record($record);

        }else{
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'disposisi_staf',
                'value'     => $pegawai
            ));
            $filter = json_encode($filter);
            $operation = $disposisi_riwayat_view->select(array(
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
            
            $this->response($operation);
        }
    }

    function disposisi(){ /*semua disposisi terkirim*/
        $me = $this;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $disposisi      = $me->m_disposisi;

        $disposisi_riwayat_view = $me->m_disposisi_riwayat_view;

        $pegawai = $user['staf_id'];
        $filter  = json_decode(varGet('filter','[]'));

        $now = date('Y-m-d'); 
        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$profileId);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama', 'perintah_nama', 'disposisi_pesan');

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

        $limit   = varGet('limit');
        $start   = varGet('start', 0);
        $sorter  = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_view->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            $this->response_record($record);

        }else{
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'disposisi_staf',
                'value'     => $pegawai
            ));

            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'IFNULL(disposisi_model_sub, 0) = 0'
            ));

            $filter = json_encode($filter);
            $operation = $disposisi_riwayat_view->select(array(
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
            
            $this->response($operation);
        }
    }

    function notadinas(){ /*semua notadinas terkirim*/
        $me = $this;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $disposisi      = $me->m_disposisi;

        $disposisi_riwayat_view = $me->m_disposisi_riwayat_view;

        $pegawai = $user['staf_id'];
        $filter  = json_decode(varGet('filter','[]'));

        $now = date('Y-m-d'); 
        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$profileId);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama', 'perintah_nama', 'disposisi_pesan');

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

        $limit   = varGet('limit');
        $start   = varGet('start', 0);
        $sorter  = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_view->read($id);
            
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            $this->response_record($record);

        }else{
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'disposisi_staf',
                'value'     => $pegawai
            ));

            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'IFNULL(disposisi_model_sub, 0) = 1'
            ));

            $filter = json_encode($filter);
            $operation = $disposisi_riwayat_view->select(array(
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
            
            $this->response($operation);
        }
    }

    function eksternal(){ /*semua surat terkirim*/
        $me = $this;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $disposisi      = $me->m_disposisi;

        $disposisi_riwayat_view = $me->m_disposisi_riwayat_view;

        $pegawai = $user['staf_id'];
        $filter  = json_decode(varGet('filter','[]'));

        $now = date('Y-m-d'); 
        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$profileId);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama', 'perintah_nama', 'disposisi_pesan');

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

        $limit   = varGet('limit');
        $start   = varGet('start', 0);
        $sorter  = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_view->read($id);
            
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            $this->response_record($record);
        }
        else{
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'disposisi_staf',
                'value'     => $pegawai
            ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'surat_model = 1'
            ));
            $filter = json_encode($filter);
            $operation = $disposisi_riwayat_view->select(array(
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
            
            $this->response($operation);
        }
    }

    function internal(){ /*semua surat terkirim*/
        $me = $this;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $disposisi      = $me->m_disposisi;

        $disposisi_riwayat_view = $me->m_disposisi_riwayat_view;

        $pegawai = $user['staf_id'];
        $filter  = json_decode(varGet('filter','[]'));

        $now = date('Y-m-d'); 
        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$profileId);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama', 'perintah_nama', 'disposisi_pesan');

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

        $limit   = varGet('limit');
        $start   = varGet('start', 0);
        $sorter  = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_view->read($id);
            
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            $this->response_record($record);

        } else{
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'disposisi_staf',
                'value'     => $pegawai
            ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'surat_model = 3'
            ));
            $filter = json_encode($filter);
            $operation = $disposisi_riwayat_view->select(array(
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
            
            $this->response($operation);
        }
    }
    
    function asistensi($section = null){
        $me = $this;
        $account        = $me->m_account;
        $staf           = $me->m_staf;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $disposisi      = $me->m_disposisi;

        $disposisi_riwayat_view = $me->m_disposisi_riwayat_view;

        $filter  = json_decode(varGet('filter','[]'));

        $costumFilter = array();
        $nonCustomFilter = array();

        $asisten = varGet('asisten');
        $now = date('Y-m-d'); 
        
        if($asisten !== null){
            $pegawai = $asisten;
        }else{
            $pegawai = null;
        }

        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$profileId);
            $pgs = json_decode($pgs, true);
        }

        if(!empty($filter)){
            foreach ($filter as $i => $val) {

                if(isset($val->field) == 'surat_perihal' || $val->property == 'query'){
                    $custom_filter  = array('surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama', 'perintah_nama', 'disposisi_pesan');

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

        $limit   = varGet('limit');
        $start   = varGet('start', 0);
        $sorter  = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_view->read($id);
                
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }
            
            $this->response_record($record);
        }else{
            switch ($section) {
                case 'read' :
                    array_unshift($filter, (object)array(
                        'type'      => 'exact',
                        'property'  => 'disposisi_staf',
                        'value'     => $pegawai
                    ));
                break;
                case 'disposisi' :
                    array_unshift($filter, (object)array(
                        'type'      => 'exact',
                        'property'  => 'disposisi_staf',
                        'value'     => $pegawai
                    ));

                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'IFNULL(disposisi_model_sub, 0) = 0'
                    ));
                break;
                case 'tercabut' :
                    array_unshift($filter, (object)array(
                        'type'      => 'exact',
                        'property'  => 'disposisi_staf',
                        'value'     => $pegawai
                    ));

                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'IFNULL(disposisi_iscabut, 0) = 1'
                    ));
                break;
                case 'notadinas' :
                    array_unshift($filter, (object)array(
                        'type'      => 'exact',
                        'property'  => 'disposisi_staf',
                        'value'     => $pegawai
                    ));

                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'IFNULL(disposisi_model_sub, 0) = 1'
                    ));
                break;
                case 'eksternal' :
                    array_unshift($filter, (object)array(
                        'type'      => 'exact',
                        'property'  => 'disposisi_staf',
                        'value'     => $pegawai
                    ));
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'surat_model = 1'
                    ));
                break;
                case 'internal' :
                    array_unshift($filter, (object)array(
                        'type'      => 'exact',
                        'property'  => 'disposisi_staf',
                        'value'     => $pegawai
                    ));
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'surat_model = 3'
                    ));
                break;                    
            }
            
            $filter = json_encode($filter);
            $operation = $disposisi_riwayat_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => $filter,
                'sorter'    => $sorter
            ));
 
           // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
           //      foreach ($operation['data'] as $key => &$value) {
           //          $value['disposisi_masuk_plt'] = 1;
           //      }
           //  }else{
           //      foreach ($operation['data'] as $key => &$value) {
           //          $value['disposisi_masuk_plt'] = 0;
           //      }
           //  }
            
            
            $this->response($operation);
        }
    }
}