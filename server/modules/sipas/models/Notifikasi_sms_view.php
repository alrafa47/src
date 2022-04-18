<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notifikasi_sms_view extends Sipas_model_Notifikasi_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notifikasi_sms');
        $this->set_primary('notifikasi_id');
    }
}