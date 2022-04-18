<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->model('sipas/dokumen_view');

class Sipas_model_Dokumen_log extends Sipas_model_Dokumen_view{

    public $icon        = 'fam time';
    public $icon_parent = 'fam time';
    public $icon_leaf   = 'fam time';
    
    protected $field_parent = 'dokumen_induk';
    protected $field_disposisi = 'disposisi_surat';
    protected $field_text = 'text';
    protected $field_meta = 'metainfo';
    protected $field_children = 'children';
    protected $field_total = 'total';
    protected $field_root = 'root';
    protected $field_root_value = '.';
    protected $field_leaf = 'leaf';

    protected $_count_temp = 0;
    
    public $value_root = 'Dokumen';

    function __construct()
    {
        parent::__construct();
        $CI = get_instance();
        $this->load->model('sipas/dokumen', 'dokumen_model');
        $this->load->model('sipas/dokumen_view', 'dokumen_view_model');
        $this->load->model('sipas/surat_view', 'surat_model');
        $this->load->model('sipas/staf_view', 'staf_model');
    }

    // just an alias of getTreeDokumen
    function tree()
    {
        return call_user_func_array(array($this, 'getTreeDokumen'), func_get_args());
    }
    // end aliasing
    
    function getTreeDokumen($dok_id=null)
    {
        $data = array(
            $this->field_meta=>array(),
            $this->field_text=>$this->value_root,
            $this->field_children=>array()
        );

        $data[$this->field_children] = $this->getDokumen($dok_id, null);
        // $data[$this->field_meta] = $this->getEkspedisiMetainfo($dok_id);

        return $data;
    }

    function getRootInfo($dok_id){
        $suratModel = $this->surat_model;
        $record = $suratModel->read($dok_id);

        $data = array(
            'surat_properti_pembuat_nama' => $record['surat_properti_pembuat_nama'],
            'surat_properti_pembuat_unit_nama' => $record['surat_properti_pembuat_unit_nama']
        );
        
        return $data;
    }

    function getDokumen($dok_id, $parent = null)
    {
        $pegawaiModel = $this->staf_model;
        $suratModel = $this->surat_model;
        $dokModel = $this->dokumen_view_model;

        $root = array();
        $records = $dokModel->find(array(
            'dokumen_id'=>$dok_id
            // 'dokumen_previous'=>$parent
        ));

        foreach($records as $row)
        {
            $ekspedisi_dokumen_recs = array();
            $dokumen_recs = $dokModel->find(array(
                'dokumen_previous'=>$row['dokumen_id'],
            ));
            foreach($dokumen_recs as $previous_row)
            {
                $dokumen_recs = $this->getDokumen($dok_id, $previous_row['dokumen_id']);
                
                // these important for work with ExtJs
                $ekspedisi_dokumen_recs[] = array(
                    'expanded' => !empty($dokumen_recs),
                    'leaf' => empty($dokumen_recs),
                    'iconCls' => 'fam folder',
                    'dokumen_previous' => true,
                    'dokumen_previous_id' => $previous_row['dokumen_id'],
                    'dokumen_previous_record' => $previous_row,
                    $this->field_children => empty($dokumen_recs) ? null : $dokumen_recs,
                );
            }

            // these important for work with ExtJs            
            $root[] = array(
                'expanded' => !empty($ekspedisi_dokumen_recs),
                'leaf' => empty($ekspedisi_dokumen_recs),
                'iconCls' => 'fam folder',
                'dokumen' => true,
                'dokumen_id' => $row['dokumen_id'],
                'dokumen_record' => $row,
                $this->field_children => empty($ekspedisi_dokumen_recs) ? null : $ekspedisi_dokumen_recs,
            );
        }

        return $root;
    }

