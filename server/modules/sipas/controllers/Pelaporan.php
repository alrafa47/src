<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Pelaporan extends Base_Controller 
{
    protected $message = array();
    
    static $month  = array(
            1=>'January',   2=>'February',  3=>'March',     4=>'April',     5=>'May',       6=>'June', 
            7=>'July',      8=>'August',    9=>'September', 10=>'October',  11=>'November', 12=>'December'
        );

    static $bg_color_item_laporan = array('odd'=> 'background-color: #F5F5F5;', 'even'=> 'background-color: #FFFFFF;');

    static $chart_template  = 'sipas/report/surat/chart';
    static $rekap_template  = 'sipas/report/rekap';
    static $chart_colspan   = 5; // see table data in template //

    static $chart_masuk_title               = 'Grafik Surat Masuk';
    static $chart_masuk_template_title      = 'Rekapitulasi Surat masuk';
    static $chart_masuk_template_subtitle   = 'Rekapitulasi jumlah surat masuk yang diterima';
    static $chart_masuk_filename_download   = 'Grafik_surat_masuk_';

    static $chart_template_title                    = 'Grafik Surat Yang Ditindaklanjut';
    static $chart_tindaklanjut_template_title       = 'Rekapitulasi Surat Tindaklanjut';
    static $chart_tindaklanjut_template_subtitle    = 'Rekapitulasi jumlah Surat yang ditindaklanjut';
    static $chart_tindaklanjut_filename_download    = 'Grafik_surat_tindaklanjut_';

    static $chart_topurgent_title               = 'Grafik Surat Top Urgent';
    static $chart_topurgent_template_title      = 'Rekpaitulasi Surat Top Urgent';
    static $chart_topurgent_template_subtitle   = 'Rekapitulasi jumlah surat top urgent';
    static $chart_topurgent_filename_download   = 'Grafik_surat_top_urgent_';

    static $rekap_masuk_template_title      = 'Laporan Rekap Surat Masuk';
    static $rekap_masuk_template_subtitle   = 'Tahun';
    static $rekap_masuk_filename_download   = 'Rekap_surat_masuk_';

    static $rekap_keluar_template_title      = 'Laporan Rekap Surat Keluar';
    static $rekap_keluar_template_subtitle   = 'Tahun';
    static $rekap_keluar_filename_download   = 'Rekap_surat_keluar_tahunan_';

    static $rekap_retensi_template_title      = 'Laporan Retensi Arsip';
    static $rekap_retensi_template_subtitle   = 'Tahun';
    static $rekap_retensi_filename_download   = 'Rekap_retensi_arsip_';

    static $chart_eksternal_bulanan_template_title      = 'Grafik Surat Eksternal - Bulanan';
    static $chart_eksternal_bulanan_template_subtitle   = 'Grafik jumlah surat eksternal milik instansi pengguna aplikasi';
    static $chart_eksternal_bulanan_filename_download   = 'Rekap_eksternal_bulanan';

    static $chart_eksternal_harian_template_title      = 'Grafik Surat Eksternal - Harian';
    static $chart_eksternal_harian_template_subtitle   = 'Grafik jumlah surat eksternal milik instansi pengguna aplikasi';
    static $chart_eksternal_harian_filename_download   = 'Rekap_eksternal_harian';

    static $default_value  = array(
                                        'empty' => '<span style="color:grey; font-style:italic;">(dalam proses)</span>',
                                        'nodata' =>'<span style="color:grey; font-style:italic;">(Tidak Ada Data)</span>',
                                );

	public function __construct()
    {
        parent::__construct();
        $this->m_account        = $this->model('sipas/account',     true);
        $this->m_report         = $this->model('sipas/report',      true);
        $this->m_asset          = $this->model('sipas/asset',       true);
        $this->m_surat          = $this->model('sipas/surat',       true);
        $this->m_surat_log      = $this->model('sipas/surat_log',   true);
        $this->m_surat_view     = $this->model('sipas/surat_view',  true);

        $this->m_arsip              = $this->model('sipas/arsip',             true);
        $this->m_arsip_view         = $this->model('sipas/arsip_view',        true);
        $this->m_surat_masuk_view   = $this->model('sipas/surat_masuk_view',  true);

        $this->m_surat_masuk_aktif_view          = $this->model('sipas/surat_masuk_aktif_view',         true);
        $this->m_surat_masuk_arah_view           = $this->model('sipas/surat_masuk_arah_view',          true);
        $this->m_surat_masuk_blm_arah_view       = $this->model('sipas/surat_masuk_blm_arah_view',      true);
        $this->m_surat_masuk_distribusi_view     = $this->model('sipas/surat_masuk_distribusi_view',    true);
        $this->m_surat_masuk_nonaktif_view       = $this->model('sipas/surat_masuk_nonaktif_view',      true);

        $this->m_surat_imasuk_view              = $this->model('sipas/surat_imasuk_view',               true);
        $this->m_surat_imasuk_hidup_view        = $this->model('sipas/surat_imasuk_hidup_view',         true);
        $this->m_surat_imasuk_aktif_view        = $this->model('sipas/surat_imasuk_aktif_view',         true);
        $this->m_surat_imasuk_nonaktif_view     = $this->model('sipas/surat_imasuk_nonaktif_view',      true);
        $this->m_surat_imasuk_unapproved_view   = $this->model('sipas/surat_imasuk_unapproved_view',    true);
        $this->m_surat_imasuk_approved_view     = $this->model('sipas/surat_imasuk_approved_view',      true);
        $this->m_surat_imasuk_pending_view      = $this->model('sipas/surat_imasuk_pending_view',       true);
        $this->m_surat_imasuk_tolak_view        = $this->model('sipas/surat_imasuk_tolak_view',         true);

        $this->m_surat_keluar_view          = $this->model('sipas/surat_keluar_view',           true);
        $this->m_surat_keluar_hidup_view    = $this->model('sipas/surat_keluar_hidup_view',     true);
        $this->m_surat_keluar_aktif_view    = $this->model('sipas/surat_keluar_aktif_view',     true);
        $this->m_surat_keluar_setuju_view   = $this->model('sipas/surat_keluar_setuju_view',    true);
        $this->m_surat_keluar_setuju_view   = $this->model('sipas/surat_keluar_nonaktif_view',  true);

        $this->m_surat_ikeluar_view         = $this->model('sipas/surat_ikeluar_view',          true);
        $this->m_surat_ikeluar_aktif_view   = $this->model('sipas/surat_ikeluar_aktif_view',    true);
        $this->m_surat_ikeluar_setuju_view  = $this->model('sipas/surat_ikeluar_setuju_view',   true);
        $this->m_surat_keluar_setuju_view   = $this->model('sipas/surat_ikeluar_nonaktif_view', true);

        $this->m_unit               = $this->model('sipas/unit_view',            true);
        $this->m_unit_cakupan       = $this->model('sipas/unit_cakupan',         true);
        $this->m_unit_cakupan_view  = $this->model('sipas/unit_cakupan_view',    true);

        $this->m_surat_retensi_rekap_view   = $this->model('sipas/surat_retensi_rekap_view',        true);
        $this->m_surat_masuk_rekap_view     = $this->model('sipas/surat_masuk_rekap_view',          true);
        $this->m_surat_keluar_rekap_view    = $this->model('sipas/Surat_keluar_rekap_view',         true);
    }

    public function index(){}

    public function chart_surat_masuk() {
        $m_surat    = $this->m_surat;
        $m_masuk    = $this->m_surat_masuk_aktif_view;
        $m_imasuk   = $this->m_surat_imasuk_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = varGet('value');
        $download           = varGet('download',0);
        $param_unitkerja    = varGet('unit');

        $chart_title        = ($filterValue) ? strtoupper('Grafik Surat Masuk Tahun '.$filterValue) : ' ';
        $unitnama           = $m_unitkerja->read($param_unitkerja)['unit_nama'];
        $report_title       = $this::$chart_masuk_title;
        $report_subtitle    = ($unitnama) ? $this::$chart_masuk_template_subtitle.' '.$unitnama : $this::$chart_masuk_template_subtitle;

        $data  = array();

        if(strtolower($download) == 'false') $download = 0;
        $user       = $m_account->get_profile();

        $internal = array();

        $month = $this::$month;

        foreach($month as $key => $list){
            $_filter = array();
            $filter_distribusi  = $m_surat::$field_distribusi_lookup.' = '.$m_surat::DISTRIBUSI_DISTRIBUSI;
            $filter_year        = ($filterValue) ? 'YEAR(surat_tanggal) = '.$filterValue : null;
            $filter_month       = 'MONTH(surat_tanggal) = '.$key;

            if($param_unitkerja){
                $_filter['surat_unit'] = $param_unitkerja;
            }

            $_filter[$filter_distribusi]            = null;
            $_filter[$filter_month]                 = null;
            if($filterValue) $_filter[$filter_year] = null;

            $internal[substr($list, 0, 3)]     = $m_imasuk->count_exist($_filter, null, null, null, null);
            $eksternal[substr($list, 0, 3)]    = $m_masuk->count_exist($_filter, null, null, null, null);
        }

        $chart64mode = $m_report->generateChart(array(
                    'type'          => 'line',
                    'data'          => array($internal, $eksternal),
                    'width'         => 600,
                    'height'        => 400,
                    'title'         => $chart_title,
                    'titlelocation' => 'left',
                    'linecolor'     => array('#2196F3', '#F44336'),
                    'uselegend'     => true,
                    'legendtitle'   => array('Surat Internal', 'Surat Eksternal')
                ), true);

        $report_data = array(
            'title'         =>  $report_title,
            'subtitle'      =>  $report_subtitle,
            'header'        =>  $m_report->generateHeader($download),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'chart'         =>  $chart64mode,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$chart_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$chart_masuk_filename_download.date('dmy'), true);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function chart_surat_tindaklanjut(){
        $m_surat    = $this->m_surat_view;
        $m_masuk    = $this->m_surat_masuk_aktif_view;
        $m_imasuk   = $this->m_surat_imasuk_aktif_view;
        $m_keluar   = $this->m_surat_keluar_aktif_view;
        $m_ikeluar  = $this->m_surat_ikeluar_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $def_color = $m_report::$surat_color;

        $filter             = varGet('filter');
        $filterValue        = varGet('value');
        $download           = varGet('download',0);
        $excel              = varGet('excel',0);
        $param_unitkerja    = varGet('unit');
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        if(strtolower($download) == 'false') $download = 0;
        $user       = $m_account->get_profile();

        $mode = 'stacked';

        $unitnama           = ($param_unitkerja) ? $m_unitkerja->read($param_unitkerja)['unit_nama'] : '';
        $report_subtitle    = $this::$chart_tindaklanjut_template_subtitle.' '.$unitnama;

        $sudah = array();
        $belum = array();

        $_filter                = array();
        $_filter                = $m_report->generateField($param_unitkerja, $filter, $filterValue);
        $filter_distribusi      = $m_surat::$field_distribusi_lookup.' = '.$m_surat::DISTRIBUSI_DISTRIBUSI;
        $filter_tindaklanjut    = 'surat_korespondensi_surat IS NOT NULL';
        $filter_blmtindaklanjut = 'surat_korespondensi_surat IS NULL';

        $_filter[$filter_distribusi]    = null;
        $_filterblm = $_filter;
        $_filterblm[$filter_blmtindaklanjut] = null;
        $_filter[$filter_tindaklanjut]  = null;

        if($param_unitkerja) $_filter['surat_unit'] = $_filterblm['surat_unit'] = $param_unitkerja;

        // don't change the sorting //
        $model_surat = array(
                'm_surat_masuk_aktif_view'   => $def_color[$m_surat::MODEL_MASUK]['surat_model'],
                'm_surat_keluar_aktif_view'  => $def_color[$m_surat::MODEL_KELUAR]['surat_model'],
                'm_surat_imasuk_aktif_view'  => $def_color[$m_surat::MODEL_IMASUK]['surat_model'],
                'm_surat_ikeluar_aktif_view' => $def_color[$m_surat::MODEL_IKELUAR]['surat_model']
            );

        if($mode == 'pie'){
            foreach($model_surat as $model => $series){
                $sudah[$series] = $this->$model->count_exist($_filter, null, null, null, array('surat_tanggal'=> 'desc'));
                $belum[$series] = $this->$model->count_exist($_filterblm, null, null, null, array('surat_tanggal'=> 'desc'));
            }

            $data['sudah']  = array_sum(array_values($sudah));
            $data['belum']  = array_sum(array_values($belum));
            $total          = $data['sudah'] + $data['belum'];

            $chartConfig = $m_report->generateChart(array(
                    'type'          => $mode,
                    'data'          => array($data),
                    'width'         => 600,
                    'height'        => 400,
                    'title'         => $chart_title,
                    'titlelocation' => 'left',
                    'uselegend'     => true,
                ), true);
        }else{
            foreach($model_surat as $model => $series){
                $data[$series]['belum'] = $this->$model->count_exist($_filterblm, null, null, null, array('surat_tanggal'=> 'desc'));
                $data[$series]['sudah'] = $this->$model->count_exist($_filter, null, null, null, array('surat_tanggal'=> 'desc'));
            }

            $parsed = array();
            $no = 1;
            foreach($data as $tipe => $counted){
                $title = explode(' ', strtolower($tipe));
                $title[1] = substr($title[1], 0, 3);
                $title = implode('_', $title);
                foreach($counted as $kc => $vc){
                    $parsed[$kc]['title'] = $kc;
                    $parsed[$kc][$title] = $vc;
                    if(! array_key_exists('bg_color', $parsed[$kc])){
                        $parsed[$kc]['bg_color'] = ($no % 2 == 0) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                        $no++;
                    }
                }
            }

            $chartConfig = $m_report->generateChart(array(
                    'type'          => $mode,
                    'data'          => $data,
                    'width'         => 600,
                    'height'        => 400,
                    'title'         => ' ',
                    'barcolor'      => array_column($def_color, 'color'),
                    'titlelocation' => 'left',
                    'uselegend'     => true,
                    'legendtitle'   => array_values($model_surat)
                ), true);

            $unit_nama = ($param_unitkerja) ? $m_unitkerja->read($param_unitkerja)['unit_nama'] : '<span style="font-style:italic;">(Tidak Ada Filter)</span>';
            $data = array(array('unit_nama'=> $unit_nama, 'type'=>'Proses Tindak Lanjut', 'value'=> $parsed));
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title ;
        $report_data = array(
            'title'         => $report_title,
            'subtitle'      => $report_subtitle,
            'header'        => $m_report->generateHeader($download, $this::$chart_colspan),
            'periode'       => $m_report->generatePeriode($filter, $filterValue),
            'chart'         => ($excel) ? array() : $chartConfig,
            'data'          => $data,
            'dateReport'    => date('d-m-Y H:i:s'),
            'dateReportFormated'    => date('d M Y H:i'),
            'operator'      => $user[$m_account->field_display]
        );

        $filename = $report_title.$m_report->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$chart_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $filename);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function chart_surat_topurgent() {
        $m_surat    = $this->m_surat_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = varGet('value');
        $download           = varGet('download', 0);
        $excel              = varGet('excel', 0);
        $param_unitkerja    = varGet('unit');
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $prioritas_color    = $m_report::$prioritas_color;

        $user       = $m_account->get_profile();
        $unitnama   = ($param_unitkerja) ? $m_unitkerja->read($param_unitkerja)['unit_nama'] : '';

        $report_subtitle    = $this::$chart_topurgent_template_subtitle.' '.$unitnama;

        $surat_model    = array(
                            $m_surat::MODEL_MASUK   => 'masuk eks',
                            $m_surat::MODEL_IMASUK  => 'masuk int',
                            $m_surat::MODEL_KELUAR  => 'keluar eks',
                            $m_surat::MODEL_IKELUAR => 'keluar int'
                        );

        if(strtolower($download) == 'false') $download = 0;

        $_filter = array();

        $filter_aktif = "(surat_properti_ishapus = 0) AND ((IFNULL(surat_useretensi, 0) = 0) OR (IFNULL(surat_useretensi, 0) = 1) AND (DATE_FORMAT(surat_tanggal, '%Y-%m-%d') >= CURDATE()))";

        $_filter[$m_surat::$field_distribusi_lookup]        = $m_surat::DISTRIBUSI_DISTRIBUSI;
        $_filter['surat_prioritas IS NOT NULL']             = null;
        $_filter[$filter_aktif] = null;
        if ($param_unitkerja) $_filter['surat_unit']        = $param_unitkerja;
        if ($filterValue) $_filter['YEAR(surat_tanggal)']   = $filterValue;

        $surat_recs = $m_surat->find($_filter, null, null, null, null);

        $data = array();
        $count = array_fill_keys(array_keys($prioritas_color), array());
        foreach($surat_recs as $key => $val){
            $data[$val['prioritas_nama']][] = $val;

            if(! array_key_exists($val['prioritas_nama'], $count)){
                $count[$val['prioritas_nama']] = array();
            }else{
                
                if( ! array_key_exists($surat_model[$val['surat_model']], $count[$val['prioritas_nama']])){
                    $count[$val['prioritas_nama']] = array_fill_keys(array_values($surat_model), 0);
                }

                $count[$val['prioritas_nama']][$surat_model[$val['surat_model']]]++;
            }
        }

        $datachart      = array_values($count);
        $legendtitle    = array_keys($count);
        $unit_nama = ($param_unitkerja) ? $m_unitkerja->read($param_unitkerja)['unit_nama'] : '<span style="font-style:italic;">(Tidak Ada Filter)</span>';

        if($count){
            $count = array_filter($count);
            ksort($count);
            $countData = 0;
            $no = 0;
            foreach($count as $title => &$records){
                $records['title'] = $title;
                $records['bg_color'] = ($no % 2 == 0 ) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                foreach($records as $krec => &$vrec){
                    $key = strtolower(str_replace(' ', '_', $krec));
                    $records[$key] = $vrec;
                    $countData++;
                }
                $no++;
            }
            $data = array(array('unit_nama'=> $unit_nama, 'type'=>'Prioritas', 'value'=> $count));
        }else{
            $default = array_values($surat_model);
            $default = array_map(function($key){
                return str_replace(' ', '_', $key);
            }, $default);
            $data = array(array('unit_nama'=> $unit_nama, 'value'=>array(array_fill_keys($default, 0))));
            $data[0]['value'][0]['title'] = '<span style="font-style:italic; color:gray;">(Tidak ada data)</span>';
            $countData = 0;
        }

        if($countData > 0){
            $chartConfig = $m_report->generateChart(array(
                    'type'          => 'stacked',
                    'data'          => $datachart,
                    'width'         => 600,
                    'height'        => 600,
                    'title'         => ' ',
                    'barcolor'      => array_values($prioritas_color),
                    'titlelocation' => 'left',
                    'uselegend'     => true,
                    'legendtitle'   => $legendtitle
                ), true);
        }else{
            $chartConfig = array();
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'         =>  $report_title,
            'subtitle'      =>  $report_subtitle,
            'header'        =>  $m_report->generateHeader($download, $this::$chart_colspan),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'data'          =>  $data,
            'chart'         =>  ($excel) ? array() : $chartConfig,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $filename = $report_title.$m_report->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$chart_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $filename);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function rekap_surat_masuk() {
        $m_surat    = $this->m_surat;
        $m_surat_masuk_rekap = $this->m_surat_masuk_rekap_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel',0);
        $param_unitkerja    = varGet('unit');
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $chart_title        = ($filterValue) ? strtoupper('Grafik Surat Masuk Tahun '.$filterValue) : ' ';
        $unitnama           = $m_unitkerja->read($param_unitkerja)['unit_nama'];

        $user = $m_account->get_profile();
        
        $_filter = array();
        array_unshift($_filter, array('type'=>'exact', 'field'=>'tahun', 'value'=>$filterValue));

        $sorter = array();
        array_unshift($sorter, array('property'=>'unit_nama', 'direction'=>'ASC'));
        $data = $m_surat_masuk_rekap->select(array('filter'=>json_encode($_filter), 'sorter'=>json_encode($sorter)));

        $user = $m_account->get_profile();
        
        if($data['total'] > 0){
            $type   = array('internal', 'eksternal');
            $month  = $this::$month;
            $grouped = array();
            $data = $data['data'];
            $int = array();
            foreach($data as $kdata => $vdata){
                $kunit = $vdata['unit_kode'];
                $grouped[$kunit]['unit_nama']  = ucwords(strtolower($vdata['unit_nama']));
                if(! array_key_exists('no', $grouped[$kunit])) $grouped[$kunit]['no'] = count($grouped);
                $grouped[$kunit]['bg_color'] = ($grouped[$kunit]['no'] %2 == 0) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                foreach($type as $rowtype){
                    $ktype = substr($rowtype, 0, 3);
                    foreach($month as $kmonth => $vmonth){
                        $_kmonth = strtolower(substr($vmonth, 0, 3));
                        $kvalue = $ktype.'_'.$_kmonth;
                        if($vdata['tipe'] == $rowtype && $vdata['bulan'] == $kmonth){
                            $grouped[$kunit][$kvalue] = $vdata['jumlah_surat'];
                        }
                        if(! array_key_exists($kvalue, $grouped[$kunit])) $grouped[$kunit][$kvalue] = 0;
                    }
                    $_ktype = $ktype.'_total';
                    if( ! array_key_exists($_ktype,$grouped[$kunit])) $grouped[$kunit][$_ktype] = 0;

                    $grouped[$kunit][$_ktype] += ($rowtype == $vdata['tipe']) ? $vdata['jumlah_surat'] : 0;
                }
                if( ! array_key_exists('total', $grouped[$kunit])){
                    $grouped[$kunit]['total'] = 0;
                }
                $grouped[$kunit]['total'] += $vdata['jumlah_surat'];
            }
        }else{
            $grouped = array(
                array(
                    'unit_nama' => $this::$default_value['nodata'], 'no' => 1,
                    'int_jan'=>0, 'int_feb'=>0, 'int_mar'=>0, 'int_apr'=>0, 'int_may'=>0, 'int_jun'=>0, 'int_jul'=>0, 'int_aug'=>0, 
                    'int_sep'=>0, 'int_oct'=>0, 'int_nov'=>0, 'int_dec'=>0, 'int_total'=>0, 'eks_jan'=>0, 'eks_feb'=>0, 'eks_mar'=>0, 
                    'eks_apr'=>0, 'eks_may'=>0, 'eks_jun'=>0, 'eks_jul'=>0, 'eks_aug'=>0, 'eks_sep'=>0, 'eks_oct'=>0, 'eks_nov'=>0, 
                    'eks_dec'=>0, 'eks_total'=>0, 'total'=>0
                )
            );
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'         =>  $report_title,
            'subtitle'      =>  $this::$rekap_masuk_template_subtitle.' '.$filterValue,
            'header'        =>  $m_report->generateHeader($download, 16),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'rekap'         =>  $grouped,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $filename = $report_title.$m_report->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$rekap_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $filename);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function rekap_surat_keluar() {
        $m_surat                    = $this->m_surat;
        $m_surat_keluar_rekap_view  = $this->m_surat_keluar_rekap_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel',0);
        $param_unitkerja    = varGet('unit');
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $unitnama           = $m_unitkerja->read($param_unitkerja)['unit_nama'];
        $user = $m_account->get_profile();

        $_filter = array();
        array_unshift($_filter, array('type'=>'exact', 'field'=>'tahun', 'value'=>$filterValue));

        $sorter = array();
        array_unshift($sorter, array('property'=>'unit_nama', 'direction'=>'ASC'));
        $data = $m_surat_keluar_rekap_view->select(array('filter'=>json_encode($_filter), 'sorter'=>json_encode($sorter)));

        $user = $m_account->get_profile();
        
        if($data['total'] > 0){
            $type   = array('internal', 'eksternal');
            $month  = $this::$month;
            $grouped = array();
            $data = $data['data'];
            $int = array();
            foreach($data as $kdata => $vdata){
                $kunit = $vdata['unit_kode'];
                $grouped[$kunit]['unit_nama']  = ucwords(strtolower($vdata['unit_nama']));
                if(! array_key_exists('no', $grouped[$kunit])) $grouped[$kunit]['no'] = count($grouped);
                $grouped[$kunit]['bg_color'] = ($grouped[$kunit]['no'] %2 == 0) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                foreach($type as $rowtype){
                    $ktype = substr($rowtype, 0, 3);
                    foreach($month as $kmonth => $vmonth){
                        $_kmonth = strtolower(substr($vmonth, 0, 3));
                        $kvalue = $ktype.'_'.$_kmonth;
                        if($vdata['tipe'] == $rowtype && $vdata['bulan'] == $kmonth){
                            $grouped[$kunit][$kvalue] = $vdata['jumlah_surat'];
                        }
                        if(! array_key_exists($kvalue, $grouped[$kunit])) $grouped[$kunit][$kvalue] = 0;
                    }
                    $_ktype = $ktype.'_total';
                    if( ! array_key_exists($_ktype,$grouped[$kunit])) $grouped[$kunit][$_ktype] = 0;

                    $grouped[$kunit][$_ktype] += ($rowtype == $vdata['tipe']) ? $vdata['jumlah_surat'] : 0;
                }
                if( ! array_key_exists('total', $grouped[$kunit])){
                    $grouped[$kunit]['total'] = 0;
                }
                $grouped[$kunit]['total'] += $vdata['jumlah_surat'];
            }
        }else{
            $grouped = array(
                array(
                    'unit_nama' => $this::$default_value['nodata'], 'no' => 1,
                    'int_jan'=>0, 'int_feb'=>0, 'int_mar'=>0, 'int_apr'=>0, 'int_may'=>0, 'int_jun'=>0, 'int_jul'=>0, 'int_aug'=>0, 
                    'int_sep'=>0, 'int_oct'=>0, 'int_nov'=>0, 'int_dec'=>0, 'int_total'=>0, 'eks_jan'=>0, 'eks_feb'=>0, 'eks_mar'=>0, 
                    'eks_apr'=>0, 'eks_may'=>0, 'eks_jun'=>0, 'eks_jul'=>0, 'eks_aug'=>0, 'eks_sep'=>0, 'eks_oct'=>0, 'eks_nov'=>0, 
                    'eks_dec'=>0, 'eks_total'=>0, 'total'=>0
                )
            );
        }


        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title ;
        $report_data = array(
            'title'         =>  $report_title,
            'subtitle'      =>  $this::$rekap_keluar_template_subtitle.' '.$filterValue,
            'header'        =>  $m_report->generateHeader($download, 16),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'rekap'         =>  $grouped,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $filename = $report_title.$m_report->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$rekap_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $filename);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function rekap_retensi() {
        $m_surat    = $this->m_surat;
        $m_masuk    = $this->m_surat_masuk_view;
        $m_imasuk   = $this->m_surat_imasuk_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $m_rekap_surat_retensi = $this->m_surat_retensi_rekap_view;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel',0);
        $param_unitkerja    = varGet('unit');
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $_filter = array();
        array_unshift($_filter, array('type'=>'exact', 'field'=>'tahun', 'value'=>$filterValue));

        $sorter = array();
        array_unshift($sorter, array('property'=>'unit_nama', 'direction'=>'ASC'));
        $data = $m_rekap_surat_retensi->select(array('filter'=>json_encode($_filter), 'sorter'=>json_encode($sorter)));

        $user = $m_account->get_profile();
        
        if($data['total'] > 0){
            $type   = array('internal', 'eksternal');
            $month  = $this::$month;
            $grouped = array();
            $data = $data['data'];
            $int = array();
            foreach($data as $kdata => $vdata){
                $kunit = $vdata['unit_kode'];
                $grouped[$kunit]['unit_nama']  = ucwords($vdata['unit_nama']);
                if(! array_key_exists('no', $grouped[$kunit])) $grouped[$kunit]['no'] = count($grouped);
                $grouped[$kunit]['bg_color'] = ($grouped[$kunit]['no'] %2 == 0) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                foreach($type as $rowtype){
                    $ktype = substr($rowtype, 0, 3);
                    foreach($month as $kmonth => $vmonth){
                        $_kmonth = strtolower(substr($vmonth, 0, 3));
                        $kvalue = $ktype.'_'.$_kmonth;
                        if($vdata['tipe'] == $rowtype && $vdata['bulan'] == $kmonth){
                            $grouped[$kunit][$kvalue] = $vdata['jumlah_surat'];
                        }
                        if(! array_key_exists($kvalue, $grouped[$kunit])) $grouped[$kunit][$kvalue] = 0;
                    }
                    $_ktype = $ktype.'_total';
                    if( ! array_key_exists($_ktype,$grouped[$kunit])) $grouped[$kunit][$_ktype] = 0;

                    $grouped[$kunit][$_ktype] += ($rowtype == $vdata['tipe']) ? $vdata['jumlah_surat'] : 0;
                }
                if( ! array_key_exists('total', $grouped[$kunit])){
                    $grouped[$kunit]['total'] = 0;
                }
                $grouped[$kunit]['total'] += $vdata['jumlah_surat'];
            }
        }else{
            $grouped = array(array('unit_nama' => $this::$default_value['nodata'], 'no' => 1,
                            'int_jan'=>0, 'int_feb'=>0, 'int_mar'=>0, 'int_apr'=>0, 'int_may'=>0, 'int_jun'=>0, 'int_jul'=>0, 'int_aug'=>0, 
                             'int_sep'=>0, 'int_oct'=>0, 'int_nov'=>0, 'int_dec'=>0, 'int_total'=>0, 'eks_jan'=>0, 'eks_feb'=>0, 'eks_mar'=>0, 
                             'eks_apr'=>0, 'eks_may'=>0, 'eks_jun'=>0, 'eks_jul'=>0, 'eks_aug'=>0, 'eks_sep'=>0, 'eks_oct'=>0, 'eks_nov'=>0, 
                             'eks_dec'=>0, 'eks_total'=>0, 'total'=>0));
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0]  : $report_title;
        $report_data = array(
            'title'         =>  $report_title,
            'subtitle'      =>  $this::$rekap_retensi_template_subtitle.' '.$filterValue,
            'header'        =>  $m_report->generateHeader($download, 16),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'rekap'         =>  $grouped,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $filename = $report_title.$m_report->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$rekap_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $filename);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function chart_eksternal_bulanan() {
        $m_surat    = $this->m_surat_view;
        $m_masuk   = $this->m_surat_masuk_aktif_view;
        $m_keluar  = $this->m_surat_keluar_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y-m');
        $download           = varGet('download',0);
        $param_unitkerja    = varGet('unit');

        $unitnama           = $m_unitkerja->read($param_unitkerja)['unit_nama'];
        $explode            = explode('-', $filterValue);
        $chart_title        = ($filterValue) ? strtoupper('Grafik Surat Eksternal Bulan '.$this::$month[intval($explode[1])].' Tahun '.$explode[0]) : ' ';

        $user = $m_account->get_profile();
        $unitkerja  = array();
        if( ! $param_unitkerja){
            $filter_unit = array();
            array_unshift($filter_unit, array('type'=>'custom', 'value'=> 'YEAR(surat_tanggal) = '.$explode[0]));
            array_unshift($filter_unit, array('type'=>'custom', 'value'=> 'MONTH(surat_tanggal) = '.$explode[1]));
            array_unshift($filter_unit, array('type'=>'exact',  'value'=> 1, 'field'=> $m_surat::$field_distribusi_lookup));
            array_unshift($filter_unit, array('type'=>'custom', 'value'=> 'surat_model IN('.$m_surat::MODEL_MASUK.', '.$m_surat::MODEL_KELUAR.')'));
            $filter_surat = array(
                                'filter'    => json_encode($filter_unit),
                                'fields'    => array('unit_id', 'unit_nama'),
                                'sort'      => 'unit_nama'
                        );

            $sim_recs    = $m_masuk->select($filter_surat)['data'];
            $sik_recs    = $m_keluar->select($filter_surat)['data'];

            $recs = array_merge($sim_recs, $sik_recs);
            $unitkerja = array_map("unserialize", array_unique(array_map("serialize", $recs))); // remove duplicate values
        }else{
            // array_push($unitkerja, $m_unitkerja->read($param_unitkerja));// add to array for compatibility with all unit
            $unitkerja = $m_unitkerja->read($param_unitkerja);
        }

        $weeks = $this->get_week($filterValue);

        $_filter = array();
        $_filter[$m_surat::$field_distribusi_lookup] = $m_surat::DISTRIBUSI_DISTRIBUSI;

        $chartData = array();
        // foreach($unitkerja as $unit_key => $unit_val){
        //     $_filter['surat_unit'] = $unit_val['unit_id'];
        $value   = array();
        foreach($weeks as $week_key => $week_val){
            $filter_date = "DATE(surat_tanggal) IN ('".implode("', '", $week_val)."')";
            $_filter['surat_unit'] = $unitkerja['unit_id'];
            $_filter[$filter_date] = null;

            $value['masuk']['W'.$week_key]  = $m_masuk->count_exist($_filter);
            $value['keluar']['W'.$week_key] = $m_keluar->count_exist($_filter);

            unset($_filter[$filter_date]);
        }
        // }

        $chartData      = array_values($value);
        $chartLegend    = array_keys($value);

        $chart64mode = $m_report->generateChart(array(
                    'type'          => 'line',
                    'data'          => $chartData,
                    'width'         => 600,
                    'height'        => 400,
                    'title'         => $chart_title,
                    'titlelocation' => 'left',
                    'linecolor'     => array('#2196F3', '#F44336'),
                    'uselegend'     => true,
                    'legendtitle'   => $chartLegend
                ), true);

        $report_data = array(
            'title'         =>  $this::$chart_eksternal_bulanan_template_title,
            'subtitle'      =>  $this::$chart_eksternal_bulanan_template_subtitle,
            'header'        =>  $m_report->generateHeader($download),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'chart'         =>  $chart64mode,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$chart_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$chart_eksternal_bulanan_filename_download.date('dmy'), true);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function chart_eksternal_harian() {
        $m_surat   = $this->m_surat_view;
        $m_masuk   = $this->m_surat_masuk_aktif_view;
        $m_keluar  = $this->m_surat_keluar_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y-m-d');
        $download           = varGet('download',0);
        $param_unitkerja    = varGet('unit');

        $explode            = explode('|', $filterValue);

        if($filter == 'daterange'){
            $daterange = $this->get_date_range($explode[0], $explode[1]);
        }else{
            $daterange = array($explode[0]);
        }

        $user       = $m_account->get_profile();
        $unitkerja  = $m_unitkerja->read($param_unitkerja);

        $_filter = array();
        $_filter[$m_surat::$field_distribusi_lookup] = $m_surat::DISTRIBUSI_DISTRIBUSI;

        $chartData = array();
        $value   = array();

        foreach($daterange as $date_key => $date_val){
            $_filter['surat_unit'] = $unitkerja['unit_id'];
            $_filter['DATE(surat_tanggal)'] = $date_val;

            $series = $date_val;

            $value['masuk'][$series]  = $m_masuk->count_exist($_filter);
            $value['keluar'][$series] = $m_keluar->count_exist($_filter);

        }

        $chartData      = array_values($value);
        $chartLegend    = array_keys($value);
        $chart_title    = 'Grafik Jumlah Surat Eksternal Periode '.$m_report->generatePeriode($filter, $filterValue);

        $chart64mode = $m_report->generateChart(array(
                    'type'          => 'line',
                    'data'          => $chartData,
                    'width'         => 900,
                    'height'        => 450,
                    'title'         => $chart_title,
                    'titlelocation' => 'left',
                    'linecolor'     => array('#2196F3', '#F44336'),
                    'uselegend'     => true,
                    'legendtitle'   => $chartLegend
                ), true);

        $report_data = array(
            'title'         =>  $this::$chart_eksternal_harian_template_title,
            'subtitle'      =>  $this::$chart_eksternal_harian_template_subtitle,
            'header'        =>  $m_report->generateHeader($download),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'chart'         =>  $chart64mode,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$chart_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$chart_eksternal_harian_filename_download.date('dmy'), true);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function dashboard() {
        
    }

    public function get_last_date($date) {
        $date   = explode(' ', $date)[0];
        $d      = new DateTime($date);

        return $d->format('Y-m-t');
    }

    public function get_week($data){
        $filter_    = ($data) ? explode('-', $data) : null;

        $month      = ($filter_) ? $filter_[1] : null;
        $year       = ($filter_) ? $filter_[0] : null;

        $month      = ($month) ? $month : date('m');
        $year       = ($year) ? $year : date('Y');
        $date_ranges    = array();

        $date_start     = $year.'-'.$month.'-01';
        $date_end       = date("Y-m-t H:i", strtotime($date_start.' 23:59'));

        $start      = new DateTime($date_start);
        $end        = new DateTime($date_end);

        $interval   = new DateInterval('P1D');
        $dateRange  = new DatePeriod($start, $interval, $end);

        $weekNumber = 1;
        $weeks = array();

        foreach ($dateRange as $date) {
            $weeks[$weekNumber][] = $date->format('Y-m-d');        
            if ($date->format('w') == 6) {
                $weekNumber++;
            }
        }

        return $weeks;
    }

    public function get_date_range($start, $end) {
        $period = new DatePeriod(
             new DateTime($start),
             new DateInterval('P1D'),
             new DateTime($end)
        );

        $range = array();
        foreach ($period as $key => $value) {
            $range[] = $value->format('Y-m-d');
        }

       return $range;
    }
}