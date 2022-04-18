<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jenis_unit extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/jenis_unit',
            'sipas/jenis_unit_view'
        ));
        $this->m_jenis_unit          = $this->model('sipas/jenis_unit',      true);
        $this->m_jenis_unit_view     = $this->model('sipas/jenis_unit_view', true);

        $this->m_properti              = $this->model('sipas/properti',          true);
        $this->m_account               = $this->model('sipas/account',           true);
    }

    public function index(){
        $this->read();
    }
    
    public function read($withCurrent = false){
        $model = $this->m_jenis_unit_view;
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
        $model = $this->m_jenis_unit;
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        if(isAssoc($data)){
            $operation = $model->insert($data, null);
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
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
        $model = $this->m_jenis_unit;
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
        $model = $this->m_jenis_unit;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        if(isAssoc($data)){
            $operation = $model->delete($id);
        }else if(is_array($data)){
            print_r($data);
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