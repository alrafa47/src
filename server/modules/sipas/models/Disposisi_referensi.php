<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Disposisi_referensi extends Sipas_model_Disposisi_masuk_view {

    public $icon = 'fam email';
    public $icon_parent = 'fam email';
    public $icon_leaf = 'fam email';
    
    public $field_text = 'text';
    public $field_meta = 'metainfo';
    public $field_children = 'children';
    
    public $value_root = 'Surat Masuk';

    function __construct(){
        parent::__construct();
        $this->set_fields(array(
            array('name'=>'disposisi_masuk_id'),
            array('name'=>'disposisi_masuk_aksi'),
            array('name'=>'disposisi_masuk_staf'),
            array('name'=>'disposisi_masuk_profil'),
            array('name'=>'disposisi_masuk_disposisi'),
            array('name'=>'disposisi_masuk_status'),
            array('name'=>'disposisi_masuk_pesan'),
            array('name'=>'disposisi_masuk_istembusan'),
            array('name'=>'disposisi_id'),
            // array('name'=>'disposisi_kode'),
            array('name'=>'disposisi_staf'),
            array('name'=>'disposisi_profil'),
            array('name'=>'disposisi_induk'),
            array('name'=>'disposisi_tgl'),
            array('name'=>'disposisi_surat'),
            array('name'=>'disposisi_pesan'),
            array('name'=>'aksi_id'),
            array('name'=>'aksi_kode'),
            array('name'=>'perintah_id'),
            array('name'=>'disposisi_masuk_penerima_id'),
            array('name'=>'disposisi_masuk_penerima_nama'),
            array('name'=>'disposisi_masuk_penerima_unit_nama'),
            array('name'=>'disposisi_masuk_penerima_jabatan_nama'),
            // array('name'=>'penerima_id'),
            // array('name'=>'penerima_user'),
            // array('name'=>'penerima_nip'),
            // array('name'=>'penerima_nama'),
            // array('name'=>'penerima_kelamin'),
            // array('name'=>'penerima_telp'),
            // array('name'=>'penerima_ponsel'),
            // array('name'=>'penerima_email'),
            // array('name'=>'penerima_unitkerja'),
            // array('name'=>'penerima_unitkerja_nama'),
            // array('name'=>'penerima_jabatan'),
            // array('name'=>'penerima_jabatan_nama'),
            array('name'=>'disposisi_pengirim_id'),
            array('name'=>'disposisi_pengirim_nama'),
            array('name'=>'disposisi_pengirim_unit'),
            array('name'=>'disposisi_pengirim_unit_nama'),
            array('name'=>'disposisi_pengirim_jabatan'),
            array('name'=>'disposisi_pengirim_jabatan_nama'),
            // array('name'=>'pengirim_id'),
            // array('name'=>'pengirim_user'),
            // array('name'=>'pengirim_nip'),
            // array('name'=>'pengirim_nama'),
            // array('name'=>'pengirim_kelamin'),
            // array('name'=>'pengirim_telp'),
            // array('name'=>'pengirim_ponsel'),
            // array('name'=>'pengirim_email'),
            // array('name'=>'pengirim_unitkerja'),
            // array('name'=>'pengirim_unitkerja_nama'),
            // array('name'=>'pengirim_jabatan_nama'),
            array('name'=>'surat_agenda'),
            array('name'=>'surat_nomor'),
            array('name'=>'surat_perihal'),
            array('name'=>'surat_pengirim'),
            array('name'=>'surat_tanggal'),
        ), true);
    }

    function tree($child, $parent = null, $surat = null){
        if($child){
            return $this->getReferensi($child, $parent, $surat);
        }
    }

    function referensi($child, $parent = null, $surat = null){
        if($child){
            return $this->getReferensi($child, $parent, $surat);
        }
    }
    
    function getReferensi($child, $parent = null, $surat = null){
        $data = array(
            $this->field_meta=>array(),
            $this->field_text=>$this->value_root,
            $this->field_children=>array()
        );

        $children = $data[$this->field_children];

        $children = $this->_getReferensiChild($child, $children);
        return $data;
    }

    function _getReferensiChild($child = null, $children){
        $record = $this->read(array(
            'disposisi_masuk_id'=>$child
        ));

        if($record){
            $children[$this->field_children] = (array)$record;
            $children = $this->_getReferensiChild($record['disposisi_induk'], $children);
        }

        return $children;

        // if($record){
        //     foreach($record as $row){
        //         $row[$this->field_children] = $this->_getReferensiChild($row['disposisi_induk']);
        //         $data[] = $row;
        //     } 
        // }   

        // return $data;
    }
    
    function getEkspedisiMetainfo($mail_id=null){
        $data = array();

        $data['count'] = $this->exist(array('disposisi_surat'=>$mail_id), true);

        $data['startdate'] = $this->min('disposisi_tgl', array('disposisi_surat'=>$mail_id));

        $data['enddate'] = $this->max('disposisi_tgl', array('disposisi_surat'=>$mail_id));

        return $data;
    }

}