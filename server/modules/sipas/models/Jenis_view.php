<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/jenis', true);

class Sipas_model_Jenis_view extends Sipas_model_Jenis
{

    public function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_jenis');
        $this->set_primary('jenis_id');
        $this->set_fields(array(
            array('insert' => false, 'update' => false, 'name' => 'jenis_id'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nama'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_kode'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_awal'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_unit_pembuat'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_unit_penyetuju'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_jabatan_pembuat'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_jabatan_penyetuju'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_tahun'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_jenis'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_kelas'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_model'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_sifat'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nomor_lokasi'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_isaktif'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_tipe'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_retensi'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_properti'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_format'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_formateks'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_formateksbackdate'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_formatint'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_formatintbackdate'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_digitint'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_digiteks'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_ishapus')
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
