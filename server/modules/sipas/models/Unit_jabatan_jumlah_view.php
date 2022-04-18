<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Unit_jabatan_jumlah_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_unit_jabatan_jumlah');
        $this->set_primary('unit_cakupan_jabatan');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'unit_cakupan_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'jabatan_unit_jumlah')
        ));
    }
}