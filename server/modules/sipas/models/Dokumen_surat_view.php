<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/dokumen', true);

class Sipas_model_Dokumen_surat_view extends Base_model { 
    
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_dokumen_surat');
        $this->set_primary('dokumen_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_isactive'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_ext'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_isimport'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_nomor'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_perihal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_tanggal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_retensi_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_israhasia'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_nama')
        ));
    }
}