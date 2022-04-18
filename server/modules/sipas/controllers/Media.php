<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Media extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_media          = $this->model('sipas/media',                    true);
        $this->m_media_view     = $this->model('sipas/media_view',               true);
        $this->m_properti       = $this->model('sipas/properti',                 true);
        $this->m_account        = $this->model('sipas/account',                  true);
        $this->m_media_hidup    = $this->model('sipas/media_hidup_view',         true);
        $this->m_media_aktif    = $this->model('sipas/media_aktif_view',         true);
        $this->m_media_nonaktif = $this->model('sipas/media_nonaktif_view',      true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_media_hidup;
        $modelMedia = $this->m_media; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('media_id')){
            $id = varGet('id', varGet('media_id'));
            $record = null;

            if(inCacheExists($modelMedia, $id)){
                $record = getRecordFromCache($modelMedia, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelMedia, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'media_kode LIKE "%'.$query.'%" OR media_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_media_aktif;
        $modelMedia = $this->m_media; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('media_id')){
            $id = varGet('id', varGet('media_id'));

            $record = null;

            if(inCacheExists($modelMedia, $id)){
                $record = getRecordFromCache($modelMedia, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelMedia, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'media_kode LIKE "%'.$query.'%" OR media_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_media_nonaktif;
        $modelMedia = $this->m_media; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('media_id')){
            $id = varGet('id', varGet('media_id'));

            $record = null;

            if(inCacheExists($modelMedia, $id)){
                $record = getRecordFromCache($modelMedia, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelMedia, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'media_kode LIKE "%'.$query.'%" OR media_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_media;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['media_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
        //     // echo '<pre>';
        //     // print_r($data);
        //     $data['media_id'] = $model->get_insertid();
        //     $op = $properti->updated($data['media_properti'], $akun, $data, 'media', $data['media_id']);
        // });

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);

            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'media', $inserted_data['media_id'], $inserted_data['media_kode']);
            if($op){
                $model->update($inserted_data['media_id'], array(
                    'media_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_media;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['media_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['media_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['media_id']);
            $idProp = $updated_data['media_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'media', $updated_data['media_id'], $updated_data['media_kode']);
                if($op){
                    $model->update($updated_data['media_id'], array(
                        'media_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['media_kode']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_media;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['media_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['media_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});
        $data['media_kode']  = $data['media_id'];
        $data['media_ishapus'] = 1;

        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){
                
            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['media_id']);
            $idProp = $deleted_data['media_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'media', $deleted_data['media_id'], $deleted_data['media_kode']);
                if($op){
                    $model->update($deleted_data['media_id'], array(
                        'media_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['media_kode']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}