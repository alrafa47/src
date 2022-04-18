<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class upload_test extends Base_Controller {

    protected $message = array();
    protected $uppath = 'data/';

	public function __construct(){
        parent::__construct();
        $CI = get_instance();
        $CI->load->library('IOExcel');

        $this->m_staf                = $this->model('sipas/staf',                       true);
        $this->m_staf_view           = $this->model('sipas/staf_view',                  true);
        $this->m_staf_aktual         = $this->model('sipas/staf_aktual',                true);
        $this->m_staf_aktual_view    = $this->model('sipas/staf_aktual_view',           true);

    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model = $this->m_staf;
        
        $data = (new IOExcel())->upload(array(
                'upload_path'   => $this->imagepath, 
                'start_rows'    => 0, 
                'input_name'    => 'file_nilai'
            ))
        ->setIndexTitle();


    }
}