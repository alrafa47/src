<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf_wakil extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'staf_wakil',
                'primary'=>'staf_wakil_id',
                'fields'=> array(
                    array(
                        'name'=>'staf_wakil_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_wakil_staf',
                        'display'=>'Manager'
                        // 'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_wakil_konfirmasi_staf',
                        'display'=>'Manager'
                    ),
                    array(
                        'name'=>'staf_wakil_konfirmasi_staf_status',
                        'display'=>'Manager'
                    ),
                    array(
                        'name'=>'staf_wakil_konfirmasi_staf_tgl',
                        'display'=>'Manager'
                    ),
                    array(
                        'name'=>'staf_wakil_asisten',
                        'display'=>'Asisten'
                    ),
                    array(
                        'name'=>'staf_wakil_konfirmasi_asisten',
                        'display'=>'Asisten'
                    ),
                    array(
                        'name'=>'staf_wakil_konfirmasi_asisten_status',
                        'display'=>'Asisten'
                    ),
                    array(
                        'name'=>'staf_wakil_konfirmasi_asisten_tgl',
                        'display'=>'Asisten'
                    ),
                    array(
                        'name'=>'staf_wakil_plt',
                        'display'=>'PLT'
                    ),
                    array(
                        'name'=>'staf_wakil_tgl_mulai',
                        'display'=>'mulai'
                    ),
                    array(
                        'name'=>'staf_wakil_tgl_selesai',
                        'display'=>'Selesai'
                    ),
                    array(
                        'name'=>'staf_wakil_properti',
                        'display'=>'properties',
                        'secure'=>false
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}