<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
$ci =& get_instance();
$ci->load->model('sipas/golongan_view',true);
class Sipas_model_Golongan_aktif_view extends Sipas_model_Golongan_view {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_golongan_aktif');
    }
}