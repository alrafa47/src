<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report extends CI_Controller {
    
    function __construct(){
        parent::__construct();
        $this->load->database();
        $this->load->helper(array('url','varhandler','pdf'));
        $this->load->library(array('session'));
        $this->load->model(array('report'));
    }
    
    function index(){
        $this->report_model->index();
    }

    function generate_report(){
        $mode = varEnum(varReq('reportmode'), array('pdf','excel','html'), 'html');
        $data = varReq('datamode');
        $start_date = varReq('startdate');
        $end_date = varReq('enddate');
        
        switch ($mode) {
            case 'pdf':
                $this->report_model->generate_pdf($data, $start_date, $end_date);
                break;

            case 'excel':
                $this->report_model->generate_excel($data, $start_date, $end_date);
                break;

            case 'html':
            default:
                $this->report_model->generate_html($data, $start_date, $end_date);
                break;
        }
    }

}