<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Media_hidup_view extends Sipas_model_Media_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_media_hidup');
    }
}