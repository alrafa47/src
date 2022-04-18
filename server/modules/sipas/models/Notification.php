<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Sipas_model_Notification extends Base_Model {

	function __construct() {
		parent::__construct();
		$CI = get_instance();

		$this->config->load('application_config');

		$this->load->library('TokenAuth');
		$this->load->helper('http');

		$this->m_akun = $CI->model('sipas/akun', true);
		$this->m_account = $CI->model('sipas/account', true);
		$this->m_pengaturan = $CI->model('sipas/pengaturan', true);
		// $this->m_akses_view                  = $CI->model('sipas/akses_view', true);

		$this->m_unit = $CI->model('sipas/unit', true);
		$this->m_jabatan = $CI->model('sipas/jabatan', true);
		//$this->m_notif_jabatan = $CI->model('sipas/notif_jabatan_view', true);
		//$this->m_notif_asisten = $CI->model('sipas/notif_asisten_view', true);
		$this->m_notif_unit = $CI->model('sipas/notif_unit_view', true);
		$this->m_notif_disposisi_masuk_staf = $CI->model('sipas/notif_disposisi_masuk_staf_view', true);
		// $this->m_notif_disposisi_masuk_jabatan = $CI->model('sipas/notif_disposisi_masuk_jabatan_view', true);
		$this->m_notif_disposisi_staf = $CI->model('sipas/notif_disposisi_staf_view', true);
		$this->m_unit_cakupan = $CI->model('sipas/unit_cakupan', true);
		$this->m_unit_cakupan_aktif_view = $CI->model('sipas/unit_cakupan_aktif_view', true);
		$this->m_unit_cakupan_view = $CI->model('sipas/unit_cakupan_view', true);

		$this->m_staf = $CI->model('sipas/staf', true);
		$this->m_staf_view = $CI->model('sipas/staf_view', true);
		$this->m_staf_wakil = $CI->model('sipas/staf_wakil', true);
		$this->m_staf_wakil_view = $CI->model('sipas/staf_wakil_view', true);

		$this->m_surat = $CI->model('sipas/surat', true);
		$this->m_surat_view = $CI->model('sipas/surat_view', true);
		$this->m_disposisi = $CI->model('sipas/disposisi', true);

		$this->m_koreksi_view = $CI->model('sipas/koreksi_view', true);
		$this->m_disposisi_view = $CI->model('sipas/disposisi_view', true);
		$this->m_disposisi_masuk = $CI->model('sipas/disposisi_masuk', true);

		$this->m_disposisi_masuk_view = $CI->model('sipas/disposisi_masuk_aktif_view', true);
		$this->m_koreksi_masuk_view = $CI->model('sipas/koreksi_masuk_view', true);
		$this->m_pengajuan_koreksi_view = $CI->model('sipas/koreksi_riwayat_view', true);
		$this->m_notadinas_masuk_view = $CI->model('sipas/notadinas_masuk_aktif_view', true);

		$this->m_surat_imasuk_pending_view = $CI->model('sipas/surat_imasuk_pending_view', true);
		$this->m_surat_imasuk_tolak_view = $CI->model('sipas/surat_imasuk_tolak_view', true);
		$this->m_surat_masuk_blm_arah_view = $CI->model('sipas/surat_masuk_blm_arah_view', true);
		$this->m_disposisi_masuk_blmbaca_view = $CI->model('sipas/disposisi_masuk_blmbaca_view', true);
		$this->m_surat_masuk_aktif_view = $CI->model('sipas/surat_masuk_aktif_view', true);
		$this->m_surat_keluar_setuju_view = $CI->model('sipas/surat_keluar_setuju_view', true);
		$this->m_surat_keluar_aktif_view = $CI->model('sipas/surat_keluar_aktif_view', true);
		$this->m_surat_ikeluar_aktif_view = $CI->model('sipas/surat_ikeluar_aktif_view', true);

		$this->m_notif_user = $CI->model('sipas/notif_user', true);

	}
	// INFO-NOTIF
	protected $sess_notif = 'notif';
	function get_notif_of_unit($section = null, $unit_id = null){
        $me = $this;

        // $notif_jabatan        = $me->m_notif_jabatan;
        $notif_unit        = $me->m_notif_unit;
       	$surat_masuk_blm_arah_view  = $me->m_surat_masuk_blm_arah_view;


        // agenda

        // $this->cache_notif_unit  = $notif_unit->read(array(
        //     'unit_id' => $unit_id
        // ));

        // $notif_agenda = $this->cache_notif_unit;

        switch ($section)
        {
            // 
            // NOTIF AGENDA
            // 
            case 'agmasuk_pengarahan':
                return $surat_masuk_blm_arah_view->count_exist();
                break;

            case 'notif_unit':
            	$notif_unit  = $notif_unit->read(array(
		            'unit_id' => $unit_id
		        ));
		        return $notif_unit;
		        break;
            default: return 0;
        }
    }

    function get_notif_of_user($section = null, $id = null){
        $me = $this;
        $notif_disposisi_masuk_staf = $me->m_notif_disposisi_masuk_staf;
        // $notif_disposisi_masuk_jabatan = $me->m_notif_disposisi_masuk_jabatan;
        $notif_disposisi_staf = $me->m_notif_disposisi_staf;
        $notif_user = $me->m_notif_user;
        $now = date('Y-m-d');

        switch ($section)
        {
        // 
        // NOTIF USER
        // 
        case 'notif_user':
            $notif = $notif_user->count_exist(array(
					'notif_user_penerima' => $id,
					// 'IFNULL(notif_user_ishapus,0) = 0' => null,
					'IFNULL(notif_user_isnew,0) = 1' => null));
            return $notif;
            break;
        case 'disposisi':
            $disposisi = $notif_disposisi_staf->read($id);
            return $disposisi;
            break;
        case 'disposisi_masuk':
            $disposisi_masuk = $notif_disposisi_masuk_staf->read($id);
            return $disposisi_masuk;
            break;
        //case 'masuk':
        //    $masuk = $notif_disposisi_masuk_jabatan->read($id);
        //    return $masuk;
        //    break;
        default: return 0;
        }
    }
	/*END INFO-NOTIF*/

	/*NEW MAIL NOTIF FOR MOBILE*/
	function get_newmail_of($section = null) {
		$me = $this;

		$account = $me->m_account;
		$setting = $me->m_pengaturan;

		$staf = $me->m_staf_view;

		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;

		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;
		$koreksi_view = $me->m_koreksi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_view;
		$koreksi_masuk_view = $me->m_koreksi_masuk_view;
		$pengajuan_koreksi_view = $me->m_pengajuan_koreksi_view;

		$notadinas_masuk_view = $me->m_notadinas_masuk_view;

		$dis_field_induk = $disposisi::$field_induk;
		$dis_field_iscabut = $disposisi_masuk_view::$field_iscabut;
		$dis_field_isbaca = $disposisi_view::$field_isbaca;
		$koreksi_sender = $disposisi_view::$field_sender;

		$dis_field_receiver = $disposisi_masuk::$field_receiver_id;
		$dis_field_read = $disposisi_masuk_view::$field_isbaca;

		$sur_field_approval = $surat::$field_approval_lookup;
		$sur_field_distribusi = $surat::$field_distribusi_lookup;

		$kor_field_status = $koreksi_masuk_view::$field_status;

		$image_link = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=';

		$staf_id = $account->get_profile_id();
		$getSetting = $setting->getSettings();
		$return = array();
		switch ($section) {
		case 'masuk':
			$data = $disposisi_masuk_view->find(array(
				$dis_field_receiver => $staf_id,
				$sur_field_distribusi => $surat::DISTRIBUSI_DISTRIBUSI,
				'IFNULL(' . $dis_field_iscabut . ', 0) = ' => $disposisi_view::AKTIF,
				'IFNULL(' . $dis_field_read . ', 0) = ' => $disposisi_masuk::BACA_INIT,
				$dis_field_induk . ' IS NULL' => NULL,
			));
			foreach ($data as $v) {
				$return[] = array(
					'notification_id' => 'masuk/' . $v['disposisi_masuk_id'],
					'notification_kelompok' => 'Surat Masuk',
					'notification_kelompok_kode' => 'masuk',
					'notification_tanggal' => $v['disposisi_tgl'],
					'notification_pengirim' => $v['surat_pengirim'],
					'notification_perihal' => $v['surat_perihal'],
					'notification_isi' => null,
					'notification_jenis' => $v['jenis_nama'],
					'notification_prioritas' => $v['prioritas_nama'],
					'notification_sifat' => $v['sifat_nama'],
					'notification_sifat_kode' => $v['sifat_kode'],
					'notification_sifat_color' => $v['sifat_color'],
					'notification_masuk' => $v['surat_id'],
					'notification_keluar' => null,
					'notification_konsep' => null,
					'notification_internal' => null,
					'notification_istembusan' => null,
					'notification_isberkas' => null,
					'notification_isdisposisi' => 0,
					'notification_koreksi' => null,
					'notification_pengirim_image_preview' => $image_link . $v['disposisi_staf'],
					'notification_record' => $v,
				);
			}
			return $return;
			break;

		case 'notadinas':
			$data = $notadinas_masuk_view->find(array(
				$dis_field_receiver => $staf_id,
				$sur_field_distribusi => $surat::DISTRIBUSI_DISTRIBUSI,
				'IFNULL(' . $dis_field_iscabut . ', 0) = ' => $disposisi_view::AKTIF,
				'IFNULL(' . $dis_field_read . ', 0) = ' => $disposisi_masuk::BACA_INIT,
				$dis_field_induk . ' IS NOT NULL' => NULL,
			));
			foreach ($data as $v) {
				$return[] = array(
					'notification_id' => 'notadinas/' . $v['disposisi_masuk_id'],
					'notification_kelompok' => 'Nota Dinas',
					'notification_kelompok_kode' => 'notadinas',
					'notification_tanggal' => $v['disposisi_tgl'],
					'notification_perihal' => $v['surat_perihal'],
					'notification_pengirim' => $v['surat_pengirim'],
					'notification_isi' => $v['surat_perihal'],
					'notification_jenis' => $v['jenis_nama'],
					'notification_prioritas' => $v['prioritas_nama'],
					'notification_sifat' => $v['sifat_nama'],
					'notification_sifat_kode' => $v['sifat_kode'],
					'notification_sifat_color' => $v['sifat_color'],
					'notification_masuk' => $v['surat_id'],
					'notification_keluar' => null,
					'notification_konsep' => null,
					'notification_internal' => null,
					'notification_istembusan' => $v['disposisi_masuk_istembusan'],
					'notification_isberkas' => $v['disposisi_masuk_isberkas'],
					'notification_isdisposisi' => 1,
					'notification_koreksi' => null,
					'notification_pengirim_image_preview' => $image_link . $v['disposisi_staf'],
					'notification_record' => $v,
				);
			}

			return $return;
			break;

		case 'disposisi':
			$data = $disposisi_masuk_view->find(array(
				$dis_field_receiver => $staf_id,
				$sur_field_distribusi => $surat::DISTRIBUSI_DISTRIBUSI,
				'IFNULL(' . $dis_field_iscabut . ', 0) = ' => $disposisi_view::AKTIF,
				'IFNULL(' . $dis_field_read . ', 0) = ' => $disposisi_masuk::BACA_INIT,
				$dis_field_induk . ' IS NOT NULL' => NULL,
			));
			foreach ($data as $v) {
				$return[] = array(
					'notification_id' => 'disposisi/' . $v['disposisi_masuk_id'],
					'notification_kelompok' => 'Disposisi Masuk',
					'notification_kelompok_kode' => 'disposisi',
					'notification_tanggal' => $v['disposisi_tgl'],
					'notification_perihal' => $v['perintah_nama'],
					'notification_pengirim' => $v['disposisi_pengirim_nama'],
					'notification_isi' => $v['disposisi_pesan'],
					'notification_jenis' => $v['jenis_nama'],
					'notification_prioritas' => $v['prioritas_nama'],
					'notification_sifat' => $v['sifat_nama'],
					'notification_sifat_kode' => $v['sifat_kode'],
					'notification_sifat_color' => $v['sifat_color'],
					'notification_masuk' => $v['surat_id'],
					'notification_keluar' => null,
					'notification_konsep' => null,
					'notification_internal' => null,
					'notification_istembusan' => $v['disposisi_masuk_istembusan'],
					'notification_isberkas' => $v['disposisi_masuk_isberkas'],
					'notification_isdisposisi' => 1,
					'notification_koreksi' => null,
					'notification_pengirim_image_preview' => $image_link . $v['disposisi_staf'],
					'notification_record' => $v,
				);
			}

			return $return;
			break;

		case 'koreksi':
			$data = $koreksi_masuk_view->find(array(
				$dis_field_receiver => $staf_id,
				'(IFNULL(' . $kor_field_status . ', 0) = ' . $koreksi_masuk_view::BACA_INIT . ' OR IFNULL(' . $kor_field_status . ', 0) = ' . $koreksi_masuk_view::BACA_BACA . ')' => NULL,
			));

			$return = array();
			foreach ($data as $v) {
				$return[] = array(
					'notification_id' => 'koreksi/' . $v['disposisi_masuk_id'],
					'notification_kelompok' => 'Permintaan Koreksi',
					'notification_kelompok_kode' => 'koreksi',
					'notification_tanggal' => $v['disposisi_tgl'],
					'notification_perihal' => $v['surat_perihal'],
					'notification_pengirim' => $v['surat_properti_pembuat_nama'],
					'notification_isi' => null,
					'notification_jenis' => $v['jenis_nama'],
					'notification_prioritas' => $v['prioritas_nama'],
					'notification_sifat' => $v['sifat_nama'],
					'notification_sifat_kode' => $v['sifat_kode'],
					'notification_sifat_color' => $v['sifat_color'],
					'notification_masuk' => $v['surat_model'],
					'notification_keluar' => $v['surat_id'],
					// 'notification_konsep'       => $v['surat_model'],
					'notification_internal' => $v['surat_id'],
					'notification_istembusan' => null,
					'notification_isberkas' => null,
					'notification_koreksi' => null,
					'notification_isdisposisi' => 0,
					'notification_pengirim_image_preview' => $image_link . $v['disposisi_staf'],
					'notification_record' => $v,
				);
			}

			return $return;
			break;

		case 'koreksi_status':
			$data = $pengajuan_koreksi_view->find(array(
				$koreksi_sender => $staf_id,
				'IFNULL(' . $dis_field_isbaca . ', 0) = ' => $disposisi_masuk::BACA_INIT,
			));

			$return = array();
			foreach ($data as $v) {
				$penyetuju = $staf->read($v['surat_setuju_staf']);

				$return[] = array(
					'notification_id' => 'koreksi_status/' . $v['disposisi_id'],
					'notification_kelompok' => 'Status Koreksi',
					'notification_kelompok_kode' => 'koreksi_status',
					'notification_tanggal' => $v['surat_tanggal'],
					'notification_perihal' => $v['surat_perihal'],
					'notification_pengirim' => $v['disposisi_pengirim_nama'],
					'notification_isi' => null,
					'notification_jenis' => $v['jenis_nama'],
					'notification_prioritas' => $v['prioritas_nama'],
					'notification_sifat' => $v['sifat_nama'],
					'notification_sifat_kode' => $v['sifat_kode'],
					'notification_sifat_color' => $v['sifat_color'],
					'notification_masuk' => null,
					'notification_keluar' => null,
					'notification_koreksi' => $v['disposisi_id'],
					'notification_konsep' => null,
					'notification_internal' => null,
					'notification_istembusan' => null,
					'notification_isberkas' => null,
					'notification_pengirim_image_preview' => $image_link . $v['disposisi_pengirim_id'],
					'notification_record' => $v,
					'notification_penyetuju' => array(
						'staf_id' => $penyetuju['staf_id'],
						'staf_nama' => $penyetuju['staf_nama'],
						'jabatan_nama' => $penyetuju['jabatan_nama'],
						'unit_nama' => $penyetuju['unit_nama'],
					),
				);
			}

			return $return;
			break;

		default:
			break;
		}
	}
	function get_count_of($section = null, $date_ranges = array()) {
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;

		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;
		$koreksi_view = $me->m_koreksi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;

		$disposisi_masuk_view = $me->m_disposisi_masuk_view;
		$notadinas_masuk_view = $me->m_notadinas_masuk_view;
		$koreksi_masuk_view = $me->m_koreksi_masuk_view;
		$pengajuan_koreksi = $me->m_pengajuan_koreksi_view;
		$surat_ikeluar_view = $me->m_surat_ikeluar_view;

		$profile = $account->get_profile();
		$unitkerja_id = $account->get_unitkerja_id();
		$staf_id = $account->get_profile_id();

		$dis_field_iscabut = $disposisi_view::$field_iscabut;
		$dis_field_sender = $disposisi_view::$field_sender;
		$dis_field_tanggal = $disposisi_view::$field_tanggal;
		$dis_field_disposisi_date = $disposisi_view::$field_tanggal;

		$dis_field_receiver = $disposisi_masuk::$field_receiver_id;

		$sur_field_approval = $surat::$field_approval_lookup;
		$sur_field_distribusi = $surat::$field_distribusi_lookup;

		$count = count($date_ranges);
		$record = array();

		switch ($section) {
		case 'disposisi':
			$record['count'] = 0;
			$record['name'] = 'Disposisi Masuk';
			foreach ($date_ranges as $key => $value) {
				$record['week' . $key] = $disposisi_masuk_view->count_exist(array(
					$dis_field_receiver => $staf_id,
					$sur_field_distribusi => $surat::DISTRIBUSI_DISTRIBUSI,
					'DATE(' . $dis_field_disposisi_date . ') >= ' => $value['start'],
					'DATE(' . $dis_field_disposisi_date . ') <= ' => $value['end'],
					'IFNULL(' . $dis_field_iscabut . ', 0) = ' => $disposisi_view::AKTIF,
					$disposisi::$field_induk . ' IS NOT NULL' => NULL,
				));
				// $record['debug'] = $disposisi_masuk_view->get_lastquery();
				$record['count'] = $record['count'] + $record['week' . $key];
			}

			return $record;
			break;
		case 'notadinas':
			$record['count'] = 0;
			$record['name'] = 'Disposisi Masuk';
			foreach ($date_ranges as $key => $value) {
				$record['week' . $key] = $notadinas_masuk_view->count_exist(array(
					$dis_field_receiver => $staf_id,
					$sur_field_distribusi => $surat::DISTRIBUSI_DISTRIBUSI,
					'DATE(' . $dis_field_disposisi_date . ') >= ' => $value['start'],
					'DATE(' . $dis_field_disposisi_date . ') <= ' => $value['end'],
					'IFNULL(' . $dis_field_iscabut . ', 0) = ' => $disposisi_view::AKTIF,
					$disposisi::$field_induk . ' IS NOT NULL' => NULL,
				));
				// $record['debug'] = $disposisi_masuk_view->get_lastquery();
				$record['count'] = $record['count'] + $record['week' . $key];
			}

			return $record;
			break;

		case 'koreksi':
			$record['count'] = 0;
			$record['name'] = 'Permintaan Koreksi';
			foreach ($date_ranges as $key => $value) {
				$record['week' . $key] = $koreksi_masuk_view->count_exist(array(
					$dis_field_receiver => $staf_id,
					$sur_field_approval . ' <> ' . $surat::SETUJU_INIT => NULL,
					'DATE(' . $dis_field_disposisi_date . ') >= ' => $value['start'],
					'DATE(' . $dis_field_disposisi_date . ') <= ' => $value['end'],
				));
				// $record['debug'] = $koreksi_masuk_view->get_lastquery();
				$record['count'] = $record['count'] + $record['week' . $key];
			}

			return $record;
			break;

		case 'koreksi_status':
			$record['count'] = 0;
			$record['name'] = 'Status Koreksi';
			foreach ($date_ranges as $key => $value) {
				$record['week' . $key] = $pengajuan_koreksi->count_exist(array(
					$dis_field_sender => $staf_id,
					$sur_field_approval . ' <> ' . $surat::SETUJU_INIT => NULL,
					'DATE(' . $dis_field_tanggal . ') >= ' => $value['start'],
					'DATE(' . $dis_field_tanggal . ') <= ' => $value['end'],
				));
				// $record['debug'] = $pengajuan_koreksi->get_lastquery();
				$record['count'] = $record['count'] + $record['week' . $key];
			}

			return $record;
			break;

		case 'masuk':
			$record['count'] = 0;
			$record['name'] = 'Surat Masuk';
			foreach ($date_ranges as $key => $value) {
				$record['week' . $key] = $disposisi_masuk_view->count_exist(array(
					$dis_field_receiver => $staf_id,
					$sur_field_distribusi => $surat::DISTRIBUSI_DISTRIBUSI,
					'DATE(' . $dis_field_disposisi_date . ') >= ' => $value['start'],
					'DATE(' . $dis_field_disposisi_date . ') <= ' => $value['end'],
					'IFNULL(' . $dis_field_iscabut . ', 0) = ' => $disposisi_view::AKTIF,
					$disposisi::$field_induk . ' IS NULL' => NULL,
				));
				// $record['debug'] = $disposisi_masuk_view->get_lastquery();
				$record['count'] = $record['count'] + $record['week' . $key];
			}

			return $record;
			break;
		default:return 0;
		}
	}
}