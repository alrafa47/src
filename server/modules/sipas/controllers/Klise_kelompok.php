<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Klise_kelompok extends Base_Controller {
      
	public function __construct(){
        parent::__construct();
        // $this->load->model(array('sipas/klise_kelompok_view'));
        $this->m_klise_kelompok = $this->model('sipas/klise_kelompok_view', true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_klise_kelompok;
        $id = varGet('id');

        if( ! empty($id) ){
            $record = $model->read($id);
            $records = array( 'success'=> (bool) $record, 'record'=>$record );
        }else{
            $records = $model->select(array(
                'limit' => varGet('limit'),
                'start' => varGet('start'),
                'filters' => varGet('filter')
            ));
        }
        $this->response($records);
    }

    public function create($usePayload = true){
        $model = $this->m_klise_kelompok;
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        $operation = $model->insert($data, null, function($response){});
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_klise_kelompok;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data, function($response){});
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_klise_kelompok;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $operation = $model->delete($id, function($response){});
        $this->response($operation);
    }
}