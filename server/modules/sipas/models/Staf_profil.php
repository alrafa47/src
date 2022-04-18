<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_profil extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'staf_profil',
                'primary'=>'staf_profil_id',
                'fields'=> array(
                    array(
                        'name'=>'staf_profil_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_profil_staf',
                        'display'=>'Profil Staf'
                    ),
                    array(
                        'name'=>'staf_profil_staf_nama',
                        'display'=>'Profil Unit Nama'
                    ),
                    array(
                        'name'=>'staf_profil_unit',
                        'display'=>'Profil Unit'
                    ),
                    array(
                        'name'=>'staf_profil_unit_nama',
                        'display'=>'Profil Unit Nama'
                    ),
                    array(
                        'name'=>'staf_profil_jabatan',
                        'display'=>'Profil Jabatan'
                    ),
                    array(
                        'name'=>'staf_profil_jabatan_nama',
                        'display'=>'Profil Jabatan Nama'
                    ),
                    array(
                        'name'=>'staf_profil_buat_tgl',
                        'display'=>'Profil Tgl Buat'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}