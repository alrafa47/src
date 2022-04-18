<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/surat', true);

class Sipas_model_Surat_referensi_view extends Sipas_model_Surat {

      static $field_isdistribusi = 'surat_isdistribusi';
      static $field_isselesai = 'surat_isselesai';
      static $field_isterima = 'surat_isterima';

      public function __construct(){
        parent::__construct();
        $CI = get_instance();

        $this->m_surat        = $CI->model('sipas/surat', true);
        $this->m_properti     = $CI->model('sipas/properti', true);
        $this->m_surat_stack  = $CI->model('sipas/surat_stack', true);
        $this->m_account      = $CI->model('sipas/account', true);
        $this->m_disposisi    = $CI->model('sipas/disposisi', true);
        $this->m_staf_aktual  = $CI->model('sipas/staf_aktual', true);

        $this->m_disposisi_masuk              = $CI->model('sipas/disposisi_masuk', true);
        $this->m_surat_stack_disposisi_view   = $CI->model('sipas/surat_stack_disposisi_view', true);

        $this->set_table_name('v_surat_referensi');
        $this->set_primary('surat_id');
        $this->set_fields(array(
            array('name'=>'surat_id',                  'insert'=> false, 'update'=> false),
            array('name'=>'surat_arsip',               'insert'=> false, 'update'=> false),
            array('name'=>'surat_model',               'insert'=> false, 'update'=> false),
            array('name'=>'surat_registrasi',          'insert'=> false, 'update'=> false),
            array('name'=>'surat_nomor',               'insert'=> false, 'update'=> false),
            array('name'=>'surat_isnomor',             'insert'=> false, 'update'=> false),
            array('name'=>'surat_agenda',              'insert'=> false, 'update'=> false),
            array('name'=>'surat_agenda_sub',          'insert'=> false, 'update'=> false),
            array('name'=>'surat_tanggal',             'insert'=> false, 'update'=> false),
            array('name'=>'surat_perihal',             'insert'=> false, 'update'=> false),
            array('name'=>'surat_pengirim',            'insert'=> false, 'update'=> false),
            array('name'=>'surat_tujuan',              'insert'=> false, 'update'=> false),
            array('name'=>'surat_kepada',              'insert'=> false, 'update'=> false),
            array('name'=>'surat_lampiran',            'insert'=> false, 'update'=> false),
            array('name'=>'surat_lampiran_sub',        'insert'=> false, 'update'=> false),
            array('name'=>'surat_usesetuju',           'insert'=> false, 'update'=> false),
            array('name'=>'surat_ringkasan',           'insert'=> false, 'update'=> false),
            array('name'=>'surat_catatan',             'insert'=> false, 'update'=> false),
            array('name'=>'surat_unit',                'insert'=> false, 'update'=> false),
            array('name'=>'surat_setuju_isurut',       'insert'=> false, 'update'=> false),
            array('name'=>'surat_setuju_komentar',     'insert'=> false, 'update'=> false),
            array('name'=>'surat_setuju',              'insert'=> false, 'update'=> false),
            array('name'=>'surat_setuju_staf',         'insert'=> false, 'update'=> false),
            array('name'=>'surat_setuju_tgl',          'insert'=> false, 'update'=> false),
            array('name'=>'surat_setuju_total',        'insert'=> false, 'update'=> false),
            array('name'=>'surat_setuju_setuju',       'insert'=> false, 'update'=> false),
            array('name'=>'surat_distribusi_staf',     'insert'=> false, 'update'=> false),
            array('name'=>'surat_distribusi_tgl',      'insert'=> false, 'update'=> false),
            array('name'=>'surat_distribusi_otomatis', 'insert'=> false, 'update'=> false),
            array('name'=>'surat_selesai_staf',        'insert'=> false, 'update'=> false),
            array('name'=>'surat_selesai_tgl',         'insert'=> false, 'update'=> false),
            array('name'=>'surat_terima_staf',         'insert'=> false, 'update'=> false),
            array('name'=>'surat_arah_staf',           'insert'=> false, 'update'=> false),
            array('name'=>'surat_arah_tgl',            'insert'=> false, 'update'=> false),
            array('name'=>'surat_korespondensi',       'insert'=> false, 'update'=> false),
            array('name'=>'surat_korespondensi_surat', 'insert'=> false, 'update'=> false),
            array('name'=>'surat_useretensi',          'insert'=> false, 'update'=> false),
            array('name'=>'surat_retensi_tgl',         'insert'=> false, 'update'=> false),
            array('name'=>'surat_prioritas',           'insert'=> false, 'update'=> false),
            array('name'=>'surat_prioritas_tgl',       'insert'=> false, 'update'=> false),
            array('name'=>'surat_kelas',               'insert'=> false, 'update'=> false),
            array('name'=>'surat_lokasi',              'insert'=> false, 'update'=> false),
            array('name'=>'surat_lokasi_sub',          'insert'=> false, 'update'=> false),
            array('name'=>'surat_jenis',               'insert'=> false, 'update'=> false),
            array('name'=>'surat_media',               'insert'=> false, 'update'=> false),
            array('name'=>'surat_sifat',               'insert'=> false, 'update'=> false),
            array('name'=>'surat_usebalas',            'insert'=> false, 'update'=> false),
            array('name'=>'surat_israhasia',           'insert'=> false, 'update'=> false),
            array('name'=>'surat_properti',            'insert'=> false, 'update'=> false),
            array('name'=>'surat_ekspedisi',           'insert'=> false, 'update'=> false),

            array('name'=>'surat_induk_id',           'insert'=> false, 'update'=> false),
            array('name'=>'surat_induk_nomor',           'insert'=> false, 'update'=> false),

            array('name'=>'surat_isdistribusi',        'insert'=>false, 'update'=>false),
            array('name'=>'surat_isselesai',           'insert'=>false, 'update'=>false),
            array('name'=>'surat_isterima',            'insert'=>false, 'update'=>false),
            array('name'=>'surat_isarah',              'insert'=>false, 'update'=>false),

            array('name'=>'distributor_id',            'insert'=>false, 'update'=>false),
            array('name'=>'distributor_kode',          'insert'=>false, 'update'=>false),
            array('name'=>'distributor_nama',          'insert'=>false, 'update'=>false),
            array('name'=>'distributor_unit',          'insert'=>false, 'update'=>false),
            array('name'=>'distributor_unit_kode',     'insert'=>false, 'update'=>false),
            array('name'=>'distributor_unit_rubrik',   'insert'=>false, 'update'=>false),
            array('name'=>'distributor_unit_nama',     'insert'=>false, 'update'=>false),
            array('name'=>'distributor_jabatan',       'insert'=>false, 'update'=>false),
            array('name'=>'distributor_jabatan_kode',  'insert'=>false, 'update'=>false),
            array('name'=>'distributor_jabatan_nama',  'insert'=>false, 'update'=>false),

            // array('name'=>'pengarah_id',            'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_kode',          'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_nama',          'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_unit',          'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_unit_kode',     'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_unit_nama',     'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_jabatan',       'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_jabatan_kode',  'insert'=>false, 'update'=>false),
            // array('name'=>'pengarah_jabatan_nama',  'insert'=>false, 'update'=>false),

            // array('name'=>'penyetuju_id',              'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_kode',            'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_nama',            'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_unit',            'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_unit_kode',       'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_unit_rubrik',     'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_unit_nama',       'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_jabatan',         'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_jabatan_kode',    'insert'=>false, 'update'=>false),
            // array('name'=>'penyetuju_jabatan_nama',    'insert'=>false, 'update'=>false),

            // array('name'=>'penyelesai_id',             'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_kode',           'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_nama',           'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_unit',           'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_unit_kode',      'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_unit_rubrik',    'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_unit_nama',      'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_jabatan',        'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_jabatan_kode',   'insert'=>false, 'update'=>false),
            // array('name'=>'penyelesai_jabatan_nama',   'insert'=>false, 'update'=>false),

            // array('name'=>'penerima_id',               'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_kode',             'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_nama',             'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_unit',             'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_unit_kode',        'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_unit_rubrik',      'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_unit_nama',        'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_jabatan',          'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_jabatan_kode',     'insert'=>false, 'update'=>false),
            // array('name'=>'penerima_jabatan_nama',     'insert'=>false, 'update'=>false),

            array('name'=>'unit_id',                   'insert'=>false, 'update'=>false),
            array('name'=>'unit_kode',                 'insert'=>false, 'update'=>false),
            array('name'=>'unit_nama',                 'insert'=>false, 'update'=>false),

            array('name'=>'ekspedisi_id',              'insert'=>false, 'update'=>false),
            array('name'=>'ekspedisi_nama',            'insert'=>false, 'update'=>false),
            array('name'=>'ekspedisi_kode',            'insert'=>false, 'update'=>false),

            array('name'=>'media_id',                  'insert'=>false, 'update'=>false),
            array('name'=>'media_nama',                'insert'=>false, 'update'=>false),
            array('name'=>'media_kode',                'insert'=>false, 'update'=>false),

            array('name'=>'prioritas_id',              'insert'=>false, 'update'=>false),
            array('name'=>'prioritas_kode',            'insert'=>false, 'update'=>false),
            array('name'=>'prioritas_nama',            'insert'=>false, 'update'=>false),
            array('name'=>'prioritas_retensi',         'insert'=>false, 'update'=>false),
 
            array('name'=>'jenis_id',                  'insert'=>false, 'update'=>false),
            array('name'=>'jenis_nama',                'insert'=>false, 'update'=>false),
            array('name'=>'jenis_kode',                'insert'=>false, 'update'=>false),

            array('name'=>'sifat_id',                  'insert'=>false, 'update'=>false),
            array('name'=>'sifat_nama',                'insert'=>false, 'update'=>false),
            array('name'=>'sifat_kode',                'insert'=>false, 'update'=>false),

            array('name'=>'kelas_id',                  'insert'=>false, 'update'=>false),
            array('name'=>'kelas_nama',                'insert'=>false, 'update'=>false),
            array('name'=>'kelas_kode',                'insert'=>false, 'update'=>false),

            array('name'=>'lokasi_id',                 'insert'=>false, 'update'=>false),
            array('name'=>'lokasi_nama',               'insert'=>false, 'update'=>false),
            array('name'=>'lokasi_kode',               'insert'=>false, 'update'=>false),

            array('name'=>'korespondensi_id',         'insert'=>false, 'update'=>false),
            array('name'=>'korespondensi_nomor',      'insert'=>false, 'update'=>false),
            array('name'=>'korespondensi_perihal',    'insert'=>false, 'update'=>false),
            array('name'=>'korespondensi_pengirim',   'insert'=>false, 'update'=>false),
            array('name'=>'korespondensi_penerima',   'insert'=>false, 'update'=>false),
            array('name'=>'korespondensi_isinternal', 'insert'=>false, 'update'=>false),
            array('name'=>'korespondensi_properti',   'insert'=>false, 'update'=>false),


            array('name'=>'surat_properti_id',                    'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_buat_tgl',              'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_id',            'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_kode',          'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_nama',          'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_unit',          'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_unit_kode',     'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_unit_rubrik',   'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_unit_nama',     'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_jabatan',       'insert'=>false, 'update'=>false),
            array('name'=>'surat_properti_pembuat_jabatan_nama',  'insert'=>false, 'update'=>false)
        ));
    }

