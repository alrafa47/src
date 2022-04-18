<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/staf_lite_view', true);

class Sipas_model_Staf_wakil_tersedia_view extends Sipas_model_Staf_lite_view {

    public $field_nip = 'staf_kode';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf_wakil_tersedia');
    }
}