<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Arsip extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'arsip',
                'primary'=>'arsip_id',
                'fields'=> array(
                    array('name'=>'arsip_id', 'display'=>'Id', 'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name'=>'arsip_induk'),
                    array('name'=>'arsip_nama'),
                    array('name'=>'arsip_unit'),
                    array('name'=>'arsip_isumum'),
                    array('name'=>'arsip_isbagi'),
                    array('name'=>'arsip_bagi_tgl'),
                    array('name'=>'arsip_bagi_staf'),
                    array('name'=>'arsip_buat_staf'),
                    array('name'=>'arsip_buat_tgl'),
                    array('name'=>'arsip_ishapus'),
                    array('name'=>'arsip_properti')
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}