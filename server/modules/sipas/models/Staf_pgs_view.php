<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->get_model('sipas/staf_wakil', true);

class Sipas_model_Staf_pgs_view extends Sipas_model_Staf_wakil {
    
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf_pgs');
        $this->set_fields(array(
            array(
                'name'=>'staf_wakil_id',
                'display'=>'Id',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_staf',
                'display'=>'Manager',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_asisten',
                'display'=>'Asisten',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_konfirmasi_asisten',
                'display'=>'Asisten',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_konfirmasi_asisten_status',
                'display'=>'Asisten',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_konfirmasi_asisten_tgl',
                'display'=>'Asisten',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_plt',
                'display'=>'PLT',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_tgl_mulai',
                'display'=>'Mulai',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_tgl_selesai',
                'display'=>'Selesai',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_asisten_nama',
                'display'=>'Nama',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_asisten_jabatan_nama',
                'display'=>'Jabatan',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_asisten_unit_nama',
                'display'=>'unit',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'staf_wakil_properti',
                'display'=>'properti',
                'update'=>false, 'insert'=>false
            ),
            array('name'=>'staf_id', 'update'=>false, 'insert'=>false),
            array('name'=>'staf_kode', 'update'=>false, 'insert'=>false),
            array('name'=>'staf_nama', 'update'=>false, 'insert'=>false),
            array('name'=>'jabatan_id', 'update'=>false, 'insert'=>false),
            array('name'=>'jabatan_nama', 'update'=>false, 'insert'=>false),
            array('name'=>'unit_id', 'update'=>false, 'insert'=>false),
            array('name'=>'unit_nama', 'update'=>false, 'insert'=>false)
        ), true);
        return $this; 
    }

    function select($config = NULL, $fn = NULL){
        $records = call_user_func_array("parent::select", func_get_args());
        $query = $this->get_lastquery();

        if(is_array($records) and !empty($records['data']))
        {
            foreach ($records['data'] as $key => &$value)
            {
                $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['staf_wakil_asisten'];
            }
        }

        $this->set_lastquery($query);
        return $records;
    }

}