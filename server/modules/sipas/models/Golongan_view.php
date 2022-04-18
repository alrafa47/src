<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
$ci =& get_instance();
$ci->load->model('sipas/golongan',true);
class Sipas_model_Golongan_view extends Sipas_model_Golongan {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_golongan');
        $this->set_primary('golongan_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'golongan_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'golongan_level'),
            array('insert'=>false, 'update'=>false, 'name'=>'golongan_sgt'),
            array('insert'=>false, 'update'=>false, 'name'=>'golongan_gaji_pokok'),
            array('insert'=>false, 'update'=>false, 'name'=>'golongan_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'golongan_ishapus'),
            array('insert'=>false, 'update'=>false, 'name'=>'golongan_properti')
        ));
    }
}