<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Aksi extends Base_model {
     public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'aksi',
                'primary'=>'aksi_id',
                'fields'=> array(
                    array(
                        'name'=>'aksi_id',
                        'display'=>'Disposisi Action Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'aksi_kode',
                        'display'=>'Kode'
                    ),
                    array(
                        'name'=>'aksi_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'aksi_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'aksi_ishapus',
                        'display'=>'hapus'
                    ),
                    array(
                        'name'=>'aksi_properti',
                        'display'=>'Properti'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=> true
        ));
    }
}