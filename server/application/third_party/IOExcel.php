<?php

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//											$excel = new IOExcel();													  //
	//	1) $excel->output()		| 2) $excel->output() 		| 3) $excel->output()	| 4) $excel->input()			  	  //
	//		->setHead()			| 		->setHead()			| 		->create() 		| 		->upload()					  //
	//		->setBody()			| 		->getDataModel()	| 		->export()		| 		->getDataUpload();			  //
	//		->setSheetTitle()	| 		->export()			| 		->json();											  //
	//		->export()			|		->json();																		  //
	//		->json();																									  //
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  									FUNCTION
	//	objPHPExcel() 
	//	setActiveSheetIndex()
	//	getActiveSheet()
	//	createSheet()
	//	input()
	//	output()
	//	setHead()
	//  setBody()
	//	create()
	//	getDataModel()
	//  setSheetTitle()
	//	export()
	//	get()
	//  json()
	//  setDataCells()
	//  setMergeCells()
	//	setCellValue()
	//  upload()
	//  getDataUpload()
	//  removeNull()
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//											PROPERTIES CELLS 																				
	//	1) cell 				: string
	//	2) border 				: string/array
	//	3) font 				: array
	//	4) text 				: array
	//	5) alignment 			: array
	//	6) font-bold 			: boolean
	//	7) font-size			: integer
	//	8) font-underline		: boolean
	//	9) font-italic			: boolean
	//	10) font-strike			: boolean
	//	11) font-name			: string
	//	12) font-color			: string/integer
	//	13) text-rotate			: integer
	//	14) horizontal-align	: string
	//	15) vertical-align		: string
	//	16) nowrap				: boolean
	//	17) height 				: integer
	//	18) width 				: integer
	//	19) border-type 		: string
	//	20) border-style 		: string
	//	21) border-color 		: string/integer
	//	22) text-align 			: string
	//	23) vertical-align      : string
	//	24) text-format 		: string
	//	25) background-type 	: string
	//	26) background-color	: string
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 											EXAMPLE
	//  
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

require_once (APPPATH.'/third_party/PHPExcel/IOFactory.php');
class IOExcel extends IOFactory
{
	private $me;
	private $objPHPExcel;
	private $objset;
	private $objget;
	private $var = array(
		'data_head' 		=> array(),
		'data_body' 		=> array(),
		'data_model'		=> array(),
		'name_model'		=> array(),
		'data_vmode'		=> array(),
		'data_export'		=> array(),
		'start_row'	    	=> 1,
		'start_col' 		=> 1,
		'start_head'		=> 1,
		'start_body'		=> 1,
		'last_row'			=> null,
		'last_col'			=> null,
		'xls_name'			=> null,
		'set_auto'			=> true,
		'data_create'       => array(),
		'io'				=> null,
	);

	private $file_xls     	= array();
	private $var_error 		= array();
	private $styles 		= array();
	private $set_array      = array(
		'function_name' 	=> null,
		'data' 				=> array(),
	);

	function __construct($rowcol='')
	{
		$this->me =& get_instance();
       	$this->me->load->database();
       	$this->me->load->library(array('PHPExcel','PHPExcel/IOFactory'));
       	$this->objPHPExcel = new PHPExcel();
       	$this->objset = ($this->objset==null || $this->objset=='') ? $this->objPHPExcel->setActiveSheetIndex(0) : $this->objPHPExcel->setActiveSheetIndex($this->objset);
       	$this->objget = ($this->objget==null || $this->objget=='') ? $this->objPHPExcel->getActiveSheet(0) : $this->objPHPExcel->getActiveSheet($this->objget);

       	if (!empty($rowcol)) {
       		$this->var['start_head'] = (!empty($rowcol[0]) && $rowcol[0]!=null) ? $rowcol[0] : 1;
       		$start_body 			 = (!empty($rowcol[1]) && $rowcol[1] > $rowcol[0]) ? $rowcol[1] : ($rowcol[0]+1);
			$this->var['start_body'] = $start_body;
			$this->var['start_col']  = (!empty($rowcol[2]) && $rowcol[2]!=null) ? $rowcol[2] : 1;
			$this->var['start_row']  = (!empty($rowcol[3]) && $rowcol[3]!=null) ? $rowcol[3] : 1;
       	}
	}

	function objPHPExcel()
	{
		return $this->objPHPExcel;
	}

	function setActiveSheetIndex($value=null)
	{
		$this->objset = ($value==null || $value=='') ? $this->objPHPExcel->setActiveSheetIndex(0) : $this->objPHPExcel->setActiveSheetIndex($value);
		return $this;
	}

	function getActiveSheet($value=null)
	{
		$this->objget = ($value==null || $value=='') ? $this->objPHPExcel->getActiveSheet(0) : $this->objPHPExcel->getActiveSheet($value);
		return $this;
	}

	function createSheet($value='')
	{
		$this->objset = $this->objPHPExcel->createSheet($value);
		return $this;
	}

