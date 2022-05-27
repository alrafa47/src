<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Surat_stack extends Base_Controller
{

    protected $message = array();

    public $report_template = 'sipas/surat/internal/internal_keluar_penerima_list';
    public $report_title = 'Laporan Penerima Surat Internal Keluar';
    public $report_subtitle = 'Laporan Ini Menginformasikan Penerima Surat';

    public function __construct()
    {
        parent::__construct();

        $this->m_account    = $this->model('sipas/account',    true);
        $this->m_pengaturan = $this->model('sipas/pengaturan', true);

        $this->m_surat_stack        = $this->model('sipas/surat_stack',         true);
        $this->m_surat_stack_view   = $this->model('sipas/surat_stack_view',    true);
        $this->m_staf               = $this->model('sipas/staf',                true);
        $this->m_staf_view          = $this->model('sipas/staf_view',           true);
        $this->m_model_staf         = $this->model('sipas/staf_view',           true);
        $this->m_surat_view         = $this->model('sipas/surat_view',          true);

        $this->m_disposisi_masuk_netral_view  = $this->model('sipas/disposisi_masuk_netral_view',   true);

        $this->m_surat_stack_koreksi_view     = $this->model('sipas/surat_stack_koreksi_view',      true);
        $this->m_surat_stack_disposisi_view   = $this->model('sipas/surat_stack_disposisi_view',    true);
        $this->m_surat_stack_petikan_view     = $this->model('sipas/surat_stack_petikan_view',      true);

        $this->m_report     = $this->model('sipas/report',         true);
    }

    public function index()
    {
        $this->read();
    }

    public function read()
    {
        $model   = $this->m_surat_stack_view;
        $pegawai = $this->m_model_staf;

        $id = varGet('id');

        if (!empty($id)) {
            $record = $model->read($id);
            $records = array('success' => (bool) $record, 'record' => $record);
        } else {
            $records = $model->select(array(
                'limit' => varGet('limit'),
                'start' => varGet('start'),
                'filters' => varGet('filter'),
                'sort' => varGet('sort')
            ));
        }
        // $records['debug'] = $model->get_lastquery();
        $this->response($records);
    }

    public function disposisi($section = null)
    {
        $id     = varGet('id');
        $model  = $this->m_surat_stack_disposisi_view;

        $filter = json_decode(varGet('filter', '[]'));

        if (!empty($id)) {
            $record = $model->read($id);
            $records = array('success' => (bool) $record, 'record' => $record);
        } else {
            switch ($section) {
                case 'tembusan':
                    array_unshift($filter, (object)array(
                        'type'  => 'exact',
                        'field' => 'surat_stack_istembusan',
                        'value' => 1
                    ));
                    break;
                case 'penerima':
                    array_unshift($filter, (object)array(
                        'type'  => 'custom',
                        'value' => 'IFNULL(surat_stack_istembusan, 0) = 0'
                    ));
                    break;
                case 'penerimakeluar':
                    array_unshift($filter, (object)array(
                        'type'  => 'custom',
                        'value' => 'surat_stack_surat ="' . varReq("surat_id") . '" AND surat_stack_model = 0 AND IFNULL(surat_stack_istembusan, 0) = 0'
                    ));
                    break;
                default:
                    array_unshift($filter, (object)array(
                        'type'  => 'custom',
                        'value' => 'surat_stack_model = 0 AND surat_stack_istembusan = 1'
                    ));
                    break;
            }

            $records = $model->select(array(
                'limit'     => varGet('limit'),
                'start'     => varGet('start'),
                'filters'   => json_encode($filter),
                'sort'      => varGet('sort')
            ));
        }

        $this->response($records);
    }

    public function koreksi()
    {
        $model  = $this->m_surat_stack_koreksi_view;
        $id     = varGet('id');

        if (!empty($id)) {
            $record = $model->read($id);
            $records = array('success' => (bool) $record, 'record' => $record);
        } else {
            $records = $model->select(array(
                'limit' => varGet('limit'),
                'start' => varGet('start'),
                'filters' => varGet('filter'),
                'sort' => varGet('sort')
            ));
        }
        // $records['debug'] = $model->get_lastquery();
        $this->response($records);
    }

    public function petikan()
    {
        $model  = $this->m_surat_stack_petikan_view;
        $id     = varGet('id');

        if (!empty($id)) {
            $record = $model->read($id);
            $records = array('success' => (bool) $record, 'record' => $record);
        } else {
            $records = $model->select(array(
                'limit' => varGet('limit'),
                'start' => varGet('start'),
                'filters' => varGet('filter'),
                'sort' => varGet('sort')
            ));
        }
        // $records['debug'] = $model->get_lastquery();
        $this->response($records);
    }

    public function create($usePayload = true)
    {
        $model = $this->m_surat_stack;
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $operation = $model->insert($data, null, function ($response) {
        });
        $this->response($operation);
    }

    public function update($usePayload = true)
    {
        $model = $this->m_surat_stack;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data, function ($response) {
        });
        $this->response($operation);
    }

    public function destroy($usePayload = true)
    {
        $model = $this->m_surat_stack;
        $primary = $model->get_primary();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());
        $id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->delete($id, function ($response) {
        });
        $this->response($operation);
    }

    public function tujuan_penerima($id = null, $tipe = null)
    {
        if (!is_null($id)) {
            $surat_id = $id;
        } else {
            $surat_id = varGet('surat_id');
        }
        $type = $tipe ? $tipe : varGet('type');
        $stack = $this->m_surat_stack_disposisi_view;
        $surat = $this->m_surat_view;
        $disposisi_masuk  = $this->m_disposisi_masuk_netral_view;
        $staf_view = $this->m_staf_view;

        //result to be served for client
        $data = array();
        $dataSrt = $surat->read($surat_id);

        // left source
        if ($dataSrt['surat_model'] == 6) {
            if ($type == 'tembusan') {
                $dataStack = $stack->find(array(
                    'surat_stack_surat' => $surat_id,
                    'surat_stack_istembusan' => 1,
                ), null, null, null, array('unit_nama' => 'ASC'));

                $dataDisposisiMasuk = $disposisi_masuk->find(
                    array(
                        'disposisi_induk' => null,
                        'disposisi_masuk_istembusan' => 1,
                        'surat_korespondensi_surat' => $surat_id
                    ),
                    null,
                    null,
                    null,
                    array('disposisi_tgl' => 'ASC')
                );
            } else {
                $dataStack = $stack->find(array(
                    'surat_stack_surat' => $surat_id,
                    'surat_stack_istembusan <> "1"' => null,
                ), null, null, null, array('unit_nama' => 'ASC'));

                $dataDisposisiMasuk = $disposisi_masuk->find(
                    array(
                        'disposisi_induk' => null,
                        'disposisi_masuk_istembusan <> "1"' => null,
                        'surat_korespondensi_surat' => $surat_id
                    ),
                    null,
                    null,
                    null,
                    array('disposisi_tgl' => 'ASC')
                );
            }
        } else {
            $dataStack = $stack->find(array(
                'surat_stack_surat' => $surat_id,
            ), null, null, null, array('unit_nama' => 'ASC'));

            $dataDisposisiMasuk = $disposisi_masuk->find(
                array(
                    'disposisi_induk' => null,
                    'surat_korespondensi_surat' => $surat_id
                ),
                null,
                null,
                null,
                array('disposisi_tgl' => 'ASC')
            );
        }

        //right source

        // only push stack to dataServe where stack isnt in dataDisposisiMasuk
        foreach ($dataStack as $i => $val) {
            if (!empty($dataDisposisiMasuk)) {
                $a = array_column($dataDisposisiMasuk, 'disposisi_masuk_staf');

                if (!in_array($val['surat_stack_staf'], $a)) {
                    $b = array(
                        'surat_stack_id' => $val['surat_stack_id'],
                        'staf_id' => $val['surat_stack_staf'],
                        'staf_image_preview' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $val['surat_stack_staf'],
                        'staf_nama' => $val['staf_nama'],
                        'jabatan_id' => $val['jabatan_id'],
                        'jabatan_nama' => $val['jabatan_nama'],
                        'unit_id' => $val['unit_id'],
                        'unit_nama' => $val['unit_nama'],
                        'surat_unit_id' => $val['unit_id'],
                        'surat_unit_nama' => $val['unit_nama'],
                        'surat_stack_isterima'   => 0,
                        'surat_stack_terima_tgl' => null,
                        'surat_stack_istembusan' => $val['surat_stack_istembusan'],
                        'surat_stack_isbaca'   => null,
                        'surat_stack_baca_tgl' => null,
                        'surat_stack_isterus'   => null,
                        'surat_stack_terus_tgl' => null,
                        'surat_model' => $val['surat_model'],
                        'surat_model_sub' => $val['surat_model_sub']
                    );

                    array_push($data, $b);
                }
            } else {
                $b = array(
                    'surat_stack_id' => $val['surat_stack_id'],
                    'staf_id' => $val['surat_stack_staf'],
                    'staf_image_preview' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $val['surat_stack_staf'],
                    'staf_nama' => $val['staf_nama'],
                    'jabatan_id' => $val['jabatan_id'],
                    'jabatan_nama' => $val['jabatan_nama'],
                    'unit_id' => $val['unit_id'],
                    'unit_nama' => $val['unit_nama'],
                    'surat_unit_id' => $val['unit_id'],
                    'surat_unit_nama' => $val['unit_nama'],
                    'surat_stack_isterima'   => 0,
                    'surat_stack_terima_tgl' => null,
                    'surat_stack_istembusan' => $val['surat_stack_istembusan'],
                    'surat_stack_isbaca'   => null,
                    'surat_stack_baca_tgl' => null,
                    'surat_stack_isterus'   => null,
                    'surat_stack_terus_tgl' => null,
                    'surat_model' => $val['surat_model'],
                    'surat_model_sub' => $val['surat_model_sub']
                );

                array_push($data, $b);
            }
        }

        // now push all dataDisposisiMasuk to dataServe and skip from dataServer
        if (!empty($dataDisposisiMasuk)) {
            foreach ($dataDisposisiMasuk as $i => $val) {
                $a = array_column($data, 'staf_id');

                if (!in_array($val['disposisi_masuk_staf'], $a)) {
                    $b = array(
                        'surat_stack_id' => $val['disposisi_masuk_staf'], // just for filling the id//
                        'staf_image_preview' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $val['disposisi_masuk_staf'],
                        'staf_nama' => $val['disposisi_masuk_penerima_nama'],
                        'jabatan_id' => $val['disposisi_masuk_penerima_jabatan_id'],
                        'jabatan_nama' => $val['disposisi_masuk_penerima_jabatan_nama'],
                        'unit_id' => $val['disposisi_masuk_penerima_unit_id'],
                        'unit_nama' => $val['disposisi_masuk_penerima_unit_nama'],
                        'surat_unit_id' => $val['unit_id'],
                        'surat_unit_nama' => $val['unit_nama'],
                        'surat_stack_isterima'   => 1,
                        'surat_stack_terima_tgl' => $val['disposisi_tgl'],
                        'surat_stack_istembusan' => $val['disposisi_masuk_istembusan'],
                        'surat_stack_isbaca'   => $val['disposisi_masuk_isbaca'],
                        'surat_stack_baca_tgl' => $val['disposisi_masuk_baca_tgl'],
                        'surat_stack_isterus'   => $val['disposisi_masuk_isterus'],
                        'surat_stack_terus_tgl' => $val['disposisi_masuk_terus_tgl'],
                        'surat_model' => $val['surat_model'],
                        'surat_model_sub' => $val['surat_model_sub'],
                        'disposisi_masuk_cabut_tgl' => $val['disposisi_masuk_cabut_tgl']
                    );
                    array_push($data, $b);
                }
            }
        }

        foreach ($data as $i => $val) {
            if ($val['surat_model_sub'] == $surat::MODEL_SUB_KOLEKTIF) {
                $dataSurat = $surat->read(array(
                    'surat_unit' => $val['unit_id'],
                    'surat_korespondensi_surat' => $surat_id
                ));
            } else {
                $dataSurat = $surat->read(array(
                    'surat_unit' => $val['unit_id'],
                    'surat_korespondensi_surat' => $surat_id
                ));
            }
            if ($dataSurat) {
                $data[$i]['surat_setuju'] = $dataSurat['surat_setuju'];
                $data[$i]['surat_setuju_tgl'] = $dataSurat['surat_setuju_tgl'];
                $data[$i]['surat_setuju_staf'] = $dataSurat['surat_setuju_staf'];
                $data[$i]['surat_setuju_profil'] = $dataSurat['surat_setuju_profil'];
            }
        }

        if (!is_null($id)) {
            return $data;
        }
        $this->response(array(
            'data'  => $data,
            'count' => count($data)
        ));
    }

    public function tujuan_tembusan()
    {
        $surat_id = varGet('surat_id');
        $disposisi_masuk  = $this->m_disposisi_masuk_netral_view;

        $data = $disposisi_masuk->find(
            array(
                'disposisi_induk' => null,
                'disposisi_surat' => $surat_id
            ),
            null,
            null,
            null,
            array('disposisi_tgl' => 'ASC')
        );

        $this->response(array(
            'data'  => $data,
            'count' => count($data)
        ));
    }

    public function tujuan_tembusan_stack()
    {
        $surat_id = varGet('surat_id');
        $stack  = $this->m_surat_stack_disposisi_view;

        $data = $stack->find(array(
            'surat_stack_surat' => $surat_id
        ));

        $this->response(array(
            'data'  => $data,
            'count' => count($data)
        ));
    }

    public function penerima_stack()
    {
        $surat_id = varGet('surat_id');
        $stack  = $this->m_surat_stack_disposisi_view;
        $data = $stack->find(array(
            'surat_stack_surat' => $surat_id,
            '(surat_stack_istembusan IS NULL OR surat_stack_istembusan = 0)' => NULL,
            'surat_stack_model' => 0
        ));

        $this->response(array(
            'data'  => $data,
            'count' => count($data)
        ));
    }

    public function tujuan_tembusansk_stack()
    {
        $surat_id = varGet('surat_id');
        $stack  = $this->m_surat_stack_disposisi_view;

        $data = $stack->find(array(
            'surat_stack_surat' => $surat_id,
            'surat_stack_istembusan' => 1
        ));

        $this->response(array(
            'data'  => $data,
            'count' => count($data)
        ));
    }

    public function print_tujuan_penerima()
    {
        $me = $this;

        $surat_id       = varGet('surat_id');
        $type           = varGet('type');
        $download       = varGet('download', 0);
        if (strtolower($download) == 'false') $download = 0;
        $download       = (bool) $download;

        $account        = $me->m_account;
        $surat_view     = $me->m_surat_view;
        $stack          = $me->m_surat_stack_disposisi_view;
        $pengaturan     = $me->m_pengaturan;

        $unit_records   = array();
        $user           = $account->get_profile();

        $dataSurat = $surat_view->read($surat_id);
        $dataStack = $me->tujuan_penerima($surat_id, $type);

        /*grouping penerima by unit*/
        $temp_unit_key      = 0;
        $temp_surat_unit_id = null;
        foreach ($dataStack as $i => $r) {
            /*templating receiver status*/
            $is_terima  = $r['surat_stack_isterima'];
            $is_baca    = $r['surat_stack_isbaca'];
            $is_terus   = $r['surat_stack_isterus'];

            $terima_tgl = $r['surat_stack_terima_tgl'];
            $baca_tgl   = $r['surat_stack_baca_tgl'];
            $terus_tgl  = $r['surat_stack_terus_tgl'];

            $tpl = "";

            if ($is_terima != 1) {
                $tpl = "Belum menerima";
            }
            if ($is_terima == 1) {
                $terimaDate = new DateTime($terima_tgl);
                $terimaDateDisplay = $terimaDate->format('d M Y H:i');

                $tpl = "Diterima pada " . $terimaDateDisplay;
            }
            if ($is_baca == 1) {
                $bacaDate = new DateTime($baca_tgl);
                $bacaDateDisplay = $bacaDate->format('d M Y H:i');

                $tpl = "Dibaca pada " . $bacaDateDisplay;
            }
            if ($is_terus == 1) {
                $terusDate = new DateTime($terus_tgl);
                $terusDateDisplay = $terusDate->format('d M Y H:i');

                $tpl = "Diteruskan pada " . $terusDateDisplay;
            }

            $r['surat_stack_status'] = "<span style='font-style:normal;'>(" . $tpl . ")</span>";
            $r['penerima_nama'] = $r['staf_nama'] ? $r['staf_nama'] : '(Tidak ada nama)';
            $r['penerima_jabatan_nama'] = $r['jabatan_nama'] ? $r['jabatan_nama'] : '(Tidak ada jabatan)';
            $r['penerima_unit_nama'] = $r['unit_nama'] ? $r['unit_nama'] : '(Tidak ada unit)';

            $unit_records[$temp_unit_key]['surat_setuju']       = '';
            $unit_records[$temp_unit_key]['surat_setuju_tgl']   = '';
            $unit_records[$temp_unit_key]['surat_setuju_staf']  = '';
            $unit_records[$temp_unit_key]['surat_setuju_profil'] = '';

            if ($temp_surat_unit_id == $r['surat_unit_id']) {
                $unit_records[$temp_unit_key]['surat_unit_id']      = $temp_surat_unit_id;
                $unit_records[$temp_unit_key]['surat_unit_nama']    = $r['surat_unit_nama'];
                $unit_records[$temp_unit_key]['unit_id']            = $r['unit_id'];
                $unit_records[$temp_unit_key]['unit_nama']          = $r['unit_nama'];
                $unit_records[$temp_unit_key]['records'][$i]        = $r;

                if (isset($r['surat_setuju'])) {
                    $unit_records[$temp_unit_key]['surat_setuju']       = $r['surat_setuju'];
                    $unit_records[$temp_unit_key]['surat_setuju_tgl']   = $r['surat_setuju_tgl'];
                    $unit_records[$temp_unit_key]['surat_setuju_staf']  = $r['surat_setuju_staf'];
                    $unit_records[$temp_unit_key]['surat_setuju_profil'] = $r['surat_setuju_profil'];
                }
            } else {
                $temp_surat_unit_id = $r['surat_unit_id'];

                $unit_records[$temp_unit_key]['surat_unit_id']      = $temp_surat_unit_id;
                $unit_records[$temp_unit_key]['surat_unit_nama']    = $r['surat_unit_nama'];
                $unit_records[$temp_unit_key]['unit_id']            = $r['unit_id'];
                $unit_records[$temp_unit_key]['unit_nama']          = $r['unit_nama'];
                $unit_records[$temp_unit_key]['records'][$i]        = $r;

                if (isset($r['surat_setuju'])) {
                    $unit_records[$temp_unit_key]['surat_setuju']       = $r['surat_setuju'];
                    $unit_records[$temp_unit_key]['surat_setuju_tgl']   = $r['surat_setuju_tgl'];
                    $unit_records[$temp_unit_key]['surat_setuju_staf']  = $r['surat_setuju_staf'];
                    $unit_records[$temp_unit_key]['surat_setuju_profil'] = $r['surat_setuju_profil'];
                }
                $temp_unit_key++;
            }
        }

        /*templating unit status*/
        foreach ($unit_records as $k => $v) {
            $tpl = "Belum menerima";

            if ($v['surat_setuju']) {
                $surat_setuju       = $v['surat_setuju'];
                $surat_setuju_tgl   = $v['surat_setuju_tgl'];
                $surat_setuju_staf  = $v['surat_setuju_staf'];
                $surat_setuju_profil = $v['surat_setuju_profil'];

                $setujuDate = new DateTime($surat_setuju_tgl);
                $setujuDateDisplay = $setujuDate->format('d M Y H:i');

                if ($surat_setuju == 2) {
                    $tpl = "Diterima pada " . $setujuDateDisplay;
                } else if ($surat_setuju == 4) {
                    $tpl = "Ditolak pada " . $setujuDateDisplay;
                }
            }

            $unit_records[$k]['surat_setuju'] = "<span style='font-style:normal;'>(" . $tpl . ")</span>";

            if (!$v['surat_unit_nama']) {
                $unit_records[$k]['surat_unit_nama'] = '(Tidak ada unit)';
            };
        }

        $template = $pengaturan->getSettingByCode('template_cetak_penerima_ikeluar');

        $header_mode = $me->m_report->getHeaderMode($template);

        if ($template !== null) {
            $template = html_entity_decode($template);
        } else {
            $template = $me->load->view($me->report_template, null, true);
        }

        $date = $dataSurat['surat_tanggal'];
        $createDate = new DateTime($date);
        $dataSurat['surat_tanggal'] = $createDate->format('d M Y');

        $surat_record = array(
            'surat_registrasi'  => $dataSurat['surat_registrasi'],
            'surat_nomor'       => $dataSurat['surat_nomor'],
            'surat_tanggal'     => $dataSurat['surat_tanggal'],
            'surat_perihal'     => $dataSurat['surat_perihal']
        );

        /*generate data */
        $report_data = array_merge(array(
            'title'                 => $me->report_title,
            'subtitle'              => $me->report_subtitle,
            'unit'                  => $unit_records,
            'dateReportFormated'    => date('d M Y H:i'),
            'operator'              => $user[$account->field_display],
            $header_mode[0]         => $me->m_report->generateHeader($download, 0, $header_mode[1])
        ), $surat_record);

        if ($download) {
            $me->m_report->generateReportPdf($template, $report_data, true);
        } else {
            $me->m_report->generateReport($template, $report_data, true);
        }
    }
}
