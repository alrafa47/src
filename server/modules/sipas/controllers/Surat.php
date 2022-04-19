<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Surat extends Base_Controller
{

    public $report_resi_template = 'sipas/surat/resi';
    public $report_title = 'Laporan Rekap Jumlah Surat';
    public $report_title_eksternal = 'Laporan Rekap Jumlah Surat Eksternal';
    public $report_title_internal = 'Laporan Rekap Jumlah Surat Internal';
    public $report_title_resi = 'Tanda Terima Surat';
    public $report_subtitle = 'Rekapitulasi jumlah surat masuk dan keluar yang tercatat pada aplikasi';
    public $report_subtitle_jenis = 'Daftar jumlah surat berdasarkan jenis';
    public $report_template = 'sipas/surat/rekap';
    public $report_subtitle_internal = 'Rekap jumlah surat internal yang diterima atau dikirim oleh Unit pengguna aplikasi';
    public $report_template_internal = 'sipas/surat/internal/rekap';
    public $report_subtitle_eksternal = 'Rekap jumlah surat eksternal yang diterima atau dikirim oleh Instansi pengguna aplikasi';
    public $report_template_eksternal = 'sipas/surat/eksternal/rekap';
    public $report_template_approval = 'sipas/surat/approval';
    public $report_template_approval_gran = 'sipas/surat/approval_granted';
    public $report_template_jenis = 'sipas/surat/umum/jenis/rekap';

    static $bg_color_item_laporan = array('odd' => 'background-color: #F5F5F5;', 'even' => 'background-color: #FFFFFF;');
    static $default_value  = array(
        'empty' => '<span style="color:grey; font-style:italic;">(dalam proses)</span>',
        'nodata' => '<span style="color:grey; font-style:italic;">(Tidak ada data)</span>',
        'title' => '<span style="color:white; font-style:italic;">(TIdak ada Filter)</span>'
    );

    public function __construct()
    {
        parent::__construct();

        $this->load->library('ciqrcode');

        $this->m_account    = $this->model('sipas/account', true);
        $this->m_report     = $this->model('sipas/report', true);
        $this->m_asset      = $this->model('sipas/asset', true);
        $this->m_surat      = $this->model('sipas/surat', true);
        $this->m_surat_log  = $this->model('sipas/surat_log', true);
        $this->m_pengaturan = $this->model('sipas/pengaturan', true);
        $this->m_dokumen    = $this->model('sipas/dokumen', true);
        $this->m_surat_view = $this->model('sipas/surat_view', true);
        $this->m_arsip      = $this->model('sipas/arsip', true);
        $this->m_arsip_view = $this->model('sipas/arsip_view', true);

        $this->m_surat_masuk_view   = $this->model('sipas/surat_masuk_hidup_view', true);
        $this->m_surat_keluar_view  = $this->model('sipas/surat_keluar_hidup_view', true);
        $this->m_surat_imasuk_view  = $this->model('sipas/surat_imasuk_hidup_view', true);
        $this->m_surat_ikeluar_view  = $this->model('sipas/surat_ikeluar_hidup_view', true);

        $this->m_korespondensi        = $this->model('sipas/korespondensi', true);
        $this->m_korespondensi_view   = $this->model('sipas/korespondensi_view', true);

        $this->m_surat_libnomor     = $this->model('sipas/surat_libnomor', true);
        $this->m_penyetuju          = $this->model('sipas/surat_stack_koreksi_view', true);
        $this->m_surat_stack        = $this->model('sipas/surat_stack', true);
        $this->m_surat_stack_view   = $this->model('sipas/surat_stack_view', true);
        $this->m_properti           = $this->model('sipas/properti', true);

        $this->m_staf       = $this->model('sipas/staf', true);
        $this->m_staf_view  = $this->model('sipas/staf_view', true);
        $this->m_unit       = $this->model('sipas/unit', true);
        $this->m_jabatan    = $this->model('sipas/jabatan', true);

        $this->m_notification = $this->model('sipas/notification', true);

        $this->m_surat_rekap_view           = $this->model('sipas/surat_rekap_view', true);
        $this->m_surat_rekap_by_jenis_view  = $this->model('sipas/surat_rekap_by_jenis_view', true);

        $this->m_surat_keluar_batal_nomor_view      = $this->model('sipas/surat_keluar_batal_nomor_view',       true);
        $this->m_surat_ikeluar_batal_nomor_view     = $this->model('sipas/surat_ikeluar_batal_nomor_view',      true);
        $this->m_surat_batas_reupload_view          = $this->model('sipas/surat_batas_reupload_view',           true);

        $this->m_disposisi          = $this->model('sipas/disposisi', true);
        $this->m_disposisi_masuk    = $this->model('sipas/disposisi_masuk', true);
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $model = $this->m_surat_view;

        if (varGetHas('id') || varGetHas('surat_id')) {
            $id = varGet('id', varGet('surat_id'));
            $record = $model->read($id);
            if ($record) {
                $record['pembuat_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $record['surat_properti_pembuat_id'];
                $record['penyetuju_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $record['surat_setuju_staf'];
                $record['distributor_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $record['surat_distribusi_staf'];
            }
            $this->response_record($record);
        } else {
            $filter     = json_decode(varGet('filter', '[]'));
            array_unshift($filter, (object)array(
                'type'      => 'custom',
                'value'     => 'IFNULL(surat_properti_ishapus,0) = 0'
            ));

            $records = $model->select(array(
                'limit' => varGet('limit'),
                'start' => varGet('start'),
                'filter' => json_encode($filter)
            ));

            $this->response($records);
        }
    }

    function create($usePayload = true)
    {
        $surat      = $this->m_surat;
        $surat_view = $this->m_surat_view;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $korespondensi = $this->m_korespondensi;
        $surat_log  = $this->m_surat_log;
        $model_staf  = $this->m_staf;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $stafProfil = $model_staf->read($akun);

        $now = date('Y-m-d H:i:s');
        $op = $properti->created($akun);
        $data['surat_properti'] = $op['properti_id'];

        $operation = $surat->insert($data, null, function ($response) use ($data, $surat, $properti, $account, $korespondensi, $now, $surat_log, $akun, $stafProfil) {
            if ($response[$surat->successProperty] !== true) return;
            $data['surat_id'] = $surat->get_insertid();
            // $operation_log = $surat_log->created($akun, $data);
            $dataLog = array(
                'surat_log_tipe' => 1,
                'surat_log_surat' => $data['surat_id'],
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );

            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
        });
        $this->response($operation);
    }

    public function createImport()
    {
        $arsip      = $this->m_arsip;
        $model      = $this->m_surat;
        $dokumen    = $this->m_dokumen;
        $surat_log  = $this->m_surat_log;
        $properti   = $this->m_properti;
        $account    = $this->m_account;
        $surat_view = $this->m_surat_view;
        $model_staf  = $this->m_staf;

        $now = date('Y-m-d H:i:s');
        $akun = $account->get_profile_id();
        $data = varPost();

        $stafProfil = $model_staf->read($akun);

        $data['surat_tanggal'] = $now;
        $data['surat_registrasi'] = $surat_view->generate_code();
        $data['surat_setuju'] = $surat_view::SETUJU_INIT;
        $data['surat_buat_tgl'] = $now;
        $data['surat_buat_staf'] = $akun;
        $data['surat_buat_profil'] = $stafProfil['staf_profil'];
        $data['surat_arah_profil'] = $stafProfil['staf_profil'];

        //insert arsip
        $dataArsip = array(
            'arsip_nama' => 'AB.' . $data['surat_registrasi']
        );
        $opArsip = $arsip->insert(
            $dataArsip,
            null,
            function ($resp) use ($arsip, $data, $akun, $properti) {
                if ($resp[$arsip->successProperty] !== true) return;
                $inserted_data = $arsip->read($arsip->get_insertid());
                $op = $properti->created($akun, $inserted_data, 'arsip', $inserted_data['arsip_id'], $inserted_data['arsip_nama']);
                if ($op) {
                    $arsip->update($inserted_data['arsip_id'], array(
                        'arsip_properti' => $op['properti_id']
                    ));
                }
            }
        );
        $data['surat_arsip'] = $arsip->get_insertid();

        $findDokumen = $dokumen->find(array(
            'dokumen_arsip'     => $data['arsip'],
            'dokumen_isactive'  => 1
        ));

        foreach ($findDokumen as $k => $v) {
            $dupDokumen = $dokumen->duplicate($v, $data['surat_arsip']);
            if ($dupDokumen) {
                $operation = $dokumen->insert(array(
                    'dokumen_id'       => $dupDokumen['dokumen_id'],
                    'dokumen_arsip'    => $data['surat_arsip'],
                    'dokumen_nama'     => $v['dokumen_nama'],
                    'dokumen_file'     => $dupDokumen['dokumen_file'],
                    'dokumen_preview'  => $dupDokumen['dokumen_preview'],
                    'dokumen_path'     => realpath($dupDokumen['dokumen_path']),
                    'dokumen_size'     => $v['dokumen_size'], // in KB
                    'dokumen_date'     => date('Y-m-d H:i:s'),
                    'dokumen_ext'      => $v['dokumen_ext'],
                    'dokumen_mime'     => $v['dokumen_mime'],
                    'dokumen_isactive' => $v['dokumen_isactive']
                ), null, function ($responses) use ($dokumen, $data, $surat_log, $akun, $properti) {
                    if ($responses[$dokumen->successProperty] !== true) return;

                    $inserted_data = $dokumen->read($dokumen->get_insertid());
                    $op = $properti->created($akun, $inserted_data, 'dokumen', $inserted_data['dokumen_id'], $inserted_data['dokumen_nama']);
                    if ($op) {
                        $dokumen->update($inserted_data['dokumen_id'], array(
                            'dokumen_properti' => $op['properti_id']
                        ));
                    }
                });
            }
        }
        $data['surat_perihal'] = 'Data dari Arsip tercatat tgl ' . date('Y-m-d H:i:s');
        $operation = $model->insert($data, null, function ($response)
        use ($model, $data, $surat_log, $akun, $properti, $now, $stafProfil) {
            if ($response[$model->successProperty] !== true) return;

            $inserted_data = $model->read($model->get_insertid());
            // $surat_log->created($akun, $inserted_data);
            $dataLog = array(
                'surat_log_tipe' => 1,
                'surat_log_surat' => $inserted_data['surat_id'],
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );

            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
            $op = $properti->created($akun, $inserted_data, 'surat', $inserted_data['surat_id'], $inserted_data['surat_registrasi']);
            if ($op) {
                $model->update($inserted_data['surat_id'], array(
                    'surat_properti' => $op['properti_id']
                ));
            }
        });
        $operation[$model->dataProperty] = $surat_view->read($model->get_insertid());
        $this->response($operation);
    }

    function update($usePayload = true)
    {
        $surat = $this->m_surat;
        $surat_view = $this->m_surat_view;
        $properti = $this->m_properti;
        $account = $this->m_account;
        $staf = $this->m_staf_view;
        $unit = $this->m_unit;
        $surat_stack = $this->m_surat_stack;
        $korespondensi = $this->m_korespondensi;
        $korespondensi_view = $this->m_korespondensi_view;

        $now = date('Y-m-d H:i:s');
        $akun = $account->get_profile_id();
        $primary = $surat->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        $penerima = varReq('user');
        $idProp = $data['surat_properti'];

        if (varIsset($data['surat_tanggal'])) {
            $data['surat_tanggal'] = str_replace("00:00:00", date('H:i:s'), $data['surat_tanggal']);
        } else {
            unset($data['surat_tanggal']);
        }

        if (empty($idProp)) {
            $op = $properti->created($akun);
            $idProp = $op['properti_id'];
            $data['surat_properti'] = $idProp;
        }
        $properti->updated($idProp, $akun);

        $operation = $surat->update($id, $data, function ($response)
        use (
            $data,
            $surat,
            $surat_view,
            $properti,
            $account,
            $akun,
            $korespondensi,
            $staf,
            $surat_stack,
            $penerima
        ) {
            if ($response[$surat->successProperty] !== true) return;
            if (empty($data['surat_korespondensi_surat'])) {
                /*if no `korespondensi` attached on surat so it will create new and as root*/
                if (empty($data['surat_korespondensi'])) {
                    $korespondensi->insert(
                        array(
                            'korespondensi_perihal'     => $data['surat_perihal'],
                            'korespondensi_pengirim'    => $data['surat_pengirim'],
                            'korespondensi_penerima'    => $data['surat_tujuan']
                        ),
                        null,
                        function ($r_korespondensi) use ($response, $surat, $korespondensi) {
                            if ($r_korespondensi[$surat->successProperty] !== true) return;

                            $surat->update($response[$surat->dataProperty][$surat->get_primary()], array(
                                'surat_korespondensi' => $r_korespondensi[$surat->dataProperty][$korespondensi->get_primary()]
                            ));
                        }
                    );
                } else {
                    $korespondensi->update($data['surat_korespondensi'], array(
                        'surat_korespondensi_perihal'   => $data['surat_keluar_perihal'],
                        'surat_korespondensi_instansi'  => $data['surat_keluar_tujuan']
                    ));
                }
            } else {
                $korespondensi_surat = $surat->read($data['surat_id']);
                if ($korespondensi_surat) {
                    $surat->update($response[$surat->dataProperty][$surat->get_primary()], array(
                        'surat_korespondensi' => $data['surat_korespondensi'],
                        'surat_korespondensi_surat' => $data['surat_korespondensi_surat']
                    ));
                }
            }

            if (!empty($penerima)) {
                /*delete temporary first*/
                $surat_stack->delete(array(
                    'surat_stack_surat'     => $data['surat_id'],
                    'surat_stack_model'     => $surat_stack::MODEL_PENERIMA
                ), function ($response) {
                });

                foreach ($penerima as $index => $p) {
                    if (is_string($p)) {
                        $penerima_id = $p;
                    } else if (is_object($p)) {
                        $penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                    } else if (is_array($p)) {
                        $penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                    }

                    if (empty($penerima_id)) {
                        continue;
                    }
                    $lvl = $index;
                    $staf = $staf->read($penerima);

                    /*Re-insert penerima List*/
                    $penerima_stack = $surat_stack->insert(array(
                        'surat_stack_staf'    => $p,
                        'surat_stack_surat'   => $data['surat_id'],
                        'surat_stack_profil'  => $staf['staf_profil'],
                        'surat_stack_model'   => $surat_stack::MODEL_PENERIMA,
                        'surat_stack_level'   => $lvl,
                        'surat_stack_status'  => $surat_view::SETUJU_INIT
                    ));
                }
            }
        });
        $this->response($operation);
    }

    function destroy($usePayload = true)
    {
        $model = $this->m_surat;
        $primary = $model->get_primary();

        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->delete($id, function ($response) {
        });
        $this->response($operation);
    }

    function transporter()
    {
        $model = $this->m_surat;
        $korespondensi = $this->m_korespondensi;

        $surat = $model->find(array(
            'surat_unit_source' => null,
            'surat_korespondensi_surat IS NOT NULL' => null
        ), null, null, null, null, 800, 0);

        foreach ($surat as $k => $v) {
            if ($v['surat_korespondensi_surat']) {
                $kores = $model->read($v['surat_korespondensi_surat']);
                if ($kores) {
                    $unitpengirim = $kores['surat_unit'];
                    if ($unitpengirim) {
                        $model->update($v['surat_id'], array('surat_unit_source' => $unitpengirim));
                    }
                }
            }
        }
    }

    function next($section = null)
    {
        $model = $this->m_surat_view;
        $stack_koreksi = $this->m_penyetuju;
        $setting = $this->m_pengaturan;
        $surat_libnomor = $this->m_surat_libnomor;

        $surat_id = varPost('id');
        $surat_model = varPost('model');
        $surat_unit = varPost('unit');
        $beri_ulang = varPost('beri_ulang');
        $salin_nomor = varPost('salin_nomor');
        $id_salin = varPost('id_salin');

        $penyetuju = $stack_koreksi->find(
            array(
                'surat_stack_surat' => $surat_id
            ),
            false,
            false,
            true,
            array('surat_stack_level' => 'asc')
        );

        switch ($section) {
            case 'agenda':
                $next = $model->getAgenda($surat_model, $surat_unit);
                $urut = null;
                $backdate = null;
                $config = null;
                break;
            case 'registrasi':
                $next = $model->generate_code();
                $urut = null;
                $backdate = null;
                $config = null;
                break;
            case 'nomor':
                switch ($surat_model) {
                    case 2:
                        $modelSurat = $this->m_surat_keluar_view;
                        break;
                    case 4:
                        $modelSurat = $this->m_surat_ikeluar_view;
                        break;
                    default:
                        $modelSurat = $this->m_surat;
                        break;
                }
                $data = $modelSurat->read($surat_id);
                $tglsurat = $data['surat_tanggal'];
                $SuratDate = new DateTime($tglsurat);
                $suratTgl = $SuratDate->format('Y-m-d');

                if ($beri_ulang == '1') {
                    $config = array(
                        'surat_libnomor_model' => $data['surat_model'],
                        'surat_libnomor_tahun' => date('Y'),
                        'surat_libnomor_unit_pembuat' => $data['surat_unit'],
                        'surat_libnomor_jenis' => $data['surat_jenis']
                    );

                    $pat = array_merge(
                        array(
                            '#'         => $data['surat_nomor_urut'],
                            'backdate'  => $data['surat_nomor_backdate']
                        ),
                        $setting->getCompiledDataTemplate($surat_id, $data['surat_setuju_akhir_staf'], $suratTgl)
                    );

                    if ($data['surat_nomor_backdate']) {
                        if ($data['surat_model'] == 2) {
                            $data['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_keluar_backdate');
                        }
                        if ($data['surat_model'] == 4) {
                            $data['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_internal_backdate');
                        }
                    } else {
                        if ($data['surat_model'] == 2) {
                            $data['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_keluar');
                        }
                        if ($data['surat_model'] == 4) {
                            $data['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_internal');
                        }
                    }
                    $next = $this->parser->parse_string($data['surat_nomor_format'], $pat);
                    $nomor = array('nomor' => $next, 'digit' => $data['surat_nomor_urut'], 'backdate' => $data['surat_nomor_backdate'], 'config' => $config);
                } else if ($salin_nomor == '1') {
                    $dataSalin = $modelSurat->read($id_salin);
                    $tglsurat = $dataSalin['surat_tanggal'];
                    $SuratDate = new DateTime($tglsurat);
                    $tglSalin = $SuratDate->format('Y-m-d');
                    $year = $SuratDate->format('Y');

                    $config = array(
                        'surat_libnomor_model' => $dataSalin['surat_model'],
                        'surat_libnomor_tahun' => $year,
                        'surat_libnomor_unit_pembuat' => $dataSalin['surat_unit'],
                        'surat_libnomor_jenis' => $dataSalin['surat_jenis']
                    );

                    $pat = array_merge(
                        array(
                            '#'         => $dataSalin['surat_nomor_urut'],
                            'backdate'  => $dataSalin['surat_nomor_backdate']
                        ),
                        $setting->getCompiledDataTemplate($surat_id, $data['surat_setuju_akhir_staf'], $tglSalin)
                    );

                    if ($dataSalin['surat_nomor_backdate']) {
                        if ($dataSalin['surat_model'] == 2) {
                            $dataSalin['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_keluar_backdate');
                        }
                        if ($dataSalin['surat_model'] == 4) {
                            $dataSalin['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_internal_backdate');
                        }
                    } else {
                        if ($dataSalin['surat_model'] == 2) {
                            $dataSalin['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_keluar');
                        }
                        if ($dataSalin['surat_model'] == 4) {
                            $dataSalin['surat_nomor_format'] = $setting->getSettingByCode('template_nomor_surat_internal');
                        }
                    }
                    $next = $this->parser->parse_string($dataSalin['surat_nomor_format'], $pat);
                    $nomor = array('nomor' => $next, 'digit' => $dataSalin['surat_nomor_urut'], 'backdate' => $dataSalin['surat_nomor_backdate'], 'config' => null);
                } else {
                    $nomor = $model->generate_nomor($surat_id, $surat_model, end($penyetuju)['surat_stack_staf'], false, $tglsurat);
                }

                $next = $nomor['nomor'];
                $urut = $nomor['digit'];
                $backdate = $nomor['backdate'];
                $config = $nomor['config'];
                break;
            default:
                $next = $model->generate_code();
                $urut = null;
                $backdate = null;
                $config = null;
                break;
        }
        $this->response(array(
            'next' => $next,
            'urut' => $urut,
            'backdate' => $backdate,
            'config' => $config
        ));
    }

    function check_nomor()
    {
        $exist = 0;
        $model = $this->m_surat;

        $urut = varReq('urut');
        $terpusat = (int)varReq('terpusat');
        $config = varReq('config');
        $config = json_decode($config, true);

        if (!empty($urut)) {
            $filter = array(
                'IFNULL(surat_ishapus, 0) = 0' => NULL,
                'YEAR(`' . Config()->item('urutan_penomoran') . '`)' => $config['surat_libnomor_tahun'],
                'surat_nomor_urut' => $urut,
                'surat_nomor IS NOT NULL' => NULL
            );

            if ($config['surat_libnomor_model']) {
                $filter['surat_model'] = $config['surat_libnomor_model'];
            } else {
                $filter['(surat_model = "' . $model::MODEL_KELUAR . '" OR surat_model = "' . $model::MODEL_IKELUAR . '" OR surat_model = "' . $model::MODEL_KEPUTUSAN . '")'] = NULL;
            }
            if ($config['surat_libnomor_jenis']) {
                $filter['surat_jenis'] = $config['surat_libnomor_jenis'];
            }

            if ($terpusat === 0) {
                $model = $this->m_surat_view;
                if ($config['surat_libnomor_unit_pembuat']) {
                    $filter['surat_unit'] = $config['surat_libnomor_unit_pembuat'];
                }
                $filter['IFNULL(`jenis_terpusat`, 0) = 0'] = NULL;
            }

            $data = $model->read($filter);

            if (!empty($data)) {
                $exist = 1;
            }
        }

        $this->response(array(
            'exist' => (int)$exist
        ));
    }

    function simpanLokasi()
    {
        $model = $this->m_surat;
        $data = $_POST;
        $id = $data['id'];
        $lokasi = $data['lokasi'];
        $lokasi_sub = $data['lokasi_sub'];

        $operation = $model->update($id, array(
            'surat_lokasi' => $lokasi,
            'surat_lokasi_sub' => $lokasi_sub
        ));

        $this->response($operation);
    }

    function resi($section = null)
    {
        $me = $this;
        $surat_masuk = $me->m_surat_masuk_view;

        $report_model = $me->m_report;
        $account_model = $me->m_account;
        $asset_model = $me->m_asset;
        $pengaturan = $me->m_pengaturan;

        $download = varGet('download', 0);
        $user = $me->m_account->get_profile();

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;

        $surat_registrasi = null;

        switch ($section) {
            case 'surat':
                $surat_masuk_id = varGet('id');
                $records = $surat_masuk->find(array('surat_id' => $surat_masuk_id));

                $surat_registrasi = 'No. Registrasi : ' . $records[0]['surat_registrasi'];
                $hasNomor = ($records[0]['surat_nomor']) ? true : false;
                $hasPerihal = ($records[0]['surat_perihal']) ? true : false;
                break;
        }

        date_default_timezone_set("Asia/Jakarta");

        foreach ($records as $i => &$r) {
            $date = $r['surat_tanggal'];
            $createDate = new DateTime($date);
            $r['surat_tanggal'] = $createDate->format('D, d M Y H:i:s');
            $r['surat_properti_buat_tgl'] = $createDate->format('d M Y H:i');
            $r['hasNomor'] = $hasNomor;
            $r['hasPerihal'] = $hasPerihal;
        }

        $template = $pengaturan->getSettingByCode('template_cetak_resi');

        $header_mode = $report_model->getHeaderMode($template);

        if ($template !== null) {
            $template = html_entity_decode($template);
        } else {
            $template = $this->load->view($this->report_resi_template, null, true); /*$me->report_resi_template;*/
        }

        $report_data = array(
            'title' => $this->report_title_resi,
            'surat_registrasi' => $surat_registrasi,
            $header_mode[0] => $report_model->generateHeader($download, 0, $header_mode[1]),
            'records' => $records,
            'hasNomor' => $hasNomor,
            'hasPerihal' => $hasPerihal,
            'dateReport' => date('d-m-Y H:i:s'),
            'operator' => $user['staf_nama'],
            'operator_jabatan_nama' => $user['jabatan_nama']
        );

        if ($download) {
            $report_model->generateReportPdf($template, $report_data, 'report');
        } else {
            $report_model->generateReport($template, $report_data, true, false);
        }
    }

    function report()
    {
        $report_model   = $this->model('sipas/report', true);
        $account_model  = $this->model('sipas/account', true);
        $unitkerja_model = $this->model('sipas/unit', true);
        $asset_model    = $this->model('sipas/asset', true);
        $unit_model = $this->model('sipas/unit', true);
        $nama_unit = 'semua';

        $surat_rekap    = $this->m_surat_rekap_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        $model          = '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        $filter_unit = $report_model->generateSelectField($filter, $filterValue, 'surat_tanggal');

        $sorter = array();
        array_unshift($sorter, array('property' => 'unit_nama', 'direction' => 'ASC'));
        array_unshift($sorter, array('property' => 'unit_induk', 'direction' => 'ASC'));

        // for filtering data by unit id
        if ($param_unitkerja && $param_unitkerja != 'semua') {
            array_unshift($filter_unit, (object)array(
                'type'  => 'custom',
                'value' => "unit_induk ='$param_unitkerja'"
            ));
            $dataUnit = $unit_model->find_by('unit_id', $param_unitkerja);
            if ($dataUnit) {
                $nama_unit = $dataUnit[0]['unit_nama'];
            }
        }

        // $data = $surat_rekap->select(array('filter' => json_encode($filter_unit), 'sorter' => json_encode($sorter)));

        $query = "SELECT v_r_rekap_surat.unit_nama, v_r_rekap_surat.unit_kode ,v_r_rekap_surat.surat_model, v_r_rekap_surat.unit_induk, v_r_rekap_surat.unit_induk_nama, SUM(surat_jumlah) AS jumlah_surat FROM v_r_rekap_surat GROUP BY unit_nama, surat_model ORDER BY unit_nama asc, unit_nama asc";
        if ($param_unitkerja && $param_unitkerja != 'semua') {
            $query = "SELECT v_r_rekap_surat.unit_nama, v_r_rekap_surat.unit_kode ,v_r_rekap_surat.surat_model, v_r_rekap_surat.unit_induk, v_r_rekap_surat.unit_induk_nama, SUM(surat_jumlah) AS jumlah_surat FROM v_r_rekap_surat WHERE unit_induk = '$param_unitkerja' GROUP BY unit_nama, surat_model ORDER BY unit_nama asc, unit_nama asc";
        }
        $data = $this->db->query($query)->result_array();

        $template_tipe = array('imasuk' => 'surat_imasuk', 'ikeluar' => 'surat_ikeluar', 'emasuk' => 'surat_masuk', 'ekeluar' => 'surat_keluar');

        $grouped = array();
        if (count($data) > 0) {
            $total = 0;
            $temp = null;
            $tempUnitKode = null;
            foreach ($data as $kdata => &$vdata) {
                if ($vdata['unit_induk'] != null) {
                    $groupName =  $vdata['unit_induk_nama'];
                } else {
                    $groupName =  $vdata['unit_nama'];
                }
                $grouped[$groupName]['groupName'] = $groupName;
                if (!$vdata['surat_model']) {
                    continue;
                }
                if ($temp != $groupName || $tempUnitKode != $vdata['unit_kode']) {
                    $temp = $groupName;
                    $tempUnitKode = $vdata['unit_kode'];
                    $grouped[$groupName]['data'][$tempUnitKode] = [
                        'unit_nama' => $vdata['unit_nama'],
                        'unit_kode' => $tempUnitKode,
                        'imasuk' => ($vdata['surat_model'] == 'surat_imasuk') ? $vdata['jumlah_surat'] : 0,
                        'ikeluar' => ($vdata['surat_model'] == 'surat_ikeluar') ? $vdata['jumlah_surat'] : 0,
                        'emasuk' => ($vdata['surat_model'] == 'surat_masuk') ? $vdata['jumlah_surat'] : 0,
                        'ekeluar' => ($vdata['surat_model'] == 'surat_keluar') ? $vdata['jumlah_surat'] : 0,
                        'total' => $vdata['jumlah_surat'],
                    ];
                } else {
                    if ($vdata['surat_model'] == 'surat_imasuk') {
                        $grouped[$groupName]['data'][$tempUnitKode]['imasuk'] += $vdata['jumlah_surat'];
                    } else if ($vdata['surat_model'] == 'surat_ikeluar') {
                        $grouped[$groupName]['data'][$tempUnitKode]['ikeluar'] += $vdata['jumlah_surat'];
                    } else if ($vdata['surat_model'] == 'surat_masuk') {
                        $grouped[$groupName]['data'][$tempUnitKode]['emasuk'] += $vdata['jumlah_surat'];
                    } else if ($vdata['surat_model'] == 'surat_keluar') {
                        $grouped[$groupName]['data'][$tempUnitKode]['ekeluar'] += $vdata['jumlah_surat'];
                    }
                    $grouped[$groupName]['data'][$tempUnitKode]['total'] += $vdata['jumlah_surat'];
                }
            }
        } else {
            $fill    = array('no', 'unit_nama', 'imasuk', 'ikeluar', 'emasuk', 'ekeluar', 'total');
            $template = array_fill_keys($fill, $this::$default_value['nodata']);
            $template['no'] = 1;
            array_unshift($grouped, $template);
        }

        $report_title = ($download || $excel) ?  explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title' => $report_title,
            'subtitle' => $this->report_subtitle,
            'header' => $report_model->generateHeader($download, 6),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'nama_unit_induk' => $nama_unit,
            'unit' => $grouped,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            // 'operator' => $user[$account_model->field_display]
        );

        $filename = str_replace(' ', '_', $report_title) . $report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_eksternal()
    {
        $report_model   = $this->model('sipas/report', true);
        $account_model  = $this->model('sipas/account', true);
        $unitkerja_model = $this->model('sipas/unit', true);
        $asset_model    = $this->model('sipas/asset', true);

        $surat          = $this->m_surat;
        $surat_view     = $this->m_surat_view;
        $surat_masuk    = $this->m_surat_masuk_view;
        $surat_keluar   = $this->m_surat_keluar_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $model          = '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if (empty($param_unitkerja) || is_null($param_unitkerja)) {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        } else {
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null : array('unit_id' => $param_unitkerja)),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {

            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);

            $unitkerja_recs[$d_i]['no'] = $d_i + 1;
            $unitkerja_recs[$d_i]['bg_color'] = ($d_i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];

            /*agenda masuk eksternal*/
            $filter_emasuk = $time_field;
            $filter_emasuk['IFNULL(surat_isdistribusi,0) <> '] = $surat::SETUJU_INIT;
            $rec_emasuk = $surat_masuk->count_exist($filter_emasuk);
            $unitkerja_recs[$d_i]['emasuk'] = $rec_emasuk;

            /*agenda keluar eksternal*/
            $filter_ekeluar = $time_field;
            $filter_ekeluar['IFNULL(surat_setuju,0) <> '] = $surat::SETUJU_INIT;
            $rec_ekeluar = $surat_keluar->count_exist($filter_ekeluar);
            $unitkerja_recs[$d_i]['ekeluar'] = $rec_ekeluar;
        }

        $report_data = array(
            'title' => $this->report_title_eksternal,
            'subtitle' => $this->report_subtitle_eksternal,
            'header' => $report_model->generateHeader($download),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $file = $this->load->view($this->report_template_eksternal, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, 'laporan_rekap_surat_' . date('dmy'), true);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_internal()
    {
        $report_model   = $this->model('sipas/report', true);
        $account_model  = $this->model('sipas/account', true);
        $unitkerja_model = $this->model('sipas/unit', true);
        $asset_model    = $this->model('sipas/asset', true);

        $surat          = $this->m_surat;
        $surat_view     = $this->m_surat_view;
        $surat_imasuk   = $this->m_surat_imasuk_view;
        $surat_ikeluar  = $this->m_surat_ikeluar_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $model          = '';

        $param_unitkerja = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download = (bool) $download;
        $user = $account_model->get_profile();

        if (empty($param_unitkerja) || is_null($param_unitkerja)) {
            $unitkerja_recs2 = $unitkerja_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unitkerja_recs = $unitkerja_recs2['data'];
        } else {
            $unitkerja_recs = $unitkerja_model->find(
                (is_null($param_unitkerja) ? null : array('unit_id' => $param_unitkerja)),
                null,
                null,
                null,
                array(
                    'unit_nama' => 'asc'
                )
            );
        }

        if (!is_array($unitkerja_recs)) $unitkerja_recs = array();
        foreach ($unitkerja_recs as $d_i => $v) {

            $param_unitkerja = $unitkerja_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unitkerja, $filter, $filterValue);

            $unitkerja_recs[$d_i]['no'] = $d_i + 1;
            $unitkerja_recs[$d_i]['bg_color'] = ($d_i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];

            /*agenda masuk internal*/
            $filter_imasuk = $time_field;
            $filter_imasuk['IFNULL(surat_setuju,0) <> '] = $surat::SETUJU_INIT;
            $rec_imasuk = $surat_imasuk->count_exist($filter_imasuk);
            $unitkerja_recs[$d_i]['imasuk'] = $rec_imasuk;

            /*agenda keluar internal*/
            $filter_ikeluar = $time_field;
            $filter_ikeluar['IFNULL(surat_setuju,0) <> '] = $surat::SETUJU_INIT;
            $rec_ikeluar = $surat_ikeluar->count_exist($filter_ikeluar);
            $unitkerja_recs[$d_i]['ikeluar'] = $rec_ikeluar;
        }

        $report_data = array(
            'title' => $this->report_title_internal,
            'subtitle' => $this->report_subtitle_internal,
            'header' => $report_model->generateHeader($download),
            'periode' => $report_model->generatePeriode($filter, $filterValue),
            'unit' => $unitkerja_recs,
            'dateReport' => date('d-m-Y H:i:s'),
            'dateReportFormated' => date('d M Y H:i'),
            'operator' => $user[$account_model->field_display]
        );

        $file = $this->load->view($this->report_template_internal, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, 'laporan_rekap_surat_' . date('dmy'), true);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_jenis()
    {
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unit_model         = $this->model('sipas/unit', true);
        $asset_model        = $this->model('sipas/asset', true);

        $surat                      = $this->m_surat;
        $surat_rekap_by_jenis_view  = $this->m_surat_rekap_by_jenis_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download', 0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', '') ? base64_decode(varGet('title')) : '';
        $jenis_id       = varGet('jenis', 0);
        $param_unit     = varGet('unit');

        if (strtolower($download) == 'false') $download = 0;
        $download   = (bool) $download;
        $user       = $account_model->get_profile();

        if (empty($param_unit) || is_null($param_unit)) {
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        } else {
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null : array('unit_id' => $param_unit))
            );
        }

        if (!is_array($unit_recs)) $unit_recs = array();

        foreach ($unit_recs as $d_i => $v) {
            $param_unit     = $unit_recs[$d_i]['unit_id'];
            $time_field     = $report_model->generateField($param_unit, $filter, $filterValue);

            if ($jenis_id) {
                $time_field['surat_jenis'] = $jenis_id;
            }

            $time_field['surat_unit'] = $unit_recs[$d_i]['unit_id'];
            $records = $surat_rekap_by_jenis_view->find(
                $time_field,
                null,
                null,
                null,
                array(
                    'surat_tanggal' => 'asc'
                )
            );

            foreach ($records as $i => &$r) {
                $r['no']            = $i + 1;
                $r['bg_color']      = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                $r['jenis_nama']    = $r['jenis_nama'] ? $r['jenis_nama'] : $this::$default_value['nodata'];
            }
            if (!empty($records)) {
                $v['records']       = $records;
                $v['count']         = count($records);
                $unit_recs[$d_i]    = $v;
            } else {
                unset($unit_recs[$d_i]);
            }
        }

        if (!$unit_recs) {
            $unit_recs  = array();
            $unit_nama  = ($param_unit) ? $unit_model->read($param_unit)['unit_nama'] : $this::$default_value['title'];
            $unit       = array('unit_nama' => $unit_nama, 'records' => array());
            $surat      = array_fill_keys(array(
                'surat_jenis',
                'surat_unit',
                'surat_tanggal',
                'surat_model',
                'jenis_id',
                'jenis_nama',
                'unit_id',
                'unit_nama',
                'surat_jenis_count'
            ), $this::$default_value['nodata']);
            $surat['no'] = 1;
            array_unshift($unit['records'], $surat);
            array_unshift($unit_recs, $unit);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'                 => array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'                 => $report_title,
            'subtitle'              => $this->report_subtitle_jenis,
            'header'                => $report_model->generateHeader($download, 6),
            'periode'               => $report_model->generatePeriode($filter, $filterValue),
            'unit'                  => $unit_recs,
            'dateReport'            => date('d-m-Y H:i:s'),
            'dateReportFormated'    => date('d M Y H:i'),
            'operator'              => $user[$account_model->field_display]
        );

        $filename = $report_title . $report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template_jenis, null, true);
        if ($download) {
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        } else if ($excel) {
            $report_model->generateExcel($file, $report_data, $filename, true);
        } else {
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function grafik_bulanan($section = null)
    {
        $model   = $this->m_notification;
        $account = $this->m_account;

        $filter     = json_decode(varGet('filter', '[]'));
        $filter_    = ($filter) ? explode('-', $filter[0]->value) : null;

        $month      = ($filter_) ? $filter_[1] : null;
        $year       = ($filter_) ? $filter_[0] : null;

        $month      = ($month) ? $month : date('m');
        $year       = ($year) ? $year : date('Y');
        $unit       = (varGet('unit')) ? varGet('unit') : $account->get_unitkerja_id();

        $countdays = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        echo "Grafik bulanan untuk unit $unit dengan jumlah hari $countdays";

        // print_r($dateRange);
        // $weekNumber = 1;
        // $weeks = array();

        // foreach ($dateRange as $date) {
        //     $weeks[$weekNumber][] = $date->format('Y-m-d');        
        //     if ($date->format('w') == 6) {
        //         $weekNumber++;
        //     }
        // }

        // foreach ($weeks as $key => $value) {
        //     $date_ranges[$key]['start'] = array_shift($weeks[$key]);            
        //     if(empty($weeks[$key]))
        //     {
        //         $date_ranges[$key]['end'] = $date_ranges[$key]['start'];   
        //     }
        //     else{
        //         $date_ranges[$key]['end'] = array_pop($weeks[$key]);
        //     }
        // }

        // $output = array(
        //     'data'=>array()
        // );

        // $data = array();

        // $data[0]  = $model->get_count_of('disposisi', $date_ranges);
        // $data[1]  = $model->get_count_of('masuk', $date_ranges);
        // $data[2]  = $model->get_count_of('koreksi', $date_ranges);
        // $data[3]  = $model->get_count_of('koreksi_status', $date_ranges);

        // if($section == 'chart'){
        //     $output['name'] = 'chart';
        //     for ($i=0; $i <= 4; $i++) {
        //         $j=$i+1;
        //         $output['data'][$i]['week'] = 'M-'.$j;
        //         $output['data'][$i]['data1'] = $data[0]['week'.$j];
        //         $output['data'][$i]['data2'] = $data[1]['week'.$j];
        //         $output['data'][$i]['data3'] = $data[2]['week'.$j];
        //         $output['data'][$i]['data4'] = $data[3]['week'.$j];
        //     }
        // }else{
        //     $output['name'] = 'count';

        //     $output['data'][0]  = $data[0];
        //     $output['data'][1]  = $data[1];
        //     $output['data'][2]  = $data[2];
        //     $output['data'][3]  = $data[3];

        //     $output['count']  = $output['data'][0]['count']+$output['data'][1]['count']+$output['data'][2]['count']+$output['data'][3]['count'];
        // }       
        // $this->response($output);
    }

    function printApproval()
    {
        $me = $this;
        $report_model       = $this->model('sipas/report', true);
        $account_model      = $this->model('sipas/account', true);
        $unitkerja_model    = $this->model('sipas/unit', true);
        $asset_model        = $this->model('sipas/asset', true);
        $jenis_model        = $this->model('sipas/jenis', true);

        $pengaturan     = $this->m_pengaturan;
        $surat          = $this->m_surat;
        $surat_view     = $this->m_surat_view;
        $surat_stack    = $this->m_surat_stack;
        $staf_model     = $this->m_staf;

        $id = varGet('id');
        $download = false;
        $record = $surat_view->read($id);
        //find last stack
        $stack_last = $surat_stack->find(array(
            'surat_stack_surat' => $record['surat_id'],
            'surat_stack_model' => 1
        ), NULL, null, null, array(
            'surat_stack_level' => 'asc'
        ));
        //find jenis memo
        $jMemo = $jenis_model->read(array(
            'jenis_kode' => 'MO',
            'IFNULL(jenis_isaktif, 0) = 1' => NULL
        ));

        if ($stack_last) {
            end($stack_last);
            if (end($stack_last)['surat_stack_status'] === '2') {
                $granted = "Telah Disetujui";
            } else {
                $granted = "Dalam Proses Penyetujuan";
            }
            $staf = $staf_model->read(end($stack_last)['surat_stack_staf']);

            $date = $record['surat_tanggal'];
            $createDate = new DateTime($date);
            $statusDate = new DateTime(end($stack_last)['surat_stack_status_tgl']);
            $record['surat_tanggal'] = $createDate->format('d M Y');
            $tglPenyetuju = $statusDate->format('d M Y');

            $getSetting = $pengaturan->getSettings();
            $template = $pengaturan->getSettingByCode('template_cetak_penyetujuan_sk');

            $header_mode = $report_model->getHeaderMode($template);

            if ($template !== null) {
                $template = html_entity_decode($template);
            } else {
                $template = $this->load->view($this->report_template, null, true);
            }

            if ($record['surat_jenis'] == $jMemo['jenis_id']) {
                $tgl = $tglPenyetuju;
            } else {
                $tgl = $record['surat_tanggal'];
            }

            $report_data = array(
                'title' => 'Lembar Persetujuan',
                $header_mode[0] => $report_model->generateHeader($download, 0, $header_mode[1]),
                'surat_registrasi' => $record['surat_registrasi'],
                'surat_tanggal' => $record['surat_tanggal'],
                'surat_nomor' => $record['surat_nomor'],
                'surat_perihal' => $record['surat_perihal'],
                'tanggal_persetujuan' => $tgl,
                'nama_persetujuan' => $staf['staf_nama'],
                'granted' => $granted,
                'nama_perusahaan' => $getSetting['data_perusahaan_nama'],
                'qrcode' => $me->checkqrcode($record['surat_id'])
            );
        } else {
            if ($record['surat_setuju'] === '2') {
                $granted = "Telah Disetujui";
            } else {
                $granted = "Dalam Proses Penyetujuan";
            }
            $staf = $staf_model->read($record['surat_setuju_staf']);

            $date = $record['surat_tanggal'];
            $datePenye = $record['surat_setuju_tgl'];
            $createDate = new DateTime($date);
            $penyetujuDate = new DateTime($datePenye);
            $record['surat_tanggal'] = $createDate->format('d M Y');
            $record['surat_setuju_tgl'] = $penyetujuDate->format('d M Y');

            $getSetting = $pengaturan->getSettings();

            $template = $pengaturan->getSettingByCode('template_cetak_penyetujuan_sk');

            $header_mode = $report_model->getHeaderMode($template);

            if ($template !== null) {
                $template = html_entity_decode($template);
            } else {
                $template = $this->load->view($this->report_template, null, true);
            }

            if ($record['surat_jenis'] == $jMemo['jenis_id']) {
                $tgl = $record['surat_setuju_tgl'];
            } else {
                $tgl = $record['surat_tanggal'];
            }

            $report_data = array(
                'title' => 'Lembar Persetujuan',
                $header_mode[0] => $report_model->generateHeader($download, 0, $header_mode[1]),
                'surat_registrasi' => $record['surat_registrasi'],
                'surat_tanggal' => $record['surat_tanggal'],
                'surat_nomor' => $record['surat_nomor'],
                'surat_perihal' => $record['surat_perihal'],
                'tanggal_persetujuan' => $tgl,
                'nama_persetujuan' => $staf['staf_nama'],
                'granted' => $granted,
                'nama_perusahaan' => $getSetting['data_perusahaan_nama'],
                'qrcode' => $me->checkqrcode($record['surat_id'])
            );
        }
        // $file = $this->load->view($this->report_template_approval, null, true);
        if ($download) {
            $report_model->generateReportPdf($template, $report_data, 'lembar_persetujuan' . date('dmy'), true);
        } else {
            $report_model->generateReport($template, $report_data, true);
        }
    }

    function checkqrcode($id = null)
    {
        $data = base_url() . 'server.php/sipas/surat/printApproval?id=' . $id;

        $params['data']         = $data;
        $params['cacheable']    = true;
        $params['quality']      = true;
        $params['size']         = '3';

        ob_start();
        $this->ciqrcode->generate($params);
        $out = base64_encode(ob_get_contents());
        ob_end_clean();

        return "data:image/png;base64," . $out;
    }

    function generateNomor($id = null, $sModel = null)
    {
        $model = $this->m_surat_view;

        if (empty($id)) return false;

        $ops = $model->generate_nomor($id, $sModel);

        return $ops;
    }

    function batalSurat()
    {
        $surat      = $this->m_surat;
        $surat_log  = $this->m_surat_log;
        $staf       = $this->m_staf;
        $staf_view  = $this->m_staf_view;
        $account    = $this->m_account;

        $akun = $account->get_profile_id();
        $stafProfil = $staf_view->read($akun);

        $id  = varReq('id');
        $now = date('Y-m-d H:i:s');

        $operation = $surat->update(array(
            'surat_id' => $id
        ), array(
            'surat_nomor_isbatal' => 1,
            'surat_nomor_batal_staf' => $akun,
            'surat_nomor_batal_profil' => $stafProfil['staf_profil'],
            'surat_nomor_batal_tgl' => $now,
        ), function ($response) use ($surat, $now, $id, $surat_log, $akun, $stafProfil) {
            $dataLog = array(
                'surat_log_tipe' => 20,
                'surat_log_surat' => $id,
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );
            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
        });
        $operation[$surat->dataProperty] = $surat->read($id);
        $this->response($operation);
    }

    function salinNomor()
    {
        $surat_model    = $this->model('sipas/surat', true);
        $jenis_model    = $this->model('sipas/jenis', true);
        $setting        = $this->model('sipas/pengaturan', true);

        $keluar_batal_nomor     = $this->m_surat_keluar_batal_nomor_view;
        $ikeluar_batal_nomor    = $this->m_surat_ikeluar_batal_nomor_view;

        $surat_model    = varReq('model');
        $jenis          = varReq('jenis');
        $unit           = varReq('unit');
        $filter         = json_decode(varGet('filter', '[]'));
        $sorter         = json_decode(varGet('sort', '[]'));

        $data_jenis = $jenis_model->read($jenis);
        $jenisTerpusat = (int)$data_jenis['jenis_terpusat'];
        switch ($surat_model) {
            case 2:
                $models = $keluar_batal_nomor;
                $nomorJenisTerpusat = $setting->getSettingByCode('template_nomor_keluar_perjenis_terpusat');
                $nomorJenisUnit = $setting->getSettingByCode('template_nomor_keluar_perjenis_unit');
                $nomorUnit = $setting->getSettingByCode('template_nomor_keluar_perunit');
                if ($jenisTerpusat !== 0) {
                    if ($jenisTerpusat === 1) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                    } else if ($jenisTerpusat === 2) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_unit',
                            'value'     => $unit,
                            'type'      => 'exact'
                        ));
                    }
                } else {
                    if ($nomorJenisTerpusat) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                    } else if ($nomorJenisUnit) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_unit',
                            'value'     => $unit,
                            'type'      => 'exact'
                        ));
                    } else if ($nomorUnit) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_unit',
                            'value'     => $unit,
                            'type'      => 'exact'
                        ));
                    }
                }
                break;
            case 4:
                $models = $ikeluar_batal_nomor;
                $nomorJenisTerpusat = $setting->getSettingByCode('template_nomor_internal_perjenis_terpusat');
                $nomorJenisUnit = $setting->getSettingByCode('template_nomor_internal_perjenis_unit');
                $nomorUnit = $setting->getSettingByCode('template_nomor_internal_perunit');
                if ($jenisTerpusat !== 0) {
                    if ($jenisTerpusat === 1) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                    } else if ($jenisTerpusat === 2) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_unit',
                            'value'     => $unit,
                            'type'      => 'exact'
                        ));
                    }
                } else {
                    if ($nomorJenisTerpusat) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                    } else if ($nomorJenisUnit) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_jenis',
                            'value'     => $jenis,
                            'type'      => 'exact'
                        ));
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_unit',
                            'value'     => $unit,
                            'type'      => 'exact'
                        ));
                    } else if ($nomorUnit) {
                        array_unshift($filter, (object)array(
                            'property'  => 'surat_unit',
                            'value'     => $unit,
                            'type'      => 'exact'
                        ));
                    }
                }
                break;
        }

        $records = $models->select(array(
            'limit'     => varGet('limit'),
            'start'     => varGet('start'),
            'filter'    => json_encode($filter),
            'sort'      => $sorter
        ));

        $this->response($records);
    }

    function batasReupload()
    {
        $batas_reupload = $this->m_surat_batas_reupload_view;

        $staf_id        = varReq('staf_id');
        $surat_jenis    = varReq('jenis');
        $surat_unit     = varReq('unit');
        $surat_model    = varReq('model');

        $count_surat = $batas_reupload->count_exist(array(
            'surat_buat_staf'    => $staf_id,
            'surat_jenis'        => $surat_jenis,
            'surat_unit'         => $surat_unit,
            'surat_model'        => $surat_model
        ));

        $this->response(array(
            'count_surat' => $count_surat,
        ));
    }

    function musnahSurat()
    {
        $surat      = $this->m_surat;
        $surat_log  = $this->m_surat_log;
        $staf       = $this->m_staf;
        $staf_view  = $this->m_staf_view;
        $account    = $this->m_account;

        $akun = $account->get_profile_id();
        $stafProfil = $staf_view->read($akun);

        $id  = varReq('id');
        $now = date('Y-m-d H:i:s');

        $operation = $surat->update(array(
            'surat_id' => $id
        ), array(
            'surat_ismusnah' => 1,
            'surat_musnah_staf' => $akun,
            'surat_musnah_profil' => $stafProfil['staf_profil'],
            'surat_musnah_tgl' => $now,
        ), function ($response) use ($surat, $now, $id, $surat_log, $akun, $stafProfil) {
            $dataLog = array(
                'surat_log_tipe' => 22,
                'surat_log_surat' => $id,
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );
            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
        });
        $operation[$surat->dataProperty] = $surat->read($id);
        $this->response($operation);
    }

    function arsipSurat()
    {
        $surat      = $this->m_surat;
        $surat_log  = $this->m_surat_log;
        $staf       = $this->m_staf;
        $staf_view  = $this->m_staf_view;
        $account    = $this->m_account;

        $akun = $account->get_profile_id();
        $stafProfil = $staf_view->read($akun);

        $id  = varReq('id');
        $now = date('Y-m-d H:i:s');

        $operation = $surat->update(array(
            'surat_id' => $id
        ), array(
            'surat_isarsip' => 1,
            'surat_arsip_staf' => $akun,
            'surat_arsip_profil' => $stafProfil['staf_profil'],
            'surat_arsip_tgl' => $now,
        ), function ($response) use ($surat, $now, $id, $surat_log, $akun, $stafProfil) {
            $dataLog = array(
                'surat_log_tipe' => 23,
                'surat_log_surat' => $id,
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_tgl' => $now
            );
            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
        });
        $operation[$surat->dataProperty] = $surat->read($id);
        $this->response($operation);
    }

    function batalDistribusi()
    {
        $surat      = $this->m_surat;
        $surat_log  = $this->m_surat_log;
        $staf       = $this->m_staf;
        $staf_view  = $this->m_staf_view;
        $account    = $this->m_account;
        $disposisi  = $this->m_disposisi;
        $disposisi_masuk  = $this->m_disposisi_masuk;

        $queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

        $akun = $account->get_profile_id();
        $stafProfil = $staf_view->read($akun);

        $id  = varReq('id');
        $unit  = varReq('surat_unit');
        $pesan  = varReq('pesan');
        $now = date('Y-m-d H:i:s');

        $operation = $surat->update(array(
            'surat_id' => $id
        ), array(
            'surat_distribusi_iscabut' => 1,
            'surat_distribusi_cabut_tgl' => $now,
            'surat_distribusi_cabut_staf' => $akun,
            'surat_distribusi_cabut_profil' => $stafProfil['staf_profil'],
            'surat_distribusi_cabut_pesan' => $pesan,
            'surat_selesai_tgl' => NULL,
            'surat_selesai_staf' => NULL,
            'surat_selesai_profil' => NULL,
        ), function ($response) use ($surat, $now, $id, $surat_log, $akun, $stafProfil, $pesan, $disposisi_masuk) {
            $dataLog = array(
                'surat_log_tipe' => 24,
                'surat_log_surat' => $id,
                'surat_log_staf' => $akun,
                'surat_log_profil' => $stafProfil['staf_profil'],
                'surat_log_catatan' => $pesan,
                'surat_log_tgl' => $now
            );
            $operation_log = $surat_log->insert($dataLog, null, function ($response) {
            });
        });

        $disposisi_surat = $disposisi->update(array(
            'disposisi_surat' => $id,
            'disposisi_cabut_tgl IS NULL' => null,
            'IFNULL(disposisi_model, 0) = 0' => null
        ), array(
            'disposisi_cabut_tgl' => $now,
            'disposisi_cabut_staf' => $akun

        ));

        $query = "UPDATE disposisi_masuk SET disposisi_masuk_cabut_tgl = '" . $now . "', disposisi_masuk_cabut_staf = '" . $akun . "', disposisi_masuk_cabut_profil = '" . $stafProfil['staf_profil'] . "' WHERE disposisi_masuk_cabut_tgl IS NULL AND disposisi_masuk_disposisi IN (SELECT disposisi_id FROM disposisi WHERE disposisi_surat = '" . $id . "' AND IFNULL(disposisi_model, 0) = 0)";
        $result = $this->db->query($query);

        $query1 = "UPDATE disposisi_masuk SET disposisi_masuk_berkas_status = '4', disposisi_masuk_berkas_status_tgl = '" . $now . "', disposisi_masuk_berkas_status_staf = '" . $akun . "', disposisi_masuk_berkas_status_profil = '" . $stafProfil['staf_profil'] . "', disposisi_masuk_berkas_komentar = 'Distribusi telah dibatalkan' WHERE disposisi_masuk_cabut_tgl IS NOT NULL AND disposisi_masuk_berkas_status = '1' AND disposisi_masuk_disposisi IN (SELECT disposisi_id FROM disposisi WHERE disposisi_surat = '" . $id . "' AND IFNULL(disposisi_model, 0) = 0)";
        $result1 = $this->db->query($query1);

        $query2 = "UPDATE disposisi_masuk SET disposisi_masuk_ispengingat = '0', disposisi_masuk_pengingat_tgl = '" . $now . "', disposisi_masuk_pengingat_staf = '" . $akun . "', disposisi_masuk_pengingat_profil = '" . $stafProfil['staf_profil'] . "' WHERE disposisi_masuk_ispengingat = '1' AND disposisi_masuk_disposisi IN (SELECT disposisi_id FROM disposisi WHERE disposisi_surat = '" . $id . "' AND IFNULL(disposisi_model, 0) = 0)";
        $result2 = $this->db->query($query2);

        /*penerima disposisi masuk*/
        $dmasuk = "SELECT dm.disposisi_masuk_staf FROM disposisi_masuk dm LEFT JOIN disposisi d ON d.disposisi_id = dm.disposisi_masuk_disposisi WHERE d.disposisi_surat = '" . $id . "'";
        $dmasuk_query = $this->db->query($dmasuk);
        $dataDisposisiMasuk = $dmasuk_query->result_array();

        if (Config()->item('queueServer')['host']) {
            foreach ($dataDisposisiMasuk as $key => $p) {
                $data_redis = array(
                    'type' => 'Surat-Staf',
                    'staf_id' => $p['disposisi_masuk_staf'],
                    'jabatan_id' => null,
                    'unit_id' => null,
                    'data' => $p['disposisi_masuk_staf']
                );
                $addJobStaf = create_job($queueTubeRedis, $data_redis);
            }
            $data_redis = array(
                'type' => 'Surat-Unit',
                'staf_id' => null,
                'jabatan_id' => null,
                'unit_id' => $unit,
                'data' => $unit
            );
            $addJobUnit = create_job($queueTubeRedis, $data_redis);
        }

        $operation[$surat->dataProperty] = $surat->read($id);
        $this->response($operation);
    }
}
