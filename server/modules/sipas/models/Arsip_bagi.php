<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Arsip_bagi extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'arsip_bagi',
                'primary'=>'arsip_bagi_id',
                'fields'=> array(
                    array('name'=>'arsip_bagi_id', 'display'=>'Id', 'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name'=>'arsip_bagi_arsip'),
                    array('name'=>'arsip_bagi_unit'),
                    array('name'=>'arsip_bagi_bolehtambah'),
                    array('name'=>'arsip_bagi_bolehubah'),
                    array('name'=>'arsip_bagi_bolehhapus')
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}