<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once(MODULEPATH . '/worker/controllers/BaseWorker.php');

use GuzzleHttp\Client;

class Notif_email extends BaseWorker
{
    function __construct()
    {
        parent::__construct();

        $this->setup(
            Config()->item('queueServer'),
            Config()->item('queueServer_tubeName_notifEmail'),
            Config()->item('queueServer_logConfig_notifEmail')
        );

        $this->load->library('email');
    }

    /**
     * one of these action should be executed
     * $job->delete() means done
     * $job->burry() means fail
     * $job->release() means will executed again later
     */
    protected function handleJob($job)
    {
        $deviceModel = $this->model('sipas/alat', true);
        $staf = $this->model('sipas/staf', true);
        $package = $job->getBody(); // body is always array
        $package['mail']['date_processed'] = date('Y-m-d H:i:s');

        $this->email->initialize($package['config']);
        $this->email->clear(true);

        $this->email->from($package['mail']['from'], $package['mail']['name']);
        $this->email->subject($package['mail']['subject']);
        $this->email->message($package['mail']['message']);
        $this->email->to($package['mail']['to']);   
        
        if($package['mail']['to']){
            if($this->email->send()){
                $package['mail']['date_succeed'] = date('Y-m-d H:i:s');
                $this->log(array(
                    'status'=>'SENT',
                    'payload'=>json_encode($package['mail'])
                ));
            }else{
                $this->log(array(
                    'status'=>'FAILURE', // SENT- success sent to firebase|SKIP|FAIL
                    'payload'=>json_encode($package['mail'])
                ));
            }
        }else{
            $this->log(array(
                'status' => 'FAILURE',
                'payload' =>json_encode($package['mail'])
            ));
        }

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