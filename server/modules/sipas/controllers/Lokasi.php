<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Lokasi extends Base_Controller {

    protected $message = array();
      
	public function __construct(){
        parent::__construct();
        $this->m_lokasi          = $this->model('sipas/lokasi',                    true);
        $this->m_lokasi_view     = $this->model('sipas/lokasi_view',               true);
        $this->m_properti        = $this->model('sipas/properti',                  true);
        $this->m_account         = $this->model('sipas/account',                   true);
        $this->m_lokasi_hidup    = $this->model('sipas/lokasi_hidup_view',         true);
        $this->m_lokasi_aktif    = $this->model('sipas/lokasi_aktif_view',         true);
        $this->m_lokasi_nonaktif = $this->model('sipas/lokasi_nonaktif_view',      true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_lokasi_hidup;
        $modelLokasi = $this->m_lokasi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('lokasi_id')){
            $id = varGet('id', varGet('lokasi_id'));
            $record = null;

            if(inCacheExists($modelLokasi, $id)){
                $record = getRecordFromCache($modelLokasi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelLokasi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'lokasi_kode LIKE "%'.$query.'%" OR lokasi_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_lokasi_aktif;
        $modelLokasi = $this->m_lokasi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('lokasi_id')){
            $id = varGet('id', varGet('lokasi_id'));

            $record = null;

            if(inCacheExists($modelLokasi, $id)){
                $record = getRecordFromCache($modelLokasi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelLokasi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'lokasi_kode LIKE "%'.$query.'%" OR lokasi_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_lokasi_nonaktif;
        $modelLokasi = $this->m_lokasi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('lokasi_id')){
            $id = varGet('id', varGet('lokasi_id'));

            $record = null;

            if(inCacheExists($modelLokasi, $id)){
                $record = getRecordFromCache($modelLokasi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelLokasi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'lokasi_kode LIKE "%'.$query.'%" OR lokasi_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_lokasi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['lokasi_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
        //     $data['lokasi_id'] = $model->get_insertid();
        //     $op = $properti->updated($data['lokasi_properti'], $akun, $data, 'lokasi', $data['lokasi_id']);
        // });

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'lokasi', $inserted_data['lokasi_id'], $inserted_data['lokasi_kode']);
            if($op){
                $model->update($inserted_data['lokasi_id'], array(
                    'lokasi_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_lokasi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['lokasi_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['lokasi_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['lokasi_id']);
            $idProp = $updated_data['lokasi_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'lokasi', $updated_data['lokasi_id'], $updated_data['lokasi_kode']);
                if($op){
                    $model->update($updated_data['lokasi_id'], array(
                        'lokasi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['lokasi_kode']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_lokasi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['lokasi_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['lokasi_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});
        $data['lokasi_kode'] = $data['lokasi_id'];
        $data['lokasi_ishapus'] = 1;

        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){
                
            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['lokasi_id']);
            $idProp = $deleted_data['lokasi_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'lokasi', $deleted_data['lokasi_id'], $deleted_data['lokasi_kode']);
                if($op){
                    $model->update($deleted_data['lokasi_id'], array(
                        'lokasi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['lokasi_kode']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}