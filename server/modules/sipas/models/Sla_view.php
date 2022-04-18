<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/sla', true);

class Sipas_model_Sla_view extends Sipas_model_Sla {
      
      public function __construct(){
        parent::__construct();
        $CI = get_instance();
        $this->m_sla_rumus = $CI->model('sipas/sla_rumus', true);

        $this->set_table_name('v_sla');
        $this->set_primary('sla_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'sla_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_hasil'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_kriteria'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_isaktif'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_unit_jumlah'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_buat_tgl'),

            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_isubah'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_ubah_tgl'),

            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_ishapus'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_hapus_tgl'),

            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_ispulih'),
            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_pulih_tgl'),

            array('insert'=>false, 'update'=>false, 'name'=>'sla_properti_data')
        ));
    }
}