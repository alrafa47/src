<?php
(defined('BASEPATH')) or exit('No direct script access allowed');

/* load the HMVC_Router class */
// require APPPATH . 'third_party/mpdf/mpdf.php';

// class Pdf extends mPDF {}

class Pdf 
{ 
    function __construct()
    { 
        include_once APPPATH.'third_party/mpdf/vendor/autoload.php'; 
    } 
    function pdf()
    { 
        $CI = & get_instance(); 
        log_message('Debug', 'mPDF class is loaded.'); 
    } 
    function load($param=[])
    { 
        return new \Mpdf\Mpdf($param); 
    } 
}