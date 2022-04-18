<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Surat_internal extends Base_Controller {

    public $report_template = 'sipas/surat/list';
    public $resi_template = 'sipas/surat/resi_keluar';
    public $report_subtitle = 'Semua surat yang dikeluarkan oleh Instansi pengguna SIPAS';

    public $report_template_internal = 'sipas/surat/internal/internal_keluar';
    public $report_template_internal_unprocessed = 'sipas/surat/internal/internal_keluar_unprocessed';
    public $report_title_internal_unprocessed = 'Laporan Agenda Surat Keluar Internal Belum Disetujui';
    public $report_title_internal = 'Laporan Agenda Surat Keluar Internal Disetujui';
    public $report_subtitle_internal = 'Semua surat yang dikeluarkan oleh Instansi pengguna SIPAS';

    public $report_resi_template = 'sipas/surat/resi';
    public $report_resi_title = 'Tanda Terima Surat';
    public $delimiter = array('<!--[',']-->'); // we use valid html tag to avoid invalid parser on front end

    public function __construct() {
        parent::__construct();
        // $this->m_fitur                  = $this->model('sipas/fitur',                   true);
        // $this->m_akses                  = $this->model('sipas/akses',                   true);
        // $this->m_akses_view             = $this->model('sipas/akses_view',              true);
        $this->m_user                   = $this->model('sipas/akun',                    true);
        $this->m_account                = $this->model('sipas/account',                 true);
             
        $this->m_surat                  = $this->model('sipas/surat',                   true);
        $this->m_disposisi              = $this->model('sipas/disposisi',               true);
        $this->m_disposisi_penerima     = $this->model('sipas/disposisi_masuk',         true);
        $this->m_surat_staf_view     = $this->model('sipas/disposisi_masuk_view',    true);
         
        $this->m_surat_internal_view    = $this->model('sipas/surat_internal_view',     true);
        $this->m_korespondensi          = $this->model('sipas/korespondensi',           true);
        $this->m_unit                   = $this->model('sipas/unit',                    true);
        $this->m_unit_cakupan           = $this->model('sipas/unit_cakupan',            true);
        $this->m_unit_cakupan_view      = $this->model('sipas/unit_cakupan_view',       true);
        $this->m_staf                = $this->model('sipas/staf',                 true);
        $this->m_staf_view           = $this->model('sipas/staf_view',            true);
        $this->m_addons                 = $this->model('sipas/addons_config',           true);

        $this->m_surat_stack            = $this->model('sipas/surat_stack',             true);
        $this->m_surat_stack_view       = $this->model('sipas/surat_stack_view',        true);
    }

    public function index() {
        $this->read();
    }

    public function read() {
        $me = $this;
        
        $surat_internal_view  = $me->m_surat_internal_view;        
        $scope    = $me->m_unit_cakupan_view;
        $account  = $me->m_account->get_profile();

        $hariini    = date('Y-m-d H:i:s');
        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        $scopeid = varGet('scope');

        $unit = $scope->find(array(
            'unit_cakupan_jabatan' => $account['staf_jabatan']
        ));

        if (varGetHas('id') || varGetHas('surat_internal_id')) {
            $id = varGet('id', varGet('surat_internal_id'));
            $record = $surat_internal_view->read($id);
            $me->response_record($record);
        }else{
                array_unshift($filter, (object)array(
                    'type'  => 'exact',
                    'field' => 'surat_unitpengirim',
                    'value' => $scopeid
                ));
            

            $records = $surat_internal_view->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filter'    => json_encode($filter),
                'sorter'    => $sorter,
            ));
            // $records['debug'] = $surat_internal_view->get_lastquery();
            $this->response($records);
        }
    }

    public function create($usePayload = true) {
        $me = $this;

        $surat          = $me->m_surat;
        $surat_ikeluar = $me->m_surat_ikeluar;
        $surat_ikeluar_view = $me->m_surat_ikeluar_view;

        $now = date('Y-m-d H:i:s');
        $data = (array)($usePayload ? getRequestPayload() : varPost());

        $account_id = $me->m_account->get_profile_id();
        $data['surat_ikeluar_tanggal'] = $now;

        $operation = $surat_ikeluar->insert($data, null, function ($response) use (
            $me, $data, $account_id, $now, $surat_ikeluar, $surat) {
            if ($response[$surat_ikeluar->successProperty] !== true) return;

            $surat->insert(
                array(
                    'surat_internal'                    => $surat_ikeluar->get_insertid(),
                    'surat_registrasi'                  => $surat->generate_code(),
                    'surat_pembuatan_tanggal'           => varIsset($data['surat_ikeluar_tanggal']),
                    'surat_pembuatan_staf'           => $account_id,
                    'surat_status_distribusi'           => $surat::DISTRIBUSI_INIT,
                    'surat_status_distribusi_tanggal'   => $now,
                    'surat_status_distribusi_staf'   => $account_id,
                    'surat_status_penyetujuan'          => $surat::PENYETUJUAN_INIT,
                    'surat_status_penyetujuan_tanggal'  => $now,
                    'surat_status_penyetujuan_staf'  => $account_id,
                    'surat_status_selesai'              => $surat::SELESAI_INIT,
                    'surat_status_selesai_tanggal'      => $now,
                    'surat_status_selesai_staf'      => $account_id
                ),
                null, function ($r_surat) {}
            );
        });

        $operation[$surat_ikeluar->dataProperty] = $me->m_surat_ikeluar_view->read($surat_ikeluar->get_insertid());
        $this->response($operation);
    }

    public function update($usePayload = true) {
        $me = $this;
        $surat                  = $me->m_surat;
        $surat_stack_penerima   = $me->m_surat_stack;
        $surat_stack_penyetuju  = $me->m_surat_stack;
        $koreksi                = $me->m_disposisi;
        $model                  = $me->m_surat_ikeluar;
        $addons                 = $me->m_addons;
        $suratInternalDepPenerima   = $me->m_surat_imasuk;
        $suratInternalDepPegawai    = $me->m_surat_imasuk_penerima;

        $now        = date('Y-m-d H:i:s');
        $primary    = $model->get_primary();

        $payload = getRequestPayload();
        $data = (array)($usePayload ? $payload : varPost());
        $penerima = varReq('penerima');
        $penyetuju = varReq('penyetuju');
        $temporary = varReq('temporary');
        $template = varReq('template');

        $staf_view = $me->m_staf_view;
        $surat_staf_view = $me->m_surat_staf_view;

        $pegawai = $me->m_staf;
        $account = $me->m_account->get_profile();
        $account_id = $me->m_account->get_profile_id();
        
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);
        if($data['surat_ikeluar_unitpengirim'] == null){
            $data['surat_ikeluar_unitpengirim'] = $account['staf_unit'];
        }
        if(varIsset($data['surat_ikeluar_tanggal'])){ $data['surat_ikeluar_tanggal'] = str_replace("00:00:00", date('H:i:s'), $data['surat_ikeluar_tanggal']); }else{ unset($data['surat_ikeluar_tanggal']);}

        if($template){
            $operation = $model->update($id, $data, function($response){});
        }
        else{
            /*do logic for applying data here*/
            $this->parser->set_delimiters($this->delimiter[0], $this->delimiter[1]);
            $pegTTD = $pegawai->getUrlImage('ttd', $account_id);
            
            $penyetuju_rec = varIsset($penyetuju) ? $penyetuju : null;
            
            $penAK = varIsset($penyetuju_rec) ? end($penyetuju_rec) : null;
            $staf_penyetuju = $me->m_staf_view->read($penAK);

            if(!is_array($penyetuju_rec)) $penyetuju_rec = array();
            
            if($penyetuju_rec){
                foreach ($penyetuju_rec as $i => $p) {
                    $penyetuju_rec[$i] = $me->m_staf_view->read($p);
                }
            }
            
            $set = array_merge(array(
                    'nomor_surat' => $data['surat_ikeluar_nomor'],
                    'dari' => $account['jabatan_nama'],
                    'perihal' => $data['surat_ikeluar_perihal'],
                    'tanggal_pembuatan' => date('d-M-Y'),
                    'tanggal_sekarang' => date('d-M-Y'),
                    'nama_pembuat' => $account['staf_nama'],
                    'jabatan_pembuat' => $account['jabatan_nama'],
                    'unit_pembuat' => $account['unit_nama'],
                    'nama_penyetuju_terakhir' => $staf_penyetuju['staf_nama'],
                    'unit_penyetuju_terakhir' => $staf_penyetuju['unit_nama'],
                    'jabatan_penyetuju_terakhir' => $staf_penyetuju['jabatan_nama'],
                    'tanda_tangan_penyetuju_terakhir' => ''
                ), array('penyetuju' => $penyetuju_rec)
            );

            $formatPattern = $this->parser->parse_string(varIsset($data['surat_ikeluar_template']), $set);
            $this->parser->set_delimiters('{', '}');
            $data['surat_ikeluar_isi'] = $formatPattern;

            /*operation update Surat internal*/
            $operation = $model->update($id, $data, 
                function ($response) use ($me, $data, $id, $now, $model, $account_id, $penerima, 
                    $penyetuju, $addons, $suratInternalDepPenerima, $suratInternalDepPegawai, $temporary, 
                    $surat, $surat_stack_penerima, $surat_stack_penyetuju, $staf_view, 
                    $surat_staf_view, $koreksi) {

                if ($response[$model->successProperty] !== true) return;

                $r_surat = $surat->update(
                    array(
                        'surat_internal' => $id
                    ),
                    array(
                        'surat_jenis'       => varIsset($data['jenis_id']),
                        'surat_sifat'       => varIsset($data['sifat_id']),
                        'surat_prioritas'   => varIsset($data['prioritas_id']),
                        'surat_kelas'       => varIsset($data['kelas_id']),
                        'surat_registrasi'  => varIsset($data['surat_registrasi']),
                        'surat_useretensi'  => varIsset($data['surat_useretensi']),
                        'surat_retensi_tgl'     => varIsset($data['surat_retensi_tgl'])
                    )
                );
                
                /*Surat Internal unit Penerima Insert*/
                if(!is_array($penerima)){
                    $penerima = array();
                }

                if(!empty($penerima)){
                    /*delete temporary first*/
                    $surat_stack_penerima->delete(array('surat_stack_penerima_surat'=>$data['surat_ikeluar_surat']), function ($response){});
                    
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
                        $lvl = $index+1;
                        $pegawai = $staf_view->read($p);
                        $suratpegawai = $surat_staf_view;

                        /*Penerima List*/
                        $opst = $surat_stack_penerima->insert(array(
                            'surat_stack_penerima_surat'   => $data['surat_ikeluar_surat'],
                            'surat_stack_penerima_staf' => $p,
                            'surat_stack_penerima_level'   => $lvl,
                            'surat_stack_penerima_status'  => $suratpegawai::BACA_ISBACA
                        ));

                        if(!$temporary){
                            /*logic untuk membedakan unit yang akan dimasukkan berdasarkan agenda disini*/
                            $find_internal_penerima = $suratInternalDepPenerima->find(array(
                                'surat_imasuk_unitpenerima'     => $pegawai['staf_unit'],
                                'surat_imasuk_surat_ikeluar'    => $id,
                                'surat_imasuk_approval_status'  => 0
                            ));

                            if($find_internal_penerima){
                                $suratInternalDepPegawai->insert(
                                    array(
                                        'surat_imasuk_penerima_staf'  => $pegawai['staf_id'],
                                        'surat_imasuk_penerima_sidp'     => $find_internal_penerima[0]['surat_imasuk_id']
                                    )
                                );
                            }else{
                                $suratInternalDepPenerima->insert(
                                    array(
                                        'surat_imasuk_unitpenerima'       => $pegawai['staf_unit'],
                                        'surat_imasuk_surat_ikeluar'  => $id,
                                        'surat_imasuk_approval_status' => 0
                                    ),null,
                                    function($response)
                                    use($me, $suratInternalDepPenerima, $pegawai, $suratInternalDepPegawai){
                                        if($response[$suratInternalDepPenerima->successProperty] !== true) return;
                                        $primary = $suratInternalDepPenerima->get_primary();
                                        $internal_unit_penerima_id = array_key_exists($primary, $response[$suratInternalDepPenerima->dataProperty]) ? $response[$suratInternalDepPenerima->dataProperty][$primary] : null;

                                        $suratInternalDepPegawai->insert(
                                            array(
                                                'surat_imasuk_penerima_staf'  => $pegawai['staf_id'],
                                                'surat_imasuk_penerima_sidp'     => $internal_unit_penerima_id
                                            )
                                        );
                                    }
                                );
                                if(empty($penyetuju)){
                                    // echo "empty penyetuju";
                                    /*updating status surat*/
                                    $surat_id = $data['surat_id'];
                                    $surat->update(array(
                                        'surat_id' => $surat_id), array(
                                        'surat_status_distribusi'   => $surat::DISTRIBUSI_DISTRIBUTE,
                                        'surat_status_distribusi_tanggal' => $now,
                                        'surat_status_distribusi_staf' => $pegawai['staf_id'],
                                        'surat_status_penyetujuan'  => $surat::PENYETUJUAN_APPROVE,
                                        'surat_status_penyetujuan_tanggal' => $now,
                                        'surat_status_penyetujuan_staf' => $pegawai['staf_id'],
                                        'surat_status_selesai'      => $surat::SELESAI_DONE,
                                        'surat_status_selesai_tanggal' => $now,
                                        'surat_status_selesai_staf' => $pegawai['staf_id']
                                    ));
                                }
                            }
                        }
                    }
                }

                /*Koreksi insert*/
                $koreksi_operation = $koreksi->find(array(
                    'koreksi_surat' => $r_surat[$model->dataProperty][$me->m_surat->get_primary()]
                ));

                /* check not empty penyetuju then process */
                if(!empty($penyetuju)){
                    if($temporary){
                        /*delete temporary first*/
                        $surat_stack_penyetuju->delete(array('surat_stack_penyetuju_surat'=>$data['surat_ikeluar_surat']), function ($response){});

                        foreach ($penyetuju as $index => $p) {
                            if (is_string($p)) {
                                $penyetuju_id = $p;
                            } else if (is_object($p)) {
                                $penyetuju_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                            } else if (is_array($p)) {
                                $penyetuju_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                            }

                            if (empty($penyetuju_id)) {
                                continue;
                            }
                            $lvl = $index+1;
                            $suratpegawai = $surat_staf_view;

                            /*Penyetuju List*/
                            $opst = $surat_stack_penyetuju->insert(array(
                                'surat_stack_penyetuju_surat'   => $r_surat[$model->dataProperty][$me->m_surat->get_primary()],
                                'surat_stack_penyetuju_staf' => $penyetuju_id,
                                'surat_stack_penyetuju_level'   => $lvl,
                                'surat_stack_penyetuju_status'  => $suratpegawai::BACA_INIT,
                                'surat_stack_penyetuju_urut'    => array_key_exists('surat_stack_penyetuju_urut', $data) ? $data['surat_stack_penyetuju_urut'] : 0
                            ));
                        }
                    }else{
                        $dpk = $koreksi->insert(
                            array(
                                'koreksi_tanggal'     => $now,
                                'koreksi_pengirim'    => $account_id,
                                'koreksi_surat'       => $r_surat[$model->dataProperty][$me->m_surat->get_primary()],
                                'koreksi_isbaca'      => $koreksi::READ
                            ),null,
                            function($response) 
                            use($me, $penyetuju, $now, $account_id, $model, $addons, $data, $r_surat, 
                                $temporary, $koreksi, $surat_stack_penyetuju, $surat_staf_view, $surat){
                                if($response[$model->successProperty] !== true) return;

                                if(!is_array($penyetuju)){
                                    $penyetuju = array();
                                }
                                $koreksi_id = $koreksi->get_insertid();

                                /* Update Surat */
                                if(!$temporary){
                                    $surat_id = $data['surat_id'];
                                    $surat->update(array(
                                        'surat_id' => $surat_id), array(
                                        'surat_status_distribusi'   => $surat::DISTRIBUSI_INIT,
                                        'surat_status_distribusi_tanggal' => $now,
                                        'surat_status_distribusi_staf' => $account_id,
                                        'surat_status_penyetujuan'  => $surat::PENYETUJUAN_PROCESS,
                                        'surat_status_penyetujuan_tanggal' => $now,
                                        'surat_status_penyetujuan_staf' => $account_id
                                    ));
                                }
                                /*delete temporary first*/
                                $surat_stack_penyetuju->delete(array('surat_stack_penyetuju_surat'=>$data['surat_ikeluar_surat']), function ($response){});

                                foreach ($penyetuju as $index => $p) {
                                    if (is_string($p)) {
                                        $penyetuju_id = $p;
                                    } else if (is_object($p)) {
                                        $penyetuju_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
                                    } else if (is_array($p)) {
                                        $penyetuju_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
                                    }

                                    if (empty($penyetuju_id)) {
                                        continue;
                                    }
                                    $lvl = $index+1;
                                    $suratpegawai = $surat_staf_view;

                                    /*Penyetuju List*/
                                    $opst = $surat_stack_penyetuju->insert(array(
                                        'surat_stack_penyetuju_surat'   => $r_surat[$model->dataProperty][$me->m_surat->get_primary()],
                                        'surat_stack_penyetuju_staf' => $penyetuju_id,
                                        'surat_stack_penyetuju_level'   => $lvl,
                                        'surat_stack_penyetuju_status'  => $suratpegawai::BACA_INIT,
                                        'surat_stack_penyetuju_urut'    => array_key_exists('surat_stack_penyetuju_urut', $data) ? $data['surat_stack_penyetuju_urut'] : 0
                                    ));

                                    if(!$temporary){
                                        if($data['surat_stack_penyetuju_urut']){
                                            if($lvl === 1){
                                                $me->m_disposisi_penerima->insert(array(
                                                    'koreksi_penerima_koreksi'  => $koreksi_id,
                                                    'koreksi_penerima_staf'  => $p,
                                                    'koreksi_penerima_isbaca'   => $suratpegawai::BACA_INIT
                                                ));
                                                
                                                /*notif for email*/
                                                // $addons->email($tipe, $penyetuju_id, $data);
                                                // $addons->sms($tipe, $penyetuju_id, $data);
                                            }    
                                        }else{
                                            $op_koreksi = $me->m_disposisi_penerima->insert(array(
                                                'koreksi_penerima_koreksi'  => $koreksi_id,
                                                'koreksi_penerima_staf'  => $p,
                                                'koreksi_penerima_isbaca'   => $suratpegawai::BACA_INIT
                                            ),null, function($res) use ($me){});

                                            /*notif for email*/
                                            // $addons->email($tipe, $penyetuju_id, $data);
                                            // $addons->sms($tipe, $penyetuju_id, $data);
                                        }
                                    }
                                }
                            }
                        );
                    }
                }
            });
        }
        $this->response($operation);
    }

    public function destroy($usePayload = true) {
        $me = $this;
        $model = $me->m_surat_ikeluar;
        $primary = $me->m_surat_ikeluar->get_primary();

        $payload = getRequestPayload();
        $data = (array)($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $me->m_surat_ikeluar->delete($id, function ($response){});
        $this->response($operation);
    }

    function disposisi(){
        $dpo = $me->m_disposisi->insert(
            array(
                'disposisi_tanggal'     => $now,
                'disposisi_staf'    => $account_id,
                'disposisi_surat'       => $r_surat[$model->dataProperty][$me->m_surat->get_primary()],
            ),null,
            function($response) use($me, $penerima, $now, $account_id, $model, $addons, $data, $tipe){
                if($response[$model->successProperty] !== true) return;

                if(!is_array($penerima)){
                    $penerima = array();
                }
                $disposisi_id = $me->m_disposisi->get_insertid();
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
                    $suratpegawai = $me->m_surat_staf_view;
                    $me->m_disposisi_penerima->insert(array(
                        'disposisi_penerima_disposisi'  => $disposisi_id,
                        'disposisi_penerima_penerima'   => $p,
                        'disposisi_penerima_status'     => $suratpegawai::BACA_INIT
                    ));

                    // add ons
                    $addons->email($tipe, $penerima_id, $data);
                    $addons->sms($tipe, $penerima_id, $data);
                }
            }
        );
    }

    function internal_report(){
        $report_model       = $this->model('sipas/report',true);
        $account_model      = $this->model('sipas/account',true);
        $unit_model    = $this->model('sipas/unit',true);
        $asset_model        = $this->model('sipas/asset',true);

        $surat = $this->m_surat;
        $koreksi = $this->m_disposisi;
        $internal_view = $this->m_surat_ikeluar_view;
        $surat_stack_penyetuju = $this->m_surat_stack;
        $surat_stack_penyetuju_view = $this->m_surat_stack_view;
        $internal_unit_penerima_view = $this->m_surat_imasuk_view;

        $filter = varGet('filter');
        $filterValue = varGet('value');
        $tipeid =  varGet('tipe');
        $download = varGet('download',0);
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

        if(empty($param_unit) || is_null($param_unit)){
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        }else{
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null: array('unit_id'=>$param_unit)),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }
        
        $tipe_nama = $internal_tipe->find(array('itipe_id' => $tipeid));
        
        if($tipe_nama[0]['itipe_id'] === '0'){
            $nama_tipe_v = '';
        }else{
            $nama_tipe_v = ' ('.$tipe_nama[0]['itipe_nama'].')';
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            unset($time_field['pembuat_unit']);
            if($tipeid){
                $time_field['surat_ikeluar_tipe'] = $tipeid;
            }
            $time_field['surat_ikeluar_unitpengirim'] = $unit_recs[$d_i]['unit_id'];
            $time_field[$surat->field_approval_lookup.' <> '.$surat::PENYETUJUAN_INIT] = NULL;
            $records = $internal_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_ikeluar_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;

                $date = $r['surat_tanggal'];
                $createDate = new DateTime($date);
                $r['surat_tanggal'] = $createDate->format('d M Y');

                $date2 = $r['surat_pembuatan_tanggal'];
                $createDate2 = new DateTime($date2);
                $r['surat_pembuatan_tanggal'] = $createDate2->format('d M Y H:i');

                /*ambil nama dr model internal tipe*/
                $nama_tipe = $internal_tipe->find(
                    array('itipe_id' => $r['surat_ikeluar_tipe'])
                    ,null,null,null,null);    
                $r['itipe_nama'] = $nama_tipe[0]['itipe_nama'];

                /*get internal departemen penerima*/
                $get_penerima = $internal_unit_penerima_view->find(array(
                    'surat_imasuk_surat_ikeluar' => $r['surat_ikeluar_id']
                    ),
                    null, null, null, null);
                $unit_nama[] = array();

                if($get_penerima){
                    foreach ($get_penerima as $j => $set_unit) {
                        if(!empty($set_unit['unit_nama'])){
                            array_push($unit_nama, array('unit_nama' => $set_unit['unit_nama']));
                        }
                    }
                    foreach ($unit_nama as $key => $value) {
                        if(empty($value)){
                            unset($unit_nama[$key]);
                        }
                    }
                    $r['penerima'] = array_map("unserialize", array_unique(array_map("serialize", $unit_nama)));
                }

                /*status surat internal*/
                $r['status'] = '';
                if ($r['surat_status_penyetujuan'] == $surat::PENYETUJUAN_APPROVE){
                    $r['status'] = $surat::PENYETUJUAN_APPROVE_V;
                }elseif ($r['surat_status_penyetujuan'] == $surat::PENYETUJUAN_DECLINE){
                    $r['status'] = $surat::PENYETUJUAN_DECLINE_V;
                }

                /*rentang penyetujuan dari pengiriman penyetujuan pertama sampai tanggal status penyetuju terakhir*/
                /*from koreksi.koreksi_tanggal sampai surat_stack_penyetuju.surat_stack_penyetuju_status_tanggal*/
                // $first_penyetuju = $surat_stack_penyetuju_view->get_first_penyetuju($r['surat_ikeluar_surat']);
                $first_penyetuju = $koreksi->get_first_koreksi($r['surat_ikeluar_surat']);
                $last_penyetuju = $surat_stack_penyetuju_view->get_latest_penyetuju($r['surat_ikeluar_surat']);
                if($last_penyetuju && $first_penyetuju){
                    $date3 = $first_penyetuju['koreksi_tanggal'];
                    $createDate3 = new DateTime($date3);
                    $mulai_kirim = $createDate3->format('d M Y H:i');

                    $date4 = $last_penyetuju['surat_stack_penyetuju_status_tanggal'];
                    $createDate4 = new DateTime($date4);
                    $selesai_penyetujuan = $createDate4->format('d M Y H:i');

                    $count_days = date_diff($createDate3, $createDate4);
                    $days = $count_days->format('a');
                    $days = ($days<1)? 1: $days;

                    $r['rentang_penyetujuan'] = $mulai_kirim.' sampai '.$selesai_penyetujuan.' ('.$days.' hari)';
                }                
            }
            if(!empty($records)){
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs[$d_i] = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        // echo "<pre>";
        // print_r($unit_recs);

        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'=> $this->report_title_internal.$nama_tipe_v,
            'subtitle'=> $this->report_subtitle_internal,
            'header'=>$report_model->generateHeader($download),
            'periode'=>$report_model->generatePeriode($filter, $filterValue),
            'unit'=>$unit_recs,
            'dateReport'=>date('d-m-Y H:i:s'),
            'operator'=>$user[$account_model->field_display]
        );

        $file = $this->load->view($this->report_template_internal, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, 'laporan_internal_keluar_disetujui_'.date('dmy'), true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }
 
    function internal_report_unprocessed(){
        $report_model       = $this->model('sipas/report',true);
        $account_model      = $this->model('sipas/account',true);
        $unit_model   = $this->model('sipas/unit',true);
        $asset_model        = $this->model('sipas/asset',true);

        $surat = $this->m_surat;
        $internal_view = $this->m_surat_ikeluar_view;
        $surat_stack_penyetuju = $this->m_surat_stack;
        $surat_stack_penyetuju_view = $this->m_surat_stack_view;
        $internal_unit_penerima_view = $this->m_surat_imasuk_view;

        $filter = varGet('filter');
        $filterValue = varGet('value');
        $download = varGet('download',0);
        $tipeid =  varGet('tipe');
        
        $param_unit = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download = (boolean) $download;
        $user = $account_model->get_profile();

        if(empty($param_unit) || is_null($param_unit)){
            $unit_recs2 = $unit_model->select(array(
                'filter'    => json_encode($filter),
                'sorter'    => 'unit_nama',
            ));
            $unit_recs = $unit_recs2['data'];
        }else{
            $unit_recs = $unit_model->find(
                (is_null($param_unit) ? null: array('unit_id'=>$param_unit)),
                null,null,null, array(
            'unit_nama'=>'asc'
            ));
        }

        $tipe_nama = $internal_tipe->find(array('itipe_id' => $tipeid));
        if($tipe_nama[0]['itipe_id'] === '0'){
        $nama_tipe_v = '';   
        }else{
        $nama_tipe_v = ' ('.$tipe_nama[0]['itipe_nama'].')';
        }

        if(!is_array($unit_recs)) $unit_recs = array();
        foreach ($unit_recs as $d_i => $v) {
            
            $param_unit = $unit_recs[$d_i]['unit_id'];
            $time_field = $report_model->generateField($param_unit, $filter, $filterValue);
            unset($time_field['pembuat_unit']);
            if($tipeid){
                $time_field['surat_ikeluar_tipe'] = $tipeid;
            }
            $time_field['surat_ikeluar_unitpengirim'] = $unit_recs[$d_i]['unit_id'];
            $time_field[$surat->field_approval_lookup.' = '.$surat::PENYETUJUAN_PROCESS] = NULL;
            $records = $internal_view->find(
                $time_field 
                ,null,null,null, array(
                'surat_ikeluar_tanggal'=>'asc'
            ));

            foreach ($records as $i => &$r) {
                $r['no'] = $i + 1;

                $date = $r['surat_tanggal'];
                $createDate = new DateTime($date);
                $r['surat_tanggal'] = $createDate->format('d M Y');

                $date2 = $r['surat_pembuatan_tanggal'];
                $createDate2 = new DateTime($date2);
                $r['surat_pembuatan_tanggal'] = $createDate2->format('d M Y H:i');

                /*ambil nama dr model internal tipe*/
                $nama_tipe = $internal_tipe->find(
                    array('itipe_id' => $r['surat_ikeluar_tipe'])
                    ,null,null,null,null);    
                if($nama_tipe){
                    $r['itipe_nama'] = $nama_tipe[0]['itipe_nama'];
                }

                /*get internal departemen penerima*/
                $get_penerima = $internal_unit_penerima_view->find(array(
                    'surat_imasuk_surat_ikeluar' => $r['surat_ikeluar_id'],
                    'surat_imasuk_unitpenerima' => $r['surat_ikeluar_unitpengirim']),
                    null, null, null, null);
                $unit_nama[] = array();
                if($get_penerima){
                    foreach ($get_penerima as $j => $set_unit) {
                        if(!empty($set_unit['unit_nama'])){
                            array_push($unit_nama, array('unit_nama' => $set_unit['unit_nama']));
                        }
                    }
                    foreach ($unit_nama as $key => $value) {
                        if(empty($value)){
                            unset($unit_nama[$key]);
                        }
                    }
                    $r['penerima'] = array_map("unserialize", array_unique(array_map("serialize", $unit_nama)));
                }

                /*status surat internal*/
                $r['status'] = '';
                if ($r['surat_status_penyetujuan'] == $surat::PENYETUJUAN_INIT){
                    $r['status'] = $surat::PENYETUJUAN_INIT_V;
                }elseif ($r['surat_status_penyetujuan'] == $surat::PENYETUJUAN_PROCESS){
                    $r['status'] = $surat::PENYETUJUAN_PROCESS_V;
                }

                /*get status penyetujuan terakhir*/
                $penyetuju = $surat_stack_penyetuju_view->find(array(
                    'surat_stack_penyetuju_surat' => $r['surat_ikeluar_surat']),
                null, null, null,array(
                    'surat_stack_penyetuju_level' => 'ASC'));
                if($penyetuju){
                    $r['penyetuju'][] = array();
                    foreach ($penyetuju as $key => $value) {
                        $r['penyetuju'][$key]['staf_nama'] = $value['staf_nama'];
                        $r['penyetuju'][$key]['jabatan_nama'] = $value['jabatan_nama'];
                        $r['penyetuju'][$key]['unit_nama'] = $value['unit_nama'];
                        $r['penyetuju'][$key]['komentar'] = $value['surat_stack_penyetuju_komentar'];
                        if($value['surat_stack_penyetuju_status'] == $surat_stack_penyetuju_view::READ_UNREAD){
                            $r['penyetuju'][$key]['status'] = $surat_stack_penyetuju_view::READ_UNREAD_VALUE;
                        }else if($value['surat_stack_penyetuju_status'] == $surat_stack_penyetuju_view::APPROVAL_INIT){
                            $r['penyetuju'][$key]['status'] = $surat_stack_penyetuju_view::APPROVAL_INIT_VALUE;
                        }else if($value['surat_stack_penyetuju_status'] == $surat_stack_penyetuju_view::APPROVAL_APPROVED){
                            $r['penyetuju'][$key]['status'] = $surat_stack_penyetuju_view::APPROVAL_APPROVED_VALUE;
                        }else if($value['surat_stack_penyetuju_status'] == $surat_stack_penyetuju_view::APPROVAL_DECLINED){
                            $r['penyetuju'][$key]['status'] = $surat_stack_penyetuju_view::APPROVAL_DECLINED_VALUE;
                        }
                    }
                }
            }
            if(!empty($records)){
                $v['records'] = $records;
                $v['count'] = count($records);
                $unit_recs[$d_i] = $v;
            }else{
                unset($unit_recs[$d_i]);
            }
        }

        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'=> $this->report_title_internal_unprocessed.$nama_tipe_v,
            'subtitle'=> $this->report_subtitle_internal,
            'header'=>$report_model->generateHeader($download),
            'periode'=>$report_model->generatePeriode($filter, $filterValue),
            'unit'=>$unit_recs,
            'dateReport'=>date('d-m-Y H:i:s'),
            'operator'=>$user[$account_model->field_display]
        );

        $file = $this->load->view($this->report_template_internal_unprocessed, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, 'laporan_internal_keluar_belum_disetujui_'.date('dmy'), true);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function next($section = null, $tipe = null, $scope = null){
        $me = $this;
        $model = $this->m_surat_ikeluar_view;
        $unit = $this->m_unit;
        $pegawai = $me->m_account->get_profile();
        $section = strtolower($section);

        $next = null;
        switch ($section) {
            case 'agenda':
                if($scope == NULL){
                    $dep = $pegawai['unit_id'];
                }
                else{
                    $deps = $unit->read($scope);
                    $dep = $deps['unit_id'];
                }
                
                if($tipe !== "null"){
                    $next = $model->max('surat_ikeluar_agenda', array(
                        'surat_ikeluar_unitpengirim'    => $dep,
                        'surat_ikeluar_tipe'            => $tipe
                    ));
                    $next = $next + 1;
                }
                else{
                    $next = "";
                }
                break;

            case 'nomor':
                $next = $model->generate_code($tipe, $scope);
                break;
            default:
                $next = "Data Tidak Tersedia";
                break;
        }
        $this->response(array(
            'next'=>$next
        ));
    }

    function get_latest_penyetuju($id = '96a066712f494d4b9ce700604f5985a5'){
        $surat_stack_penyetuju_view = $this->m_surat_stack_view;
        $a = $surat_stack_penyetuju_view->get_latest_penyetuju($id);
        
    }
}