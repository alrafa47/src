<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_masuk_aktif_1_view extends Sipas_model_Surat_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_masuk_aktif_1');
        $this->set_primary('surat_id');
    }
    
}