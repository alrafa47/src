<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_penerimask extends Base_model {

    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'surat_penerimask',
                'primary'=>'surat_penerimask_id',
                'fields'=> array(
                    array('name'=>'surat_penerimask_id',                    'display'=>'Id','update'=>false,'unique'=>true,'notnull'=>true),
                    array('name'=>'surat_penerimask_staf',                  'display'=>'Id Staf'),
                    array('name'=>'surat_penerimask_profil',                'display'=>'Profil Staf'),
                    array('name'=>'surat_penerimask_pelaku',                'display'=>'Id Pelaku'),
                    array('name'=>'surat_penerimask_pelaku_profil',         'display'=>'Profil Pelaku'),
                    array('name'=>'surat_penerimask_surat',                 'display'=>'Surat'),
                    array('name'=>'surat_penerimask_level',                 'display'=>'Level'),
                    array('name'=>'surat_penerimask_terima_tgl',            'display'=>'Tanggal Terima'),
                    array('name'=>'surat_penerimask_status',                'display'=>'Status'),
                    array('name'=>'surat_penerimask_status_tgl',            'display'=>'Tanggal Status'),
                    array('name'=>'surat_penerimask_baca_tgl',              'display'=>'Tanggal Baca'),
                    array('name'=>'surat_penerimask_properti',              'display'=>'Properti'),
                    array('name'=>'surat_penerimask_gollama',               'display'=>'Golongan Lama'),
                    array('name'=>'surat_penerimask_golbaru',               'display'=>'Golongan Baru'),
                    array('name'=>'surat_penerimask_sglama',                'display'=>'Skala Gaji Tahunan Lama'),
                    array('name'=>'surat_penerimask_sgbaru',                'display'=>'Skala Gaji Tahunan Baru'),
                    array('name'=>'surat_penerimask_gplama',                'display'=>'Gaji Pokok Lama'),
                    array('name'=>'surat_penerimask_gpbaru',                'display'=>'Gaji Pokok Baru'),
                    array('name'=>'surat_penerimask_tmt',                   'display'=>'Terhitung Mulai Tgl Lama'),
                    array('name'=>'surat_penerimask_jabatan_lama',          'display'=>'Jabatan Lama'),
                    array('name'=>'surat_penerimask_jabatan_baru',          'display'=>'Jabatan Baru'),
                    array('name'=>'surat_penerimask_jenjang_jabatan_lama',  'display'=>'Jenjang Jabatan Lama'),
                    array('name'=>'surat_penerimask_jenjang_jabatan_baru',  'display'=>'Jenjang Jabatan Baru'),
                    array('name'=>'surat_penerimask_keterangan',            'display'=>'Keterangan')
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}