<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_masuk_aktif_view', true);

class Sipas_model_Disposisi_masuk_blmbaca_view extends Sipas_model_Disposisi_masuk_aktif_view {
    
    public $table = 'v_disposisi_masuk_blmbaca';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_masuk_blmbaca');
        $this->set_primary('disposisi_masuk_id');
    }
}