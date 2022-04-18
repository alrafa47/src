<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_stack extends Base_model {

    const MODEL_PENERIMA  = 0;
    const MODEL_PENYETUJU = 1;
    const MODEL_PETIKAN   = 2;

    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'surat_stack',
                'primary'=>'surat_stack_id',
                'fields'=> array(
                    array('name'=>'surat_stack_id',             'display'=>'Id','update'=>false,'unique'=>true,'notnull'=>true),
                    array('name'=>'surat_stack_surat',          'display'=>'Surat','notnull'=>true),
                    array('name'=>'surat_stack_staf',           'display'=>'Nama'),
                    array('name'=>'surat_stack_profil',         'display'=>'Nama'),
                    array('name'=>'surat_stack_jabatan',        'display'=>'Jabatan'),
                    array('name'=>'surat_stack_pelaku',         'display'=>'Nama Pelaku'),
                    array('name'=>'surat_stack_pelaku_profil',  'display'=>'Nama Pelaku'),
                    array('name'=>'surat_stack_pelaku_jabatan', 'display'=>'Jabatan Pelaku'),
                    array('name'=>'surat_stack_model',          'display'=>'Model'),
                    array('name'=>'surat_stack_level',          'display'=>'Level'),
                    array('name'=>'surat_stack_kirim',          'display'=>'Kirim'),
                    array('name'=>'surat_stack_komentar',       'display'=>'Komentar'),
                    array('name'=>'surat_stack_istembusan',     'display'=>'Is Tembusan'),
                    array('name'=>'surat_stack_terima_tgl',     'display'=>'Terima Tanggal'),
                    array('name'=>'surat_stack_status',         'display'=>'Status'),
                    array('name'=>'surat_stack_status_tgl',     'display'=>'Tanggal Status'),
                    array('name'=>'surat_stack_status_ttd',     'display'=>'Tanda Tangan'),
                    array('name'=>'surat_stack_baca_tgl',       'display'=>'Tanggal Baca'),
                    array('name'=>'surat_stack_isberkas',       'display'=>'Berkas'),
                    array('name'=>'surat_stack_berkasterima_tgl','display'=>'Berkas Terima Tgl'),
                    array('name'=>'surat_stack_properti',       'display'=>'Properti')
                ),
                'limit'=>null,
            ),
            'auto_id' => true
        ));
    }
}