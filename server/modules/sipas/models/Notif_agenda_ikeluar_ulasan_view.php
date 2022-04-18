<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_agenda_ikeluar_ulasan_view extends Sipas_model_Surat_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_notif_agenda_ikeluar_ulasan');
        $this->set_primary('surat_id');
    }
}