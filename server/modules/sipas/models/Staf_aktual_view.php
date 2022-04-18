<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/staf_aktual', true);

class Sipas_model_Staf_aktual_view extends Sipas_model_staf_aktual {

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_staf_aktual');
        $this->set_fields(array(
            array('name' => 'staf_aktual_pengirim_id',              'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_kode',            'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_nama',            'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_profil',          'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_unit',            'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_unit_kode',       'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_unit_nama',       'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_jabatan',         'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_jabatan_kode',    'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_jabatan_nama',    'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_jabatan_isnomor', 'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_jabatan_ispenerima', 'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_isaktif',         'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim_status',          'update' => false, 'insert' => false),

            array('name' => 'staf_id',            'map' => 'staf_aktual_penerima_id',                   'update' => false, 'insert' => false),
            array('name' => 'staf_kode',          'map' => 'staf_aktual_penerima_kode',                 'update' => false, 'insert' => false),
            array('name' => 'staf_nama',          'map' => 'staf_aktual_penerima_nama',                 'update' => false, 'insert' => false),
            array('name' => 'staf_profil',        'map' => 'staf_aktual_penerima_profil',               'update' => false, 'insert' => false),
            array('name' => 'akun_nama',          'map' => 'staf_aktual_penerima_akun_nama',            'update' => false, 'insert' => false),
            array('name' => 'unit_id',            'map' => 'staf_aktual_penerima_unit',                 'update' => false, 'insert' => false),
            array('name' => 'unit_kode',          'map' => 'staf_aktual_penerima_unit_kode',            'update' => false, 'insert' => false),
            array('name' => 'unit_nama',          'map' => 'staf_aktual_penerima_unit_nama',            'update' => false, 'insert' => false),
            array('name' => 'jabatan_id',         'map' => 'staf_aktual_penerima_jabatan',              'update' => false, 'insert' => false),
            array('name' => 'jabatan_kode',       'map' => 'staf_aktual_penerima_jabatan_kode',         'update' => false, 'insert' => false),
            array('name' => 'jabatan_nama',       'map' => 'staf_aktual_penerima_jabatan_nama',         'update' => false, 'insert' => false),
            array('name' => 'jabatan_isnomor',    'map' => 'staf_aktual_penerima_jabatan_isnomor',      'update' => false, 'insert' => false),
            array('name' => 'jabatan_ispenerima', 'map' => 'staf_aktual_penerima_jabatan_ispenerima',   'update' => false, 'insert' => false),
            array('name' => 'staf_isaktif',       'map' => 'staf_aktual_penerima_isaktif',              'update' => false, 'insert' => false),
            array('name' => 'staf_status',        'map' => 'staf_aktual_penerima_status',               'update' => false, 'insert' => false),

            array('name' => 'staf_aktual_id',           'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_penerima',     'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_pengirim',     'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_tgl',          'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_tipe',         'update' => false, 'insert' => false),
            array('name' => 'staf_aktual_properti',     'update' => false, 'insert' => false)
        ), true);
    }

    function getImage($section = null, $staf_id = null, $mode = '') {
        // if(!in_array($section, array())) return;
        if(!empty($mode)){
            $name = $section . '_' . $mode;
        }else{
            $name = $section;
        }

        $path = Template::compile($this->imagePath)->apply(array(
            'staf_id'=>$staf_id
        ));
        $path = $path . $name . '.jpg';
        if (file_exists($path)) {
            return file_get_contents($path);
        }
        // set for default blank image
        $path = Template::compile($this->imageDefaultPath)->apply();
        $path = $path . $name . '.jpg';
        
        if (file_exists($path)) {
            return file_get_contents($path);
        }
    }

    function getUrlImage($section = null, $staf_id = null, $mode = '')
    {
        if(!empty($mode)){
            $name = $section . '_' . $mode;
        }else{
            $name = $section;
        }

        $path = Template::compile($this->imagePath)->apply(array(
            'staf_id'=>$staf_id
        ));
        $path = $path . $name . '.jpg';
        if (file_exists($path)) {
            return file_get_contents($path);
        }
        // set for default blank image
        $path = Template::compile($this->imageDefaultPath)->apply();
        $path = $path . $name . '.jpg';
        if (file_exists($path)) {
            return file_get_contents($path);
        }
    }

    function setImage($section, $staf_id = null) {
        $response = array('success' => false, 'message'=>'');

        if(!in_array($section, array('ttd','foto'))){
            $response['message'] = 'Opsi gambar tidak sesuai.';
            return $response;
        }
        if(empty($staf_id)) {
            $response['message'] = 'Id Pegawai tidak boleh kosong.';
            return $response;
        }
        if(empty($_FILES[$section])){
            $response['message'] = 'File tidak boleh kosong.';
            return $response;
        }

        $path = Template::compile($this->imagePath)->apply(array(
            'staf_id'=>$staf_id
        ));

        if (!file_exists($path)) {
            mkdir($path, 0777, TRUE);
        }
        $this->load->library('upload', array(
            'upload_path'   => $path,
            'allowed_types' => 'gif|jpg|png',
            'file_name'     => $section.'.jpg',
            'max_size'      => 5000,
            'encrypt_name'  => false,
            'overwrite'     => true,
        ));
        if ($this->upload->do_upload($section)) {
            $response[$this->successProperty] = true;
            $uploaddata = $this->upload->data();

            $this->load->library('image_lib');

            // square image processing, make file square
            $squareSize = ($uploaddata['image_width'] < $uploaddata['image_height']) ? $uploaddata['image_width'] : $uploaddata['image_height'];
            $this->image_lib->initialize(array(
                'source_image' => $uploaddata['full_path'],
                'x_axis' => ($uploaddata['image_width'] - $squareSize) / 2,
                'y_axis' => ($uploaddata['image_height'] - $squareSize) / 2,
                'width' => $squareSize,
                'height' => $squareSize,
                'master_dim' => $uploaddata['image_width'] < $uploaddata['image_height'] ? 'width' : 'height',
                'new_image'=> $path . $section . '.' . $this->imageExt,
                'maintain_ratio'=>false,
            ));
            if (!$this->image_lib->crop()) {
                $response['message'] .= $this->image_lib->display_errors();
            }
            $this->image_lib->clear();

            // big image processing
            $this->image_lib->initialize(array(
                'source_image' => $path . $section . '.' . $this->imageExt,
                'width' => $this->imageBigSize,
                'height' => $this->imageBigSize,
                'new_image'=> $path . $section . '.' . $this->imageExt
            ));
            if (!$this->image_lib->resize()) {
                $response['message'] .= '<br/>'.$this->image_lib->display_errors();
            }
            $this->image_lib->clear();

            // small image processing
            $this->image_lib->initialize(array(
                'source_image' => $path . $section . '.' . $this->imageExt,
                'width' => $this->imageSmallSize,
                'height' => $this->imageSmallSize,
                'new_image'=> $path . $section . '_' . $this->imageSmallName . '.' . $this->imageExt
            ));
            if (!$this->image_lib->resize()) {
                $response['message'] .= '<br/>'.$this->image_lib->display_errors();
            }
            $this->image_lib->clear();

        } else {
            $response['message'] = 'File tidak valid';
            // $response['debug'] = $this->upload->display_errors();
        }
        return $response;
    }

    function select($config = null, $fn = null)
    {
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