<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_masuk_netral_view', true);

class Sipas_model_Mb_disposisi_masuk_netral_teruskan_view extends Sipas_model_Disposisi_masuk_netral_view {
    
    public $table = 'v_mb_disposisi_masuk_netral_teruskan';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_mb_disposisi_masuk_netral_teruskan');
        $this->set_primary('disposisi_masuk_id');
    }
}