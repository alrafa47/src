<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Kelas extends Base_Controller {

    public function __construct(){
        parent::__construct();
        $this->m_kelas                = $this->model('sipas/kelas',                     true);
        $this->m_kelas_view           = $this->model('sipas/kelas_view',                true);
        $this->m_jenis_view           = $this->model('sipas/jenis_view',                true);
        $this->m_properti             = $this->model('sipas/properti',                  true);
        $this->m_account              = $this->model('sipas/account',                   true);
        $this->m_kelas_hidup          = $this->model('sipas/kelas_hidup_view',          true);
        $this->m_kelas_aktif          = $this->model('sipas/kelas_aktif_view',          true);
        $this->m_kelas_nonaktif       = $this->model('sipas/kelas_nonaktif_view',       true);
        $this->m_kelas_aktif_combo    = $this->model('sipas/kelas_aktif_combo_view',    true);
    }

    public function index(){
        $this->read();
    }
    
    public function read($section=null){
        $model = $this->m_kelas_hidup;
        $modelview = $this->m_kelas_view;
        $modelkelas = $this->m_kelas; // used by cache

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        if(strtolower($id) == 'root') $id = null;

        if($section == 'tree'){
            if($filter){
                $value = $filter[0]->value;
                $records = $model->find(
                                'kelas_nama LIKE "%' . $value . '%" OR kelas_kode LIKE "%' . $value . '%"');
                foreach ($records as $key => &$val) {
                    $val['leaf'] = true;
                }
            }else{
                $records = $model->tree($id, $filter);
            }
        }else{
            if( ! empty($id) ){

                $record = null;

                if(inCacheExists($modelkelas, $id)){
                    $record = getRecordFromCache($modelkelas, $id);
                    $useCache = true;
                }

                if(!$record){
                    $record = $model->read($id);
                    addRecordToCache($modelkelas, $record);
                    $useCache = false;
                }
                
                $records = array( 
                    $modelview->successProperty => (bool) $record, 
                    $modelview->dataProperty    => $record,
                    'useCache'                  => $useCache
                );
            }else{
                $query = varGet('query');
                if(!empty($query)){
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     =>'(kelas_kode LIKE "%'.$query.'%" OR kelas_nama LIKE "%'.$query.'%")'
                    ));
                }
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function aktif($section=null){
        $model = $this->m_kelas_aktif;
        $modelview = $this->m_kelas_view;
        $modelkelas = $this->m_kelas; // used by cache

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filters = varGet('filter');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        if(strtolower($id) == 'root') $id = null;

        if($section == 'tree'){
            if($filter){
                $value = $filter[0]->value;
                $records = $model->find(
                                'kelas_nama LIKE "%' . $value . '%" OR kelas_kode LIKE "%' . $value . '%"');
                foreach ($records as $key => &$val) {
                    $val['leaf'] = true;
                }
            }else{
                $records = $model->tree($id, $filter);
            }
        }else{
            if( ! empty($id) ){
                $record = null;
                if(inCacheExists($modelkelas, $id)){
                    $record = getRecordFromCache($modelkelas, $id);
                    $useCache = true;
                }

                if(!$record){
                    $record = $model->read($id);
                    addRecordToCache($modelkelas, $record);
                    $useCache = false;
                }

                $records = array( 
                    $modelview->successProperty => (bool) $record, 
                    $modelview->dataProperty    =>$record,
                    'useCache'                  => $useCache
                );
            }else{
                $query = varGet('query');
                if(!empty($query)){
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     =>'(kelas_kode LIKE "%'.$query.'%" OR kelas_nama LIKE "%'.$query.'%")'
                    ));
                }
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function nonaktif($section=null){
        $model = $this->m_kelas_nonaktif;
        $modelview = $this->m_kelas_view;
        $modelkelas = $this->m_kelas; // used by cache

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        if(strtolower($id) == 'root') $id = null;

        if($section == 'tree'){
            if($filter){
                $value = $filter[0]->value;
                $records = $model->find(
                                'kelas_nama LIKE "%' . $value . '%" OR kelas_kode LIKE "%' . $value . '%"');
                foreach ($records as $key => &$val) {
                    $val['leaf'] = true;
                }
            }else{
                $records = $model->tree($id, $filter);
            }
        }else{
            if( ! empty($id) ){
                $record = null;
                if(inCacheExists($modelkelas, $id)){
                    $record = getRecordFromCache($modelkelas, $id);
                    $useCache = true;
                }

                if(!$record){
                    $record = $model->read($id);
                    addRecordToCache($modelkelas, $record);
                    $useCache = false;
                }

                $records = array( 
                    $modelview->successProperty => (bool) $record, 
                    $modelview->dataProperty    => $record,
                    'useCache'                  => $useCache
                );
            }else{
                $query = varGet('query');
                if(!empty($query))
                {
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     =>'(kelas_kode LIKE "%'.$query.'%" OR kelas_nama LIKE "%'.$query.'%")'
                    ));
                }
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function create($usePayload = true){
        $model = $this->m_kelas;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $path = varReq('path');

        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data, $path){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'kelas', $inserted_data['kelas_id'], $inserted_data['kelas_kode']);
            if($inserted_data['kelas_induk']){
                if($path){
                    $inserted_data['kelas_parent_path'] = $path.'/'.$inserted_data['kelas_id'];
                }else{
                    $inserted_data['kelas_parent_path'] = '/'.$inserted_data['kelas_id'];
                }
            }else{
                $inserted_data['kelas_parent_path'] = '/'.$inserted_data['kelas_id'];
            }
            if($op){
                $model->update($inserted_data['kelas_id'], array(
                    'kelas_parent_path' => $inserted_data['kelas_parent_path'],
                    'kelas_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_kelas;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['kelas_properti'];

        $path = varReq('path');
        $isChange = varReq('isChange');

        if($data['kelas_induk']){
                if($path){
                    $data['kelas_parent_path'] = $path.'/'.$data['kelas_id'];
                }else{
                    $data['kelas_parent_path'] = '/'.$data['kelas_id'];
                }
            }else{
                $data['kelas_parent_path'] = '/'.$data['kelas_id'];
            }
        if($isChange){
            $jPath = varReq('kelas_path');
            $kelas_path = $jPath.'%';
            $kelasPath = $jPath;
            $changePath = $data['kelas_parent_path'].'/'.$data['kelas_id'];

            $query = "UPDATE kelas SET kelas_parent_path = REPLACE(kelas_parent_path, '".$kelasPath."', '".$changePath."') WHERE"." kelas_parent_path LIKE '".$kelas_path."'";
            $result = $this->db->query($query);
        }

        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){
            addRecordToCache($model, $response[$model->dataProperty]);
            
            $updated_data = $model->read($data['kelas_id']);
            $idProp = $updated_data['kelas_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'kelas', $updated_data['kelas_id'], $updated_data['kelas_kode']);
                if($op){
                    $model->update($updated_data['kelas_id'], array(
                        'kelas_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['kelas_kode']);
        });
        $this->response($operation);
    }

    // Without Properti
    public function destroy($usePayload = true){
        $model = $this->m_kelas;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
        // $operation = $model->delete($id, function($response){});
        $kelas_path = $data['kelas_parent_path'].'%';

        $query = "UPDATE kelas SET kelas_ishapus = 1, kelas_isaktif = 0, kelas_kode = kelas_id WHERE kelas_parent_path LIKE '".$kelas_path."'";
        $result = $this->db->query($query);
        
        $idProp = $data['kelas_properti'];

        $data['kelas_kode'] = $data['kelas_id'];
        $data['kelas_ishapus'] = 1;

        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $deleted_data = $model->read($data['kelas_id']);
            $idProp = $deleted_data['kelas_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'kelas', $deleted_data['kelas_id'], $deleted_data['kelas_kode']);
                if($op){
                    $model->update($deleted_data['kelas_id'], array(
                        'kelas_properti' => $op['properti_id']
                    ));
                }
            }

            // $kelas = array(
            //     'kelas_induk' => $deleted_data['kelas_induk']
            // );

            // $this->db->where('kelas_induk', $deleted_data['kelas_id']);
            // $this->db->update('kelas', $kelas);
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['kelas_kode']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    public function combo_aktif($section=null){
        $model = $this->m_kelas_aktif_combo;
        $modelview = $this->m_kelas_view;
        $modelkelas = $this->m_kelas; // used by cache

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        if(strtolower($id) == 'root') $id = null;

        if($section == 'tree'){
            if($filter){
                $value = $filter[0]->value;
                $records = $model->find(
                                'kelas_nama LIKE "%' . $value . '%" OR kelas_kode LIKE "%' . $value . '%"');
                foreach ($records as $key => &$val) {
                    $val['leaf'] = true;
                }
            }else{
                $records = $model->tree($id, $filter);
            }
        }else{
            if( ! empty($id) ){
                $record = null;
                if(inCacheExists($modelkelas, $id)){
                    $record = getRecordFromCache($modelkelas, $id);
                    $useCache = true;
                }

                if(!$record){
                    $record = $model->read($id);
                    addRecordToCache($modelkelas, $record);
                    $useCache = false;
                }

                $records = array( 
                    $modelview->successProperty=> (bool) $record, 
                    $modelview->dataProperty=>$record,
                    'useCache' => $useCache
                );
            }else{
                $query = varGet('query');
                if(!empty($query)){
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     =>'(kelas_kode LIKE "%'.$query.'%" OR kelas_nama LIKE "%'.$query.'%")'
                    ));
                }
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => json_encode($filter),
                    'sort'     => json_encode($sorter)
                ));
            }
        }
        $this->response($records);
    }

    public function readJenis(){
        $jenis_view = $this->m_jenis_view;
        $model = $this->m_kelas_aktif_combo;

        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));

        $id = varGet('id');
        if($id){
            array_unshift($filter, (object)array(
                'type'  => 'custom',
                'value' => '(kelas_jenis = "'.$id.'" OR kelas_jenis IS NULL)'
            ));

            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     =>'(kelas_kode LIKE "%'.$query.'%" OR kelas_nama LIKE "%'.$query.'%")'
                ));
            }

            $records = $model->select(array(
                'limit'    => $limit,
                'start'    => $start,
                'filter'   => json_encode($filter),
                'sort'     => json_encode($sorter)
            ));

            $this->response($records);
        }
    }

    // With Properti
    // public function destroy($usePayload = true){
    //     $model = $this->m_kelas;
    //     $properti = $this->m_properti;
    //     $account = $this->m_account;

    //     $akun = $account->get_profile_id();
    //     $primary = $model->get_primary();
    //     $payload = getRequestPayload();
    //     $data = (array) ($usePayload ? $payload : varPost());
    //     $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
    //     $idProp = $data['kelas_properti'];

    //     if(empty($idProp)){
    //         $op = $properti->created($akun);
    //         $idProp = $op['properti_id'];
    //         $data['kelas_properti'] = $idProp;
    //     }
    //     $properti->deleted($idProp, $akun);

    //     $operation = $model->update($id, $data,function($response){});
    //     $this->response($operation);
    // }

    public function transporter_path(){
        $kelas = $this->m_kelas;

        $data = $kelas->find();
        foreach ($data as $key => &$value){
            $id = $value['kelas_id'];
            if($value['kelas_induk'] && ($value['kelas_induk'] !== $id) && !$value['kelas_parent_path']){
                $data_kelas =$kelas->read($id);
                if(!$data_kelas['kelas_parent_path']){
                    $parent = $kelas->read($data_kelas['kelas_induk']);
                    if(!$parent['kelas_parent_path']){
                        $data_parent = $this->parent_path($parent);
                        $value['kelas_parent_path'] = $data_parent['kelas_parent_path'].'/'.$data_kelas['kelas_id'];
                    }else{
                        $value['kelas_parent_path'] = $parent['kelas_parent_path'].'/'.$data_kelas['kelas_id'];
                    }
                    $operation = $kelas->update($id, $value);
                }else{
                    $value['kelas_parent_path'] = $data_kelas['kelas_parent_path'];
                }
            }else{
                $value['kelas_parent_path'] = '/'.$value['kelas_id'];
                $operation = $kelas->update($id, $value);
        }
        }

        $this->response($data);
    }

    public function parent_path($data){
        $kelas = $this->m_kelas;

        $id = $data['kelas_id'];
        if($data['kelas_induk'] && ($data['kelas_induk'] !== $id)){
            if(!$data['kelas_parent_path']){
                $parent = $kelas->read($data['kelas_induk']);
                if(!$parent['kelas_parent_path']){
                    $data_parent = $this->parent_path($parent);
                    $data['kelas_parent_path'] = $data_parent['kelas_parent_path'].'/'.$data['kelas_id'];
                }else{
                    $data['kelas_parent_path'] = $parent['kelas_parent_path'].'/'.$data['kelas_id'];
                }
                $operation = $kelas->update($id, $data);
            }
        }else{
            $data['kelas_parent_path'] = '/'.$data['kelas_id'];
            $operation = $kelas->update($id, $data);
    }
        return $data;
    }
}