    function generate_code($index = false){
        $CI = get_instance();
        $this->load->library('parser');
        
        $setting = $CI->model('sipas/pengaturan', true);
        $pattern = $setting->getSettingByCode('template_nomor_surat_registrasi');
        $checkYear = $setting->getSettingByCode('template_index_surat_registrasi_pertahun');
        $kustom = $setting->getSettingByCode('template_index_surat_registrasi_kustom');
        $digitNomor = $setting->getSettingByCode('template_digit_nomor_registrasi');
        
        $formatPattern = $this->parser->parse_string($pattern, $setting->getCompiledDataTemplate());
        
        if($checkYear) $change = 'year';
        else $change = 'month';
        
        $next = parent::generate_code(array(
            'pattern'       => $formatPattern,
            'date_format'   => 'Ym',
            'field'         => $this::$field_register,
            'index_format'  => $digitNomor,
            'index_date'    => $this::$field_create_date,
            'index_change'  => $change,
            'index_custom'  => null,
            'index_mask'    => $index
        ));
        return $next;
    }

    function generate_nomor($id = null, $model = null, $index = false){
        $CI = get_instance();
        $this->load->library('parser');

        $setting = $CI->model('sipas/pengaturan', true);
        $pattern = $setting->getSettingByCode('template_nomor_surat_'.$model);
        $checkYear = $setting->getSettingByCode('template_index_surat_'.$model.'_pertahun');
        $kustom = $setting->getSettingByCode('template_index_surat_'.$model.'_kustom');
        $modelSurat = $CI->model('sipas/surat_view', true);
        $modelJenis = $CI->model('sipas/jenis', true);

        $suratView = $modelSurat->read($id);
        // bug fix for fucking shit penomoran
        switch ('template_nomor_surat_'.$model)
        {
            case 'template_nomor_surat_ikeluar':
                $pattern = $setting->getSettingByCode('template_nomor_surat_internal');
                $checkYear = $setting->getSettingByCode('template_index_surat_internal_pertahun');
                break;
            case 'template_nomor_surat_bebas':
                $pattern = $setting->getSettingByCode('template_nomor_arsip_bebas');
                $checkYear = $setting->getSettingByCode('template_index_arsip_bebas_pertahun');
                break;
        }

        $formatPattern = $this->parser->parse_string($pattern, $setting->getCompiledDataTemplate($id));

        $change = ($checkYear) ? 'year' : 'month';

        $custom_filter = array();
        switch ($model) {
            case 'masuk':
                $custom_filter['surat_model'] = $this::MODEL_MASUK;
                break;
            case 'keluar':
                $custom_filter['surat_model'] = $this::MODEL_KELUAR;
                $digitNomor = $setting->getSettingByCode('template_digit_nomor_surat_keluar');
                break;
            case 'imasuk':
                $custom_filter['surat_model'] = $this::MODEL_IMASUK;
                break;
            case 'ikeluar':
                $custom_filter['surat_model'] = $this::MODEL_IKELUAR;
                $digitNomor = $setting->getSettingByCode('template_digit_nomor_surat_internal');
                break;
            case 'bebas':
                $custom_filter['surat_model'] = $this::MODEL_BEBAS;
                $digitNomor = $setting->getSettingByCode('template_digit_nomor_arsip_bebas');
                break;
        }

      $jenis = $modelJenis->read($suratView['surat_jenis']);
      if($jenis['jenis_terpusat']){ //for timah
            $custom_filter['surat_jenis'] = $suratView['surat_jenis'];
      }
      else{
            $custom_filter['surat_unit'] = $suratView['surat_unit'];
      }
      
      $config = array(
            'pattern'       => $formatPattern,
            'date_format'   => 'Ym',
            'field'         => $this::$field_code,
            'index_format'  => $digitNomor,
            'index_date'    => $this::$field_create_date,
            'index_change'  => $change,
            'index_custom'  => null,
            'index_mask'    => $index,
            'custom_filter'  => $custom_filter
      );

      $next = parent::generate_code($config);
      return $next;
    }

