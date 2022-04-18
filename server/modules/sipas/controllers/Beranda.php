<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Beranda extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        // $this->m_fitur       = $this->model('sipas/fitur',      true);
        // $this->m_akses       = $this->model('sipas/akses',      true);
        // $this->m_akses_view  = $this->model('sipas/akses_view', true);
        $this->m_user        = $this->model('sipas/akun',       true);
        $this->m_account     = $this->model('sipas/account',    true);
        $this->m_staf_view   = $this->model('sipas/staf_view',  true);
    
        $this->m_notification       = $this->model('sipas/notification',   true);
        $this->m_surat              = $this->model('sipas/surat',                true);
        $this->m_surat_view         = $this->model('sipas/surat_view',           true);
        $this->m_surat_masuk_view   = $this->model('sipas/surat_masuk_view',     true);
        $this->m_surat_keluar_view  = $this->model('sipas/surat_keluar_view',    true);
        $this->m_surat_ikeluar_view = $this->model('sipas/surat_ikeluar_view',   true);
        $this->m_surat_imasuk_view  = $this->model('sipas/surat_imasuk_view',    true);
        $this->m_surat_staf_view    = $this->model('sipas/disposisi_masuk_view', true);
        $this->m_nota_dinas_view    = $this->model('sipas/notadinas_masuk_view', true);
    }

    public function index(){
        
    }
    
    function surat_masuk($id = null){
        $me = $this;
        $surat  = $me->m_surat;
        $surat_masuk= $me->m_surat_masuk_view;
        
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $surat_masuk->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
			array_unshift($filter, (object)array(
                'property'  => $surat::$field_approval_lookup,
                'value'     => $surat::SETUJU_SETUJU
            ));
            array_unshift($filter, (object)array(
                'property'  => $surat::$field_distribusi_lookup,
                'value'     => $surat::DISTRIBUSI_DISTRIBUSI
            ));
            $operation = $surat_masuk->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
        $this->response($operation);
    }

    function suratcount($section = null){
        $model      = $this->m_notification;

        $filter     = json_decode(varGet('filter', '[]'));
        $filter_    = ($filter) ? explode('-', $filter[0]->value) : null;

        $month      = ($filter_) ? $filter_[1] : null;
        $year       = ($filter_) ? $filter_[0] : null;

        $month      = ($month) ? $month : date('m');
        $year       = ($year) ? $year : date('Y');
        $date_ranges    = array();

        $date_start     = $year.'-'.$month.'-01';
        $date_end       = date("Y-m-t H:i", strtotime($date_start.' 23:59'));

        $start      = new DateTime($date_start);
        $end        = new DateTime($date_end);

        $interval   = new DateInterval('P1D');
        $dateRange  = new DatePeriod($start, $interval, $end);

        $weekNumber = 1;
        $weeks = array();

        foreach ($dateRange as $date) {
            $weeks[$weekNumber][] = $date->format('Y-m-d');        
            if ($date->format('w') == 6) {
                $weekNumber++;
            }
        }

        foreach ($weeks as $key => $value) {
            $date_ranges[$key]['start'] = array_shift($weeks[$key]);            
            if(empty($weeks[$key]))
            {
                $date_ranges[$key]['end'] = $date_ranges[$key]['start'];   
            }
            else{
                $date_ranges[$key]['end'] = array_pop($weeks[$key]);
            }
        }

        $output = array(
            'data'=>array()
        );

        $data = array();
        
        $data[0]  = $model->get_count_of('disposisi', $date_ranges);
        $data[1]  = $model->get_count_of('masuk', $date_ranges);
        $data[2]  = $model->get_count_of('koreksi', $date_ranges);
        $data[3]  = $model->get_count_of('koreksi_status', $date_ranges);
        $data[4]  = $model->get_count_of('notadinas', $date_ranges);

        if($section == 'chart'){
            $output['name'] = 'chart';
            for ($i=0; $i <= 4; $i++) {
                $j=$i+1;
                $output['data'][$i]['week'] = 'M-'.$j;
                $output['data'][$i]['data1'] = $data[0]['week'.$j];
                $output['data'][$i]['data2'] = $data[1]['week'.$j];
                $output['data'][$i]['data3'] = $data[2]['week'.$j];
                $output['data'][$i]['data4'] = $data[3]['week'.$j];
                $output['data'][$i]['data5'] = $data[4]['week'.$j];
            }
        }else{
            $output['name'] = 'count';

            $output['data'][0]  = $data[0];
            $output['data'][1]  = $data[1];
            $output['data'][2]  = $data[2];
            $output['data'][3]  = $data[3];
            $output['data'][4]  = $data[4];

            $output['count']  = $output['data'][0]['count']+$output['data'][1]['count']+$output['data'][2]['count']+$output['data'][3]['count']+$output['data'][4]['count'];
        }       
        $this->response($output);
    }
}