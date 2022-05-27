<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Perintah extends Base_Controller
{

    protected $message = array();

    public function __construct()
    {
        parent::__construct();
        $this->m_disposisi          = $this->model('sipas/disposisi',               true);
        $this->m_disposisi_penerima = $this->model('sipas/disposisi_masuk',         true);
        $this->m_perintah           = $this->model('sipas/perintah',                true);
        $this->m_perintah_view      = $this->model('sipas/perintah_view',           true);
        $this->m_surat_staf_view    = $this->model('sipas/disposisi_masuk_view',    true);

        $this->m_perintah_hidup     = $this->model('sipas/perintah_hidup_view',     true);
        $this->m_perintah_aktif     = $this->model('sipas/perintah_aktif_view',     true);
        $this->m_perintah_nonaktif  = $this->model('sipas/perintah_nonaktif_view',  true);
        $this->m_properti           = $this->model('sipas/properti',                true);
        $this->m_account            = $this->model('sipas/account',                 true);
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $me = $this;
        $model = $me->m_perintah_hidup;
        $modelPerintah = $me->m_perintah;
        $id = varGet('id');

        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));

        array_unshift($sorter, (object)array(
            'property'  => 'perintah_level',
            'direction' => 'asc'
        ));

        if (varGetHas('id') || varGetHas('perintah_id')) {
            $id = varGet('id', varGet('perintah_id'));

            $record = null;

            if (inCacheExists($modelPerintah, $id)) {
                $record = getRecordFromCache($modelPerintah, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelPerintah, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => json_encode($sorter),
            ));
            // $operation['debug']=$model->get_lastquery();
            $this->response($operation);
        }
    }

    public function aktif()
    {
        $model = $this->m_perintah_aktif;
        $modelPerintah = $this->m_perintah;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));
        array_unshift($sorter, (object)array(
            'property'  => 'perintah_level',
            'direction' => 'asc'
        ));

        if (varGetHas('id') || varGetHas('perintah_id')) {
            $id = varGet('id', varGet('perintah_id'));
            $record = null;

            if (inCacheExists($modelPerintah, $id)) {
                $record = getRecordFromCache($modelPerintah, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelPerintah, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'perintah_kode LIKE "%' . $query . '%" OR perintah_nama LIKE "%' . $query . '%"'
                ));
            }
            // array_unshift($filter, (object)array(
            //     'type'      => 'custom',
            //     'value'     => '(properti_hapus_tgl IS NULL OR properti_pulih_tgl IS NOT NULL)'
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

    public function nonaktif()
    {
        $model = $this->m_perintah_nonaktif;
        $modelPerintah = $this->m_perintah;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        array_unshift($sorter, (object)array(
            'property'  => 'perintah_level',
            'direction' => 'asc'
        ));
        if (varGetHas('id') || varGetHas('perintah_id')) {
            $id = varGet('id', varGet('perintah_id'));
            $record = null;

            if (inCacheExists($modelPerintah, $id)) {
                $record = getRecordFromCache($modelPerintah, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelPerintah, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'perintah_kode LIKE "%' . $query . '%" OR perintah_nama LIKE "%' . $query . '%"'
                ));
            }
            // array_unshift($filter, (object)array(
            //     'type'      => 'custom',
            //     'value'     => '(properti_hapus_tgl IS NULL OR properti_pulih_tgl IS NOT NULL)'
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

    // public function create($usePayload = true){
    //     $me = $this;

    //     $payload = getRequestPayload();
    //     $data = (array) ($usePayload ? $payload : varPost());

    //     $operation = $me->m_perintah->insert($data, null, function($response){});
    //     $this->response($operation);
    // }

    public function create($usePayload = true)
    {
        $model = $this->m_perintah;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['perintah_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
        //     // echo '<pre>';
        //     // print_r($data);
        //     $data['perintah_id'] = $model->get_insertid();
        //     $op = $properti->updated($data['perintah_properti'], $akun, $data, 'perintah', $data['perintah_id']);
        // });

        $operation = $model->insert($data, null, function ($response) use ($model, $akun, $properti, $data) {
            if ($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);

            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'perintah', $inserted_data['perintah_id'], $inserted_data['perintah_kode']);
            if ($op) {
                $model->update($inserted_data['perintah_id'], array(
                    'perintah_properti' => $op['properti_id']
                ));
            }
        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }

    // public function update($usePayload = true){
    //     $me = $this;
    //     $primary = $me->m_perintah->get_primary();
    //     $payload = getRequestPayload();
    //     $data = (array) ($usePayload ? $payload : varPost());
    //     $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

    //     $operation = $me->m_perintah->update($id, $data, function($response){});
    //     $this->response($operation);
    // }

    public function update($usePayload = true)
    {
        $model = $this->m_perintah;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['perintah_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['perintah_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});

        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['perintah_id']);
            $idProp = $updated_data['perintah_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $updated_data, 'perintah', $updated_data['perintah_id'], $updated_data['perintah_kode']);
                if ($op) {
                    $model->update($updated_data['perintah_id'], array(
                        'perintah_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['perintah_kode']);
        });
        $this->response($operation);
    }

    // public function destroy($usePayload = true){
    //     $me = $this;
    //     $primary = $me->m_perintah->get_primary();

    //     $payload = getRequestPayload();
    //     $data = (array) ($usePayload ? $payload : varPost());
    //     $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

    //     $operation = $me->m_perintah->delete($id, function($response){});
    //     $this->response($operation);
    // }

    public function destroy($usePayload = true)
    {
        $model = $this->m_perintah;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['perintah_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['perintah_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});

        $data['perintah_kode'] = $data['perintah_id'];
        $data['perintah_ishapus'] = 1;
        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {

            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['perintah_id']);
            $idProp = $deleted_data['perintah_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $deleted_data, 'perintah', $deleted_data['perintah_id'], $deleted_data['perintah_kode']);
                if ($op) {
                    $model->update($deleted_data['perintah_id'], array(
                        'perintah_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['perintah_kode']);
        });
        if ($operation['success']) {
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}
