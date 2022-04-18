<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Pelaporan_sla extends Base_Controller 
{
    protected $message = array();
    
    static $month  = array(
            1=>'January',   2=>'February',  3=>'March',     4=>'April',     5=>'May',       6=>'June', 
            7=>'July',      8=>'August',    9=>'September', 10=>'October',  11=>'November', 12=>'December'
        );

    static $bg_color_item_laporan = array('odd'=> 'background-color: #F5F5F5;', 'even'=> 'background-color: #FFFFFF;');
    static $font_color_item_laporan = array('excel'=> 'color:#000000;', 'other'=>'color:#FFFFFF;');

    static $sla_daftar_template             = 'sipas/sla/list';
    static $sla_daftar_proses_template      = 'sipas/sla/list_proses';
    static $sla_daftar_tolak_template       = 'sipas/sla/list_tolak';
    static $sla_rekap_kumulatif_template    = 'sipas/sla/rekap_kumulatif';

    static $sla_request_template_title      = 'Daftar Surat Request SLA';
    static $sla_request_template_subtitle   = 'Semua surat masuk yang menggunakan penilaian SLA';
    static $sla_request_filename_download   = 'Daftar_sla_request_';

    static $sla_proses_template_title      = 'Daftar Surat SLA Dalam Proses';
    static $sla_proses_template_subtitle   = 'Semua surat masuk yang menggunakan penilaian SLA dan berstatus masih dalam proses';
    static $sla_proses_filename_download   = 'Daftar_sla_proses_';

    static $sla_selesai_template_title      = 'Daftar Surat SLA Proses Selesai';
    static $sla_selesai_template_subtitle   = 'Semua surat masuk yang menggunakan penilaian SLA dan berstatus selesai';
    static $sla_selesai_filename_download   = 'Daftar_sla_selesai_';

    static $sla_tolak_template_title      = 'Daftar Surat SLA Ditolak';
    static $sla_tolak_template_subtitle   = 'Semua surat masuk yang menggunakan penilaian SLA yang ditolak';
    static $sla_tolak_filename_download   = 'Daftar_sla_tolak_';

    static $sla_unit_template_title      = 'Daftar Kumulatif Nilai SLA';
    static $sla_unit_template_subtitle   = 'Nilai SLA kumulatif surat keluar unit kerja yang menggunakan SLA';
    static $sla_unit_filename_download   = 'Daftar_sla_unit_';

    static $default_value  = array(
                                        'empty' => '<span style="color:grey; font-style:italic;">(dalam proses)</span>',
                                        'nodata' =>'<span style="color:grey; font-style:italic;">(Tidak Ada Data)</span>',
                                        'agenda' => '<span style="color:grey; font-style:italic;">(Tidak memiliki agenda)</span>',
                                        'nosurat' => '<span style="color:grey; font-style:italic;">(Belum diberi nomor)</span>',
                                        'perihal' => '<span style="color:grey; font-style:italic;">(tidak memiliki perihal)</span>',
                                        'dari' => '<span style="color:grey; font-style:italic;">(tidak memiliki pengirim)</span>',
                                        'kepada' => '<span style="color:grey; font-style:italic;">(tidak memiliki tujuan)</span>',
                                        'tolaktgl' => '<span style="color:grey; font-style:italic;">(tidak memiliki tanggal tolak)</span>',
                                        'keternagan' => '<span style="color:grey; font-style:italic;">(tidak memiliki keterangan)</span>',
                                );

    static $template_surat = array(
                                'no'=> 1, 
                                'surat_agenda_parsed'   => null, 
                                'surat_nomor'           => null,
                                'surat_perihal'         => null,
                                'surat_pengirim'        => null,
                                'penyetuju_unit_nama'   => null,
                                'surat_setuju_rentang'  => null,    
                                'surat_sla_nilai'       => null,
                                'surat_sla_tgl'         => null,
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

        $this->m_surat_imasuk_view              = $this->model('sipas/surat_imasuk_view',               true);
        $this->m_surat_imasuk_hidup_view        = $this->model('sipas/surat_imasuk_hidup_view',         true);
        $this->m_surat_imasuk_aktif_view        = $this->model('sipas/surat_imasuk_aktif_view',         true);
        $this->m_surat_imasuk_nonaktif_view     = $this->model('sipas/surat_imasuk_nonaktif_view',      true);
        $this->m_surat_imasuk_unapproved_view   = $this->model('sipas/surat_imasuk_unapproved_view',    true);
        $this->m_surat_imasuk_approved_view     = $this->model('sipas/surat_imasuk_approved_view',      true);
        $this->m_surat_imasuk_pending_view      = $this->model('sipas/surat_imasuk_pending_view',       true);
        $this->m_surat_imasuk_tolak_view        = $this->model('sipas/surat_imasuk_tolak_view',         true);

        $this->m_surat_ikeluar_view         = $this->model('sipas/surat_ikeluar_view',          true);
        $this->m_surat_ikeluar_aktif_view   = $this->model('sipas/surat_ikeluar_aktif_view',    true);
        $this->m_surat_ikeluar_setuju_view  = $this->model('sipas/surat_ikeluar_setuju_view',   true);
        $this->m_surat_keluar_setuju_view   = $this->model('sipas/surat_ikeluar_nonaktif_view', true);

        $this->m_unit               = $this->model('sipas/unit_view',            true);
        $this->m_unit_cakupan       = $this->model('sipas/unit_cakupan',         true);
        $this->m_unit_cakupan_view  = $this->model('sipas/unit_cakupan_view',    true);
    }

    public function report_sla_request() {
        $m_surat    = $this->m_surat;

        $m_imasuk   = $this->m_surat_imasuk_aktif_view;
        $m_ikeluar  = $this->m_surat_ikeluar_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel', 0);
        $param_unitkerja    = varGet('unit');

        $user = $m_account->get_profile();
        $unitkerja  = array();
        if( ! $param_unitkerja){
            $filter_unit = array();
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> $m_surat::$field_distribusi_lookup));
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> 'surat_usesla'));
            array_unshift($filter_unit, array('type'=>'custom', 'value'=> 'YEAR(surat_tanggal) = '.$filterValue));
            $filter_surat = array(
                                'filter'    => json_encode($filter_unit),
                                'fields'    => array('unit_id', 'unit_nama'),
                                'sort'      => 'unit_nama'
                        );

            $sm_recs    = $m_masuk->select($filter_surat)['data'];
            $sim_recs   = $m_imasuk->select($filter_surat)['data'];

            $recs = array_merge($sm_recs, $sim_recs);
            $unitkerja = array_map("unserialize", array_unique(array_map("serialize", $recs)));
        }else{
            $unitkerja = array($m_unitkerja->read($param_unitkerja));
        }

        $_filter     = array();

        switch (strtolower($filter)) {
                case 'date':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) = '".$filterValue."'"));
                    break;

                case 'daterange':
                        $daterange = explode('|', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) >= '".$daterange[0]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) <= '".$daterange[1]."'"));
                    break;

                case 'beforedate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) < '".$filterValue."'"));
                    break;

                case 'afterdate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) > '".$filterValue."'"));
                    break;

                case 'month':
                        $month = explode('-', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"MONTH(surat_tanggal) = '".(int)$month[1]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".(int)$month[0]."'"));
                    break;

                case 'year':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".$filterValue."'"));
                    break;
                default:
                    break;
            }

        $sorter = array();
        array_unshift($sorter, array('property'=>'surat_agenda', 'direction'=>'ASC'));

        $no = 1;
        foreach($unitkerja as $unit_key => &$unit_val){
            // $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1 AND surat_unit = '".$unit_val['unit_id']."'";
            $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $subquery2  = "SELECT surat_korespondensi FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $query      = array('type'=>'custom', 'value'=> "surat_korespondensi_surat IN (".$subquery.") AND surat_korespondensi IN (".$subquery2.") AND surat_usesla = 1 AND surat_sla IS NOT NULL AND surat_unit = '".$unit_val['unit_id']."'");

            array_unshift($_filter, $query);
            $sla_req = $m_imasuk->select(array(
                        'filter'    => json_encode($_filter),
                        'sorter'    => json_encode($sorter)
                    ));

            $unit_val['fonthead_color'] = ($excel) ? $this::$font_color_item_laporan['excel'] : $this::$font_color_item_laporan['other'];
            if($sla_req['total'] > 0){
                
                foreach($sla_req['data'] as $sq_key => &$sq_val){
                    $sq_val['no'] = $sq_key + 1;
                    $sq_val['surat_sla_rentang']    = ($sq_val['surat_induk_setuju_tgl'] && $sq_val['surat_sla_nilai']) 
                                                            ? $sq_val['surat_setuju_tgl'].' - '.$sq_val['surat_induk_setuju_tgl'] 
                                                            : $sq_val['surat_setuju_tgl'];

                    $sq_val['surat_sla_nilai']  = $sq_val['surat_sla_nilai'] > 0 ? $sq_val['surat_sla_nilai'] : '';
                    $sq_val['surat_agenda_parsed']     = (empty($sq_val['surat_agenda_sub']))
                                                                ? $sq_val['surat_agenda'] 
                                                                : $sq_val['surat_agenda'].'.'.$sq_val['surat_agenda_sub'];
                    $sq_val['surat_setuju_rentang'] = ($sq_val['surat_sla_nilai'] > 0)  ? $sq_val['surat_setuju_rentang'].' hari' : $this::$default_value['empty'];
                    $sq_val['surat_sla_nilai']  = (! $sq_val['surat_sla_nilai']) ? $this::$default_value['empty'] : $sq_val['surat_sla_nilai'];
                    $sq_val['surat_sla_tgl']    = (! $sq_val['surat_sla_tgl']) ? $this::$default_value['empty'] : date('d-m-y H:i', strtotime($sq_val['surat_sla_tgl']));
                    $sq_val['bg_color'] = ($sq_key % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];

                    $unit_val['surat'][] = $sq_val;
                }
            }else{
                $default = array_fill_keys(array_keys($this::$template_surat), $this::$default_value['nodata']);
                $default['no'] = 1;
                $unit_val['surat'] = array($default);
            }
            $no++;
        }


        $report_data = array(
            'title'                 =>  $this::$sla_request_template_title,
            'subtitle'              =>  $this::$sla_request_template_subtitle,
            'header'                =>  $m_report->generateHeader($download),
            'periode'               =>  $m_report->generatePeriode($filter, $filterValue),
            'unitkerja'             =>  $unitkerja,
            'dateReport'            =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'              =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$sla_daftar_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$sla_request_filename_download.date('dmy'), true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $this::$sla_request_filename_download.date('dmy'));
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function report_sla_proses() {
        $m_surat    = $this->m_surat;

        $m_imasuk   = $this->m_surat_imasuk_aktif_view;
        $m_ikeluar  = $this->m_surat_ikeluar_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel           = varGet('excel',0);
        $param_unitkerja    = varGet('unit');
        $excel              = varGet('excel', 0);

        $user = $m_account->get_profile();
        $unitkerja  = array();
        if( ! $param_unitkerja){
            $filter_unit = array();
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> $m_surat::$field_distribusi_lookup));
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> 'surat_usesla'));
            array_unshift($filter_unit, array('type'=>'custom', 'value'=> 'YEAR(surat_tanggal) = '.$filterValue));
            $filter_surat = array(
                                'filter'    => json_encode($filter_unit),
                                'fields'    => array('unit_id', 'unit_nama'),
                                'sort'      => 'unit_nama'
                        );

            $sm_recs    = $m_masuk->select($filter_surat)['data'];
            $sim_recs   = $m_imasuk->select($filter_surat)['data'];

            $recs = array_merge($sm_recs, $sim_recs);
            $unitkerja = array_map("unserialize", array_unique(array_map("serialize", $recs)));
        }else{
            $unitkerja = array($m_unitkerja->read($param_unitkerja));
        }

        $_filter = array();
        $_filter = $m_report->generateSelectField($filter, $filterValue);

        $sorter = array();
        array_unshift($sorter, array('property'=>'surat_agenda', 'direction'=>'ASC'));

        $no = 1;
        foreach($unitkerja as $unit_key => &$unit_val){
            // $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1 AND surat_unit = '".$unit_val['unit_id']."'";
            $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $subquery2  = "SELECT surat_korespondensi FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $query      = array('type'=>'custom', 'value'=> "surat_korespondensi_surat IN (".$subquery.") AND surat_korespondensi IN (".$subquery2.") AND surat_usesla = 1 AND surat_sla IS NOT NULL AND surat_unit = '".$unit_val['unit_id']."' AND surat_sla_nilai < 1");

            array_unshift($_filter, $query);
            $sla_req = $m_imasuk->select(array(
                        'filter'    => json_encode($_filter),
                        'sorter'    => json_encode($sorter)
                    ));

            if($sla_req['total'] > 0){
                $unit_va['fonthead_color'] = ($excel) ? $this::$font_color_item_laporan['excel'] : $this::$font_color_item_laporan['other'];
                foreach($sla_req['data'] as $sq_key => &$sq_val){
                    $sq_val['no'] = $sq_key + 1;
                    $sq_val['surat_sla_rentang'] = ($sq_val['surat_induk_setuju_tgl'] && $sq_val['surat_sla_nilai']) ? $sq_val['surat_setuju_tgl'].' - '.$sq_val['surat_induk_setuju_tgl'] : $sq_val['surat_setuju_tgl'];
                    $sq_val['surat_agenda_parsed'] = $sq_val['surat_agenda_sub'] ? $sq_val['surat_agenda'].'.'.$sq_val['surat_agenda_sub'] : $sq_val['surat_agenda']; 
                    $sq_val['surat_agenda_parsed'] = $sq_val['surat_agenda_parsed'] ? $sq_val['surat_agenda_parsed'] : $this::$default_value['agenda'];
                    $sq_val['surat_sla_formula'] = htmlspecialchars_decode($sq_val['surat_sla_formula']);
                    $sq_val['surat_sla_nilai'] = $sq_val['surat_sla_nilai'] > 0 ? $sq_val['surat_sla_nilai'] : '';
                    $sq_val['surat_setuju_tgl'] = date('d-m-y H:i', strtotime($sq_val['surat_setuju_tgl']));
                    $sq_val['dalam_proses'] = '<span style="color:grey; font-style:italic;">(dalam proses)</span>';
                    $sq_val['bg_color'] = ($sq_key % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                    $unit_val['surat'][] = $sq_val;
                }
            }else{
                $unit_val['surat'] = array();
                $surat = array_fill_keys(
                            array(
                                'surat_agenda_parsed',
                                'surat_nomor',
                                'surat_perihal',
                                'surat_pengirim',
                                'penyetuju_unit_nama',
                                'surat_setuju_tgl',
                                'dalam_proses'
                            ), $this::$default_value['nodata']);
                $surat['no'] = 1;
                array_unshift($unit_val['surat'], $surat);
            }
            $no++;
        }

        $report_data = array(
            'title'                 =>  $this::$sla_proses_template_title,
            'subtitle'              =>  $this::$sla_proses_template_subtitle,
            'header'                =>  $m_report->generateHeader($download),
            'periode'               =>  $m_report->generatePeriode($filter, $filterValue),
            'unitkerja'             =>  $unitkerja,
            'dateReport'            =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'              =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$sla_daftar_proses_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$sla_proses_filename_download.date('dmy'), true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $this::$sla_proses_filename_download.date('dmy'));
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function report_sla_selesai() {
        $m_surat    = $this->m_surat;

        $m_imasuk   = $this->m_surat_imasuk_aktif_view;
        $m_ikeluar  = $this->m_surat_ikeluar_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $param_unitkerja    = varGet('unit');
        $excel              = varGet('excel', 0);

        $user = $m_account->get_profile();
        $unitkerja  = array();
        if( ! $param_unitkerja){
            $filter_unit = array();
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> $m_surat::$field_distribusi_lookup));
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> 'surat_usesla'));
            array_unshift($filter_unit, array('type'=>'custom', 'value'=> 'YEAR(surat_tanggal) = '.$filterValue));
            $filter_surat = array(
                                'filter'    => json_encode($filter_unit),
                                'fields'    => array('unit_id', 'unit_nama'),
                                'sort'      => 'unit_nama'
                        );

            $sm_recs    = $m_masuk->select($filter_surat)['data'];
            $sim_recs   = $m_imasuk->select($filter_surat)['data'];

            $recs = array_merge($sm_recs, $sim_recs);
            $unitkerja = array_map("unserialize", array_unique(array_map("serialize", $recs)));
        }else{
            $unitkerja = array($m_unitkerja->read($param_unitkerja));
        }

        $_filter     = array();
        switch (strtolower($filter)) {
                case 'date':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) = '".$filterValue."'"));
                    break;

                case 'daterange':
                        $daterange = explode('|', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) >= '".$daterange[0]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) <= '".$daterange[1]."'"));
                    break;

                case 'beforedate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) < '".$filterValue."'"));
                    break;

                case 'afterdate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) > '".$filterValue."'"));
                    break;

                case 'month':
                        $month = explode('-', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"MONTH(surat_tanggal) = '".(int)$month[1]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".(int)$month[0]."'"));
                    break;

                case 'year':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".$filterValue."'"));
                    break;
                default:
                    break;
            }

        $sorter = array();
        array_unshift($sorter, array('property'=>'surat_agenda', 'direction'=>'ASC'));

        $no = 1;
        foreach($unitkerja as $unit_key => &$unit_val){
            // $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1 AND surat_unit = '".$unit_val['unit_id']."'";
            $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $subquery2  = "SELECT surat_korespondensi FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $query      = array('type'=>'custom', 'value'=> "surat_korespondensi_surat IN (".$subquery.") AND surat_korespondensi IN (".$subquery2.") AND surat_usesla = 1 AND surat_sla IS NOT NULL AND surat_unit = '".$unit_val['unit_id']."' AND surat_sla_nilai > 0");

            array_unshift($_filter, $query);
            $sla_req = $m_imasuk->select(array(
                        'filter' => json_encode($_filter),
                        'sorter' => json_encode($sorter)
                    ));

            if($sla_req['total'] > 0){
                $unit_val['fonthead_color'] = ($excel) ? $this::$font_color_item_laporan['excel'] : $this::$font_color_item_laporan['other'];
                foreach($sla_req['data'] as $sq_key => &$sq_val){
                    $sq_val['no'] = $sq_key + 1;
                    $sq_val['surat_sla_rentang']    = ($sq_val['surat_induk_setuju_tgl'] && $sq_val['surat_sla_nilai']) 
                                                            ? $sq_val['surat_setuju_tgl'].' - '.$sq_val['surat_induk_setuju_tgl'] 
                                                            : $sq_val['surat_setuju_tgl'];

                    $sq_val['surat_sla_nilai']  = $sq_val['surat_sla_nilai'] > 0 ? $sq_val['surat_sla_nilai'] : '';
                    $sq_val['surat_agenda_parsed']     = (empty($sq_val['surat_agenda_sub'])) 
                                                                ? $sq_val['surat_agenda'] 
                                                                : $sq_val['surat_agenda'].'.'.$sq_val['surat_agenda_sub'];
                    $sq_val['surat_sla_nilai']  = (! $sq_val['surat_sla_nilai']) ? $this::$default_value['empty'] : $sq_val['surat_sla_nilai'];
                    $sq_val['surat_setuju_rentang'] = $sq_val['surat_setuju_rentang'].' hari';
                    $sq_val['surat_sla_tgl']    = (! $sq_val['surat_sla_tgl']) ? $this::$default_value['empty'] : date('d-m-y H:i', strtotime($sq_val['surat_sla_tgl']));
                    $sq_val['bg_color'] = ($sq_key % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                    $unit_val['surat'][] = $sq_val;
                }
            }else{
                $unit_val['surat'] = array();
                $surat = array_fill_keys(
                            array(
                                'surat_agenda_parsed',
                                'surat_nomor',
                                'surat_perihal',
                                'surat_pengirim',
                                'penyetuju_unit_nama',
                                'surat_setuju_tgl',
                                'dalam_proses',
                                'surat_setuju_rentang',
                                'surat_sla_nilai',
                                'surat_sla_tgl'
                            ), $this::$default_value['nodata']);
                $surat['no'] = 1;
                array_unshift($unit_val['surat'], $surat);
            }
            $no++;
        }

        $report_data = array(
            'title'         =>  $this::$sla_selesai_template_title,
            'subtitle'      =>  $this::$sla_selesai_template_subtitle,
            'header'        =>  $m_report->generateHeader($download),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'unitkerja'     =>  $unitkerja,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    => date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$sla_daftar_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$sla_selesai_filename_download.date('dmy'), true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $this::$sla_selesai_filename_download.date('dmy_His'));
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function report_sla_tolak() {
        $m_surat    = $this->m_surat;

        $m_imasuk   = $this->m_surat_imasuk_aktif_view;
        $m_ikeluar  = $this->m_surat_ikeluar_aktif_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel',0);
        $param_unitkerja    = varGet('unit');

        $user = $m_account->get_profile();
        $unitkerja  = array();

        if( ! $param_unitkerja){
            $filter_unit = array();
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> $m_surat::$field_distribusi_lookup));
            array_unshift($filter_unit, array('type'=>'exact', 'value'=> 1, 'field'=> 'surat_usesla'));
            array_unshift($filter_unit, array('type'=>'custom','value'=> 'surat_sla_tolak_staf IS NOT NULL'));
            array_unshift($filter_unit, array('type'=>'custom', 'value'=> 'YEAR(surat_tanggal) = '.$filterValue));
            $filter_surat = array(
                                'filter'    => json_encode($filter_unit),
                                'fields'    => array('unit_id', 'unit_nama'),
                                'sort'      => 'unit_nama'
                        );

            $sm_recs    = $m_masuk->select($filter_surat)['data'];
            $sim_recs   = $m_imasuk->select($filter_surat)['data'];

            $recs = array_merge($sm_recs, $sim_recs);
            $unitkerja = array_map("unserialize", array_unique(array_map("serialize", $recs)));
        }else{
            $unitkerja = array($m_unitkerja->read($param_unitkerja));
        }

        $_filter     = array();
        switch (strtolower($filter)) {
                case 'date':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) = '".$filterValue."'"));
                    break;

                case 'daterange':
                        $daterange = explode('|', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) >= '".$daterange[0]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) <= '".$daterange[1]."'"));
                    break;

                case 'beforedate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) < '".$filterValue."'"));
                    break;

                case 'afterdate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) > '".$filterValue."'"));
                    break;

                case 'month':
                        $month = explode('-', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"MONTH(surat_tanggal) = '".(int)$month[1]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".(int)$month[0]."'"));
                    break;

                case 'year':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".$filterValue."'"));
                    break;
                default:
                    break;
            }

        $sorter = array();
        array_unshift($sorter, array('property'=>'surat_agenda', 'direction'=>'ASC'));

        $no = 1;
        foreach($unitkerja as $unit_key => &$unit_val){
            // $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1 AND surat_unit = '".$unit_val['unit_id']."'";
            $subquery   = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $subquery   = "SELECT surat_korespondensi FROM v_surat_ikeluar WHERE surat_usesla = 1";
            $query      = array('type'=>'custom', 'value'=> "surat_korespondensi_surat IN (".$subquery.") AND surat_korespondensi IN (".$subquery2.") AND surat_usesla = 1 AND surat_sla_istolak = 1 AND surat_unit = '".$unit_val['unit_id']."'");

            array_unshift($_filter, $query);
            $sla_req = $m_imasuk->select(array(
                        'filter'    => json_encode($_filter),
                        'sorter'   => json_encode($sorter)
                    ));

            if($sla_req['total'] > 0){
                foreach($sla_req['data'] as $sq_key => &$sq_val){
                    $sq_val['no'] = $sq_key + 1;
                    $sq_val['surat_sla_rentang']    = ($sq_val['surat_induk_setuju_tgl'] && $sq_val['surat_sla_nilai']) 
                                                            ? $sq_val['surat_setuju_tgl'].' - '.$sq_val['surat_induk_setuju_tgl'] 
                                                            : $sq_val['surat_setuju_tgl'];

                    $sq_val['surat_sla_nilai']  = $sq_val['surat_sla_nilai'] > 0 ? $sq_val['surat_sla_nilai'] : '';
                    $sq_val['surat_agenda_parsed']     = (empty($sq_val['surat_agenda_sub'])) 
                                                                ? $sq_val['surat_agenda'] 
                                                                : $sq_val['surat_agenda'].'.'.$sq_val['surat_agenda_sub'];
                    $sq_val['surat_sla_nilai']  = (! $sq_val['surat_sla_nilai']) ? $this::$default_value['empty'] : $sq_val['surat_sla_nilai'];
                    $sq_val['surat_sla_tgl']    = (! $sq_val['surat_sla_tgl']) ? $this::$default_value['empty'] : date('d-m-y H:i', strtotime($sq_val['surat_sla_tgl']));
                    $sq_val['surat_sla_tolak_tgl'] = ($sq_val['surat_sla_tolak_tgl']) ? $m_report->date_format($sq_val['surat_sla_tolak_tgl'], 'd-m-Y') : $this::$default_value['empty'] ;
                    $sq_val['surat_sla_tolak_komentar'] = ($sq_val['surat_sla_tolak_komentar']) ? $sq_val['surat_sla_tolak_komentar'] : $this::$default_value['empty'];
                    $sq_val['bg_color'] = ($sq_key % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                    $unit_val['surat'][] = $sq_val;
                }
            }else{
                $unit_val['surat'] = array();
                $surat = array_fill_keys(
                    array(
                        'surat_agenda_parsed', 
                        'surat_nomor',
                        'surat_perihal',
                        'surat_pengirim',
                        'penyetuju_unit_nama',
                        'surat_sla_tolak_tgl',
                        'surat_sla_tolak_komentar'
                    ), $this::$default_value['nodata']);
                $surat['no'] = 1;
                array_unshift($unit_val['surat'], $surat);
            }
            $no++;
        }

        $report_data = array(
            'title'         =>  $this::$sla_tolak_template_title,
            'subtitle'      =>  $this::$sla_tolak_template_subtitle,
            'header'        =>  $m_report->generateHeader($download),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'unitkerja'     =>  $unitkerja,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$sla_daftar_tolak_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$sla_tolak_filename_download.date('dmy'), true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $this::$sla_tolak_filename_download.date('dmy'));
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    public function report_sla_kumulatif() {
        $m_surat    = $this->m_surat;

        $m_imasuk   = $this->m_surat_imasuk_view;
        $m_ikeluar  = $this->m_surat_ikeluar_view;

        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_unitkerja    = $this->m_unit;

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel', 0);
        $param_unitkerja    = varGet('unit');


        $user = $m_account->get_profile();
        $unitkerja  = array();

        $_filter = array();

        $filter_unit = ( ! empty($param_unitkerja)) ? "AND surat_unit = '".$param_unitkerja."'" : '';

        switch (strtolower($filter)) {
                case 'date':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) = '".$filterValue."'"));
                    break;

                case 'daterange':
                        $daterange = explode('|', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) >= '".$daterange[0]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) <= '".$daterange[1]."'"));
                    break;

                case 'beforedate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) < '".$filterValue."'"));
                    break;

                case 'afterdate':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"DATE(surat_tanggal) > '".$filterValue."'"));
                    break;

                case 'month':
                        $month = explode('-', $filterValue);
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"MONTH(surat_tanggal) = '".(int)$month[1]."'"));
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".(int)$month[0]."'"));
                    break;

                case 'year':
                        array_unshift($_filter, array('type'=>'custom', 'value'=>"YEAR(surat_tanggal) = '".$filterValue."'"));
                    break;
                default:
                    break;
            }

        $_filter_surat = $_filter;

        $subquery    = "SELECT surat_korespondensi_surat FROM v_surat_imasuk WHERE surat_usesla = 1 AND surat_sla_nilai > 0";
        $query       = array('type'=>'custom', 'value' => "surat_id IN(".$subquery.") AND surat_usesla = 1 ".$filter_unit);

        array_unshift($_filter, $query);

        $sik_rec = $m_ikeluar->select(array(
            'filter'    => json_encode($_filter),
            'fields'    => array('unit_nama', 'unit_id', 'unit_kode')
        ));

        $unitkerja = array_values(array_map("unserialize", array_unique(array_map("serialize", $sik_rec['data']))));

        if($sik_rec['total'] > 0){
            foreach($unitkerja as $key_unit => &$val_unit){
                $filter_surat   = $_filter_surat;
                $query_unit     = "AND surat_unit = '".$val_unit['unit_id']."'";
                $subquery       = "SELECT surat_id FROM v_surat_ikeluar WHERE surat_usesla = 1 ".$query_unit;
                $query          = array('type' => 'custom', 'value' =>" surat_korespondensi_surat IN(".$subquery.") AND surat_usesla = 1 AND surat_sla_nilai > 0");

                array_unshift($filter_surat, $query);
                $val_unit['no'] = $key_unit + 1;
                $val_unit['bg_color'] = ($key_unit % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $val_unit['surat'] = $m_imasuk->select(array(
                                'filter'    => json_encode($filter_surat),
                                'fields'    => array(
                                                'surat_sla_nilai', 
                                                'surat_sla_tgl', 
                                                'surat_sla_staf', 
                                                'surat_sla_formula', 
                                                'surat_setuju_rentang',
                                                'surat_perihal',
                                                'surat_induk_setuju_tgl'
                                            )
                            ))['data'];

                if(array_key_exists('surat', $val_unit)){
                    $val_unit['count']  = count($val_unit['surat']);
                    $val_unit['sum']    = array_sum(array_column($val_unit['surat'], 'surat_sla_nilai'));
                    $val_unit['avg']    = ($val_unit['count'] > 0) ? $val_unit['sum'] / $val_unit['count'] : 0;
                }
            }
        }else{
            $unitkerja = array();
            $surat = array_fill_keys(array('count','sum','avg'), 0);
            $unit = ($param_unitkerja) ? $m_unitkerja->read($param_unitkerja) : '<span style="color:grey; font-style:italic;">(Tidak ada filter)</span>';
            $surat['no'] = 1;
            $surat['unit_nama'] = (is_array($unit)) ? $unit['unit_nama'] : $unit;
            $surat['unit_kode'] = (is_array($unit)) ? $unit['unit_kode'] : $unit;
            array_unshift($unitkerja, $surat);
        }

        $report_data = array(
            'title'         =>  $this::$sla_unit_template_title,
            'subtitle'      =>  $this::$sla_unit_template_subtitle,
            'header'        =>  $m_report->generateHeader($download),
            'periode'       =>  $m_report->generatePeriode($filter, $filterValue),
            'unitkerja'     =>  $unitkerja,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$m_account->field_display]
        );

        $file = $this->load->view($this::$sla_rekap_kumulatif_template, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $this::$sla_unit_filename_download.date('dmy'), true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $this::$sla_unit_filename_download.date('dmy_His'));
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
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

        $month          = ($month) ? $month : date('m');
        $year           = ($year) ? $year : date('Y');
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

    public function next_date($date = null) {
        if(! $date) return null;

        $date = new DateTime($date);
        $interval = new DateInterval('P1D');
        $date->sub($interval);

        return $date->format('d-m-Y H:i');
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