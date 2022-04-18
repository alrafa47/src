<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Koreksi extends Base_Controller {

    function __construct(){
        parent::__construct();
        // $this->m_fitur      = $this->model('sipas/fitur',        true);
        // $this->m_akses      = $this->model('sipas/akses',        true);
        // $this->m_akses_view = $this->model('sipas/akses_view',   true);
        $this->m_user       = $this->model('sipas/akun',         true);
        $this->m_account    = $this->model('sipas/account',      true);
        $this->m_staf_view  = $this->model('sipas/staf_view',    true);
            
        $this->m_report     = $this->model('sipas/report',       true);
        $this->m_asset      = $this->model('sipas/asset',        true);
                    
        $this->m_surat            = $this->model('sipas/surat',              true);
        $this->m_surat_view       = $this->model('sipas/surat_view',         true);
        $this->m_staf_view        = $this->model('sipas/staf_view',          true);
        $this->m_disposisi        = $this->model('sipas/disposisi',             true);
        $this->m_disposisi_view   = $this->model('sipas/disposisi_view',             true);
        $this->m_koreksi_view           = $this->model('sipas/koreksi_view',          true);
        $this->m_koreksi_masuk          = $this->model('sipas/koreksi_masuk_view',      true);
        $this->m_disposisi_masuk_view   = $this->model('sipas/disposisi_masuk_view',    true);
        // $this->m_addons                 = $this->model('sipas/addons_config', true);
    }

    function index(){
        $this->read();
    }

    function read($section=null, $id=null){
        $me = $this;

        $user         = $me->m_account->get_profile();
        $disposisi    = $this->m_disposisi;
        $koreksi_view = $this->m_koreksi_view;
        $pegawai      = $user['staf_id'];
        
        $filter     = json_decode(varGet('filter','[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $koreksi_view->read($id);
            
            $this->response_record($record);
        }
        else{
            $filter = json_encode($filter);
            $operation = $koreksi_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => $filter,
                'sorter'    => $sorter,
            ));
            $this->response($operation);
        }
    }

    public function update($usePayload = true){
        $model      = $this->m_disposisi;
        $model_view = $this->m_disposisi_view;
        $primary    = $model->get_primary();
        $payload    = getRequestPayload();
        $data       = (array) ($usePayload ? $payload : varPost());
        $now        = date('Y-m-d H:i:s');
        $id         = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $get_koreksi = $model_view->read($id);
        
        if(array_key_exists('disposisi_isbaca', $data) and $data['disposisi_isbaca'] !== $get_koreksi['disposisi_isbaca']){
            $data['disposisi_baca_tgl'] = $now;
        }

        $operation = $model->update($id, $data, function($response){});
        $this->response($operation);
    }
}