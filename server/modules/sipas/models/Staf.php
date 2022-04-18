<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Staf extends Base_model {

    public $messages = array(
        'surat_invalid' => 'Berkas tidak terhubung dengan surat.',
        'upload_failed' => 'Upload gagal'
    );

    protected $imagePath = "./data/staf/";
    protected $imagePathMobile = "/data/staf/";
    protected $imageDefaultPath = './assets/staf_default/';

    protected $imageSmallName = 'thumb';
    protected $imageSmallSize = '32';
    protected $imageBigSize = '200';
    protected $imageExt = 'jpg';

    function __construct(){
        
        $this->config->load('application_config');
        parent::__construct(array(
            'table' =>array(
                'name'=>'staf',
                'primary'=>'staf_id',
                'fields'=> array(
                    array(
                        'name'=>'staf_id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'staf_profil',
                        'display'=>'profil',
                    ),
                    array(
                        'name'=>'staf_kode',
                        'display'=>'NIP',
                        // 'unique'=>true
                    ),
                    array(
                        'name'=>'staf_nama',
                        'display'=>'Nama'
                    ),
                    array(
                        'name'=>'staf_peran',
                        'display'=>'Peran'
                    ),
                    array(
                        'name'=>'staf_kelamin',
                        'display'=>'Jenis Kelamin'
                    ),
                    array(
                        'name'=>'staf_unit',
                        'display'=>'unitkerja'
                    ),
                    array(
                        'name'=>'staf_jabatan',
                        'display'=>'Jabatan'
                    ),
                    array(
                        'name'=>'staf_golongan',
                        'display'=>'Golongan'
                    ),
                    array(
                        'name'=>'staf_sgt',
                        'display'=>'SGT'
                    ),
                    array(
                        'name'=>'staf_akun',
                        'display'=>'User'
                    ),
                    array(
                        'name'=>'staf_akun_isdefault',
                        'display'=>'User'
                    ),
                    array(
                        'name'=>'staf_properti',
                        'display'=>'properti'
                    ),
                    array(
                        'name'=>'staf_isaktif',
                        'display'=>'is aktif'
                    ),
                    array(
                        'name'=>'staf_status',
                        'display'=>'Status'
                    ),
                    array(
                        'name'=>'staf_ishapus',
                        'display'=>'is hapus'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }

    function getTtd($staf_id = null, $mode = '') {
        $upload_config_ttd = $this->config->item('upload_staf_ttd_config');

        $ttd_path           = $upload_config_ttd['imagePath'];
        $ttd_default_path   = $upload_config_ttd['imageDefaultPath'];
        
        if(!empty($mode)){
            $name = $staf_id . '_' . $mode;
        }else{
            $name = $staf_id;
        }

        $path = Template::compile($ttd_path)->apply(array(
            'staf_id'=>$staf_id
        ));
        $path = $path . $name . '.png';
        
        if (file_exists($path)) {
            return file_get_contents($path);
        }
        // set for default blank image
        $name = 'ttd_sdoc';
        $path = Template::compile($this->imageDefaultPath)->apply();
        $path = $path . $name . '.jpg';
        
        if (file_exists($path)) {
            return file_get_contents($path);
        }
    }

    function getImage($section = null, $staf_id = null, $mode = '') {
        $upload_config_staf = $this->config->item('upload_staf_config');
        $upload_config_ttd = $this->config->item('upload_staf_ttd_config');

        $staf_path          = $upload_config_staf['imagePath'];
        $staf_default_path  = $upload_config_staf['imageDefaultPath'];

        $ttd_path           = $upload_config_ttd['imagePath'];
        $ttd_default_path   = $upload_config_ttd['imageDefaultPath'];
        $ext = '.jpg';
        
        if(!empty($mode)){
            $name = $staf_id . '_' . $mode;
        }else{
            $name = $staf_id;
        }

        switch ($section) {
            case 'ttd':
                $path = Template::compile($ttd_path)->apply(array(
                    'staf_id'=>$staf_id
                ));
                $ext = '.png';
                break;
            case 'foto':
            default:
                $path = Template::compile($this->imagePath)->apply(array(
                    'staf_id'=>$staf_id
                ));
                break;
        }
        $path = $path . $name . $ext;
        
        if (file_exists($path)) {
            return file_get_contents($path);
        }
        // set for default blank image
        if(!empty($mode)){
            $name = $section . '_' . $mode;
        }else{
            $name = $section;
        }
        $path = Template::compile($this->imageDefaultPath)->apply();
        $path = $path . $name . '.jpg';
        
        if (file_exists($path)) {
            return file_get_contents($path);
        }
    }

    function getUrlImage($section = null, $staf_id = null, $mode = ''){
        $upload_config_staf = $this->config->item('upload_staf_config');
        $upload_config_ttd = $this->config->item('upload_staf_ttd_config');

        $staf_path          = $upload_config_staf['imagePath'];
        $staf_default_path  = $upload_config_staf['imageDefaultPath'];

        $ttd_path           = $upload_config_ttd['imagePath'];
        $ttd_default_path   = $upload_config_ttd['imageDefaultPath'];

        if(!empty($mode)){
            $name = $staf_id . '_' . $mode;
        }else{
            $name = $staf_id;
        }

        switch ($section) {
            case 'ttd':
                $path = Template::compile($ttd_path)->apply(array(
                    'staf_id'=>$staf_id
                ));
                break;
            default:
                $path = Template::compile($staf_path)->apply(array(
                    'staf_id'=>$staf_id
                ));
                break;
        }
        $path = $path . $name . '.jpg';
        if (file_exists($path)) {
            return file_get_contents($path);
        }
        // set for default blank image
        if(!empty($mode)){
            $name = $section . '_' . $mode;
        }
        else{
            $name = $section;
        }
        $path = Template::compile($this->imageDefaultPath)->apply();
        $path = $path . $name . '.jpg';
        if (file_exists($path)) {
            return file_get_contents($path);
        }
    }

    function upload($section = null, $staf_id = null){
        $upload_config_staf = $this->config->item('upload_staf_config');
        $upload_config_ttd = $this->config->item('upload_staf_ttd_config');

        $staf_path          = $upload_config_staf['imagePath'];
        $staf_default_path  = $upload_config_staf['imageDefaultPath'];

        $ttd_path           = $upload_config_ttd['imagePath'];
        $ttd_default_path   = $upload_config_ttd['imageDefaultPath'];

        $path = Template::compile($staf_path)->apply(array(
            'staf_id'=>$staf_id
        ));
        $filename = $staf_id.'.jpg';
        if ($section == 'ttd'){
            $path = Template::compile($ttd_path)->apply(array(
                'staf_id'=>$staf_id
            ));
            $filename = $staf_id.'.png';
        }
        $response = array('success' => false, 'message'=>'');

        $upload_config = array(
            'upload_path'   => $path,
            'file_name'     => $filename,
            'allowed_types' => 'gif|jpg|jpeg|png',
            'max_size'      => 5000,
            'encrypt_name'  => false,
            'overwrite'     => true
        );

        if(empty($_FILES[$section])){
            $response['message'] = 'File tidak boleh kosong.';
            return $response;
        }

        if (!file_exists($path)){
            mkdir($path, 0777, TRUE); 
        }
        
        $this->load->library('upload', $upload_config);
        
        if ($this->upload->do_upload($section)){
            $response[$this->successProperty] = true;
            $response['message'] = 'Berhasil Upload';
            $result = $this->upload->data();
            if(in_array($result['file_type'], $this->config->item('mime_previewable'))){
                // create thumb for it
                $result['preview'] = $this->create_preview($result['full_path'], $path);
            }
            // return $result;
        }else{
            $response['message'] = $this->upload->display_errors();
            // print_r($this->upload->display_errors());
            // return false;
        }
        //print_r($_FILES[$section]);
        return $response;
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

    function select($config = null, $fn = null){
        $result = call_user_func_array('parent::select', func_get_args());

        if(is_array($result) and !empty($result['data']))
        {
            foreach ($result['data'] as $key => &$value)
            {
                $value['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['staf_id'];
            }
        }
        return $result;
    } 
}