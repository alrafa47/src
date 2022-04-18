<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_profil_temp extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'staf_profil_temp',
                'primary'=>'staf_profil_temp_id',
                'fields'=> array(
                    array(
                        'name'=>'staf_profil_temp_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_profil_temp_staf',
                        'display'=>'Profil Staf'
                    ),
                    array(
                        'name'=>'staf_profil_temp_staf_nama',
                        'display'=>'Profil Unit Nama'
                    ),
                    array(
                        'name'=>'staf_profil_temp_unit',
                        'display'=>'Profil Unit'
                    ),
                    array(
                        'name'=>'staf_profil_temp_unit_nama',
                        'display'=>'Profil Unit Nama'
                    ),
                    array(
                        'name'=>'staf_profil_temp_jabatan',
                        'display'=>'Profil Jabatan'
                    ),
                    array(
                        'name'=>'staf_profil_temp_jabatan_nama',
                        'display'=>'Profil Jabatan Nama'
                    ),
                    array(
                        'name'=>'staf_profil_temp_buat_tgl',
                        'display'=>'Profil Tgl Buat'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}