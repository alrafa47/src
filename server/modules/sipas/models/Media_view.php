<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Media_view extends Sipas_model_Media {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_media');
        $this->set_primary('media_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'media_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'media_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'media_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'media_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'media_properti'),
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