<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Itipe extends Base_Controller {

	public function __construct(){
        parent::__construct();
        $this->m_itipe          = $this->model('sipas/itipe',                    true);
        $this->m_itipe_view     = $this->model('sipas/itipe_view',               true);
        $this->m_properti       = $this->model('sipas/properti',                 true);
        $this->m_account        = $this->model('sipas/account',                  true);
        $this->m_itipe_hidup    = $this->model('sipas/itipe_hidup_view',         true);
        $this->m_itipe_aktif    = $this->model('sipas/itipe_aktif_view',         true);
        $this->m_itipe_nonaktif = $this->model('sipas/itipe_nonaktif_view',      true);
    }

    public function index(){
        $this->read();
        
    }
    
    public function read($section = null){
        $model = $this->m_itipe_hidup;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('itipe_id')){
            $id = varGet('id', varGet('itipe_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            $status = varGet('status');

            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'itipe_kode LIKE "%'.$query.'%" OR itipe_nama LIKE "%'.$query.'%"'
                ));
            }
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'itipe_id <> "all"'
            ));
            
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            // $records['debug'] = $model->get_lastquery();
            $this->response($records);
        }
    }

    public function combo(){
        $model = $this->m_itipe_aktif;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('itipe_id')){
            $id = varGet('id', varGet('itipe_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'itipe_kode LIKE "%'.$query.'%" OR itipe_nama LIKE "%'.$query.'%"'
                ));
            }
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            // $records['debug'] = $model->get_lastquery();
            $this->response($records);
        }
    }

    public function aktif(){
        $model = $this->m_itipe_aktif;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('itipe_id')){
            $id = varGet('id', varGet('itipe_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'itipe_kode LIKE "%'.$query.'%" OR itipe_nama LIKE "%'.$query.'%"'
                ));
            }
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'itipe_id <> "all"'
            ));
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function nonaktif(){
        $model = $this->m_itipe_nonaktif;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('itipe_id')){
            $id = varGet('id', varGet('itipe_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'itipe_kode LIKE "%'.$query.'%" OR itipe_nama LIKE "%'.$query.'%"'
                ));
            }
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'itipe_id <> "all"'
            ));
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