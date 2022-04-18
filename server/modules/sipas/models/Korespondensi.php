<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Korespondensi extends Base_model {

    public $field_code = 'korespondensi_nomor';

    function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'korespondensi',
                'primary'=>'korespondensi_id',
                'fields'=> array(
                    array('name'=>'korespondensi_id', 'display'=>'Id', 'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name'=>'korespondensi_nomor','display'=>'Kode'),
                    array('name'=>'korespondensi_perihal','display'=>'Perihal'),
                    array('name'=>'korespondensi_pengirim','display'=>'Pengirim'),
                    array('name'=>'korespondensi_penerima','display'=>'Penerima'),
                    array('name'=>'korespondensi_unitpengirim','display'=>'Pengirim'),
                    array('name'=>'korespondensi_unitpenerima','display'=>'Penerima'),
                    array('name'=>'korespondensi_isinternal','display'=>'Perihal'),
                    array('name'=>'korespondensi_properti','display'=>'Instansi')
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }

    function insert($id = null, $data = null, $fn = null){
        if(is_null($data)){
            $data = $id;
            $id = null;
        }
        if(is_array($data) and array_key_exists($this->field_code, $data) and empty($data[$this->field_code])){
            $data[$this->field_code] = $this->generate_code();
        }

        $data[$this->field_code] = $this->generate_code();

        return parent::insert($id, $data, $fn);
    }

    function generate_code($index = false){
        $CI = get_instance();
        $this->load->library('parser');

        $setting = $CI->model('sipas/pengaturan', true);
        $pattern = $setting->getSettingByCode('template_nomor_korespondensi');

        $formatPattern = $this->parser->parse_string($pattern, $setting->getCompiledDataTemplate());

        $next = parent::generate_code(array(
            'pattern'       =>$formatPattern,
            'date_format'   =>'Ym',
            'field'         =>$this->field_code,
            'index_format'  =>'00000',
            'index_mask'    => $index
        ));
        return $next;
    }
}