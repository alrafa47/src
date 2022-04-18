<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jabatan_wakil extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'jabatan_wakil',
                'primary'=>'jabatan_wakil_id',
                'fields'=> array(
                    array(
                        'name'=>'jabatan_wakil_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'jabatan_wakil_jabatan',
                        'display'=>'Pimpinan'
                    ),
                    array(
                        'name'=>'jabatan_wakil_asisten',
                        'display'=>'Asisten'
                    ),
                    array(
                        'name'=>'jabatan_wakil_properti',
                        'display'=>'properties',
                        'secure'=>false
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}