<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Staf_wakil_asisten extends Base_Controller {

	public function __construct(){
        parent::__construct();
        // $this->load->model('sipas/staf_wakil_tersedia_view',    'm_staf_wakil_tersedia_view');
        $this->m_staf_wakil_tersedia_view = $this->model('sipas/staf_wakil_tersedia_view',  true);
        $this->m_staf_view = $this->model('sipas/staf_view',  true);
    }

    public function index(){
        $this->read();
    }

    public function read($section = null){
        $model = $this->m_staf_view;
        $id = varGet('id');

        if( ! empty($id) ){
            $record = $model->read($id);
            $records = array( 'success'=> (bool) $record, 'record'=>$record );
        }else{
            $records = $model->select(array(
                'limit' => varGet('limit'),
                'start' => varGet('start'),
                'filters' => varGet('filter'),
                'sort' => varGet('sort')
            ));
        }
        $this->response($records);
    }

}