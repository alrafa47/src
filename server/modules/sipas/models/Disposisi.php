<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Disposisi extends Base_model {

    const MODEL_DISPOSISI = 0;
    const MODEL_KOREKSI = 1;

    const MODEL_SUB_KOLEKTIF = 0;
    const MODEL_SUB_PETIKAN = 1;

    static $field_code      = 'disposisi_nomor';
    static $field_cabut_tgl = 'disposisi_cabut_tgl';
    static $field_induk     = 'disposisi_induk';
    static $field_staf      = 'disposisi_staf';
    
    function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'disposisi',
                'view'=>'v_disposisi',
                'primary'=>'disposisi_id',
                'fields'=> array(
                    array(
                        'name'=>'disposisi_id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'disposisi_staf',
                        'display'=>'Pengirim'
                    ),
                    array(
                        'name'=>'disposisi_profil',
                        'display'=>'Pengirim Profil'
                    ),
                    array(
                        'name'=>'disposisi_pelaku',
                        'display'=>'Pengirim'
                    ),
                    array(
                        'name'=>'disposisi_pelaku_profil',
                        'display'=>'Pengirim Profil'
                    ),
                    array(
                        'name'=>'disposisi_pulih_staf',
                        'display'=>'Pengirim'
                    ),
                    array(
                        'name'=>'disposisi_surat',
                        'display'=>'Surat'
                    ),
                    array(
                        'name'=>'disposisi_perintah',
                        'display'=>'Perintah Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_induk',
                        'display'=>'Induk Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_model',
                        'display'=>'Surat'
                    ),
                    array(
                        'name'=>'disposisi_model_sub',
                        'display'=>'Surat'
                    ),
                    array(
                        'name'=>'disposisi_nomor',
                        'display'=>'Surat'
                    ),
                    array(
                        'name'=>'disposisi_tgl',
                        'display'=>'Tanggal Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_pesan',
                        'display'=>'Pesan Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_istunggal',
                        'display'=>'Cabut Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_israhasia',
                        'display'=>'Cabut Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_baca_tgl',
                        'display'=>'Cabut Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_cabut_tgl',
                        'display'=>'Cabut Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_pulih_tgl',
                        'display'=>'Cabut Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_cabut_induk',
                        'display'=>'Cabut Disposisi'
                    ),
                    array(
                        'name'=>'disposisi_parent_path',
                        'display'=>'parent path'
                    ),
                    array(
                        'name'=>'disposisi_properti',
                        'display'=>'Is disposisi'
                    ),
                    array(
                        'name'=>'disposisi_useprioritas',
                        'display'=>'Use Prioritas'
                    ),
                    array(
                        'name'=>'disposisi_prioritas_tgl',
                        'display'=>'Tgl Prioritas'
                    )
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    function insert($id = null, $data = null, $fn = null){
        if(is_null($data)){
            $data = $id;
            $id = null;
        }
        $data[$this::$field_code] = $this->generate_code();
        return parent::insert($id, $data, $fn);
    }

    function generate_code($index = false){
        return parent::generate_code(array(
            'pattern'       =>'DIS.{date}.{#}',
            'date_format'   =>'Ym',
            'field'         => $this::$field_code,
            'index_format'  =>'00000',
            'index_mask'    => $index
        ));
    }
}