<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jenis_unit extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'jenis_unit',
                'primary'=>'jenis_unit_id',
                'fields'=> array(
                    array(
                        'name'=>'jenis_unit_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'jenis_unit_jenis',
                        'display'=>'Jenis',
                    ),
                    array(
                        'name'=>'jenis_unit_unit',
                        'display'=>'Unit',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}