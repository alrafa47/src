<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Properti_log_view extends Base_Model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_properti_log');
        $this->set_primary('properti_log_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_slug'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_aksi'),

            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_staf_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_staf_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_log_staf_unit_nama')
        ));
    }
}