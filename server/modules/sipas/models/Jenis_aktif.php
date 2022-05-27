<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jenis_aktif extends Sipas_model_Jenis {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jenis_aktif');
        $this->set_primary('jenis_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_properti'), 
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_ishapus')
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