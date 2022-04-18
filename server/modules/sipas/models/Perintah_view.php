<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Perintah_view extends Sipas_model_Perintah {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_perintah');
        $this->set_primary('perintah_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'perintah_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'perintah_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'perintah_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'perintah_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'perintah_properti'),
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