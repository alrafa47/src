<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notifikasi_app_view extends Sipas_model_Notifikasi_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notifikasi_app');
        $this->set_primary('notifikasi_id');
    }
}