<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Dokumen extends Base_Controller {

    function __construct() {
		parent::__construct();
        $this->load->helper(array(
            'download', 
            'file',
            'pdf'
        ));
        $this->load->library('template');
        $this->m_report             = $this->model('sipas/report',      true);
        $this->m_surat              = $this->model('sipas/surat',       true);
        $this->m_dokumen            = $this->model('sipas/dokumen',     true);
        $this->m_dokumen_view       = $this->model('sipas/dokumen_view',true);
        $this->m_dokumen_surat_view = $this->model('sipas/dokumen_surat_view',true);

        $this->logo_draft_path  = BASEPATH.'../'.$this->config->item('logo_draft_path');

        $this->config->load('application_config');
    }

    function index(){
        $this->read();
        // print_r('Load Index');
    }

    function read(){
        $dokumen        = $this->m_dokumen;
        $model          = $this->m_dokumen_surat_view;
        $filter         = json_decode(varGet('filter', '[]'));
        $isimport       = varReq('dokumen_isimport');
        $limit          = varReq('limit') ? varReq('limit') : 25;
        $start          = varReq('start') ? varReq('start') : 0;
        $surat_nomor    = varReq('surat_nomor');
        $surat_perihal  = varReq('surat_perihal');
        $unit_nama      = varReq('unit_nama');

        if($isimport) {
            $isimport = strtolower($isimport) == 'true' ? 1 : 0;
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'dokumen_isimport = "'.$isimport.'"'
            ));
        }

        if($surat_nomor || $surat_perihal || $unit_nama) {
            array_unshift($filter, (object)array(
                'type'      =>'custom',
                'value'     =>'(surat_nomor LIKE "%'.$surat_nomor.'%" AND surat_perihal LIKE "%'.$surat_perihal.'%" AND unit_nama LIKE "%'.$unit_nama.'%")'
            ));
        }

        array_unshift($filter, (object)array(
            'type'      => 'custom',
            'value'     => 'surat_retensi_tgl < CURDATE()'
        ));

        if(varGetHas('id') || varGetHas('dokumen_id')){
            $id = varGet('id', varGet('dokumen_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{ 
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'dokumen_isactive',
                'value'     => 1
            ));

            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'surat_model <> "3"'
            ));

            $sorter = json_encode(array(
                (object) array('property' => 'surat_tanggal', 'direction' => 'desc')
            ));

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sort'      => $sorter
            ));

            $records['limit'] = $limit;
            $records['start'] = $start;
        
            $this->response($records);
        }
    }

    function download($id = null){
        $id = varGet('id', $id);
        $report_model = $this->m_report;
        $surat_model = $this->m_surat;
        $record = $this->m_dokumen->get_content_download($id);

        $watermark = null;
        if($record){
            if($record['dokumen_ext'] == '.sdoc'){
                $surat = $surat_model->read(array(
                    'surat_arsip'    => $record['dokumen_arsip'],
                    '(surat_model = 2 OR surat_model = 4)'    => null,
                ));
        
                if(!empty($surat)){
                    if ($surat['surat_setuju'] !== 2) $watermark = true ;
                }
                
                if($watermark) $watermark = $this->logo_draft_path;
                $content = '<div style="margin: 8mm 3mm 20mm 14mm; page-break-after: always;">'.html_entity_decode(base64_decode($record['dokumen_file'])).'</div>';
                $this->output->set_content_type('text/html');
                $splitted = explode('.', $record['dokumen_nama']);
                
                if(!empty($record['dokumen_file'])) {
                    print($content);
                }
                die; // genereateReportPdf() is auto download so die here;
            } else {
                $filename = $record['dokumen_file'];

                $image_path = $record['dokumen_path'];

                $image_path = str_replace('/var/www/html/timah-pangkalpinang/master/v5.27-master/webapp/src/', base_url(), $record['dokumen_path']);

                $this->output->set_content_type(get_mime_by_extension($image_path));
                $this->output->set_output(file_get_contents($image_path));
            }
        }
    }

    function setImport(){
        $model      = $this->m_dokumen;
        $model_view = $this->m_dokumen_surat_view;
        $dokumen    = varReq('dokumen');
        $successData = array();
        
        if($dokumen) {
            foreach($dokumen as $index => $dok) {
                $op = $model->update($dok, array(
                    'dokumen_isimport' => 1
                ));

                if($op['success'] == 1) {
                    array_push($successData, $dok);
                }
            }
        }
        $response['success'] = $successData ? true : false;
        $response['data']    = $successData;

        $this->response($response);
    }
}