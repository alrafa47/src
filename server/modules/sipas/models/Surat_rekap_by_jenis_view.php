<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_rekap_by_jenis_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_r_rekap_surat_by_jenis');
        $this->set_primary('unit_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'surat_jenis'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_tanggal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_model'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_jenis_count')
        ));
    }
}