<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

use Phalcon\Queue\Beanstalk;
use Phalcon\Queue\Beanstalk\Job;
use Phalcon\Logger;
use Phalcon\Logger\Factory;
use Phalcon\Logger\Adapter\File as FileAdapter;
use Phalcon\Logger\Formatter\Line as LineFormatter;

class BaseWorker extends Base_Controller
{
    public $queue;

    protected $tubes;

    protected $options = [];

    private $startTime;
    
    private $logger;

    function __construct() 
    {
        parent::__construct();
        is_cli() OR show_404();
    }

    protected function setup($adapter, $tubes = array('default'), $options = array())
    {
        // prepare adapter
        if(is_object($adapter)) $adapter = (array) $adapter;
        if(is_string($adapter)) $adapter = explode(':', $adapter);
        if(!is_array($adapter)) $adapter = array($adapter);
        $host = isset($adapter['host']) ? $adapter['host'] : (isset($adapter[0]) ? $adapter[0] : 'localhost') ; 
        $port = isset($adapter['port']) ? $adapter['port'] : (isset($adapter[1]) ? $adapter[1] : '11300') ; 
        $this->queue = new Beanstalk(array(
            'host' => $host,
            'port' => $port
        ));

        // prepare tubes
        if (is_object($tubes)) $tubes = (array) $tubes;
        if (is_string($tubes)) $tubes = explode('|', $tubes);
        if (!is_array($tubes)) $tubes = array($tubes);
        $this->tubes = $tubes;

        // prepare options
        $this->options = array_merge($this->getDefaultOptions(), $options);
    }

    protected function getDefaultOptions()
    {
        return array(
            'sleep' => 10,
            'timeout' => 240,
            'memory' => 128,
            'logAdapter'=>'file',
            'logPath'=>'./',
            'logStrategy'=>null,
            'logFile'=>'queue.log',
            'logFormat'=>'[%date%] %message%',
            'logMessageFormat'=>'QUEUE {payload}'
        );
    }

    function index()
    {
        $this->run();
    }

    function run()
    {
        $this->init();

        while (true) {
            $this->runNextJob();

            if ($this->shouldRestart()) {
                $this->stop();
            }
        }
    }

    protected function init()
    {
        $this->startTime = time();

        $this->initQueues();
        $this->initLogger();
    }

    protected function initQueues()
    {
        $this->queue->connect();
        foreach ($this->tubes as $tube) {
            $this->queue->watch($tube);
        }
        if(!in_array('default', $this->tubes))
        {
            $this->queue->ignore('default');
        }
    }

    protected function runNextJob()
    {
        $job = $this->queue->reserve();

        if (!$job) {
            $this->sleep();
            return;
        }

        try {
            $this->handleJob($job);
        } catch (Exception $e) {
            $this->handleJobException($job, $e);
        }
    }

    protected function shouldRestart()
    {
        if (
            $this->timeoutReached($this->options['timeout'])
            || $this->memoryExceeded($this->options['memory'])
        ) {
            return true;
        }

        return false;
    }

    protected function timeoutReached(int $timeout)
    {
        return (time() - $this->startTime >= $timeout);
    }

    protected function memoryExceeded($memoryLimit)
    {
        return (memory_get_usage() / 1024 / 1024) >= $memoryLimit;
    }

    protected function stop()
    {
        die();
    }

    protected function sleep()
    {
        sleep($this->options['sleep']);
    }


    protected function initLogger()
    {
        $logStrategy = $this->options['logStrategy'];
        $logFile = 'log.log';
        switch(strtolower($logStrategy))
        {
            case "daily"    : $logFile = "log-".date('Y-m-d').".log"; break;
            case "weekly"   : $logFile = "log-".date('W').".log"; break;
            case "monthly"  : $logFile = "log-".date('Y-m').".log"; break;
            case "yearly"   : $logFile = "log-".date('Y').".log"; break;
        }
        $logFile = $this->options['logPath'].$logFile;

        $formatter = new LineFormatter($this->options['logFormat']);
        $logger = new FileAdapter($logFile);
        $logger->setFormatter($formatter);

        $this->logger = $logger;
    }

    protected function log($params = array(), $logMessageFormat = null)
    {
        $this->initLogger();
        if(!$logMessageFormat) $logMessageFormat = $this->options['logMessageFormat'];
        
        $this->logger->info($logMessageFormat, $params);
    }

    // overrideable
    protected function handleJob($job)
    {

    }

    // overrideable
    protected function handleJobException($job, $e)
    {
        $message = $job->getBody(); // body is always array
        $job->bury();
        
        $this->log(array(
            'status'=>'FAIL',
            'payload'=>json_encode($message)
        ));
    }
}
