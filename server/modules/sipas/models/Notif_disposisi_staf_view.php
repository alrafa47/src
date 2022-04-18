<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_disposisi_staf_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notif_disposisi_staf');
        $this->set_primary('staf_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'staf_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'disposisi_status_baca_tindakan')
            ));
    }
}