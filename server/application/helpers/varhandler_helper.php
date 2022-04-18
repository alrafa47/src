<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*=====================================================================================
** function App
** desc     : alias for get_instance()
** return   : CI Instance
**===================================================================================*/
if ( ! function_exists('App')){
    function App(){
        return $CI =& get_instance();
    }
}

/*=====================================================================================
** function Config
** desc     : shortcut for get config item
** return   : CI Instance
**===================================================================================*/
if ( ! function_exists('Config')){
    function Config(){
        $CI =& get_instance();
    
        return $CI->config;
    }
}

/*=====================================================================================
** function varPost
** desc     : to fetch all $_POST data, within defined variable or not
** params   : $variable@string, $default@mix
** return   : @mix post data 
**===================================================================================*/
if ( ! function_exists('varPost')){
    function varPost($variable = NULL, $default = FALSE, $nullemptystring = true){
        $CI =& get_instance();
        if(is_null($variable)){
            return $_POST;
        }else if($_variable = $CI->input->post($variable)){
            if($nullemptystring === true and is_string($_variable) and $_variable == '' ){
                $_variable = null;   
            }
            return $_variable;
        }
        return $default;
    }
}

if ( ! function_exists('varPostHas')){
    function varPostHas($varname = NULL){
        return array_key_exists($varname, $_POST);
    }
}


/*=====================================================================================
** function varGet
** desc     : to fetch all $_GET data, within defined variable or not
** params   : $variable@string, $default@mix
** return   : @mix get data
**===================================================================================*/
if ( ! function_exists('varGet')){
    function varGet($variable = NULL, $default = FALSE, $nullemptystring = true){
        $CI =& get_instance();
        if(is_null($variable)){
            return $_GET;
        }
        if($_variable = $CI->input->get($variable)){
           return $_variable; 
        }
        return $default;
    }
}

if ( ! function_exists('varGetHas')){
    function varGetHas($varname = NULL){
        return array_key_exists($varname, $_GET);
    }
}


/*=====================================================================================
** function varRequest
** desc     : to fetch all $_POST|$_GET data, within defined variable or not
** params   : $variable@string, $default@mix
** return   : @mix request data
**===================================================================================*/
if ( ! function_exists('varRequest')){
    function varRequest($variable = null, $default = null, $nullemptystring = true){
        $CI =& get_instance();
        if($_variable = $CI->input->post($variable) ){
           $default = $_variable; 
        }
        if($_variable = $CI->input->get($variable)){
           $default = $_variable; 
        }
        return $default;
    }
}

if ( ! function_exists('varReqHas')){
    function varReqHas($varname = NULL){
        return varPostHas($varname) or varGetHas($varname);
    }
}


/*=====================================================================================
** function varReq
** desc     : alias varRequest
**===================================================================================*/
if ( ! function_exists('varReq')){
    function varReq($variable = null, $default = null){
        return varRequest($variable, $default);
    }
}


/*=====================================================================================
** function varIsset
** desc     : checking for exsitensi variable
** params   : $variable@string, $default@mix
** return   : @mix isset variable
**===================================================================================*/
if ( ! function_exists('varIsset')){
    function varIsset($variable = null, $default = null){
        if( isset($variable) ){
            return $variable;
        }else{
            return $default;
        }
    }
}


/*=====================================================================================
** function varExist
** desc     : checking for exsitensi variable in array
** params   : $variable@string, $default@mix
** return   : @mix isset variable
**===================================================================================*/
if ( ! function_exists('varExist')){
    function varExist($source = array(), $variable = null, $default = null){
        if( is_array($source) and array_key_exists($variable, $source) ){
            return $source[$variable];
        }else{
            return $default;
        }
    }
}

/*=====================================================================================
** function avrEmpty
** desc     : checking if variable is empty
** params   : $variable@string, $default@mix
** return   : @mix empty data
**===================================================================================*/
if ( ! function_exists('varEmpty')){
    function varEmpty(&$variable = null, $default = null){
        if( ! empty($variable) ){
            return $variable;
        }else{
            return $default;
        }
    }
}


/*=====================================================================================
** function varMatch
** desc     : check the match allowed from array (assoc)
** params   : $source@array.source(assoc), $match@array.list(enum), $all_variable@boolean, $default@mix
** return   : @array matched data
**===================================================================================*/
if ( ! function_exists('varMatch')){
    function varMatch($source, $match, $all_variable = true, $default = null){
        $returned = array();
        foreach ($match as $key) {
            if(array_key_exists($key, $source)){
                $returned[$key] = $source[$key];
            }else if($all_variable === true){
                $returned[$key] = $default;
            }
        }
        return $returned;
    }
}


