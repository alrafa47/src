<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Lokasi extends Base_model
{

    public function __construct()
    {
        parent::__construct(array(
            'table' => array(
                'name' => 'lokasi',
                'primary' => 'lokasi_id',
                'fields' => array(
                    array(
                        'name' => 'lokasi_id',
                        'display' => 'Id',
                        'update' => false,
                        'unique' => true,
                        'notnull' => true
                    ),
                    array(
                        'name' => 'lokasi_kode',
                        'display' => 'Kode Lokasi',
                        'notnull' => true,
                        'unique' => true
                    ),
                    array(
                        'name' => 'lokasi_nama',
                        'display' => 'Nama Lokasi',
                        'notnull' => true
                    ),
                    array(
                        'name' => 'lokasi_unit_id',
                        'display' => 'Unit',
                        'notnull' => true
                    ),
                    array(
                        'name' => 'lokasi_induk',
                        'display' => 'Induk Lokasi'
                    ),
                    array(
                        'name' => 'lokasi_isaktif',
                        'display' => 'Aktif'
                    ),
                    array(
                        'name' => 'lokasi_ishapus',
                        'display' => 'Hapus'
                    ),
                    array(
                        'name' => 'lokasi_properti',
                        'display' => 'Properti'
                    )
                ),
                'limit' => null,
            ),
            'auto_id' => true
        ));
    }
}
