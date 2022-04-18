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
        $objValidation = new $this->dataValidation();

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
        
        
        $golonganJenis = false; // true : SK golongan, false : SK Berkala get from config
        $isFormulaForm  = false; // true : show formula form, false : empty formula form get from config

        switch ($config->sub_type) {
            case '1':
                $golonganJenis = true;
                $isFormulaForm = true;
                break;
            case '2':
                $golonganJenis = false;
                $isFormulaForm = true;
                break;
            default:
                $golonganJenis = false;
                $isFormulaForm = false; 
                break;
        }
        
        $surat_id = $config->surat_id;

        //Create spreadsheet temp
        $spreadsheet = new $this->spreadsheet;

        //Create sheet 1
        $sheetMaster = $spreadsheet->setActiveSheetIndex(0);
        // $headerData = array("Nama Pegawai","NIP","Jabatan Lama","Golongan","Jabatan Baru","Jenjang Jabatan Lama","Jenjang Jabatan Baru","Keterangan");
        
        // Header Jabatan & Golongan
        $sheetMaster->setCellValue('A1','JABATAN_ID')
                    ->setCellValue('B1','JABATAN_NAMA')
                    ->setCellValue('D1','GOLONGAN')
                    ->setCellValue('E1','GAJI SGT 0')
                    ->setCellValue('F1','SGT')
                    ->setCellValue('G1','SURAT');
                    
        $sheetMaster->setCellValue('G2',$surat_id);     
        
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

        // resize colom
        $nameSheetMaster = 'Master';
        $sheetMaster->getColumnDimension('A')->setWidth(50);
        $sheetMaster->getColumnDimension('B')->setWidth(40);
        $sheetMaster->getColumnDimension('D')->setWidth(15);
        $sheetMaster->getColumnDimension('E')->setWidth(25);
        $sheetMaster->getColumnDimension('F')->setWidth(20);
        $sheetMaster->setTitle($nameSheetMaster);     

        //Create Lookup master        
        $spreadsheet->addNamedRange( new \PhpOffice\PhpSpreadsheet\NamedRange('Jabatan', $sheetMaster, 'A2:A'.$jabatanRangeEnd));
        $spreadsheet->addNamedRange( new \PhpOffice\PhpSpreadsheet\NamedRange('Golongan', $sheetMaster, 'D2:D'.$golonganRangeEnd));

        // Protect Sheet Master
        $sheetMaster->getProtection()->setSheet(true);


        //create sheet Data
        $spreadsheet->createSheet(1);        

        $sheetStaf = $spreadsheet->setActiveSheetIndex(1);
        
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
            array("name"=>"Jenjang Lama"    , "size" => 20), //K
            array("name"=>"Jenjang Baru"    , "size" => 20), //L
            array("name"=>"Keterangan"      , "size" => 25),  //M
            array("name"=>"Id Pegawai"      , "size" => 25),  //N
            array("name"=>"Id Jabatan"      , "size" => 25),  //O
            array("name"=>"Id PenerimaSK"   , "size" => 25)  //P
        );

        
        $letter= "A";
        foreach ($headerData as $key => $col) {
            $sheetStaf->setCellValue($letter.'1', $col['name']);   
            $sheetStaf->getColumnDimension($letter++)->setWidth($col['size']);                     
        }

        $sheetStaf->getStyle('A1:'.$letter.'1')->getFont()->setBold(true);
        $sheetStaf->getStyle('I')->getNumberFormat()->setFormatCode('Rp #,##0.00');
        $sheetStaf->getStyle('J')->getNumberFormat()->setFormatCode('Rp #,##0.00');
        // Insert data
        foreach ($staf as $key => $value) {
            $index = $key+2;
            $sheetStaf->setCellValue('A'.$index, $value['staf_nama'])
                      ->setCellValue('B'.$index, strval($value['staf_kode']))
                      ->setCellValue('C'.$index, $value['jabatan_lama_nama'])
                      ->setCellValue('D'.$index, $value['jabatan_baru_nama']);
                      //Jabatan Baru di set validation di bagian bawah // kolom D

            if(empty($value['golongan_lama_level']) && $isFormulaForm) {
                $value['golongan_lama_level'] = 0;// Gol Lama
            }
            $sheetStaf->setCellValue('E'.$index,$value['golongan_lama_level']); 

            if($isFormulaForm){
                if($golonganJenis){ // Gol Baru
                    $sheetStaf->setCellValue('F'.$index,'=(E'.$index.'+1)');
                }else{
                    $sheetStaf->setCellValue('F'.$index,'=(E'.$index.")");
                }           

                if(empty($value['surat_penerimask_sglama'])) $value['surat_penerimask_sglama'] = 0;
                $sheetStaf->setCellValue('G'.$index,$value['surat_penerimask_sglama']); // SGT Lama

                if(!$golonganJenis){ //SGT baru
                    $sheetStaf->setCellValue('H'.$index,'=(G'.$index.'+1)');
                }else{
                    $sheetStaf->setCellValue('H'.$index,'=(G'.$index.")");
                }

                // Gaji Pokok Lama

                $sgtBaru = "VLOOKUP(E".$index.",Master!D2:F".$golonganRangeEnd.",3,0) * G".$index;
                $sheetStaf->setCellValue('I'.$index,"=(VLOOKUP(E".$index.",Master!D2:F".$golonganRangeEnd.",2,0)+".$sgtBaru.")");                  
                
                // Gaji Pokok Baru            
                $sgtLama = "VLOOKUP(F".$index.",Master!D2:F".$golonganRangeEnd.",3,0) * H".$index;
                $sheetStaf->setCellValue('J'.$index,"=(VLOOKUP(F".$index.",Master!D2:F".$golonganRangeEnd.",2,0)+".$sgtLama.")");
            }

            $sheetStaf->setCellValue('K'.$index, $value['surat_penerimask_jenjang_jabatan_lama'])
                      ->setCellValue('L'.$index, $value['surat_penerimask_jenjang_jabatan_baru'])
                      ->setCellValue('M'.$index, $value['surat_penerimask_keterangan']);
            $sheetStaf->setCellValue('N'.$index, $value['staf_id']);
            $sheetStaf->setCellValue('O'.$index,"=VLOOKUP(D".$index.",Master!A2:B".$jabatanRangeEnd.",2,0)"); // jabatan baru id
            $sheetStaf->setCellValue('P'.$index, $value['surat_penerimask_id']);
            
        }

        // Set Header Sheet not visible (for id)
        $sheetStaf->getColumnDimension('N')->setVisible(false);
        $sheetStaf->getColumnDimension('O')->setVisible(false);        
        $sheetStaf->getColumnDimension('P')->setVisible(false);  
        
        $sheetStaf->setTitle('Data Staf');

        //Create dropdown on sheet 1
        $jmlStaf = count($staf)+1;        
        $this->setDataValidation($sheetStaf,'D2:D'.$jmlStaf, '=Jabatan');
        $this->setDataValidation($sheetStaf,'F2:F'.$jmlStaf, '=Golongan');

        $sheetStaf->getStyle('B1:B'.$jmlStaf)
                  ->getNumberFormat()
                  ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
        // echo "<pre>";
        // print_r($spreadsheet->toArray());
        // die();
        // return;
        // $spreadsheet->setActiveSheetIndex(1);
        $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
        // $writer->setOffice2003Compatibility(true);
        // $file = $_path.'TemplateKolektif.xlsx';
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="TemplateKolektif.xlsx"');
        $writer->save('php://output');
        

        // //Delete spreadsheet temp
        $spreadsheet->disconnectWorksheets();
        unset($spreadsheet);

                
    }


    function readTemplateKolektif($file = null){        
        if(!$file) return;
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file['tmp_name']);
        
        $surat_id = $spreadsheet->setActiveSheetIndex(0)->getCell('G2')->getValue();

        $spreadsheet->setActiveSheetIndex(1);
        $sheets = $spreadsheet->getActiveSheet(1);
 
        $highestRow = $sheets->getHighestRow();

        $number_of_columns = 17;
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
        $jenjang_lama       = "surat_penerimask_jenjang_jabatan_lama";
        $jenjang_baru       = "surat_penerimask_jenjang_jabatan_baru";
        $keterangan         = "surat_penerimask_keterangan";
        $staf_id            = "surat_penerimask_staf";
        $jabatan_id_baru    = "surat_penerimask_jabatan_baru";
        $penerima_id        = "surat_penerimask_id";

        $blocco = array();

        for ($i=1; $i<count($datasets); $i++ ) {

            $parte = array();
            $parte = $datasets[$i];
            // $parte[10] = 1;
            $jabatan_baru_id_value = null;
            if(!empty($parte[4])){
                $jabatan_baru_id_value = $parte[15];
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
                $jenjang_lama       => $parte[11],
                $jenjang_baru       => $parte[12],
                $keterangan         => $parte[13],
                $staf_id            => $parte[14],
                $jabatan_id_baru    => $jabatan_baru_id_value,
                $penerima_id        => $parte[16]
            );
            unset($parte);

        }

        $response = (object)["surat_id"=>$surat_id, "penerima" => $blocco];

        return $response;
    }
}