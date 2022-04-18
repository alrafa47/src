<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_keluar_rekap_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_r_rekap_surat_keluar');
        $this->set_primary('unit_nama');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'jumlah_surat'),
            array('insert'=>false, 'update'=>false, 'name'=>'tahun'),
            array('insert'=>false, 'update'=>false, 'name'=>'bulan'),
            array('insert'=>false, 'update'=>false, 'name'=>'tipe')
        ));
    }
}