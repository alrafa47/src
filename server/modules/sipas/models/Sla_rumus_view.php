<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sla_rumus_view extends Sipas_model_Sla_rumus {
    
    function __construct(){
        parent::__construct();
        $this->set_table_name('v_sla_rumus');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_sla'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_formula'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_nilai'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_index'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_buat_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pembuat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pembuat_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pembuat_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pembuat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pembuat_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pembuat_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pembuat_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_isubah'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_ubah_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pengubah_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pengubah_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pengubah_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pengubah_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pengubah_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pengubah_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pengubah_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_ishapus'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_hapus_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_penghapus_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_penghapus_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_penghapus_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_penghapus_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_penghapus_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_penghapus_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_penghapus_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_ispulih'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pulih_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pemulih_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pemulih_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pemulih_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pemulih_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pemulih_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pemulih_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_pemulih_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_rumus_properti_data'),
        ));
    }

}