<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_unit extends Base_model {
       public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'v_surat_unit',
                'primary'=>'surat_unit',
                'fields'=> array(
                    array(
                        'name'=>'surat_unit',
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