<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sla_unit extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array('sipas/sla_unit'));
        $this->model            = $this->model('sipas/sla_unit',       true);
        $this->m_sla_unit       = $this->model('sipas/sla_unit',       true);
        $this->m_sla_unit_view  = $this->model('sipas/sla_unit_view',  true);
        $this->m_sla_unit_default_view = $this->model('sipas/sla_unit_default_view', true);
        
        $this->m_properti       = $this->model('sipas/properti',       true);
        $this->m_account        = $this->model('sipas/account',        true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->model;
        $model_view = $this->m_sla_unit_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sla_unit_id')){
            $id = varGet('id', varGet('sla_unit_id'));
            $record = $model_view->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'sla_unit_kode LIKE "%'.$query.'%" OR sla_unit_nama LIKE "%'.$query.'%"'
                ));
            }
            $records = $model_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function default(){
        $model      = $this->m_sla_unit_default_view;
        $model_view = $this->m_sla_unit_view;

        $id     = varGet('id', varGet('sla_unit_id'));
        $limit  = varGet('limit');
        $start  = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        if (!empty($id)){
            $record = $model->read($id);
            $records = array(
                $model_view->successProperty => (bool)$record,
                $model_view->dataProperty    => $record
            );
        } else {
            // array_unshift($filter, (object)array(
            //     'type'      => 'custom',
            //     'value'     => '(sla_isaktif IS NOT NULL)'
            // ));
            $records = $model->select(array(
                'limit'    => $limit,
                'start'    => $start,
                'filter'   => json_encode($filter),
                'sort'     => json_encode($sorter)
            ));
        }
        $this->response($records);
    }

    public function create($usePayload = true){
        // $model = $this->model;
        // $payload = getRequestPayload();
        // $data = (array) ($usePayload ? $payload : varPost());        
        
        // $operation = $model->insert($data, null, function($response){});
        // $this->response($operation);

        $model = $this->model;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        if(isAssoc($data)){
            $op = $properti->created($akun);
            $data['sla_unit_properti'] = $op['properti_id'];
            $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
            
            $data['sla_unit_id'] = $model->get_insertid();
            $op = $properti->updated($data['sla_unit_properti'], $akun, $data, 'sla_unit', $data['sla_unit_id']);
        });
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {

                $_data = (array) $_data;
                $op = $properti->created($akun);
                $_data['sla_unit_properti'] = $op['properti_id'];

                $operation = $model->insert($_data, null);

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
        $model = $this->model;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data, function($response){});
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_sla_unit;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $operation = $model->delete($id);

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