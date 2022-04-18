<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Golongan extends Base_Controller {

    protected $message = array();
      
	public function __construct(){
        parent::__construct();
        $this->m_golongan          = $this->model('sipas/golongan',                       true);
        $this->m_golongan_view     = $this->model('sipas/golongan_view',                  true);
        $this->m_properti           = $this->model('sipas/properti',                        true);
        $this->m_account            = $this->model('sipas/account',                         true);
        $this->m_golongan_hidup    = $this->model('sipas/golongan_hidup_view',            true);
        $this->m_golongan_aktif    = $this->model('sipas/golongan_aktif_view',            true);
        $this->m_golongan_nonaktif = $this->model('sipas/golongan_nonaktif_view',         true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_golongan_hidup;
        $modelGolongan = $this->m_golongan; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('golongan_id')){
            $id = varGet('id', varGet('golongan_id'));
            $record = null;

            if(inCacheExists($modelGolongan, $id)){
                $record = getRecordFromCache($modelGolongan, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelGolongan, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
            
        } else {
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
        $model = $this->m_golongan_aktif;
        $modelGolongan = $this->m_golongan; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('golongan_id')){
            $id = varGet('id', varGet('golongan_id'));
            $record = null;

            if(inCacheExists($modelGolongan, $id)){
                $record = getRecordFromCache($modelGolongan, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelGolongan, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
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
        $model = $this->m_golongan_nonaktif;
        $modelGolongan = $this->m_golongan; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('golongan_id')){
            $id = varGet('id', varGet('golongan_id'));
            $record = null;

            if(inCacheExists($modelGolongan, $id)){
                $record = getRecordFromCache($modelGolongan, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelGolongan, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
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
        $model = $this->m_golongan;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'golongan', $inserted_data['golongan_id'], $inserted_data['golongan_level']);
            if($op){
                $model->update($inserted_data['golongan_id'], array(
                    'golongan_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_golongan;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['golongan_id']);
            $idProp = $updated_data['golongan_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'golongan', $updated_data['golongan_id'], $updated_data['golongan_level']);
                if($op){
                    $model->update($updated_data['golongan_id'], array(
                        'golongan_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['golongan_level']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_golongan;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $idProp = $data['golongan_properti'];

        $data['golongan_level'] = $data['golongan_id'];
        $data['golongan_ishapus'] = 1;
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['golongan_id']);
            $idProp = $deleted_data['golongan_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'golongan', $deleted_data['golongan_id'], $deleted_data['golongan_level']);
                if($op){
                    $model->update($deleted_data['golongan_id'], array(
                        'golongan_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['golongan_level']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}