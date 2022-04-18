<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Perintah_aktif_view extends Sipas_model_Perintah_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_perintah_aktif');
    }
}