<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_abstract_view', true);

class Sipas_model_Disposisi_aktif_view extends Sipas_model_Disposisi_abstract_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_aktif');
    }

}