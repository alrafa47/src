<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Jabatan extends Base_Controller {

    protected $message = array();
      
	public function __construct(){
        parent::__construct();
        $this->m_jabatan                = $this->model('sipas/jabatan',                    true);
        $this->m_jabatan_view           = $this->model('sipas/jabatan_view',               true);
        $this->m_jabatan_aktual_view    = $this->model('sipas/jabatan_aktual_view',        true);
        $this->m_staf                   = $this->model('sipas/staf',                       true);
        $this->m_staf_profil            = $this->model('sipas/staf_profil',                true);           
        $this->m_staf_view              = $this->model('sipas/staf_view',                  true);
        $this->m_staf_aktif_view        = $this->model('sipas/staf_aktif_view',            true);
        $this->m_staf_aktual_view       = $this->model('sipas/staf_aktual_view',           true);
        $this->m_unit                   = $this->model('sipas/unit',                       true);
        $this->m_properti               = $this->model('sipas/properti',                   true);
        $this->m_account                = $this->model('sipas/account',                    true);
        $this->m_jabatan_hidup          = $this->model('sipas/jabatan_hidup_view',         true);
        $this->m_jabatan_aktif          = $this->model('sipas/jabatan_aktif_view',         true);
        $this->m_jabatan_nonaktif       = $this->model('sipas/jabatan_nonaktif_view',      true);
    }

    public function index(){
        $this->read();
    }
    
    public function read($section=null){
        $model = $this->m_jabatan_hidup;
        $modelJabatan = $this->m_jabatan;
        $model_view = $this->m_jabatan_view;
        $id = varReq('id', varReq('node'));

        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = varGet('sort');
        $unit_id = varReq('jabatan_unit');
        $unit_filter = empty($unit_id) ? array() : array('jabatan_unit' => $unit_id);
        $recursive = varGet('recursive');

        if(strtolower($id) == 'root') $id = null;

        if($section == 'tree'){
            $records = $model->tree($id, $unit_filter, $recursive);
        }else{
	        if( ! empty($id) ){
	            $record = null;

                if(inCacheExists($modelJabatan, $id)){
                    $record = getRecordFromCache($modelJabatan, $id);
                    $useCache = true;
                }

                if(!$record){
                    $record = $model->read($id);
                    addRecordToCache($modelJabatan, $record);
                    $useCache = false;
                }
                
                $records = array( 
                    $model_view->successProperty => (bool) $record, 
                    $model_view->dataProperty    => $record,
                    'useCache'                  => $useCache
                );
	        }else{
                $query = varGet('query');
                if(!empty($query)){
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     =>'(jabatan_kode LIKE "%'.$query.'%" OR jabatan_nama LIKE "%'.$query.'%")'
                    ));
                }
                $filter = json_encode($filter);
	            $records = $model->select(array(
	                'limit'    => $limit,
	                'start'    => $start,
                    'filter'   => $filter,
	                'sort'     => $sorter
	            ));
	    	}
        }
        $this->response($records);
    }

    public function aktif($section=null){
        $model = $this->m_jabatan_aktif;
        $modelJabatan = $this->m_jabatan;
        $model_view = $this->m_jabatan_view;
        $id = varReq('id', varReq('node'));

        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = varGet('sort');
        $unit_id = varReq('jabatan_unit');
        $unit_filter = empty($unit_id) ? array() : array('jabatan_unit' => $unit_id);

        if(strtolower($id) == 'root') $id = null;

        if($section == 'tree'){
            $records = $model->tree($id, $unit_filter);
        }else{
            if( ! empty($id) ){
                $record = null;
                if(inCacheExists($modelJabatan, $id)){
                    $record = getRecordFromCache($modelJabatan, $id);
                    $useCache = true;
                }

                if(!$record){
                    $record = $model->read($id);
                    addRecordToCache($modelJabatan, $record);
                    $useCache = false;
                }

                $records = array( 
                    $model_view->successProperty => (bool) $record, 
                    $model_view->dataProperty    => $record,
                    'useCache'                  => $useCache
                );
            }else{
                // array_unshift($filter, (object)array(
                //     'type'      => 'custom',
                //     'value'     => '(properti_hapus_tgl IS NULL OR properti_pulih_tgl IS NOT NULL)'
                // ));
                $query = varGet('query');
                if(!empty($query))
                {
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     =>'(jabatan_kode LIKE "%'.$query.'%" OR jabatan_nama LIKE "%'.$query.'%")'
                    ));
                }
                $filter = json_encode($filter);
                $records = $model->select(array(
                    'limit'    => $limit,
                    'start'    => $start,
                    'filter'   => $filter,
                    'sort'     => $sorter
                ));
            }
        }
        $this->response($records);
    }

    public function nonaktif($section=null){
        $model = $this->m_jabatan_nonaktif;
        $modelview = $this->m_jabatan_view;
        $modelJabatan = $this->m_jabatan;

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = json_decode(varGet('filter', '[]'));
        $sorter = json_decode(varGet('sort', '[]'));
        $unit_id = varReq('jabatan_unit');
        $unit_filter = empty($unit_id) ? array() : array('jabatan_unit' => $unit_id);

        if(strtolower($id) == 'root') $id = null;

        if($section == 'tree'){
            $records = $model->tree($id, $filter);
        }else{
            if( ! empty($id) ){
                $record = null;
                if(inCacheExists($modelJabatan, $id)){
                    $record = getRecordFromCache($modelJabatan, $id);
                    $useCache = true;
                }

                if(!$record){
                    $record = $model->read($id);
                    addRecordToCache($modelJabatan, $record);
                    $useCache = false;
                }

                $records = array( 
                    $model_view->successProperty => (bool) $record, 
                    $model_view->dataProperty    => $record,
                    'useCache'                  => $useCache
                );
            }else{
                $query = varGet('query');
                if(!empty($query))
                {
                    array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     =>'(jabatan_kode LIKE "%'.$query.'%" OR jabatan_nama LIKE "%'.$query.'%")'
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

    public function wakil(){
        $model = $this->m_jabatan_aktif;
        $modeljabatan = $this->m_jabatan;

        $filter     = varGet('filter','[]');
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        $mode       = varGet('mode');
        $jabatan    = varGet('jabatan');
        $pegawai    = $this->m_account->get_profile();
        $jabatan_id = $pegawai['jabatan_id'];

        $filter = json_decode($filter);
        if(!empty($filter)){
            
            $custom_filter  = array('jabatan_id', 'jabatan_kode', 'jabatan_nama');

            $value = $filter[0]->value;
            $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
            $filter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
        }
        
        if(varGetHas('id') || varGetHas('jabatan_id')){
            $id = varGet('id', varGet('jabatan_id'));
            $record = null;

            if(inCacheExists($modeljabatan, $id)){
                $record = getRecordFromCache($modeljabatan, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modeljabatan, $record);
                $useCache = false;
            }
            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'jabatan_kode LIKE "%'.$query.'%" OR jabatan_nama LIKE "%'.$query.'%"'
                ));
            }
            if ($mode == 'pimpinan'){
                array_unshift($filter, (object)array(
                    'property'  => 'jabatan_id',
                    'value'     => $jabatan,
                    'type'      => 'exact'
                ));
            } else if ($mode == 'asisten'){
                array_unshift($filter, (object)array(
                    'property'  => 'jabatan_induk',
                    'value'     => $jabatan,
                    'type'      => 'exact'
                ));
            }

            array_unshift($filter, array(
                'value'     => "jabatan_id <> '".$jabatan_id."'",
                'type'      => 'custom'
            ));

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
        $model = $this->m_jabatan;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $path = varReq('path');

        // $op = $properti->created($akun);
        // $data['jabatan_properti'] = $op['properti_id'];
        
        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data, $path){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'jabatan', $inserted_data['jabatan_id'], $inserted_data['jabatan_kode']);
            if($inserted_data['jabatan_induk']){
                if($path){
                    $inserted_data['jabatan_parent_path'] = $path.'/'.$inserted_data['jabatan_id'];
                }else{
                    $inserted_data['jabatan_parent_path'] = '/'.$inserted_data['jabatan_id'];
                }
            }else{
                $inserted_data['jabatan_parent_path'] = '/'.$inserted_data['jabatan_id'];
            }
            if($op){
                $model->update($inserted_data['jabatan_id'], array(
                    'jabatan_parent_path' => $inserted_data['jabatan_parent_path'],
                    'jabatan_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_jabatan;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $staf = $this->m_staf;
        $staf_profil = $this->m_staf_profil;
        $staf_view = $this->m_staf_view;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $dataJabatan = $model->read($id);
        $path = varReq('path');
        $isChange = varReq('isChange');

        if($data['jabatan_induk']){
            if($path){
                $data['jabatan_parent_path'] = $path.'/'.$data['jabatan_id'];
            }else{
                $data['jabatan_parent_path'] = '/'.$data['jabatan_id'];
            }
        }else{
            $data['jabatan_parent_path'] = '/'.$data['jabatan_id'];
        }

        if($isChange){
            $jPath = varReq('jabatan_path');
            $jabatan_path = $jPath.'%';
            $jabatanPath = $jPath;
            $changePath = $data['jabatan_parent_path'].'/'.$data['jabatan_id'];

            $query = "UPDATE jabatan SET jabatan_parent_path = REPLACE(jabatan_parent_path, '".$jabatanPath."', '".$changePath."') WHERE"." jabatan_parent_path LIKE '".$jabatan_path."'";
            $result = $this->db->query($query);
        }

        $dataJabatan = $model->read($id);
        
        $operation = $model->update($id, $data, function($response) use ($properti, $model, $akun, $data, $dataJabatan, $staf, $staf_view, $staf_profil){
            addRecordToCache($model, $response[$model->dataProperty]);
            $updated_data = $model->read($data['jabatan_id']);
            $idProp = $updated_data['jabatan_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'jabatan', $updated_data['jabatan_id'], $updated_data['jabatan_kode']);
                if($op){
                    $model->update($updated_data['jabatan_id'], array(
                        'jabatan_properti' => $op['properti_id']
                    ));
                }
            }

            if ($dataJabatan['jabatan_nama'] != $data['jabatan_nama']) {
                $now = date('Y-m-d H:i:s');
                $data_staf = $staf_view->find(array('staf_jabatan' => $data['jabatan_id']));
                foreach ($data_staf as $index => &$p) {
                    $update_staf = $staf_profil->insert(array(
                        'staf_profil_staf' => $p['staf_id'],
                        'staf_profil_staf_nama' => $p['staf_nama'],
                        'staf_profil_jabatan' => $p['staf_jabatan'],
                        'staf_profil_jabatan_nama' => $data['jabatan_nama'],
                        'staf_profil_unit' => $p['staf_unit'],
                        'staf_profil_unit_nama' => $p['unit_nama'],
                        'staf_profil_buat_tgl' => $now
                    ), null, function($response) use($staf_profil, $staf, $data, $p){
                        $responses = $response['data'];
                        $id = $staf_profil->get_insertid();

                        $p['staf_profil'] = $id;
                        $staf->update($p['staf_id'], $p);
                    });
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['jabatan_kode']);
        });
        $this->response($operation);
    }

    // Without Properti
    public function destroy($usePayload = true){
        $model = $this->m_jabatan;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['jabatan_properti'];

        $jabatan_path = $data['jabatan_parent_path'].'%';

        $query = "UPDATE jabatan SET jabatan_ishapus = 1, jabatan_isaktif = 0, jabatan_kode = jabatan_id WHERE jabatan_parent_path LIKE '".$jabatan_path."'";
        $result = $this->db->query($query);

        $data['jabatan_kode'] = $data['jabatan_id'];
        $data['jabatan_isaktif'] = 0;
        $data['jabatan_ishapus'] = 1;

        $operation = $model->update($id, $data ,function($response) use ($properti, $model, $akun, $data){
            addRecordToCache($model, $response[$model->dataProperty]);
            $deleted_data = $model->read($data['jabatan_id']);
            $idProp = $deleted_data['jabatan_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'jabatan', $deleted_data['jabatan_id'], $deleted_data['jabatan_kode']);
                if($op){
                    $model->update($deleted_data['jabatan_id'], array(
                        'jabatan_properti' => $op['properti_id']
                    ));
                }
            }

            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['jabatan_kode']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    public function transporter_path(){
        $jabatan = $this->m_jabatan;

        $data = $jabatan->find();
        foreach ($data as $key => &$value){
            $id = $value['jabatan_id'];
            if($value['jabatan_induk'] && ($value['jabatan_induk'] !== $id) && !$value['jabatan_parent_path']){
                $data_jabatan =$jabatan->read($id);
                if(!$data_jabatan['jabatan_parent_path']){
                    $parent = $jabatan->read($data_jabatan['jabatan_induk']);
                    if(!$parent['jabatan_parent_path']){
                        $data_parent = $this->parent_path($parent);
                        $value['jabatan_parent_path'] = $data_parent['jabatan_parent_path'].'/'.$data_jabatan['jabatan_id'];
                    }else{
                        $value['jabatan_parent_path'] = $parent['jabatan_parent_path'].'/'.$data_jabatan['jabatan_id'];
                    }
                    $operation = $jabatan->update($id, $value);
                }else{
                    $value['jabatan_parent_path'] = $data_jabatan['jabatan_parent_path'];
                }
            }else{
	    		$value['jabatan_parent_path'] = '/'.$value['jabatan_id'];
                $operation = $jabatan->update($id, $value);
    	    }
        }
        $this->response($data);
    }

    public function parent_path($data){
        $jabatan = $this->m_jabatan;

        $id = $data['jabatan_id'];
        if($data['jabatan_induk'] && ($data['jabatan_induk'] !== $id)){
            if(!$data['jabatan_parent_path']){
                $parent = $jabatan->read($data['jabatan_induk']);
                if(!$parent['jabatan_parent_path']){
                    $data_parent = $this->parent_path($parent);
                    $data['jabatan_parent_path'] = $data_parent['jabatan_parent_path'].'/'.$data['jabatan_id'];
                }else{
                    $data['jabatan_parent_path'] = $parent['jabatan_parent_path'].'/'.$data['jabatan_id'];
                }
                $operation = $jabatan->update($id, $data);
            }
        }else{
	    	$data['jabatan_parent_path'] = '/'.$data['jabatan_id'];
        	$operation = $jabatan->update($id, $data);
	}
        return $data;
    }

    function penerima($section=null){ // section = [recent,available]
        $me = $this;
        $model          = $me->m_jabatan_aktual_view;
        $jabatanModel   = $me->m_jabatan_view;
        $jabatanModelAktif = $me->m_jabatan_aktif;
        $stafModelAktif    = $me->m_staf_aktif_view;
        $stafAktualModelAktif = $me->m_staf_aktual_view;
        
        $id         = varGet('id');
        $filter     = varGet('filter','[]');
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        $akun       = $me->m_account->get_profile();
        $akun_id    = $akun['staf_id'];
        $jabatan_id = $akun['jabatan_id'];

        $filter = json_decode($filter);
    
        switch ($section) {
            case 'recent':
                array_unshift($filter, array(
                    'property'  => 'staf_aktual_pengirim',
                    'value'     => $akun_id,
                    'type'      => 'exact'
                ));

                $operation = $stafAktualModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;
            
            case 'available':
                $operation = $stafModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;

            case 'jabatan':
                array_unshift($filter, array(
                    'property'  => 'jabatan_id',
                    'value'     => $jabatan_id,
                    'type'      => 'exact'
                ));
                $operation = $jabatanModelAktif->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => json_encode($filter),
                    'sorter'    => $sorter
                ));
                break;
        }
        $this->response($operation);
    }
}