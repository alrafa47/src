<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sifat extends Base_model {
       public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'sifat',
                'primary'=>'sifat_id',
                'fields'=> array(
                    array(
                        'name'=>'sifat_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sifat_kode',
                        'display'=>'Kode Sifat',
                        'notnull'=>true,
                        'unique'=>true
                    ),
                    array(
                        'name'=>'sifat_nama',
                        'display'=>'Nama Sifat',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sifat_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'sifat_israhasia',
                        'display'=>'Rahasia',
                    ),
                    array(
                        'name'=>'sifat_color',
                        'display'=>'Color'
                    ),
                    array(
                        'name'=>'sifat_ishapus',
                        'display'=>'hapus'
                    ),
                    array(
                        'name'=>'sifat_properti',
                        'display'=>'Properti'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
     }
}