<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Generate_excel extends Base_model {
    public function __construct(){
        parent::__construct();
        require_once APPPATH . 'third_party/phpspreadsheet/autoload.php';
        $this->spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $this->dataValidation = new \PhpOffice\PhpSpreadsheet\Cell\DataValidation();

    }


    function setDataValidation($objSheet = null, $cellRange= null, $validateName = null){
        if(!$objSheet OR !$cellRange OR !$validateName) die();
        $objValidation = new \PhpOffice\PhpSpreadsheet\Cell\DataValidation();

        $objSheet->setDataValidation(
            $cellRange,
                (new $objValidation)
                ->setType($objValidation::TYPE_LIST)
                ->setErrorStyle($objValidation::STYLE_STOP)
                ->setAllowBlank(false)
                ->setShowInputMessage(true)
                ->setShowErrorMessage(true)
                ->setShowDropDown(true)
                ->setErrorTitle('Gagal')
                ->setError('Pilihan tidak ada pada daftar list.')
                // ->setPromptTitle('Pilih dari Daftar')
                // ->setPrompt('Silahkan pilih list pada daftar drop down.')
                ->setFormula1($validateName)
        );
    }

    function  generateTemplateKolektif($staf= null, $jabatan = null, $golongan= null, $config = null){
        $now = date('Ymd');
        $sub_tipe  = $config->sub_type;
        
        $surat_id = $config->surat_id;

        //Create spreadsheet temp
        $spreadsheet = new $this->spreadsheet;

        //Create sheet 1
        $sheetMaster = $spreadsheet->setActiveSheetIndex(0);
        // $headerData = array("Nama Pegawai","NIP","Jabatan Lama","Golongan","Jabatan Baru","Jenjang Jabatan Lama","Jenjang Jabatan Baru","Keterangan");
        
        // Header Jabatan & Golongan
        $sheetMaster->setCellValue('A1','JABATAN_NAMA')
                    ->setCellValue('B1','JABATAN_ID')
                    ->setCellValue('D1','GOLONGAN')
                    ->setCellValue('E1','GAJI SGT 0')
                    ->setCellValue('F1','SGT')
                    ->setCellValue('G1','SURAT')
                    ->setCellValue('H1','JENIS_SUB');
                    
        $sheetMaster->setCellValue('G2',$surat_id)
                    ->setCellValue('H2',$config->sub_type);
        
        //Master Jabatan
        $jabatanRangeStart = 2;
        $jabatanRangeEnd = 0;
        foreach ($jabatan as $key => $j) {
            $row = $jabatanRangeStart + $key;
            $sheetMaster->setCellValue('B'.$row, $j['jabatan_id'])
                        ->setCellValue('A'.$row, $j['jabatan_nama']);
            $jabatanRangeEnd = $row;
        }
        
        // Master Golongan              
        $golonganRangeStart = 2;
        $golonganRangeEnd = 0;
        // echo "<pre>";
        // print_r($golongan);
        // die();
        foreach ($golongan as $key => $g) {
            $row = $golonganRangeStart + $key;
            $sheetMaster->setCellValue('D'.$row, $g['golongan_level'])
                        ->setCellValue('E'.$row, $g['golongan_gaji_pokok'])
                        ->setCellValue('F'.$row, $g['golongan_sgt']);            
            $golonganRangeEnd = $row;
        }

        //hidden id cell
        $sheetMaster->getColumnDimension('B')->setVisible(false);
        $sheetMaster->getColumnDimension('G')->setVisible(false);
        $sheetMaster->getColumnDimension('H')->setVisible(false);

        // resize colom
        $nameSheetMaster = 'Master';
        $sheetMaster->getColumnDimension('A')->setWidth(50);
        $sheetMaster->getColumnDimension('B')->setWidth(40);
        $sheetMaster->getColumnDimension('D')->setWidth(15);
        $sheetMaster->getColumnDimension('E')->setWidth(25);
        $sheetMaster->getColumnDimension('F')->setWidth(20);
        $sheetMaster->setTitle($nameSheetMaster);     

        //Create Lookup master        
        // $spreadsheet->addNamedRange( new \PhpOffice\PhpSpreadsheet\NamedRange('Jabatan', $sheetMaster, 'A2:A'.$jabatanRangeEnd));
        // $spreadsheet->addNamedRange( new \PhpOffice\PhpSpreadsheet\NamedRange('Golongan', $sheetMaster, 'D2:D'.$golonganRangeEnd));

        // Protect Sheet Master
        $sheetMaster->getProtection()->setSheet(true);


        //create sheet Data
        $spreadsheet->createSheet(1);        

        $sheetStaf = $spreadsheet->setActiveSheetIndex(1);
        
        if($sub_tipe == 1 || $sub_tipe == 2) {
            $headerData = array(
                array("name"=>"Nama Pegawai"    , "size" => 25), //A
                array("name"=>"NIP"             , "size" => 15), //B
                array("name"=>"Jabatan"         , "size" => 25), //C
                array("name"=>"Gol.Lama"        , "size" => 10), //D
                array("name"=>"Gol.Baru"        , "size" => 10), //E
                array("name"=>"SGT Lama"        , "size" => 10), //F
                array("name"=>"SGT Baru"        , "size" => 10), //G
                array("name"=>"Gaji Pokok Lama" , "size" => 20), //H
                array("name"=>"Gaji Pokok Baru" , "size" => 20), //I
                array("name"=>"TMT Lama (MM/DD/YYYY)", "size" => 20), //J
                array("name"=>"Jenjang Jabatan" , "size" => 20), //K
                array("name"=>"Keterangan"      , "size" => 25), //L
                array("name"=>"Id Pegawai"      , "size" => 25), //M
                array("name"=>"Id Jabatan"      , "size" => 25), //N
                array("name"=>"Id PenerimaSK"   , "size" => 25)  //O
            );
        } else if($sub_tipe == 0) {
            $headerData = array(
                array("name"=>"Nama Pegawai"    , "size" => 25), //A
                array("name"=>"NIP"             , "size" => 15), //B
                array("name"=>"Jabatan"         , "size" => 25), //C
                array("name"=>"Gol.Baru"        , "size" => 10), //D
                array("name"=>"TMT Lama (MM/DD/YYYY)", "size" => 30), //E
                array("name"=>"Jenjang Jabatan" , "size" => 20), //F
                array("name"=>"Keterangan"      , "size" => 25), //G
                array("name"=>"Id Pegawai"      , "size" => 25), //H
                array("name"=>"Id Jabatan"      , "size" => 25), //I
                array("name"=>"Id PenerimaSK"   , "size" => 25)  //J
            );
        } else if($sub_tipe == 3) {
            $headerData = array(
                array("name"=>"Nama Pegawai"    , "size" => 25), //A
                array("name"=>"NIP"             , "size" => 15), //B
                array("name"=>"Jabatan Lama"    , "size" => 25), //C
                array("name"=>"Jabatan Baru"    , "size" => 25), //D
                array("name"=>"Gol.Lama"        , "size" => 10), //E
                array("name"=>"Gol.Baru"        , "size" => 10), //F
                array("name"=>"SGT Lama"        , "size" => 10), //G
                array("name"=>"SGT Baru"        , "size" => 10), //H
                array("name"=>"Gaji Pokok Lama" , "size" => 20), //I
                array("name"=>"Gaji Pokok Baru" , "size" => 20), //J
                array("name"=>"TMT Lama (MM/DD/YYYY)", "size" => 30), //K
                array("name"=>"Jenjang Lama"    , "size" => 20), //L
                array("name"=>"Jenjang Baru"    , "size" => 20), //M
                array("name"=>"Keterangan"      , "size" => 25), //N
                array("name"=>"Id Pegawai"      , "size" => 25), //O
                array("name"=>"Id Jabatan Lama" , "size" => 25), //P
                array("name"=>"Id Jabatan Baru" , "size" => 25), //Q
                array("name"=>"Id PenerimaSK"   , "size" => 25)  //R
            );
        } else if($sub_tipe == 4) {
            $headerData = array(
                array("name"=>"Nama Pegawai"    , "size" => 25), //A
                array("name"=>"NIP"             , "size" => 15), //B
                array("name"=>"Jabatan Lama"    , "size" => 25), //C
                array("name"=>"Jabatan Baru"    , "size" => 25), //D
                array("name"=>"Gol.Baru"        , "size" => 10), //E
                array("name"=>"TMT Lama (MM/DD/YYYY)", "size" => 30), //F
                array("name"=>"Jenjang Lama"    , "size" => 20), //G
                array("name"=>"Jenjang Baru"    , "size" => 20), //H
                array("name"=>"Keterangan"      , "size" => 25), //I
                array("name"=>"Id Pegawai"      , "size" => 25), //J
                array("name"=>"Id Jabatan Lama" , "size" => 25), //K
                array("name"=>"Id Jabatan Baru" , "size" => 25), //L
                array("name"=>"Id PenerimaSK"   , "size" => 25)  //M
            );
        }else if($sub_tipe == 5) {
            $headerData = array(
                array("name"=>"Nama Pegawai"    , "size" => 25), //A
                array("name"=>"NIP"             , "size" => 15), //B
                array("name"=>"Jabatan"         , "size" => 25), //C
                array("name"=>"Gol.Baru"        , "size" => 10), //D
                array("name"=>"TMT Lama (MM/DD/YYYY)", "size" => 30), //E
                array("name"=>"Jenjang Lama"    , "size" => 20), //F
                array("name"=>"Jenjang Baru"    , "size" => 20), //G
                array("name"=>"Keterangan"      , "size" => 25), //H
                array("name"=>"Id Pegawai"      , "size" => 25), //I
                array("name"=>"Id Jabatan Lama" , "size" => 25), //J
                array("name"=>"Id PenerimaSK"   , "size" => 25)  //K
            );
        }
        
        $letter= "A";
        foreach ($headerData as $key => $col) {
            $sheetStaf->setCellValue($letter.'1', $col['name']);   
            $sheetStaf->getColumnDimension($letter++)->setWidth($col['size']);                     
        }
        
        $length = count($staf)+1;
        $this->setDataValidation($sheetStaf,'C2:C'.$length, 'Master!$A$2:$A$'.$jabatanRangeEnd);
        // $this->setDataValidation($sheetStaf,'F2:F'.$length, '=Golongan');

        if($sub_tipe == 3 || $sub_tipe == 4) {
            $this->setDataValidation($sheetStaf,'D2:D'.$length, 'Master!$A$2:$A$'.$jabatanRangeEnd);
        }

        $sheetStaf->getStyle('A1:'.$letter.'1')->getFont()->setBold(true);
        
        if($sub_tipe == 1 || $sub_tipe == 2) {
            $sheetStaf->getStyle('H')->getNumberFormat()->setFormatCode('Rp #,##0.00');
            $sheetStaf->getStyle('I')->getNumberFormat()->setFormatCode('Rp #,##0.00');
            $sheetStaf->getStyle('J')->getNumberFormat()
                      ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
        } else if($sub_tipe == 0 || $sub_tipe == 5) {
            $sheetStaf->getStyle('E')->getNumberFormat()
                      ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
        } else if($sub_tipe == 3) {
            $sheetStaf->getStyle('I')->getNumberFormat()->setFormatCode('Rp #,##0.00');
            $sheetStaf->getStyle('J')->getNumberFormat()->setFormatCode('Rp #,##0.00');
            $sheetStaf->getStyle('K')->getNumberFormat()
                      ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
        } else if($sub_tipe == 4) {
            $sheetStaf->getStyle('F')->getNumberFormat()
                      ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
        }
        // Insert data
        foreach ($staf as $key => $value) {
            $index = $key+2;
            $sheetStaf->setCellValue('A'.$index, $value['staf_nama'])
                      ->setCellValue('B'.$index, strval($value['staf_kode']))
                      ->setCellValue('C'.$index, $value['jabatan_lama_nama']);
                    //   ->setCellValue('D'.$index, $value['jabatan_baru_nama']);
                      //Jabatan Baru di set validation di bagian bawah // kolom D

            if(empty($value['golongan_lama_level']) && ($sub_tipe == 1 || $sub_tipe == 2)) {
                $value['golongan_lama_level'] = 0;// Gol Lama
            }
            
            if($sub_tipe == 1 || $sub_tipe == 2){
                $sheetStaf->setCellValue('D'.$index,$value['golongan_lama_level']);  
                if($sub_tipe == 1){ // Gol Baru
                    $sheetStaf->setCellValue('E'.$index,'=(D'.$index.'+1)');
                }else{
                    $sheetStaf->setCellValue('E'.$index,'=(D'.$index.")");
                }

                if(empty($value['surat_penerimask_sglama'])) $value['surat_penerimask_sglama'] = 0;
                $sheetStaf->setCellValue('F'.$index,$value['surat_penerimask_sglama']); // SGT Lama

                if($sub_tipe == 2){ //SGT baru
                    $sheetStaf->setCellValue('G'.$index,'=(F'.$index.'+1)');
                }else{
                    $sheetStaf->setCellValue('G'.$index,'=(F'.$index.")");
                }

                // Gaji Pokok Lama
                $sgtBaru = "VLOOKUP(D".$index.",Master!D2:F".$golonganRangeEnd.",3,0) * F".$index;
                $sheetStaf->setCellValue('H'.$index,"=(VLOOKUP(D".$index.",Master!D2:F".$golonganRangeEnd.",2,0)+".$sgtBaru.")");                  
                
                // Gaji Pokok Baru
                $sgtLama = "VLOOKUP(E".$index.",Master!D2:F".$golonganRangeEnd.",3,0) * G".$index;
                $sheetStaf->setCellValue('I'.$index,"=(VLOOKUP(E".$index.",Master!D2:F".$golonganRangeEnd.",2,0)+".$sgtLama.")");
            } else if($sub_tipe == 3) {
                // Gaji Pokok Lama
                $sgtBaru = "VLOOKUP(E".$index.",Master!D2:F".$golonganRangeEnd.",3,0) * G".$index;
                $sheetStaf->setCellValue('I'.$index,"=(VLOOKUP(E".$index.",Master!D2:F".$golonganRangeEnd.",2,0)+".$sgtBaru.")");                  
                
                // Gaji Pokok Baru
                $sgtLama = "VLOOKUP(F".$index.",Master!D2:F".$golonganRangeEnd.",3,0) * H".$index;
                $sheetStaf->setCellValue('J'.$index,"=(VLOOKUP(F".$index.",Master!D2:F".$golonganRangeEnd.",2,0)+".$sgtLama.")");
            }

            $tmt_date = null;
            if($value['surat_penerimask_tmt']) {
                $tmt_date = date_create($value['surat_penerimask_tmt']);
                $tmt_date = date_format($tmt_date,"m/d/Y");
            }

            if($sub_tipe == 1 || $sub_tipe == 2) {
                $sheetStaf->setCellValue('J'.$index, $tmt_date)
                          ->setCellValue('K'.$index, $value['surat_penerimask_jenjang_jabatan_lama'])
                          ->setCellValue('L'.$index, $value['surat_penerimask_keterangan']);
                $sheetStaf->setCellValue('M'.$index, $value['staf_id']);
                $sheetStaf->setCellValue('N'.$index,"=VLOOKUP(C".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan lama id
                $sheetStaf->setCellValue('O'.$index, $value['surat_penerimask_id']);
            } else if($sub_tipe == 0) {
                $sheetStaf->setCellValue('D'.$index, $value['golongan_baru_level'])
                          ->setCellValue('E'.$index, $tmt_date)
                          ->setCellValue('F'.$index, $value['surat_penerimask_jenjang_jabatan_lama'])
                          ->setCellValue('G'.$index, $value['surat_penerimask_keterangan']);
                $sheetStaf->setCellValue('H'.$index, $value['staf_id']);
                $sheetStaf->setCellValue('I'.$index,"=VLOOKUP(C".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan lama id
                $sheetStaf->setCellValue('J'.$index, $value['surat_penerimask_id']);
            } else if($sub_tipe == 3) {
                $sheetStaf->setCellValue('D'.$index, $value['jabatan_baru_nama'])
                          ->setCellValue('E'.$index, $value['golongan_lama_level'])
                          ->setCellValue('F'.$index, $value['golongan_baru_level'])
                          ->setCellValue('G'.$index, $value['surat_penerimask_sglama'])
                          ->setCellValue('H'.$index, $value['surat_penerimask_sgbaru'])
                          ->setCellValue('K'.$index, $tmt_date)
                          ->setCellValue('L'.$index, $value['surat_penerimask_jenjang_jabatan_lama'])
                          ->setCellValue('M'.$index, $value['surat_penerimask_jenjang_jabatan_baru'])
                          ->setCellValue('N'.$index, $value['surat_penerimask_keterangan']);
                $sheetStaf->setCellValue('O'.$index, $value['staf_id']);
                $sheetStaf->setCellValue('P'.$index,"=VLOOKUP(C".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan lama id
                $sheetStaf->setCellValue('Q'.$index,"=VLOOKUP(D".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan baru id
                $sheetStaf->setCellValue('R'.$index, $value['surat_penerimask_id']);
            } else if($sub_tipe == 4) {
                $sheetStaf->setCellValue('D'.$index, $value['jabatan_baru_nama'])
                          ->setCellValue('E'.$index, $value['golongan_baru_level'])
                          ->setCellValue('F'.$index, $tmt_date)
                          ->setCellValue('G'.$index, $value['surat_penerimask_jenjang_jabatan_lama'])
                          ->setCellValue('H'.$index, $value['surat_penerimask_jenjang_jabatan_baru'])
                          ->setCellValue('I'.$index, $value['surat_penerimask_keterangan']);
                $sheetStaf->setCellValue('J'.$index, $value['staf_id']);
                $sheetStaf->setCellValue('K'.$index,"=VLOOKUP(C".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan lama id
                $sheetStaf->setCellValue('L'.$index,"=VLOOKUP(D".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan baru id
                $sheetStaf->setCellValue('M'.$index, $value['surat_penerimask_id']);
            } else if($sub_tipe == 5) {
                $sheetStaf->setCellValue('D'.$index, $value['golongan_baru_level'])
                          ->setCellValue('E'.$index, $tmt_date)
                          ->setCellValue('F'.$index, $value['surat_penerimask_jenjang_jabatan_lama'])
                          ->setCellValue('G'.$index, $value['surat_penerimask_jenjang_jabatan_baru'])
                          ->setCellValue('H'.$index, $value['surat_penerimask_keterangan']);
                $sheetStaf->setCellValue('I'.$index, $value['staf_id']);
                $sheetStaf->setCellValue('J'.$index,"=VLOOKUP(C".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan lama id
                $sheetStaf->setCellValue('K'.$index, $value['surat_penerimask_id']);
            }
        }

        // Set Header Sheet not visible (for id)
        if($sub_tipe == 1 || $sub_tipe == 2) {
            $sheetStaf->getColumnDimension('M')->setVisible(false);
            $sheetStaf->getColumnDimension('N')->setVisible(false);        
            $sheetStaf->getColumnDimension('O')->setVisible(false);
        } else if($sub_tipe == 0) {
            $sheetStaf->getColumnDimension('H')->setVisible(false);
            $sheetStaf->getColumnDimension('I')->setVisible(false);        
            $sheetStaf->getColumnDimension('J')->setVisible(false);
        } else if($sub_tipe == 3) {
            $sheetStaf->getColumnDimension('O')->setVisible(false);
            $sheetStaf->getColumnDimension('P')->setVisible(false);        
            $sheetStaf->getColumnDimension('Q')->setVisible(false);
            $sheetStaf->getColumnDimension('R')->setVisible(false);
        } else if($sub_tipe == 4) {
            $sheetStaf->getColumnDimension('J')->setVisible(false);
            $sheetStaf->getColumnDimension('K')->setVisible(false);        
            $sheetStaf->getColumnDimension('L')->setVisible(false);
            $sheetStaf->getColumnDimension('M')->setVisible(false);
        } else if($sub_tipe == 5) {
            $sheetStaf->getColumnDimension('I')->setVisible(false);        
            $sheetStaf->getColumnDimension('J')->setVisible(false);
            $sheetStaf->getColumnDimension('K')->setVisible(false);
        } 
        
        //Create dropdown on sheet 1
        $jmlStaf = count($staf)+1;        
        // $this->setDataValidation($sheetStaf,'D2:D'.$jmlStaf, '=Jabatan');
        // $this->setDataValidation($sheetStaf,'F2:F'.$jmlStaf, '=Golongan');

        $sheetStaf->setTitle('Data Staf');

        $sheetStaf->getStyle('B1:B'.$jmlStaf)
                  ->getNumberFormat()
                  ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);

        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xls($spreadsheet);
        $namefile = "TemplateKolektif(".$config->surat_registrasi.")_".$now;
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'.$namefile.'.xls"');    
        $writer->save("php://output");
    }

    function readTemplateKolektif($file = null){
        if(!$file) return;
        
        $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
        $spreadsheet = $reader->load($file['tmp_name']);
        // $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file['tmp_name']);
        
        $surat_id = $spreadsheet->setActiveSheetIndex(0)->getCell('G2')->getValue();
        $jenis_sub = $spreadsheet->setActiveSheetIndex(0)->getCell('H2')->getValue();
        $spreadsheet->setActiveSheetIndex(1);
        $sheets = $spreadsheet->getActiveSheet(1);
 
        $highestRow = $sheets->getHighestRow();

        $number_of_columns = 0;
        if($jenis_sub == 1 || $jenis_sub == 2) {
            $number_of_columns = 16;
        } else if($jenis_sub == 0) {
            $number_of_columns = 11;
        } else if($jenis_sub == 3) {
            $number_of_columns = 19;
        } else if($jenis_sub == 4) {
            $number_of_columns = 14;
        } else if($jenis_sub == 5) {
            $number_of_columns = 12;
        }

        for ($row = 1; $row < $highestRow + 1; $row++) {
            $dataset = array();
            for ($column = 0; $column < $number_of_columns; $column++) {
                $dataset[] = $sheets->getCellByColumnAndRow($column, $row)->getCalculatedValue();
            }
            $datasets[] = $dataset;
        }

        $header = $datasets[0];
        // $a = $header[0]; // Always null
        $staf_nama          = "staf_nama";
        $nip                = "staf_kode";
        $jabatan_lama       = "jabatan_lama_nama";
        $jabatan_baru       = "jabatan_baru_nama";
        $golongan_lama      = "surat_penerimask_gollama";
        $golongan_baru      = "surat_penerimask_golbaru";
        $sgt_lama           = "surat_penerimask_sglama";
        $sgt_baru           = "surat_penerimask_sgbaru";
        $gaji_pokok_lama    = "surat_penerimask_gplama";
        $gaji_pokok_baru    = "surat_penerimask_gpbaru";
        $tmt                = "surat_penerimask_tmt";
        $jenjang_lama       = "surat_penerimask_jenjang_jabatan_lama";
        $jenjang_baru       = "surat_penerimask_jenjang_jabatan_baru";
        $keterangan         = "surat_penerimask_keterangan";
        $staf_id            = "surat_penerimask_staf";
        $jabatan_id_lama    = "surat_penerimask_jabatan_lama";
        $jabatan_id_baru    = "surat_penerimask_jabatan_baru";
        $penerima_id        = "surat_penerimask_id";

        $blocco = array();

        for ($i=1; $i<count($datasets); $i++ ) {

            $parte = array();
            $parte = $datasets[$i];
            
            if($jenis_sub == 1 || $jenis_sub == 2) {
                $tmt_date = null;
                if($parte[10]) {
                    $tmt_date = date('Y-m-d', strtotime($parte[10]));
                }

                $blocco[] = array(
                    $staf_nama          => $parte[1],
                    $nip                => $parte[2],
                    $jabatan_lama       => $parte[3],
                    $golongan_lama      => $parte[4],
                    $golongan_baru      => $parte[5],
                    $sgt_lama           => $parte[6],
                    $sgt_baru           => $parte[7],
                    $gaji_pokok_lama    => intval($parte[8]),
                    $gaji_pokok_baru    => intval($parte[9]),
                    $tmt                => $tmt_date,
                    $jenjang_lama       => $parte[11],
                    $keterangan         => $parte[12],
                    $staf_id            => $parte[13],
                    $jabatan_id_lama    => $parte[3] ? $parte[14] : null,
                    $penerima_id        => $parte[15]
                );
            } else if($jenis_sub == 0) {
                $tmt_date = null;
                if($parte[5]) {
                    $tmt_date = date('Y-m-d', strtotime($parte[5]));
                }

                $blocco[] = array(
                    $staf_nama          => $parte[1],
                    $nip                => $parte[2],
                    $jabatan_lama       => $parte[3],
                    $golongan_baru      => $parte[4],
                    $tmt                => $tmt_date,
                    $jenjang_lama       => $parte[6],
                    $keterangan         => $parte[7],
                    $staf_id            => $parte[8],
                    $jabatan_id_lama    => $parte[3] ? $parte[9] : null,
                    $penerima_id        => $parte[10]
                );
            } else if($jenis_sub == 3) {
                $tmt_date = null;
                if($parte[11]) {
                    $tmt_date = date('Y-m-d', strtotime($parte[11]));
                }

                $blocco[] = array(
                    $staf_nama          => $parte[1],
                    $nip                => $parte[2],
                    $jabatan_lama       => $parte[3],
                    $jabatan_baru       => $parte[4],
                    $golongan_lama      => $parte[5],
                    $golongan_baru      => $parte[6],
                    $sgt_lama           => $parte[7],
                    $sgt_baru           => $parte[8],
                    $gaji_pokok_lama    => intval($parte[9]),
                    $gaji_pokok_baru    => intval($parte[10]),
                    $tmt                => $tmt_date,
                    $jenjang_lama       => $parte[12],
                    $jenjang_baru       => $parte[13],
                    $keterangan         => $parte[14],
                    $staf_id            => $parte[15],
                    $jabatan_id_lama    => $parte[3] ? $parte[16] : null,
                    $jabatan_id_baru    => $parte[4] ? $parte[17] : null,
                    $penerima_id        => $parte[18]
                );
            } else if($jenis_sub == 4) {
                $tmt_date = null;
                if($parte[6]) {
                    $tmt_date = date('Y-m-d', strtotime($parte[6]));
                }

                $blocco[] = array(
                    $staf_nama          => $parte[1],
                    $nip                => $parte[2],
                    $jabatan_lama       => $parte[3],
                    $jabatan_baru       => $parte[4],
                    $golongan_baru      => $parte[5],
                    $tmt                => $tmt_date,
                    $jenjang_lama       => $parte[7],
                    $jenjang_baru       => $parte[8],
                    $keterangan         => $parte[9],
                    $staf_id            => $parte[10],
                    $jabatan_id_lama    => $parte[3] ? $parte[11] : null,
                    $jabatan_id_baru    => $parte[4] ? $parte[12] : null,
                    $penerima_id        => $parte[13]
                );
            } else if($jenis_sub == 5) {
                $tmt_date = null;
                if($parte[5]) {
                    $tmt_date = date('Y-m-d', strtotime($parte[5]));
                }

                $blocco[] = array(
                    $staf_nama          => $parte[1],
                    $nip                => $parte[2],
                    $jabatan_lama       => $parte[3],
                    $golongan_baru      => $parte[4],
                    $tmt                => $tmt_date,
                    $jenjang_lama       => $parte[6],
                    $jenjang_baru       => $parte[7],
                    $keterangan         => $parte[8],
                    $staf_id            => $parte[9],
                    $jabatan_id_lama    => $parte[3] ? $parte[10] : null,
                    $penerima_id        => $parte[11]
                );
            }
            unset($parte);
        }

        $response = (object)["surat_id"=>$surat_id, "jenis_sub"=>$jenis_sub, "penerima" => $blocco];

        return $response;
    }
}