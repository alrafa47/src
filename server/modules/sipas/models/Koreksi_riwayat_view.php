<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/koreksi_view', true);

class Sipas_model_Koreksi_riwayat_view extends Sipas_model_Koreksi_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_koreksi_riwayat');
    }
}