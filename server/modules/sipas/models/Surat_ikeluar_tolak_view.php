<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_ikeluar_tolak_view extends Sipas_model_Surat_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_ikeluar_tolak');
        $this->set_primary('surat_id');
    }
}