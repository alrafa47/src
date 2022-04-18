<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_unit_view extends Sipas_model_unit 
{
    function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_unit');
        $this->set_primary('unit_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_rubrik'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_pos_code'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_manager'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_induk'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_parent_path'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_staf_jumlah'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_induk_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_induk_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'unit_isbuatsurat'),
            array('insert'=>false, 'update'=>false, 'name'=>'manager_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'manager_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'manager_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'manager_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'manager_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'manager_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'manager_jabatan_nama'),
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