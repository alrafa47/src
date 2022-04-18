<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Akun_note_view extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'v_akun_note',
                'primary'=>'akun_note_id',
                'fields'=> array(
                    array(
                        'name'=>'user_note_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'user_note_date',
                        'display'=>'Tanggal Note'
                    ),
                    array(
                        'name'=>'user_note_text',
                        'display'=>'Text'
                    ),
                    array(
                        'name'=>'user_note_user',
                        'display'=>'User'
                    ),
                    array(
                        'name'=>'user_note_status',
                        'display'=>'Status'
                    ),
                    array(
                        'name'=>'user_id',
                        'display'=>'user'
                    ),
                    array(
                        'name'=>'user_staf',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_role',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_name',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_display',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_password',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_salt',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_lastlogin',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_email',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_isactive',
                        'display'=>''
                    ),
                    array(
                        'name'=>'user_setting',
                        'display'=>''
                    ),
                    array(
                        'name'=>'role_id',
                        'display'=>''
                    ),
                    array(
                        'name'=>'role_name',
                        'display'=>''
                    ),
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}