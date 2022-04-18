<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Ekspedisi extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_ekspedisi          = $this->model('sipas/ekspedisi', true);
        $this->m_ekspedisi_view     = $this->model('sipas/ekspedisi_view', true);

        $this->m_ekspedisi_aktif_view       = $this->model('sipas/ekspedisi_aktif_view', true);
        $this->m_ekspedisi_hidup_view       = $this->model('sipas/ekspedisi_hidup_view', true);
        $this->m_ekspedisi_nonaktif_view    = $this->model('sipas/ekspedisi_nonaktif_view', true);

        $this->m_properti   = $this->model('sipas/properti', true);
        $this->m_account    = $this->model('sipas/account', true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_ekspedisi_hidup_view;
        $modelEkspedisi = $this->m_ekspedisi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('ekspedisi_id')){
            $id = varGet('id', varGet('ekspedisi_id'));
            $record = null;

            if(inCacheExists($modelEkspedisi, $id)){
                $record = getRecordFromCache($modelEkspedisi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelEkspedisi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'ekspedisi_kode LIKE "%'.$query.'%" OR ekspedisi_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_ekspedisi_aktif_view;
        $modelEkspedisi = $this->m_ekspedisi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('ekspedisi_id')){
            $id = varGet('id', varGet('ekspedisi_id'));

            $record = null;

            if(inCacheExists($modelEkspedisi, $id)){
                $record = getRecordFromCache($modelEkspedisi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelEkspedisi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'ekspedisi_kode LIKE "%'.$query.'%" OR ekspedisi_nama LIKE "%'.$query.'%"'
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

    public function nonaktif(){
        $model = $this->m_ekspedisi_nonaktif_view;
        $modelEkspedisi = $this->m_ekspedisi; // used by cache

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('ekspedisi_id')){
            $id = varGet('id', varGet('ekspedisi_id'));

            $record = null;

            if(inCacheExists($modelEkspedisi, $id)){
                $record = getRecordFromCache($modelEkspedisi, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelEkspedisi, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'ekspedisi_kode LIKE "%'.$query.'%" OR ekspedisi_nama LIKE "%'.$query.'%"'
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

    public function create($usePayload = true){
        $model = $this->m_ekspedisi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['ekspedisi_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
        //     // echo '<pre>';
        //     // print_r($data);
        //     $data['ekspedisi_id'] = $model->get_insertid();
        //     $op = $properti->updated($data['ekspedisi_properti'], $akun, $data, 'ekspedisi', $data['ekspedisi_id']);
        // });

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){

            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'ekspedisi', $inserted_data['ekspedisi_id'], $inserted_data['ekspedisi_kode']);
            if($op){
                $model->update($inserted_data['ekspedisi_id'], array(
                    'ekspedisi_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_ekspedisi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['ekspedisi_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['ekspedisi_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['ekspedisi_id']);
            $idProp = $updated_data['ekspedisi_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'ekspedisi', $updated_data['ekspedisi_id'], $updated_data['ekspedisi_kode']);
                if($op){
                    $model->update($updated_data['ekspedisi_id'], array(
                        'ekspedisi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['ekspedisi_kode']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_ekspedisi;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['ekspedisi_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['ekspedisi_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});

        $data['ekspedisi_kode'] = $data['ekspedisi_id'];
        $data['ekspedisi_ishapus'] = 1;
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){
                
            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['ekspedisi_id']);
            $idProp = $deleted_data['ekspedisi_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'ekspedisi', $deleted_data['ekspedisi_id'], $deleted_data['ekspedisi_kode']);
                if($op){
                    $model->update($deleted_data['ekspedisi_id'], array(
                        'ekspedisi_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['ekspedisi_kode']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}