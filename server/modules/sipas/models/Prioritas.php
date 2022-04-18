<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Prioritas extends Base_model {
       public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'prioritas',
                'primary'=>'prioritas_id',
                'fields'=> array(
                    array(
                        'name'=>'prioritas_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'prioritas_kode',
                        'display'=>'Kode Prioritas',
                        'notnull'=>true,
                        'unique'=>true
                    ),
                    array(
                        'name'=>'prioritas_nama',
                        'display'=>'Nama Prioritas',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'prioritas_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'prioritas_retensi',
                        'display'=>'Lama Prioritas'
                    ),
                    array(
                        'name'=>'prioritas_ishapus',
                        'display'=>'Hapus'
                    ),
                    array(
                        'name'=>'prioritas_properti',
                        'display'=>'Properti',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=> true
        ));
    }
}