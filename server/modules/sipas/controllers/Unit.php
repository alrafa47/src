<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class unit extends Base_Controller
{

    protected $message = array();

    public function __construct()
    {
        parent::__construct();
        $this->m_account       = $this->model('sipas/account',               true);
        $this->m_staf          = $this->model('sipas/staf',                  true);
        $this->m_staf_profil   = $this->model('sipas/staf_profil',           true);
        $this->m_staf_view     = $this->model('sipas/staf_view',             true);
        $this->m_unit          = $this->model('sipas/unit',                  true);
        $this->m_unit_view     = $this->model('sipas/unit_view',             true);
        $this->m_properti      = $this->model('sipas/properti',              true);
        $this->m_unit_hidup    = $this->model('sipas/unit_hidup_view',       true);
        $this->m_unit_aktif    = $this->model('sipas/unit_aktif_view',       true);
        $this->m_unit_nonaktif = $this->model('sipas/unit_nonaktif_view',    true);
    }

    public function index()
    {
        $this->read();
    }

    public function read($section = null)
    {
        $model = $this->m_unit_hidup;
        $modelview = $this->m_unit_view;
        $modelunit = $this->m_unit;

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));
        $recursive = varGet('recursive');
        $staf_filter = empty($staf_id) ? array() : array('unit_manager' => $staf_id);

        $filter = $this->filterUnit($filter);

        if (strtolower($id) == 'root') $id = null;
        $records = [];
        if ($section == 'tree') {
            if (varGet('unit')) {
                $staf_filter['unit_id'] = varGet('unit');
            }
            // $records = $model->tree(varGet('unit'), $staf_filter, true, 'read');
            $records = $model->tree($id, $staf_filter, $recursive);
        } else {
            if (!empty($id)) {
                $record = null;
                if (inCacheExists($modelunit, $id)) {
                    $record = getRecordFromCache($modelunit, $id);
                    $useCache = true;
                }

                if (!$record) {
                    $record = $model->read($id);
                    addRecordToCache($modelunit, $record);
                    $useCache = false;
                }

                $records = array(
                    $modelview->successProperty => (bool) $record,
                    $modelview->dataProperty => $record,
                    'useCache' => $useCache
                );
            } else {
                $query = varGet('query');
                if (!empty($query)) {
                    array_unshift($filter, (object)array(
                        'type'      => 'custom',
                        'value'     => '(unit_kode LIKE "%' . $query . '%" OR unit_nama LIKE "%' . $query . '%")'
                    ));
                }
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function aktif($section = null)
    {
        $model = $this->m_unit_aktif;
        $modelview = $this->m_unit_view;
        $modelunit = $this->m_unit; // used by cache

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));
        $staf_filter = empty($staf_id) ? array() : array('unit_manager' => $staf_id);
        $filter = $this->filterUnit($filter);

        if (strtolower($id) == 'root') $id = null;
        $records = [];
        if ($section == 'tree') {
            if (varGet('unit')) {
                // $records = $model->tree(varGet('unit'), $staf_filter, true, 'aktif');
                $records = $model->tree($id, $staf_filter);
            }
        } else {
            if (!empty($id)) {
                $record = null;
                if (inCacheExists($modelunit, $id)) {
                    $record = getRecordFromCache($modelunit, $id);
                    $useCache = true;
                }

                if (!$record) {
                    $record = $model->read($id);
                    addRecordToCache($modelunit, $record);
                    $useCache = false;
                }

                $records = array(
                    $modelview->successProperty => (bool) $record,
                    $modelview->dataProperty => $record,
                    'useCache' => $useCache
                );
            } else {
                $query = varGet('query');
                if (!empty($query)) {
                    array_unshift($filter, (object)array(
                        'type'      => 'custom',
                        'value'     => '(unit_kode LIKE "%' . $query . '%" OR unit_nama LIKE "%' . $query . '%")'
                    ));
                }
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function nonaktif($section = null)
    {
        $model = $this->m_unit_nonaktif;
        $modelview = $this->m_unit_view;
        $modelunit = $this->m_unit; // used by cache

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        $filter = $this->filterUnit($filter);

        if (strtolower($id) == 'root') $id = null;

        if ($section == 'tree') {
            if (varGet('unit')) {
                // $records = $model->tree(varGet('unit'), $filter, true, 'nonaktif');
                $records = $model->tree($id, $filter);
            }
        } else {
            if (!empty($id)) {
                $record = null;
                if (inCacheExists($modelunit, $id)) {
                    $record = getRecordFromCache($modelunit, $id);
                    $useCache = true;
                }

                if (!$record) {
                    $record = $model->read($id);
                    addRecordToCache($modelunit, $record);
                    $useCache = false;
                }
                $records = array(
                    $modelview->successProperty => (bool) $record,
                    $modelview->dataProperty => $record,
                    'useCache' => $useCache
                );
            } else {
                $query = varGet('query');

                if (!empty($query)) {
                    array_unshift($filter, (object)array(
                        'type'      => 'custom',
                        'value'     => '(unit_kode LIKE "%' . $query . '%" OR unit_nama LIKE "%' . $query . '%")'
                    ));
                }
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function filterUnit($filter)
    {
        $unit = varGet('unit');
        if ($unit && $unit != 'semua') {
            array_unshift($filter, (object)array(
                'type'  => 'custom',
                'value' => "unit_id ='$unit' OR unit_induk_id ='$unit'"
            ));
        }
        return $filter;
    }

    public function owner($section = null)
    {
        $model = $this->m_unit_aktif;
        $modelview = $this->m_unit_view;
        $modelunit = $this->m_unit; // used by cache

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        if (strtolower($id) == 'root') $id = null;

        if ($section == 'tree') {
            // var_dump($id);
            $records = $model->tree($id, $filter);
            // $operation['debug']=$model->get_lastquery();
        } else {
            if (!empty($id)) {

                $record = null;
                if (inCacheExists($modelunit, $id)) {
                    $record = getRecordFromCache($modelunit, $id);
                    $useCache = true;
                }

                if (!$record) {
                    $record = $model->read($id);
                    addRecordToCache($modelunit, $record);
                    $useCache = false;
                }

                $records = array(
                    $modelview->successProperty => (bool) $record,
                    $modelview->dataProperty => $record,
                    'useCache' => $useCache
                );
            } else {
                $query = varGet('query');
                if (!empty($query)) {
                    array_unshift($filter, (object)array(
                        'type'      => 'custom',
                        'value'     => '(unit_kode LIKE "%' . $query . '%" OR unit_nama LIKE "%' . $query . '%")'
                    ));
                }
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'IFNULL(unit_isbuatsurat, 0) = 1'
                ));

                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function create($usePayload = true)
    {
        $model = $this->m_unit;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $path = varReq('path');

        $operation = $model->insert($data, null, function ($response) use ($path, $model, $akun, $properti, $data) {
            if ($response[$model->successProperty] !== true) return;
            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'unit', $inserted_data['unit_id'], $inserted_data['unit_kode']);
            if ($inserted_data['unit_induk']) {
                if ($path) {
                    $inserted_data['unit_parent_path'] = $path . '/' . $inserted_data['unit_id'];
                } else {
                    $inserted_data['unit_parent_path'] = '/' . $inserted_data['unit_id'];
                }
            } else {
                $inserted_data['unit_parent_path'] = '/' . $inserted_data['unit_id'];
            }
            if ($op) {
                $model->update($inserted_data['unit_id'], array(
                    'unit_parent_path' => $inserted_data['unit_parent_path'],
                    'unit_properti' => $op['properti_id']
                ));
            }
        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }

    public function update($usePayload = true)
    {
        $model = $this->m_unit;
        $staf = $this->m_staf;
        $staf_profil = $this->m_staf_profil;
        $staf_view = $this->m_staf_view;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['unit_properti'];

        $path = varReq('path');
        $isChange = varReq('isChange');

        if ($data['unit_induk']) {
            if ($path) {
                $data['unit_parent_path'] = $path . '/' . $data['unit_id'];
            } else {
                $data['unit_parent_path'] = '/' . $data['unit_id'];
            }
        } else {
            $data['unit_parent_path'] = '/' . $data['unit_id'];
        }

        if ($isChange) {
            $jPath = varReq('unit_path');
            $unit_path = $jPath . '%';
            $unitPath = $jPath;
            $changePath = $data['unit_parent_path'] . '/' . $data['unit_id'];

            $query = "UPDATE unit SET unit_parent_path = REPLACE(unit_parent_path, '" . $unitPath . "', '" . $changePath . "') WHERE" . " unit_parent_path LIKE '" . $unit_path . "'";
            $result = $this->db->query($query);
        }

        if (empty($idProp)) {
            $op = $properti->created($akun);
            $idProp = $op['properti_id'];
            $data['unit_properti'] = $idProp;
        }
        $properti->updated($idProp, $akun, $data, $data['unit_kode']);

        $dataUnit = $model->read($id);

        $operation = $model->update($id, $data, function ($response) use ($data, $staf, $staf_profil, $staf_view, $dataUnit, $model) {
            addRecordToCache($model, $response[$model->dataProperty]);
            $updated_data = $response['data'];

            if ($dataUnit['unit_nama'] != $data['unit_nama']) {
                $now = date('Y-m-d H:i:s');
                $data_staf = $staf_view->find(array('staf_unit' => $data['unit_id']));

                foreach ($data_staf as $index => &$p) {
                    $update_staf = $staf_profil->insert(array(
                        'staf_profil_staf' => $p['staf_id'],
                        'staf_profil_staf_nama' => $p['staf_nama'],
                        'staf_profil_jabatan' => $p['staf_jabatan'],
                        'staf_profil_jabatan_nama' => $p['jabatan_nama'],
                        'staf_profil_unit' => $p['staf_unit'],
                        'staf_profil_unit_nama' => $data['unit_nama'],
                        'staf_profil_buat_tgl' => $now
                    ), null, function ($response) use ($staf_profil, $staf, $data, $p) {
                        $responses = $response['data'];
                        $staf_profil_id = $responses['staf_profil_id'];
                        $id = $staf_profil->get_insertid();

                        $p['staf_profil'] = $id;
                        $staf->update($p['staf_id'], $p);
                    });
                }
            }
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
        $model = $this->m_unit;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['unit_properti'];

        $unit_path = $data['unit_parent_path'] . '%';

        $query = "UPDATE unit SET unit_ishapus = 1, unit_isaktif = 0, unit_kode = unit_id WHERE unit_parent_path LIKE '" . $unit_path . "'";
        $result = $this->db->query($query);

        $data['unit_kode'] = $data['unit_id'];
        $data['unit_isaktif'] = 0;
        $data['unit_ishapus'] = 1;
        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {
            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['unit_id']);
            $idProp = $deleted_data['unit_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $deleted_data, 'unit', $deleted_data['unit_id'], $deleted_data['unit_kode']);
                if ($op) {
                    $model->update($deleted_data['unit_id'], array(
                        'unit_properti' => $op['properti_id']
                    ));
                }
            }

            // $unit = array(
            //     'unit_induk' => $deleted_data['unit_induk']
            // );

            // $this->db->where('unit_induk', $deleted_data['unit_id']);
            // $this->db->update('unit', $unit);
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['unit_kode']);
        });
        if ($operation['success']) {
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    public function transporter_path()
    {
        $unit = $this->m_unit;

        $query = $this->db->get_where('unit', array('IFNULL(unit_ishapus, 0) = 0' => NULL), 1000);
        $data = $query->result_array();
        // return  $this->response($data);
        // print_r($query);
        // echo "hallo";
        // die;

        foreach ($data as $key => &$value) {
            $id = $value['unit_id'];

            if ($value['unit_induk']) {
                $data_unit = $unit->read($id);

                if (!$data_unit['unit_parent_path']) {
                    $parent = $unit->read($data_unit['unit_induk']);

                    if (!$parent['unit_parent_path']) {
                        $data_parent = $this->parent_path($parent);
                        $value['unit_parent_path'] = $data_parent['unit_parent_path'] . '/' . $data_unit['unit_id'];
                    } else {
                        $value['unit_parent_path'] = $parent['unit_parent_path'] . '/' . $data_unit['unit_id'];
                    }

                    $operation = $unit->update($id, $value);
                } else {
                    $value['unit_parent_path'] = $data_unit['unit_parent_path'];
                }
            } else {
                $value['unit_parent_path'] = '/' . $value['unit_id'];
                $operation = $unit->update($id, $value);
            }
        }

        $this->response($data);
    }

    public function parent_path($data)
    {
        $unit = $this->m_unit;
        $id = $data['unit_id'];

        if ($data['unit_induk']) {
            if (!$data['unit_parent_path']) {
                $parent = $unit->read($data['unit_induk']);
                if (!$parent['unit_parent_path']) {
                    $data_parent = $this->parent_path($parent);
                    $data['unit_parent_path'] = $data_parent['unit_parent_path'] . '/' . $data['unit_id'];
                } else {
                    $data['unit_parent_path'] = $parent['unit_parent_path'] . '/' . $data['unit_id'];
                }
            }
        } else {
            $data['unit_parent_path'] = '/' . $data['unit_id'];
        }

        $operation = $unit->update($id, $data);
        return $data;
    }

    // for combobox unit
    public function combounit()
    {
        // $model = $this->m_unit_hidup;
        $model = $this->m_unit_aktif;

        $limit = varGet('limit');
        $start = varGet('start');
        $sorter = varGet('sort');
        $filter = json_decode(varGet('filter', '[]'));

        array_unshift($filter, (object)array(
            'type'  => 'exact',
            'field' => 'unit_induk',
            'value' => null
        ));

        $filter = json_encode($filter);
        $records = $model->select(array(
            'fields' => ['unit_id', 'unit_nama', 'unit_kode'],
            'limit'    => $limit,
            'start'    => $start,
            'filter'   => $filter,
            'sort'     => $sorter
        ));

        // add option semua for combobox
        $records['data'][] = array(
            'unit_id' => 'semua',
            'unit_nama' => 'Semua Bagian'
        );
        $this->response($records);
    }

    // for combobox bagian unit
    public function combobagian()
    {
        $model = $this->m_unit_hidup;

        $limit = varGet('limit');
        $start = varGet('start');
        $sorter = varGet('sort');
        $filter = json_decode(varGet('filter', '[]'));

        $unit = varGet('unit');
        if (!$unit) {
            $this->response((object)[
                'success' => false,
                'message' => 'Unit tidak ditemukan'
            ]);
        }
        array_unshift($filter, (object)array(
            'type'  => 'exact',
            'field' => 'unit_induk',
            'value' => $unit
        ));

        $filter = json_encode($filter);
        $records = $model->select(array(
            'fields' => ['unit_id', 'unit_nama'],
            'limit'    => $limit,
            'start'    => $start,
            'filter'   => $filter,
            'sort'     => $sorter
        ));
        // add option semua for combobox
        $records['data'][] = array(
            'unit_id' => 'semua',
            'unit_nama' => 'Semua Bagian'
        );
        $this->response($records);
    }
}
