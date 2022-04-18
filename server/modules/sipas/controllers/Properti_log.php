<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Properti_log extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_properti_log          = $this->model('sipas/properti_log_view',               true);
        // $this->m_jenis_hidup    = $this->model('sipas/jenis_hidup_view',    true);
        // $this->m_jenis_aktif    = $this->model('sipas/jenis_aktif_view',    true);
        // $this->m_jenis_nonaktif = $this->model('sipas/jenis_nonaktif_view', true);
        $this->m_properti       = $this->model('sipas/properti',            true);
        $this->m_account        = $this->model('sipas/account',             true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_properti_log;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('properti_log_id')){
            $id = varGet('id', varGet('properti_log_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

}