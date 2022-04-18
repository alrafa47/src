<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat_stack_view', true);

class Sipas_model_Surat_stack_petikan_view extends Sipas_model_Surat_stack_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_stack_petikan');
        $this->set_primary('surat_stack_id');
    }
}