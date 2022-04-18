<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Unit_cakupan extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'unit_cakupan',
                'primary'=>'unit_cakupan_id',
                'fields'=> array(
                    array(
                        'name'=>'unit_cakupan_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'unit_cakupan_jabatan',
                        'display'=>'Jabatan',
                    ),
                    array(
                        'name'=>'unit_cakupan_unit',
                        'display'=>'Unit',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}