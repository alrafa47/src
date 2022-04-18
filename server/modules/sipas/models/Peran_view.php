<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$ci =& get_instance();
$ci->model('sipas/peran', true);

class Sipas_model_Peran_view extends Sipas_model_Peran {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_peran');
        $this->set_primary('peran_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'peran_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'peran_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'peran_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'peran_akses'),
            array('insert'=>false, 'update'=>false, 'name'=>'peran_staf_jumlah'),
            array('insert'=>false, 'update'=>false, 'name'=>'peran_properti'),
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