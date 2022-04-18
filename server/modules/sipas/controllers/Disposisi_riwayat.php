<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Disposisi_riwayat extends Base_Controller {

    public $report_template = 'sipas/disposisi/pengirim';
    public $report_title = 'Surat Keterangan Pengirim Disposisi';
    public $report_subtitle = 'Surat ini menerangkan bahwa pegawai dibawah ini telah melakukan disposisi dengan rincian sebagai berikut:';

    function __construct(){
        parent::__construct();
        $this->m_account     = $this->model('sipas/account',    true);
        $this->m_staf        = $this->model('sipas/staf',       true);
        $this->m_staf_view   = $this->model('sipas/staf_view',  true);
        
        $this->m_surat            = $this->model('sipas/surat',          true);
        $this->m_surat_view       = $this->model('sipas/surat_view',     true);

        $this->m_disposisi        = $this->model('sipas/disposisi',      true);
        $this->m_disposisi_view   = $this->model('sipas/disposisi_view', true);

        $this->m_disposisi_riwayat_view         = $this->model('sipas/disposisi_riwayat_view', true);
        $this->m_disposisi_riwayat_aktif_view   = $this->model('sipas/disposisi_riwayat_aktif_view', true);
        $this->m_disposisi_riwayat_nonaktif_view   = $this->model('sipas/disposisi_riwayat_nonaktif_view', true);
    }

    function index(){
        $this->read();
    }

    function read($section=null){
        $me = $this;

        $user           = $me->m_account->get_profile();
        $disposisi_view = $this->m_disposisi_riwayat_view;

        $filter     = json_decode(varGet('filter','[]'));
        $limit      = varGet('limit');
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        if(varGetHas('id') || varGetHas('disposisi_id')){
            $id = varGet('id', varGet('disposisi_id'));
            $record = $disposisi_view->read($id);
            
            // $record['debug'] = $disposisi_view->get_lastquery();
            $this->response_record($record);
        }
        else{

            $filter = json_encode($filter);
            $operation = $disposisi_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => $filter,
                'sorter'    => $sorter,
            ));
            // $operation['debug'] = $disposisi_view->get_lastquery();
            $this->response($operation);
        }
    }
}