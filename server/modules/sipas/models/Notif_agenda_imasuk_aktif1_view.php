<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_agenda_imasuk_aktif1_view extends Sipas_model_Surat_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_notif_agenda_imasuk_aktif1');
        $this->set_primary('surat_id');
    }
}