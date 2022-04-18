<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('redisInit')) {
    function redisInit($config = array()) {
        $config = array_merge(array(
            'host'      => Config()->item('redisHost'),
            'port'      => Config()->item('redisPort'),
            'auth'      => Config()->item('redisAuth'),
            'db'        => Config()->item('redisMasterDbCache')
        ), $config);

        $redis = new Redis();
        $connected = $redis->connect($config['host'], $config['port']);
        if($connected){
            if($config['auth']) $redis->auth($config['auth']);
            $redis->select($config['db']);
            return $redis;
        }else{
            return false;
        }
    }
}

// list
if(!function_exists('addToCache')){
    function addToCache($key = '', $hashkey = '', $record = ''){
        $redis = redisInit();

        if($redis === false) return false;

        if(empty($key) AND empty($hashkey) AND empty($record)) return false;

        if(is_object($record)) $record = (array)$record;

        $hashrec = $record[$hashkey];
        
        if(is_array($record)) $record = json_encode($record);

        $op = $redis->hset($key, $hashrec, $record);

        return $op;
        $redis->close();
    }
}

// list
if(!function_exists('getFromCache')){
    function getFromCache($key = '', $id = ''){
        $redis = redisInit();

        if($redis === false) return false;

        if(empty($key)) return false;

        if(empty($id)){
            $records = $redis->hGetAll($key);
        }else{
            $records = $redis->hGet($key, $id);
        }

        return $records;
        $redis->close();
    }
}

if(!function_exists('parseToString')){
    function parseToString($data = array()){
        if(is_string($data)) return $data;

        if(is_object($data)) $data = (array)$data;

        return json_encode($data);
    }
}

if(!function_exists('parseToArray')){
    function parseToArray($data = ''){
        if(is_array($data)) return $data;
        
        if(is_object($data)) return (array)$data;
        
        if(is_string($data)) return json_decode($data, true);
    }
}

if(!function_exists('bulkAddToCache')){
    function bulkAddToCache($key = '', $hashkey = '', $data = array()){
        if(empty($key)) return false;

        if(is_object($data)) $data = (array)$data;
    
        foreach($data as $record){
            addToCache($key, $record[$hashkey], $record);
        }
    }
}

if(!function_exists('generateKeyCache')){
    function generateKeyCache($model = array()){
        if(empty($model)) return false;

        $prefix     = Config()->item('redisMasterDbCachePrefix');
        $separator  = Config()->item('redisNsSeparator');

        return array(
            'key' => $prefix.$separator.$model->get_table_name(),
            'hashKey' => $model->get_primary()
        );
    }
}

if(!function_exists('addRecordToCache')){
    function addRecordToCache($model = array(), $data = array()){
        if(Config()->item('useRedisCache') === false) return false;

        $keys = generateKeyCache($model);
        return addToCache($keys['key'], $keys['hashKey'], $data);
    }
}

if(!function_exists('getRecordFromCache')){
    function getRecordFromCache($model = array(), $id = ''){
        if(Config()->item('useRedisCache') === false) return false;

        $keys = generateKeyCache($model);
        $record = getFromCache($keys['key'], $id);
        return parseToArray($record);
    }
}

if(!function_exists('inCacheExists')){
    function inCacheExists($model = array(), $id = ''){
        if(Config()->item('useRedisCache') === false) return false;

        $redis = redisInit();

        if($redis === false) return false;

        $keys = generateKeyCache($model);

        if(empty($id)){
            return $redis->exists($keys['key']);
        }else{
            return $redis->hExists($keys['key'], $id);
        }
    }
}

if(!function_exists('getFromRedis')){
    function getFromRedis($config){
        
        if(array_key_exists('key', $config)){
            if(is_object($config['key'])) $key = (array)$config['key'];
            if(is_array($config['key'])) $key = implode(Config()->item('redisNsSeparator'), $config['key']);
            if(is_string($config['key'])) $key = $config['key'];
        }else{
            return null;
        }

        $db = (array_key_exists('db', $config)) ? intval($config['db']) : null;

        $config = array_filter(array('db' => $db), function($v){
            return $v !== false && !is_null($v) && ($v != '' || $v == '0');
        });
        
        $redis = redisInit($config);

        if($redis){
            $record = $redis->get($key);
            return parseToArray($record);
        }else{
            return false;
        }
    }
}