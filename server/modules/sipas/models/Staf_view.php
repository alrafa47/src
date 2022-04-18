<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/staf', true);

class Sipas_model_Staf_view extends Sipas_model_Staf {

    public $field_nip = 'staf_kode';
    public $field_peran = 'staf_peran';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf');
        $this->set_fields(array(
              array('name' => 'staf_id'),
              array('name' => 'staf_profil'),
              array('name' => 'staf_kode'),
              array('name' => 'staf_nama'),
              array('name' => 'staf_peran'),
              array('name' => 'staf_kelamin'),
              array('name' => 'staf_unit'),
              array('name' => 'staf_jabatan'),
              array('name' => 'staf_golongan'),
              array('name' => 'staf_sgt'),
              array('name' => 'staf_akun'),
              array('name' => 'staf_akun_isdefault'),
              array('name' => 'staf_wakil_jumlah'),
              array('name' => 'staf_atasan_jumlah'),
              array('name' => 'staf_pgs_jumlah'),
              array('name' => 'staf_kelompok_jumlah'),
              array('name' => 'staf_jabatan_unit_jumlah'),
              array('name' => 'staf_properti'),
              array('name' => 'staf_status'),
              array('name' => 'staf_isaktif'),
              array('name' => 'staf_ishapus'),
              array('name' => 'jabatan_id'),
              array('name' => 'jabatan_nama'),
              array('name' => 'jabatan_isaktif'),
              array('name' => 'jabatan_isnomor'),
              array('name' => 'jabatan_ispenerima'),
              array('name' => 'jabatan_kode'),
              array('name' => 'jabatan_pos_code'),
              array('name' => 'jabatan_unit'),
              array('name' => 'jabatan_induk'),
              array('name' => 'jabatan_properti'),
             // array('name' => 'jabatan_asisten_jumlah'),
             // array('name' => 'jabatan_atasan_jumlah'),
              array('name' => 'golongan_id'),
              array('name' => 'golongan_level'),
              array('name' => 'unit_id'),
              array('name' => 'unit_nama'),
              array('name' => 'unit_kode'),
              array('name' => 'unit_rubrik'),
              array('name' => 'unit_pos_code'),
              array('name' => 'unit_isaktif'),
              array('name' => 'unit_manager'),
              array('name' => 'unit_induk'),
              array('name' => 'unit_properti'),
              array('name' => 'unit_isbuatsurat'),
              array('name' => 'akun_id'),
              array('name' => 'akun_nama'),
              array('name' => 'akun_staf'),
              array('name' => 'akun_sandi'),
              array('name' => 'akun_garam'),
              array('name' => 'akun_ponsel'),
              array('name' => 'akun_lastmasuk'),
              array('name' => 'akun_surel'),
              array('name' => 'akun_isaktif'),
              array('name' => 'akun_properti'),
              array('name' => 'peran_id'),
              array('name' => 'peran_nama'),
              array('name' => 'peran_isaktif'),
              array('name' => 'peran_properti')
        ), true);
    }

    function select($config = null, $fn = null){
        $result = call_user_func_array('parent::select', func_get_args());

        if(is_array($result) and !empty($result['data'])){
            foreach ($result['data'] as $key => &$value){
                $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['staf_id'];
            }
        }
        
        return $result;
    } 
}