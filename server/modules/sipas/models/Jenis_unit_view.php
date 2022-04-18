<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/jenis_unit', true);

class Sipas_model_Jenis_unit_view extends Sipas_model_Jenis_unit {
    
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jenis_unit');
        $this->set_fields(array(
            array('name'=>'jenis_id', 'display'=> 'ID Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_nama', 'display'=> 'Nama Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_kode', 'display'=> 'Kode Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_ttd', 'display'=> 'ttd', 'update' => false, 'insert' => false),
            array('name'=>'jenis_batasibackdate', 'display'=> 'Kode Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_batasipenerima', 'display'=> 'Kode Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_tampil_sk', 'display'=> 'Kode Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_tampil_si', 'display'=> 'Kode Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_tampil_sik', 'display'=> 'Kode Jenis', 'update' => false, 'insert' => false),
            array('name'=>'unit_id', 'dismlay'=> 'ID Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_nama', 'display'=> 'Nama Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_kode', 'display'=> 'Kode Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_rubrik', 'display'=> 'Rubrik Unit', 'update' => false, 'insert' => false),
            array('name'=>'jenis_unit_id', 'display'=> 'ID', 'update' => false, 'insert' => false),
            array('name'=>'jenis_unit_jenis', 'display'=> 'Jenis', 'update' => false, 'insert' => false),
            array('name'=>'jenis_unit_unit', 'display'=> 'Unit', 'update' => false, 'insert' => false)
        ), true);
        return $this; 
    }
}