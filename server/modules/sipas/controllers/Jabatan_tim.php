<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jabatan_tim extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/jabatan',
            'sipas/jabatan_tim_view',
            'sipas/jabatan_tim_anggota'
        ));
        $this->m_jabatan               = $this->model('sipas/jabatan',               true);
        $this->m_jabatan_tim_view      = $this->model('sipas/jabatan_tim_view',      true);
        $this->m_jabatan_tim_anggota   = $this->model('sipas/jabatan_tim_anggota',   true);

        $this->m_jabatan_tim           = $this->model('sipas/jabatan_tim',           true);
        $this->m_properti           = $this->model('sipas/properti',           true);
        $this->m_account            = $this->model('sipas/account',            true);

        $this->m_jabatan_tim_hidup    = $this->model('sipas/jabatan_tim_hidup_view',         true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_jabatan_tim_hidup;
        $modelJabatanTim = $this->m_jabatan_tim;
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('jabatan_tim_id')){
            $id = varGet('id', varGet('jabatan_tim_id'));
            $record = null;

            if(inCacheExists($modelJabatanTim, $id)){
                $record = getRecordFromCache($modelJabatanTim, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelJabatanTim, $record);
                $useCache = false;
            }
            
            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jabatan_tim_nama LIKE "%'.$query.'%" OR jabatan_tim_nama LIKE "%'.$query.'%"'
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
        $model = $this->m_jabatan_tim;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        // $op = $properti->created($akun);
        // $data['jabatan_tim_properti'] = $op['properti_id'];

        $operation = $model->insert($data, null, function($response)
            use($data, $properti, $account, $model, $akun){
                if($response[$model->successProperty] !== true) return;

                addRecordToCache($model, $response[$model->dataProperty]);
                $inserted_data = $response['data'];
                $op = $properti->created($akun, $inserted_data, 'jabatan_tim', $inserted_data['jabatan_tim_id'], $inserted_data['jabatan_tim_nama']);
                if($op){
                    $model->update($inserted_data['jabatan_tim_id'], array(
                        'jabatan_tim_properti' => $op['properti_id']
                    ));
                }

                // $data['jabatan_tim_id'] = $model->get_insertid();
                // $op = $properti->updated($data['jabatan_tim_properti'], $akun, $data, 'jabatan_tim', $data['jabatan_tim_id']);
            });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_jabatan_tim;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        // $idProp = $data['jabatan_tim_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['jabatan_tim_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        // $operation = $model->update($id, $data, function($response){});
        
        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){
            addRecordToCache($model, $response[$model->dataProperty]);
            $updated_data = $model->read($data['jabatan_tim_id']);
            
            $idProp = $updated_data['jabatan_tim_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'jabatan_tim', $updated_data['jabatan_tim_id'], $updated_data['jabatan_tim_nama']);
                if($op){
                    $model->update($updated_data['jabatan_tim_id'], array(
                        'jabatan_tim_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['jabatan_tim_nama']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_jabatan_tim;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['jabatan_tim_properti'];
        $data['jabatan_tim_ishapus'] = 1;
        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['jabatan_tim_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        // $operation = $model->update($id, $data,function($response){});
        
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            // $deleted_data = $response['data'];
            addRecordToCache($model, $response[$model->dataProperty]);
            $deleted_data = $model->read($data['jabatan_tim_id']);
            $idProp = $deleted_data['jabatan_tim_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'jabatan_tim', $deleted_data['jabatan_tim_id'], $deleted_data['jabatan_tim_nama']);
                if($op){
                    $model->update($deleted_data['jabatan_tim_id'], array(
                        'jabatan_tim_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['jabatan_tim_nama']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }
}