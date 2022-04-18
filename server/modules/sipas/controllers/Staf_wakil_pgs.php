<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Staf_wakil_pgs extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/staf',
            'sipas/staf_wakil',
            'sipas/staf_wakil_view'
        ));
        $this->m_staf                       = $this->model('sipas/staf',                        true);
        $this->m_staf_wakil                 = $this->model('sipas/staf_wakil',                  true);
        $this->m_staf_wakil_view            = $this->model('sipas/staf_wakil_view',             true);
        $this->m_staf_pgs_view              = $this->model('sipas/staf_pgs_view',               true);
        $this->m_staf_pgs_atasan_view       = $this->model('sipas/staf_pgs_atasan_view',        true);

        $this->m_properti         = $this->model('sipas/properti',         true);
        $this->m_account          = $this->model('sipas/account',          true);
        $this->m_pengaturan       = $this->model('sipas/pengaturan',       true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_staf_wakil;
        $model_pgs = $this->m_staf_pgs_view;        
        $model_pgs_atasan = $this->m_staf_pgs_atasan_view;        
        $id = varGet('id');

        $filter     = json_decode(varGet('filter', '[]'));
        $filter1    = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        $now        = date('Y-m-d H:i:s'); 

        $redis = new Redis(); 
        $redis->connect('publish-sipaslab.sekawanmedia.co.id', 6379);
        $redis->auth("password");
        $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$id);
        $pgs = json_decode($pgs, true);

        if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            // mencari siapa yang di pgs in 
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'staf_wakil_staf',
                'value' => $id
            ));
            $operation = $model_pgs_atasan->select(array(
                'limit'  => $limit,
                'start'  => $start,
                'filter' => json_encode($filter),
                'sorter' => $sorter,
            ));
        }else{
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'staf_wakil_staf',
                'value' => $id
            ));
            $operation = $model_pgs_atasan->select(array(
                'limit'  => $limit,
                'start'  => $start,
                'filter' => json_encode($filter),
                'sorter' => $sorter,
            ));
	    
            if (!$operation['data']) {
                // mencari siapa pgs ku
                array_unshift($filter1, (object)array(
                    'type'  => 'exact',
                    'field' => 'staf_wakil_asisten',
                    'value' => $id
                ));
                $operation = $model_pgs->select(array(
                    'limit'  => $limit,
                    'start'  => $start,
                    'filter' => json_encode($filter1),
                    'sorter' => $sorter,
                ));
            }
            
        }

        $this->response($operation);
    }

    public function create($usePayload = true){
        $model = $this->m_staf_wakil;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $pgs_staf_aktif = $this->m_staf_pgs_view;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $data['staf_wakil_plt'] = 1;
        
        $op = $properti->created($akun);
        $data['staf_wakil_properti'] = $op['properti_id'];
        $operation = $model->insert($data, null, function($response)
            use($data, $properti, $account, $model, $akun, $pgs_staf_aktif/*, $redis*/){
                $data['staf_wakil_id'] = $model->get_insertid();
                $op = $properti->updated($data['staf_wakil_properti'], $akun, $data, 'staf_wakil', $data['staf_wakil_id']);

            });
        
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');
        $model = $this->m_staf_wakil;
        $pgs_staf_aktif = $this->m_staf_pgs_view;
        $account = $this->m_account;

        $staf_id = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data);
        $pgs_aktif = $pgs_staf_aktif->read($id);

        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_staf_wakil;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $pgs_staf_aktif = $this->m_staf_pgs_view;
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $pgs_aktif = $pgs_staf_aktif->read($id);
        $redis = new Redis(); 
        $redis->connect('publish-sipaslab.sekawanmedia.co.id', 6379);
        $redis->auth("password");
        $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$pgs_aktif['staf_wakil_staf']);
        $pgs = json_decode($pgs, true);

        if(isAssoc($data)){
            if ($pgs) {
                $redis->del(Config()->item('redisPrefix').'staf_wakil_staf:'.$pgs_aktif['staf_wakil_staf']);
            }
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

    public function konfirmasi(){
        $account = $this->m_account;
        $model = $this->m_staf_wakil;
        $queueTube = Config()->item('queueServer_notifTube');

        $akun = $account->get_profile_id();
        $id  = varReq('id');
        $now = date('Y-m-d H:i:s'); 

        $redis = new Redis(); 
        $redis->connect('publish-sipaslab.sekawanmedia.co.id', 6379);
        $redis->auth("password");

        $operation = $model->update(array(
            'staf_wakil_id' => $id), array(
            'staf_wakil_konfirmasi_asisten' => $akun,
            'staf_wakil_konfirmasi_asisten_status' => 2,
            'staf_wakil_konfirmasi_asisten_tgl' => $now,
        ), function ($response) use ($now, $id, $model, $akun, $queueTube, $redis){
            $inserted_data = $model->read($id);

            $tgl_mulai = new DateTime($inserted_data['staf_wakil_tgl_mulai']);
            $tgl_selesai = new DateTime($inserted_data['staf_wakil_tgl_selesai']);
            $tgl_mulai = $tgl_mulai->format('Y-m-d');
            $tgl_selesai = $tgl_selesai->format('Y-m-d');
            $pgs = array(
               'staf_wakil_tgl_mulai' => $tgl_mulai,
               'staf_wakil_tgl_selesai' => $tgl_selesai,
            );
            $redis->set(Config()->item('redisPrefix').'staf_wakil_staf:'.$inserted_data['staf_wakil_staf'], json_encode($pgs));
            if (Config()->item('queueServer')['host']) {
                $data_fcm = array(
                    'id'    => $id,
                    'type'  => 'Plt',
                    'from'  => $akun,
                    'to'    => $inserted_data['staf_wakil_asisten'],
                    'data'  => 'Anda ditunjuk sebagai Pgs',
                );
                $addJob = create_job($queueTube, $data_fcm);
            }
        });
        $operation[$model->dataProperty] = $model->read($id);
        $this->response($operation);
    } 

    public function check(){
        $id = varReq('id');

        $model_pgs = $this->m_staf_pgs_view;    
        $model_pgs_atasan = $this->m_staf_pgs_atasan_view;  

        $filter     = json_decode(varGet('filter', '[]'));
        $filter1    = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $redis = new Redis(); 
        $redis->connect('publish-sipaslab.sekawanmedia.co.id', 6379);
        $redis->auth("password");
        $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$id);
        $pgs = json_decode($pgs, true);
        $now = date('Y-m-d H:i:s'); 
        $checkPgs = 0;

        array_unshift($filter, (object)array(
            'type'  => 'exact',
            'field' => 'staf_wakil_staf',
            'value' => $id
        ));
        $operation = $model_pgs_atasan->select(array(
            'limit'     => $limit,
            'start'     => $start,
            'filter'    => json_encode($filter),
            'sorter'    => $sorter,
        ));

        array_unshift($filter1, (object)array(
            'type'  => 'exact',
            'field' => 'staf_wakil_asisten',
            'value' => $id
        ));
        $operation1 = $model_pgs->select(array(
            'limit'     => $limit,
            'start'     => $start,
            'filter'    => json_encode($filter1),
            'sorter'    => $sorter,
        ));

        if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            $checkPgs = 1; //yg di pgsin
        }else {
            if ($operation1['data']) {
                $checkPgs = 0; //siapa pgsku
            }else if ($operation['data']) {
                $checkPgs = 1; //yg di pgsin
            }else if (!$operation['data']) {
                $checkPgs = 1; //yg di pgsin
            }
        }

        $this->response(array(
            'checkPgs' => (int)$checkPgs
        ));
    }
}