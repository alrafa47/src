<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->load->model('sipas/koreksi_penerima_view');

class Sipas_model_Ekspedisi_koreksi extends Sipas_model_Koreksi_penerima_view{

    public $icon        = 'fam user';
    public $icon_parent = 'fam user';
    public $icon_leaf   = 'fam user';
    
    protected $field_parent = 'koreksi_induk';
    protected $field_koreksi = 'koreksi_surat';
    protected $field_text = 'text';
    protected $field_meta = 'metainfo';
    protected $field_children = 'children';
    protected $field_total = 'total';
    protected $field_root = 'root';
    protected $field_root_value = '.';
    protected $field_leaf = 'leaf';

    protected $_count_temp = 0;
    
    public $value_root = 'Surat Masuk';

    function __construct()
    {
        parent::__construct();
        $CI = get_instance();
        $this->load->model('sipas/koreksi_view', 'koreksi_model');
        $this->load->model('sipas/koreksi_penerima_view', 'koreksi_penerima_model');
        $this->load->model('sipas/surat_view', 'surat_model');
        $this->load->model('sipas/staf_view', 'staf_model');

        $this->set_fields(array(
            array('name'=>'koreksi_penerima_id'),
            array('name'=>'koreksi_penerima_aksi'),
            array('name'=>'koreksi_penerima_staf'),
            array('name'=>'koreksi_penerima_koreksi'),
            array('name'=>'koreksi_penerima_status'),
            array('name'=>'koreksi_penerima_keterangan'),
            array('name'=>'koreksi_penerima_komentar'),
            array('name'=>'koreksi_id'),
            array('name'=>'koreksi_kode'),
            array('name'=>'koreksi_pengirim'),
            array('name'=>'koreksi_induk'),
            array('name'=>'koreksi_tanggal'),
            array('name'=>'koreksi_surat'),
            array('name'=>'koreksi_pesan'),
            array('name'=>'koreksi_perintah_text'),
            array('name'=>'koreksi_aksi_text'),
            array('name'=>'penerima_id'),
            array('name'=>'penerima_user'),
            array('name'=>'penerima_nip'),
            array('name'=>'penerima_nama'),
            array('name'=>'penerima_kelamin'),
            array('name'=>'penerima_telp'),
            array('name'=>'penerima_ponsel'),
            array('name'=>'penerima_email'),
            array('name'=>'penerima_unitkerja'),
            array('name'=>'penerima_unitkerja_nama'),
            array('name'=>'penerima_jabatan'),
            array('name'=>'penerima_jabatan_nama'),
            array('name'=>'pengirim_id'),
            array('name'=>'pengirim_user'),
            array('name'=>'pengirim_nip'),
            array('name'=>'pengirim_nama'),
            array('name'=>'pengirim_kelamin'),
            array('name'=>'pengirim_telp'),
            array('name'=>'pengirim_ponsel'),
            array('name'=>'pengirim_email'),
            array('name'=>'pengirim_unitkerja'),
            array('name'=>'pengirim_unitkerja_nama'),
            array('name'=>'pengirim_jabatan_nama'),
            array('name'=>'surat_agenda'),
            array('name'=>'surat_agenda_sub'),
            array('name'=>'surat_nomor'),
            array('name'=>'surat_perihal'),
            array('name'=>'surat_pengirim'),
            array('name'=>'surat_tanggal')
        ), true);
    }

    // just an alias of getTreeEkspedisi
    function tree()
    {
        return call_user_func_array(array($this, 'getTreeEkspedisi'), func_get_args());
    }
    // end aliasing
    
    function getTreeEkspedisi($mail_id=null)
    {
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
            'pembuat_nama' => $record['pembuat_nama'],
            'pembuat_unitkerja' => $record['pembuat_unitkerja_nama']
        );
        
