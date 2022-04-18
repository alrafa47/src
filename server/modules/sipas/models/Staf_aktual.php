<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_aktual extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'staf_aktual',
                'primary'=>'staf_aktual_id',
                'fields'=> array(
                    array(
                        'name'=>'staf_aktual_id',
                        'display'=>'Id',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_aktual_penerima',
                        'display'=>'Penerima',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_aktual_pengirim',
                        'display'=>'Pengirim',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_aktual_tgl',
                        'display'=>'Tanggal'
                    ),
                    array(
                        'name'=>'staf_aktual_tipe',
                        'display'=>'Tipe'
                    ),
                    array(
                        'name'=>'staf_aktual_properti',
                        'display'=>'Properti'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}