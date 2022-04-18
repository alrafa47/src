<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('create_excel')) {

    function create_kolektif($html_data=NULL, $file_name='file_name'){
        error_reporting(0);
        require_once APPPATH . 'third_party/phpspreadsheet/autoload.php';
        $path   = FCPATH.'data/keputusan/';

        $CI = get_instance();
        $CI->load->library('Uuid');
        $CI->load->library('Template');
        $CI->load->helper('download');


        // $id = UUID::v4();
        // $_path = Template::compile($path)->apply(array('id'=>$id));

        // if(! file_exists($_path)){
        //     mkdir($_path, 0777, true);
        // }
        
        // $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();

        // $tmpfile = $_path.$id.'.html';
        // file_put_contents($tmpfile, $html_data);
        // $spreadsheet = $reader->load($tmpfile);

        // $spreadsheet->getActiveSheet()->getStyle('A1:Z500')->getFont()->getColor()->setRGB('000000');

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $sheetMaster = $spreadsheet->setActiveSheetIndex(0);
        $sheetMaster->setCellValue('A1','JABATAN_ID')
                    ->setCellValue('B1','JABATAN_NAMA')
                    ->setCellValue('D1','GOLONGAN')
                    ->setCellValue('E1','GAJI SGT 0')
                    ->setCellValue('F1','SGT');


        $file = $path.'TemplateKolektif.xlsx';
        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="TemplateKolektif.xlsx"');
        $writer->save($file);
        $data = file_get_contents($file);

        force_download('TemplateKolektif.xlsx', $data);
        // force_download($file, NULL);

        // unlink($tmpfile);

        // if(file_exists($file)){
        //     $data = file_get_contents($file);
        //     $file_name = $file_name.'.xls';
        //     if(file_exists($file))unlink($file);
        //     if(file_exists($_path)) rmdir($_path);
        //     force_download($file_name, $data);
        // }

    }
}