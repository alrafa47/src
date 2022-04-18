<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Prioritas_view extends Sipas_model_Prioritas {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_prioritas');
        $this->set_primary('prioritas_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'prioritas_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'prioritas_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'prioritas_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'prioritas_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'prioritas_retensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'prioritas_properti'),
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