	function output()
	{
		$this->var['io'] = 'output';
		return $this;
	}

	function input()
	{
		$this->var['io'] = 'input';
		return $this;
	}

	function setHead($data='',$callback='')
	{
		$operation = null;
		if (!empty($data)) {
			$operation = $this->create($data,null,'data_head');
			$this->set_array = array(
				'function_name' => 'setHead',
				'data' 			=> $data
			);
		}
		if (is_callable($callback)) {
			call_user_func($callback,array(
				'self'  => $operation,
				'all'	=> $this->var
			));
		}
		return $this;
	}

	function setBody($data='',$callback='')
	{
		$operation = null;
		if (!empty($data)) {
			$operation = $this->create($data,null,'data_head');
		}
		if (is_callable($callback)) {
			call_user_func($callback,array(
				'self'  => $operation,
				'all'	=> $this->var
			));
		}
		return $this;
	}

	function create($data='',$callback='',$jenis='')
	{
		if (!empty($data)) {
			$start_col  = $this->var['start_col'];
			$start_head = $this->var['start_head'];
			if ($this->isArrayMulti($data)) {
				if ($this->countDim($data)>1) {
					foreach ($data as $key => $value) {
						$is_merge = explode(':', $value['cell']);
						if (count($is_merge)>1) {
							$format_text = (!empty($value['text-format'])) ? $value['text-format'] : null; // format text
							$this->setMergeCells($value['cell'],$is_merge[0],$value['value'],$format_text);
						}else{
							$format_text = (!empty($value['text-format'])) ? $value['text-format'] : null; // format text
							$this->setCellValue($value['cell'],$value['value'],$format_text);
						}
						$this->cssproperties($value);
					}
				}else{
					$is_merge = explode(':', $data['cell']);
					if (count($is_merge)>1) {
						$format_text = (!empty($value['text-format'])) ? $value['text-format'] : null; // format text
						$this->setMergeCells($data['cell'],$is_merge[0],$data['value'],$format_text);  
					}else{
						$format_text = (!empty($value['text-format'])) ? $value['text-format'] : null; // format text
						$this->setCellValue($data['cell'],$data['value'],$format_text);
					}
					$this->cssproperties($data);
				}
			}else{
				foreach ($data as $key => $value) {
					$explode = explode('->', $value);
					$prop = $explode;
					$cssproperties = array();
					if (count($prop)>1) {
						unset($prop[0]);
						foreach ($prop as $key2 => $value2) {
							$explode_prop = explode(':', $value2);
							$cssproperties[$explode_prop[0]] = $explode_prop[1];
						}
					}
					$cell = $this->getNameFromNumber($key+$start_col);
	        		$this->objset->setCellValue($cell.$start_head, $explode[0]);
					$cssproperties['cell'] = $cell.$start_head;
					$this->cssproperties($cssproperties);
				}
			}

			if ($jenis!='') {
				return $this->var[$jenis] = $data;
			}else{
				$this->var['data_create'] = $data;
				if (is_callable($callback)) {
					call_user_func($callback,array(
						'self'  => $data,
						'all'	=> $this->var
					));
				}
				return $this;
			}
		}else{
			if (is_callable($callback)) {
				call_user_func($callback,array(
					'self'  => $data,
					'all'	=> $this->var
				));
			}
			return $this;
		}
	}

	/*
		Example getDataModel
			->getDataModel('MyModelName',array('my_field'=>'field'),'field ASC');
		Additional information : 
	*/
	function getDataModel($model_name=null,$filter=array(),$sort=null,$view_mode=null,$callback=null)
	{
		$filter = (array) $filter;

		if (!empty($model_name)) {
			$data = $this->me->$model_name->select(array(
				'filters_static' 	=> $filter,
				'sort_static'		=> $sort,
			));
			$vmode = $this->me->$model_name->get_view_mode($view_mode);

			$header 		= $this->var['data_head'];
			$start_head 	= $this->var['start_head'];
			$start_body 	= $this->var['start_body'];

			$start = ($start_body<=$start_head) ? ($start_head+1) : $start_body;

			if (!empty($data['data'])) {
				// set array				
				$set_data = array();
				foreach ($data['data'] as $key => $value) {
					$sub = array();
					foreach ($vmode as $key2 => $value2) {
						$data_fields = $value[$value2];
						$cell = $this->getNameFromNumber($key2+$this->var['start_col']).($start+$key);
						if ($this->var['set_auto']==true) {
		        			if ($key2==0) {
		        				$this->objset->setCellValue($cell,($key+1));
		        			}else{
		        				$this->objset->setCellValue($cell, $data_fields);
		        			}
		        		}else{
		        			$this->objset->setCellValue($cell, $data_fields);
		        		}
		        		$sub[$value2] = $value[$value2];
					}
					array_push($set_data, $sub);
	        	}
	        	$this->set_array = array(
					'function_name' => 'getDataModel',
					'data' => $set_data,
				);
			}
		}else{
			$this->var_error['error_getmodel'] = 'model not found';
		}

		if (is_callable($callback)) {
			call_user_func($callback,array(
				'self' 	=> array(
					'name_model' => $model_name,
					'data'		 => $data['data'],
					'vmode'      => $vmode,
				),
				'all'	=> $this->var
			));
		}
		return $this;
	}

