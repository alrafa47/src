<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/koreksi_masuk_aktif_view', true);

class Sipas_model_Koreksi_masuk_tolak_view extends Sipas_model_Koreksi_masuk_aktif_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_koreksi_masuk_tolak');
        $this->set_primary('disposisi_masuk_id');
    }
}