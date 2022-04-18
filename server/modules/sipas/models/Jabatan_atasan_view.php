<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->get_model('sipas/jabatan_wakil', true);

class Sipas_model_Jabatan_atasan_view extends Sipas_model_Jabatan_wakil {
    
    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jabatan_atasan');
        $this->set_fields(array(
            array(
                'name'=>'jabatan_wakil_id',
                'display'=>'Id',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'jabatan_wakil_jabatan',
                'display'=>'Pimpinan',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'jabatan_wakil_asisten',
                'display'=>'Asisten',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'jabatan_wakil_properti',
                'display'=>'Properti',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'jabatan_wakil_jabatan_nama',
                'display'=>'Nama',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'jabatan_wakil_jabatan_kode',
                'display'=>'Kode',
                'update'=>false, 'insert'=>false
            ),
            array(
                'name'=>'jabatan_wakil_jabatan_isaktif',
                'display'=>'Aktif',
                'update'=>false, 'insert'=>false
            ),
            array('name'=>'jabatan_id', 'update'=>false, 'insert'=>false),
            array('name'=>'jabatan_nama', 'update'=>false, 'insert'=>false),
            array('name'=>'jabatan_kode', 'update'=>false, 'insert'=>false),
            array('name'=>'jabatan_isaktif', 'update'=>false, 'insert'=>false)
        ), true);
        return $this; 
    }

    // function select($config = NULL, $fn = NULL){
    //     $records = call_user_func_array("parent::select", func_get_args());
    //     $query = $this->get_lastquery();

    //     if(is_array($records) and !empty($records['data']))
    //     {
    //         foreach ($records['data'] as $key => &$value)
    //         {
    //             $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['staf_wakil_staf'];
    //         }
    //     }

    //     // $this->set_lastquery($query);
    //     return $records;
    // }

}