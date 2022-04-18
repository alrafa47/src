<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_tim extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'staf_tim',
                'primary'=>'staf_tim_id',
                'fields'=> array(
                    array(
                        'name'=>'staf_tim_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_tim_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_tim_properti',
                        'display'=>'Properti',
                    ),
                    array(
                        'name'=>'staf_tim_ishapus',
                        'display'=>'Hapus',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}