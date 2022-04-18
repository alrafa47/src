<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Restore extends Base_Controller {

    protected $message = array();

    function __construct()
    {
    	parent::__construct();
        $this->load->helper(array(
            'system',
            'download',
            'file'
        ));
        $this->load->library('zip');
    	$this->load->config('backuprestore');
    	$this->load->model('sipas/systemrestore', 'systemrestore');
    }

    function index(){}

    function create($id = null)
    {
        $backupId = varIsset($id, varReq('backupId'));
        $systemrestore = $this->systemrestore;
    	
        $subBackId = substr($backupId, 18, 13);
        // echo "<pre>";
        // var_dump($backupId, $restoreId, $subBackId);
        $proses = $systemrestore->init($subBackId, $backupId);

    	return $this->response(array(
    		'id'=>$subBackId,
    		'message'=>'Initializing Restore'
    	));
    }

    function read($id = null, $autoUpdate = null, $pollingFormat = null) // $autoUpdate only work for inprogress backup, will update to next task if previous is done
    {
        $backup = $this->systemrestore;
        $backupId = varIsset($id, varReq('id'));
        $autoUpdate = varIsset($autoUpdate, varReq('autoUpdate'));
        $pollingFormat = varIsset($pollingFormat, varReq('pollingFormat'));

        $response = array();

		if($backupId)
		{
            // get list of backup currenty in progress
			if($backupId == 'running')
			{
				$list = $backup->getListProcess();
                $data = array();
                foreach ($list as $key => $value) {
                    $data[] = array('restore_id'=>$value);
                }
				$response = array(
                    'success'=>true,
                    'total'=>count($list),
                    'data'=>$data
                );
			}
            elseif($backupId == 'available')
            {
                $list = $backup->getList();
                $data = array();
                foreach ($list as $key => $value) {
                    $data[] = array('restore_id'=>$value);
                }
                $response = array(
                    'success'=>true,
                    'total'=>count($list),
                    'data'=>$data
                );
            }
			else
			{
				$backup->loadMeta($backupId);
                $meta = $backup->getMeta();
                $inprogressTask = null;
                $nextExecuteableTask = null;
                $allTasksIsDone = true;
                $allTasksIsNotExecuted = true;

                if($meta)
                {
                    // $meta->tasks->app->status = 2;

                    // scan if all task is done
                    // scan if all task is not executed
                    foreach ($meta->tasks as $key => $task)
                    {
                        
                        if($task->exec == true)
                        {
                            if($task->status <= $backup::PROCESS_EXECUTE )
                            {
                                $allTasksIsDone = false;
                            }
                            if($task->status != 0 )
                            {
                                $allTasksIsNotExecuted = false;
                            }
                        }
                    }
                    // scan inprogress task
                    foreach ($meta->tasks as $key => $task)
                    {
                        if($task->exec == $backup::TASK_EXECUTEABLE and $task->status == $backup::PROCESS_EXECUTE)
                        {
                            $inprogressTask = $task;
                            break;
                        }
                    }
                    // scan next executeable task
                    foreach ($meta->tasks as $key => $task)
                    {
                        if($task->exec == $backup::TASK_EXECUTEABLE and $task->status == $backup::PROCESS_INITIATE)
                        {
                            $nextExecuteableTask = $task;
                            break;
                        }
                    }

                    if($allTasksIsDone)
                    {
                        $meta->status = $backup::PROCESS_DONE;
                        $backup->saveMeta();
                    }
                    // if there is no inprogress task, so start the next task
                    else if($autoUpdate and !$inprogressTask and $nextExecuteableTask)
                    {

                        $meta->status = $backup::PROCESS_EXECUTE;
                        $operation = $backup->startTask($nextExecuteableTask->name);
                    }

                    $response = $meta;
                }
			}
		}else
		{
			$list = $backup->getList();
            $data = array();
            foreach ($list as $key => $value) {
                $data[] = array('restore_id'=>$value);
            }
            $response = array(
                'success'=>true,
                'total'=>count($list),
                'data'=>$data
            );
		}

        if($pollingFormat)
        {
            $response = array(
                'type'=>'event',
                'name'=>'backupprocess',
                'data'=>$response
            );
        }

        $this->response($response);
    }

    function download($file = null){
        $file_download = varIsset($file, varReq('file'));
        $backup = $this->systemrestore;
        $basepath = $backup->getBasePath();

        if(empty($file_download)) return false;
        $record = $backup->downloadFile($basepath.'/'.$file_download);
        return $record;
        // $this->zip->read_dir($basepath); 
        // $this->zip->download($file_download);
        // force_download($record);
    }
}