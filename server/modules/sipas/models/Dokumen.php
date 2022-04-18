<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Dokumen extends Base_model {
    public $field_arsip = 'dokumen_arsip';
    public $field_surat = 'surat_id';
    public $field_id = 'dokumen_id';
    public $field_nama = 'dokumen_nama';
    public $field_file = 'dokumen_file';
    public $field_reupload = 'dokumen_reupload';
    public $field_template = 'dokumen_template';
    public $field_induk = 'dokumen_induk';
    public $field_previous = 'dokumen_previous';
    public $field_preview = 'dokumen_preview';
    public $field_islihat = 'dokumen_islihat';
    public $field_ispetikan = 'dokumen_ispetikan';

    public $messages = array(
        'surat_invalid' => 'Berkas tidak terhubung dengan surat.',
        'upload_failed' => 'Upload gagal'
    );

    function __construct(){
        $me = $this;
        $CI = get_instance();
        
        $me->config->load('application_config');
    
        parent::__construct(array(
            'table' => array(
                'name' => 'dokumen',
                'primary'=> 'dokumen_id',
                'fields'=> array(
                    array('name'=>'dokumen_id',             'notnull'=>true, 'unique'=>true),
                    array('name'=>'dokumen_arsip',          'display'=>'arsip'),
                    array('name'=>'dokumen_previous',       'display'=>'previous'),
                    array('name'=>'dokumen_induk',          'display'=>'induk'),
                    array('name'=>'dokumen_reupload',       'display'=>'reupload'),
                    array('name'=>'dokumen_nama',           'display'=>'Nama Berkas'),
                    array('name'=>'dokumen_file',           'display'=>'File',
                        'convert'=>function($value, $record) use($me){
                            if($record['dokumen_mime'] == '.sdoc')
                            {
                                return htmlspecialchars_decode($value);
                            }
                            return $value;
                        },
                        'render'=>function($value, $record) use($me){
                            if(in_array($record['dokumen_mime'], array('.jpg','.png','.bmp','gif'))){
                                return Template::compile($this->config->item('viewUrl'))->apply($record);
                            }
                            elseif($record['dokumen_mime'] == 'sdoc')
                            {
                                return htmlspecialchars_encode($value);
                            }
                            else{
                                return Template::compile($this->config->item('viewUrl'))->apply($record);
                            }
                        }
                    ),
                    array('name'=>'dokumen_preview', 'display'=>'Preview', 'render'=>function($value, $record) use($me){
                        if(in_array($record['dokumen_mime'], array('.jpg','.png','.bmp','gif'))){
                            return Template::compile($me->config->item('previewUrl'))->apply($record);
                        }else{
                            return Template::compile($me->config->item('previewUrl'))->apply($record);
                        }
                    }),
                    array('name'=>'dokumen_path',           'display'=>'Path', 'public'=>false, 'private'=>true),
                    array('name'=>'dokumen_size',           'display'=>'Size'),
                    array('name'=>'dokumen_ext',            'display'=>'Ext'),
                    array('name'=>'dokumen_mime',           'display'=>'Mime'),
                    array('name'=>'dokumen_properti',       'display'=>'properti'),
                    array('name'=>'dokumen_ishapus',        'display'=>'properti'),
                    array('name'=>'dokumen_buat_tgl',       'display'=>'properti'),
                    array('name'=>'dokumen_buat_staf',      'display'=>'properti'),
                    array('name'=>'dokumen_buat_profil',    'display'=>'properti'),
                    array('name'=>'dokumen_isactive',       'display'=>'Aktif'),
                    array('name'=>'dokumen_buat_pelaku',    'display'=>'properti'),
                    array('name'=>'dokumen_buat_pelaku_profil', 'display'=>'properti'),
                    array('name'=>'dokumen_buat_pelaku_tgl','display'=>'properti'),
                    array('name'=>'dokumen_disposisi',      'display'=>'properti'),
                    array('name'=>'dokumen_islihat',        'display'=>'properti'),
                    array('name'=>'dokumen_petikan_staf',   'display'=>'petikan staf'),
                    array('name'=>'dokumen_petikan_unit',   'display'=>'petikan unit'),
                    array('name'=>'dokumen_ispetikan',      'display'=>'ispetikan'),
                    array('name'=>'dokumen_isimport',       'display'=>'isimport')

                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    // delete also attached 
    function delete($id = null, $fn = null, $force = false){
        $operation = call_user_func_array("parent::".__FUNCTION__, func_get_args());
        
        $model = $this;

        if($operation[$model->successProperty] and $operation[$model->dataProperty]){
            $record = $operation[$model->dataProperty];
            if(! empty($record['dokumen_arsip'])){
                $path = Template::compile($this->config->item('upload_config')['upload_path'])->apply(array(
                    'dokumen_id'=>$record['dokumen_arsip']
                ));
                if(!empty($record['dokumen_file'])){
                    $_path = $path."/".$record['dokumen_file'];
                    delete_files($_path, true);
                }
                if(!empty($record['dokumen_preview'])){
                    $_path = $path."/".$record['dokumen_preview'];
                    delete_files($_path, true);
                }
            }
        }
        return $operation;
    }

    function upload($dokumen_id = null){
        $path = Template::compile($this->config->item('upload_config')['upload_path'])->apply(array(
            'dokumen_id'=>$dokumen_id
        ));

        if ( ! file_exists($path) ){
            mkdir($path, 0777, TRUE); 
        }
        if( ! empty($_FILES['userfile']) ){
            $upload_config = $this->config->item('upload_config');
            $upload_config['upload_path']   = $path;
            $upload_config['file_name']     = $dokumen_id;

            $this->load->library('upload', $upload_config);
            
            if ( $this->upload->do_upload('userfile') ){
                $result = $this->upload->data();
                if( in_array($result['file_type'], $this->config->item('mime_previewable')) ){
                    // create thumb for it
                    $result['preview'] = $this->create_preview($result['full_path'], $path);
                }
                return $result;
            }else{
                print_r($this->upload->display_errors());
            }
        }
        return false;
    }

    function create_preview($source, $destinastion){
        $config = array(
            'image_library'     => 'gd2',
            'source_image'      => $source,
            'new_image'         => $destinastion,
            'create_thumb'      => TRUE,
            'thumb_marker'      => '_thumb',
            'maintain_ratio'    => TRUE,
            'width'             => 220,
            'height'            => 300,
        );
        $this->load->library('image_lib', $config);
        // Set your config up
        $this->image_lib->initialize($config);
        if (!$this->image_lib->resize()) {
            echo $this->image_lib->display_errors();
        }
        // clear //
        $this->image_lib->clear();

    }

    function get_content_view($id = null){
        $record = $this->read($id);

        if($record and $record['dokumen_file']){
         
            // if(in_array($record['dokumen_ext'], array('.jpg','.png','.jpeg'))){
                $path = Template::compile($this->config->item('upload_config')['upload_path'])->apply(array(
                    'arsip_id'=>$record['dokumen_arsip']
                ));
                $content = array('path' => file_get_contents($path.'/'.$record['dokumen_file']), 'ext' => $record['dokumen_ext']);
                if($content)
                {
                    return $content;
                }
            // }else{
            //     return $this->get_content_preview($id);
            // }
        }
    }

    function get_content_preview($id = null){
        $record = $this->read($id);

        if($record){
            // $path = Template::compile($this->config->item('upload_config')['upload_path'])->apply(array(
            $path = Template::compile($this->config->item('upload_config')['upload_path'])->apply(array(
                'dokumen_id'=>$record['dokumen_id']
            ));
            $content = file_get_contents($path.'/'.$record['dokumen_preview']);
            if($content)
            {
                return $content;
            }

            // worst case if no thumb
            $path = Template::compile($this->config->item('extPath'))->apply(array(
                'ext'=>$record['dokumen_ext']
            ));
            if(file_exists($path))
            {
                return $content = file_get_contents($path);
            }
            else if(file_exists($this->config->item('extDefaultPath')))
            {
                return $content = file_get_contents($this->config->item('extDefaultPath'));
            }
        }
    }

    function get_content_download($id = null){
        $record = $this->read($id);
        if($record and $record['dokumen_file']){
            
            if($record['dokumen_ext'] == '.sdoc'){
                $record['dokumen_file'] = htmlspecialchars($record['dokumen_file']);
            }else{
                $path = Template::compile($this->config->item('upload_config')['upload_path'])->apply(array(
                'arsip_id'=>$record['dokumen_arsip']
                ));
                $record['dokumen_content'] = file_get_contents($path.'/'.$record['dokumen_file']);
            }

            return $record;
        }   
    }

    function duplicate($berkas = null, $dokumen_id = null){

        $path = $berkas['dokumen_path'];
        $arsip = $berkas['dokumen_arsip'];

        $new_id = md5($berkas['dokumen_nama'] . strval(round(microtime(true) * 1000)) . rand(0, 1000));

        $dokumen_id = md5($berkas['dokumen_arsip'] . strval(round(microtime(true) * 1000)) . rand(0, 1000));

        $dokumen_file = $new_id.''.$berkas['dokumen_ext'];
        $dokumen_preview = $new_id.'_thumb'.$berkas['dokumen_ext'];
        //path
        $original_path = Template::compile($this->config->item('upload_config')['upload_path'])->apply(array(
            'dokumen_id'=>$dokumen_id
        ));
        if ( ! file_exists($original_path) ){
            mkdir($original_path, 0777, TRUE);
        }

        $new_path = str_replace($arsip, $dokumen_id, $path);

        $dokumen_path = $original_path.'/'.$dokumen_file;
        $dokumen_preview_path = $original_path.'/'.$dokumen_preview;

        $ext = $berkas['dokumen_ext'];
        if($ext === '.sdoc' || $ext === '.link'){
            $record = array(
                'dokumen_id'       => $dokumen_id,
                'dokumen_arsip'    => $arsip,
                'dokumen_nama'     => $berkas['dokumen_nama'],
                'dokumen_file'     => $berkas['dokumen_file'],
                'dokumen_path'     => null,
                'dokumen_preview'  => null,
                'dokumen_ext'      => $berkas['dokumen_ext'],
                'dokumen_mime'     => $berkas['dokumen_mime'],
                'dokumen_isactive' => 1
            );
            return $record;
        }else{
            if(!copy($path, $dokumen_path)){
            }else{
                if(!copy($path, $dokumen_preview_path)){
                }else{
                    if($berkas['dokumen_preview'] === null) $dokumen_preview = null;
                    $record = array(
                        'dokumen_id'       => $dokumen_id,
                        'dokumen_arsip'    => $arsip,
                        'dokumen_nama'     => $berkas['dokumen_nama'],
                        'dokumen_file'     => $dokumen_file,
                        'dokumen_path'     => $dokumen_path,
                        'dokumen_preview'  => $dokumen_preview,
                        'dokumen_size'     => $berkas['dokumen_size'],
                        'dokumen_ext'      => $berkas['dokumen_ext'],
                        'dokumen_mime'     => $berkas['dokumen_mime'],
                        'dokumen_isactive' => 1
                    );
                    return $record;
                }
            }
        }
    }
}