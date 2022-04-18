<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jabatan_wakil extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/jabatan',
            'sipas/jabatan_wakil',
            'sipas/jabatan_wakil_view'
        ));
        $this->m_jabatan                       = $this->model('sipas/jabatan',                        true);
        $this->m_jabatan_view                  = $this->model('sipas/jabatan_view',                   true);
        $this->m_jabatan_wakil                 = $this->model('sipas/jabatan_wakil',                  true);
        $this->m_jabatan_wakil_view            = $this->model('sipas/jabatan_wakil_view',             true);
        $this->m_jabatan_asisten_view          = $this->model('sipas/jabatan_asisten_view',           true);
        $this->m_jabatan_atasan_view           = $this->model('sipas/jabatan_atasan_view',            true);

        $this->m_properti         = $this->model('sipas/properti',         true);
        $this->m_account          = $this->model('sipas/account',          true);
        $this->m_pengaturan       = $this->model('sipas/pengaturan',       true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_jabatan_wakil_view;
        $id = varGet('id');

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $model->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        $this->response($operation);
    }

    public function combo($section = null){
        $model = $this->m_jabatan_view;
        $id = varGet('id');

        if( ! empty($id) ){
            $record = $model->read($id);
            $records = array( 'success'=> (bool) $record, 'record'=>$record );
        }else{
            $records = $model->select(array(
                'limit' => varGet('limit'),
                'start' => varGet('start'),
                'filters' => varGet('filter'),
                'sort' => varGet('sort')
            ));
        }
        $this->response($records);
    }

    public function asisten(){
        $model = $this->m_jabatan_asisten_view;
        $id = varGet('id');

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $model->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        $this->response($operation);
    }

    public function atasan(){
        $model = $this->m_jabatan_atasan_view;
        $id = varGet('id');

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $model->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }

        // $operation['debug']=$model->get_lastquery();
        $this->response($operation);
    }

    public function create($usePayload = true){
        $model = $this->m_jabatan_wakil;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        if(isAssoc($data)){
            $op = $properti->created($akun);
            $data['jabatan_wakil_properti'] = $op['properti_id'];
            $operation = $model->insert($data, null, function($response)
                use($data, $properti, $account, $model, $akun){
                    $data['jabatan_wakil_id'] = $model->get_insertid();
                    $op = $properti->updated($data['jabatan_wakil_properti'], $akun, $data, 'jabatan_wakil', $data['jabatan_wakil_id']);
                });
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $op = $properti->created($akun);
                $_data['jabatan_wakil_properti'] = $op['properti_id'];
                
                $operation = $model->insert($_data, null, function($response)
                    use($data, $properti, $account, $model, $akun){
                        // $data['jabatan_wakil_id'] = $model->get_insertid();
                        // $op = $properti->updated($data['jabatan_wakil_properti'], $akun, $data, 'jabatan_wakil', $data['jabatan_wakil_id']);

                        $inserted_data = $model->read($model->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'jabatan_wakil', $inserted_data['jabatan_wakil_id']);
                    });
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $operation = $response;
        }
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_jabatan_wakil;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        if(isAssoc($data)){
            $operation = $model->update($id, $data);
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $id = array_key_exists('id', $_data) ? $_data['id'] : (array_key_exists($primary, $_data) ? $_data[$primary] : null);
                $operation = $model->update($id, $_data);
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $operation = $response;
        }
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_jabatan_wakil;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        if(isAssoc($data)){
            $operation = $model->delete($id);
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menghapus data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $id = array_key_exists('id', $_data) ? $_data['id'] : (array_key_exists($primary, $_data) ? $_data[$primary] : null);
                $operation = $model->delete($id);
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $operation = $response;
        }
        $this->response($operation);
    }
}