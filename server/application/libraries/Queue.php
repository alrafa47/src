<?php (defined('BASEPATH')) or exit('No direct script access allowed');

use Phalcon\Queue\Beanstalk;

/**
 * Beanstlak Queue for Codeigniter
 * 
 * $CI->load->library('Queue);
 * $CI->queue->connect(array(
 *      'host'=>'192.168.0.15',
 *      'port'=>'11300'
 * ));
 * $CI->queue->tube('default')->addJob(array(
 *      'pushNotif'=>'admin'
 * ));
 */
class Queue
{
    public $queue;

    function connect($host = 'localhost', $port = '11300')
    {
        $this->queue = new Beanstalk(array(
            'host' => $host,
            'port' => $port,
        ));
    }

    function getAdapter()
    {
        return $this->queue;
    }

    /**
     * Selecting the queue to which the task will go
     * @param string $name Queue name
     * @return Queue
     */
    function tube($name = 'default')
    {
        $this->queue->choose($name);

        return $this;
    }

    function addJob(array $data = null)
    {
        return $this->queue->put($data);
    } 
}