<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_rating_view extends Base_model {

    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'v_r_surat_rating_view',
                'primary'=>'surat_ulasan_id',
                'fields'=> array(
                    array('name'=>'surat_ulasan_id',             	'view'=>true),
                    array('name'=>'surat_ulasan_komentar',        	'view'=>true),
                    array('name'=>'surat_ulasan_nilai',           	'view'=>true),
                    array('name'=>'surat_ulasan_tgl',           	'view'=>true),
                    array('name'=>'surat_ulasan_surat',             'view'=>true),
                    array('name'=>'surat_ulasan_tgl_view',        	'view'=>true),
                    array('name'=>'surat_ulasan_staf',          	'view'=>true),
                    array('name'=>'surat_ulasan_ulasan',          	'view'=>true),
                    array('name'=>'penerima_surat_id',		       	'view'=>true),
                    array('name'=>'penerima_surat_tgl',     		'view'=>true),
                    array('name'=>'penerima_surat_tgl_view',  		'view'=>true),
                    array('name'=>'penerima_surat_agenda',     		'view'=>true),
                    array('name'=>'penerima_surat_nomor',         	'view'=>true),
                    array('name'=>'penerima_surat_perihal',     	'view'=>true),
                    array('name'=>'penerima_unit_id',       		'view'=>true),
                    array('name'=>'penerima_unit_nama',             'view'=>true),
                    array('name'=>'penerima_unit_kode',             'view'=>true),
                    array('name'=>'penerima_unit_isaktif',          'view'=>true),
                    array('name'=>'penerima_staf_nama',     		'view'=>true),
					array('name'=>'pengirim_surat_id',		       	'view'=>true),
					array('name'=>'pengirim_surat_tgl',     		'view'=>true),
					array('name'=>'pengirim_surat_tgl_view',   		'view'=>true),
					array('name'=>'pengirim_surat_agenda',     		'view'=>true),
					array('name'=>'pengirim_surat_nomor',         	'view'=>true),
					array('name'=>'pengirim_surat_perihal',     	'view'=>true),
					array('name'=>'pengirim_unit_id',       		'view'=>true),
                    array('name'=>'pengirim_unit_nama',             'view'=>true),
                    array('name'=>'pengirim_unit_kode',             'view'=>true),
					array('name'=>'pengirim_unit_isaktif',    		'view'=>true)
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}