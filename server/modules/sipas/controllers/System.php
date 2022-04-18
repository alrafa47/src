<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class System extends Base_Controller {

    protected $message = array();

    function __construct()
    {
    	parent::__construct();

    	$this->load->helper('system');
    	$this->load->config('backuprestore');
    	$this->load->model('sipas/systembackup', 'systembackup');
    }

    function index(){}

    function backup_create()
    {
    	$task = $this->systembackup;
    	$taskId = varGet('id', md5(microtime(true).uniqid()));

    	$task->init($taskId);

    	$this->response(array(
    		'id'=>$taskId,
    		'message'=>'Backup is starting'
    	));
    }

	// function writeState()
	// {
	// 	$task = $this->systembackup;

	// 	$task->saveMeta();
	// 	var_dump($task->getMeta());
	// }

    function backup_state()
    {
		$task = $this->systembackup;
		$taskId = varGet('id');

		$task->loadMeta($taskId);
		var_dump($task->getMeta());
    }
}