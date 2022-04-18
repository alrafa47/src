<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_kontak extends Base_model {
       public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'v_surat_kontak',
                'primary'=>'surat_kontak',
                'fields'=> array(
                    array(
                        'name'=>'surat_kontak',
                        'display'=>'Nama Perusahaan',
                        'notnull'=>true,
                        'unique'=>true
                    )
                ),
                'limit'=>null,
            )
        ));
     }
   }