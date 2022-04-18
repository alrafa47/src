<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Media extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'media',
                'primary'=>'media_id',
                'fields'=> array(
                    array(
                        'name'=>'media_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'media_kode',
                        'display'=>'Kode',
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'media_nama',
                        'display'=>'Nama',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'media_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'media_ishapus',
                        'display'=>'Hapus'
                    ),
                    array(
                        'name'=>'media_properti',
                        'display'=>'Properti'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}