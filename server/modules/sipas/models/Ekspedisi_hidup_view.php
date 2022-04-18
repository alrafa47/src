<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/ekspedisi_view', true);

class Sipas_model_Ekspedisi_hidup_view extends Sipas_model_Ekspedisi_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_ekspedisi_hidup');
    }
}