<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* 
*/

$ci =& get_instance();
$ci->model('sipas/alat',true);

class Sipas_model_Alat_view extends Sipas_model_Alat
{
    function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_alat');
        $this->set_fields(array(
            array('name' => 'akun_id',          'display' => 'Id User',             'update' => false, 'insert'=>false),
            array('name' => 'akun_nama',        'display' => 'Username',            'update' => false, 'insert'=>false),
            array('name' => 'akun_sandi',    'display' => 'Password',            'update' => false, 'insert'=>false),
            array('name' => 'akun_ponsel',        'display' => 'Phone',           'update' => false, 'insert'=>false),
            array('name' => 'akun_surel',       'display' => 'Email',               'update' => false, 'insert'=>false),
            array('name' => 'akun_lastmasuk',   'display' => 'Aktifitas Terakhir',  'update' => false, 'insert'=>false),
            array('name' => 'akun_isaktif',    'display' => 'User Aktif',          'update' => false, 'insert'=>false),
        ));
    }
}