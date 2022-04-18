<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dokumen_log extends Base_Controller {

    public $report_template = 'sipas/ekspedisi';
    public $report_title = 'Laporan Ekspedisi Surat';
    public $report_subtitle = 'Laporan Ini Menginformasikan Penerima Surat dengan Ekspedisi Surat';

    public function __construct(){
        parent::__construct();
        // $this->m_fitur      = $this->model('sipas/fitur',      true);
        // $this->m_akses      = $this->model('sipas/akses',      true);
        // $this->m_akses_view = $this->model('sipas/akses_view', true);
        $this->m_user       = $this->model('sipas/akun',       true);
        $this->m_account    = $this->model('sipas/account',    true);
 
        $this->m_d_masuk_view   = $this->model('sipas/disposisi_masuk_netral_view',    true);
        $this->m_dokumen      = $this->model('sipas/dokumen', true);
        $this->m_dokumen_log      = $this->model('sipas/dokumen_log', true);
        $this->m_disposisi      = $this->model('sipas/disposisi',       true);
        $this->m_disposisi_view  = $this->model('sipas/disposisi_view', true);
        $this->m_report          = $this->model('sipas/report',         true);
    }

    public function index(){
        $this->read();
    }

    public function read($section = null){
        $model = $this->m_dokumen_log;

        $id = varReq('id', varReq('node'));
        $limit = varGet('limit');
        $start = varGet('start');
        $filter = varGet('filter');
        $sorter = varGet('sort');

        /*ExtJs automatically send id=root for default node*/
        if(strtolower($id) == 'root') $id = null;

        switch ($section) 
        {
            case 'trace':
                $records = $model->trace($id);
                break;

            case 'tree':
                $records = $model->tree($id);
                break;
            
            default:
                if( ! empty($id) ){
                    $record = $model->read($id);
                    $records = array( $model->successProperty=> (bool) $record, $model->dataProperty=>$record );
                }else{
                    $records = $model->select(array(
                        'limit' => $limit,
                        'start' => $start,
                        'filters' => $filter,
                        'sort' => $sorter
                    ));
                }
                break;
        }
        // $records['debug'] = $model->get_lastquery();
        $this->response($records);
    }

    function report(){
        $me = $this;

        $id     = varGet('id');
        $filter = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $withcreator    = varGet('tampilkanpembuat',0);
        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $disposisi_view  = $this->m_disposisi_view;

        $user = $me->m_account->get_profile();

        $penerima = null;

        $surat_staf = $me->m_d_masuk_view->read(array('disposisi_surat'=>$id));

        if($surat_staf){
            $id = $surat_staf['disposisi_masuk_id'];
        }else{
            /*IMPORTANT, do not remove*/
            $surat_staf = $me->m_d_masuk_view->read(array(
                'disposisi_id' => $id,
                'disposisi_masuk_staf' => $user['staf_id']));
            $id = $surat_staf['disposisi_masuk_id'];
        }

        /*first we should get disposisi record to fetch pegawai sibling*/
        $records = $this->m_ekspedisi->find(array(
            'disposisi_surat' => varGet('id',null),
            'IFNULL(disposisi_iscabut, 0) = '.$disposisi_view::AKTIF => NULL
            ),
            null,null,null, array(
            'disposisi_tgl'=>'asc'
        ));

        /*repack for the output*/
        /*generate author of paper*/
        $createDate = new DateTime($surat_staf['surat_tanggal']);
        $surat_staf['surat_tanggal'] = $createDate->format('d M Y');

        /*generate number for each*/
        foreach ($records as $i => &$r) {
            $r['no'] = $i + 1;
            $date = $r['disposisi_tgl'];
                $createDate = new DateTime($date);
                $r['disposisi_tgl'] = $createDate->format('d M Y H:i');
        }

        /*generate data */
        $report_data = array_merge(array(
            'title'             => $this->report_title,
            'subtitle'          => $this->report_subtitle,
            'records'           => $records,
            'header'            => $me->m_report->generateHeader($download)
        ), $surat_staf);

        $file = $this->load->view($this->report_template, null, true);
        if($download){
            $me->m_report->generateReportPdf($file, $report_data, true);
        }else{
            $me->m_report->generateReport($file, $report_data, true);
        }
    }

    protected function trace_root($surat_staf_id = null){
        $surat_staf_record = $this->m_d_masuk_view->read($surat_staf_id);
        $disposisi_id = $surat_staf_record['disposisi_masuk_disposisi'];

        $trace = array();

        $disposisi_pack = $this->get_disposisi_pack($disposisi_id);
        if($disposisi_pack)
        {
            array_unshift($trace, $disposisi_pack);

            if(!empty($disposisi_pack['disposisi_induk']))
            {
                $parent_disposisi_pack = $this->trace_root($disposisi_pack['disposisi_induk']);
                
                if(!empty($parent_disposisi_pack))
                {
                    /*array_unshift($trace, $parent_disposisi_pack);*/
                    array_push($parent_disposisi_pack, $trace[0]);
                    $trace = $parent_disposisi_pack;
                }
            }
        }
        return $trace;
    }

    protected function get_disposisi_pack($disposisi_id = null){
        $disposisi_record = $this->m_disposisi_view->read($disposisi_id);
        if($disposisi_record)
        {
            $disposisi_record['disposisi_masuk'] = $this->m_d_masuk_view->find(array(
                'disposisi_masuk_disposisi' => $disposisi_id
                ));

            $disposisi_tgl = new DateTime($disposisi_record['disposisi_tgl']);
            $disposisi_record['disposisi_tgl'] = $disposisi_tgl->format('d-m-Y H:i');
        }

        return $disposisi_record;
    }
}