<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_log_ekspedisi_view extends Sipas_model_Surat_log_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_log_ekspedisi');
        $this->set_primary('surat_log_id');
    }
}