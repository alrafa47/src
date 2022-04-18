<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Kontak extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_kontak          = $this->model('sipas/kontak',                    true);
        $this->m_kontak_view     = $this->model('sipas/kontak_view',               true);
        $this->m_properti        = $this->model('sipas/properti',                 true);
        $this->m_account         = $this->model('sipas/account',                  true);
        $this->m_kontak_hidup    = $this->model('sipas/kontak_hidup_view',         true);
        // $this->m_media_aktif    = $this->model('sipas/media_aktif_view',         true);
        // $this->m_media_nonaktif = $this->model('sipas/media_nonaktif_view',      true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_kontak_hidup;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('kontak_id')){
            $id = varGet('id', varGet('kontak_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'kontak_nama LIKE "%'.$query.'%" OR kontak_nama LIKE "%'.$query.'%"'
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

    public function aktif(){
        $model = $this->m_media_aktif;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('kontak_id')){
            $id = varGet('id', varGet('kontak_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'media_kode LIKE "%'.$query.'%" OR media_nama LIKE "%'.$query.'%"'
                ));
            }
            // array_unshift($filter, (object)array(
            //     'type'      => 'custom',
            //     'value'     => '(properti_hapus_tgl IS NULL OR properti_pulih_tgl IS NOT NULL)'
            // ));
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function nonaktif(){
        $model = $this->m_media_nonaktif;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('kontak_id')){
            $id = varGet('id', varGet('kontak_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'media_kode LIKE "%'.$query.'%" OR media_nama LIKE "%'.$query.'%"'
                ));
            }
            // array_unshift($filter, (object)array(
            //     'type'      => 'custom',
            //     'value'     => '(properti_hapus_tgl IS NULL OR properti_pulih_tgl IS NOT NULL)'
            // ));
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
        $model = $this->m_kontak;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['media_properti'] = $op['properti_id'];

        // $operation = $model->insert($data, null, function($response) use ($model, $akun, $properti, $data){
        //     // echo '<pre>';
        //     // print_r($data);
        //     $data['kontak_id'] = $model->get_insertid();
        //     $op = $properti->updated($data['media_properti'], $akun, $data, 'media', $data['kontak_id']);
        // });

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){

            // $inserted_data = $response['data'];

            $inserted_data = $model->read($model->get_insertid());
            $op = $properti->created($akun, $inserted_data, 'kontak', $inserted_data['kontak_id'], $inserted_data['kontak_nama']);
            if($op){
                $model->update($inserted_data['kontak_id'], array(
                    'kontak_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_kontak;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['media_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['media_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            $updated_data = $model->read($data['kontak_id']);
            $idProp = $updated_data['kontak_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'kontak', $updated_data['kontak_id'], $updated_data['kontak_nama']);
                if($op){
                    $model->update($updated_data['kontak_id'], array(
                        'kontak_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['kontak_nama']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_kontak;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['kontak_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['media_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});
        $data['kontak_ishapus'] = 1;
        
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            $deleted_data = $model->read($data['kontak_id']);
            $idProp = $deleted_data['kontak_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'kontak', $deleted_data['kontak_id'], $deleted_data['kontak_nama']);
                if($op){
                    $model->update($deleted_data['kontak_id'], array(
                        'kontak_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['kontak_id']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}