    function create_imasuk($account_id = null, $data = array(), $use_setting = null){
        $me = $this;
        $now = date('Y-m-d H:i:s');

        $surat          = $me->m_surat;
        $properti       = $me->m_properti;
        $surat_stack    = $me->m_surat_stack;
        $disposisi      = $me->m_disposisi;
        $staf_aktual    = $me->m_staf_aktual;

        $disposisi_masuk    = $me->m_disposisi_masuk;
        $surat_stack_view   = $me->m_surat_stack_dis_view;

        $unitpenerima = array();
        $unit = array();
        $list = $surat_stack_view->find(array(
            'surat_stack_surat'     => $data['surat_id'],
            'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
        ));

        if($list){
            foreach ($list as $index => $penerima) {
                $temp = $penerima['unit_id'];
                $tempstaf = $penerima['staf_id'];
                array_push($unitpenerima, $temp);
                // array_push($penerima, $tempstaf);
            }
            $unit = array_unique($unitpenerima);
        }

        foreach ($unit as $index => $value) {

            $penerima = $surat_stack_view->find(array(
                  'surat_stack_surat'     => $data['surat_id'],
                  'surat_stack_model'     => $surat_stack::MODEL_PENERIMA,
                  'unit_id'               => $value
              ));

            $surat_data = $me->read($data['surat_id']);

            if($surat_data){

                $surat_data['surat_model']        = $me::MODEL_IMASUK;
                $surat_data['surat_registrasi']   = $me->generate_code();
                $surat_data['surat_agenda']       = $me->getAgenda($me::MODEL_IMASUK, $value);
                $surat_data['surat_unit']         = $value;
                $surat_data['surat_korespondensi']       = $surat_data['surat_korespondensi'];
                $surat_data['surat_korespondensi_surat'] = $surat_data['surat_id'];
                $surat_data['surat_pengirim']     = $surat_data['unit_nama'];
            if($use_setting){
                $surat_data['surat_setuju']       = 2;
                $surat_data['surat_setuju_staf']       = $account_id;
                $surat_data['surat_setuju_tgl']       = $now;
                $surat_data['surat_distribusi_staf']       = $account_id;
                $surat_data['surat_distribusi_tgl']       = $now;
                $surat_data['surat_selesai_staf']       = $account_id;
                $surat_data['surat_selesai_tgl']       = $now;
            }else{
                  unset($surat_data['surat_setuju']);
                  unset($surat_data['surat_setuju_staf']);
                  unset($surat_data['surat_setuju_tgl']);
                  unset($surat_data['surat_distribusi_tgl']);
                  unset($surat_data['surat_distribusi_staf']);
                  unset($surat_data['surat_selesai_tgl']);
                  unset($surat_data['surat_selesai_staf']);
            }

                unset($surat_data['surat_id']);
                unset($surat_data['surat_setuju_isurut']);
                unset($surat_data['surat_terima_staf']);

                $operation = $surat->insert($surat_data, null,
                    function($response) use ($me, $surat, $surat_stack, $now,
                        $value, $penerima, $properti, $account_id, $surat_data, $use_setting,
                        $disposisi_masuk, $disposisi, $staf_aktual){
                        if($response[$surat->successProperty] !== true) return;
                        $inserted_data = $response['data'];
                        $surat_id = $inserted_data['surat_id'];

                        $op = $properti->created($account_id, $inserted_data, 'surat', $inserted_data['surat_id'], $inserted_data['surat_registrasi']);
                        if($op){
                            $surat->update($inserted_data['surat_id'], array(
                                'surat_properti' => $op['properti_id']
                            ));
                        }
                        if($use_setting){
                              $surat->update($inserted_data['surat_id'], array(
                                'surat_distribusi_otomatis' => 1
                            ));
                              if(!empty($penerima)){
                                    /*send disposisi masuk*/
                                    $dpo = $disposisi->insert(
                                          array(
                                              'disposisi_tgl'     => $now,
                                              'disposisi_pelaku'  => $account_id,
                                              'disposisi_staf'    => $account_id,
                                              'disposisi_model'   => $disposisi::MODEL_DISPOSISI,
                                              'disposisi_surat'   => $inserted_data['surat_id']
                                          ),null,
                                          function($response) use(
                                              $penerima, $now, $account_id, $disposisi, $disposisi_masuk,
                                              $properti, $surat_stack, $me, $staf_aktual, $surat_data, $inserted_data){
                                              if($response[$disposisi->successProperty] !== true) return;

                                              if(!is_array($penerima)){
                                                  $penerima = array();
                                              }
                                              $disposisi_id = $disposisi->get_insertid();
                                              $inserted = $disposisi->read($disposisi_id);

                                              /*insert properti*/
                                              $op = $properti->created($account_id, $inserted, 'disposisi', $inserted['disposisi_id'], $inserted['disposisi_nomor']);
                                              if($op){
                                                  $disposisi->update($inserted['disposisi_id'], array(
                                                      'disposisi_properti' => $op['properti_id']
                                                  ));
                                              }
                                              foreach($penerima as $index => $p) {
                                                  if(is_string($p)) {
                                                      $penerima_id = $p;
                                                  }else if (is_object($p)) {
                                                      $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                                  }else if (is_array($p)) {
                                                      $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                                  }

                                                  if(empty($penerima_id)) {
                                                      continue;
                                                  }
                                                  $lvl = $index;

                                                  /*pending decision for stack to have properti*/
                                                  // $op = $properti->created($akun);
                                                  // $idStackProp = $op['properti_id'];

                                                  /*Re-insert penerima List*/
                                                  $penerima_stack = $surat_stack->insert(array(
                                                      'surat_stack_staf'    => $penerima_id,
                                                      'surat_stack_surat'   => $inserted_data['surat_id'],
                                                      'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                                                      'surat_stack_level'   => $lvl,
                                                      'surat_stack_status'  => $me::SETUJU_INIT,
                                                      'surat_stack_istembusan'=> $p['surat_stack_istembusan'],
                                                      'surat_stack_isberkas'=> $p['surat_stack_isberkas']                                                     
                                                  ));

                                                  $disposisi_masuk->insert(array(
                                                      'disposisi_masuk_disposisi'   => $disposisi_id,
                                                      'disposisi_masuk_staf'        => $penerima_id,
                                                      'disposisi_masuk_status'      => 0,
                                                      'disposisi_masuk_istembusan'  => $p['surat_stack_istembusan'],
                                                      'disposisi_masuk_isberkas'    => $p['surat_stack_isberkas']
                                                  ), null, function($response) use($properti, $account_id, $surat_data, $disposisi_masuk){
                                                      if($response[$disposisi_masuk->successProperty] !== true) return;

                                                      $inserted = $disposisi_masuk->read($disposisi_masuk->get_insertid());
                                                      $op = $properti->created($account_id, $inserted, 'disposisi_masuk', $inserted['disposisi_masuk_id'], $inserted['disposisi_masuk_nomor']);
                                                      if($op){
                                                          $disposisi_masuk->update($inserted['disposisi_masuk_id'], array(
                                                              'disposisi_masuk_properti' => $op['properti_id']
                                                          ));
                                                      }
                                                  });

                                                  /*recent*/
                                                  $recent_exist = $staf_aktual->find(array(
                                                      'staf_aktual_pengirim'=>$account_id,
                                                      'staf_aktual_penerima'=>$penerima_id
                                                  ));
                                                  if($recent_exist){
                                                      $staf_aktual->update(array(
                                                              'staf_aktual_pengirim'=>$account_id,
                                                              'staf_aktual_penerima'=>$penerima_id
                                                          ),array(
                                                              'staf_aktual_pengirim'=>$account_id,
                                                              'staf_aktual_penerima'=>$penerima_id,
                                                              'staf_aktual_tgl'     => $now,
                                                              'staf_aktual_tipe'    => $disposisi::MODEL_DISPOSISI
                                                          ), function($response) use ($properti, $account_id, $staf_aktual){
                                                              $recent_data = $response['data'];
                                                              $updated_data = $staf_aktual->read($recent_data['staf_aktual_id']);
                                                              $idProp = $updated_data['staf_aktual_properti'];

                                                              $properti->updated($idProp, $account_id, $updated_data, 'staf_aktual '.$updated_data['staf_aktual_tgl']);
                                                          });
                                                  }else{
                                                      $staf_aktual->insert(array(
                                                          'staf_aktual_pengirim'=>$account_id,
                                                          'staf_aktual_penerima'=>$penerima_id,
                                                          'staf_aktual_tgl'     => $now,
                                                          'staf_aktual_tipe'    => $disposisi::MODEL_DISPOSISI
                                                      ), null, function($response) use ($surat_data, $properti, $account_id){

                                                          $inserted = $staf_aktual->read($staf_aktual->get_insertid());
                                                          $op = $properti->created($account_id, $inserted, 'staf_aktual', $inserted['staf_aktual_id'], 'staf_aktual '.$inserted['staf_aktual_tgl']);
                                                          if($op){
                                                              $staf_aktual->update($inserted['staf_aktual_id'], array(
                                                                  'staf_aktual_properti' => $op['properti_id']
                                                              ));
                                                          }
                                                      });
                                                  }
                                                  /*add ons*/
                                                  // $useNotifEmail = $setting->getSettingByCode('notif_email');
                                                  // $useNotifEmailMasuk = $setting->getSettingByCode('notif_email_suratmasuk');

                                                  // if($useNotifEmail && $useNotifEmailMasuk){
                                                      // $penerima = $staf->read($p)
                                                      // $notifikasi->created('email', $surat_data, $penerima_id, 'masuk');
                                                  // }
                                              }
                                      });
                              }
                        }
                    }
                );
            }
        }
    }
}