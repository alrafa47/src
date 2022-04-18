<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/mb_disposisi_masuk_netral_blm_tindak_view', true);

class Sipas_model_Mb_disposisi_masuk_draf_blm_tindak_view extends Sipas_model_Mb_disposisi_masuk_netral_blm_tindak_view {
    
    public $table = 'v_mb_disposisi_masuk_draf_blm_tindak';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_mb_disposisi_masuk_draf_blm_tindak');
        $this->set_primary('disposisi_masuk_id');
    }
}