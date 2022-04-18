<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/dokumen', true);

class Sipas_model_Dokumen_view extends Sipas_model_Dokumen { 
    
      public function __construct(){
        parent::__construct();
        $this->set_table_name('v_dokumen');
        $this->set_primary('dokumen_id');
        $this->set_fields(array(
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_arsip'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_previous'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_induk'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_file'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_preview'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_path'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_size'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_ext'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_mime'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_properti'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_prev_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_prev_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_prev_file'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_prev_preview'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_induk_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_induk_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_induk_file'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_induk_preview'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_petikan_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_petikan_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_ispetikan'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_isimport'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_induk'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_isumum'),
            array('insert'=>false, 'update'=>false, 'name'=>'arsip_properti'),

            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_buat_tgl'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_buat_staf'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_buat_profil'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_buat_pelaku'),
            array('insert'=>false, 'update'=>false, 'name'=>'dokumen_buat_pelaku_profil'),

            // array('insert'=>false, 'update'=>false, 'name'=>'properti_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_buat_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_ubah_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_hapus_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_tgl'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_pulih_staf'),
            // array('insert'=>false, 'update'=>false, 'name'=>'properti_data'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_kode'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_unit'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_jabatan'),
            array('insert'=>false, 'update'=>false, 'name'=>'properti_pembuat_jabatan_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pelaku_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'pelaku_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pelaku_unit_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'pelaku_unit_nama'),
            array('insert'=>false, 'update'=>false, 'name'=>'pelaku_jabatan_id'),
            array('insert'=>false, 'update'=>false, 'name'=>'pelaku_jabatan_nama')
        ));
    }

    function create_docs_petikan($data){
        $CI = get_instance();
        $surat_penerimask  = $CI->model('sipas/surat_penerimask_view',  true);
        $dokumen      = $CI->model('sipas/dokumen',         true);
        $properti     = $CI->model('sipas/properti',        true);
        $surat        = $CI->model('sipas/surat',           true);
        $surat_view   = $CI->model('sipas/surat_view',      true);
        $klise        = $CI->model('sipas/klise',           true);
        $pengaturan   = $CI->model('sipas/pengaturan',      true);

        /*list penerima kolektif*/
        $penerima_records = $surat_penerimask->find(array(
            'surat_penerimask_surat' => $data['surat_id']
        ), false, false, true, array('surat_penerimask_level'=>'asc'));

        $now = date('Y-m-d H:i:s');

        /* sesuaikan nama template di daftar template surat */
        $dokumen_petikan = $dokumen->find(array(
            'dokumen_arsip' => $data['surat_arsip'],
            'dokumen_ispetikan' => 1,
            'dokumen_isactive' => 1
        ));

        $penyetuju_akhir = null;
        $penyetuju_akhir_profil = null;
        if($data['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF) {
            $penyetuju_akhir = $data['petikan_akhir'];
            $penyetuju_akhir_profil = $data['petikan_akhir_profil'];
        } else {
            $penyetuju_akhir = $data['penyetuju_akhir'];
            $penyetuju_akhir_profil = $data['penyetuju_akhir_profil'];
        }

        if($dokumen_petikan) {
            foreach ($dokumen_petikan as $index => $doc) {
                $temp_isi = $doc['dokumen_file'];
    
                foreach ($penerima_records as $key => $value) {

                    $tpl = new Template(array(
                        'template'=>base64_decode($temp_isi),
                        'marker'=>array('[%','%]')
                    ));

                    $dokumen_petikan_staf = null;
                    $dokumen_petikan_unit = null;
                    if($data['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF) {
                        $dokumen_petikan_staf = $value['staf_id'];
                        $dokumen_petikan_unit = $value['unit_id'];
                    }

                    $parsing = $pengaturan->getCompiledDataTemplate($data['surat_id'], null, null, $value['staf_id']);
                    $parsing_awal = $tpl->apply($parsing);
                    $dokumen_file = $this->parser->parse_string($parsing_awal, $parsing);

                    $doc['dokumen_nama'] = str_replace(".sdoc","",$doc['dokumen_nama']);
                    $operation = $dokumen->insert(array(
                        'dokumen_arsip'     => $data['surat_arsip'],
                        'dokumen_nama'      => $doc['dokumen_nama'].' a.n '.$value['staf_nama'].'.sdoc',
                        'dokumen_file'      => base64_encode($dokumen_file),
                        'dokumen_ext'       => '.sdoc',
                        'dokumen_mime'      => '.sdoc',
                        'dokumen_buat_tgl'  => $now,
                        'dokumen_buat_staf'     => $penyetuju_akhir,
                        'dokumen_buat_profil'   => $penyetuju_akhir_profil,
                        'dokumen_petikan_staf'  => $dokumen_petikan_staf,
                        'dokumen_petikan_unit'  => $dokumen_petikan_unit,
                        'dokumen_isactive'      => true
                    ), null, function($response) use($dokumen, $properti, $data){
                        $dokumen_id = $dokumen->get_insertid();
                        $inserted_data = $dokumen->read($dokumen->get_insertid());
        
                        $op = $properti->created($data['account_id'], $inserted_data, 'dokumen', $inserted_data['dokumen_id'], $inserted_data['dokumen_nama']);
                        $dokumen->update($dokumen_id, array(
                            'dokumen_properti' => $op['properti_id']
                        ));
                    });
                }
                $dokumen->update($doc['dokumen_id'], array(
                    'dokumen_isactive' => 0
                ));
            }
        }

        $surat->update($data['surat_id'], array(
            'surat_selesai_tgl' => $now,
            'surat_selesai_staf' => $penyetuju_akhir,
            'surat_selesai_profil' => $penyetuju_akhir_profil
        ), function ($response) use ($surat_view, $data, $surat){
            if ($response[$surat->successProperty] !== true) return;
            $updated_data = $response['data'];

            $surat_view->create_imasuk($data['account_id'], $updated_data, $data['auto_distribusi_setting']);
        });
    }

    function getRomawi($v){
        switch ($v){
            case 1: 
                return "I";
                break;
            case 2:
                return "II";
                break;
            case 3:
                return "III";
                break;
            case 4:
                return "IV";
                break;
            case 5:
                return "V";
                break;
            case 6:
                return "VI";
                break;
            case 7:
                return "VII";
                break;
            case 8:
                return "VIII";
                break;
            case 9:
                return "IX";
                break;
            case 10:
                return "X";
                break;
            case 11:
                return "XI";
                break;
            case 12:
                return "XII";
                break;
        }
    }
}