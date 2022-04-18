<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat_view', true);

class Sipas_model_Surat_masuk_blm_arah_view extends Sipas_model_Surat_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_masuk_blm_arah');
        $this->set_primary('surat_id');
    }
}