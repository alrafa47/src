<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/properti', true);

class Sipas_model_Properti_view extends Sipas_model_Properti {
      
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_properti');
        $this->set_primary('properti_id');
        $this->set_fields(array(
            array('name'=> 'properti_id'),
            array('name'=> 'properti_buat_tgl'),
            array('name'=> 'properti_buat_staf'),
            array('name'=> 'properti_buat_data',
                'convert'=>function($value){
                    return htmlspecialchars_decode($value);
                }),
            array('name'=> 'properti_ubah_tgl'),
            array('name'=> 'properti_ubah_staf'),
            array('name'=> 'properti_ubah_data',
                'convert'=>function($value){
                    return htmlspecialchars_decode($value);
                }),
            array('name'=> 'properti_hapus_tgl'),
            array('name'=> 'properti_hapus_staf'),
            array('name'=> 'properti_hapus_data',
                'convert'=>function($value){
                    return htmlspecialchars_decode($value);
                }),
            array('name'=> 'properti_pulih_tgl'),
            array('name'=> 'properti_pulih_staf'),
            array('name'=> 'properti_pulih_data',
                'convert'=>function($value){
                    return htmlspecialchars_decode($value);
                }),
            array('name'=> 'properti_data',
                'convert'=>function($value){
                    return htmlspecialchars_decode($value);
                }),
            array('name'=> 'properti_entitas'),
            array('name'=> 'properti_entitas_id'),
	    array('name'=> 'properti_iseksekusi'),
            array('name'=> 'properti_slug'),
            array('name'=> 'properti_isubah'),
            array('name'=> 'properti_ishapus'),
            array('name'=> 'properti_ispulih'),
            array('name'=> 'properti_pembuat_id'),
            array('name'=> 'properti_pembuat_kode'),
            array('name'=> 'properti_pembuat_nama'),
            array('name'=> 'properti_pembuat_unit'),
            array('name'=> 'properti_pembuat_unit_nama'),
            array('name'=> 'properti_pembuat_jabatan'),
            array('name'=> 'properti_pembuat_jabatan_nama'),
            array('name'=> 'properti_pengubah_id'),
            array('name'=> 'properti_pengubah_kode'),
            array('name'=> 'properti_pengubah_nama'),
            array('name'=> 'properti_pengubah_unit'),
            array('name'=> 'properti_pengubah_unit_nama'),
            array('name'=> 'properti_pengubah_jabatan'),
            array('name'=> 'properti_pengubah_jabatan_nama'),
            array('name'=> 'properti_penghapus_id'),
            array('name'=> 'properti_penghapus_kode'),
            array('name'=> 'properti_penghapus_nama'),
            array('name'=> 'properti_penghapus_unit'),
            array('name'=> 'properti_penghapus_unit_nama'),
            array('name'=> 'properti_penghapus_jabatan'),
            array('name'=> 'properti_penghapus_jabatan_nama'),
            array('name'=> 'properti_pemulih_id'),
            array('name'=> 'properti_pemulih_kode'),
            array('name'=> 'properti_pemulih_nama'),
            array('name'=> 'properti_pemulih_unit'),
            array('name'=> 'properti_pemulih_unit_nama'),
            array('name'=> 'properti_pemulih_jabatan'),
            array('name'=> 'properti_pemulih_jabatan_nama'),
        ));
    }
}