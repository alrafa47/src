<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Staf extends Base_Controller
{

    protected $message = array();

    public $report_template_jumlah_pegawai       = 'sipas/rekap/staf/rekap';
    public $report_template_jumlah_akun_pegawai  = 'sipas/rekap/staf/akses/rekap';
    public $delimiter                            = array('<!--[', ']-->'); // we use valid html tag to avoid invalid parser on front end

    public $report_title_jumlah_pegawai          = 'Laporan Rekap Jumlah Pegawai';
    public $report_subtitle_jumlah_pegawai       = 'Rekap jumlah pegawai yang tercatat pada aplikasi';
    public $report_title_jumlah_akun_pegawai     = 'Laporan Rekap Jumlah Akun Pegawai';
    public $report_subtitle_jumlah_akun_pegawai  = 'Rekap jumlah akun pegawai yang tercatat pada aplikasi';

    static $bg_color_item_laporan = array('odd' => 'background-color: #F5F5F5;', 'even' => 'background-color: #FFFFFF;');

    static $default_value = array(
        'unit' => '<span style="color:white; font-style:italic;">(Tidak Memiliki Unit)</span>',
        'unit_nama' => '<span style="color:grey; font-style:italic;">(Tidak Memiliki Unit)</span>',
        'unit_kode' => '<span style="color:grey; font-style:italic;">(Tidak Memiliki Kode Unit)</span>',
        'peran_nama' => '<span style="color:grey; font-style:italic;">(Tidak Memiliki Hak akses)</span>'
    );

    public function __construct()
    {
        parent::__construct();

        $CI = get_instance();
        require_once APPPATH . 'third_party/PHPExcel.php';
        require_once APPPATH . 'third_party/IOExcel.php';

        $this->m_staf                = $this->model('sipas/staf',                       true);
        $this->m_staf_view           = $this->model('sipas/staf_view',                  true);
        $this->m_staf_wakil          = $this->model('sipas/staf_wakil',                 true);
        $this->m_staf_aktual         = $this->model('sipas/staf_aktual',                true);
        $this->m_staf_aktual_view    = $this->model('sipas/staf_aktual_view',           true);
        $this->m_staf_tim_view       = $this->model('sipas/staf_tim_view',              true);
        $this->m_staf_tim_anggota_view = $this->model('sipas/staf_tim_anggota_view',    true);
        $this->m_peran               = $this->model('sipas/peran',                      true);
        $this->m_peran_view          = $this->model('sipas/peran_view',                 true);

        $this->m_user                = $this->model('sipas/akun',                       true);
        $this->m_account             = $this->model('sipas/account',                    true);
        $this->m_properti            = $this->model('sipas/properti',                   true);

        $this->m_staf_hidup          = $this->model('sipas/staf_hidup_view',            true);
        $this->m_staf_aktif          = $this->model('sipas/staf_aktif_view',            true);
        $this->m_staf_nonaktif       = $this->model('sipas/staf_nonaktif_view',         true);

        $this->m_unit_kerja          = $this->model('sipas/unit',                       true);
        $this->m_report_model        = $this->model('sipas/report',                     true);
        $this->m_staf_akses_view     = $this->model('sipas/staf_akses_view',            true);
        $this->m_staf_rekap_view     = $this->model('sipas/staf_rekap_view',            true);

        $this->m_jabatan             = $this->model('sipas/jabatan',                    true);
        $this->m_jabatan_wakil       = $this->model('sipas/jabatan_wakil',              true);
        $this->m_peran               = $this->model('sipas/peran',                      true);
        $this->m_unit                = $this->model('sipas/unit',                       true);

        $this->m_pengaturan          = $this->model('sipas/pengaturan',                 true);
        $this->m_staf_profil         = $this->model('sipas/staf_profil',                true);
        $this->m_staf_profil_temp    = $this->model('sipas/staf_profil_temp',           true);

        $this->config->load('application_config');
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $model = $this->m_staf_hidup;
        $modelStaf = $this->m_staf;
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $filter = $this->filterUnit($filter);

        if (varGetHas('id') || varGetHas('staf_id')) {
            $id = varGet('id', varGet('staf_id'));

            $record = null;

            if (inCacheExists($model, $id)) {
                $record = getRecordFromCache($model, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($model, $record);
                $useCache = false;
            }
            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'staf_kode LIKE "%' . $query . '%" OR staf_nama LIKE "%' . $query . '%"'
                ));
            }

            $records = $model->select(array(
                'limit'     => 25,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function akunRead()
    {
        $model = $this->m_staf_aktif;
        $modelStaf = $this->m_staf;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('staf_id')) {
            $id = varGet('id', varGet('staf_id'));
            $record = null;

            if (inCacheExists($modelStaf, $id)) {
                $record = getRecordFromCache($modelStaf, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelStaf, $record);
                $useCache = false;
            }
            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'staf_kode LIKE "%' . $query . '%" OR staf_nama LIKE "%' . $query . '%"'
                ));
            }

            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'staf_akun IS NULL'
            ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function aktif()
    {
        $model = $this->m_staf_aktif;
        $modelStaf = $this->m_staf;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));
        $mode       = varGet('mode');
        $jabatan    = varGet('jabatan');

        $filter = $this->filterUnit($filter);

        if (varGetHas('id') || varGetHas('staf_id')) {
            $id = varGet('id', varGet('staf_id'));
            $record = null;

            if (inCacheExists($modelStaf, $id)) {
                $record = getRecordFromCache($modelStaf, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelStaf, $record);
                $useCache = false;
            }
            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'staf_kode LIKE "%' . $query . '%" OR staf_nama LIKE "%' . $query . '%"'
                ));
            }
            if ($mode == 'pimpinan') {
                array_unshift($filter, (object)array(
                    'property'  => 'jabatan_id',
                    'value'     => $jabatan,
                    'type'      => 'exact'
                ));
            } else if ($mode == 'asisten') {
                array_unshift($filter, (object)array(
                    'property'  => 'jabatan_induk',
                    'value'     => $jabatan,
                    'type'      => 'exact'
                ));
            }
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function nonaktif()
    {
        $model = $this->m_staf_nonaktif;
        $modelStaf = $this->m_staf;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $filter = $this->filterUnit($filter);

        if (varGetHas('id') || varGetHas('staf_id')) {
            $id = varGet('id', varGet('staf_id'));
            $record = null;

            if (inCacheExists($modelStaf, $id)) {
                $record = getRecordFromCache($modelStaf, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelStaf, $record);
                $useCache = false;
            }
            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'staf_kode LIKE "%' . $query . '%" OR staf_nama LIKE "%' . $query . '%"'
                ));
            }

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function filterUnit($filter)
    {
        $unit = varGet('unit');
        if ($unit && $unit != 'semua') {
            array_unshift($filter, (object)array(
                'type'  => 'custom',
                'value' => "unit_id ='$unit' OR unit_induk ='$unit'"
            ));
        }
        return $filter;
    }

    public function create($usePayload = true)
    {
        $model = $this->m_staf;
        $model_view = $this->m_staf_view;
        $user = $this->m_user;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $primary = $model->get_primary();
        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $length = 8;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomNip = '';
        for ($i = 0; $i < $length; $i++) {
            $randomNip .= $characters[rand(0, $charactersLength - 1)];
        }

        $data['staf_kode'] = $randomNip;
        $data['staf_nama'] = 'Silahkan di ubah';
        $data['staf_isaktif'] = $data['akun_isaktif'];

        $operation = $model->insert($data, null, function ($response) use ($model, $user, $account, $data, $primary, $randomNip, $properti, $akun) {
            if ($response[$model->successProperty] !== true) return;
            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'staf', $inserted_data['staf_id'], $inserted_data['staf_kode']);
            if ($op) {
                $model->update($inserted_data['staf_id'], array(
                    'staf_properti' => $op['properti_id']
                ));
            }

            if ($response[$model->successProperty] !== true) return;
            $staf_id = array_key_exists($primary, $response[$model->dataProperty]) ? $response[$model->dataProperty][$primary] : null;
            // var_dump($staf_id);
            // $data_user = array(
            //     'akun_staf' => $staf_id,
            //     'akun_nama'=> $randomNip,
            //     'akun_sandi'=> '*70E101CF6074AABC69655277627B681A047A295F',
            //     'akun_display'=> array_key_exists('staf_nama', $data) ? $data['staf_nama'] : null,
            //     'akun_ponsel'=> array_key_exists('akun_ponsel', $data) ? $data['akun_ponsel'] : null,
            //     'akun_surel'=> array_key_exists('akun_surel', $data) ? $data['akun_surel'] : null,
            //     'akun_isaktif'=> array_key_exists('akun_isaktif', $data) ? $data['akun_isaktif'] : null,
            //     'akun_properti' => $op['properti_id']
            // );

            // if(array_key_exists('akun_sandi', $data)){
            //     $data_user['akun_sandi'] = $account->password($data['akun_sandi']);
            // }
            // print_r($data_user);

            // $user->insert($data_user, null, function($responses) use($model, $user, $data, $staf_id){});

            $data['staf_id'] = $model->get_insertid();
            $op = $properti->updated($data['staf_properti'], $akun, $data, 'staf', $data['staf_id']);
        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model_view->read($model->get_insertid());
        $this->response($operation);
    }

    // With Properti
    public function update($usePayload = true)
    {
        $model = $this->m_staf;
        $model_view = $this->m_staf_view;
        $staf_profil = $this->m_staf_profil;
        $user = $this->m_user;
        $account = $this->m_account;
        $properti = $this->m_properti;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $akunId = varGet('akun');
        $change_akun = 0;
        $isdefault = 0;

        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['staf_properti'];
        $dataStaf = $model_view->read($id);
        // $data['staf_isaktif'] = $data['akun_isaktif'];
        if (!empty($akunId)) {
            if ($akunId !== $data['staf_akun']) {
                $change_akun = 1;
                $isdefault = $data['staf_akun_isdefault'];
                if ($data['staf_akun']) {
                    $d_akun = $user->read(array('akun_id' => $data['staf_akun'], 'akun_staf IS NULL' => null));
                    if ($d_akun) {
                        $data['staf_akun_isdefault'] = 1;
                        $d_akun['akun_staf'] = $id;
                        $operation_user1 = $user->update($data['staf_akun'], $d_akun);
                    } else {
                        $data['staf_akun_isdefault'] = 0;
                    }
                }
            }
        }
        $operation = $model->update($id, $data, function ($response) use ($model, $model_view, $user, $account, $data, $primary, $properti, $akun, $idProp, $akunId, $isdefault, $change_akun, $staf_profil, $dataStaf) {
            $updated_data = $model->read($data['staf_id']);
            addRecordToCache($model, $response[$model->dataProperty]);
            $idProp = $updated_data['staf_properti'];
            if ($isdefault == 1 && $change_akun == 1) {
                $stafs = $model->find(array('staf_akun' => $akunId));
                if (!empty($stafs)) {
                    $data_akun = array(
                        'akun_staf' => $stafs[0]['staf_id']
                    );
                    $data_staf = array(
                        'staf_akun_isdefault' => 1
                    );

                    $operation_staf = $model->update($stafs[0]['staf_id'], $data_staf);
                } else if (!$akunId) {
                    $data_akun = array(
                        'akun_staf' => $data['staf_id']
                    );
                } else {
                    $data_akun = array(
                        'akun_staf' => null
                    );
                }
                $operation_akun = $user->update($akunId, $data_akun);
            }
            if (empty($idProp)) {
                $op = $properti->created($akun, $updated_data, 'staf', $updated_data['staf_id'], $updated_data['staf_kode']);
                if ($op) {
                    $model->update($updated_data['staf_id'], array(
                        'staf_properti' => $op['properti_id']
                    ));
                }
            }

            if ($response[$model->successProperty] !== true) return;

            // $user_id = array_key_exists('staf_akun', $response[$model->dataProperty]) ? $response[$model->dataProperty]['staf_akun'] : null;
            // $staf_id = array_key_exists($primary, $response[$model->dataProperty]) ? $response[$model->dataProperty][$primary] : null;
            // $data_user = array(
            //     'akun_staf' => $staf_id,
            //     'akun_nama'=> array_key_exists('akun_nama', $data) ? $data['akun_nama'] : null,
            //     'akun_sandi'=> array_key_exists('akun_sandi', $data) ? $data['akun_sandi'] : null,
            //     'akun_ponsel'=> array_key_exists('akun_ponsel', $data) ? $data['akun_ponsel'] : null,
            //     'akun_surel'=> array_key_exists('akun_surel', $data) ? $data['akun_surel'] : null,
            //     'akun_isaktif'=> array_key_exists('akun_isaktif', $data) ? $data['akun_isaktif'] : null,
            // );

            // if( array_key_exists('akun_sandi_edit', $data) and !!$data['akun_sandi_edit']){
            //     $data['akun_sandi'] = array_key_exists('akun_sandi', $data) ? $data['akun_sandi'] : null;
            //     $data_user['akun_sandi'] = $account->password($data['akun_sandi']);
            // }else{
            //     unset($data_user['akun_sandi']);
            // }
            if (empty($idProp)) {
                $op = $properti->created($akun);
                $idProp = $op['properti_id'];
                $data['staf_properti'] = $idProp;
            }


            if (($dataStaf['staf_jabatan'] != $data['staf_jabatan']) || ($dataStaf['staf_unit'] != $data['staf_unit']) || ($dataStaf['staf_nama'] != $data['staf_nama'])) {

                $now    = date('Y-m-d H:i:s');
                $stafBaru = $model_view->read($updated_data['staf_id']);

                $update_staf = $staf_profil->insert(array(
                    'staf_profil_staf' => $data['staf_id'],
                    'staf_profil_staf_nama' => $stafBaru['staf_nama'],
                    'staf_profil_jabatan' => $data['staf_jabatan'],
                    'staf_profil_jabatan_nama' => $stafBaru['jabatan_nama'],
                    'staf_profil_unit' => $data['staf_unit'],
                    'staf_profil_unit_nama' => $stafBaru['unit_nama'],
                    'staf_profil_buat_tgl' => $now
                ), null, function ($response) use ($model, $data) {
                    $responses = $response['data'];
                    $staf_profil_id = $responses['staf_profil_id'];

                    $model->update($data['staf_id'], array(
                        'staf_profil' => $staf_profil_id
                    ));
                });
            }

            $properti->updated($idProp, $akun, $updated_data, $updated_data['staf_kode']);

            // $op = $user->update($user_id, $data_user);

        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model_view->read($id);
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
        $model = $this->m_staf;
        $model_view = $this->m_staf_view;
        $user = $this->m_user;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['staf_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['staf_properti'] = $idProp;
        // }
        $properti->deleted($idProp, $akun);
        $data['staf_isaktif'] = 0;
        $data['staf_ishapus'] = 1;
        $data['staf_kode'] = $data['staf_id'];
        $operation = $model->update($id, $data, function ($response) use ($model, $model_view, $user, $account, $data, $primary, $properti, $akun, $idProp) {
            addRecordToCache($model, $response[$model->dataProperty]);
            $deleted_data = $model->read($data['staf_id']);
            $idProp = $deleted_data['staf_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $deleted_data, 'staf', $deleted_data['staf_id'], $deleted_data['staf_kode']);
                if ($op) {
                    $model->update($deleted_data['staf_id'], array(
                        'staf_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['staf_kode']);

            if ($response[$model->successProperty] !== true) return;

            // $user_id = array_key_exists('staf_akun', $response[$model->dataProperty]) ? $response[$model->dataProperty]['staf_akun'] : null;
            // $staf_id = array_key_exists($primary, $response[$model->dataProperty]) ? $response[$model->dataProperty][$primary] : null;
            // $data_user = array(
            //     'akun_staf' => $staf_id,
            //     'akun_nama' => $staf_id,
            //     'akun_isaktif'=> 0
            // );

            // $op = $user->update( $user_id, $data_user);

        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model_view->read($id);
        if ($operation['success']) {
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    function penerima($section = null)
    { // section = [recent,available]
        $me = $this;
        $model          = $me->m_staf_aktual_view;
        $pegawaiModel   = $me->m_staf_view;
        $pegawaiModelAktif   = $me->m_staf_aktif;

        $id         = varGet('id');
        $filter     = varGet('filter', '[]');
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $pegawai    = $me->m_account->get_profile();
        $staf_id    = $pegawai['staf_id'];
        $jabatan_id = $pegawai['jabatan_id'];
        $unit_id    = $pegawai['unit_id'];

        $filter = json_decode($filter);

        switch ($section) {
            case 'recent':
                array_unshift($filter, array(
                    'property'  => 'staf_aktual_pengirim',
                    'value'     => $staf_id,
                    'type'      => 'exact'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_aktual_penerima_status <> 1",
                    'type'      => 'custom'
                ));

                $operation = $model->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'available':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'staf':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'property'  => 'jabatan_induk',
                    'value'     => $jabatan_id,
                    'type'      => 'exact'
                ));
                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'jabatan':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'property'  => 'jabatan_id',
                    'value'     => $jabatan_id,
                    'type'      => 'exact'
                ));
                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'unitkerja':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'property'  => 'unit_id',
                    'value'     => $unit_id,
                    'type'      => 'exact'
                ));
                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;
        }
        $this->response($operation);
    }

    function penerima_disposisi_custom($section = null)
    { // section = [recent,available] // for mobile search
        $me = $this;
        $model              = $me->m_staf_aktual_view;
        $pegawaiModel       = $me->m_staf_view;
        $pegawaiModelAktif  = $me->m_staf_aktif;

        $id         = varGet('id');
        $filter     = varGet('filter', '[]');
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $pegawai    = $me->m_account->get_profile();
        $staf_id    = $pegawai['staf_id'];
        $jabatan_id = $pegawai['jabatan_id'];
        $unit_id    = $pegawai['unit_id'];

        $filter = json_decode($filter);
        if (!empty($filter)) {

            $custom_filter_lain  = array('staf_kode', 'staf_nama', 'akun_nama', 'unit_kode', 'unit_nama', 'jabatan_kode', 'jabatan_nama');
            $custom_filter_aktual = array(
                'staf_aktual_penerima_kode', 'staf_aktual_penerima_nama', 'staf_aktual_penerima_akun_nama',
                'staf_aktual_penerima_unit_kode', 'staf_aktual_penerima_unit_nama', 'staf_aktual_penerima_jabatan_kode',
                'staf_aktual_penerima_jabatan_nama'
            );

            $custom_filter = ($section === 'recent') ? $custom_filter_aktual : $custom_filter_lain;

            $value = $filter[0]->value;
            $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
            $filter = array(array(
                'value' => $query,
                'type'  => 'custom'
            ));
        }

        switch ($section) {
            case 'recent':
                array_unshift($filter, array(
                    'property'  => 'staf_aktual_pengirim',
                    'value'     => $staf_id,
                    'type'      => 'exact'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_aktual_penerima <> '" . $staf_id . "'",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_aktual_penerima_status <> 1",
                    'type'      => 'custom'
                ));

                $operation = $model->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'available':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));
                array_unshift($filter, array(
                    'value'     => "staf_id <> '" . $staf_id . "'",
                    'type'      => 'custom'
                ));

                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'staf':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));
                array_unshift($filter, array(
                    'value'     => "staf_id <> '" . $staf_id . "'",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'value'  => "jabatan_induk = '" . $jabatan_id . "'",
                    'type'   => 'custom'
                ));

                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;
        }
        $this->response($operation);
    }

    function penerima_disposisi($section = null)
    { // section = [recent,available]
        $me = $this;
        $model               = $me->m_staf_aktual_view;
        $pegawaiModel        = $me->m_staf_view;
        $pegawaiModelAktif   = $me->m_staf_aktif;

        $id         = varReq('id');
        $filter     = varGet('filter', '[]');
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $pegawai    = $me->m_account->get_profile();
        $staf_id    = $pegawai['staf_id'];
        $jabatan_id = $pegawai['jabatan_id'];
        $unit_id    = $pegawai['unit_id'];

        $filter = json_decode($filter);
        switch ($section) {
            case 'recent':
                array_unshift($filter, array(
                    'property'  => 'staf_aktual_pengirim',
                    'value'     => $id,
                    'type'      => 'exact'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_aktual_penerima <> '" . $id . "'",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_aktual_penerima_status <> 1",
                    'type'      => 'custom'
                ));

                $operation = $model->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'available':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_id <> '" . $id . "'",
                    'type'      => 'custom'
                ));

                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'staf':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'property'  => 'jabatan_induk',
                    'value'     => $jabatan_id,
                    'type'      => 'exact'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_id <> '" . $id . "'",
                    'type'      => 'custom'
                ));

                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'jabatan':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'property'  => 'jabatan_id',
                    'value'     => $jabatan_id,
                    'type'      => 'exact'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_id <> '" . $id . "'",
                    'type'      => 'custom'
                ));

                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'unitkerja':
                array_unshift($filter, array(
                    'value'     => "staf_status <> 1",
                    'type'      => 'custom'
                ));

                array_unshift($filter, array(
                    'property'  => 'unit_id',
                    'value'     => $unit_id,
                    'type'      => 'exact'
                ));

                array_unshift($filter, array(
                    'value'     => "staf_id <> '" . $id . "'",
                    'type'      => 'custom'
                ));

                $operation = $pegawaiModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;
        }
        $this->response($operation);
    }

    function get_image($section = null, $mode = null)
    {
        $model = $this->model('sipas/staf');
        $id = varGet('id');
        $content = $model->getImage($section, $id, $mode);

        ob_clean();
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
        $this->output->set_header("Cache-Control: post-check=0, pre-check=0");
        $this->output->set_header("Pragma: no-cache");
        $this->output->set_content_type('jpeg');
        $this->output->set_output($content);
    }

    function get_ttd($section = null, $mode = null)
    {
        $model = $this->model('sipas/staf');
        $id = varGet('id');
        $type = varGet('type') || false; //tom
        $content = $model->getTtd($id, $mode);
        if ($type) {
            $content = "data:image/jpg;base64," . base64_encode($content);
        }
        ob_clean();
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
        $this->output->set_header("Cache-Control: post-check=0, pre-check=0");
        $this->output->set_header("Pragma: no-cache");
        $this->output->set_content_type('png');
        $this->output->set_output($content);
    }

    function get_image_logo()
    {
        $content = file_get_contents(BASEPATH . '../assets/img/timah_logo.png');

        ob_clean();
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
        $this->output->set_header("Cache-Control: post-check=0, pre-check=0");
        $this->output->set_header("Pragma: no-cache");
        $this->output->set_content_type('jpeg');
        $this->output->set_output($content);
    }

    function get_image_logo_new()
    {
        $content = file_get_contents(BASEPATH . '../assets/img/timah_logo_new.png');

        ob_clean();
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
        $this->output->set_header("Cache-Control: post-check=0, pre-check=0");
        $this->output->set_header("Pragma: no-cache");
        $this->output->set_content_type('jpeg');
        $this->output->set_output($content);
    }

    function url_image($section = null, $mode = null)
    {
        $model = $this->model('sipas/staf');
        $id = varGet('id');
        $content = $model->getImage($section, $id, $mode);

        ob_clean();
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
        $this->output->set_header("Cache-Control: post-check=0, pre-check=0");
        $this->output->set_header("Pragma: no-cache");
        $this->output->set_content_type('jpeg');
        $this->output->set_output($content);
    }

    function set_image($section = null)
    {
        $model = $this->model('sipas/staf');
        $id = varGet('id');

        $response = $model->upload($section, $id);
        $this->response($response);
    }

    function pegawai_jumlah_report()
    {
        $t_staf         = $this->m_staf_view;
        $t_unit         = $this->m_unit_kerja;
        $m_report       = $this->m_report_model;
        $m_account      = $this->m_account;
        $m_staf_rekap   = $this->m_staf_rekap_view;

        $download   = varGet('download', 0);
        $excel      = varGet('excel', 0);
        $unit       = varGet('unit');
        $filter     = array();
        $report_title = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $user   = $m_account->get_profile();

        $sorter = array();
        array_unshift($sorter, array('property' => 'unit_kode', 'direction' => 'asc'));
        $data = $m_staf_rekap->select(array('sorter' => json_encode($sorter)));

        if ($data['total'] > 0) {
            foreach ($data['data'] as $kstaf => &$vstaf) {
                $vstaf['no'] = $kstaf + 1;
                $vstaf['bg_color'] = (($kstaf + 1) % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $vstaf['unit_nama'] = $vstaf['unit_nama'] ? $vstaf['unit_nama'] : $this::$default_value['unit_nama'];
                $vstaf['unit_kode'] = $vstaf['unit_kode'] ? $vstaf['unit_kode'] : $this::$default_value['unit_kode'];
            }
        } else {
            $data['data'] = array(
                array(
                    'no'            => 1,
                    'unit_nama'     => $this::$default_value['empty'],
                    'unit_kode'     => $this::$default_value['empty'],
                    'jumlah_staf'   => $this::$default_value['empty'],
                    'jumlah_akun_staf_aktif' => $this::$default_value['empty'],
                    'jumlah_akun_staf_nonaktif'  => $this::$default_value['empty'],
                )
            );
        }

        $report_title = ($download || $excel) ? explode('<', $report_title) : $report_title;
        $report_data = array(
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_jumlah_pegawai,
            'header'        => $m_report->generateHeader($download, 6),
            'data'          => $data['data'],
            'dateReport'    => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator'      => $user[$m_account->field_display],
            'total_pegawai' => array_sum(array_column($data, 'jumlah_pegawai'))
        );

        $filename = $report_title;
        $file = $this->load->view($this->report_template_jumlah_pegawai, null, true);
        if ($download) {
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $m_report->generateExcel($file, $report_data, $filename);
        } else {
            $m_report->generateReport($file, $report_data, true);
        }
    }

    function pegawai_akun_report()
    {
        $t_staf     = $this->m_staf_view;
        $t_peran    = $this->m_peran_view;
        $t_unit     = $this->m_unit_kerja;

        $m_report   = $this->m_report_model;
        $m_account  = $this->m_account;
        $user       = $m_account->get_profile();
        $staf_akses = $this->m_staf_akses_view;

        $download   = varGet('download', 0);
        $excel      = varGet('excel', 0);
        $report_title = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $data = $staf_akses->select(array());

        if ($data['total'] > 0) {
            $grouped = array();
            foreach ($data['data'] as $s_key => &$s_val) {
                $key = $s_val['unit_kode'];
                $grouped[$key]['unit_nama'] = $s_val['unit_nama'] ? $s_val['unit_nama'] : $this::$default_value['unit'];
                $grouped[$key]['unit_kode'] = $s_val['unit_kode'] ? $s_val['unit_kode'] : $this::$default_value['unit_kode'];

                if (!array_key_exists('hak_akses', $grouped[$key])) $grouped[$key]['hak_akses'] = array();
                $s_val['no'] = count($grouped[$key]['hak_akses']) + 1;
                $s_val['bg_color'] = ($s_val['no'] % 2 == 1) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $s_val['peran_nama'] = $s_val['peran_nama'] ? $s_val['peran_nama'] : $this::$default_value['peran_nama'];
                $grouped[$key]['hak_akses'][] = $s_val;
            }
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'                 => $report_title,
            'subtitle'              => $this->report_subtitle_jumlah_akun_pegawai,
            'header'                => $m_report->generateHeader($download, 5),
            'data'                  => $grouped,
            'dateReport'            => date('d-m-Y H:i:s'),
            'dateReportFormated'    => date('d M Y H:i'),
            'operator'              => $user[$m_account->field_display],
            'total_pegawai'         => array_sum(array_column($data, 'total_staf'))
        );

        $filename = $report_title;
        $file = $this->load->view($this->report_template_jumlah_akun_pegawai, null, true);
        if ($download) {
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $m_report->generateExcel($file, $report_data, $filename);
        } else {
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function import_staf()
    {
        $upload_path = FCPATH . 'data/';

        $config = array(
            0  => 'staf_nama',
            1  => 'staf_kode',
            2  => 'staf_unit',
            3  => 'staf_jabatan',
            4  => 'staf_peran',
            5  => 'staf_kelamin',
            6  => 'akun_nama',
            7  => 'akun_sandi',
            8  => 'akun_surel',
            9  => 'akun_ponsel',
            10 => 'staf_tgl_insert' // just filler
        );

        $model          = $this->m_staf;
        $staf_view      = $this->m_staf_view;
        $user           = $this->m_user;
        $properti       = $this->m_properti;
        $account        = $this->m_account;
        $jabatan        = $this->m_jabatan;
        $peran          = $this->m_peran;
        $unit           = $this->m_unit;
        $akun           = $account->get_profile_id();
        $primary        = $model->get_primary();

        $primary = $model->get_primary();

        $data = (new IOExcel())->upload(array(
            'upload_path'   => $upload_path,
            'start_rows'    => 2,
            'input_name'    => 'userfile',
            'remove_file'   => false
        ))
            ->getDataUpload();

        if ($data['total'] > 0) {
            $return = array();
            foreach ($data['data'] as $key => $row) {

                $records = array();
                $randomNip = $this->randomize();

                $israndom = false;
                foreach ($row as $numlink => $value) {
                    if (!array_key_exists($numlink, $config)) continue;

                    if ($config[$numlink] == 'staf_kode') {
                        $value  = !empty($value) ? $value : $randomNip;
                        $israndom = empty($value) ? true : false;
                    }
                    if ($config[$numlink] == 'staf_jabatan') {
                        $records['jabatan_nama'] = $value;
                        $value  = $jabatan->read(array('jabatan_nama' => $value))['jabatan_id'];
                    }
                    if ($config[$numlink] == 'staf_peran') {
                        $records['peran_nama'] = $value;
                        $value  = $peran->read(array('peran_nama' => $value))['peran_id'];
                    }
                    if ($config[$numlink] == 'staf_unit') {
                        $records['unit_nama'] = $value;
                        $value  = $unit->read(array('unit_nama' => $value))['unit_id'];
                    }

                    if ($config[$numlink] == 'staf_kelamin') $value  = ($value == 'Laki - Laki') ? 1 : 0;
                    if ($config[$numlink] == 'akun_nama') $israndom = empty($value) ? true : false;

                    $records[$config[$numlink]] = $value;
                    $records['staf_tgl_insert'] = date('d M Y H:i');
                }

                $records['staf_isaktif'] =  1;
                $exec = $model->insert($records, null, function ($response) use ($records, $user, $account, $properti, $model, $akun, $primary, $randomNip, $israndom) {
                    if ($response[$model->successProperty]) {
                        $inserted_data = $model->read($model->get_insertid());

                        $op = $properti->created($akun, $inserted_data, 'staf', $inserted_data['staf_id'], $inserted_data['staf_kode']);
                        if ($op) {
                            $model->update($inserted_data['staf_id'], array(
                                'staf_properti' => $op['properti_id']
                            ));
                        }

                        if ($response[$model->successProperty] !== true) return;
                        $staf_id = array_key_exists($primary, $response[$model->dataProperty]) ? $response[$model->dataProperty][$primary] : null;

                        $data_user = array(
                            'akun_staf'     => $staf_id,
                            'akun_nama'     => ($israndom) ? $randomNip : $records['akun_nama'],
                            'akun_display'  => array_key_exists('staf_nama', $records) ? $records['staf_nama'] : null,
                            'akun_ponsel'   => array_key_exists('akun_ponsel', $records) ? $records['akun_ponsel'] : null,
                            'akun_surel'    => array_key_exists('akun_surel', $records) ? $records['akun_surel'] : null,
                            'akun_isaktif'  => 1,
                            'akun_properti' => $inserted_data['staf_properti']
                        );

                        if (array_key_exists('akun_sandi', $records)) {
                            $records['akun_sandi'] = md5($records['akun_sandi']);
                            $data_user['akun_sandi'] = $account->password($records['akun_sandi']);
                        }

                        $user->insert($data_user, null, function ($response) use ($user, $properti, $akun) {
                            if ($response[$user->successProperty]) {
                                $inserted_data = $response['data'];
                                unset($inserted_data['akun_sandi']);
                                unset($inserted_data['akun_garam']);
                                $op = $properti->created($akun, $inserted_data, 'akun', $inserted_data['akun_id'], $inserted_data['akun_nama']);
                                if ($op) {
                                    $user->update($inserted_data['akun_id'], array(
                                        'akun_properti' => $op['properti_id']
                                    ));
                                }
                            }
                        });
                    }
                });

                $records['staf_status_insert'] = ($exec[$model->successProperty]) ? 'Data tersimpan' : $exec['message'];
                unset($records['akun_sandi']);
                $return[] = $records;
            }

            $this->response(array('success' => (bool)$return, 'data' => $return, 'total' => count($return)));
        }
    }

    public function import_read()
    {
        $this->response(array('success' => true, 'total' => 0,  'data' => array()));
    }

    public function randomize()
    {
        $length = 8;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomNip = '';
        for ($i = 0; $i < $length; $i++) {
            $randomNip .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomNip;
    }

    public function transporter($id = null)
    {
        // $model = $this->m_staf;
        // $model_view = $this->m_staf_view;
        $id = varGet('id');

        $basepath = dirname(BASEPATH);
        $scan = scandir($basepath . '/data/staf/');
        $scan = array_diff($scan, array('.', '..'));

        foreach ($scan as $k => $v) {
            $staf_id = $v;
            $path = $basepath . '/data/staf/' . $staf_id;
            $target = $basepath . '/data/staf/';
            $scanPath = scandir($path);
            $scanPath = array_diff($scanPath, array('.', '..'));
            if ($scanPath !== false) {
                $pathFoto = $path . '/foto.jpg';
                $pathFoto_thumb = $path . '/foto_thumb.jpg';
                echo 'copy from ' . $pathFoto . ' to ' . $target . $staf_id . '.jpg <br>';
                echo 'copy from ' . $pathFoto . ' to ' . $target . $staf_id . '_thumb.jpg <br>';
                copy($pathFoto, $target . $staf_id . '.jpg');
                copy($pathFoto, $target . $staf_id . '_thumb' . '.jpg');

                shell_exec('rm -R ' . $path);
            }
        }
    }

    public function wakil()
    {
        $model = $this->m_staf_aktif;
        $modelStaf = $this->m_staf;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));
        $mode       = varGet('mode');
        $jabatan    = varGet('jabatan');
        $pegawai    = $this->m_account->get_profile();
        $staf_id    = $pegawai['staf_id'];

        if (!empty($filter)) {
            $custom_filter  = array('staf_kode', 'staf_nama', 'unit_nama', 'jabatan_nama', 'staf_kelamin');
            $value = $filter[0]->value;
            $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
            $filter = array(array(
                'value' => $query,
                'type'  => 'custom'
            ));
        }

        if (varGetHas('id') || varGetHas('staf_id')) {
            $id = varGet('id', varGet('staf_id'));
            $record = null;

            if (inCacheExists($modelStaf, $id)) {
                $record = getRecordFromCache($modelStaf, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelStaf, $record);
                $useCache = false;
            }
            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'staf_kode LIKE "%' . $query . '%" OR staf_nama LIKE "%' . $query . '%"'
                ));
            }
            if ($mode == 'pimpinan') {
                array_unshift($filter, (object)array(
                    'property'  => 'jabatan_id',
                    'value'     => $jabatan,
                    'type'      => 'exact'
                ));
            } else if ($mode == 'asisten') {
                array_unshift($filter, (object)array(
                    'property'  => 'jabatan_induk',
                    'value'     => $jabatan,
                    'type'      => 'exact'
                ));
            }

            array_unshift($filter, array(
                'value'     => "staf_id <> '" . $staf_id . "'",
                'type'      => 'custom'
            ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function transporter_profil()
    {
        $property = $this->m_properti;
        $model = $this->m_staf;
        $model_view = $this->m_staf_view;
        $staf_profil = $this->m_staf_profil;
        $staf_profil_temp = $this->m_staf_profil_temp;
        $jabatan_model = $this->m_jabatan;
        $unit_model = $this->m_unit;

        // UPDATE properti SET properti_iseksekusi = 0 sebelum menjalakan trasporter 

        $dataStaf = "SELECT * FROM properti WHERE properti_entitas = 'staf' AND IFNULL(properti_iseksekusi, 0) = 0 LIMIT 100";
        $hasil = $this->db->query($dataStaf);
        $data = $hasil->result_array();

        // $id = NULL;
        $staf = NULL;
        $jabatan = NULL;
        $unit = NULL;

        $result = array();

        foreach ($data as $key => $val) {
            $properti =  html_entity_decode($val['properti_ubah_data']);
            $json = json_decode($properti);

            if (!empty($json)) {
                foreach ($json as $key => $value) {
                    if (($value->data->staf_id != $staf) || ($value->data->staf_jabatan != $jabatan) || ($value->data->staf_unit != $unit)) {
                        $existStaf = $model->find(array(
                            'staf_id' => $value->data->staf_id
                        ));
                        $existJabatan = $jabatan_model->find(array(
                            'jabatan_id' => $value->data->staf_jabatan
                        ));
                        $existUnit = $unit_model->find(array(
                            'unit_id' => $value->data->staf_unit
                        ));

                        $jabatanBaru = $jabatan_model->read($value->data->staf_jabatan);
                        $unitBaru = $unit_model->read($value->data->staf_unit);

                        if (!empty($existStaf)) {
                            $staf_id = $value->data->staf_id;
                            $nama_staf = $value->data->staf_nama;
                        } else {
                            $staf_id = NULL;
                            $nama_staf = NULL;
                        }

                        if (!empty($existJabatan)) {
                            $staf_jabatan = $value->data->staf_jabatan;
                            $nama_jabatan = $jabatanBaru['jabatan_nama'];
                        } else {
                            $staf_jabatan = NULL;
                            $nama_jabatan = NULL;
                        }

                        if (!empty($existUnit)) {
                            $staf_unit = $value->data->staf_unit;
                            $nama_unit = $unitBaru['unit_nama'];
                        } else {
                            $staf_unit = NULL;
                            $nama_unit = NULL;
                        }

                        $operation = $staf_profil->insert(array(
                            'staf_profil_staf' => $staf_id,
                            'staf_profil_staf_nama' => $nama_staf,
                            'staf_profil_jabatan' => $staf_jabatan,
                            'staf_profil_jabatan_nama' => $nama_jabatan,
                            'staf_profil_unit' => $staf_unit,
                            'staf_profil_unit_nama' => $nama_unit,
                            'staf_profil_buat_tgl' => $value->at
                        ), null, function ($response) use ($model, $staf_profil, $value/*, $id*/) {
                            if ($response[$staf_profil->successProperty] !== true) return;
                            $inserted_data = $response['data'];
                            $id = $staf_profil->get_insertid();
                        });

                        array_push($result, $operation);

                        if (empty($existStaf) || empty($existJabatan) || empty($existUnit)) {
                            $jabatanBaru = $jabatan_model->read($value->data->staf_jabatan);
                            $unitBaru = $unit_model->read($value->data->staf_unit);

                            $operation = $staf_profil_temp->insert(array(
                                'staf_profil_temp_staf' => $staf_id,
                                'staf_profil_temp_staf_nama' => $nama_staf,
                                'staf_profil_temp_jabatan' => $staf_jabatan,
                                'staf_profil_temp_jabatan_nama' => $nama_jabatan,
                                'staf_profil_temp_unit' => $staf_unit,
                                'staf_profil_temp_unit_nama' => $nama_unit,
                                'staf_profil_temp_buat_tgl' => $value->at
                            ), null, function ($response) use ($model, $staf_profil_temp, $value/*, $id*/) {
                                if ($response[$staf_profil_temp->successProperty] !== true) return;
                                $inserted_data = $response['data'];
                                $id = $staf_profil_temp->get_insertid();
                            });
                        }
                    }
                    $staf = $value->data->staf_id;
                    $jabatan = $value->data->staf_jabatan;
                    $unit = $value->data->staf_unit;
                }
            }

            $property->update($val['properti_id'], array('properti_iseksekusi' => 1));
        }

        $this->response(array(
            'success' => (bool) $result,
            'data' => $result
        ));
    }
}
