<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sms_outbox extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'outbox',
                'primary'=>'ID',
                'fields'=> array(
                    array(
                        'name'=>'ID',
                        'display'=>'Id'
                    ),
                    array(
                        'name'=>'DestinationNumber'
                    ),
                    array(
                        'name'=>'TextDecoded'
                    ),
                    array(
                        'name'=>'CreatorID'
                    )
                ),
                'limit'=>null,
            )
        ));
    }
}