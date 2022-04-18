<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_ulasan extends Base_Model {
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'surat_ulasan',
                'primary'=>'surat_ulasan_id',
                'fields'=> array(
                    array(
                        'name'=>'surat_ulasan_id',
                        'display'=>'Id',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'surat_ulasan_surat',
                        'display'=>'Surat Ulasan Surat',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'surat_ulasan_ulasan',
                        'display'=>'Surat Ulasan Ulasan'
                    ),
                    array(
                        'name'=>'surat_ulasan_staf',
                        'display'=>'Surat Ulasan Staf',
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'surat_ulasan_tgl',
                        'display'=>'Surat Ulasan Tanggal'
                    ),
                    array(
                        'name'=>'surat_ulasan_nilai',
                        'display'=>'Surat Ulasan Nilai'
                    ),
                    array(
                        'name'=>'surat_ulasan_komentar',
                        'display'=>'Surat Ulasan Komentar'
                    ),
                    array(
                        'name'=>'surat_ulasan_baca_tgl',
                        'display'=>'Surat Ulasan Komentar'
                    ),
                    array(
                        'name'=>'surat_ulasan_baca_staf',
                        'display'=>'Surat Ulasan Komentar'
                    )

                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }
}