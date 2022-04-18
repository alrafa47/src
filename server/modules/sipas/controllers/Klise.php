<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Klise extends Base_Controller {
      
	public function __construct(){
        parent::__construct();
        $this->m_klise              = $this->model('sipas/klise', true);
        $this->m_klise_aktif_view   = $this->model('sipas/klise_aktif_view', true);
        $this->m_klise_nonaktif_view= $this->model('sipas/klise_nonaktif_view', true);
        $this->m_klise_musnah_view  = $this->model('sipas/klise_musnah_view', true);
        $this->m_klise_hidup_view   = $this->model('sipas/klise_hidup_view', true);
        $this->m_klise_view         = $this->model('sipas/klise_view', true);

        $this->m_properti       = $this->model('sipas/properti',                 true);
        $this->m_account        = $this->model('sipas/account',                  true);
    }

    public function index(){
        $this->read();
    }

    public function read($section = null){
        $model = $this->m_klise_hidup_view;
        $modelKlise = $this->m_klise;
        
        $id = varGet('id');
        $limit = varGet('limit', 0);
        $start = varGet('start', 0);
        $filter = json_decode(varGet('filter','[]'));
        $sorter = varGet('sort');
        
        if( ! empty($id) ){
            $record = null;
            if(inCacheExists($modelKlise, $id)){
                $record = getRecordFromCache($modelKlise, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelKlise, $record);
                $useCache = false;
            }

            $records = array( 
                $model->successProperty     => (bool) $record, 
                $model->dataProperty        => $record,
                'useCache'                  => $useCache
            );
        }else {
            $record = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter
            ));
            foreach ($record as $key => $record) {
                unset($record[$model->field_template]);
            }
        }
        $this->response($record);
    }

    public function aktif(){
        $model = $this->m_klise_aktif_view;
        $modelKlise = $this->m_klise;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('klise_id')){
            $id = varGet('id', varGet('klise_id'));
            $record = null;

            if(inCacheExists($modelKlise, $id)){
                $record = getRecordFromCache($modelKlise, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelKlise, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'klise_nama LIKE "%'.$query.'%" OR klise_nama LIKE "%'.$query.'%"'
                ));
            }
            // array_unshift($filter, (object)array(
            //     'type'      => 'custom',
            //     'value'     => '(properti_hapus_tgl IS NULL OR properti_pulih_tgl IS NOT NULL)'
            // ));
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function nonaktif(){
        $model = $this->m_klise_nonaktif_view;
        $modelKlise = $this->m_klise;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('klise_id')){
            $id = varGet('id', varGet('klise_id'));

            $record = null;

            if(inCacheExists($modelKlise, $id)){
                $record = getRecordFromCache($modelKlise, $id);
                $useCache = true;
            }

            if(!$record){
                $record = $model->read($id);
                addRecordToCache($modelKlise, $record);
                $useCache = false;
            }

            $this->response_record($record, false, $useCache);
        }else{
            $query = varGet('query');
            if(!empty($query)){
                array_unshift($filter, (object)array(
                    'type'      => 'custom',
                    'value'     => 'klise_nama LIKE "%'.$query.'%" OR klise_nama LIKE "%'.$query.'%"'
                ));
            }
            // array_unshift($filter, (object)array(
            //     'type'      => 'custom',
            //     'value'     => '(properti_hapus_tgl IS NULL OR properti_pulih_tgl IS NOT NULL)'
            // ));
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));
            $this->response($records);
        }
    }

    public function create($usePayload = true){
        $model = $this->m_klise;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        
        $operation = $model->insert($data, null, function($response) use 
            ($model, $akun, $properti, $data){
            if($response[$model->successProperty] !== true) return;

            addRecordToCache($model, $response[$model->dataProperty]);
            $inserted_data = $response['data'];
            $op = $properti->created($akun, $inserted_data, 'klise', $inserted_data['klise_id'], $inserted_data['klise_nama']);
            if($op){
                $model->update($inserted_data['klise_id'], array(
                    'klise_properti' => $op['properti_id']
                ));
            }
        });
        if($operation[$model->successProperty]) $operation[$model->dataProperty] = $model->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_klise;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $idProp = $data['klise_properti'];

        $operation = $model->update($id, $data, function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            $updated_data = $model->read($data['klise_id']);
            $idProp = $updated_data['klise_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'klise', $updated_data['klise_id'], $updated_data['klise_nama']);
                if($op){
                    $model->update($updated_data['klise_id'], array(
                        'klise_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['klise_nama']);
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_klise;
        $properti = $this->m_properti;
        $account = $this->m_account;

        $akun = $account->get_profile_id();
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);        
        $idProp = $data['klise_properti'];
        $data['klise_ishapus'] = 1;
        $operation = $model->update($id, $data,function($response) use 
            ($properti, $model, $akun, $data){

            addRecordToCache($model, $response[$model->dataProperty]);

            // $deleted_data = $response['data'];

            $deleted_data = $model->read($data['klise_id']);
            $idProp = $deleted_data['klise_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'klise', $deleted_data['klise_id'], $deleted_data['klise_nama']);
                if($op){
                    $model->update($deleted_data['klise_id'], array(
                        'klise_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['klise_nama']);
        });
        if($operation['success']){
            $operation['message'] = 'Berhasil Menghapus Data';
        }
        $this->response($operation);
    }

    function template(){
        $klise = $this->m_klise;
        $data = array('total'=>count($klise->report_template_legend), 'data'=>array());
        foreach ($klise->report_template_legend as $key => $value) {
            $group = explode("-", $value);
            array_push($data['data'], array(
                'legend_code'=>$key,
                'legend_description'=>$value,
                'legend_group'=>reset($group)
            ));
        }
        $this->response($data);
    }

    function preview(){
        $model = $this->m_klise;
        $report_model = $this->model('sipas/report', true);
        $asset_model = $this->model('sipas/asset', true);
        $setting_model = $this->model('sipas/pengaturan', true);

        $download = false;
        $header = in_array(strtolower((string) varGet('header', 'false')), array('true','1') ) ? true : false; 
        $id = varGet('id');
        $setting_value = $setting_model->getSettings();

        $contentTmplate = "";
        $record = $model->read($id);
        if($record){
            $contentTmplate = $record[$model->field_template];
        }

        $headerTemplate = "";
        if( $header ){
            $headerTemplate = $report_model->generateHeader($download);
        }

        if($header){
            $content = base64_decode($contentTmplate);
            $tpl = $this->load->view('sipas/template', array(), true);
            $this->parser->parse_string($tpl, array(
                'style'=>array(),
                'header' => $headerTemplate,
                'content' => $content
            ));
        }else{
            $content = base64_decode($contentTmplate);
            echo $content;
        }
    }

    function download(){
        $model = $this->m_klise;
        $report_model = $this->model('sipas/report');
        
        $id = varGet('id');
        $download = varGet('download',0);

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;

        $record = $model->read($id);
        if(!$record) $record = array();

        $field_template = $record['klise_isi'];

        $report_data = array(
            'header'=> $report_model->generateHeader($download)
        );
        
        if($download){
            $report_model->generateReportPdf($field_template, $report_data, true);
        }else{
            $report_model->generateReport($field_template, $report_data, true);
        }
    }

    public function transporter(){
        $klise = $this->m_klise;

        $dok = $klise->find();
        // print_r($dok['klise_file']);
        foreach ($dok as $key => $r) {
            $source = $r['klise_isi'];
            $rex = preg_match('%^[a-zA-Z0-9/+]*={0,2}$%', $source , $matches, PREG_OFFSET_CAPTURE);
            if(!$rex){
            $isi = base64_encode($source);
            $klise->update($r['klise_id'], array(
                        'klise_isi'=>$isi
                    ));             
            }
            print_r(base64_encode($source));
        }
    }
}