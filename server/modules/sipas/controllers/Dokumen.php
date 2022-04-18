<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dokumen extends Base_Controller {

	function __construct(){
        parent::__construct();
        $this->load->helper(array(
            'download', 
            'file'
        ));
        $this->load->library('template');
        $this->m_account        = $this->model('sipas/account',     true);
        $this->m_report         = $this->model('sipas/report',     true);

        $this->m_surat          = $this->model('sipas/surat',       true);
        $this->m_staf           = $this->model('sipas/staf',        true);
        $this->m_staf_view      = $this->model('sipas/staf_view',   true);
        $this->m_arsip          = $this->model('sipas/arsip',       true);
        $this->m_surat_view     = $this->model('sipas/surat_view',  true);
        $this->m_surat_stack_koreksi = $this->model('sipas/surat_stack_koreksi_view',  true);
        $this->m_surat_stack_disposisi = $this->model('sipas/surat_stack_disposisi_view',  true);
        $this->m_surat_stack    = $this->model('sipas/surat_stack', true);
        $this->m_surat_penerimask = $this->model('sipas/surat_penerimask', true);
        $this->m_dokumen        = $this->model('sipas/dokumen',     true);
        $this->m_dokumen_view   = $this->model('sipas/dokumen_view',true);
        $this->m_properti       = $this->model('sipas/properti',    true);
        $this->m_pengaturan     = $this->model('sipas/pengaturan',    true);
        $this->m_account        = $this->model('sipas/account',     true);

        $this->config->load('application_config');
    }

    function index(){
        $this->read();
    }
    
    function read(){
        $model = $this->m_dokumen_view;
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if (varGetHas('id') || varGetHas('dokumen_id')) {
            $id = varGet('id', varGet('dokumen_id'));
            $record = $model->read($id, false, true);
            $records = array('success' => (bool) $record, 'data' => $record);

            // if(array_key_exists("dokumen_path",$records)){
            //     unset($data['dokumen_path']);
            // }
            
            $this->response_record($records);
        } else {
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'dokumen_isactive',
                'value'     => 1
            ));
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
                'rendered'  => true
            ));

            foreach ($records[$model->dataProperty] as $i => &$data) {
                if(array_key_exists("dokumen_path",$data)){
                    unset($data['dokumen_path']);
                }
            }
        
            $this->response($records);
        }
    }

    // create is from uploaded image, doesnt using payload request 
    function create($section = null){
        $surat     = $this->m_surat;
        $dokumen   = $this->m_dokumen;
        $staf_model = $this->m_staf;
        $properti  = $this->m_properti;
        $account   = $this->m_account;
        $akun      = $account->get_profile_id();
        $stafProfil = $staf_model->read($akun);
        $operation = array('success'=>false, 'message'=>$this->get_message('upload_failed'));
        $data      = $_POST;
        $staf      = varReq('staf');
        $now       = date('Y-m-d H:i:s');
        $arsip_id  = array_key_exists($dokumen->field_arsip, $data) ? $data[$dokumen->field_arsip] : null;
        $surat_id  = array_key_exists($dokumen->field_surat, $data) ? $data[$dokumen->field_surat] : null;
        $dokumen_nama  = array_key_exists($dokumen->field_nama, $data) ? $data[$dokumen->field_nama] : null;
        $dokumen_file  = array_key_exists($dokumen->field_file, $data) ? $data[$dokumen->field_file] : null;
        $dokumen_induk = array_key_exists($dokumen->field_induk, $data) ? $data[$dokumen->field_induk] : null;
        $dokumen_previous = array_key_exists($dokumen->field_previous, $data) ? $data[$dokumen->field_previous] : null;
        $dokumen_preview  = array_key_exists($dokumen->field_preview, $data) ? $data[$dokumen->field_preview] : null;
        $dokumen_reupload = array_key_exists($dokumen->field_reupload, $data) ? $data[$dokumen->field_reupload] : null; 
        $dokumen_islihat  = array_key_exists($dokumen->field_islihat, $data) ? $data[$dokumen->field_islihat] : null;
        $dokumen_ispetikan  = array_key_exists($dokumen->field_ispetikan, $data) ? $data[$dokumen->field_ispetikan] : null;

        if($arsip_id){
            //insert to properti
            $op   = $properti->created($akun);
            switch ($section) {
                case 'disposisi':
                    $akun = array_key_exists('staf_id', $data) ? $data['staf_id'] : null;
                    $stafProfil = $staf_model->read($staf);
                    $pelakuProfil = $staf_model->read($akun);
                    $operation = $dokumen->insert(array(
                        'dokumen_disposisi'    => 1,
                        'dokumen_buat_pelaku'  => $akun,
                        'dokumen_buat_pelaku_profil'  => $pelakuProfil['staf_profil'],
                        'dokumen_buat_pelaku_tgl'  => $now,
                        'dokumen_arsip'    => $arsip_id,
                        'dokumen_nama'     => $dokumen_nama,
                        'dokumen_isactive' => true,
                        'dokumen_buat_tgl' => $now,
                        'dokumen_buat_staf'=> $staf,
                        'dokumen_buat_profil' => $stafProfil['staf_profil'],
                        'dokumen_islihat'  => $dokumen_islihat
                    ),null, function($response) use($dokumen, $properti, $akun){
                        $upload = $dokumen->upload($dokumen->get_insertid());
                        $dokumen_id = $dokumen->get_insertid();

                        $inserted_data = $dokumen->read($dokumen->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'dokumen', $inserted_data['dokumen_id'], $inserted_data['dokumen_nama']);

                        if($upload){
                            $dokumen->update($dokumen_id, array(
                                'dokumen_file'     => $upload['file_name'],
                                'dokumen_preview'  => in_array($upload['file_type'], $this->config->item('mime_previewable')) ? str_replace($upload['file_ext'], '_thumb'.$upload['file_ext'], $upload['file_name']) : null,
                                'dokumen_path'     => $upload['full_path'],
                                'dokumen_size'     => $upload['file_size'], // in KB
                                'dokumen_date'     => date('Y-m-d H-i-s'),
                                'dokumen_ext'      => strtolower($upload['file_ext']),
                                'dokumen_mime'     => strtolower($upload['file_ext']),
                                'dokumen_properti' => $op['properti_id']
                            ));
                        }
                        else{
                            $operation['message'] = $this->upload->display_errors();
                        }
                    });
                    break;
                case 'dokumen':
                    $akun = array_key_exists('staf_id', $data) ? $data['staf_id'] : null;
                    $stafProfil = $staf_model->read($akun);
                    $operation = $dokumen->insert(array(
                        'dokumen_arsip'    => $arsip_id,
                        'dokumen_nama'     => $dokumen_nama,
                        'dokumen_isactive' => true,
                        'dokumen_buat_tgl' => $now,
                        'dokumen_buat_staf'=> $akun,
                        'dokumen_buat_profil' => $stafProfil['staf_profil'],
                        'dokumen_reupload' => $dokumen_reupload
                    ),null, function($response) use($dokumen, $properti, $akun){
                        $upload = $dokumen->upload($dokumen->get_insertid());
                        $dokumen_id = $dokumen->get_insertid();

                        $inserted_data = $dokumen->read($dokumen->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'dokumen', $inserted_data['dokumen_id'], $inserted_data['dokumen_nama']);

                        if($upload){
                            $dokumen->update($dokumen_id, array(
                                'dokumen_file'     => $upload['file_name'],
                                'dokumen_preview'  => in_array($upload['file_type'], $this->config->item('mime_previewable')) ? str_replace($upload['file_ext'], '_thumb'.$upload['file_ext'], $upload['file_name']) : null,
                                'dokumen_path'     => $upload['full_path'],
                                'dokumen_size'     => $upload['file_size'], // in KB
                                'dokumen_date'     => date('Y-m-d H-i-s'),
                                'dokumen_ext'      => strtolower($upload['file_ext']),
                                'dokumen_mime'     => strtolower($upload['file_ext']),
                                'dokumen_properti' => $op['properti_id']
                            ));
                        }
                        else{
                            $operation['message'] = $this->upload->display_errors();
                        }
                    });
                    break;
                case 'link':
                    $operation = $dokumen->insert(array(
                        'dokumen_arsip'     => $arsip_id,
                        'dokumen_nama'      => $dokumen_nama,
                        'dokumen_induk'     => $dokumen_induk,
                        'dokumen_previous'  => $dokumen_previous,
                        'dokumen_file'      => $dokumen_file,
                        'dokumen_ext'       => '.link',
                        'dokumen_mime'      => '.link',
                        'dokumen_buat_tgl' => $now,
                        'dokumen_buat_staf'=> $akun,
                        'dokumen_buat_profil' => $stafProfil['staf_profil'],
                        'dokumen_isactive'  => true,
                        // 'dokumen_properti'  => $op['properti_id']
                    ), null, function($response) use($dokumen, $properti, $akun){
                        $dokumen_id = $dokumen->get_insertid();

                        $inserted_data = $dokumen->read($dokumen->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'dokumen', $inserted_data['dokumen_id'], $inserted_data['dokumen_nama']);

                        $dokumen->update($dokumen_id, array(
                            'dokumen_properti' => $op['properti_id']
                        ));
                    });
                    break;
                case 'sdoc':
                    $operation = $dokumen->insert(array(
                        'dokumen_arsip'     => $arsip_id,
                        'dokumen_nama'      => $dokumen_nama,
                        'dokumen_induk'     => $dokumen_induk,
                        'dokumen_previous'  => $dokumen_previous,
                        'dokumen_preview'   => $dokumen_preview,
                        'dokumen_file'      => $dokumen_file,
                        'dokumen_ext'       => '.sdoc',
                        'dokumen_mime'      => '.sdoc',
                        'dokumen_buat_tgl' => $now,
                        'dokumen_buat_staf'=> $akun,
                        'dokumen_buat_profil' => $stafProfil['staf_profil'],
                        // 'dokumen_properti'  => $op['properti_id'],
                        'dokumen_isactive'  => true,
                        'dokumen_ispetikan' => $dokumen_ispetikan
                    ), null, function($response) use($dokumen, $properti, $akun){
                        $dokumen_id = $dokumen->get_insertid();

                        $inserted_data = $dokumen->read($dokumen->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'dokumen', $inserted_data['dokumen_id'], $inserted_data['dokumen_nama']);

                        $dokumen->update($dokumen_id, array(
                            'dokumen_properti' => $op['properti_id']
                        ));
                    });
                    break;
                default:
                    # code...
                    break;
            }
        }else{
            $operation['message'] = $this->get_message('surat_invalid');
        }

        if($operation[$dokumen->successProperty]){
            $operation[$dokumen->dataProperty] = $dokumen->render($operation[$dokumen->dataProperty]);
        }

        $this->response($operation);
    }

    function create_scan(){ /*obsolette*/
        $surat = $this->m_surat;
        $dokumen = $this->m_dokumen;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $akun = $account->get_profile_id();
        $operation = array('success'=>false, 'message'=>$this->get_message('upload_failed'));

        $data = (array) getRequestPayload();

        $arsip_id = array_key_exists($dokumen->field_arsip, $data) ? $data[$dokumen->field_arsip] : null;
        $template_id = array_key_exists($dokumen->field_template, $data) ? $data[$dokumen->field_template] : null;
        $surat_id = array_key_exists($dokumen->field_surat, $data) ? $data[$dokumen->field_surat] : null;
        $dokumen_nama = array_key_exists($dokumen->field_nama, $data) ? $data[$dokumen->field_nama] : null;
        $dokumen_file = array_key_exists($dokumen->field_file, $data) ? $data[$dokumen->field_file] : null;
        $dokumen_induk = array_key_exists($dokumen->field_induk, $data) ? $data[$dokumen->field_induk] : null;
        $dokumen_previous = array_key_exists($dokumen->field_previous, $data) ? $data[$dokumen->field_previous] : null;
        $dokumen_preview = array_key_exists($dokumen->field_preview, $data) ? $data[$dokumen->field_preview] : null;

        if($arsip_id || $template_id){
            
            //insert to properti
            $op = $properti->created($akun);

            $id = (!$arsip_id == NULL) ? $arsip_id : $template_id;
            // file_put_contents('assets/surat/'.md5(microtime(true)).'.png', $imageResource);
            if(!file_exists('data/surat/'.$id)) mkdir('data/surat/'.$id, 0777);
            $berkas_id = md5(microtime(true).$id);
            $berkas_dir = 'data/surat/'.$id.'/';
            $berkas_preview = null;
            $berkas_nama = (array_key_exists('dokumen_nama', $data) and !empty($data['dokumen_nama'])) ? $data['dokumen_nama'] : $berkas_id;
            
            $mime = (array_key_exists('mime', $data) and !empty($data['mime'])) ? $data['mime'] : 'image/png';
            if(in_array($mime, array('image/jpg','image/jpeg','image/png')))
            {
                $berkas_ext = '.png';
                $berkas_path = 'data/surat/'.$id.'/'.$berkas_id.$berkas_ext;
                $resourceString = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data['userfile']));
                // $resource = imagecreatefromstring($resourceString);
                // $upload = imagepng($resource, $berkas_path);
                $berkas_preview = $dokumen->create_preview($berkas_path, $berkas_dir);
                $upload = file_put_contents($berkas_path, $resourceString);
            }else if($mime == 'application/pdf')
            {
                $berkas_ext = '.pdf';
                $berkas_path = 'data/surat/'.$id.'/'.$berkas_id.$berkas_ext;
                $resourceString = base64_decode(preg_replace('#^data:application/pdf;base64,#i', '', $data['userfile']));
                $upload = file_put_contents($berkas_path, $resourceString);
            }

            if($upload){
                $operation = $dokumen->insert(array(
                    'dokumen_id'       => $berkas_id,
                    'dokumen_arsip'    => $arsip_id,
                    'dokumen_template' => $template_id,
                    'dokumen_nama'     => $berkas_nama,
                    'dokumen_file'     => $berkas_id.$berkas_ext,
                    'dokumen_preview'  => in_array('image/png', $this->config->item('mime_previewable')) ? str_replace('.png', '_thumb'.'.png', $berkas_id.'.png') : null,
                    'dokumen_path'     => realpath($berkas_path),
                    'dokumen_size'     => filesize($berkas_path) / 1024, // in KB
                    'dokumen_date'     => date('Y-m-d H-i-s'),
                    'dokumen_ext'      => $berkas_ext,
                    'dokumen_mime'     => $berkas_ext,
                    'dokumen_properti' => $op['properti_id'],
                    'dokumen_isactive' => true
                ),null, function($response){});
            }else{
                $operation['message'] = "Gagal menyimpan berkas";
            }
        }else{
            $operation['message'] = $this->get_message('surat_invalid');
        }

        if($operation[$dokumen->successProperty]){
            $operation[$dokumen->dataProperty] = $dokumen->render($operation[$dokumen->dataProperty]);
            unset($operation[$dokumen->dataProperty]['dokumen_path']);
        }

        // sleep(5);
        $this->response($operation);
    }

    function update_scan(){
        $surat = $this->m_surat;
        $dokumen = $this->m_dokumen;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $akun = $account->get_profile_id();
        $operation = array('success'=>false, 'message'=>$this->get_message('upload_failed'));

        $data = (array) getRequestPayload();

        $arsip_id = array_key_exists($dokumen->field_arsip, $data) ? $data[$dokumen->field_arsip] : null;
        $template_id = array_key_exists($dokumen->field_template, $data) ? $data[$dokumen->field_template] : null;
        $surat_id = array_key_exists($dokumen->field_surat, $data) ? $data[$dokumen->field_surat] : null;
        $dokumen_nama = array_key_exists($dokumen->field_nama, $data) ? $data[$dokumen->field_nama] : null;
        $dokumen_file = array_key_exists($dokumen->field_file, $data) ? $data[$dokumen->field_file] : null;
        $dokumen_induk = array_key_exists($dokumen->field_induk, $data) ? $data[$dokumen->field_induk] : null;
        $dokumen_previous = array_key_exists($dokumen->field_previous, $data) ? $data[$dokumen->field_previous] : null;
        $dokumen_preview = array_key_exists($dokumen->field_preview, $data) ? $data[$dokumen->field_preview] : null;

        if($arsip_id || $template_id){
            
            //update and insert revisi version dokumen
            $findDokumenId = $dokumen->find(array('dokumen_id'=>$dokumen_induk));
            $findDokumenInduk = $dokumen->find(array('dokumen_induk'=>$dokumen_induk));
            $findDokumen = array_merge($findDokumenId, $findDokumenInduk);

            foreach ($findDokumen as $k => $v) {
                //start proses properti
                //insert to properti if id dokumen_properti is empty
                $idProp = $v['dokumen_properti'];
                if(empty($idProp)){
                    $op = $properti->created($akun);
                    $idProp = $op['properti_id'];
                }
                //update to properti
                $properti->updated($idProp, $akun);
                //end properti

                $dokumen->update($v['dokumen_id'], array(
                    'dokumen_isactive'  => false,
                    'dokumen_properti'  => $idProp
                ));
            }
            //end update

            $upload = $dokumen->upload($arsip_id);
            $op = $properti->created($akun);

            $id = (!$arsip_id == NULL) ? $arsip_id : $template_id;
            // file_put_contents('assets/surat/'.md5(microtime(true)).'.png', $imageResource);
            if(!file_exists('data/surat/'.$id)) mkdir('data/surat/'.$id, 0777);
            $berkas_id = md5(microtime(true).$id);
            $berkas_dir = 'data/surat/'.$id.'/';
            $berkas_preview = null;
            $berkas_nama = (array_key_exists('dokumen_nama', $data) and !empty($data['dokumen_nama'])) ? $data['dokumen_nama'] : $berkas_id;
            
            $mime = (array_key_exists('mime', $data) and !empty($data['mime'])) ? $data['mime'] : 'image/png';
            if(in_array($mime, array('image/jpg','image/jpeg','image/png')))
            {
                $berkas_ext = '.png';
                $berkas_path = 'data/surat/'.$id.'/'.$berkas_id.$berkas_ext;
                $resourceString = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data['userfile']));
                // $resource = imagecreatefromstring($resourceString);
                // $upload = imagepng($resource, $berkas_path);
                $berkas_preview = $dokumen->create_preview($berkas_path, $berkas_dir);
                $upload = file_put_contents($berkas_path, $resourceString);
            }else if($mime == 'application/pdf')
            {
                $berkas_ext = '.pdf';
                $berkas_path = 'data/surat/'.$id.'/'.$berkas_id.$berkas_ext;
                $resourceString = base64_decode(preg_replace('#^data:application/pdf;base64,#i', '', $data['userfile']));
                $upload = file_put_contents($berkas_path, $resourceString);
            }

            if($upload){
                $operation = $dokumen->insert(array(
                    'dokumen_id'       => $berkas_id,
                    'dokumen_arsip'    => $arsip_id,
                    'dokumen_template' => $template_id,
                    'dokumen_nama'     => $berkas_nama,
                    'dokumen_induk'    => $dokumen_induk,
                    'dokumen_previous' => $dokumen_previous,
                    'dokumen_file'     => $berkas_id.$berkas_ext,
                    'dokumen_preview'  => in_array('image/png', $this->config->item('mime_previewable')) ? str_replace('.png', '_thumb'.'.png', $berkas_id.'.png') : null,
                    'dokumen_path'     => realpath($berkas_path),
                    'dokumen_size'     => filesize($berkas_path) / 1024, // in KB
                    'dokumen_date'     => date('Y-m-d H-i-s'),
                    'dokumen_ext'      => $berkas_ext,
                    'dokumen_mime'     => $berkas_ext,
                    'dokumen_properti' => $op['properti_id'],
                    'dokumen_isactive' => true
                ),null, function($response){});
            }else{
                $operation['message'] = "Gagal menyimpan berkas";
            }
        }else{
            $operation['message'] = $this->get_message('surat_invalid');
        }

        if($operation[$dokumen->successProperty]){
            $operation[$dokumen->dataProperty] = $dokumen->render($operation[$dokumen->dataProperty]);
            unset($operation[$dokumen->dataProperty]['dokumen_path']);
        }

        // sleep(5);
        $this->response($operation);
    }

    function update($section = null){
        $surat = $this->m_surat;
        $dokumen = $this->m_dokumen;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $model_staf = $this->m_staf;
        $akun = $account->get_profile_id();
        $stafProfil = $model_staf->read($akun);

        $operation = array('success'=>false, 'message'=>$this->get_message('upload_failed'));
        
        $data = $_POST;
        
        $now = date('Y-m-d H:i:s');

        $isrename = (array_key_exists('isrename', $data)) ? true : false;

        $arsip_id = array_key_exists($dokumen->field_arsip, $data) ? $data[$dokumen->field_arsip] : null;
        $surat_id = array_key_exists($dokumen->field_surat, $data) ? $data[$dokumen->field_surat] : null;
        $dokumen_id = array_key_exists($dokumen->field_id, $data) ? $data[$dokumen->field_id] : null;
        $dokumen_nama = array_key_exists($dokumen->field_nama, $data) ? $data[$dokumen->field_nama] : null;
        $dokumen_file = array_key_exists($dokumen->field_file, $data) ? $data[$dokumen->field_file] : null;
        $dokumen_induk = array_key_exists($dokumen->field_induk, $data) ? $data[$dokumen->field_induk] : null;
        $dokumen_previous = array_key_exists($dokumen->field_previous, $data) ? $data[$dokumen->field_previous] : null;
        $dokumen_islihat  = array_key_exists($dokumen->field_islihat, $data) ? $data[$dokumen->field_islihat] : null;
        $dokumen_ispetikan  = array_key_exists($dokumen->field_ispetikan, $data) ? $data[$dokumen->field_ispetikan] : null;
    
        $dokumen_reupload = $dokumen->read($dokumen_induk);
        $staf    = varReq('staf');

        if($arsip_id){
            if (!$isrename){
                //update and insert revisi version dokumen
                $findDokumenId = $dokumen->find(array('dokumen_id'=>$dokumen_induk));
                $findDokumenInduk = $dokumen->find(array('dokumen_induk'=>$dokumen_induk));
                $findDokumen = array_merge($findDokumenId, $findDokumenInduk);

            foreach ($findDokumen as $k => $v) {
                //start proses properti
                //insert to properti if id dokumen_properti is empty
                $idProp = $v['dokumen_properti'];
                if(empty($idProp)){
                    $op = $properti->created($akun);
                    $idProp = $op['properti_id'];
                }
                //update to properti
                $properti->updated($idProp, $akun);
                //end properti

                    $dokumen->update($v['dokumen_id'], array(
                        'dokumen_isactive'  => false,
                        'dokumen_properti'  => $idProp
                    ));
                }
                //end update
                $upload = $dokumen->upload($arsip_id);
            }
            $op = $properti->created($akun, $data, 'dokumen', $dokumen_id, $dokumen_nama);  

            switch ($section) {
                case 'disposisi':
                    if($upload){
                        $akun = array_key_exists('staf_id', $data) ? $data['staf_id'] : null;
                        $stafProfil = $model_staf->read($staf);
                        $pelakuProfil = $model_staf->read($akun);
                        $operation = $dokumen->insert(array(
                            'dokumen_id'       => $upload['raw_name'],
                            'dokumen_nama'     => $dokumen_nama,
                            'dokumen_arsip'    => $arsip_id,
                            'dokumen_induk'    => $dokumen_induk,
                            'dokumen_previous' => $dokumen_previous,
                            'dokumen_file'     => $upload['raw_name'].$upload['file_ext'],
                            'dokumen_preview'  => in_array($upload['file_type'], $this->config->item('mime_previewable')) ? str_replace($upload['file_ext'], '_thumb'.$upload['file_ext'], $upload['file_name']) : null,
                            'dokumen_path'     => $upload['full_path'],
                            'dokumen_size'     => $upload['file_size'], // in KB
                            'dokumen_ext'      => $upload['file_ext'],
                            'dokumen_mime'     => $upload['file_ext'],
                            'dokumen_properti' => $op['properti_id'],
                            'dokumen_buat_tgl' => $now,
                            'dokumen_buat_staf'=> $staf,
                            'dokumen_buat_profil' => $stafProfil['staf_profil'],
                            'dokumen_buat_pelaku'  => $akun,
                            'dokumen_buat_pelaku_profil'  => $pelakuProfil['staf_profil'],
                            'dokumen_buat_pelaku_tgl'  => $now,
                            'dokumen_disposisi'=> 1,
                            'dokumen_islihat'  => $dokumen_islihat,
                            'dokumen_isactive' => true
                        ),null, function($response){});
                    }else{
                        $operation['message'] = $this->upload->display_errors();
                    }
                    break;

                case 'dokumen':
                    if($upload){
                        $akun = array_key_exists('staf_id', $data) ? $data['staf_id'] : null;
                        $stafProfil = $model_staf->read($akun);
                        $operation = $dokumen->insert(array(
                            'dokumen_id'       => $upload['raw_name'],
                            'dokumen_nama'     => $dokumen_nama,
                            'dokumen_arsip'    => $arsip_id,
                            'dokumen_induk'    => $dokumen_induk,
                            'dokumen_previous' => $dokumen_previous,
                            'dokumen_file'     => $upload['raw_name'].$upload['file_ext'],
                            'dokumen_preview'  => in_array($upload['file_type'], $this->config->item('mime_previewable')) ? str_replace($upload['file_ext'], '_thumb'.$upload['file_ext'], $upload['file_name']) : null,
                            'dokumen_path'     => $upload['full_path'],
                            'dokumen_size'     => $upload['file_size'], // in KB
                            'dokumen_ext'      => $upload['file_ext'],
                            'dokumen_mime'     => $upload['file_ext'],
                            'dokumen_properti' => $op['properti_id'],
                            'dokumen_buat_tgl' => $now,
                            'dokumen_buat_staf'=> $akun,
                            'dokumen_buat_profil' => $stafProfil['staf_profil'],
                            'dokumen_isactive' => true,
                            'dokumen_reupload' => $dokumen_reupload['dokumen_reupload']
                        ),null, function($response){});
                    }else{
                        $operation['message'] = $this->upload->display_errors();
                    }
                    break;
                case 'link':
                    $operation = $dokumen->insert(array(
                        'dokumen_arsip'     => $arsip_id,
                        'dokumen_nama'      => $dokumen_nama,
                        'dokumen_induk'     => $dokumen_induk,
                        'dokumen_previous'  => $dokumen_previous,
                        'dokumen_file'      => $dokumen_file,
                        'dokumen_ext'       => '.link',
                        'dokumen_mime'      => '.link',
                        'dokumen_buat_tgl'  => $now,
                        'dokumen_buat_staf' => $akun,
                        'dokumen_buat_profil' => $stafProfil['staf_profil'],
                        'dokumen_properti'  => $op['properti_id'],
                        'dokumen_isactive'  => true
                    ), null, function($response){});
                    break;
                case 'sdoc':
                    $operation = $dokumen->insert(array(
                        'dokumen_arsip'     => $arsip_id,
                        'dokumen_nama'      => $dokumen_nama,
                        'dokumen_induk'     => $dokumen_induk,
                        'dokumen_previous'  => $dokumen_previous,
                        'dokumen_file'      => $dokumen_file,
                        'dokumen_ext'       => '.sdoc',
                        'dokumen_mime'      => '.sdoc',
                        'dokumen_buat_tgl'  => $now,
                        'dokumen_buat_staf' => $akun,
                        'dokumen_buat_profil' => $stafProfil['staf_profil'],
                        'dokumen_properti'  => $op['properti_id'],
                        'dokumen_isactive'  => true,
                        'dokumen_ispetikan'  => $dokumen_ispetikan
                    ), null, function($response){});
                    break;
                case 'rename':
                    $operation = $dokumen->update($dokumen_id, array(
                        'dokumen_nama' => $dokumen_nama,
                        'dokumen_islihat'  => $dokumen_islihat
                    ), function($response){});
                    break;
                default:
                    # code...
                    break;
            }
        }else{
            $operation['message'] = $this->get_message('surat_invalid');
        }

        if($operation[$dokumen->successProperty]){
            $operation[$dokumen->dataProperty] = $dokumen->render($operation[$dokumen->dataProperty]);
        }

        $this->response($operation);
    }

    function destroy($section = null){
        $surat = $this->m_surat;
        $dokumen = $this->m_dokumen;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $akun = $account->get_profile_id();

        $operation = array('success'=>false, 'message'=>$this->get_message('upload_failed'));
        
        $data = $_POST;

        $dokumen_id = array_key_exists($dokumen->field_id, $data) ? $data[$dokumen->field_id] : null;
        $idProp = $data['dokumen_properti'];

        if(empty($idProp)){
            $op = $properti->created($akun);
            $idProp = $op['properti_id'];
        }
        $properti->deleted($idProp, $akun);
        $operation = $dokumen->update($dokumen_id, array(
            'dokumen_isactive'  => false,
            'dokumen_ishapus'  => 1,
            'dokumen_properti'  => $idProp
        ));

        if($operation[$dokumen->successProperty]){
            $operation[$dokumen->dataProperty] = $dokumen->render($operation[$dokumen->dataProperty]);
        }

        $this->response($operation);
    }

    function view($id=null){
        $id = varGet('id', $id);
        $image = $this->m_dokumen->get_content_view($id);
        if($image){
            if($image['ext'] == '.pdf'){
                ob_clean();
                $this->output->set_content_type('pdf');
                $this->output->set_output($image['path']);
            }else{
                ob_clean();
                $this->output->set_content_type('jpeg');
                $this->output->set_output($image['path']);
            }
        }
    }

    function preview($id = null){
        $id = varGet('id', $id);
        $image = $this->m_dokumen->get_content_preview($id);
        if( $image ){
            ob_clean();
            $this->output->set_content_type('jpeg');
            $this->output->set_output($image);
        }
    }

    // function download($id = null){
    //     $id = varGet('id', $id);
    //     $report_model = $this->m_report;
    //     $record = $this->m_dokumen->get_content_download($id);
    //     if($record){
    //         if($record['dokumen_ext'] == '.sdoc'){
    //             // $html_encoded = html_entity_decode(base64_decode($record['dokumen_file']));
    //             // $content = '
    //             // <div style="margin: 1.4cm 0cm 0cm 1.6cm">'.$html_encoded.
    //             // '</div>';
                
    //             $content = '<div style="margin: 8mm 15mm 20mm 14mm; page-break-after: always;">'.html_entity_decode(base64_decode($record['dokumen_file'])).'</div>';
    //             $splitted = explode('.', $record['dokumen_nama']);
    //             $report_model->generateReportPdf($content, array(), $splitted[0], 'D', false);
    //             die; // genereateReportPdf() is auto download so die here;
    //         }
    //         force_download($record['dokumen_nama'].$record['dokumen_ext'], $record['dokumen_content']);
    //     }
    // }

    function download($id = null){
        $id = varGet('id', $id);
        $report_model = $this->m_report;
        $surat_model = $this->m_surat;
        $record = $this->m_dokumen->get_content_download($id);        
        $watermark = null;
        if($record){
            if($record['dokumen_ext'] == '.sdoc'){
                // $content = html_entity_decode(base64_decode($record['dokumen_file']));
                $surat = $surat_model->read(array(
                    'surat_arsip' => $record['dokumen_arsip'],
                    '(surat_model = 2 OR surat_model = 4)' => null,
                ));
        
                if(!empty($surat)){
                    if ($surat['surat_setuju'] != 2) $watermark = true ;
                }
                
                $content = '<div style="margin: 8mm 3mm 20mm 14mm; page-break-after: always;">'.html_entity_decode(base64_decode($record['dokumen_file'])).'</div>';
                $splitted = explode('.', $record['dokumen_nama']);
                $report_model->generateReportPdf($content, array(), $splitted[0], 'D',false ,$watermark);
                die; // genereateReportPdf() is auto download so die here;
            }
            force_download($record['dokumen_nama'].$record['dokumen_ext'], $record['dokumen_content']);
        }
    }

    function duplicate(){
        $surat_model = $this->m_surat;
        $dokumen_model = $this->m_dokumen;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $arsip = $this->m_arsip;

        $operation = array('success'=>false, 'message'=>$this->get_message('copy_failed'));

        $data = $_POST;
        $arsip_id = $data['arsip_id'];
        $akun = $account->get_profile_id();
        $dokumen = $dokumen_model->find(array(
            'dokumen_arsip'     => $arsip_id,
            'dokumen_isactive'  => 1
        ));

        //create arsip
        $dataArsip = array(
            'arsip_nama' => 'TRANS.'.date('Y-m-d')
        );
        $opArsip = $arsip->insert($dataArsip, 
                    null, function($resp) use($arsip, $data, $akun, $properti){
                        if($resp[$arsip->successProperty] !== true) return;
                        $inserted_data = $arsip->read($arsip->get_insertid());
                        $op = $properti->created($akun, $inserted_data, 'arsip', $inserted_data['arsip_id'], $inserted_data['arsip_nama']);
                        if($op){
                            $arsip->update($inserted_data['arsip_id'], array(
                                'arsip_properti' => $op['properti_id']
                            ));
                        }
                    });
        $data['surat_arsip'] = $arsip->get_insertid();

        foreach ($dokumen as $idx => $v) {
            $getDok = $dokumen_model->read($v['dokumen_id'], false, true);
            if($getDok){
                $dupDokumen = $dokumen_model->duplicate($getDok,$v['dokumen_id']);
                if($dupDokumen){
                    $operation = $dokumen_model->insert(array(
                        'dokumen_id'       => $dupDokumen['dokumen_id'],
                        'dokumen_arsip'    => $data['surat_arsip'],
                        'dokumen_nama'     => $getDok['dokumen_nama'],
                        'dokumen_file'     => $dupDokumen['dokumen_file'],
                        'dokumen_preview'  => $dupDokumen['dokumen_preview'],
                        'dokumen_path'     => realpath($dupDokumen['dokumen_path']),
                        'dokumen_size'     => $getDok['dokumen_size'], // in KB
                        'dokumen_date'     => date('Y-m-d H:i:s'),
                        'dokumen_ext'      => $getDok['dokumen_ext'],
                        'dokumen_mime'     => $getDok['dokumen_mime'],
                        'dokumen_isactive' => 1
                    ),null, function($response){});
                }
            }
        }

        if($operation[$dokumen_model->successProperty]){
            $operation[$dokumen_model->dataProperty] = $dokumen_model->render($operation[$dokumen_model->dataProperty]);
        }

        $this->response($opArsip);
    }

    function generateTemplate(){
        $surat_model = $this->m_surat;
        $surat_view = $this->m_surat_view;
        $surat_stack = $this->m_surat_stack;
        $surat_penerimask = $this->m_surat_penerimask;
        $stack_koreksi_model = $this->m_surat_stack_koreksi;
        $stack_disposisi_model = $this->m_surat_stack_disposisi;
        $dokumen_model = $this->m_dokumen;
        $staf_model = $this->m_staf_view;
        $report_model = $this->m_report;
        $model_pengaturan = $this->m_pengaturan;

        $data = $_POST;
        $tembusan = [];

        $tpl = new Template(array(
            'template'=>base64_decode($data['template']),
            'marker'=>array('[%','%]')
        ));

        $surat = $surat_model->read($data['surat']);

        $id_penerimask = null;
        if($surat['surat_model_sub'] == 1) {
            $penerimask = $surat_penerimask->find(array(
                'surat_penerimask_surat' => $data['surat']
            ));
            
            if($penerimask) {
                $id_penerimask = $penerimask[0]['surat_penerimask_staf'];
            }
        }

        $parsing = $model_pengaturan->getCompiledDataTemplate($data['surat'], null, null, $id_penerimask);

        $response = $tpl->apply($parsing);

        $this->response($response);
    }

    public function transporter(){

        $basepath = dirname(BASEPATH);
        $scan = scandir($basepath . '/data/surat/');
        $scan = array_diff($scan, array('.', '..'));

        foreach ($scan as $k => $v) {
            
            $arsip_id = $v;
            $path = $basepath . '/data/surat/' . $arsip_id;
            $target = $basepath . '/data/dokumen/';

            if(is_dir($path)){
                echo ' this '.$path.' is a directory <br>';

                $scanPath = scandir($path);
                $scanPath = array_diff($scanPath, array('.', '..'));

                echo "<pre>";
                print_r($scanPath);
                echo "<br>";

                if($scanPath !== false){
                    foreach ($scanPath as $key => $value) {
                        $dokumen_file = $value;
                        $pathFoto = $path . '/' . $dokumen_file;
                        echo 'copy from '.$pathFoto.' to '.$target.$dokumen_file.' <br>';
                        copy($pathFoto, $target.$dokumen_file);
                        // echo 'deleting '.$path.' <br>';
                        // shell_exec('rm -R '.$path);                    
                    }
                }
            }else{
                echo '<br> this '.$path.' is not directory <br>';
            }

        }
    }

    public function transporter_sdoc(){
        $dokumen = $this->m_dokumen;

        $dok = $dokumen->find(array(
            'dokumen_ext'=>'.sdoc',
            'dokumen_file LIKE "&lt%"' => null
        ), null, null, null, null, 500, 0);
        // print_r($dok['dokumen_file']);
        foreach ($dok as $key => $r) {
            $source = $r['dokumen_file'];
            $rex = preg_match('%^[a-zA-Z0-9/+]*={0,2}$%', $source , $matches, PREG_OFFSET_CAPTURE);
            if(!$rex){
            $file = base64_encode($source);
            $dokumen->update($r['dokumen_id'], array(
                        'dokumen_file'=>$file
                    ));             
            }
            print_r(base64_encode($source));
        }
    }

    public function transporter_reupload(){
        $dokumen = $this->m_dokumen;

        $dok = $dokumen->find(array(
            'dokumen_reupload is null'=> null
        ));
        // print_r($dok['dokumen_file']);
        foreach ($dok as $key => $r) {
            $source = $r['dokumen_reupload'];
            $dokumen->update($r['dokumen_id'], array(
                'dokumen_reupload'=> 0
            ));             
            print_r(base64_encode($source));
        }
    }

    function isMaxs($id = null, $max = null){
        $id = varGet('id');
        $max = varGet('max');
        $dokumen = $this->m_dokumen;

        $dok = $dokumen->find(array(
            'dokumen_arsip' => $id,
            'dokumen_reupload'=> 1,
            'dokumen_isactive'=> 1
        ));
        $countdok = count($dok);

        if($max == $countdok){
            $this->response(array(
                'max' => '1'
            ));
        }else{
            $this->response(array(
                'max' => '0'
            ));
        }
    }

    function printSdoc() {
        $me = $this;
        $report_model       = $me->model('sipas/report',true);
        $account_model      = $me->model('sipas/account',true);
        $unitkerja_model    = $me->model('sipas/unit',true);
        $asset_model        = $me->model('sipas/asset',true);
        $jenis_model        = $me->model('sipas/jenis',true);
        
        $pengaturan     = $me->m_pengaturan;
        $surat          = $me->m_surat;
        $surat_view     = $me->m_surat_view;
        $surat_stack    = $me->m_surat_stack;
        $staf_model     = $me->m_staf;
        $dokumen        = $me->m_dokumen;

        $id = varGet('id');

        $record = $surat_view->read($id);
        if (empty($record)) {
            $data = $dokumen->read($id);
            // echo base64_decode($data['dokumen_file']);
            $arsip = $this->m_arsip->read(array('arsip_id' => $data['dokumen_arsip']));
            $surat_id = $this->m_surat_view->read(array('surat_arsip' => $arsip['arsip_id']));
            $record = $surat_view->read($surat_id['surat_id']);
        }

        $download = false;
        
        //find last stack
        $stack_last = $surat_stack->find(array(
            'surat_stack_surat' => $record['surat_id'],
            'surat_stack_model' => 1
        ), NULL, null, null, array(
            'surat_stack_level'=>'asc'
        ));

        //find jenis memo
        $jMemo = $jenis_model->read(array(
            'jenis_kode' => 'MO',
            'IFNULL(jenis_isaktif, 0) = 1' => NULL
        ));

        if($stack_last){
            end($stack_last);
            if(end($stack_last)['surat_stack_status'] === '2'){
                $granted = "Telah Disetujui";
            }
            else{
                $granted = "Dalam Proses Penyetujuan";
            }
            $staf = $staf_model->read(end($stack_last)['surat_stack_staf']);

            $date = $record['surat_tanggal'];
            $createDate = new DateTime($date);
            $statusDate = new DateTime(end($stack_last)['surat_stack_status_tgl']);
            $record['surat_tanggal'] = $createDate->format('d M Y');
            $tglPenyetuju = $statusDate->format('d M Y');

            $getSetting = $pengaturan->getSettings();
            $template = $pengaturan->getSettingByCode('template_cetak_penyetujuan_sk');

            $header_mode = $report_model->getHeaderMode($template);

            if ($template !== null){
                $template = html_entity_decode($template);
            } else {
                $template = $this->load->view($this->report_template, null, true);
            }

            if ($record['surat_jenis'] == $jMemo['jenis_id']) {
                $tgl = $tglPenyetuju;
            } else {
                $tgl = $record['surat_tanggal'];
            }
            
            $report_data = array(
                'title' => 'Lembar Persetujuan',
                $header_mode[0] => $report_model->generateHeader($download, 0, $header_mode[1]),
                'surat_registrasi' => $record['surat_registrasi'],
                'surat_tanggal' => $record['surat_tanggal'],
                'surat_nomor' => $record['surat_nomor'],
                'surat_perihal' => $record['surat_perihal'],
                'tanggal_persetujuan' => $tgl,
                'nama_persetujuan' => $staf['staf_nama'],        
                'granted'=> $granted,
                'nama_perusahaan'=> $getSetting['data_perusahaan_nama'],
                'qrcode'=>$me->checkqrcode($record['surat_id'])
            );
        }else{
            if($record['surat_setuju'] === '2'){
                $granted = "Telah Disetujui";
            }
            else{
                $granted = "Dalam Proses Penyetujuan";
            }
            $staf = $staf_model->read($record['surat_setuju_staf']);

            $date = $record['surat_tanggal'];
            $datePenye = $record['surat_setuju_tgl'];
            $createDate = new DateTime($date);
            $penyetujuDate = new DateTime($datePenye);
            $record['surat_tanggal'] = $createDate->format('d M Y');
            $record['surat_setuju_tgl'] = $penyetujuDate->format('d M Y');

            $getSetting = $pengaturan->getSettings();

            $template = $pengaturan->getSettingByCode('template_cetak_penyetujuan_sk');

            $header_mode = $report_model->getHeaderMode($template);

            if ($template !== null){
                $template = html_entity_decode($template);
            } else {
                $template = $this->load->view($this->report_template, null, true);
            }

            if ($record['surat_jenis'] == $jMemo['jenis_id']) {
                $tgl = $record['surat_setuju_tgl'];
            } else {
                $tgl = $record['surat_tanggal'];
            }

            $report_data = array(
                'title' => 'Lembar Persetujuan',
                $header_mode[0] => $report_model->generateHeader($download, 0, $header_mode[1]),
                'surat_registrasi' => $record['surat_registrasi'],
                'surat_tanggal' => $record['surat_tanggal'],
                'surat_nomor' => $record['surat_nomor'],
                'surat_perihal' => $record['surat_perihal'],
                'tanggal_persetujuan' => $tgl,
                'nama_persetujuan' => $staf['staf_nama'],
                'granted'=> $granted,
                'nama_perusahaan'=> $getSetting['data_perusahaan_nama'],
                'qrcode'=>$me->checkqrcode($record['surat_id'])
            );
        }
        // $file = $this->load->view($this->report_template_approval, null, true);
        if($download){
            $report_model->generateReportPdf($template, $report_data, 'lembar_persetujuan'.date('dmy'), true);
        }else{
            $report_model->generateReport($template, $report_data, true);
        }
    }

    function checkqrcode($id = null){
        $this->load->library('ciqrcode');
        $data = base_url().'server.php/sipas/surat/printApproval?id='.$id;

        $params['data']         = $data;
        $params['cacheable']    = true;
        $params['quality']      = true;
        $params['size']         = '3'; 

        ob_start();
            $this->ciqrcode->generate($params);
            $out = base64_encode( ob_get_contents() );
        ob_end_clean();

        return "data:image/png;base64,".$out;
    }

     function read_docs_kolektif(){
        $model = $this->m_dokumen_view;
        
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $unit = varReq('unit');
        $staf = varReq('staf');
        $mode = varReq('mode');

        if (varGetHas('id') || varGetHas('dokumen_id')) {
            $id = varGet('id', varGet('dokumen_id'));
            $record = $model->read($id, false, true);
            $records = array('success' => (bool) $record, 'data' => $record);

            // if(array_key_exists("dokumen_path",$records)){
            //     unset($data['dokumen_path']);
            // }
            
            $this->response_record($records);
        } else {
            array_unshift($filter, (object)array(
                'type'      => 'exact',
                'property'  => 'dokumen_isactive',
                'value'     => 1
            ));

            switch ($mode) {
                case 'disposisi':
                    array_unshift($filter, (object)array(
                        'type'      => 'custom',                
                        'value'     => '(dokumen_petikan_staf IS NULL OR dokumen_petikan_staf="'.$staf.'")'
                    ));
                     array_unshift($filter, (object)array(
                        'type'      => 'custom',                
                        'value'     => '(dokumen_petikan_unit IS NULL OR dokumen_petikan_unit="'.$unit.'")'
                    ));
                    break;
                case 'surat':
                    array_unshift($filter, (object)array(
                        'type'      => 'custom',                
                        'value'     => '(dokumen_petikan_unit IS NULL OR dokumen_petikan_unit="'.$unit.'")'
                    ));
                    break;
                default:
                    break;
            }

            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
                'rendered'  => true
            ));

            foreach ($records[$model->dataProperty] as $i => &$data) {
                if(array_key_exists("dokumen_path",$data)){
                    unset($data['dokumen_path']);
                }
            }

            $this->response($records);
        }
    }

    function duplicate_dok(){
        $dokumen = $this->m_dokumen;

        $a = $dokumen->read('163c1514efca4c9e8b2d14cb39ef005b');

        for ($i = 0; $i < 1; $i++){
            $op = $dokumen->insert(array(
                'dokumen_arsip' => $a['dokumen_arsip'],
                'dokumen_nama' => $a['dokumen_nama'].'ke - '.$i,
                'dokumen_file' => $a['dokumen_file'],
                'dokumen_ext' => $a['dokumen_ext'],
                'dokumen_mime' => $a['dokumen_mime'],
                'dokumen_properti' => $a['dokumen_properti'],
                'dokumen_buat_tgl' => $a['dokumen_buat_tgl'],
                'dokumen_buat_staf' => $a['dokumen_buat_staf'],
                'dokumen_buat_profil' => $a['dokumen_buat_profil'],
                'dokumen_isactive' => 1
            ));

            $this->response($op);
        }
    }
    function preview_sdoc(){
        $id = varGet('id');
        $idsurat = varGet('surat');
        $penerima = varGet('staf');

        $dokumen = $this->m_dokumen;
        $surat = $this->m_surat;
        $pengaturan = $this->m_pengaturan;
        $suratpenerimask = $this->m_surat_penerimask;

        $datadoc = $dokumen->read($id);
        $datasurat = $surat->read($idsurat);

        $tpl = new Template(array(
            'template'=>base64_decode($datadoc['dokumen_file']),
            'marker'=>array('[%','%]')
        ));

        $id_penerimask = null;
        if($datasurat['surat_model_sub'] == 1) {
            $penerimask = $suratpenerimask->find(array(
                'surat_penerimask_surat' => $idsurat
            ));

            if($penerimask) {
                $id_penerimask = $penerimask[0]['surat_penerimask_staf'];
            }
        }

        /*parsing before*/
        $parsing_awal = $pengaturan->getCompiledDataTemplate($idsurat, null, null, $id_penerimask);
        $data_awal = $tpl->apply($parsing_awal);

        /*parsing after*/
        $parsing_akhir = $pengaturan->getCompiledDataTemplate($idsurat, null, null, $penerima);
        $data = $this->parser->parse_string($data_awal, $parsing_akhir);

        $this->response($data);      
    }
}