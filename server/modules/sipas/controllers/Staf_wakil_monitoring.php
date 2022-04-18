<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Staf_wakil_monitoring extends Base_Controller {

    protected $message = array();

	public function __construct(){
        parent::__construct();
        $this->load->model(array(
            'sipas/staf',
            'sipas/staf_wakil',
            'sipas/staf_wakil_view'
        ));
        $this->m_staf_view                      = $this->model('sipas/staf_view',                   true);
        $this->m_surat_staf_view                = $this->model('sipas/disposisi_masuk_view',        true);
        $this->m_disposisi_aktif_view           = $this->model('sipas/disposisi_aktif_view',        true);
        $this->m_disposisi_nonaktif_view        = $this->model('sipas/disposisi_nonaktif_view',     true);
        $this->m_disposisi                      = $this->model('sipas/disposisi',                   true);
        $this->m_disposisi_view                 = $this->model('sipas/disposisi_view',              true);
        $this->m_account                        = $this->model('sipas/account',                     true);
        $this->m_surat                          = $this->model('sipas/surat',                       true);
        $this->m_staf_wakil                     = $this->model('sipas/staf_wakil',                  true);
        $this->m_staf_wakil_view                = $this->model('sipas/staf_wakil_view',             true);
    
        $this->m_koreksi                        = $this->model('sipas/koreksi',                     true);
        $this->m_surat_masuk_penerima           = $this->model('sipas/surat_masuk_penerima_view',   true);
        // $this->m_surat_konsep_penerima_view     = $this->model('sipas/koreksi_penerima_view',       true);
    }

    public function index(){
        $this->read();
    }

    public function read($section = null, $type = null){
        $me             = $this;
        $surat          = $me->m_surat;
        $disposisi      = $this->m_disposisi;
        $koreksi        = $this->m_koreksi;
        $staf_model     = $me->m_staf_view;

        $user           = $me->m_account->get_profile();
        $asistensi_rec  = $this->m_staf_wakil->read(array(
            'staf_wakil_asisten' => $user['user_staf']
        ));

        $pegawai = null;
        if($asistensi_rec){
            $pegawai = $asistensi_rec['staf_wakil_staf'];
         }

        $filter     = json_decode(varGet('filter', '[]'));
        $sorter     = json_decode(varGet('sort', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);

        switch ($section) {
            case 'masuk':
                array_unshift($filter, (object)array(
                    'property'  =>'disposisi_penerima_penerima',
                    'value'     => $pegawai,
                    'type'      =>'exact'
                ));
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'IFNULL('.$disposisi->field_retract.', 0) = '.$disposisi::ACTIVE,
                ));
                array_unshift($filter, (object)array(
                    'property'  => $surat->field_distribusi_lookup,
                    'value'     => $surat::DISTRIBUSI_DISTRIBUTE,
                    'type'      =>'exact'
                ));
                array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'IFNULL('.$disposisi->field_isdisposisi.', 0) = '.$disposisi::NOTDISPOSISI
                    ));

                $filter = json_encode($filter);
                $records = $me->m_surat_masuk_penerima->select(array(
                    'limit'     => $limit,
                    'start'     => $start,
                    'filter'    => $filter,
                    'sorter'    => $sorter,
                ));
            break;

            case 'disposisi':
                array_unshift($filter, (object)array(
                    'property'  =>'disposisi_penerima_penerima',
                    'value'     => $pegawai,
                    'type'      =>'exact'
                ));
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'IFNULL('.$disposisi->field_retract.', 0) = '.$disposisi::ACTIVE,
                ));
                array_unshift($filter, (object)array(
                    'property'  => $surat->field_distribusi_lookup,
                    'value'     => $surat::DISTRIBUSI_DISTRIBUTE,
                    'type'      =>'exact'
                ));
                array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'IFNULL('.$disposisi->field_isdisposisi.', 0) = '.$disposisi::ISDISPOSISI
                    ));

                $filter = json_encode($filter);
                $records = $me->m_surat_staf_view->select(array(
                    'limit' => $limit,
                    'start' => $start,
                    'filter' => $filter,
                    'sorter' => $sorter
                ));
            break;

            case 'riwayat':
                // array_unshift($filter, (object)array(
                //     'type'      =>'custom',
                //     'value'     => 'IFNULL('.$disposisi->field_retract.', 0) = '.$disposisi::ACTIVE,
                // ));
                array_unshift($filter, (object)array(
                    'type'      => 'exact',
                    'property'  => 'disposisi_staf',
                    'value'     => $pegawai
                ));
                array_unshift($filter, (object)array(
                        'type'      =>'custom',
                        'value'     => 'IFNULL('.$disposisi->field_isdisposisi.', 0) = '.$disposisi::ISDISPOSISI
                    ));

                $filter = json_encode($filter);
                $records = $me->m_disposisi_view->select(array(
                    'limit' => $limit,
                    'start' => $start,
                    'filter' => $filter,
                    'sorter' => $sorter
                ));
            break;

            case 'riwayat_aktif':
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'IFNULL('.$disposisi->field_retract.', 0) = '.$disposisi::ACTIVE,
                ));
                array_unshift($filter, (object)array(
                    'type'      => 'exact',
                    'property'  => 'disposisi_staf',
                    'value'     => $pegawai
                ));
                // array_unshift($filter, (object)array(
                //         'type'      =>'custom',
                //         'value'     => 'IFNULL('.$disposisi->field_isdisposisi.', 0) = '.$disposisi::ISDISPOSISI
                //     ));

                $filter = json_encode($filter);
                $records = $me->m_disposisi_aktif_view->select(array(
                    'limit' => $limit,
                    'start' => $start,
                    'filter' => $filter,
                    'sorter' => $sorter
                ));
            break;

            case 'riwayat_nonaktif':
                // array_unshift($filter, (object)array(
                //     'type'      =>'custom',
                //     'value'     => 'IFNULL('.$disposisi->field_retract.', 0) = '.$disposisi::ACTIVE,
                // ));
                array_unshift($filter, (object)array(
                    'type'      => 'exact',
                    'property'  => 'disposisi_staf',
                    'value'     => $pegawai
                ));
                // array_unshift($filter, (object)array(
                //         'type'      =>'custom',
                //         'value'     => 'IFNULL('.$disposisi->field_isdisposisi.', 0) = '.$disposisi::ISDISPOSISI
                //     ));

                $filter = json_encode($filter);
                $records = $me->m_disposisi_nonaktif_view->select(array(
                    'limit' => $limit,
                    'start' => $start,
                    'filter' => $filter,
                    'sorter' => $sorter
                ));
            break;

            case 'koreksi':
                array_unshift($filter, (object)array(
                    'property'  => 'koreksi_penerima_staf',
                    'value'     => $pegawai,
                    'type'      => 'exact'
                ));
                array_unshift($filter, (object)array(
                    'type'      =>'custom',
                    'value'     => 'IFNULL('.$koreksi->field_retract.', 0) = '.$koreksi::ACTIVE
                ));
                array_push($filter, array(
                    'type'      => 'custom',
                    'value'     => $surat->field_approval_lookup.' <> '.$surat::PENYETUJUAN_INIT
                ));

                $filter = json_encode($filter);
                    $records = $me->m_surat_konsep_penerima_view->select(array(
                        'limit'     => $limit,
                        'start'     => $start,
                        'filter'    => $filter,
                        'sorter'    => $sorter
                    ));
            break;
        }       
        
        if($pegawai === null){
            $records['monitored_staf'] = "Tidak ada pegawai yang dimonitor";
        }else {
            $datapegawai = $me->m_staf_view->read(array(
                    'staf_id' => $pegawai
                ));
        
            if($datapegawai['staf_nama'] === null){
                $records['monitored_staf'] = "Tidak ada pegawai yang dimonitor";
            }else {
                $records['monitored_staf'] = $datapegawai['staf_nama'];
                $records['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$datapegawai['staf_id'];
            }
        }
        $records['pegawai'] = $pegawai;
        // $records['debug'] = $me->m_surat_konsep_penerima_view->get_lastquery();
        $this->response($records);
    }

    public function monitored_staf(){
        $me  = $this;
        $user  = $me->m_account->get_profile();

        $monitored  = $me->m_staf_wakil->read(array(
            'staf_wakil_asisten' => $user['user_staf']
        ));

        $pegawai = $monitored['staf_wakil_staf'];

        if($pegawai == NULL){
            $records['monitored_staf'] = "Tidak ada pegawai yang dimonitor";
        }else{
            $records = $me->m_staf_view->read($monitored['staf_wakil_staf']);
            $records['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/sipas/staf/get_image/foto?id='.$records['staf_id'];
        }

        $this->response_records($records);
    }

}