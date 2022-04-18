<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Sla extends Base_model {
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'sla',
                'primary'=>'sla_id',
                'fields'=> array(
                    array(
                        'name'=>'sla_id',
                        'display'=>'Id',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'sla_nama',
                        'display'=>'SLA Nama',
                    ),
                    array(
                        'name'=>'sla_hasil',
                        'display'=>'SLA Hasil',
                    ),
                    array(
                        'name'=>'sla_kriteria',
                        'display'=>'SLA Kriteria',
                    ),
                    array(
                        'name'=>'sla_isaktif',
                        'display'=>'SLA Nama',
                    ),
                    array(
                        'name'=>'sla_properti',
                        'display'=>'SLA Properti',
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    public function count_sla($sla_id = null, $long_process= null, $_sorter = 'asc') {
        $CI = get_instance();
        $m_sla_rumus = $CI->model('sipas/sla_rumus', true);

        if( ! $sla_id) return null;
        if( ! is_numeric($long_process)) return null;

        $nilai = array();
        $use_sorter = ($_sorter) ? true : false;
        $sorter     = ($use_sorter) ? array('sla_rumus_index'=> $_sorter) : null;

        $rumus = $m_sla_rumus->find(array('sla_rumus_sla'=>$sla_id), null, null, null, $sorter);

        if($rumus){
            foreach($rumus as $record){
                $parsed = $this->parse_rumus($long_process, $record['sla_rumus_formula']);
                $parsed = str_replace('amp;', '', $parsed);
                if(eval("return ".$parsed.";")){
                    $nilai[] = array(
                        'nilai'=>$record['sla_rumus_nilai'], 
                        'formula'=>htmlspecialchars_decode($record['sla_rumus_formula']), 
                        'formula_parsed'=>$parsed
                    );
                }
            }
        }else{
            $nilai[] = array('nilai'=>null, 'formula'=>null, 'formula_parsed'=>null);
        }

        return $nilai[0];
    }

    public function parse_rumus($long_process= 0, $rumus= array()){

        $operators = array('=', '>=', '<=', '<', '>');
        $long_process = ($long_process < 1) ? 'intval('.$long_process.')' : $long_process;

        $parsed = str_replace('n', $long_process, $rumus);
        $parsed = explode(' ', $parsed);
        $parsed = array_filter($parsed);
        foreach($parsed as &$parsed_row){
            $key = array_search(htmlspecialchars_decode($parsed_row), $operators);
            $parsed_row = (is_numeric($key) && $key > -1) ? $operators[$key] : $parsed_row;
        }
        $parsed = implode(' ', $parsed);

        return $parsed;
    }

    function set_data_sla($sik_data = array()){
        $CI             = get_instance();
        $sla_view       = $CI->model('sipas/sla_view',      true);
        $properti       = $CI->model('sipas/properti',      true);
        $surat          = $CI->model('sipas/surat',         true);
        $surat_view     = $CI->model('sipas/surat_view',    true);
        $surat_log      = $CI->model('sipas/surat_log',     true);
        $account        = $CI->model('sipas/account',       true);

        $account_id     = $account->get_profile_id();

        $data       = $sik_data;
        $sla_data   = array();

        $now        = date('Y-m-d H:i:s');

        $korr_imasuk = $surat_view->read(
            array(
                'surat_id'=>$data['surat_korespondensi_surat'], 
                'surat_korespondensi'=>$data['surat_korespondensi'],
                'surat_usesla'=>1
            )
        );
        $rentang_tgl_setuju = (is_numeric($korr_imasuk['surat_setuju_rentang'])) ? $korr_imasuk['surat_setuju_rentang'] : null;
        if($korr_imasuk['surat_usesla'] && is_numeric($rentang_tgl_setuju) && $korr_imasuk['surat_sla_nilai'] < 1){
            $dtcount_sla = $this->count_sla($korr_imasuk['surat_sla'], $rentang_tgl_setuju, 'asc');
            // print_r($dtcount_sla);die;

            $sla_data['surat_sla_tgl']      = $now;
            $sla_data['surat_sla_staf']     = $account_id;
            $sla_data['surat_sla_nilai']    = $dtcount_sla['nilai'];
            $sla_data['surat_sla_formula']  = $dtcount_sla['formula'];
            $ids = array($surat::MODEL_IKELUAR=>$data['surat_id'], $surat::MODEL_IMASUK=>$korr_imasuk['surat_id']);

            foreach($ids as $surat_model => $surat_id){
                $surat->update($surat_id, $sla_data, function($response) use($properti, $ids, $surat_model, $account_id, $surat_log, $surat){
                    if($response[$surat->successProperty] !== true) return;
                    $updated_data = $response['data'];
                    // $properti->updated($updated_data['surat_properti'], $account_id, $updated_data, $updated_data['surat_registrasi']);
                    // $surat_log->created($account_id, $updated_data);
                });
            }
        }
    }
}