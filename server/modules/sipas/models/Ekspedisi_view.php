<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/ekspedisi', true);

class Sipas_model_Ekspedisi_view extends Sipas_model_Ekspedisi {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_ekspedisi');
        $this->set_primary('ekspedisi_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'ekspedisi_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'ekspedisi_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'ekspedisi_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'ekspedisi_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'ekspedisi_properti')
        ));
    }
}