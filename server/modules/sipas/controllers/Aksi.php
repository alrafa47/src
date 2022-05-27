<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Aksi extends Base_Controller
{

    protected $message = array();

    public function __construct()
    {
        parent::__construct();
        $this->m_disposisi          = $this->model('sipas/disposisi',               true);
        $this->m_disposisi_penerima = $this->model('sipas/disposisi_masuk',         true);
        $this->m_aksi               = $this->model('sipas/aksi',                    true);
        $this->m_aksi_view          = $this->model('sipas/aksi_view',               true);
        $this->m_aksi_hidup         = $this->model('sipas/aksi_hidup_view',         true);
        $this->m_aksi_aktif         = $this->model('sipas/aksi_aktif_view',         true);
        $this->m_aksi_nonaktif      = $this->model('sipas/aksi_nonaktif_view',      true);
        $this->m_surat_staf_view    = $this->model('sipas/disposisi_masuk_view',    true);
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
        $model = $me->m_aksi_hidup;
        $modelaksi = $me->m_aksi; // used by cache
        $id = varGet('id');

        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));

        array_unshift($sorter, (object)array(
            'property'  => 'aksi_level',
            'direction' => 'asc'
        ));

        if (varGetHas('id') || varGetHas('aksi_id')) {
            $id = varGet('id', varGet('aksi_id'));

            $record = null;
            if (inCacheExists($modelaksi, $id)) {
                $record = getRecordFromCache($modelaksi, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelaksi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            // $operation['debug']=$model->get_lastquery();
            $this->response($operation);
        }
    }

    public function aktif()
    {
        $model = $this->m_aksi_aktif;
        $aksimodel = $this->m_aksi;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        array_unshift($sorter, (object)array(
            'property'  => 'aksi_level',
            'direction' => 'asc'
        ));

        if (varGetHas('id') || varGetHas('aksi_id')) {
            $id = varGet('id', varGet('aksi_id'));

            $record = null;
            if (inCacheExists($aksimodel, $id)) {
                $record = getRecordFromCache($aksimodel, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($aksimodel, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'aksi_kode LIKE "%' . $query . '%" OR aksi_nama LIKE "%' . $query . '%"'
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
        $model = $this->m_aksi_nonaktif;
        $modelaksi = $this->m_aski;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        array_unshift($sorter, (object)array(
            'property'  => 'aksi_level',
            'direction' => 'asc'
        ));

        if (varGetHas('id') || varGetHas('aksi_id')) {
            $id = varGet('id', varGet('aksi_id'));

            $record = null;
            if (inCacheExists($modelaksi, $id)) {
                $record = getRecordFromCache($modelaksi, $id);
                $useCache = true;
            }

            if (!$record) {
                $record = $model->read($id);
                addRecordToCache($modelaksi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else {
            $query = varGet('query');
            if (!empty($query)) {
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'aksi_kode LIKE "%' . $query . '%" OR aksi_nama LIKE "%' . $query . '%"'
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

    public function create($usePayload = true)
    {
        $model = $this->m_aksi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $operation = $model->insert($data, null, function ($response) use ($model, $akun, $properti, $data) {
            if ($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];

            $op = $properti->created($akun, $inserted_data, 'aksi', $inserted_data['aksi_id'], $inserted_data['aksi_kode']);
            if ($op) {
                $model->update($inserted_data['aksi_id'], array(
                    'aksi_properti' => $op['properti_id']
                ));
            }
        });
        if ($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }

    public function update($usePayload = true)
    {
        $model = $this->m_aksi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['aksi_id']);
            $idProp = $updated_data['aksi_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $updated_data, 'aksi', $updated_data['aksi_id'], $updated_data['aksi_kode']);
                if ($op) {
                    $model->update($updated_data['aksi_id'], array(
                        'aksi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['aksi_kode']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
        $model = $this->m_aksi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $data['aksi_kode'] = $data['aksi_id'];
        $data['aksi_ishapus'] = 1;
        $operation = $model->update($id, $data, function ($response) use ($properti, $model, $akun, $data) {

            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['aksi_id']);
            $idProp = $deleted_data['aksi_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun, $deleted_data, 'aksi', $deleted_data['aksi_id'], $deleted_data['aksi_kode']);
                if ($op) {
                    $model->update($deleted_data['aksi_id'], array(
                        'aksi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['aksi_kode']);
        });
        if ($operation['success']) {
            $operation['message'] = 'Berhasil Menghapus Data';
        } else {
            $operation['message'] = 'Gagal Menghapus Data';
        }
        $this->response($operation);
    }
}
