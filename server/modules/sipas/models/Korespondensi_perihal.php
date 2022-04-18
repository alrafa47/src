<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Korespondensi_perihal extends Base_model {
       public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'v_korespondensi_perihal',
                'primary'=>'template_perihal',
                'fields'=> array(
                    array(
                        'name'=>'template_perihal',
                        'display'=>'perihal',
                        'notnull'=>true,
                        'unique'=>true
                    )
                ),
                'limit'=>null,
            )
        ));
     }
   }