        return $data;
    }

    function getEkspedisiPengirim($mail_id, $parent = null)
    {
        $pegawaiModel = $this->staf_model;
        $disModel = $this->koreksi_model;
        $disPenModel = $this->koreksi_penerima_model;

        $root = array();
        $records = $disModel->find(array(
            'koreksi_surat'=>$mail_id,
            'koreksi_induk'=>$parent,
            'IFNULL(koreksi_retract, 0) = 0'=>null
        ));
        // var_dump($mail_id);
        
        foreach($records as $row)
        {
            $pengirim = $pegawaiModel->read($row['koreksi_pengirim']);

            $ekspedisi_penerima_recs = array();

            $penerima_recs = $disPenModel->find(array(
                'koreksi_penerima_koreksi'=>$row['koreksi_id'],
            ));

            foreach($penerima_recs as $penerima_row)
            {
                $koreksi_recs = $this->getEkspedisiPengirim($mail_id, $penerima_row['koreksi_penerima_id']);
                
                // these important for work with ExtJs
                $ekspedisi_penerima_recs[] = array(
                    'expanded' => !empty($koreksi_recs),
                    'leaf' => empty($koreksi_recs),
                    'iconCls' => 'fam user',
                    'koreksi_penerima' => true,
                    'koreksi_penerima_id' => $penerima_row['koreksi_penerima_id'],
                    'koreksi_penerima_komentar' => $penerima_row['koreksi_penerima_komentar'],
                    'koreksi_penerima_status' => $penerima_row['koreksi_penerima_status'],
                    'koreksi_penerima_record' => $penerima_row,
                    $this->field_children => empty($koreksi_recs) ? null : $koreksi_recs,
                );
            }

            //add detail pengirim
            $row['koreksi_pengirim_nama'] = $pengirim['staf_nama'];
            $row['koreksi_pengirim_unitkerja'] = $pengirim['unitkerja_nama'];
            $row['koreksi_pengirim_jabatan'] = $pengirim['jabatan_nama'];
            
            // these important for work with ExtJs            
            $root[] = array(
                'expanded' => !empty($ekspedisi_penerima_recs),
                'leaf' => empty($ekspedisi_penerima_recs),
                'iconCls' => 'fam page_white_go',
                'koreksi' => true,
                'koreksi_id' => $row['koreksi_id'],
                'koreksi_record' => $row,
                // 'koreksi_pengirim_record' => $pengirim,
                'surat_record' => $this->getRootInfo($row['koreksi_surat']),
                $this->field_children => empty($ekspedisi_penerima_recs) ? null : $ekspedisi_penerima_recs,
            );

            print_r($row);
        }
        // echo "<pre>";
        // var_dump($root);
        return $root;
    }

    function getEkspedisiPenerima($koreksi_id = null, $mail_id = null)
    { // mail_id is just for tracing, instead of new query
        $disModel = $this->koreksi_model;
        $disPenModel = $this->koreksi_penerima_model;

        $data = array();

        $records = $disPenModel->find(array(
            'koreksi_penerima_koreksi'=>$koreksi_id,
        ));

        foreach($records as $row)
        {
            $children = $this->getEkspedisiPengirim($mail_id, $row['koreksi_penerima_id']);
            
            // these important for work with ExtJs
            $ekspedisi = array(
                'expanded' => !empty($children),
                'leaf' => empty($children),
                'iconCls' => 'fam user',
                'koreksi_penerima' => true,
                'koreksi_penerima_id' => $row['koreksi_penerima_id'],
                'koreksi_penerima_record' => $row,
                $this->field_children => empty($children) ? null : $children,
            );
            
            $data[] = $ekspedisi;
        }
        return $data;
    }
 
    function getEkspedisiMetainfo($mail_id = null)
    {
        $disModel = $this->koreksi_model;
        $disPenModel = $this->koreksi_penerima_model;

        $data = array();

        $data['count'] = $disPenModel->exist(array('koreksi_surat'=>$mail_id), true);
        $data['startdate'] = $disPenModel->min('koreksi_tanggal', array('koreksi_surat'=>$mail_id));
        $data['enddate'] = $disPenModel->max('koreksi_tanggal', array('koreksi_surat'=>$mail_id));

        return $data;
    }


    // trace is for tracing up the child node too root
    function trace()
    {
        return call_user_func_array(array($this, 'getTraceEkspedisi'), func_get_args());
    }

    function getTraceEkspedisi($id = null)
    {
        $disModel = $this->koreksi_model;
        $disPenModel = $this->koreksi_penerima_model;

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
    // in case the tree should organized as duoble record tree (koreksi, koreksi_penerima)
    // record will always return a koreksi
    // koreksi and its child are treat as single tree node
    // 
    function traceEkspedisi($id = null, $children = null) // id is always read as koreksi_penerima
    {
        $disModel = $this->koreksi_model;
        $disPenModel = $this->koreksi_penerima_model;

        $root = $children; // default root node

        // find koreksi_penerima record
        $koreksi_penerima_record = $disPenModel->read($id);

        // find koreksi record
        if($koreksi_penerima_record)
        {
            $ekspedisi_penerima_rec = array(
                'koreksi_penerima' => true,
                'koreksi_penerima_id' => $koreksi_penerima_record['koreksi_penerima_id'],
                'iconCls' => "fam user",
                // 'expanded' => !empty($children), // error on ext render when expanded=true
                'leaf' => empty($children),
                'koreksi_penerima_record'=> $koreksi_penerima_record,
                'children'=> empty($children) ? null : array($children)
            );


            $koreksi_record = $disModel->read($koreksi_penerima_record['koreksi_penerima_koreksi']);

            if($koreksi_record)
            {
                $ekspedisi_koreksi_rec = array(
                    'koreksi' => true,
                    'koreksi_id' => $koreksi_record['koreksi_id'],
                    'iconCls' => "fam page_white_go",
                    // 'expanded' => !empty($ekspedisi_penerima_rec), // error on ext render when expanded=true
                    'leaf' => empty($ekspedisi_penerima_rec),
                    'koreksi_record'=> $koreksi_record,
                    $this->field_children => empty($ekspedisi_penerima_rec) ? null : array($ekspedisi_penerima_rec)
                );

                // do the recursif before goes deep
                $root = $this->traceEkspedisi($koreksi_record['koreksi_induk'], $ekspedisi_koreksi_rec);

            }

        }

        return $root;
    }

}