<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notif_user extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_notif_user          = $this->model('sipas/notif_user',                    true);
        $this->m_notif_user_view     = $this->model('sipas/notif_user_view',               true);
        $this->m_account             = $this->model('sipas/account',                       true);
    }

    public function index(){
        $this->all();
    }
    
    public function all(){ //read for mobile
        $model      = $this->m_notif_user_view;
        $account    = $this->m_account;
        $staf_id    = $account->get_profile_id();

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $id = varGet('id');
        if(!empty($filter)){
            $custom_filter  = array('notif_user_id', 'notif_user_isi', 'pengirim_nama', 'pengirim_jabatan_nama', 'pengirim_unit_nama', 'notif_user_tgl');

            $value = $filter[0]->value;
            $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
            $filter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
        }

        if(varGetHas('id') || varGetHas('notif_user_id')){
            $id = varGet('id', varGet('notif_user_id'));
            $record = $model->read($id);
            $this->response_record($record);
        } else{
            array_unshift($filter, (object)array(
                'property'  => 'notif_user_penerima',
                'value'     => $staf_id,
                'type'      =>'exact'
            ));

            // array_unshift($filter, (object)array(
            //     'value' => 'IFNULL(notif_user_ishapus, 0) = 0',
            //     'type'  => 'custom'
            // ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $records['debug'] = $model->get_lastquery();
            $this->response($records);
        }
    }

    public function read(){
        $me = $this;
        // $me->load->library('queue');
        // $me->queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

        $model      = $this->m_notif_user_view;
        $account    = $this->m_account;
        $staf_id    = $account->get_profile_id();

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        array_unshift($filter, (object)array(
            'property'  => 'notif_user_penerima',
            'value'     => $staf_id,
            'type'      =>'exact'
        ));

        $records = $model->select(array(
            'limit'     => 10,
            'start'     => $start,
            'filters'   => json_encode($filter),
            'sort'      => $sorter
        ));

        if($records['total'] != 0){
            if($records['data'][0]['notif_user_isnew'] == 1){
                $where = array('notif_user_isnew' => 1, 'notif_user_penerima' => $staf_id);
                $table = 'notif_user';
                $data = array('notif_user_isnew' => 0);
                $this->db->where($where);
                $this->db->update($table,$data);

                if (Config()->item('queueServer')['host']) {
                    $data_redis = array(
                        'type'=>'Notif-Staf',
                        'staf_id'=>$staf_id,
                        'jabatan_id'=>null,
                        'unit_id'=>null,
                        'data'=> $staf_id
                    );
                    $addJobStaf = create_job($queueTubeRedis, $data_redis);
                }
            }

            $record_dummy = array(array(
                'notif_user_id' => 'lain',
                'notif_user_tipe' => "1000"
            ));
            foreach ($record_dummy as $key => $value) {
                array_push($records['data'], $value);
            }

        }
        
        $this->response($records);
    }

    public function update($usePayload = true){
        $model = $this->m_notif_user;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $data['notif_user_tgl'] = $data['notif_user_tanggal'];
        $operation = $model->update($id, $data, function($response) use 
            ($model, $data){});

        $this->response($operation);
    }

    public function news(){ //mobile untuk mencari data terbaru
        $me = $this;
        // $me->load->library('queue');
        // $me->queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

        $id = varReq('id');
        $model = $this->m_notif_user;

        $where = array('notif_user_isnew' => 1, 'notif_user_penerima' => $id);
        $table = 'notif_user';
        $data = array('notif_user_isnew' => 0);

        $records = $model->find(array('notif_user_isnew' => 1, 'notif_user_penerima' => $id));

        if(!empty($records)){
            $this->db->where($where);
            $this->db->update($table,$data);
            $operation['success'] = true;
            $operation['data'] = $records;

            if (Config()->item('queueServer')['host']) {
                $data_redis = array(
                    'type'=>'Notif-Staf',
                    'staf_id'=>$id,
                    'jabatan_id'=>null,
                    'unit_id'=>null,
                    'data'=> $id
                );
                $addJobStaf = create_job($queueTubeRedis, $data_redis);
            }
        }else{
            $operation['success'] = false;
            $operation['message'] = 'Tidak ada notif baru';
        }

        $this->response($operation);
    }

    public function reading(){ // tandai baca semua
        $id = varReq('id');
        $model = $this->m_notif_user;

        $where = array('notif_user_isbaca' => 0, 'notif_user_penerima' => $id);
        $table = 'notif_user';
        $data = array('notif_user_isbaca' => 1);

        $records = $model->find(array('notif_user_isbaca' => 0, 'notif_user_penerima' => $id));

        if(!empty($records)){
            $count_notif = $model->count_exist(array(
                    'notif_user_penerima' => $id,
                    'notif_user_isbaca' => 0
                ));
            $this->db->where($where);
            $this->db->update($table,$data);
            $operation['success'] = true;
            $operation['message'] = $count_notif . ' notifikasi ditandai terbaca';
        }else{
            $operation['success'] = false;
            $operation['message'] = 'Tidak ada notifikasi yang belum terbaca';
        }

        $this->response($operation);
    }
}