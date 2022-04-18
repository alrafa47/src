<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Disposisi_perintah_log extends Base_model {
 
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'disposisi_perintah_log',
                'primary'=>'disposisi_perintah_log_id',
                'fields'=> array(
                    array('name' => 'disposisi_perintah_log_id', 'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name' => 'disposisi_perintah_log_disposisi'),
                    array('name' => 'disposisi_perintah_log_perintah'),
                    array('name' => 'disposisi_perintah_log_pesan'),
                    array('name' => 'disposisi_perintah_log_staf'),
                    array('name' => 'disposisi_perintah_log_profil'),
                    array('name' => 'disposisi_perintah_log_tgl'),
                ),
                'limit'=>null,
            ),
            'auto_id'=> true
        ));
    }
}