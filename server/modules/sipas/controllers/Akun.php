<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Akun extends Base_Controller
{
	
	function __construct()
	{
		parent::__construct();
        $this->m_akun               = $this->model('sipas/akun', true);
        $this->m_akun_view          = $this->model('sipas/akun_view', true);
        $this->m_akun_hidup         = $this->model('sipas/akun_hidup_view', true);
        $this->m_akun_aktif         = $this->model('sipas/akun_aktif_view', true);
        $this->m_akun_nonaktif      = $this->model('sipas/akun_nonaktif_view', true);
        $this->m_properti           = $this->model('sipas/properti', true);
        $this->m_account            = $this->model('sipas/account', true);
	}

    public function index()
    {
        $this->read();
    }
    
    public function read(){
        $me = $this;
        $model = $me->m_akun_hidup;
        $modelAkun = $me->m_akun;
        $id = varGet('id');

        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if(varGetHas('id') || varGetHas('akun_id')){
            $id = varGet('id', varGet('akun_id'));

            $record = null;

            if(inCacheExists($modelAkun, $id)){
                $record = getRecordFromCache($modelAkun, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelAkun, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        } else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'akun_nama LIKE "%'.$query.'%" OR akun_nama LIKE "%'.$query.'%"'
                ));
            }
            
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

    public function aktif(){
        $model = $this->m_akun_aktif;
        $modelAkun = $this->m_akun;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('akun_id')){
            $id = varGet('id', varGet('akun_id'));

            $record = null;

            if(inCacheExists($modelAkun, $id)){
                $record = getRecordFromCache($modelAkun, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelAkun, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'akun_nama LIKE "%'.$query.'%" OR akun_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_akun_nonaktif;
        $modelAkun = $this->m_akun;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('akun_id')){
            $id = varGet('id', varGet('akun_id'));

            $record = null;

            if(inCacheExists($modelAkun, $id)){
                $record = getRecordFromCache($modelAkun, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelAkun, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'akun_nama LIKE "%'.$query.'%" OR akun_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_akun;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        if( array_key_exists('akun_sandi_edit', $data) and !!$data['akun_sandi_edit']){
            $data['akun_sandi'] = array_key_exists('akun_sandi', $data) ? $data['akun_sandi'] : null;
            $data['akun_sandi'] = $account->password($data['akun_sandi']);
        }else{
            unset($data['akun_sandi']);
        }
        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordtoCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'akun', $inserted_data['akun_id'], $inserted_data['akun_nama']);
            if($op){
                $model->update($inserted_data['akun_id'], array(
                    'akun_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_akun;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        if( array_key_exists('akun_sandi_edit', $data) and !!$data['akun_sandi_edit']){
            $data['akun_sandi'] = array_key_exists('akun_sandi', $data) ? $data['akun_sandi'] : null;
            $data['akun_sandi'] = $account->password($data['akun_sandi']);
        }else{
            unset($data['akun_sandi']);
        }
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){
            addRecordtoCache($model, $response[$model->dataProperty]);
            $updated_data = $model->read($data['akun_id']);
            $idProp = $updated_data['akun_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'akun', $updated_data['akun_id'], $updated_data['akun_nama']);
                if($op){
                    $model->update($updated_data['akun_id'], array(
                        'akun_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['akun_nama']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_akun;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $data['akun_nama'] = $data['akun_id'];
        $data['akun_ishapus'] = 1;

        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){
            addRecordtoCache($model, $response[$model->dataProperty]);
            $deleted_data = $model->read($data['akun_id']);
            $idProp = $deleted_data['akun_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'akun', $deleted_data['akun_id'], $deleted_data['akun_nama']);
                if($op){
                    $model->update($deleted_data['akun_id'], array(
                        'akun_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['akun_nama']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }else{
            $operation['message'] = 'Gagal Menghapus Data';
        }
        $this->response($operation);
    }
}