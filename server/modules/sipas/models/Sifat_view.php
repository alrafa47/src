<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sifat_view extends Sipas_model_Sifat {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_sifat');
        $this->set_primary('sifat_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'sifat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sifat_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sifat_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sifat_color'),
            array('insert'=>false, 'update'=>false, 'name'=>'sifat_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'sifat_israhasia'),
            array('insert'=>false, 'update'=>false, 'name'=>'sifat_properti')
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