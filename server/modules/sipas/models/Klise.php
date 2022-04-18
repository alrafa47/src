<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Klise extends Base_model {
    
    public $field_template = 'klise_isi';
    public $report_template_legend = array(

        // Sebelum
        '[%kode_klasifikasi%]'        => 'Atribut - Kode Klasifikasi',
        '[%nama_klasifikasi%]'        => 'Atribut - Nama Klasifikasi',
        '[%kode_jenis%]'              => 'Atribut - Kode Jenis',
        '[%nama_jenis%]'              => 'Atribut - Nama Jenis',
        '[%kode_lokasi%]'             => 'Atribut - Kode Lokasi',
        '[%nama_lokasi%]'             => 'Atribut - Nama Lokasi',
        '[%kode_media%]'              => 'Atribut - Kode Media',
        '[%nama_media%]'              => 'Atribut - Nama Media',
        '[%kode_prioritas%]'          => 'Atribut - Kode Prioritas',
        '[%nama_prioritas%]'          => 'Atribut - Nama Prioritas',
        '[%kode_sifat%]'              => 'Atribut - Kode Sifat',
        '[%nama_sifat%]'              => 'Atribut - Nama Sifat',

        '[%nama_penyetuju_terakhir%]'             => 'Penyetuju - Nama Staf',
        '[%nip_penyetuju_terakhir%]'              => 'Penyetuju - NIP Staf',
        '[%jabatan_penyetuju_terakhir%]'          => 'Penyetuju - Nama Jabatan',

        '[%surat_registrasi%]'       =>'Surat - Nomor Registrasi Surat',
        '[%surat_perihal%]'          =>'Surat - Perihal Surat',
        '[%surat_tujuan%]'           =>'Surat - Kepada',
        '[%surat_pengirim%]'         =>'Surat - Dari',
        '[%tembusan%]'               =>'Surat - Tembusan',
        '[%surat_tanggal%]'          =>'Surat - Tanggal Surat',
        '[%surat_lampiran%]'         =>'Surat - Lampiran',
        '[%surat_tujuan%]'           =>'Surat - Tujuan Surat',
        '[%surat_kepada%]'           =>'Surat - Kepada Surat',

        '[%surat_alamat%]'       => 'Surat - Alamat Surat',
        '[%surat_lampiran_sub%]' => 'Surat - Sub Lampiran',
        '[%surat_nomor%]'        => 'Surat - Nomor Surat',

        '[%header_umum%]'        => 'Header - Umum',
        '[%header_pelaporan%]'   => 'Header - Pelaporan',
        '[%header1%]'            => 'Header - Lain 1',
        '[%header2%]'            => 'Header - Lain 2',
        '[%header3%]'            => 'Header - Lain 3',
 
        // Sesudah
        '{nip_penyetuju_pelaku}'        => 'Penyetuju Pelaku - NIP Staf',
        '{nama_penyetuju_pelaku}'       => 'Penyetuju Pelaku - Nama Staf',
        '{jabatan_penyetuju_pelaku}'    => 'Penyetuju Pelaku - Nama Jabatan',
	
        '{nama_penyetuju_terakhir}'         => 'Penyetuju - NIP Staf',
        '{nip_penyetuju_terakhir}'          => 'Penyetuju - Nama Staf',
        '{jabatan_penyetuju_terakhir}'      => 'Penyetuju - Nama Jabatan',
        '{tanda_tangan}'       => 'Tanda Tangan - Staf',
        '{ttd_digital}'        => 'Tanda Tangan - Digital',
        '{qrcode}'             => 'Tanda Tangan - Barcode',
        '{qrcode_text}'        => 'Tanda Tangan - Pesan Barcode',

        '{kode_klasifikasi}'   => 'Atribut - Kode Klasifikasi',
        '{nama_klasifikasi}'   => 'Atribut - Nama Klasifikasi',
        '{kode_jenis}'         => 'Atribut - Kode Jenis',
        '{nama_jenis}'         => 'Atribut - Nama Jenis',
        '{kode_prioritas}'     => 'Atribut - Kode Prioritas',
        '{nama_prioritas}'     => 'Atribut - Nama Prioritas',
        '{kode_sifat}'         => 'Atribut - Kode Sifat',
        '{nama_sifat}'         => 'Atribut - Nama Sifat',

        '{surat_registrasi}'    => 'Surat - Nomor Registrasi Surat',
        '{surat_perihal}'       => 'Surat - Perihal Surat',
        '{surat_tujuan}'        => 'Surat - Kepada',
        '{surat_tanggal}'       => 'Surat - Tanggal Surat',
        '{surat_lampiran}'      => 'Surat - Lampiran',

        '{surat_kepada}'        => 'Surat - Kepada',
        '{surat_pengirim}'      => 'Surat - Pengirim',
        '{tembusan}'            => 'Surat - Tembusan',
        '{surat_alamat}'        => 'Surat - Alamat Surat',
        '{surat_nomor}'         => 'Surat - Nomor Surat',
        '{surat_tujuan}'        => 'Surat - Tujuan Surat',
        '{surat_kepada}'        => 'Surat - Kepada Surat',

        '{tanggal_persetujuan}'     => 'Surat - Tanggal Persetujuan',
        '{header_umum}'             => 'Header - Umum',
        '{header_pelaporan}'        => 'Header - Pelaporan',
        '{header1}'                 => 'Header - Lain 1',
        '{header2}'                 => 'Header - Lain 2',
        '{header3}'                 => 'Header - Lain 3',
        
        '{nip_petikan_terakhir}'     => 'Petikan - NIP Staf',
        '{nama_petikan_terakhir}'    => 'Petikan - Nama Staf',
        '{jabatan_petikan_terakhir}' => 'Petikan - Nama Jabatan',
        '{ttd_petikan_terakhir}'     => 'Tanda Tangan - Staf Petikan',
        
        '[%terhitung_mulai_tgl%]'       => 'Terhitung Mulai Tanggal',
        '[%penerimask_pertama%]'        => 'Penerima SK - Penerima Pertama',
        '[%penerimask_unit_pertama%]'   => 'Penerima SK - Unit Staf Pertama',
        '{terhitung_mulai_tgl}'         => 'Terhitung Mulai Tanggal',
        '{penerimask_pertama}'          => 'Penerima SK - Penerima Pertama',
        '{penerimask_nama}'             => 'Penerima SK - Nama Staf',
        '{penerimask_nip}'              => 'Penerima SK - NIP Staf',
        '{penerimask_unit}'             => 'Penerima SK - Unit Staf',
        '{penerimask_jabatan_lama}'     => 'Penerima SK - Jabatan Lama',
        '{penerimask_jabatan_baru}'     => 'Penerima SK - Jabatan Baru',
        '{penerimask_golongan_lama}'    => 'Penerima SK - Golongan Lama',
        '{penerimask_golongan_baru}'    => 'Penerima SK - Golongan Baru',
        '{penerimask_sgt_lama}'         => 'Penerima SK - SGT Lama',
        '{penerimask_sgt_baru}'         => 'Penerima SK - SGT Baru',
        '{penerimask_gaji_pokok_lama}'  => 'Penerima SK - Gaji Pokok Lama',
        '{penerimask_gaji_pokok_baru}'  => 'Penerima SK - Gaji Pokok Baru',
        '{penerimask_tmt}'              => 'Penerima SK - Terhitung Mulai Tgl Lama',
        '{jenjang_jabatan_lama}'        => 'Penerima SK - Jenjang Jabatan Lama',
        '{jenjang_jabatan_baru}'        => 'Penerima SK - Jenjang Jabatan Baru',
        '{penerimask_ket}'              => 'Penerima SK - Keterangan',
        '{penerimask_jumlah}'           => 'Jumlah Penerima SK',
        
    );
    
    public function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'klise',
                'primary'=>'klise_id',
                'fields'=> array(
                    array(
                        'name'=>'klise_id',
                        'display'=>'Id',
                        'update'=>false,
                        'unique'=>true,
                        'notnull'=>true
                    ),
                    array(
                        'name'=>'klise_nama',
                        'display'=>'Nama'
                    ),
                    array(
                        'name'=>'klise_kelompok',
                        'display'=>'Kelompok',
                        'preparer'=>function($value){
                            $newval = trim($value);
                            $newval = preg_replace('!\s+!', '_', $newval);
                            $newval = strtolower($newval);
                            return $newval;
                        },
                        'convert'=>function($value){
                            $newval = preg_replace('!\_+!', ' ', $value);
                            $newval = ucwords($newval);
                            return $newval;  
                        }
                    ),
                    array(
                        'name'=>'klise_isi',
                        'display'=>'Isi',
                        'convert'=>function($value){
                            return htmlspecialchars_decode($value);
                        }
                    ),
                    array(
                        'name'=>'klise_ispetikan',
                        'display'=>'Status ispetikan',
                        'secure'=>false
                    ),
                    array(
                        'name'=>'klise_isaktif',
                        'display'=>'Status',
                        'secure'=>false
                    ),
                    array(
                        'name'=>'klise_ishapus',
                        'display'=>'Hapus',
                        'secure'=>false
                    ),
                    array(
                        'name'=>'klise_properti',
                        'display'=>'Properti',
                        'secure'=>false
                    ),
                ),
                'limit'=>null,
            ),
            'auto_id'=> true
        ));
    }
}