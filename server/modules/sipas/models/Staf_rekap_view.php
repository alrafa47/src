<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_rekap_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_r_rekap_staf');
        $this->set_primary('unit_nama');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'jumlah_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'jumlah_akun_staf_aktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'jumlah_akun_staf_nonaktif')
        ));
    }
}