<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi', true);

class Sipas_model_Disposisi_abstract_view extends Sipas_model_Disposisi {

    const CABUT = 1;
    const AKTIF = 0;

    static $field_iscabut = 'disposisi_iscabut';
    static $field_isbaca  = 'disposisi_isbaca';
    static $field_sender  = 'disposisi_staf';
    static $field_tanggal = 'disposisi_tgl';

    static $disposisi_iscabut_tpl = 'Dibatalkan';
    static $disposisi_israhasia_tpl = 'Bersifat rahasia';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_abstract');
        $this->set_primary('disposisi_id');
        $this->set_fields(array(        
            array('name' => 'disposisi_id', 'update'=>false),
            array('name' => 'disposisi_staf', 'update'=>false),
            array('name' => 'disposisi_profil', 'update'=>false),
            array('name' => 'disposisi_pelaku', 'update'=>false),
            array('name' => 'disposisi_pelaku_profil', 'update'=>false),
            array('name' => 'disposisi_pulih_staf', 'update'=>false),
            array('name' => 'disposisi_surat', 'update'=>false),
            array('name' => 'disposisi_perintah', 'update'=>false),
            array('name' => 'disposisi_induk', 'update'=>false),
            array('name' => 'disposisi_parent_path', 'update'=>false),
            array('name' => 'disposisi_model', 'update'=>false),
            array('name' => 'disposisi_model_sub', 'update'=>false),
            array('name' => 'disposisi_nomor', 'update'=>false),
            array('name' => 'disposisi_tgl', 'update'=>false),
            array('name' => 'disposisi_pesan', 'update'=>false),
            array('name' => 'disposisi_istunggal', 'update'=>false),
            array('name' => 'disposisi_israhasia', 'update'=>false),
            array('name' => 'disposisi_baca_tgl', 'update'=>false),
            array('name' => 'disposisi_cabut_tgl', 'update'=>false),
            array('name' => 'disposisi_pulih_tgl', 'update'=>false),
            array('name' => 'disposisi_cabut_induk', 'update'=>false),
            array('name' => 'disposisi_properti', 'update'=>false),
            array('name' => 'disposisi_istunggal', 'update' => false),
            array('name' => 'disposisi_israhasia', 'update' => false),
            array('name' => 'disposisi_isbaca', 'update' => false),
            array('name' => 'disposisi_iscabut', 'update' => false),
            array('name' => 'disposisi_ispulih', 'update' => false),
            array('name' => 'disposisi_useprioritas', 'update' => false),
            array('name' => 'disposisi_prioritas_tgl', 'update' => false),
            
            array('name' => 'disposisi_jumlah_penerima', 'update' => false),
            array('name' => 'disposisi_jumlah_penerima_sdhproses', 'update' => false),
            array('name' => 'disposisi_jumlah_penerima_baca', 'update' => false),

            array('name' => 'disposisi_pengirim_id', 'update' => false),
            array('name' => 'disposisi_pengirim_kode', 'update' => false),
            array('name' => 'disposisi_pengirim_nama', 'update' => false),
            array('name' => 'disposisi_pengirim_isaktif', 'update' => false),
            array('name' => 'disposisi_pengirim_unit', 'update' => false),
            array('name' => 'disposisi_pengirim_unit_nama', 'update' => false),
            array('name' => 'disposisi_pengirim_jabatan', 'update' => false),
            array('name' => 'disposisi_pengirim_jabatan_nama', 'update' => false),

            array('name' => 'disposisi_pelaku_id', 'update' => false),
            array('name' => 'disposisi_pelaku_kode', 'update' => false),
            array('name' => 'disposisi_pelaku_nama', 'update' => false),
            array('name' => 'disposisi_pelaku_unit', 'update' => false),
            array('name' => 'disposisi_pelaku_isaktif', 'update' => false),
            array('name' => 'disposisi_pelaku_unit_nama', 'update' => false),
            array('name' => 'disposisi_pelaku_jabatan', 'update' => false),
            array('name' => 'disposisi_pelaku_jabatan_nama', 'update' => false),

            // array('name' => 'disposisi_pemulih_id', 'update' => false),
            // array('name' => 'disposisi_pemulih_kode', 'update' => false),
            // array('name' => 'disposisi_pemulih_nama', 'update' => false),
            // array('name' => 'disposisi_pemulih_unit', 'update' => false),
            // array('name' => 'disposisi_pemulih_isaktif', 'update' => false),
            // array('name' => 'disposisi_pemulih_unit_nama', 'update' => false),
            // array('name' => 'disposisi_pemulih_jabatan', 'update' => false),
            // array('name' => 'disposisi_pemulih_jabatan_nama', 'update' => false),

            array('name' => 'disposisi_sorter', 'update'=>false),

            array('name' => 'surat_id', 'update' => false),
            array('name' => 'surat_arsip', 'update' => false),
            array('name' => 'surat_model', 'update' => false),
            array('name' => 'surat_model_sub', 'update' => false),
            // array('name' => 'surat_itipe', 'update' => false),
            array('name' => 'surat_registrasi', 'update' => false),
            array('name' => 'surat_usebalas', 'update' => false),
            array('name' => 'surat_useberkas', 'update' => false),
            array('name' => 'surat_nomor', 'update' => false),
            array('name' => 'surat_agenda', 'update' => false),
            array('name' => 'surat_agenda_sub', 'update' => false),
            array('name' => 'surat_tanggal', 'update' => false),
            array('name' => 'surat_perihal', 'update' => false),
            array('name' => 'surat_pengirim', 'update' => false),
            array('name' => 'surat_tujuan', 'update' => false),
            array('name' => 'surat_kepada', 'update' => false),
            array('name' => 'surat_lampiran', 'update' => false),
            // array('name' => 'surat_ringkasan', 'update' => false),
            // array('name' => 'surat_catatan', 'update' => false),
            array('name' => 'surat_korespondensi', 'update' => false),
            array('name' => 'surat_korespondensi_surat', 'update' => false),
            // array('name' => 'surat_lokasi', 'update' => false),
            // array('name' => 'surat_kelas', 'update' => false),
            // array('name' => 'surat_jenis', 'update' => false),
            // array('name' => 'surat_sifat', 'update' => false),
            // array('name' => 'surat_media', 'update' => false),
            // array('name' => 'surat_prioritas', 'update' => false),
            array('name' => 'surat_prioritas_tgl', 'update' => false),
            array('name' => 'surat_retensi_tgl', 'update' => false),
            array('name' => 'surat_useretensi', 'update' => false),
            // array('name' => 'surat_properti', 'update' => false),
            // array('name' => 'surat_unit', 'update' => false),
            array('name' => 'surat_setuju', 'update' => false),
            array('name' => 'surat_setuju_tgl', 'update' => false),
            array('name' => 'surat_setuju_isurut', 'update' => false),
            array('name' => 'surat_setuju_staf', 'update' => false),
            array('name' => 'surat_setuju_profil', 'update' => false),
            array('name' => 'surat_setuju_akhir_staf', 'update' => false),
            array('name' => 'surat_petikan_setuju', 'update' => false),
            array('name' => 'surat_petikan_akhir_staf', 'update' => false),
            array('name' => 'surat_petikan_setuju_isurut', 'update' => false),
            array('name' => 'surat_distribusi_iscabut', 'update' => false),
            // array('name' => 'surat_isdistribusi', 'update' => false),
            // array('name' => 'surat_distribusi_tgl', 'update' => false),
            // array('name' => 'surat_distribusi_staf', 'update' => false),
            // array('name' => 'surat_distribusi_profil', 'update' => false),
            // array('name' => 'surat_distribusi_otomatis', 'update' => false),
            // array('name' => 'surat_isselesai', 'update' => false),
            // array('name' => 'surat_selesai_tgl', 'update' => false),
            // array('name' => 'surat_selesai_staf', 'update' => false),
            // array('name' => 'surat_selesai_profil', 'update' => false),
            // array('name' => 'surat_isterima', 'update' => false),
            // array('name' => 'surat_terima_staf', 'update' => false),
            // array('name' => 'surat_terima_profil', 'update' => false),

            array('name' => 'unit_id', 'update' => false),
            array('name' => 'unit_kode', 'update' => false),
            array('name' => 'unit_nama', 'update' => false),

            array('name' => 'unit_source_id', 'update' => false),
            array('name' => 'unit_source_kode', 'update' => false),
            array('name' => 'unit_source_nama', 'update' => false),

            array('name' => 'media_id', 'update' => false),
            array('name' => 'media_nama', 'update' => false),
            array('name' => 'media_kode', 'update' => false),

            array('name' => 'prioritas_id', 'update' => false),
            array('name' => 'prioritas_kode', 'update' => false),
            array('name' => 'prioritas_nama', 'update' => false),
            // array('name' => 'prioritas_retensi', 'update' => false),

            array('name' => 'jenis_id', 'update' => false),
            array('name' => 'jenis_nama', 'update' => false),
            array('name' => 'jenis_kode', 'update' => false),
            
            array('name' => 'sifat_id', 'update' => false),
            array('name' => 'sifat_nama', 'update' => false),
            array('name' => 'sifat_kode', 'update' => false),
            array('name' => 'sifat_color', 'update' => false),
            array('name' => 'sifat_israhasia', 'update' => false),
            
            array('name' => 'kelas_id', 'update' => false),
            array('name' => 'kelas_nama', 'update' => false),
            array('name' => 'kelas_kode', 'update' => false),
           
            array('name' => 'lokasi_id', 'update' => false),
            array('name' => 'lokasi_nama', 'update' => false),
            array('name' => 'lokasi_kode', 'update' => false),

            // array('name' => 'korespondensi_id', 'update' => false),
            // array('name' => 'korespondensi_unitpenerima', 'update' => false),
            // array('name' => 'korespondensi_unitpengirim', 'update' => false),
            // array('name' => 'korespondensi_nomor', 'update' => false),
            // array('name' => 'korespondensi_perihal', 'update' => false),
            // array('name' => 'korespondensi_pengirim', 'update' => false),
            // array('name' => 'korespondensi_penerima', 'update' => false),
            // array('name' => 'korespondensi_isinternal', 'update' => false),
            // array('name' => 'korespondensi_properti', 'update' => false),

            array('name' => 'surat_properti_id', 'update' => false),
            array('name' => 'surat_properti_buat_tgl', 'update' => false),
            array('name' => 'surat_properti_pembuat_id', 'update' => false),
            array('name' => 'surat_properti_pembuat_kode', 'update' => false),
            array('name' => 'surat_properti_pembuat_nama', 'update' => false),
            array('name' => 'surat_properti_pembuat_unit', 'update' => false),
            array('name' => 'surat_properti_pembuat_unit_nama', 'update' => false),
            array('name' => 'surat_properti_pembuat_jabatan', 'update' => false),
            array('name' => 'surat_properti_pembuat_jabatan_nama', 'update' => false),
            array('name' => 'surat_properti_ishapus', 'update' => false),

            array('name' => 'perintah_id', 'update' => false),
            array('name' => 'perintah_kode', 'update' => false),
            array('name' => 'perintah_nama', 'update' => false)
        ));
    }

}