<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sla_ujian extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'sla_ujian',
                'primary'=>'sla_ujian_id',
                'fields'=> array(
                    array(
                        'name'=>'sla_ujian_id',
                        'display'=>'Id',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sla_ujian_nama',
                        'display'=>'SLA Ujian Nama',
                    ),
                    array(
                        'name'=>'sla_ujian_result',
                        'display'=>'SLA Ujian Result',
                    ),
                    array(
                        'name'=>'sla_ujian_unitpenerima',
                        'display'=>'SLA ujian Unitpenerima',
                    ),
                    array(
                        'name'=>'sla_ujian_unitpengirim',
                        'display'=>'SLA ujian Unitpengirim',
                    ),
                    array(
                        'name'=>'sla_ujian_setuju_status',
                        'display'=>'SLA ujian Pembuatan Pegawai',
                    ),
                    array(
                        'name'=>'sla_ujian_setuju_tgl',
                        'display'=>'SLA ujian Pembuatan Tanggal',
                    ),
                    array(
                        'name'=>'sla_ujian_setuju_staf',
                        'display'=>'SLA ujian Penyetujuan Status',
                    ),
                    array(
                        'name'=>'sla_ujian_properti',
                        'display'=>'SLA ujian Properti',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}