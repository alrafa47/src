<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/staf_tim_anggota', true);

class Sipas_model_Staf_tim_anggota_view extends Sipas_model_Staf_tim {

    public $field_nip = 'staf_tim_anggota_staf';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf_tim_anggota');
        $this->set_fields(array(
            array(
                'name'=>'staf_tim_id',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_tim_nama',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_tim_anggota_id',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_tim_anggota_staf',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_tim_anggota_tim',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_tim_anggota_properti',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_id',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_nama',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_kode',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_profil',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_jabatan',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_jabatan_nama',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_jabatan_isnomor',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_jabatan_ispenerima',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_unit',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'anggota_unit_nama',
                'update'=>false, 'insert'=>false
            )
        ), true);
    }
}