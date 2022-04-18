<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_bebas_view extends Sipas_model_Surat_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_bebas');
        $this->set_primary('surat_id');
    }

    function generate_code($tipe = null,$scope = null,$index = false){
        $CI = get_instance();
        $this->load->library('parser');

        $scopeModel = $CI->model('sipas/unit_cakupan', true);
        $unit = $CI->model('sipas/unit', true);
        $setting = $CI->model('sipas/pengaturan', true);
        $tipeInternal = $CI->model('sipas/itipe', true);
        
        /*set unit*/
        $dep = $unit->read($scope);
        $pattern = $setting->getSettingByCode('template_nomor_surat_internal');
        
        /*set tipe dynamic surat internal*/
        $data = $tipeInternal->getCompiledTipe($tipe);
        $formatPat = $this->parser->parse_string($pattern, $data);

        if($dep){
            /*replace unit*/
            $dep['kode_unit'] = $dep['unit_kode'];
            $dep['nama_unit'] = $dep['unit_nama'];
            $dep['rubrik_unit'] = $dep['unit_rubrik'];
            $set = array_merge($setting->getCompiledDataTemplate(), $dep);
        }else{
            $set = $setting->getCompiledDataTemplate();
        }

        /*finally check - set nomor*/
        $formatPattern = $this->parser->parse_string($formatPat, $set);

        $checkYear = $setting->getSettingByCode('template_index_surat_internal_pertahun');
        if($checkYear) $change = 'year';
        else $change = 'month';

        $next = parent::generate_code(array(
            'pattern'       => $formatPattern,
            'date_format'   => 'Ym',
            'field'         => $this->field_code,
            'index_format'  => '0000',
            'index_date'    => $this->field_create_date,
            'index_change'  => $change,
            'index_custom'  => null,
            'index_mask'    => $index,
            'index_int'     => true
        ));
        return $next;
    }

    function select($config = NULL, $fn = NULL){
        $records = call_user_func_array("parent::select", func_get_args());
        $records['lastquery'] = $this->get_lastquery();
        return $records;
    }
}