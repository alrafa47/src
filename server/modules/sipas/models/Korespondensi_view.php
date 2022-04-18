<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->model('sipas/korespondensi');

class Sipas_model_Korespondensi_view extends Sipas_model_Korespondensi {
    public function __construct(){
      parent::__construct();
      $this->set_table_name('v_korespondensi');
      $this->set_primary('korespondensi_id');
      $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_nomor'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_jumlah'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_tgl_mulai'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_tgl_selesai'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_perihal'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_pengirim'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_penerima'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_unitpengirim'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_unitpenerima'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_isinternal'),
            array('insert'=>false, 'update'=>false, 'name'=>'korespondensi_properti'),

            array('insert' =>false, 'update'=>false, 'name'=>'unitpengirim_id'),
            array('insert' =>false, 'update'=>false, 'name'=>'unitpengirim_nama'),
            array('insert' =>false, 'update'=>false, 'name'=>'unitpengirim_kode'),

            array('insert' =>false, 'update'=>false, 'name'=>'unitpenerima_id'),
            array('insert' =>false, 'update'=>false, 'name'=>'unitpenerima_nama'),
            array('insert' =>false, 'update'=>false, 'name'=>'unitpenerima_kode'),

            array('insert'=>false, 'update'=>false, 'name'=>'surat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_model'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_tanggal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_agenda'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_nomor'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_registrasi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_perihal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_pengirim'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_tujuan'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_kepada'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_korespondensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_korespondensi_surat')
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_id'),

            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_data'),

            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_id'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_kode'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_unit'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_unit_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_jabatan'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_jabatan_nama'),

            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pengubah_id'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pengubah_kode'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pengubah_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pengubah_unit'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pengubah_unit_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pengubah_jabatan'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pengubah_jabatan_nama'),

            // array('insert'=>false, 'update'=>false, 'name'=>'properti_penghapus_id'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_penghapus_kode'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_penghapus_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_penghapus_unit'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_penghapus_unit_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_penghapus_jabatan'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_penghapus_jabatan_nama'),

            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pemulih_id'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pemulih_kode'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pemulih_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pemulih_unit'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pemulih_unit_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pemulih_jabatan'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pemulih_jabatan_nama')
      ));  
    }
}