<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sla_rumus extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'sla_rumus',
                'primary'=>'sla_rumus_id',
                'fields'=> array(
                    array(
                        'name'=>'sla_rumus_id',
                        'display'=>'Id',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sla_rumus_sla',
                        'display'=>'SLA rumus SLA',
                    ),
                    array(
                        'name'=>'sla_rumus_formula',
                        'display'=>'SLA rumus Formula',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }
                    ),
                    array(
                        'name'=>'sla_rumus_nilai',
                        'display'=>'SLA rumus Nilai',
                    ),
                    array(
                        'name'=>'sla_rumus_index',
                        'display'=>'SLA rumus Index',
                    ),
                    array(
                        'name'=>'sla_rumus_properti',
                        'display'=>'SLA RUmus Properti',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}