	function setSheetTitle($value='')
	{
		$this->objset->setTitle($value);
		return $this;
	}

	function export($filename='',$callback='')
	{
		$this->var['xls_name'] = ($filename!=null) ? $filename : 'Download';
		if (is_callable($callback)) {
			call_user_func($callback,array(
				'self' 	=> $filename,
				'all'	=> $this->var
			));
		}
		return $this;
	}

	function get()
	{
		$filename = (!empty($this->var['xls_name'])) ? $this->var['xls_name'] : 'Download';
		$objWriter = IOFactory::createWriter($this->objPHPExcel, 'Excel2007');
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="'.$filename.'.xlsx"');
		header('Cache-Control: max-age=0');
		$objWriter->save('php://output');
	}

	function download()
	{
		$filename = (!empty($this->var['xls_name'])) ? $this->var['xls_name'] : 'Download';
		$name = $filename.'.xlsx';
		// $name = base_url().'data/'.$filename.'.xlsx';
		// print_r($name);
		$objWriter = new PHPExcel_Writer_Excel2007($this->objPHPExcel);
		$objWriter->save($name);
		// print_r(file_exists(base_url().$filename'.xlsx'));
	}

	function json()
	{
		$filename = (!empty($this->var['xls_name'])) ? $this->var['xls_name'] : 'Download';
		header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="'.$filename.'"');
        header('Cache-Control: max-age=0');
        ob_start();
        $objWriter = IOFactory::createWriter($this->objPHPExcel, 'Excel5');
        $objWriter->save('php://output');
        $xlsData = ob_get_contents();
        ob_end_clean();
        $response =  array(
            'success' => true,
            'file_name' => $this->var['xls_name'],
            'message' => 'Berhasil',
            'file' => "data:application/vnd.ms-excel;base64,".base64_encode($xlsData)
        );
        die(json_encode($response));
	}

	function setDataCells($data='',$callback='')
	{
		if (is_array($data)) {
			if ($this->countDim($data)>1) {
				foreach ($data as $key => $value) {
					$is_merge = explode(':', $value['cell']);
					if (count($is_merge)>1) {
						$this->setMergeCells($value['cell'],$is_merge[0],$value['value'], $value['format']);
					}else{
						$this->setCellValue($value['cell'],$value['value'], $value['format']);
					}
					$this->cssproperties($value);
				}
			}else{
				$is_merge = explode(':', $data['cell']);
				if (count($is_merge)>1) {
					$this->setMergeCells($data['cell'],$is_merge[0],$data['value']);
				}else{
					$this->setCellValue($data['cell'],$data['value']);
				}
				$this->cssproperties($data);
			}
		}else{
			$this->var['error_setdatacells'] = 'fields data must be a array';
		}
		return $this;
	}

	function setMergeCells($cell='',$cell_set='',$value='',$format_text='')
	{
		if (!empty($format_text)) {
			$this->objset->mergeCells($cell)->setCellValueExplicit($cell_set, $value, $this->setCellFormatType($format_text));
		}else{
			$this->objset->mergeCells($cell)->setCellValue($cell_set,$value);
		}
	}

	function setCellValue($cell='',$value='',$format_text='')
	{
		if (!empty($format_text)) {
			$this->objset->setCellValueExplicit($cell, $value, $this->setCellFormatType($format_text));
		}else{
			$this->objset->setCellValue($cell, $value);
		}
	}

	function getCellValue($cell='')
	{
		echo $this->objget->getCell('B7')->getValue();
	}

	function setStyles()
	{

	}

