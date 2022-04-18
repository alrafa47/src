<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Kontak extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'kontak',
                'primary'=>'kontak_id',
                'fields'=> array(
                    array(
                        'name'=>'kontak_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true
                        // 'notnull'=>true
                    ),
                    array(
                        'name'=>'kontak_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                        // 'unique'=>true
                    ),
                    array(
                        'name'=>'kontak_ishapus',
                        'display'=>'Hapus'
                        // 'unique'=>true
                    ),
                    array(
                        'name'=>'kontak_properti',
                        'display'=>'Properti'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}