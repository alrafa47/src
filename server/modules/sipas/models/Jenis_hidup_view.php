<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/jenis_view', true);

class Sipas_model_Jenis_hidup_view extends Sipas_model_Jenis_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jenis_hidup');
    }
}