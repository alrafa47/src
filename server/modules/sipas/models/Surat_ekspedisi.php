<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->model('sipas/disposisi_masuk_netral_view');

class Sipas_model_Surat_ekspedisi extends Sipas_model_Disposisi_masuk_netral_view{

    public $icon        = 'fam user';
    public $icon_parent = 'fam user';
    public $icon_leaf   = 'fam user';
    
    protected $field_parent = 'disposisi_induk';
    protected $field_disposisi = 'disposisi_surat';
    protected $field_text = 'text';
    protected $field_meta = 'metainfo';
    protected $field_children = 'children';
    protected $field_total = 'total';
    protected $field_root = 'root';
    protected $field_root_value = '.';
    protected $field_leaf = 'leaf';

    protected $_count_temp = 0;
    
    public $value_root = 'Surat Masuk';

    function __construct(){
        parent::__construct();
        $CI = get_instance();
        $this->load->model('sipas/disposisi_netral_view', 'disposisi_model');
        $this->load->model('sipas/disposisi_masuk_netral_view', 'disposisi_masuk_model');
        $this->load->model('sipas/surat_view', 'surat_model');
        $this->load->model('sipas/staf_view', 'staf_model');

        $this->set_fields(array(
            array('name'=>'disposisi_masuk_id'),
            array('name'=>'disposisi_masuk_model'),
            array('name'=>'disposisi_masuk_model_sub'),
            array('name'=>'disposisi_masuk_aksi'),
            array('name'=>'disposisi_masuk_staf'),
            array('name'=>'disposisi_masuk_profil'),
            array('name'=>'disposisi_masuk_disposisi'),
            array('name'=>'disposisi_masuk_status'),
            array('name'=>'disposisi_masuk_pesan'),
            array('name'=>'disposisi_id'),
            array('name'=>'disposisi_israhasia'),
            array('name'=>'disposisi_model'),
            array('name'=>'disposisi_model_sub'),
            array('name'=>'disposisi_nomor'),
            array('name'=>'disposisi_staf'),
            array('name'=>'disposisi_profil'),
            array('name'=>'disposisi_induk'),
            array('name'=>'disposisi_tgl'),
            array('name'=>'disposisi_surat'),
            array('name'=>'disposisi_pesan'),
            array('name'=>'disposisi_masuk_penerima_id'),
            array('name'=>'disposisi_masuk_penerima_nama'),
            array('name'=>'disposisi_masuk_penerima_unit_nama'),
            array('name'=>'disposisi_masuk_penerima_jabatan_nama'),
            array('name'=>'jabatan_penerima_id'),
            array('name'=>'jabatan_penerima_nama'),
            array('name'=>'jabatan_penerima_unit_id'),
            array('name'=>'jabatan_penerima_unit_nama'),
            array('name'=>'disposisi_masuk_iscabut'),
            array('name'=>'disposisi_masuk_aksi'),
            array('name'=>'disposisi_masuk_aksi_tgl'),
            array('name'=>'disposisi_masuk_pesan'),
            array('name'=>'disposisi_masuk_cabut_tgl'),
            array('name'=>'disposisi_pengirim_id'),
            array('name'=>'disposisi_pengirim_nama'),
            array('name'=>'disposisi_pengirim_unit'),
            array('name'=>'disposisi_pengirim_unit_nama'),
            array('name'=>'disposisi_pengirim_jabatan'),
            array('name'=>'disposisi_pengirim_jabatan_nama'),
            array('name'=>'disposisi_pelaku_id'),
            array('name'=>'disposisi_pelaku_nama'),
            array('name'=>'disposisi_pelaku_unit_nama'),
            array('name'=>'disposisi_pelaku_jabatan_nama'),
            array('name'=>'surat_agenda'),
            array('name'=>'surat_agenda_sub'),
            array('name'=>'surat_nomor'),
            array('name'=>'surat_perihal'),
            array('name'=>'surat_pengirim'),
            array('name'=>'surat_tanggal'),
            array('name'=>'aksi_nama'),
            array('name'=>'perintah_nama')
        ), true);
    }

    // just an alias of getTreeEkspedisi
    function tree(){
        return call_user_func_array(array($this, 'getTreeEkspedisi'), func_get_args());
    }
    // end aliasing
    
