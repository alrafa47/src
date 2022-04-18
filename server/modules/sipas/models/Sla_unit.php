<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sla_unit extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'sla_unit',
                'primary'=>'sla_unit_id',
                'fields'=> array(
                    array(
                        'name'=>'sla_unit_id',
                        'display'=>'Id',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sla_unit_sla',
                        'display'=>'SLA Unit SLA',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sla_unit_unit',
                        'display'=>'SLA Unit Unit',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sla_unit_default',
                        'display'=>'SLA Unit Default'
                    ),
                    array(
                        'name'=>'sla_unit_properti',
                        'display'=>'SLA Unit Properti',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    public function getDefaultSLA($unit_id = null) {
        if( ! $unit_id) return;

        $sla = $this->read(array('sla_unit_unit'=>$unit_id, 'sla_unit_default'=>1));
        $sla_id = (! empty($sla)) ? $sla['sla_id'] : null;
        return $sla_id;
    }
}