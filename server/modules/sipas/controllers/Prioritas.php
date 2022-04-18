<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Prioritas extends Base_Controller {

    protected $message = array();
      
	public function __construct(){
        parent::__construct();
        $this->m_prioritas          = $this->model('sipas/prioritas',                       true);
        $this->m_prioritas_view     = $this->model('sipas/prioritas_view',                  true);
        $this->m_properti           = $this->model('sipas/properti',                        true);
        $this->m_account            = $this->model('sipas/account',                         true);
        $this->m_prioritas_hidup    = $this->model('sipas/prioritas_hidup_view',            true);
        $this->m_prioritas_aktif    = $this->model('sipas/prioritas_aktif_view',            true);
        $this->m_prioritas_nonaktif = $this->model('sipas/prioritas_nonaktif_view',         true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_prioritas_hidup;
        $modelPrioritas = $this->m_prioritas; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('prioritas_id')){
            $id = varGet('id', varGet('prioritas_id'));
            $record = null;

            if(inCacheExists($modelPrioritas, $id)){
                $record = getRecordFromCache($modelPrioritas, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelPrioritas, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
            
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'prioritas_kode LIKE "%'.$query.'%" OR prioritas_nama LIKE "%'.$query.'%"'
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

    function getHari($id = null)
    {
        $model = $this->m_prioritas_view;
        $id = varGet('id');

        $record = $model->read($id);

        $this->response(array(
            'hari' => $record['prioritas_retensi']
        ));
    }

    public function aktif(){
        $model = $this->m_prioritas_aktif;
        $modelPrioritas = $this->m_prioritas; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('prioritas_id')){
            $id = varGet('id', varGet('prioritas_id'));
            $record = null;

            if(inCacheExists($modelPrioritas, $id)){
                $record = getRecordFromCache($modelPrioritas, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelPrioritas, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'prioritas_kode LIKE "%'.$query.'%" OR prioritas_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_prioritas_nonaktif;
        $modelPrioritas = $this->m_prioritas; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('prioritas_id')){
            $id = varGet('id', varGet('prioritas_id'));
            $record = null;

            if(inCacheExists($modelPrioritas, $id)){
                $record = getRecordFromCache($modelPrioritas, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelPrioritas, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'prioritas_kode LIKE "%'.$query.'%" OR prioritas_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_prioritas;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['prioritas_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
        //     // echo '<pre>';
        //     // print_r($data);
        //     $data['prioritas_id'] = $model->get_insertid();
        //     $op = $properti->updated($data['prioritas_properti'], $akun, $data, 'prioritas', $data['prioritas_id']);
        // });

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'prioritas', $inserted_data['prioritas_id'], $inserted_data['prioritas_kode']);
            if($op){
                $model->update($inserted_data['prioritas_id'], array(
                    'prioritas_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_prioritas;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['prioritas_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['prioritas_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['prioritas_id']);
            $idProp = $updated_data['prioritas_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'prioritas', $updated_data['prioritas_id'], $updated_data['prioritas_kode']);
                if($op){
                    $model->update($updated_data['prioritas_id'], array(
                        'prioritas_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['prioritas_kode']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_prioritas;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['prioritas_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['prioritas_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});
        
        $idProp = $data['prioritas_properti'];

        $data['prioritas_kode'] = $data['prioritas_id'];
        $data['prioritas_ishapus'] = 1;
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['prioritas_id']);
            $idProp = $deleted_data['prioritas_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'prioritas', $deleted_data['prioritas_id'], $deleted_data['prioritas_kode']);
                if($op){
                    $model->update($deleted_data['prioritas_id'], array(
                        'prioritas_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['prioritas_kode']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}