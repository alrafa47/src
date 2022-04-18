<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/jabatan_aktual', true);

class Sipas_model_Jabatan_aktual_view extends Sipas_model_jabatan_aktual {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_jabatan_aktual');
        $this->set_fields(array(
            array('name' => 'jabatan_aktual_pengirim_id',              'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_kode',            'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_nama',            'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_unit',            'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_unit_kode',       'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_unit_nama',       'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_jabatan_isnomor', 'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_jabatan_ispenerima', 'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim_isaktif',         'update' => false, 'insert' => false),

            array('name' => 'jabatan_id',            'map' => 'jabatan_aktual_penerima_id',                   'update' => false, 'insert' => false),
            array('name' => 'jabatan_kode',          'map' => 'jabatan_aktual_penerima_kode',                 'update' => false, 'insert' => false),
            array('name' => 'jabatan_nama',          'map' => 'jabatan_aktual_penerima_nama',                 'update' => false, 'insert' => false),
            array('name' => 'unit_id',            'map' => 'jabatan_aktual_penerima_unit',                 'update' => false, 'insert' => false),
            array('name' => 'unit_kode',          'map' => 'jabatan_aktual_penerima_unit_kode',            'update' => false, 'insert' => false),
            array('name' => 'unit_nama',          'map' => 'jabatan_aktual_penerima_unit_nama',            'update' => false, 'insert' => false),
            array('name' => 'jabatan_isnomor',    'map' => 'jabatan_aktual_penerima_jabatan_isnomor',      'update' => false, 'insert' => false),
            array('name' => 'jabatan_ispenerima', 'map' => 'jabatan_aktual_penerima_jabatan_ispenerima',   'update' => false, 'insert' => false),
            array('name' => 'jabatan_isaktif',       'map' => 'jabatan_aktual_penerima_isaktif',              'update' => false, 'insert' => false),

            array('name' => 'jabatan_aktual_id',           'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_penerima',     'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_pengirim',     'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_tgl',          'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_tipe',         'update' => false, 'insert' => false),
            array('name' => 'jabatan_aktual_properti',     'update' => false, 'insert' => false)
        ), true);
    }
}