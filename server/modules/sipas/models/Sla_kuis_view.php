<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sla_kuis_view extends Sipas_model_Sla_kuis {
    
    function __construct(){
        parent::__construct();
        $this->set_table_name('v_sla_kuis');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_ujian'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_sla'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_nilai'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_buat_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pembuat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pembuat_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pembuat_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pembuat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pembuat_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pembuat_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pembuat_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_isubah'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_ubah_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pengubah_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pengubah_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pengubah_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pengubah_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pengubah_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pengubah_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pengubah_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_ishapus'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_hapus_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_penghapus_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_penghapus_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_penghapus_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_penghapus_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_penghapus_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_penghapus_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_penghapus_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_ispulih'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pulih_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pemulih_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pemulih_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pemulih_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pemulih_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pemulih_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pemulih_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_pemulih_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kuis_properti_data'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_result'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_unitpenerima'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_unitpengirim'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_setuju_status'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_setuju_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_setuju_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_ujian_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti')
        ));
    }

}