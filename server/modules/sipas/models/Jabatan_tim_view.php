<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/jabatan_tim', true);

class Sipas_model_Jabatan_tim_view extends Sipas_model_Jabatan_tim {

    public function __construct(){
        parent::__construct();
        $this->set_table_name('v_jabatan_tim');
        $this->set_fields(array(
            array(
                'name'=>'jabatan_tim_id',
                'display'=>'Id',
                'update'=>false,
                'unique'=>true,
                'notnull'=>true
            ),
            array(
                'name'=>'jabatan_tim_nama',
                'display'=>'Nama',
                'notnull'=>true
            ),
            array(
                'name'=>'jabatan_tim_jumlah',
                'display'=>'Jumlah',
            )
        ));
    }
}