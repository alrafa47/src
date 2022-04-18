<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/sla_view', true);

class Sipas_model_Sla_aktif_view extends Sipas_model_Sla_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_sla_aktif');
    }
}