/*=====================================================================================
** function isAssoc
** desc     : for check if the cummulative array exist some or one null variable
** params   : $source@array(assoc), $notnull@array(list)
** return   : @boolean 
**===================================================================================*/
if ( ! function_exists('isAssoc')){
    function isAssoc($arr = null){
        if(is_array($arr)){
            return array_keys($arr) !== range(0, count($arr) - 1);
        }
        return false;
    }
}


/*=====================================================================================
** function varEnum
** desc     : set the current variable into match variable in list within default if the variable doesn match
** params   : $source@string, $list@array.list(enum)
** return   : @mix data enum
**===================================================================================*/
if ( ! function_exists('varEnum')){
    function varEnum($source, $list, $default){
        if(in_array($source, $list)){
            return $source;
        }else{
            return $default;
        }
    }
}


/*=====================================================================================
** function varMatchIn
** desc     : for checking if the variable if match with the defined value (enumerical checking)
** params   : $source@string, 
**            $list@array.list(enum)
** return   : @null 
**===================================================================================*/
if ( ! function_exists('varMatchIn')){ 
    function varMatchIn($source, $list){
        return in_array($source, $list);
    }
}


/*=====================================================================================
** function varApply
** desc     : to apply default variable into array list object(assoc)
** params   : $var@array.list, $source@array.source
** return   : @array with applied data
**===================================================================================*/
if ( ! function_exists('varApply')){ 
    function varApply($var, $source){
        return array_merge($var, $source);
    }
}


/*=====================================================================================
** function varApplyIf
** desc     : to apply default variable into array list object(assoc) if the variable doesnt exist
** params   : $var@array.list, $source@array.source
** return   : @array with applied data
**===================================================================================*/
if ( ! function_exists('varApplyIf')){
    function varApplyIf($var, $source){
        return array_merge($source, $var);
    }
}


/*=====================================================================================
** function isNull
** desc     : for check if the cummulative array exist some or one null variable
** params   : $source@array(assoc), $notnull@array(list)
** return   : @boolean 
**===================================================================================*/
if ( ! function_exists('isNull')){ 
    function isNull($source=array(), $notnull=array(), $strict=false){
        if(empty($source)) return true;
        if(empty($notnull)) return false;
        
        foreach ($notnull as $key => $value) {
            if($strict){
                if( empty($source[$value]) ){
                    return true;
                }
            }else{
                if( isset($source[$value]) and is_null($source[$value]) ){
                    return true;
                }
            }
        }
        return false;
    }
}

/*=====================================================================================
** function callback
** desc     : trigger function as callback
** params   : fn@function callback function to be executed
**          : params@array gift parameter(s)
** return   : @null 
**===================================================================================*/
if ( ! function_exists('callback')){
    function callback($fn=null, $params=array()){
        if(is_callable($fn)){
            return call_user_func_array($fn, $params);
        }
    }
}

/*=====================================================================================
** function getRequestPalyload
** desc     : fetch reques payload data from httpContent
** params   : null
** return   : @json_string request payload 
**===================================================================================*/
if ( ! function_exists('getRequestPayload')){
    function getRequestPayload($return_array = false, $nullemptystring = true){
        $raw  = '';
        $httpContent = fopen('php://input', 'r');
        while ($kb = fread($httpContent, 5120)) { //default 2048
            $raw .= $kb;
        }

        $params = json_decode($raw);
        if ( ! (is_array($params) or is_object($params)) ) {
            $params = json_decode("[".stripslashes($raw)."]");
        }
        fclose($httpContent);

        
        if($nullemptystring === true){
            foreach((array)$params as $key => $value ){
                if(is_string($value)){
                    $value = trim($value);
                    if($value == ''){
                        $params->$key = null;
                    }
                }
            }
        }
        if( $return_array === true ){
            return (array) $params;
        }
        return $params;
    }
}

/*=====================================================================================
** function transform_value
** desc     : transform value of the fields into enumerical/defined value on transformer
** params   : fields@mix[array,string,integer,boolean] can be the value or array of, 
**            transformer@array(assoc) the transformer value
** return   : @array(assoc) parsed value(s) 
**===================================================================================*/
if ( ! function_exists('transform_value')){
    function transform_value($fields, $transformer){
        if(is_array($fields)){
            foreach ($fields as $fields_key => $fields_value) {
                $fields[$fields_key] = transform_value($fields_value, $transformer);
            }
        }else{
            if(array_key_exists($fields, $transformer)){
                $fields = $transformer[$fields];
            }
        }
        return $fields;
    }
}

