<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('system_is_running'))
{
    function system_is_running($pid = null)
    {
        try{
            $result = shell_exec(sprintf("ps %d", $pid));
            if( count(preg_split("/\n/", $result)) > 2){
                return true;
            }
        }catch(Exception $e){}

        return false;
    }
}

if (!function_exists('system_run'))
{
    function system_run($cmd, $outputfile = '/dev/null', $pidfile = '/dev/null')
    {
        // $command = sprintf("%s > %s 2>&1 & echo $! >> %s", $cmd, $outputfile, $pidfile);
        $command = sprintf("%s > %s 2>&1 & echo $! > %s", $cmd, $outputfile, $pidfile);
        return $task = exec($command);
    }
}

if (!function_exists('run'))
{
    function run($cmd, $outputfile = '/dev/null')
    {
        $command = sprintf("%s > %s 2>&1 & echo $!", $cmd, $outputfile);
        return $task = exec($command);
    }
}