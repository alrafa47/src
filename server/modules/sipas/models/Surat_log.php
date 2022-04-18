<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat_log extends Base_model {
    /*  
    1 buat
    2 simpan draf
    3 simpan dan kirim
    4 kirim dan setujui
    5 setuju/revisi
    6 berinomor
    7 distribusi
    8 selesai
    9 ekspedisi
    10 ubah Surat lewat koreksi
    11 atur lokasi
    12 perpanjang masa aktif
    13 atur korepondensi
    14 membalas Surat
    15 transfer Surat
    16 hapus
    17 rating
    18 diterima
    19 ditolak
    20 surat dibatalkan (batal nomor)
    21 surat disalin/ dipindahkan
    22 dimusnahkan
    23 arsipkan
    24 batal distribusi
    25 kirim berkas
    26 tolak berkas
    //petikan
    27 petikan setuju/revisi
    28 petikan ubah suruat lewat koreksi
    //others
    29 simpan
    30 simpan dan distribusikan
    */
    function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'surat_log',
                'primary'=>'surat_log_id',
                'fields'=> array(
                    array('name' => 'surat_log_id', 'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name' => 'surat_log_staf'),
                    array('name' => 'surat_log_profil'),
                    array('name' => 'surat_log_surat'),
                    array('name' => 'surat_log_arsip'),
                    array('name' => 'surat_log_ekspedisi'),
                    array('name' => 'surat_log_petugas'),
                    array('name' => 'surat_log_setuju'),
                    array('name' => 'surat_log_tgl'),
                    array('name' => 'surat_log_tipe'),
                    array('name' => 'surat_log_catatan'),
                    array('name' => 'surat_log_data'),
                    array('name' => 'surat_log_properti')
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    function created($peg = null, $data = array()){
        $model = $this;

        if($data['surat_selesai_tgl']){
            $data['surat_log_staf'] = $peg;
            $data['surat_log_tipe'] = 8;
            $data['surat_log_surat'] = $data['surat_id'];
            $data['surat_log_setuju'] = null;
            $data['surat_log_tgl'] = $data['surat_selesai_tgl'];

            $op2 = $model->insert($data);
        }

        if($data['surat_setuju'] == 2){
            $data['surat_log_staf'] = $peg;
            $data['surat_log_tipe'] = 5;
            $data['surat_log_surat'] = $data['surat_id'];
            $data['surat_log_setuju'] = $data['surat_setuju'];
            $data['surat_log_tgl'] = $data['surat_setuju_tgl'];

            $op = $model->insert($data);
        }

        if($data['surat_distribusi_tgl']){
            $data['surat_log_staf'] = $peg;
            $data['surat_log_tipe'] = 7;
            $data['surat_log_surat'] = $data['surat_id'];
            $data['surat_log_setuju'] = null;
            $data['surat_log_tgl'] = $data['surat_distribusi_tgl'];

            $op2 = $model->insert($data);
        }
        return $op['data'];
    }

}