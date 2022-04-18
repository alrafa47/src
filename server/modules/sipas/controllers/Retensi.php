<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Retensi extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_retensi          = $this->model('sipas/retensi',                   true);
        $this->m_retensi_view     = $this->model('sipas/retensi_view',              true);
        $this->m_properti         = $this->model('sipas/properti',                  true);
        $this->m_account          = $this->model('sipas/account',                   true);
        $this->m_retensi_hidup    = $this->model('sipas/retensi_hidup_view',        true);
        $this->m_retensi_aktif    = $this->model('sipas/retensi_aktif_view',        true);
        $this->m_retensi_nonaktif = $this->model('sipas/retensi_nonaktif_view',     true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_retensi_hidup;
        $modelRetensi = $this->m_retensi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('retensi_id')){
            $id = varGet('id', varGet('retensi_id'));
            $record = null;

            if(inCacheExists($modelRetensi, $id)){
                $record = getRecordFromCache($modelRetensi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelRetensi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'retensi_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_retensi_aktif;
        $modelRetensi = $this->m_retensi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('retensi_id')){
            $id = varGet('id', varGet('retensi_id'));

            $record = null;

            if(inCacheExists($modelRetensi, $id)){
                $record = getRecordFromCache($modelRetensi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelRetensi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'retensi_nama LIKE "%'.$query.'%" OR retensi_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_retensi_nonaktif;
        $modelRetensi = $this->m_retensi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('retensi_id')){
            $id = varGet('id', varGet('retensi_id'));

            $record = null;

            if(inCacheExists($modelRetensi, $id)){
                $record = getRecordFromCache($modelRetensi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelRetensi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'retensi_nama LIKE "%'.$query.'%" OR retensi_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_retensi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['retensi_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
        //     // echo '<pre>';
        //     // print_r($data);
        //     $data['retensi_id'] = $model->get_insertid();
        //     $op = $properti->updated($data['retensi_properti'], $akun, $data, 'retensi', $data['retensi_id']);
        // });

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'retensi', $inserted_data['retensi_id'], $inserted_data['retensi_nama']);
            if($op){
                $model->update($inserted_data['retensi_id'], array(
                    'retensi_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_retensi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['retensi_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['retensi_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['retensi_id']);
            $idProp = $updated_data['retensi_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'retensi', $updated_data['retensi_id'], $updated_data['retensi_nama']);
                if($op){
                    $model->update($updated_data['retensi_id'], array(
                        'retensi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['retensi_nama']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_retensi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['retensi_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['retensi_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});
        $data['retensi_ishapus'] = 1;
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);
            $deleted_data = $model->read($data['retensi_id']);
            $idProp = $deleted_data['retensi_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'retensi', $deleted_data['retensi_id'], $deleted_data['retensi_nama']);
                if($op){
                    $model->update($deleted_data['retensi_id'], array(
                        'retensi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['retensi_nama']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}