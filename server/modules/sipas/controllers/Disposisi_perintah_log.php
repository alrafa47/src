<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Disposisi_perintah_log extends Base_Controller
{
	
	function __construct()
	{
		parent::__construct();
        $this->m_disposisi_perintah_log       = $this->model('sipas/disposisi_perintah_log',       true);        
        $this->m_disposisi_perintah_log_view  = $this->model('sipas/disposisi_perintah_log_view',  true);
        $this->m_disposisi_masuk              = $this->model('sipas/disposisi_masuk',              true);
        $this->m_disposisi                    = $this->model('sipas/disposisi',                    true);
        $this->m_account                      = $this->model('sipas/account',                      true);
        $this->m_staf                         = $this->model('sipas/staf',                         true);
	}

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_disposisi_perintah_log_view;

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
        $me = $this;
        $model = $me->m_disposisi;
        $account = $me->m_account;
        $disposisi_masuk = $me->m_disposisi_masuk;
        $disposisi_perintah_log = $me->m_disposisi_perintah_log;
        $akun = $account->get_profile_id();
        $staf_model = $me->m_staf;
        $stafProfil = $staf_model->read($akun);

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $data['disposisi_perintah_log_staf'] = $akun;
        $data['disposisi_perintah_log_profil'] = $stafProfil['staf_profil'];

        $operation = $disposisi_perintah_log->insert($data, null, function($response) use ($data, $model, $disposisi_masuk, $akun){
            $model->update($data['disposisi_perintah_log_disposisi'], array(
                'disposisi_perintah' => $data['disposisi_perintah_log_perintah'],
                'disposisi_pesan' => $data['disposisi_perintah_log_pesan']
            ));
        });
        $this->response($operation);
    }

}