<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class surat_imasuk extends Base_Controller {

    public $report_template = 'sipas/surat/list';
    public $resi_template   = 'sipas/surat/resi_keluar';
    public $report_subtitle = 'Semua surat yang dikeluarkan oleh Instansi pengguna aplikasi';

    public $report_template_internal    = 'sipas/surat/internal/internal';
    public $report_title_internal       = 'Laporan Agenda Surat Masuk Internal Disetujui';
    public $report_subtitle_internal    = 'Semua surat masuk internal yang diterima oleh instansi pengguna aplikasi';

    public $report_title_rekap      = 'Laporan Rekap Jumlah Surat Masuk Internal';
    public $report_subtitle_rekap   = 'Rekap jumlah surat masuk internal yang diterima oleh Instansi pengguna aplikasi';
    public $report_template_rekap   = 'sipas/surat/internal/internal_masuk_detail_rekap';

    public $report_template_internal_tunda    = 'sipas/surat/internal/internal_masuk_tunda';
    public $report_title_internal_tunda       = 'Laporan Agenda Surat Masuk Internal yang Tertunda';
    public $report_subtitle_tunda   = 'Semua surat masuk internal yang diterima instansi dan berstatus dalam proses';

    public $report_title_tolak      = 'Daftar Masuk Internal Ditolak';
    public $report_subtitle_tolak   = 'Semua surat masuk internal yang ditolak oleh Instansi pengguna aplikasi';
    public $report_template_tolak   = 'sipas/surat/internal/internal_masuk_tolak';

    public $report_resi_template    = 'sipas/surat/resi';
    public $report_resi_title       = 'Tanda Terima Surat';
    public $delimiter               = array('<!--[',']-->'); // we use valid html tag to avoid invalid parser on front end

    static $bg_color_item_laporan = array('odd'=> 'background-color: #F5F5F5;', 'even'=> 'background-color: #FFFFFF;');

    static $default_value = array(
        'empty'         => '<span style="color:grey; font-style:italic;">(dalam proses)</span>',
        'nodata'        => '<span style="color:grey; font-style:italic;">(Tidak Ada Data)</span>',
        'unitnama'      => '<span style="color:grey; font-style:italic;">(Tidak memiliki unit)</span>',
        'nosurat'       => '<span style="color:grey; font-style:italic;">(Tidak memiliki nomor)</span>',
        'perihal'       => '<span style="color:grey; font-style:italic;">(Tidak memiliki perihal)</span>',
        'accrentang'    => '<span style="color:grey; font-style:italic;">(Tidak ada rentang)</span>',
        'title'         => '<span style="color:white; font-style:italic;">(Tidak ada Unit)</span>',
        'surattgl'      => '<span style="color:grey; font-style:italic;">(TIdak memiliki tanggal)</span>',
        'tipe'          => '<span style="color:grey; font-style:italic;">(TIdak memiliki tipe)</span>',
        'accnama'       => '<span style="color:grey; font-style:italic;">(TIdak ada penyetuju)</span>',
        'jenis'         => '<span style="color:grey; font-style:italic;">(Tidak memiliki Jenis)</span>',
        'unit'          => '<span style="color:grey; font-style:italic;">(Tidak memiliki Unit)</span>',
        'kelas'         => '<span style="color:grey; font-style:italic;">(Tidak memiliki Klasifikasi)</span>',
        'kelas_kode'    => '<span style="color:grey; font-style:italic;">(Tidak memiliki Kode Klasifikasi)</span>' 
    );

    public function __construct() {
        parent::__construct();
        // $this->m_fitur          = $this->model('sipas/fitur',           true);
        // $this->m_akses          = $this->model('sipas/akses',           true);
        // $this->m_akses_view     = $this->model('sipas/akses_view',      true);
        $this->m_user               = $this->model('sipas/akun',            true);
        $this->m_asset              = $this->model('sipas/asset',           true);
        $this->m_arsip              = $this->model('sipas/arsip',           true);
        $this->m_dokumen            = $this->model('sipas/dokumen',         true);
        $this->m_account            = $this->model('sipas/account',         true);
                
        $this->m_surat                  = $this->model('sipas/surat',                   true);
        $this->m_surat_view             = $this->model('sipas/surat_view',              true);
        $this->m_surat_log              = $this->model('sipas/surat_log',               true);
        $this->m_disposisi              = $this->model('sipas/disposisi',               true);
        $this->m_disposisi_masuk        = $this->model('sipas/disposisi_masuk',         true);
        $this->m_disposisi_view         = $this->model('sipas/disposisi_view',          true);
        $this->m_disposisi_masuk_view   = $this->model('sipas/disposisi_masuk_view',    true);
            
        $this->m_surat_imasuk_view                  = $this->model('sipas/surat_imasuk_view',               true);
        $this->m_surat_imasuk_hidup_view            = $this->model('sipas/surat_imasuk_hidup_view',         true);
        $this->m_surat_imasuk_aktif_list_view       = $this->model('sipas/surat_imasuk_aktif_list_view',    true);
        $this->m_surat_imasuk_aktif_view            = $this->model('sipas/surat_imasuk_aktif_view',         true);
        $this->m_surat_imasuk_aktif_7_view          = $this->model('sipas/surat_imasuk_aktif_7_view',       true);
        $this->m_surat_imasuk_aktif_3_view          = $this->model('sipas/surat_imasuk_aktif_3_view',       true);
        $this->m_surat_imasuk_aktif_1_view          = $this->model('sipas/surat_imasuk_aktif_1_view',       true);
        $this->m_surat_imasuk_draft_view            = $this->model('sipas/surat_imasuk_draft_view',         true);
        $this->m_surat_imasuk_nonaktif_view         = $this->model('sipas/surat_imasuk_nonaktif_view',      true);
        $this->m_surat_imasuk_terlewat_nonaktif_view = $this->model('sipas/surat_imasuk_terlewat_nonaktif_view', true);
        $this->m_surat_imasuk_unapproved_view       = $this->model('sipas/surat_imasuk_unapproved_view',    true);
        $this->m_surat_imasuk_approved_view         = $this->model('sipas/surat_imasuk_approved_view',      true);
        $this->m_surat_imasuk_pending_view          = $this->model('sipas/surat_imasuk_pending_view',       true);
        $this->m_surat_imasuk_terima_view           = $this->model('sipas/surat_imasuk_terima_view',        true);
        $this->m_surat_imasuk_tolak_view            = $this->model('sipas/surat_imasuk_tolak_view',         true);
        $this->m_surat_imasuk_blmdistribusi_view    = $this->model('sipas/surat_imasuk_blmdistribusi_view', true);
        $this->m_surat_imasuk_distribusi_view       = $this->model('sipas/surat_imasuk_distribusi_view',    true);
        $this->m_surat_imasuk_batal_distribusi_view = $this->model('sipas/surat_imasuk_batal_distribusi_view', true);

        $this->m_korespondensi      = $this->model('sipas/korespondensi',           true);
        $this->m_korespondensi_view = $this->model('sipas/korespondensi_view',      true);
        $this->m_unit               = $this->model('sipas/unit',                    true);
        $this->m_unit_cakupan       = $this->model('sipas/unit_cakupan',            true);
        $this->m_unit_cakupan_view  = $this->model('sipas/unit_cakupan_view',       true);
        $this->m_staf               = $this->model('sipas/staf',                    true);
        $this->m_report             = $this->model('sipas/report',                  true);
        $this->m_staf_view          = $this->model('sipas/staf_view',               true);
        // $this->m_addons             = $this->model('sipas/addons_config',           true);
    
        $this->m_surat_stack        = $this->model('sipas/surat_stack',             true);
        $this->m_surat_stack_view   = $this->model('sipas/surat_stack_koreksi_view',true);
        $this->m_jenis              = $this->model('sipas/jenis',                   true);
        $this->m_jenis_view         = $this->model('sipas/jenis_view',              true);
        $this->m_surat_jenis        = $this->model('sipas/jenis_aktif_view',        true);

        $this->m_jabatan            = $this->model('sipas/jabatan',     true);
        $this->m_staf_recent        = $this->model('sipas/staf_aktual', true);

        $this->m_properti           = $this->model('sipas/properti',     true);

        $this->m_pengaturan         = $this->model('sipas/pengaturan',true);
        $this->m_notifikasi         = $this->model('sipas/notifikasi',true);

        $this->m_surat_imasuk_rekap_view   = $this->model('sipas/surat_rekap_by_model_view',   true);
    }

    public function index() {
        $this->read();
    }

    public function read($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_hidup_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $list       = varGet('list');
            $scopeid    = varGet('scope');
            $statusid   = varGet('status');
            $tipeid     = varGet('tipe');
            $status     = null;

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function draft($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_draft_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function unapproved($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_unapproved_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id         = varGet('id', varGet('surat_id'));
            $record     = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));
            $scopeid    = varGet('scope');
            $tipe       = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            // if($tipe !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipe
            //     ));
            // }

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function pending($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_pending_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));
            $scopeid    = varGet('scope');
            $tipe       = varGet('tipe');

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

            // if($tipe !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipe
            //     ));
            // }

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function terima($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_terima_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function tolak($section = null) { 
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_tolak_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));
            $scopeid    = varGet('scope');
            $tipe       = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            // if($tipe !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipe
            //     ));
            // }

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function blm_distribusi($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_blmdistribusi_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function distribusi($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_distribusi_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function approved($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_approved_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function aktif($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_aktif_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function aktif_list($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_aktif_list_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function aktif7($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_aktif_7_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function aktif3($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_aktif_3_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }
    public function aktif1($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_aktif_1_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();


            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function nonaktif($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_nonaktif_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();


            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }
    
    public function terlewat_nonaktif($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_terlewat_nonaktif_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();


            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }

    public function batal_distribusi($section = null) {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_imasuk_batal_distribusi_view;        
        $scope      = $me->m_unit_cakupan_view;
        $account    = $me->m_account->get_profile();

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);

        }else{

            $hariini    = date('Y-m-d H:i:s');
            $filter     = json_decode(varGet('filter', '[]'));

            $costumFilter = array();
            $nonCustomFilter = array();

            if(!empty($filter)){
                foreach ($filter as $i => $val) {

                    if($val->field == 'surat_perihal'){
                        $custom_filter  = array('surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor', 
                            'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama');

                        $value = $val->value;
                        $query = "(".implode(" LIKE '%".$value."%' OR ", $custom_filter)." LIKE '%".$value."%')";
                        $costumFilter = array(array(
                                    'value' => $query,
                                    'type'  => 'custom'
                                ));
                    }else{
                        $custom_filter2 = $val->field;
                        $value2 = $val->value;
                        $query2 = "(".$custom_filter2." LIKE '%".$value2."%')";
                        $filter3 = array(array(
                                    'value' => $query2,
                                    'type'  => 'custom'
                                ));
                        $nonCustomFilter = array_merge($nonCustomFilter, $filter3);
                    }
                }

                $filter = array_merge($costumFilter, $nonCustomFilter);
            }
            
            $limit      = varGet('limit');
            $start      = varGet('start',0);
            $sorter     = json_decode(varGet('sort', '[]'));

            $scopeid    = varGet('scope');
            $tipeid     = varGet('tipe');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $unit = $scope->find(array(
                    'unit_cakupan_jabatan' => $account['staf_jabatan']
                ));
                $scopeid = ($unit) ? $unit[0]['unit_cakupan_jabatan'] : NULL;
            }

            // if($tipeid !== 'all'){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_jenis',
            //         'value' => $tipeid
            //     ));
            // }

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            
            $this->response($records);
        }
    }
    
    public function create($usePayload = true) {
        $me = $this;

        $arsip      = $this->m_arsip;
        $model      = $this->m_surat;
        $surat_log  = $this->m_surat_log;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $surat_view = $this->m_surat_view;
        $staf       = $this->m_staf;

        $now = date('Y-m-d H:i:s');
        $akun = $account->get_profile_id();
        $stafProfil = $staf->read($akun);
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        if(!$akun){
            $unauthorized_op['success'] = false;
            $unauthorized_op['message'] = "Session anda telah habis, silahkan login ulang";
            $this->response($unauthorized_op);
            return;
        }
        
        $data['surat_tanggal'] = $now;
        $data['surat_registrasi'] = $surat_view->generate_code();
        $data['surat_setuju'] = $surat_view::SETUJU_PROSES;
        $data['surat_setuju_staf'] = $akun;
        $data['surat_setuju_profil'] = $stafProfil['staf_profil'];
        $data['surat_setuju_tgl'] = $now;
        $data['surat_buat_tgl'] = $now;
        $data['surat_buat_staf'] = $akun;
        $data['surat_buat_profil'] = $stafProfil['staf_profil'];
        $data['surat_arah_profil'] = $stafProfil['staf_profil'];
        
        //insert arsip
        $dataArsip = array(
            'arsip_nama' => 'SK.'.$data['surat_registrasi']
        );

        $arsip->insert($dataArsip);
        $data['surat_arsip'] = $arsip->get_insertid();

        $operation = $model->insert($data, null, function($response) use ($model, $data, $surat_log, $akun, $properti, $now, $stafProfil){
            if($response[$model->successProperty] !== true) return;

            $inserted_data = $model->read($model->get_insertid());
            $op = $properti->created($akun, $inserted_data, 'surat', $inserted_data['surat_id'], $inserted_data['surat_registrasi']);
            if($op){
                $model->update($inserted_data['surat_id'], array(
                    'surat_properti' => $op['properti_id']
                ));
            }
            $dataLog = array(
                'surat_log_tipe' => 1,
                'surat_log_surat' =>$inserted_data['surat_id'],
                'surat_log_staf' =>$akun,
                'surat_log_profil' =>$stafProfil['staf_profil'],
                'surat_log_tgl' =>$now);
            $operation_log = $surat_log->insert($dataLog, null, function($response){});
        });
        $this->response($operation);
    }

    public function update($usePayload = true){
        $me     = $this;
        // $me->load->library('queue');
        // $me->queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

        $model      = $this->m_surat_view;
        $surat      = $this->m_surat;
        $surat_view = $this->m_surat_view;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $disposisi_masuk_view = $this->m_disposisi_masuk_view;
        $disposisi_view = $this->m_disposisi_view;
        $disposisi = $this->m_disposisi;
        $disposisi_masuk = $this->m_disposisi_masuk;
        $staf       = $this->m_staf_view;
        $model_staf = $this->m_staf;
        $unit       = $this->m_unit;
        $surat_log  = $this->m_surat_log;
        $surat_stack    = $this->m_surat_stack;
        $korespondensi  = $this->m_korespondensi;
        $korespondensi_view = $this->m_korespondensi_view;
        $account = $this->m_account;
        $setting = $this->m_pengaturan;
        $notifikasi = $this->m_notifikasi;
        
        $now = date('Y-m-d H:i:s');
        $akun = $account->get_profile_id();
        $primary = $surat->get_primary();
        $payload = getRequestPayload();
        $temporary = varGet('temporary');
        $log = varGet('log');
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $penerima = varReq('user');
        $istembusan = varReq('t');
        // $isberkas   = varReq('b');
        $approval   = varReq('approval');

        $account_id = $account->get_profile_id();
        $idProp = $data['surat_properti'];
        $mergeData = $setting->getSettingByCode('use_data_merge');

        $stafProfil = $model_staf->read($account_id);

        if(varIsset($data['surat_tanggal'])){ $data['surat_tanggal'] = str_replace("00:00:00", date('H:i:s'), $data['surat_tanggal']); }else{ unset($data['surat_tanggal']);}

        $operation = $surat->update($id, $data, function($response) 
            use($data, $surat, $surat_view, $properti, $account, $akun, $korespondensi, $surat_stack, 
                $penerima, $surat_log, $temporary, $log, $disposisi_masuk_view, $disposisi_masuk, $model, $approval,
                $now, $disposisi_view, $account_id, $disposisi, $setting, $notifikasi, $staf, $istembusan, /*$isberkas,*/ $mergeData, 
                $id, $queueTube, $queueTubeRedis, $stafProfil){
            if($response[$surat->successProperty] !== true) return;

            $updated_data = $response['data'];
            if (Config()->item('queueServer')['host']) {
                $data_redis = array(
                    'type'=>'SuratImasuk-Unit',
                    'staf_id'=>null,
                    'jabatan_id'=>null,
                    'unit_id'=>$updated_data['surat_unit'],
                    'data'=> $updated_data['surat_unit']
                );
                $addJobUnit = create_job($queueTubeRedis, $data_redis);
            }
            // pushEvent(array(
            //     'to' => $updated_data['surat_unit'],
                // 'data' => array(
                //     'api' => 'surat_imasuk',
                //     'id' => $id
                // ),
            //     'group' => array('unit'),
            //     'type' => 'surat_imasuk'
            // ));

            $idProp = $updated_data['surat_properti'];
            if ($approval) {
                if ($data['surat_setuju'] == 2) {
                     $dataLog = array(
                        'surat_log_tipe' => 18,
                        'surat_log_surat'=>$updated_data['surat_id'],
                        'surat_log_staf'=>$account_id,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$now
                    );

                    $operation_log = $surat_log->insert($dataLog, null, function($response){});
                }else if($data['surat_setuju'] == 4){
                    $dataLog = array(
                        'surat_log_tipe' => 19,
                        'surat_log_surat'=>$updated_data['surat_id'],
                        'surat_log_staf'=>$account_id,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$now
                    );

                    $operation_log = $surat_log->insert($dataLog, null, function($response){});
                }
            }
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'surat', $updated_data['surat_id'], $updated_data['surat_registrasi']);
                if($op){
                    $surat->update($updated_data['surat_id'], array(
                        'surat_properti' => $op['properti_id']
                    ));
                }
            }
            // $surat->update($updated_data['surat_id'], array(
            //             'surat_pengirim' => $updated_data['unit_source_nama']
            // ));
            
            $properti->updated($idProp, $akun, $updated_data, $updated_data['surat_registrasi']);
            if($log){
                $dataLog = array(
                    'surat_log_tipe' => $log,
                    'surat_log_surat'=>$updated_data['surat_id'],
                    'surat_log_staf'=>$akun,
                    'surat_log_profil'=>$stafProfil['staf_profil'],
                    'surat_log_tgl'=>$now);

                $operation_log = $surat_log->insert($dataLog, null, function($response){});

                if($updated_data['surat_distribusi_tgl']){
                    $dataLog = array(
                        'surat_log_tipe' => 7,
                        'surat_log_surat'=>$updated_data['surat_id'],
                        'surat_log_staf'=>$akun,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$updated_data['surat_distribusi_tgl']);

                    $operation_log = $surat_log->insert($dataLog, null, function($response){});
                }

                if($updated_data['surat_selesai_tgl']){
                    $dataLog1 = array(
                        'surat_log_tipe' => 8,
                        'surat_log_surat'=>$updated_data['surat_id'],
                        'surat_log_staf'=>$akun,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$updated_data['surat_selesai_tgl']);

                    $operation_log1 = $surat_log->insert($dataLog1, null, function($response){});
                }
            }else{
                if($updated_data['surat_selesai_tgl']){
                    $dataLog1 = array(
                        'surat_log_tipe' => 8,
                        'surat_log_surat'=>$updated_data['surat_id'],
                        'surat_log_staf'=>$akun,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$updated_data['surat_selesai_tgl']);

                    $operation_log1 = $surat_log->insert($dataLog1, null, function($response){});
                }
                
            }
            // $operation_log = $surat_log->created($akun, $data);

            if (empty($data['surat_korespondensi_surat'])) {
                /*if no `korespondensi` attached on surat so it will create new and as root*/
                if(empty($data['surat_korespondensi'])){
                    $korespondensi->insert(array(
                        'korespondensi_perihal'     => $data['surat_perihal'],
                        'korespondensi_isinternal'  => 1,
                        'korespondensi_pengirim'    => $data['surat_pengirim'],
                        'korespondensi_penerima'    => $data['surat_tujuan']),
                    null, function($r_korespondensi) use( $response, $surat, $korespondensi, $properti, $account_id){
                        if($r_korespondensi[$surat->successProperty] !== true) return;

                        $inserted_data = $korespondensi->read($korespondensi->get_insertid());
                        $op = $properti->created($account_id, $inserted_data, 'korespondensi', $inserted_data['korespondensi_id'], $inserted_data['korespondensi_nomor']);
                        if($op){
                            $korespondensi->update($inserted_data['korespondensi_id'], array(
                                'korespondensi_properti' => $op['properti_id']
                            ));
                        }

                        $surat->update($response[$surat->dataProperty][$surat->get_primary()], array(
                            'surat_korespondensi' => $r_korespondensi[$surat->dataProperty][$korespondensi->get_primary()]
                        ), function($response_korespondensi) use ($surat, $properti, $account_id){
                            if($response_korespondensi[$surat->successProperty] !== true) return;
                            $updated_data = $surat->read($surat->get_insertid());
                            $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                        });
                    });
                }
            }else{
                $korespondensi_surat = $surat->read($data['surat_id']);
                if($korespondensi_surat){
                    $surat->update($response[$surat->dataProperty][$surat->get_primary()], array(
                        'surat_korespondensi'       => $data['surat_korespondensi'],
                        'surat_korespondensi_surat' => $data['surat_korespondensi_surat']
                    ), function($response_korespondensi) use ($surat, $properti, $account_id){
                        if($response_korespondensi[$surat->successProperty] !== true) return;
                        $updated_data = $response_korespondensi['data'];
                        $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                    });
                }
            }

            $find_temporary_stack = $surat_stack->find(array(
                'surat_stack_surat' => $data['surat_id']
            ));
            if($find_temporary_stack && $data['surat_setuju'] == $surat_view::SETUJU_PROSES){
                $surat_stack->delete(array(
                    'surat_stack_surat' => $data['surat_id']
                ));
            }

            if (!is_array($penerima)) $penerima = array();

            if (!is_array($istembusan)) $istembusan = array();

            // if (!is_array($isberkas)) $isberkas = array();

            if($temporary == 1){
                // var_dump($penerima);
                if(!empty($penerima)){
                    foreach ($penerima as $index => $p) {
                        if($istembusan[$index] === 'true'){
                            $istembusan[$index] = true;
                        }
                        // if($isberkas[$index] === 'true'){
                        //     $isberkas[$index] = true;
                        // }
                        
                        if (is_string($p)) {
                            $penerima_id = $p;
                            $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                        } else if (is_object($p)) {
                            $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                            $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                        } else if (is_array($p)) {
                            $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                            $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                        }

                        if (empty($penerima_id)) {
                            continue;
                        }
                        $lvl = $index;
                        $staf_penerima = $staf->read($penerima_id);

                        /*pending decision for stack to have properti*/
                        // $op = $properti->created($akun);
                        // $idStackProp = $op['properti_id'];

                        /*Re-insert penerima List*/
                        $penerima_stack = $surat_stack->insert(array(
                            'surat_stack_staf'    => $penerima_id,
                            'surat_stack_profil'  => $staf_penerima['staf_profil'],
                            'surat_stack_surat'   => $data['surat_id'],
                            'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                            'surat_stack_level'   => $lvl,
                            'surat_stack_status'  => $surat_view::SETUJU_INIT,
                            'surat_stack_isberkas'=> $data['surat_useberkas'],
                            'surat_stack_istembusan'=> $tembusan
                            // 'surat_stack_properti'  => $idStackProp
                        ));
                    }
                }
            }else{
                if(!empty($penerima)){
                    /*delete temporary first*/
                    $surat_stack->delete(array(
                        'surat_stack_surat'     => $data['surat_id'],
                        'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                    ), function ($response){});

                    $dpo = $this->m_disposisi->insert(
                        array(
                            'disposisi_tgl'     => $now,
                            'disposisi_pelaku'  => $akun,
                            'disposisi_pelaku_profil'  => $stafProfil['staf_profil'],
                            'disposisi_staf'    => $akun,
                            'disposisi_profil'  => $stafProfil['staf_profil'],
                            'disposisi_model'   => $disposisi_view::MODEL_DISPOSISI,
                            'disposisi_surat'   => $data['surat_id']
                        ),null,
                        function($response) use(
                            $penerima, $now, $akun, $disposisi_masuk_view, $disposisi_masuk,
                            $data, $temporary, $properti, $surat_stack, $surat_view, $disposisi, 
                            $setting, $notifikasi, $staf, $istembusan, /*$isberkas,*/ $queueTube, $queueTubeRedis){
                            if($response[$this->m_disposisi->successProperty] !== true) return;

                            if(!is_array($penerima)){
                                $penerima = array();
                            }
                            $disposisi_id = $this->m_disposisi->get_insertid();

                            $inserted_data = $this->m_disposisi->read($disposisi_id);

                            /*insert properti*/
                            $op = $properti->created($akun, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                            if($op){
                                $disposisi->update($inserted_data['disposisi_id'], array(
                                    'disposisi_properti' => $op['properti_id']
                                ));
                            }
                            if (!is_array($penerima)) {
                                $penerima = array();
                            }

                            if (!is_array($istembusan)) {
                                $istembusan = array();
                            }

                            // if (!is_array($isberkas)) {
                            //     $isberkas = array();
                            // }
                            foreach ($penerima as $index => $p) {
                                if($istembusan[$index] === 'true'){
                                    $istembusan[$index] = true;
                                }
                                // if($isberkas[$index] === 'true'){
                                //     $isberkas[$index] = true;
                                // }
                                
                                if (is_string($p)) {
                                    $penerima_id = $p;
                                    $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                                    // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                } else if (is_object($p)) {
                                    $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                                    // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                } else if (is_array($p)) {
                                    $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                                    // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                }

                                if(empty($penerima_id)) {
                                    continue;
                                }
                                $lvl = $index;
                                $staf_penerima = $staf->read($penerima_id);

                                /*pending decision for stack to have properti*/
                                // $op = $properti->created($akun);
                                // $idStackProp = $op['properti_id'];

                                /*Re-insert penerima List*/
                                $penerima_stack = $surat_stack->insert(array(
                                    'surat_stack_staf'    => $p,
                                    'surat_stack_profil'  => $staf_penerima['staf_profil'],
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_level'   => $lvl,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT,
                                    'surat_stack_isberkas'=> $data['surat_useberkas'],
                                    'surat_stack_istembusan'=> $tembusan
                                    // 'surat_stack_properti'  => $idStackProp
                                ));

                                $dis_pen_prop = $properti->created($akun);
                                $disposisi_pen_properti = $dis_pen_prop['properti_id'];

                                $this->m_disposisi_masuk->insert(array(
                                    'disposisi_masuk_disposisi'  => $disposisi_id,
                                    'disposisi_masuk_staf'       => $p,
                                    'disposisi_masuk_profil'     => $staf_penerima['staf_profil'],
                                    'disposisi_masuk_status'     => 0,
                                    'disposisi_masuk_istembusan' => $tembusan,
                                    'disposisi_masuk_isberkas'   => $data['surat_useberkas'],
                                    'disposisi_masuk_properti'   => $disposisi_pen_properti
                                ), null, function($response) use($properti, $akun, $data, $disposisi_masuk, $queueTube, $queueTubeRedis, $p){
                                    if (Config()->item('queueServer')['host']) {
                                        $data_fcm = array(
                                            'id' => $disposisi_masuk->get_insertid(),
                                            'type'=>'Masuk',
                                            'from'=>$akun,
                                            'to'=>$p,
                                            'data'=>$data['surat_perihal']
                                        );
                                        $addJob = create_job($queueTube, $data_fcm);

                                        $data_redis = array(
                                            'type'=>'SuratImasuk-Staf',
                                            'staf_id'=>$p,
                                            'jabatan_id'=>null,
                                            'unit_id'=>null,
                                            'data'=> $p
                                        );
                                        $addJobStaf = create_job($queueTubeRedis, $data_redis);
                                    }

                                    if($response[$disposisi_masuk->successProperty] !== true) return;
                                    $inserted_data = $response['data'];
                                    pushEvent(array(
                                        'to' => $p,
                                        'data' => array(
                                            'api' => 'disposisi_masuk',
                                            'id' => $disposisi_id
                                        ),
                                        'group' => array('staf', 'asistensi'),
                                        'type' => 'disposisi_masuk'
                                    ));

                                    $op = $properti->created($akun, $inserted_data, 'disposisi_masuk', $inserted_data['disposisi_masuk_id'], $inserted_data['disposisi_masuk_nomor']);
                                    if($op){
                                        $disposisi_masuk->update($inserted_data['disposisi_masuk_id'], array(
                                            'disposisi_masuk_properti' => $op['properti_id']
                                        ));
                                    }
                                });

                                /*recent*/
                                $recent_exist = $this->m_staf_recent->read(array(
                                    'staf_aktual_pengirim'=>$data['surat_distribusi_staf'],
                                    'staf_aktual_penerima'=>$penerima_id,
                                ));
                                if($recent_exist){
                                    // echo "if sini";
                                    $this->m_staf_recent->update(array(
                                            'staf_aktual_pengirim'=>$data['surat_distribusi_staf'],
                                            'staf_aktual_penerima'=>$penerima_id
                                        ),array(
                                            'staf_aktual_pengirim'=>$data['surat_distribusi_staf'],
                                            'staf_aktual_penerima'=>$penerima_id,
                                            'staf_aktual_tgl'    => $now,
                                            'staf_aktual_tipe'    => $this->m_disposisi::MODEL_DISPOSISI
                                        ), function($response) use ($properti, $akun){
                                            $recent_data = $response['data'];
                                            $updated_data = $this->m_staf_recent->read($recent_data['staf_aktual_id']);
                                            $idProp = $updated_data['staf_aktual_properti'];

                                            $properti->updated($idProp, $akun, $updated_data, 'staf_aktual '.$updated_data['staf_aktual_tgl']);
                                        });
                                }else{
                                    // echo "else sini";
                                    $this->m_staf_recent->insert(array(
                                        'staf_aktual_pengirim'=>$data['surat_distribusi_staf'],
                                        'staf_aktual_penerima'=>$penerima_id,
                                        'staf_aktual_tgl'    => $now,
                                        'staf_aktual_tipe'    => $this->m_disposisi::MODEL_DISPOSISI
                                    ), null, function($response) use ($data, $properti, $akun){

                                        $inserted_data = $this->m_staf_recent->read($this->m_staf_recent->get_insertid());
                                        $op = $properti->created($akun, $inserted_data, 'staf_aktual', $inserted_data['staf_aktual_id'], 'staf_aktual '.$inserted_data['staf_aktual_tgl']);
                                        if($op){
                                            $this->m_staf_recent->update($inserted_data['staf_aktual_id'], array(
                                                'staf_aktual_properti' => $op['properti_id']
                                            ));
                                        }
                                    });
                                }
                                /*add ons*/
                                $useNotifEmail = $setting->getSettingByCode('notif_email');
                                $useNotifEmailMasuk = $setting->getSettingByCode('notif_email_suratmasuk');

                                if($useNotifEmail && $useNotifEmailMasuk){
                                    $notifikasi->created('email', $data, $p, NULL, 'masuk', NULL);
                                }
                            }
                    });
                    if($mergeData) $model->compiledDataWithDokumen($id);
                }
            }
        });
        $operation[$model->dataProperty] = $this->m_surat_view->read($id);
        // $operation['message'] = 'Berhasil mendistribusikan surat';
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $surat = $this->m_surat;
        $surat_log = $this->m_surat_log;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $korespondensi = $this->m_korespondensi;
        $staf = $this->m_staf;

        $permanen = varReq('permanen');
        $akun = $account->get_profile_id();
        $primary = $surat->get_primary();
        $now = date('Y-m-d H:i:s');
        $stafProfil = $staf->read($akun);
        
        if($permanen){
            $id = varReq('id');
            $idProp = varReq('properti');
            $idKores = varReq('korespon');
            $kores = varReq('kores');
            $disposisi = $this->m_disposisi;
            $disposisi_masuk = $this->m_disposisi_masuk;

            // del disposisi dan disposisi masuk properti
            $dataDis = $disposisi->find(array('disposisi_surat'=> $id));
            foreach ($dataDis as $i => $sDispo) {
                $properti->delete(array(
                    'properti_entitas_id' => $sDispo['disposisi_id']
                ));

                $dataDisMa = $disposisi_masuk->find(array('disposisi_masuk_disposisi'=> $sDispo['disposisi_id']));
                foreach ($dataDisMa as $i => $sDisMa) {
                    $properti->delete(array(
                        'properti_entitas_id' => $sDisMa['disposisi_masuk_id']
                    ));
                }
            }
            
            //del surat
            $operation = $surat->delete($id, function ($response) use ($kores, $idKores, $akun, $properti, $id, $surat, $korespondensi) {
                $properti->delete(array(
                        'properti_entitas_id' => $id
                    ));
                // update korespondensi
                $datakores = $surat->find(array('surat_korespondensi'=>$kores));
                if(!$datakores){
                    $korespondensi->delete(array(
                        'korespondensi_id' => $kores
                    ));
                }
                if($idKores){
                    $dataAn = $surat->find(array('surat_korespondensi_surat'=> $id));
                    foreach ($dataAn as $i => $sAn) {
                        $surat->update($sAn['surat_id'],array(
                            'surat_korespondensi_surat' => $idKores),
                        null, function($response){});
                    }
                }
            });
        } else{
            $payload = getRequestPayload();
            $data = (array) ($usePayload ? $payload : varPost());
            $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
            $idProp = $data['surat_properti'];

            $dataLog = array(
                'surat_log_tipe' => 16,
                'surat_log_surat'=>$data['surat_id'],
                'surat_log_staf'=>$akun,
                'surat_log_profil'=>$stafProfil['staf_profil'],
                'surat_log_tgl'=>$now);

            $operation_log = $surat_log->insert($dataLog, null, function($response){});

            $data['surat_ishapus'] = 1;

            $operation = $surat->update($id, $data,function($response) use 
                ($properti, $surat, $akun, $data){

                // $deleted_data = $response['data'];

                $deleted_data = $surat->read($data['surat_id']);
                $idProp = $deleted_data['surat_properti'];
                if(empty($idProp)){
                    $op = $properti->created($akun, $deleted_data, 'surat', $deleted_data['surat_id']);
                    if($op){
                        $surat->update($deleted_data['surat_id'], array(
                            'surat_properti' => $op['properti_id']
                        ));
                    }
                }
                $properti->deleted($idProp, $akun, $deleted_data);
            });
        }
        if($operation['success']){
            $operation['message']='Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    function internal_report(){
        $report_model   = $this->m_report;
        $account_model  = $this->m_account;
        $unit_model     = $this->m_unit;
        $asset_model    = $this->m_asset;
        $surat          = $this->m_surat;
        $surat_view     = $this->m_surat_view;
        $koreksi        = $this->m_disposisi;
        $jenis          = $this->m_surat_jenis;
        
        $surat_imasuk_view              = $this->m_surat_imasuk_view;
        $surat_stack_penyetuju          = $this->m_surat_stack;
        $surat_stack_penyetuju_view     = $this->m_surat_stack_view;
        $internal_unit_penerima_view    = $this->m_surat_imasuk_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $tipeid         = varGet('tipe');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

        if(empty($param_unit) || is_null($param_unit)){
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        }else{
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null: array('unit_id'=>$param_unit)),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;
            unset($time_field['surat_properti_buat_unit']);
            if($tipeid && $tipeid != 'all'){
                $time_field['surat_jenis'] = $tipeid;
            }
            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $time_field[$surat::$field_approval_lookup.' <> '.$surat::SETUJU_INIT] = NULL;
            $records = $surat_imasuk_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $date = $r['surat_tanggal'];
                $createDate = new DateTime($date);
                $r['surat_tanggal'] = $createDate->format('d M Y');
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $r['surat_tanggal'] : $this::$default_value['surattgl'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
            }
            if(!empty($records)){
                $v['records']       = $records;
                $v['count']         = count($records);
                $unit_recs[$d_i]    = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        if(! $unit_recs){
            if(! $unit_recs){
                $unit_recs = array();
                $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
                $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
                $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
                $surat['no'] = 1;
                array_unshift($unit['records'], $surat);
                array_unshift($unit_recs, $unit);
            }
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_internal,
            'header'        =>$report_model->generateHeader($download),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unit_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename, true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_semua(){
        $report_model   = $this->m_report;
        $account_model  = $this->m_account;
        $unit_model     = $this->m_unit;
        $asset_model    = $this->m_asset;
        $surat          = $this->m_surat;
        $surat_view     = $this->m_surat_view;
        $koreksi        = $this->m_disposisi;
        $tipe           = $this->m_surat_jenis;
        $pengaturan     = $this->m_pengaturan;
        
        $surat_imasuk_view              = $this->m_surat_imasuk_view;
        $surat_stack_penyetuju          = $this->m_surat_stack;
        $surat_stack_penyetuju_view     = $this->m_surat_stack_view;
        $internal_unit_penerima_view    = $this->m_surat_imasuk_view;

        $buatSuratMasuk = $pengaturan->getSettingByCode('use_unit_buat_surat_masuk');

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $tipeid         = varGet('tipe');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

        if($buatSuratMasuk){
            $unit_recs = $unit_model->find(
                array('IFNULL(unit_isbuatsurat, 0) = 1'=> null),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }else{
            $unitkerja_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unitkerja_recs2['data'];
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;
            unset($time_field['surat_properti_buat_unit']);
            if($tipeid && $tipeid != 'all'){
                $time_field['surat_jenis'] = $tipeid;
            }
            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $time_field[$surat::$field_approval_lookup.' <> '.$surat::SETUJU_INIT] = NULL;
            $records = $surat_imasuk_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
            }
            if(!empty($records)){
                $v['records']       = $records;
                $v['count']         = count($records);
                $unit_recs[$d_i]    = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        if(! $unit_recs){
            if(! $unit_recs){
                $unit_recs = array();
                $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
                $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
                $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
                $surat['no'] = 1;
                array_unshift($unit['records'], $surat);
                array_unshift($unit_recs, $unit);
            }
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_internal,
            'header'        =>$report_model->generateHeader($download),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unit_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename, true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }
 
    function internal_report_kewenangan(){
        $report_model   = $this->m_report;
        $account_model  = $this->m_account;
        $unit_model     = $this->m_unit;
        $asset_model    = $this->m_asset;
        $surat          = $this->m_surat;
        $surat_view     = $this->m_surat_view;
        $koreksi        = $this->m_disposisi;
        $tipe           = $this->m_surat_jenis;
        
        $surat_imasuk_view              = $this->m_surat_imasuk_view;
        $surat_stack_penyetuju          = $this->m_surat_stack;
        $surat_stack_penyetuju_view     = $this->m_surat_stack_view;
        $internal_unit_penerima_view    = $this->m_surat_imasuk_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $tipeid         = varGet('tipe');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

        if(empty($param_unit) || is_null($param_unit)){
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        }else{
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null: array('unit_id'=>$param_unit)),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;
            unset($time_field['surat_properti_buat_unit']);
            if($tipeid && $tipeid != 'all'){
                $time_field['surat_jenis'] = $tipeid;
            }
            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $time_field[$surat::$field_approval_lookup.' <> '.$surat::SETUJU_INIT] = NULL;
            $records = $surat_imasuk_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
            }
            if(!empty($records)){
                $v['records']       = $records;
                $v['count']         = count($records);
                $unit_recs[$d_i]    = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        if(! $unit_recs){
            if(! $unit_recs){
                $unit_recs = array();
                $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
                $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
                $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
                $surat['no'] = 1;
                array_unshift($unit['records'], $surat);
                array_unshift($unit_recs, $unit);
            }
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_internal,
            'header'        =>$report_model->generateHeader($download),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unit_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename, true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }
 
    function internal_report_tunda(){
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unit_model         = $this->m_unit; 
        $asset_model        = $this->m_asset;

        $surat                          = $this->m_surat;
        $internal_view                  = $this->m_surat_imasuk_pending_view;
        $internal_tipe                  = $this->m_surat_jenis;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $tipeid         = varGet('tipe');
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        if(empty($param_unit) || is_null($param_unit)){
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        }else{
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null: array('unit_id'=>$param_unit)),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;
            unset($time_field['surat_properti_buat_unit']);
            if($tipeid && $tipeid != 'all'){
                $time_field['surat_jenis'] = $tipeid;
            }
            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $records = $internal_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
            }
            if(!empty($records)){
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs[$d_i] = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        if(! $unit_recs){
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit = array('unit_nama'=>$unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal' ), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_tunda,
            'header'        =>$report_model->generateHeader($download, 6),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unit_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_tunda_kewenangan(){
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unit_model         = $this->m_unit; 
        $asset_model        = $this->m_asset;

        $surat                          = $this->m_surat;
        $internal_view                  = $this->m_surat_imasuk_pending_view;
        $internal_tipe                  = $this->m_surat_jenis;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $tipeid         = varGet('tipe');
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        if(empty($param_unit) || is_null($param_unit)){
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        }else{
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null: array('unit_id'=>$param_unit)),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;
            unset($time_field['surat_properti_buat_unit']);
            if($tipeid && $tipeid != 'all'){
                $time_field['surat_jenis'] = $tipeid;
            }
            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $records = $internal_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
            }
            if(!empty($records)){
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs[$d_i] = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        if(! $unit_recs){
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit = array('unit_nama'=>$unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_tunda,
            'header'        =>$report_model->generateHeader($download, 6),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unit_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_tunda_semua(){
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unit_model         = $this->m_unit; 
        $asset_model        = $this->m_asset;

        $surat              = $this->m_surat;
        $internal_view      = $this->m_surat_imasuk_pending_view;
        $internal_tipe      = $this->m_surat_jenis;
        $pengaturan         = $this->m_pengaturan;

        $buatSuratMasuk = $pengaturan->getSettingByCode('use_unit_buat_surat_masuk');

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $tipeid         = varGet('tipe');
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        if($buatSuratMasuk){
            $unit_recs = $unit_model->find(
                array('IFNULL(unit_isbuatsurat, 0) = 1'=> null),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }else{
            $unitkerja_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unitkerja_recs2['data'];
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;
            unset($time_field['surat_properti_buat_unit']);
            if($tipeid && $tipeid != 'all'){
                $time_field['surat_jenis'] = $tipeid;
            }
            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $records = $internal_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
            }
            if(!empty($records)){
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs[$d_i] = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        if(! $unit_recs){
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit = array('unit_nama'=>$unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_tunda,
            'header'        =>$report_model->generateHeader($download, 6),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unit_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_rekap(){
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unitkerja_model    = $this->m_unit;
        $asset_model        = $this->m_asset;

        $internal_tipe      = $this->m_surat_jenis;
        $surat              = $this->m_surat_view;
        $rekap_imasuk_view  = $this->m_surat_imasuk_rekap_view;
        
        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        $model          = '';
        
        $tipe               = varGet('tipe');
        $param_unitkerja    = varGet('unit');
        $records            = array();
        $detail_surat       = array();

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();
        
        $_filter = $report_model->generateSelectField($filter, $filterValue);

        if($param_unitkerja) array_unshift($_filter, array('type'=>'exact', 'field'=>'unit_id', 'value'=>$param_unitkerja));
        if($tipe) array_unshift($_filter, array('type'=>'exact', 'field'=> 'jenis_id', 'value'=> $tipe));

        array_unshift($_filter, array('type'=>'exact', 'field'=>'surat_model', 'value'=>$surat::MODEL_IMASUK));
        array_unshift($_filter, array('type'=>'custom', 'value'=>'jenis_nama IS NOT NULL'));
        $sorter = array();
        array_unshift($sorter, array('property'=>'unit_nama', 'direction'=>'ASC'));
        array_unshift($sorter, array('property'=>'jenis_nama', 'direction'=>'ASC'));
        $data = $rekap_imasuk_view->select(
                    array(
                        'filter' => json_encode($_filter),
                        'sorter' => json_encode($sorter)
                    )
                );

        $grouped = array();
        if($data['total'] > 0){
            $datap = $data['data'];
            $no = 1;
            $ids_unit = array();
            foreach($datap as $kdata => $vdata){
                $kunit = $vdata['unit_id'];
                $kjenis = $vdata['jenis_id'];
                array_push($ids_unit, $kunit);
                $grouped[$kunit]['unit_nama'] = $vdata['unit_nama'];
                if(! array_key_exists('jenis_data', $grouped[$kunit])) $grouped[$kunit]['jenis_data'] = array();
                if(! array_key_exists($vdata['jenis_id'], $grouped[$kunit]['jenis_data'])) $grouped[$kunit]['jenis_data'][$kjenis] = array();
                if(! array_key_exists('jenis_nama', $grouped[$kunit]['jenis_data'][$kjenis])) $grouped[$kunit]['jenis_data'][$kjenis]['jenis_nama'] = $vdata['jenis_nama'];
                if(! array_key_exists('no', $grouped[$kunit]['jenis_data'][$kjenis])){
                    $no = count($grouped[$kunit]['jenis_data']);
                    $grouped[$kunit]['jenis_data'][$kjenis]['bg_color'] = ($no % 2 == 0) ?$this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                }
                foreach($vdata as $kval => $vval){
                    if(is_numeric($vval)){
                        if(! array_key_exists($kval, $grouped[$kunit]['jenis_data'][$kjenis])){
                            $grouped[$kunit]['jenis_data'][$kjenis][$kval] = $vval;
                        }else{
                            $grouped[$kunit]['jenis_data'][$kjenis][$kval] += $vval;
                        }
                    }
                }
            }
        }else{
            $_rekap = array(
                        'jenis_nama'            => $this::$default_value['nodata'],
                        'blm_distribusi_count'  => $this::$default_value['nodata'],
                        'process_done_count'    => $this::$default_value['nodata'],
                    );
            $_unit = array(
                        'unit_nama'=> $param_unitkerja ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : '<span style="font-style:italic;">(Tidak ada filter)</span>',
                        'jenis_data' => array(),
                        'records'    => array()
                     );

            array_unshift($_unit['records'], $_rekap);
            array_unshift($_unit['jenis_data'], $_rekap);
            $grouped = array($_unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title' => $report_title,
            'subtitle'=> $this->report_subtitle_rekap,
            'header'=>$report_model->generateHeader($download, 3),
            'periode'=>$report_model->generatePeriode($filter, $filterValue),
            'unit'=>$grouped,
            'dateReport'=>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'=>$user[$account_model->field_display]
        );
        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_rekap, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, 'Laporan_rekap_surat_masuk_internal_'.date('dmy'), true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, 'Laporan_rekap_surat_masuk_internal_'.date('dmy'));
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function next($section = null, $tipe = null, $scope = null){
        $me = $this;
        $model = $this->m_surat_ikeluar_view;
        $unit = $this->m_unit;
        $pegawai = $me->m_account->get_profile();
        $section = strtolower($section);

        $next = null;
        switch ($section) {
            case 'agenda':
                if($scope == NULL){
                    $dep = $pegawai['unit_id'];
                }else{
                    $deps = $unit->read($scope);
                    $dep = $deps['unit_id'];
                }
                
                if($tipe !== "null"){
                    $next = $model->max('surat_ikeluar_agenda', array(
                        'surat_ikeluar_unitpengirim'    => $dep,
                        'surat_ikeluar_tipe'            => $tipe
                    ));
                    $next = $next + 1;
                }else{
                    $next = "";
                }
                break;

            case 'nomor':
                $next = $model->generate_code($tipe, $scope);
                break;
            default:
                $next = "Data Tidak Tersedia";
                break;
        }
        $this->response(array(
            'next'=>$next
        ));
    }

    function get_latest_penyetuju($id = '96a066712f494d4b9ce700604f5985a5'){
        $surat_stack_penyetuju_view = $this->m_surat_stack_view;
        $a = $surat_stack_penyetuju_view->get_latest_penyetuju($id);
    }

    function internal_report_tolak() {
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unitkerja_model    = $this->m_unit;
        $asset_model        = $this->m_asset;

        $surat_status           = $this->m_surat;
        $jenis                  = $this->m_surat_jenis;
        $surat                  = $this->m_surat_view;
        $surat_imasuk_tolak     = $this->m_surat_imasuk_tolak_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $tipe               = varGet('tipe');
        $param_unitkerja    = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        if(empty($param_unitkerja) || is_null($param_unitkerja)){
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        }else{
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null: array('unit_id'=>$param_unitkerja)),
                null,null,null, array(
                'unit_nama'=>'asc'
            ));
        }

        if(!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => &$v) {
            
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;

            if(empty($tipe) || is_null($tipe)){
                $jenis2 = $jenis->select(array(
                    'filter'    => json_encode($filter),
                    'sorter'    => 'jenis_nama',
                ));
                $jenis_r = $jenis2['data'];
            }else{
                $jenis_r = $jenis->find(
                    ($tipe == 'all' ? null: array('jenis_id'=>$tipe)),
                    null,null,null, array(
                'jenis_nama'=>'asc'
                ));
            }

            $jenis_ids = "surat_jenis IN('".implode("', '", array_column($jenis_r, 'jenis_id'))."')";

            $time_field['surat_unit']     = $param_unitkerja;
            $time_field[$jenis_ids]       = null;

            $records = $surat_imasuk_tolak->find($time_field, null, null, null, array('surat_tanggal'=>'asc'));

            foreach($records as $index => &$r){
                $r['no'] = $index + 1;
                $r['bg_color'] =  ($index % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
            }
            
            if( ! $records){
                unset($unitkerja_recs[$d_i]);
            }else{
                $v['records'] = $records;
            }
        }

        if(! $unitkerja_recs){
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $this->report_title_tolak,
            'subtitle'      => $this->report_subtitle_tolak,
            'header'        =>$report_model->generateHeader($download, 7),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unitkerja_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_tolak_semua() {
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unitkerja_model    = $this->m_unit;
        $asset_model        = $this->m_asset;

        $surat_status           = $this->m_surat;
        $jenis                  = $this->m_surat_jenis;
        $surat                  = $this->m_surat_view;
        $surat_imasuk_tolak     = $this->m_surat_imasuk_tolak_view;
        $pengaturan             = $this->m_pengaturan;

        $buatSuratMasuk = $pengaturan->getSettingByCode('use_unit_buat_surat_masuk');

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $tipe               = varGet('tipe');
        $param_unitkerja    = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        if($buatSuratMasuk){
            $unitkerja_recs = $unitkerja_model->find(
                array('IFNULL(unit_isbuatsurat, 0) = 1'=> null),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }else{
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        }

        if(!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => &$v) {
            
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;

            if(empty($tipe) || is_null($tipe)){
                $jenis2 = $jenis->select(array(
                    'filter'    => json_encode($filter),
                    'sorter'    => 'jenis_nama',
                ));
                $jenis_r = $jenis2['data'];
            }else{
                $jenis_r = $jenis->find(
                    ($tipe == 'all' ? null: array('jenis_id'=>$tipe)),
                    null,null,null, array(
                'jenis_nama'=>'asc'
                ));
            }

            $jenis_ids = "surat_jenis IN('".implode("', '", array_column($jenis_r, 'jenis_id'))."')";

            $time_field['surat_unit']     = $param_unitkerja;
            $time_field[$jenis_ids]       = null;

            $records = $surat_imasuk_tolak->find($time_field, null, null, null, array('surat_tanggal'=>'asc'));

            foreach($records as $index => &$r){
                $r['no'] = $index + 1;
                $r['bg_color'] =  ($index % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
            }
            
            if( ! $records){
                unset($unitkerja_recs[$d_i]);
            }else{
                $v['records'] = $records;
            }
        }

        if(! $unitkerja_recs){
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $this->report_title_tolak,
            'subtitle'      => $this->report_subtitle_tolak,
            'header'        =>$report_model->generateHeader($download, 7),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unitkerja_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_tolak_kewenangan() {
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unitkerja_model    = $this->m_unit;
        $asset_model        = $this->m_asset;

        $surat_status           = $this->m_surat;
        $jenis                  = $this->m_surat_jenis;
        $surat                  = $this->m_surat_view;
        $surat_imasuk_tolak     = $this->m_surat_imasuk_tolak_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $tipe               = varGet('tipe');
        $param_unitkerja    = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        if(empty($param_unitkerja) || is_null($param_unitkerja)){
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        }else{
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null: array('unit_id'=>$param_unitkerja)),
                null,null,null, array(
                'unit_nama'=>'asc'
            ));
        }

        if(!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => &$v) {
            
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_re] = NULL;

            if(empty($tipe) || is_null($tipe)){
                $jenis2 = $jenis->select(array(
                    'filter'    => json_encode($filter),
                    'sorter'    => 'jenis_nama',
                ));
                $jenis_r = $jenis2['data'];
            }else{
                $jenis_r = $jenis->find(
                    ($tipe == 'all' ? null: array('jenis_id'=>$tipe)),
                    null,null,null, array(
                'jenis_nama'=>'asc'
                ));
            }

            $jenis_ids = "surat_jenis IN('".implode("', '", array_column($jenis_r, 'jenis_id'))."')";

            $time_field['surat_unit']     = $param_unitkerja;
            $time_field[$jenis_ids]       = null;

            $records = $surat_imasuk_tolak->find($time_field, null, null, null, array('surat_tanggal'=>'asc'));

            foreach($records as $index => &$r){
                $r['no'] = $index + 1;
                $r['bg_color'] =  ($index % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'].'.'.$r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
            }
            
            if( ! $records){
                unset($unitkerja_recs[$d_i]);
            }else{
                $v['records'] = $records;
            }
        }

        if(! $unitkerja_recs){
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_kelas_kode', 'surat_kelas_nama', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun','surat_jenis', 'surat_unit', 'surat_perihal'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $this->report_title_tolak,
            'subtitle'      => $this->report_subtitle_tolak,
            'header'        =>$report_model->generateHeader($download, 7),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$unitkerja_recs,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }
} 