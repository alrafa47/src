<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('get_css_lib')) {
    function get_css_lib($style = null) {
        $CI =& get_instance();
        $styles_lib = $CI->config->item('csslib');

        if(!is_array($styles_lib)) $styles_lib = array();

        if(is_null($style)){
            return $styles_lib;
        }else if(array_key_exists($style, $styles)){
            return $styles_lib[$style];
        }
    }
}