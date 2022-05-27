<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Kontak_view extends Sipas_model_Kontak
{

    public function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_kontak');
        $this->set_primary('kontak_id');
        $this->set_fields(array(
            array('insert' => false, 'update' => false, 'name' => 'kontak_id'),
            array('insert' => false, 'update' => false, 'name' => 'kontak_nama'),
            array('insert' => false, 'update' => false, 'name' => 'kontak_properti'),
            array('insert' => false, 'update' => false, 'name' => 'kontak_unit_id'),
            array('insert' => false, 'update' => false, 'name' => 'kontak_unit_nama'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_id'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_data')
        ));
    }
}
