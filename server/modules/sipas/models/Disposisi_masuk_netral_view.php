<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$CI = get_instance();
$CI->model('sipas/disposisi_masuk', true);

class Sipas_model_Disposisi_masuk_netral_view extends Sipas_model_Disposisi_masuk {
    
    public $table = 'v_disposisi_masuk_netral';

    static $field_isbaca = 'disposisi_masuk_isbaca';
    static $field_isterus = 'disposisi_masuk_isterus';
    static $field_iscabut = 'disposisi_masuk_iscabut';

    function __construct(){
        parent::__construct();
        $this->set_table_name('v_disposisi_masuk_netral');
        $this->set_primary('disposisi_masuk_id');
        $this->set_fields(array(
            array('name' => 'disposisi_masuk_id'),
            array('name' => 'disposisi_masuk_disposisi'),
            array('name' => 'disposisi_masuk_staf'),
            array('name' => 'disposisi_masuk_jabatan'),
            array('name' => 'disposisi_masuk_profil'),
            array('name' => 'disposisi_masuk_parent_path'),
            array('name' => 'disposisi_masuk_istembusan'),
            array('name' => 'disposisi_masuk_isberkas'),
            array('name' => 'disposisi_masuk_nomor'),
            array('name' => 'disposisi_masuk_pesan'),
            array('name' => 'disposisi_masuk_terima_tgl'),
            array('name' => 'disposisi_masuk_terima_staf'),
            array('name' => 'disposisi_masuk_terima_profil'),
            array('name' => 'disposisi_masuk_terima_jabatan'),
            array('name' => 'disposisi_masuk_baca_tgl'),
            array('name' => 'disposisi_masuk_baca_staf'),
            array('name' => 'disposisi_masuk_baca_profil'),
            array('name' => 'disposisi_masuk_aksi_baca_tgl'),
            array('name' => 'disposisi_masuk_aksi_baca_staf'),
            array('name' => 'disposisi_masuk_aksi_baca_profil'),
            array('name' => 'disposisi_masuk_berkasterima_tgl'),
            array('name' => 'disposisi_masuk_berkasterima_staf'),
            array('name' => 'disposisi_masuk_berkasterima_profil'),
            array('name' => 'disposisi_masuk_berkas_status'),
            array('name' => 'disposisi_masuk_berkas_status_staf'),
            array('name' => 'disposisi_masuk_berkas_status_profil'),
            array('name' => 'disposisi_masuk_berkas_status_tgl'),
            array('name' => 'disposisi_masuk_berkas_komentar'),
            array('name' => 'disposisi_masuk_terus_tgl'),
            array('name' => 'disposisi_masuk_terus_staf'),
            array('name' => 'disposisi_masuk_terus_profil'),
            array('name' => 'disposisi_masuk_cabut_tgl'),
            array('name' => 'disposisi_masuk_cabut_staf'),
            array('name' => 'disposisi_masuk_cabut_profil'),
            array('name' => 'disposisi_masuk_pulih_tgl'),
            array('name' => 'disposisi_masuk_pulih_staf'),
            array('name' => 'disposisi_masuk_pulih_profil'),
            array('name' => 'disposisi_masuk_status'),
            array('name' => 'disposisi_masuk_status_tgl'),
            array('name' => 'disposisi_masuk_status_staf'),
            array('name' => 'disposisi_masuk_status_profil'),
            array('name' => 'disposisi_masuk_aksi'),
            array('name' => 'disposisi_masuk_aksi_tgl'),
            array('name' => 'disposisi_masuk_aksi_staf'),
            array('name' => 'disposisi_masuk_aksi_profil'),
            array('name' => 'disposisi_masuk_induk_baca_tgl'),
            array('name' => 'disposisi_masuk_induk_baca_staf'),
            array('name' => 'disposisi_masuk_induk_baca_profil'),
            array('name' => 'disposisi_masuk_properti'),
            array('name' => 'disposisi_masuk_jumlah_penerima'),

            array('name' => 'disposisi_masuk_isterima'),
            array('name' => 'disposisi_masuk_isbaca'),
            array('name' => 'disposisi_masuk_aksi_isbaca'),
            array('name' => 'disposisi_masuk_isberkasterima'),
            array('name' => 'disposisi_masuk_isterus'),
            array('name' => 'disposisi_masuk_iscabut'),
            array('name' => 'disposisi_masuk_ispulih'),
            array('name' => 'disposisi_masuk_isprioritas'),
            
            array('name' => 'disposisi_id'),
            array('name' => 'disposisi_staf'),
            array('name' => 'disposisi_profil'),
            array('name' => 'disposisi_pelaku'),
            array('name' => 'disposisi_pelaku_profil'),
            array('name' => 'disposisi_pulih_staf'),
            array('name' => 'disposisi_surat'),
            array('name' => 'disposisi_perintah'),
            array('name' => 'disposisi_induk'),
            array('name' => 'disposisi_parent_path'),
            array('name' => 'disposisi_mode'),
            array('name' => 'disposisi_model'),
            array('name' => 'disposisi_model_sub'),
            array('name' => 'disposisi_nomor'),
            array('name' => 'disposisi_tgl'),
            array('name' => 'disposisi_pesan'),
            array('name' => 'disposisi_istunggal'),
            array('name' => 'disposisi_israhasia'),
            array('name' => 'disposisi_baca_tgl'),
            array('name' => 'disposisi_cabut_tgl'),
            array('name' => 'disposisi_pulih_tgl'),
            array('name' => 'disposisi_cabut_induk'),
            array('name' => 'disposisi_properti'),
            array('name' => 'disposisi_useprioritas'),
            array('name' => 'disposisi_prioritas_tgl'),

            array('name' => 'disposisi_pengirim_id'),
            array('name' => 'disposisi_pengirim_nama'),
            array('name' => 'disposisi_pengirim_unit_nama'),
            array('name' => 'disposisi_pengirim_jabatan_nama'),
            array('name' => 'disposisi_pengirim_unit'),
            array('name' => 'disposisi_pengirim_jabatan'),

            array('name' => 'disposisi_pelaku_id'),
            array('name' => 'disposisi_pelaku_nama'),
            array('name' => 'disposisi_pelaku_unit_nama'),
            array('name' => 'disposisi_pelaku_jabatan_nama'),

            array('name' => 'disposisi_masuk_penerima_id'),
            array('name' => 'disposisi_masuk_penerima_nama'),
            array('name' => 'disposisi_masuk_penerima_unit_nama'),
            array('name' => 'disposisi_masuk_penerima_unit_id'),
            array('name' => 'disposisi_masuk_penerima_jabatan_nama'),
            array('name' => 'disposisi_masuk_penerima_jabatan_id'),

            array('name' => 'disposisi_masuk_status_staf_nama'),

            // array('name' => 'disposisi_masuk_terima_id'),
            // array('name' => 'disposisi_masuk_terima_nama'),
            // array('name' => 'disposisi_masuk_terima_unit_nama'),
            // array('name' => 'disposisi_masuk_terima_jabatan_nama'),

            array('name' => 'disposisi_isbaca', 'update' => false),
            array('name' => 'disposisi_iscabut', 'update' => false),
            array('name' => 'disposisi_ispulih', 'update' => false),

            array('name' => 'disposisi_masuk_ispengingat'),
            array('name' => 'disposisi_masuk_pengingat_tgl'),
            array('name' => 'disposisi_masuk_pengingat_staf'),
            array('name' => 'disposisi_masuk_pengingat_profil'),
            
            array('name' => 'jabatan_penerima_id'),
            array('name' => 'jabatan_penerima_nama'),
            array('name' => 'jabatan_penerima_unit_id'),
            array('name' => 'jabatan_penerima_unit_nama'),

            // array('name' => 'pembaca_id'),
            // array('name' => 'pembaca_nama'),
            // array('name' => 'pembaca_unit_nama'),
            // array('name' => 'pembaca_jabatan_nama'),
            array('name' => 'penerimaberkas_id'),
            array('name' => 'penerimaberkas_nama'),
            array('name' => 'penerimaberkas_jabatan_id'),
            // array('name' => 'penerimaberkas_unit_nama'),
            // array('name' => 'penerimaberkas_jabatan_nama'),

            array('name' => 'berkas_id'),
            array('name' => 'berkas_nama'),
            array('name' => 'berkas_jabatan_id'),
            // array('name' => 'berkas_unit_nama'),
            // array('name' => 'berkas_jabatan_nama'),
            // array('name' => 'penerus_id'),
            // array('name' => 'penerus_nama'),
            // array('name' => 'penerus_unit_nama'),
            array('name' => 'penerus_jabatan_id'),
            // array('name' => 'penerus_jabatan_nama'),
            // array('name' => 'pencabut_id'),
            // array('name' => 'pencabut_nama'),
            // array('name' => 'pencabut_unit_nama'),
            // array('name' => 'pencabut_jabatan_nama'),
            // array('name' => 'pemulih_id'),
            // array('name' => 'pemulih_nama'),
            // array('name' => 'pemulih_unit_nama'),
            // array('name' => 'pemulih_jabatan_nama'),
            array('name' => 'aksi_id'),
            array('name' => 'aksi_kode'),
            array('name' => 'aksi_nama'),
            array('name' => 'perintah_id'),
            array('name' => 'perintah_kode'),
            array('name' => 'perintah_nama'),

            array('name' => 'surat_id'),
            array('name' => 'surat_arsip'),
            array('name' => 'surat_model'),
            array('name' => 'surat_model_sub'),
            // array('name' => 'surat_itipe'),
            array('name' => 'surat_registrasi'),
            array('name' => 'surat_usebalas'),
            array('name' => 'surat_useberkas'),
            array('name' => 'surat_nomor'),
            array('name' => 'surat_nomor_format'),
            array('name' => 'surat_nomor_urut'),
            array('name' => 'surat_nomor_backdate'),
            array('name' => 'surat_nomor_otomatis'),
            array('name' => 'surat_nomor_tgl'),
            array('name' => 'surat_nomor_staf'),
            array('name' => 'surat_nomor_profil'),
            array('name' => 'surat_agenda'),
            array('name' => 'surat_agenda_sub'),
            array('name' => 'surat_tanggal'),
            array('name' => 'surat_tmt'),
            array('name' => 'surat_perihal'),
            array('name' => 'surat_pengirim'),
            array('name' => 'surat_tujuan'),
            array('name' => 'surat_kepada'),
            array('name' => 'surat_lampiran'),
            // array('name' => 'surat_ringkasan'),
            // array('name' => 'surat_catatan'),
            // array('name' => 'surat_isselesai'),
            array('name' => 'surat_korespondensi'),
            array('name' => 'surat_korespondensi_surat'),
            // array('name' => 'surat_lokasi'),
            // array('name' => 'surat_kelas'),
            // array('name' => 'surat_jenis'),
            // array('name' => 'surat_sifat'),
            // array('name' => 'surat_media'),
            array('name' => 'surat_prioritas'),
            array('name' => 'surat_prioritas_tgl'),
            array('name' => 'surat_retensi_tgl'),
            array('name' => 'surat_useretensi'),
            // array('name' => 'surat_properti'),
            // array('name' => 'surat_unit'),
            array('name' => 'surat_setuju'),
            array('name' => 'surat_setuju_tgl'),
            array('name' => 'surat_setuju_isurut'),
            array('name' => 'surat_setuju_staf'),
            array('name' => 'surat_setuju_profil'),
            array('name' => 'surat_setuju_akhir_staf'),
            array('name' => 'surat_petikan_setuju'),
            array('name' => 'surat_petikan_akhir_staf'),
            array('name' => 'surat_petikan_setuju_isurut'),
            // array('name' => 'surat_distribusi_tgl'),
            // array('name' => 'surat_distribusi_staf'),
            // array('name' => 'surat_distribusi_profil'),
            // array('name' => 'surat_distribusi_otomatis'),
            // array('name' => 'surat_selesai_tgl'),
            // array('name' => 'surat_selesai_staf'),
            // array('name' => 'surat_selesai_profil'),
            // array('name' => 'surat_terima_staf'),
            
            array('name' => 'surat_distribusi_tgl'),
            array('name' => 'surat_distribusi_staf'),
            array('name' => 'surat_distribusi_profil'),
            array('name' => 'surat_distribusi_iscabut'),

            array('name' => 'surat_setuju_setuju'),
            array('name' => 'surat_setuju_tolak'),
            array('name' => 'surat_setuju_pending'),
            array('name' => 'surat_setuju_total'),
            
            array('name' => 'surat_imasuk_setuju'),
            array('name' => 'surat_imasuk_tolak'),
            array('name' => 'surat_imasuk_total'),

            array('name' => 'unit_id'),
            array('name' => 'unit_kode'),
            array('name' => 'unit_nama'),

            array('name' => 'unit_source_id'),
            array('name' => 'unit_source_kode'),
            array('name' => 'unit_source_nama'),

            array('name' => 'media_id'),
            array('name' => 'media_nama'),
            array('name' => 'media_kode'),

            array('name' => 'prioritas_id'),
            array('name' => 'prioritas_kode'),
            array('name' => 'prioritas_nama'),
            // array('name' => 'prioritas_retensi'),

            array('name' => 'jenis_id'),
            array('name' => 'jenis_nama'),
            array('name' => 'jenis_kode'),
            array('name' => 'jenis_nomor_awal'),
            array('name' => 'jenis_ttd'),
            
            array('name' => 'sifat_id'),
            array('name' => 'sifat_nama'),
            array('name' => 'sifat_kode'),
            array('name' => 'sifat_color'),
            array('name' => 'sifat_israhasia'),
            
            array('name' => 'kelas_id'),
            array('name' => 'kelas_nama'),
            array('name' => 'kelas_kode'),

            array('name' => 'lokasi_id'),
            array('name' => 'lokasi_nama'),
            array('name' => 'lokasi_kode'),
            
            // array('name' => 'itipe_id'),
            // array('name' => 'itipe_nama'),
            // array('name' => 'itipe_kode'),

            // array('name' => 'korespondensi_id'),
            // array('name' => 'korespondensi_nomor'),
            // array('name' => 'korespondensi_perihal'),
            // array('name' => 'korespondensi_pengirim'),
            // array('name' => 'korespondensi_penerima'),
            // array('name' => 'korespondensi_isinternal'),
            // array('name' => 'korespondensi_properti'),

            array('name' => 'surat_properti_buat_tgl'),

            array('name' => 'surat_properti_pembuat_id'),
            array('name' => 'surat_properti_pembuat_kode'),
            array('name' => 'surat_properti_pembuat_nama'),
            array('name' => 'surat_properti_pembuat_unit'),
            array('name' => 'surat_properti_pembuat_unit_nama'),
            array('name' => 'surat_properti_pembuat_jabatan'),
            array('name' => 'surat_properti_pembuat_jabatan_nama')
        ));
    }
    function select($config = NULL, $fn = NULL){
        $records = call_user_func_array("parent::select", func_get_args());
        $query = $this->get_lastquery();

        if(is_array($records) and !empty($records['data']))
        {
            foreach ($records['data'] as $key => &$value)
            {
                $value['pengirim_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['disposisi_pengirim_id'];
                $value['penerima_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$value['disposisi_masuk_staf'];
            }
        }

        $this->set_lastquery($query);
        return $records;
    }

    public function readInfo(){
        $response = array();

        $CI = get_instance();
        $m = $CI->model('sipas/account', true);

        $user = $m->get_user();
        $filter = array(
            $this->field_receiver_id    => $user['akun_staf'],
            $this->field_status_surat   => 3,
            $this->field_konsep          => NULL,            
            'disposisi_isdisposisi' => 1
        );
        
        $response[$this->field_readinfo_total] = $this->count_exist(array_merge(
            $filter,
            array(
                'IFNULL('.$this->field_disposisi_retract.','.self::ACTIVE.')' => self::ACTIVE
            )
        ));
        
        $response[$this->field_readinfo_init] = $this->count_exist(array_merge(
            $filter,
            array(
                'IFNULL('.$this->field_readinfo_lookup.','.self::BACA_INIT.')' => self::BACA_INIT,
                'IFNULL('.$this->field_disposisi_retract.','.self::ACTIVE.')' => self::ACTIVE
            )
        ));
        $response[$this->field_readinfo_read] = $this->count_exist(array_merge(
            $filter,
            array(
                $this->field_readinfo_lookup => self::BACA_ISBACA,
                'IFNULL('.$this->field_disposisi_retract.','.self::ACTIVE.')' => self::ACTIVE
            )
        ));
        $response[$this->field_readinfo_forward] = $this->count_exist(array_merge(
            $filter,
            array(
                $this->field_readinfo_lookup => self::FORWARD_ISFORWARDED,
                'IFNULL('.$this->field_disposisi_retract.','.self::ACTIVE.')' => self::ACTIVE
            )
        ));

        $response[$this->field_count_disposisi_retract] = $this->count_exist(array_merge(
            $filter,
            array(
                $this->field_disposisi_retract => self::RETRACT
            )
        ));

        return $response;
    }
    
    function penerimasurat($id){
        $config = array(
            'table' => $this->table,
            'filters' => array(
                array('property'=>'surat_masuk','data'=>array('type'=>'exact','value'=>$id)),
                array('property'=>'disposisi_staf','data'=>array('type'=>'exact','value'=>NULL))
            ),
            'fields'=>array('penerima_nip','penerima_nama','penerima_jabatan_nama','penerima_unit_nama'),
            'fields_map'=>array(
                'penerima_nip'=>'staf_kode',
                'penerima_nama'=>'staf_nama',
                'penerima_jabatan_nama'=>'jabatan_nama',
                'penerima_unit_nama'=>'unit_nama'
            )
        );
        return $this->select($config);
    }

    function create_disposisi($data){
        $CI = get_instance();
        $staf_model                     = $CI->model('sipas/staf',                          true);
        $properti                       = $CI->model('sipas/properti',                      true);
        $disposisi_masuk                = $CI->model('sipas/disposisi_masuk',               true);
        $disposisi_masuk_view           = $CI->model('sipas/disposisi_masuk_netral_view',   true);
        $disposisi_masuk_log            = $CI->model('sipas/disposisi_masuk_log',           true);
        $disposisi_jumlah_penerima      = $CI->model('sipas/disposisi_jumlah_penerima_sama_view',true);
        $disposisi_jumlah_disposisi     = $CI->model('sipas/disposisi_jumlah_penerima_disposisi_sama_view',true);

        $queueTube = Config()->item('queueServer_notifTube');
        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

        // $redis = new Redis(); 
        // $redis->connect('publish-sipaslab.sekawanmedia.co.id', 6379);
        // $redis->auth("password");

        $now = date('Y-m-d H:i:s');

        if (empty($data['penerima_id'])) $data['penerima_id'] = NULL;
        if (empty($data['penerima_jabatan'])) $data['penerima_jabatan'] = NULL;

        if($data['penerima_id'] != NULL) {
            if($data['disposisi_masuk_profil']){
                $staf_profil = $data['disposisi_masuk_profil'];
            }else{
                $staf = $staf_model->read($penerima_id);
                $staf_profil = $staf['staf_profil']; 
            }
        }else{
            $staf_profil = NULL;
        }

        $operation = $disposisi_masuk->insert(array(
            'disposisi_masuk_disposisi'     => $data['disposisi_id'],
            'disposisi_masuk_staf'          => $data['penerima_id'],
            'disposisi_masuk_profil'        => $staf_profil,
            'disposisi_masuk_jabatan'       => $data['penerima_jabatan'],
            'disposisi_masuk_terima_tgl'    => $now,
            'disposisi_masuk_terima_staf'   => $data['penerima_id'],
            'disposisi_masuk_terima_profil' => $staf_profil,
            'disposisi_masuk_terima_jabatan' => $data['penerima_jabatan'],
            'disposisi_masuk_istembusan'    => $data['tembusan'],
            'disposisi_masuk_isberkas'      => $data['berkas'],
        ), null, function ($response) use ($data, $disposisi_masuk_log, $disposisi_masuk, $disposisi_masuk_view, $now, 
            $properti, $queueTube, $queueTubeRedis, $disposisi_jumlah_penerima, $disposisi_jumlah_disposisi) {

            $disposisi_masuk_id = $disposisi_masuk->get_insertid();
            $inserted_data = $disposisi_masuk_view->read($disposisi_masuk_id);


            $disposisi_masuk->update($disposisi_masuk_id, array(
                'disposisi_masuk_parent_path' => $data['dispo_masuk_parent'].'/'.$disposisi_masuk_id
            ));

            if ($inserted_data['disposisi_mode'] == 'Masuk') {
                $pesan = $inserted_data['surat_perihal'];
            } else {
                $pesan = $inserted_data['perintah_nama'];
            }

            if ($inserted_data['surat_model'] === '2') {
                $inserted_data['disposisi_mode'] = 'Tembusan';
            }

            if (Config()->item('queueServer')['host']) {
                $data_fcm = array(
                    'id' => $disposisi_masuk_id,
                    'type' => $inserted_data['disposisi_mode'],
                    'from' => $data['pengirim_id'],
                    'to' => $data['penerima_id'],
                    'data' => $pesan,
                );
                $addJob = create_job($queueTube, $data_fcm);

                $data_redis = array(
                    'type'=>'Disposisi-Staf',
                    'staf_id'=>$data['penerima_id'],
                    'jabatan_id'=>null,
                    'unit_id'=>null,
                    'data'=> $data['penerima_id']
                );
                $addJobStaf = create_job($queueTubeRedis, $data_redis);
            }

            pushEvent(array(
                'to' => $data['penerima_id'],
                'data' => array(
                    'api' => 'disposisi_masuk',
                    'id' => $inserted_data['disposisi_masuk_id']
                ),
                'group' => array('staf', 'asistensi'),
                'type' => 'disposisi_masuk'
            ));
            
            $op = $properti->created($data['pengirim_id'], $inserted_data, 'disposisi_masuk', $inserted_data['disposisi_masuk_id'], $inserted_data['disposisi_masuk_nomor']);

            if ($op) {
                $disposisi_masuk->update($inserted_data['disposisi_masuk_id'], array(
                    'disposisi_masuk_properti' => $op['properti_id'],
                ));
            }
        });
    }

}