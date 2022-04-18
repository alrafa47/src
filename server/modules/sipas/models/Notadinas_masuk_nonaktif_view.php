<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/notadinas_masuk_view', true);

class Sipas_model_Notadinas_masuk_nonaktif_view extends Sipas_model_Notadinas_masuk_view {
    
    public $table = 'v_notadinas_masuk_nonaktif';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_notadinas_masuk_nonaktif');
        $this->set_primary('disposisi_masuk_id');
    }
}