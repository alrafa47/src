<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Aksi_view extends Sipas_model_Aksi {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_aksi');
        $this->set_primary('aksi_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'aksi_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'aksi_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'aksi_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'aksi_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'aksi_properti'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_id'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_data')
        ));
    }
}