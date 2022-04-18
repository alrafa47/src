<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Properti extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->m_properti          = $this->model('sipas/properti',         true);
        $this->m_properti_view     = $this->model('sipas/properti_view',    true);
        $this->m_staf              = $this->model('sipas/staf_view',        true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_properti_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('properti_id')){
            $id = varGet('id', varGet('properti_id'));
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