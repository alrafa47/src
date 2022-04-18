<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Notifikasi_view extends Sipas_model_Notifikasi {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_notifikasi');
        $this->set_primary('notifikasi_id');
        $this->set_fields(array(
            array('name'=>'notifikasi_id'),
            array('name'=>'notifikasi_pengirim'),
            array('name'=>'notifikasi_penerima'),
            array('name'=>'notifikasi_tgl'),
            array('name'=>'notifikasi_model'),
            array('name'=>'notifikasi_perihal'),
            array('name'=>'notifikasi_isi'),
            array('name'=>'notifikasi_data'),
            array('name'=>'notifikasi_baca_tgl'),
            array('name'=>'notifikasi_terima_tgl'),
            array('name'=>'notifikasi_status'),
            array('name'=>'notifikasi_properti'),
            array('name'=>'notifikasi_isterima'),
            array('name'=>'notifikasi_isbaca'),
            array('name'=>'pengirim_id'),
            array('name'=>'pengirim_kode'),
            array('name'=>'pengirim_nama'),
            array('name'=>'pengirim_unit'),
            array('name'=>'pengirim_unit_nama'),
            array('name'=>'pengirim_jabatan'),
            array('name'=>'pengirim_jabatan_nama'),
            array('name'=>'penerima_id'),
            array('name'=>'penerima_kode'),
            array('name'=>'penerima_nama'),
            array('name'=>'penerima_unit'),
            array('name'=>'penerima_unit_nama'),
            array('name'=>'penerima_jabatan'),
            array('name'=>'penerima_jabatan_nama')
        ));
    }
}