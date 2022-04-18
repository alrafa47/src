<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('create_job')) {

    function create_job($queueTube, $data){
        $queue = new Queue();
        $queue->connect(Config()->item('queueServer')['host'], Config()->item('queueServer')['port']);

        $queue->tube($queueTube)->addJob($data);
    }
}