<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Arsip extends Base_Controller {

    public $report_template = 'sipas/arsip/bebas/list';
    public $report_title = 'Laporan Arsip Bebas';
    public $report_subtitle = 'Semua Arsip Bebas yang dibuat oleh instansi pengguna aplikasi';

    public $report_rekap_template   = 'sipas/arsip/rekap';
    public $report_rekap_title      = 'Laporan Arsip Bebas';
    public $report_rekap_subtitle   = 'Rekapitulasi Arsip bebas yang dibuat oleh instansi pengguna aplikasi';

    public $link_template   = 'sipas/arsip/link';
    public $link_title      = 'Arsip Bebas';
    public $link_subtitle   = 'Semua Arsip bebas yang dibuat oleh instansi pengguna aplikasi';

    public $report_resi_template             = 'sipas/surat/resi';
    public $report_resi_title                = 'Tanda Terima Surat';
    static $report_rekap_filename_download   = 'Rekap_arsip_bebas_';
    static $report_filename_download         = 'Daftar_arsip_bebas_';

    static $default_value  = array(
                                'empty'     => '<span style="color:grey; font-style:italic;">(dalam proses)</span>',
                                'novalue'   => '<span style="color:grey; font-style:italic;">(Tidak ada data)</span>',
                                );

    protected $message = array();

    static $bg_color_item_laporan = array('odd'=> 'background-color: #F5F5F5;', 'even'=> 'background-color: #FFFFFF;');
      
	public function __construct(){
        parent::__construct();
        $this->m_surat      = $this->model('sipas/surat',       true);
        $this->m_surat_view = $this->model('sipas/surat_view',  true);
        $this->m_surat_log  = $this->model('sipas/surat_log',   true);
        $this->m_properti   = $this->model('sipas/properti',    true);
        $this->m_account    = $this->model('sipas/account',     true);
        $this->m_arsip      = $this->model('sipas/arsip',       true);
        $this->m_arsip_bagi = $this->model('sipas/arsip_bagi',  true);
        $this->m_sifat      = $this->model('sipas/sifat',       true);

        $this->m_dokumen            = $this->model('sipas/dokumen',  true);
        $this->m_dokumen_view       = $this->model('sipas/dokumen_view',  true);
        $this->m_arsip_view         = $this->model('sipas/arsip_view',  true);
        $this->m_arsip_hidup_view   = $this->model('sipas/arsip_hidup_view',  true);
        $this->m_arsip_musnah_view  = $this->model('sipas/arsip_musnah_view',  true);
        $this->m_arsip_umum_view    = $this->model('sipas/arsip_umum_view',  true);
        $this->m_arsip_bagi_view    = $this->model('sipas/arsip_bagi_view',  true);
        $this->m_arsip_rekap_view   = $this->model('sipas/arsip_rekap_view',  true);
        $this->m_pengaturan         = $this->model('sipas/pengaturan',  true);

        $this->m_surat_stack            = $this->model('sipas/surat_stack', true);
        $this->m_disposisi_masuk_view   = $this->model('sipas/disposisi_masuk_netral_view', true);
    }

    public function index(){
        $this->read();
    }

    public function read(){
        $model = $this->m_arsip_view;

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('arsip_id')){
            $id = varGet('id', varGet('arsip_id'));
            $record = $model->read($id);

            $record['arsip_link'] = base_url().'server.php/sipas/arsip/link/'.$id;
            $this->response_record($record);
        }else{
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => $sorter
            ));

            $this->response($records);
        }

    }

    public function hidup(){
        $model   = $this->m_arsip_hidup_view;
        $account = $this->m_account->get_profile();

        $filter  = json_decode(varGet('filter', '[]'));
        $limit   = varGet('limit');
        $start   = varGet('start',0);
        $sorter  = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('arsip_id')){
            $id = varGet('id', varGet('arsip_id'));
            $record = $model->read($id);
            $record['arsip_link'] = base_url().'server.php/sipas/arsip/link?id='.$id;
            $this->response_record($record);
        }else{
            if(varGet('scope')){
                $scopeid = varGet('scope');
            }else{
                $scopeid = $account['staf_unit'];
            }
            array_unshift($filter, (object)array(
                'type'  => 'exact',
                'field' => 'arsip_unit',
                'value' => $scopeid
            ));
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => json_encode($sorter)
            ));

            foreach ($records['data'] as $k => $v) {
                // $v['arsip_link'] = base_url().'server.php/arsipbebas/'.$v['arsip_id'];
                $records['data'][$k]['arsip_link'] = base_url().'server.php/arsipbebas?id='.$v['arsip_id'];
            }
            $this->response($records);
        }
    }

    public function bagi(){
        $model = $this->m_arsip_bagi_view;
        $account = $this->m_account->get_profile();

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sifat_id')){
            $id = varGet('id', varGet('sifat_id'));
            $record = $model->read($id);

            $record['arsip_link'] = base_url().'server.php/sipas/arsip/link/'.$record['arsip_id'];
            $this->response_record($record);
        }else{
            if(varGet('scope')){
                $scopeid = varGet('scope');
                array_unshift($filter, (object)array(
                    'type'  => 'exact',
                    'field' => 'arsip_bagi_unit',
                    'value' => $scopeid
                ));
            }
            
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => json_encode($sorter)
            ));

            foreach ($records['data'] as $k => $v) {
                // $v['arsip_link'] = base_url().'server.php/arsipbebas/'.$v['arsip_id'];
                $records['data'][$k]['arsip_link'] = base_url().'server.php/arsipbebas?id='.$v['arsip_id'];
            }
            $this->response($records);
        }
    }

    public function umum(){
        $model = $this->m_arsip_umum_view;
        $account = $this->m_account->get_profile();

        $filter     = json_decode(varGet('filter', '[]'));
        $limit      = varGet('limit');
        $start      = varGet('start',0);
        $sorter     = json_decode(varGet('sort', '[]'));

        if(varGetHas('id') || varGetHas('sifat_id')){
            $id = varGet('id', varGet('sifat_id'));
            $record = $model->read($id);
            $this->response_record($record);
        }else{
            $records = $model->select(array(
                'limit'     => $limit,
                'start'     => $start,
                'filters'   => json_encode($filter),
                'sort'      => json_encode($sorter)
            ));

            foreach ($records['data'] as $k => $v) {
                // $v['arsip_link'] = base_url().'server.php/arsipbebas/'.$v['arsip_id'];
                $records['data'][$k]['arsip_link'] = base_url().'server.php/arsipbebas?id='.$v['arsip_id'];
            }
            $this->response($records);
        }
    }

    public function arsip_auth(){
        $surat      = $this->m_surat;
        $surat_log  = $this->m_surat_log;
        $arsip      = $this->m_arsip;
        $properti   = $this->m_properti;
        $stack      = $this->m_surat_stack;
        $dis_mas    = $this->m_disposisi_masuk_view;

        $staf_id    = varReq('staf_id');
        $surat_id   = varReq('surat_id');

        $get_surat = $surat->read($surat_id);
	
        if($get_surat){
            /*is pembuat*/
            $is_pembuat = $properti->read(array(
                'properti_id' => $get_surat['surat_properti'],
                'properti_buat_staf' => $staf_id
            ));
            /*is pengubah*/
            $is_pengubah = $properti->read(array(
                'properti_id' => $get_surat['surat_properti'],
                'properti_ubah_staf' => $staf_id
            ));
        }
        /*get from log surat*/
        $count = $surat_log->count_exist(array(
            'surat_log_surat' => $surat_id,
            'surat_log_staf' => $staf_id
        ));
        /*is penerima distribusi*/
        $is_stack = $stack->read(array(
            'surat_stack_surat' => $surat_id,
            'surat_stack_staf' => $staf_id
        ));
        
        /*is penerima disposisi staf*/
        $is_dispo_staf = $dis_mas->read(array(
            'disposisi_surat' => $surat_id,
            'disposisi_masuk_staf' => $staf_id,
            'disposisi_cabut_tgl' => null
        ));

        if (empty($get_surat['surat_israhasia'])) {
            $allowed = true;
        }else{
            if($get_surat['surat_model'] === $surat::MODEL_IMASUK){
                $allowed = ($is_dispo_staf || $is_dispo_jab)? true : false;
            }else{
                $allowed = ($is_pembuat || $is_pengubah || $is_stack || $is_dispo_staf || ($count > 0));
            }
        }
        

        $this->response(array(
            'allowed' => $allowed
        ));
    }

    public function arsip_duplicate(){
        $arsip      = $this->m_arsip;
        $surat      = $this->m_surat;
        $dokumen    = $this->m_dokumen;
        $surat_log  = $this->m_surat_log;
        $properti   = $this->m_properti;
        $account    = $this->m_account;

        $now = date('YmdHis');
        $akun = $account->get_profile_id();
        $arsip_id_new = varReq('arsip_id_new');
        $arsip_id_old = varReq('arsip_id_old');
        $surat_id = varReq('surat_id'); 

        $findDokumen = $dokumen->find(array(
            'dokumen_arsip'     => $arsip_id_old,
            'dokumen_isactive'  => 1
        ));
        
        foreach ($findDokumen as $k => $v) {
            $dupDokumen = $dokumen->duplicate($v, $arsip_id);
            if($dupDokumen){
                $operation = $dokumen->insert(array(
                    'dokumen_id'       => $dupDokumen['dokumen_id'],
                    'dokumen_arsip'    => $arsip_id_new,
                    'dokumen_nama'     => $v['dokumen_nama'],
                    'dokumen_file'     => $dupDokumen['dokumen_file'],
                    'dokumen_preview'  => $dupDokumen['dokumen_preview'],
                    'dokumen_path'     => realpath($dupDokumen['dokumen_path']),
                    'dokumen_size'     => $v['dokumen_size'], // in KB
                    'dokumen_date'     => date('Y-m-d H:i:s'),
                    'dokumen_ext'      => $v['dokumen_ext'],
                    'dokumen_mime'     => $v['dokumen_mime'],
                    'dokumen_isactive' => $v['dokumen_isactive']
                ),null, function($responses) use ($dokumen, $surat_log, $akun, $properti){
                    if($responses[$dokumen->successProperty] !== true) return;
                    
                    $inserted_data = $dokumen->read($dokumen->get_insertid());
                    $op = $properti->created($akun, $inserted_data, 'dokumen', $inserted_data['dokumen_id'], $inserted_data['dokumen_nama']);
                    if($op){
                        $dokumen->update($inserted_data['dokumen_id'], array(
                            'dokumen_properti' => $op['properti_id']
                        ));
                    }
                });
            }
        }
        $dt['surat_arsip'] = $arsip_id_new;
        $operation = $surat->update($surat_id, $dt, function($response) use
            ($surat_log, $surat, $akun ,$surat_id){
                if($response[$surat->successProperty] !== true) return;
                $inserted_data = $surat->read($surat_id);
                $surat_log->created($akun, $inserted_data);
        });

        $this->response($operation);
    }
    
    public function create($usePayload = true){
        $model      = $this->m_arsip;
        $arsip_view = $this->m_arsip_view;
        $properti   = $this->m_properti;
        $account    = $this->m_account;

        $akun = $account->get_profile_id();
        $payload = getRequestPayload();
        $data = (array) ($usePayload ? $payload : varPost());

        $operation = $model->insert($data, null, function($response) use 
            ($properti, $model, $akun){
            $inserted_data = $model->read($model->get_insertid());
            $op = $properti->created($akun, $inserted_data, 'arsip', $inserted_data['arsip_id'], $inserted_data['arsip_nama']);
            if($op){
                $model->update($inserted_data['arsip_id'], array(
                    'arsip_properti' => $op['properti_id']
                ));
            }
        });
        $operation[$model->dataProperty] = $arsip_view->read($model->get_insertid());
        $this->response($operation);
    }
    
    public function update($usePayload = true){
        $model      = $this->m_arsip;
        $arsip_view = $this->m_arsip_view;
        $arsip_bagi = $this->m_arsip_bagi;
        $properti   = $this->m_properti;
        $account    = $this->m_account;

        $units      = varReq('units');
        $tambah     = varReq('tambah');
        $ubah       = varReq('ubah');
        $hapus      = varReq('hapus');

        $akun       = $account->get_profile_id();
        $now        = date('Y-m-d H:i:s');
        $primary    = $model->get_primary();
        $payload    = getRequestPayload();
        $data       = (array) ($usePayload ? $payload : varPost());
        $id         = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        if($data['arsip_isbagi']){
            $data['arsip_bagi_tgl'] = $now;
            $data['arsip_bagi_staf'] = $akun;
        }

        $operation = $model->update($id, $data, function($response)use 
            ($properti, $model, $akun, $data, $units, $tambah, $ubah, $hapus, $arsip_bagi){
            $updated_data = $model->read($data['arsip_id']);
            $idProp = $updated_data['arsip_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $updated_data, 'arsip', $updated_data['arsip_id'], $updated_data['arsip_nama']);
                if($op){
                    $model->update($updated_data['arsip_id'], array(
                        'arsip_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->updated($idProp, $akun, $updated_data, $updated_data['arsip_nama']);
            if (!is_array($units)) {
                $units = array();
            }

            if (!is_array($tambah)) {
                $tambah = array();
            }

            if (!is_array($ubah)) {
                $ubah = array();
            }

            if (!is_array($hapus)) {
                $hapus = array();
            }

            if(!empty($units)){
                $arsip_bagi->delete(array(
                    'arsip_bagi_arsip' => $updated_data['arsip_id']
                ));
                foreach ($units as $index => $un) {
                    if($tambah[$index] === 'true'){
                        $tambah[$index] = true;
                    }
                    if($ubah[$index] === 'true'){
                        $ubah[$index] = true;
                    }
                    if($hapus[$index] === 'true'){
                        $hapus[$index] = true;
                    }
                    if (is_string($un)) {
                        $unit_id = $un;
                        $tambah = ((int)$tambah[$index] != '') ? 1 : 0;
                        $ubah = ((int)$ubah[$index] != '') ? 1 : 0;
                        $hapus = ((int)$hapus[$index] != '') ? 1 : 0;
                    } else if (is_object($un)) {
                        $unit_id = property_exists($un, 'unit_id') ? $un->unit_id : null;
                        $tambah = ((int)$tambah[$index] != '') ? 1 : 0;
                        $ubah = ((int)$ubah[$index] != '') ? 1 : 0;
                        $hapus = ((int)$hapus[$index] != '') ? 1 : 0;
                    } else if (is_array($un)) {
                        $unit_id = array_key_exists('unit_id', $un) ? $un['unit_id'] : null;
                        $tambah = ((int)$tambah[$index] != '') ? 1 : 0;
                        $ubah = ((int)$ubah[$index] != '') ? 1 : 0;
                        $hapus = ((int)$hapus[$index] != '') ? 1 : 0;
                    }

                    if (empty($unit_id)) {
                        continue;
                    }

                    $op_bagi = $arsip_bagi->insert(array(
                        'arsip_bagi_arsip' => $updated_data['arsip_id'],
                        'arsip_bagi_unit' => $unit_id,
                        'arsip_bagi_bolehtambah' => $tambah,
                        'arsip_bagi_bolehubah' => $ubah,
                        'arsip_bagi_bolehhapus' => $hapus
                    ));
                }
            }
        });
        $operation[$model->dataProperty] = $arsip_view->read($id);
        $this->response($operation);
    }

    public function destroy($usePayload = true){
        $model      = $this->m_arsip;
        $arsip_view = $this->m_arsip_view;
        $properti   = $this->m_properti;
        $account    = $this->m_account;

        $akun       = $account->get_profile_id();
        $primary    = $model->get_primary();
        $payload    = getRequestPayload();
        $data       = (array) ($usePayload ? $payload : varPost());
        $id         = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

        $operation = $model->update($id, $data,function($response) use ($properti, $model, $akun, $data){
            $deleted_data = $model->read($data['arsip_id']);
            $idProp = $deleted_data['arsip_properti'];
            if(empty($idProp)){
                $op = $properti->created($akun, $deleted_data, 'arsip', $deleted_data['arsip_id'], $deleted_data['arsip_nama']);
                if($op){
                    $model->update($deleted_data['arsip_id'], array(
                        'arsip_properti' => $op['properti_id']
                    ));
                }
            }
            $properti->deleted($idProp, $akun, $deleted_data, $deleted_data['arsip_nama']);
        });
        $operation[$model->dataProperty] = $arsip_view->read($id);
        $this->response($operation);
    }
    function link($id){
        $arsip = $this->m_arsip_view;
        $dokumen = $this->m_dokumen_view;
        $pengaturan = $this->m_pengaturan;
        $report_model = $this->model('sipas/report',true);

        $r_arsip = $arsip->read($id);

        if($r_arsip){
            $r_dokumen = $dokumen->find(array(
                'dokumen_arsip' => $id,
                'dokumen_isactive' => 1
            ));
        }else{
            $r_dokumen =[];
        }

        $countdok = count($r_dokumen);

        foreach ((array)$r_dokumen as $key => $value) {
            $date = $value['properti_buat_tgl'];
            $createDate = new DateTime($date);
            $value['properti_buat_tgl'] = $createDate->format('d M Y H:i');
            $r_dokumen[$key]['properti_buat_tgl'] = $value['properti_buat_tgl'];
            // echo "<pre>";
            // var_dump($value);
            // die();
            // $value['dokumen_id'];
            $r_dokumen[$key]['dokumen_base_url'] = base_url();
            if($value['dokumen_ext'] == '.7z'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-7z';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.bmp'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-bmp';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.doc'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-doc';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.docx'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-docx';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.gif'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-gif';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.jpeg'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-jpeg';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.sdoc'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-sdoc';
                $r_dokumen[$key]['dokumen_ext'] = $value['dokumen_ext'].'<span style="color:#F44336">*</span>';
                $r_dokumen[$key]['dokumen_disabled'] = 'ext-disabled';
                $r_dokumen[$key]['dokumen_button_hidden'] = 'button-hidden';
            }
            if($value['dokumen_ext'] == '.link'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-link';
                $r_dokumen[$key]['dokumen_ext'] = $value['dokumen_ext'].'<span style="color:#F44336">*</span>';
                $r_dokumen[$key]['dokumen_disabled'] = 'ext-disabled';
                $r_dokumen[$key]['dokumen_button_hidden'] = 'button-hidden';
            }
            if($value['dokumen_ext'] == '.jpg'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-jpg';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.other'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-other';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.pdf'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-pdf';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.png'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-png';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.pps'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-pps';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.ppt'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-ppt';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.pptx'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-pptx';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.png'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-png';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.rar'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-rar';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.rtf'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-rtf';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.tiff'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-tiff';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.xls'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-xls';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.xlsx'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-xlsx';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
            if($value['dokumen_ext'] == '.zip'){
                $r_dokumen[$key]['dokumen_icon'] = 'ext-zip';
                $r_dokumen[$key]['dokumen_link'] = 'href="'.base_url().'server.php/sipas/dokumen/download/'.$value['dokumen_id'].'"';
            }
        }

        $report_data = array(
                'dokumen'           => $r_dokumen,
                'jumlah_dokumen'    => $countdok,
                'pembuat'           => $r_arsip['properti_pembuat_nama'],
                'pembuat_unit'      => $r_arsip['properti_pembuat_unit_nama'],
                'tgl_buat'          => $report_model->date_format($r_arsip['properti_buat_tgl'], 'd M Y H:i'),
                'perihal'           => $r_arsip['arsip_nama'],
                'dateReport'        => date('d-m-Y H:i:s'),
                'footer'            => $pengaturan->getSettingByCode('data_perusahaan_nama'),
                'dateReportFormated'=> date('d M Y H:i')
            );

        $file = $this->load->view($this->link_template, null, true);
        $report_model->generateReport($file, $report_data, true);
    }

    function report(){
        $report_model       = $this->model('sipas/report',true);
        $account_model      = $this->model('sipas/account',true);
        $unit_model         = $this->model('sipas/unit',true);
        $asset_model        = $this->model('sipas/asset',true);

        $arsip_bagi         = $this->m_arsip_bagi_view;
        $arsip_umum         = $this->m_arsip_umum_view;
        $arsip_view        = $this->m_arsip_view;

        $penerima           = array();

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel', 0);
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';
        
        $param_unit     = varGet('unit');

        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        $time_field = $report_model->generateSelectField($filter, $filterValue, 'properti_buat_tgl');

        if($param_unit) array_unshift($time_field, array('type'=>'exact', 'value'=>$param_unit, 'field'=>'arsip_unit'));

        $unit_sorter = array(array('property'=>'unit_nama', 'direction'=> 'ASC'));
        $unit_umum = $arsip_umum->select(array('filter'=>json_encode($time_field), 'sorter'=>json_encode($unit_sorter), 'fields'=>array('arsip_unit', 'arsip_unit_nama')));
        $unit_bagi = $arsip_bagi->select(array('filter'=>json_encode($time_field), 'sorter'=>json_encode($unit_sorter), 'fields'=>array('arsip_unit', 'arsip_unit')));
        $unit_recs = array_values(array_unique(array_column(array_merge($unit_umum['data'], $unit_bagi['data']), 'arsip_unit')));

        if(!$unit_recs && $param_unit) $unit_recs = array($param_unit);

        $unit_data = array();
        foreach ($unit_recs as $d_i => &$v) {
            $value = array();
            $sorter = array();

            array_unshift($sorter, array('property'=>'arsip_nama', 'direction'=> 'ASC'));

            $_filter = $time_field;
            array_unshift($_filter, array('type'=>'custom', 'value'=>'(arsip_isbagi = 1 OR arsip_isumum = 1)'));
            array_unshift($_filter, array('type'=>'exact', 'field'=>'arsip_unit', 'value'=>$v));
            $records = $arsip_view->select(array('filter'=>json_encode($_filter), 'sorter'=>json_encode($sorter)));

            if($records['total'] > 0){
                foreach ($records['data'] as $i => &$r) {
                    $r['no']    = $i + 1;
                    $date       = $r['properti_buat_tgl'];
                    $createDate = new DateTime($date);
                    $r['properti_buat_tgl'] = $createDate->format('d M Y');

                    if($r['arsip_isbagi']) $penerima_recs = $arsip_bagi->count_exist(array('arsip_bagi_arsip'=> $r['arsip_id']), null, null, null, null);
                    $r['arsip_umum']    = $r['arsip_isumum'] ? 'Ya' : 'Tidak';
                    $r['arsip_status']  = ($r['properti_hapus_staf'] == 0 && $r['arsip_isumum'] == 0) ? 'Hidup' : ($r['properti_hapus_staf'] == 1 && $r['arsip_isumum']  == 0 ? 'Musnah' : '');
                    $r['arsip_penerima']  = $r['arsip_isumum'] ? '0' : $penerima_recs;
                    $r['bg_color']      = ($i % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                }
            }else{
                array_unshift($records['data'], array(
                    'no'                => 1,
                    'arsip_nama'        => $this::$default_value['novalue'],
                    'properti_buat_tgl' => $this::$default_value['novalue'],
                    'arsip_umum'        => $this::$default_value['novalue'],
                    'arsip_status'      => $this::$default_value['novalue'],
                    'arsip_penerima'    => $this::$default_value['novalue'],
                    'bg_color'          => 'background-color:#FFFFFF;'
                ));
            }

            $value['unit_nama'] = $unit_model->read($v)['unit_nama'];
            $value['surat']     = $records['data'];
            $unit_data[]        = $value;        
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            // 'style'=>array( array('params'=>'media="all"', 'content'=>$asset_model->css('reset.css',false)) ),
            'title'         =>  $report_title,
            'subtitle'      =>  $this->report_subtitle,
            'header'        =>  $report_model->generateHeader($download, 5),
            'periode'       =>  $report_model->generatePeriode($filter, $filterValue),
            'unit'          =>  $unit_data,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$account_model->field_display]
        );

        $filename = str_replace(' ', '_', $report_title).$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_template, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }

    function report_rekap() {
        $account_model          = $this->model('sipas/account',true);
        $report_model           = $this->model('sipas/report',true);
        $unit_model             = $this->model('sipas/unit',true);
        $asset_model            = $this->model('sipas/asset',true);

        $m_arsip_rekap_view    = $this->m_arsip_rekap_view;

        $filter         = varGet('filter');
        $filterValue    = varGet('value');
        $download       = varGet('download',0);
        $excel          = varGet('excel', 0);
        $param_unit     = varGet('unit');
        $report_title   = varGet('title', 0) ? base64_decode(varGet('title')) : '';


        if(strtolower($download) == 'false') $download = 0;
        $download   = (boolean) $download;
        $user       = $account_model->get_profile();

        $time_field = $report_model->generateSelectField($filter, $filterValue, 'properti_buat_tgl'); // generate field arsip - see below
        $unit_sorter = array(array('property'=>'unit_nama', 'direction'=> 'ASC'));

        $data = $m_arsip_rekap_view->select(array(
                            'filter'=>json_encode($time_field),
                            'sorter'=>json_encode($unit_sorter)
                    ));

        $grouped = array();
        if($data['total'] > 0){
            $no = 0;
            foreach($data['data'] as $kdata => &$vdata){
                $kunit = $vdata['unit_kode'];
                $grouped[$kunit]['unit_nama'] = $vdata['unit_nama'];
                if(! array_key_exists('no', $grouped[$kunit])){
                        $grouped[$kunit]['no'] = $no + 1;
                        $grouped[$kunit]['bg_color']  = (($no+1) % 2 == 0) ? $this::$bg_color_item_laporan['even'] : $this::$bg_color_item_laporan['odd'];
                        $no++;
                    }
                if( ! array_key_exists('total', $grouped[$kunit])){
                    $grouped[$kunit]['total'] = 0;
                    $grouped[$kunit]['umum'] = 0;
                    $grouped[$kunit]['bagi'] = 0;
                }
                $grouped[$kunit]['umum'] += $vdata['arsip_isumum'];
                $grouped[$kunit]['bagi'] += $vdata['arsip_isbagi'];
                $grouped[$kunit]['total'] += $vdata['jumlah'];
            }
        }else{
            $fill    = array('no', 'unit_nama', 'umum', 'bagi', 'total');
            $template = array_fill_keys($fill, $this::$default_value['novalue']);
            $template['no'] = 1;
            array_unshift($grouped, $template);
        }

        $report_title = ($download || $excel) ? explode('<', $report_title)[0] : $report_title;
        $report_data = array(
            'title'         =>  $report_title,
            'subtitle'      =>  $this->report_rekap_subtitle,
            'header'        =>  $report_model->generateHeader($download, 5),
            'periode'       =>  $report_model->generatePeriode($filter, $filterValue),
            'unit'          =>  $grouped,
            'dateReport'    =>  date('d-m-Y H:i:s'),
            'dateReportFormated'    =>  date('d M Y H:i'),
            'operator'      =>  $user[$account_model->field_display]
        );

        $filename = str_replace(' ', '_', $report_title).$report_model->generatePeriode($filter, $filterValue, true);
        $file = $this->load->view($this->report_rekap_template, null, true);
        if($download){
            $report_model->generateReportPdf($file, $report_data, $filename, true);
        }else if($excel){
            $report_model->generateExcel($file, $report_data, $filename);
        }else{
            $report_model->generateReport($file, $report_data, true);
        }
    }
}