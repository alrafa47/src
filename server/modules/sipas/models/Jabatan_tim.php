<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jabatan_tim extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'jabatan_tim',
                'primary'=>'jabatan_tim_id',
                'fields'=> array(
                    array(
                        'name'=>'jabatan_tim_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'jabatan_tim_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'jabatan_tim_properti',
                        'display'=>'Properti',
                    ),
                    array(
                        'name'=>'jabatan_tim_ishapus',
                        'display'=>'Hapus',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}