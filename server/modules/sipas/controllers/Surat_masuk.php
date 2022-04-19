<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Surat_masuk extends Base_Controller
{
    protected $message = array();

    static $report_template = 'sipas/surat/eksternal/eksternal';
    static $report_title = 'Laporan Agenda Surat Masuk Eksternal';
    static $report_subtitle = 'Semua surat eksternal yang diterima oleh Instansi pengguna aplikasi';

    static $report_template_retensi = 'sipas/surat/eksternal/eksternal_inaktif';
    static $report_title_retensi    = 'Laporan Agenda Surat Masuk Eksternal Kadaluarsa';
    static $report_subtitle_retensi = 'Semua surat masuk eksternal yang melebihi tanggal retensi';

    static $report_title_aktif    = 'Laporan Agenda Surat Masuk Eksternal Aktif';
    static $report_subtitle_aktif = 'Semua surat masuk eksternal yang berstatus aktif';

    static $report_title_init    = 'Laporan Agenda Surat Masuk Eksternal Belum Didistribusikan';
    static $report_subtitle_init = 'Semua surat masuk eksternal belum didistribusikan yang diterima instansi pengguna aplikasi';

    public $report_title_rekap = 'Laporan Rekap Jumlah Surat Masuk Eksternal';
    public $report_subtitle_rekap = 'Rekap jumlah surat masuk yang diterima oleh Instansi pengguna aplikasi';
    // public $report_template_rekap = 'sipas/surat/eksternal/eksternal_masuk_detail_rekap';
    public $report_template_rekap = 'sipas/surat/eksternal/eksternal_masuk_jumlah';
    public $report_detail_title = 'Daftar Surat Belum Diproses';

    public $report_resi_template = 'sipas/surat/resi';
    public $report_resi_title = 'Tanda Terima Surat';

    static $bg_color_item_laporan = array('odd' => 'background-color: #F5F5F5;', 'even' => 'background-color: #FFFFFF;');

    static $default_value    = array(
        'empty'      => '<span style="color:grey; font-style:italic;">(dalam proses)</span>',
        'title'      => '<span style="color:white; font-style:italic;">(Tidak ada Unit)</span>',
        'nodata'     => '<span style="color:grey; font-style:italic;">(Tidak Ada Data)</span>',
        'unitnama'   => '<span style="color:grey; font-style:italic;">(Tidak memiliki unit)</span>',
        'agenda'     => '<span style="color:grey; font-style:italic;">(Tidak memiliki Agenda)</span>',
        'nosurat'    => '<span style="color:grey; font-style:italic;">(Tidak memiliki Nomor Surat)</span>',
        'registrasi' => '<span style="color:grey; font-style:italic;">(Tidak memiliki Tanggal Registrasi)</span>',
        'surattgl'   => '<span style="color:grey; font-style:italic;">(Tidak memiliki Tanggal)</span>',
        'pengirim'   => '<span style="color:grey; font-style:italic;">(Tidak memiliki Pengirim)</span>',
        'tujuan'     => '<span style="color:grey; font-style:italic;">(Tidak memiliki Penerima)</span>',
        'perihal'    => '<span style="color:grey; font-style:italic;">(Tidak memiliki Perihal)</span>',
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
        $this->m_account    = $this->model('sipas/account',     true);
        $this->m_report     = $this->model('sipas/report',      true);
        $this->m_asset      = $this->model('sipas/asset',       true);
        $this->m_surat      = $this->model('sipas/surat',       true);
        $this->m_surat_log  = $this->model('sipas/surat_log',   true);
        $this->m_surat_view = $this->model('sipas/surat_view',  true);

        $this->m_arsip            = $this->model('sipas/arsip',           true);
        $this->m_arsip_view       = $this->model('sipas/arsip_view',      true);
        $this->m_dokumen          = $this->model('sipas/dokumen',         true);
        $this->m_surat_masuk_view = $this->model('sipas/surat_masuk_view', true);


        $this->m_surat_masuk_aktif_view                 = $this->model('sipas/surat_masuk_aktif_view',                 true);
        $this->m_surat_masuk_aktif_7_view               = $this->model('sipas/surat_masuk_aktif_7_view',               true);
        $this->m_surat_masuk_aktif_3_view               = $this->model('sipas/surat_masuk_aktif_3_view',               true);
        $this->m_surat_masuk_aktif_1_view               = $this->model('sipas/surat_masuk_aktif_1_view',               true);
        $this->m_surat_masuk_hidup_view                 = $this->model('sipas/surat_masuk_hidup_view',                 true);
        $this->m_surat_masuk_arah_view                  = $this->model('sipas/surat_masuk_arah_view',                  true);
        $this->m_surat_masuk_blm_arah_view              = $this->model('sipas/surat_masuk_blm_arah_view',              true);
        $this->m_surat_masuk_distribusi_view            = $this->model('sipas/surat_masuk_distribusi_view',            true);
        $this->m_surat_masuk_blm_distribusi_view        = $this->model('sipas/surat_masuk_blm_distribusi_view',        true);
        $this->m_surat_masuk_batal_distribusi_view      = $this->model('sipas/surat_masuk_batal_distribusi_view',      true);
        $this->m_surat_masuk_nonaktif_view              = $this->model('sipas/surat_masuk_nonaktif_view',              true);
        $this->m_surat_masuk_terlewat_nonaktif_view     = $this->model('sipas/surat_masuk_terlewat_nonaktif_view',     true);

        $this->m_korespondensi        = $this->model('sipas/korespondensi',               true);
        $this->m_disposisi            = $this->model('sipas/disposisi',                   true);
        $this->m_disposisi_view       = $this->model('sipas/disposisi_view',              true);
        $this->m_disposisi_masuk      = $this->model('sipas/disposisi_masuk',             true);
        $this->m_disposisi_masuk_view = $this->model('sipas/disposisi_masuk_netral_view', true);
        $this->m_korespondensi_view   = $this->model('sipas/korespondensi_view',          true);
        $this->m_surat_stack          = $this->model('sipas/surat_stack',                 true);
        $this->m_surat_stack_view     = $this->model('sipas/surat_stack_disposisi_view',  true);

        $this->m_properti       = $this->model('sipas/properti',    true);
        $this->m_kontak         = $this->model('sipas/kontak',      true);
        $this->m_staf           = $this->model('sipas/staf',        true);
        $this->m_staf_view      = $this->model('sipas/staf_view',   true);
        $this->m_jabatan        = $this->model('sipas/jabatan',     true);
        $this->m_staf_recent    = $this->model('sipas/staf_aktual', true);
        $this->m_jabatan_recent = $this->model('sipas/jabatan_aktual', true);

        $this->m_unit              = $this->model('sipas/unit',             true);
        $this->m_unit_cakupan      = $this->model('sipas/unit_cakupan',     true);
        $this->m_unit_cakupan_view = $this->model('sipas/unit_cakupan_view', true);

        $this->m_pengaturan = $this->model('sipas/pengaturan', true);
        $this->m_notifikasi = $this->model('sipas/notifikasi', true);

        $this->m_surat_emasuk_rekap_view   = $this->model('sipas/surat_rekap_by_model_view',   true);
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_hidup_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_unit'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
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
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_aktif_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_unit'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function aktif7()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_aktif_7_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_unit'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function aktif3()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_aktif_3_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_unit'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function aktif1()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_aktif_1_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_unit'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function registrasi()
    {
        $surat_masuk_view = $this->m_surat_masuk_hidup_view;

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {

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

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function arah()
    {
        $surat_masuk_view = $this->m_surat_masuk_arah_view;

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
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

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function blm_arah()
    {
        $surat_masuk_view = $this->m_surat_masuk_blm_arah_view;

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {

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

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function nonaktif()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_nonaktif_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_jabatan'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function terlewat_nonaktif()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_terlewat_nonaktif_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_jabatan'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function distribusi()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_distribusi_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_unit'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function blm_distribusi()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_blm_distribusi_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_jabatan'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function batal_distribusi()
    {
        $surat              = $this->m_surat;
        $surat_masuk_view   = $this->m_surat_masuk_batal_distribusi_view;
        $scope              = $this->m_unit_cakupan_view;
        $account            = $this->m_account->get_profile();

        $prioritas = varGet('prioritas');

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $surat_masuk_view->read($id);
            $this->response_record($record);
        } else {
            if (varGet('scope')) {
                $scopeid = varGet('scope');
            } else {
                $scopeid = $account['staf_jabatan'];
            }

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

            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'surat_unit',
                'value' => $scopeid
            ));

            switch ($prioritas) {
                case 'not_finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_prioritas IS NOT NULL AND surat_isselesai = " . $surat::SELESAI_INIT
                    ));
                    break;
                case 'finished':
                    array_unshift($filter, (object)array(
                        "type"  => "custom",
                        "value" => "surat_isselesai = " . $surat::SELESAI_SELESAI
                    ));
                    break;
            }

            $records = $surat_masuk_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }
    }

    public function create($usePayload = true)
    {
        $me     = $this;
        $surat      = $this->m_surat;
        $surat_view = $this->m_surat_view;
        $arsip      = $this->m_arsip;
        $arsip_view = $this->m_arsip_view;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $surat_log  = $this->m_surat_log;
        $kontak     = $this->m_kontak;
        $staf       = $this->m_staf;
        $korespondensi = $this->m_korespondensi;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $now = date('Y-m-d H:i:s');
        $stafProfil = $staf->read($akun);

        $kepada = $data['surat_pengirim'];

        if (!$akun) {
            $unauthorized_op['success'] = false;
            $unauthorized_op['message'] = "Session anda telah habis, silahkan login ulang";
            $this->response($unauthorized_op);
            return;
        }

        $data['surat_buat_tgl'] = $now;
        $data['surat_buat_staf'] = $akun;
        $data['surat_buat_profil'] = $stafProfil['staf_profil'];
        $data['surat_model'] = 1;
        $data['surat_tanggal'] = $now;

        $findKontak = $kontak->find(array('kontak_nama' => $kepada));

        if (empty($findKontak[0])) {
            $dataKon = array('kontak_nama' => $kepada);
            $kontak->insert($dataKon, null, function ($response) use ($kontak, $akun, $properti, $data) {
                $inserted_data = $kontak->read($kontak->get_insertid());
                if ($inserted_data) {
                    $op = $properti->created($akun, $inserted_data, 'kontak', $inserted_data['kontak_id'], $inserted_data['kontak_nama']);
                    if ($op) {
                        $kontak->update($inserted_data['kontak_id'], array(
                            'kontak_properti' => $op['properti_id']
                        ));
                    }
                }
            });
        }

        if ($data['surat_unit']) {
            $data['surat_arah_tgl'] = $now;
            $data['surat_arah_profil'] = $stafProfil['staf_profil'];
        }
        //insert arsip
        $dataArsip = array(
            'arsip_nama' => 'SM.' . $data['surat_registrasi']
        );
        $arsip->insert($dataArsip);
        $data['surat_arsip'] = $arsip->get_insertid();
        if (!$data['surat_registrasi']) {
            $data['surat_registrasi'] = $surat_view->generate_code();
        }

        //insert surat
        $operation = $surat->insert($data, null, function ($response)
        use (
            $data,
            $surat,
            $properti,
            $account,
            $korespondensi,
            $now,
            $surat_log,
            $akun,
            $arsip,
            $stafProfil
        ) {
            if ($response[$surat->successProperty] !== true) return;

            $inserted_data = $surat->read($surat->get_insertid());
            $op = $properti->created($akun, $inserted_data, 'surat', $inserted_data['surat_id'], $inserted_data['surat_registrasi']);
            if ($op) {
                $surat->update($inserted_data['surat_id'], array(
                    'surat_properti' => $op['properti_id']
                ));
            }

            $dataLog = array(
                'surat_log_tipe' => 1,
                'surat_log_surat' => $inserted_data['surat_id'],
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );

            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
            // $operation_log = $surat_log->created($akun, $inserted_data);
        });
        $this->response($operation);
    }

    public function update($usePayload = true)
    {
        $me     = $this;
        $worker_mode = Config()->item('worker_mode');
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');
        $queuetubeDisposisi = Config()->item('queueServer_tubeDisposisi');

        $model    = $this->m_surat_masuk_view;
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
        $akun_id = $account->get_profile_id();
        $akun = $account->get_profile();
        $primary = $surat->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $penerima = varReq('user');
        $penerima_profil = varReq('user_p');
        $istembusan = varReq('t');
        // $isberkas   = varReq('b');
        $temporary = varGet('temp');
        $log = varGet('log');

        $stafProfil = $model_staf->read($akun_id);
        $surat_masuk = $surat->read($id);
        // $idProp = $data['surat_properti'];
        $mergeData = $setting->getSettingByCode('use_data_merge');

        if (varIsset($data['surat_tanggal'])) {
            $data['surat_tanggal'] = str_replace("00:00:00", date('H:i:s'), $data['surat_tanggal']);
        } else {
            unset($data['surat_tanggal']);
        }

        if (!$temporary && $data['surat_distribusi_staf']) {
            $data['surat_setuju_profil'] = $stafProfil['staf_profil'];
            $data['surat_distribusi_profil'] = $stafProfil['staf_profil'];

            if (empty($data['surat_usebalas'])) {
                $data['surat_selesai_profil'] = $stafProfil['staf_profil'];
            }
        }

        if ($data['surat_unit'] && $data['surat_arah_staf'] && $surat_masuk['surat_arah_profil'] == NULL) {
            $data['surat_arah_tgl'] = $now;
            $data['surat_arah_profil'] = $stafProfil['staf_profil'];
        }

        $operation = $surat->update($id, $data, function ($response)
        use (
            $data,
            $surat,
            $surat_view,
            $properti,
            $account,
            $akun_id,
            $akun,
            $korespondensi,
            $surat_stack,
            $penerima,
            $surat_log,
            $temporary,
            $log,
            $disposisi_masuk_view,
            $disposisi_masuk,
            $model,
            $now,
            $disposisi_view,
            $disposisi,
            $setting,
            $notifikasi,
            $staf,
            $istembusan, /*$isberkas,*/
            $mergeData,
            $id,
            $queueTube,
            $queueTubeRedis,
            $worker_mode,
            $queuetubeDisposisi,
            $stafProfil,
            $penerima_profil
        ) {
            if ($response[$surat->successProperty] !== true) return;
            if (Config()->item('queueServer')['host']) {
                $data_redis = array(
                    'type' => 'SuratMasuk-Unit',
                    'staf_id' => null,
                    'jabatan_id' => null,
                    'unit_id' => $data['surat_unit'],
                    'data' => $data['surat_unit']
                );
                $addJobUnit = create_job($queueTubeRedis, $data_redis);
            }

            $updated_data = $surat->read($data['surat_id']);
            // pushEvent(array(
            //     'to' => $data['surat_unit'],
            //     'data' => array(
            //         'api' => 'surat_masuk',
            //         'id' => $id
            //     ),
            //     'group' => array('unit'),
            //     'type' => 'surat_masuk'
            // ));

            $idProp = $updated_data['surat_properti'];
            if (empty($idProp)) {
                $op = $properti->created($akun_id, $updated_data, 'surat', $updated_data['surat_id'], $updated_data['surat_registrasi']);
                if ($op) {
                    $surat->update($updated_data['surat_id'], array(
                        'surat_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun_id, $updated_data, $updated_data['surat_registrasi']);

            if ($log) {
                $dataLog = array(
                    'surat_log_tipe' => $log,
                    'surat_log_surat' => $updated_data['surat_id'],
                    'surat_log_staf' => $akun_id,
                    'surat_log_profil' => $stafProfil['staf_profil'],
                    'surat_log_tgl' => $now
                );

                $operation_log = $surat_log->insert($dataLog, null, function ($response) {
                });

                if ($data['surat_distribusi_tgl']) {
                    $dataLog1 = array(
                        'surat_log_tipe' => 7,
                        'surat_log_surat' => $updated_data['surat_id'],
                        'surat_log_staf' => $akun_id,
                        'surat_log_profil' => $stafProfil['staf_profil'],
                        'surat_log_tgl' => $now
                    );
                    $operation_log1 = $surat_log->insert($dataLog1, null, function ($response) {
                    });
                }

                if ($data['surat_selesai_tgl']) {
                    $dataLogSelesai = array(
                        'surat_log_tipe' => 8,
                        'surat_log_surat' => $updated_data['surat_id'],
                        'surat_log_staf' => $akun_id,
                        'surat_log_profil' => $stafProfil['staf_profil'],
                        'surat_log_tgl' => $now
                    );
                    $operation_logSelesai = $surat_log->insert($dataLogSelesai, null, function ($response) {
                    });
                }
            } else {
                if ($data['surat_usebalas'] && $data['surat_selesai_tgl']) {
                    $dataLogSelesai = array(
                        'surat_log_tipe' => 8,
                        'surat_log_surat' => $updated_data['surat_id'],
                        'surat_log_staf' => $akun_id,
                        'surat_log_profil' => $stafProfil['staf_profil'],
                        'surat_log_tgl' => $now
                    );
                    $operation_logSelesai = $surat_log->insert($dataLogSelesai, null, function ($response) {
                    });
                }

                /*log button tandai surat selesai*/
                if ($data['surat_isselesai'] && $data['surat_selesai_tgl']) {
                    $dataLogSelesai = array(
                        'surat_log_tipe' => 8,
                        'surat_log_surat' => $updated_data['surat_id'],
                        'surat_log_staf' => $akun_id,
                        'surat_log_profil' => $stafProfil['staf_profil'],
                        'surat_log_tgl' => $now
                    );

                    $operation_logSelesai = $surat_log->insert($dataLogSelesai, null, function ($response) {
                    });
                }
            }

            if (empty($data['surat_korespondensi_surat'])) {
                /*if no `korespondensi` attached on surat so it will create new and as root*/
                if (empty($data['surat_korespondensi'])) {
                    $korespondensi->insert(
                        array(
                            'korespondensi_perihal'     => $data['surat_perihal'],
                            'korespondensi_isinternal'  => 0,
                            'korespondensi_pengirim'    => $data['surat_pengirim'],
                            'korespondensi_penerima'    => $data['surat_tujuan']
                        ),
                        null,
                        function ($r_korespondensi) use ($response, $surat, $korespondensi, $properti, $akun_id) {
                            if ($r_korespondensi[$surat->successProperty] !== true) return;

                            $inserted_data = $korespondensi->read($korespondensi->get_insertid());
                            $op = $properti->created($akun_id, $inserted_data, 'korespondensi', $inserted_data['korespondensi_id'], $inserted_data['korespondensi_nomor']);
                            if ($op) {
                                $korespondensi->update($inserted_data['korespondensi_id'], array(
                                    'korespondensi_properti' => $op['properti_id']
                                ));
                            }

                            $surat->update($response[$surat->dataProperty][$surat->get_primary()], array(
                                'surat_korespondensi' => $r_korespondensi[$surat->dataProperty][$korespondensi->get_primary()]
                            ), function ($response_korespondensi) use ($surat, $properti, $akun_id) {
                                if ($response_korespondensi[$surat->successProperty] !== true) return;
                                $updated_data = $surat->read($surat->get_insertid());
                                $properti->updated($updated_data['surat_properti'], $akun_id, $updated_data, $updated_data['surat_registrasi']);
                            });
                        }
                    );
                }
            } else {
                $korespondensi_surat = $surat->read($data['surat_id']);
                if ($korespondensi_surat) {
                    $surat->update($response[$surat->dataProperty][$surat->get_primary()], array(
                        'surat_korespondensi'       => $data['surat_korespondensi'],
                        'surat_korespondensi_surat' => $data['surat_korespondensi_surat']
                    ), function ($response_korespondensi) use ($surat, $properti, $akun_id) {
                        if ($response_korespondensi[$surat->successProperty] !== true) return;
                        $updated_data = $response_korespondensi['data'];
                        $properti->updated($updated_data['surat_properti'], $akun_id, $updated_data, $updated_data['surat_registrasi']);
                    });
                }
            }

            $find_temporary_stack = $surat_stack->find(array(
                'surat_stack_surat' => $data['surat_id']
            ));
            if ($find_temporary_stack) {
                $surat_stack->delete(array(
                    'surat_stack_surat' => $data['surat_id']
                ));
            }

            if (!is_array($penerima)) $penerima = array();

            if (!is_array($istembusan)) $istembusan = array();

            if (!is_array($penerima_profil)) $penerima_profil = array();

            if ($temporary == 1) {
                if (!empty($penerima)) {
                    foreach ($penerima as $index => $p) {

                        if ($istembusan[$index] === 'true') {
                            $istembusan[$index] = true;
                        }
                        // if($isberkas[$index] === 'true'){
                        //     $isberkas[$index] = true;
                        // }

                        if (is_string($p)) {
                            $penerima_id = $p;
                            $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                        } else if (is_object($p)) {
                            $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                            $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                        } else if (is_array($p)) {
                            $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                            $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                            // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                            $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                        }

                        if (empty($penerima_id)) {
                            continue;
                        }
                        $lvl = $index;

                        /*pending decision for stack to have properti*/
                        // $op = $properti->created($akun_id);
                        // $idStackProp = $op['properti_id'];

                        /*Re-insert penerima List*/
                        $penerima_stack = $surat_stack->insert(array(
                            'surat_stack_staf'    => $penerima_id,
                            'surat_stack_profil'  => $penerimaProfil,
                            'surat_stack_surat'   => $data['surat_id'],
                            'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                            'surat_stack_level'   => $lvl,
                            'surat_stack_status'  => $surat_view::SETUJU_INIT,
                            'surat_stack_isberkas' => $data['surat_useberkas'],
                            'surat_stack_istembusan' => $tembusan
                            // 'surat_stack_properti'  => $idStackProp
                        ));
                    }
                }
            } else {
                if (!empty($penerima)) {
                    /*delete temporary first*/
                    $surat_stack->delete(array(
                        'surat_stack_surat'     => $data['surat_id'],
                        'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                    ), function ($response) {
                    });

                    $dpo = $this->m_disposisi->insert(
                        array(
                            'disposisi_tgl'     => $now,
                            'disposisi_pelaku'  => $akun_id,
                            'disposisi_pelaku_profil'  => $stafProfil['staf_profil'],
                            'disposisi_staf'    => $akun_id,
                            'disposisi_profil'  => $stafProfil['staf_profil'],
                            'disposisi_model'   => $disposisi_view::MODEL_DISPOSISI,
                            'disposisi_surat'   => $data['surat_id']
                        ),
                        null,
                        function ($response) use (
                            $penerima,
                            $now,
                            $account,
                            $akun_id,
                            $akun,
                            $disposisi_masuk_view,
                            $model,
                            $disposisi_masuk,
                            $data,
                            $temporary,
                            $properti,
                            $log,
                            $surat_stack,
                            $surat_view,
                            $disposisi,
                            $setting,
                            $staf,
                            $notifikasi,
                            $istembusan, /*$isberkas,*/
                            $queueTube,
                            $queueTubeRedis,
                            $worker_mode,
                            $queuetubeDisposisi,
                            $penerima_profil
                        ) {
                            if ($response[$disposisi_masuk->successProperty] !== true) return;

                            if (!is_array($penerima)) {
                                $penerima = array();
                            }
                            $disposisi_id = $this->m_disposisi->get_insertid();
                            $updated_data = $this->m_disposisi->update($disposisi_id, array('disposisi_parent_path' => '/' . $disposisi_id));
                            $count_penerima = count($penerima);

                            $query = "INSERT INTO disposisi_jumlah_penerima (disposisi_masuk_disposisi, disposisi_jumlah_penerima) VALUES('" . $disposisi_id . "', " . $count_penerima . ")";
                            $result = $this->db->query($query);

                            $inserted_data = $model->read($disposisi_id);
                            $data_disposisi = $response['data'];

                            /*insert properti*/
                            $op = $properti->created($akun_id, $inserted_data, 'disposisi', $inserted_data['disposisi_id'], $inserted_data['disposisi_nomor']);
                            if ($op) {
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

                            if (!is_array($penerima_profil)) {
                                $penerima_profil = array();
                            }

                            foreach ($penerima as $index => $p) {
                                if ($istembusan[$index] === 'true') {
                                    $istembusan[$index] = true;
                                }
                                // if($isberkas[$index] === 'true'){
                                //     $isberkas[$index] = true;
                                // }

                                if (is_string($p)) {
                                    $penerima_id = $p;
                                    $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                                    // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                } else if (is_object($p)) {
                                    $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                                    // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                } else if (is_array($p)) {
                                    $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    $tembusan = ((int)$istembusan[$index] != '') ? 1 : 0;
                                    // $berkas = ((int)$isberkas[$index] != '') ? 1 : 0;
                                    $penerimaProfil = $penerima_profil[$index] ? $penerima_profil[$index] : null;
                                }

                                if (empty($penerima_id)) {
                                    continue;
                                }
                                $lvl = $index;

                                /*pending decision for stack to have properti*/
                                // $op = $properti->created($akun_id);
                                // $idStackProp = $op['properti_id'];

                                /*Re-insert penerima List*/
                                $penerima_stack = $surat_stack->insert(array(
                                    'surat_stack_staf'    => $p,
                                    'surat_stack_profil'  => $penerimaProfil,
                                    'surat_stack_surat'   => $data['surat_id'],
                                    'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                    'surat_stack_level'   => $lvl,
                                    'surat_stack_status'  => $surat_view::SETUJU_INIT,
                                    'surat_stack_isberkas' => $data['surat_useberkas'],
                                    'surat_stack_istembusan' => $tembusan
                                    // 'surat_stack_properti'  => $idStackProp
                                ));

                                $dis_pen_prop = $properti->created($akun_id);
                                $disposisi_pen_properti = $dis_pen_prop['properti_id'];

                                $data_diposisi_masuk = array(
                                    'disposisi_id' => $disposisi_id,
                                    'disposisi_masuk_profil' => $penerimaProfil,
                                    'dispo_masuk_parent' => null,
                                    'penerima_id' => $penerima_id,
                                    'penerima_jabatan' => null,
                                    'pengirim_id' => $akun_id,
                                    'berkas' => $data['surat_useberkas'],
                                    'tembusan' => $tembusan,
                                    'key_redis' => Config()->item('redisPrefix') . 'disposisi_sama:' . $data_disposisi['disposisi_surat'] . '-' . $penerima_id
                                );

                                if ($worker_mode == 'local') {
                                    $create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
                                } else {
                                    $addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
                                }

                                /*recent*/
                                $recent_exist = $this->m_staf_recent->read(array(
                                    'staf_aktual_pengirim' => $data['surat_distribusi_staf'],
                                    'staf_aktual_penerima' => $penerima_id,
                                ));
                                if ($recent_exist) {
                                    // echo "if sini";
                                    $this->m_staf_recent->update(array(
                                        'staf_aktual_pengirim' => $data['surat_distribusi_staf'],
                                        'staf_aktual_penerima' => $penerima_id
                                    ), array(
                                        'staf_aktual_pengirim' => $data['surat_distribusi_staf'],
                                        'staf_aktual_penerima' => $penerima_id,
                                        'staf_aktual_tgl'    => $now,
                                        'staf_aktual_tipe'    => $this->m_disposisi::MODEL_DISPOSISI
                                    ), function ($response) use ($properti, $akun) {
                                        $recent_data = $response['data'];
                                        $updated_data = $this->m_staf_recent->read($recent_data['staf_aktual_id']);
                                        $idProp = $updated_data['staf_aktual_properti'];

                                        $properti->updated($idProp, $akun['staf_id'], $updated_data, 'staf_aktual ' . $updated_data['staf_aktual_tgl']);
                                    });
                                } else {
                                    // echo "else sini";
                                    $this->m_staf_recent->insert(array(
                                        'staf_aktual_pengirim' => $data['surat_distribusi_staf'],
                                        'staf_aktual_penerima' => $penerima_id,
                                        'staf_aktual_tgl'    => $now,
                                        'staf_aktual_tipe'    => $this->m_disposisi::MODEL_DISPOSISI
                                    ), null, function ($response) use ($data, $properti, $akun) {

                                        $inserted_data = $this->m_staf_recent->read($this->m_staf_recent->get_insertid());
                                        $op = $properti->created($akun, $inserted_data, 'staf_aktual', $inserted_data['staf_aktual_id'], 'staf_aktual ' . $inserted_data['staf_aktual_tgl']);
                                        if ($op) {
                                            $this->m_staf_recent->update($inserted_data['staf_aktual_id'], array(
                                                'staf_aktual_properti' => $op['properti_id']
                                            ));
                                        }
                                    });
                                }
                                /*add ons*/
                                $useNotifEmail = $setting->getSettingByCode('notif_email');
                                $useNotifEmailMasuk = $setting->getSettingByCode('notif_email_suratmasuk');
                                $akunLogin = $account->get_profile();
                                $data['distributor_nama'] = $akunLogin['staf_nama'];


                                if ($useNotifEmail && $useNotifEmailMasuk) {
                                    $notifikasi->created('email', $data, $penerima_id, null, 'masuk', null);
                                }
                            }
                        }
                    );
                    if ($mergeData) $model->compiledDataWithDokumen($id);
                }
            }
        });
        $operation[$model->dataProperty] = $this->m_surat_masuk_view->read($id);
        // $operation['message'] = 'Berhasil mendistribusikan surat';
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
        $surat = $this->m_surat;
        $surat_log  = $this->m_surat_log;
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
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    function next($section = null)
    {
        $masuk_view = $this->m_surat_masuk_view;
        $surat_view = $this->m_surat_view;

        $surat_model = varPost('surat_model');
        $next = null;
        switch ($section) {
            case 'agenda':
                $next = $masuk_view->getAgenda($surat_model);
                break;
            case 'registrasi':
                $next = $surat_view->generate_code();
                break;
        }
        $this->response(array(
            'next' => $next
        ));
    }

    function resi($section = null)
    {
        $me = $this;
        $surat_masuk    = $me->m_surat_masuk_view;
        $report_model   = $me->m_report;
        $account_model  = $me->m_account;
        $asset_model    = $me->m_asset;
        $pengaturan_model = $me->m_pengaturan;
        $hasNomor       = '';
        $hasPerihal     = '';

        $download   = varGet('download', 0);
        $user       = $me->m_account->get_profile();

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;

        $surat_registrasi = null;
        $surat_masuk_id = varGet('id');
        $records = $surat_masuk->find(array('surat_id' => $surat_masuk_id));
        $surat_registrasi = 'No. Registrasi : ' . $records[0]['surat_registrasi'];

        date_default_timezone_set("Asia/Jakarta");

        foreach ($records as $i => &$r) {
            $date = $r['surat_tanggal'];
            $createDate = new DateTime($date);
            $r['surat_tanggal'] = $createDate->format('D, d M Y H:i:s');
            $r['surat_properti_buat_tgl'] = $createDate->format('d M Y H:i');
            $r['hasNomor'] = (!empty($r['surat_nomor'])) ? true : false;
            $r['hasPerihal'] = (!empty($r['surat_perihal'])) ? true : false;
            $hasNomor   = $r['hasNomor'];
            $hasPerihal = $r['hasPerihal'];
        }
        $setting = $pengaturan_model->getSettingByCode('template_cetak_resi');
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false))),
            'title' => $this->report_resi_title,
            'surat_registrasi' => $surat_registrasi,
            'header' => $report_model->generateHeader($download),
            'records' => $records,
            'hasNomor' => $hasNomor,
            'hasPerihal' => $hasPerihal,
            'dateReport' => date('d-m-Y H:i:s'),
            'operator' => $user['staf_nama'],
            'operator_nip' => $user['staf_kode']
        );

        if ($download) {
            $report_model->generateReportPdf($me->report_resi_template, $report_data, 'report');
        } else {
            $report_model->generateReport($me->report_resi_template, $report_data, true, true);
        }
    }

    function report()
    {
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unitkerja_model    = $this->m_unit;
        $asset_model        = $this->m_asset;
        $surat              = $this->m_surat;
        $surat_view         = $this->m_surat_view;
        $surat_masuk_view   = $this->m_surat_masuk_aktif_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if (empty($param_unitkerja) || is_null($param_unitkerja)) {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama'
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        } else {
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null : array('unit_id' => $param_unitkerja)),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_re] = NULL;
            $records = $surat_masuk_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode'];
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas'];
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi'];

                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'] . ' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if (!$r['surat_agenda_sub'] == NULL) {
                    $r['surat_agenda_converted'] = $r['surat_agenda'] . '.' . $r['surat_agenda_sub'];
                } else {
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unitkerja_recs[$d_i] = $v;
            } else {
                unset($unitkerja_recs[$d_i]);
            }
        }

        if (!$unitkerja_recs) {
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_perihal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_lokasi', 'surat_lampiran'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this::$report_subtitle_aktif,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unitkerja' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_template, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_semua()
    {
        $report_model    = $this->m_report;
        $account_model   = $this->m_account;
        $unitkerja_model = $this->m_unit;
        $asset_model     = $this->m_asset;
        $surat           = $this->m_surat;
        $surat_view      = $this->m_surat_view;
        $surat_masuk_view = $this->m_surat_masuk_aktif_view;
        $pengaturan      = $this->m_pengaturan;

        $buatSuratMasuk = $pengaturan->getSettingByCode('use_unit_buat_surat_masuk');

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if ($buatSuratMasuk) {
            $unitkerja_recs = $unitkerja_model->find(
                array('IFNULL(unit_isbuatsurat, 0) = 1' => null),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        } else {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_re] = NULL;
            $records = $surat_masuk_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode'];
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas'];
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi'];

                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'] . ' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if (!$r['surat_agenda_sub'] == NULL) {
                    $r['surat_agenda_converted'] = $r['surat_agenda'] . '.' . $r['surat_agenda_sub'];
                } else {
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unitkerja_recs[$d_i] = $v;
            } else {
                unset($unitkerja_recs[$d_i]);
            }
        }

        if (!$unitkerja_recs) {
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_perihal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_lokasi', 'surat_lampiran'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this::$report_subtitle,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unitkerja' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_template, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_kewenangan()
    {
        $report_model    = $this->m_report;
        $account_model   = $this->m_account;
        $unitkerja_model = $this->m_unit;
        $asset_model     = $this->m_asset;
        $surat           = $this->m_surat;
        $surat_view      = $this->m_surat_view;
        $surat_masuk_view      = $this->m_surat_masuk_aktif_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if (empty($param_unitkerja) || is_null($param_unitkerja)) {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama'
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        } else {
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null : array('unit_id' => $param_unitkerja)),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_re] = NULL;
            $records = $surat_masuk_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode'];
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas'];
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi'];

                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'] . ' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if (!$r['surat_agenda_sub'] == NULL) {
                    $r['surat_agenda_converted'] = $r['surat_agenda'] . '.' . $r['surat_agenda_sub'];
                } else {
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unitkerja_recs[$d_i] = $v;
            } else {
                unset($unitkerja_recs[$d_i]);
            }
        }

        if (!$unitkerja_recs) {
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_perihal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_lokasi', 'surat_lampiran'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this::$report_subtitle,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unitkerja' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_template, null, true);
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
        $report_model       = $this->m_report;
        $account_model      = $this->m_account;
        $unitkerja_model    = $this->m_unit;
        $asset_model        = $this->m_asset;
        $surat              = $this->m_surat;
        $surat_view         = $this->m_surat_view;
        $surat_masuk_view   = $this->m_surat_masuk_nonaktif_view;
        $pengaturan         = $this->m_pengaturan;

        $buatSuratMasuk = $pengaturan->getSettingByCode('use_unit_buat_surat_masuk');

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', '') ? base64_decode(varGet('title')) : '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if ($buatSuratMasuk) {
            $unitkerja_recs = $unitkerja_model->find(
                array('IFNULL(unit_isbuatsurat, 0) = 1' => null),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        } else if (empty($param_unitkerja) || is_null($param_unitkerja)) {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama'
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        } else {
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null : array('unit_id' => $param_unitkerja)),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_re] = NULL;
            $records = $surat_masuk_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode'];
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas'];
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi'];

                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'] . ' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if (!$r['surat_agenda_sub'] == NULL) {
                    $r['surat_agenda_converted'] = $r['surat_agenda'] . '.' . $r['surat_agenda_sub'];
                } else {
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unitkerja_recs[$d_i] = $v;
            } else {
                unset($unitkerja_recs[$d_i]);
            }
        }

        if (!$unitkerja_recs) {
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_tanggal', 'surat_perihal', 'surat_kelas_kode', 'surat_kelas_nama', 'surat_jenis', 'surat_unit', 'surat_lokasi', 'surat_lampiran'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this::$report_subtitle_retensi,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this::$report_template_retensi, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_init()
    {
        $report_model    = $this->m_report;
        $account_model   = $this->m_account;
        $unitkerja_model = $this->m_unit;
        $asset_model     = $this->m_asset;
        $surat           = $this->m_surat;
        $surat_view      = $this->m_surat_view;
        $surat_masuk_view      = $this->m_surat_masuk_blm_distribusi_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if (empty($param_unitkerja) || is_null($param_unitkerja)) {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama'
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        } else {
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null : array('unit_id' => $param_unitkerja)),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_re] = NULL;
            $records = $surat_masuk_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];

                $date = $r['surat_tanggal'];
                $createDate = new DateTime($date);
                $r['surat_tanggal'] = $createDate->format('d M Y');

                $date2 = $r[$surat::$field_create_date];
                $createDate2 = new DateTime($date2);
                $r[$surat::$field_create_date] = $createDate2->format('d M Y H:i');
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $r['surat_tanggal'] : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode'];
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas'];
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi'];

                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'] . ' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if (!$r['surat_agenda_sub'] == NULL) {
                    $r['surat_agenda_converted'] = $r['surat_agenda'] . '.' . $r['surat_agenda_sub'];
                } else {
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unitkerja_recs[$d_i] = $v;
            } else {
                unset($unitkerja_recs[$d_i]);
            }
        }

        if (!$unitkerja_recs) {
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_properti_buat_tgl', 'surat_tanggal', 'surat_perihal', 'surat_kelas_nama', 'surat_kelas_kode', 'tahun', 'surat_lampiran', 'lokasi'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this::$report_subtitle_init,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unitkerja' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue);
        $file = $this->load->view($this::$report_template, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_init_semua()
    {
        $report_model    = $this->m_report;
        $account_model   = $this->m_account;
        $unitkerja_model = $this->m_unit;
        $asset_model     = $this->m_asset;
        $surat           = $this->m_surat;
        $surat_view      = $this->m_surat_view;
        $pengaturan      = $this->m_pengaturan;
        $surat_masuk_view      = $this->m_surat_masuk_blm_distribusi_view;

        $buatSuratMasuk = $pengaturan->getSettingByCode('use_unit_buat_surat_masuk');

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if ($buatSuratMasuk) {
            $unitkerja_recs = $unitkerja_model->find(
                array('IFNULL(unit_isbuatsurat, 0) = 1' => null),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        } else {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_re] = NULL;
            $records = $surat_masuk_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];

                $date = $r['surat_tanggal'];
                $createDate = new DateTime($date);
                $r['surat_tanggal'] = $createDate->format('d M Y');

                $date2 = $r[$surat::$field_create_date];
                $createDate2 = new DateTime($date2);
                $r[$surat::$field_create_date] = $createDate2->format('d M Y H:i');
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $r['surat_tanggal'] : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode'];
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas'];
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi'];

                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'] . ' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if (!$r['surat_agenda_sub'] == NULL) {
                    $r['surat_agenda_converted'] = $r['surat_agenda'] . '.' . $r['surat_agenda_sub'];
                } else {
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unitkerja_recs[$d_i] = $v;
            } else {
                unset($unitkerja_recs[$d_i]);
            }
        }

        if (!$unitkerja_recs) {
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_properti_buat_tgl', 'surat_tanggal', 'surat_perihal', 'surat_kelas_nama', 'surat_kelas_kode', 'tahun', 'surat_lampiran', 'lokasi'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this::$report_subtitle_init,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unitkerja' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue);
        $file = $this->load->view($this::$report_template, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_init_kewenangan()
    {
        $report_model    = $this->m_report;
        $account_model   = $this->m_account;
        $unitkerja_model = $this->m_unit;
        $asset_model     = $this->m_asset;
        $surat           = $this->m_surat;
        $surat_view      = $this->m_surat_view;
        $surat_masuk_view      = $this->m_surat_masuk_blm_distribusi_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if (empty($param_unitkerja) || is_null($param_unitkerja)) {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama'
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        } else {
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null : array('unit_id' => $param_unitkerja)),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {
            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);
            $time_field[$surat::$field_id . '<>' . $surat::$field_re] = NULL;
            $records = $surat_masuk_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;
                $r['bg_color'] = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['surat_nomor'] = $r['surat_nomor'] ? $r['surat_nomor'] : $this::$default_value['nosurat'];
                $r['surat_tanggal'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'd M Y') : $this::$default_value['surattgl'];
                $r['surat_perihal'] = $r['surat_perihal'] ? 'tentang ' . $r['surat_perihal'] : $this::$default_value['perihal'];
                $r['tahun'] = $r['surat_tanggal'] ? $report_model->date_format($r['surat_tanggal'], 'Y') : $this::$default_value['surattgl'];
                $r['surat_kelas_kode'] = $r['surat_kelas'] ? $r['kelas_kode'] : $this::$default_value['kelas_kode'];
                $r['surat_kelas_nama'] = $r['surat_kelas'] ? $r['kelas_nama'] : $this::$default_value['kelas'];
                $r['surat_jenis'] = $r['surat_jenis'] ? $r['jenis_nama'] : $this::$default_value['jenis'];
                $r['surat_unit'] = $r['surat_unit'] ? $r['unit_nama'] : $this::$default_value['unit'];
                $r['surat_lokasi'] = $r['surat_lokasi'] ? $r['lokasi_kode'] : $this::$default_value['lokasi'];

                if (!$r['surat_lampiran'] == NULL) {
                    $r['surat_lampiran'] = $r['surat_lampiran'] . ' Berkas';
                } else {
                    $r['surat_lampiran'] = $this::$default_value['lampiran'];
                }

                if (!$r['surat_agenda_sub'] == NULL) {
                    $r['surat_agenda_converted'] = $r['surat_agenda'] . '.' . $r['surat_agenda_sub'];
                } else {
                    $r['surat_agenda_converted'] = $r['surat_agenda'];
                }
                $r['surat_agenda_converted'] = $r['surat_agenda_converted'] ? $r['surat_agenda_converted'] : $this::$default_value['agenda'];
            }
            if (!empty($records)) {
                $v['records'] = $records;
                $v['count'] = count($records);
                $unitkerja_recs[$d_i] = $v;
            } else {
                unset($unitkerja_recs[$d_i]);
            }
        }

        if (!$unitkerja_recs) {
            $unitkerja_recs = array();
            $unit_nama = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['title'];
            $unit  = array('unit_nama' => $unit_nama, 'records' => array());
            $surat = array_fill_keys(array('surat_agenda_converted', 'surat_nomor', 'surat_properti_buat_tgl', 'surat_tanggal', 'surat_perihal', 'surat_kelas_nama', 'surat_kelas_kode', 'tahun', 'surat_lampiran', 'lokasi'), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unitkerja_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this::$report_subtitle_init,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unitkerja' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue);
        $file = $this->load->view($this::$report_template, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_rekap()
    {
        $report_model   = $this->model('sipas/report', true);
        $account_model  = $this->model('sipas/account', true);
        $unitkerja_model = $this->model('sipas/unit', true);
        $asset_model    = $this->model('sipas/asset', true);

        $surat              = $this->m_surat_view;
        $surat_emasuk_rekap = $this->m_surat_emasuk_rekap_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        $model          = '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        $_filter = $report_model->generateSelectField($filter, $filterValue);
        if ($param_unitkerja) array_unshift($_filter, array('type' => 'exact', 'field' => 'unit_id', 'value' => $param_unitkerja));

        array_unshift($_filter, array('type' => 'exact', 'field' => 'surat_model', 'value' => $surat::MODEL_MASUK));
        $sort = array();
        array_unshift($sort, array('property' => 'unit_nama', 'direction' => 'ASC'));
        $data = $surat_emasuk_rekap->select(
            array(
                'filter'    => json_encode($_filter),
                'sort'      => json_encode($sort),
            )
        );

        $grouped = array();
        if ($data['total'] > 0) {
            $no = 1;
            foreach ($data['data'] as $kdata => $vdata) {
                $kunit = $vdata['unit_kode'];
                $grouped[$kunit]['unit_nama'] = $vdata['unit_nama'] ? $vdata['unit_nama'] : $this::$default_value['unitnama'];
                if (!array_key_exists('no', $grouped[$kunit])) {
                    $grouped[$kunit]['no'] = $no;
                    $grouped[$kunit]['bg_color'] = ($no % 2 == 0) ? $this::$bg_color_item_laporan['odd'] : $this::$bg_color_item_laporan['even'];
                    $no++;
                }
                foreach ($vdata as $key => $val) {
                    if ($key !== 'unit_nama' && $key !== 'unit_kode' && $key !== 'surat_tanggal' && $key !== 'surat_model' && $key !== 'unit_id' && $key !== 'jenis_id' && $key !== 'jenis_nama') {
                        if (!array_key_exists($key, $grouped[$kunit])) {
                            $grouped[$kunit][$key] = $val;
                        } else {
                            $grouped[$kunit][$key] += $val;
                        }
                    }
                }
            }
        } else {
            $unit_nama  = ($param_unitkerja) ? $unitkerja_model->read($param_unitkerja)['unit_nama'] : $this::$default_value['nodata'];
            $data = array_fill_keys(array('terdistribusi_count', 'blm_distribusi_count', 'tercatat_count', 'onprocess_count', 'process_done_count'), 0);
            $data['no'] = 1;
            $data['unit_nama'] = $unit_nama;
            array_unshift($grouped, $data);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title' => $report_title,
            'subtitle' => $this->report_subtitle_rekap,
            'header' => $report_model->generateHeader($download, 7),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $grouped,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
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
}
