<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Surat_ulasan extends Base_Controller {

    /**
     * 
        -- script client, database, and server read by surat --

        Penerima :
        - example : "Sipas.pelaporan.internal.rating.penerima.Pane" viewed as surat_imasuk

        Pengirim :
        - example : "Sipas.pelaporan.internal.rating.pengirim.Pane" viewed as surat_ikeluar

        -- all view in pelaporan --
        Penerima : Pemberi Rating
        Pengirim : Penerima Rating
     */

    protected $message = array();

    static $bg_color_item_laporan = array('odd'=> 'background-color: #F5F5F5;', 'even'=> 'background-color: #FFFFFF;');

    static $default_value  = array(
                                        'empty'         => '<span style="color:grey; font-style:italic;">(Tidak ada data)</span>',
                                        'noselect_unit' => '<span style="color:grey; font-style:italic;">(Tidak memilih unit)</span>',
                                        'noselect_tgl'  => '<span style="color:grey; font-style:italic;">(Tidak memilih tanggal)</span>',
                                        'noagenda'      => '<span style="color:grey; font-style:italic;">Tidak memiliki no.agenda</span>',
                                        'nosurat_no'    => '<span style="color:grey; font-style:italic;">(belum diberi nomor surat)</span>',
                                        'nokomentar'    => '<span style="color:grey; font-style:italic;">(Tidak ada komentar)</span>',
                                        'norating'      => '<span style="color:grey; font-style:italic;">(Tidak diberi rating)</span>',
                                        'nostaf'        => '<span style="color:grey; font-style:italic;">(Tidak ada pemberi rating)</span>',
                                        'nounitnama'    => '<span style="color:grey; font-style:italic;">(Tidak ada Pengirim)</span>',
                                        'noperihal'     => '<span style="color:grey; font-style:italic;">(Tidak diberi perihal)</span>',
                                        'noulasantgl'   => '<span style="color:grey; font-style:italic;">(Tidak ada Tanggal Ulasan)</span>',
                                        'nostafrating'  => '<span style="color:grey; font-style:italic;">(Tidak ada Pemberi Rating)</span>',
                                );

    static $template_unit_pengirim = array(
                                'unit_nama' => null,
                                'surat'     => array()
                            );

    static $template_surat = array(
                                'no'            => 1,
                                'surat_agenda'  => null,
                                'surat_nomor'   => null,
                                'unit_pengirim_nama' => null,
                                'surat_perihal' => null,
                                'unit_penilai'  => array()
                            );

    static $template_unit_penerima = array(
                                        'penerima_unit_nama'    => null,
                                        'surat_ulasan_nilai'    => null,
                                        'surat_ulasan_komentar' => null,
                                        'penerima_unit_nama'    => null,
                                        'ulasan_tanggal'        => null,
                                        'ulasan_staf_nama'      => null
                                    );

    static $template_report_penerima            = 'sipas/rating/penerima_list';
    static $template_report_pengirim            = 'sipas/rating/pengirim_list';

    static $template_penerima_title             = 'Daftar Surat Rating Review Sebagai Pemberi Rating';
    static $template_penerima_subtitle          = 'Semua surat yang diberi rating oleh instansi pengguna aplikasi';
    static $template_penerima_filename_download = 'Laporan_pemberi_rating_review_';

    static $template_pengirim_title             = 'Daftar Surat Rating Review Sebagai Penerima Rating';
    static $template_pengirim_subtitle          = 'Semua surat yang mendapat rating dari instansi lain';
    static $template_pengirim_filename_download = 'Laporan_penerima_rating_review_';


	public function __construct(){
        parent::__construct();
        $this->m_surat_ulasan           = $this->model('sipas/surat_ulasan',                true);
        $this->m_surat_ulasan_view      = $this->model('sipas/surat_ulasan_view',           true);
        $this->m_surat                  = $this->model('sipas/surat',                       true);
        $this->m_surat_log              = $this->model('sipas/surat_log',                   true);
        $this->m_surat_ulasan_view      = $this->model('sipas/surat_ulasan_view',           true);
        $this->m_surat_rating_view      = $this->model('sipas/surat_rating_view',           true);
        $this->m_properti               = $this->model('sipas/properti',                    true);
        $this->m_account                = $this->model('sipas/account',                     true);
        $this->m_report                 = $this->model('sipas/report',                      true);

        $this->m_unit                   = $this->model('sipas/unit_view',                   true);
        $this->m_report                 = $this->model('sipas/report',                      true);
        $this->m_asset                  = $this->model('sipas/asset',                       true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_surat_ulasan_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('surat_ulasan_id')){
            $id = varGet('id', varGet('surat_ulasan_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'surat_ulasan_ LIKE "%'.$query.'%" OR surat_ulasan_ LIKE "%'.$query.'%"'
                ));
            }
            array_unshift($sorter, (object)array(
                'property'  => 'surat_ulasan_tgl',
                'direction' => 'DESC'
            ));
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function create($usePayload = true){
        $model = $this->m_surat_ulasan;
        $surat = $this->m_surat; 
        $surat_log = $this->m_surat_log; 
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $log = varReq('log');

        $data['surat_ulasan_staf']      = $akun;
        $data['surat_ulasan_tgl']       = date('Y-m-d H:i:s');
        // $data['surat_ulasan_ulasan']    = null;
        $data['surat_ulasan_baca_staf']      = $akun;
        $data['surat_ulasan_baca_tgl']       = date('Y-m-d H:i:s');

        if ($log) {
            $dataLog = array(
                'surat_log_surat'   => $data['surat_ulasan_surat'],
                'surat_log_tipe'    => $log,
                'surat_log_tgl'     => date('Y-m-d H:i:s'),
                'surat_log_staf'    => $akun);

            $operation_log = $surat_log->insert($dataLog, null, function($response){});
        }

        $operation = $model->insert($data, null, function($response) use ($data, $surat){
            $surat->update($data['surat_korespondensi_surat'], array(
                'surat_ulasan_baca_tgl' => NULL,
                'surat_ulasan_baca_staf' => NULL
            ));
        });
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_surat_ulasan;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['jenis_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['jenis_properti'] = $idProp;
        // }
        // $properti->updated($idProp, $akun);

        $operation = $model->update($id, $data, function($response){});
        $this->response($operation);
    }

    // public function destroy($usePayload = true){
    //     $model = $this->m_surat_ulasan;
    //     $primary = $model->get_primary();
    //     $payload = getRequestPayload();
    //     $data = (array) ($usePayload ? $payload : varPost());
    //     $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        
    //     $operation = $model->delete($id, function($response){});
    //     $this->response($operation);
    // }

    public function destroy($usePayload = true){
        $model = $this->m_surat_ulasan;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['jenis_properti'];

        // if(empty($idProp)){
        //     $op = $properti->created($akun);
        //     $idProp = $op['properti_id'];
        //     $data['jenis_properti'] = $idProp;
        // }
        // $properti->deleted($idProp, $akun);

        $operation = $model->update($id, $data,function($response){});
        $this->response($operation);
    }

    public function report_penerima() {
        $m_ulasan       = $this->m_surat_ulasan;
        $m_rating_view  = $this->m_surat_rating_view;
        $m_unit         = $this->m_unit;
        $m_report       = $this->m_report;
        $m_account      = $this->m_account;
        $m_unit         = $this->m_unit;
        $account_id     = $m_account->get_profile_id();
        $user           = $m_account->get_profile();

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel',0);
        $param_unitkerja    = varGet('unit');
        $excel              = varGet('excel', 0);
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $_filter = array();
        $_filter = $m_report->generateSelectField($filter, $filterValue, 'surat_ulasan_tgl');
        if($param_unitkerja) array_unshift($_filter, array('type'=>'exact', 'value'=>$param_unitkerja, 'field'=>'penerima_unit_id'));

        $sorter = array();
        array_unshift($sorter, array('property'=>'pengirim_surat_agenda',   'direction'=>'ASC'));

        $data = $m_rating_view->select(array('filter'=>json_encode($_filter), 'sorter'=>json_encode($sorter)));

        $grouped = array();
        if($data['total'] > 0){
            $srt = array();
            foreach($data['data'] as $key => &$val){
                // pemberi rating //
                $dtkey      = $val['pengirim_surat_nomor'];
                $val['pengirim_surat_agenda']   = $val['pengirim_surat_agenda'] ? $val['pengirim_surat_agenda'] : $this::$default_value['noagenda'];
                $val['pengirim_surat_nomor']    = $val['pengirim_surat_nomor'] ? $val['pengirim_surat_nomor'] : $this::$default_value['nosurat_no'];
                $val['ulasan_tanggal']          = $val['surat_ulasan_tgl'] ? $m_report->date_format($val['surat_ulasan_tgl'], 'd M Y H:i') : $this::$default_value['noulasantgl'];
                $val['surat_ulasan_komentar']   = $val['surat_ulasan_komentar'] ? $val['surat_ulasan_komentar'] : $this::$default_value['nokomentar'];
                $val['surat_ulasan_nilai']      = $val['surat_ulasan_nilai'] ? $this->rating_generator($val['surat_ulasan_nilai']) : $this::$default_value['norating'];
                $val['ulasan_staf_nama']        = $val['penerima_staf_nama'] ? $val['penerima_staf_nama'] : $this::$default_value['nostafrating'];

                // surat //
                $srt[$dtkey]['surat_nomor']         = $val['pengirim_surat_nomor'] ? $val['pengirim_surat_nomor'] : $this::$default_value['nosurat_no'];
                $srt[$dtkey]['surat_agenda']        = $val['pengirim_surat_agenda'] ? $val['pengirim_surat_agenda'] : $this::$default_value['noagenda'];
                $srt[$dtkey]['surat_perihal']       = $val['pengirim_surat_perihal'] ? $val['pengirim_surat_perihal'] : $this::$default_value['noperihal'];
                $srt[$dtkey]['unit_pengirim_id']    = $val['pengirim_unit_id'];
                $srt[$dtkey]['unit_pengirim_nama']  = $val['pengirim_unit_nama'];
                $srt[$dtkey]['unit_penerima_id']    = $val['penerima_unit_id'];
                $srt[$dtkey]['unit_penerima_nama']  = $val['penerima_unit_nama'];
                $srt[$dtkey]['unit_penilai'][]      = $val;
            }

            foreach($srt as $k_unit => &$v_unit){
                if( ! array_key_exists($v_unit['unit_penerima_id'], $grouped)) $grouped[$v_unit['unit_penerima_id']] = array();
                $v_unit['no'] = ( ! array_key_exists('surat', $grouped[$v_unit['unit_penerima_id']])) ? 1 : count($grouped[$v_unit['unit_penerima_id']]['surat']) + 1;
                $v_unit['bg_color'] = ($v_unit['no'] % 2 == 0) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                
                foreach($v_unit['unit_penilai'] as &$row){
                    $row['bg_color'] = $v_unit['bg_color'];
                } 

                $grouped[$v_unit['unit_penerima_id']]['surat'][]    = $v_unit;
                $grouped[$v_unit['unit_penerima_id']]['unit_nama']  = $v_unit['unit_penerima_nama'];
            }
        }else{
            $unit_nama = ($param_unitkerja)  ? $m_unit->read($param_unitkerja)['unit_nama'] : $this::$default_value['empty'];
            $_penerima  = array_fill_keys(array_keys($this::$template_unit_penerima), $this::$default_value['empty']);
            $_surat     = array_fill_keys(array_keys($this::$template_surat), $this::$default_value['empty']);
            $_surat['no'] = 1;
            $_pengirim  = array_fill_keys(array_keys($this::$template_unit_pengirim), $this::$default_value['empty']);
            $_surat['unit_penilai'] = array($_penerima);
            $_pengirim['surat']  = array($_surat);
            $_pengirim['unit_nama'] = $unit_nama;
            array_push($grouped, $_pengirim);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'                 =>  $report_title,
            'subtitle'              =>  $this::$template_penerima_subtitle,
            'header'                =>  $m_report->generateHeader($download, 4),
            'periode'               =>  $m_report->generatePeriode($filter, $filterValue),
            'records'               =>  $grouped,
            'dateReport'            =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'              =>  $user[$m_account->field_display]
        );

        // $file = $this->load->view($this::$template_report_penerima, null, true);
        $filename = str_replace(' ', '_', $report_title).$m_report->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$template_report_penerima, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $filename);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }   

    public function report_pengirim() {
        $m_ulasan       = $this->m_surat_ulasan_view;
        $m_rating_view  = $this->m_surat_rating_view;
        $m_account      = $this->m_account;
        $m_report       = $this->m_report;
        $m_account      = $this->m_account;
        $m_unit         = $this->m_unit;
        $account_id     = $m_account->get_profile_id();
        $user           = $m_account->get_profile();

        $filter             = varGet('filter');
        $filterValue        = (varGet('value') && varGet('value') != 'null') ? varGet('value') : date('Y');
        $download           = varGet('download',0);
        $excel              = varGet('excel', 0);
        $param_unitkerja    = varGet('unit');
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $_filter = array();
        $_filter = $m_report->generateSelectField($filter, $filterValue, 'surat_ulasan_tgl');
        if($param_unitkerja) array_unshift($_filter, array('type'=>'exact', 'value'=>$param_unitkerja, 'field'=>'pengirim_unit_id'));

        $sorter = array();
        array_unshift($sorter, array('property'=>'surat_ulasan_tgl', 'direction'=> 'ASC'));
        array_unshift($sorter, array('property'=>'pengirim_surat_agenda', 'direction'=>'ASC'));
        $data = $m_rating_view->select(array('filter'=>json_encode($_filter), 'sorter'=>json_encode($sorter)));

        $grouped = array();
        if($data['total'] > 0){
            $srt = array();
            foreach($data['data'] as $key => &$val){
                // pemberi rating //
                $dtkey      = $val['pengirim_surat_nomor'];
                $val['pengirim_surat_agenda']   = $val['pengirim_surat_agenda'] ? $val['pengirim_surat_agenda'] : $this::$default_value['noagenda'];
                $val['pengirim_surat_nomor']    = $val['pengirim_surat_nomor'] ? $val['pengirim_surat_nomor'] : $this::$default_value['nosurat_no'];
                $val['ulasan_tanggal']          = $val['surat_ulasan_tgl'] ? $m_report->date_format($val['surat_ulasan_tgl'], 'd M Y H:i') : $this::$default_value['noulasantgl'];
                $val['surat_ulasan_komentar']   = $val['surat_ulasan_komentar'] ? $val['surat_ulasan_komentar'] : $this::$default_value['nokomentar'];
                $val['surat_ulasan_nilai']      = $val['surat_ulasan_nilai'] ? $this->rating_generator($val['surat_ulasan_nilai']) : $this::$default_value['norating'];
                $val['penerima_unit_isaktif']   = ($val['penerima_unit_isaktif']) ? 'Ya' : 'Tidak';

                // surat //
                $srt[$dtkey]['surat_nomor']         = $val['pengirim_surat_nomor'] ? $val['pengirim_surat_nomor'] : $this::$default_value['nosurat_no'];
                $srt[$dtkey]['surat_agenda']        = $val['pengirim_surat_agenda'] ? $val['pengirim_surat_agenda'] : $this::$default_value['noagenda'];
                $srt[$dtkey]['surat_perihal']       = $val['pengirim_surat_perihal'] ? $val['pengirim_surat_perihal'] : $this::$default_value['noperihal'];
                $srt[$dtkey]['unit_pengirim_id']    = $val['pengirim_unit_id'];
                $srt[$dtkey]['unit_penerima_id']    = $val['penerima_unit_id'];
                $srt[$dtkey]['unit_pengirim_nama']  = $val['pengirim_unit_nama'] ? $val['pengirim_unit_nama'] : $this::$default_value['nounitnama'];
                $srt[$dtkey]['unit_penerima_nama']  = $val['penerima_unit_nama'] ? $val['penerima_unit_nama'] : $this::$default_value['nounitnama'];
                $srt[$dtkey]['unit_penilai'][]      = $val;
            }

            foreach($srt as $k_unit => $v_unit){
                if( ! array_key_exists($v_unit['unit_pengirim_id'], $grouped)) $grouped[$v_unit['unit_pengirim_id']] = array();
                $v_unit['no'] = ( ! array_key_exists('surat', $grouped[$v_unit['unit_pengirim_id']])) ? 1 : count($grouped[$v_unit['unit_pengirim_id']]['surat']) + 1;
                $v_unit['bg_color'] = ($v_unit['no'] % 2 == 0) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                
                foreach($v_unit['unit_penilai'] as &$row){
                    $row['bg_color'] = $v_unit['bg_color'];
                } 

                $grouped[$v_unit['unit_pengirim_id']]['surat'][]    = $v_unit;
                $grouped[$v_unit['unit_pengirim_id']]['unit_nama']  = $v_unit['unit_pengirim_nama'];
            }
        }else{
            $unit_nama = ($param_unitkerja)  ? $m_unit->read($param_unitkerja)['unit_nama'] : $this::$default_value['empty'];
            $_penerima  = array_fill_keys(array_keys($this::$template_unit_penerima), $this::$default_value['empty']);
            $_surat     = array_fill_keys(array_keys($this::$template_surat), $this::$default_value['empty']);
            $_surat['no'] = 1;
            $_pengirim  = array_fill_keys(array_keys($this::$template_unit_pengirim), $this::$default_value['empty']);
            $_surat['unit_penilai'] = array($_penerima);
            $_pengirim['surat']  = array($_surat);
            $_pengirim['unit_nama'] = $unit_nama;
            array_push($grouped, $_pengirim);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'                 =>  $report_title,
            'subtitle'              =>  $this::$template_pengirim_subtitle,
            'header'                =>  $m_report->generateHeader($download, 4),
            'periode'               =>  $m_report->generatePeriode($filter, $filterValue),
            'records'               =>  $grouped,
            'dateReport'            =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'              =>  $user[$m_account->field_display]
        );

        $filename = str_replace(' ', '_', $report_title).$m_report->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$template_report_pengirim, null, true);
        if($download){
            $m_report->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $m_report->generateExcel($file, $report_data, $filename);
        }else{
            $m_report->generateReport($file, $report_data, true);
        }
    }

    function rating_generator($count ,$type = null){
        $type = $type ? $type : '<span style="font-weight:bold;">&#9733;</span>';
        $default = '<span style="font-weight:bold;">&#9734;</span>';
        $return = array();

        if($count){
            // for($i=0; $i<$count; $i++){
            //     array_push($return, $type);
            // }
            $return = array_pad($return, $count, $type);
            $return = array_pad($return, 5, $default);
        }else{
            $return = '';
        }

        return implode('', $return);
    }
}