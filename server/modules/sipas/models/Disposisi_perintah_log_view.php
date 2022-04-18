<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_perintah_log', true);

class Sipas_model_Disposisi_perintah_log_view extends Sipas_model_Disposisi_perintah_log {
    
    public $table = 'v_disposisi_perintah_log';

    // static $field_isbaca = 'disposisi_masuk_isbaca';
    // static $field_isterus = 'disposisi_masuk_isterus';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_perintah_log');
        $this->set_primary('disposisi_perintah_log_id');
        $this->set_fields(array(
            array('name' => 'disposisi_perintah_log_id'),
            array('name' => 'disposisi_perintah_log_disposisi'),
            array('name' => 'disposisi_perintah_log_perintah'),
            array('name' => 'disposisi_perintah_log_pesan'),
            array('name' => 'disposisi_perintah_log_staf'),
            array('name' => 'disposisi_perintah_log_tgl'),
            array('name' => 'perintah_id'),
            array('name' => 'perintah_kode'),
            array('name' => 'perintah_nama'),
            array('name' => 'staf_id'),
            array('name' => 'staf_nama'),
            array('name' => 'staf_isaktif'),
            array('name' => 'unit_nama'),
            array('name' => 'jabatan_nama')
        ));
    }
}