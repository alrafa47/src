<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_rekap_by_model_view extends Base_model
{

    public function __construct()
    {
        parent::__construct();
        $this->set_table_name('v_r_rekap_surat_by_model');
        $this->set_primary('unit_id');
        $this->set_fields(array(
            array('insert' => false, 'update' => false, 'name' => 'unit_id'),
            array('insert' => false, 'update' => false, 'name' => 'unit_nama'),
            array('insert' => false, 'update' => false, 'name' => 'unit_kode'),
            array('insert' => false, 'update' => false, 'name' => 'unit_induk'),
            array('insert' => false, 'update' => false, 'name' => 'unit_induk_nama'),
            array('insert' => false, 'update' => false, 'name' => 'unit_parent_path'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_id'),
            array('insert' => false, 'update' => false, 'name' => 'jenis_nama'),
            array('insert' => false, 'update' => false, 'name' => 'surat_tanggal'),
            array('insert' => false, 'update' => false, 'name' => 'surat_model'),
            array('insert' => false, 'update' => false, 'name' => 'surat_model_sub'),
            array('insert' => false, 'update' => false, 'name' => 'surat_jenis_sub'),
            array('insert' => false, 'update' => false, 'name' => 'terdistribusi_count'),
            array('insert' => false, 'update' => false, 'name' => 'blm_distribusi_count'),
            array('insert' => false, 'update' => false, 'name' => 'onprocess_count'),
            array('insert' => false, 'update' => false, 'name' => 'setuju_count'),
            array('insert' => false, 'update' => false, 'name' => 'revisi_count'),
            array('insert' => false, 'update' => false, 'name' => 'tolak_count'),
            array('insert' => false, 'update' => false, 'name' => 'tercatat_count'),
            array('insert' => false, 'update' => false, 'name' => 'process_done_count'),
            array('insert' => false, 'update' => false, 'name' => 'proses')
        ));
    }
}
