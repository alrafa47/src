<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Surat_keputusan extends Base_Controller
{

    public $report_template_jenisall                 = 'sipas/surat/internal/keputusan/jenisall';
    public $report_template_jenisgol                 = 'sipas/surat/internal/keputusan/jenisgol';
    public $report_template_jenisjab                 = 'sipas/surat/internal/keputusan/jenisjab';
    public $report_template_jenisdemosi              = 'sipas/surat/internal/keputusan/jenisdemosi';
    public $report_template_jenispengangkatanjabatan = 'sipas/surat/internal/keputusan/jenispengangkatanjabatan';
    public $report_template_jenispenyesuaianjenjang  = 'sipas/surat/internal/keputusan/jenispenyesuaianjenjang';

    public $resi_template   = 'sipas/surat/resi_keluar';

    public $report_template_rekap       = 'sipas/surat/internal/keputusan/rekap';
    public $report_subtitle             = 'Semua surat internal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.';
    public $report_subtitle_semua       = 'Semua surat internal aktif yang mempunyai nomor surat yang dikeluarkan oleh semua unit dalam instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), ditampilkan berdasarkan unit yang memiliki surat.';
    public $report_subtitle_kewenangan  = 'Semua surat internal aktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.';

    public $report_subtitle_blmsetuju            = 'Semua surat internal dengan status dalam persetujuan atau revisi yang dikeluarkan oleh instansi pengguna aplikasi, dibagi sesuai unit yang dipilih.';
    public $report_subtitle_blmsetuju_semua      = 'Semua surat internal dengan status dalam persetujuan atau revisi yang dikeluarkan oleh semua unit di instansi pengguna aplikasi, ditampilan berdasarkan unit yang memiliki surat.';
    public $report_subtitle_blmsetuju_kewenangan = 'Semua surat internal dengan status dalam persetujuan atau revisi yang dikeluarkan oleh instansi pengguna aplikasi, dibagi sesuai unit kewenangan yang dimiliki oleh user pembuat laporan.';

    public $report_subtitle_rekap       = 'Rekap jumlah surat keluar internal yang dibuat oleh Instansi pengguna aplikasi';
    public $report_subtitle_unprocessed = 'Daftar surat keluar internal yang dibuat oleh Instansi pengguna aplikasi dan belum disetujui';

    public $report_resi_template    = 'sipas/surat/resi';
    public $report_resi_title       = 'Tanda Terima Surat';
    public $delimiter               = array('<!--[', ']-->'); // we use valid html tag to avoid invalid parser on front end

    public $report_template_retensi   = 'sipas/surat/internal/internal_inaktif';
    public $report_title_retensi      = 'Laporan Rekap Surat Keluar Internal Yang Akan Berakhir';
    public $report_subtitle_retensi   = 'Semua surat keluar internal inaktif yang mempunyai nomor surat yang dikeluarkan oleh instansi pengguna aplikasi (dengan status draft, dalam persetujuan, revisi, disetujui), dibagi sesuai unit yang dipilih.';

    static $bg_color_item_laporan = array('odd' => 'background-color: #F5F5F5;', 'even' => 'background-color: #FFFFFF;');
    static $default_value = array(
        'empty'         => '<span style="color:grey; font-style:italic;">(Tidak ada data)</span>',
        'nodata'        => '<span style="color:grey; font-style:italic;">(Tidak Ada Data)</span>',
        'unitnama'      => '<span style="color:grey; font-style:italic;">(Tidak memiliki unit)</span>',
        'nosurat'       => '<span style="color:grey; font-style:italic;">(Tidak memiliki nomor)</span>',
        'perihal'       => '<span style="color:grey; font-style:italic;">(Tidak memiliki perihal)</span>',
        'agenda'        => '<span style="color:grey; font-style:italic;">(Tidak memiliki agenda)</span>',
        'accrentang'    => '<span style="color:grey; font-style:italic;">(Tidak ada rentang)</span>',
        'title'         => '<span style="color:white; font-style:italic;">(Tidak ada Unit)</span>',
        'surattgl'      => '<span style="color:grey; font-style:italic;">(TIdak memiliki tanggal)</span>',
        'tipe'          => '<span style="color:grey; font-style:italic;">(TIdak memiliki tipe)</span>',
        'accnama'       => '<span style="color:grey; font-style:italic;">(TIdak ada penyetuju)</span>',
        'pengirim'      => '<span style="color:grey; font-style:italic;">(Tidak memiliki Pengirim)</span>',
        'jenis'         => '<span style="color:grey; font-style:italic;">(Tidak memiliki Jenis)</span>',
        'unit'          => '<span style="color:grey; font-style:italic;">(Tidak memiliki Unit)</span>',
        'kelas'         => '<span style="color:grey; font-style:italic;">(Tidak memiliki Klasifikasi)</span>',
        'kelas_kode'    => '<span style="color:grey; font-style:italic;">(Tidak memiliki Kode Klasifikasi)</span>',
        'tipesk'        => '<span style="color:grey; font-style:italic;">(Tidak memiliki Tipe SK)</span>',
        'jenis_sk'      => '<span style="color:grey; font-style:italic;">(Tidak memiliki Jenis SK)</span>'
    );

    static $default_report = array(
        'surat_nomor'           => '<span style="color:grey; font-style:italic;">(Tidak memiliki nomor)</span>',
        'jenis_nama'            => '<span style="color:grey; font-style:italic;">(Tidak memiliki tipe)</span>',
        'surat_tanggal'         => '<span style="color:grey; font-style:italic;">(Tidak memiliki surat tanggal)</span>',
        'surat_tmt'             => '<span style="color:grey; font-style:italic;">(Tidak memiliki surat TMT)</span>',
        'surat_perihal'         => '<span style="color:grey; font-style:italic;">(Tidak memiliki perihal)</span>',
        'surat_setuju_rentang'  => '<span style="color:grey; font-style:italic;">(Tidak ada rentang)</span>',
        'surat_setuju_tgl'      => '<span style="color:grey; font-style:italic;">(Tidak ada tanggal persetujuan)</span>',
        'penerima'              => array()
    );

    public function __construct()
    {
        parent::__construct();
        $this->m_pengaturan = $this->model('sipas/pengaturan', true);
        // $this->m_fitur      = $this->model('sipas/fitur',      true);
        // $this->m_akses      = $this->model('sipas/akses',      true);
        // $this->m_akses_view = $this->model('sipas/akses_view', true);
        $this->m_user       = $this->model('sipas/akun',       true);
        $this->m_account    = $this->model('sipas/account',    true);
        $this->m_notifikasi = $this->model('sipas/notifikasi', true);

        $this->m_arsip      = $this->model('sipas/arsip',      true);
        $this->m_dokumen    = $this->model('sipas/dokumen',    true);
        $this->m_dokumen_view = $this->model('sipas/dokumen_view',    true);
        $this->m_surat      = $this->model('sipas/surat',      true);
        $this->m_surat_view = $this->model('sipas/surat_view', true);
        $this->m_surat_log  = $this->model('sipas/surat_log',  true);
        $this->m_disposisi  = $this->model('sipas/disposisi',  true);

        $this->m_disposisi_view         = $this->model('sipas/disposisi_view',  true);
        $this->m_disposisi_masuk        = $this->model('sipas/disposisi_masuk', true);
        $this->m_disposisi_masuk_log    = $this->model('sipas/disposisi_masuk_log', true);
        $this->m_disposisi_masuk_view   = $this->model('sipas/disposisi_masuk_netral_view',  true);
        $this->m_koreksi_masuk_view     = $this->model('sipas/koreksi_masuk_view',   true);

        $this->m_surat_keputusan_view             = $this->model('sipas/surat_keputusan_view',              true);
        $this->m_surat_keputusan_aktif_view       = $this->model('sipas/surat_keputusan_aktif_view',        true);
        $this->m_surat_keputusan_nonaktif_view    = $this->model('sipas/surat_keputusan_nonaktif_view',     true);
        $this->m_surat_keputusan_terlewat_nonaktif_view    = $this->model('sipas/surat_keputusan_terlewat_nonaktif_view',     true);
        $this->m_surat_keputusan_hidup_view       = $this->model('sipas/surat_keputusan_hidup_view',        true);
        $this->m_surat_keputusan_setuju_view      = $this->model('sipas/surat_keputusan_setuju_view',       true);
        $this->m_surat_keputusan_setuju_list_view = $this->model('sipas/surat_keputusan_setuju_list_view',  true);
        $this->m_surat_keputusan_draft_view       = $this->model('sipas/surat_keputusan_draft_view',        true);
        $this->m_surat_keputusan_dlm_setuju_view  = $this->model('sipas/surat_keputusan_dlm_setuju_view',   true);
        $this->m_surat_keputusan_blm_setuju_view  = $this->model('sipas/surat_keputusan_blm_setuju_view',   true);
        $this->m_surat_keputusan_revisi_view      = $this->model('sipas/surat_keputusan_revisi_view',       true);
        $this->m_surat_keputusan_blm_nomor_view   = $this->model('sipas/surat_keputusan_blm_nomor_view',    true);
        $this->m_surat_keputusan_blm_kirim_view   = $this->model('sipas/surat_keputusan_blm_kirim_view',    true);
        $this->m_surat_keputusan_blm_terima_view  = $this->model('sipas/surat_keputusan_blm_terima_view',   true);
        $this->m_surat_keputusan_terima_view      = $this->model('sipas/surat_keputusan_terima_view',       true);
        $this->m_surat_keputusan_tolak_view       = $this->model('sipas/surat_keputusan_tolak_view',        true);
        $this->m_surat_keputusan_batal_nomor_view = $this->model('sipas/surat_keputusan_batal_nomor_view',  true);
        $this->m_surat_keputusan_salin_nomor_view = $this->model('sipas/surat_keputusan_salin_nomor_view',  true);

        $this->m_korespondensi = $this->model('sipas/korespondensi', true);
        $this->m_unit          = $this->model('sipas/unit',          true);
        $this->m_unit_cakupan  = $this->model('sipas/unit_cakupan',  true);
        $this->m_unit_cakupan_view = $this->model('sipas/unit_cakupan_view',     true);
        $this->m_staf           = $this->model('sipas/staf',          true);
        $this->m_staf_view      = $this->model('sipas/staf_view',     true);
        $this->m_staf_recent    = $this->model('sipas/staf_aktual',         true);
        // $this->m_addons    = $this->model('sipas/addons_config', true);

        $this->m_surat_libnomor                 = $this->model('sipas/surat_libnomor',                  true);
        $this->m_surat_stack        = $this->model('sipas/surat_stack',      true);
        $this->m_surat_stack_view   = $this->model('sipas/surat_stack_koreksi_view', true);
        $this->m_surat_penerimask_view = $this->model('sipas/surat_penerimask_view', true);
        $this->m_surat_stack_dis_view = $this->model('sipas/surat_stack_disposisi_view', true);
        $this->m_jenis              = $this->model('sipas/jenis',            true);
        $this->m_jenis_view         = $this->model('sipas/jenis_view',       true);
        $this->m_surat_jenis        = $this->model('sipas/jenis_aktif_view', true);
        $this->m_properti           = $this->model('sipas/properti',         true);

        $this->m_surat_keputusan_rekap_view           = $this->model('sipas/surat_rekap_by_model_view',           true);
        $this->m_surat_keputusan_rekap_berakhir_view  = $this->model('sipas/surat_keputusan_rekap_berakhir_view',   true);

        $this->m_jabatan                = $this->model('sipas/jabatan',                    true);
        $this->m_jabatan_view           = $this->model('sipas/jabatan_view',               true);
        $this->m_jabatan_aktual_view    = $this->model('sipas/jabatan_aktual_view',        true);
        $this->m_jabatan_aktif          = $this->model('sipas/jabatan_aktif_view',         true);
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_hidup_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function draft()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_draft_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function setuju()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_setuju_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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
            // $records['debug'] = $surat_internal_view->get_lastquery();
            $this->response($records);
        }
    }

    public function setuju_list()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_setuju_list_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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
            // $records['debug'] = $surat_internal_view->get_lastquery();
            $this->response($records);
        }
    }

    public function dlm_setuju()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_dlm_setuju_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function revisi()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_revisi_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function blm_nomor()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_blm_nomor_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function blm_terima()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_blm_terima_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function terima()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_terima_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function tolak()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_tolak_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function batal_nomor()
    {
        $me = $this;

        $model    = $me->m_surat_keputusan_batal_nomor_view;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $me->response_record($record);
        } else {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            $this->response($records);
        }
    }

    public function salin_nomor()
    {
        $me = $this;

        $model    = $me->m_surat_keputusan_salin_nomor_view;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            $me->response_record($record);
        } else {
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            $this->response($records);
        }
    }

    public function aktif()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_aktif_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
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

    public function nonaktif()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_nonaktif_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_itipe',
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

    public function terlewat_nonaktif()
    {
        $me = $this;

        $surat_internal_view  = $me->m_surat_keputusan_terlewat_nonaktif_view;
        // $surat_internal_view  = $me->m_surat;
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));

        $costumFilter = array();
        $nonCustomFilter = array();


        if (!empty($filter)) {
            foreach ($filter as $i => $val) {

                if ($val->field == 'surat_perihal') {
                    $custom_filter  = array(
                        'surat_tujuan', 'surat_pengirim', 'surat_perihal', 'surat_nomor',
                        'surat_registrasi', 'unit_source_nama', 'jenis_nama', 'sifat_nama', 'surat_properti_pembuat_nama'
                    );

                    $value = $val->value;
                    $query = "(" . implode(" LIKE '%" . $value . "%' OR ", $custom_filter) . " LIKE '%" . $value . "%')";
                    $costumFilter = array(array(
                        'value' => $query,
                        'type'  => 'custom'
                    ));
                } else {
                    $custom_filter2 = $val->field;
                    $value2 = $val->value;
                    $query2 = "(" . $custom_filter2 . " LIKE '%" . $value2 . "%')";
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
        $start      = varGet('start', 0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $tipeid =  varGet('tipe');

        if (varGet('scope')) {
            $scopeid = varGet('scope');
        } else {
            $scopeid = $account['staf_unit'];
        }

        if (varGetHas('id') || varGetHas('surat_id')) {

            $id = varGet('id', varGet('surat_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        } else {

            // if($tipeid !== 'all' && !is_null($tipeid)){
            //     array_unshift($filter, (object)array(
            //         'type'  => 'exact',
            //         'field' => 'surat_itipe',
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

    public function create($usePayload = true)
    {
        $me = $this;

        $arsip      = $me->m_arsip;
        $surat      = $me->m_surat;
        $surat_log  = $me->m_surat_log;
        $surat_view = $me->m_surat_view;
        $surat_keputusan_view = $me->m_surat_keputusan_view;
        $model_staf = $me->m_staf;

        $now    = date('Y-m-d H:i:s');
        $data   = (array)($usePayload ? getRequestPayload() : varPost());

        $properti       = $me->m_properti;
        $account_id     = $me->m_account->get_profile_id();
        $stafProfil     = $model_staf->read($account_id);

        if (!$account_id) {
            $unauthorized_op['success'] = false;
            $unauthorized_op['message'] = "Session anda telah habis, silahkan login ulang";
            $this->response($unauthorized_op);
            return;
        }

        $data['surat_model']        = $surat_view::MODEL_KEPUTUSAN;
        $data['surat_tanggal']      = $now;
        $data['surat_setuju_isurut'] = 1;
        $data['surat_petikan_setuju_isurut'] = 1;
        $data['surat_registrasi']   = $surat_view->generate_code();
        $data['surat_setuju']       = $surat_view::SETUJU_INIT;
        $data['surat_buat_tgl']     = $now;
        $data['surat_buat_staf']    = $account_id;
        $data['surat_buat_profil']  = $stafProfil['staf_profil'];
        $data['surat_arah_profil']  = $stafProfil['staf_profil'];

        //insert arsip
        $dataArsip = array(
            'arsip_nama' => 'SIK.' . $data['surat_registrasi']
        );
        $arsip->insert($dataArsip);
        $data['surat_arsip'] = $arsip->get_insertid();

        $operation = $surat->insert($data, null, function ($response) use (
            $me,
            $data,
            $account_id,
            $now,
            $surat,
            $properti,
            $surat_log,
            $stafProfil
        ) {
            if ($response[$surat->successProperty] !== true) return;

            $inserted_data = $surat->read($surat->get_insertid());
            $op = $properti->created($account_id, $inserted_data, 'surat', $inserted_data['surat_id'], $inserted_data['surat_registrasi']);
            if ($op) {
                $surat->update($inserted_data['surat_id'], array(
                    'surat_properti' => $op['properti_id']
                ));
            }

            $dataLog = array(
                'surat_log_tipe' => 1,
                'surat_log_surat' => $inserted_data['surat_id'],
                'surat_log_staf' => $account_id,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );

            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
        });

        $operation[$surat->dataProperty] = $me->m_surat_keputusan_view->read($surat->get_insertid());
        $this->response($operation);
    }

    public function update($usePayload = true)
    {
        $me = $this;
        $this->load->library('parser');
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');
        $queuetubeKoreksi = Config()->item('queueServer_tubeKoreksi');
        $worker_mode = Config()->item('worker_mode');

        $surat         = $me->m_surat;
        $surat_view    = $me->m_surat_view;
        $surat_log     = $me->m_surat_log;
        $surat_stack   = $me->m_surat_stack;
        $disposisi     = $me->m_disposisi;
        $properti      = $me->m_properti;
        $arsip         = $me->m_arsip;
        $dokumen       = $me->m_dokumen;
        $dokumen_view  = $me->m_dokumen_view;
        $pengaturan    = $me->m_pengaturan;
        $pegawai       = $me->m_staf;
        $korespondensi = $me->m_korespondensi;
        $account       = $me->m_account;
        $notifikasi    = $me->m_notifikasi;

        $disposisi_view         = $me->m_disposisi_view;
        $disposisi_masuk        = $me->m_disposisi_masuk;
        $disposisi_masuk_log    = $me->m_disposisi_masuk_log;
        $staf_view              = $me->m_staf_view;
        $surat_libnomor     = $this->m_surat_libnomor;
        $disposisi_masuk_view   = $me->m_disposisi_masuk_view;
        $surat_keputusan_view     = $me->m_surat_keputusan_view;
        $koreksi_masuk_view     = $me->m_koreksi_masuk_view;

        $account_record = $account->get_profile();
        $account_id = $account->get_profile_id();

        $stafProfil = $pegawai->read($account_id);
        $account_setting  = $account->get_setting();
        $auto_nomor_setting  = (int)$account_setting['use_auto_nomor_internal'];
        $auto_distribusi_setting  = (int)$account_setting['use_auto_distribusi_internal'];
        $nomor_backdate = (int)$account_setting['use_nomor_backdate'];
        $queuetubeKeputusan = Config()->item('queueServer_tubeKeputusan');

        $now                = date('Y-m-d H:i:s');
        $date               = date('Y-m-d');
        $this_year          = date('Y');
        $primary            = $surat->get_primary();

        $payload            = getRequestPayload();
        $data               = (array)($usePayload ? $payload : varPost());
        $penyetuju          = varReq('py');
        $penyetuju_profil   = varReq('py_p');
        $upenyetuju         = varReq('upy');
        $upenyetuju_profil  = varReq('upy_p');
        $petikan            = varReq('pt');
        $petikan_profil     = varReq('pt_p');
        $upetikan           = varReq('upt');
        $upetikan_profil    = varReq('upt_p');
        $penerima           = varReq('pn');
        $penerima_profil    = varReq('pn_p');
        $upenerima          = varReq('upn');
        $upenerima_profil   = varReq('upn_p');
        $temporary          = varReq('temp');
        $log                = varReq('log');
        $template           = varReq('template');
        $internal           = varReq('internal');
        $check              = varReq('check');
        $setuju             = varReq('setujui');
        $booking            = varReq('booking');
        $tembusan           = varReq('tsk');
        $tembusan_profil    = varReq('tsk_p');
        $utembusan          = varReq('utsk');
        $utembusan_profil   = varReq('utsk_p');
        $sdoc               = varReq('sdoc');
        $salin              = varReq('salin');
        $pilih              = varReq('pilih');
        $beri_ulang         = varReq('beri_ulang');
        $isapproval         = varReq('approve');
        $distribute         = varReq('distribute');

        $modelSurat = $me->m_surat_keputusan_hidup_view;
        $nomor = $data['surat_nomor'];
        $nomor_urut = $data['surat_nomor_urut'];
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

        $jenis = $me->m_jenis;
        $jenisD = $jenis->read($data['surat_jenis']);
        $jenisTerpusat = (int)$jenisD['jenis_terpusat'];

        $nomorJenisTerpusat = $pengaturan->getSettingByCode('template_nomor_internal_perjenis_terpusat');
        $nomorJenisUnit = $pengaturan->getSettingByCode('template_nomor_internal_perjenis_unit');
        $nomorUnit = $pengaturan->getSettingByCode('template_nomor_internal_perunit');
        $nomorTerpusat = $pengaturan->getSettingByCode('template_nomor_internal_terpusat');
        $digitNomor = $pengaturan->getSettingByCode('template_digit_nomor_surat_internal');
        $penomoran_urut     = Config()->item('penomoran_urut_internal');

        $config_updated    = varReq('updated');
        $config_booking    = varReq('config_booking');

        if ($config_booking) {
            $data['surat_isbooking'] = 1;
            $config = varReq('config');
            $con = json_decode($config, true);

            $update_urutan = $surat_libnomor->update_booking($con, $data['surat_nomor_urut']);
        } else {
            if ($config_updated) {
                $config = varReq('config');
                $con = json_decode($config, true);

                $update_urutan = $surat_libnomor->update_code($con);
            }
        }

        /* for backdate when savesend */
        if (!$nomor_urut && !$nomor && $nomor_backdate == 1 && $check && !$pilih) {
            if ($suratTgl != $date) {
                $data['surat_isbackdate'] = 1;
            } else {
                if ($suratTgl < $tgl_surat2) {
                    $data['surat_isbackdate'] = 1;
                } else {
                    $data['surat_isbackdate'] = 0;
                }
            }
        }

        /* for checking backdate (alert) */
        if ($nomor_backdate == 1 && $check && $penomoran_urut == 1 && !$pilih) {
            $no_urut = str_pad('1', strlen($digitNomor), '0', STR_PAD_LEFT);

            $filSurat_no1 = array(
                'surat_nomor_urut' => $no_urut,
                'IFNULL(surat_nomor_backdate, 0) = 0' => NULL
            );
            $filSuratNow = array(
                'IFNULL(surat_ishapus, 0) = 0' => NULL,
                'DATE(surat_tanggal) > "' . $suratTgl . '"' => NULL,
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
                'DATE(surat_tanggal) > "' . $suratTgl . '"' => NULL,
                'surat_nomor IS NOT NULL' => NULL,
                'IFNULL(surat_nomor_issalin,0) = 0' => NULL,
            );

            if ($jenisTerpusat !== 0) {
                $filSurat_no1["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;
                $filSuratNow["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;
                $filCariSurat["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;
                $filCariBackdate["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;

                $filSurat_no1['surat_model'] = $data['surat_model'];
                $filSuratNow['surat_model'] = $data['surat_model'];
                $filCariSurat['surat_model'] = $data['surat_model'];
                $filCariBackdate['surat_model'] = $data['surat_model'];

                if ($jenisTerpusat === 1) { /* jika pengaturan khusus = terpusat perjenis */
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];
                } else if ($jenisTerpusat === 2) { /* jika pengaturan khusus = perunit perjenis*/
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];

                    $filSurat_no1['surat_unit'] = $data['surat_unit'];
                    $filSuratNow['surat_unit'] = $data['surat_unit'];
                    $filCariSurat['surat_unit'] = $data['surat_unit'];
                    $filCariBackdate['surat_unit'] = $data['surat_unit'];
                }
            } else { /* jika pengaturan penomoran = pengaturan sistem */
                $filSurat_no1["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;
                $filSuratNow["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;
                $filCariSurat["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;
                $filCariBackdate["YEAR(surat_tanggal) = '" . $tgl . "'"] = NULL;

                $filSurat_no1['surat_model'] = $data['surat_model'];
                $filSuratNow['surat_model'] = $data['surat_model'];
                $filCariSurat['surat_model'] = $data['surat_model'];
                $filCariBackdate['surat_model'] = $data['surat_model'];

                if ($nomorJenisTerpusat) {
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];
                } else if ($nomorJenisUnit) {
                    $filSurat_no1['surat_jenis'] = $data['surat_jenis'];
                    $filSuratNow['surat_jenis'] = $data['surat_jenis'];
                    $filCariSurat['surat_jenis'] = $data['surat_jenis'];
                    $filCariBackdate['surat_jenis'] = $data['surat_jenis'];

                    $filSurat_no1['surat_unit'] = $data['surat_unit'];
                    $filSuratNow['surat_unit'] = $data['surat_unit'];
                    $filCariSurat['surat_unit'] = $data['surat_unit'];
                    $filCariBackdate['surat_unit'] = $data['surat_unit'];
                } else if ($nomorUnit) {
                    $filSurat_no1['surat_unit'] = $data['surat_unit'];
                    $filSuratNow['surat_unit'] = $data['surat_unit'];
                    $filCariSurat['surat_unit'] = $data['surat_unit'];
                    $filCariBackdate['surat_unit'] = $data['surat_unit'];
                } else if ($nomorTerpusat) {
                    $filSurat_no1['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                    $filSuratNow['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                    $filCariSurat['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                    $filCariBackdate['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                }
            }

            $surat_no1 = $surat_view->read($filSurat_no1);

            if (!empty($surat_no1)) {
                $SuratDate_no1 = new DateTime($surat_no1['surat_tanggal']);
                $tgl_no1 = $SuratDate_no1->format('Y-m-d');

                if ($tgl_no1 > $suratTgl) {
                    $operation['success'] = false;
                    $operation['message'] = 'Anda tidak bisa backdate pada tanggal ini';
                    return $this->response($operation);
                } else {
                    $suratNow = $surat_view->find($filSuratNow, false, false, true, array('surat_agenda' => 'desc'));
                    if (!empty($suratNow) && $data['surat_isbackdate']) {
                        $cariSurat = $surat_view->find($filCariSurat, false, false, true, array('surat_nomor_urut' => 'desc', 'surat_nomor_backdate' => 'desc'));

                        if (empty($cariSurat)) {
                            $operation['success'] = false;
                            $operation['message'] = 'Anda tidak bisa backdate pada tanggal ini';
                            return $this->response($operation);
                        }

                        if (!empty($cariSurat)) {
                            $no_backdate = array();
                            foreach ($cariSurat as $key => $value) {
                                if ($value['surat_nomor_backdate'] && ($value['surat_nomor_urut'] == $cariSurat[0]['surat_nomor_urut'])) {
                                    array_push($no_backdate, $value['surat_nomor_backdate']);
                                }
                            }

                            if (!empty($no_backdate)) {
                                $numBackdate = $no_backdate[0];

                                if ($numBackdate == '0' || $numBackdate == null) {
                                    $numBackdate = 'A';
                                } else {
                                    $numBackdate++;
                                }
                            } else {
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
        if ($data['surat_unit'] == null) {
            $data['surat_unit'] = $account_record['staf_unit'];
        }

        if (varIsset($data['surat_tanggal'])) {
            $data['surat_tanggal'] = str_replace("00:00:00", date('H:i:s'), $data['surat_tanggal']);
        } else {
            unset($data['surat_tanggal']);
        }

        if ($salin) {
            $surat->update($salin, array(
                'surat_nomor_issalin' => 1
            ));

            $dataLog = array(
                'surat_log_tipe' => 21,
                'surat_log_surat' => $salin,
                'surat_log_staf' => $account_id,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );

            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
        }

        /* untuk pemberian nomor ketika revisi dan jenis bukan nomor awal */
        if ($nomor && !$jenisD['jenis_nomor_awal'] && $data['surat_setuju'] == 3 && !$upenyetuju) {
            $modelSurat = $surat_keputusan_view;
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

            if ($data['surat_nomor_backdate']) {
                $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal_backdate');
            } else {
                $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal');
            }
            $data['surat_nomor'] = $this->parser->parse_string($data['surat_nomor_format'], $pat);
        }

        $bookingNomor = $pengaturan->getSettingByCode('use_booking_nomor');
        $mergeData = $pengaturan->getSettingByCode('use_data_merge');

        if ($template) {
            $operation = $surat->update($id, $data, function ($response) {
            });
        } else {
            //update first before generate nomor
            $surat->update($id, $data);

            if ($id) {
                if ($bookingNomor && $booking && !$nomor && !$sdoc /*&& $internal == 2*/) {
                    if ($nomor_urut) {
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
                            $pengaturan->getCompiledDataTemplate($id, $data['surat_setuju_akhir_staf'], $suratTgl)
                        );

                        if ($data['surat_nomor_backdate']) {
                            $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal_backdate');
                        } else {
                            $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal');
                        }
                        $next = $this->parser->parse_string($data['surat_nomor_format'], $pat);
                        $nomor = array('nomor' => $next, 'digit' => $data['surat_nomor_urut'], 'backdate' => $data['surat_nomor_backdate'], 'config' => $config);
                    } else {
                        if (!$nomor) {
                            $nomor = $surat_view->generate_nomor($id, 'keputusan', end($penyetuju), true, $tglsurat);
                        }
                    }
                    if ($data['surat_isbackdate'] === 1) {
                        $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal_backdate');
                        $data['surat_nomor_backdate'] = $nomor['backdate'];
                    } else {
                        $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal');
                    }

                    $data['surat_nomor_urut'] = $nomor['digit'];
                    $data['surat_nomor'] = $nomor['nomor'];
                    $data['surat_nomor_asli'] = $nomor['nomor'];
                    $data['surat_nomor_tgl'] = $now;
                    $data['surat_nomor_booking'] = 1;
                    $data['surat_nomor_otomatis'] = 1;
                    $data['surat_nomor_staf'] = $account_id;
                    $data['surat_nomor_profil'] = $stafProfil['staf_profil'];
                }
            }

            if ($internal == 1) {
                if ($data['surat_isbackdate'] === 1) {
                    $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal_backdate');
                } else {
                    $data['surat_nomor_format'] = $pengaturan->getSettingByCode('template_nomor_surat_internal');
                }

                $data['surat_nomor_otomatis'] = 0;
                $data['surat_nomor_tgl'] = $now;
                $data['surat_nomor_staf'] = $account_id;
                $data['surat_nomor_profil'] = $stafProfil['staf_profil'];
            }

            if ($isapproval) {
                if ($data['surat_setuju'] == $surat_view::SETUJU_PROSES || $data['surat_setuju'] == $surat_view::SETUJU_REVISI) {
                    $data['surat_setuju_profil'] = $stafProfil['staf_profil'];
                }
            }

            if (!empty($penyetuju)) {
                $data['surat_setuju_akhir_staf'] = end($penyetuju);
            }

            if (!empty($upenyetuju)) {
                $data['surat_setuju_akhir_staf'] = end($upenyetuju);
            }

            if (!empty($petikan)) {
                $data['surat_petikan_akhir_staf'] = end($petikan);
            }

            if (!empty($upetikan)) {
                $data['surat_petikan_akhir_staf'] = end($upetikan);
            }

            $operation = $surat->update(
                $id,
                $data,
                function ($response) use (
                    $me,
                    $nomor,
                    $data,
                    $id,
                    $now,
                    $surat,
                    $disposisi,
                    $disposisi_masuk,
                    $account,
                    $account_id,
                    $account_record,
                    $disposisi_masuk_view,
                    $properti,
                    $log,
                    $penerima,
                    $penyetuju,
                    $upenyetuju,
                    $upenerima,
                    $surat_stack,
                    $pengaturan,
                    $surat_view,
                    $temporary,
                    $booking,
                    $disposisi_view,
                    $surat_log,
                    $disposisi_masuk_log,
                    $korespondensi,
                    $notifikasi,
                    $internal,
                    $bookingNomor,
                    $auto_nomor_setting,
                    $auto_distribusi_setting,
                    $tembusan,
                    $mergeData,
                    $queueTube,
                    $queueTubeRedis,
                    $koreksi_masuk_view,
                    $stafProfil,
                    $penyetuju_profil,
                    $penerima_profil,
                    $upenyetuju_profil,
                    $upenerima_profil,
                    $queuetubeKoreksi,
                    $worker_mode,
                    $petikan,
                    $upetikan,
                    $petikan_profil,
                    $upetikan_profil,
                    $utembusan,
                    $distribute,
                    $pegawai,
                    $dokumen_view,
                    $queuetubeKeputusan,
                    $tembusan_profil,
                    $utembusan_profil
                ) {

                    if ($internal == 1 && $data['surat_setuju'] == $surat_view::SETUJU_SETUJU) {
                        if (!$data['surat_nomor']) {
                            if (Config()->item('queueServer')['host']) {
                                $data_redis = array(
                                    'type' => 'SuratKeputusan-Unit',
                                    'staf_id' => null,
                                    'jabatan_id' => null,
                                    'unit_id' => $data['surat_unit'],
                                    'data' => $data['surat_unit']
                                );
                                $addJobUnit = create_job($queueTubeRedis, $data_redis);
                            }

                            // pushEvent(array(
                            //     'to' => $data['surat_unit'],
                            //     'data' => array(
                            //         'api' => 'surat_keputusan',
                            //         'id' => $id
                            //     ),
                            //     'group' => array('unit'),
                            //     'type' => 'surat_keputusan'
                            // ));
                        }
                        $surat_view->create_imasuk($account_id, $data, $auto_distribusi_setting);
                    }

                    if ($response[$surat->successProperty] !== true) return;

                    /*updating properti surat*/
                    $updated_data = $surat_view->read($surat->get_insertid());
                    $idProp = $data['surat_properti'];
                    if (empty($idProp)) {
                        $op = $properti->created($account_id, $data, 'surat', $data['surat_id'], $data['surat_registrasi']);
                        if ($op) {
                            $surat->update($data['surat_id'], array(
                                'surat_properti' => $op['properti_id']
                            ));
                        }
                    }
                    $properti->updated($idProp, $account_id, $data, $data['surat_registrasi']);

                    /*creating log surat*/
                    if ($internal == 1) {
                        $dataLog1 = array(
                            'surat_log_tipe' => 6,
                            'surat_log_surat' => $data['surat_id'],
                            'surat_log_staf' => $account_id,
                            'surat_log_profil' => $stafProfil['staf_profil'],
                            'surat_log_tgl' => $now
                        );

                        $operation_log1 = $surat_log->insert($dataLog1, null, function ($response) {
                        });

                        if ($data['surat_distribusi_tgl']) {
                            $dataLog2 = array(
                                'surat_log_tipe' => 7,
                                'surat_log_surat' => $data['surat_id'],
                                'surat_log_staf' => $account_id,
                                'surat_log_profil' => $stafProfil['staf_profil'],
                                'surat_log_tgl' => $now
                            );

                            $operation_log2 = $surat_log->insert($dataLog2, null, function ($response) {
                            });
                        }
                    } elseif ($log) {
                        $dataLog3 = array(
                            'surat_log_tipe' => $log,
                            'surat_log_surat' => $data['surat_id'],
                            'surat_log_staf' => $account_id,
                            'surat_log_profil' => $stafProfil['staf_profil'],
                            'surat_log_tgl' => $now
                        );

                        $operation_log3 = $surat_log->insert($dataLog3, null, function ($response) {
                        });
                    }

                    if ($bookingNomor && $booking && !$nomor) {
                        $dataLog4 = array(
                            'surat_log_tipe' => 6,
                            'surat_log_surat' => $data['surat_id'],
                            'surat_log_staf' => $account_id,
                            'surat_log_profil' => $stafProfil['staf_profil'],
                            'surat_log_tgl' => $now
                        );

                        $operation_log4 = $surat_log->insert($dataLog4, null, function ($response) {
                        });
                    }

                    if (empty($data['surat_korespondensi_surat'])) {
                        if (empty($data['surat_korespondensi'])) {
                            $korespondensi->insert(array(
                                'korespondensi_perihal'      => $data['surat_perihal'],
                                'korespondensi_unitpengirim' => $data['surat_unit'],
                                'korespondensi_isinternal'  => 1
                            ), null, function ($r_korespondensi) use ($me, $response, $surat, $properti, $account_id, $korespondensi, $data) {
                                if ($r_korespondensi[$surat->successProperty] !== true) return;
                                $inserted_data = $korespondensi->read($korespondensi->get_insertid());
                                $op = $properti->created($account_id, $inserted_data, 'korespondensi', $inserted_data['korespondensi_id'], $inserted_data['korespondensi_nomor']);
                                if ($op) {
                                    $korespondensi->update($inserted_data['korespondensi_id'], array(
                                        'korespondensi_properti' => $op['properti_id']
                                    ));
                                }
                                $surat->update($response[$surat->dataProperty][$surat->get_primary()], array(
                                    'surat_korespondensi' => $r_korespondensi[$surat->dataProperty][$korespondensi->get_primary()]
                                ), function ($response_korespondensi) use ($surat, $properti, $account_id, $data) {
                                    if ($response_korespondensi[$surat->successProperty] !== true) return;

                                    $updated_data = $surat->read($data['surat_id']);

                                    $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                                });
                            });
                        }
                    } else {
                        $korespondensi_surat = $surat->read($data['surat_id']);
                        if ($korespondensi_surat) {
                            $surat->update($response[$surat->dataProperty][$me->m_surat->get_primary()], array(
                                'surat_korespondensi'       => $data['surat_korespondensi'],
                                'surat_korespondensi_surat' => $data['surat_korespondensi_surat']
                            ), function ($response_korespondensi) use ($surat, $properti, $account_id) {
                                if ($response_korespondensi[$surat->successProperty] !== true) return;
                                $updated_data = $response_korespondensi['data'];
                                $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                            });
                        }
                    }

                    if (!is_array($penerima)) $penerima = array();
                    if (!is_array($upenerima)) $upenerima = array();
                    if (!is_array($petikan)) $petikan = array();
                    if (!is_array($upetikan)) $upetikan = array();
                    if (!is_array($penyetuju)) $upenyetuju = array();
                    if (!is_array($upenyetuju)) $upenyetuju = array();
                    if (!is_array($tembusan)) $tembusan = array();

                    /* cek temporary */
                    if ($temporary) {
                        $surat_stack->delete(array(
                            'surat_stack_surat' => $data['surat_id']
                        ));
                    }

                    if ($data['surat_model_sub'] == $surat_view::MODEL_SUB_PERORANGAN) { /* Perorangan */
                        if (!empty($penerima)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat' => $data['surat_id'],
                                'surat_stack_model' => $surat_stack::MODEL_PENERIMA,
                                'IFNULL(surat_stack_istembusan, 0) = 0' => NULL
                            ), function ($response) {
                            });

                            foreach ($penerima as $index => $p) {
                                if (is_string($p)) {
                                    $penerima_id = $p;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                }

                                if (empty($penerima_id)) continue;

                                $penerima_stack = $surat_stack->insert(array(
                                    'surat_stack_staf'    => $penerima_id,
                                    'surat_stack_profil'  => $penerimaProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_level'   => $index,
                                    'surat_stack_kirim'   => 0,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT
                                ));
                            }
                        }

                        if (!empty($upenerima)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat' => $data['surat_id'],
                                'surat_stack_model' => $surat_stack::MODEL_PENERIMA,
                                'IFNULL(surat_stack_istembusan, 0) = 0' => NULL,
                                'surat_stack_baca_tgl'    => NULL
                            ), function ($response) {
                            });

                            foreach ($upenerima as $index => $p) {
                                if (is_string($p)) {
                                    $upenerima_id = $p;
                                    $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $upenerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $upenerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                                }

                                if (empty($upenerima_id)) continue;

                                $pstack = $surat_stack->find(array(
                                    'surat_stack_surat'     => $data['surat_id'],
                                    'surat_stack_model'     => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_staf'      => $upenerima_id,
                                    'IFNULL(surat_stack_istembusan, 0) = 0' => NULL
                                ));

                                if (!$pstack) {
                                    $surat_stack->insert(array(
                                        'surat_stack_staf'       => $upenerima_id,
                                        'surat_stack_profil'     => $upenerimaProfil,
                                        'surat_stack_surat'      => $data['surat_id'],
                                        'surat_stack_model'      => $surat_stack::MODEL_PENERIMA,
                                        'surat_stack_kirim'      => 0,
                                        'surat_stack_status'     => $surat_view::SETUJU_INIT
                                    ));
                                }
                            }
                        }

                        if (!empty($tembusan)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat' => $data['surat_id'],
                                'surat_stack_model' => $surat_stack::MODEL_PENERIMA,
                                'IFNULL(surat_stack_istembusan, 0) = 1' => NULL
                            ), function ($response) {
                            });

                            foreach ($tembusan as $index => $p) {
                                if (is_string($p)) {
                                    $tembusan_id = $p;
                                    $tembusanProfil = $tembusan_profil[$index] ? $tembusan_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $tembusan_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $tembusanProfil = $tembusan_profil[$index] ? $tembusan_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $tembusan_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $tembusanProfil = $tembusan_profil[$index] ? $tembusan_profil[$index] : null;
                                }

                                if (empty($tembusan_id)) continue;

                                $surat_stack->insert(array(
                                    'surat_stack_staf'    => $tembusan_id,
                                    'surat_stack_profil'  => $tembusanProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_level'   => $index,
                                    'surat_stack_kirim'   => 0,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT,
                                    'surat_stack_istembusan' => 1
                                ));
                            }
                        }

                        if (!empty($utembusan)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat' => $data['surat_id'],
                                'surat_stack_model' => $surat_stack::MODEL_PENERIMA,
                                'IFNULL(surat_stack_istembusan, 0) = 1' => NULL,
                                'surat_stack_baca_tgl' => NULL
                            ), function ($response) {
                            });

                            foreach ($utembusan as $index => $p) {
                                if (is_string($p)) {
                                    $utembusan_id = $p;
                                    $utembusanProfil = $utembusan_profil[$index] ? $utembusan_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $utembusan_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $utembusanProfil = $utembusan_profil[$index] ? $utembusan_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $utembusan_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $utembusanProfil = $utembusan_profil[$index] ? $utembusan_profil[$index] : null;
                                }

                                if (empty($utembusan_id)) continue;

                                $pstack = $surat_stack->find(array(
                                    'surat_stack_surat'     => $data['surat_id'],
                                    'surat_stack_model'     => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_staf'      => $utembusan_id,
                                    'IFNULL(surat_stack_istembusan, 0) = 1' => NULL
                                ));

                                if (!$pstack) {
                                    $surat_stack->insert(array(
                                        'surat_stack_staf'          => $utembusan_id,
                                        'surat_stack_profil'        => $utembusanProfil,
                                        'surat_stack_surat'         => $data['surat_id'],
                                        'surat_stack_model'         => $surat_stack::MODEL_PENERIMA,
                                        'surat_stack_kirim'         => 0,
                                        'surat_stack_status'        => $surat_view::SETUJU_INIT,
                                        'surat_stack_istembusan'    => 1
                                    ));
                                }
                            }
                        }
                    } else { /* Kolektif */
                        if (!empty($penerima)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat' => $data['surat_id'],
                                'surat_stack_model' => $surat_stack::MODEL_PENERIMA,
                                'IFNULL(surat_stack_istembusan, 0) = 0' => NULL
                            ), function ($response) {
                            });

                            foreach ($penerima as $index => $p) {
                                if (is_string($p)) {
                                    $penerima_id = $p;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                }

                                if (empty($penerima_id)) continue;

                                $penerima_stack = $surat_stack->insert(array(
                                    'surat_stack_staf'    => $penerima_id,
                                    'surat_stack_profil'  => $penerimaProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_level'   => $index,
                                    'surat_stack_kirim'   => 0,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT
                                ));
                            }
                        }

                        if (!empty($upenerima)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat' => $data['surat_id'],
                                'surat_stack_model' => $surat_stack::MODEL_PENERIMA,
                                'IFNULL(surat_stack_istembusan, 0) = 0' => NULL,
                                'surat_stack_baca_tgl'    => NULL
                            ), function ($response) {
                            });

                            foreach ($upenerima as $index => $p) {
                                if (is_string($p)) {
                                    $upenerima_id = $p;
                                    $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $upenerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $upenerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $upenerimaProfil = $upenerima_profil[$index] ? $upenerima_profil[$index] : null;
                                }

                                if (empty($upenerima_id)) continue;

                                $pstack = $surat_stack->find(array(
                                    'surat_stack_surat'     => $data['surat_id'],
                                    'surat_stack_model'     => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_staf'      => $upenerima_id,
                                    'IFNULL(surat_stack_istembusan, 0) = 0' => NULL
                                ));

                                if (!$pstack) {
                                    $surat_stack->insert(array(
                                        'surat_stack_staf'       => $upenerima_id,
                                        'surat_stack_profil'     => $upenerimaProfil,
                                        'surat_stack_surat'      => $data['surat_id'],
                                        'surat_stack_model'      => $surat_stack::MODEL_PENERIMA,
                                        'surat_stack_kirim'      => 0,
                                        'surat_stack_status'     => $surat_view::SETUJU_INIT
                                    ));
                                }
                            }
                        }

                        if (!empty($tembusan)) {
                            $surat_stack->delete(array(
                                'surat_stack_surat'      => $data['surat_id'],
                                'surat_stack_model'      => $surat_stack::MODEL_PENERIMA,
                                'surat_stack_istembusan' => 1
                            ), function ($response) {
                            });

                            foreach ($tembusan as $index => $p) {
                                if (is_string($p)) {
                                    $tembusan_id = $p;
                                    $tembusanProfil = $tembusan_profil[$index] ? $tembusan_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $tembusan_id = property_exists($p, 'jabatan_id') ? $p->staf_id : null;
                                    $tembusanProfil = $tembusan_profil[$index] ? $tembusan_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $tembusan_id = array_key_exists('jabatan_id', $p) ? $p['jabatan_id'] : null;
                                    $tembusanProfil = $tembusan_profil[$index] ? $tembusan_profil[$index] : null;
                                }

                                if (empty($tembusan_id)) {
                                    continue;
                                }

                                $tembusan_stack = $surat_stack->insert(array(
                                    'surat_stack_staf'    => $tembusan_id,
                                    'surat_stack_profil'  => $tembusanProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_level'   => $index,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT,
                                    'surat_stack_istembusan' => 1
                                ));
                            }
                        }

                        if (!empty($utembusan)) {
                            $surat_stack->delete(array(
                                'surat_stack_surat'      => $data['surat_id'],
                                'surat_stack_model'      => $surat_stack::MODEL_PENERIMA,
                                'surat_stack_istembusan' => 1
                            ), function ($response) {
                            });

                            foreach ($utembusan as $index => $p) {
                                if (is_string($p)) {
                                    $utembusan_id = $p;
                                    $utembusanProfil = $utembusan_profil[$index] ? $utembusan_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $utembusan_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $utembusanProfil = $utembusan_profil[$index] ? $utembusan_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $utembusan_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $utembusanProfil = $utembusan_profil[$index] ? $utembusan_profil[$index] : null;
                                }

                                if (empty($utembusan_id)) {
                                    continue;
                                }

                                $utembusan_stack = $surat_stack->insert(array(
                                    'surat_stack_staf'    => $utembusan_id,
                                    'surat_stack_profil'  => $utembusanProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_level'   => $index,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT,
                                    'surat_stack_istembusan' => 1
                                ));
                            }
                        }

                        if (!empty($upetikan)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat'     => $data['surat_id'],
                                'surat_stack_model'     => $surat_stack::MODEL_PETIKAN,
                                'surat_stack_baca_tgl'    => null
                            ), function ($response) {
                            });

                            foreach ($upetikan as $index => $p) {
                                if (is_string($p)) {
                                    $upetikan_id = $p;
                                    $upetikanProfil = $upetikan_profil[$index] ? $upetikan_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $upetikan_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $upetikanProfil = $upetikan_profil[$index] ? $upetikan_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $upetikan_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $upetikanProfil = $upetikan_profil[$index] ? $upetikan_profil[$index] : null;
                                }

                                if (empty($upetikan_id)) continue;

                                $next = $surat_stack->max('surat_stack_level', array(
                                    'surat_stack_surat'     => $data['surat_id'],
                                    'surat_stack_model'     => $surat_stack::MODEL_PETIKAN
                                ));

                                $pstack = $surat_stack->find(array(
                                    'surat_stack_surat'     => $data['surat_id'],
                                    'surat_stack_model'     => $surat_stack::MODEL_PETIKAN,
                                    'surat_stack_staf'      => $upetikan_id
                                ));

                                $lvl = $next + 1;

                                if (!$pstack) {
                                    $surat_stack->insert(array(
                                        'surat_stack_staf'    => $upetikan_id,
                                        'surat_stack_profil'  => $upetikanProfil,
                                        'surat_stack_surat'   => $data['surat_id'],
                                        'surat_stack_model'   => $surat_stack::MODEL_PETIKAN,
                                        'surat_stack_level'   => $lvl,
                                        'surat_stack_status'  => $surat_view::SETUJU_INIT
                                    ));
                                }
                            }
                        }

                        /* check not empty petikan then process */
                        if (!empty($petikan)) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat'     => $data['surat_id'],
                                'surat_stack_model'     => $surat_stack::MODEL_PETIKAN
                            ), function ($response) {
                            });

                            foreach ($petikan as $index => $p) {
                                if (is_string($p)) {
                                    $petikan_id = $p;
                                    $petikanProfil = $petikan_profil[$index] ? $petikan_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $petikan_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $petikanProfil = $petikan_profil[$index] ? $petikan_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $petikan_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $petikanProfil = $petikan_profil[$index] ? $petikan_profil[$index] : null;
                                }

                                if (empty($petikan_id)) continue;

                                $lvl = $index;

                                $petikan_stack = $surat_stack->insert(array(
                                    'surat_stack_staf'    => $p,
                                    'surat_stack_profil'  => $petikanProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PETIKAN,
                                    'surat_stack_level'   => $lvl,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT
                                ));
                            }
                        }
                    }

                    if (!empty($upenyetuju)) {
                        /*delete temporary first*/
                        $surat_stack->delete(array(
                            'surat_stack_surat'     => $data['surat_id'],
                            'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU,
                            'surat_stack_baca_tgl'    => null
                        ), function ($response) {
                        });

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

                            if (!$pstack) {
                                $surat_stack->insert(array(
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

                    /* check not empty penyetuju then process */
                    if (!empty($penyetuju)) {
                        if ($temporary == 1 || $distribute) {
                            /*delete temporary first*/
                            $surat_stack->delete(array(
                                'surat_stack_surat'     => $data['surat_id'],
                                'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU
                            ), function ($response) {
                            });

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
                                    'surat_stack_staf'    => $p,
                                    'surat_stack_profil'  => $penyetujuProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENYETUJU,
                                    'surat_stack_level'   => $lvl,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT
                                ));
                            }
                        } else {
                            $disposisi_operation = $disposisi->insert(
                                array(
                                    'disposisi_tgl'         => $now,
                                    'disposisi_pelaku'      => $account_id,
                                    'disposisi_pelaku_profil'  => $stafProfil['staf_profil'],
                                    'disposisi_staf'        => $account_id,
                                    'disposisi_profil'      => $stafProfil['staf_profil'],
                                    'disposisi_model'       => $disposisi_view::MODEL_KOREKSI,
                                    'disposisi_model_sub'   => 0,
                                    'disposisi_surat'       => $data['surat_id'],
                                    'disposisi_baca_tgl'    => $now
                                ),
                                null,
                                function ($response) use (
                                    $me,
                                    $disposisi,
                                    $temporary,
                                    $disposisi_masuk,
                                    $log,
                                    $account_record,
                                    $disposisi_masuk_view,
                                    $surat_view,
                                    $disposisi_view,
                                    $penyetuju,
                                    $surat_stack,
                                    $data,
                                    $properti,
                                    $account,
                                    $account_id,
                                    $now,
                                    $queueTube,
                                    $queueTubeRedis,
                                    $koreksi_masuk_view,
                                    $penyetuju_profil,
                                    $queuetubeKoreksi,
                                    $worker_mode,
                                    $pengaturan,
                                    $notifikasi
                                ) {
                                    if ($response[$disposisi->successProperty] !== true) return;

                                    $inserted_data = $response['data'];
                                    $disposisi_id = $inserted_data['disposisi_id'];
                                    $updated_data = $disposisi->update($disposisi_id, array('disposisi_parent_path' => '/' . $disposisi_id));
                                    /*insert properti*/
                                    $op = $properti->created($account_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                                    if ($op) {
                                        $disposisi->update($inserted_data['disposisi_id'], array(
                                            'disposisi_properti' => $op['properti_id']
                                        ));
                                    }

                                    if (!is_array($penyetuju)) {
                                        $penyetuju = array();
                                    }

                                    /*delete temporary first*/
                                    $surat_stack->delete(array(
                                        'surat_stack_surat'     => $data['surat_id'],
                                        'surat_stack_model'     => $surat_stack::MODEL_PENYETUJU
                                    ), function ($response) {
                                    });

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
                                            'surat_stack_status'  => $surat_view::SETUJU_INIT
                                        ));

                                        /*recent*/
                                        $recent_exist = $this->m_staf_recent->read(array(
                                            'staf_aktual_pengirim' => $account_id,
                                            'staf_aktual_penerima' => $p,
                                        ));

                                        if ($recent_exist) {
                                            $this->m_staf_recent->update(array(
                                                'staf_aktual_pengirim' => $account_id,
                                                'staf_aktual_penerima' => $p
                                            ), array(
                                                'staf_aktual_pengirim' => $account_id,
                                                'staf_aktual_penerima' => $p,
                                                'staf_aktual_tgl'    => $now,
                                                'staf_aktual_tipe'    => $disposisi::MODEL_KOREKSI
                                            ), function ($response) use ($properti, $data, $account_id) {

                                                $recent_data = $response['data'];
                                                $updated_data = $this->m_staf_recent->read($recent_data['staf_aktual_id']);
                                                $idProp = $updated_data['staf_aktual_properti'];

                                                $properti->updated($idProp, $account_id, $updated_data, 'staf_aktual ' . $updated_data['staf_aktual_tgl']);
                                            });
                                        } else {
                                            $this->m_staf_recent->insert(array(
                                                'staf_aktual_pengirim' => $account_id,
                                                'staf_aktual_penerima' => $p,
                                                'staf_aktual_tgl'    => $now,
                                                'staf_aktual_tipe'    => $disposisi::MODEL_KOREKSI
                                            ), null, function ($response) use ($data, $properti, $account_id) {

                                                $inserted_data = $this->m_staf_recent->read($this->m_staf_recent->get_insertid());
                                                $op = $properti->created($account_id, $inserted_data, 'staf_aktual', $inserted_data['staf_aktual_id'], 'staf_aktual ' . $inserted_data['staf_aktual_tgl']);
                                                if ($op) {
                                                    $this->m_staf_recent->update($inserted_data['staf_aktual_id'], array(
                                                        'staf_aktual_properti' => $op['properti_id']
                                                    ));
                                                }
                                            });
                                        }

                                        $useNotifEmail = $pengaturan->getSettingByCode('notif_email');
                                        $useNotifEmailDraft = $pengaturan->getSettingByCode('notif_email_suratdraft');

                                        if ($data['surat_setuju_isurut']) {
                                            if ($lvl === 0) {
                                                $data_koreksi = array(
                                                    'surat_id' => $data['surat_id'],
                                                    'surat_perihal' => $data['surat_perihal'],
                                                    'surat_registrasi' => $data['surat_registrasi'],
                                                    'disposisi_id' => $disposisi_id,
                                                    'pengirim_id' => $account_id,
                                                    'pengirim_nama' => $account_record['staf_nama'],
                                                    'penerima_id' => $p,
                                                    'penerima_profil' => $penyetujuProfil,
                                                    'type' => 'SuratKeputusan-Staf',
                                                    'use_notif_email' => $useNotifEmail,
                                                    'use_notif_email_draft' => $useNotifEmailDraft
                                                );

                                                if ($worker_mode == 'local') {
                                                    $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                                                } else {
                                                    $addJob = create_job($queuetubeKoreksi, $data_koreksi);
                                                }

                                                /*add ons*/
                                                // $akunLogin = $account->get_profile();
                                                // $data['distributor_nama'] = $akunLogin['staf_nama'];

                                                // if($useNotifEmail && $useNotifEmailDraft){
                                                //     $notifikasi->created('email', $data, $p, NULL, 'draf');
                                                // }
                                            }
                                        } else {
                                            $data_koreksi = array(
                                                'surat_id' => $data['surat_id'],
                                                'surat_perihal' => $data['surat_perihal'],
                                                'surat_registrasi' => $data['surat_registrasi'],
                                                'disposisi_id' => $disposisi_id,
                                                'pengirim_id' => $account_id,
                                                'pengirim_nama' => $account_record['staf_nama'],
                                                'penerima_id' => $p,
                                                'penerima_profil' => $penyetujuProfil,
                                                'type' => 'SuratKeputusan-Staf',
                                                'use_notif_email' => $useNotifEmail,
                                                'use_notif_email_draft' => $useNotifEmailDraft
                                            );

                                            if ($worker_mode == 'local') {
                                                $create_dispoma = $koreksi_masuk_view->create_koreksi($data_koreksi);
                                            } else {
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

                    if ($distribute) {
                        /* create docs petikan */
                        $data_penerima = array();
                        if ($data['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF && $data['surat_petikan_setuju'] == $surat::SETUJU_SETUJU) {
                            $data['surat_petikan_akhir_staf_profil'] = null;
                            if ($data['surat_petikan_akhir_staf']) {
                                $petikan_akhir = $pegawai->read($data['surat_petikan_akhir_staf']);
                                $data['surat_petikan_akhir_staf_profil'] = $petikan_akhir['staf_profil'];
                            }

                            $data_penerima = array(
                                'surat_id' => $data['surat_id'],
                                'surat_model_sub' => $data['surat_model_sub'],
                                'surat_arsip' => $data['surat_arsip'],
                                'petikan_akhir' => $data['surat_petikan_akhir_staf'],
                                'petikan_akhir_profil' => $data['surat_petikan_akhir_staf_profil'],
                                'penyetuju_akhir' => null,
                                'penyetuju_akhir_profil' => null,
                                'account_id' => $account_id,
                                'auto_distribusi_setting' => $auto_distribusi_setting
                            );
                        } else if ($data['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN && $data['surat_setuju'] == $surat::SETUJU_SETUJU) {
                            $data['surat_setuju_akhir_staf_profil'] = null;
                            if ($data['surat_setuju_akhir_staf']) {
                                $penyetuju_akhir = $pegawai->read($data['surat_setuju_akhir_staf']);
                                $data['surat_setuju_akhir_staf_profil'] = $penyetuju_akhir['staf_profil'];
                            }

                            $data_penerima = array(
                                'surat_id' => $data['surat_id'],
                                'surat_model_sub' => $data['surat_model_sub'],
                                'surat_arsip' => $data['surat_arsip'],
                                'petikan_akhir' => null,
                                'petikan_akhir_profil' => null,
                                'penyetuju_akhir' => $data['surat_setuju_akhir_staf'],
                                'penyetuju_akhir_profil' => $data['surat_setuju_akhir_staf_profil'],
                                'account_id' => $account_id,
                                'auto_distribusi_setting' => $auto_distribusi_setting
                            );
                        }

                        if ($worker_mode == 'local') {
                            $create_docs = $dokumen_view->create_docs_petikan($data_penerima);
                        } else {
                            $addJob = create_job($queuetubeKeputusan, $data_penerima);
                        }

                        if ($mergeData && $data['surat_nomor']) $surat->compiledDataWithDokumen($data['surat_id']);
                    }
                }
            );
        }
        $operation[$surat->dataProperty] = $surat_keputusan_view->read($id);
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
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


        if ($permanen) {
            $id = varReq('id');
            $idProp = varReq('properti');
            $idArsip = varReq('arsip');
            $idKores = varReq('korespon');
            $kores = varReq('kores');
            $dokumen = $this->m_dokumen;
            $arsip = $this->m_arsip;
            $disposisi = $this->m_disposisi;
            $disposisi_masuk = $this->m_disposisi_masuk;

            // del surat imasuk
            $dataSurat = $surat->find(array('surat_korespondensi_surat' => $id));

            if ($dataSurat) {
                foreach ($dataSurat as $i => $data) {
                    // del disposisi dan disposisi masuk properti
                    $dataDis = $disposisi->find(array('disposisi_surat' => $data['surat_id']));
                    foreach ($dataDis as $i => $sDispo) {
                        $properti->delete(array(
                            'properti_entitas_id' => $sDispo['disposisi_id']
                        ));

                        $dataDisMa = $disposisi_masuk->find(array('disposisi_masuk_disposisi' => $sDispo['disposisi_id']));
                        foreach ($dataDisMa as $i => $sDisMa) {
                            $properti->delete(array(
                                'properti_entitas_id' => $sDisMa['disposisi_masuk_id']
                            ));
                        }
                    }
                    //del surat
                    $suratImasuk = $surat->delete($data['surat_id'], function ($response) use ($kores, $data, $akun, $properti, $surat, $korespondensi) {
                        $properti->delete(array(
                            'properti_entitas_id' => $data['surat_id']
                        ));
                        // update korespondensi
                        $datakores = $surat->find(array('surat_korespondensi' => $kores));
                        if (!$datakores) {
                            $korespondensi->delete(array(
                                'korespondensi_id' => $kores
                            ));
                        }
                        if ($data['surat_korespondensi_surat']) {
                            $dataAn = $surat->find(array('surat_korespondensi_surat' => $data['surat_id']));
                            foreach ($dataAn as $i => $sAn) {
                                $surat->update(
                                    $sAn['surat_id'],
                                    array(
                                        'surat_korespondensi_surat' => $data['surat_korespondensi_surat']
                                    ),
                                    null,
                                    function ($response) {
                                    }
                                );
                            }
                        }
                    });
                }
            }

            // del surat keputusan
            // del arsip dan dokumen
            $dataDok = $dokumen->find(array('dokumen_arsip' => $idArsip));
            foreach ($dataDok as $i => $sArsip) {
                $properti->delete(array(
                    'properti_entitas_id' => $sArsip['dokumen_id']
                ));
            }
            $delArsip = $arsip->delete($idArsip, function ($response) use ($properti, $idArsip) {
                $properti->delete(array(
                    'properti_entitas_id' => $idArsip
                ));
            });

            // del disposisi dan disposisi masuk properti
            $dataDis = $disposisi->find(array('disposisi_surat' => $id));
            foreach ($dataDis as $i => $sDispo) {
                $properti->delete(array(
                    'properti_entitas_id' => $sDispo['disposisi_id']
                ));

                $dataDisMa = $disposisi_masuk->find(array('disposisi_masuk_disposisi' => $sDispo['disposisi_id']));
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
                $datakores = $surat->find(array('surat_korespondensi' => $kores));
                if (!$datakores) {
                    $korespondensi->delete(array(
                        'korespondensi_id' => $kores
                    ));
                }
                if ($idKores) {
                    $dataAn = $surat->find(array('surat_korespondensi_surat' => $id));
                    foreach ($dataAn as $i => $sAn) {
                        $surat->update(
                            $sAn['surat_id'],
                            array(
                                'surat_korespondensi_surat' => $idKores
                            ),
                            null,
                            function ($response) {
                            }
                        );
                    }
                }
            });
        } else {
            $payload = getRequestPayload();
            $data = (array) ($usePayload ? $payload : varPost());
            $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
            $idProp = $data['surat_properti'];
            $dataLog = array(
                'surat_log_tipe' => 16,
                'surat_log_surat' => $data['surat_id'],
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );

            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
            $data['surat_ishapus'] = 1;
            $operation = $surat->update($id, $data, function ($response) use ($properti, $surat, $akun, $data) {

                // $deleted_data = $response['data'];

                $deleted_data = $surat->read($data['surat_id']);
                $idProp = $deleted_data['surat_properti'];
                if (empty($idProp)) {
                    $op = $properti->created($akun, $deleted_data, 'surat', $deleted_data['surat_id']);
                    if ($op) {
                        $surat->update($deleted_data['surat_id'], array(
                            'surat_properti' => $op['properti_id']
                        ));
                    }
                }
                $properti->deleted($idProp, $akun, $deleted_data);
            });
        }

        if ($operation['success']) {
            $operation['message'] = 'Berhasil menghapus data';
        }
        $this->response($operation);
    }

    function disposisi()
    {
        $model_staf = $this->m_staf;
        $account = $this->m_account;
        $account_id = $account->get_profile_id();
        $stafProfil = $model_staf->read($account_id);

        $dpo = $me->m_disposisi->insert(
            array(
                'disposisi_tanggal'         => $now,
                'disposisi_pelaku'          => $account_id,
                'disposisi_pelaku_profil'   => $stafProfil['staf_profil'],
                'disposisi_staf'            => $account_id,
                'disposisi_profil'          => $stafProfil['staf_profil'],
                'disposisi_surat'           => $r_surat[$model->dataProperty][$me->m_surat->get_primary()],
            ),
            null,
            function ($response) use ($me, $penerima, $now, $account_id, $model, $addons, $data, $tipe) {
                if ($response[$model->successProperty] !== true) return;

                if (!is_array($penerima)) {
                    $penerima = array();
                }
                $disposisi_id = $me->m_disposisi->get_insertid();
                foreach ($penerima as $index => $p) {
                    if (is_string($p)) {
                        $penerima_id = $p;
                    } else if (is_object($p)) {
                        $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                    } else if (is_array($p)) {
                        $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                    }

                    if (empty($penerima_id)) {
                        continue;
                    }
                    $suratpegawai = $me->m_disposisi_masuk_view;
                    $me->m_disposisi_penerima->insert(array(
                        'disposisi_penerima_disposisi'  => $disposisi_id,
                        'disposisi_penerima_penerima'   => $p,
                        'disposisi_penerima_status'     => $suratpegawai::BACA_INIT
                    ));

                    // add ons
                    // $addons->email($tipe, $penerima_id, $data);
                    // $addons->sms($tipe, $penerima_id, $data);
                }
            }
        );
    }

    function internal_report()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $surat              = $this->m_surat;
        $internal_view      = $this->m_surat_keputusan_aktif_view;
        $jenis              = $this->m_jenis;
        $spenerimask_view   = $this->m_surat_penerimask_view;

        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $param_unit     = varGet('unit');
        $param_bagian = varGet('bagian');
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        $_filter = [];
        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $tipeSK         = varGet('tipesk');
        $jenisSub       = varGet('jenissub');
        $rec_jenis_sub  = $jenis->get_jenis_sub();
        $jenisSub_subtipe = 10;

        if (strtolower($download) == 'false') $download = 0;

        $download = (bool) $download;
        $user = $account_model->get_profile();

        // Filter Date
        if ($filterValue) {
            $filterDate     = $report_model->generateFieldDate(varGet('filter'), $filterValue);
            if ($filterDate) {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => $filterDate
                ));
            }
        }

        // Filter Unit
        if ($param_bagian != 'null') {
            if ($param_bagian && $param_bagian != 'semua') {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => "unit_id = '$param_bagian'"
                ));
                // $unit_model->find(array('unit_id' => $param_bagian));
            } else if ($param_unit == 'semua') {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => 'unit_induk IS NOT NULL'
                ));
            } else {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => 'unit_parent_path LIKE "%' . $param_unit . '%"'
                ));
            }
        }

        $unit_recs = $unit_model->select(array(
            'filter'    => json_encode($_filter),
            'sorter'    => 'unit_nama',
        ));



        if (!is_array($unit_recs)) $unit_recs = array();

        foreach ($unit_recs['data'] as $d_i => $v) {
            $param_unit = $unit_recs['data'][$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_code] = NULL;
            unset($time_field['surat_properti_pembuat_unit']);
            if ($tipeSK) $time_field['surat_model_sub'] = $tipeSK;
            if ($jenisSub && $jenisSub != 'null') $time_field['surat_jenis_sub'] = $jenisSub;
            $time_field['surat_unit'] = $unit_recs['data'][$d_i]['unit_id'];

            $records = $internal_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_nomor_urut' => 'asc',
                    'surat_nomor_backdate' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $jenis_sub_nama = $this::$default_value['jenis_sk'];
                foreach ($rec_jenis_sub as $index => $jenis_sub) {
                    if ($jenis_sub->sub_id == $r['surat_jenis_sub']) {
                        $jenis_sub_nama = $jenis_sub->sub_nama;
                    }
                    if ($jenis_sub->sub_id == $jenisSub) {
                        $jenisSub_subtipe = $jenis_sub->sub_tipe;
                    }
                }

                $surat_nomor = $this::$default_report['surat_nomor'];
                if (($r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF && $r['surat_petikan_setuju'] == 2) || ($r['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN && $r['surat_setuju'] == 2)) {
                    $surat_nomor = $r['surat_nomor'];
                }

                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                /*ambil nama dr model internal tipe*/
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal'];
                $r['surat_tmt'] = ($r['surat_tmt']) ? $report_model->date_format($r['surat_tmt'], 'd M Y') : $this::$default_report['surat_tmt'];
                $r['surat_nomor'] = $surat_nomor;
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'] . '.' . $r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['surat_jenis_sub_nama'] = $jenis_sub_nama;
                $r['surat_model_sub_nama'] = $r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF ? 'Kolektif' : 'Perorangan';

                $unit_nama[] = array();

                $stack_penerimask = $spenerimask_view->find(
                    array('surat_penerimask_surat' => $r['surat_id']),
                    null,
                    null,
                    null,
                    array('surat_penerimask_level' => 'asc')
                );
                $r['surat_penerimask_total'] = count($stack_penerimask) + 1;

                foreach ($stack_penerimask as $i => &$p) {
                    $p['jabatan_lama_nama'] = $p['jabatan_lama_nama'] ? $p['jabatan_lama_nama'] : '-';
                    $p['jabatan_baru_nama'] = $p['jabatan_baru_nama'] ? $p['jabatan_baru_nama'] : '-';
                    $p['golongan_lama_level'] = $p['golongan_lama_level'] ? $p['golongan_lama_level'] : '-';
                    $p['golongan_baru_level'] = $p['golongan_baru_level'] ? $p['golongan_baru_level'] : '-';
                    $p['surat_penerimask_sglama'] = $p['surat_penerimask_sglama'] ? $p['surat_penerimask_sglama'] : '-';
                    $p['surat_penerimask_sgbaru'] = $p['surat_penerimask_sgbaru'] ? $p['surat_penerimask_sgbaru'] : '-';
                    $p['surat_penerimask_gpbaru'] = $p['surat_penerimask_gpbaru'] ? 'Rp. ' . number_format($p['surat_penerimask_gpbaru'], 0, null, ".") . ',-' : '-';
                    $p['penerimask_bgcolor'] = $r['bg_color'];
                }
                $r['penerimask'] = $stack_penerimask;
            }

            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs['data'][$d_i] = $v;
            } else {
                unset($unit_recs['data'][$d_i]);
            }
        }

        if (!$unit_recs) {
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_jenis', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_unit'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this->report_subtitle,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $unit_recs['data'],
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            // 'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);

        if ($jenisSub_subtipe == 0) {
            $file = $this->load->view($this->report_template_jenisjab, null, true);
        } else if ($jenisSub_subtipe == 1 || $jenisSub_subtipe == 2) {
            $file = $this->load->view($this->report_template_jenisgol, null, true);
        } else if ($jenisSub_subtipe == 3) {
            $file = $this->load->view($this->report_template_jenisdemosi, null, true);
        } else if ($jenisSub_subtipe == 4) {
            $file = $this->load->view($this->report_template_jenispengangkatanjabatan, null, true);
        } else if ($jenisSub_subtipe == 5) {
            $file = $this->load->view($this->report_template_jenispenyesuaianjenjang, null, true);
        } else {
            $file = $this->load->view($this->report_template_jenisall, null, true);
        }

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_semua()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $surat              = $this->m_surat;
        $internal_view      = $this->m_surat_keputusan_aktif_view;
        $jenis              = $this->m_jenis;
        $spenerimask_view   = $this->m_surat_penerimask_view;
        $pengaturan         = $this->m_pengaturan;

        $_filter = [];
        $filter         = varGet('filter');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $param_unit     = varGet('unit');
        $filterValue    = varGet('value');
        $tipeSK         = varGet('tipesk');
        $jenisSub       = varGet('jenissub');
        $rec_jenis_sub  = $jenis->get_jenis_sub();
        $jenisSub_subtipe = 10;

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user     = $account_model->get_profile();

        $buatSuratKeluar = $pengaturan->getSettingByCode('use_unit_buat_surat_keluar');

        if ($buatSuratKeluar) {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => 'IFNULL(unit_isbuatsurat, 0) = 1'
            ]);
        }

        // filter unit
        if ($param_unit == 'semua') {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => "unit_induk IS NOT NULL"
            ]);
        } else if ($param_unit != 'null') {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => "unit_induk='$param_unit'"
            ]);
        }

        $unit_recs = $unit_model->select(array(
            'filter'    => json_encode($_filter),
            'sorter'    => 'unit_nama',
        ));
        if (!is_array($unit_recs)) $unit_recs = array();

        foreach ($unit_recs['data'] as $d_i => $v) {
            $param_unit = $unit_recs['data'][$d_i]['unit_induk'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_code] = NULL;
            unset($time_field['surat_properti_pembuat_unit']);
            $time_field['surat_unit'] = $unit_recs['data'][$d_i]['unit_id'];
            if ($tipeSK) $time_field['surat_model_sub'] = $tipeSK;
            if ($jenisSub && $jenisSub != 'null') $time_field['surat_jenis_sub'] = $jenisSub;

            $records = $internal_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_nomor_urut' => 'asc',
                    'surat_nomor_backdate' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                foreach ($rec_jenis_sub as $index => $jenis_sub) {
                    if ($jenis_sub->sub_id == $r['surat_jenis_sub']) {
                        $jenis_sub_nama = $jenis_sub->sub_nama;
                    }
                    if ($jenis_sub->sub_id == $jenisSub) {
                        $jenisSub_subtipe = $jenis_sub->sub_tipe;
                    }
                }

                $surat_nomor = $this::$default_report['surat_nomor'];
                if (($r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF && $r['surat_petikan_setuju'] == 2) || ($r['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN && $r['surat_setuju'] == 2)) {
                    $surat_nomor = $r['surat_nomor'];
                }

                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal'];
                $r['surat_nomor'] = $surat_nomor;
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_tmt'] = ($r['surat_tmt']) ? $report_model->date_format($r['surat_tmt'], 'd M Y') : $this::$default_report['surat_tmt'];
                $r['surat_jenis_sub_nama'] = $r['surat_jenis_sub'] ? $jenis_sub_nama : $this::$default_value['jenis_sk'];
                $r['surat_model_sub_nama'] = $r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF ? 'Kolektif' : 'Perorangan';

                $unit_nama[] = array();

                $stack_penerimask = $spenerimask_view->find(
                    array('surat_penerimask_surat' => $r['surat_id']),
                    null,
                    null,
                    null,
                    array('surat_penerimask_level' => 'asc')
                );
                $r['surat_penerimask_total'] = count($stack_penerimask) + 1;

                foreach ($stack_penerimask as $i => &$p) {
                    $p['jabatan_lama_nama'] = $p['jabatan_lama_nama'] ? $p['jabatan_lama_nama'] : '-';
                    $p['jabatan_baru_nama'] = $p['jabatan_baru_nama'] ? $p['jabatan_baru_nama'] : '-';
                    $p['golongan_lama_level'] = $p['golongan_lama_level'] ? $p['golongan_lama_level'] : '-';
                    $p['golongan_baru_level'] = $p['golongan_baru_level'] ? $p['golongan_baru_level'] : '-';
                    $p['surat_penerimask_sglama'] = $p['surat_penerimask_sglama'] ? $p['surat_penerimask_sglama'] : '-';
                    $p['surat_penerimask_sgbaru'] = $p['surat_penerimask_sgbaru'] ? $p['surat_penerimask_sgbaru'] : '-';
                    $p['surat_penerimask_gpbaru'] = $p['surat_penerimask_gpbaru'] ? 'Rp. ' . number_format($p['surat_penerimask_gpbaru'], 0, null, ".") . ',-' : '-';
                    $p['penerimask_bgcolor'] = $r['bg_color'];
                }
                $r['penerimask'] = $stack_penerimask;
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs['data'][$d_i] = $v;
            } else {
                unset($unit_recs[$d_i]);
            }
        }

        if (!$unit_recs) {
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(
                array('surat_jenis', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_unit'),
                $this::$default_value['nodata']
            );
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'     => $report_title,
            'subtitle'  => $this->report_subtitle_semua,
            'header'    => $report_model->generateHeader($download, 7),
            'periode'   => $report_model->generatePeriode($filter, $filterValue),
            'unit'      => $unit_recs['data'],
            // 'operator'  => $user[$account_model->field_display],
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i')
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);

        if ($jenisSub_subtipe == 0) {
            $file = $this->load->view($this->report_template_jenisjab, null, true);
        } else if ($jenisSub_subtipe == 1 || $jenisSub_subtipe == 2) {
            $file = $this->load->view($this->report_template_jenisgol, null, true);
        } else if ($jenisSub_subtipe == 3) {
            $file = $this->load->view($this->report_template_jenisdemosi, null, true);
        } else if ($jenisSub_subtipe == 4) {
            $file = $this->load->view($this->report_template_jenispengangkatanjabatan, null, true);
        } else if ($jenisSub_subtipe == 5) {
            $file = $this->load->view($this->report_template_jenispenyesuaianjenjang, null, true);
        } else {
            $file = $this->load->view($this->report_template_jenisall, null, true);
        }

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_kewenangan()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $surat              = $this->m_surat;
        $internal_view      = $this->m_surat_keputusan_aktif_view;
        $jenis              = $this->m_jenis;
        $spenerimask_view   = $this->m_surat_penerimask_view;

        $filter             = varGet('filter');
        $download           = varGet('download', 0);
        $excel              = varGet('excel', 0);
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $filterValue        = varGet('value');
        $param_unit         = varGet('unit');
        $tipeSK             = varGet('tipesk');
        $jenisSub           = varGet('jenissub');
        $rec_jenis_sub      = $jenis->get_jenis_sub();
        $jenisSub_subtipe   = 3;

        if (strtolower($download) == 'false') $download = 0;

        $download   = (bool) $download;
        $user       = $account_model->get_profile();

        if (empty($param_unit) || is_null($param_unit)) {
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        } else {
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null : array('unit_id' => $param_unit)),
                null,
                null,
                null,
                array('unit_nama' => 'asc')
            );
        }

        if (!is_array($unit_recs)) $unit_recs = array();

        foreach ($unit_recs as $d_i => $v) {
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_code] = NULL;
            unset($time_field['surat_properti_pembuat_unit']);
            if ($tipeSK) $time_field['surat_model_sub'] = $tipeSK;
            if ($jenisSub && $jenisSub !== 'null') $time_field['surat_jenis_sub'] = $jenisSub;
            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];

            $records = $internal_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_nomor_urut' => 'asc',
                    'surat_nomor_backdate' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                foreach ($rec_jenis_sub as $index => $jenis_sub) {
                    if ($jenis_sub->sub_id == $r['surat_jenis_sub']) {
                        $jenis_sub_nama = $jenis_sub->sub_nama;
                    }
                    if ($jenis_sub->sub_id == $jenisSub) {
                        $jenisSub_subtipe = $jenis_sub->sub_tipe;
                    }
                }

                $surat_nomor = $this::$default_report['surat_nomor'];
                if (($r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF && $r['surat_petikan_setuju'] == 2) || ($r['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN && $r['surat_setuju'] == 2)) {
                    $surat_nomor = $r['surat_nomor'];
                }

                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal'];
                $r['surat_nomor'] = $surat_nomor;
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_tmt'] = ($r['surat_tmt']) ? $report_model->date_format($r['surat_tmt'], 'd M Y') : $this::$default_report['surat_tmt'];
                $r['surat_jenis_sub_nama'] = $r['surat_jenis_sub'] ? $jenis_sub_nama : $this::$default_value['jenis_sk'];
                $r['surat_model_sub_nama'] = $r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF ? 'Kolektif' : 'Perorangan';

                $unit_nama[] = array();

                $stack_penerimask = $spenerimask_view->find(
                    array('surat_penerimask_surat' => $r['surat_id']),
                    null,
                    null,
                    null,
                    array('surat_penerimask_level' => 'asc')
                );
                $r['surat_penerimask_total'] = count($stack_penerimask) + 1;

                foreach ($stack_penerimask as $i => &$p) {
                    $p['jabatan_lama_nama'] = $p['jabatan_lama_nama'] ? $p['jabatan_lama_nama'] : '-';
                    $p['jabatan_baru_nama'] = $p['jabatan_baru_nama'] ? $p['jabatan_baru_nama'] : '-';
                    $p['golongan_lama_level'] = $p['golongan_lama_level'] ? $p['golongan_lama_level'] : '-';
                    $p['golongan_baru_level'] = $p['golongan_baru_level'] ? $p['golongan_baru_level'] : '-';
                    $p['surat_penerimask_sglama'] = $p['surat_penerimask_sglama'] ? $p['surat_penerimask_sglama'] : '-';
                    $p['surat_penerimask_sgbaru'] = $p['surat_penerimask_sgbaru'] ? $p['surat_penerimask_sgbaru'] : '-';
                    $p['surat_penerimask_gpbaru'] = $p['surat_penerimask_gpbaru'] ? 'Rp. ' . number_format($p['surat_penerimask_gpbaru'], 0, null, ".") . ',-' : '-';
                    $p['penerimask_bgcolor'] = $r['bg_color'];
                }
                $r['penerimask'] = $stack_penerimask;
            }

            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs[$d_i] = $v;
            } else {
                unset($unit_recs[$d_i]);
            }
        }

        if (!$unit_recs) {
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('jenis_sub', 'surat_tanggal', 'surat_nomor', 'surat_perihal', 'tahun', 'surat_unit', 'surat_tmt'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'     => $report_title,
            'subtitle'  => $this->report_subtitle_kewenangan,
            'header'    => $report_model->generateHeader($download, 7),
            'periode'   => $report_model->generatePeriode($filter, $filterValue),
            'unit'      => $unit_recs,
            'operator'  => $user[$account_model->field_display],
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i')
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);

        if ($jenisSub_subtipe == 0) {
            $file = $this->load->view($this->report_template_jenisjab, null, true);
        } else if ($jenisSub_subtipe == 1 || $jenisSub_subtipe == 2) {
            $file = $this->load->view($this->report_template_jenisgol, null, true);
        } else if ($jenisSub_subtipe == 3) {
            $file = $this->load->view($this->report_template_jenisdemosi, null, true);
        } else if ($jenisSub_subtipe == 4) {
            $file = $this->load->view($this->report_template_jenispengangkatanjabatan, null, true);
        } else if ($jenisSub_subtipe == 5) {
            $file = $this->load->view($this->report_template_jenispenyesuaianjenjang, null, true);
        } else {
            $file = $this->load->view($this->report_template_jenisall, null, true);
        }

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_blmsetuju()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $spenerimask_view   = $this->m_surat_penerimask_view;
        $jenis              = $this->m_jenis;
        $surat              = $this->m_surat;
        $internal_view      = $this->m_surat_keputusan_blm_setuju_view;

        $_filter = [];
        $filter         = varGet('filter');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', '') ? base64_decode(varGet('title')) : '';

        $filterValue    = varGet('value');
        $param_unit     = varGet('unit');
        $param_bagian = varGet('bagian');
        $tipeSK         = varGet('tipesk');
        $jenisSub       = varGet('jenissub');
        $rec_jenis_sub  = $jenis->get_jenis_sub();
        $jenisSub_subtipe = 10;

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        // Filter Date
        if ($filterValue) {
            $filterDate     = $report_model->generateFieldDate(varGet('filter'), $filterValue);
            if ($filterDate) {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => $filterDate
                ));
            }
        }

        // Filter Unit
        if ($param_bagian != 'null') {
            if ($param_bagian && $param_bagian != 'semua') {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => "unit_id = '$param_bagian'"
                ));
                // $unit_model->find(array('unit_id' => $param_bagian));
            } else if ($param_unit == 'semua') {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => 'unit_induk IS NOT NULL'
                ));
            } else {
                array_unshift($_filter, (object)array(
                    'type'  => 'custom',
                    'value'     => 'unit_parent_path LIKE "%' . $param_unit . '%"'
                ));
            }
        }

        $unit_recs = $unit_model->select(array(
            'filter'    => json_encode($_filter),
            'sorter'    => 'unit_nama',
        ));

        if (!is_array($unit_recs)) $unit_recs = array();

        foreach ($unit_recs['data'] as $d_i => $v) {
            $param_unit = $unit_recs['data'][$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_code] = NULL;
            if ($tipeSK) $time_field['surat_model_sub'] = $tipeSK;
            if ($jenisSub && $jenisSub !== 'null') $time_field['surat_jenis_sub'] = $jenisSub;
            unset($time_field['surat_properti_pembuat_unit']);
            $time_field['surat_unit'] = $unit_recs['data'][$d_i]['unit_id'];

            $records = $internal_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_nomor_urut' => 'asc',
                    'surat_nomor_backdate' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $jenis_sub_nama = $this::$default_value['jenis_sk'];
                foreach ($rec_jenis_sub as $index => $jenis_sub) {
                    if ($jenis_sub->sub_id == $r['surat_jenis_sub']) {
                        $jenis_sub_nama = $jenis_sub->sub_nama;
                    }
                    if ($jenis_sub->sub_id == $jenisSub) {
                        $jenisSub_subtipe = $jenis_sub->sub_tipe;
                    }
                }

                $surat_nomor = $this::$default_report['surat_nomor'];
                if (($r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF && $r['surat_petikan_setuju'] == 2) || ($r['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN && $r['surat_setuju'] == 2)) {
                    $surat_nomor = $r['surat_nomor'];
                }

                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal'];
                $r['surat_tmt'] = ($r['surat_tmt']) ? $report_model->date_format($r['surat_tmt'], 'd M Y') : $this::$default_report['surat_tmt'];
                $r['surat_nomor'] = $surat_nomor;
                $r['surat_agenda_converted'] = ($r['surat_agenda_sub']) ? $r['surat_agenda'] . '.' . $r['surat_agenda_sub'] : $r['surat_agenda'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['surat_jenis_sub_nama'] = $jenis_sub_nama;
                $r['surat_model_sub_nama'] = $r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF ? 'Kolektif' : 'Perorangan';

                $unit_nama[] = array();

                $stack_penerimask = $spenerimask_view->find(
                    array('surat_penerimask_surat' => $r['surat_id']),
                    null,
                    null,
                    null,
                    array('surat_penerimask_level' => 'asc')
                );
                $r['surat_penerimask_total'] = count($stack_penerimask) + 1;

                foreach ($stack_penerimask as $i => &$p) {
                    $p['jabatan_lama_nama'] = $p['jabatan_lama_nama'] ? $p['jabatan_lama_nama'] : '-';
                    $p['jabatan_baru_nama'] = $p['jabatan_baru_nama'] ? $p['jabatan_baru_nama'] : '-';
                    $p['golongan_lama_level'] = $p['golongan_lama_level'] ? $p['golongan_lama_level'] : '-';
                    $p['golongan_baru_level'] = $p['golongan_baru_level'] ? $p['golongan_baru_level'] : '-';
                    $p['surat_penerimask_sglama'] = $p['surat_penerimask_sglama'] ? $p['surat_penerimask_sglama'] : '-';
                    $p['surat_penerimask_sgbaru'] = $p['surat_penerimask_sgbaru'] ? $p['surat_penerimask_sgbaru'] : '-';
                    $p['surat_penerimask_gpbaru'] = $p['surat_penerimask_gpbaru'] ? 'Rp. ' . number_format($p['surat_penerimask_gpbaru'], 0, null, ".") . ',-' : '-';
                    $p['penerimask_bgcolor'] = $r['bg_color'];
                }
                $r['penerimask'] = $stack_penerimask;
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs['data'][$d_i] = $v;
            } else {
                unset($unit_recs['data'][$d_i]);
            }
        }

        if (!$unit_recs) {
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array(
                'jenis_nama',
                'surat_tanggal',
                'surat_nomor',
                'surat_agenda_converted',
                'surat_perihal',
                'surat_kelas_nama',
                'surat_kelas_kode',
                'surat_unit',
                'tahun'
            ), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this->report_subtitle_blmsetuju,
            'header' => $report_model->generateHeader($download, 6),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $unit_recs['data'],
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            // 'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);

        if ($jenisSub_subtipe == 0) {
            $file = $this->load->view($this->report_template_jenisjab, null, true);
        } else if ($jenisSub_subtipe == 1 || $jenisSub_subtipe == 2) {
            $file = $this->load->view($this->report_template_jenisgol, null, true);
        } else if ($jenisSub_subtipe == 3) {
            $file = $this->load->view($this->report_template_jenisdemosi, null, true);
        } else if ($jenisSub_subtipe == 4) {
            $file = $this->load->view($this->report_template_jenispengangkatanjabatan, null, true);
        } else if ($jenisSub_subtipe == 5) {
            $file = $this->load->view($this->report_template_jenispenyesuaianjenjang, null, true);
        } else {
            $file = $this->load->view($this->report_template_jenisall, null, true);
        }

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename, true);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_blmsetuju_semua()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $surat              = $this->m_surat;
        $internal_view      = $this->m_surat_keputusan_blm_setuju_view;
        $pengaturan         = $this->m_pengaturan;
        $jenis              = $this->m_jenis;
        $spenerimask_view   = $this->m_surat_penerimask_view;

        $_filter = [];
        $filter         = varGet('filter');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', '') ? base64_decode(varGet('title')) : '';

        $param_unit     = varGet('unit');
        $filterValue    = varGet('value');
        $tipeSK         = varGet('tipesk');
        $jenisSub       = varGet('jenissub');
        $rec_jenis_sub  = $jenis->get_jenis_sub();
        $jenisSub_subtipe = 10;

        $buatSuratKeluar = $pengaturan->getSettingByCode('use_unit_buat_surat_keluar');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user     = $account_model->get_profile();

        if ($buatSuratKeluar) {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => 'IFNULL(unit_isbuatsurat, 0) = 1'
            ]);
        }
        // filter unit
        if ($param_unit == 'semua') {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => "unit_induk IS NOT NULL"
            ]);
        } else if ($param_unit != 'null') {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => "unit_induk='$param_unit'"
            ]);
        }

        $unit_recs = $unit_model->select(array(
            'filter'    => json_encode($_filter),
            'sorter'    => 'unit_nama',
        ));

        if (!is_array($unit_recs)) $unit_recs = array();

        foreach ($unit_recs['data'] as $d_i => $v) {
            $param_unit = $unit_recs['data'][$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_code] = NULL;
            unset($time_field['surat_properti_pembuat_unit']);
            if ($tipeSK) $time_field['surat_model_sub'] = $tipeSK;
            if ($jenisSub && $jenisSub != 'null') $time_field['surat_jenis_sub'] = $jenisSub;
            $time_field['surat_unit'] = $unit_recs['data'][$d_i]['unit_id'];

            $records = $internal_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_nomor_urut' => 'asc',
                    'surat_nomor_backdate' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $jenis_sub_nama = $this::$default_value['jenis_sk'];
                foreach ($rec_jenis_sub as $index => $jenis_sub) {
                    if ($jenis_sub->sub_id == $r['surat_jenis_sub']) {
                        $jenis_sub_nama = $jenis_sub->sub_nama;
                    }
                    if ($jenis_sub->sub_id == $jenisSub) {
                        $jenisSub_subtipe = $jenis_sub->sub_tipe;
                    }
                }

                $surat_nomor = $this::$default_report['surat_nomor'];
                if (($r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF && $r['surat_petikan_setuju'] == 2) || ($r['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN && $r['surat_setuju'] == 2)) {
                    $surat_nomor = $r['surat_nomor'];
                }

                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal'];
                $r['surat_tmt'] = ($r['surat_tmt']) ? $report_model->date_format($r['surat_tmt'], 'd M Y') : $this::$default_report['surat_tmt'];
                $r['surat_nomor'] = $surat_nomor;
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['surat_jenis_sub_nama'] = $jenis_sub_nama;
                $r['surat_model_sub_nama'] = $r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF ? 'Kolektif' : 'Perorangan';

                $unit_nama[] = array();

                $stack_penerimask = $spenerimask_view->find(
                    array('surat_penerimask_surat' => $r['surat_id']),
                    null,
                    null,
                    null,
                    array('surat_penerimask_level' => 'asc')
                );
                $r['surat_penerimask_total'] = count($stack_penerimask) + 1;

                foreach ($stack_penerimask as $i => &$p) {
                    $p['jabatan_lama_nama'] = $p['jabatan_lama_nama'] ? $p['jabatan_lama_nama'] : '-';
                    $p['jabatan_baru_nama'] = $p['jabatan_baru_nama'] ? $p['jabatan_baru_nama'] : '-';
                    $p['golongan_lama_level'] = $p['golongan_lama_level'] ? $p['golongan_lama_level'] : '-';
                    $p['golongan_baru_level'] = $p['golongan_baru_level'] ? $p['golongan_baru_level'] : '-';
                    $p['surat_penerimask_sglama'] = $p['surat_penerimask_sglama'] ? $p['surat_penerimask_sglama'] : '-';
                    $p['surat_penerimask_sgbaru'] = $p['surat_penerimask_sgbaru'] ? $p['surat_penerimask_sgbaru'] : '-';
                    $p['surat_penerimask_gpbaru'] = $p['surat_penerimask_gpbaru'] ? 'Rp. ' . number_format($p['surat_penerimask_gpbaru'], 0, null, ".") . ',-' : '-';
                    $p['penerimask_bgcolor'] = $r['bg_color'];
                }
                $r['penerimask'] = $stack_penerimask;
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs['data'][$d_i] = $v;
            } else {
                unset($unit_recs['data'][$d_i]);
            }
        }

        if (!$unit_recs) {
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array(
                'jenis_nama',
                'surat_tanggal',
                'surat_nomor',
                'surat_agenda_converted',
                'surat_perihal',
                'surat_kelas_nama',
                'surat_kelas_kode',
                'surat_unit',
                'tahun'
            ), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this->report_subtitle_blmsetuju_semua,
            'header' => $report_model->generateHeader($download, 6),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $unit_recs['data'],
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            // 'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);

        if ($jenisSub_subtipe == 0) {
            $file = $this->load->view($this->report_template_jenisjab, null, true);
        } else if ($jenisSub_subtipe == 1 || $jenisSub_subtipe == 2) {
            $file = $this->load->view($this->report_template_jenisgol, null, true);
        } else if ($jenisSub_subtipe == 3) {
            $file = $this->load->view($this->report_template_jenisdemosi, null, true);
        } else if ($jenisSub_subtipe == 4) {
            $file = $this->load->view($this->report_template_jenispengangkatanjabatan, null, true);
        } else if ($jenisSub_subtipe == 5) {
            $file = $this->load->view($this->report_template_jenispenyesuaianjenjang, null, true);
        } else {
            $file = $this->load->view($this->report_template_jenisall, null, true);
        }

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename, true);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function internal_report_blmsetuju_kewenangan()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $jenis              = $this->m_jenis;
        $spenerimask_view   = $this->m_surat_penerimask_view;
        $surat              = $this->m_surat;
        $internal_view      = $this->m_surat_keputusan_blm_setuju_view;

        $filter = [];
        $filter         = varGet('filter');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', '') ? base64_decode(varGet('title')) : '';
        $dataReport = [];

        $filterValue    = varGet('value');
        $tipeSK         = varGet('tipesk');
        $jenisSub       = varGet('jenissub');
        $param_unit     = varGet('unit');
        $rec_jenis_sub  = $jenis->get_jenis_sub();
        $jenisSub_subtipe = 10;

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        // if (empty($param_unit) || is_null($param_unit)) {
        //     $unit_recs2 = $unit_model->select(array(
        //         'filter'    => json_encode($filter),
        //         'sorter'    => 'unit_nama',
        //     ));
        //     $unit_recs = $unit_recs2['data'];
        // } else {
        //     $unit_recs = $unit_model->find(
        //         (is_null($param_unit) ? null : array('unit_id' => $param_unit)),
        //         null,
        //         null,
        //         null,
        //         array(
        //             'unit_nama' => 'asc'
        //         )
        //     );
        // }

        // Filter Date
        if ($filterValue) {
            $filterDate     = $report_model->generateFieldDate(varGet('filter'), $filterValue);
            if ($filterDate) {
                array_unshift($filter, (object)array(
                    'type'  => 'custom',
                    'value'     => $filterDate
                ));
            }
        }

        // Filter Unit
        if ($param_unit != 'null' || $param_unit != 'semua') {
            array_unshift($filter, (object)array(
                'type'  => 'custom',
                'value'     => "unit_induk = '$param_unit'"
            ));
        }

        $records = $internal_view->select([
            'filter' => json_encode($filter),
            'sorter' => json_encode(array(
                'surat_nomor_urut' => 'asc',
                'surat_nomor_backdate' => 'asc'
            ))
        ]);

        echo '<pre>';
        print_r($records);
        echo '</pre>';

        // if (!is_array($unit_recs)) $unit_recs = array();

        // foreach ($unit_recs as $d_i => $v) {
        //     $param_unit = $unit_recs[$d_i]['unit_id'];
        //     $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
        //     $time_field[$surat::$field_id . '<>' . $surat::$field_code] = NULL;
        //     unset($time_field['surat_properti_pembuat_unit']);
        //     if ($tipeSK) $time_field['surat_model_sub'] = $tipeSK;
        //     if ($jenisSub && $jenisSub !== 'null') $time_field['surat_jenis_sub'] = $jenisSub;
        //     $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];

        //     $records = $internal_view->find(
        //         $time_field,
        //         null,
        //         null,
        //         null,
        //         array(
        //             'surat_nomor_urut' => 'asc',
        //             'surat_nomor_backdate' => 'asc'
        //         )
        //     );

        //     foreach ($records as $i => &$r) {
        //         $jenis_sub_nama = $this::$default_value['jenis_sk'];
        //         foreach ($rec_jenis_sub as $index => $jenis_sub) {
        //             if ($jenis_sub->sub_id == $r['surat_jenis_sub']) {
        //                 $jenis_sub_nama = $jenis_sub->sub_nama;
        //             }
        //             if ($jenis_sub->sub_id == $jenisSub) {
        //                 $jenisSub_subtipe = $jenis_sub->sub_tipe;
        //             }
        //         }

        //         $surat_nomor = $this::$default_report['surat_nomor'];
        //         if (($r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF && $r['surat_petikan_setuju'] == 2) || ($r['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN && $r['surat_setuju'] == 2)) {
        //             $surat_nomor = $r['surat_nomor'];
        //         }

        //         $r['no'] = $i + 1;
        //         $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
        //         $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal'];
        //         $r['surat_tmt'] = ($r['surat_tmt']) ? $report_model->date_format($r['surat_tmt'], 'd M Y') : $this::$default_report['surat_tmt'];
        //         $r['surat_nomor'] = $surat_nomor;
        //         $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
        //         $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
        //         $r['surat_jenis_sub_nama'] = $jenis_sub_nama;
        //         $r['surat_model_sub_nama'] = $r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF ? 'Kolektif' : 'Perorangan';

        //         $unit_nama[] = array();

        //         $stack_penerimask = $spenerimask_view->find(
        //             array('surat_penerimask_surat' => $r['surat_id']),
        //             null,
        //             null,
        //             null,
        //             array('surat_penerimask_level' => 'asc')
        //         );
        //         $r['surat_penerimask_total'] = count($stack_penerimask) + 1;

        //         foreach ($stack_penerimask as $i => &$p) {
        //             $p['jabatan_lama_nama'] = $p['jabatan_lama_nama'] ? $p['jabatan_lama_nama'] : '-';
        //             $p['jabatan_baru_nama'] = $p['jabatan_baru_nama'] ? $p['jabatan_baru_nama'] : '-';
        //             $p['golongan_lama_level'] = $p['golongan_lama_level'] ? $p['golongan_lama_level'] : '-';
        //             $p['golongan_baru_level'] = $p['golongan_baru_level'] ? $p['golongan_baru_level'] : '-';
        //             $p['surat_penerimask_sglama'] = $p['surat_penerimask_sglama'] ? $p['surat_penerimask_sglama'] : '-';
        //             $p['surat_penerimask_sgbaru'] = $p['surat_penerimask_sgbaru'] ? $p['surat_penerimask_sgbaru'] : '-';
        //             $p['surat_penerimask_gpbaru'] = $p['surat_penerimask_gpbaru'] ? 'Rp. ' . number_format($p['surat_penerimask_gpbaru'], 0, null, ".") . ',-' : '-';
        //             $p['penerimask_bgcolor'] = $r['bg_color'];
        //         }
        //         $r['penerimask'] = $stack_penerimask;
        //     }
        //     if (!empty($records)) {
        //         $v['records'] = $records;
        //         $v['count'] = count($records);
        //         $unit_recs[$d_i] = $v;
        //     } else {
        //         unset($unit_recs[$d_i]);
        //     }
        // }

        die;
        if (!$unit_recs) {
            $unit_recs = array();
            $unit_nama = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array(
                'jenis_nama',
                'surat_tanggal',
                'surat_nomor',
                'surat_agenda_converted',
                'surat_perihal',
                'surat_kelas_nama',
                'surat_kelas_kode',
                'surat_unit',
                'tahun'
            ), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this->report_subtitle_blmsetuju_kewenangan,
            'header' => $report_model->generateHeader($download, 6),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $unit_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);

        if ($jenisSub_subtipe == 0) {
            $file = $this->load->view($this->report_template_jenisjab, null, true);
        } else if ($jenisSub_subtipe == 1 || $jenisSub_subtipe == 2) {
            $file = $this->load->view($this->report_template_jenisgol, null, true);
        } else if ($jenisSub_subtipe == 3) {
            $file = $this->load->view($this->report_template_jenisdemosi, null, true);
        } else if ($jenisSub_subtipe == 4) {
            $file = $this->load->view($this->report_template_jenispengangkatanjabatan, null, true);
        } else if ($jenisSub_subtipe == 5) {
            $file = $this->load->view($this->report_template_jenispenyesuaianjenjang, null, true);
        } else {
            $file = $this->load->view($this->report_template_jenisall, null, true);
        }

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename, true);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_rekap()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unitkerja_model    = $this->model('sipas/unit', true);
        $surat              = $this->m_surat_view;
        $skeprekap          = $this->m_surat_keputusan_rekap_view;
        $jenis              = $this->m_jenis;

        $filter             = varGet('filter');
        $download           = varGet('download', 0);
        $excel              = varGet('excel', 0);
        $report_title       = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $filterValue        = varGet('value');
        $param_unitkerja    = varGet('unit');
        $tipeSK             = varGet('tipesk');
        $jenisSub           = varGet('jenissub');
        $rec_jenis_sub      = $jenis->get_jenis_sub();

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        $_filter = $report_model->generateSelectField($filter, $filterValue);

        if ($param_unitkerja && $param_unitkerja != 'semua') array_unshift($_filter, array('type' => 'exact', 'field' => 'unit_induk', 'value' => $param_unitkerja));
        if ($tipeSK) array_unshift($_filter, array('type' => 'exact', 'field' => 'surat_model_sub', 'value' => $tipeSK));
        if ($jenisSub && $jenisSub !== 'null') array_unshift($_filter, array('type' => 'exact', 'field' => 'surat_jenis_sub', 'value' => $jenisSub));

        array_unshift($_filter, array('type' => 'exact', 'field' => 'surat_model', 'value' => $surat::MODEL_KEPUTUSAN));
        array_unshift($_filter, array('type' => 'custom', 'value' => 'jenis_id IS NOT NULL'));
        array_unshift($_filter, array('type' => 'custom', 'value' => '(surat_jenis_sub IS NOT NULL AND surat_jenis_sub <> "0")'));
        $sorter = array();
        array_unshift($sorter, array('property' => 'unit_nama', 'direction' => 'ASC'));
        array_unshift($sorter, array('property' => 'surat_model_sub', 'direction' => 'ASC'));

        $data = $skeprekap->select(
            array(
                'filter' => json_encode($_filter),
                'sorter' => json_encode($sorter)
            )
        );

        $grouped = array();

        if ($data['total'] > 0) {
            $datap = $data['data'];
            $no = 1;
            $ids_unit = array();

            foreach ($datap as $kdata => $vdata) {
                $jenis_sub_nama = '';
                $tipesk_nama = $vdata['surat_model_sub'] == $surat::MODEL_SUB_PERORANGAN ? 'Perorangan' : 'Kolektif';

                foreach ($rec_jenis_sub as $index => $jenis_sub) {
                    if ($jenis_sub->sub_id == $vdata['surat_jenis_sub']) {
                        $jenis_sub_nama = $jenis_sub->sub_nama;
                    }
                }

                $kunit     = $vdata['unit_id'];
                $jenissub  = $vdata['surat_jenis_sub'];

                array_push($ids_unit, $kunit);

                $grouped[$kunit]['unit_nama'] = $vdata['unit_nama'];

                if (!array_key_exists('kolektif', $grouped[$kunit])) {
                    $grouped[$kunit]['kolektif'] = array();
                }
                if (!array_key_exists('perorangan', $grouped[$kunit])) {
                    $grouped[$kunit]['perorangan'] = array();
                }

                if ($vdata['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF) {
                    if (!array_key_exists($jenissub, $grouped[$kunit]['kolektif'])) {
                        $grouped[$kunit]['kolektif'][$jenissub] = array();
                    }
                    if (!array_key_exists('jenis_sub_nama', $grouped[$kunit]['kolektif'][$jenissub])) {
                        $grouped[$kunit]['kolektif'][$jenissub]['jenis_sub_nama'] = $jenis_sub_nama;
                    }
                    if (!array_key_exists('tipe_nama', $grouped[$kunit]['kolektif'][$jenissub])) {
                        $grouped[$kunit]['kolektif'][$jenissub]['tipe_nama'] = $tipesk_nama;
                    }
                } else {
                    if (!array_key_exists($jenissub, $grouped[$kunit]['perorangan'])) {
                        $grouped[$kunit]['perorangan'][$jenissub] = array();
                    }
                    if (!array_key_exists('jenis_sub_nama', $grouped[$kunit]['perorangan'][$jenissub])) {
                        $grouped[$kunit]['perorangan'][$jenissub]['jenis_sub_nama'] = $jenis_sub_nama;
                    }
                    if (!array_key_exists('tipe_nama', $grouped[$kunit]['perorangan'][$jenissub])) {
                        $grouped[$kunit]['perorangan'][$jenissub]['tipe_nama'] = $tipesk_nama;
                    }
                }

                foreach ($vdata as $kval => $vval) {
                    if (is_numeric($vval)) {
                        if ($vdata['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF) {
                            if (!array_key_exists($kval, $grouped[$kunit]['kolektif'][$jenissub])) {
                                $grouped[$kunit]['kolektif'][$jenissub][$kval] = $vval;
                            } else {
                                $grouped[$kunit]['kolektif'][$jenissub][$kval] += $vval;
                            }
                        } else {
                            if (!array_key_exists($kval, $grouped[$kunit]['perorangan'][$jenissub])) {
                                $grouped[$kunit]['perorangan'][$jenissub][$kval] = $vval;
                            } else {
                                $grouped[$kunit]['perorangan'][$jenissub][$kval] += $vval;
                            }
                        }
                    }
                }
            }
        } else {
            $_rekap = array(
                'jenis_sub_nama'            => $this::$default_value['nodata'],
                'blm_distribusi_count'      => $this::$default_value['nodata'],
                'process_done_count'        => $this::$default_value['nodata'],
            );

            $_unit = array(
                'unit_nama' => $param_unitkerja ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : '<span style="font-style:italic;">(Tidak ada filter)</span>',
                'jenis_data' => array(),
                'records'    => array()
            );

            array_unshift($_unit['jenis_data'], $_rekap);
            $grouped = array($_unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'         => $report_title,
            'subtitle'      => $this->report_subtitle_rekap,
            'header'        => $report_model->generateHeader($download, 3),
            'periode'       => $report_model->generatePeriode($filter, $filterValue),
            'unit'          => $grouped,
            'dateReport'            => date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            // 'operator'      => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_rekap, null, true);

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_retensi()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $surat              = $this->m_surat;
        $jenis              = $this->m_jenis;
        $skeputusan         = $this->m_surat_keputusan_nonaktif_view;
        $pengaturan         = $this->m_pengaturan;
        $spenerimask_view   = $this->m_surat_penerimask_view;

        $_filter = [];
        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', '') ? base64_decode(varGet('title')) : '';

        $tipeid         = varGet('tipe', 0);
        $param_unit     = varGet('unit');
        $jenisSub       = varGet('jenissub');
        $tipeSK         = varGet('tipesk');
        $rec_jenis_sub  = $jenis->get_jenis_sub();
        $jenisSub_subtipe = 10;

        if (strtolower($download) == 'false') $download = 0;
        $download   = (bool) $download;
        $user       = $account_model->get_profile();

        $buatSuratKeluar = $pengaturan->getSettingByCode('use_unit_buat_surat_keluar');

        if ($buatSuratKeluar) {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => 'IFNULL(unit_isbuatsurat, 0) = 1'
            ]);
        }

        // filter unit
        if ($param_unit == 'semua') {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => "unit_induk IS NOT NULL"
            ]);
        } else if ($param_unit != 'null') {
            array_unshift($_filter, (object)[
                'type' => 'custom',
                'value' => "unit_induk='$param_unit'"
            ]);
        }

        $unit_recs = $unit_model->select(array(
            'filter'    => json_encode($_filter),
            'sorter'    => 'unit_nama',
        ));
        if (!is_array($unit_recs)) $unit_recs = array();

        foreach ($unit_recs['data'] as $d_i => $v) {
            $param_unit     = $unit_recs['data'][$d_i]['unit_id'];
            $time_field     = $report_model->generateField($param_unit, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_code] = NULL;
            if ($tipeSK) $time_field['surat_model_sub'] = $tipeSK;
            if ($jenisSub && $jenisSub !== 'null') $time_field['surat_jenis_sub'] = $jenisSub;
            $time_field['surat_unit'] = $unit_recs['data'][$d_i]['unit_id'];

            $records = $skeputusan->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_nomor_urut' => 'asc',
                    'surat_nomor_backdate' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                foreach ($rec_jenis_sub as $index => $jenis_sub) {
                    if ($jenis_sub->sub_id == $r['surat_jenis_sub']) {
                        $jenis_sub_nama = $jenis_sub->sub_nama;
                    }
                    if ($jenisSub == $jenis_sub->sub_id) {
                        $jenisSub_subtipe = $jenis_sub->sub_tipe;
                    }
                }

                $r['no']            = $i + 1;
                $r['bg_color']      = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_tanggal'] = ($r['surat_tanggal']) ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_report['surat_tanggal'];
                $r['surat_nomor'] = ($r['surat_nomor']) ? $r['surat_nomor'] : $this::$default_report['surat_nomor'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['surat_tmt'] = ($r['surat_tmt']) ? $report_model->date_format($r['surat_tmt'], 'd M Y') : $this::$default_report['surat_tmt'];
                $r['surat_jenis_sub_nama'] = $r['surat_jenis_sub'] ? $jenis_sub_nama : $this::$default_value['jenis_sk'];
                $r['surat_model_sub_nama'] = $r['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF ? 'Kolektif' : 'Perorangan';

                $stack_penerimask = $spenerimask_view->find(
                    array('surat_penerimask_surat' => $r['surat_id']),
                    null,
                    null,
                    null,
                    array('surat_penerimask_level' => 'asc')
                );
                $r['surat_penerimask_total'] = count($stack_penerimask) + 1;

                foreach ($stack_penerimask as $i => &$p) {
                    $p['jabatan_lama_nama'] = $p['jabatan_lama_nama'] ? $p['jabatan_lama_nama'] : '-';
                    $p['jabatan_baru_nama'] = $p['jabatan_baru_nama'] ? $p['jabatan_baru_nama'] : '-';
                    $p['golongan_lama_level'] = $p['golongan_lama_level'] ? $p['golongan_lama_level'] : '-';
                    $p['golongan_baru_level'] = $p['golongan_baru_level'] ? $p['golongan_baru_level'] : '-';
                    $p['surat_penerimask_sglama'] = $p['surat_penerimask_sglama'] ? $p['surat_penerimask_sglama'] : '-';
                    $p['surat_penerimask_sgbaru'] = $p['surat_penerimask_sgbaru'] ? $p['surat_penerimask_sgbaru'] : '-';
                    $p['surat_penerimask_gpbaru'] = $p['surat_penerimask_gpbaru'] ? 'Rp. ' . number_format($p['surat_penerimask_gpbaru'], 0, null, ".") . ',-' : '-';
                    $p['penerimask_bgcolor'] = $r['bg_color'];
                }
                $r['penerimask'] = $stack_penerimask;
            }

            if (!empty($records)) {
                $v['records']       = $records;
                $v['count']         = count($records);
                $unit_recs['data'][$d_i]    = $v;
            } else {
                unset($unit_recs[$d_i]);
            }
        }

        if (!$unit_recs) {
            $unit_recs  = array();
            $unit_nama  = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit       = array('unit_nama' => $unit_nama, 'records' => array());
            $surat      = array_fill_keys(array('surat_tanggal', 'surat_nomor', 'surat_perihal', 'surat_agenda_converted', 'tahun', 'surat_kelas_kode'), $this::$default_value['nodata']);
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
            'unit'                  => $unit_recs['data'],
            'dateReport'            => date('d-m-Y H:i:s'),
            'dateReportFormated'    => date('d M Y H:i'),
            // 'operator'              => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);

        if ($jenisSub_subtipe == 0) {
            $file = $this->load->view($this->report_template_jenisjab, null, true);
        } else if ($jenisSub_subtipe == 1 || $jenisSub_subtipe == 2) {
            $file = $this->load->view($this->report_template_jenisgol, null, true);
        } else if ($jenisSub_subtipe == 3) {
            $file = $this->load->view($this->report_template_jenisdemosi, null, true);
        } else if ($jenisSub_subtipe == 4) {
            $file = $this->load->view($this->report_template_jenispengangkatanjabatan, null, true);
        } else if ($jenisSub_subtipe == 5) {
            $file = $this->load->view($this->report_template_jenispenyesuaianjenjang, null, true);
        } else {
            $file = $this->load->view($this->report_template_jenisall, null, true);
        }

        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename, true);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function next($section = null, $tipe = null, $scope = null)
    {
        $me = $this;
        $model = $this->m_surat_keputusan_view;
        $unit = $this->m_unit;
        $pegawai = $me->m_account->get_profile();
        $section = strtolower($section);

        $next = null;
        switch ($section) {
            case 'agenda':
                if ($scope == NULL) {
                    $dep = $pegawai['unit_id'];
                } else {
                    $deps = $unit->read($scope);
                    $dep = $deps['unit_id'];
                }
                if ($tipe !== "null") {
                    $next = $model->max('surat_agenda', array(
                        'surat_unit'    => $dep,
                        'surat_jenis'    => $tipe
                    ));
                    $next = $next + 1;
                } else {
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
            'next' => $next
        ));
    }

    function cek_rule()
    {
        $account  = $this->m_account->get_setting();
        $surat_view = $this->m_surat_view;

        $a = (int)$account['use_auto_nomor_internal'];
        $surat_nomor = $surat_view->generate_nomor('443b9bc3eef2457d89fd4237af8bf538', 'keputusan');
    }

    function resend()
    {
        $model = $this->m_surat;
        $model_view = $this->m_surat_view;
        $account = $this->m_account;
        $model_surat = $this->m_surat;
        $surat_stack = $this->m_surat_stack;
        $surat_log     = $this->m_surat_log;
        $pegawai = $this->m_staf;

        $records = varPost();
        $account_id = $account->get_profile_id();
        $stafProfil = $pegawai->read($account_id);

        $now = date('Y-m-d H:i:s');

        $account_setting  = $account->get_setting();
        $auto_nomor_setting  = (int)$account_setting['use_auto_nomor_internal'];
        $auto_distribusi_setting  = (int)$account_setting['use_auto_distribusi_internal'];

        $penerima = $records['user'];
        $surat_id = $records['surat'];

        $surat = $model->read($surat_id);
        foreach ($penerima as $k => $v) {
            $staf_penerima = $pegawai->read($v);
            $surat_stack->insert(array(
                'surat_stack_staf'    => $v,
                'surat_stack_profil'  => $staf_penerima['staf_profil'],
                'surat_stack_surat'   => $surat['surat_id'],
                'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                'surat_stack_kirim'   => 0,
                'surat_stack_status'  => $model_view::SETUJU_SETUJU,
                'surat_stack_status_tgl' => $now,
                'surat_stack_baca_tgl' => $now,
                'surat_stack_komentar' => 'Pengiriman Ulang Surat'
            ));
        }
        $model_view->create_imasuk($account_id, $surat, $auto_distribusi_setting);

        $dataLog = array(
            'surat_log_tipe' => 7,
            'surat_log_surat' => $surat_id,
            'surat_log_staf' => $account_id, 'surat_log_profil' => $stafProfil['staf_profil'],
            'surat_log_tgl' => $now
        );
        $operation_log = $surat_log->insert($dataLog, null, function ($response) {
        });
    }

    function distribute()
    {
        $model          = $this->m_surat;
        $model_view     = $this->m_surat_view;
        $account        = $this->m_account;
        $surat_log      = $this->m_surat_log;
        $pegawai        = $this->m_staf;
        $dokumen        = $this->m_dokumen_view;
        $pengaturan     = $this->m_pengaturan;
        $worker_mode    = Config()->item('worker_mode');

        $records        = varPost();
        $account_id     = $account->get_profile_id();
        $stafProfil     = $pegawai->read($account_id);

        $now = date('Y-m-d H:i:s');

        $account_setting  = $account->get_setting();
        $auto_distribusi_setting  = (int)$account_setting['use_auto_distribusi_internal'];
        $queuetubeKeputusan = Config()->item('queueServer_tubeKeputusan');
        $mergeData = $pengaturan->getSettingByCode('use_data_merge');

        $surat_id = $records['surat'];
        $surat = $model->read($surat_id);

        /* create docs petikan */
        $data_penerima = array();
        if ($surat['surat_model_sub'] == $model::MODEL_SUB_KOLEKTIF && $surat['surat_petikan_setuju'] == $model::SETUJU_SETUJU) {
            $surat['surat_petikan_akhir_staf_profil'] = null;
            if ($surat['surat_petikan_akhir_staf']) {
                $petikan_akhir = $pegawai->read($surat['surat_petikan_akhir_staf']);
                $surat['surat_petikan_akhir_staf_profil'] = $petikan_akhir['staf_profil'];
            }

            $data_penerima = array(
                'surat_id' => $surat['surat_id'],
                'surat_model_sub' => $surat['surat_model_sub'],
                'surat_arsip' => $surat['surat_arsip'],
                'petikan_akhir' => $surat['surat_petikan_akhir_staf'],
                'petikan_akhir_profil' => $surat['surat_petikan_akhir_staf_profil'],
                'penyetuju_akhir' => null,
                'penyetuju_akhir_profil' => null,
                'account_id' => $account_id,
                'auto_distribusi_setting' => $auto_distribusi_setting
            );
        } else if ($surat['surat_model_sub'] == $model::MODEL_SUB_PERORANGAN && $surat['surat_setuju'] == $model::SETUJU_SETUJU) {
            $surat['surat_setuju_akhir_staf_profil'] = null;
            if ($surat['surat_setuju_akhir_staf']) {
                $penyetuju_akhir = $pegawai->read($surat['surat_setuju_akhir_staf']);
                $surat['surat_setuju_akhir_staf_profil'] = $penyetuju_akhir['staf_profil'];
            }

            $data_penerima = array(
                'surat_id' => $surat['surat_id'],
                'surat_model_sub' => $surat['surat_model_sub'],
                'surat_arsip' => $surat['surat_arsip'],
                'petikan_akhir' => null,
                'petikan_akhir_profil' => null,
                'penyetuju_akhir' => $surat['surat_setuju_akhir_staf'],
                'penyetuju_akhir_profil' => $surat['surat_setuju_akhir_staf_profil'],
                'account_id' => $account_id,
                'auto_distribusi_setting' => $auto_distribusi_setting
            );
        }

        $dataLog = array(
            'surat_log_tipe' => 7,
            'surat_log_surat' => $surat['surat_id'],
            'surat_log_staf' => $account_id,
            'surat_log_profil' => $stafProfil['staf_profil'],
            'surat_log_tgl' => $now
        );
        $operation_log = $surat_log->insert($dataLog, null, function ($response) {
        });

        if ($worker_mode == 'local') {
            $create_docs = $dokumen->create_docs_petikan($data_penerima);
        } else {
            $addJob = create_job($queuetubeKeputusan, $data_penerima);
        }

        if ($mergeData && $surat['surat_nomor']) $model->compiledDataWithDokumen($surat_id);

        $this->response(array(
            'success' => (bool) $surat,
            'data' => $surat
        ));
    }

    function transport_imasuk($id = null)
    {
        $model = $this->m_surat;
        $model_view = $this->m_surat_view;
        $account = $this->m_account;
        $account_setting  = $account->get_setting();

        $auto_distribusi_setting  = (int)$account_setting['use_auto_distribusi_internal'];

        $surat = $model->read($id);
        $account_id = $surat['surat_distribusi_staf'];

        $model_view->create_imasuk($account_id, $surat, $auto_distribusi_setting);
    }

    function get_template_kolektif($id = null)
    {
        $this->m_excel = $this->model('sipas/generate_excel', true);
        $m_excel = $this->m_excel;
        $id = varGet('id');
        $jenis_sub = varGet('jenis_sub') ? varGet('jenis_sub') : 0;

        $m_surat = $this->model('sipas/surat', true);
        $m_penerimask = $this->model('sipas/surat_penerimask_view', true);
        $m_jabatan_aktif = $this->model('sipas/jabatan_aktif_view', true);
        $m_golongan_aktif = $this->model('sipas/golongan_aktif_view', true);
        //Cari surat untuk pengisian config
        $data_surat = $m_surat->read($id);
        $config = (object)["sub_type" => $jenis_sub, "surat_id" => $id, "surat_registrasi" => $data_surat['surat_registrasi']];

        //Cari penerima sk by id surat
        if ($id) {
            $data_penerima = $m_penerimask->find(array(
                'surat_penerimask_surat' => $id
            ), false, false, true, array('surat_penerimask_level' => 'ASC'));
        } else {
            $data_penerima = array();
        }
        $data_jabatan = $m_jabatan_aktif->find_all();

        $data_golongan = $m_golongan_aktif->find_all(false, false, true, array("golongan_level" => "ASC"));
        $m_excel->generateTemplateKolektif($data_penerima, $data_jabatan, $data_golongan, $config);
    }

    function set_template_kolektif()
    {
        $m_excel         = $this->model('sipas/generate_excel', true);
        $file            = $_FILES['userfile'];
        $file_upload_ext = explode(".", $file['name']);
        $file_ext        = end($file_upload_ext);
        $type            = explode("|", Config()->item('upload_config')['allowed_types_penerima']);

        if (in_array(strtolower($file_ext), $type)) {
            $data           = $m_excel->readTemplateKolektif($file);

            if ($data) {
                $response = array(
                    'success' => true,
                    'message' => "Data ditemukan",
                    'data' => $data
                );
            } else {
                $response = array(
                    'success' => false,
                    'message' => "Gagal mendapat data"
                );
            }
        } else {
            $response = array(
                'success' => false,
                'message' => "Ekstensi file yang diupload tidak sesuai. Pastikan ekstensi yang diupload .xls atau .xlsx"
            );
        }

        $this->response($response);
    }
}
