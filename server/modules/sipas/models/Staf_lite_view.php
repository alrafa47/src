<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/staf', true);

class Sipas_model_Staf_lite_view extends Sipas_model_Staf { 
    public $field_nip = 'staf_kode';
    public $field_peran = 'staf_peran';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf_lite');
        $this->set_fields(array(
              array('name'=>'staf_id'),
              array('name'=>'staf_profil'),
              array('name'=>'staf_kode'),
              array('name'=>'staf_nama'),
              array('name'=>'staf_kelamin'),
              array('name'=>'staf_unit'),
              array('name'=>'staf_jabatan'),
              array('name'=>'staf_peran'),
              array('name'=>'staf_isaktif'),
              array('name'=>'staf_status'),
              array('name'=>'staf_akun'),
              array('name'=>'akun_id'),
              array('name'=>'akun_nama'),
              array('name'=>'jabatan_id'),
              array('name'=>'jabatan_induk'),
              array('name'=>'jabatan_kode'),
              array('name'=>'jabatan_nama'),
              array('name'=>'jabatan_isnomor'),
              array('name'=>'jabatan_ispenerima'),
              array('name'=>'unit_id'),
              array('name'=>'unit_kode'),
              array('name'=>'unit_nama')
        ), true);
    }

    function select($config = null, $fn = null)
    {
        $result = call_user_func_array('parent::select', func_get_args());

        if(is_array($result) and !empty($result['data']))
        {
            foreach ($result['data'] as $key => &$value)
            {
                $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['staf_id'];
            }
        }
        
        return $result;
    } 
}