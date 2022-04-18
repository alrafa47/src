<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Lokasi_nonaktif_view extends Sipas_model_Lokasi_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_lokasi_nonaktif');
    }
}