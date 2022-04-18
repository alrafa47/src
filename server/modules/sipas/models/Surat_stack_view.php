<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat_stack', true);

class Sipas_model_Surat_stack_view extends Sipas_model_Surat_stack {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_stack');
        $this->set_primary('surat_stack_id');
        $this->set_fields(array(
            array('name'=>'surat_stack_id',             'display'=>'Id','update'=>false,'unique'=>true,'notnull'=>true),
            array('name'=>'surat_stack_surat',          'display'=>'Surat','notnull'=>true),
            array('name'=>'surat_stack_staf',           'display'=>'Nama','notnull'=>true),
            array('name'=>'surat_stack_profil',         'display'=>'Nama'),
            array('name'=>'surat_stack_jabatan',        'display'=>'Jabatan'),
            array('name'=>'surat_stack_pelaku',         'display'=>'Nama Pelaku'),
            array('name'=>'surat_stack_pelaku_profil',  'display'=>'Nama Pelaku'),
            array('name'=>'surat_stack_pelaku_jabatan', 'display'=>'Jabatan Pelaku'),
            array('name'=>'surat_stack_model',          'display'=>'Model'),
            array('name'=>'surat_stack_level',          'display'=>'Level'),
            array('name'=>'surat_stack_kirim',          'display'=>'Kirim'),
            array('name'=>'surat_stack_komentar',       'display'=>'Komentar'),
            array('name'=>'surat_stack_istembusan',     'display'=>'Is Tembusan'),
            array('name'=>'surat_stack_terima_tgl',     'display'=>'Terima Tanggal'),
            array('name'=>'surat_stack_status',         'display'=>'Status'),
            array('name'=>'surat_stack_status_tgl',     'display'=>'Tanggal Status'),
            array('name'=>'surat_stack_status_ttd',     'display'=>'Tanda Tangan'),
            array('name'=>'surat_stack_baca_tgl',       'display'=>'Tanggal Baca'),
            array('name'=>'surat_stack_isberkas',       'display'=>'Berkas'),
            array('name'=>'surat_stack_berkasterima_tgl','display'=>'Berkas Terima Tgl'),
            array('name'=>'surat_stack_properti',       'display'=>'Properti'),

            array('name'=>'surat_stack_isterima', 'update' => false),
            array('name'=>'surat_stack_isbaca', 'update' => false),
            array('name'=>'surat_stack_isberkasterima', 'update' => false),
            
            array('name' => 'surat_id', 'update' => false),
            array('name' => 'surat_arsip', 'update' => false),
            array('name' => 'surat_model', 'update' => false),
            array('name' => 'surat_model_sub', 'update' => false),
            array('name' => 'surat_registrasi', 'update' => false),
            array('name' => 'surat_nomor', 'update' => false),
            array('name' => 'surat_agenda', 'update' => false),
            array('name' => 'surat_agenda_sub', 'update' => false),
            array('name' => 'surat_tanggal', 'update' => false),
            array('name' => 'surat_perihal', 'update' => false),
            array('name' => 'surat_pengirim', 'update' => false),
            array('name' => 'surat_tujuan', 'update' => false),
            array('name' => 'surat_kepada', 'update' => false),
            array('name' => 'surat_lampiran', 'update' => false),
            array('name' => 'surat_ringkasan', 'update' => false),
            array('name' => 'surat_catatan', 'update' => false),
            array('name' => 'surat_unit', 'update' => false),
            array('name' => 'surat_setuju_isurut', 'update' => false),
            array('name' => 'surat_setuju', 'update' => false),
            array('name' => 'surat_setuju_staf', 'update' => false),
            array('name' => 'surat_setuju_profil', 'update' => false),
            array('name' => 'surat_setuju_tgl', 'update' => false),
            array('name' => 'surat_setuju_akhir_staf', 'update' => false),
            array('name' => 'surat_petikan_setuju', 'update' => false),
            array('name' => 'surat_petikan_akhir_staf', 'update' => false),
            array('name' => 'surat_petikan_setuju_isurut', 'update' => false),
            array('name' => 'surat_distribusi_staf', 'update' => false),
            array('name' => 'surat_distribusi_profil', 'update' => false),
            array('name' => 'surat_distribusi_tgl', 'update' => false),
            array('name' => 'surat_distribusi_otomatis', 'update' => false),
            array('name' => 'surat_selesai_staf', 'update' => false),
            array('name' => 'surat_selesai_profil', 'update' => false),
            array('name' => 'surat_selesai_tgl', 'update' => false),
            array('name' => 'surat_terima_staf', 'update' => false),
            array('name' => 'surat_korespondensi', 'update' => false),
            array('name' => 'surat_korespondensi_surat', 'update' => false),
            array('name' => 'surat_useretensi', 'update' => false),
            array('name' => 'surat_retensi_tgl', 'update' => false),
            array('name' => 'surat_prioritas', 'update' => false),
            array('name' => 'surat_kelas', 'update' => false),
            array('name' => 'surat_lokasi', 'update' => false),
            array('name' => 'surat_jenis', 'update' => false),
            array('name' => 'surat_media', 'update' => false),
            array('name' => 'surat_sifat', 'update' => false),
            array('name' => 'surat_properti', 'update' => false),

            array('name' => 'staf_id', 'update' => false),
            array('name' => 'staf_kode', 'update' => false),
            array('name' => 'staf_nama', 'update' => false),
            array('name' => 'unit_id', 'update' => false),
            array('name' => 'unit_nama', 'update' => false),
            array('name' => 'unit_kode', 'update' => false),
            array('name' => 'unit_rubrik', 'update' => false),
            array('name' => 'jabatan_id', 'update' => false),
            array('name' => 'jabatan_nama', 'update' => false),
            array('name' => 'jabatan_kode', 'update' => false),
            array('name' => 'jabatan_isnomor', 'update' => false),
            array('name' => 'jabatan_ispenerima', 'update' => false),

            // array('name' => 'penyetuju_id', 'update' => false),
            // array('name' => 'penyetuju_kode', 'update' => false),
            // array('name' => 'penyetuju_nama', 'update' => false),
            // array('name' => 'penyetuju_unit_id', 'update' => false),
            // array('name' => 'penyetuju_unit_nama', 'update' => false),
            // array('name' => 'penyetuju_jabatan_id', 'update' => false),
            // array('name' => 'penyetuju_jabatan_nama', 'update' => false),
            // array('name' => 'penyetuju_jabatan_isnomor', 'update' => false),
            // array('name' => 'penyetuju_jabatan_ispenerima', 'update' => false),

            array('name' => 'pelaku_id', 'update' => false),
            array('name' => 'pelaku_nama', 'update' => false),
            array('name' => 'pelaku_unit_id', 'update' => false),
            array('name' => 'pelaku_unit_nama', 'update' => false),
            array('name' => 'pelaku_jabatan_id', 'update' => false),
            array('name' => 'pelaku_jabatan_nama', 'update' => false),
            // array('name' => 'properti_id', 'update' => false),
            // array('name' => 'properti_buat_tgl', 'update' => false),
            // array('name' => 'properti_buat_staf', 'update' => false),
            // array('name' => 'properti_ubah_tgl', 'update' => false),
            // array('name' => 'properti_ubah_staf', 'update' => false),
            // array('name' => 'properti_hapus_tgl', 'update' => false),
            // array('name' => 'properti_hapus_staf', 'update' => false),
            // array('name' => 'properti_pulih_tgl', 'update' => false),
            // array('name' => 'properti_pulih_staf', 'update' => false),
            // array('name' => 'properti_data', 'update' => false),

            array('name' => 'jabatan_penerima_id', 'update' => false),
            array('name' => 'jabatan_penerima_nama', 'update' => false),
            array('name' => 'jabatan_penerima_isnomor', 'update' => false),
            array('name' => 'jabatan_penerima_ispenerima', 'update' => false),
            array('name' => 'jabatan_penerima_unit_id', 'update' => false),
            array('name' => 'jabatan_penerima_unit_nama', 'update' => false),

            array('name' => 'jabatan_pelaku_id', 'update' => false),
            array('name' => 'jabatan_pelaku_nama', 'update' => false)
        ));
    }

    function get_internal_penyetuju($surat_id=null){
        $me = $this;

        $stack = $this->find(array(
            'surat_stack_surat' => $surat_id
        ));
        return $stack;
    }
}