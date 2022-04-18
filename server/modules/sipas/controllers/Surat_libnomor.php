<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Surat_libnomor extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_libnomor          = $this->model('sipas/surat_libnomor',              true);
        $this->m_libnomor_list     = $this->model('sipas/surat_libnomor_list_view',    true);
        $this->m_account           = $this->model('sipas/account',                     true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_libnomor_list;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('kontak_id')){
            $id = varGet('id', varGet('kontak_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
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
        $model = $this->m_libnomor;
        $account = $this->m_account;

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $operation = $model->insert($data, null, function(){});
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model   = $this->m_libnomor;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data, function(){});
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model   = $this->m_libnomor;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->delete($id, function(){});
        $this->response($operation);
    }
}