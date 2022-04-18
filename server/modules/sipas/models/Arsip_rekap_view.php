<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Arsip_rekap_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_r_rekap_arsip');
        $this->set_primary('unit_nama');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_isumum'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_isbagi'),
            array('insert'=>false, 'update'=>false, 'name'=>'jumlah')
        ));
    }
}