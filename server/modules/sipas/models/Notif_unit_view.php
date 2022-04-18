<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_unit_view extends Base_model {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notif_agenda_unit');
        $this->set_primary('unit_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasuk_pendistribusian'),
            array('insert'=>false, 'update'=>false, 'name'=>'agkeluar_blmekspedisi'),
            array('insert'=>false, 'update'=>false, 'name'=>'agkeluar_blmnomor'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasukinternal_pending'),
            array('insert'=>false, 'update'=>false, 'name'=>'agkeluarinternal_blmnomor'),
            array('insert'=>false, 'update'=>false, 'name'=>'agkeluarinternal_tolak'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasuk_reminder_7'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasuk_reminder_3'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasuk_reminder_1'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasukinternal_reminder_7'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasukinternal_reminder_3'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasukinternal_reminder_1'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasuk_request_berkas'),
            array('insert'=>false, 'update'=>false, 'name'=>'agkeluar_request_berkas'),
            array('insert'=>false, 'update'=>false, 'name'=>'agmasukinternal_request_berkas')
        ));
    }
}