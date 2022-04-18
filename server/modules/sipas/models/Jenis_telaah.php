<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jenis_telaah extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'jenis_telaah',
                'primary'=>'jenis_telaah_id',
                'fields'=> array(
                    array(
                        'name'=>'jenis_telaah_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'jenis_telaah_kode',
                        'display'=>'Kode Jenis Telaah',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'jenis_telaah_nama',
                        'display'=>'Nama Jenis Telaah',
                        'unique'=>true
                    ),
                    array(
                        'name'=>'jenis_telaah_keterangan',
                        'display'=>'Keterangan'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}