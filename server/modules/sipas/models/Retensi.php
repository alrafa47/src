<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Retensi extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'retensi',
                'primary'=>'retensi_id',
                'fields'=> array(
                    array(
                        'name'=>'retensi_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'retensi_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'retensi_hari',
                        'display'=>'Hari'
                    ),
                    array(
                        'name'=>'retensi_isaktif',
                        'display'=>'Isaktif'
                    ),
                    array(
                        'name'=>'retensi_ishapus',
                        'display'=>'Ishapus'
                    ),
                    array(
                        'name'=>'retensi_properti',
                        'display'=>'Properti'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}