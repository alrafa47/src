<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_masuk_log', true);

class Sipas_model_Disposisi_masuk_log_view extends Sipas_model_Disposisi_masuk_log {
    
    public $table = 'v_disposisi_masuk_log';

    static $field_isbaca = 'disposisi_masuk_isbaca';
    static $field_isterus = 'disposisi_masuk_isterus';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_masuk_log');
        $this->set_primary('disposisi_masuk_log_id');
        $this->set_fields(array(
            array('name' => 'disposisi_masuk_log_id'),
            array('name' => 'disposisi_masuk_log_staf'),
            array('name' => 'disposisi_masuk_log_profil'),
            array('name' => 'disposisi_masuk_log_masuk'),
            array('name' => 'disposisi_masuk_log_status'),
            array('name' => 'disposisi_masuk_log_berkas_status'),
            array('name' => 'disposisi_masuk_log_aksi'),
            array('name' => 'disposisi_masuk_log_pesan'),
            array('name' => 'disposisi_masuk_log_tgl'),
            array('name' => 'disposisi_masuk_log_isbaca'),
            array('name' => 'disposisi_masuk_log_isberkasterima'),
            array('name' => 'disposisi_masuk_log_isterus'),
            array('name' => 'disposisi_masuk_log_iscabut'),
            array('name' => 'disposisi_masuk_log_isaksi'),
            array('name' => 'disposisi_masuk_log_tipe'),
            array('name' => 'disposisi_masuk_log_tgl'),
            array('name' => 'disposisi_masuk_id'),
            array('name' => 'disposisi_masuk_disposisi'),
            array('name' => 'disposisi_masuk_staf'),
            array('name' => 'disposisi_masuk_profil'),
            array('name' => 'disposisi_masuk_istembusan'),
            array('name' => 'disposisi_masuk_isberkas'),
            array('name' => 'disposisi_masuk_nomor'),
            array('name' => 'disposisi_masuk_pesan'),
            array('name' => 'disposisi_masuk_terima_tgl'),
            array('name' => 'disposisi_masuk_terima_staf'),
            array('name' => 'disposisi_masuk_terima_profil'),
            array('name' => 'disposisi_masuk_baca_tgl'),
            array('name' => 'disposisi_masuk_baca_staf'),
            array('name' => 'disposisi_masuk_baca_profil'),
            array('name' => 'disposisi_masuk_berkasterima_tgl'),
            array('name' => 'disposisi_masuk_berkasterima_staf'),
            array('name' => 'disposisi_masuk_berkasterima_profil'),
            array('name' => 'disposisi_masuk_terus_tgl'),
            array('name' => 'disposisi_masuk_terus_staf'),
            array('name' => 'disposisi_masuk_terus_profil'),
            array('name' => 'disposisi_masuk_cabut_tgl'),
            array('name' => 'disposisi_masuk_cabut_staf'),
            array('name' => 'disposisi_masuk_cabut_profil'),
            array('name' => 'disposisi_masuk_pulih_tgl'),
            array('name' => 'disposisi_masuk_pulih_staf'),
            array('name' => 'disposisi_masuk_pulih_profil'),
            array('name' => 'disposisi_masuk_status'),
            array('name' => 'disposisi_masuk_status_tgl'),
            array('name' => 'disposisi_masuk_status_staf'),
            array('name' => 'disposisi_masuk_status_profil'),
            array('name' => 'disposisi_masuk_aksi'),
            array('name' => 'disposisi_masuk_aksi_tgl'),
            array('name' => 'disposisi_masuk_aksi_staf'),
            array('name' => 'disposisi_masuk_aksi_profil'),
            array('name' => 'disposisi_masuk_induk_baca_tgl'),
            array('name' => 'disposisi_masuk_induk_baca_staf'),
            array('name' => 'disposisi_masuk_induk_baca_profil'),
            array('name' => 'disposisi_masuk_properti'),
            array('name' => 'staf_id'),
            array('name' => 'staf_nama'),
            array('name' => 'staf_isaktif'),
            array('name' => 'unit_nama'),
            array('name' => 'jabatan_nama'),
            array('name' => 'aksi_id'),
            array('name' => 'aksi_kode'),
            array('name' => 'aksi_nama')
        ));
    }
    function select($config = NULL, $fn = NULL){
        $records = call_user_func_array("parent::select", func_get_args());
        $query = $this->get_lastquery();

        if(is_array($records) and !empty($records['data']))
        {
            foreach ($records['data'] as $key => &$value)
            {
                $value['disposisi_masuk_log_staf_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['disposisi_masuk_log_staf'];
            }
        }

        $this->set_lastquery($query);
        return $records;
    }

}