/*=====================================================================================
** function transform_key
** desc     : transform key of the fields into enumerical/defined value key on transformer (inverse of the transform_value)
** params   : fields@array fields will be transformed with the transformer 
**            map@array(assoc) the transformer value key
** return   : @array(assoc) mapped fields # the return is customized with sql query needed 
**===================================================================================*/
if ( ! function_exists('transform_key') ){
    function transform_key($fields, $tranformator){
        if( is_array($fields) ){
            foreach ($fields as $fields_key => $fields_value) {
                if( array_key_exists($fields_key, $tranformator) ){
                    unset($fields[$fields_key]);
                    $fields[$tranformator[$fields_key]] = $fields_value;
                }
            }
        }
        return $fields;
    }
}

/*=====================================================================================
** function transform_key
** desc     : transform key of the fields into enumerical/defined value key on transformer (inverse of the transform_value)
** params   : fields@array fields will be transformed with the transformer 
**            map@array(assoc) the transformer value key
** return   : @array(assoc) mapped fields # the return is customized with sql query needed 
**===================================================================================*/
if( ! function_exists('require_model') ){
    function require_model($model = null, $hmvc = false){
        if(empty($model)){
            show_error('model is null while require');
            return;
        }
        $CI =& get_instance();
        if($hmvc === true){
            return $CI->model($model);
        }else{
            if( ! isset($CI->$model) ){
                $CI->load->model($model);
            }
            return $CI->{$model};
        }
    }
}

if( ! function_exists('format_tanggal') ){
    function format_tanggal($str_date, $to_format = 'd-m-Y', $from_format = null){
        $date = (empty($from_format)) ? date_create($str_date) : date_create_from_format($from_format, $str_date);
        if($date) return date_format($date, $to_format);
    }
}

if( ! function_exists('format_rupiah') ){
    function format_rupiah($value=0, $locale = true){
        if($locale === true){
            return '<div style="display:inline-block"><span style="float:left">Rp</span> '.number_format( $value , 0 ,'' , '.' ).',-</div>';
        }else{
            return number_format( $value , 0 ,'' , '.' );
        }
    }
}

if( ! function_exists('terbilang') ){
    function terbilang($x){
        $abil = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
        
        if ($x < 12)                return " " . $abil[$x];
        elseif ($x < 20)            return terbilang($x - 10) . " belas";
        elseif ($x < 100)           return terbilang($x / 10) . " puluh" . terbilang($x % 10);
        elseif ($x < 200)           return " seratus" . terbilang($x - 100);
        elseif ($x < 1000)          return terbilang($x / 100) . " ratus" . terbilang($x % 100);
        elseif ($x < 2000)          return " seribu" . terbilang($x - 1000);
        elseif ($x < 1000000)       return terbilang($x / 1000) . " ribu" . terbilang($x % 1000);
        elseif ($x < 1000000000)    return terbilang($x / 1000000) . " juta" . terbilang($x % 1000000);
        elseif ($x < 1000000000000) return terbilang($x / 1000000000) . " milyar" . terbilang($x % 1000000000);
    }
}

if ( ! function_exists('gen_uuid')){
    function gen_uuid($table_name){
        $CI =& get_instance();
        $res_id = $CI->db->query('SELECT MD5(UUID()) as ID');
        $gen_id = $res_id->row_array();
        return md5($table_name.$gen_id['ID']);
    }
}

/**
 * Unserialize
 *
 * This function unserializes a data string, then converts any
 * temporary slash markers back to actual slashes
 *
 * @access  private
 * @param   array
 * @return  string
 */
if ( ! function_exists('save_serialize')){
    function save_serialize($data)
    {
        if (is_array($data))
        {
            foreach ($data as $key => $val)
            {
                if (is_string($val))
                {
                    $data[$key] = str_replace('\\', '{{slash}}', $val);
                }
            }
        }
        else
        {
            if (is_string($data))
            {
                $data = str_replace('\\', '{{slash}}', $data);
            }
        }

        return serialize($data);
    }
}

// --------------------------------------------------------------------

/**
 * Unserialize
 *
 * This function unserializes a data string, then converts any
 * temporary slash markers back to actual slashes
 *
 * @access  private
 * @param   array
 * @return  string
 */

if ( ! function_exists('save_unserialize')){
    function save_unserialize($data)
    {
        $data = @unserialize(strip_slashes($data));

        if (is_array($data))
        {
            foreach ($data as $key => $val)
            {
                if (is_string($val))
                {
                    $data[$key] = str_replace('{{slash}}', '\\', $val);
                }
            }

            return $data;
        }

        return (is_string($data)) ? str_replace('{{slash}}', '\\', $data) : $data;
    }
}

/* hihihi */
if ( ! function_exists('get_now')){
    function get_now(){
        $CI =& get_instance();
        $res_id = $CI->db->query('SELECT NOW() as sekarang');
        $gen_id = $res_id->row_array();
        return $gen_id['sekarang'];
    }
}

/* End of file varhandler_helper.php */
/* Location: ./application/helpers/varhandler_helper.php */