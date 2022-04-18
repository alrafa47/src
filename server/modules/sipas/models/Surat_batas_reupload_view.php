<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_batas_reupload_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_batas_reupload');
        $this->set_primary('surat_buat_staf');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'surat_buat_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_jenis'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_model'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_setuju'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_arsip'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_jumlah_dokumen'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_jumlah_dokumen_reupload'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_isbatas'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_batas_jumlah')
        ));
    }
}