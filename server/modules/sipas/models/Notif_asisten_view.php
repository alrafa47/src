<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_asisten_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notif_staf_asisten');
        $this->set_primary('staf_wakil_asisten');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'staf_wakil_asisten'),
	    array('insert'=>false, 'update'=>false, 'name'=>'disposisi_status_baca_tindakan'),
            array('insert'=>false, 'update'=>false, 'name'=>'kotakmasuk_belumditindak'),
            array('insert'=>false, 'update'=>false, 'name'=>'draft_belumditindak')
        ));
    }
}