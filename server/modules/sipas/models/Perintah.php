<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Perintah extends Base_model
{
    public function __construct()
    {
        parent::__construct(array(
            'table' => array(
                'name' => 'perintah',
                'primary' => 'perintah_id',
                'fields' => array(
                    array(
                        'name' => 'perintah_id',
                        'display' => 'Id',
                        'update' => false,
                        'unique' => true,
                        'notnull' => true
                    ),
                    array(
                        'name' => 'perintah_nama',
                        'display' => 'Perintah Disposisi',
                        'notnull' => true
                    ),
                    array(
                        'name' => 'perintah_kode',
                        'display' => 'Kode',
                        // 'unique'=>true,
                        // 'notnull'=>true
                    ),
                    array(
                        'name' => 'perintah_isaktif',
                        'display' => 'Aktif'
                    ),
                    array(
                        'name' => 'perintah_ishapus',
                        'display' => 'hapus'
                    ),
                    array(
                        'name' => 'perintah_properti',
                        'display' => 'Properti'
                    ),
                    array(
                        'name' => 'perintah_level',
                        'display' => 'level'
                    )
                ),
                'limit' => null,
            ),
            'auto_id' => true
        ));
    }
}
