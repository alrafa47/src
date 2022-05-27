<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Lokasi_view extends Sipas_model_Lokasi
{

    public function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_lokasi');
        $this->set_primary('lokasi_id');
        $this->set_fields(array(
            array('insert' => false, 'update' => false, 'name' => 'lokasi_id'),
            array('insert' => false, 'update' => false, 'name' => 'lokasi_nama'),
            array('insert' => false, 'update' => false, 'name' => 'lokasi_kode'),
            array('insert' => false, 'update' => false, 'name' => 'lokasi_isaktif'),
            array('insert' => false, 'update' => false, 'name' => 'lokasi_properti'),
            array('insert' => false, 'update' => false, 'name' => 'lokasi_unit_id'),
            array('insert' => false, 'update' => false, 'name' => 'lokasi_unit_nama'),
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
