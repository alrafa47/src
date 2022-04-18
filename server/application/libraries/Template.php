<?php

class Template{
    
    private $config = array();
    private $config_default = array(
        'template'  => '',
        'marker'    => array('{','}')
    );
    
    function __construct($config=null){
        if(is_array($config)){
            $config = array_merge($this->config_default, (array)$config);
            $this->config = $config;
        }else{
            $this->config = $this->config_default;
            $this->config['template'] = $config;
        }
        return $this;
    }

    function set_marker($marker=null){
        if(is_array($marker)){
            $marker = array_values($marker);
            if(isset($marker[0])) $this->config['marker'][0] = $marker[0];
            if(isset($marker[1])) $this->config['marker'][1] = $marker[1];
        }else{
            $marker = (string) $marker;
            $this->config['marker'][0] = $this->config['marker'][1] = $marker;
        }
        return $this;
    }

    function get_marker(){
        return $this->config['marker'];
    }

    function set_template($template=null){
        if(! is_array($template) ) $template = (string)$template;
        $this->config['template'] = $template;
        return $this;
    }

    function get_template(){
        return $this->config['template'];
    }

    private function mark($str = null, $data = array()){
        if(!is_array($data)) $data = array();
        foreach ($data as $key => $value) {
            $str = str_replace((string)$this->config['marker'][0].$key.$this->config['marker'][1], (string)$value, (string)$str);
        }
        return $str;
    }

    function apply($data=null){
        $str = $this->config['template'];
        if(is_array($str)){
            foreach ($str as $key => $value) {
                $str[$key] = $this->mark($value, $data);
            }
        }else{
            $str = $this->mark($str, $data);
        }
        return $str;
    }

    static function apply_template($template = null, $data = array()){
        return self::compile($template)->apply($data);
    }

    static function compile($template = null){
        return new self($template);
    }

    static function from(){
        return call_user_func_array('self::compile', func_get_args());
    }

}