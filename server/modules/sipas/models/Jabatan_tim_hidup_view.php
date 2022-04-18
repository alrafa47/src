<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/jabatan_tim_view', true);

class Sipas_model_Jabatan_tim_hidup_view extends Sipas_model_Jabatan_tim_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jabatan_tim_hidup');
    }
}