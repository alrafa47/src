<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Arsip_view extends Sipas_model_Arsip {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_arsip');
        $this->set_primary('arsip_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_induk'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_isumum'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_isbagi'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_bagi_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_bagi_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_induk_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_induk_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_jumlah_dokumen'),

            array('insert'=>false, 'update'=>false, 'name'=>'unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),

            array('insert'=>false, 'update'=>false, 'name'=>'staf_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'staf_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'staf_nama'),
            
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_data'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_jabatan_nama')
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