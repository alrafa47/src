<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends Base_Controller {
    
    public $modelDefault = 'sipas/account';

	public function __construct(){
        parent::__construct();
    }

    public function index(){
        $this->info();
    }
    
    function info($type = null)
    {   
        // $model = $this->model('sipas/account', true);
        // $this->response($model->info($type));
        $op = array(
            'success' => true,
            'mobile_version' => $this->config->item('mobile_version')
        );
        $this->response($op);
    }

    function controllers() {
        echo "<pre>";
        $this->load->library('controllerlist'); // Load the library
        $clist = $this->controllerlist->getControllers();
        $list = array();
        $ignore = array('index','model','response', 'response_record', 'response_records');
        foreach ($clist as $g => $l) {
            foreach ($l as $i) {
                if(in_array($i, $ignore)) continue;
                $list[] = 'sipas/'.strtolower($g).'/'.strtolower($i);
            }
        }
        // sort($list);print_r($list);

        $registeredRoutes = $this->config->item('access_route');
        $registeredRoutesList = array(); 
        foreach ($registeredRoutes as $route) {
            if(!is_array($route[2])) $route[2] = array($route[2]);
            $registeredRoutesList = array_merge($registeredRoutesList, $route[2]);
        }
        // sort($registeredRoutesList);print_r($registeredRoutesList);

        $unregisteredList = array(); 
        foreach ($list as $l) {
            if(!in_array($l, $registeredRoutesList))
            {
                $unregisteredList[] = $l;
            }
        }
        sort($unregisteredList);
        print_r(count($unregisteredList)."<br/>");
        print_r($unregisteredList);

    }
}