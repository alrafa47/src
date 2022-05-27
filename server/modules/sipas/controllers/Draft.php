<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Draft extends Base_Controller
{

    function __construct()
    {
        parent::__construct();

        $this->m_account      = $this->model('sipas/account',       true);
        $this->m_notification = $this->model('sipas/notification',  true);
        $this->m_pengaturan   = $this->model('sipas/pengaturan',    true);

        $this->m_staf       = $this->model('sipas/staf',      true);
        $this->m_surat      = $this->model('sipas/surat',      true);
        $this->m_surat_view = $this->model('sipas/surat_view', true);
        $this->m_surat_stack = $this->model('sipas/surat_stack', true);
        $this->m_surat_stack_koreksi_view   = $this->model('sipas/surat_stack_koreksi_view', true);
        $this->m_surat_stack_petikan_view   = $this->model('sipas/surat_stack_petikan_view', true);

        $this->m_disposisi       = $this->model('sipas/disposisi',              true);
        $this->m_disposisi_view  = $this->model('sipas/disposisi_view',         true);
        $this->m_disposisi_masuk   = $this->model('sipas/disposisi_masuk',      true);

        $this->m_koreksi_masuk_view           = $this->model('sipas/koreksi_masuk_aktif_view',      true);
        $this->m_koreksi_masuk_blmtindak_view = $this->model('sipas/koreksi_masuk_blmtindak_view',   true);
        $this->m_koreksi_masuk_setuju_view    = $this->model('sipas/koreksi_masuk_setuju_view',      true);
        $this->m_koreksi_masuk_tolak_view     = $this->model('sipas/koreksi_masuk_tolak_view',       true);
        $this->m_koreksi_masuk_view           = $this->model('sipas/koreksi_masuk_view',             true);
        $this->m_koreksi_masuk_status_view    = $this->model('sipas/koreksi_masuk_status_view',      true);
    }

    function index()
    {
        $this->read();
    }

    function read()
    {
        $me = $this;

        $koreksi        = $me->m_disposisi;
        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $account        = $me->m_account;
        $pengaturan     = $me->m_pengaturan;
        $penerima_view  = $me->m_koreksi_masuk_status_view;

        $user         = $account->get_profile();
        $user_id        = $account->get_profile_id();

        $filter         = json_decode(varGet('filter', '[]'));

        $costumFilter   = array();
        $nonCustomFilter = array();

        $now = date('Y-m-d');

        $useredis = Config()->item('useredis');
        if ($useredis == 1) {
            $pgs = $redis->get(Config()->item('redisPrefix') . 'staf_wakil_staf:' . $user_id);
            $pgs = json_decode($pgs, true);
        }

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if (isset($val->field) == 'surat_perihal' || $val->property == 'query') {
                    $custom_filter  = array(
                        'surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'disposisi_mode', 'unit_source_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }
        $filter = $this->filter_tipe_surat($filter);
        $sorter     =  json_decode(varGet('sorter', varGet('sort', '[]')));

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $penerima_view->read($id);

            /*patch for flag as read if user acess it*/
            if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
                if ((int)$get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s')
                    ));
                }
            }

            $record = $penerima_view->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            } else {
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
                $record['staf_hide'] = 1;
            } else {
                $record['staf_hide'] = 0;
            }
            $this->response_record($record);
        } else {
            array_unshift($filter, (object)array(
                'property'  => 'disposisi_masuk_staf',
                'value'     => $user_id,
                'type'      => 'exact'
            ));
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                } else {
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }
            }

            $this->response($records);
        }
    }

    function blmtindak()
    {
        $me = $this;

        $koreksi        = $me->m_disposisi;
        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();
        $pengaturan     = $me->m_pengaturan;

        $koreksi_penerima     = $me->m_disposisi_masuk;
        $penerima_view        = $me->m_koreksi_masuk_blmtindak_view;

        $now = date('Y-m-d');

        $pegawai    = $user['staf_id'];
        $filter     = json_decode(varGet('filter', '[]'));

        $now = date('Y-m-d');

        $useredis = Config()->item('useredis');
        if ($useredis == 1) {
            $pgs = $redis->get(Config()->item('redisPrefix') . 'staf_wakil_staf:' . $profileId);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if (isset($val->field) == 'surat_perihal' || $val->property == 'query') {
                    $custom_filter  = array(
                        'surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'disposisi_mode', 'unit_source_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }
        $sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

        $filter = $this->filter_tipe_surat($filter);

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $penerima_view->read($id);

            /*patch for flag as read if user acess it*/
            if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
                if ((int)$get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s')
                    ));
                }
            }

            $record = $penerima_view->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            } else {
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
                $record['staf_hide'] = 1;
            } else {
                $record['staf_hide'] = 0;
            }
            $this->response_record($record);
        } else {
            array_unshift($filter, (object)array(
                'property'  => 'disposisi_masuk_staf',
                'value'     => $pegawai,
                'type'      => 'exact'
            ));
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                } else {
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }
            }
            $this->response($records);
        }
    }

    function setuju()
    {
        $me = $this;

        $koreksi        = $me->m_disposisi;
        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();

        $koreksi_penerima     = $me->m_disposisi_masuk;
        $penerima_view        = $me->m_koreksi_masuk_setuju_view;

        $pegawai    = $user['staf_id'];
        $filter     = json_decode(varGet('filter', '[]'));


        $now = date('Y-m-d');

        $useredis = Config()->item('useredis');
        if ($useredis == 1) {
            $pgs = $redis->get(Config()->item('redisPrefix') . 'staf_wakil_staf:' . $profileId);
            $pgs = json_decode($pgs, true);
        }

        $costumFilter = array();
        $nonCustomFilter = array();

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if (isset($val->field) == 'surat_perihal' || $val->property == 'query') {
                    $custom_filter  = array(
                        'surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'disposisi_mode', 'unit_source_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }
        $sorter     =  json_decode(varGet('sorter', varGet('sort', '[]')));
        $filter = $this->filter_tipe_surat($filter);

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $penerima_view->read($id);

            /*patch for flag as read if user acess it*/
            if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
                if ((int)$get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s')
                    ));
                }
            }

            $record = $penerima_view->read($id);
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            } else {
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
                $record['staf_hide'] = 1;
            } else {
                $record['staf_hide'] = 0;
            }

            $this->response_record($record);
        } else {
            array_unshift($filter, (object)array(
                'property'  => 'disposisi_masuk_staf',
                'value'     => $pegawai,
                'type'      => 'exact'
            ));
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                } else {
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }
            }

            $this->response($records);
        }
    }

    function tolak()
    {
        $me = $this;

        $koreksi        = $me->m_disposisi;
        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $account        = $me->m_account;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();

        $koreksi_penerima     = $me->m_disposisi_masuk;
        $penerima_view        = $me->m_koreksi_masuk_tolak_view;

        $pegawai    = $user['staf_id'];
        $filter     = json_decode(varGet('filter', '[]'));

        $now = date('Y-m-d');

        $redis = new Redis();
        $redis->connect('publish-sipaslab.sekawanmedia.co.id', 6379);
        $redis->auth("password");


        $pgs = $redis->get(Config()->item('redisPrefix') . 'staf_wakil_staf:' . $profileId);
        $pgs = json_decode($pgs, true);

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if (isset($val->field) == 'surat_perihal' || $val->property == 'query') {
                    $custom_filter  = array(
                        'surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'disposisi_mode', 'unit_source_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }
        $sorter     =  json_decode(varGet('sorter', varGet('sort', '[]')));
        $filter = $this->filter_tipe_surat($filter);

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $penerima_view->read($id);

            /*patch for flag as read if user acess it*/
            if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
                if ((int)$get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s')
                    ));
                }
            }

            $record = $penerima_view->read($id);
            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            if (($user['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            } else {
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
                $record['staf_hide'] = 1;
            } else {
                $record['staf_hide'] = 0;
            }

            $this->response_record($record);
        } else {
            array_unshift($filter, (object)array(
                'property'  => 'disposisi_masuk_staf',
                'value'     => $pegawai,
                'type'      => 'exact'
            ));
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT
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
                if (($user['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($user['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                } else {
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($user['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }
            }
            $this->response($records);
        }
    }

    function filter_tipe_surat($filter)
    {
        $tipe_surat = varGet('tipe_surat');
        if ($tipe_surat) {
            // default luar
            $condition = 'surat_keluar_type IS NULL || surat_keluar_type = 0';
            // jika tipe surat dalam
            if ($tipe_surat == "dalam") {
                $condition = 'surat_keluar_type = 1';
            }
            array_unshift($filter, (object)array(
                'value'     => $condition,
                'type'      => 'custom'
            ));
        }
        return $filter;
    }

    function asistensi($section = null)
    {
        $me = $this;

        $koreksi        = $me->m_disposisi;
        $staf           = $me->m_staf;
        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $account        = $me->m_account;
        $pengaturan     = $me->m_pengaturan;
        $user           = $account->get_profile();
        $profileId      = $account->get_profile_id();

        $koreksi_penerima     = $me->m_disposisi_masuk;
        $penerima_view        = $me->m_koreksi_masuk_status_view;

        $asisten    = varGet('asisten');
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     =  json_decode(varGet('sorter', varGet('sort', '[]')));

        if ($asisten !== null) {
            $pegawai = $asisten;
        } else {
            $pegawai = null;
        }

        $costumFilter = array();
        $nonCustomFilter = array();
        $now = date('Y-m-d');

        $useredis = Config()->item('useredis');
        if ($useredis == 1) {
            $pgs = $redis->get(Config()->item('redisPrefix') . 'staf_wakil_staf:' . $profileId);
            $pgs = json_decode($pgs, true);
        }

        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if (isset($val->field) == 'surat_perihal' || $val->property == 'query') {
                    $custom_filter  = array(
                        'surat_perihal', 'surat_tujuan', 'surat_pengirim',
                        'surat_nomor', 'surat_registrasi', 'unit_nama', 'jenis_nama',
                        'disposisi_pengirim_nama', 'disposisi_pengirim_unit_nama',
                        'disposisi_pengirim_jabatan_nama', 'disposisi_mode', 'unit_source_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
                    $filter3 = array(array(
                        'value' => $query2,
                        'type'  => 'custom'
                    ));
                    $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                }
            }

            $filter = array_merge($costumFilter, $nonCustomFilter);
        }

        if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
            $id = varGet('id', varGet('disposisi_masuk_id'));
            $get_record = $penerima_view->read($id);

            /*patch for flag as read if user acess it*/
            if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
                if ((int)$get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
                    $disposisi_masuk->update($id, array(
                        'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s')
                    ));
                }
            }

            $record = $penerima_view->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }

            $data_staf = $staf->read($record['disposisi_masuk_staf']);
            if (($data_staf['staf_jabatan'] !== $record['disposisi_masuk_penerima_jabatan_id']) || ($data_staf['staf_unit'] !== $record['disposisi_masuk_penerima_unit_id'])) {
                $record['disposisi_masuk_profil_isganti'] = 1;
            } else {
                $record['disposisi_masuk_profil_isganti'] = 0;
            }

            if ($data_staf['staf_status'] == 1) {
                $record['staf_hide'] = 1;
            } else {
                $record['staf_hide'] = 0;
            }
            $this->response_record($record);
        } else {
            array_unshift($filter, (object)array(
                'property'  => 'disposisi_masuk_staf',
                'value'     => $pegawai,
                'type'      => 'exact'
            ));
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT
            ));

            switch ($section) {
                case 'read':
                    $penerima_view        = $me->m_koreksi_masuk_status_view;
                    break;
                case 'blmtindak':
                    $penerima_view        = $me->m_koreksi_masuk_blmtindak_view;
                    break;
                case 'setuju':
                    $penerima_view        = $me->m_koreksi_masuk_setuju_view;
                    break;
                case 'tolak':
                    $penerima_view        = $me->m_koreksi_masuk_tolak_view;
                    break;
            }

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
                $data_staf = $staf->read($value['disposisi_masuk_staf']);
                if (($data_staf['staf_jabatan'] !== $value['disposisi_masuk_penerima_jabatan_id']) || ($data_staf['staf_unit'] !== $value['disposisi_masuk_penerima_unit_id'])) {
                    $value['disposisi_masuk_profil_isganti'] = 1;
                } else {
                    $value['disposisi_masuk_profil_isganti'] = 0;
                }

                if ($data_staf['staf_status'] == 1) {
                    $value['staf_hide'] = 1;
                } else {
                    $value['staf_hide'] = 0;
                }
            }

            $this->response($records);
        }
    }

    function penyetuju()
    { /*PENYETUJU Lain*/
        $me = $this;

        $account      = $me->m_account;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $surat_stack  = $me->m_surat_stack;
        $disposisi    = $me->m_disposisi;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $model             = $me->m_surat_stack_koreksi_view;

        $id = varGet('id');

        $records = $model->find(array(
            'surat_stack_surat' => $id
        ), false, false, true, array('surat_stack_level' => 'asc'));
        foreach ($records as $key => &$value) {
            $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $value['surat_stack_staf'];
        }

        $me->response($records);
    }

    function petikan()
    { /*PETIKAN Lain*/
        $me = $this;

        $account      = $me->m_account;
        $surat        = $me->m_surat;
        $surat_view   = $me->m_surat_view;
        $surat_stack  = $me->m_surat_stack;
        $disposisi    = $me->m_disposisi;

        $disposisi_view    = $me->m_disposisi_view;
        $disposisi_masuk   = $me->m_disposisi_masuk;
        $model             = $me->m_surat_stack_petikan_view;

        $id = varGet('id');

        $records = $model->find(array(
            'surat_stack_surat' => $id
        ), false, false, true, array('surat_stack_level' => 'asc'));
        foreach ($records as $key => &$value) {
            $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $value['surat_stack_staf'];
        }

        $me->response($records);
    }
}
