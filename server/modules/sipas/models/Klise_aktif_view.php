<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->model('sipas/klise_view');

class Sipas_model_Klise_aktif_view extends Sipas_model_Klise_view {
    function __construct(){
        parent::__construct();
        $this->set_table_name('v_klise_aktif');
    }
}