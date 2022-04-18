<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/sla_unit_view', true);

class Sipas_model_Sla_unit_default_view extends Base_model {
      
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_sla_unit_de');
        $this->set_primary('sla_unit_id');
        $this->set_fields(array(
            array('name' => 'sla_unit_id', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_sla', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_unit', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_default', 'insert' => false, 'update' => false),
            array('name' => 'sla_unit_properti', 'insert' => false, 'update' => false),

            array('name' => 'sla_id', 'insert' => false, 'update' => false),
            array('name' => 'sla_nama', 'insert' => false, 'update' => false),
            array('name' => 'sla_isaktif', 'insert' => false, 'update' => false),

            array('name' => 'unit_id', 'insert' => false, 'update' => false),
            array('name' => 'unit_nama', 'insert' => false, 'update' => false),
            array('name' => 'unit_kode', 'insert' => false, 'update' => false)
        ));
    }
}