<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Itipe_view extends Sipas_model_Itipe {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_itipe');
        $this->set_primary('itipe_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'itipe_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'itipe_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'itipe_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'itipe_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'itipe_properti')
        ));
    }
}