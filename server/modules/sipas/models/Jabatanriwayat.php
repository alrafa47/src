<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jabatanriwayat extends Base_model {
    public function __construct(){
        parent::__construct();
            $model = array(
            'table' =>array(
                'name'=>'jabatanriwayat',
                'primary'=>'jabatanriwayat_id',
                'fields'=> array(
                    array('name'=>'jabatanriwayat_id', 'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name'=>'jabatanriwayat_staf', 'display'=>'Pegawai Jabatan Riwayat'),
                    array('name'=>'jabatanriwayat_jabatan', 'display'=>'Jabatan'),
                    array('name'=>'jabatanriwayat_tahun_mulai', 'display'=>'Tahun Mulai Jabatan'),
                    array('name'=>'jabatanriwayat_tahun_selesai', 'display'=>'Tahun Akhir Jabatan'),
                    array('name'=>'jabatanriwayat_keterangan', 'display'=>'Keterangan'),
                )
                'limit'=>null,
            )
        );
        $this->set_model($model);
     }//tutup jabatanriwayat
}