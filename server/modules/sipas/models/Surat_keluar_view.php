<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_keluar_view extends Sipas_model_Surat_view {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_surat_keluar');
        $this->set_primary('surat_id');
    }

    function insert($id = null, $data = null, $fn = null){
        if(is_null($data)){
            $data = $id;
            $id = null;
        }
        if(is_array($data) and array_key_exists($this::$field_code, $data)){
            $data[$this::$field_code] = $this->generate_code();
        }
        return parent::insert($id, $data, $fn);
    }

    // function getAgenda($type = null){
    //     $agenda = $this->max('surat_agenda', array(
    //         'surat_agenda <>'=>null,
    //         'YEAR(surat_tanggal) = "'.date('Y').'"' => null)) + 1;
    //     return $agenda;
    // }

    function generate_code($index = false, $kelas = null, $nomor = null, $kla = []){
        $CI = get_instance();
        $this->load->library('parser');

        $setting = $CI->model('sipas/pengaturan', true);

        $pattern = $setting->getSettingByCode('template_nomor_surat_keluar');
        $checkYear = $setting->getSettingByCode('template_index_surat_keluar_pertahun');
        $legend = $setting->getCompiledDataTemplate();

        $formatPattern = $this->parser->parse_string($pattern, $legend);
        echo "<pre>";
        var_dump($formatPattern);
        die();
            if($checkYear) $change = 'year';
            else $change = 'month';

            $next = parent::generate_code(array(
                'pattern'       => $formatPattern,
                'date_format'   => 'Ym',
                'field'         => $this::$field_code,
                'index_format'  => '000',
                'index_date'    => $this::$field_create_date,
                'index_change'  => $change
            ));
        return $next;
    }
}