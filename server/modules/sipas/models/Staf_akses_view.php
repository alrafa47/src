<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_akses_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_r_staf_akses');
        $this->set_primary('unit_nama');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'peran_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'count_peran'),
            array('insert'=>false, 'update'=>false, 'name'=>'count_aktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'count_nonaktif')
        ));
    }
}