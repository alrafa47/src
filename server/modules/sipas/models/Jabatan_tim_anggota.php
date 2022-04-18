<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jabatan_tim_anggota extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'jabatan_tim_anggota',
                'primary'=>'jabatan_tim_anggota_id',
                'fields'=> array(
                    array(
                        'name'=>'jabatan_tim_anggota_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'jabatan_tim_anggota_jabatan',
                        'display'=>'Pegawai'
                    ),
                    array(
                        'name'=>'jabatan_tim_anggota_tim',
                        'display'=>'grup'
                    ),
                    array(
                        'name'=>'jabatan_tim_anggota_properti',
                        'display'=>'Properti'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}