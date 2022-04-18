<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Surat_penerimask extends Base_Controller {

    protected $message = array();

    public $report_template = 'sipas/surat/internal/internal_keluar_penerima_list';
    public $report_title = 'Laporan Penerima Surat Internal Keluar';
    public $report_subtitle = 'Laporan Ini Menginformasikan Penerima Surat';

	public function __construct(){
        parent::__construct();

        $this->m_account    = $this->model('sipas/account',    true);
        $this->m_pengaturan = $this->model('sipas/pengaturan', true);

        $this->m_surat_penerimask        = $this->model('sipas/surat_penerimask',         true);
        $this->m_surat_penerimask_view   = $this->model('sipas/surat_penerimask_view',    true);
        $this->m_staf               = $this->model('sipas/staf',                true);
        $this->m_model_staf         = $this->model('sipas/staf_view',           true);
        $this->m_surat_view         = $this->model('sipas/surat_view',          true);

        $this->m_disposisi_masuk_netral_view  = $this->model('sipas/disposisi_masuk_netral_view',   true);
        $this->m_report     = $this->model('sipas/report',         true);
    }

    public function index(){
        $this->read();
    }
    
    public function read(){
        $model   = $this->m_surat_penerimask_view;
        $pegawai = $this->m_model_staf;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));
       
        if (array_key_exists('id', $_GET)) {
            $record = $model->read(varGet('id'));
            $record = array('data'=>$record);
            $operation = $record;
        } else{
            $operation = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
        }
	
        $this->response($operation);
    }

    public function create($usePayload = true){
        $model          = $this->m_surat_penerimask;
        $account_model  = $this->model('sipas/account',true);
        $payload        = getRequestPayload();
        $data           = (array) ($usePayload ? $payload : varPost());
        $user           = $account_model->get_profile();
        
        if(isAssoc($data)){
            $operation = $model->insert($data, null, function($response) {});
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $_data['surat_penerimask_pelaku'] = $user['staf_id'];
                $_data['surat_penerimask_pelaku_profil'] = $user['staf_profil'];
                
                $operation = $model->insert($_data, null, function($response){});
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $operation = $response;
        }
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model = $this->m_surat_penerimask;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        if(isAssoc($data)){
            $operation = $model->update($id, $data);
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menyimpan data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $id = array_key_exists('id', $_data) ? $_data['id'] : (array_key_exists($primary, $_data) ? $_data[$primary] : null);
                $operation = $model->update($id, $_data);
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $operation = $response;
        }
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model = $this->m_surat_penerimask;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        if(isAssoc($data)){
            $operation = $model->delete($id);
        }else if(is_array($data)){
            $response = array('success'=>true,'message'=>'Berhasil menghapus data', 'data'=>array());
            foreach ($data as $i => $_data) {
                $_data = (array) $_data;
                $id = array_key_exists('id', $_data) ? $_data['id'] : (array_key_exists($primary, $_data) ? $_data[$primary] : null);
                $operation = $model->delete($id);
                if(!$operation[$model->successProperty]){
                    $response[$model->successProperty] = false;
                    $response['message'] = $operation['message'];
                    break;
                }else{
                    $response['data'][] = $operation[$model->dataProperty];
                }
            }
            $operation = $response;
        }
        $this->response($operation);
    }

    public function reset_penerimask(){
        $model = $this->m_surat_penerimask;
        $id = varGet('id');

        $penerimask = $model->find(array('surat_penerimask_surat' => $id));

        $response = array('success'=>true,'message'=>'Berhasil mengubah data', 'data'=>array());
        foreach ($penerimask as $index => $p) {
            $operation = $model->update($p['surat_penerimask_id'], array(
                'surat_penerimask_gollama' => null,
                'surat_penerimask_golbaru' => null,
                'surat_penerimask_sglama' => null,
                'surat_penerimask_sgbaru' => null,
                'surat_penerimask_gplama' => null,
                'surat_penerimask_gpbaru' => null,
            ));

            if(!$operation[$model->successProperty]){
                $response[$model->successProperty] = false;
                $response['message'] = $operation['message'];
                break;
            }else{
                $response['data'][] = $operation[$model->dataProperty];
            }
        }
        $this->response($response);
    }

    public function penerima_list(){
        $id = varReq('id');
        $model = $this->m_surat_penerimask_view;
        
        $data = $model->find(array(
            'surat_penerimask_surat' => $id
        ), false, false, true, array('surat_penerimask_level' => 'asc'));

        $this->response($data);
    }
}