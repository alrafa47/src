<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_ikeluar_rekap_berakhir_view extends Base_model {
      
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_r_rekap_surat_ikeluar_berakhir');
        $this->set_primary('unit_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'surat_agenda'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_nomor'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_registrasi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_perihal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_jenis'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_tanggal'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_berlaku_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_useretensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_retensi_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_model'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'surat_properti_buat_tgl')
        ));
    }
}