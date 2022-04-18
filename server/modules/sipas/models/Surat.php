<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sipas_model_Surat extends Base_model {

    /*Model Surat*/
    const MODEL_MASUK   = 1;
    const MODEL_KELUAR  = 2;
    const MODEL_IMASUK  = 3;
    const MODEL_IKELUAR = 4;
    const MODEL_BEBAS   = 5;
    const MODEL_KEPUTUSAN   = 6;

    /*Model Sub Surat Keputusan*/
    const MODEL_SUB_KOLEKTIF   = 2;
    const MODEL_SUB_PERORANGAN = 1;

    /*Surat Status Setuju*/
    const SETUJU_INIT   = 0;
    const SETUJU_PROSES = 1;
    const SETUJU_SETUJU = 2;
    const SETUJU_REVISI = 3;
    const SETUJU_TOLAK  = 4;

    /*Surat Status Distribusi*/
    const DISTRIBUSI_INIT = 0;
    const DISTRIBUSI_DISTRIBUSI = 1;

    /*Surat Status Selesai*/
    const SELESAI_INIT = 0;
    const SELESAI_SELESAI = 1;

    /*Surat Status Terima*/
    const TERIMA_INIT = 0;
    const TERIMA_TERIMA = 1;

    /*Surat Status Rahasia*/
    const RAHASIA_INIT = 0;
    const RAHASIA_RAHASIA = 1;

    /*Surat Status Value (used for report)*/
    const SETUJU_INIT_DISPLAY     = 'Draft';
    const SETUJU_PROSES_DISPLAY   = 'Dalam Proses';
    const SETUJU_SETUJU_DISPLAY   = 'Disetujui';
    const SETUJU_REVISI_DISPLAY   = 'Revisi';
    const SETUJU_TOLAK_DISPLAY    = 'Ditolak';

    static $field_id            = 'surat_id';
    static $field_unit          = 'surat_unit';
    static $field_code          = 'surat_nomor';
    static $field_re            = 'surat_perihal';
    static $field_create_date   = 'surat_properti_buat_tgl';
    static $field_date          = 'surat_tanggal';
    static $field_approval_date   = 'surat_setuju_tgl';

    static $field_approval_lookup   = 'surat_setuju';
    static $field_distribusi_lookup = 'surat_isdistribusi';
    static $field_selesai_lookup    = 'surat_isselesai';
    
    static $field_useretensi    = 'surat_useretensi';
    static $field_retensi_tgl   = 'surat_retensi_tgl';
    static $field_register      = 'surat_registrasi';

    static $field_approvalinfo          = 'approvalInfo';
    static $field_approvalinfo_init     = 'init';
    static $field_approvalinfo_request  = 'request';
    static $field_approvalinfo_revision = 'revision';
    static $field_approvalinfo_approved = 'approved';
    static $field_approvalinfo_today    = 'today';
    static $field_approvalinfo_retensi  = 'retensi';
    static $field_approvalinfo_total    = 'total';
    
    function __construct(){
        parent::__construct(array(
            'table' =>array(
                'name'=>'surat',
                'primary'=>'surat_id',
                'fields'=> array(
                    array('name'=>'surat_id',                  'update'=>false, 'unique'=>true, 'notnull'=>true),
                    array('name'=>'surat_arsip',               'display'=>'Arsip Surat'),
                    array('name'=>'surat_model',               'display'=>'Model Surat'),
                    array('name'=>'surat_model_sub',           'display'=>'Model Sub Surat'),
                    array('name'=>'surat_registrasi',          'display'=>'Registrasi'),
                    array('name'=>'surat_nomor',               'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_tgl',           'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_staf',          'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_profil',        'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_format',        'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_booking',       'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_otomatis',      'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_urut',          'display'=>'Nomor Surat'),
                    array('name'=>'surat_nomor_backdate',      'display'=>'Nomor Surat'),
                    array('name'=>'surat_isbackdate',          'display'=>'Surat Backdate'),
                    array('name'=>'surat_isbooking',           'display'=>'Surat Booking'),
                    array('name'=>'surat_agenda',              'display'=>'Agenda Surat'),
                    array('name'=>'surat_agenda_sub',          'display'=>'Agenda Surat Sub'),
                    array('name'=>'surat_tanggal',             'display'=>'Tanggal Surat'),
                    array('name'=>'surat_berlaku_tgl',         'display'=>'Tanggal Surat'),
                    array('name'=>'surat_perihal',             'display'=>'Perihal Surat'),
                    array('name'=>'surat_pengirim',            'display'=>'Pengirim Surat'),
                    array('name'=>'surat_tujuan',              'display'=>'Tujuan Surat'),
                    array('name'=>'surat_keterangan',          'display'=>'Keterangan Surat'),
                    array('name'=>'surat_kepada',              'display'=>'Detail Tujuan Surat'),
                    array('name'=>'surat_alamat',              'display'=>'Alamat Surat'),
                    array('name'=>'surat_lampiran',            'display'=>'Lampiran Surat'),
                    array('name'=>'surat_lampiran_sub',        'display'=>'Lampiran Surat'),
                    array('name'=>'surat_usesetuju',           'display'=>'Ringkasan Surat'),
                    array('name'=>'surat_ringkasan',           'display'=>'Ringkasan Surat'),
                    array('name'=>'surat_catatan',             'display'=>'Catatan Surat'),
                    array('name'=>'surat_unit',                'display'=>'Unit Penerima'),
                    array('name'=>'surat_unit_source',         'display'=>'Unit Penerima Source'),
                    array('name'=>'surat_setuju_isurut',       'display'=>'Setuju Urut'),
                    array('name'=>'surat_setuju_komentar',     'display'=>'Setuju Urut'),
                    array('name'=>'surat_setuju',              'display'=>'Setuju'),
                    array('name'=>'surat_setuju_staf',         'display'=>'Penyetujuan Pegawai'),
                    array('name'=>'surat_setuju_profil',       'display'=>'Penyetujuan Pegawai'),
                    array('name'=>'surat_setuju_tgl',          'display'=>'Setuju Tanggal'),
                    array('name'=>'surat_setuju_akhir_staf',   'display'=>'Penyetuju Akhir'),
                    array('name'=>'surat_petikan_setuju',      'display'=>'Petikan'),
                    array('name'=>'surat_petikan_akhir_staf',  'display'=>'Petikan Akhir'),
                    array('name'=>'surat_petikan_setuju_isurut','display'=>'Petikan Setuju Urut'),
                    array('name'=>'surat_distribusi_staf',     'display'=>'Distribusi Pegawai'),
                    array('name'=>'surat_distribusi_profil',   'display'=>'Distribusi Pegawai'),
                    array('name'=>'surat_distribusi_tgl',      'display'=>'Distribusi Tanggal'),
                    array('name'=>'surat_distribusi_otomatis', 'display'=>'Distribusi Otomatis'),
                    array('name'=>'surat_arah_staf',           'display'=>'Arah Pegawai'),
                    array('name'=>'surat_arah_profil',         'display'=>'Arah Pegawai'),
                    array('name'=>'surat_arah_tgl',            'display'=>'Arah Tanggal'),
                    array('name'=>'surat_selesai_staf',        'display'=>'Selesai Pegawai'),
                    array('name'=>'surat_selesai_profil',      'display'=>'Selesai Pegawai'),
                    array('name'=>'surat_selesai_tgl',         'display'=>'Selesai Tanggal'),
                    array('name'=>'surat_terima_staf',         'display'=>'Terima Pegawai'),
                    array('name'=>'surat_korespondensi',       'display'=>'Surat Korespondensi'),
                    array('name'=>'surat_korespondensi_surat', 'display'=>'Korespondensi'),
                    array('name'=>'surat_useretensi',          'display'=>'Use Retensi'),
                    array('name'=>'surat_retensi_tgl',         'display'=>'Retensi'),
                    array('name'=>'surat_inaktif_tgl',         'display'=>'Inaktif'),
                    array('name'=>'surat_prioritas',           'display'=>'prioritas'),
                    array('name'=>'surat_prioritas_tgl',       'display'=>'prioritas Tanggal'),
                    array('name'=>'surat_tmt',                 'display'=>'Terhitung Mulai Tanggal'),
                    array('name'=>'surat_kelas',               'display'=>'kelas'),
                    array('name'=>'surat_lokasi',              'display'=>'Lokasi'),
                    array('name'=>'surat_lokasi_sub',          'display'=>'Sub Lokasi'),
                    array('name'=>'surat_jenis',               'display'=>'jenis'),
                    array('name'=>'surat_jenis_sub',           'display'=>'sub jenis'),
                    array('name'=>'surat_media',               'display'=>'media'),
                    array('name'=>'surat_sifat',               'display'=>'sifat'),
                    array('name'=>'surat_usebalas',            'display'=>'usebalas'),
                    array('name'=>'surat_useberkas',           'display'=>'useberkas'),
                    array('name'=>'surat_israhasia',           'display'=>'Sifat Rahasia'),
                    array('name'=>'surat_properti',            'display'=>'Properti'),
                    array('name'=>'surat_ekspedisi',           'display'=>'ekspedisi'),
                    array('name'=>'surat_ekspedisi_tgl',       'display'=>'ekspedisi'),
                    array('name'=>'surat_ekspedisi_staf',      'display'=>'ekspedisi'),
                    array('name'=>'surat_ekspedisi_profil',    'display'=>'ekspedisi'),
                    array('name'=>'surat_buat_tgl',            'display'=>'buat_tgl'),
                    array('name'=>'surat_buat_staf',           'display'=>'buat_staf'),
                    array('name'=>'surat_buat_profil',         'display'=>'buat_profil'),
                    array('name'=>'surat_ishapus',             'display'=>'ishapus'),
                    array('name'=>'surat_nomor_isbatal',       'display'=>'Batal nomor'),
                    array('name'=>'surat_nomor_batal_tgl',     'display'=>'Batal tgl'),
                    array('name'=>'surat_nomor_batal_staf',    'display'=>'Batal staf'),
                    array('name'=>'surat_nomor_batal_profil',  'display'=>'Batal staf'),
                    array('name'=>'surat_nomor_issalin',       'display'=>'Salin nomor'),
                    array('name'=>'surat_ismusnah',            'display'=>'Musnah Surat'),
                    array('name'=>'surat_musnah_tgl',          'display'=>'Musnah tgl'),
                    array('name'=>'surat_musnah_staf',         'display'=>'Musnah staf'),
                    array('name'=>'surat_musnah_profil',       'display'=>'Musnah staf'),
                    array('name'=>'surat_isarsip',             'display'=>'arsip Surat'),
                    array('name'=>'surat_arsip_tgl',           'display'=>'arsip tgl'),
                    array('name'=>'surat_arsip_staf',          'display'=>'arsip staf'),
                    array('name'=>'surat_arsip_profil',        'display'=>'arsip staf'),
                    array('name'=>'surat_distribusi_iscabut',   'display'=>'cabut distribusi Surat'),
                    array('name'=>'surat_distribusi_cabut_tgl', 'display'=>'cabut distribusi tgl'),
                    array('name'=>'surat_distribusi_cabut_staf','display'=>'cabut distribusi staf'),
                    array('name'=>'surat_distribusi_cabut_profil','display'=>'cabut distribusi profil'),
                    array('name'=>'surat_distribusi_cabut_pesan','display'=>'cabut distribusi pesan'),
                ),
                'limit'=>null,
            ),
            'auto_id'=>true
        ));
    }

    function getAgenda($surat_model = null, $surat_unit = null){
        // var_dump($surat_model);
        $agenda = $this->max('surat_agenda', array(
            'surat_agenda <>' => null,
            'surat_model' => $surat_model,
            'surat_unit' => $surat_unit,
            'YEAR(surat_properti_buat_tgl) = "'.date('Y').'"' => null)) + 1;

        return $agenda;
    }

    function compiledDataWithDokumen($id = null){
        $CI = get_instance();
        $this->load->library('parser');

        $model_account = $CI->model('sipas/account', true);
        $model_surat = $CI->model('sipas/surat', true);
        $model_pengaturan = $CI->model('sipas/pengaturan', true);
        $model_dokumen = $CI->model('sipas/dokumen', true);
        
        $logged_profile = $model_account->get_profile();

        $suratView = $model_surat->read($id);

        $findDokumen = $model_dokumen->find(array(
            'dokumen_arsip'     => $suratView['surat_arsip'],
            'dokumen_ext'       => '.sdoc',
            'dokumen_isactive'  => 1
        ));

        $parsing = $model_pengaturan->getCompiledDataTemplate($id);
        if($parsing['surat_setuju'] == 2){           
            foreach ($findDokumen as $dokumens) {
    		  $data = $this->parser->parse_string(base64_decode($dokumens['dokumen_file']), $parsing);

    		  $model_dokumen->update($dokumens['dokumen_id'], array('dokumen_file' => base64_encode($data)));
            }
        }else{
            unset($parsing['tanggal_persetujuan']);

            foreach ($findDokumen as $dokumens) {
                $data = $this->parser->parse_string(base64_decode($dokumens['dokumen_file']), $parsing);
                $model_dokumen->update($dokumens['dokumen_id'], array('dokumen_file' => base64_encode($data)));
            }
        }
	}

    function qrcode($id = null){
        $this->load->library('ciqrcode');
        $data = base_url().'server.php/sipas/dokumen/printSdoc?id='.$id;
        
        $params['data']         = $data;
        $params['cacheable']    = true;
        $params['quality']      = true;
        $params['size']         = '3'; 
        $params['white']        = array(117,117,117); 

        ob_start();
            $this->ciqrcode->generate($params);
            $out = base64_encode( ob_get_contents() );
        ob_end_clean();

        return "data:image/png;base64,".$out;
    }

    function tglIndonesia($date){
       $trim_date   = trim($date);
       $format_date  = str_replace(
            array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'), 
            array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'), $trim_date);
       
       return $format_date;
   }
}