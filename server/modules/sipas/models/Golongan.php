<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Golongan extends Base_model {
       public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'golongan',
                'primary'=>'golongan_id',
                'fields'=> array(
                    array(
                        'name'=>'golongan_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'golongan_level',
                        'display'=>'Level Golongan',
                        'notnull'=>true,
                        'unique'=>true
                    ),
                    array(
                        'name'=>'golongan_sgt',
                        'display'=>'SGT Golongan',
                    ),
                    array(
                        'name'=>'golongan_gaji_pokok',
                        'display'=>'Gaji Pokok Golongan'
                    ),
                    array(
                        'name'=>'golongan_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'golongan_ishapus',
                        'display'=>'Hapus'
                    ),
                    array(
                        'name'=>'golongan_properti',
                        'display'=>'Properti',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=> true
        ));
    }
}