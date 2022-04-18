<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->get_model('sipas/unit_cakupan_hidup_view', true);

class Sipas_model_Unit_cakupan_aktif_view extends Sipas_model_Unit_cakupan_hidup_view {
    
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_unit_cakupan_aktif');
    }
}