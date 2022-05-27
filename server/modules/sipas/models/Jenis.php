<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Jenis extends Base_Model
{
    public function __construct()
    {
        parent::__construct(array(
            'table' => array(
                'name' => 'jenis',
                'primary' => 'jenis_id',
                'fields' => array(
                    array(
                        'name' => 'jenis_id',
                        'display' => 'Id',
                        'update' => false,
                        'unique' => true,
                        'notnull' => true
                    ),
                    array(
                        'name' => 'jenis_kode',
                        'display' => 'Kode',
                        'unique' => true,
                        'notnull' => true
                    ),
                    array(
                        'name' => 'jenis_nama',
                        'display' => 'Nama',
                        'notnull' => true,
                    ),
                    array(
                        'name' => 'jenis_unit_id',
                        'display' => 'Unit',
                        'notnull' => true
                    ),
                    array(
                        'name' => 'jenis_isaktif',
                        'display' => 'Aktif'
                    ),
                    array(
                        'name' => 'jenis_tampil_sm',
                        'display' => 'Tampil'
                    ),
                    array(
                        'name' => 'jenis_tampil_sk',
                        'display' => 'Tampil'
                    ),
                    array(
                        'name' => 'jenis_tampil_si',
                        'display' => 'Tampil'
                    ),
                    array(
                        'name' => 'jenis_tampil_sik',
                        'display' => 'Tampil'
                    ),
                    array(
                        'name' => 'jenis_terpusat',
                        'display' => 'Terpusat'
                    ),
                    array(
                        'name' => 'jenis_nomor_awal',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_unit_pembuat',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_unit_penyetuju',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_jabatan_pembuat',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_jabatan_penyetuju',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_tahun',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_jenis',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_kelas',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_model',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_sifat',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_nomor_lokasi',
                        'display' => 'nomor'
                    ),
                    array(
                        'name' => 'jenis_tipe',
                        'display' => 'Tipe'
                    ),
                    array(
                        'name' => 'jenis_properti',
                        'display' => 'properti'
                    ),
                    array(
                        'name' => 'jenis_retensi',
                        'display' => 'Retensi'
                    ),
                    array(
                        'name' => 'jenis_format',
                        'display' => 'format'
                    ),
                    array(
                        'name' => 'jenis_formateks',
                        'display' => 'format'
                    ),
                    array(
                        'name' => 'jenis_formateksbackdate',
                        'display' => 'format'
                    ),
                    array(
                        'name' => 'jenis_formatint',
                        'display' => 'format'
                    ),
                    array(
                        'name' => 'jenis_formatintbackdate',
                        'display' => 'format'
                    ),
                    array(
                        'name' => 'jenis_digitint',
                        'display' => 'digit'
                    ),
                    array(
                        'name' => 'jenis_digiteks',
                        'display' => 'digit'
                    ),
                    array(
                        'name' => 'jenis_ishapus',
                        'display' => 'Hapus'
                    )

                ),
                'limit' => null,
            ),
            'auto_id' => true
        ));
    }

    public function get_jenis_sub()
    {
        $data = array(
            (object) ["sub_id" => "1", "sub_tipe" => "2", "sub_nama" => "SK Berkala"],
            (object) ["sub_id" => "2", "sub_tipe" => "1", "sub_nama" => "SK Golongan Reguler"],
            (object) ["sub_id" => "3", "sub_tipe" => "1", "sub_nama" => "SK Golongan Pilihan"],
            (object) ["sub_id" => "4", "sub_tipe" => "1", "sub_nama" => "SK Golongan Istimewa"],
            (object) ["sub_id" => "5", "sub_tipe" => "1", "sub_nama" => "SK Golongan Pengabdian"],
            (object) ["sub_id" => "6", "sub_tipe" => "4", "sub_nama" => "SK Pengangkatan Jabatan"],
            (object) ["sub_id" => "7", "sub_tipe" => "5", "sub_nama" => "SK Penyesuaian Jenjang Jabatan"],
            (object) ["sub_id" => "8", "sub_tipe" => "0", "sub_nama" => "SK Penugasan ke Anak Perusahaan"],
            (object) ["sub_id" => "9", "sub_tipe" => "0", "sub_nama" => "SK Koresi Jabatan"],
            (object) ["sub_id" => "10", "sub_tipe" => "0", "sub_nama" => "SK Penetapan Kembali Jabatan"],
            (object) ["sub_id" => "11", "sub_tipe" => "3", "sub_nama" => "SK Demosi"],
        );

        return $data;
    }
}

class Sipas_model_JenisView extends Sipas_model_Jenis
{
    public function __construct()
    {
        parent::__construct();
        $this->set_table('v_jenis');
    }
}
