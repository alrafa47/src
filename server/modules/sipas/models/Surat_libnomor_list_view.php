<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_libnomor_list_view extends Sipas_model_Surat_libnomor {
    
    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_libnomor_list');
        $this->set_fields(array(
                    array('name'=>'surat_libnomor_id',                  'update'=>false, 'insert'=>false),
                    array('name'=>'surat_libnomor_model',               'update'=>false, 'insert'=>false),
                    array('name'=>'surat_libnomor_tahun',               'update'=>false, 'insert'=>false),
                    array('name'=>'surat_libnomor_unit_pembuat',        'update'=>false, 'insert'=>false),
                    array('name'=>'surat_libnomor_jenis',               'update'=>false, 'insert'=>false),
                    array('name'=>'surat_libnomor_booking',             'update'=>false, 'insert'=>false),
                    array('name'=>'surat_libnomor_value',               'update'=>false, 'insert'=>false),
                    array('name'=>'surat_libnomor_last_generated',      'update'=>false, 'insert'=>false),
                    array('name'=>'unit_pembuat_nama',                  'update'=>false, 'insert'=>false),
                    array('name'=>'jenis_nama',                         'update'=>false, 'insert'=>false)
            )
        );
    }
}