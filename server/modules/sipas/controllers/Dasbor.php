<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dasbor extends Base_Controller {

    protected $message = array();

    static $dashboard_template              = 'sipas/report/dashboard';
    static $dashboard_template_title        = 'Dashboard';
    static $dashboard_template_subtitle     = 'Dashboard';
    static $chart_eksternal_harian_filename_download = 'Grafik_jumlah_surat_';

	public function __construct(){
        parent::__construct();
        // $this->m_fitur        = $this->model('sipas/fitur',                   true);
        // $this->m_akses        = $this->model('sipas/akses',                   true);
        // $this->m_akses_view   = $this->model('sipas/akses_view',              true);
        $this->m_user         = $this->model('sipas/akun',                    true);
        $this->m_account      = $this->model('sipas/account',                 true);
        $this->m_staf_view    = $this->model('sipas/staf_view',               true);
        $this->m_report       = $this->model('sipas/report',                  true);
        
        $this->m_surat                  = $this->model('sipas/surat',                   true);
        $this->m_surat_view             = $this->model('sipas/surat_view',              true);
        $this->m_surat_masuk_view       = $this->model('sipas/surat_masuk_view',        true);
        $this->m_surat_keluar_view      = $this->model('sipas/surat_keluar_view',       true);
        $this->m_surat_ikeluar_view     = $this->model('sipas/surat_ikeluar_view',      true);
        $this->m_surat_imasuk_view      = $this->model('sipas/surat_imasuk_view',       true);
        $this->m_disposisi_masuk_view   = $this->model('sipas/disposisi_masuk_view',    true);
        $this->m_unit                   = $this->model('sipas/unit_view',               true);
    }

    public function index(){
        
    }
    
    function surat_masuk($id = null){
        $me = $this;
        $surat              = $me->m_surat;
        $surat_masuk_view   = $me->m_surat_masuk_view;
        
        $filter  = json_decode(varGet('filter', '[]'));
        $limit   = varGet('limit');
        $start   = varGet('start',0);
        $sorter  = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $surat_masuk_view->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
			array_unshift($filter, (object)array(
                'property'  => $surat::$field_approval_lookup,
                'value'     => $surat::SETUJU_SETUJU
            ));
            array_unshift($filter, (object)array(
                'property'  => $surat::$field_distribusi_lookup,
                'value'     => $surat::DISTRIBUSI_DISTRIBUSI
            ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"'
            ));
            $operation = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
        }

        $this->response($operation);
    }

    function surat_keluar($id = null){
        $me = $this;
        $surat              = $me->m_surat;
        $surat_keluar_view  = $me->m_surat_keluar_view;

        $filter = json_decode(varGet('filter', '[]'));
        $limit  = varGet('limit');
        $start  = varGet('start',0);
        $sorter = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $surat_keluar_view->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
			array_unshift($filter, (object)array(
                'property'  => $surat::$field_approval_lookup,
                'value'     => $surat::SETUJU_SETUJU
            ));
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     => 'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"'
            ));
            $operation = $surat_keluar_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        
        $this->response($operation);
    }
    
    function disposisi_masuk($id = null){
        $me = $this;
        $now = date('Y-m-d H:i:s');
        $disposisi_masuk_view = $me->m_disposisi_masuk_view;
        
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $this->m_disposisi_masuk_view->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            $property = $sorter[0]->property;
            $direction = $sorter[0]->direction;
            
            $query = "SELECT DISTINCT disposisi_masuk_penerima_nama, disposisi_pengirim_unit_nama FROM v_disposisi_masuk ".
                    "WHERE DATE_FORMAT(disposisi_tgl, '%Y-%m')= '".date('Y-m')."' ".
                    "ORDER BY ".$property." ".$direction." LIMIT ".$start." , ".$limit ;
            $result = $this->db->query($query);

            $operation['data'] = $result->result_array();
            $operation['total'] = $result->num_rows();
        }

        $this->response($operation);
    }

    function chart(){
        $me = $this;
        $surat   = $this->m_surat;
        $surat_masuk    = $me->m_surat_masuk_view;
        $surat_keluar   = $me->m_surat_keluar_view;
        $surat_ikeluar  = $me->m_surat_ikeluar_view;
        $surat_imasuk   = $me->m_surat_imasuk_view;
        $data       = array('data'=>array(), 'total'=>0);
        $hariini    = date('Y-m-d 00:00:00');
        $account    = $me->m_account->get_profile();
        $pegawai    = $me->m_staf_view;

        $models = array(
            'Surat Masuk'  =>   $surat_masuk->count_exist(array(
                                    $surat::$field_approval_lookup    => $surat::SETUJU_SETUJU,
                                    $surat::$field_distribusi_lookup  => $surat::DISTRIBUSI_DISTRIBUSI,
                                    '(('.$surat::$field_retensi_tgl.'>= "'.$hariini.'" AND '.$surat::$field_useretensi.' = 1) OR '.$surat::$field_useretensi.' IS NULL OR surat_useretensi = 0)'  => NULL,
                                    'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"' => null
                                )),
            'Surat Keluar' => $surat_keluar->count_exist(array(
                                    $surat::$field_approval_lookup    => $surat::SETUJU_SETUJU,
                                    'surat_properti_pembuat_unit' => $account['staf_unit'],
                                    'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"' => null
                                )),
            'Surat Internal' => $surat_ikeluar->count_exist(array(
                                    $surat::$field_approval_lookup.' <> '.$surat::SETUJU_INIT => NULL,
                                    'surat_unit' => $account['staf_unit'],
                                    'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"' => null
                                )) + 
                                $surat_imasuk->count_exist(array(
                                    $surat::$field_approval_lookup => $surat::SETUJU_INIT,
                                    'surat_unit' => $account['staf_unit'],
                                    'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"' => null
                                ))
        );

        foreach($models as $index => $value){
            if(empty($value)) continue;
            array_push($data['data'], array(
                'name' => $index,
                'data' => $value
            ));
        }
        $data['total'] = count($data['data']);

        $this->response($data); 
    }

    public function get_dashboard(){
        $me                 = $this;
        $surat              = $me->m_surat;
        $surat_keluar_view  = $me->m_surat_keluar_view;
        $surat_masuk_view   = $me->m_surat_masuk_view;
        $download           = 0;
        $user               = $this->m_account->get_profile();
        $m_report           = $this->m_report;
        $m_account          = $this->m_account;
        $m_unit             = $this->m_unit;

        $_filter            = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel',0);
        $param_unitkerja    = varGet('unit', 0);

        // surat masuk
        $filter             = array();
        array_unshift($filter, (object)array(
            'property'  => $surat::$field_approval_lookup,
            'value'     => $surat::SETUJU_SETUJU
        ));
        array_unshift($filter, (object)array(
            'property'  => $surat::$field_distribusi_lookup,
            'value'     => $surat::DISTRIBUSI_DISTRIBUSI
        ));
        array_unshift($filter, (object)array(
            'type'      =>'custom',
            'value'     => 'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"'
        ));
        $sm = $surat_masuk_view->select(array(
            'filter'    => json_encode($filter),
        ));

        // surat keluar
        array_unshift($filter, (object)array(
            'property'  => $surat::$field_approval_lookup,
            'value'     => $surat::SETUJU_SETUJU
        ));
        array_unshift($filter, (object)array(
            'type'      =>'custom',
            'value'     => 'DATE_FORMAT(surat_tanggal, "%Y-%m")="'.date('Y-m').'"'
        ));

        $sk = $surat_keluar_view->select(array(
            'filter'    => json_encode($filter),
        ));

        // disposisi masuk 
        $query = "SELECT DISTINCT disposisi_masuk_penerima_nama, disposisi_pengirim_unit_nama FROM v_disposisi_masuk ".
                "WHERE DATE_FORMAT(disposisi_tgl, '%Y-%m')= '".date('Y-m')."' ".
                "ORDER BY surat_tanggal DESC LIMIT 1 , 10" ;
        $result = $this->db->query($query);

        $disposisi['data'] = $result->result_array();
        $disposisi['total'] = $result->num_rows();


        // chart
        $surat_masuk    = $me->m_surat_masuk_view;
        $surat_keluar   = $me->m_surat_keluar_view;
        $surat_ikeluar  = $me->m_surat_ikeluar_view;
        $surat_imasuk   = $me->m_surat_imasuk_view;
        $data       = array('data'=>array(), 'total'=>0);
        $account    = $me->m_account->get_profile();
        $pegawai    = $me->m_staf_view;
        $record     = array();

        $filter_masuk = array(
                                    $surat::$field_approval_lookup    => $surat::SETUJU_SETUJU,
                                    $surat::$field_distribusi_lookup  => $surat::DISTRIBUSI_DISTRIBUSI,
                                    '('.$surat::$field_useretensi.' IS NULL OR surat_useretensi = 0)'  => NULL
                                );

        $filter_keluar = array(
                                    $surat::$field_approval_lookup    => $surat::SETUJU_SETUJU
                                );

        $filter_ikeluar = array(
                                    $surat::$field_approval_lookup.' <> '.$surat::SETUJU_INIT => NULL
                                );

        $filter_imasuk = array(
                                    $surat::$field_approval_lookup => $surat::SETUJU_INIT
                                );

        if($param_unitkerja && $param_unitkerja != 'null') $filter_masuk['surat_unit'] = $param_unitkerja;
        if($param_unitkerja && $param_unitkerja != 'null') $filter_imasuk['surat_unit'] = $param_unitkerja;
        if($param_unitkerja && $param_unitkerja != 'null') $filter_keluar['surat_unit'] = $param_unitkerja;
        if($param_unitkerja && $param_unitkerja != 'null') $filter_ikeluar['surat_unit'] = $param_unitkerja;

        $models = array(
            'Surat Masuk'  => $surat_masuk->count_exist($filter_masuk),
            'Surat Keluar' => $surat_keluar->count_exist($filter_keluar),
            'Surat keluar Internal' => $surat_ikeluar->count_exist($filter_ikeluar),
            'Surat Masuk Internal' => $surat_imasuk->count_exist($filter_imasuk)
        );
        
        foreach($models as $index => $value){
            if(empty($value)) $value = 0;
            $data['data'][$index] = $value;
            $_rindex = strtolower(str_replace(' ', '_', $index));
            $record['data'][$_rindex] = $value;
        }

        $unit = ($param_unitkerja) ? $m_unit->read($param_unitkerja)['unit_nama'] : '(Tidak ada filter)' ;
        $record['data']['unit_nama'] = $unit ? $unit : '<span style="font-style:italic; color: #9E9E9E;">(Tidak ada filter)</span>';

        $chartData      = array_values($data['data']);
        $chartlegend    = array_keys($data['data']);

        $countdata = array_sum($chartData);
        if($countdata > 0){
             $chartConfig = $m_report->generateChart(array(
                    'type'          => 'pie',
                    'data'          => array($data['data']),
                    'width'         => 600,
                    'height'        => 400,
                    'title'         => ' ',
                    // 'barcolor'      => array('#0000FF', '#FFFF00'),
                    'usedatavalue'  => true,
                    'titlelocation' => 'left',
                    'uselegend'     => true,
                    'legendtitle'   => $chartlegend
                ), true);
         }else{
            $chartConfig = array();
         }

        // // pelaporan
        $report_data = array(
            'title'         =>  $this::$dashboard_template_title,
            'subtitle'      =>  $this::$dashboard_template_subtitle,
            'header'        =>  $m_report->generateHeader($download),
            'periode'       =>  $m_report->generatePeriode($_filter, $filterValue),
            'chart'         =>  ($excel) ? array() : $chartConfig,
            'unit_nama'     =>  ($param_unitkerja) ? $m_unit->read($param_unitkerja)['unit_nama'] : '(Tanpa Filter)',
            'data'          =>  array($record['data']),
            // 'disposisi'     =>  $disposisi['data'],
            // 'surat_masuk'   =>  $sm['data'],
            // 'surat_keluar'  =>  $sk['data'],
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );
        
        $file = $this->load->view($this::$dashboard_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$chart_eksternal_harian_filename_download.date('dmy'), true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $this::$chart_eksternal_harian_filename_download.date('dmy'));
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }
}