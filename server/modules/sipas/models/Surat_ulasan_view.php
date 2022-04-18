<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat_ulasan', true);

class Sipas_model_Surat_ulasan_view extends Sipas_model_Surat_ulasan {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_ulasan');
        $this->set_primary('surat_ulasan_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ulasan_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ulasan_surat'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ulasan_ulasan'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ulasan_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ulasan_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ulasan_nilai'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ulasan_komentar'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_arsip'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_model'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_registrasi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_nomor'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_agenda'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_agenda_sub'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_tanggal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_perihal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_pengirim'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_tujuan'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_kepada'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_lampiran'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_lampiran_sub'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_usesetuju'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ringkasan'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_catatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_setuju_isurut'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_setuju_komentar'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_setuju'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_setuju_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_setuju_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_distribusi_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_distribusi_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_distribusi_otomatis'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_selesai_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_selesai_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_terima_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_korespondensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_korespondensi_surat'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_useretensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_retensi_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_prioritas'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_prioritas_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_kelas'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_lokasi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_jenis'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_media'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_sifat'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_israhasia'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_ekspedisi'),
            array('insert'=>false, 'update'=>false, 'name'=>'suratulasan_isbaca'),
            array('insert'=>false, 'update'=>false, 'name'=>'suratulasan_baca_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'suratulasan_baca_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_peran'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_akun'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_kelamin'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengulas_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_buat_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_unit_rubrik'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_pembuat_jabatan_kode')
        ));
    }
}