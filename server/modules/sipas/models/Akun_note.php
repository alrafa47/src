<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Akun_note extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'akun_note',
                'primary'=>'akun_note_id',
                'fields'=> array(
                    array(
                        'name'=>'akun_note_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'akun_note_date',
                        'display'=>'Tanggal Note'
                    ),
                    array(
                        'name'=>'akun_note_text',
                        'display'=>'Text'
                    ),
                    array(
                        'name'=>'akun_note_akun',
                        'display'=>'akun'
                    ),
                    array(
                        'name'=>'akun_note_status',
                        'display'=>'Status'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    function mark($id=null, $mark = null){
        return $this->_update(
            array(
                'table'=>$this->table['name'],
                'data'=>array(
                    'user_note_status'=> $mark
                ),
                'where'=>array($this->table['primarykey']=>$id)
            )
        );
    }
}