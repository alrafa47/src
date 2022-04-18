<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat_stack_view', true);

class Sipas_model_Surat_stack_koreksi_view extends Sipas_model_Surat_stack_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_stack_koreksi');
    }

    function get_internal_penyetuju($surat_id=null){
        $me = $this;

        $stack = $this->find(array(
            'surat_stack_surat' => $surat_id
        ));
        return $stack;
    }
}