<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Jabatan extends Base_Controller {

    function __construct() {
		parent::__construct();
        $this->load->helper(array(
            'download', 
            'file'
        ));
        $this->load->library('template');
        $this->m_report             = $this->model('sipas/report',      true);
        $this->m_jabatan            = $this->model('sipas/jabatan',     true);
        $this->m_jabatan_aktif_view = $this->model('sipas/jabatan_aktif_view',true);

        $this->config->load('application_config');
    }

    function index(){
        $this->read();
    }

    function read(){
        $model      = $this->m_jabatan_aktif_view;
        $filter     = json_decode(varGet('filter', '[]'));
        $limit          = varReq('limit') ? varReq('limit') : 25;
        $start          = varReq('start') ? varReq('start') : 0;

        if(varGetHas('id') || varGetHas('jabatan_id')){
            $id = varGet('id', varGet('jabatan_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{ 
            $query = varGet('query');
            
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     =>'(jabatan_kode LIKE "%'.$query.'%" OR jabatan_nama LIKE "%'.$query.'%")'
                ));
            }

            $sorter = json_encode(array(
                (object) array('property' => 'jabatan_nama', 'direction' => 'asc')
            ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sort'      => $sorter
            ));

            $records['limit'] = $limit;
            $records['start'] = $start;
        
            $this->response($records);
        }
    }
}