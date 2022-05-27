<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Jenis extends Base_Controller
{

    protected $message = array();

    public function __construct()
    {
        parent::__construct();
        $this->m_jenis          = $this->model('sipas/jenis',               true);
        $this->m_jenis_view     = $this->model('sipas/jenis_view',          true);
        $this->m_jenis_hidup    = $this->model('sipas/jenis_hidup_view',    true);
        $this->m_jenis_aktif    = $this->model('sipas/jenis_aktif_view',    true);
        $this->m_jenis_nonaktif = $this->model('sipas/jenis_nonaktif_view', true);
        $this->m_properti       = $this->model('sipas/properti',            true);
        $this->m_pengaturan     = $this->model('sipas/pengaturan',          true);
        $this->m_account        = $this->model('sipas/account',             true);
        $this->config->load('application_config');

        $this->m_jenis_unit_view        = $this->model('sipas/jenis_unit_view',             true);
        $this->m_jenis_umum_aktif       = $this->model('sipas/jenis_umum_aktif_view',       true);
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $model = $this->m_jenis_hidup;
        $modeljenis = $this->m_jenis; // used by cache
        $pengaturan = $this->m_pengaturan;

        $bookingNomor = $pengaturan->getSettingByCode('use_booking_nomor');

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('jenis_id')) {
            $id = varGet('id', varGet('jenis_id'));
            $record = null;

            if (inCacheExists($modeljenis, $id)) {
                $record = getRecordFromCache($modeljenis, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modeljenis, $record);
                $useCache = false;
            }

            if (!$bookingNomor) $record['jenis_nomor_awal'] = null;
            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jenis_kode LIKE "%' . $query . '%" OR jenis_nama LIKE "%' . $query . '%"'
                ));
            }

            $filter = $this->filterUnit($filter);

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function perunit_aktif()
    {
        $model = $this->m_jenis_perunit_aktif;
        $modeljenis = $this->m_jenis; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('jenis_id')) {
            $id = varGet('id', varGet('jenis_id'));

            $record = null;

            if (inCacheExists($modeljenis, $id)) {
                $record = getRecordFromCache($modeljenis, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modeljenis, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jenis_kode LIKE "%' . $query . '%" OR jenis_nama LIKE "%' . $query . '%"'
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

    public function aktif()
    {
        $model = $this->m_jenis_aktif;
        $modeljenis = $this->m_jenis; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('jenis_id')) {
            $id = varGet('id', varGet('jenis_id'));

            $record = null;

            if (inCacheExists($modeljenis, $id)) {
                $record = getRecordFromCache($modeljenis, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modeljenis, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jenis_kode LIKE "%' . $query . '%" OR jenis_nama LIKE "%' . $query . '%"'
                ));
            }

            $filter = $this->filterUnit($filter);
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function perunit()
    {
        $model = $this->m_jenis_perunit_aktif;
        $modeljenis = $this->m_jenis; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('jenis_id')) {
            $id = varGet('id', varGet('jenis_id'));

            $record = null;

            if (inCacheExists($modeljenis, $id)) {
                $record = getRecordFromCache($modeljenis, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modeljenis, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jenis_kode LIKE "%' . $query . '%" OR jenis_nama LIKE "%' . $query . '%"'
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

    public function combo()
    {
        $model = $this->m_jenis_aktif;
        $modeljenis = $this->m_jenis; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('jenis_id')) {
            $id = varGet('id', varGet('jenis_id'));

            $record = null;

            if (inCacheExists($modeljenis, $id)) {
                $record = getRecordFromCache($modeljenis, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modeljenis, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jenis_kode LIKE "%' . $query . '%" OR jenis_nama LIKE "%' . $query . '%"'
                ));
            }
            // array_unshift($filter, (object)array(
            //     'type'      => 'exact',
            //     'property'  => 'jenis_tampil_si',
            //     'value'     => 1
            // ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    function jenis_perunit($withCurrent = true)
    {
        $account = $this->m_account;
        $jenis      = $this->m_jenis_umum_aktif;
        $jenisPerunit  = $this->m_jenis_unit_view;

        $unit = varGet('unit');
        $tampil = varGet('tampil');

        if ($tampil == 1) {
            $record = $jenisPerunit->find(
                array(
                    'jenis_unit_unit' => $unit,
                    'jenis_tampil_sm' => 1
                ),
                null,
                null,
                true,
                array(
                    'jenis_nama' => 'asc'
                )
            );
            // foreach ($record as $k => $r) {}
            $r['records'] = $record;
            $data = $r['records'];

            $recordJenis = $jenis->find(array(
                'jenis_tampil_sm' => 1
            ), null, null, true, array('jenis_nama' => 'asc'));
            // foreach ($record as $k => $r) {}
            $j['records'] = $recordJenis;
            $dataJenis = $j['records'];
        } else if ($tampil == 2) {
            $record = $jenisPerunit->find(array(
                'jenis_unit_unit' => $unit,
                'jenis_tampil_sk' => 1
            ), null, null, true, array('jenis_nama' => 'asc'));
            // foreach ($record as $k => $r) {}
            $r['records'] = $record;
            $data = $r['records'];

            $recordJenis = $jenis->find(array(
                'jenis_tampil_sk' => 1
            ), null, null, true, array('jenis_nama' => 'asc'));
            // foreach ($record as $k => $r) {}
            $j['records'] = $recordJenis;
            $dataJenis = $j['records'];
        } else if ($tampil == 3) {
            $record = $jenisPerunit->find(array(
                'jenis_unit_unit' => $unit,
                'jenis_tampil_si' => 1
            ), null, null, true, array('jenis_nama' => 'asc'));
            // foreach ($record as $k => $r) {}
            $r['records'] = $record;
            $data = $r['records'];

            $recordJenis = $jenis->find(array(
                'jenis_tampil_si' => 1
            ), null, null, true, array('jenis_nama' => 'asc'));
            // foreach ($record as $k => $r) {}
            $j['records'] = $recordJenis;
            $dataJenis = $j['records'];
        } else if ($tampil == 4) {
            $record = $jenisPerunit->find(array(
                'jenis_unit_unit' => $unit,
                'jenis_tampil_sik' => 1
            ), null, null, true, array('jenis_nama' => 'asc'));
            $r['records'] = $record;
            $data = $r['records'];

            $recordJenis = $jenis->find(array(
                'jenis_tampil_sik' => 1
            ), null, null, true, array('jenis_nama' => 'asc'));
            $j['records'] = $recordJenis;
            $dataJenis = $j['records'];
        } else {
            $record = $jenisPerunit->find(array(
                'jenis_unit_unit' => $unit
            ), null, null, true, array('jenis_nama' => 'asc'));
            // foreach ($record as $k => $r) {}
            $r['records'] = $record;
            $data = $r['records'];

            $recordJenis = $jenis->find(null, null, null, true, array('jenis_nama' => 'asc'));
            // foreach ($record as $k => $r) {}
            $j['records'] = $recordJenis;
            $dataJenis = $j['records'];
        }

        $datas = array_merge($dataJenis, $data);

        usort($datas, function ($a, $b) {
            return $a['jenis_nama'] <=> $b['jenis_nama'];
        });

        $this->response(array(
            'data'  => $datas,
            'count' => count($datas)
        ));
    }

    public function nonaktif()
    {
        $model = $this->m_jenis_nonaktif;
        $modeljenis = $this->m_jenis; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('jenis_id')) {
            $id = varGet('id', varGet('jenis_id'));

            $record = null;

            if (inCacheExists($modeljenis, $id)) {
                $record = getRecordFromCache($modeljenis, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modeljenis, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jenis_kode LIKE "%' . $query . '%" OR jenis_nama LIKE "%' . $query . '%"'
                ));
            }

            $filter = $this->filterUnit($filter);

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function create($usePayload = true)
    {
        $model = $this->m_jenis;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $custom = varGet('custom');

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $data['jenis_terpusat'] = (int) $custom;
        $operation = $model->insert($data, null, function ($response) use ($model, $akun, $properti, $data) {
            if ($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];

            $op = $properti->created($akun, $inserted_data, 'jenis', $inserted_data['jenis_id'], $inserted_data['jenis_kode']);
            if ($op) {
                $model->update($inserted_data['jenis_id'], array(
                    'jenis_properti' => $op['properti_id']
                ));
            }
        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }

    public function update($usePayload = true)
    {
        $model = $this->m_jenis;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $custom = varGet('custom');
        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $data['jenis_terpusat'] = (int) $custom;
        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {

            addRecordtoCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['jenis_id']);
            $idProp = $updated_data['jenis_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $updated_data, 'jenis', $updated_data['jenis_id'], $updated_data['jenis_kode']);
                if ($op) {
                    $model->update($updated_data['jenis_id'], array(
                        'jenis_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['jenis_kode']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
        $model = $this->m_jenis;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['jenis_properti'];

        $data['jenis_kode'] = $data['jenis_id'];
        $data['jenis_isaktif'] = 0;
        $data['jenis_ishapus'] = 1;
        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {

            addRecordToCache($model, $response[$model->dataProperty]);

            // $deleted_data = $response['data'];
            $deleted_data = $model->read($data['jenis_id']);
            $idProp = $deleted_data['jenis_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $deleted_data, 'jenis', $deleted_data['jenis_id'], $deleted_data['jenis_kode']);

                $model->update($deleted_data['jenis_id'], array(
                    'jenis_properti' => $op['properti_id']
                ));
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['jenis_kode']);
            $kelas = array(
                'kelas_jenis' => null
            );

            $this->db->where('kelas_jenis', $deleted_data['jenis_id']);
            $this->db->update('kelas', $kelas);
        });
        if ($operation['success']) {
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    public function is_useawal()
    {
        $model = $this->m_jenis;
        $pengaturan = $this->m_pengaturan;
        $id = varGet('id');
        $bookingNomor = $pengaturan->getSettingByCode('use_booking_nomor');

        if ($bookingNomor) {
            $record = $model->read($id);
            $this->response(array(
                'awal' => $record['jenis_nomor_awal'],
            ));
        } else {
            $this->response(array(
                'awal' => null,
            ));
        }
    }

    function masterSubJenis()
    {
        /* 
            sub tipe 1 : gol baru = gol lama + 1 
            sub tipe 2 : sgt baru = sgt lama + 1
            sub tipe 3 : semua kolom & manual semua
            sub tipe 0 : tidak semua kolom & manual semua
        */
        $model = $this->m_jenis;
        $data = $model->get_jenis_sub();

        if (varGetHas('id') || varGetHas('sub_id')) {
            $id = varGet('id', varGet('sub_id'));
            $item = null;
            foreach ($data as $_data) {
                if ($id == $_data->sub_id) {
                    $item = $_data;
                    break;
                }
            }
            $this->response_record($item);
        } else {
            $this->response($data);
        }
    }

    public function filterUnit($filter)
    {
        $unit = varGet('unit');
        if ($unit) {
            if ($unit != 'semua') {
                array_unshift($filter, (object)array(
                    'type'  => 'custom',
                    'value' => "jenis_unit_id = '$unit'",
                ));
            }
        }
        return $filter;
    }
}
