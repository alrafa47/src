<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Alat extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'alat',
                'primary'=>'alat_id',
                'fields'=> array(
                    array(
                        'name'=>'alat_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'alat_akun'
                    ),
                    array(
                        'name'=>'alat_aktif_tgl'
                    ),
                    array(
                        'name'=>'alat_usang_tgl'
                    ),
                    array(
                        'name'=>'alat_data'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}