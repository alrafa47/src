<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat', true);

class Sipas_model_Surat_view extends Sipas_model_Surat
{

    static $field_isdistribusi = 'surat_isdistribusi';
    static $field_isselesai = 'surat_isselesai';
    static $field_isterima = 'surat_isterima';

    public function __construct()
    {
        parent::__construct();
        $CI = get_instance();

        $this->m_surat        = $CI->model('sipas/surat',         true);
        $this->m_arsip        = $CI->model('sipas/arsip',         true);
        $this->m_dokumen      = $CI->model('sipas/dokumen',       true);
        $this->m_properti     = $CI->model('sipas/properti',      true);
        $this->m_surat_stack  = $CI->model('sipas/surat_stack',   true);
        $this->m_account      = $CI->model('sipas/account',       true);
        $this->m_disposisi    = $CI->model('sipas/disposisi',     true);
        $this->m_staf_aktual  = $CI->model('sipas/staf_aktual',   true);
        $this->m_staf         = $CI->model('sipas/staf',   true);
        $this->m_jabatan_aktual = $CI->model('sipas/jabatan_aktual',   true);
        $this->m_surat_log    = $CI->model('sipas/surat_log',     true);
        $this->m_pengaturan   = $CI->model('sipas/pengaturan',    true);

        $this->m_disposisi_masuk              = $CI->model('sipas/disposisi_masuk', true);
        $this->m_disposisi_masuk_view         = $CI->model('sipas/disposisi_masuk_netral_view', true);
        $this->m_surat_stack_disposisi_view   = $CI->model('sipas/surat_stack_disposisi_view', true);

        $this->m_surat_penerimask   = $CI->model('sipas/surat_penerimask_view', true);

        $this->set_table_name('v_surat');
        $this->set_primary('surat_id');
        $this->set_fields(array(
            array('name' => 'surat_id',                  'insert' => false, 'update' => false),
            array('name' => 'surat_arsip',               'insert' => false, 'update' => false),
            array('name' => 'surat_model',               'insert' => false, 'update' => false),
            array('name' => 'surat_model_sub',           'insert' => false, 'update' => false),
            array('name' => 'surat_registrasi',          'insert' => false, 'update' => false),
            array('name' => 'surat_nomor',               'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_tgl',           'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_staf',          'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_profil',        'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_otomatis',      'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_booking',       'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_format',        'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_urut',          'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_backdate',      'insert' => false, 'update' => false),
            array('name' => 'surat_isbackdate',          'insert' => false, 'update' => false),
            array('name' => 'surat_isnomor',             'insert' => false, 'update' => false),
            array('name' => 'surat_berlaku_tgl',         'insert' => false, 'update' => false),
            array('name' => 'surat_agenda',              'insert' => false, 'update' => false),
            array('name' => 'surat_agenda_sub',          'insert' => false, 'update' => false),
            array('name' => 'surat_tanggal',             'insert' => false, 'update' => false),
            array('name' => 'surat_perihal',             'insert' => false, 'update' => false),
            array('name' => 'surat_pengirim',            'insert' => false, 'update' => false),
            array('name' => 'surat_tujuan',              'insert' => false, 'update' => false),
            array('name' => 'surat_kepada',              'insert' => false, 'update' => false),
            array('name' => 'surat_alamat',              'insert' => false, 'update' => false),
            array('name' => 'surat_lampiran',            'insert' => false, 'update' => false),
            array('name' => 'surat_keterangan',          'insert' => false, 'update' => false),
            array('name' => 'surat_lampiran_sub',        'insert' => false, 'update' => false),
            array('name' => 'surat_usesetuju',           'insert' => false, 'update' => false),
            array('name' => 'surat_ringkasan',           'insert' => false, 'update' => false),
            array('name' => 'surat_catatan',             'insert' => false, 'update' => false),
            array('name' => 'surat_unit',                'insert' => false, 'update' => false),
            array('name' => 'surat_unit_source',         'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_isurut',       'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_komentar',     'insert' => false, 'update' => false),
            array('name' => 'surat_setuju',              'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_staf',         'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_profil',       'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_tgl',          'insert' => false, 'update' => false),

            array('name' => 'surat_keluar_type',          'insert' => false, 'update' => false),

            array('name' => 'surat_setuju_total',        'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_setuju',       'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_tolak',        'insert' => false, 'update' => false),
            array('name' => 'surat_setuju_pending',      'insert' => false, 'update' => false),

            array('name' => 'surat_petikan_setuju_total',   'insert' => false, 'update' => false),
            array('name' => 'surat_petikan_setuju_setuju',  'insert' => false, 'update' => false),
            array('name' => 'surat_petikan_setuju_tolak',   'insert' => false, 'update' => false),
            array('name' => 'surat_petikan_setuju_pending', 'insert' => false, 'update' => false),

            array('name' => 'surat_petikan_setuju',      'insert' => false, 'update' => false),
            array('name' => 'surat_petikan_akhir_staf',  'insert' => false, 'update' => false),
            array('name' => 'surat_petikan_setuju_isurut', 'insert' => false, 'update' => false),

            array('name' => 'surat_penerimask_total',    'insert' => false, 'update' => false),

            array('name' => 'surat_imasuk_setuju',       'insert' => false, 'update' => false),
            array('name' => 'surat_imasuk_tolak',        'insert' => false, 'update' => false),
            array('name' => 'surat_imasuk_pending',      'insert' => false, 'update' => false),
            array('name' => 'surat_imasuk_total',        'insert' => false, 'update' => false),

            array('name' => 'surat_induk_id',            'insert' => false, 'update' => false),
            array('name' => 'surat_induk_nomor',         'insert' => false, 'update' => false),
            array('name' => 'surat_induk_setuju_tgl',    'insert' => false, 'update' => false),
            array('name' => 'surat_induk_unit',          'insert' => false, 'update' => false),
            array('name' => 'surat_induk_unit_nama',     'insert' => false, 'update' => false),

            array('name' => 'unit_source_id',            'insert' => false, 'update' => false),
            array('name' => 'unit_source_kode',          'insert' => false, 'update' => false),
            array('name' => 'unit_source_nama',          'insert' => false, 'update' => false),

            array('name' => 'surat_setuju_rentang',      'insert' => false, 'update' => false),

            array('name' => 'surat_jumlah_dokumen',             'insert' => false, 'update' => false),
            array('name' => 'surat_jumlah_dokumen_reupload',    'insert' => false, 'update' => false),

            array('name' => 'surat_distribusi_staf',     'insert' => false, 'update' => false),
            array('name' => 'surat_distribusi_profil',   'insert' => false, 'update' => false),
            array('name' => 'surat_distribusi_tgl',      'insert' => false, 'update' => false),
            array('name' => 'surat_distribusi_otomatis', 'insert' => false, 'update' => false),
            array('name' => 'surat_selesai_staf',        'insert' => false, 'update' => false),
            array('name' => 'surat_selesai_profil',      'insert' => false, 'update' => false),
            array('name' => 'surat_selesai_tgl',         'insert' => false, 'update' => false),
            array('name' => 'surat_terima_staf',         'insert' => false, 'update' => false),
            array('name' => 'surat_arah_staf',           'insert' => false, 'update' => false),
            array('name' => 'surat_arah_profil',         'insert' => false, 'update' => false),
            array('name' => 'surat_arah_tgl',            'insert' => false, 'update' => false),
            array('name' => 'surat_korespondensi',       'insert' => false, 'update' => false),
            array('name' => 'surat_korespondensi_surat', 'insert' => false, 'update' => false),
            array('name' => 'surat_useretensi',          'insert' => false, 'update' => false),
            array('name' => 'surat_retensi_tgl',         'insert' => false, 'update' => false),
            array('name' => 'surat_prioritas',           'insert' => false, 'update' => false),
            array('name' => 'surat_prioritas_tgl',       'insert' => false, 'update' => false),
            array('name' => 'surat_tmt',                 'insert' => false, 'update' => false),
            array('name' => 'surat_kelas',               'insert' => false, 'update' => false),
            array('name' => 'surat_lokasi',              'insert' => false, 'update' => false),
            array('name' => 'surat_lokasi_sub',          'insert' => false, 'update' => false),
            array('name' => 'surat_jenis',               'insert' => false, 'update' => false),
            array('name' => 'surat_jenis_sub',           'insert' => false, 'update' => false),
            array('name' => 'surat_media',               'insert' => false, 'update' => false),
            array('name' => 'surat_sifat',               'insert' => false, 'update' => false),
            array('name' => 'surat_usebalas',            'insert' => false, 'update' => false),
            array('name' => 'surat_useberkas',           'insert' => false, 'update' => false),
            array('name' => 'surat_israhasia',           'insert' => false, 'update' => false),
            array('name' => 'surat_properti',            'insert' => false, 'update' => false),
            array('name' => 'surat_ekspedisi',           'insert' => false, 'update' => false),
            array('name' => 'surat_ekspedisi_tgl',       'insert' => false, 'update' => false),
            array('name' => 'surat_ekspedisi_staf',      'insert' => false, 'update' => false),

            array('name' => 'surat_sorter',              'insert' => false, 'update' => false),

            array('name' => 'surat_isdistribusi',        'insert' => false, 'update' => false),
            array('name' => 'surat_isselesai',           'insert' => false, 'update' => false),
            array('name' => 'surat_isterima',            'insert' => false, 'update' => false),
            array('name' => 'surat_isarah',              'insert' => false, 'update' => false),

            array('name' => 'surat_setuju_akhir_staf',   'insert' => false, 'update' => false),

            array('name' => 'distributor_id',            'insert' => false, 'update' => false),
            array('name' => 'distributor_kode',          'insert' => false, 'update' => false),
            array('name' => 'distributor_nama',          'insert' => false, 'update' => false),
            array('name' => 'distributor_unit',          'insert' => false, 'update' => false),
            array('name' => 'distributor_unit_kode',     'insert' => false, 'update' => false),
            array('name' => 'distributor_unit_rubrik',   'insert' => false, 'update' => false),
            array('name' => 'distributor_unit_nama',     'insert' => false, 'update' => false),
            array('name' => 'distributor_jabatan',       'insert' => false, 'update' => false),
            array('name' => 'distributor_jabatan_kode',  'insert' => false, 'update' => false),
            array('name' => 'distributor_jabatan_nama',  'insert' => false, 'update' => false),

            array('name' => 'penyelesai_id',             'insert' => false, 'update' => false),
            array('name' => 'penyelesai_kode',           'insert' => false, 'update' => false),
            array('name' => 'penyelesai_nama',           'insert' => false, 'update' => false),
            array('name' => 'penyelesai_unit',           'insert' => false, 'update' => false),
            array('name' => 'penyelesai_unit_kode',      'insert' => false, 'update' => false),
            array('name' => 'penyelesai_unit_rubrik',    'insert' => false, 'update' => false),
            array('name' => 'penyelesai_unit_nama',      'insert' => false, 'update' => false),
            array('name' => 'penyelesai_jabatan',        'insert' => false, 'update' => false),
            array('name' => 'penyelesai_jabatan_kode',   'insert' => false, 'update' => false),
            array('name' => 'penyelesai_jabatan_nama',   'insert' => false, 'update' => false),

            array('name' => 'penyetuju_id',              'insert' => false, 'update' => false),
            array('name' => 'penyetuju_kode',            'insert' => false, 'update' => false),
            array('name' => 'penyetuju_nama',            'insert' => false, 'update' => false),
            array('name' => 'penyetuju_unit',            'insert' => false, 'update' => false),
            array('name' => 'penyetuju_unit_kode',       'insert' => false, 'update' => false),
            array('name' => 'penyetuju_unit_rubrik',     'insert' => false, 'update' => false),
            array('name' => 'penyetuju_unit_nama',       'insert' => false, 'update' => false),
            array('name' => 'penyetuju_jabatan',         'insert' => false, 'update' => false),
            array('name' => 'penyetuju_jabatan_kode',    'insert' => false, 'update' => false),
            array('name' => 'penyetuju_jabatan_nama',    'insert' => false, 'update' => false),

            array('name' => 'unit_id',                   'insert' => false, 'update' => false),
            array('name' => 'unit_kode',                 'insert' => false, 'update' => false),
            array('name' => 'unit_nama',                 'insert' => false, 'update' => false),

            array('name' => 'ekspedisi_id',              'insert' => false, 'update' => false),
            array('name' => 'ekspedisi_nama',            'insert' => false, 'update' => false),
            array('name' => 'ekspedisi_kode',            'insert' => false, 'update' => false),

            array('name' => 'media_id',                  'insert' => false, 'update' => false),
            array('name' => 'media_nama',                'insert' => false, 'update' => false),
            array('name' => 'media_kode',                'insert' => false, 'update' => false),

            array('name' => 'prioritas_id',              'insert' => false, 'update' => false),
            array('name' => 'prioritas_kode',            'insert' => false, 'update' => false),
            array('name' => 'prioritas_nama',            'insert' => false, 'update' => false),
            array('name' => 'prioritas_retensi',         'insert' => false, 'update' => false),

            array('name' => 'jenis_id',                  'insert' => false, 'update' => false),
            array('name' => 'jenis_nama',                'insert' => false, 'update' => false),
            array('name' => 'jenis_kode',                'insert' => false, 'update' => false),
            array('name' => 'jenis_nomor_awal',          'insert' => false, 'update' => false),
            array('name' => 'jenis_retensi',             'insert' => false, 'update' => false),
            array('name' => 'jenis_batasibackdate',      'insert' => false, 'update' => false),
            array('name' => 'jenis_batasipenerima',      'insert' => false, 'update' => false),
            array('name' => 'jenis_ttd',                 'insert' => false, 'update' => false),
            array('name' => 'jenis_isbatas',             'insert' => false, 'update' => false),
            array('name' => 'jenis_batas_jumlah',        'insert' => false, 'update' => false),
            array('name' => 'jenis_terpusat',            'insert' => false, 'update' => false),

            array('name' => 'sifat_id',                  'insert' => false, 'update' => false),
            array('name' => 'sifat_nama',                'insert' => false, 'update' => false),
            array('name' => 'sifat_kode',                'insert' => false, 'update' => false),
            array('name' => 'sifat_color',               'insert' => false, 'update' => false),
            array('name' => 'sifat_israhasia',           'insert' => false, 'update' => false),

            array('name' => 'kelas_id',                  'insert' => false, 'update' => false),
            array('name' => 'kelas_nama',                'insert' => false, 'update' => false),
            array('name' => 'kelas_kode',                'insert' => false, 'update' => false),
            array('name' => 'kelas_retensi',             'insert' => false, 'update' => false),
            array('name' => 'kelas_limitdays',           'insert' => false, 'update' => false),

            array('name' => 'lokasi_id',                 'insert' => false, 'update' => false),
            array('name' => 'lokasi_nama',               'insert' => false, 'update' => false),
            array('name' => 'lokasi_kode',               'insert' => false, 'update' => false),

            array('name' => 'korespondensi_id',          'insert' => false, 'update' => false),
            array('name' => 'korespondensi_nomor',       'insert' => false, 'update' => false),
            array('name' => 'korespondensi_perihal',     'insert' => false, 'update' => false),
            array('name' => 'korespondensi_unitpengirim', 'insert' => false, 'update' => false),
            array('name' => 'korespondensi_unitpenerima', 'insert' => false, 'update' => false),
            array('name' => 'korespondensi_pengirim',    'insert' => false, 'update' => false),
            array('name' => 'korespondensi_penerima',    'insert' => false, 'update' => false),
            array('name' => 'korespondensi_isinternal',  'insert' => false, 'update' => false),
            array('name' => 'korespondensi_properti',    'insert' => false, 'update' => false),

            array('name' => 'pembuat_tgl',                'insert' => false, 'update' => false),
            array('name' => 'pembuat_id',                 'insert' => false, 'update' => false),
            array('name' => 'pembuat_kode',               'insert' => false, 'update' => false),
            array('name' => 'pembuat_nama',               'insert' => false, 'update' => false),
            array('name' => 'pembuat_unit',               'insert' => false, 'update' => false),
            array('name' => 'pembuat_unit_kode',          'insert' => false, 'update' => false),
            array('name' => 'pembuat_unit_rubrik',        'insert' => false, 'update' => false),
            array('name' => 'pembuat_unit_nama',          'insert' => false, 'update' => false),
            array('name' => 'pembuat_jabatan',            'insert' => false, 'update' => false),
            array('name' => 'pembuat_jabatan_nama',       'insert' => false, 'update' => false),

            array('name' => 'surat_properti_id',                    'insert' => false, 'update' => false),
            array('name' => 'surat_properti_buat_tgl',              'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_id',            'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_kode',          'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_nama',          'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_unit',          'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_unit_kode',     'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_unit_rubrik',   'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_unit_nama',     'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_jabatan',       'insert' => false, 'update' => false),
            array('name' => 'surat_properti_pembuat_jabatan_nama',  'insert' => false, 'update' => false),

            array('name' => 'surat_properti_ishapus',     'insert' => false, 'update' => false),

            array('name' => 'surat_nomor_isbatal',        'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_batal_tgl',      'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_batal_staf',     'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_batal_profil',   'insert' => false, 'update' => false),
            array('name' => 'surat_nomor_issalin',        'insert' => false, 'update' => false),

            array('name' => 'pembatal_id',                'insert' => false, 'update' => false),
            array('name' => 'pembatal_nama',              'insert' => false, 'update' => false),
            array('name' => 'pembatal_unit',              'insert' => false, 'update' => false),
            array('name' => 'pembatal_unit_nama',         'insert' => false, 'update' => false),
            array('name' => 'pembatal_jabatan',           'insert' => false, 'update' => false),
            array('name' => 'pembatal_jabatan_nama',      'insert' => false, 'update' => false),

            array('name' => 'surat_ismusnah',             'insert' => false, 'update' => false),
            array('name' => 'surat_musnah_tgl',           'insert' => false, 'update' => false),
            array('name' => 'surat_musnah_staf',          'insert' => false, 'update' => false),
            array('name' => 'surat_musnah_profil',        'insert' => false, 'update' => false),

            // array('name'=>'pemusnah_id',                'insert'=>false, 'update'=>false),
            // array('name'=>'pemusnah_nama',              'insert'=>false, 'update'=>false),
            // array('name'=>'pemusnah_unit',              'insert'=>false, 'update'=>false),
            // array('name'=>'pemusnah_unit_nama',         'insert'=>false, 'update'=>false),
            // array('name'=>'pemusnah_jabatan',           'insert'=>false, 'update'=>false),
            // array('name'=>'pemusnah_jabatan_nama',      'insert'=>false, 'update'=>false),

            array('name' => 'surat_distribusi_iscabut',                'insert' => false, 'update' => false),
            array('name' => 'surat_distribusi_cabut_tgl',              'insert' => false, 'update' => false),
            array('name' => 'surat_distribusi_cabut_staf',             'insert' => false, 'update' => false),
            array('name' => 'surat_distribusi_cabut_profil',           'insert' => false, 'update' => false),
            array('name' => 'surat_distribusi_cabut_pesan',            'insert' => false, 'update' => false),

            array('name' => 'distributor_cabut_id',                    'insert' => false, 'update' => false),
            array('name' => 'distributor_cabut_nama',                  'insert' => false, 'update' => false),
            array('name' => 'distributor_cabut_unit',                  'insert' => false, 'update' => false),
            array('name' => 'distributor_cabut_unit_nama',             'insert' => false, 'update' => false),
            array('name' => 'distributor_cabut_jabatan',               'insert' => false, 'update' => false),
            array('name' => 'distributor_cabut_jabatan_nama',          'insert' => false, 'update' => false),
            array('name' => 'disposisi_jumlah_berkas_request',         'insert' => false, 'update' => false)
        ));
    }

