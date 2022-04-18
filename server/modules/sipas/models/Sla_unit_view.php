<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/sla_unit', true);

class Sipas_model_Sla_unit_view extends Sipas_model_Sla_unit {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_sla_unit');
        $this->set_primary('sla_id');
        $this->set_fields(array(
            array('name' => 'sla_unit_id', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_sla', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_unit', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_default', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_properti', 'insert' => false, 'update' => false),

            array('name' => 'sla_id', 'insert' => false, 'update' => false),
            array('name' => 'sla_nama', 'insert' => false, 'update' => false),
            array('name' => 'sla_hasil', 'insert' => false, 'update' => false),
            array('name' => 'sla_kriteria', 'insert' => false, 'update' => false),
            array('name' => 'sla_isaktif', 'insert' => false, 'update' => false),
            array('name' => 'sla_properti', 'insert' => false, 'update' => false),

            array('name' => 'unit_id', 'insert' => false, 'update' => false),
            array('name' => 'unit_nama', 'insert' => false, 'update' => false),
            array('name' => 'unit_kode', 'insert' => false, 'update' => false),
            array('name' => 'unit_rubrik', 'insert' => false, 'update' => false),
            array('name' => 'unit_isaktif', 'insert' => false, 'update' => false),
            array('name' => 'unit_manager', 'insert' => false, 'update' => false),
            array('name' => 'unit_induk', 'insert' => false, 'update' => false),
            array('name' => 'unit_properti', 'insert' => false, 'update' => false)
        ));
    }
}