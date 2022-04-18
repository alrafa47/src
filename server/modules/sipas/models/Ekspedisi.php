<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Ekspedisi extends Base_Model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'ekspedisi',
                'primary'=>'ekspedisi_id',
                'fields'=> array(
                    array(
                        'name'=>'ekspedisi_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'ekspedisi_kode',
                        'display'=>'Kode',
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'ekspedisi_nama',
                        'display'=>'Nama',
                        'notnull'=>true,
                    ),
                    array(
                        'name'=>'ekspedisi_isaktif',
                        'display'=>'Aktif'
                    ),
                    array(
                        'name'=>'ekspedisi_ishapus',
                        'display'=>'hapus'
                    ),
                    array(
                        'name'=>'ekspedisi_properti',
                        'display'=>'properti'
                    )

                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}