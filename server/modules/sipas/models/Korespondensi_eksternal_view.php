<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->model('sipas/korespondensi_view');

class Sipas_model_Korespondensi_eksternal_view extends Sipas_model_Korespondensi_view {
    public function __construct(){
      parent::__construct();
      $this->set_table_name('v_korespondensi_eksternal');
      $this->set_primary('korespondensi_id');
    }
}