    function getTreeEkspedisi($mail_id=null){
        $data = array(
            $this->field_meta=>array(),
            $this->field_text=>$this->value_root,
            $this->field_children=>array()
        );

        $data[$this->field_children] = $this->getEkspedisiPengirim($mail_id, null);
        $data[$this->field_meta] = $this->getEkspedisiMetainfo($mail_id);

        return $data;
    }

    function getRootInfo($mail_id){
        $suratModel = $this->surat_model;
        $record = $suratModel->read($mail_id);

        $data = array(
            'surat_properti_pembuat_nama' => $record['surat_properti_pembuat_nama'],
            'surat_properti_pembuat_unit_nama' => $record['surat_properti_pembuat_unit_nama']
        );
        
        return $data;
    }

    function getEkspedisiPengirim($mail_id, $parent = null){
        $pegawaiModel = $this->staf_model;
        $suratModel = $this->surat_model;
        $disModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $root = array();
        $records = $disModel->find(array(
            'disposisi_surat'=>$mail_id,
            'disposisi_induk'=>$parent),
            false,
            false,
            true,
            array('disposisi_tgl'=>'asc')
            // 'IFNULL(disposisi_iscabut, 0) = 0'=>null
        );

        foreach($records as $row){
            $pengirim = $pegawaiModel->read($row['disposisi_staf']);

            $ekspedisi_penerima_recs = array();

            $penerima_recs = $disPenModel->find(array(
                'disposisi_masuk_disposisi'=>$row['disposisi_id'],
            ));

            foreach($penerima_recs as $penerima_row){
                $disposisi_recs = $this->getEkspedisiPengirim($mail_id, $penerima_row['disposisi_masuk_id']);
                
                // these important for work with ExtJs
                $ekspedisi_penerima_recs[] = array(
                    'expanded' => !empty($disposisi_recs),
                    'leaf' => empty($disposisi_recs),
                    'iconCls' => 'x-tree-icon-noicon',
                    'disposisi_masuk' => true,
                    'disposisi_masuk_id' => $penerima_row['disposisi_masuk_id'],
                    'disposisi_masuk_status' => $penerima_row['disposisi_masuk_status'],
                    'disposisi_masuk_record' => $penerima_row,
                    $this->field_children => empty($disposisi_recs) ? null : $disposisi_recs,
                );
            }

            //add detail pengirim
            $row['disposisi_pengirim_nama'] = $pengirim['staf_nama'];
            $row['disposisi_pengirim_unitkerja'] = $pengirim['unit_nama'];
            $row['disposisi_pengirim_jabatan'] = $pengirim['jabatan_nama'];

            $surat = $suratModel->find(array('surat_id'=>$row['disposisi_surat']));

            // these important for work with ExtJs            
            $root[] = array(
                'expanded' => !empty($ekspedisi_penerima_recs),
                'leaf' => empty($ekspedisi_penerima_recs),
                'iconCls' => 'x-tree-icon-noicon',
                'disposisi' => true,
                'disposisi_id' => $row['disposisi_id'],
                'disposisi_record' => $row,
                'surat_properti_pembuat_id' => $surat[0]['surat_properti_pembuat_id'],
                'surat_properti_pembuat_jabatan_nama' => $surat[0]['surat_properti_pembuat_jabatan_nama'],
                'surat_properti_pembuat_nama' => $surat[0]['surat_properti_pembuat_nama'],
                'surat_properti_buat_tgl' => $surat[0]['surat_properti_buat_tgl'],
                $this->field_children => empty($ekspedisi_penerima_recs) ? null : $ekspedisi_penerima_recs,
            );
        }

        return $root;
    }

    function getEkspedisiPenerima($disposisi_id = null, $mail_id = null){ // mail_id is just for tracing, instead of new query
        $disModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $data = array();

        $records = $disPenModel->find(array(
            'disposisi_masuk_disposisi'=>$disposisi_id,
        ));

        foreach($records as $row){
            $children = $this->getEkspedisiPengirim($mail_id, $row['disposisi_masuk_id']);
            
            // these important for work with ExtJs
            $ekspedisi = array(
                'expanded' => !empty($children),
                'leaf' => empty($children),
                'iconCls' => 'x-tree-icon-noicon',
                'disposisi_masuk' => true,
                'disposisi_masuk_id' => $row['disposisi_masuk_id'],
                'disposisi_masuk_record' => $row,
                $this->field_children => empty($children) ? null : $children,
            );
            
            $data[] = $ekspedisi;
        }
        return $data;
    }
 
