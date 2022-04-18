<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Kelas_aktif_combo_view extends Sipas_model_Kelas {
    
    function __construct(){
        parent::__construct();
        $this->set_table_name('v_kelas_aktif_combo');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_retensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_limitdays'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_induk'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_jenis'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'kelas_jumlah_anak')
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_id'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_data')
        ));
    }

}