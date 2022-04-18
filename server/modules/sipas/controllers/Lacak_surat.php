<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Lacak_surat extends Base_Controller {

    public $report_template = 'sipas/Lacak_surat';
    public $report_title = 'Laporan Lacak Surat';
    public $report_subtitle = 'Laporan Ini Menginformasikan Penerima Surat dengan Ekspedisi Surat';

	public function __construct(){
        parent::__construct();
        // $this->m_fitur           = $this->model('sipas/fitur',      true);
        // $this->m_akses           = $this->model('sipas/akses',      true);
        // $this->m_akses_view      = $this->model('sipas/akses_view', true);
        $this->m_user            = $this->model('sipas/akun',       true);
        $this->m_account         = $this->model('sipas/account',    true);
 
        $this->m_surat_staf_view = $this->model('sipas/disposisi_masuk_view', true);
        $this->m_ekspedisi       = $this->model('sipas/ekspedisi_disposisi',  true);
        $this->m_surat           = $this->model('sipas/surat',                true);
    }

    public function index(){
        $this->read();
    }

    public function read($section = null){
        $model = $this->model('sipas/ekspedisi_disposisi', true);
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

        $this->response($records);
    }

    function report(){
        $report_model = $this->model('sipas/report',true);
        $account_model = $this->model('sipas/account',true);
        $asset_model = $this->model('sipas/asset',true);
        $surat = $this->model('sipas/surat_view', true);

        $download = varGet('download',0);
        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;    

        $user = $account_model->get_profile();
        $nomor = varGet('nomor');

        if(!$nomor){
            return ;
        }

        $filter = array();
        if(is_numeric($nomor)){
            array_unshift($filter, (object)array(
                    'type' => 'custom',
                    'value' => ' surat_masuk <> "" AND (surat_nomor = '.$nomor.' OR surat_registrasi = '.$nomor.' OR surat_agenda = '.$nomor.' OR surat_agenda_sub = '.$nomor.')'
                ));
        }else{
            array_unshift($filter, (object)array(
                'type' => 'custom',
                'value' => 'surat_nomor = "'.$nomor.'" OR surat_registrasi = "'.$nomor.'"'
            ));
        }
        $surat_recs = $surat->select(array(
                'limit' => null,
                'start' => null,
                'filter' => json_encode($filter),
                'sorter' => null
            ));

        if($surat_recs['total'] == 0){
            return;

        }

        $id = $surat_recs[$surat->dataProperty][0][$surat->get_primary()];

        /*change date format for create date */
        $date = $surat_recs[$surat->dataProperty][0]['surat_pembuatan_tanggal'];
        $createDate =new DateTime($date);
        $surat_recs[$surat->dataProperty][0]['surat_pembuatan_tanggal'] = $createDate->format('d-m-Y  H:i');

        $records = $this->m_ekspedisi->find(array('disposisi_surat' => $id),null,null,null, array(
            'disposisi_tanggal'=>'asc'
        ));

        if(!$records){
            return;
        }
        /*change date format for mail date*/
        $date = $records[0]['surat_tanggal'];
        $createDate = new DateTime($date);
        $records[0]['surat_tanggal'] = $createDate->format('d-m-Y');


        foreach ($records as $key => $value) {
            $records[$key]['no'] = $key+1;

            /*change date format for disposisi tanggal*/
            $date = $records[$key]['disposisi_tanggal'];
            $createDate = new DateTime($date);
            $records[$key]['disposisi_tanggal'] = $createDate->format('d-m-Y H:i:s');

            switch ($records[$key]['disposisi_penerima_status']) {
                case 0:
                    $status = "Belum Dibaca";
                    break;
                case 1:
                    $status =  "Sudah Dibaca";
                    break;
                case 2:
                    $status =  "Didisposisikan";
                    break;
            }

            $records[$key]['disposisi_penerima_status_generate'] = $status;
        }

        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'=> $this->report_title,
            'header'=>$report_model->generateHeader($download),
            'records'=>$records,
            'recordsCount'=>count($records),
            'dateReport'=>date('d-m-Y H:i:s'),
            'surat_agenda' => (count($records) > 0) ? $records[0]['surat_agenda'] : '-',
            'surat_nomor' => (count($records) > 0) ? $records[0]['surat_nomor'] : '-',
            'surat_perihal' => (count($records) > 0) ? $records[0]['surat_perihal'] : '-',
            'surat_pengirim' => (count($records) > 0) ? $records[0]['surat_pengirim'] : '-',
            'surat_tanggal' => (count($records) > 0) ? $records[0]['surat_tanggal'] : '-',
            'surat_registrasi' => (count($surat_recs) > 0) ? $surat_recs['data'][0]['surat_registrasi'] : '-',
            'surat_pembuatan_tanggal' => (count($surat_recs) > 0) ? $surat_recs['data'][0]['surat_pembuatan_tanggal'] : '-',
            'operator'=>$user[$account_model->field_display]
        );
        
        if($download){
            $file = $this->load->view($this->report_template, null, true);
            $report_model->generateReportPdf($file, $report_data, 'report');
        }else{
            $report_model->generateReport($this->report_template, $report_data, true, true);
        }

    }
}