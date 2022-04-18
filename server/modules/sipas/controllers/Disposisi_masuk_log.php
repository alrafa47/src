<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Disposisi_masuk_log extends Base_Controller
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('sipas/disposisi_masuk_log',              'm_disposisi_masuk_log');
		$this->load->model('sipas/disposisi_masuk_log_view',         'm_disposisi_masuk_log_view');
		$this->load->model('sipas/disposisi_masuk_respon_log_view',  'm_disposisi_masuk_respon_log_view');
		$this->load->model('sipas/staf',                             'm_staf');
	}

    public function index(){
        $this->read();
    }

    public function generate_id(){
        $this->response(array(
            'id' => $this->model('sipas/disposisi_masuk_log')->generate_id()
        ));
    }

    public function read(){
        $model = $this->m_disposisi_masuk_log_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        $records = $model->select(array(
            'limit'     => $limit,
            'start'     => $start,
            'filters'   => json_encode($filter),
            'sort'      => $sorter
        ));
        $this->response($records);
    }

    public function respon(){
        $model = $this->m_disposisi_masuk_respon_log_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        $records = $model->select(array(
            'limit'     => $limit,
            'start'     => $start,
            'filters'   => json_encode($filter),
            'sort'      => $sorter
        ));
        $this->response($records);
    }

    public function create($usePayload = true){
        $model = $this->m_disposisi_masuk_log;
        $model_staf = $this->m_staf;
        $now        = date('Y-m-d H:i:s');

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $stafProfil = $model_staf->read($data['disposisi_masuk_log_staf']);
        $data['disposisi_masuk_log_profil'] = $stafProfil['staf_profil'];
        
        $find_log = $model->find(array(
            'disposisi_masuk_log_tipe' => 1,
            'disposisi_masuk_log_masuk' => $data['disposisi_masuk_log_masuk'],
            'disposisi_masuk_log_staf' => $data['disposisi_masuk_log_staf'],
            'disposisi_masuk_log_tgl IS NOT NULL' => NULL)
        );

        $ingat_log = $model->find(array(
            'disposisi_masuk_log_tipe' => 8,
            'disposisi_masuk_log_masuk' => $data['disposisi_masuk_log_masuk'],
            'disposisi_masuk_log_staf' => $data['disposisi_masuk_log_staf'],
            'disposisi_masuk_log_tgl IS NOT NULL' => NULL)
        );
        
        if(array_key_exists('status', $data) && $data['status'] === 1){
            $operation = $model->insert($data, null, function($response){});
        }else{
            if (!$ingat_log && $data['disposisi_masuk_log_tipe'] == 8) {
                // if($data['disposisi_masuk_log_tipe'] == 8){
                    $data['disposisi_masuk_log_tipe'] = 8;
                    $data['disposisi_masuk_log_tgl'] = $now;
                    $operation = $model->insert($data, null, function($response){});
                // }
            }
            if($find_log){
                $operation= array('success'=>true, 'message'=>'');
            }else{
                // if(!$data['disposisi_masuk_log_status_tgl']){
                //     $data['disposisi_masuk_log_baca_tgl'] = $now;
                // }
                if($data['disposisi_masuk_log_tipe'] != 6){
                    $data['disposisi_masuk_log_tipe'] = 1;
                    $data['disposisi_masuk_log_tgl'] = $now;
                }
                $operation = $model->insert($data, null, function($response){});
            }
        }
        
        $this->response($operation);
    }

}