	function upload($config='',$callback='')
	{
		if (!empty($config)) {
			$filename   = time().$this->removeWhiteSpace($_FILES[$config['input_name']]['name']);
			$_config = array(
	            'upload_path'   => (!empty($config['upload_path'])) 	? $config['upload_path'] 	: null,
	            'file_name'     => (!empty($config['file_name'])) 		? $config['file_name'] 		: $filename,
	            'allowed_types' => (!empty($config['allowed_types'])) 	? $config['allowed_types'] 	: 'xls|xlsx|csv',
	            'max_size'      => (!empty($config['max_size'])) 		? $config['max_size'] 		: 10000,
	            'remove_file' 	=> (empty($config['remove_file']) && $config['remove_file']!=true) ? true : false,
	        );

	        $this->me->load->library('upload');
	        $this->me->upload->initialize($_config);
	        if(! $this->me->upload->do_upload($config['input_name']) ) {
	            $this->var['error_upload'] = $this->me->upload->display_errors();
	            die();
	        }
	             
	        $media = $this->me->upload->data('file_name');
	        $inputFileName = $_config['upload_path'].$media;

	        try {
	        	$inputFileType 	= IOFactory::identify($inputFileName);
	            $objReader 		= IOFactory::createReader($inputFileType);
	            $objPHPExcel_ 	= $objReader->load($inputFileName);
	        } catch(Exception $e) {
	            die('Error loading file "'.pathinfo($_config['file_name'],PATHINFO_BASENAME).'": '.$e->getMessage());
	        }

	        $sheet          = $objPHPExcel_->getActiveSheet();

	        $highestRow     = (!empty($config['hight_rows'])) ? $config['hight_rows'] : $sheet->getHighestRow();
	        $highestColumn  = (!empty($config['hight_cols'])) ? $config['hight_cols'] : $sheet->getHighestColumn();
	        $start_rows 	= (!empty($config['start_rows'])) ? $config['start_rows'] : 1;

	        $set_data = array();
	        for ($i=$start_rows; $i <= $highestRow ; $i++) { 
	            $rowData = $sheet->rangeToArray('A' . ($i) . ':' . $highestColumn . ($i), NULL, TRUE, FALSE);
	            array_push($set_data, $rowData[0]);
	        }

	        if ($_config['remove_file']) {
	        	unlink($inputFileName);
	        }

	        $this->file_xls = array(
	        	'success' 	=> true,
	        	'total'		=> count($set_data),
	        	'data'		=> $set_data,
	        );
		}
        return $this;
	}

	function removeWhiteSpace($text)
	{
	    return preg_replace('/\s+/', '_', $text);
	}

	function getDataUpload()
	{
		$operation = $this->removeNull($this->file_xls['data']);
		return array(
			'success'   => true,
			'total'     => count($operation),
			'data'		=> $operation
		);
	}

	function removeNull($data){
        $return = array();
        foreach ($data as $key => $value) {
            $ck = 0;
            foreach ($value as $key_2 => $value_2) {
                if ($value_2!="") {
                    $ck +=1;
                }
            }
            if ($ck>0) {
                array_push($return, $value);
            }
        }
        return $return;
    }

	function cssproperties($data='')
	{
		if (is_array($data)) {
			// array
			if (!empty($data['font'])) 				{ $this->setFont($data['cell'],$data['font']); }
			if (!empty($data['alignment'])) 		{ $this->setAlignment($data['cell'],$data['alignment']); }
			if (!empty($data['border'])) 			{ $this->setBorder($data['cell'],$data['border']); }

			//not array
			if (!empty($data['border-type'])) 		{ $this->setBorder($data['cell'],array('type'=>$data['border-type'])); }
			if (!empty($data['border-style'])) 		{ $this->setBorder($data['cell'],array('style'=>$data['border-style'])); }
			if (!empty($data['background-color'])) 	{ $this->setBackGroundColor($data['cell'],array('color'=>$data['background-color'])); }

			if (!empty($data['border-color'])) 		{ $this->setBorder($data['cell'],array('color'=>$data['border-color'])); }

			if (!empty($data['font-bold'])) 	 	{ $this->setFontBold($data['cell'],$data['font-bold']); }
			if (!empty($data['font-size'])) 	 	{ $this->setFontSize($data['cell'],$data['font-size']); }
			if (!empty($data['font-color'])) 	 	{ $this->setFontColor($data['cell'],$data['font-color']); }
			if (!empty($data['font-name'])) 	 	{ $this->setFontSize($data['cell'],$data['font-name']); }
			if (!empty($data['font-underline'])) 	{ $this->setFontUnderLine($data['cell'],$data['font-underline']); }
			if (!empty($data['font-italic'])) 	 	{ $this->setFontItalic($data['cell'],$data['font-italic']); }
			if (!empty($data['font-strike'])) 	 	{ $this->getFontStrike($data['cell'],$data['font-strike']); }

			if (!empty($data['text-rotate'])) 	 	{ $this->setTextRotate($data['cell'],$data['text-rotate']); }
			if (!empty($data['text-align'])) 	 	{ $this->setHorizontal($data['cell'],$data['text-align']); }

			if (!empty($data['nowrap'])) 	 		{ $this->setTextWrap($data['cell'],$data['nowrap']); }

			if (!empty($data['horizontal-align'])) 	{ $this->setHorizontal($data['cell'],$data['horizontal-align']); }
			if (!empty($data['vertical-align'])) 	{ $this->setVertical($data['cell'],$data['vertical-align']); }

			if (!empty($data['height'])) 			{ $this->getCellHeight($data['cell'],$data['height']); }
			if (!empty($data['width'])) 			{ $this->setCellWidth($data['cell'],$data['width']); }
		}
	}

