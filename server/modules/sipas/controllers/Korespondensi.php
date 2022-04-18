<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Korespondensi extends Base_Controller {

    public $report_rekap_title      = 'Laporan Korespondensi Surat';
    public $report_rekap_subtitle   = 'Jumlah Surat Korespondensi yang dikeluarkan pengguna SIPAS';
    public $report_rekap_template   = 'sipas/rekap/korespondensi/rekap';

    public $report_template         = 'sipas/korespondensi';
    public $report_template_kor     = 'sipas/korespondensi_laporan';
    public $report_title            = 'Laporan Korespondensi Surat';
    public $report_subtitle         = 'Keterkaitan atau korespondensi antara surat yang dikeluarkan dan yang diterima pengguna SIPAS';

    static $bg_color_item_laporan    = array('odd'=> 'background-color: #F5F5F5;', 'even'=> 'background-color: #FFFFFF;');
    static $report_filename_download_eksternal = 'Rekap_korespondensi_eksternal_';
    static $report_filename_download_internal  = 'Rekap_korespondensi_internal_';

    public function __construct(){
        parent::__construct();
        $this->m_akun                         = $this->model('sipas/akun',                         true);
        $this->m_account                      = $this->model('sipas/account',                      true);
        $this->m_properti                     = $this->model('sipas/properti',                     true);
        $this->m_pengaturan                   = $this->model('sipas/pengaturan',                   true);
        // $this->m_fitur                        = $this->model('sipas/fitur',                        true);
        // $this->m_akses                        = $this->model('sipas/akses',                        true);
        // $this->m_akses_view                   = $this->model('sipas/akses_view',                   true);

        $this->m_korespondensi                = $this->model('sipas/korespondensi',                true);
        $this->m_korespondensi_view           = $this->model('sipas/korespondensi_view',           true);
        $this->m_korespondensi_internal_view  = $this->model('sipas/korespondensi_internal_view',  true);
        $this->m_korespondensi_eksternal_view = $this->model('sipas/korespondensi_eksternal_view', true);
        $this->m_korespondensi_perihal        = $this->model('sipas/korespondensi_perihal',        true);

        $this->m_surat                        = $this->model('sipas/surat',                        true);
        $this->m_surat_log                    = $this->model('sipas/surat_log',                        true);
        $this->m_surat_view                   = $this->model('sipas/surat_view',                   true);

        $this->m_unit                         = $this->model('sipas/unit',                         true);
    }

    public function index(){
        $this->read();
    }

    function read($section = null) {
        $me = $this;
        $korespondensiView = $me->m_korespondensi_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        $val = varGet('instansi');
        if (array_key_exists('id', $_GET)) {
            $record = $korespondensiView->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            if($section==='list'){
                array_unshift($filter, (object)array(
                    'type'  => 'exact',
                    'field' => 'korespondensi_pengirim',
                    'value' => $val
                ));
            }
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => '(korespondensi_nomor IS NOT NULL) AND korespondensi_jumlah > 0'
            ));
            $operation = $korespondensiView->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        $this->response($operation);
    }

    function eksternal($section = null) {
        $me = $this;
        $korespondensiView = $me->m_korespondensi_eksternal_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        $val = varGet('instansi');
        if (array_key_exists('id', $_GET)) {
            $record = $korespondensiView->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            if($section==='list'){
                array_unshift($filter, (object)array(
                    'type'  => 'exact',
                    'field' => 'korespondensi_pengirim',
                    'value' => $val
                ));
            }
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => '(korespondensi_nomor IS NOT NULL) AND korespondensi_jumlah > 0'
            ));
            $operation = $korespondensiView->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        $this->response($operation);
    }

    function internal($section = null) {
        $me = $this;
        $korespondensiView = $me->m_korespondensi_internal_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
        
        $val = varGet('instansi');
        if (array_key_exists('id', $_GET)) {
            $record = $korespondensiView->read(varGet('id'));   
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            if($section==='list'){
                array_unshift($filter, (object)array(
                    'type'  => 'exact',
                    'field' => 'unitpengirim_nama',
                    'value' => $val
                ));
            }
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => '(korespondensi_nomor IS NOT NULL) AND korespondensi_jumlah > 0'
            ));
            $operation = $korespondensiView->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        $this->response($operation);
    }

    function create($usePayload = true){
        $me = $this;
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        $operation = $me->m_korespondensi->insert($data, null, function($response){});
        $this->response($operation);
    }

    function reSetting(){
        $model = $this->m_korespondensi;
        $surat = $this->m_surat;
        $surat_log = $this->m_surat_log;
        $surat_view = $this->m_surat_view;
        $profile = $this->m_account->get_profile();
        $now = date('Y-m-d H:i:s');

        $data = $_POST;
        
        $id = $data['id'];
        $korespondensi = $data['surat_id'];
        $surat_korespondensi = $data['surat_korespondensi'];
        $log = varReq('log');

        $operation = $surat->update($id, array(
            'surat_korespondensi_surat' => $korespondensi,
            'surat_korespondensi' => $surat_korespondensi
        ));
        if ($log) {
            $dataLog = array(
                'surat_log_tipe' => 13,
                'surat_log_surat'=>$id,
                'surat_log_staf'=>$profile['staf_id'],
                'surat_log_tgl'=>$now);

            $operation_log = $surat_log->insert($dataLog, null, function($response){});
        }

        $operation = $surat_log->insert($data);
        $operation[$model->dataProperty] = $surat_view->read($id);
        $this->response($operation);
    }
    
    function report($section = null){
        $report_model       = $this->model('sipas/report',true);
        $account_model      = $this->model('sipas/account',true);
        $asset_model        = $this->model('sipas/asset',true);
        $surat_view         = $this->m_surat_view;
        $unitkerja_model    = $this->m_unit;
        $pengaturan         = $this->m_pengaturan;

        $perihal    = varGet('perihal');
        $instansi   = varGet('instansi');
        $filter     = array();

        $download       = varGet('download',0);
        $excel          = varGet('excel', 0);
        if(strtolower($download) == 'false') $download = 0;
        $surat_korespondensi = varGet('surat_korespondensi');
        $new_array      = array();
        $record_surat   = array();
        $isinternal     = array_key_exists('internal', varGet()) ? 1 : 0;

        $filename       = ($isinternal) ? $this::$report_filename_download_internal : $this::$report_filename_download_eksternal;

        array_unshift($filter, array('type'=>'custom', 'value'=>'korespondensi_isinternal = '.$isinternal));

        switch (strtolower($section)) {
            case 'all':
                $user = $account_model->get_profile();
                if($instansi === 'null'){
                    // echo 'di if 1 '; 
                    $korespondensi2 = $this->m_korespondensi->select(array(
                        'filter'    => json_encode($filter),
                        'sorter'    => 'korespondensi_nomor'
                    ));
                    $korespondensi = $korespondensi2['data'];
                }else{
                    if(empty($perihal) || is_null($perihal) || $perihal === 'null'){
                        $korespondensi3 = $this->m_korespondensi->find(
                                            (is_null($instansi) ? array('korespondensi_isinternal'=>$isinternal) : array('korespondensi_pengirim'=>$instansi, 'korespondensi_isinternal'=>$isinternal)),
                                                null,null,null, array(
                                            'korespondensi_nomor'=>'asc'
                                            ));
                        $korespondensi = $korespondensi3;
                    }else{
                        $korespondensi = $this->m_korespondensi->find(
                                    (is_null($instansi) ? array('korespondensi_isinternal'=>$isinternal) : array(
                                        'korespondensi_pengirim'=>$instansi,
                                        'korespondensi_perihal'=>$perihal,
                                        'korespondensi_isinternal'=>$isinternal)),
                                        null,null,null, array(
                                    'korespondensi_nomor'=>'asc'
                                    ));
                    }
                }

                if(!is_array($korespondensi)) $korespondensi = array();
                foreach ($korespondensi as $d_i => $v) {
                    $id = $korespondensi[$d_i]['korespondensi_id'];
                    // echo $instansi;
                    if($instansi){
                        $records = $this->m_surat_view->find(array(
                                'surat_korespondensi'=>$id)
                                ,null,null,null, array(
                                'surat_tanggal'=>'asc'
                                ));
                    }else{
                        $records = array();
                    }             
                    // echo ' | '.$this->m_surat_view->get_lastquery();
                    foreach ($records as $i => &$r) {
                        $r['no'] = $i + 1;

                        $date = $r['surat_tanggal'];
                        $createDate = new DateTime($date);
                        $r['surat_tanggal'] = $createDate->format('d M Y');
                        
                        $date2 = $r['surat_properti_buat_tgl'];
                        $createDate2 = new DateTime($date2);
                        $r['surat_properti_buat_tgl'] = $createDate2->format('d M Y H:i');

                        if(!$r['surat_agenda_sub'] == NULL){
                            $r['surat_agenda_converted'] = $r['surat_agenda'].'.'.$r['surat_agenda_sub'];
                        }else{
                            $r['surat_agenda_converted'] = $r['surat_agenda'];
                        }
                        $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                    }
                     if(!empty($records)){
                         $v['records'] = $records;
                         $v['korespondensi_pengirim'] = $records[0]['surat_properti_pembuat_unit_nama'];
                         $v['count'] = count($records);
                         $korespondensi[$d_i] = $v;
                     }else{
                         unset($korespondensi[$d_i]);
                     }
                }
                
                $report_data = array(
                    'title'=> $this->report_title,
                    'subtitle'=>$this->report_subtitle,
                    'header'=>$report_model->generateHeader($download),
                    'dateReport'=>date('d M Y H:i:s'),
                    'korespondensi'=>'',
                    'startDate'=>'',
                    'endDate'=>'',
                    'korespondensi'=>$korespondensi,
                    'dateReportFormated'=> date('d M Y H:i'),
                    'operator'=>$user[$account_model->field_display]
                );

                $file = $this->load->view($this->report_template_kor, null, true);
                if($download){
                    $report_model->generateReportPdf($file, $report_data, $filename.date('dmy_His'), true);
                }else if($excel){
                    $report_model->generateExcel($file, $report_data, $filename.date('dmy_His'));
                }else{
                    $report_model->generateReport($file, $report_data, true);
                }
            break;

            default:
                if(!$surat_korespondensi) return;
                $user = $account_model->get_profile();
                $korespondensi = $this->m_korespondensi_view->read($surat_korespondensi);
                $surat = $this->m_surat_view->find(array(
                    'surat_korespondensi'=>$surat_korespondensi,
                ),null,null,null, array(
                    'surat_properti_buat_tgl'=>'asc'
                ));

                foreach ($surat as $idx => $s) {
                    $s['no'] = $idx + 1;
                    $s['bg_color'] = ($idx % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                    $surat[$idx] = $s;

                    if(!$s['surat_agenda_sub'] == NULL){
                        $s['surat_agenda_converted'] = $s['surat_agenda'].'.'.$s['surat_agenda_sub'];
                    }else{
                        $s['surat_agenda_converted'] = $s['surat_agenda'];
                    }
                    if(!empty($surat)){
                        $s['records'] = $surat;
                    }
                }

                if($korespondensi){
                    foreach($korespondensi as $key => $val) {
                       $new_array[0][$key] = $val;
                    }
                }

                $template = $pengaturan->getSettingByCode('template_cetak_korespondensi');
                $header_mode = $report_model->getHeaderMode($template);

                if ($template !== null){
                    $template = html_entity_decode($template);
                } else {
                    $template = $this->load->view($this->report_template, null, true);
                }

                $datatable = $report_model->parseData($template, $s['records']);
                $report_data = array(
                    // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
                    'title'=> $this->report_title,
                    'subtitle'=>$this->report_subtitle,
                    $header_mode[0] => $report_model->generateHeader($download, 0, $header_mode[1]),
                    'dateReport'=>date('d M Y'),
                    'korespondensi_nomor'=>$korespondensi['korespondensi_nomor'],
                    'startDate'=>$korespondensi['korespondensi_tgl_mulai'],
                    'endDate'=>$korespondensi['korespondensi_tgl_selesai'],
                    'records'=>$s['records'],
                    'no'=>$s['no'],
                    $datatable[0]=>$datatable[1],
                    'korespondensi'=>$new_array,
                    'recordsCount'=>count($surat),
                    'dateReportFormated'=> date('d M Y H:i'),
                    'operator'=>$user[$account_model->field_display]
                );

                

                // $file = $this->load->view($template, null, true);
                if($download){
                    $report_model->generateReportPdf($template, $report_data, $this::$report_filename_download.date('dmy_His'), true);
                }else if($excel){
                    $report_model->generateExcel($template, $report_data, $this::$report_filename_download.date('dmy_His'));
                }else{
                    $report_model->generateReport($template, $report_data, true);
                }
            break;
        }
        
    }

    function perihal() {
        $me = $this;
        
        $korespondensi = $me->m_korespondensi_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $val = varGet('instansi');
        if(!empty($val)){
            $sql = "SELECT DISTINCT(COALESCE(korespondensi_perihal))as korespondensi_perihal FROM v_korespondensi WHERE korespondensi_pengirim ='".$val."' ";
            $query = $me->db->query($sql);
            $result = $query->result_array();
            $operation = $result;
        }else{
            $operation = $korespondensi->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        $this->response($operation);
    }
}