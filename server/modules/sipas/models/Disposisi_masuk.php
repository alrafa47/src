<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Disposisi_masuk extends Base_model
{

    static $use_readinfo_on_read            = false;

    static $field_readinfo                  = 'readInfo';
    static $field_readinfo_init             = 'init';
    static $field_readinfo_read             = 'read';
    static $field_readinfo_forward          = 'forward';
    static $field_count_disposisi_retract   = 'retract';
    static $field_readinfo_total            = 'total';

    static $field_code                      = 'disposisi_masuk_nomor';
    static $field_receiver_id               = 'disposisi_masuk_staf';
    static $field_receiver_jabatan_id       = 'disposisi_masuk_jabatan';
    static $field_aksi                      = 'disposisi_masuk_aksi';

    const TEMBUSAN_INIT = 0;
    const TEMBUSAN_TEMBUSAN = 1;

    const BERKAS_INIT = 0;
    const BERKAS_BERKAS = 1;

    const TERIMA_INIT = 0;
    const TERIMA_TERIMA = 1;

    const BACA_INIT = 0;
    const BACA_BACA = 1;

    const FORWARD_INIT = 0;
    const FORWARD_FORWARDED = 1;

    const BERKAS_PROCESS = 1;
    const BERKAS_APPROVE = 2;
    const BERKAS_CANCEL = 3;
    const BERKAS_DECLINE = 4;

    public function __construct()
    {
        parent::__construct(array(
            'table' => array(
                'name' => 'disposisi_masuk',
                'primary' => 'disposisi_masuk_id',
                'fields' => array(
                    array('name' => 'disposisi_masuk_id', 'update' => false, 'unique' => true, 'notnull' => true),
                    array('name' => 'disposisi_masuk_disposisi'),
                    array('name' => 'disposisi_masuk_staf'),
                    array('name' => 'disposisi_masuk_profil'),
                    array('name' => 'disposisi_masuk_jabatan'),
                    array('name' => 'disposisi_masuk_parent_path'),
                    array('name' => 'disposisi_masuk_istembusan'),
                    array('name' => 'disposisi_masuk_isberkas'),
                    array('name' => 'disposisi_masuk_nomor'),
                    array('name' => 'disposisi_masuk_pesan'),
                    array('name' => 'disposisi_masuk_terima_tgl'),
                    array('name' => 'disposisi_masuk_terima_staf'),
                    array('name' => 'disposisi_masuk_terima_profil'),
                    array('name' => 'disposisi_masuk_terima_jabatan'),
                    array('name' => 'disposisi_masuk_baca_tgl'),
                    array('name' => 'disposisi_masuk_baca_staf'),
                    array('name' => 'disposisi_masuk_baca_profil'),
                    array('name' => 'disposisi_masuk_berkasterima_tgl'),
                    array('name' => 'disposisi_masuk_berkasterima_staf'),
                    array('name' => 'disposisi_masuk_berkasterima_profil'),
                    array('name' => 'disposisi_masuk_berkas_status'),
                    array('name' => 'disposisi_masuk_berkas_status_staf'),
                    array('name' => 'disposisi_masuk_berkas_status_profil'),
                    array('name' => 'disposisi_masuk_berkas_status_tgl'),
                    array('name' => 'disposisi_masuk_berkas_komentar'),
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
                    array('name' => 'disposisi_masuk_aksi_baca_tgl'),
                    array('name' => 'disposisi_masuk_aksi_baca_staf'),
                    array('name' => 'disposisi_masuk_aksi_baca_profil'),
                    array('name' => 'disposisi_masuk_induk_baca_tgl'),
                    array('name' => 'disposisi_masuk_induk_baca_staf'),
                    array('name' => 'disposisi_masuk_induk_baca_profil'),
                    array('name' => 'disposisi_masuk_properti'),
                    array('name' => 'disposisi_masuk_koreksi_status'),
                    array('name' => 'disposisi_masuk_ispengingat'),
                    array('name' => 'disposisi_masuk_pengingat_staf'),
                    array('name' => 'disposisi_masuk_pengingat_profil'),
                    array('name' => 'disposisi_masuk_pengingat_tgl')
                ),
                'limit' => null,
            ),
            'auto_id' => true
        ));
    }

    function insert($id = null, $data = null, $fn = null)
    {
        if (is_null($data)) {
            $data = $id;
            $id = null;
        }
        if (is_array($data) and !array_key_exists($this::$field_code, $data)) {
            $data[$this::$field_code] = $this->generate_code();
        }
        return parent::insert($id, $data, $fn);
    }

    function generate_code($index = false)
    {
        return parent::generate_code(array(
            'pattern'       => 'DIS.R.{date}.{#}',
            'date_format'   => 'Ym',
            'field'         => $this::$field_code,
            'index_format'  => '0000',
            'index_mask'    => $index
        ));
    }
}
