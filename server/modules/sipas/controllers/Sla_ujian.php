<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sla_ujian extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array('sipas/sla_ujian'));
        $this->model = $this->model('sipas/sla_ujian', true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->model;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sla_ujian_id')){
            $id = varGet('id', varGet('sla_ujian_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'sla_ujian_kode LIKE "%'.$query.'%" OR sla_ujian_nama LIKE "%'.$query.'%"'
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
        $model = $this->model;
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        $operation = $model->insert($data, null, function($response){});
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
        $model = $this->model;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $operation = $model->delete($id, function($response){});
        $this->response($operation);
    }
}