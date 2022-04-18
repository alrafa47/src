<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Klise_musnah_view extends Sipas_model_Klise_view {
    function __construct(){
        parent::__construct();
        $this->set_table_name('v_klise_musnah');
    }
}