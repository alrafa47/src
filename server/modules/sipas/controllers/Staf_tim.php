<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Staf_tim extends Base_Controller
{

    protected $message = array();

    public function __construct()
    {
        parent::__construct();
        $this->load->model(array(
            'sipas/staf',
            'sipas/staf_tim_view',
            'sipas/staf_tim_anggota'
        ));
        $this->m_staf               = $this->model('sipas/staf',               true);
        $this->m_staf_tim_view      = $this->model('sipas/staf_tim_view',      true);
        $this->m_staf_tim_anggota   = $this->model('sipas/staf_tim_anggota',   true);

        $this->m_staf_tim           = $this->model('sipas/staf_tim',           true);
        $this->m_properti           = $this->model('sipas/properti',           true);
        $this->m_account            = $this->model('sipas/account',            true);

        $this->m_staf_tim_hidup    = $this->model('sipas/staf_tim_hidup_view',         true);
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $model = $this->m_staf_tim_hidup;
        $modelStafTim = $this->m_staf_tim;
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('staf_tim_id')) {
            $id = varGet('id', varGet('staf_tim_id'));
            $record = null;

            if (inCacheExists($modelStafTim, $id)) {
                $record = getRecordFromCache($modelStafTim, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelStafTim, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'staf_tim_nama LIKE "%' . $query . '%" OR staf_tim_nama LIKE "%' . $query . '%"'
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
        $model = $this->m_staf_tim;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['staf_tim_properti'] = $op['properti_id'];

        $operation = $model->insert($data, null, function ($response)
        use ($data, $properti, $account, $model, $akun) {
            if ($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'staf_tim', $inserted_data['staf_tim_id'], $inserted_data['staf_tim_nama']);
            if ($op) {
                $model->update($inserted_data['staf_tim_id'], array(
                    'staf_tim_properti' => $op['properti_id']
                ));
            }

            // $data['staf_tim_id'] = $model->get_insertid();
            // $op = $properti->updated($data['staf_tim_properti'], $akun, $data, 'staf_tim', $data['staf_tim_id']);
        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }

    public function update($usePayload = true)
    {
        $model = $this->m_staf_tim;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['staf_tim_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['staf_tim_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});

        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {
            addRecordToCache($model, $response[$model->dataProperty]);
            $updated_data = $model->read($data['staf_tim_id']);

            $idProp = $updated_data['staf_tim_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $updated_data, 'staf_tim', $updated_data['staf_tim_id'], $updated_data['staf_tim_nama']);
                if ($op) {
                    $model->update($updated_data['staf_tim_id'], array(
                        'staf_tim_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['staf_tim_nama']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
        $model = $this->m_staf_tim;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['staf_tim_properti'];
        $data['staf_tim_ishapus'] = 1;
        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['staf_tim_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});

        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {

            // $deleted_data = $response['data'];
            addRecordToCache($model, $response[$model->dataProperty]);
            $deleted_data = $model->read($data['staf_tim_id']);
            $idProp = $deleted_data['staf_tim_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $deleted_data, 'staf_tim', $deleted_data['staf_tim_id'], $deleted_data['staf_tim_nama']);
                if ($op) {
                    $model->update($deleted_data['staf_tim_id'], array(
                        'staf_tim_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['staf_tim_nama']);
        });
        if ($operation['success']) {
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    public function filterUnit($filter)
    {
        $unit = varGet('unit');
        if ($unit && $unit != 'semua') {
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => "staf_tim_unit_parent_path LIKE '%$unit'"
            ));
        }
        return $filter;
    }
}