	// FONT
	function setFont($cell='',$prop='')
	{
		if (is_array($prop)) {
			$styleArray = array(
			    'font'  => array(
			        'name'  	  => (!empty($prop['name'])) ? $prop['name'] : null,
			        'bold'  	  => (!empty($prop['bold']) && $prop['bold']==true) ? true : false,
			        'color' 	  => array(
			        	'rgb' 	  => (!empty($prop['color'])) ? $prop['color'] : null,
			        ),
			        'size'  	  => (!empty($prop['size'])) ? $prop['size'] : null,
			        'underline'   => (!empty($prop['underline'])) ? $this->setFontUnderLine($prop['underline']) : null,
			        'italic' 	  => (!empty($prop['italic']) && $prop['italic']==true) ? true : false,
			        'strike' 	  => (!empty($prop['strike']) && $prop['strike']==true) ? true : false,
 			    ));
    		$this->objset->getStyle($cell)->applyFromArray($styleArray);
		}else{
			$this->var_error['error_font'] = 'fields data must be a array';
		}
	}

	function setFontname($cell='',$value='')
	{
		$this->objset->getStyle($cell)->applyFromArray(array('font' => array('name' => $value)));
    	return $this;
	}

	function setFontBold($cell='',$value='')
	{
		if ($value!='' && $value==true) {
    		$this->objset->getStyle($cell)->getFont()->setBold(true);
    	}
	}

	function setFontColor($cell='',$value='')
	{
		$this->objset->getStyle($cell)->applyFromArray(array('font' => array('color' => array('rgb' => $value))));
	}

	function setFontSize($cell='',$value='')
	{
		$this->objset->getStyle($cell)->getFont()->setSize($value);
	}

	function setFontItalic($cell='',$value='')
	{
		$op = ($value!="" && $value==true) ? true : false;
    	$this->objset->getStyle($cell)->applyFromArray(array('font' => array('italic' => $op)));
	}

	function setFontUnderLine($value='')
	{
		if (!empty($value)) {
			if (is_array($value)) {
				
			}else{
				return PHPExcel_Style_Font::UNDERLINE_SINGLE;
			}
		}else{
			return null;
		}
	}

	function getFontStrike($cell='',$value='')
	{
		$op = ($value!="" && $value==true) ? true : false;
    	$this->objset->getStyle($cell)->applyFromArray(array('font' => array('strike' => $op)));
	}
	// END FONT

	// TEXT
	function setTextWrap($cell='',$value='')
    {
    	$warp = ($value!="" && $value==true) ? true : false;
    	$this->objset->getStyle($cell)->getAlignment()->setWrapText($warp);
    }

    function setTextRotate($cell='',$value='')
    {
    	$this->objset->getStyle($cell)->getAlignment()->setTextRotation($value);
    }
	// END TEXT

	function getCellHeight($cell='',$value='')
    {
    	$cls = $this->siSplit($cell);
    	if (!empty($value) && is_array($cls)) {
    		$_a = is_string($cls[1]) ? $cls[1] : (int) $cls[1];
    		$this->objget->getRowDimension($_a)->setRowHeight($value);
    	}else{
    		if (!empty($value)) {
    			$_a = is_string($value) ? $this->siConvert($value) : $value;
    			$this->objget->getRowDimension()->setRowHeight($_a);
    		}else{
    			$this->var_error['error_getcellheight'] = 'this parameter not found';
    		}
    	}
    	return $this;
    }

	// STRAT BORDER
	function setBorder($cell='',$prop='')
	{
		if ($prop=='auto' || $prop=='default') {
			$BStyle = array(
			  	'borders' => array(
				    'allborders' => array(
				      	'style' => 'thin',
				      	'color' => array('rgb' => null)
				    )
				)
			);
			$this->objset->getStyle($cell)->applyFromArray($BStyle);
		}else{
			if ($this->countDim($prop)>1) {
				foreach ($prop as $key => $value) {
					$BStyle = array(
					  	'borders' => array(
						    $key => array(
						      	'style' => (!empty($value['style'])) ? $value['style'] : 'thin',
						      	'color' => array('rgb' => (!empty($value['color'])) ? $value['color'] : null)
						    )
						)
					);
					$this->objset->getStyle($cell)->applyFromArray($BStyle);
				}
			}else{
				$key = (!empty($prop['type'])) ? $prop['type'] : 'allborders';
				$BStyle = array(
				  	'borders' => array(
					    $key => array(
					      	'style' => (!empty($prop['style'])) ? $prop['style'] : 'thin',
					      	'color' => array('rgb' => (!empty($prop['color'])) ? $prop['color'] : null)
					    )
					)
				);
				$this->objset->getStyle($cell)->applyFromArray($BStyle);
			}
		}
	}

	function setBackGroundColor($cell='',$prop='')
	{
		if (is_array($prop)) {
			if ($this->countDim($prop)>1) {
				
			}else{
				$BGcolor = array(
					'fill' => array(
			            'type' => (!empty($prop['type'])) ? $this->getFill($prop['type']) : PHPExcel_Style_Fill::FILL_SOLID,
			            'color' => array('rgb' => 
			            	(!empty($prop['color'])) ? $prop['color'] : null,
			            )
			        )
				);
				$this->objset->getStyle($cell)->applyFromArray($BGcolor);
			}
		}else{

		}
	}

