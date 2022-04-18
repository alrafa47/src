<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Disposisi_masuk_log extends Base_model {

    const BERKAS_REQUEST = 1;
    const BERKAS_APPROVE = 2;
    const BERKAS_CANCEL = 3;
    const BERKAS_DECLINE = 4;
    
    /*  
    1 baca
    2 berkas terima
    3 disposisi
    4 cabut
    5 aksi (respon)
    6 status (setuju/tolak)
    7 asisten mengirim pengingat
    8 pimpinan melihat pesan pengingat
    9 permintaan berkas fisik
        Meminta berkas fisik
        Mengirim berkas fisik
        Membatalkan permintaan berkas fisik
        Menolak permintaan berkas fisik
    */
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'disposisi_masuk_log',
                'primary'=>'disposisi_masuk_log_id',
                'fields'=> array(
                    array('name' => 'disposisi_masuk_log_id', 'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name' => 'disposisi_masuk_log_staf'),
                    array('name' => 'disposisi_masuk_log_profil'),
                    array('name' => 'disposisi_masuk_log_masuk'),
                    array('name' => 'disposisi_masuk_log_status'),
                    array('name' => 'disposisi_masuk_log_berkas_status'),
                    array('name' => 'disposisi_masuk_log_aksi'),
                    array('name' => 'disposisi_masuk_log_pesan'),
                    array('name' => 'disposisi_masuk_log_tipe'),
                    array('name' => 'disposisi_masuk_log_tgl')
                ),
                'limit'=>null,
            ),
            'auto_id'=> true
        ));
    }
}