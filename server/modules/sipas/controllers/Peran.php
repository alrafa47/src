<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Peran extends Base_Controller
{
	
	function __construct()
	{
		parent::__construct();
		$this->m_peran          = $this->model('sipas/peran',                    true);
        $this->m_peran_view     = $this->model('sipas/peran_view',               true);
        $this->m_properti       = $this->model('sipas/properti',                 true);
        $this->m_account        = $this->model('sipas/account',                  true);
        $this->m_peran_hidup    = $this->model('sipas/peran_hidup_view',         true);
        $this->m_peran_aktif    = $this->model('sipas/peran_aktif_view',         true);
        $this->m_peran_nonaktif = $this->model('sipas/peran_nonaktif_view',      true);
	}

    public function index(){
        $this->read();
    }

    public function generate_id(){
        $this->response(array(
            'id' => $this->model('sipas/peran')->generate_id()
        ));
    }

    public function read(){
        $model = $this->m_peran_hidup;
        $modelPeran = $this->m_peran;
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('peran_id')){
            $id = varGet('id', varGet('peran_id'));
             $record = null;

            if(inCacheExists($modelPeran, $id)){
                $record = getRecordFromCache($modelPeran, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelPeran, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'peran_nama LIKE "%'.$query.'%" OR peran_nama LIKE "%'.$query.'%"'
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

    public function aktif(){
        $model = $this->m_peran_aktif;
        $modelPeran = $this->m_peran;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('peran_id')){
            $id = varGet('id', varGet('peran_id'));
            $record = null;

            if(inCacheExists($modelPeran, $id)){
                $record = getRecordFromCache($modelPeran, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelPeran, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'peran_nama LIKE "%'.$query.'%" OR peran_nama LIKE "%'.$query.'%"'
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
        $modelPeran = $this->m_peran;
        $model = $this->m_peran_nonaktif;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('peran_id')){
            $id = varGet('id', varGet('peran_id'));
            $record = null;

            if(inCacheExists($modelPeran, $id)){
                $record = getRecordFromCache($modelPeran, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelPeran, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'peran_nama LIKE "%'.$query.'%" OR peran_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_peran;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['peran_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response){});

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'peran', $inserted_data['peran_id'], $inserted_data['peran_nama']);
            if($op){
                $model->update($inserted_data['peran_id'], array(
                    'peran_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_peran;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['peran_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['peran_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){
            addRecordToCache($model, $response[$model->dataProperty]);
            $updated_data = $model->read($data['peran_id']);
            
            $idProp = $updated_data['peran_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'peran', $updated_data['peran_id'], $updated_data['peran_nama']);
                if($op){
                    $model->update($updated_data['peran_id'], array(
                        'peran_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['peran_nama']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_peran;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['peran_properti'];
        $data['peran_ishapus'] = 1;
        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['peran_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});
        
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            // $deleted_data = $response['data'];
            addRecordToCache($model, $response[$model->dataProperty]);
            $deleted_data = $model->read($data['peran_id']);
            $idProp = $deleted_data['peran_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'peran', $deleted_data['peran_id'], $deleted_data['peran_nama']);
                if($op){
                    $model->update($deleted_data['peran_id'], array(
                        'peran_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['peran_nama']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

}