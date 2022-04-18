<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jabatan_nonaktif_view extends Sipas_model_Jabatan_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jabatan_nonaktif');
    }
}