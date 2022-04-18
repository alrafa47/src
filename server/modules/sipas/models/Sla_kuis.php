<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sla_kuis extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'sla_kuis',
                'primary'=>'sla_kuis_id',
                'fields'=> array(
                    array(
                        'name'=>'sla_kuis_id',
                        'display'=>'Id',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sla_kuis_ujian',
                        'display'=>'SLA Kuis Ujian',
                    ),
                    array(
                        'name'=>'sla_kuis_sla',
                        'display'=>'SLA Kuis SLA',
                    ),
                    array(
                        'name'=>'sla_kuis_nilai',
                        'display'=>'SLA Kuis Nilai',
                    ),
                    array(
                        'name'=>'sla_kuis_tgl',
                        'display'=>'SLA Kuis Tanggal',
                    ),
                    array(
                        'name'=>'sla_kuis_properti',
                        'display'=>'SLA Kuis Properti',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}