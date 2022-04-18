<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_disposisi_masuk_jabatan_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notif_disposisi_masuk_jabatan');
        $this->set_primary('jabatan_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'jabatan_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'kotakmasuk_belumditindak'),
            array('insert'=>false, 'update'=>false, 'name'=>'kotakmasuk_belumdibaca'),
            array('insert'=>false, 'update'=>false, 'name'=>'tugassaya_belumditindak')
            ));
    }
}