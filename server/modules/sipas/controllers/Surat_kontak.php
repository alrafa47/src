<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Surat_kontak extends Base_Controller {
      
	public function __construct(){
        parent::__construct();
        $this->load->model(array('sipas/surat_kontak'));
        $this->m_surat_kontak = $this->model('sipas/surat_kontak', true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_surat_kontak;
        $id = varGet('id');

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if( ! empty($id) ){
            $record = $model->read($id);
            $records = array( 'success'=> (bool) $record, 'record'=>$record );
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'surat_kontak LIKE "%'.$query.'%"'
                ));
            }
            $records = $model->select(array(
                'limit' => $limit,
                'start' => $start,
                'filters' => json_encode($filter)
            ));
        }
        $this->response($records);
    }
}