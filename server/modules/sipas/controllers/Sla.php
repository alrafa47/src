<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sla extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array('sipas/sla'));
        $this->model = $this->model('sipas/sla', true);

        $this->m_sla_view           = $this->model('sipas/sla_view', true);
        $this->m_sla_aktif_view     = $this->model('sipas/sla_aktif_view', true);
        $this->m_sla_nonaktif_view  = $this->model('sipas/sla_nonaktif_view', true);

        $this->m_sla_hidup_view  = $this->model('sipas/sla_hidup_view', true);

        $this->m_properti  = $this->model('sipas/properti', true);
        $this->m_account   = $this->model('sipas/account',  true);
        $this->m_sla_rumus = $this->model('sipas/sla_rumus',  true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->model;
        $sla_view = $this->m_sla_hidup_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sla_id')){
            $id = varGet('id', varGet('sla_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'sla_id LIKE "%'.$query.'%" OR sla_nama LIKE "%'.$query.'%"'
                ));
            }
            $records = $sla_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function aktif(){
        $model      = $this->model;
        $sla_view   = $this->m_sla_aktif_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sla_id')){
            $id = varGet('id', varGet('sla_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'sla_id LIKE "%'.$query.'%" OR sla_nama LIKE "%'.$query.'%"'
                ));
            }
            $records = $sla_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function nonaktif(){
        $model      = $this->model;
        $sla_view   = $this->m_sla_nonaktif_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sla_id')){
            $id = varGet('id', varGet('sla_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'sla_id LIKE "%'.$query.'%" OR sla_nama LIKE "%'.$query.'%"'
                ));
            }
            $records = $sla_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function create($usePayload = true){
        $model      = $this->model;
        $properti   = $this->m_properti;
        $sla_rumus  = $this->m_sla_rumus;
        $account    = $this->m_account;
        $akun       = $account->get_profile_id();

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $rumus = varReq('rumus');
        $nilai = varReq('nilai');
        $idProp = $data['sla_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['sla_properti'] = $idProp;
        // }else{
        //     $properti->updated($idProp, $akun);
        // }
        
        $operation = $model->insert($data, null, function($response) use ($rumus, $nilai, $model, $data, $sla_rumus, $akun, $properti){
            if ($response[$model->successProperty] !== true) return;
            $sla_id = $model->get_insertid();

            // $op = $properti->updated($data['sla_unit_properti'], $akun, $data, 'sla', $sla_id);

            // $inserted_data = $response['data'];
            $inserted_data = $model->read($model->get_insertid());
            $op = $properti->created($akun, $inserted_data, 'sla', $inserted_data['sla_id']);
            if($op){
                $model->update($inserted_data['sla_id'], array(
                    'sla_properti' => $op['properti_id']
                ));
            }

            if(!is_array($rumus)){
                $rumus = array();
            }
            if(!is_array($nilai)){
                $nilai = array();
            }

            if(!empty($rumus)){
                /*delete rumus first*/
                $sla_rumus->delete(array(
                    'sla_rumus_sla'     => $sla_id
                ), function ($response){});
                
                foreach ($rumus as $index => $r) {
                    if (is_string($r)) {
                        $rumus = $r;
                    } else if (is_object($r)) {
                        $rumus = property_exists($r, 'sla_rumus_formula') ? $r->sla_rumus_formula : null;
                    } else if (is_array($r)) {
                        $rumus = array_key_exists('sla_rumus_formula', $r) ? $r['sla_rumus_formula'] : null;
                    }

                    if (empty($rumus)) {
                        continue;
                    }

                    /*Re-insert penerima List*/
                    $operation_rumus = $sla_rumus->insert(array(
                        'sla_rumus_sla' => $sla_id,
                        'sla_rumus_formula' => $r,
                        'sla_rumus_nilai' => (int)$nilai[$index]
                    ));
                }
            }

        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model      = $this->model;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $sla_rumus  = $this->m_sla_rumus;
        $primary    = $model->get_primary();

        $akun       = $account->get_profile_id();
        $payload    = getRequestPayload();
        $data       = (array) ($usePayload ? $payload : varPost());
        $id         = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $rumus = varReq('rumus');
        $nilai = varReq('nilai');
        $idProp = $data['sla_properti'];

        $operation = $model->update($id, $data, function($response) use ($rumus, $nilai, $model, $data, $sla_rumus, $properti, $akun){
            // $updated_data = $response['data'];

            $updated_data = $model->read($data['sla_id']);
            if ($response[$model->successProperty] !== true) return;

            $idProp = $updated_data['sla_properti'];
            $properti->updated($idProp, $akun, $updated_data, $updated_data['sla_nama']);

            if(!is_array($rumus)){
                $rumus = array();
            }
            if(!is_array($nilai)){
                $nilai = array();
            }

            if(!empty($rumus)){
                /*delete rumus first*/
                $sla_rumus->delete(array(
                    'sla_rumus_sla'     => $data['sla_id']
                ), function ($response){});
                
                foreach ($rumus as $index => $r) {
                    if (is_string($r)) {
                        $rumus = $r;
                    } else if (is_object($r)) {
                        $rumus = property_exists($r, 'sla_rumus_formula') ? $r->sla_rumus_formula : null;
                    } else if (is_array($r)) {
                        $rumus = array_key_exists('sla_rumus_formula', $r) ? $r['sla_rumus_formula'] : null;
                    }

                    if (empty($rumus)) {
                        continue;
                    }

                    /*Re-insert penerima List*/
                    $operation_rumus = $sla_rumus->insert(array(
                        'sla_rumus_sla' => $data['sla_id'],
                        'sla_rumus_formula' => $r,
                        'sla_rumus_nilai' => (int)$nilai[$index]
                    ));
                }
            }
            
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model      = $this->model;
        $properti   = $this->m_properti;
        $account    = $this->m_account;

        $akun       = $account->get_profile_id();
        $primary    = $model->get_primary();
        $payload    = getRequestPayload();
        $data       = (array) ($usePayload ? $payload : varPost());
        $id         = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        // $operation = $model->delete($id, function($response){});
        
        $idProp = $data['sla_properti'];

        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            // $deleted_data = $response['data'];

            $deleted_data = $model->read($data['sla_id']);
            $idProp = $deleted_data['sla_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'sla', $deleted_data['sla_id'], $deleted_data['sla_nama']);
                if($op){
                    $model->update($deleted_data['sla_id'], array(
                        'sla_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['sla_nama']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}