<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Staf_akun extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
        ));
        $this->m_akun                = $this->model('sipas/akun',               true);
        $this->m_staf                = $this->model('sipas/staf',               true);
        $this->m_staf_akun_view      = $this->model('sipas/staf_akun_view',     true);
        $this->m_staf_aktif          = $this->model('sipas/staf_aktif_view',    true);

        $this->m_properti            = $this->model('sipas/properti',           true);
        $this->m_account             = $this->model('sipas/account',            true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $staf = $this->m_staf;
        $model = $this->m_staf_akun_view;
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
            // if(array_key_exists('query', varGet())){
            //     $query = varGet('query');
            //     array_unshift($filter, (object)array(
            //         'type'      => 'custom',
            //         'value'     => 'anggota_id = "'.$query.'"'
            //     ));
            // }
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
                $data['staf_tim_anggota_staf_record'] = $model->from($data);
                $data['staf_asli_id'] = $data['staf_id'];
            }
        }
        // $operation['debug'] = $model->get_lastquery();
        $this->response($operation);
    }

    public function create($usePayload = true){
        $model = $this->m_staf;
        $akun = $this->m_akun;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        if(isAssoc($data)){
            $id = $data['staf_asli_id'];
            $data_staf = $model->read($id);
            $data_staf['staf_akun'] = $data['staf_akun'];
            $data_staf['staf_akun_isdefault'] = $data['staf_akun_isdefault'];
            $operation = $model->update($id, $data_staf);
            if($data['staf_akun_isdefault']){
                $data_user = array(
                    'akun_staf' => $id
                );
                $operation_user = $akun->update($data['staf_akun'], $data_user);
            }
            $data_akun = $model->read(array('staf_akun' => $data['staf_akun'], 'staf_akun_isdefault' => 1));

            if(!$data_akun){
                $data_user = array(
                    'akun_staf' => $id
                );
                $operation_user = $akun->update($data['staf_akun'], $data_user);

                $data_staf = array(
                    'staf_akun_isdefault' => 1
                );
                $operation_staf = $model->update($data['staf_asli_id'], $data_staf);
            }
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $id = $_data['staf_asli_id'];
                $data_staf = $model->read($id);
                $data_staf['staf_akun'] = $_data['staf_akun'];
                $data_staf['staf_akun_isdefault'] = $_data['staf_akun_isdefault'];
                $operation = $model->update($id, $data_staf);
                if($_data['staf_akun_isdefault']){
                    $data_user = array(
                        'akun_staf' => $id
                    );
                    $operation_user = $akun->update($_data['staf_akun'], $data_user);
                }
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $data_akun = $model->read(array('staf_akun' => $data[0]->staf_akun, 'staf_akun_isdefault' => 1));

            if(!$data_akun){
                $data_user = array(
                    'akun_staf' => $data[0]->staf_asli_id
                );
                $operation_user = $akun->update($data[0]->staf_akun, $data_user);

                $data_staf = array(
                    'staf_akun_isdefault' => 1
                );
                $operation_staf = $model->update($data[0]->staf_asli_id, $data_staf);
            }
            $operation = $response;
        }
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_staf;
        $akun = $this->m_akun;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        if(isAssoc($data)){
            $data_staf = $model->read($id);
            $data_staf['staf_akun'] = $data['staf_akun'];
            $data_staf['staf_akun_isdefault'] = $data['staf_akun_isdefault'];
            $operation = $model->update($id, $data_staf);
            if($data['staf_akun_isdefault']){
                $data_user = array(
                    'akun_staf' => $id
                );
                $operation_user = $akun->update($data['staf_akun'], $data_user);
            }
            $data_akun = $model->read(array('staf_akun' => $data['staf_akun'], 'staf_akun_isdefault' => 1));

            if(!$data_akun){
                $data_user = array(
                    'akun_staf' => $id
                );
                $operation_user = $akun->update($data['staf_akun'], $data_user);

                $data_staf = array(
                    'staf_akun_isdefault' => 1
                );
                $operation_staf = $model->update($data['staf_id'], $data_staf);
            }
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $id = array_key_exists('id', $_data) ? $_data['id'] : (array_key_exists($primary, $_data) ? $_data[$primary] : null);
                $data_staf = $model->read($id);
                $data_staf['staf_akun'] = $_data['staf_akun'];
                $data_staf['staf_akun_isdefault'] = $_data['staf_akun_isdefault'];
                $operation = $model->update($id, $data_staf);
                if($_data['staf_akun_isdefault']){
                    $data_user = array(
                        'akun_staf' => $id
                    );
                    $operation_user = $akun->update($_data['staf_akun'], $data_user);
                }
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }

            $data_akun = $model->read(array('staf_akun' => $data[0]->staf_akun, 'staf_akun_isdefault' => 1));

            if(!$data_akun){
                $data_user = array(
                    'akun_staf' => $data[0]['staf_id']
                );
                $operation_user = $akun->update($data[0]->staf_akun, $data_user);

                $data_staf = array(
                    'staf_akun_isdefault' => 1
                );
                $operation_staf = $model->update($data[0]['staf_id'], $data_staf);
            }
            $operation = $response;
        }
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_staf;
        $akun_model = $this->m_akun;
        $staf_aktif = $this->m_staf_aktif;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        if(isAssoc($data)){
            $akun = $data['staf_akun'];
            $_data = $model->read($id);
            $_data['staf_akun'] = null;
            $_data['staf_akun_isdefault'] = 0;
            $operation = $model->update($id, $_data);
            $d_akun = $model->find(array('staf_akun' => $akun));
            if(empty($d_akun)){
                $data_user = array(
                    'akun_staf' => null
                );
                $operation_user = $akun_model->update($akun, $data_user);
            }

            $data_akun = $model->read(array('staf_akun' => $data['staf_akun'], 'staf_akun_isdefault' => 1));
            if(!$data_akun){
                $data_akun1 = $staf_aktif->read(array('staf_akun' => $data['staf_akun']));                
                
                if($data_akun1){
                    $data_user = array(
                        'akun_staf' => $data_akun1['staf_id']
                    );
                    $operation_user = $akun_model->update($data['staf_akun'], $data_user);

                    $data_staf = array(
                        'staf_akun_isdefault' => 1
                    );
                    $operation_staf = $model->update($data_akun1['staf_id'], $data_staf);
                }else{
                    $data_user = array(
                        'akun_staf' => null
                    );
                    $operation_user = $akun_model->update($data['staf_akun'], $data_user);
                }
            }
        }else if(is_array($data)){
            $akun = $data[0]->staf_akun;
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $id = array_key_exists('id', $_data) ? $_data['id'] : (array_key_exists($primary, $_data) ? $_data[$primary] : null);
                $data_staf = $model->read($id);
                $data_staf['staf_akun'] = null;
                $data_staf['staf_akun_isdefault'] = 0;
                $operation = $model->update($id, $data_staf);
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $d_akun = $model->find(array('staf_akun' => $akun));
            if(empty($d_akun)){
                $data_user = array(
                    'akun_staf' => null
                );
                $operation_user = $akun_model->update($akun, $data_user);
            }
            $data_akun = $model->read(array('staf_akun' => $data[0]->staf_akun, 'staf_akun_isdefault' => 1));

            if(!$data_akun){
                $data_akun1 = $staf_aktif->read(array('staf_akun' => $data[0]->staf_akun));
                
                if($data_akun1){
                    $data_user = array(
                        'akun_staf' => $data_akun1['staf_id']
                    );
                    $operation_user = $akun_model->update($data[0]->staf_akun, $data_user);

                    $data_staf = array(
                        'staf_akun_isdefault' => 1
                    );
                    $operation_staf = $model->update($data_akun1['staf_id'], $data_staf);
                }else{
                    $data_user = array(
                        'akun_staf' => null
                    );
                    $operation_user = $akun_model->update($data[0]->staf_akun, $data_user);
                }
            }
            $operation = $response;
        }
        $this->response($operation);
    }
}