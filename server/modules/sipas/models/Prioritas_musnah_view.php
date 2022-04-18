<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Prioritas_musnah_view extends Sipas_model_Prioritas_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_prioritas_musnah');
    }
}