	function setAutoBorder($config='')
	{
		$data = $this->set_array;
		$sh = $this->var['start_head']; 
		$sb = $this->var['start_body']; 
		$sc = $this->var['start_col'];  

		if (is_array($data['data'])) {
			$config = (empty($config)) ? 'default' : $config;
			if ($this->countDim($data['data'])>1) {
				$count_col = (count(array_count_values($data['data'][0]))+($sc-1));
				$count_row = (count($data['data']) + $sh);
				$first = $this->getNameFromNumber($sc).($sb);
				$last  = $this->getNameFromNumber($count_col).$count_row;
				$this->setBorder($first.':'.$last,$config);
			}else{
				if (!empty($data['data']) && $data['function_name']=='setHead') {
					$first = $this->getNameFromNumber($sc).$sh;
					$last  = $this->getNameFromNumber(count($data['data'])+$sc).$sh;
					$this->setBorder($first.':'.$last,$config);
				}else{

				}
			}
		}else{
			$this->var['error_setdatacells'] = 'fields data must be a array';
		}
		return $this;
	}

	function setAutoWidth($config='')
	{
		$data = $this->set_array;
		/*$sh = $this->var['start_head']; 
		$sb = $this->var['start_body']; 
		$sc = $this->var['start_col'];  
		$sr = $this->var['start_row'];
		$col_start = $this->getNameFromNumber($sr);
		$col_last  = $this->getNameFromNumber(count(array_count_values($data[0])));
		$this->setAutoSize($col_start,$col_last);*/
		return $this;
	}

	function getTypeBorder()
	{

	}

	function setAutoSize($start='',$last='')
	{
		if ($last!="") {
			foreach(range($start,$last) as $columnID) {
			    $this->objget->getColumnDimension($columnID)->setAutoSize(true);
			}
		}else{
			$this->objget->getColumnDimension($start)->setAutoSize(true);
		}
	}
	// END BORDER

	function setAlignment($cell='',$prop='')
	{
		if (!empty($prop['horizontal'])) { $this->setHorizontal($cell,$prop['horizontal']); }
		if (!empty($prop['vertical'])) { $this->setVertical($cell,$prop['vertical']); }
	}

	function setCellWidth($cell='',$prop='')
	{
		$col = $this->siSplit($cell);
    	if ($prop!="auto") {
    		$this->objget->getColumnDimension($col[0])->setWidth($prop);
    	}else if ($prop=='auto') {
    		$this->objget->getColumnDimension($col[0])->setAutoSize(true);
    	}else {
    		$this->var_error['error_setcellwidth'] = 'This parameter not found';
    	}
    	if (count($col)>4) {
			$this->var_error['error_setcellwidth'] = 'format cell not supported';
		}
	}

	function setHorizontal($cell='',$value='')
    {
    	if ($value=='center') {
    		return $this->objset->getStyle($cell)->getAlignment()->setHorizontal( PHPExcel_Style_Alignment::HORIZONTAL_CENTER );
    	}elseif ($value=='right') {
    		return $this->objset->getStyle($cell)->getAlignment()->setHorizontal( PHPExcel_Style_Alignment::HORIZONTAL_RIGHT );
    	}elseif ($value=='left') {
    		return $this->objset->getStyle($cell)->getAlignment()->setHorizontal( PHPExcel_Style_Alignment::HORIZONTAL_LEFT );
    	}elseif ($value=='centerContinuous') {
    		return $this->objset->getStyle($cell)->getAlignment()->setHorizontal( PHPExcel_Style_Alignment::HORIZONTAL_CENTER_CONTINUOUS );
    	}elseif ($value=='justify') {
    		return $this->objset->getStyle($cell)->getAlignment()->setHorizontal( PHPExcel_Style_Alignment::HORIZONTAL_JUSTIFY );
    	}
    }

