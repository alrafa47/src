<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Klise_kelompok_view extends Base_model {
       public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'v_klise_kelompok',
                'primary'=>'klise_kelompok',
                'fields'=> array(
                    array(
                        'name'=>'klise_kelompok',
                        'display'=>'Kelompok',
                        'notnull'=>true,
                        'unique'=>true
                    )
                ),
                'limit'=>null,
            )
        ));
    }
}