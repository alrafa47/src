<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once(MODULEPATH . '/worker/controllers/BaseWorker.php');

use GuzzleHttp\Client;

class Imasuk extends BaseWorker
{
    function __construct()
    {
        parent::__construct();

        // $this->config->load('application_config');

        $this->setup(
            Config()->item('queueServer'),
            Config()->item('queueServer_typeImasuk'),
            Config()->item('queueServer_formatTubeImasuk')
        );
    }

    /**
     * one of these action should be executed
     * $job->delete() means done
     * $job->burry() means fail
     * $job->release() means will executed again later
     */
    protected function handleJob($job)
    {

        $model = $this->model('sipas/surat_view', true);
        $data = $job->getBody(); // body is always array
        
        $operation = $model->create_surat_imasuk($data);
        echo json_encode($data) . "\n";
        $this->log(array(
            'status'=>'SENT', // SENT- success sent to firebase| SKIP - user doesnt have notif token
            'payload'=>json_encode($data)
        ));
        $job->delete();
    }

    protected function handleJobException($job, $e)
    {
        $message = $job->getBody(); // body is always array
        $job->reserve();

        $this->log(array(
            'status'=>'FAIL', // SENT- success sent to firebase|SKIP|FAIL
            'payload'=>json_encode($message)
        ));
        $job->release();
    }
}