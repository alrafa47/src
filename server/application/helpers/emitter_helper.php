<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


if(!function_exists('getEmitterEventSeparator')){
    function getEmitterEventSeparator(){
        return Config()->item('emitterEventSeparator');
    }
}

if (!function_exists('pushEvent')) {
    function pushEvent($config = array(), $callback = null){
        
        if(Config()->item('useSSE') === false) return false;

        if(array_key_exists('to', $config)) $to = $config['to'];

        if(array_key_exists('data', $config)) $data = $config['data'];

        if(array_key_exists('group', $config)) $group = $config['group'];

        if(array_key_exists('type', $config)) $type = $config['type'];

        if(array_key_exists('scopes', $config)) $scopes = $config['scopes'];

        if(!$to) return false;

        if(!is_array($group)) $group = array($group);

        $groups = $group;
        
        foreach($groups as $group){
            $event = implode(getEmitterEventSeparator(), array($group, Config()->item('emitterReceiveEventName'), $type));
            
            $payload = array(
                'event'     => $event,
                'data'      => $data,
                'to'        => $to,
                'scopes'    => isset($scopes) ? $scopes : array()
            );

            $dbprefix = Config()->item('redisEmitterConfigPrefix');
            $emitterConfig = getFromRedis(array(
                'key' => array($dbprefix, $group, $to),
                'db' => Config()->item('redisEmitterConfigDb')
            ));
            
            if($emitterConfig){
                $channelkey = $emitterConfig['key'];
                $channel = $emitterConfig['channel'];

                $url = Config()->item('emitterServiceScheme').Config()->item('emitterServiceHost').Config()->item('emitterServicePort').Config()->item('emitterPushEventApi');
                
                $send = sendToEmitter(array(
                    'url' => $url,
                    'params' => array(
                        'channel' => $channel,
                        'key' => $channelkey,
                        'eventpayload' => $payload
                    )
                ));

                if($send){
                    // print_r($send); // create log here
                }else{
                    // create log here too
                }
            }
        }
    }
}

if(!function_exists('sendToEmitter')){
    function sendToEmitter($config = array()){

        if(!$config) return false;
        $params = $config['params'];
        $url = $config['url'].'?'.http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $exec = curl_exec($ch);
        return $exec;
    }
}