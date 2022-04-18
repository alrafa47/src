<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Surat_keluar_ekspedisi extends Base_Controller {
      
    public function __construct(){
        parent::__construct();
        $this->load->model('sipas/surat_keluar_ekspedisi',      'm_surat_keluar_ekspedisi');
        $this->load->model('sipas/surat_keluar_ekspedisi_view', 'm_surat_keluar_ekspedisi_view');
        $this->load->model('sipas/account',                     'm_account');
        $this->load->model('sipas/surat',                       'm_surat');
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_surat_keluar_ekspedisi_view;
        $id = varGet('id');
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if( ! empty($id) ){
            $record = $model->read($id);
            $records = array( 'success'=> (bool) $record, 'record'=>$record );
        }else{
            $filter = json_encode($filter);

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $scopeid = $account['staf_unit'];
            }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
        }
        $this->response($records);
    }

    public function create($usePayload = true){
        $me             = $this;
        $model          = $this->m_surat_keluar_ekspedisi;
        $account_id     = $me->m_account->get_profile_id();
        $surat          = $this->m_surat;
        $now            = date('Y-m-d H:i:s');
        
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $operation = $model->insert($data, null, function($response) use($me, $data, $surat, $model, $account_id, $now){
            $datasur = $surat->find(array('surat_keluar'=>$data['surat_keluar_ekspedisi_keluar']));

                $surat->update(
                    $datasur[0]['surat_id'],
                    array(
                        'surat_distribusi_tgl'   => $now,
                        'surat_distribusi_staf'  => $account_id,
                        'surat_selesai_tgl'      => $now,
                        'surat_selesai_staf'     => $account_id,
                        'surat_terima_tgl'       => $now,
                        'surat_terima_staf'      => $account_id,
                        'surat_terima'           => $data['surat_keluar_ekspedisi_status']

                ));
        });
        $this->response($operation);
    }

    function update($usePayload = true){
        $this->create($usePayload);
    }
    
}