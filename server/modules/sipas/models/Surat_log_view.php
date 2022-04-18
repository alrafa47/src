<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat_log', true);

class Sipas_model_Surat_log_view extends Sipas_model_Surat_log {

      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_log');
        $this->set_primary('surat_log_id');
        $this->set_fields(array(
            array('name' => 'surat_log_id'),
            array('name' => 'surat_log_tipe'),
            array('name' => 'surat_log_staf'),
            array('name' => 'surat_log_profil'),
            array('name' => 'surat_log_surat'),
            array('name' => 'surat_log_arsip'),
            array('name' => 'surat_log_ekspedisi'),
            array('name' => 'surat_log_petugas'),
            array('name' => 'surat_log_tgl'),
            array('name' => 'surat_log_setuju'),
            array('name' => 'surat_log_catatan'),
            array('name' => 'surat_log_data'),
            array('name' => 'surat_log_properti'),
            array('name' => 'surat_id'),
            array('name' => 'surat_arsip'),
            array('name' => 'surat_model'),
            array('name' => 'surat_model_sub'),
            array('name' => 'surat_registrasi'),
            array('name' => 'surat_nomor'),
            array('name' => 'surat_agenda'),
            array('name' => 'surat_agenda_sub'),
            array('name' => 'surat_tanggal'),
            array('name' => 'surat_perihal'),
            array('name' => 'surat_pengirim'),
            array('name' => 'surat_tujuan'),
            array('name' => 'surat_kepada'),
            array('name' => 'surat_lampiran'),
            array('name' => 'surat_lampiran_sub'),
            array('name' => 'surat_usesetuju'),
            array('name' => 'surat_ringkasan'),
            array('name' => 'surat_catatan'),
            array('name' => 'surat_unit'),
            array('name' => 'surat_setuju_isurut'),
            array('name' => 'surat_setuju_komentar'),
            array('name' => 'surat_setuju'),
            array('name' => 'surat_setuju_staf'),
            array('name' => 'surat_setuju_profil'),
            array('name' => 'surat_setuju_tgl'),
            array('name' => 'surat_distribusi_staf'),
            array('name' => 'surat_distribusi_profil'),
            array('name' => 'surat_distribusi_tgl'),
            array('name' => 'surat_selesai_staf'),
            array('name' => 'surat_selesai_profil'),
            array('name' => 'surat_selesai_tgl'),
            array('name' => 'surat_terima_staf'),
            array('name' => 'surat_korespondensi'),
            array('name' => 'surat_korespondensi_surat'),
            array('name' => 'surat_useretensi'),
            array('name' => 'surat_retensi_tgl'),
            array('name' => 'surat_inaktif_tgl'),
            array('name' => 'surat_prioritas'),
            array('name' => 'surat_kelas'),
            array('name' => 'surat_lokasi'),
            array('name' => 'surat_jenis'),
            array('name' => 'surat_media'),
            array('name' => 'surat_sifat'),
            array('name' => 'surat_israhasia'),
            array('name' => 'surat_properti'),
            array('name' => 'surat_ekspedisi'),
            array('name' => 'staf_id'),
            array('name' => 'staf_peran'),
            array('name' => 'staf_kode'),
            array('name' => 'staf_nama'),
            array('name' => 'staf_kelamin'),
            array('name' => 'staf_isaktif'),
            array('name' => 'staf_akun'),
            array('name' => 'akun_nama'),
            array('name' => 'staf_unit'),
            array('name' => 'unit_nama'),
            array('name' => 'staf_jabatan'),
            array('name' => 'jabatan_nama'),
            array('name' => 'ekspedisi_id'),
            array('name' => 'ekspedisi_nama'),
            array('name' => 'ekspedisi_kode'),
            array('name' => 'ekspedisi_isaktif'),
            array('name' => 'ekspedisi_properti')
        ));
    }
}