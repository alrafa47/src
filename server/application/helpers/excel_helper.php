<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('create_excel')) {

    function create_excel($html_data, $file_name='file_name'){
        error_reporting(0);
        require_once APPPATH . 'third_party/phpspreadsheet/autoload.php';
        $path   = FCPATH.'data/report/{id}/';

        $CI = get_instance();
        $CI->load->library('Uuid');
        $CI->load->library('Template');
        $CI->load->helper('download');


        $id = UUID::v4();
        $_path = Template::compile($path)->apply(array('id'=>$id));

        if(! file_exists($_path)){
            mkdir($_path, 0777, true);
        }
        
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();

        $tmpfile = $_path.$id.'.html';

        file_put_contents($tmpfile, $html_data);
        $spreadsheet = $reader->load($tmpfile);

        $spreadsheet->getActiveSheet()->getStyle('A1:Z500')->getFont()->getColor()->setRGB('000000');

        $file = $_path.$file_name.'.xls';
        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xls($spreadsheet);
        $writer->save($file);
        
        unlink($tmpfile);

        if(file_exists($file)){
            $data = file_get_contents($file);
            $file_name = $file_name.'.xls';
            if(file_exists($file))unlink($file);
            if(file_exists($_path)) rmdir($_path);
            force_download($file_name, $data);
        }

    }
}