    function getEkspedisiPenerima($disposisi_id = null, $dok_id = null)
    { // dok_id is just for tracing, instead of new query
        $dokModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $data = array();

        $records = $disPenModel->find(array(
            'disposisi_masuk_disposisi'=>$disposisi_id,
        ));

        foreach($records as $row)
        {
            $children = $this->getDokumen($dok_id, $row['disposisi_masuk_id']);
            
            // these important for work with ExtJs
            $ekspedisi = array(
                'expanded' => !empty($children),
                'leaf' => empty($children),
                'iconCls' => 'fam user',
                'disposisi_masuk' => true,
                'disposisi_masuk_id' => $row['disposisi_masuk_id'],
                'disposisi_masuk_record' => $row,
                $this->field_children => empty($children) ? null : $children,
            );
            
            $data[] = $ekspedisi;
        }
        return $data;
    }
 
    function getEkspedisiMetainfo($dok_id = null)
    {
        $dokModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $data = array();

        $data['count'] = $disPenModel->exist(array('disposisi_surat'=>$dok_id), true);
        $data['startdate'] = $disPenModel->min('disposisi_tgl', array('disposisi_surat'=>$dok_id));
        $data['enddate'] = $disPenModel->max('disposisi_tgl', array('disposisi_surat'=>$dok_id));

        return $data;
    }


    // trace is for tracing up the child node too root
    function trace()
    {
        return call_user_func_array(array($this, 'getTraceDokumen'), func_get_args());
    }

    function getTraceDokumen($id = null)
    {
        $dokModel = $this->dokumen_view_model;

        $rec = $dokModel->read(array(
            'dokumen_id'=>$id)
        );
        $record = $dokModel->find(array(
            'dokumen_induk'=>$id), null, null, null, array('dokumen_buat_tgl'=>'DESC')
        );
        
        if(!empty($record)){
            // foreach ($rec as $key => $value) {
                // array_push($value, $rec);
                array_push($record, $rec);
            // }
            return $record;
        }else{
            return array($rec);
        }
    }

    // return itself record if has no parent
    // return record of parent if has parent
    // so return will always be a record
    // 
    // in case the tree should organized as duoble record tree (disposisi, disposisi_masuk)
    // record will always return a disposisi
    // disposisi and its child are treat as single tree node
    // 
    function traceDokumen($id = null, $children = null) // id is always read as disposisi_masuk
    {
        $dokModel = $this->disposisi_model;
        $disPenModel = $this->disposisi_masuk_model;

        $root = $children; // default root node

        // find disposisi_masuk record
        $disposisi_masuk_record = $disPenModel->read($id);

        // find disposisi record
        if($disposisi_masuk_record)
        {
            $ekspedisi_penerima_rec = array(
                'disposisi_masuk' => true,
                'disposisi_masuk_id' => $disposisi_masuk_record['disposisi_masuk_id'],
                'iconCls' => "fam user",
                // 'expanded' => !empty($children), // error on ext render when expanded=true
                'leaf' => empty($children),
                'disposisi_masuk_record'=> $disposisi_masuk_record,
                'children'=> empty($children) ? null : array($children)
            );

            $disposisi_record = $dokModel->read($disposisi_masuk_record['disposisi_masuk_disposisi']);

            if($disposisi_record)
            {
                $ekspedisi_disposisi_rec = array(
                    'disposisi' => true,
                    'disposisi_id' => $disposisi_record['disposisi_id'],
                    'iconCls' => "fam page_white_go",
                    // 'expanded' => !empty($ekspedisi_penerima_rec), // error on ext render when expanded=true
                    'leaf' => empty($ekspedisi_penerima_rec),
                    'disposisi_record'=> $disposisi_record,
                    $this->field_children => empty($ekspedisi_penerima_rec) ? null : array($ekspedisi_penerima_rec)
                );

                // do the recursif before goes deep
                $root = $this->traceDokumen($disposisi_record['disposisi_induk'], $ekspedisi_disposisi_rec);
            }
        }
        return $root;
    }
}