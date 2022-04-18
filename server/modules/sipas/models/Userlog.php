<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Userlog extends Base_model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'userlog',
                'primary'=>'userlog_id',
                'fields'=> array(
                    array(
                        'name'=>'userlog_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'userlog_user',
                        'display'=>'Nama'
                    ),
                    array(
                        'name'=>'userlog_time',
                        'display'=>'Waktu'
                    ),
                    array(
                        'name'=>'userlog_action',
                        'display'=>'Kegiatan'
                    ),
                    array(
                        'name'=>'userlog_text',
                        'display'=>'Keterangan',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}