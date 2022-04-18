<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/jenis', true);

class Sipas_model_Jenis_view extends Sipas_model_Jenis {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jenis');
        $this->set_primary('jenis_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_nomor_awal'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_batasibackdate'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_batasipenerima'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_tipe'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_ttd'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_retensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_isbatas'),
            array('insert'=>false, 'update'=>false, 'name'=>'jenis_batas_jumlah')
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