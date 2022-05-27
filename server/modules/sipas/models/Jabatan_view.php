<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jabatan_view extends Sipas_model_Jabatan
{

    function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_jabatan');
        $this->set_fields(array(
            array(
                'name' => 'jabatan_id',
                'display' => 'Id Jabatan',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_kode',
                'display' => 'Kode Jabatan',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_pos_code',
                'display' => 'Jabatan Pos Code',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_nama',
                'display' => 'Nama Jabatan',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_parent_path',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_induk',
                'display' => 'Induk Jabatan',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_induk_id',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_induk_nama',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_unit',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'unit_id',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'unit_kode',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'unit_nama',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_isaktif',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_isnomor',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_ispenerima',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_unit_jumlah',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_staf_jumlah',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_properti',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'jabatan_ishapus',
                'update' => false,
                'insert' => false
            ),
            array(
                'name' => 'unit_parent_path',
                'update' => false,
                'insert' => false
            ),
            // array(
            //     'name'=>'jabatan_asisten_jumlah',
            //     'update'=>false,
            //     'insert'=>false
            // ),
            // array(
            //     'name'=>'jabatan_atasan_jumlah',
            //     'update'=>false,
            //     'insert'=>false
            // )
        ));
    }
}
