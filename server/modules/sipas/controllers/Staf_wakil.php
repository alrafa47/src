<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Staf_wakil extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/staf',
            'sipas/staf_wakil',
            'sipas/staf_wakil_view'
        ));
        $this->m_staf                       = $this->model('sipas/staf',                        true);
        $this->m_staf_wakil                 = $this->model('sipas/staf_wakil',                  true);
        $this->m_staf_wakil_view            = $this->model('sipas/staf_wakil_view',             true);
        $this->m_staf_pgs_view              = $this->model('sipas/staf_pgs_view',               true);
        $this->m_staf_asisten_view          = $this->model('sipas/staf_asisten_view',           true);
        $this->m_staf_atasan_view           = $this->model('sipas/staf_atasan_view',            true);

        $this->m_properti         = $this->model('sipas/properti',         true);
        $this->m_account          = $this->model('sipas/account',          true);
        $this->m_pengaturan       = $this->model('sipas/pengaturan',       true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_staf_wakil_view;
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

    public function asisten(){
        $model = $this->m_staf_asisten_view;
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
        //$operation['debug']=$model->get_lastquery();
        $this->response($operation);
    }

    public function atasan(){
        $model = $this->m_staf_atasan_view;
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

    public function create($usePayload = true){
        $model = $this->m_staf_wakil;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        if(isAssoc($data)){
            $op = $properti->created($akun);
            $data['staf_wakil_properti'] = $op['properti_id'];
            $operation = $model->insert($data, null, function($response)
                use($data, $properti, $account, $model, $akun){
                    $data['staf_wakil_id'] = $model->get_insertid();
                    $op = $properti->updated($data['staf_wakil_properti'], $akun, $data, 'staf_wakil', $data['staf_wakil_id']);
                });
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $op = $properti->created($akun);
                $_data['staf_wakil_properti'] = $op['properti_id'];
                
                $operation = $model->insert($_data, null, function($response)
                    use($data, $properti, $account, $model, $akun){
                        // $data['staf_wakil_id'] = $model->get_insertid();
                        // $op = $properti->updated($data['staf_wakil_properti'], $akun, $data, 'staf_wakil', $data['staf_wakil_id']);

                        $inserted_data = $model->read($model->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'staf_wakil', $inserted_data['staf_wakil_id']);
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
        $model = $this->m_staf_wakil;
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
        $model = $this->m_staf_wakil;
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

    function check_isexist(){
        $asisten = $this->m_staf_asisten_view;
        $pgs = $this->m_staf_pgs_view;

        $staf_id    = varReq('user');
        $staf_nama  = varReq('user_nama');
        $profilId   = varReq('profilId');
        $mode       = varReq('mode');
        $exist      = 0;
        $exist_name = array();

        if(!empty($staf_id)){
            foreach ($staf_id as $key => $value) {
                if ($mode == 'pgs'){
                    $data = $asisten->read(array(
                        'staf_wakil_asisten' => $value,
                        'staf_wakil_staf' => $profilId
                    ));
                }else if ($mode == 'asisten') {
                    $data = $pgs->read(array(
                        'staf_wakil_asisten' => $value,
                        'staf_wakil_staf' => $profilId
                    ));
                }
                if(!empty($data)){
                    $exist = $exist + 1;
                    array_push($exist_name, $staf_nama[$key]);
                }
            }
        }

        $this->response(array(
            'exist' => (int)$exist,
            'exist_name' => $exist_name
        ));
    }
}