<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Buktikirim extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'buktikirim',
                'primary'=>'buktikirim_id',
                'fields'=> array(
                    array(
                        'name'=>'buktikirim_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'buktikirim_kode',
                        'display'=>'Kode',
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'buktikirim_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}