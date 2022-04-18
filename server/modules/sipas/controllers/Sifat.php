<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sifat extends Base_Controller {

    protected $message = array();
      
	public function __construct(){
        parent::__construct();
        $this->m_sifat          = $this->model('sipas/sifat',               true);
        $this->m_sifat_view     = $this->model('sipas/sifat_view',          true);
        $this->m_properti       = $this->model('sipas/properti',            true);
        $this->m_account        = $this->model('sipas/account',             true);
        $this->m_sifat_hidup    = $this->model('sipas/sifat_hidup_view',    true);
        $this->m_sifat_aktif    = $this->model('sipas/sifat_aktif_view',    true);
        $this->m_sifat_nonaktif = $this->model('sipas/sifat_nonaktif_view', true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_sifat_hidup;
        $modelSifat = $this->m_sifat; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sifat_id')){
            $id = varGet('id', varGet('sifat_id'));
            $record = null;

            if(inCacheExists($modelSifat, $id)){
                $record = getRecordFromCache($modelSifat, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelSifat, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);

        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'sifat_kode LIKE "%'.$query.'%" OR sifat_nama LIKE "%'.$query.'%"'
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

    public function aktif(){
        $model = $this->m_sifat_aktif;
        $modelSifat = $this->m_sifat; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sifat_id')){
            $id = varGet('id', varGet('sifat_id'));
            $record = null;

            if(inCacheExists($modelSifat, $id)){
                $record = getRecordFromCache($modelSifat, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelSifat, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'sifat_kode LIKE "%'.$query.'%" OR sifat_nama LIKE "%'.$query.'%"'
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

    public function nonaktif(){
        $model = $this->m_sifat_nonaktif;
        $modelSifat = $this->m_sifat; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sifat_id')){
            $id = varGet('id', varGet('sifat_id'));

            $record = null;

            if(inCacheExists($modelSifat, $id)){
                $record = getRecordFromCache($modelSifat, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelSifat, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'sifat_kode LIKE "%'.$query.'%" OR sifat_nama LIKE "%'.$query.'%"'
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
    
    public function create($usePayload = true){
        $model = $this->m_sifat;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $op = $properti->created($akun);
        $data['sifat_properti'] = $op['properti_id'];

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];

            $data['sifat_id'] = $model->get_insertid();
            $op = $properti->updated($data['sifat_properti'], $akun, $data, 'sifat', $data['sifat_id']);
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_sifat;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['sifat_properti'];

        if(empty($idProp)){
            $op = $properti->created($akun);
            $idProp = $op['properti_id'];
            $data['sifat_properti'] = $idProp;
        }
        $properti->updated($idProp, $akun);

        $operation = $model->update($id, $data, function($response) use ($model){
            addRecordToCache($model, $response[$model->dataProperty]);
        });

        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_sifat;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['sifat_properti'];

        $data['sifat_kode'] = $data['sifat_id'];
        $data['sifat_ishapus'] = 1;
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['sifat_id']);
            $idProp = $deleted_data['sifat_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'sifat', $deleted_data['sifat_id'], $deleted_data['sifat_kode']);
                if($op){
                    $model->update($deleted_data['sifat_id'], array(
                        'sifat_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['sifat_kode']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    public function readrahasia(){
        $model = $this->m_sifat_hidup;

        $id = varPost();
        $record = $model->read($id);

        $this->response_record($record);
    }
}