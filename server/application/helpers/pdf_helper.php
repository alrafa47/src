<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('create_pdf')) {
    function create_pdf($html_data, $file_name = "file", $landscape = FALSE, $extraParams = 'D', $waterMark = null) {
        $CI = get_instance();
        $CI->load->library('Pdf');

        /* param example
            $mpdf = new mPDF('',    // mode - default ''
                 '', // format - A4, for example, default ''
                 0,  // font size - default 0
                 '', // default font family
                 15, // margin_left
                 15, // margin right
                 16, // margin top
                 16, // margin bottom
                 9,  // margin header
                 9,  // margin footer
                 'L' // L - landscape, P - portrait
            );  
        */
        // $param = array();
        $param = array("","A4",0,"Arial",0,0,0,0,0,0,"P");
        $pdf = new pdf('c');
        
        $pdf = $pdf->load($param);

        // ob_end_clean();
        if ($file_name == "") {
            $file_name = 'report' . date('dMY');
        }
        // $pdf->SetFooter('SIPAS - Sistem Informasi Pengelolaan Arsip Surat| |Halaman {PAGENO}');
        $pdf->SetFooter('| |Halaman {PAGENO}');
        
        if($landscape === TRUE){
            $pdf->AddPage('L');
        }
        preg_match("~<body.*?>(.*?)<\/body>~is", $html_data, $match);
        // echo $match[1];

        if(empty($match[1])) $match[1] = $html_data;

        $pdf->showImageErrors = true;


        if($waterMark){ // tom
            $pdf->SetWatermarkImage($waterMark, 0.2, 'F');
            $pdf->showWatermarkImage = true;            
        }else{            
            $pdf->showWatermarkImage = false;
        }

        $long_html = strlen($match[1]);
        $long_int  = intval($long_html/100000);

        if($long_int > 0) {
            for($i = 0; $i<$long_int; $i++) {
                $temp_html = substr($match[1], ($i*100000),99999);
                $pdf->WriteHTML($temp_html);
            }
            //Last block
            $temp_html = substr($match[1], ($i*100000),($long_html-($i*100000)));
            $pdf->WriteHTML($temp_html);
        } else {
            $pdf->WriteHTML($match[1]);
        }
        // $pdf->WriteHTML($match[1]);

        $pdf->Output($file_name . '.pdf', 'I');
        exit;
    }
}