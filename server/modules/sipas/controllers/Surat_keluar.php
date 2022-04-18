<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Surat_keluar extends Base_Controller 
{
    protected $message = array();

    static $report_template = 'sipas/surat/eksternal/eksternal';
    static $report_title    = 'Laporan Agenda Surat Keluar Eksternal Aktif';
    static $report_subtitle = 'Semua surat eksternal aktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit dalam instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.';

    static $report_subtitle_semua = 'Semua surat eksternal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.';

    static $report_subtitle_kewenangan = 'Semua surat eksternal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.';

    static $report_blmdisetujui_template    = 'sipas/surat/list';
    static $report_blmdisetujui_title       = 'Laporan Agenda Surat Keluar Eksternal Belum Disetujui';
    static $report_blmdisetujui_subtitle    = 'Semua surat keluar belum disetujui yang dibuat oleh Instansi pengguna aplikasi';

    static $report_backdate_template    = 'sipas/surat/list';
    static $report_backdate_title       = 'Laporan Agenda Surat Keluar Backdated';
    static $report_backdate_subtitle    = 'Semua surat keluar backdated yang dikeluarkan oleh Instansi pengguna aplikasi';

    public $report_title_rekap      = 'Laporan Rekap Jumlah Surat Keluar Eksternal';
    public $report_subtitle_rekap   = 'Rekap jumlah surat keluar yang dibuat oleh Instansi pengguna aplikasi';
    public $report_template_rekap   = 'sipas/surat/eksternal/eksternal_keluar_jumlah';

    public $report_template_retensi             = 'sipas/surat/eksternal/eksternal_inaktif';
    public $report_title_retensi                = 'Laporan Rekap Surat Keluar Internal Yang Akan Berakhir';
    public $report_subtitle_retensi             = 'Rekap surat keluar eksternal inaktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.';
    public $report_subtitle_retensi_semua       = 'Rekap surat keluar eksternal inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.';
    public $report_subtitle_retensi_kewenangan   = 'Rekap surat keluar eksternal inaktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit di instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.';

    static $bg_color_item_laporan = array('odd'=> 'background-color: #F5F5F5;', 'even'=> 'background-color: #FFFFFF;');

    static $default_value    = array(
        'empty'      => '<span style="color:grey; font-style:italic;">(dalam proses)</span>',
        'title'      => '<span style="color:white; font-style:italic;">(Tidak ada Unit)</span>',
        'nodata'     =>'<span style="color:grey; font-style:italic;">(Tidak Ada Data)</span>',
        'unitnama'   => '<span style="color:grey; font-style:italic;">(Tidak memiliki unit)</span>',
        'agenda'     => '<span style="color:grey; font-style:italic;">(Tidak memiliki Agenda)</span>',
        'nosurat'    => '<span style="color:grey; font-style:italic;">(Tidak memiliki Nomor Surat)</span>',
        'registrasi' => '<span style="color:grey; font-style:italic;">(Tidak memiliki Tanggal Registrasi)</span>',
        'surattgl'   => '<span style="color:grey; font-style:italic;">(Tidak memiliki Tanggal)</span>',
        'tujuan'     => '<span style="color:grey; font-style:italic;">(Tidak memiliki Penerima)</span>',
        'perihal'    => '<span style="color:grey; font-style:italic;">(Tidak memiliki Perihal)</span>',
        'pengirim'   => '<span style="color:grey; font-style:italic;">(Tidak memiliki Pengirim)</span>',
        'jenis'      => '<span style="color:grey; font-style:italic;">(Tidak memiliki Jenis)</span>',
        'unit'       => '<span style="color:grey; font-style:italic;">(Tidak memiliki Unit)</span>',
        'lokasi'     => '<span style="color:grey; font-style:italic;">-</span>',
        'lampiran'   => '<span style="color:grey;">-</span>',
        'kelas'      => '<span style="color:grey; font-style:italic;">(Tidak memiliki Klasifikasi)</span>',
        'kelas_kode' => '<span style="color:grey; font-style:italic;">(Tidak memiliki Kode Klasifikasi)</span>'
    );

	public function __construct()
    {
        parent::__construct();
        $this->m_account            = $this->model('sipas/account',    true);
        $this->m_report             = $this->model('sipas/report',     true);
        $this->m_asset              = $this->model('sipas/asset',      true);
        $this->m_arsip              = $this->model('sipas/arsip',      true);
        $this->m_dokumen            = $this->model('sipas/dokumen',    true);
        $this->m_surat              = $this->model('sipas/surat',      true);
        $this->m_pengaturan         = $this->model('sipas/pengaturan', true);
        $this->m_surat_log          = $this->model('sipas/surat_log',  true);
        $this->m_surat_view         = $this->model('sipas/surat_view', true);

        $this->m_surat_keluar_view              = $this->model('sipas/surat_keluar_view',   true);
        $this->m_surat_keluar_setuju_view       = $this->model('sipas/surat_keluar_setuju_view',   true);
        $this->m_surat_keluar_setuju_list_view  = $this->model('sipas/surat_keluar_setuju_list_view',   true);
        $this->m_korespondensi                  = $this->model('sipas/korespondensi',       true);
        $this->m_korespondensi_view             = $this->model('sipas/korespondensi_view',  true);
        $this->m_disposisi                      = $this->model('sipas/disposisi',           true);
        $this->m_disposisi_view                 = $this->model('sipas/disposisi_view',      true);

        $this->m_disposisi_masuk         = $this->model('sipas/disposisi_masuk',                   true);
        $this->m_disposisi_masuk_view    = $this->model('sipas/disposisi_masuk_netral_view',       true);

        $this->m_surat_keluar_aktif_view            = $this->model('sipas/surat_keluar_aktif_view',             true);
        $this->m_surat_keluar_nonaktif_view         = $this->model('sipas/surat_keluar_nonaktif_view',          true);
        $this->m_surat_keluar_terlewat_nonaktif_view = $this->model('sipas/surat_keluar_terlewat_nonaktif_view',true);
        $this->m_surat_keluar_hidup_view            = $this->model('sipas/surat_keluar_hidup_view',             true);
        $this->m_surat_keluar_draft_view            = $this->model('sipas/surat_keluar_draft_view',             true);
        $this->m_surat_keluar_dlm_setuju_view       = $this->model('sipas/surat_keluar_dlm_setuju_view',        true);
        $this->m_surat_keluar_revisi_view           = $this->model('sipas/surat_keluar_revisi_view',            true);
        $this->m_surat_keluar_tolak_view            = $this->model('sipas/surat_keluar_tolak_view',             true);
        $this->m_surat_keluar_blm_nomor_view        = $this->model('sipas/surat_keluar_blm_nomor_view',         true);
        $this->m_surat_keluar_blm_ekspedisi_view    = $this->model('sipas/surat_keluar_blm_ekspedisi_view',     true);
        $this->m_surat_keluar_ekspedisi_view        = $this->model('sipas/surat_keluar_ekspedisi_view',         true);
        $this->m_surat_keluar_batal_nomor_view      = $this->model('sipas/surat_keluar_batal_nomor_view',       true);
        $this->m_surat_keluar_salin_nomor_view      = $this->model('sipas/surat_keluar_salin_nomor_view',       true);

        $this->m_unit_cakupan       = $this->model('sipas/unit_cakupan',                true);
        $this->m_unit_cakupan_view  = $this->model('sipas/unit_cakupan_view',           true);
        $this->m_staf_recent        = $this->model('sipas/staf_aktual',                 true);
        $this->m_jabatan_recent     = $this->model('sipas/jabatan_aktual',              true);

        $this->m_surat_libnomor                 = $this->model('sipas/surat_libnomor',                  true);
        $this->m_surat_stack        = $this->model('sipas/surat_stack',                 true);
        $this->m_surat_stack_view   = $this->model('sipas/surat_stack_koreksi_view',    true);
        $this->m_properti           = $this->model('sipas/properti',                    true);
        $this->m_kontak             = $this->model('sipas/kontak',                      true);
        $this->m_staf               = $this->model('sipas/staf',                        true);
        $this->m_staf_view          = $this->model('sipas/staf_view',                   true);
        $this->m_unit               = $this->model('sipas/unit',                        true);
        $this->m_jenis              = $this->model('sipas/jenis',                       true);
        $this->m_jabatan            = $this->model('sipas/jabatan',                     true);
        $this->m_notifikasi         = $this->model('sipas/notifikasi',                  true);

        $this->m_surat_ekeluar_rekap_view           = $this->model('sipas/surat_rekap_by_model_view',           true);
        $this->m_surat_keluar_rekap_berakhir_view   = $this->model('sipas/surat_keluar_rekap_berakhir_view',    true);

        $this->m_koreksi_masuk_view     = $this->model('sipas/koreksi_masuk_view',   true);
    }

    public function index(){
        $this->read();
    }
    
    public function read() {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_hidup_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }
        else
        {
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            
            $this->response($records);
        }
    }

    public function draft()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_draft_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id'))
        {
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }
        else
        {
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            
            $this->response($records);
        }
    }

    public function dlm_setuju()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_dlm_setuju_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id'))
        {
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }
        else
        {
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            
            $this->response($records);
        }
    }

    public function setuju()
    {
        $surat      = $this->m_surat;
        $model      = $this->m_surat_keluar_setuju_view;
        $scope      = $this->m_unit_cakupan_view;
        $account    = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id'))
        {
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }
        else
        {
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function referensi() {
        $model      = $this->m_surat_keluar_view;
        $pengaturan = $this->m_pengaturan;
        $jenis      = $this->m_jenis;
        $account    = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
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
            $nomorJenisTerpusat = $pengaturan->getSettingByCode('template_nomor_keluar_perjenis_terpusat');
            $nomorJenisUnit     = $pengaturan->getSettingByCode('template_nomor_keluar_perjenis_unit');
            $jenis_id           = varGet('jenis');

            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $scopeid = $account['staf_unit'];
            }

            $dataJenis = $jenis->read($jenis_id);

            array_unshift($filter, (object)array(
                'type'  => 'custom',
                'value' => 'surat_isnomor = "1" AND IFNULL(surat_nomor_issalin, 0) = "0"'
            ));

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_jenis',
                'value' => $jenis_id
            ));
            
            array_unshift($sorter, (object)array(
                'property'  => 'surat_nomor_urut',
                'direction' => 'DESC'
            ));
            array_unshift($sorter, (object)array(
                'property'  => 'DATE(surat_tanggal)',
                'direction' => 'DESC'
            ));

            if($dataJenis['jenis_terpusat'] == 2 || ($dataJenis['jenis_terpusat'] == 0 || empty($dataJenis['jenis_terpusat']))) {
                array_unshift($filter, (object)array(
                    'type'  => 'exact',
                    'field' => 'surat_unit',
                    'value' => $scopeid
                ));
            }

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            // print_r($model->get_lastquery());
            $this->response($records);
        }
    }

    public function setuju_list()
    {
        $surat      = $this->m_surat;
        $model      = $this->m_surat_keluar_setuju_list_view;
        $scope      = $this->m_unit_cakupan_view;
        $account    = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);

        }else{
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function revisi()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_tolak_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);

        } else {
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function blm_nomor()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_blm_nomor_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function blm_ekspedisi()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_blm_ekspedisi_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function ekspedisi()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_ekspedisi_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function batal_nomor()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_batal_nomor_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }
        else
        {
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function salin_nomor()
    {
        $surat = $this->m_surat;
        $model = $this->m_surat_keluar_salin_nomor_view;
        $scope    = $this->m_unit_cakupan_view;
        $account  = $this->m_account->get_profile();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
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

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            
            $this->response($records);
        }
    }

    public function aktif()
    {
        $surat_masuk_view = $this->m_surat_keluar_aktif_view;
        $scope = $this->m_unit_cakupan_view;
        $account = $this->m_account->get_profile();

        $now = new DateTime();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id     = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        }else{
            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $scopeid = $account['staf_unit'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function nonaktif(){
        $surat_masuk_view   = $this->m_surat_keluar_nonaktif_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $now = new DateTime();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        }else{
            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $scopeid = $account['staf_jabatan'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function terlewat_nonaktif(){
        $surat_masuk_view   = $this->m_surat_keluar_terlewat_nonaktif_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $now = new DateTime();

        if(varGetHas('id') || varGetHas('surat_id')){
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        }else{
            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $scopeid = $account['staf_jabatan'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            
            $this->response($records);
        }
    }

    public function create($usePayload = true){
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

        $data['surat_buat_tgl'] = $now;
        $data['surat_buat_staf'] = $akun;
        $data['surat_buat_profil'] = $stafProfil['staf_profil'];
        $data['surat_arah_profil'] = $stafProfil['staf_profil'];
        $data['surat_tanggal'] = $now;
        $data['surat_setuju_isurut'] = 1;
        $data['surat_registrasi'] = $surat_view->generate_code();
        $data['surat_setuju'] = $surat_view::SETUJU_INIT;
        
        //insert arsip
        $dataArsip = array(
            'arsip_nama' => 'SK.'.$data['surat_registrasi']
        );
        $arsip->insert($dataArsip);
        $data['surat_arsip'] = $arsip->get_insertid();

        $operation = $model->insert($data, null, function($response) 
            use ($model, $data, $surat_log, $akun, $properti, $now, $stafProfil){
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
                'surat_log_surat'=>$inserted_data['surat_id'],
                'surat_log_staf'=>$akun,
                'surat_log_profil'=>$stafProfil['staf_profil'],
                'surat_log_tgl'=>$now);

            $operation_log = $surat_log->insert($dataLog, null, function($response){});
            if($data['surat_korespondensi_surat']){
                $dataLog1 = array(
                    'surat_log_tipe' => 14,
                    'surat_log_surat'=>$data['surat_korespondensi_surat'],
                    'surat_log_staf'=>$akun,
                    'surat_log_profil'=>$stafProfil['staf_profil'],
                    'surat_log_tgl'=>$now);

                $operation_log1 = $surat_log->insert($dataLog1, null, function($response){});
            }
            // $operation_log = $surat_log->created($akun, $inserted_data);
        });
        $operation[$model->dataProperty] = $this->m_surat_keluar_view->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $me = $this;
        $me->load->library('parser');
        // $me->load->library('queue');
        // $me->queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');
        $worker_mode = Config()->item('worker_mode');
        $queuetubeDisposisi = Config()->item('queueServer_tubeDisposisi');
        $queuetubeKoreksi = Config()->item('queueServer_tubeKoreksi');

        $model      = $this->m_surat;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $disposisi  = $this->m_disposisi;
        $kontak     = $this->m_kontak;
        $pengaturan = $this->m_pengaturan;
        $notifikasi = $this->m_notifikasi;
        $model_staf = $this->m_staf;

        $disposisi_view     = $this->m_disposisi_view;
        $surat              = $this->m_surat;
        $surat_log          = $this->m_surat_log;
        $surat_view         = $this->m_surat_view;
        $surat_stack        = $this->m_surat_stack;
        $surat_stack_view   = $this->m_surat_stack_view;
        $surat_libnomor     = $this->m_surat_libnomor;

        $disposisi_masuk      = $this->m_disposisi_masuk;
        $disposisi_masuk_view = $this->m_disposisi_masuk_view;
        $koreksi_masuk_view   = $this->m_koreksi_masuk_view;

        $akun       = $account->get_profile_id();
        $stafProfil = $model_staf->read($akun);
        $primary    = $model->get_primary();
        $payload    = getRequestPayload();
        $data       = (array) ($usePayload ? $payload : varPost());

        $penyetuju  = varReq('py');
        $penyetuju_profil = varReq('py_p');
        $penerima   = varReq('pn');
        $penerima_profil = varReq('pn_p');
        $upenyetuju = varReq('upy');
        $upenyetuju_profil = varReq('upy_p');
        $upenerima  = varReq('upn');
        $upenerima_profil = varReq('upn_p');
        $isapproval = varReq('approve');
        $temporary  = varReq('temp');
        $salin      = varReq('salin');
        $pilih      = (varReq('pilih')) ? varReq('pilih') : 0;
        $beri_ulang = varReq('beri_ulang');
        $log        = varReq('log');
        $setuju     = varReq('setujui');
        $booking    = varReq('booking');
        $internal   = varReq('internal');
        $check      = varReq('check');
        $sdoc       = varReq('sdoc');
        // $isberkas   = varGet('b');
        $now        = date('Y-m-d H:i:s');
        $date       = date('Y-m-d');
        $this_year  = date('Y');
        $account_id = $this->m_account->get_profile_id();
        $modelSurat = $this->m_surat_keluar_hidup_view;
        $nomor = $data['surat_nomor'];
        $nomor_urut = $data['surat_nomor_urut'];
        $tujuan = $data['surat_tujuan'];
        $tglsurat = $data['surat_tanggal'];
        $tglbuat = $data['surat_properti_buat_tgl'];
        $tglsurat = str_replace("00:00:00", date('H:i:s'), $tglsurat);
        $createDate = new DateTime($tglbuat);
        $tgl_surat = $createDate->format('Y-m-d H:i:s');
        $tgl_surat2 = $createDate->format('Y-m-d');
        $SuratDate = new DateTime($tglsurat);
        $tgl = $SuratDate->format('Y');
        $suratTgl = $SuratDate->format('Y-m-d');
        $suratTgl2 = $SuratDate->format('Y-m-d  H:i:s');
        $jenis = $this->m_jenis;
        $jenisD = $jenis->read($data['surat_jenis']);
        $jenisTerpusat = (int)$jenisD['jenis_terpusat'];
        $nomorJenisTerpusat = $pengaturan->getSettingByCode('template_nomor_keluar_perjenis_terpusat');
        $nomorJenisUnit = $pengaturan->getSettingByCode('template_nomor_keluar_perjenis_unit');
        $nomorUnit = $pengaturan->getSettingByCode('template_nomor_keluar_perunit');
        $nomorTerpusat = $pengaturan->getSettingByCode('template_nomor_keluar_terpusat');
        $nomor_backdate = $pengaturan->getSettingByCode('use_nomor_backdate');
        $digitNomor = $pengaturan->getSettingByCode('template_digit_nomor_surat_keluar');
        $penomoran_urut     = Config()->item('penomoran_urut_eksternal');
	
        $config_updated    = varReq('updated');
        $config_booking    = varReq('config_booking');
	
	
        if($config_booking){
            $data['surat_isbooking'] = 1;
            $config = varReq('config');
            $con = json_decode($config, true);

            $update_urutan = $surat_libnomor->update_booking($con, $data['surat_nomor_urut']);
        }else{
            if($config_updated){
                $config = varReq('config');
                $con = json_decode($config, true);

                $update_urutan = $surat_libnomor->update_code($con);
            }
        }
	
        if(!$nomor_urut && !$nomor && $nomor_backdate && $check && $pilih == 0){ 
            if($suratTgl != $date){
                $data['surat_isbackdate'] = 1;
            }else{
                if($suratTgl < $tgl_surat2){
                    $data['surat_isbackdate'] = 1;
                }else{
                    $data['surat_isbackdate'] = 0;
                }
            }
        }

        
        /* jika memakai pengaturan pemberian info backdate dan (savesend/simpansetujui/berinomor) */
        if (($data['surat_setuju'] == 0 && !empty($data['surat_nomor_urut'])) || $data['surat_setuju'] == 4) {
            $check = null;
        }
        
        if($nomor_backdate && $check && $penomoran_urut == 1 && $pilih == 0){
            $no_urut = str_pad('1', strlen($digitNomor),'0',STR_PAD_LEFT);

            $filSurat_no1 = array(
                'surat_nomor_urut' => $no_urut,
                'IFNULL(surat_nomor_backdate, 0) = 0' => NULL
            );
            $filSuratNow = array(
                'IFNULL(surat_ishapus, 0) = 0' => NULL,
                'DATE(surat_tanggal) > "' . $suratTgl.'"' => NULL,
            );
            $filCariSurat = array(
                'IFNULL(surat_ishapus, 0) = 0' => NULL,
                'DATE(surat_tanggal) <= "' . $suratTgl . '"' => NULL,
                'YEAR(surat_tanggal)' => $tgl,
                'surat_nomor IS NOT NULL' => NULL,
                'IFNULL(surat_nomor_issalin,0) = 0' => NULL,
            );
            $filCariBackdate = array(
                'IFNULL(surat_ishapus, 0) = 0' => NULL,
                'DATE(surat_tanggal) > "' . $suratTgl.'"' => NULL,
                'surat_nomor IS NOT NULL' => NULL,
                'IFNULL(surat_nomor_issalin,0) = 0' => NULL,
            );
            
            if($jenisTerpusat !== 0){
                $filSurat_no1["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;
                $filSuratNow["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;
                $filCariSurat["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;
                $filCariBackdate["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;

                $filSurat_no1['surat_model'] = $data['surat_model'];
                $filSuratNow['surat_model'] = $data['surat_model'];
                $filCariSurat['surat_model'] = $data['surat_model'];
                $filCariBackdate['surat_model'] = $data['surat_model'];

                if($jenisTerpusat === 1){ /* jika pengaturan khusus = terpusat perjenis */
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];
                }
                else if($jenisTerpusat === 2){ /* jika pengaturan khusus = perunit perjenis*/
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];

                    $filSurat_no1['surat_unit'] = $data['surat_unit'];
                    $filSuratNow['surat_unit'] = $data['surat_unit'];
                    $filCariSurat['surat_unit'] = $data['surat_unit'];
                    $filCariBackdate['surat_unit'] = $data['surat_unit'];
                }
            }else{ /* jika pengaturan penomoran = pengaturan sistem */
                $filSurat_no1["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;
                $filSuratNow["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;
                $filCariSurat["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;
                $filCariBackdate["YEAR(surat_tanggal) = '".$tgl."'"] = NULL;
                
                $filSurat_no1['surat_model'] = $data['surat_model'];
                $filSuratNow['surat_model'] = $data['surat_model'];
                $filCariSurat['surat_model'] = $data['surat_model'];
                $filCariBackdate['surat_model'] = $data['surat_model'];
                
                if ($nomorJenisTerpusat) {
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];
                }
                else if ($nomorJenisUnit) {
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];

                    $filSurat_no1['surat_unit'] = $data['surat_unit'];
                    $filSuratNow['surat_unit'] = $data['surat_unit'];
                    $filCariSurat['surat_unit'] = $data['surat_unit'];
                    $filCariBackdate['surat_unit'] = $data['surat_unit'];
                }
                else if ($nomorUnit) {
                    $filSurat_no1['surat_unit'] = $data['surat_unit'];
                    $filSuratNow['surat_unit'] = $data['surat_unit'];
                    $filCariSurat['surat_unit'] = $data['surat_unit'];
                    $filCariBackdate['surat_unit'] = $data['surat_unit'];
                }
                else if ($nomorTerpusat) {
                    $filSurat_no1['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                    $filSuratNow['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                    $filCariSurat['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                    $filCariBackdate['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                }
            }

            $surat_no1 = $surat_view->read($filSurat_no1);

            if(!empty($surat_no1)){
                $SuratDate_no1 = new DateTime($surat_no1['surat_tanggal']);
                $tgl_no1 = $SuratDate_no1->format('Y-m-d');

                if($tgl_no1 > $suratTgl){
                    $operation['success'] = false;
                    $operation['message'] = 'Anda tidak bisa backdate pada tanggal ini';
                    return $this->response($operation);
                }else{
                    $suratNow = $surat_view->find($filSuratNow, false, false, true, array('surat_agenda' => 'desc'));
                    if (!empty($suratNow) && $data['surat_isbackdate']) {
                        $cariSurat = $surat_view->find($filCariSurat, false, false, true, array('surat_nomor_urut' => 'desc', 'surat_nomor_backdate' => 'desc'));

                        if (empty($cariSurat)) {
                            $operation['success'] = false;
                            $operation['message'] = 'Anda tidak bisa backdate pada tanggal ini';
                            return $this->response($operation);
                        }

                        if(!empty($cariSurat)){
                            $no_backdate = array();

                            // usort($cariSurat, function($a, $b) {
                            //     if($a['surat_nomor_backdate']==$b['surat_nomor_backdate']) return 0;
                            //     return $a['surat_nomor_backdate'] < $b['surat_nomor_backdate']?1:-1;
                            // });
                            foreach ($cariSurat as $key => $value) {
                                if($value['surat_nomor_backdate'] && ($value['surat_nomor_urut'] == $cariSurat[0]['surat_nomor_urut'])){
                                    array_push($no_backdate, $value['surat_nomor_backdate']);
                                }
                            }
                            
                            if(!empty($no_backdate)){
                                $numBackdate = $no_backdate[0];
                                
                                if ($numBackdate == '0' || $numBackdate == null) {
                                    $numBackdate = 'A';
                                }else{
                                    $numBackdate++;
                                }
                            }else{
                                $numBackdate = 'A';
                            }

                            $filCariBackdate['surat_nomor_backdate'] = $numBackdate;
                            $filCariBackdate['surat_nomor_urut'] = $cariSurat[0]['surat_nomor_urut'];

                            $cariBackdate = $surat_view->find($filCariBackdate);

                            if (!empty($cariBackdate)) {
                                $operation['success'] = false;
                                $operation['message'] = 'Anda tidak bisa backdate pada tanggal ini';
                                return $this->response($operation);
                            }
                        }
                    }
                }
            }
        }

        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $bookingNomor = $pengaturan->getSettingByCode('use_booking_nomor');
        $mergeData = $pengaturan->getSettingByCode('use_data_merge');
        $autoNomor = $pengaturan->getSettingByCode('use_auto_nomor_eksternal');

        $findKontak = $kontak->find(array('kontak_nama'=>$tujuan));

        if(empty($findKontak[0])){
            $dataKon = array('kontak_nama'=>$tujuan);
            $kontak->insert($dataKon, null, function($response) use($kontak, $akun, $properti, $data){
                $inserted_data = $kontak->read($kontak->get_insertid());
                $op = $properti->created($akun, $inserted_data, 'kontak', $inserted_data['kontak_id'], $inserted_data['kontak_nama']);
                if($op){
                    $kontak->update($inserted_data['kontak_id'], array(
                        'kontak_properti' => $op['properti_id']
                    ));
                }
            });
        }

        // update first before generate nomor
        $model->update($id, $data);

        if ($salin) {
            // comment by dian 
            $model->update($salin, array(
                'surat_nomor_issalin' => 1
            ));

            $dataLog = array(
                'surat_log_tipe' => 21,
                'surat_log_surat'=>$salin,
                'surat_log_staf'=>$akun,
                'surat_log_profil'=>$stafProfil['staf_profil'],
                'surat_log_tgl'=>$now);

            $operation_log = $surat_log->insert($dataLog, null, function($response){});

        }

        //untuk pemberian nomor ketika revisi dan jenis bukan nomor awal
        if($nomor && !$jenisD['jenis_nomor_awal'] && $data['surat_setuju'] == 3 && !$upenyetuju){
            $modelSurat = $this->m_surat_keluar_view;
            $tglsurat = $data['surat_tanggal'];
            $SuratDate = new DateTime($tglsurat);
            $suratTgl = $SuratDate->format('Y-m-d');
            
            $pat = array_merge(
                    array(
                        '#'         => $data['surat_nomor_urut'],
                        'backdate'  => $data['surat_nomor_backdate']
                    ),
                $pengaturan->getCompiledDataTemplate($id, end($penyetuju), $suratTgl)
            );

            if($data['surat_nomor_backdate']){
                $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar_backdate');
            }else{
                $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar');
            }

            $data['surat_nomor'] = $this->parser->parse_string($data['surat_nomor_format'], $pat);
        }

        //proses save 
        if($setuju){ /*simpan dan setujui*/
            if($autoNomor == "1" && !$nomor){
                $nomor = $surat_view->generate_nomor($id, 'keluar', $akun, true, $now);
                if($data['surat_isbackdate'] === 1){
                    $data['surat_nomor_backdate'] = $nomor['backdate'];
                    $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar_backdate');
                }else{
                    $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar');
                }

                $data['surat_nomor_urut'] = $nomor['digit']; 
                $data['surat_distribusi_tgl'] = $now;
                $data['surat_distribusi_staf'] = $account_id;
                $data['surat_distribusi_profil'] = $stafProfil['staf_profil'];
                $data['surat_nomor_otomatis'] = 1;
                $data['surat_nomor_tgl'] = $now;
                $data['surat_nomor_staf'] = $account_id;
                $data['surat_nomor_profil'] = $stafProfil['staf_profil'];
                $data['surat_nomor'] = $nomor['nomor'];
                $data['surat_nomor_asli'] = $nomor['nomor'];
            }

            $data['surat_setuju_akhir_staf'] = $account_id;

            $operation = $model->update($id, $data, function ($response)
            use ($data, $akun, $account, $account_id, $surat_log, $properti, $model, $mergeData, /*$isberkas,*/ $id, $disposisi, $model_staf,
                $disposisi_masuk, $disposisi_masuk_view, $surat_view, $log, $surat_stack, $now, $disposisi_view, $nomor, $pengaturan, 
                $internal,$autoNomor, $penerima, $queueTube, $queueTubeRedis, $worker_mode, $queuetubeDisposisi, $stafProfil, $notifikasi, 
                $isapproval, $penyetuju_profil, $penerima_profil, $upenyetuju_profil, $upenerima_profil) {
                if ($response[$model->successProperty] !== true) return;

                $updated_data = $response['data'];
                if(!$data['surat_nomor']){
                    if (Config()->item('queueServer')['host']) {
                        $data_redis = array(
                            'type'=>'SuratKeluar-Unit',
                            'staf_id'=>null,
                            'jabatan_id'=>null,
                            'unit_id'=>$data['surat_unit'],
                            'data'=> $data['surat_unit']
                        );
                        $addJobUnit = create_job($queueTubeRedis, $data_redis);
                    }

                    // pushEvent(array(
                    //     'to' => $data['surat_unit'],
                    //     'data' => array(
                    //         'api' => 'surat_keluar',
                    //         'id' => $id
                    //     ),
                    //     'group' => array('unit'),
                    //     'type' => 'surat_keluar'
                    // ));
                }

                if($log){
                    $dataLog2 = array(
                        'surat_log_tipe' => $log,
                        'surat_log_surat'=>$data['surat_id'],
                        'surat_log_staf'=>$account_id,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$now
                    );

                    $operation_log2 = $surat_log->insert($dataLog2, null, function($response){});
                }

                $dataLog = array(
                    'surat_log_tipe' => 5,
                    'surat_log_surat'=>$updated_data['surat_id'],
                    'surat_log_staf'=>$akun,
                    'surat_log_profil'=>$stafProfil['staf_profil'],
                    'surat_log_setuju' => $updated_data['surat_setuju'],
                    'surat_log_tgl'=>$now);

                $operation_log = $surat_log->insert($dataLog, null, function($response){});

                if ($data['surat_distribusi_tgl']) {
                    $dataLog2 = array(
                        'surat_log_tipe' => 7,
                        'surat_log_surat'=>$data['surat_id'],
                        'surat_log_staf'=>$account_id,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$now);

                    $operation_log2 = $surat_log->insert($dataLog2, null, function($response){});
                }
                $idProp = $updated_data['surat_properti'];
                if(empty($idProp)){
                    $op = $properti->created($account_id, $updated_data, 'surat', $updated_data['surat_id'], $updated_data['surat_registrasi']);
                    if($op){
                        $model->update($updated_data['surat_id'], array(
                            'surat_properti' => $op['properti_id']
                        ));
                    }
                }
                $properti->updated($idProp, $account_id, $updated_data, $updated_data['surat_registrasi']);

                if(empty($data['surat_korespondensi_surat'])) {
                    /*if no `korespondensi` attached on surat so it will create new and as root*/
                    if(empty($data['surat_korespondensi'])){
                        $this->m_korespondensi->insert(array(
                            'korespondensi_perihal'     => $data['surat_perihal'],
                            'korespondensi_pengirim'    => $data['surat_pengirim'],
                            'korespondensi_penerima'    => $data['surat_tujuan'],
                            'korespondensi_isinternal'  => 0),
                        null, function($r_korespondensi) use( $response, $model, $properti, $account_id, $surat_view){
                            if($r_korespondensi[$model->successProperty] !== true) return;

                            $inserted_data = $this->m_korespondensi->read($this->m_korespondensi->get_insertid());
                            $op = $properti->created($account_id, $inserted_data, 'korespondensi', $inserted_data['korespondensi_id'], $inserted_data['korespondensi_nomor']);
                            if($op){
                                $this->m_korespondensi->update($inserted_data['korespondensi_id'], array(
                                    'korespondensi_properti' => $op['properti_id']
                                ));
                            }

                            $model->update($response[$model->dataProperty][$model->get_primary()], array(
                                'surat_korespondensi' => $r_korespondensi[$model->dataProperty][$this->m_korespondensi->get_primary()]
                            ), function($response_korespondensi) use ($model, $properti, $account_id, $surat_view){
                                if($response_korespondensi[$model->successProperty] !== true) return;
                                $updated_data = $model->read($surat_view->get_insertid());
                                $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                            });
                        });
                    }
                }else{
                    $korespondensi_surat = $model->read($data['surat_id']);
                    if($korespondensi_surat){
                        $model->update($response[$model->dataProperty][$model->get_primary()], array(
                            'surat_korespondensi'       => $data['surat_korespondensi'],
                            'surat_korespondensi_surat' => $data['surat_korespondensi_surat']
                        ), function($response_korespondensi) use ($model, $properti, $account_id){
                            if($response_korespondensi[$model->successProperty] !== true) return;
                            $updated_data = $response_korespondensi['data'];
                            $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                        });
                    }
                }

                $disposisi_operation = $disposisi->insert(
                    array(
                        'disposisi_tgl'      => $now,
                        'disposisi_pelaku'   => $account_id,
                        'disposisi_pelaku_profil'  => $stafProfil['staf_profil'],                        
                        'disposisi_staf'     => $account_id,
                        'disposisi_profil'   => $stafProfil['staf_profil'],
                        'disposisi_model'    => $disposisi_view::MODEL_KOREKSI,
                        'disposisi_surat'    => $data['surat_id'],
                        'disposisi_baca_tgl' => $now
                    ),null,
                    function($response) use($disposisi, $disposisi_masuk, $disposisi_masuk_view, $surat_view, $surat_stack, $data, $surat_log, 
                        $properti, $account, $account_id, $now, $stafProfil, $pengaturan, $notifikasi){

                        $inserted_data = $response['data'];
                        $disposisi_id = $inserted_data['disposisi_id'];
                            $updated_data = $disposisi->update($disposisi_id, array('disposisi_parent_path' => '/'.$disposisi_id));
                        /*insert properti*/
                        $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                        if($op){
                            $disposisi->update($inserted_data['disposisi_id'], array(
                                'disposisi_properti' => $op['properti_id']
                            ));
                        }

                        /*delete stack first*/
                        $surat_stack->delete(array(
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU
                        ), function ($response){});

                        $penyetuju_stack = $surat_stack->insert(array(
                            'surat_stack_staf'    => $account_id,
                            'surat_stack_profil'  => $stafProfil['staf_profil'],
                            'surat_stack_surat'   => $data['surat_id'],
                            'surat_stack_model'   => $surat_stack::MODEL_PENYETUJU,
                            'surat_stack_level'   => 0,
                            'surat_stack_status'  => $surat_view::SETUJU_SETUJU,
                            'surat_stack_status_tgl'  => $now,
                            'surat_stack_baca_tgl'  => $now,
                            'surat_stack_komentar'=> 'Penyetujuan otomatis'
                        ));

                        $disposisi_id = $disposisi->get_insertid();
                        $disposisi_masuk->insert(array(
                            'disposisi_masuk_disposisi'  => $disposisi_id,
                            'disposisi_masuk_staf'       => $account_id,
                            'disposisi_masuk_profil'     => $stafProfil['staf_profil'],
                            'disposisi_masuk_baca_staf'  => $account_id,
                            'disposisi_masuk_baca_profil'  => $stafProfil['staf_profil'],
                            'disposisi_masuk_baca_tgl'   => $now,
                            'disposisi_masuk_terima_staf'=> $account_id,
                            'disposisi_masuk_terima_profil'  => $stafProfil['staf_profil'],
                            'disposisi_masuk_terima_tgl' => $now,
                            'disposisi_masuk_status'     => $surat_view::SETUJU_SETUJU,
                            'disposisi_masuk_status_staf'=> $account_id,
                            'disposisi_masuk_status_profil'=> $stafProfil['staf_profil'],
                            'disposisi_masuk_status_tgl' => $now
                        ), null, function($response) use($properti, $account, $account_id, $data, $disposisi_masuk, $pengaturan, $notifikasi){
                            if($response[$disposisi_masuk->successProperty] !== true) return;
                            $inserted_data = $response['data'];
                            $disposisi_id = $disposisi_masuk->get_insertid();
                            $updated_data = $disposisi_masuk->update($disposisi_id, array('disposisi_masuk_parent_path' => '/'.$disposisi_id));
                            $op = $properti->created($account_id, $inserted_data, 'disposisi_masuk', $inserted_data['disposisi_masuk_id'], $inserted_data['disposisi_masuk_nomor']);
                            if($op){
                                $disposisi_masuk->update($inserted_data['disposisi_masuk_id'], array(
                                    'disposisi_masuk_properti' => $op['properti_id']
                                ));
                            }

                            /*add ons*/
                            $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                            $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');
                            $akunLogin = $account->get_profile();
                            $data['distributor_nama'] = $akunLogin['staf_nama'];

                            if($useNotifEmail && $useNotifEmailDraft){
                                $notifikasi->created('email', $data, NULL, $account_id, 'draf', $disposisi_id);
                            }
                        });
                    });

                if($updated_data['surat_nomor']){
                    if(!empty($penerima)){
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
                        function($responses) use( $penerima, $now, $akun, $disposisi_masuk_view, $model, $disposisi_masuk, $model_staf,
                            /*$isberkas,*/ $data, $properti, $surat_stack, $surat_view, $disposisi, $account_id, $queueTube, 
                            $queueTubeRedis, $worker_mode, $queuetubeDisposisi, $penerima_profil){

                            if($responses[$model->successProperty] !== true) return;
                            $disposisi_id = $this->m_disposisi->get_insertid();
                            $updated_data = $this->m_disposisi->update($disposisi_id, array('disposisi_parent_path' => '/'.$disposisi_id));
                            $inserted_dataP = $responses['data'];
                            $disposisi_idP = $inserted_dataP['disposisi_id'];

                            /*insert properti*/
                            $opP = $properti->created($account_id, $inserted_dataP, 'disposisi', $inserted_dataP['disposisi_id'], $inserted_dataP['disposisi_nomor']);
                            if($opP){
                                $disposisi->update($inserted_dataP['disposisi_id'], array(
                                    'disposisi_properti' => $opP['properti_id']
                                ));
                            }
                            if (!is_array($penerima)) {
                                $penerima = array();
                            }
                            $count_penerima = count($penerima);
                            $query = "INSERT INTO disposisi_jumlah_penerima (disposisi_masuk_disposisi, disposisi_jumlah_penerima) VALUES('".$disposisi_idP."', ".$count_penerima.")";
                            $result = $this->db->query($query);
                            foreach ($penerima as $index => $p) {
                                // if($isberkas[$index] === 'true'){
                                //     $isberkas[$index] = true;
                                // }

                                if (is_string($p)) {
                                    $penerima_id = $p;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                    // $berkas = ($isberkas[$index] = true) ? 1 : 0;
                                } else if (is_object($p)) {
                                    $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $tembusan = property_exists($p, 'surat_stack_istembusan') ? $p->surat_stack_istembusan : null;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                    // $berkas = ($isberkas[$index] = true) ? 1 : 0;
                                } else if (is_array($p)) {
                                    $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $tembusan = array_key_exists($p, 'surat_stack_istembusan') ? $p['surat_stack_istembusan'] : null;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                    // $berkas = ($isberkas[$index] = true) ? 1 : 0;
                                }

                                if (empty($penerima_id)) {
                                    continue;
                                }

                                // $profil = $model_staf->read($penerima_id);
                                $data_diposisi_masuk = array(
                                    'disposisi_id' => $disposisi_idP,
                                    'disposisi_masuk_profil' => $penerimaProfil,
                                    'dispo_masuk_parent' => null,
                                    'penerima_id' => $penerima_id,
                                    'penerima_jabatan' => null,
                                    'pengirim_id' => $akun,
                                    'berkas' => $data['surat_useberkas'],
                                    'tembusan' => 1,
                                    'key_redis' => Config()->item('redisPrefix').'disposisi_sama:'.$inserted_dataP['disposisi_surat'].'-'.$penerima_id
                                );

                                if($worker_mode == 'local'){
                                    $create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
                                }else{
                                    $addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
                                }
                            }
                        });
                        // if($mergeData) $model->compiledDataWithDokumen($id);
                    }
                }else{
                    if(!empty($penerima)){
                        /*delete temporary first*/
                        $surat_stack->delete(array(
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                            ), function ($response){});

                        foreach ($penerima as $index => $p) {
                            // if($isberkas[$index] === 'true'){
                            //     $isberkas[$index] = true;
                            // }

                            if (is_string($p)) {
                                $penerima_id = $p;
                                $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            } else if (is_object($p)) {
                                $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            } else if (is_array($p)) {
                                $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            }

                            if (empty($penerima_id)) {
                                continue;
                            }
                            $lvl = $index;
                            /*Re-insert penerima List*/
                            $penerima_stack = $surat_stack->insert(array(
                                'surat_stack_staf'      => $penerima_id,
                                'surat_stack_profil'    => $penerimaProfil,
                                'surat_stack_surat'     => $data['surat_id'],
                                'surat_stack_model'     => $surat_stack::MODEL_PENERIMA,
                                'surat_stack_level'     => $lvl,
                                'surat_stack_status'    => $surat_view::SETUJU_INIT,
                                'surat_stack_isberkas'  => $data['surat_useberkas'],
                                'surat_stack_istembusan'  => 1
                            ));
                        }
                    }
                }

                if($mergeData &&  $updated_data['surat_nomor']) $model->compiledDataWithDokumen($id);


                if($autoNomor == "1" && !$nomor){
                    $dataLog1 = array(
                        'surat_log_tipe' => 6,
                        'surat_log_surat'=>$updated_data['surat_id'],
                        'surat_log_staf'=>$akun,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$now);

                    $operation_log1 = $surat_log->insert($dataLog1, null, function($response){});
                }
            });
        }else{
            if($id){
                if($bookingNomor && $booking && !$nomor && !$sdoc/* && $internal == 2*/){
                    if(!$data['surat_nomor']){
                        if ($nomor_urut){
                            $config = array(
                                'surat_libnomor_model' => $data['surat_model'],
                                'surat_libnomor_tahun' => $tgl,
                                'surat_libnomor_unit_pembuat' => $data['surat_unit'],
                                'surat_libnomor_jenis' => $data['surat_jenis']
                            );
                            
                            $pat = array_merge(
                                    array(
                                        '#'         => $data['surat_nomor_urut'],
                                        'backdate'  => $data['surat_nomor_backdate']
                                    ),
                                $pengaturan->getCompiledDataTemplate($data['surat_id'], $data['surat_setuju_akhir_staf'], $suratTgl)
                            );

                            if($data['surat_nomor_backdate']){
                                $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar_backdate');
                            }else{
                                $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar');
                            }
                            $next = $this->parser->parse_string($data['surat_nomor_format'], $pat);
                            $nomor = array('nomor' => $next, 'digit' => $data['surat_nomor_urut'], 'backdate' => $data['surat_nomor_backdate'], 'config' => $config);
                        }else{
                            $nomor = $surat_view->generate_nomor($id, 'keluar', end($penyetuju), true, $tglsurat);
                        }
                        if($data['surat_isbackdate'] === 1){
                            $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar_backdate');
                            $data['surat_nomor_backdate'] = $nomor['backdate'];
                        }else{
                            $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar');
                        }

                        $data['surat_nomor_urut'] = $nomor['digit'];

                        $data['surat_nomor_booking'] = 1;
                        $data['surat_nomor_otomatis'] = 1;
                        $data['surat_nomor'] = $nomor['nomor'];
                        $data['surat_nomor_asli'] = $nomor['nomor'];
                        $data['surat_nomor_tgl'] = $now;
                        $data['surat_nomor_staf'] = $account_id;
                        $data['surat_nomor_profil'] = $stafProfil['staf_profil'];
                    }
                }
            }

            if($internal == 1){
                if($data['surat_isbackdate'] === 1){
                    $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar_backdate');
                }else{
                    $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_keluar');
                }

                if($data['surat_setuju'] == 2){
                    $data['surat_distribusi_tgl'] = $now;
                    $data['surat_distribusi_staf'] = $data['surat_setuju_staf'];
                    $data['surat_distribusi_profil'] = $stafProfil['staf_profil'];
                }

                $data['surat_nomor_otomatis'] = 0;
                $data['surat_nomor_tgl'] = $now;
                $data['surat_nomor_staf'] = $account_id;
                $data['surat_nomor_profil'] = $stafProfil['staf_profil'];
            }

            if ($isapproval) {
                $data['surat_setuju_profil'] = $stafProfil['staf_profil'];
            }

            if (!empty($penyetuju)) {
                $data['surat_setuju_akhir_staf'] = end($penyetuju);
            }

            if (!empty($upenyetuju)) {
                $data['surat_setuju_akhir_staf'] = end($upenyetuju);
            }

            
            $operation = $model->update($id, $data, function ($response) 
            use ($data, $id, $model, $penyetuju, $upenyetuju, $upenerima, $penerima, $temporary, /*$isberkas,*/
                $surat_stack, $surat_stack_view, $surat_view, $disposisi, $now, $account, $account_id, $log, $model_staf,
                $disposisi_view, $disposisi_masuk, $disposisi_masuk_view, $worker_mode, $queuetubeDisposisi, $properti, $pengaturan,
                $surat_log, $penyetuju_profil, $upenyetuju_profil, $penerima_profil, $upenerima_profil, $stafProfil, $notifikasi,
                $akun, $mergeData, $nomor, $internal,$bookingNomor, $queueTube, $queueTubeRedis, $koreksi_masuk_view, $queuetubeKoreksi) {

                if ($response[$model->successProperty] !== true) return;

                // comment by dian
                // $model->update($id, $data);

                if($mergeData && $data['surat_nomor'] && $data['surat_setuju'] == $surat_view::SETUJU_SETUJU) $model->compiledDataWithDokumen($id);

                if($data['surat_nomor'] && $data['surat_setuju'] == 2 && !$data['surat_ekspedisi']){
                    if (Config()->item('queueServer')['host']) {
                        $data_redis = array(
                            'type'=>'SuratKeluar-Unit',
                            'staf_id'=>null,
                            'jabatan_id'=>null,
                            'unit_id'=>$data['surat_unit'],
                            'data'=> $data['surat_unit']
                        );
                        $addJobUnit = create_job($queueTubeRedis, $data_redis);
                    }

                    // pushEvent(array(
                    //     'to' => $data['surat_unit'],
                    //     'data' => array(
                    //         'api' => 'surat_keluar',
                    //         'id' => $id
                    //     ),
                    //     'group' => array('unit'),
                    //     'type' => 'surat_keluar'
                    // ));
                }

                // comment by dian
                // $updated_data = $model->read($data['surat_id']);

                $updated_data = $response['data'];
                $idProp = $updated_data['surat_properti'];

                if(empty($idProp)){
                    $op = $properti->created($account_id, $updated_data, 'surat', $updated_data['surat_id'], $updated_data['surat_registrasi']);
                    if($op){
                        $model->update($updated_data['surat_id'], array(
                            'surat_properti' => $op['properti_id']
                        ));
                    }
                }

                $properti->updated($idProp, $account_id, $updated_data, $updated_data['surat_registrasi']);

                if($internal){
                    if($updated_data['surat_setuju'] == $model::SETUJU_SETUJU){
                        $stack = $surat_stack->find(array(
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                        )); 
                        if(!empty($stack)){
                            $disposisi_operation = $disposisi->insert(
                                array(
                                    'disposisi_tgl'      => $now,
                                    'disposisi_pelaku'   => $data['surat_setuju_staf'],
                                    'disposisi_pelaku_profil'   => $data['surat_setuju_profil'],
                                    'disposisi_staf'     => $data['surat_setuju_staf'],
                                    'disposisi_profil'   => $data['surat_setuju_profil'],
                                    'disposisi_model'    => $disposisi_view::MODEL_DISPOSISI,
                                    'disposisi_surat'    => $data['surat_id'],
                                    'disposisi_baca_tgl' => $now
                                ),null,
                                function($response) use($disposisi, $temporary, /*$isberkas,*/ $disposisi_masuk, $penerima_profil,
                                    $disposisi_masuk_view, $surat_view, $disposisi_view, $stack, $model_staf,
                                    $surat_stack, $data, $surat_log, $properti, $account_id, $worker_mode, $queuetubeDisposisi, $queueTube, 
                                    $queueTubeRedis){
                                    if($response[$disposisi->successProperty] !== true) return;

                                    $disposisi_id = $disposisi->get_insertid();
                                    $updated_data = $disposisi->update($disposisi_id, array('disposisi_parent_path' => '/'.$disposisi_id));
                                    $inserted_data = $response['data'];
                                    $disposisi_id = $inserted_data['disposisi_id'];

                                    /*insert properti*/
                                    $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                    if($op){
                                        $disposisi->update($inserted_data['disposisi_id'], array(
                                            'disposisi_properti' => $op['properti_id']
                                        ));
                                    }

                                    if(!is_array($stack)){
                                        $stack = array();
                                    }

                                    $count_penerima = count($stack);
                                    $query = "INSERT INTO disposisi_jumlah_penerima (disposisi_masuk_disposisi, disposisi_jumlah_penerima) VALUES('".$disposisi_id."', ".$count_penerima.")";
                                    $result = $this->db->query($query);

                                    foreach ($stack as $index => $p) {
                                        // if($isberkas[$index] === 'true'){
                                        //     $isberkas[$index] = true;
                                        // }

                                        if (is_string($p)) {
                                            $penerima_id = $p;
                                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                        } else if (is_object($p)) {
                                            $penerima_id = property_exists($p, 'surat_stack_staf') ? $p->surat_stack_staf : null;
                                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                            // $tembusan = property_exists($p, 'surat_stack_istembusan') ? $p->surat_stack_istembusan : null;
                                            // $berkas = property_exists($p, 'surat_stack_isberkas') ? $p->surat_stack_isberkas : null;
                                        } else if (is_array($p)) {
                                            $penerima_id = array_key_exists('surat_stack_staf', $p) ? $p['surat_stack_staf'] : null;
                                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                            // $tembusan = array_key_exists($p, 'surat_stack_istembusan') ? $p->surat_stack_istembusan : null;
                                            // $berkas = array_key_exists($p, 'surat_stack_isberkas') ? $p['surat_stack_isberkas'] : null;
                                        }

                                        if (empty($penerima_id)) {
                                            continue;
                                        }

                                        $data_diposisi_masuk = array(
                                            'disposisi_id' => $disposisi_id,
                                            'disposisi_masuk_profil' => $penerimaProfil,
                                            'dispo_masuk_parent' => null,
                                            'penerima_id' => $penerima_id,
                                            'penerima_jabatan' => null,
                                            'pengirim_id' => $data['surat_setuju_staf'],
                                            'berkas' => $data['surat_useberkas'],
                                            'tembusan' => 1,
                                            'key_redis' => Config()->item('redisPrefix').'disposisi_sama:'.$inserted_data['disposisi_surat'].'-'.$penerima_id
                                        );

                                        if($worker_mode == 'local'){
                                            $create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
                                        }else{
                                            $addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
                                        }
                                    }
                                }
                            );
                        }
                    }
		    
                    if($updated_data['surat_nomor']){
                        $dataLog1 = array(
                            'surat_log_tipe' => 6,
                            'surat_log_surat'=>$updated_data['surat_id'],
                            'surat_log_staf'=>$akun,
                            'surat_log_profil'=>$stafProfil['staf_profil'],
                            'surat_log_tgl'=>$now);

                        $operation_log1 = $surat_log->insert($dataLog1, null, function($response){});
                    }

                    if($updated_data['surat_distribusi_tgl']){
                        $dataLog = array(
                            'surat_log_tipe' => 7,
                            'surat_log_surat'=>$updated_data['surat_id'],
                            'surat_log_staf'=>$akun,
                            'surat_log_profil'=>$stafProfil['staf_profil'],
                            'surat_log_tgl'=>$now
                        );
                        $operation_log = $surat_log->insert($dataLog, null, function($response){});
                    }
                }elseif($log){
                    $dataLog = array(
                        'surat_log_tipe' => $log,
                        'surat_log_surat'=>$updated_data['surat_id'],
                        'surat_log_staf'=>$akun,
                        'surat_log_profil'=>$stafProfil['staf_profil'],
                        'surat_log_tgl'=>$now);

                    $operation_log = $surat_log->insert($dataLog, null, function($response){});
                }

                if(empty($data['surat_korespondensi_surat'])) {
                    /*if no `korespondensi` attached on surat so it will create new and as root*/
                    if(empty($data['surat_korespondensi'])){
                        $this->m_korespondensi->insert(array(
                            'korespondensi_perihal'     => $data['surat_perihal'],
                            'korespondensi_pengirim'    => $data['surat_pengirim'],
                            'korespondensi_penerima'    => $data['surat_tujuan'],
                            'korespondensi_isinternal'  => 0),
                        null, function($r_korespondensi) use( $response, $model, $properti, $account_id){
                            if($r_korespondensi[$model->successProperty] !== true) return;

                            $inserted_data = $this->m_korespondensi->read($this->m_korespondensi->get_insertid());
                            $op = $properti->created($account_id, $inserted_data, 'korespondensi', $inserted_data['korespondensi_id'], $inserted_data['korespondensi_nomor']);
                            if($op){
                                $this->m_korespondensi->update($inserted_data['korespondensi_id'], array(
                                    'korespondensi_properti' => $op['properti_id']
                                ));
                            }

                            $model->update($response[$model->dataProperty][$model->get_primary()], array(
                                'surat_korespondensi' => $r_korespondensi[$model->dataProperty][$this->m_korespondensi->get_primary()]
                            ), function($response_korespondensi) use ($model, $properti, $account_id){
                                if($response_korespondensi[$model->successProperty] !== true) return;
                                $updated_data = $model->read($model->get_insertid());
                                $properti->updated(isset($updated_data['surat_properti']), $account_id, $updated_data, isset($updated_data['surat_registrasi']));
                            });
                        });
                    }
                }else{
                    $korespondensi_surat = $model->read($data['surat_id']);
                    if($korespondensi_surat){
                        $model->update($response[$model->dataProperty][$model->get_primary()], array(
                            'surat_korespondensi'       => $data['surat_korespondensi'],
                            'surat_korespondensi_surat' => $data['surat_korespondensi_surat']
                        ), function($response_korespondensi) use ($model, $properti, $account_id){
                            if($response_korespondensi[$model->successProperty] !== true) return;
                            $updated_data = $response_korespondensi['data'];
                            $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                        });
                    }
                }
                /* cek temporary */
                if($temporary){
                    $surat_stack->delete(array(
                        'surat_stack_surat' => $data['surat_id']
                    ));
                }
                
                if(!empty($upenyetuju)){
                    /*delete temporary first*/
                    $surat_stack->delete(array(
                        'surat_stack_surat'     => $data['surat_id'],
                        'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU,
                        'surat_stack_baca_tgl'    => null
                        ), function ($response){});

                    foreach ($upenyetuju as $index => $p) {
                        if (is_string($p)) {
                            $upenyetuju_id = $p;
                            $upenyetujuProfil = $upenyetuju_profil[$index] ? $upenyetuju_profil[$index] : null;
                        } else if (is_object($p)) {
                            $upenyetuju_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                            $upenyetujuProfil = $upenyetuju_profil[$index] ? $upenyetuju_profil[$index] : null;
                        } else if (is_array($p)) {
                            $upenyetuju_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                            $upenyetujuProfil = $upenyetuju_profil[$index] ? $upenyetuju_profil[$index] : null;
                        }

                        if (empty($upenyetuju_id)) {
                            continue;
                        }
                        $next = $surat_stack->max('surat_stack_level', array(
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU
                        ));

                        $pstack = $surat_stack->find(array(
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU,
                            'surat_stack_staf'      => $upenyetuju_id
                        ));

                        $lvl = $next + 1;
                        if(!$pstack){
                            /*Re-insert penerima List*/
                            $penyetuju_stack = $surat_stack->insert(array(
                                'surat_stack_staf'    => $upenyetuju_id,
                                'surat_stack_profil'  => $upenyetujuProfil,
                                'surat_stack_surat'   => $data['surat_id'],
                                'surat_stack_model'   => $surat_stack::MODEL_PENYETUJU,
                                'surat_stack_level'   => $lvl,
                                'surat_stack_status'  => $surat_view::SETUJU_INIT
                            ));
                        }
                    }
                }

                if(!empty($upenerima)){
                    /*delete temporary first*/
                    $surat_stack->delete(array(
                        'surat_stack_surat'     => $data['surat_id'],
                        'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                        ), function ($response){});

                    foreach ($upenerima as $index => $p) {
                        // if($isberkas[$index] === 'true'){
                        //     $isberkas[$index] = true;
                        // }

                        if (is_string($p)) {
                            $penerima_id = $p;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                        } else if (is_object($p)) {
                            $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                        } else if (is_array($p)) {
                            $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                        }

                        if (empty($penerima_id)) {
                            continue;
                        }
                        $lvl = $index;

                        /*Re-insert penerima List*/
                        $penerima_stack = $surat_stack->insert(array(
                            'surat_stack_staf'      => $penerima_id,
                            'surat_stack_profil'    => $upenerimaProfil,
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENERIMA,
                            'surat_stack_level'     => $lvl,
                            'surat_stack_status'    => $surat_view::SETUJU_INIT,
                            'surat_stack_isberkas'  => $data['surat_useberkas'],
                            'surat_stack_istembusan'=> 1
                        ));
                    }
                }


                if(!empty($penyetuju)){
                    if($temporary == 1){
                        /*delete temporary first*/
                        $surat_stack->delete(array(
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU
                            ), function ($response){});

                        foreach ($penyetuju as $index => $p) {
                            if (is_string($p)) {
                                $penyetuju_id = $p;
                                $penyetujuProfil = $penyetuju_profil[$index] ? $penyetuju_profil[$index] : null;
                            } else if (is_object($p)) {
                                $penyetuju_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                $penyetujuProfil = $penyetuju_profil[$index] ? $penyetuju_profil[$index] : null;
                            } else if (is_array($p)) {
                                $penyetuju_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                $penyetujuProfil = $penyetuju_profil[$index] ? $penyetuju_profil[$index] : null;
                            }

                            if (empty($penyetuju_id)) {
                                continue;
                            }
                            $lvl = $index;

                            /*Re-insert penerima List*/
                            $penyetuju_stack = $surat_stack->insert(array(
                                'surat_stack_staf'    => $penyetuju_id,
                                'surat_stack_profil'  => $penyetujuProfil,
                                'surat_stack_surat'   => $data['surat_id'],
                                'surat_stack_model'   => $surat_stack::MODEL_PENYETUJU,
                                'surat_stack_level'   => $lvl,
                                'surat_stack_status'  => $surat_view::SETUJU_INIT
                            ));
                        }
                    }else{
                        $disposisi_operation = $disposisi->insert(
                            array(
                                'disposisi_tgl'      => $now,
                                'disposisi_pelaku'   => $account_id,
                                'disposisi_pelaku_profil'   => $stafProfil['staf_profil'],
                                'disposisi_staf'     => $account_id,
                                'disposisi_profil'   => $stafProfil['staf_profil'],
                                'disposisi_model'    => $disposisi_view::MODEL_KOREKSI,
                                'disposisi_surat'    => $data['surat_id'],
                                'disposisi_baca_tgl' => $now
                            ),null,
                            function($response) use($disposisi, $temporary, $disposisi_masuk, $disposisi_masuk_view, 
                                $surat_view, $disposisi_view, $penyetuju, $surat_stack, $data, $surat_log, $properti, $now, $account, $pengaturan, $notifikasi, 
                                $account_id, $queueTube, $queueTubeRedis, $koreksi_masuk_view, $stafProfil, $penyetuju_profil, $queuetubeKoreksi, $worker_mode){
                                if($response[$disposisi->successProperty] !== true) return;

                                $inserted_data = $response['data'];
                                $disposisi_id = $inserted_data['disposisi_id'];
                                // $updated_data = $disposisi->update($disposisi_id, array('disposisi_parent_path' => '/'.$disposisi_id));
                                
                                /*insert properti*/
                                $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                if($op){
                                    $disposisi->update($inserted_data['disposisi_id'], array(
                                        'disposisi_properti' => $op['properti_id']
                                    ));
                                }

                                if(!is_array($penyetuju)){
                                    $penyetuju = array();
                                }
                                
                                /*delete temporary first*/
                                $surat_stack->delete(array(
                                    'surat_stack_surat'     => $data['surat_id'],
                                    'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU
                                    ), function ($response){});

                                foreach ($penyetuju as $index => $p) {
                                    if (is_string($p)) {
                                        $penyetuju_id = $p;
                                        $penyetujuProfil = $penyetuju_profil[$index] ? $penyetuju_profil[$index] : null;
                                    } else if (is_object($p)) {
                                        $penyetuju_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                        $penyetujuProfil = $penyetuju_profil[$index] ? $penyetuju_profil[$index] : null;
                                    } else if (is_array($p)) {
                                        $penyetuju_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                        $penyetujuProfil = $penyetuju_profil[$index] ? $penyetuju_profil[$index] : null;
                                    }

                                    if (empty($penyetuju_id)) {
                                        continue;
                                    }
                                    $lvl = $index;

                                    /*penyetuju List*/                               
                                    $penyetuju_stack = $surat_stack->insert(array(
                                        'surat_stack_staf'    => $p,
                                        'surat_stack_profil'  => $penyetujuProfil,
                                        'surat_stack_surat'   => $data['surat_id'],
                                        'surat_stack_model'   => $surat_stack::MODEL_PENYETUJU,
                                        'surat_stack_level'   => $lvl,
                                        'surat_stack_status'  => $surat_view::SETUJU_INIT,
                                    ));

                                    $disposisi_id = $disposisi->get_insertid();
                                    $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                                    $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');

                                    if($data['surat_setuju_isurut']){
                                        if($lvl === 0){
                                            $data_koreksi = array(
                                                'surat_id' => $data['surat_id'],
                                                'surat_registrasi' => $data['surat_registrasi'],
                                                'surat_perihal' => $data['surat_perihal'],
                                                'disposisi_id' => $disposisi_id,
                                                'pengirim_id' => $account_id,
                                                'pengirim_nama' => $stafProfil['staf_nama'],
                                                'penerima_id' => $p,
                                                'penerima_profil' => $penyetujuProfil,
                                                'type'=>'SuratKeluar-Staf',
                                                'use_notif_email' => $useNotifEmail,
                                                'use_notif_email_draft' => $useNotifEmailDraft
                                            );

                                            if($worker_mode == 'local'){
                                                $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                                            }else{
                                                $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                                            }

                                            /*add ons*/
                                            // $akunLogin = $account->get_profile();
                                            // $data['distributor_nama'] = $akunLogin['staf_nama'];

                                            // if($useNotifEmail && $useNotifEmailDraft){
                                            //     $notifikasi->created('email', $data, $p, NULL, 'draf');
                                            // }
                                        }    
                                    }else{
                                        $data_koreksi = array(
                                            'surat_id' => $data['surat_id'],
                                            'surat_registrasi' => $data['surat_registrasi'],
                                            'surat_perihal' => $data['surat_perihal'],
                                            'disposisi_id' => $disposisi_id,
                                            'pengirim_id' => $account_id,
                                            'pengirim_nama' => $stafProfil['staf_nama'],
                                            'penerima_id' => $p,
                                            'penerima_profil' => $penyetujuProfil,
                                            'type'=>'SuratKeluar-Staf',
                                            'use_notif_email' => $useNotifEmail,
                                            'use_notif_email_draft' => $useNotifEmailDraft
                                        );

                                        if($worker_mode == 'local'){
                                            $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                                        }else{
                                            $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                                        }

                                        /*add ons*/
                                        // $akunLogin = $account->get_profile();
                                        // $data['distributor_nama'] = $akunLogin['staf_nama'];

                                        // if($useNotifEmail && $useNotifEmailDraft){
                                        //     $notifikasi->created('email', $data, $p, NULL, 'draf');
                                        // }
                                    }
                                }
                            }
                        );
                    }
                }
                
                if(!empty($penerima)){
                    /*delete temporary first*/
                    $surat_stack->delete(array(
                        'surat_stack_surat'     => $data['surat_id'],
                        'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                        ), function ($response){});

                    foreach ($penerima as $index => $p) {
                        // if($isberkas[$index] === 'true'){
                        //     $isberkas[$index] = true;
                        // }

                        if (is_string($p)) {
                            $penerima_id = $p;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                        } else if (is_object($p)) {
                            $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                        } else if (is_array($p)) {
                            $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                        }

                        if (empty($penerima_id)) {
                            continue;
                        }
                        $lvl = $index;

                        /*Re-insert penerima List*/
                        $penerima_stack = $surat_stack->insert(array(
                            'surat_stack_staf'      => $penerima_id,
                            'surat_stack_profil'    => $penerimaProfil,
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENERIMA,
                            'surat_stack_level'     => $lvl,
                            'surat_stack_status'    => $surat_view::SETUJU_INIT,
                            'surat_stack_isberkas'  => $data['surat_useberkas'],
                            'surat_stack_istembusan'=> 1
                        ));
                        
                        if ($temporary == 2) {
                            $recent_exist = $this->m_staf_recent->read(array(
                                'staf_aktual_pengirim'=>$account_id,
                                'staf_aktual_penerima'=>$penerima_id,
                            ));

                            if($recent_exist){
                                $this->m_staf_recent->update(array(
                                        'staf_aktual_pengirim'=>$account_id,
                                        'staf_aktual_penerima'=>$penerima_id
                                    ),array(
                                        'staf_aktual_pengirim'=>$account_id,
                                        'staf_aktual_penerima'=>$penerima_id,
                                        'staf_aktual_tgl'     => $now,
                                        'staf_aktual_tipe'    => $disposisi::MODEL_KOREKSI
                                ), function($response) use ($properti, $data, $account_id){

                                    $recent_data = $response['data'];
                                    $updated_data = $this->m_staf_recent->read($recent_data['staf_aktual_id']);
                                    $idProp = $updated_data['staf_aktual_properti'];

                                    $properti->updated($idProp, $account_id, $updated_data, 'staf_aktual '.$updated_data['staf_aktual_tgl']);
                                });
                            }else{
                                $this->m_staf_recent->insert(array(
                                    'staf_aktual_pengirim'=>$account_id,
                                    'staf_aktual_penerima'=>$penerima_id,
                                    'staf_aktual_tgl'     => $now,
                                    'staf_aktual_tipe'    => $disposisi::MODEL_KOREKSI
                                ), null, function($response) use ($data, $properti, $account_id){

                                    $inserted_data = $this->m_staf_recent->read($this->m_staf_recent->get_insertid());
                                    $op = $properti->created($account_id, $inserted_data, 'staf_aktual', $inserted_data['staf_aktual_id'], 'staf_aktual '.$inserted_data['staf_aktual_tgl']);
                                    if($op){
                                        $this->m_staf_recent->update($inserted_data['staf_aktual_id'], array(
                                            'staf_aktual_properti' => $op['properti_id']
                                        ));
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }
       
        $operation[$model->dataProperty] = $this->m_surat_keluar_view->read($id);
        $this->response($operation);

    }

    public function destroy($usePayload = true){
        $surat = $this->m_surat;
        $surat_log  = $this->m_surat_log;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $korespondensi = $this->m_korespondensi;
        $model_staf = $this->m_staf;

        $permanen = varReq('permanen');
        $akun = $account->get_profile_id();
        $stafProfil = $model_staf->read($akun);
        $primary = $surat->get_primary();
        $now = date('Y-m-d H:i:s');
        
        if($permanen){
            $id = varReq('id');
            $idProp = varReq('properti');
            $idArsip = varReq('arsip');
            $idKores = varReq('korespon');
            $kores = varReq('kores');
            $dokumen = $this->m_dokumen;
            $arsip = $this->m_arsip;
            $disposisi = $this->m_disposisi;
            $disposisi_masuk = $this->m_disposisi_masuk;

            // del arsip dan dokumen
            $dataDok = $dokumen->find(array('dokumen_arsip'=> $idArsip));
            foreach ($dataDok as $i => $sArsip) {
                $properti->delete(array(
                    'properti_entitas_id' => $sArsip['dokumen_id']
                ));
            }
            $delArsip = $arsip->delete($idArsip, function ($response) use ($properti, $idArsip){
                $properti->delete(array(
                    'properti_entitas_id' => $idArsip
                ));
            });

            // del disposisi dan disposisi masuk properti
            $dataDis = $disposisi->find(array('disposisi_surat'=> $id));
            foreach ($dataDis as $i => $sDispo) {
                $dataDisMa = $disposisi_masuk->find(array('disposisi_masuk_disposisi'=> $sDispo['disposisi_id']));
                foreach ($dataDisMa as $i => $sDisMa) {
                    $properti->delete(array(
                        'properti_entitas_id' => $sDisMa['disposisi_masuk_id']
                    ));
                }

                $properti->delete(array(
                    'properti_entitas_id' => $sDispo['disposisi_id']
                ));
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
        }else{
            $payload = getRequestPayload();
            $data = (array) ($usePayload ? $payload : varPost());
            $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
            $idProp = array_key_exists('surat_properti', $data) ? $data['surat_properti'] : $data['data']['surat_properti'];
            
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

    function next($section = null){
        $me = $this;
        $model = $me->m_surat_keluar_view;
        // $kelas_model = $me->m_kelas;
        $pegawai = $me->m_account->get_profile();
        $next = null;
        switch ($section)
        {
            case 'agenda':
                $tipe = varReq('tipe');
                $next = $model->getAgenda($tipe);
                break;
                
            case 'kode':
                $next = $model->generate_code();
                break;
        }
        $this->response(array(
            'next'=>$next
        ));
    }

    function report(){
        $report_model           = $this->m_report;
        $account_model          = $this->m_account;
        $unitkerja_model        = $this->m_unit;
        $asset_model            = $this->m_asset;
        $surat                  = $this->m_surat;
        $surat_view             = $this->m_surat_view;
        $surat_keluar_view      = $this->m_surat_keluar_aktif_view;

        $filter = varGet('filter');
        $filterValue = varGet('value');
        $download = varGet('download',0);
        $excel = varGet('excel',0);
        $report_title = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unitkerja = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

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
        foreach ($unitkerja_recs as $d_i => $v) {
            
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_code] = NULL;
            $records = $surat_keluar_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_nomor_urut'=>'asc',
                'surat_nomor_backdate'=>'asc'
            ));    

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surattgl']; 
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi']; 
                
                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'].' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if(!$r['surat_agenda_sub'] == NULL){
                    $r['surat_agenda_converted'] = $r['surat_agenda'].'.'.$r['surat_agenda_sub'];
                }else{
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
             if(!empty($records)){
                 $v['records']  = $records;
                 $v['count']    = count($records);
                 $unitkerja_recs[$d_i] = $v;
                 $unitkerja_recs[$d_i]['unitkerja_nama'] = $v['unit_nama'];
             }else{
                 unset($unitkerja_recs[$d_i]);
             }
        }

        if(! $unitkerja_recs){
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_perihal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_lokasi', 'surat_lampiran'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'=> $report_title,
            'subtitle'=> $this::$report_subtitle,
            'header'=>$report_model->generateHeader($download, 7),
            'periode'=>$report_model->generatePeriode($filter, $filterValue),
            'unitkerja'=>$unitkerja_recs,
            'dateReport'=>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'=>$user[$account_model->field_display]
        );
        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_template, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename, true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }    

    function report_semua(){
        $report_model           = $this->m_report;
        $account_model          = $this->m_account;
        $unitkerja_model        = $this->m_unit;
        $asset_model            = $this->m_asset;
        $surat                  = $this->m_surat;
        $surat_view             = $this->m_surat_view;
        $surat_keluar_view      = $this->m_surat_keluar_aktif_view;
        $pengaturan             = $this->m_pengaturan;

        $buatSuratKeluar = $pengaturan->getSettingByCode('use_unit_buat_surat_keluar');

        $param_unitkerja = varGet('unit');
        $filter = varGet('filter');
        $filterValue = varGet('value');
        $download = varGet('download',0);
        $excel = varGet('excel',0);
        $report_title = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

        if($buatSuratKeluar){
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
        foreach ($unitkerja_recs as $d_i => $v) {
            
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_code] = NULL;
            $records = $surat_keluar_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_nomor_urut'=>'asc',
                'surat_nomor_backdate'=>'asc'
            ));    

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surattgl']; 
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi']; 
                
                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'].' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if(!$r['surat_agenda_sub'] == NULL){
                    $r['surat_agenda_converted'] = $r['surat_agenda'].'.'.$r['surat_agenda_sub'];
                }else{
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
             if(!empty($records)){
                 $v['records']  = $records;
                 $v['count']    = count($records);
                 $unitkerja_recs[$d_i] = $v;
                 $unitkerja_recs[$d_i]['unitkerja_nama'] = $v['unit_nama'];
             }else{
                 unset($unitkerja_recs[$d_i]);
             }
        }

        if(! $unitkerja_recs){
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_perihal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_lokasi', 'surat_lampiran'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'=> $report_title,
            'subtitle'=> $this::$report_subtitle,
            'header'=>$report_model->generateHeader($download, 7),
            'periode'=>$report_model->generatePeriode($filter, $filterValue),
            'unitkerja'=>$unitkerja_recs,
            'dateReport'=>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'=>$user[$account_model->field_display]
        );
        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_template, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename, true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }    

    function report_kewenangan(){
        $report_model           = $this->m_report;
        $account_model          = $this->m_account;
        $unitkerja_model        = $this->m_unit;
        $asset_model            = $this->m_asset;
        $surat                  = $this->m_surat;
        $surat_view             = $this->m_surat_view;
        $surat_keluar_view      = $this->m_surat_keluar_aktif_view;

        $filter = varGet('filter');
        $filterValue = varGet('value');
        $download = varGet('download',0);
        $excel = varGet('excel',0);
        $report_title = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unitkerja = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

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
        foreach ($unitkerja_recs as $d_i => $v) {
            
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_code] = NULL;
            $records = $surat_keluar_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_nomor_urut'=>'asc',
                'surat_nomor_backdate'=>'asc'
            ));    

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi']; 
                
                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'].' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if(!$r['surat_agenda_sub'] == NULL){
                    $r['surat_agenda_converted'] = $r['surat_agenda'].'.'.$r['surat_agenda_sub'];
                }else{
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
             if(!empty($records)){
                 $v['records']  = $records;
                 $v['count']    = count($records);
                 $unitkerja_recs[$d_i] = $v;
                 $unitkerja_recs[$d_i]['unitkerja_nama'] = $v['unit_nama'];
             }else{
                 unset($unitkerja_recs[$d_i]);
             }
        }

        if(! $unitkerja_recs){
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_perihal', 'surat_lampiran', 'surat_lokasi'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'=> $report_title,
            'subtitle'=> $this::$report_subtitle,
            'header'=>$report_model->generateHeader($download, 7),
            'periode'=>$report_model->generatePeriode($filter, $filterValue),
            'unitkerja'=>$unitkerja_recs,
            'dateReport'=>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'=>$user[$account_model->field_display]
        );
        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_template, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename, true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }    

    function report_blmdisetujui(){
        $report_model           = $this->m_report;
        $account_model          = $this->m_account;
        $unitkerja_model        = $this->m_unit;
        $asset_model            = $this->m_asset;
        $surat                  = $this->m_surat;
        $surat_view             = $this->m_surat_view;
        $surat_keluar_view      = $this->m_surat_keluar_view;

        $filter = varGet('filter');
        $filterValue = varGet('value');
        $download = varGet('download',0);
        $excel = varGet('excel',0);
        $report_title = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unitkerja = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

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
        foreach ($unitkerja_recs as $d_i => $v) {
            
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_approval_lookup] = $surat::SETUJU_INIT;
            $records = $surat_keluar_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_properti_buat_tgl'] = $r['surat_properti_buat_tgl'] ? $report_model->date_format($r['surat_properti_buat_tgl']) : $this::$default_value['registrasi'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_pengirim'] = $r['surat_pengirim'] ? $r['surat_pengirim'] : $this::$default_value['pengirim'];
                $r['surat_tujuan'] = $r['surat_tujuan'] ? $r['surat_tujuan'] : $this::$default_value['tujuan'];
                $r['surat_perihal'] = $r['surat_perihal'] ? $r['surat_perihal'] : $this::$default_value['perihal']; 

                if(!$r['surat_agenda_sub'] == NULL){
                    $r['surat_agenda_converted'] = $r['surat_agenda'].'.'.$r['surat_agenda_sub'];
                }else{
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }

                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
             if(!empty($records)){
                 $v['records']  = $records;
                 $v['count']    = count($records);
                 $unitkerja_recs[$d_i] = $v;
                 $unitkerja_recs[$d_i]['unit_nama'] = $v['unit_nama'];
             }else{
                 unset($unitkerja_recs[$d_i]);
             }
        }

        if(! $unitkerja_recs){
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_properti_buat_tgl', 'surat_tanggal', 'surat_pengirim', 'surat_tujuan', 'surat_perihal'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'=> $report_title,
            'subtitle'=> $this::$report_blmdisetujui_subtitle,
            'header'=>$report_model->generateHeader($download, 7),
            'periode'=>$report_model->generatePeriode($filter, $filterValue),
            'unitkerja'=>$unitkerja_recs,
            'dateReport'=>date('d-m-Y H:i:s'),
            'operator'=>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_blmdisetujui_template, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_rekap(){
        $report_model       = $this->model('sipas/report',true);
        $account_model      = $this->model('sipas/account',true);
        $unitkerja_model    = $this->model('sipas/unit',true);
        $asset_model        = $this->model('sipas/asset',true);

        $surat                  = $this->m_surat_view;
        $surat_ekeluar_rekap    = $this->m_surat_ekeluar_rekap_view;
        
        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        $model          = '';
        
        $param_unitkerja = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        $_filter = $report_model->generateSelectField($filter, $filterValue);
        if($param_unitkerja) array_unshift($_filter, array('type'=>'exact', 'field'=>'unit_id', 'value'=>$param_unitkerja));

        array_unshift($_filter, array('type'=>'exact', 'field'=>'surat_model', 'value'=>$surat::MODEL_KELUAR));
        $sort = array();
        array_unshift($sort, array('property'=>'unit_nama', 'direction'=>'ASC'));
        $data = $surat_ekeluar_rekap->select(
                    array(
                        'filter'    => json_encode($_filter),
                        'sort'      => json_encode($sort),
                    )
                );

        $grouped = array();
        if($data['total'] > 0){
            $no = 1;
            foreach($data['data'] as $kdata => $vdata){
                $kunit = $vdata['unit_kode'];
                $grouped[$kunit]['unit_nama'] = $vdata['unit_nama'];
                if(!array_key_exists('no', $grouped[$kunit])){
                    $grouped[$kunit]['no'] = $no;
                    $grouped[$kunit]['bg_color'] = ($no % 2 == 0 ) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                    $no++;
                }
                foreach($vdata as $key => $val){
                    if($key !== 'unit_nama' && $key !== 'unit_kode' && $key !== 'surat_tanggal' && $key !== 'surat_model' && $key !== 'unit_id' && $key !== 'jenis_id' && $key !== 'jenis_nama'){
                        if(! array_key_exists($key, $grouped[$kunit])){
                            $grouped[$kunit][$key] = $val;
                        }else{
                            $grouped[$kunit][$key] += $val;
                        }
                    }
                }
            }
        }else{
            $unit_nama  = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['nodata'];
            $data = array_fill_keys(array('terdistribusi_count', 'blm_distribusi_count', 'tercatat_count', 'onprocess_count', 'process_done_count'), 0);
            $data['no'] = 1;
            $data['unit_nama'] = $unit_nama;
            array_unshift($grouped, $data);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0]  : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_rekap,
            'header'        =>$report_model->generateHeader($download, 7),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unit'          =>$grouped,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_rekap, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_backdate(){

        $report_model           = $this->m_report;
        $unitkerja_model        = $this->m_unit;
        $asset_model            = $this->m_asset;
        $surat                  = $this->m_surat;
        $surat_view             = $this->m_surat_view;
        $surat_keluar_view      = $this->m_surat_keluar_view;

        $account_model          = $this->m_account;
        $user                   = $account_model->get_profile();

        $surat_model   = $surat_view::MODEL_KELUAR;

        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $filter         = varGet('filter', []);
        $filterValue    = varGet('value', null);
        $unit           = varGet('unit', null);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $unit_filter    = array();

        $dateFilter = $report_model->generateField($unit, $filter, $filterValue);
        $dateFilter['surat_tanggal < '.$surat::$field_create_date] = null;
        $dateFilter['surat_model'] = $surat_model;

        if( ! $unit) unset($dateFilter[$surat::$field_unit]);

        $records = $surat_keluar_view->find(
                        $dateFilter, null, null, null,
                        array('surat_tanggal'=>'asc')
                    );

        $keys       = array_unique(array_column($records, 'unit_nama'));
        $grouped    = array();
        foreach($keys as $key => &$val){
            $value = array();
            $value['unit_nama'] = $val;
            $value['records']   = array();
            foreach($records as $key_surat => &$record_surat){
                if($val == $record_surat['unit_nama']){
                    $record_surat['no'] = count($value['records']) + 1;
                    $record_surat['bg_color'] = (count($value['records']) % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                    $record_surat['surat_nomor'] = $record_surat['surat_nomor'] ? $record_surat['surat_nomor'] : $this::$default_value['nosurat'];
                    $record_surat['surat_properti_buat_tgl'] = $record_surat['surat_properti_buat_tgl'] ? $report_model->date_format($record_surat['surat_properti_buat_tgl']) : $this::$default_value['registrasi'];
                    $record_surat['surat_tanggal'] = $record_surat['surat_tanggal'] ? $report_model->date_format($record_surat['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                    $record_surat['surat_pengirim'] = $record_surat['surat_pengirim'] ? $record_surat['surat_pengirim'] : $this::$default_value['pengirim'];
                    $record_surat['surat_tujuan'] = $record_surat['surat_tujuan'] ? $record_surat['surat_tujuan'] : $this::$default_value['tujuan'];
                    $record_surat['surat_perihal'] = $record_surat['surat_perihal'] ? $record_surat['surat_perihal'] : $this::$default_value['perihal'];
                    $record_surat['surat_agenda_converted'] = $record_surat['surat_agenda_sub'] ? $record_surat['surat_agenda'].'.'.$record_surat['surat_agenda_sub'] : $record_surat['surat_agenda'];
                    $record_surat['surat_agenda_converted'] = $record_surat['surat_agenda_converted'] ? $record_surat['surat_agenda'] : $this::$default_value['agenda'];
                    $value['records'][]   = $record_surat;
                }
            }
            $grouped[] = $value;
        }

        if(! $grouped){
            $grouped = array();
            $unit_nama = ($unit) ? $unitkerja_model->read($unit)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama'=> $unit_nama, 'records'=>array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_properti_buat_tgl', 'surat_tanggal', 'surat_pengirim', 'surat_tujuan', 'surat_perihal'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($grouped, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         => $report_title,
            'subtitle'      => $this::$report_backdate_subtitle,
            'header'        =>$report_model->generateHeader($download, 7),
            'periode'       =>$report_model->generatePeriode($filter, $filterValue),
            'unitkerja'     =>$grouped,
            'dateReport'    =>date('d-m-Y H:i:s'),
            'dateReportFormated'=> date('d M Y H:i'),
            'operator'      =>$user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_backdate_template, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_retensi(){
        $report_model       = $this->model('sipas/report',true);
        $account_model      = $this->model('sipas/account',true);
        $unit_model         = $this->model('sipas/unit',true);
        $asset_model        = $this->model('sipas/asset',true);

        $pengaturan                     = $this->m_pengaturan;
        $surat                          = $this->m_surat;
        $surat_keluar_rekap_berakhir    = $this->m_surat_keluar_nonaktif_view;

        $buatSuratKeluar = $pengaturan->getSettingByCode('use_unit_buat_surat_keluar');

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel',0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        $param_unit     = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        if($buatSuratKeluar){
            $unit_recs = $unit_model->find(
                array('IFNULL(unit_isbuatsurat, 0) = 1'=> null),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }else if(empty($param_unit) || is_null($param_unit)){
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
            $param_unit     = $unit_recs[$d_i]['unit_id'];
            $time_field     = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id.'<>'.$surat::$field_code] = NULL;

            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $records = $surat_keluar_rekap_berakhir->find(
                $time_field 
                ,null,null,null, array(
                'surat_nomor_urut'=>'asc',
                'surat_nomor_backdate'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no']            = $i + 1;
                $r['bg_color']      = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal']; 
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang '.$r['surat_perihal'] : $this::$default_value['perihal']; 
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode']; 
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas']; 
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis']; 
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit']; 
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi']; 
                
                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'].' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if(!$r['surat_agenda_sub'] == NULL){
                    $r['surat_agenda_converted'] = $r['surat_agenda'].'.'.$r['surat_agenda_sub'];
                }else{
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if(!empty($records)){
                $v['records']       = $records;
                $v['count']         = count($records);
                $unit_recs[$d_i]    = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        if(!$unit_recs){
            $unit_recs  = array();
            $unit_nama  = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit       = array('unit_nama'=>$unit_nama, 'records'=>array());
            $surat      = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_perihal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_lokasi', 'surat_lampiran' ), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'                 => array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'                 => $report_title, 
            'subtitle'              => $this->report_subtitle_retensi,
            'header'                => $report_model->generateHeader($download, 6),
            'periode'               => $report_model->generatePeriode($filter, $filterValue),
            'unit'                  => $unit_recs,
            'dateReport'            => date('d-m-Y H:i:s'),
            'dateReportFormated'    => date('d M Y H:i'),
            'operator'              => $user[$account_model->field_display]
        );

        $filename = $report_title.$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_retensi, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data,$filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename, true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    public function getBalas($id = null)
    {
        $model = $this->m_surat_keluar_hidup_view;
    
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));

        $id = varGet('id', varGet('surat_id'));
        $record = $model->read(array(
            'surat_korespondensi_surat' => $id,
            'surat_selesai_tgl IS NOT NULL' => null
        ));
        $this->response_record($record);
    }
}