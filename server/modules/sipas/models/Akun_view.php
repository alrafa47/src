<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* 
*/
class Sipas_model_Akun_view extends sipas_model_Akun
{
    function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_akun');
        $this->set_fields(array(
            array('name' => 'akun_id',          'display' => 'Id User',             'update' => false, 'insert'=>false),
            array('name' => 'akun_nama',        'display' => 'Username',            'update' => false, 'insert'=>false),
            array('name' => 'akun_staf_jumlah', 'display' => 'Jumlah staf',         'update' => false, 'insert'=>false),
            array('name' => 'akun_sandi',       'display' => 'Password',            'update' => false, 'insert'=>false),
            array('name' => 'akun_ponsel',      'display' => 'Phone',               'update' => false, 'insert'=>false),
            array('name' => 'akun_surel',       'display' => 'Email',               'update' => false, 'insert'=>false),
            array('name' => 'akun_lastmasuk',   'display' => 'Aktifitas Terakhir',  'update' => false, 'insert'=>false),
            array('name' => 'akun_isaktif',     'display' => 'User Aktif',          'update' => false, 'insert'=>false),
        ));
    }
}