<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Surat_log extends Base_Controller {

    public function __construct(){
        parent::__construct();

        $this->m_account    = $this->model('sipas/account', true);
        $this->m_report     = $this->model('sipas/report',  true);
        $this->m_asset      = $this->model('sipas/asset',   true);

        $this->m_surat_log      = $this->model('sipas/surat_log',       true);
        $this->m_surat_log_view = $this->model('sipas/surat_log_view',  true);
        $this->m_surat_log_ekspedisi_view = $this->model('sipas/surat_log_ekspedisi_view',  true);

        $this->m_surat      = $this->model('sipas/surat',       true);
        $this->m_surat_view = $this->model('sipas/surat_view',  true);
        $this->m_properti   = $this->model('sipas/properti',    true);
        $this->m_ekspedisi  = $this->model('sipas/ekspedisi',   true);
        $this->m_staf       = $this->model('sipas/staf',        true);
        $this->m_staf_view  = $this->model('sipas/staf_view',   true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_surat_log_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('surat_log_id')){
            // echo 'if';
            $id = varGet('id', varGet('surat_log_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $records = $model->select(array(
                'limit' => $limit,
                'start' => $start,
                'filter' => json_encode($filter)
            ));
            $this->response($records);
        }
    }

    public function ekspedisi(){
        $model = $this->m_surat_log_ekspedisi_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('surat_log_id')){
            // echo 'if';
            $id = varGet('id', varGet('surat_log_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $records = $model->select(array(
                'limit' => $limit,
                'start' => $start,
                'filter' => json_encode($filter)
            ));
            $this->response($records);
        }
    }

    public function create($usePayload = true){
        $me     = $this;
        // $me->load->library('queue');
        // $me->queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $surat_log      = $me->m_surat_log;
        $surat_log_view = $me->m_surat_log_view;
        $staf           = $me->m_staf;
        $account_id     = $me->m_account->get_profile_id();
        $now            = date('Y-m-d H:i:s');
        $stafProfil     = $staf->read($account_id);

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $now = date('Y-m-d H:i:s');

        $data['surat_log_staf'] = $account_id;
        $data['surat_log_profil'] = $stafProfil['staf_profil'];
        $operation = $surat_log->insert($data, null, function($response)use($me, $data, $surat, $account_id, $now, $surat_view,$surat_log, 
            $queueTubeRedis, $stafProfil){
            $surat_record = $surat_view->read(array('surat_id'=>$data['surat_log_surat']));
            $surat_masuk_id = $surat_record['surat_korespondensi_surat'];
            $surat_log_id = $surat_log->get_insertid();

            if(!$surat_record['surat_selesai_tgl']){
                if (Config()->item('queueServer')['host']) {
                    $data_redis = array(
                        'type'=>'SuratKeluar-Unit',
                        'staf_id'=>null,
                        'jabatan_id'=>null,
                        'unit_id'=>$surat_record['surat_unit'],
                        'data'=> $surat_record['surat_unit']
                    );
                    $addJobUnit = create_job($queueTubeRedis, $data_redis);
                }

                pushEvent(array(
                    'to' => $surat_record['surat_unit'],
                    'data' => array(
                        'api' => 'surat_keluar',
                        'id' => $surat_log_id
                    ),
                    'group' => array('unit'),
                    'type' => 'surat_keluar'
                ));
            }

            /*updating status surat masuk*/
            if($surat_masuk_id){
                $surat->update(array(
                    'surat_id' => $surat_masuk_id), array(
                    'surat_selesai_tgl'      => $now,
                    'surat_selesai_staf'     => $account_id,
                    'surat_selesai_profil'   => $stafProfil['staf_profil']
                ), function($response){});

                    $dataLog3 = array(
                        'surat_log_tipe' => 8,
                        'surat_log_surat' =>$surat_masuk_id,
                        'surat_log_staf' =>$account_id,
                        'surat_log_profil' =>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$now);

                    $operation_log3 = $surat_log->insert($dataLog3, null, function($response){});
                }

            $surat->update(
                $data['surat_log_surat'],
                array(
                    'surat_distribusi_tgl'      => ($surat_record && (int)$surat_record['surat_isdistribusi'] === 0) ? $now : $surat_record['surat_distribusi_tgl'],
                    'surat_distribusi_staf'     => ($surat_record && (int)$surat_record['surat_isdistribusi'] === 0)? $account_id : $surat_record['surat_distribusi_staf'],
                    'surat_distribusi_profil'   => ($surat_record && (int)$surat_record['surat_isdistribusi'] === 0)? $stafProfil['staf_profil'] : $surat_record['surat_distribusi_profil'],
                    'surat_selesai_tgl'         => $now,
                    'surat_selesai_staf'        => $account_id,
                    'surat_selesai_profil'      => $stafProfil['staf_profil'],
                    'surat_terima_tgl'          => $now,
                    'surat_terima_staf'         => $account_id,
                    'surat_terima_profil'       => $stafProfil['staf_profil'],
                    'surat_ekspedisi'           => $data['surat_log_ekspedisi'],
                    'surat_ekspedisi_staf'      => $data['surat_log_staf'],
                    'surat_ekspedisi_profil'    => $data['surat_log_profil'],
                    'surat_ekspedisi_tgl'       => $data['surat_log_tgl']
            ));

            $dataLog = array(
                    'surat_log_tipe' => 8,
                    'surat_log_surat' => $data['surat_log_surat'],
                    'surat_log_staf' => $account_id,
                    'surat_log_profil' => $stafProfil['staf_profil'],
                    'surat_log_tgl' => $now);

            $operation_log = $surat_log->insert($dataLog, null, function($response){});
        });
        $this->response($operation);
    }
    
    function update($usePayload = true)
    {}
}