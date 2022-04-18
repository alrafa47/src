<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jabatan_tim_anggota extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/jabatan',
            'sipas/jabatan_tim',
            'sipas/jabatan_tim_anggota',
            'sipas/jabatan_tim_anggota_view'
        ));
        $this->m_jabatan                = $this->model('sipas/jabatan',               true);
        $this->m_jabatan_tim            = $this->model('sipas/jabatan_tim',           true);
        $this->m_jabatan_tim_view       = $this->model('sipas/jabatan_tim_view',      true);
        $this->m_jabatan_tim_anggota    = $this->model('sipas/jabatan_tim_anggota',   true);
        $this->m_jabatan_tim_anggota_view    = $this->model('sipas/jabatan_tim_anggota_view',   true);

        $this->m_properti            = $this->model('sipas/properti',           true);
        $this->m_account             = $this->model('sipas/account',            true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->model('sipas/jabatan_tim_anggota_view', true);
        $model_jabatan = $this->model('sipas/jabatan_view', true);

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
            if(array_key_exists('query', varGet())){
                $query = varGet('query');
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'anggota_id = "'.$query.'"'
                ));
            }
            // array_unshift($filter, array(
            //     'property'=>'akun_isaktif',
            //     'value'=>1,
            //     'type'=>'exact'
            // ));

            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));

            foreach ($operation[$model->dataProperty] as $i => &$data) {
                $data['jabatan_tim_anggota_jabatan_record'] = $model_jabatan->from($data);
            }
        }
        // $operation['debug'] = $model->get_lastquery();
        $this->response($operation);
    }

    public function read_disposisi(){
        $me = $this;
        $model = $this->model('sipas/jabatan_tim_anggota_view', true);
        $model_jabatan = $this->model('sipas/jabatan_view', true);

        $id = varGet('id');

        $pegawai    = $me->m_account->get_profile();
        $jabatan_id    = $pegawai['jabatan_id'];


        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $model->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            
            // array_unshift($filter, array(
            //     'property'=>'akun_isaktif',
            //     'value'=>1,
            //     'type'=>'exact'
            // ));

            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));

            foreach ($operation[$model->dataProperty] as $i => &$data) {
                $data['jabatan_tim_anggota_jabatan_record'] = $model_jabatan->from($data);
            }
        }

        array_unshift($filter, array(
            'value'     => "jabatan_tim_anggota_jabatan <> '".$jabatan_id."'",
            'type'      => 'custom'
        ));

        // $operation['debug'] = $model->get_lastquery();
        $this->response($operation);
    }

    public function readKelompok($id = null){
        $modelJabatan = $this->m_jabatan;
        $modelJabatanTim = $this->m_jabatan_tim_view;
        $modelJabatanTimAnggota = $this->m_jabatan_tim_anggota_view;

        $id = varGet('id');
        $operation = $modelJabatanTimAnggota->find(array(
            'jabatan_tim_anggota_jabatan'=>$id
        ));

        $this->response($operation);
    }

    public function create($usePayload = true){
        $model = $this->m_jabatan_tim_anggota;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        if(isAssoc($data)){
            $op = $properti->created($akun);
            $data['jabatan_tim_anggota_properti'] = $op['properti_id'];
            $operation = $model->insert($data, null, function($response)
                    use($data, $properti, $account, $model, $akun){
                        $data['jabatan_tim_anggota_id'] = $model->get_insertid();
                        $op = $properti->updated($data['jabatan_tim_anggota_properti'], $akun, $data, 'jabatan_tim_anggota', $data['jabatan_tim_anggota_id']);
                    });
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {

                $_data = (array) $_data;
                $op = $properti->created($akun);
                $_data['jabatan_tim_anggota_properti'] = $op['properti_id'];

                $operation = $model->insert($_data, null, function($response)
                    use($data, $properti, $account, $model, $akun){
                        // $data['jabatan_tim_anggota_id'] = $model->get_insertid();

                        $inserted_data = $model->read($model->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'jabatan_tim_anggota', $inserted_data['jabatan_tim_anggota_id']);
                    });

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
        $model = $this->model('sipas/jabatan_tim_anggota');
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
        $model = $this->m_jabatan_tim_anggota;
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