    function generate_code($index = false)
    {
        $CI = get_instance();
        $this->load->library('parser');

        $setting = $CI->model('sipas/pengaturan', true);
        $surat_nomor = $CI->model('sipas/surat_libnomor', true);
        $pattern = $setting->getSettingByCode('template_nomor_surat_registrasi');
        // $checkYear = $setting->getSettingByCode('template_index_surat_registrasi_pertahun');
        $kustom = $setting->getSettingByCode('template_index_surat_registrasi_kustom');
        $digitNomor = $setting->getSettingByCode('template_digit_nomor_registrasi');
        $this_year  = date('Y');

        $config = array(
            'surat_libnomor_model' => 0,
            'surat_libnomor_tahun' => $this_year,
            'surat_libnomor_unit_pembuat' => null,
            'surat_libnomor_jenis' => null
        );

        $urut = $surat_nomor->generate_code($config, $digitNomor);
        $pat = array_merge(
            array(
                '#'         => $urut['urut']
            ),
            $setting->getCompiledDataTemplate()
        );

        $next = $this->parser->parse_string($pattern, $pat);

        return $next;
    }

    function generate_nomor($id = null, $model = null, $penyetuju_akhir = null, $updated = true, $tgl = null, $index = false)
    {
        $CI = get_instance();
        $this->load->library('parser');

        $setting        = $CI->model('sipas/pengaturan', true);
        $modelSurat     = $CI->model('sipas/surat_view', true);
        $modelJenis     = $CI->model('sipas/jenis',      true);
        $surat_nomor    = $CI->model('sipas/surat_libnomor', true);

        switch ('template_nomor_surat_' . $model) {
            case 'template_nomor_surat_ikeluar':
            case 'template_nomor_surat_imasuk':
            case 'template_nomor_surat_keputusan':
                $pattern = $setting->getSettingByCode('template_nomor_surat_internal');
                $checkYear = $setting->getSettingByCode('template_index_surat_internal_pertahun');
                $patternBackdate = $setting->getSettingByCode('template_nomor_surat_internal_backdate');
                break;

            case 'template_nomor_surat_bebas':
                $pattern = $setting->getSettingByCode('template_nomor_arsip_bebas');
                $checkYear = $setting->getSettingByCode('template_index_arsip_bebas_pertahun');
                break;

            default:
                $pattern = $setting->getSettingByCode('template_nomor_surat_' . $model);
                $patternBackdate = $setting->getSettingByCode('template_nomor_surat_' . $model . '_backdate');
                $checkYear = $setting->getSettingByCode('template_index_surat_' . $model . '_pertahun');
                $kustom = $setting->getSettingByCode('template_index_surat_' . $model . '_kustom');
                break;
        }

        $custom_filter = array();

        switch ($model) {
            case 'masuk':
                $custom_filter['surat_model'] = $this::MODEL_MASUK;
                break;
            case 'keluar':
                $custom_filter['surat_model'] = $this::MODEL_KELUAR;
                $digitNomor = $setting->getSettingByCode('template_digit_nomor_surat_keluar');

                $nomorJenisTerpusat = $setting->getSettingByCode('template_nomor_keluar_perjenis_terpusat');
                $nomorJenisUnit = $setting->getSettingByCode('template_nomor_keluar_perjenis_unit');
                $nomorUnit = $setting->getSettingByCode('template_nomor_keluar_perunit');
                $nomorTerpusat = $setting->getSettingByCode('template_nomor_keluar_terpusat');
                break;
            case 'imasuk':
                $custom_filter['surat_model'] = $this::MODEL_IMASUK;
                $digitNomor = $setting->getSettingByCode('template_digit_nomor_surat_internal');
                break;
            case 'ikeluar':
                $custom_filter['surat_model'] = $this::MODEL_IKELUAR;
                $digitNomor = $setting->getSettingByCode('template_digit_nomor_surat_internal');

                $nomorJenisTerpusat = $setting->getSettingByCode('template_nomor_internal_perjenis_terpusat');
                $nomorJenisUnit = $setting->getSettingByCode('template_nomor_internal_perjenis_unit');
                $nomorUnit = $setting->getSettingByCode('template_nomor_internal_perunit');
                $nomorTerpusat = $setting->getSettingByCode('template_nomor_internal_terpusat');
            case 'keputusan':
                $custom_filter['surat_model'] = $this::MODEL_KEPUTUSAN;
                $digitNomor = $setting->getSettingByCode('template_digit_nomor_surat_internal');

                $nomorJenisTerpusat = $setting->getSettingByCode('template_nomor_internal_perjenis_terpusat');
                $nomorJenisUnit = $setting->getSettingByCode('template_nomor_internal_perjenis_unit');
                $nomorUnit = $setting->getSettingByCode('template_nomor_internal_perunit');
                $nomorTerpusat = $setting->getSettingByCode('template_nomor_internal_terpusat');
                break;
        }

        $suratView = $modelSurat->read($id);
        $now = date('Y-m-d H:i:s');

        $jenis = $modelJenis->read($suratView['surat_jenis']);

        /* surat tanggal */
        $tglsurat = $suratView['surat_tanggal'];
        $tglsurat = str_replace("00:00:00", date('H:i:s'), $tglsurat);
        $suratTanggal = new DateTime($tglsurat);
        $suratTgl = $suratTanggal->format('Y-m-d');
        $suratTglYear = $suratTanggal->format('Y');
        $suratTglDatetime = $suratTanggal->format('Y-m-d  H:i:s');

        /* jika menggunakan pengaturan backdate */
        $nomor_backdate = (int)$setting->getSettingByCode('use_nomor_backdate');
        $isBackdate = (int)$suratView['surat_isbackdate'];

        /* jika menggunakan pengaturan jenis terpusat perjenis*/
        $jenisTerpusat = (int)$jenis['jenis_terpusat'];


        $type = (int)$suratView['surat_model'];
        $this_year = date('Y');

        if ($isBackdate === 1) {
            $tglsurat = $suratView[Config()->item('urutan_penomoran')];
        } else {
            $tglsurat = $tgl;
        }

        $config = array(
            'surat_libnomor_model' => null,
            'surat_libnomor_tahun' => $suratTglYear,
            'surat_libnomor_unit_pembuat' => null,
            'surat_libnomor_jenis' => null
        );

        // mencari surat nomor dengan tanggal lebih dari tgl surat backdate
        $filSuratNow = array(
            'IFNULL(surat_isbooking, 0) = 0' => NULL,
            'IFNULL(surat_ishapus, 0) = 0' => NULL,
            "DATE(surat_tanggal) > '" . $suratTgl . "'" => NULL,
            'YEAR(surat_tanggal)' => $suratTglYear,
            'surat_nomor IS NOT NULL' => NULL
        );

        // mencari surat nomor terakhir di tgl backdate
        $filCariSurat = array(
            'IFNULL(surat_ishapus, 0) = 0' => NULL,
            'DATE(surat_tanggal)' => $suratTgl,
            'surat_nomor IS NOT NULL' => NULL,
            'IFNULL(surat_nomor_issalin,0) = 0' => NULL
        );

        // mencari surat nomor terakhir di sebelum tgl backdate
        $filCariSurat1 = array(
            'IFNULL(surat_ishapus, 0) = 0' => NULL,
            "DATE(surat_tanggal) <='" . $suratTgl . "'" => NULL,
            'YEAR(surat_tanggal)' => $suratTglYear,
            'surat_nomor IS NOT NULL' => NULL,
            'IFNULL(surat_nomor_issalin,0) = 0' => NULL
        );

        // mencari abjad terakhir urutan nomor terakhir
        $filCariBackdate = array(
            'IFNULL(surat_ishapus, 0) = 0' => NULL,
            'YEAR(surat_tanggal)' => $suratTglYear,
            'surat_isbackdate IS NOT NULL' => NULL,
            'IFNULL(surat_nomor_issalin,0) = 0' => NULL
        );

        if ($jenisTerpusat !== 0) { /* jika pengaturan nomor menggunakan pengaturan khusus di jenis */
            $config['surat_libnomor_model'] = $type;
            $config['surat_libnomor_jenis'] = $suratView['surat_jenis'];

            $filSuratNow['surat_model'] = $suratView['surat_model'];
            $filCariSurat['surat_model'] = $suratView['surat_model'];
            $filCariSurat1['surat_model'] = $suratView['surat_model'];
            $filCariBackdate['surat_model'] = $suratView['surat_model'];

            if ($jenisTerpusat === 1) { /* jika pengaturan jenis =  penomoran terpusat perjenis*/
                $filSuratNow['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat1['surat_jenis'] = $suratView['surat_jenis'];
                $filCariBackdate['surat_jenis'] = $suratView['surat_jenis'];
            } else if ($jenisTerpusat === 2) { /* jika pengaturan jenis =  penomoran perunit perjenis*/
                $config['surat_libnomor_unit_pembuat'] = $suratView['surat_unit'];
                $filSuratNow['surat_unit'] = $suratView['surat_unit'];
                $filCariSurat['surat_unit'] = $suratView['surat_unit'];
                $filCariSurat1['surat_unit'] = $suratView['surat_unit'];
                $filCariBackdate['surat_unit'] = $suratView['surat_unit'];

                $filSuratNow['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat1['surat_jenis'] = $suratView['surat_jenis'];
                $filCariBackdate['surat_jenis'] = $suratView['surat_jenis'];
            }
        } else { /* jika pengaturan nomor menggunakan pengaturan sistem*/
            $config['surat_libnomor_model'] = $type;
            $filSuratNow['surat_model'] = $suratView['surat_model'];
            $filCariSurat['surat_model'] = $suratView['surat_model'];
            $filCariSurat1['surat_model'] = $suratView['surat_model'];
            $filCariBackdate['surat_model'] = $suratView['surat_model'];

            if ($nomorJenisTerpusat) { /* jika pengaturan sistem =  terpusat perjenis */
                $config['surat_libnomor_jenis'] = $suratView['surat_jenis'];
                $filSuratNow['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat1['surat_jenis'] = $suratView['surat_jenis'];
                $filCariBackdate['surat_jenis'] = $suratView['surat_jenis'];
            } else if ($nomorJenisUnit) { /* jika pengaturan sistem =  perunit perjenis */
                $config['surat_libnomor_jenis'] = $suratView['surat_jenis'];
                $filSuratNow['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat['surat_jenis'] = $suratView['surat_jenis'];
                $filCariSurat1['surat_jenis'] = $suratView['surat_jenis'];
                $filCariBackdate['surat_jenis'] = $suratView['surat_jenis'];

                $config['surat_libnomor_unit_pembuat'] = $suratView['surat_unit'];
                $filSuratNow['surat_unit'] = $suratView['surat_unit'];
                $filCariSurat['surat_unit'] = $suratView['surat_unit'];
                $filCariSurat1['surat_unit'] = $suratView['surat_unit'];
                $filCariBackdate['surat_unit'] = $suratView['surat_unit'];
            } else if ($nomorUnit) { /* jika pengaturan sistem =  perunit */
                $config['surat_libnomor_unit_pembuat'] = $suratView['surat_unit'];
                $filSuratNow['surat_unit'] = $suratView['surat_unit'];
                $filCariSurat['surat_unit'] = $suratView['surat_unit'];
                $filCariSurat1['surat_unit'] = $suratView['surat_unit'];
                $filCariBackdate['surat_unit'] = $suratView['surat_unit'];
            } else if ($nomorTerpusat) { /* jika pengaturan sistem =  terpusat */
                $filSuratNow['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                $filCariSurat['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                $filCariSurat1['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
                $filCariBackdate['IFNULL(jenis_terpusat, 0) = 0'] = NULL;
            }
        }

        if ($nomor_backdate && $isBackdate === 1) {
            $suratNow = $modelSurat->find($filSuratNow, false, false, true, array('surat_agenda' => 'desc'));

            if (!empty($suratNow)) {
                $cariSurat = $modelSurat->find($filCariSurat, false, false, true, array('surat_nomor_urut' => 'desc', 'surat_nomor_backdate' => 'desc'));

                if (!empty($cariSurat)) {
                    $filCariBackdate['surat_nomor_urut'] = $cariSurat[0]['surat_nomor_urut'];
                    $suratBackdate = $modelSurat->find($filCariBackdate, false, false, true, array('surat_nomor_backdate' => 'desc'));

                    // usort($suratBackdate, function($a, $b) {
                    //     if($a['surat_nomor_backdate']==$b['surat_nomor_backdate']) return 0;
                    //     return $a['surat_nomor_backdate'] < $b['surat_nomor_backdate']?1:-1;
                    // });

                    // if(Config()->item('backdate_value') == 'angka'){
                    //     if(!empty($suratBackdate)){
                    //         $numBackdate = (int)$suratBackdate[0]['surat_nomor_backdate'];
                    //         $numBackdate = $numBackdate + 1;
                    //         $opsBackdate = $numBackdate;
                    //     }else{
                    //         $val = Config()->item(Config()->item('backdate_value'));
                    //         $opsBackdate = $val[0];
                    //         $numBackdate = 1;
                    //     }
                    // }else{
                    if (!empty($suratBackdate)) {
                        $numBackdate = $suratBackdate[0]['surat_nomor_backdate'];
                        if ($numBackdate == '0' || $numBackdate == null) {
                            $numBackdate = $this->toNum($numBackdate);
                        } else {
                            $numBackdate++;
                        }
                    } else {
                        echo "string";
                        // $val = Config()->item(Config()->item('backdate_value'));
                        // $numBackdate = $val[0];
                        $numBackdate = 'A';
                    }
                    // }
                    // if($suratBackdate[0]['surat_nomor_backdate'] != null){
                    //     $numBackdate = $this->getNext($suratBackdate[0]['surat_nomor_backdate']);
                    // }else{
                    //     $numBackdate = 'A';
                    // }

                    $pat = array_merge(
                        array(
                            '#'         => $cariSurat[0]['surat_nomor_urut'],
                            'backdate'  => $numBackdate
                        ),
                        $setting->getCompiledDataTemplate($id, $penyetuju_akhir, $suratTgl)
                    );

                    $nomor = $this->parser->parse_string($patternBackdate, $pat);
                    $next = array('nomor' => $nomor, 'digit' => $cariSurat[0]['surat_nomor_urut'], 'backdate' => $numBackdate, 'config' => null);
                    return $next;
                } else {
                    $cariSurat = $modelSurat->find($filCariSurat1, false, false, true, array('DATE(surat_tanggal)' => 'desc', 'surat_nomor_urut' => 'desc'));
                    if (!empty($cariSurat)) {
                        $filCariBackdate['surat_nomor_urut'] = $cariSurat[0]['surat_nomor_urut'];
                        $suratBackdate = $modelSurat->find($filCariBackdate, false, false, true, array('surat_nomor_backdate' => 'desc'));

                        // usort($suratBackdate, function($a, $b) {
                        //     if($a['surat_nomor_backdate']==$b['surat_nomor_backdate']) return 0;
                        //     return $a['surat_nomor_backdate'] < $b['surat_nomor_backdate']?1:-1;
                        // });

                        // if(Config()->item('backdate_value') == 'angka'){
                        //     if(!empty($suratBackdate)){
                        //         $numBackdate = (int)$suratBackdate[0]['surat_nomor_backdate'];
                        //         $numBackdate = $numBackdate + 1;
                        //         $opsBackdate = $numBackdate;
                        //     }else{
                        //         $val = Config()->item(Config()->item('backdate_value'));
                        //         $opsBackdate = $val[0];
                        //         $numBackdate = 1;
                        //     }
                        // }else{
                        //     // echo "string";

                        if (!empty($suratBackdate)) {
                            $numBackdate = $suratBackdate[0]['surat_nomor_backdate'];
                            if ($numBackdate == '0' || $numBackdate == null) {
                                $numBackdate = $this->toNum($numBackdate);
                            } else {
                                $numBackdate++;
                            }
                        } else {
                            echo "string";
                            // $val = Config()->item(Config()->item('backdate_value'));
                            // $numBackdate = $val[0];
                            $numBackdate = 'A';
                        }
                        // }

                        // if($suratBackdate[0]['surat_nomor_backdate'] != null){
                        //     $numBackdate = $this->getNext($suratBackdate[0]['surat_nomor_backdate']);
                        // }else{
                        //     $numBackdate = 'A';
                        // }

                        $pat = array_merge(
                            array(
                                '#'         => $cariSurat[0]['surat_nomor_urut'],
                                'backdate'  => $numBackdate
                            ),
                            $setting->getCompiledDataTemplate($id, $penyetuju_akhir, $suratTgl)
                        );
                        $nomor = $this->parser->parse_string($patternBackdate, $pat);
                        $next = array('nomor' => $nomor, 'digit' => $cariSurat[0]['surat_nomor_urut'], 'backdate' => $numBackdate, 'config' => null);
                        return $next;
                    } else {
                        $urut = $surat_nomor->generate_code($config, $digitNomor, $updated, 'surat');

                        $pat = array_merge(
                            array(
                                '#'         => $urut['urut']
                            ),
                            $setting->getCompiledDataTemplate($id, $penyetuju_akhir, $suratTgl)
                        );

                        $nomor = $this->parser->parse_string($pattern, $pat);
                        $next = array('nomor' => $nomor, 'digit' => $urut['urut'], 'backdate' => 0, 'config' => $config);
                        return $next;
                    }
                }
            } else {
                $urut = $surat_nomor->generate_code($config, $digitNomor, $updated, 'surat');

                $pat = array_merge(
                    array(
                        '#'         => $urut['urut']
                    ),
                    $setting->getCompiledDataTemplate($id, $penyetuju_akhir, $suratTgl)
                );

                $nomor = $this->parser->parse_string($pattern, $pat);
                $next = array('nomor' => $nomor, 'digit' => $urut['urut'], 'backdate' => 0, 'config' => $config);
                return $next;
            }
        } else {
            $urut = $surat_nomor->generate_code($config, $digitNomor, $updated, 'surat');

            $pat = array_merge(
                array(
                    '#'         => $urut['urut']
                ),
                $setting->getCompiledDataTemplate($id, $penyetuju_akhir, $suratTgl)
            );

            $nomor = $this->parser->parse_string($pattern, $pat);

            $next = array('nomor' => $nomor, 'digit' => $urut['urut'], 'backdate' => 0, 'config' => $config);
            return $next;
        }
    }

    function toNum($data)
    {
        $alphabet = array(
            'a', 'b', 'c', 'd', 'e',
            'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o',
            'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y',
            'z'
        );
        $k = $data - 1;
        $alphabet = (array_key_exists($k, $alphabet)) ? $alphabet[$k] : $alphabet[0];
        $alphabet  = strtoupper($alphabet); //for uppercase font
        return $alphabet;
    }

    function getNext($data)
    {
        $a = array(
            'a', 'b', 'c', 'd', 'e',
            'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o',
            'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y',
            'z'
        );
        $k = array_search(strtolower($data), $a);
        $alphabet = $a[$k + 1];
        $alphabet  = strtoupper($alphabet); //for uppercase font
        return $alphabet;
    }

    function create_imasuk($account_id = null, $data = array(), $use_setting = null)
    {
        $me = $this;
        $worker_mode = Config()->item('worker_mode');
        $queuetubeImasuk = Config()->item('queueServer_tubeImasuk');

        $surat              = $me->m_surat;
        $properti           = $me->m_properti;
        $surat_stack        = $me->m_surat_stack;
        $surat_log          = $me->m_surat_log;
        $model_staf         = $me->m_staf;
        $account            = $me->m_account;
        $surat_stack_view   = $me->m_surat_stack_disposisi_view;
        // $surat_penerimask   = $me->m_surat_penerimask;

        $profile    = $account->get_profile();
        $stafProfil = null;
        if ($profile) {
            $stafProfil = $model_staf->read($profile['staf_id']);
        } else {
            $stafProfil = $model_staf->read($account_id);
        }

        $account_setting = $account->get_setting();

        $now = date('Y-m-d H:i:s');
        $unitpenerima = array();
        $unit = array();
        $temp = '';

        $list = $surat_stack_view->find(array(
            'surat_stack_surat' => $data['surat_id'],
            'IFNULL(surat_stack_kirim, 0) = 0' => NULL,
            'surat_stack_model' => $surat_stack::MODEL_PENERIMA
        ));

        if (!$data['surat_distribusi_staf']) {
            $surat->update(array(
                'surat_id' => $data['surat_id']
            ), array(
                'surat_distribusi_tgl' => $now,
                'surat_distribusi_staf' => $stafProfil['staf_id'],
                'surat_distribusi_profil' => $stafProfil['staf_profil'],
            ), function ($response) use ($surat, $surat_log, $account_id, $profile, $data, $properti, $now, $stafProfil) {
                if ($response[$surat->successProperty] !== true) return;
                $updated_data = $response['data'];
                $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);

                if ($data['surat_model'] != 6) {
                    $dataLog = array(
                        'surat_log_tipe' => 7,
                        'surat_log_surat' => $updated_data['surat_id'],
                        'surat_log_staf' => $account_id,
                        'surat_log_profil' => $stafProfil['staf_profil'],
                        'surat_log_tgl' => $now
                    );
                    $operation_log = $surat_log->insert($dataLog, null, function ($response) {
                    });
                }
            });
        }

        if ($list) {
            foreach ($list as $index => $penerima) {
                $temp = $penerima['unit_id'];
                $tempstaf = $penerima['staf_id'];
                array_push($unitpenerima, $temp);
            }

            foreach ($list as $k => $v) {
                $surat_stack->update($v['surat_stack_id'], array(
                    'surat_stack_kirim' => 1
                ));
            }
            $unit = array_unique($unitpenerima);
        }

        foreach ($unit as $index => $value) {
            $data_imasuk = array(
                'surat_id' => $data['surat_id'],
                'account_id' => $account_id,
                'account_setting' => $account_setting,
                'use_setting' => $use_setting,
                'unit' => $value,
            );

            if ($worker_mode == 'local') {
                $create_dispoma = $this->create_surat_imasuk($data_imasuk);
            } else {
                $addJob = create_job($queuetubeImasuk, $data_imasuk);
            }
        }
    }

    function create_surat_imasuk($data)
    {
        $me = $this;
        $worker_mode = Config()->item('worker_mode');
        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');
        $queuetubeDisposisi = Config()->item('queueServer_tubeDisposisi');

        $surat          = $me->m_surat;
        $arsip          = $me->m_arsip;
        $properti       = $me->m_properti;
        $surat_stack    = $me->m_surat_stack;
        $surat_log      = $me->m_surat_log;
        $disposisi      = $me->m_disposisi;
        $account        = $me->m_account;
        $staf_aktual    = $me->m_staf_aktual;
        $jabatan_aktual = $me->m_jabatan_aktual;
        $pengaturan     = $me->m_pengaturan;
        $model_staf     = $me->m_staf;
        $disposisi_masuk      = $me->m_disposisi_masuk;
        $disposisi_masuk_view = $me->m_disposisi_masuk_view;
        $surat_stack_view     = $me->m_surat_stack_disposisi_view;

        $now = date('Y-m-d H:i:s');
        $akun = $account->get_profile();
        $account_id = $data['account_id'];
        $account_setting = $data['account_setting'];
        $use_setting = $data['use_setting'];
        $value = $data['unit'];

        $surat_data = $me->read($data['surat_id']);
        $stafProfil = $model_staf->read($account_id);

        if ($surat_data['surat_model'] == 6) {
            $filSurat['surat_stack_surat'] = $data['surat_id'];
            $filSurat['surat_stack_model'] = $surat_stack::MODEL_PENERIMA;
            $filSurat['(unit_id = "' . $value . '")'] = NULL;

            $penerima = $surat_stack_view->find($filSurat);
        } else {
            $penerima = $surat_stack_view->find(array(
                'surat_stack_surat' => $data['surat_id'],
                'surat_stack_model' => $surat_stack::MODEL_PENERIMA,
                'unit_id'           => $value
            ));
        }

        $surat_arsip_old = $surat_data['surat_registrasi'];

        if ($surat_data) {
            $surat_data['surat_model']        = $me::MODEL_IMASUK;
            $surat_data['surat_registrasi']   = $me->generate_code();
            $surat_data['surat_buat_staf']    = $account_id;
            $surat_data['surat_buat_profil']  = $stafProfil['staf_profil'];
            $surat_data['surat_buat_tgl']     = $now;
            $surat_data['surat_unit_source']  = $surat_data['surat_unit'];
            $surat_data['surat_unit']         = $value;
            $surat_data['surat_korespondensi']       = $surat_data['surat_korespondensi'];
            $surat_data['surat_korespondensi_surat'] = $surat_data['surat_id'];

            if ($use_setting) {
                $surat_data['surat_setuju']               = 2;
                $surat_data['surat_setuju_staf']          = $account_id;
                $surat_data['surat_setuju_profil']        = $stafProfil['staf_profil'];
                $surat_data['surat_setuju_tgl']           = $now;
                $surat_data['surat_distribusi_staf']      = $account_id;
                $surat_data['surat_distribusi_profil']    = $stafProfil['staf_profil'];
                $surat_data['surat_distribusi_tgl']       = $now;
                $surat_data['surat_selesai_staf']         = $account_id;
                $surat_data['surat_selesai_profil']       = $stafProfil['staf_profil'];
                $surat_data['surat_selesai_tgl']          = $now;
                $surat_data['surat_distribusi_otomatis']  = 1;
            } else {
                unset($surat_data['surat_setuju']);
                unset($surat_data['surat_setuju_staf']);
                unset($surat_data['surat_setuju_profil']);
                unset($surat_data['surat_setuju_tgl']);
                unset($surat_data['surat_distribusi_tgl']);
                unset($surat_data['surat_distribusi_staf']);
                unset($surat_data['surat_distribusi_profil']);
                unset($surat_data['surat_selesai_tgl']);
                unset($surat_data['surat_selesai_staf']);
                unset($surat_data['surat_selesai_profil']);
            }

            unset($surat_data['surat_id']);
            unset($surat_data['surat_setuju_isurut']);
            unset($surat_data['surat_terima_staf']);
            unset($surat_data['surat_terima_profil']);

            $operation = $surat->insert($surat_data, null, function ($response) use ($me, $surat, $surat_stack, $now, $model_staf, $value, $penerima, $properti, $surat_data, $use_setting, $disposisi_masuk, $disposisi, $staf_aktual, $jabatan_aktual, $surat_log, $account_id, $akun, $surat_arsip_old, $queueTube, $queueTubeRedis, $worker_mode, $queuetubeDisposisi, $disposisi_masuk_view, $stafProfil) {

                if ($response[$surat->successProperty] !== true) return;

                $inserted_data = $response['data'];
                $surat_id = $inserted_data['surat_id'];

                $dataLog = array(
                    'surat_log_tipe' => 1,
                    'surat_log_surat' => $inserted_data['surat_id'],
                    'surat_log_staf' => $account_id,
                    'surat_log_profil' => $stafProfil['staf_profil'],
                    'surat_log_tgl' => $now
                );
                $operation_log = $surat_log->insert($dataLog, null, function ($response) {
                });

                if ($inserted_data['surat_setuju'] != 2) {
                    if (Config()->item('queueServer')['host']) {
                        $data_redis = array(
                            'type' => 'SuratImasuk-Unit',
                            'staf_id' => null,
                            'jabatan_id' => null,
                            'unit_id' => $inserted_data['surat_unit'],
                            'data' => $inserted_data['surat_unit']
                        );
                        $addJobUnit = create_job($queueTubeRedis, $data_redis);
                    }

                    pushEvent(array(
                        'to' => $inserted_data['surat_unit'],
                        'data' => array(
                            'api' => 'surat_imasuk',
                            'id' => $inserted_data['surat_id']
                        ),
                        'group' => array('unit'),
                        'type' => 'Surat_imasuk'
                    ));
                }

                $op = $properti->created($account_id, $inserted_data, 'surat', $inserted_data['surat_id'], $inserted_data['surat_registrasi']);
                if ($op) {
                    $surat->update($inserted_data['surat_id'], array(
                        'surat_properti' => $op['properti_id']
                    ));
                }

                if ($use_setting == '1' && $inserted_data['surat_setuju'] == 2) {
                    /* log distribusi */
                    $dataLog1 = array(
                        'surat_log_tipe' => 7,
                        'surat_log_surat' => $inserted_data['surat_id'],
                        'surat_log_staf' => $account_id,
                        'surat_log_profil' => $stafProfil['staf_profil'],
                        'surat_log_tgl' => $now
                    );
                    $operation_log1 = $surat_log->insert($dataLog1, null, function ($response) {
                    });

                    /* log selesai */
                    $dataLog2 = array(
                        'surat_log_tipe' => 8,
                        'surat_log_surat' => $inserted_data['surat_id'],
                        'surat_log_staf' => $account_id,
                        'surat_log_profil' => $stafProfil['staf_profil'],
                        'surat_log_tgl' => $now
                    );
                    $operation_log2 = $surat_log->insert($dataLog2, null, function ($response) {
                    });

                    if (!empty($penerima)) {
                        /*send disposisi masuk*/
                        $disposisi->insert(
                            array(
                                'disposisi_tgl'     => $now,
                                'disposisi_pelaku_profil'  => $stafProfil['staf_profil'],
                                'disposisi_pelaku'  => $account_id,
                                'disposisi_staf'    => $account_id,
                                'disposisi_profil'  => $stafProfil['staf_profil'],
                                'disposisi_model'   => $disposisi::MODEL_DISPOSISI,
                                'disposisi_surat'   => $inserted_data['surat_id']
                            ),
                            null,
                            function ($response) use (
                                $penerima,
                                $now,
                                $account_id,
                                $akun,
                                $disposisi,
                                $disposisi_masuk,
                                $model_staf,
                                $properti,
                                $surat_stack,
                                $me,
                                $staf_aktual,
                                $jabatan_aktual,
                                $surat_data,
                                $surat,
                                $inserted_data,
                                $queueTube,
                                $queueTubeRedis,
                                $worker_mode,
                                $queuetubeDisposisi,
                                $disposisi_masuk_view
                            ) {

                                if ($response[$disposisi->successProperty] !== true) return;

                                $disposisi_id = $disposisi->get_insertid();
                                $inserted     = $response['data'];

                                /*insert properti*/
                                $op = $properti->created($account_id, $inserted, 'disposisi', $inserted['disposisi_id'], $inserted['disposisi_nomor']);
                                if ($op) {
                                    $disposisi->update($inserted['disposisi_id'], array(
                                        'disposisi_properti' => $op['properti_id']
                                    ));
                                }

                                if (!is_array($penerima)) $penerima = array();
                                $count_penerima = count($penerima);

                                $query = "INSERT INTO disposisi_jumlah_penerima (disposisi_masuk_disposisi, disposisi_jumlah_penerima) VALUES('" . $disposisi_id . "', " . $count_penerima . ")";
                                $result = $this->db->query($query);

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
                                    $lvl = $index;

                                    $data_diposisi_masuk = array(
                                        'disposisi_id' => $disposisi_id,
                                        'disposisi_masuk_profil' => $p['surat_stack_profil'],
                                        'dispo_masuk_parent' => null,
                                        'penerima_id' => $penerima_id,
                                        'penerima_jabatan' => null,
                                        'pengirim_id' => $account_id,
                                        'berkas' => $inserted_data['surat_useberkas'],
                                        'tembusan' => $p['surat_stack_istembusan'],
                                        'key_redis' => Config()->item('redisPrefix') . 'disposisi_sama:' . $inserted['disposisi_surat'] . '-' . $penerima_id
                                    );

                                    if ($worker_mode == 'local') {
                                        $create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
                                    } else {
                                        $addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
                                    }

                                    /*Re-insert penerima List*/
                                    $penerima_stack = $surat_stack->insert(array(
                                        'surat_stack_staf'    => $penerima_id,
                                        'surat_stack_profil'  => $p['surat_stack_profil'],
                                        'surat_stack_surat'   => $inserted_data['surat_id'],
                                        'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                        'surat_stack_level'   => $lvl,
                                        'surat_stack_status'  => $me::SETUJU_INIT,
                                        'surat_stack_istembusan' => $p['surat_stack_istembusan'],
                                        'surat_stack_isberkas' => $p['surat_stack_isberkas']
                                    ));

                                    /*recent*/
                                    $recent_exist = $staf_aktual->find(array(
                                        'staf_aktual_pengirim' => $account_id,
                                        'staf_aktual_penerima' => $penerima_id
                                    ));

                                    if ($recent_exist) {
                                        $staf_aktual->update(array(
                                            'staf_aktual_pengirim' => $account_id,
                                            'staf_aktual_penerima' => $penerima_id
                                        ), array(
                                            'staf_aktual_pengirim' => $account_id,
                                            'staf_aktual_penerima' => $penerima_id,
                                            'staf_aktual_tgl'     => $now,
                                            'staf_aktual_tipe'    => $disposisi::MODEL_DISPOSISI
                                        ), function ($response) use ($properti, $account_id, $staf_aktual) {
                                            $recent_data = $response['data'];
                                            $updated_data = $staf_aktual->read($recent_data['staf_aktual_id']);
                                            $idProp = $updated_data['staf_aktual_properti'];

                                            $properti->updated($idProp, $account_id, $updated_data, 'staf_aktual ' . $updated_data['staf_aktual_tgl']);
                                        });
                                    } else {
                                        $staf_aktual->insert(array(
                                            'staf_aktual_pengirim'    => $account_id,
                                            'staf_aktual_penerima'    => $penerima_id,
                                            'staf_aktual_tgl'         => $now,
                                            'staf_aktual_tipe'        => $disposisi::MODEL_DISPOSISI
                                        ), null, function ($response) use ($surat_data, $properti, $account_id, $staf_aktual) {

                                            $inserted = $response['data'];
                                            $op = $properti->created($account_id, $inserted, 'staf_aktual', $inserted['staf_aktual_id'], 'staf_aktual ' . $inserted['staf_aktual_tgl']);
                                            if ($op) {
                                                $staf_aktual->update($inserted['staf_aktual_id'], array(
                                                    'staf_aktual_properti' => $op['properti_id']
                                                ));
                                            }
                                        });
                                    }
                                }
                            }
                        );
                    }
                } else {
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
                        $lvl = $index;

                        /*pending decision for stack to have properti*/
                        // $op = $properti->created($akun);
                        // $idStackProp = $op['properti_id'];

                        /*Re-insert penerima List*/
                        $penerima_stack = $surat_stack->insert(array(
                            'surat_stack_staf'    => $penerima_id,
                            'surat_stack_profil'  => $p['surat_stack_profil'],
                            'surat_stack_surat'   => $surat_id,
                            'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                            'surat_stack_level'   => $lvl,
                            'surat_stack_status'  => $me::SETUJU_INIT,
                            'surat_stack_istembusan' => $p['surat_stack_istembusan'],
                            'surat_stack_isberkas' => $p['surat_stack_isberkas']
                        ));
                    }
                }
            });
        }
    }
}
