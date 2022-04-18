<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
$CI = get_instance();
$CI->model('sipas/staf_view', true);
class Sipas_model_Staf_aktif_view extends Sipas_model_Staf_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf_aktif');
    }
}