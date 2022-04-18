<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->get_model('sipas/unit_cakupan', true);

class Sipas_model_Unit_cakupan_hidup_view extends Sipas_model_Unit_cakupan {
    
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_unit_cakupan_hidup');
        $this->set_fields(array(
            array('name'=>'unit_cakupan_id', 'display'=> 'ID', 'update' => false, 'insert' => false),
            array('name'=>'unit_cakupan_unit', 'display'=> 'Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_cakupan_jabatan', 'display'=> 'Jabatan', 'update' => false, 'insert' => false),
            array('name'=>'jabatan_id', 'display'=> 'ID Jabatan', 'update' => false, 'insert' => false),
            array('name'=>'jabatan_nama', 'display'=> 'Nama Jabatan', 'update' => false, 'insert' => false),
            array('name'=>'jabatan_kode', 'display'=> 'Kode Jabatan', 'update' => false, 'insert' => false),
            array('name'=>'jabatan_unit', 'display'=> 'Unit Jabatan', 'update' => false, 'insert' => false),
            array('name'=>'jabatan_induk', 'display'=> 'Induk Jabatan', 'update' => false, 'insert' => false),
            array('name'=>'jabatan_properti', 'display'=> 'Properti Jabatan', 'update' => false, 'insert' => false),
            array('name'=>'unit_id', 'display'=> 'ID Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_nama', 'display'=> 'Nama Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_kode', 'display'=> 'Kode Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_rubrik', 'display'=> 'Rubrik Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_manager', 'display'=> 'Manager Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_induk', 'display'=> 'Induk Unit', 'update' => false, 'insert' => false),
            array('name'=>'unit_properti', 'display'=> 'Properti Induk', 'update' => false, 'insert' => false),
            array('name'=>'unit_isbuatsurat', 'display'=> 'Unit Buat', 'update' => false, 'insert' => false)
        ), true);
        return $this; 
    }
}