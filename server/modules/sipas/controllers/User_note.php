<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_note extends Base_Controller {

    function __construct(){
        parent::__construct();
        $this->load->model(array(
            // 'sipas/fitur',
            // 'sipas/akses',
            // 'sipas/akses_view',
            'sipas/user',
            'sipas/account',
            'sipas/user_note',
            'sipas/user_note_view'
        ));
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->model('sipas/user_note_view');
        $account_model = $this->model('sipas/account');

        $id = $account_model->userId();

        if( ! empty($id) ){
            $record = $model->find(
                array(
                    'user_note_user' => $id,
                )
            );
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
        $model = $this->model('sipas/user_note');
        $account_model = $this->model('sipas/account');

        $user_id = $account_model->userId();
        $now = date('Y-m-d H:i:s');

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        $operation = $model->insert(array(
            'user_note_date' => $now,
            'user_note_user' => $user_id,
            'user_note_status' => 0,
        ), null, function($response){});
        $this->response($operation);
    }

    function destroy($usePayload = true){
        $model = $this->model('sipas/user_note');
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        $operation = $model->delete($id, function($response){});
        $this->response($operation);
    }

    function mark($usePayload = true){
        // $_POST = array(
        //     'user_note_id'      =>'1c5e8f2c5b07b96751dabd8cb63bb0f4'
        // );
        $model = $this->model('sipas/user_note');
        $primary = $model->get_primary();
        
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, 
            array(
                'user_note_status' => 1
            ), 
            function($response){});
        $this->response($operation);
    }
}