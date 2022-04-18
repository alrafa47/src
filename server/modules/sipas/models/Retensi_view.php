<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Retensi_view extends Sipas_model_Retensi {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_retensi');
        $this->set_primary('retensi_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'retensi_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'retensi_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'retensi_hari'),
            array('insert'=>false, 'update'=>false, 'name'=>'retensi_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'retensi_properti')
        ));
    }
}