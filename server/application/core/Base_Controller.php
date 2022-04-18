<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Base_Controller extends CI_Controller{

    protected $messages = array();

	function __construct(){
        parent::__construct();
        $this->load->database();
    }

    protected function get_message($key = null, $replacer = array()){
        if(!empty($this->messages[$key])) return Template::apply_template($this->messages[$key], $replacer);
    }

    function response($operation = array(), $clean = false, $cached = false){
        if($clean) ob_clean();

        if(isset($operation['useCache']) AND !$operation['useCache']) $operation['useCache'] = $cached;

        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode($operation));
    }

    function response_record($record = null, $clean = false, $cached = false){
        if($clean) ob_clean();
        $this->response(array(
            'success' => (bool) $record,
            'data' => $record,
            'useCache' => $cached
        ));
    }

    function response_records($records = null, $clean = false, $cached = false){
        if($clean) ob_clean();
        $this->response(array(
            'total' => count($records),
            'data' => $records,
            'useCache' => $cached
        ));
    }

    function model($model = null, $safemode = false){
        if($safemode === true){
            $this->load->model($model);
        }
        return $this->load->get_model($model);
    }
}

/* End of file pembelian_faktur.php */
/* Location: ./application/controllers/pembelian_faktur.php */