    function getEkspedisiMetainfo($mail_id = null){
        $disModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $data = array();

        $data['count'] = $disPenModel->exist(array('disposisi_surat'=>$mail_id), true);
        $data['startdate'] = $disPenModel->min('disposisi_tgl', array('disposisi_surat'=>$mail_id));
        $data['enddate'] = $disPenModel->max('disposisi_tgl', array('disposisi_surat'=>$mail_id));

        return $data;
    }


    // trace is for tracing up the child node too root
    function trace(){
        return call_user_func_array(array($this, 'getTraceEkspedisi'), func_get_args());
    }

    function getTraceEkspedisi($id = null){
        $disModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $data = array(
            $this->field_text=>$this->value_root, 
            $this->field_children=>array()
        );

        $data[$this->field_children] = $this->traceEkspedisi($id, null);

        return $data;
    }

    // return itself record if has no parent
    // return record of parent if has parent
    // so return will always be a record
    // 
    // in case the tree should organized as duoble record tree (disposisi, disposisi_masuk)
    // record will always return a disposisi
    // disposisi and its child are treat as single tree node
    // 
    function traceEkspedisi($id = null, $children = null) { // id is always read as disposisi_masuk
        $disModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $root = $children; // default root node

        // find disposisi_masuk record
        $disposisi_masuk_record = $disPenModel->read($id);

        // find disposisi record
        if($disposisi_masuk_record){
            $ekspedisi_penerima_rec = array(
                'disposisi_masuk' => true,
                'disposisi_masuk_id' => $disposisi_masuk_record['disposisi_masuk_id'],
                'iconCls' => "x-tree-icon-noicon",
                // 'expanded' => !empty($children), // error on ext render when expanded=true
                'leaf' => empty($children),
                'disposisi_masuk_record'=> $disposisi_masuk_record,
                'children'=> empty($children) ? null : array($children)
            );

            $disposisi_record = $disModel->read($disposisi_masuk_record['disposisi_masuk_disposisi']);

            if($disposisi_record){
                $ekspedisi_disposisi_rec = array(
                    'disposisi' => true,
                    'disposisi_id' => $disposisi_record['disposisi_id'],
                    'iconCls' => "x-tree-icon-noicon",
                    // 'expanded' => !empty($ekspedisi_penerima_rec), // error on ext render when expanded=true
                    'leaf' => empty($ekspedisi_penerima_rec),
                    'disposisi_record'=> $disposisi_record,
                    $this->field_children => empty($ekspedisi_penerima_rec) ? null : array($ekspedisi_penerima_rec)
                );

                // do the recursif before goes deep
                $root = $this->traceEkspedisi($disposisi_record['disposisi_induk'], $ekspedisi_disposisi_rec);
            }
        }
        return $root;
    }

    function linier(){
        return call_user_func_array(array($this, 'getLinierEkspedisi'), func_get_args());
    }

    function getLinierEkspedisi($id = null, $parent = null){   

        $data['success'] = true;
        $data['data'] = $this->linierEkspedisi($id, $parent);
        // set last penerima for the record //
        $lastrecord = end($data['data']);
        $lastrecord['isPenerima'] = true; // isPenerima set false at linierEkspedisi //
        $lastrecord['disposisi_induk'] = null; // set null for applying penerima to tpl //
        // array_push($data['data'], $lastrecord);

        return $data;
    }

    function linierEkspedisi($idAsli = null, $parent = null){
        $disModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;
        $stafModel = $this->staf_model;

        $root = array();
        $id_dispo = array_filter(explode('/',$parent));
        foreach ($id_dispo as $key => $id) {
            $disposisi_masuk_record = $disPenModel->read($id);
            $disposisi_masuk_record['penerima_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$disposisi_masuk_record['disposisi_masuk_staf'];
            $disposisi_masuk_record['pengirim_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$disposisi_masuk_record['disposisi_staf'];
            $disposisi_masuk_record['isPenerima'] = false; // for parsing last penerima in client

            if($idAsli == $disposisi_masuk_record['disposisi_masuk_id']){
                $disposisi_masuk_record['end'] = true;
            }else{
                $disposisi_masuk_record['end'] = false;
            }
            array_push($root, $disposisi_masuk_record);
        }

        if(!empty($root)) return $root;
    }
}