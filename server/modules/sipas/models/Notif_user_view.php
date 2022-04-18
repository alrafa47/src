<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notif_user_view extends Sipas_model_Notif_user {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notif_user');
        $this->set_primary('notif_user_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_tipe'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_model'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_pengirim'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_pengirim_profil'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_penerima'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_penerima_profil'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_referensi'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_isnew'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_isbaca'),
            array('insert'=>false, 'update'=>false, 'name'=>'notif_user_isi'),

            array('insert'=>false, 'update'=>false, 'name'=>'penerima_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'penerima_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'penerima_jabatan_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'penerima_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'penerima_unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'penerima_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengirim_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengirim_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengirim_jabatan_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengirim_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengirim_unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'pengirim_unit_nama')
            ));
    }
}