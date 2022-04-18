<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_pgs_aktif_view extends Base_model {
      
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf_pgs_aktif');
        $this->set_primary('staf_wakil_staf');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'staf_wakil_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'staf_wakil_asisten'),
            array('insert'=>false, 'update'=>false, 'name'=>'staf_wakil_tgl_mulai'),
            array('insert'=>false, 'update'=>false, 'name'=>'staf_wakil_tgl_selesai')
            ));
    }
}