<?php
// require('template.php');

class Validation{
    
    private $config = array();
    private $config_default = array(
        'validator'             => array(),
        'validation_message'    => array(
            'notnull_message'   =>'tidak boleh kosong',
            'format_message'    =>'tidak sesuai format',
            'inclusion_message' =>'harus termasuk diantara: <b>{inclusion}</b>',
            'exclusion_message' =>'tidak boleh termasuk dari: <b>{exclusion}</b>',
            'minvalue_message'  =>'nilai minimal <b>{minvalue}</b>',
            'maxvalue_message'  =>'nilai maximal <b>{maxvalue}</b>',
            'above_message'     =>'nilai harus diatas <b>{above}</b>',
            'below_message'     =>'nilai harus dibawah <b>{below}</b>',
            'minlength_message' =>'panjang karakter minimal <b>{minlength}</b> karakter',
            'maxlength_message' =>'panjang karakter maksimal <b>{maxlength}</b> karakter',
            'custom_message'    =>'tidak sesuai dengan fungsi validasi'
        )
    );
    
    public function __construct($config=null){
        $config = array_merge($this->config_default, (array)$config);
        foreach( $config as $key => $value ) {
            if(isset($this->config_default[$key]) and is_array($config[$key])){
                $config[$key] = array_merge($this->config_default[$key], $config[$key]);
            }
        }
        $this->config = $config;
    }

    public function validate($value=null){
        $validation_response = array('valid'=>true, 'message'=>array());
        $validator = $this->config['validator'];
        foreach((array)$validator as $validator_key=>$validator_value){
            $valid = true;
            switch ($validator_key) {
                case 'format':
                    $valid = ( preg_match($validator_value, $value) );
                    break;
                case 'minvalue':
                    $valid = ( ((float)$value >= (float)$validator_value) );
                    break;
                case 'maxvalue':
                    $valid = ( ((float)$value <= (float)$validator_value) );
                    break;
                case 'above':
                    $valid = ( ((float)$value > (float)$validator_value) );
                    break;
                case 'below':
                    $valid = ( ((float)$value < (float)$validator_value) );
                    break;
                case 'minlength':
                    $valid = ( strlen($value) >= (integer)$validator_value );
                    break;
                case 'maxlength': 
                    $valid = ( strlen($value) <= (integer)$validator_value );
                    break;
                case 'inclusion': 
                    $valid = ( in_array($value, $validator_value) );
                    $validator_value = implode(', ', $validator_value);
                    break;
                case 'exclusion': 
                    $valid = (! in_array($value, $validator_value) );
                    $validator_value = implode(', ', $validator_value);
                    break;
                case 'notnull':
                    $valid = ( $validator_value and !is_null($value) );
                    break;
                case 'custom':
                    if(is_callable($validator_value)){
                        $valid = call_user_func($validator_value, $value);
                    } 
            }
            if($valid === false){
                $validation_response['valid'] = false;
                $tpl = new Template($this->config['validation_message'][$validator_key.'_message']);
                $validation_response['message'][] = $tpl->apply(array($validator_key=>$validator_value));
            }
        }
        return $validation_response;
    }
}