    function setVertical($cell='',$value='')
    {
    	if ($value=='center') {
    		return $this->objset->getStyle($cell)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    	}elseif ($value=='bottom') {
    		return $this->objset->getStyle($cell)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_BOTTOM);
    	}elseif ($value=='top') {
    		return $this->objset->getStyle($cell)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_TOP);
    	}elseif ($value=='justify') {
    		return $this->objset->getStyle($cell)->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_JUSTIFY);
    	}elseif ($value=='general') {
    		return $this->objset->getStyle($cell)->getAlignment()->setVertical(PHPExcel_Style_Alignment::HORIZONTAL_GENERAL);
    	}
    }

    function setCellFormatType($value='')
    {
		if(strtoupper($value)==strtoupper('BOOL')) { return PHPExcel_Cell_DataType::TYPE_BOOL; }
		else if(strtoupper($value)==strtoupper('ERROR')) { return PHPExcel_Cell_DataType::TYPE_ERROR; }
		else if(strtoupper($value)==strtoupper('FORMULA')) { return PHPExcel_Cell_DataType::TYPE_FORMULA; }
		else if(strtoupper($value)==strtoupper('INLINE')) { return PHPExcel_Cell_DataType::TYPE_INLINE; }
		else if(strtoupper($value)==strtoupper('NULL')) { return PHPExcel_Cell_DataType::TYPE_NULL; }
		else if(strtoupper($value)==strtoupper('NUMERIC')) { return PHPExcel_Cell_DataType::TYPE_NUMERIC; }
		else if(strtoupper($value)==strtoupper('STRING')) { return PHPExcel_Cell_DataType::TYPE_STRING; }
    }

    function numberFormat($value='')
    {
    	if(strtoupper($value)==strtoupper('CURRENCY_EUR_SIMPLE')) { return PHPExcel_Style_NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE; }
		else if(strtoupper($value)==strtoupper('CURRENCY_USD')) { return PHPExcel_Style_NumberFormat::FORMAT_CURRENCY_USD; }
		else if(strtoupper($value)==strtoupper('CURRENCY_USD_SIMPLE')) { return PHPExcel_Style_NumberFormat::FORMAT_CURRENCY_USD_SIMPLE; }
		else if(strtoupper($value)==strtoupper('DATE_DATETIME')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_DATETIME; }
		else if(strtoupper($value)==strtoupper('DATE_DDMMYYYY')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_DDMMYYYY; }
		else if(strtoupper($value)==strtoupper('DATE_DMMINUS')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_DMMINUS; }
		else if(strtoupper($value)==strtoupper('DATE_DMYMINUS')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_DMYMINUS; }
		else if(strtoupper($value)==strtoupper('DATE_DMYSLASH')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_DMYSLASH; }
		else if(strtoupper($value)==strtoupper('DATE_MYMINUS')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_MYMINUS; }
		else if(strtoupper($value)==strtoupper('DATE_TIME1')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME1; }
		else if(strtoupper($value)==strtoupper('DATE_TIME2')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME2; }
		else if(strtoupper($value)==strtoupper('DATE_TIME3')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME3; }
		else if(strtoupper($value)==strtoupper('DATE_TIME4')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME4; }
		else if(strtoupper($value)==strtoupper('DATE_TIME5')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME5; }
		else if(strtoupper($value)==strtoupper('DATE_TIME6')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME6; }
		else if(strtoupper($value)==strtoupper('DATE_TIME7')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME7; }
		else if(strtoupper($value)==strtoupper('DATE_TIME8')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_TIME8; }
		else if(strtoupper($value)==strtoupper('DATE_YYYYMMDD')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_YYYYMMDD; }
		else if(strtoupper($value)==strtoupper('DATE_YYYYMMDDSLASH')) { return PHPExcel_Style_NumberFormat::FORMAT_DATE_YYYYMMDDSLASH; }
		else if(strtoupper($value)==strtoupper('GENERAL')) { return PHPExcel_Style_NumberFormat::FORMAT_GENERAL; }
		else if(strtoupper($value)==strtoupper('NUMBER')) { return PHPExcel_Style_NumberFormat::FORMAT_NUMBER; }
		else if(strtoupper($value)==strtoupper('NUMBER_00')) { return PHPExcel_Style_NumberFormat::FORMAT_NUMBER_00; }
		else if(strtoupper($value)==strtoupper('NUMBER_COMMA_SEPARATED1')) { return PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1; }
		else if(strtoupper($value)==strtoupper('NUMBER_COMMA_SEPARATED2')) { return PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED2; }
		else if(strtoupper($value)==strtoupper('PERCENTAGE')) { return PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE; }
		else if(strtoupper($value)==strtoupper('PERCENTAGE_00')) { return PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE_00; }
    }

    function getBorder($value='')
    {
    	if (strtolower($value)==strtolower('DASHDOT')) {
    		return PHPExcel_Style_Border::BORDER_DASHDOT;
    	}elseif (strtolower($value)==strtolower('DASHDOTDOT')) {
    		return PHPExcel_Style_Border::BORDER_DASHDOTDOT;
    	}elseif (strtolower($value)==strtolower('DASHED')) {
    		return PHPExcel_Style_Border::BORDER_DASHED;
    	}elseif (strtolower($value)==strtolower('DOTTED')) {
    		return PHPExcel_Style_Border::BORDER_DOTTED;
    	}elseif (strtolower($value)==strtolower('DOUBLE')) {
    		return PHPExcel_Style_Border::BORDER_DOUBLE;
    	}elseif (strtolower($value)==strtolower('HAIR')) {
    		return PHPExcel_Style_Border::BORDER_HAIR;
    	}elseif (strtolower($value)==strtolower('MEDIUM')) {
    		return PHPExcel_Style_Border::BORDER_MEDIUM;
    	}elseif (strtolower($value)==strtolower('MEDIUMDASHDOT')) {
    		return PHPExcel_Style_Border::BORDER_MEDIUMDASHDOT;
    	}elseif (strtolower($value)==strtolower('MEDIUMDASHDOTDOT')) {
    		return PHPExcel_Style_Border::BORDER_MEDIUMDASHDOTDOT;
    	}elseif (strtolower($value)==strtolower('MEDIUMDASHED')) {
    		return PHPExcel_Style_Border::BORDER_MEDIUMDASHED;
    	}elseif (strtolower($value)==strtolower('NONE')) {
    		return PHPExcel_Style_Border::BORDER_NONE;
    	}elseif (strtolower($value)==strtolower('SLANTDASHDOT')) {
    		return PHPExcel_Style_Border::BORDER_SLANTDASHDOT;
    	}elseif (strtolower($value)==strtolower('THICK')) {
    		return PHPExcel_Style_Border::BORDER_THICK;
    	}elseif (strtolower($value)==strtolower('THIN')) {
    		return PHPExcel_Style_Border::BORDER_THIN;
    	}
    }

    function getFill($value='')
    {
    	if (strtolower($value)==strtolower('LINIER')) {
    		return PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR;
    	} else if (strtolower($value)==strtolower('PATH')) {
    		return PHPExcel_Style_Fill::FILL_GRADIENT_PATH;
    	} else if (strtolower($value)==strtolower('NONE')) {
    		return PHPExcel_Style_Fill::FILL_NONE;
    	} else if (strtolower($value)==strtolower('DARKDOWN')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_DARKDOWN;
    	} else if (strtolower($value)==strtolower('DARKGRAY')) {
    		return PHPExcel_Style_Fill::PATTERN_DARKGRAY;
    	} else if (strtolower($value)==strtolower('DARKGRID')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_DARKGRID;
    	} else if (strtolower($value)==strtolower('DARKHORIZONTAL')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_DARKHORIZONTAL;
    	} else if (strtolower($value)==strtolower('DARKTRELLIS')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_DARKTRELLIS;
    	} else if (strtolower($value)==strtolower('DARKUP')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_DARKUP;
    	} else if (strtolower($value)==strtolower('DARKVERTICAL')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_DARKVERTICAL;
    	} else if (strtolower($value)==strtolower('GRAY0625')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_GRAY0625;
    	} else if (strtolower($value)==strtolower('GRAY125')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_GRAY125;
    	} else if (strtolower($value)==strtolower('LIGHTDOWN')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_LIGHTDOWN;
    	} else if (strtolower($value)==strtolower('LIGHTGRAY')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_LIGHTGRAY;
    	} else if (strtolower($value)==strtolower('LIGHTGRID')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_LIGHTGRID;
    	} else if (strtolower($value)==strtolower('LIGHTTRELLIS')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_LIGHTTRELLIS;
    	} else if (strtolower($value)==strtolower('LIGHTHORIZONTAL')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_LIGHTHORIZONTAL;
    	} else if (strtolower($value)==strtolower('LIGHTUP')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_LIGHTUP;
    	} else if (strtolower($value)==strtolower('LIGHTVERTICAL')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_LIGHTVERTICAL;
    	} else if (strtolower($value)==strtolower('MEDIUMGRAY')) {
    		return PHPExcel_Style_Fill::FILL_PATTERN_MEDIUMGRAY;
    	} else if (strtolower($value)==strtolower('SOLID')) {
    		return PHPExcel_Style_Fill::FILL_SOLID;
    	}
    }

	function isArrayMulti($arr)
    {
    	$multi = false;
    	foreach ($arr as $key => $value) {
    		if (is_array($value)) {
    			$multi = true;
    		}else{
    			$multi = false;
    		}
    	}
    	return $multi;
    }

    function getNameFromNumber($num) 
    {
        $numeric = ($num - 1) % 26;
        $letter = chr(65 + $numeric);
        $num2 = intval(($num - 1) / 26);
        if ($num2 > 0) {
            return $this->getNameFromNumber($num2).$letter;
        } else {
            return $letter;
        }
    }

    function stringFromColumnIndex($cell)
    {
    	return PHPExcel_Cell::stringFromColumnIndex($cell);
    }

    function siConvert($value='')
    {
    	if (is_int($value)) {
    		// return PHPExcel_Cell::stringFromColumnIndex($value);
    		return $this->getNameFromNumber($value);
    	}else{
    		return PHPExcel_Cell::columnIndexFromString($value);
    	}
    }

    /*
		split text and number
    */
    function siSplit($value='')
    {
		$pattern = "/(\d+)/";
		return preg_split($pattern, $value, -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
    }

    function isAssoc($arr)
	{
	    // Is it set, is an array, not empty and keys are not sequentialy numeric from 0
	    return isset($arr) && is_array($arr) && count($arr)!=0 && array_keys($arr) !== range(0, count($arr) - 1);
	}

	function countDim($array)
	{
	   if (is_array(reset($array)))
	    {
	    	$return = $this->countDim(reset($array)) + 1;
	    }else{
	    	$return = 1;
	    }
	    return $return;
	}

	function removeInt($words='')
	{
		return preg_replace('/[0-9]+/', '', $words);
	}
}