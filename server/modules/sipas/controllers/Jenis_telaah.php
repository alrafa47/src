<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jenis_telaah extends Base_Controller {
    
    public $modelDefault = 'sipas/jenis_telaah';

	public function __construct(){
        parent::__construct();
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->model($this->modelDefault,true);
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

    public function create($usePayload = true){
        $model = $this->model($this->modelDefault,true);
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        $operation = $model->insert($data, null, function($response){});
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->model($this->modelDefault,true);
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data, function($response){});
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->model($this->modelDefault,true);
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $operation = $model->delete($id, function($response){});
        $this->response($operation);
    }
}