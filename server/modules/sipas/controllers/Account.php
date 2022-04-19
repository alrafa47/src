<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Account extends Base_Controller
{

	protected $messages = array(
		'login_success' => 'Login berhasil. Selamat datang {user_display}',
		'login_failed' => 'Login gagal, silahkan cek kembali username/password anda!',
		'login_limit' => 'Anda telah gagal login sebanyak {count}, Silahkan tunggu {delay} detik lagi untuk login kembali.',
		'login_expired' => 'Login gagal, session sudah kadaluarsa',
		'not_login' => 'Anda belum melakukan login.',
		'invalid_oldpassword' => 'Password lama tidak sesuai.',
		'password_changed' => 'Password berhasil diperbarui.',
	);

	protected $use_limit = true;
	protected $limit_max = 3;
	protected $limit_delay = 10; // in second
	protected $sess_limit_timer = 'login_timer';
	protected $sess_limit_counter = 'login_counter';
	function __construct()
	{
		parent::__construct();

		// please do not remove these lines, ci doesnt recognize any override of our own email
		$this->load->library('my_email');
		$this->email = $this->my_email;

		$this->m_user = $this->model('sipas/akun', true);
		$this->m_user_view = $this->model('sipas/akun_view', true);
		$this->m_properti = $this->model('sipas/properti', true);
		$this->m_account = $this->model('sipas/account', true);
		$this->m_notification = $this->model('sipas/notification', true);
		$this->m_staf = $this->model('sipas/staf', true);
		$this->m_staf_view = $this->model('sipas/staf_view', true);
		$this->m_staf_aktif_view = $this->model('sipas/staf_aktif_view', true);

		$this->m_unit = $this->model('sipas/unit', true);
		$this->m_unit_cakupan = $this->model('sipas/unit_cakupan', true);
		$this->m_unit_cakupan_view = $this->model('sipas/unit_cakupan_view', true);
		$this->m_unit_cakupan_hidup_view = $this->model('sipas/unit_cakupan_hidup_view', true);

		$this->m_surat = $this->model('sipas/surat', true);
		$this->m_surat_view = $this->model('sipas/surat_view', true);

		$this->m_disposisi = $this->model('sipas/disposisi', true);
		$this->m_disposisi_view = $this->model('sipas/disposisi_view', true);
		$this->m_koreksi_view = $this->model('sipas/koreksi_view', true);
		$this->m_disposisi_masuk = $this->model('sipas/disposisi_masuk', true);

		$this->m_disposisi_riwayat_view = $this->model('sipas/disposisi_riwayat_view', true);
		$this->m_disposisi_riwayat_aktif_view = $this->model('sipas/disposisi_riwayat_aktif_view', true);
		$this->m_disposisi_riwayat_nonaktif_view = $this->model('sipas/disposisi_riwayat_nonaktif_view', true);

		$this->m_disposisi_masuk_view = $this->model('sipas/disposisi_masuk_view', true);
		$this->m_disposisi_masuk_aktif_view = $this->model('sipas/disposisi_masuk_aktif_view', true);
		$this->m_disposisi_masuk_blmbaca_view = $this->model('sipas/disposisi_masuk_blmbaca_view', true);
		$this->m_disposisi_masuk_baca_view = $this->model('sipas/disposisi_masuk_baca_view', true);
		$this->m_disposisi_masuk_terus_view = $this->model('sipas/disposisi_masuk_terus_view', true);
		$this->m_notadinas_masuk_view = $this->model('sipas/notadinas_masuk_view', true);
		$this->m_notadinas_masuk_aktif_view = $this->model('sipas/notadinas_masuk_aktif_view', true);
		$this->m_notadinas_masuk_blmbaca_view = $this->model('sipas/notadinas_masuk_blmbaca_view', true);
		$this->m_notadinas_masuk_baca_view = $this->model('sipas/notadinas_masuk_baca_view', true);
		$this->m_notadinas_masuk_terus_view = $this->model('sipas/notadinas_masuk_terus_view', true);
		$this->m_disposisi_masuk_nonaktif_view = $this->model('sipas/disposisi_masuk_nonaktif_view', true);
		$this->m_notadinas_masuk_nonaktif_view = $this->model('sipas/notadinas_masuk_nonaktif_view', true);

		$this->m_koreksi_masuk_view = $this->model('sipas/koreksi_masuk_aktif_view', true);
		$this->m_koreksi_masuk_blmtindak_view = $this->model('sipas/koreksi_masuk_blmtindak_view', true);
		$this->m_koreksi_masuk_setuju_view = $this->model('sipas/koreksi_masuk_setuju_view', true);
		$this->m_koreksi_masuk_tolak_view = $this->model('sipas/koreksi_masuk_tolak_view', true);
		$this->m_koreksi_masuk_view = $this->model('sipas/koreksi_masuk_view', true);
		$this->m_pengajuan_koreksi_view = $this->model('sipas/koreksi_riwayat_view', true);

		$this->m_surat_keluar_aktif_view = $this->model('sipas/surat_keluar_aktif_view', true);
		$this->m_surat_keluar_hidup_view = $this->model('sipas/surat_keluar_hidup_view', true);
		$this->m_surat_keluar_draft_view = $this->model('sipas/surat_keluar_draft_view', true);
		$this->m_surat_keluar_dlm_setuju_view = $this->model('sipas/surat_keluar_dlm_setuju_view', true);
		$this->m_surat_keluar_revisi_view = $this->model('sipas/surat_keluar_revisi_view', true);
		$this->m_surat_keluar_setuju_list_view = $this->model('sipas/surat_keluar_setuju_list_view', true);
		$this->m_surat_keluar_tolak_view = $this->model('sipas/surat_keluar_tolak_view', true);
		$this->m_surat_keluar_blm_nomor_view = $this->model('sipas/surat_keluar_blm_nomor_view', true);
		$this->m_surat_keluar_blm_ekspedisi_view = $this->model('sipas/surat_keluar_blm_ekspedisi_view', true);
		$this->m_surat_keluar_ekspedisi_view = $this->model('sipas/surat_keluar_ekspedisi_view', true);

		$this->m_surat_ikeluar_aktif_view = $this->model('sipas/surat_ikeluar_aktif_view', true);
		$this->m_surat_ikeluar_hidup_view = $this->model('sipas/surat_ikeluar_hidup_view', true);
		$this->m_surat_ikeluar_setuju_view = $this->model('sipas/surat_ikeluar_setuju_view', true);
		$this->m_surat_ikeluar_setuju_list_view = $this->model('sipas/surat_ikeluar_setuju_list_view', true);
		$this->m_surat_ikeluar_draft_view = $this->model('sipas/surat_ikeluar_draft_view', true);
		$this->m_surat_ikeluar_dlm_setuju_view = $this->model('sipas/surat_ikeluar_dlm_setuju_view', true);
		$this->m_surat_ikeluar_revisi_view = $this->model('sipas/surat_ikeluar_revisi_view', true);
		$this->m_surat_ikeluar_blm_nomor_view = $this->model('sipas/surat_ikeluar_blm_nomor_view', true);
		$this->m_surat_ikeluar_blm_kirim_view = $this->model('sipas/surat_ikeluar_blm_kirim_view', true);
		$this->m_surat_ikeluar_blm_terima_view = $this->model('sipas/surat_ikeluar_blm_terima_view', true);
		$this->m_surat_ikeluar_terima_view = $this->model('sipas/surat_ikeluar_terima_view', true);
		$this->m_surat_ikeluar_tolak_view = $this->model('sipas/surat_ikeluar_tolak_view', true);

		$this->m_unit_cakupan_view = $this->model('sipas/unit_cakupan_view', true);
		$this->m_unit_cakupan_aktif_view        = $this->model('sipas/unit_cakupan_aktif_view', true);

		$this->m_staf_wakil = $this->model('sipas/staf_wakil', true);
		$this->m_staf_wakil_view = $this->model('sipas/staf_wakil_view', true);
		$this->m_staf_wakil_aktif_view = $this->model('sipas/staf_wakil_aktif_view', true);
		$this->m_jabatan_wakil = $this->model('sipas/jabatan_wakil', true);
		$this->m_jabatan_wakil_view = $this->model('sipas/jabatan_wakil_view', true);

		$this->m_setting = $this->model('sipas/pengaturan', true);
	}

	function index()
	{
		$this->info();
	}

	public function profile_update()
	{
		$user = $this->m_user;
		$user_view = $this->m_user_view;
		$account = $this->m_account;
		$properti = $this->m_properti;
		$akun = $account->get_profile_id();
		$id = varReq('id');
		$surel = varReq('surel');
		$akun_nama = varReq('user');
		$ponsel = varReq('ponsel');
		$pass = varReq('pass');
		$pass_lama = varReq('pass_lama');
		$passLama = $account->password($pass_lama);
		$data = array(
			'akun_surel' => $surel,
			'akun_sandi' => $pass,
			'akun_ponsel' => $ponsel,
			'akun_nama' => $akun_nama,
		);
		$user_data = $user->read($id);
		if ($pass) {
			if ($passLama === $user_data['akun_sandi']) {
				$data['akun_sandi'] = $account->password($data['akun_sandi']);

				$operation = $user->update($id, $data, function ($response) use ($user, $account, $data, $properti, $akun, $id) {
					$updated_data = $user->read($id);
					$idProp = $updated_data['akun_properti'];
					if (empty($idProp)) {
						$op = $properti->created($akun, $updated_data, 'akun', $updated_data['akun_id'], $updated_data['akun_nama']);
						if ($op) {
							$user->update($updated_data['akun_id'], array(
								'akun_properti' => $op['properti_id'],
							));
						}
					} else {
						$properti->updated($idProp, $akun, $updated_data, $updated_data['akun_nama']);
					}
				});
				if ($operation[$user->successProperty]) {
					$operation[$user->dataProperty] = $user->read($id);
				}
			} else {
				$operation = array('success' => false, 'message' => 'Password Lama Yang Anda Masukan Tidak Sesuai');
			}
		} else {
			unset($data['akun_sandi']);

			$operation = $user->update($id, $data, function ($response) use ($user, $account, $data, $properti, $akun, $id) {
				$updated_data = $user->read($id);
				$idProp = $updated_data['akun_properti'];
				if (empty($idProp)) {
					$op = $properti->created($akun, $updated_data, 'akun', $updated_data['akun_id'], $updated_data['akun_nama']);
					if ($op) {
						$user->update($updated_data['akun_id'], array(
							'akun_properti' => $op['properti_id'],
						));
					}
				} else {
					$properti->updated($idProp, $akun, $updated_data, $updated_data['akun_nama']);
				}
			});
			if ($operation[$user->successProperty]) {
				$operation[$user->dataProperty] = $user->read($id);
			}
		}

		$this->response($operation);
	}

	public function surat_keluar($section = null)
	{
		$model_keluar = $this->m_surat_keluar_hidup_view;
		$scope = $this->m_unit_cakupan_view;
		$account = $this->m_account;
		$profile = $this->m_account->get_profile();
		$pegawai = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('surat_id')) {
			$id = varGet('id', varGet('surat_id'));
			$record = $model_keluar->read($id);
			$this->response_record($record);
		} else {
			$filter = json_decode(varGet('filter', '[]'));
			$limit = varGet('limit');
			$start = varGet('start', 0);
			$sorter = json_decode(varGet('sort', '[]'));

			if (varGet('scope')) {
				$scopeid = varGet('scope');
			} else {
				$scopeid = $profile['staf_unit'];
			}
			switch ($section) {
				case 'read':
					$model = $this->m_surat_keluar_hidup_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'draft':
					$model = $this->m_surat_keluar_draft_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'dlm_setuju':
					$model = $this->m_surat_keluar_dlm_setuju_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'setuju':
					$model = $this->m_surat_keluar_setuju_list_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'revisi':
					$model = $this->m_surat_keluar_revisi_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'tolak':
					$model = $this->m_surat_keluar_tolak_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'blm_nomor':
					$model = $this->m_surat_keluar_blm_nomor_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'blm_ekspedisi':
					$model = $this->m_surat_keluar_blm_ekspedisi_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'ekspedisi':
					$model = $this->m_surat_keluar_ekspedisi_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				default:
					$model = $this->m_surat_keluar_aktif_view;
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));

					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
			}

			$records = $model->select(array(
				'limit' => $limit,
				'start' => $start,
				'filters' => json_encode($filter),
				'sort' => $sorter,
			));

			$this->response($records);
		}
	}

	public function surat_ikeluar($section = null)
	{
		$me = $this;

		$model_ikeluar = $me->m_surat_ikeluar_hidup_view;
		$scope = $me->m_unit_cakupan_view;
		$account = $me->m_account;
		$profile = $me->m_account->get_profile();
		$pegawai = $account->get_profile_id();

		$hariini = date('Y-m-d H:i:s');
		$filter = json_decode(varGet('filter', '[]'));
		$limit = varGet('limit');
		$start = varGet('start', 0);
		$sorter = json_decode(varGet('sort', '[]'));

		$tipeid = varGet('tipe');

		if (varGet('scope')) {
			$scopeid = varGet('scope');
		} else {
			$scopeid = $profile['staf_unit'];
		}

		if (varGetHas('id') || varGetHas('surat_id')) {

			$id = varGet('id', varGet('surat_id'));
			$record = $model_ikeluar->read($id);
			$me->response_record($record);
		} else {
			switch ($section) {
				case 'read':
					$surat_internal_view = $me->m_surat_ikeluar_hidup_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'draft':
					$surat_internal_view = $me->m_surat_ikeluar_draft_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'dlm_setuju':
					$surat_internal_view = $me->m_surat_ikeluar_dlm_setuju_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'setuju':
					$surat_internal_view = $me->m_surat_ikeluar_setuju_list_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'revisi':
					$surat_internal_view = $me->m_surat_ikeluar_revisi_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'blm_nomor':
					$surat_internal_view = $me->m_surat_ikeluar_blm_nomor_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'blm_kirim':
					$surat_internal_view = $me->m_surat_ikeluar_blm_kirim_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'blm_terima':
					$surat_internal_view = $me->m_surat_ikeluar_blm_terima_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'terima':
					$surat_internal_view = $me->m_surat_ikeluar_terima_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				case 'tolak':
					$surat_internal_view = $me->m_surat_ikeluar_tolak_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
				default:
					$surat_internal_view = $me->m_surat_ikeluar_aktif_view;
					// if($tipeid !== 'all' && !is_null($tipeid)){
					//     array_unshift($filter, (object)array(
					//         'type'  => 'exact',
					//         'field' => 'surat_itipe',
					//         'value' => $tipeid
					//     ));
					// }
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_unit',
						'value' => $scopeid,
					));
					array_unshift($filter, (object) array(
						'type' => 'exact',
						'field' => 'surat_properti_pembuat_id',
						'value' => $pegawai,
					));
					break;
			}

			$records = $surat_internal_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => json_encode($filter),
				'sorter' => $sorter,
			));
			$this->response($records);
		}
	}

	function masuk()
	{
		$me = $this;
		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$model_staf = $me->m_staf_view;
		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_aktif_view;

		$pegawai = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {
			$filter = json_decode(varGet('filter', '[]'));
			$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_isdistribusi,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NULL',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);

			$records = $disposisi_masuk_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($records);
		}
	}

	function masuk_blmbaca()
	{
		$me = $this;
		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$model_staf = $me->m_staf_view;
		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_blmbaca_view;

		$pegawai = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {
			$filter = json_decode(varGet('filter', '[]'));
			$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_isdistribusi,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NULL',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);

			$records = $disposisi_masuk_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($records);
		}
	}

	function masuk_baca()
	{
		$me = $this;
		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$model_staf = $me->m_staf_view;
		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_baca_view;

		$pegawai = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {
			$filter = json_decode(varGet('filter', '[]'));
			$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_isdistribusi,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NULL',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);

			$records = $disposisi_masuk_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($records);
		}
	}

	function masuk_terus()
	{
		$me = $this;
		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$model_staf = $me->m_staf_view;
		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_terus_view;

		$pegawai = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {
			$filter = json_decode(varGet('filter', '[]'));
			$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_isdistribusi,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NULL',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);

			$records = $disposisi_masuk_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($records);
		}
	}

	function koreksi()
	{
		$me = $this;

		$koreksi = $me->m_disposisi;
		$koreksi_view = $me->m_koreksi_view;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$account = $me->m_account;

		$user = $account->get_profile();

		$koreksi_penerima = $me->m_disposisi_masuk;
		$penerima_view = $me->m_koreksi_masuk_view;

		$pegawai = $user['akun_staf'];
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $penerima_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
					$disposisi_masuk->update($id, array(
						'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s'),
					));
				}
			}

			$record = $penerima_view->read($id);
			$this->response_record($record);
		} else {
			array_unshift($filter, (object) array(
				'property' => 'disposisi_masuk_staf',
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$records = $penerima_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$this->response($records);
		}
	}

	function koreksi_blmtindak()
	{
		$me = $this;

		$koreksi = $me->m_disposisi;
		$koreksi_view = $me->m_koreksi_view;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$account = $me->m_account;
		$user = $account->get_profile();

		$koreksi_penerima = $me->m_disposisi_masuk;
		$penerima_view = $me->m_koreksi_masuk_blmtindak_view;

		$pegawai = $user['akun_staf'];
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $penerima_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
					$disposisi_masuk->update($id, array(
						'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s'),
					));
				}
			}

			$record = $penerima_view->read($id);
			$this->response_record($record);
		} else {
			array_unshift($filter, (object) array(
				'property' => 'disposisi_masuk_staf',
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$records = $penerima_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$this->response($records);
		}
	}

	function koreksi_setuju()
	{
		$me = $this;

		$koreksi = $me->m_disposisi;
		$koreksi_view = $me->m_koreksi_view;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$account = $me->m_account;
		$user = $account->get_profile();

		$koreksi_penerima = $me->m_disposisi_masuk;
		$penerima_view = $me->m_koreksi_masuk_setuju_view;

		$pegawai = $user['akun_staf'];
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $penerima_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
					$disposisi_masuk->update($id, array(
						'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s'),
					));
				}
			}

			$record = $penerima_view->read($id);
			$this->response_record($record);
		} else {
			array_unshift($filter, (object) array(
				'property' => 'disposisi_masuk_staf',
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$records = $penerima_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$this->response($records);
		}
	}

	function koreksi_tolak()
	{
		$me = $this;

		$koreksi = $me->m_disposisi;
		$koreksi_view = $me->m_koreksi_view;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$account = $me->m_account;
		$user = $account->get_profile();

		$koreksi_penerima = $me->m_disposisi_masuk;
		$penerima_view = $me->m_koreksi_masuk_tolak_view;

		$pegawai = $user['akun_staf'];
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $penerima_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $penerima_view::BACA_INIT) {
					$disposisi_masuk->update($id, array(
						'disposisi_masuk_baca_tgl' => date('Y-m-d H:i:s'),
					));
				}
			}

			$record = $penerima_view->read($id);
			$this->response_record($record);
		} else {
			array_unshift($filter, (object) array(
				'property' => 'disposisi_masuk_staf',
				'value' => $pegawai,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => 'IFNULL(' . $surat_view::$field_approval_lookup . ', 0) <> ' . $surat_view::SETUJU_INIT,
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$records = $penerima_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$this->response($records);
		}
	}

	function disposisi($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function disposisi_blmbaca($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_blmbaca_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function disposisi_baca($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_baca_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function disposisi_terus($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_terus_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function disposisi_nonaktif($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_nonaktif_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function notadinas($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_notadinas_masuk_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function notadinas_blmbaca($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_notadinas_masuk_blmbaca_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function notadinas_baca($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_notadinas_masuk_baca_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function notadinas_terus($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_notadinas_masuk_terus_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function notadinas_nonaktif($section = null)
	{
		$me = $this;

		$account = $me->m_account;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$disposisi = $me->m_disposisi;

		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_notadinas_masuk_nonaktif_view;

		$limit = varGet('limit');
		$start = varGet('start', 0);
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$staf_id = $account->get_profile_id();

		if (varGetHas('id') || varGetHas('disposisi_masuk_id')) {
			$id = varGet('id', varGet('disposisi_masuk_id'));
			$get_record = $disposisi_masuk_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_masuk_staf'])) {
				if ((int) $get_record['disposisi_masuk_isbaca'] == $disposisi_masuk_view::BACA_INIT) {
					$disposisi_penerima->update($id, array(
						'disposisi_masuk_isbaca' => $disposisi_masuk_view::BACA_ISBACA,
						'disposisi_masuk_baca_tanggal' => date('Y-m-d H:i:s'),
					));
				}
			}
			$record = $disposisi_masuk_view->read($id);
			$me->response_record($record);
		} else {

			array_unshift($filter, (object) array(
				'property' => $disposisi_masuk::$field_receiver_id,
				'value' => $staf_id,
				'type' => 'exact',
			));
			array_unshift($filter, (object) array(
				'type' => 'custom',
				'value' => $disposisi::$field_induk . ' IS NOT NULL',
			));
			array_unshift($filter, (object) array(
				'property' => $surat_view::$field_distribusi_lookup,
				'value' => $surat::DISTRIBUSI_DISTRIBUSI,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$operation = $disposisi_masuk_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$me->response($operation);
		}
	}

	function pengajuan_koreksi()
	{
		$me = $this;

		$surat = $me->m_surat;
		$account = $me->m_account;
		$user = $account->get_profile();

		$koreksi = $me->m_disposisi;
		$koreksi_penerima = $me->m_disposisi_masuk;
		$penerima_view = $me->m_koreksi_masuk_view;
		$pengajuan_koreksi_view = $me->m_pengajuan_koreksi_view;

		$pegawai = $user['akun_staf'];
		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sorter', varGet('sort', '[]')));

		if (varGetHas('id') || varGetHas('disposisi_id')) {
			$id = varGet('id', varGet('disposisi_id'));
			$get_record = $pengajuan_koreksi_view->read($id);

			/*patch for flag as read if user acess it*/
			if ($get_record and $account->isMyProfileId($get_record['disposisi_staf'])) {
				if ((int) $get_record['disposisi_baca_tgl'] == $pengajuan_koreksi_view::BACA_INIT) {
					$koreksi->update($id, array(
						'disposisi_baca_tgl' => date('Y-m-d H:i:s'),
					));
				}
			}

			$record = $pengajuan_koreksi_view->read($id);
			$this->response_record($record);
		} else {
			array_unshift($filter, (object) array(
				'property' => $koreksi::$field_staf,
				'value' => $pegawai,
				'type' => 'exact',
			));

			$filter = json_encode($filter);
			$sorter = json_encode($sorter);
			$records = $pengajuan_koreksi_view->select(array(
				'limit' => varGet('limit'),
				'start' => varGet('start'),
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$this->response($records);
		}
	}

	function monitored_staf($id = null)
	{
		$me = $this;
		$account = $me->m_account;
		$staf_monitor = $me->m_staf_wakil;
		$user = $account->get_profile();
		$staf_model = $me->m_staf_view;
		$now = date('Y-m-d');

		$id = varGet('id');

		if ($id) {
			$records = $staf_model->read($id);
			$records['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $records['staf_id'];
		} else {
			$records = array();
		}

		$this->response_records($records);
	}

	function asistensi($section = null)
	{
		$me = $this;
		$account = $me->m_account;
		$surat = $me->m_surat;
		$koreksi = $me->m_koreksi_view;
		$staf_model = $me->m_staf_view;
		$now = date('Y-m-d');

		$staf_monitor = $me->m_staf_wakil;
		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;

		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_view;
		$disposisi_masuk_blmbaca_view = $me->m_disposisi_masuk_blmbaca_view;
		$disposisi_masuk_baca_view = $me->m_disposisi_masuk_baca_view;
		$disposisi_masuk_terus_view = $me->m_disposisi_masuk_terus_view;
		$disposisi_masuk_nonaktif_view = $me->m_disposisi_masuk_nonaktif_view;
		$notadinas_masuk_view = $me->m_notadinas_masuk_view;
		$notadinas_masuk_blmbaca_view = $me->m_notadinas_masuk_blmbaca_view;
		$notadinas_masuk_baca_view = $me->m_notadinas_masuk_baca_view;
		$notadinas_masuk_terus_view = $me->m_notadinas_masuk_terus_view;
		$notadinas_masuk_nonaktif_view = $me->m_notadinas_masuk_nonaktif_view;
		$koreksi_masuk_view = $me->m_koreksi_masuk_view;
		$koreksi_masuk_blmtindak_view = $me->m_koreksi_masuk_blmtindak_view;
		$koreksi_masuk_setuju_view = $me->m_koreksi_masuk_setuju_view;
		$koreksi_masuk_tolak_view = $me->m_koreksi_masuk_tolak_view;

		$riwayat_view = $me->m_disposisi_riwayat_view;
		$riwayat_aktif_view = $me->m_disposisi_riwayat_aktif_view;
		$riwayat_nonaktif_view = $me->m_disposisi_riwayat_nonaktif_view;

		$asisten = varGet('asisten');

		if ($asisten !== null) {
			$pegawai = $asisten;
		} else {
			$pegawai = null;
		}

		// $asistensi_rec = $staf_monitor->read(array(
		//     'staf_wakil_asisten' => $wakil
		// ));
		// if($asistensi_rec){

		//     if($asistensi_rec['staf_wakil_plt'] == 1 && $asistensi_rec['staf_wakil_tgl_selesai'] !== NULL && $asistensi_rec['staf_wakil_tgl_mulai'] !== NULL){
		//         // echo 'di plt';
		//         if($asistensi_rec['staf_wakil_tgl_mulai'] >= $now && $now <= $asistensi_rec['staf_wakil_tgl_selesai']){
		//             // echo 'aktif';
		//             $pegawai = $asistensi_rec['staf_wakil_staf'];
		//         }else{
		//                 // echo "nonaktif";
		//             $pegawai = NULL;
		//         }
		//     }else{
		//         $pegawai = $asistensi_rec['staf_wakil_staf'];
		//     }
		//  }

		$filter = json_decode(varGet('filter', '[]'));
		$sorter = json_decode(varGet('sort', '[]'));
		$limit = varGet('limit');
		$start = varGet('start', 0);

		switch ($section) {
			case 'masuk':
				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NULL',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'masuk_blmbaca':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NULL',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_blmbaca_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'masuk_baca':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NULL',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_baca_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'masuk_terus':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NULL',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_terus_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'disposisi':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'disposisi_blmbaca':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_blmbaca_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'disposisi_baca':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_baca_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'disposisi_terus':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_terus_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'notadinas':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
				));

				$filter = json_encode($filter);
				$records = $notadinas_masuk_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'disposisi_nonaktif':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $disposisi_masuk_nonaktif_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'notadinas':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $notadinas_masuk_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'notadinas_blmbaca':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $notadinas_masuk_blmbaca_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'notadinas_baca':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $notadinas_masuk_baca_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'notadinas_nonaktif':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $notadinas_masuk_nonaktif_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'notadinas_terus':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'property' => $surat::$field_distribusi_lookup,
					'value' => $surat::DISTRIBUSI_DISTRIBUSI,
					'type' => 'exact',
				));
				array_unshift($filter, (object) array(
					'type' => 'custom',
					'value' => $disposisi::$field_induk . ' IS NOT NULL',
				));

				$filter = json_encode($filter);
				$records = $notadinas_masuk_terus_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'riwayat':

				array_unshift($filter, (object) array(
					'property' => $disposisi::$field_staf,
					'value' => $pegawai,
					'type' => 'exact',
				));

				$filter = json_encode($filter);
				$records = $riwayat_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'riwayat_aktif':

				array_unshift($filter, (object) array(
					'property' => $disposisi::$field_staf,
					'value' => $pegawai,
					'type' => 'exact',
				));

				$filter = json_encode($filter);
				$records = $riwayat_aktif_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'riwayat_nonaktif':

				array_unshift($filter, (object) array(
					'property' => $disposisi::$field_staf,
					'value' => $pegawai,
					'type' => 'exact',
				));

				$filter = json_encode($filter);
				$records = $riwayat_nonaktif_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'koreksi':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_push($filter, array(
					'type' => 'custom',
					'value' => $surat::$field_approval_lookup . ' <> ' . $surat::SETUJU_INIT,
				));

				$filter = json_encode($filter);
				$records = $koreksi_masuk_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'koreksi_blmtindak':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_push($filter, array(
					'type' => 'custom',
					'value' => $surat::$field_approval_lookup . ' <> ' . $surat::SETUJU_INIT,
				));

				$filter = json_encode($filter);
				$records = $koreksi_masuk_blmtindak_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'koreksi_setuju':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_push($filter, array(
					'type' => 'custom',
					'value' => $surat::$field_approval_lookup . ' <> ' . $surat::SETUJU_INIT,
				));

				$filter = json_encode($filter);
				$records = $koreksi_masuk_setuju_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;

			case 'koreksi_tolak':

				array_unshift($filter, (object) array(
					'property' => $disposisi_masuk::$field_receiver_id,
					'value' => $pegawai,
					'type' => 'exact',
				));
				array_push($filter, array(
					'type' => 'custom',
					'value' => $surat::$field_approval_lookup . ' <> ' . $surat::SETUJU_INIT,
				));

				$filter = json_encode($filter);
				$records = $koreksi_masuk_tolak_view->select(array(
					'limit' => $limit,
					'start' => $start,
					'filter' => $filter,
					'sorter' => $sorter,
				));
				break;
		}

		if ($pegawai === null) {
			$records['monitored_staf'] = "Tidak ada pegawai yang dimonitor";
		} else {
			$datapegawai = $staf_model->read(array(
				'staf_id' => $pegawai,
			));

			if ($datapegawai['staf_nama'] === null) {
				$records['monitored_staf'] = "Tidak ada pegawai yang dimonitor";
			} else {
				$records['monitored_staf'] = $datapegawai['staf_nama'];
				$records['staf_image_preview'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . '/sipas/staf/get_image/foto?id=' . $datapegawai['staf_id'];
			}
		}
		$records['pegawai'] = $pegawai;

		$this->response($records);
	}

	function riwayat($section = null, $id = null)
	{
		$me = $this;
		$account = $me->m_account;
		$user = $account->get_profile();
		$disposisi = $me->m_disposisi;

		$disposisi_riwayat_view = $me->m_disposisi_riwayat_view;

		$pegawai = $user['staf_id'];
		$filter = json_decode(varGet('filter', '[]'));
		$limit = varGet('limit');
		$start = varGet('start', 0);
		$sorter = json_decode(varGet('sort', '[]'));

		if (varGetHas('id') || varGetHas('disposisi_id')) {
			$id = varGet('id', varGet('disposisi_id'));
			$record = $disposisi_view->read($id);

			$this->response_record($record);
		} else {
			array_unshift($filter, (object) array(
				'type' => 'exact',
				'property' => 'disposisi_staf',
				'value' => $pegawai,
			));
			$filter = json_encode($filter);
			$operation = $disposisi_riwayat_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

			$this->response($operation);
		}
	}

	function riwayat_aktif($section = null, $id = null)
	{
		$me = $this;
		$account = $me->m_account;
		$user = $account->get_profile();
		$disposisi = $me->m_disposisi;

		$riwayat_aktif_view = $me->m_disposisi_riwayat_aktif_view;

		$pegawai = $user['staf_id'];

		$filter = json_decode(varGet('filter', '[]'));
		$limit = varGet('limit');
		$start = varGet('start', 0);
		$sorter = json_decode(varGet('sort', '[]'));

		array_unshift($filter, (object) array(
			'type' => 'exact',
			'property' => 'disposisi_staf',
			'value' => $pegawai,
		));
		$filter = json_encode($filter);
		$operation = $riwayat_aktif_view->select(array(
			'limit' => $limit,
			'start' => $start,
			'filter' => $filter,
			'sorter' => $sorter,
		));

		$this->response($operation);
	}

	function riwayat_nonaktif($section = null, $id = null)
	{
		$me = $this;
		$account = $me->m_account;
		$user = $account->get_profile();
		$disposisi = $me->m_disposisi;

		$riwayat_nonaktif_view = $me->m_disposisi_riwayat_nonaktif_view;

		$pegawai = $user['staf_id'];

		$filter = json_decode(varGet('filter', '[]'));
		$limit = varGet('limit');
		$start = varGet('start', 0);
		$sorter = json_decode(varGet('sort', '[]'));

		array_unshift($filter, (object) array(
			'type' => 'exact',
			'property' => 'disposisi_staf',
			'value' => $pegawai,
		));
		$filter = json_encode($filter);
		$operation = $riwayat_nonaktif_view->select(array(
			'limit' => $limit,
			'start' => $start,
			'filter' => $filter,
			'sorter' => $sorter,
		));

		$this->response($operation);
	}

	function login($useToken = null)
	{
		$model = $this->m_account;
		$setting = $this->m_setting;

		$username = $this->input->post('username');
		$password = $this->input->post('password');

		if ($model->check_is_on_limit()) {
			$this->response(array(
				'success' => false,
				'message' => $this->get_message('login_limit', array(
					'count' => $this->limit_max,
					'delay' => $model->remain_limit_time(),
				)),
			));
			return;
		}

		// $auth = $model->login($username, $password, $useToken);
		$auth = null;
		$useSSO = (bool) $setting->getSettingByCode('sso_usessoldap');
		if ($useSSO) {

			$response = $model->do_auth_sso($username, $password);

			if ($response['success'] == true) {
				$auth = $model->login($username, false, $useToken);
				if (!empty($auth['success']) == 'false') {
					$pesan = $auth['message'];
					$auth = null;
				} else {
					$pesan = $this->get_message($auth ? 'login_success' : 'login_failed');
				}
			} else {
				$pesan = 'Login gagal, username/password anda salah. Jika terjadi 5 kali silahkan hubungi Administrator';
			}
		} else {
			// some hack for compatibility with client
			$auth = $model->login($username, $password, $useToken);

			if (!empty($auth['success']) == 'false') {
				$pesan = $auth['message'];
				$auth = null;
			} else {
				$pesan = $this->get_message($auth ? 'login_success' : 'login_failed');
			}
		}

		$response = array(
			'success' => !!$auth,
			'message' => $pesan,
		);
		$user = $model->read(array(
			$model->field_username => $username,
			$model->field_isactive => 1
		));
		if ($response[$model->successProperty]) {
			if ($useToken) {
				$response['token'] = $auth;
				$response['tokens'] = $model->createTokens($user['akun_id']);
				$response['access_token'] = null;
				$response['refresh_token'] = null;
				$response['token_type'] = 'Bearer';
				$response['mobile_version'] = $this->config->item('mobile_version');
				$response['setting'] = $setting->getSettings(false);
				// $response = array_merge(
				// 		$response,
				// 		$model->get_info_setting()
				// 	);
			} else {
				// if (!empty($auth['profiles'])) {
				$response['session'] = $auth;
				$response['session']['profile'] = $auth['profiles'][$user['akun_staf']]['profile'] ? $auth['profiles'][$user['akun_staf']]['profile'] : [];
				$response['session']['rules'] = $auth['profiles'][$user['akun_staf']]['rules'] ? $auth['profiles'][$user['akun_staf']]['rules'] : [];
				$response['islogin'] = !!$auth;
				$response['account-login'] = $model->islogin();
				// we need to carry on settings values to patch
				if (is_array($response['session'])) {
					$response['session'] = array_merge(
						$response['session'],
						$model->get_info_setting()
					);
				}
				// }
			}
		}
		$this->response($response);
	}

	function verify_token()
	{
		$this->response(array(
			'success' => false,
		));
	}

	/////////////
	// DEVICES //
	/////////////

	function requestDevice()
	{
		$account = $this->m_account;
		$deviceModel = $this->model('sipas/alat', true);
		$deviceModelView = $this->model('sipas/alat_view', true);
		$user = $account->get_profile();
		$userId = $user['akun_id'];

		// clear all unused
		$deviceModel->delete(array(
			'alat_akun' => $userId,
			'IFNULL(alat_aktif_tgl, 0) = 0' => null,
		));

		// create new one
		$exp_date = new DateTime();
		$exp_date->modify('+1 minute');
		$operation = $deviceModel->insert(array(
			'alat_akun' => $userId,
			'alat_aktif_tgl' => null,
			'alat_usang_tgl' => $exp_date->format('Y-m-d H:i:s'),
		));
		$this->response($operation);
	}

	function registerToken()
	{
		$account = $this->m_account;
		$deviceModel = $this->model('sipas/alat', true);
		$deviceModelView = $this->model('sipas/alat_view', true);
		$user = $account->get_profile();
		$userId = $user['akun_id'];
		$token = varGet('deviceId');

		$operation = $deviceModel->insert(array(
			'alat_akun' => $userId,
			'alat_data' => $token,
		));
		$this->response($operation);
	}

	function refreshToken()
	{
		$account = $this->m_account;
		$deviceModel = $this->model('sipas/alat', true);
		$deviceModelView = $this->model('sipas/alat_view', true);
		$user = $account->get_profile();
		$userId = $user['akun_id'];
		$alatId = varReq('deviceId');
		$tokenFcm = varReq('newToken');

		$operation = $deviceModel->update($alatId, array('alat_data' => $tokenFcm));

		$this->response($operation);
	}

	function removeToken()
	{
		$account = $this->m_account;
		$deviceModel = $this->model('sipas/alat', true);
		$deviceModelView = $this->model('sipas/alat_view', true);
		$user = $account->get_profile();
		$userId = $user['akun_id'];
		$token = varGet('deviceId');

		$operation = $deviceModel->delete(array(
			'alat_akun' => $userId,
			'alat_data' => $token,
		));

		$this->response($operation);
	}

	function reset_login($section = null, $id = null)
	{
		$queueTube = Config()->item('queueServer_notifTube');
		$queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

		$id = varReq('id', $id);
		$model = $this->m_account;
		$akun = $this->m_user;
		$account_id = $model->get_profile_id();
		$deviceModel = $this->model('sipas/alat', true);

		if ($section == 'web') {
			// if(!$id){
			// 	$id = $user['akun_id'];
			// }
			$query = "SELECT * FROM session WHERE data LIKE '%" . $id . "%' LIMIT 1";

			$hasil = $this->db->query($query);
			$data = $hasil->result_array();
			if (!$data) {
				$response = array(
					'success' => false,
					'message' => 'Akun ini belum login ke perangkat'
				);
			} else {
				$queryDelete = "DELETE FROM session WHERE data LIKE '%" . $id . "%'";
				$result = $this->db->query($queryDelete);
				$response = array(
					'success' => true,
					'message' => 'Akun berhasil dilepas dari perangkat'
				);
			}
		} else {
			$query = "SELECT * FROM alat WHERE alat_data IS NOT NULL AND alat_akun = '" . $id . "' LIMIT 1";

			$hasil = $this->db->query($query);
			$data = $hasil->result_array();
			if (!$data) {
				$response = array(
					'success' => false,
					'message' => 'Akun ini belum login ke perangkat'
				);
			} else {
				$deviceModel->delete(array(
					'alat_akun' => $id,
					'alat_data IS NOT NULL' => null
				));
				if (Config()->item('queueServer')['host']) {
					$data_fcm = array(
						'id' => $id,
						'type' => 'Reset',
						'from' => $account_id,
						'to' => $id,
						'data' => 'Session login anda telah di cabut.'
					);
					$addJob = create_job($queueTube, $data_fcm);
				}

				$response = array(
					'success' => true,
					'message' => 'Akun berhasil dilepas dari perangkat'
				);
			}
		}
		$this->response($response);
	}

	function checkToken()
	{
		$account = $this->m_account;
		$deviceModel = $this->model('sipas/alat', true);
		$deviceModelView = $this->model('sipas/alat_view', true);
		$user = $account->get_profile();
		$userId = $user['akun_id'];
		$token = [];
		$deviceId = varGet('device_data') ? varGet('device_data') : false;

		if ($deviceId) {
			$token = $deviceModel->find(array(
				'alat_akun' => $userId,
				'alat_data' => $deviceId,
			));
			if (empty($token)) {
				$response = array(
					'forcelogout' => true
				);
			} else {
				$response = array(
					'forcelogout' => false
				);
			}
		} else {
			$response = array(
				'forcelogout' => false
			);
		}
		$this->response($response);
	}

	function removeDevice()
	{
		$deviceId = varGet('alat_id');
		$deviceData = varGet('device_data') ? varGet('device_data') : false;

		$deviceModel = $this->model('sipas/alat', true);
		$deviceModelView = $this->model('sipas/alat_view', true); //no idea

		if (!$deviceData) {
			$operation = $deviceModel->delete(array(
				'alat_id' => $deviceId
			));
		} else {
			$operation = $deviceModel->delete(array(
				'alat_data' => $deviceData
			));
		}

		$this->response($operation);
	}


	function deviceLogin($id = null)
	{
		$id = varReq('id', $id);
		$model = $this->m_account;
		$setting = $this->m_setting;
		$deviceModel = $this->model('sipas/alat', true);
		$deviceModelView = $this->model('sipas/alat_view', true);

		$now = date('Y-m-d H:i:s');

		$device = $deviceModel->read($id);

		// device login expired
		if (strtotime($device['alat_usang_tgl']) < strtotime($now)) {
			$this->response(array(
				'success' => false,
				'message' => $this->get_message('login_expired'),
			));
			return;
		}

		// device login is valid
		$username = null;
		if ($device) {
			$account = $model->read($device['alat_akun']);
			$username = $account ? $account[$model->field_username] : null;
		}

		// try login
		$token = $model->login($username, $password = false, $useToken = true);
		$authed = !!$token;

		if ($authed) {
			$deviceModel->update($id, array(
				'alat_aktif_tgl' => $now,
			));
		}

		// simulate as standart login
		$response = array(
			'success' => $authed,
			'message' => $this->get_message($authed ? 'login_success' : 'login_failed'),
		);
		if ($response[$model->successProperty]) {
			if ($useToken) {
				$response['token'] = $token;
				$response['tokens'] = $model->createTokens($device['alat_akun']);
				$response['mobile_version'] = $this->config->item('mobile_version');
				$response['setting'] = $setting->getSettings(false);
			} else {
				$response['session'] = $token;
				$response['islogin'] = $authed;

				// we need to carry on settings values to patch
				if (is_array($response['session'])) {
					$response['session'] = array_merge(
						$response['session'],
						$model->get_info_setting()
					);
				}
			}
		}
		$this->response($response);
	}

	function logout()
	{
		$this->response(array(
			'success' => $this->m_account->logout(),
		));
	}

	function changepassword()
	{
		$model = $this->m_account;
		$oldpassword = varReq('oldpassword');
		$newpassword = varReq('newpassword');
		$response = array('success' => false);

		if ($model->islogin()) {
			if ($model->check_current_user_password($oldpassword)) {
				$op = $model->update_current_user_password($newpassword);
				if ($op[$model->successProperty]) {
					$response = array('success' => true, 'message' => $this->get_message('password_changed'));
				} else {
					$response = $op;
				}
			} else {
				$response = array('success' => false, 'message' => $this->get_message('invalid_oldpassword'));
			}
		} else {
			$response = array('success' => false, 'message' => $this->get_message('not_login'));
		}
		$this->response($response);
	}

	function info($type = null)
	{
		$model = $this->m_account;
		$res = $model->get_info($type);
		$res['status-login'] = $model->islogin();
		$this->response($res);
	}

	function gen_password($pass = null, $md5 = true)
	{
		if ($md5) {
			$pass = md5($pass);
		}

		$password = $this->m_account->password($pass);
		$this->response(array(
			'input' => $pass,
			'password' => $password,
		));
		return $password;
	}

	function scope($withCurrent = true)
	{
		$account = $this->m_account;
		$scope = $this->m_unit_cakupan;
		$scopeView = $this->m_unit_cakupan_hidup_view;
		$profile = $account->get_profile();
		$jabatan = $profile['jabatan_id'];

		$record = $scopeView->find(array('unit_cakupan_jabatan' => $jabatan));
		// foreach ($record as $k => $r) {}
		$r['records'] = $record;
		$data = $r['records'];

		if ($withCurrent) {
			$modelUnit = $this->m_unit;
			$modelAccount = $this->m_account;

			$currentUnitId = $modelAccount->get_unitkerja_id();
			$currentUnit = $modelUnit->read($currentUnitId);

			if ($currentUnit) {
				array_unshift($data, $currentUnit);
			}
		}

		$this->response(array(
			'data' => $data,
			'count' => count($data),
		));
	}

	function owner()
	{
		$account = $this->m_account;
		$modelUnit = $this->m_unit;
		$scope = $this->m_unit_cakupan;
		$scopeView = $this->m_unit_cakupan_hidup_view;
		$profile = $account->get_profile();
		$jabatan = $profile['jabatan_id'];

		$record = $scopeView->find(array('unit_cakupan_jabatan' => $jabatan, 'unit_isbuatsurat' => 1));
		$r['records'] = $record;
		$data = $r['records'];

		$currentUnitId = $account->get_unitkerja_id();
		$currentUnit = $modelUnit->read(array(
			'unit_id' => $currentUnitId,
			'unit_isbuatsurat' => 1
		));

		if ($currentUnit) {
			array_unshift($data, $currentUnit);
		}

		$this->response(array(
			'data' => $data,
			'count' => count($data),
		));
	}

	//function wakil() {
	//	$account = $this->m_account;
	//	$wakil = $this->m_staf_wakil_aktif_view;
	//	$jabatan_wakil = $this->m_jabatan_wakil;
	//	$staf_model = $this->m_staf;
	//	$staf_view = $this->m_staf_view;
	//	$staf_aktif = $this->m_staf_aktif_view;
	//	$profile = $account->get_profile();
	//	$profile_id = $account->get_profile_id();
	//
	// $record = $wakil->find(array('staf_wakil_asisten' => $profile_id, 'IFNULL(staf_wakil_plt, 0) = 0' => null));
	//find pimpinan
	//	$pimpinan = array();
	//	$find = $jabatan_wakil->find(array('jabatan_wakil_asisten' => $profile['jabatan_id']));
	//	foreach ($find as $key => &$value) {

	//		if($key == 0){
	//			$pimpinan = $staf_model->find(array('staf_jabatan' => $value['jabatan_wakil_jabatan'], 'IFNULL(staf_isaktif, 0) = 1' => null));

	//			foreach ($pimpinan as $key => &$val) {
	//				$val['staf_wakil_staf'] = $val['staf_id'];
	//				$val['staf_wakil_asisten'] = $profile_id;
	//				$val['staf_wakil_plt'] = 0;
	//			}
	//		}else{
	//			$record = $staf_model->find(array('staf_jabatan' => $value['jabatan_wakil_jabatan'], 'IFNULL(staf_isaktif, 0) = 1' => null));
	//	        $pimpinan = array_merge($pimpinan, $record);

	//			foreach ($pimpinan as $key => &$val) {
	//				$val['staf_wakil_staf'] = $val['staf_id'];
	//				$val['staf_wakil_asisten'] = $profile_id;
	//				$val['staf_wakil_plt'] = 0;
	//			}
	//		}
	//	}
	//	$pgs = $wakil->find(array('staf_wakil_asisten' => $profile_id, 'IFNULL(staf_wakil_plt, 0) = 1' => null,
	//				'staf_wakil_konfirmasi_asisten_status' => 2
	//			));
	//	$r['records'] = array_merge($pimpinan, $pgs);
	//	$data = $r['records'];
	//
	//	$this->response(array(
	//		'data' => $data,
	//		'count' => count($data),
	//	));
	//}

	function wakil()
	{
		$account = $this->m_account;
		$wakil = $this->m_staf_wakil_aktif_view;
		$staf_model = $this->m_staf_view;
		$profile_id = $account->get_profile_id();

		$record = $wakil->find(array('staf_wakil_asisten' => $profile_id, 'IFNULL(staf_wakil_plt, 0) = 0' => null));

		$records = $wakil->find(array(
			'staf_wakil_asisten' => $profile_id, 'IFNULL(staf_wakil_plt, 0) = 1' => null,
			'staf_wakil_konfirmasi_asisten_status' => 2
		));
		$r['records'] = array_merge($record, $records);
		$data = $r['records'];

		$this->response(array(
			'data' => $data,
			'count' => count($data),
		));
	}

	function pimpinan()
	{ //tom
		$staf_id = varGet('id');
		$wakil = $this->m_staf_wakil_aktif_view;
		$staf_model = $this->m_staf_view;

		$param = "('" . implode("','", json_decode($staf_id)) . "')";
		$query = $this->db->query("select staf_wakil_staf from v_staf_wakil_aktif where staf_wakil_asisten in " . $param);
		$result = $query->result_array();

		$this->response(array(
			'data' => $result,
			'count' => count($result),
		));
	}

	function notification($section = null)
	{
		$model = $this->m_notification;
		$m_account = $this->m_account;
		$wakil = $this->m_staf_wakil_aktif_view;
		//$jabatan_wakil = $this->m_jabatan_wakil;
		$staf_id = $m_account->get_profile_id();
		$staf = $m_account->get_profile();
		$staf_model = $this->m_staf;
		// $staf_aktif = $this->m_staf_aktif_view;
		$unit_cakupan_aktif_view  = $this->m_unit_cakupan_aktif_view;
		$output = array(
			'type' => 'event',
			'name' => 'notification',
			'data' => array(),
		);
		// $redis = new Redis(); 
		//        $redis->connect('127.0.0.1', 6379);
		//        $redis->auth("password");

		$setting = $this->m_setting;

		/*notif agenda*/
		if ($section === 'mobile') {
			// $notif_user = $redis->get(Config()->item('redisPrefix').'notif_staf:'.$staf_id);
			//       if($notif_user){
			//           $notif_user = json_decode($notif_user, true);
			// 	       $notif_panel = $model->get_notif_of_user('notif_user', $staf_id);
			//       }else{
			$notif_disposisi = $model->get_notif_of_user('disposisi', $staf_id);
			$notif_panel = $model->get_notif_of_user('notif_user', $staf_id);
			$notif_disposisi_masuk = $model->get_notif_of_user('disposisi_masuk', $staf_id);

			$notif_user = array(
				'notif_user'         				=> $notif_panel,
				'disposisi_status_baca_tindakan'   	=> $notif_disposisi['disposisi_status_baca_tindakan'],
				'kotakmasuk_belumditindak'         	=> $notif_disposisi_masuk['kotakmasuk_belumdibaca'],
				'draft_belumditindak'            	=> $notif_disposisi_masuk['draft_belumdibaca'],
				'tugassaya_belumditindak'         	=> $notif_disposisi_masuk['draft_belumditindak'] + $notif_disposisi_masuk['kotakmasuk_belumditindak']
			);

			// $redis->set(Config()->item('redisPrefix').'notif_staf:'.$staf_id, json_encode($notif_user));
			// }
			$pimpinan = $wakil->find(array('staf_wakil_asisten' => $staf_id));
			$notif_asisten = array();

			foreach ($pimpinan as $key => $val) {

				// $notif_asisten_redis = $redis->get(Config()->item('redisPrefix').'notif_staf:'.$val['staf_wakil_staf']);

				// if($notif_asisten_redis){
				//     $notif_asisten_redis = json_decode($notif_asisten_redis, true);
				//     array_push($notif_asisten, $notif_asisten_redis);
				// }else{
				$notif_disposisi = $model->get_notif_of_user('disposisi', $val['staf_wakil_staf']);
				$notif_disposisi_masuk = $model->get_notif_of_user('disposisi_masuk', $val['staf_wakil_staf']);
				$notif_asisten_redis = array(
					'disposisi_status_baca_tindakan'   	=> $notif_disposisi['disposisi_status_baca_tindakan'],
					'kotakmasuk_belumditindak'         	=> $notif_disposisi_masuk['kotakmasuk_belumdibaca'],
					'draft_belumditindak'            	=> $notif_disposisi_masuk['draft_belumdibaca'],
					'tugassaya_belumditindak'         	=> $notif_disposisi_masuk['draft_belumditindak'] + $notif_disposisi_masuk['kotakmasuk_belumditindak']
				);
				// $redis->set(Config()->item('redisPrefix').'notif_staf:'.$val['staf_wakil_staf'], json_encode($notif_asisten_redis));
				array_push($notif_asisten, $notif_asisten_redis);
				// }
			}
			$asistensi_all = 0;
			if ($notif_asisten) {
				$asistensi_all = array_sum(array_column($notif_asisten, 'tugassaya_belumditindak'));
			}
			/*notif session*/
			$output['data']['notif_user'] = (int) $notif_panel;  //tom
			$output['data']['disposisi_status_baca_tindakan'] = (int) $notif_user['disposisi_status_baca_tindakan'];
			$output['data']['kotakmasuk_belumditindak'] = (int) $notif_user['kotakmasuk_belumditindak'];
			$output['data']['draft_belumditindak'] = (int) $notif_user['draft_belumditindak'];
			$output['data']['tugassaya_belumditindak'] = (int) $notif_user['tugassaya_belumditindak'];
			/*notif asistensi*/
			if ($m_account->get_rule_access('asistensi_monitoring') or $m_account->get_rule_access(crc32('asistensi_monitoring'))) {
				$output['data']['asistensi_all_new'] = (int) $asistensi_all;
			}
		} else {
			$notif_unit_cakupan = array();

			$unit  = $unit_cakupan_aktif_view->find(array(
				'unit_cakupan_jabatan' => $staf['staf_jabatan']
			));

			foreach ($unit as $key => $value) {
				// $notif_unit_cakupan_redis = array();
				// if($staf['staf_unit'] != $value['unit_cakupan_unit']){
				//     $notif_unit_cakupan_redis = $redis->get(Config()->item('redisPrefix').'notif_unit:'.$value['unit_cakupan_unit']);
				// }
				// if(!empty($notif_unit_cakupan_redis)){
				//     $notif_unit_cakupan_redis = json_decode($notif_unit_cakupan_redis, true);
				//     array_push($notif_unit_cakupan, $notif_unit_cakupan_redis);
				// }else{
				$notif_unit_cakupan_db = $model->get_notif_of_unit('notif_unit', $value['unit_cakupan_unit']);
				if ($notif_unit_cakupan_db) {
					$notif_unit_cakupan_redis = array(
						'agmasuk_pendistribusian' 		=> $notif_unit_cakupan_db['agmasuk_pendistribusian'],
						'agmasuk_request_berkas'     	=> $notif_unit_cakupan_db['agmasuk_request_berkas'],
						'agkeluar_blmekspedisi'   		=> $notif_unit_cakupan_db['agkeluar_blmekspedisi'],
						'agkeluar_blmnomor'       		=> $notif_unit_cakupan_db['agkeluar_blmnomor'],
						'agkeluar_request_berkas' 		=> $notif_unit_cakupan_db['agkeluar_request_berkas'],
						'agmasukinternal_pending' 		=> $notif_unit_cakupan_db['agmasukinternal_pending'],
						'agmasukinternal_request_berkas' => $notif_unit_cakupan_db['agmasukinternal_request_berkas'],
						'agkeluarinternal_tolak'   		=> $notif_unit_cakupan_db['agkeluarinternal_tolak'],
						//'agkeluarinternal_ulasan'   		=> $notif_unit_cakupan_db['agkeluarinternal_ulasan'],
						'agkeluarinternal_blmnomor' 		=> $notif_unit_cakupan_db['agkeluarinternal_blmnomor'],
						'agmasuk_reminder_7' 			=> $notif_unit_cakupan_db['agmasuk_reminder_7'],
						'agmasuk_reminder_3' 			=> $notif_unit_cakupan_db['agmasuk_reminder_3'],
						'agmasuk_reminder_1' 			=> $notif_unit_cakupan_db['agmasuk_reminder_1'],
						'agmasukinternal_reminder_7' 	=> $notif_unit_cakupan_db['agmasukinternal_reminder_7'],
						'agmasukinternal_reminder_3' 	=> $notif_unit_cakupan_db['agmasukinternal_reminder_3'],
						'agmasukinternal_reminder_1' 	=> $notif_unit_cakupan_db['agmasukinternal_reminder_1']
					);
					# code...
				}
				// $redis->set(Config()->item('redisPrefix').'notif_unit:'.$value['unit_cakupan_unit'], json_encode($notif_unit_cakupan_redis));
				array_push($notif_unit_cakupan, $notif_unit_cakupan_redis);
				// }
			}

			// $notif_unit_redis = $redis->get(Config()->item('redisPrefix').'notif_unit:'.$staf['staf_unit']);

			//     if($notif_unit_redis){
			//     	$notif_unit_redis = json_decode($notif_unit_redis, true);
			//     	if($notif_unit_cakupan){
			//     		$notif_unit = array(
			//    'agmasuk_pendistribusian'   	=> $notif_unit_redis['agmasuk_pendistribusian'] + array_sum(array_column($notif_unit_cakupan,'agmasuk_pendistribusian')),
			//    'agmasuk_request_berkas'   	=> $notif_unit_redis['agmasuk_request_berkas'] + array_sum(array_column($notif_unit_cakupan,'agmasuk_request_berkas')),
			//    'agkeluar_blmekspedisi'     	=> $notif_unit_redis['agkeluar_blmekspedisi'] + array_sum(array_column($notif_unit_cakupan,'agkeluar_blmekspedisi')),
			//    'agkeluar_blmnomor'         	=> $notif_unit_redis['agkeluar_blmnomor'] + array_sum(array_column($notif_unit_cakupan,'agkeluar_blmnomor')),
			//    'agkeluar_request_berkas'     => $notif_unit_redis['agkeluar_request_berkas'] + array_sum(array_column($notif_unit_cakupan,'agkeluar_request_berkas')),
			//    'agmasukinternal_pending'   	=> $notif_unit_redis['agmasukinternal_pending'] + array_sum(array_column($notif_unit_cakupan,'agmasukinternal_pending')),
			//    'agmasukinternal_request_berkas' => $notif_unit_redis['agmasukinternal_request_berkas'] + array_sum(array_column($notif_unit_cakupan,'agmasukinternal_request_berkas')),
			//    'agkeluarinternal_tolak'     	=> $notif_unit_redis['agkeluarinternal_tolak'] + array_sum(array_column($notif_unit_cakupan,'agkeluarinternal_tolak')),
			//    'agkeluarinternal_ulasan'   	=> $notif_unit_redis['agkeluarinternal_ulasan'] + array_sum(array_column($notif_unit_cakupan,'agkeluarinternal_ulasan')),
			//    'agkeluarinternal_blmnomor' 	=> $notif_unit_redis['agkeluarinternal_blmnomor'] + array_sum(array_column($notif_unit_cakupan,'agkeluarinternal_blmnomor')),
			//    'agmasuk_reminder_7' 			=> $notif_unit_redis['agmasuk_reminder_7'] + array_sum(array_column($notif_unit_cakupan,'agmasuk_reminder_7')),
			//    'agmasuk_reminder_3' 			=> $notif_unit_redis['agmasuk_reminder_3'] + array_sum(array_column($notif_unit_cakupan,'agmasuk_reminder_3')),
			//    'agmasuk_reminder_1' 			=> $notif_unit_redis['agmasuk_reminder_1'] + array_sum(array_column($notif_unit_cakupan,'agmasuk_reminder_1')),
			//    'agmasukinternal_reminder_7' 	=> $notif_unit_redis['agmasukinternal_reminder_7'] + array_sum(array_column($notif_unit_cakupan,'agmasukinternal_reminder_7')),
			//    'agmasukinternal_reminder_3' 	=> $notif_unit_redis['agmasukinternal_reminder_3'] + array_sum(array_column($notif_unit_cakupan,'agmasukinternal_reminder_3')),
			//    'agmasukinternal_reminder_1' 	=> $notif_unit_redis['agmasukinternal_reminder_1'] + array_sum(array_column($notif_unit_cakupan,'agmasukinternal_reminder_1'))
			// );
			//     	}else{
			//     		$notif_unit = array(
			//    'agmasuk_pendistribusian'   		=> $notif_unit_redis['agmasuk_pendistribusian'],
			//    'agmasuk_request_berkas'   		=> $notif_unit_redis['agmasuk_request_berkas'],
			//    'agkeluar_blmekspedisi'     		=> $notif_unit_redis['agkeluar_blmekspedisi'],
			//    'agkeluar_blmnomor'         		=> $notif_unit_redis['agkeluar_blmnomor'],
			//    'agkeluar_request_berkas'         => $notif_unit_redis['agkeluar_request_berkas'],
			//    'agmasukinternal_pending'   		=> $notif_unit_redis['agmasukinternal_pending'],
			//    'agmasukinternal_request_berkas'  => $notif_unit_redis['agmasukinternal_request_berkas'],
			//    'agkeluarinternal_tolak'    		=> $notif_unit_redis['agkeluarinternal_tolak'],
			//    'agkeluarinternal_ulasan'   		=> $notif_unit_redis['agkeluarinternal_ulasan'],
			//    'agkeluarinternal_blmnomor' 		=> $notif_unit_redis['agkeluarinternal_blmnomor'],
			//    'agmasuk_reminder_7' 				=> $notif_unit_redis['agmasuk_reminder_7'],
			//    'agmasuk_reminder_3' 				=> $notif_unit_redis['agmasuk_reminder_3'],
			//    'agmasuk_reminder_1' 				=> $notif_unit_redis['agmasuk_reminder_1'],
			//    'agmasukinternal_reminder_7' 		=> $notif_unit_redis['agmasukinternal_reminder_7'],
			//    'agmasukinternal_reminder_3' 		=> $notif_unit_redis['agmasukinternal_reminder_3'],
			//    'agmasukinternal_reminder_1' 		=> $notif_unit_redis['agmasukinternal_reminder_1']
			// );
			//     	}
			//     }else{
			$notif_unit_db = $model->get_notif_of_unit('notif_unit', $staf['staf_unit']);
			$notif_unit_redis = array(
				'agmasuk_pendistribusian' 	=> $notif_unit_db['agmasuk_pendistribusian'],
				'agmasuk_request_berkas' 	=> $notif_unit_db['agmasuk_request_berkas'],
				'agkeluar_blmekspedisi'   	=> $notif_unit_db['agkeluar_blmekspedisi'],
				'agkeluar_blmnomor'       	=> $notif_unit_db['agkeluar_blmnomor'],
				'agkeluar_request_berkas'    => $notif_unit_db['agkeluar_request_berkas'],
				'agmasukinternal_pending' 	=> $notif_unit_db['agmasukinternal_pending'],
				'agmasukinternal_request_berkas' => $notif_unit_db['agmasukinternal_request_berkas'],
				'agkeluarinternal_tolak'   	=> $notif_unit_db['agkeluarinternal_tolak'],
				//'agkeluarinternal_ulasan'   	=> $notif_unit_db['agkeluarinternal_ulasan'],
				'agkeluarinternal_blmnomor' 	=> $notif_unit_db['agkeluarinternal_blmnomor'],
				'agmasuk_reminder_7' 		=> $notif_unit_db['agmasuk_reminder_7'],
				'agmasuk_reminder_3' 		=> $notif_unit_db['agmasuk_reminder_3'],
				'agmasuk_reminder_1' 		=> $notif_unit_db['agmasuk_reminder_1'],
				'agmasukinternal_reminder_7' => $notif_unit_db['agmasukinternal_reminder_7'],
				'agmasukinternal_reminder_3' => $notif_unit_db['agmasukinternal_reminder_3'],
				'agmasukinternal_reminder_1' => $notif_unit_db['agmasukinternal_reminder_1']
			);
			// $redis->set(Config()->item('redisPrefix').'notif_unit:'.$staf['staf_unit'], json_encode($notif_unit_redis));

			if ($notif_unit_cakupan) {
				$notif_unit = array(
					'agmasuk_pendistribusian'   	=> $notif_unit_redis['agmasuk_pendistribusian'] + array_sum(array_column($notif_unit_cakupan, 'agmasuk_pendistribusian')),
					'agmasuk_request_berkas'   	=> $notif_unit_redis['agmasuk_request_berkas'] + array_sum(array_column($notif_unit_cakupan, 'agmasuk_request_berkas')),
					'agkeluar_blmekspedisi'     	=> $notif_unit_redis['agkeluar_blmekspedisi'] + array_sum(array_column($notif_unit_cakupan, 'agkeluar_blmekspedisi')),
					'agkeluar_blmnomor'         	=> $notif_unit_redis['agkeluar_blmnomor'] + array_sum(array_column($notif_unit_cakupan, 'agkeluar_blmnomor')),
					'agkeluar_request_berkas'    => $notif_unit_redis['agkeluar_request_berkas'] + array_sum(array_column($notif_unit_cakupan, 'agkeluar_request_berkas')),
					'agmasukinternal_pending'   	=> $notif_unit_redis['agmasukinternal_pending'] + array_sum(array_column($notif_unit_cakupan, 'agmasukinternal_pending')),
					'agmasukinternal_request_berkas' => $notif_unit_redis['agmasukinternal_request_berkas'] + array_sum(array_column($notif_unit_cakupan, 'agmasukinternal_request_berkas')),
					'agkeluarinternal_tolak'     => $notif_unit_redis['agkeluarinternal_tolak'] + array_sum(array_column($notif_unit_cakupan, 'agkeluarinternal_tolak')),
					//'agkeluarinternal_ulasan'   	=> $notif_unit_redis['agkeluarinternal_ulasan'] + array_sum(array_column($notif_unit_cakupan,'agkeluarinternal_ulasan')),
					'agkeluarinternal_blmnomor' 	=> $notif_unit_redis['agkeluarinternal_blmnomor'] + array_sum(array_column($notif_unit_cakupan, 'agkeluarinternal_blmnomor')),
					'agmasuk_reminder_7' 	=> $notif_unit_redis['agmasuk_reminder_7'] + array_sum(array_column($notif_unit_cakupan, 'agmasuk_reminder_7')),
					'agmasuk_reminder_3' 	=> $notif_unit_redis['agmasuk_reminder_3'] + array_sum(array_column($notif_unit_cakupan, 'agmasuk_reminder_3')),
					'agmasuk_reminder_1' 	=> $notif_unit_redis['agmasuk_reminder_1'] + array_sum(array_column($notif_unit_cakupan, 'agmasuk_reminder_1')),
					'agmasukinternal_reminder_7' => $notif_unit_redis['agmasukinternal_reminder_7'] + array_sum(array_column($notif_unit_cakupan, 'agmasukinternal_reminder_7')),
					'agmasukinternal_reminder_3' => $notif_unit_redis['agmasukinternal_reminder_3'] + array_sum(array_column($notif_unit_cakupan, 'agmasukinternal_reminder_3')),
					'agmasukinternal_reminder_1' => $notif_unit_redis['agmasukinternal_reminder_1'] + array_sum(array_column($notif_unit_cakupan, 'agmasukinternal_reminder_1'))
				);
			} else {
				$notif_unit = array(
					'agmasuk_pendistribusian'   	=> $notif_unit_redis['agmasuk_pendistribusian'],
					'agmasuk_request_berkas'   	=> $notif_unit_redis['agmasuk_request_berkas'],
					'agkeluar_blmekspedisi'     	=> $notif_unit_redis['agkeluar_blmekspedisi'],
					'agkeluar_blmnomor'         	=> $notif_unit_redis['agkeluar_blmnomor'],
					'agkeluar_request_berkas'    => $notif_unit_redis['agkeluar_request_berkas'],
					'agmasukinternal_pending'   	=> $notif_unit_redis['agmasukinternal_pending'],
					'agmasukinternal_request_berkas' => $notif_unit_redis['agmasukinternal_request_berkas'],
					'agkeluarinternal_tolak'     => $notif_unit_redis['agkeluarinternal_tolak'],
					//'agkeluarinternal_ulasan'   	=> $notif_unit_redis['agkeluarinternal_ulasan'],
					'agkeluarinternal_blmnomor' 	=> $notif_unit_redis['agkeluarinternal_blmnomor'],
					'agmasuk_reminder_7' 		=> $notif_unit_redis['agmasuk_reminder_7'],
					'agmasuk_reminder_3' 		=> $notif_unit_redis['agmasuk_reminder_3'],
					'agmasuk_reminder_1' 		=> $notif_unit_redis['agmasuk_reminder_1'],
					'agmasukinternal_reminder_7' => $notif_unit_redis['agmasukinternal_reminder_7'],
					'agmasukinternal_reminder_3' => $notif_unit_redis['agmasukinternal_reminder_3'],
					'agmasukinternal_reminder_1' => $notif_unit_redis['agmasukinternal_reminder_1']
				);
			}
			// }

			// $notif_arah_redis = $redis->get(Config()->item('redisPrefix').'notif_unit_pengarahan');
			// if($notif_arah_redis){
			//     $notif_arah_redis = json_decode($notif_arah_redis, true);
			//     $notif_arah = array(
			//         'agmasuk_pengarahan' => $notif_arah_redis['agmasuk_pengarahan']
			//     );
			// }else{
			$notif_arah = array(
				'agmasuk_pengarahan' => $model->get_notif_of_unit('agmasuk_pengarahan', $staf['staf_unit'])
			);
			// $redis->set(Config()->item('redisPrefix').'notif_unit_pengarahan', json_encode($notif_arah));
			// }

			// $notif_user = $redis->get(Config()->item('redisPrefix').'notif_staf:'.$staf_id);
			// if($notif_user){
			//     $notif_user = json_decode($notif_user, true);
			//     $notif_panel = $model->get_notif_of_user('notif_user', $staf_id);
			// }else{

			$notif_panel = $model->get_notif_of_user('notif_user', $staf_id);
			$notif_disposisi = $model->get_notif_of_user('disposisi', $staf_id);
			$notif_disposisi_masuk = $model->get_notif_of_user('disposisi_masuk', $staf_id);

			$notif_user = array(
				'notif_user'         				=> $notif_panel,
				'disposisi_status_baca_tindakan'   	=> $notif_disposisi['disposisi_status_baca_tindakan'],
				'kotakmasuk_belumditindak'         	=> $notif_disposisi_masuk['kotakmasuk_belumdibaca'],
				'draft_belumditindak'            	=> $notif_disposisi_masuk['draft_belumdibaca'],
				'tugassaya_belumditindak'         	=> $notif_disposisi_masuk['draft_belumditindak'] + $notif_disposisi_masuk['kotakmasuk_belumditindak']
			);

			//     $redis->set(Config()->item('redisPrefix').'notif_staf:'.$staf_id, json_encode($notif_user));
			// }
			$pimpinan = $wakil->find(array('staf_wakil_asisten' => $staf_id));
			$notif_asisten = array();

			foreach ($pimpinan as $key => $val) {

				// $notif_asisten_redis = $redis->get(Config()->item('redisPrefix').'notif_staf:'.$val['staf_wakil_staf']);

				// if($notif_asisten_redis){
				//     $notif_asisten_redis = json_decode($notif_asisten_redis, true);
				//     array_push($notif_asisten, $notif_asisten_redis);
				// }else{
				$notif_disposisi = $model->get_notif_of_user('disposisi', $val['staf_wakil_staf']);
				$notif_disposisi_masuk = $model->get_notif_of_user('disposisi_masuk', $val['staf_wakil_staf']);
				if ($notif_disposisi && $notif_disposisi_masuk) {
					$notif_asisten_redis = array(
						'disposisi_status_baca_tindakan'   	=> $notif_disposisi['disposisi_status_baca_tindakan'],
						'kotakmasuk_belumditindak'         	=> $notif_disposisi_masuk['kotakmasuk_belumdibaca'],
						'draft_belumditindak'            	=> $notif_disposisi_masuk['draft_belumdibaca'],
						'tugassaya_belumditindak'         	=> $notif_disposisi_masuk['draft_belumditindak'] + $notif_disposisi_masuk['kotakmasuk_belumditindak']
					);
					// $redis->set(Config()->item('redisPrefix').'notif_staf:'.$val['staf_wakil_staf'], json_encode($notif_asisten_redis));
					array_push($notif_asisten, $notif_asisten_redis);
					// }
				}
			}
			$asistensi_all = 0;
			if ($notif_asisten) {
				$asistensi_all = array_sum(array_column($notif_asisten, 'tugassaya_belumditindak'));
			}

			$output['data']['agmasuk_pengarahan'] = (int) $notif_arah['agmasuk_pengarahan'];
			$output['data']['agmasuk_pendistribusian'] = (int) $notif_unit['agmasuk_pendistribusian'];
			$output['data']['agmasuk_request_berkas'] = (int) $notif_unit['agmasuk_request_berkas'];
			$output['data']['agkeluar_blmekspedisi'] = (int) $notif_unit['agkeluar_blmekspedisi'];
			$output['data']['agkeluar_blmnomor'] = (int) $notif_unit['agkeluar_blmnomor'];
			$output['data']['agkeluar_request_berkas'] = (int) $notif_unit['agkeluar_request_berkas'];
			$output['data']['agmasukinternal_pending'] = (int) $notif_unit['agmasukinternal_pending'];
			$output['data']['agkeluarinternal_tolak'] = (int) $notif_unit['agkeluarinternal_tolak'];
			$output['data']['agmasukinternal_request_berkas'] = (int) $notif_unit['agmasukinternal_request_berkas'];
			//$output['data']['agkeluarinternal_ulasan'] = (int) $notif_unit['agkeluarinternal_ulasan'];
			$output['data']['agkeluarinternal_blmnomor'] = (int) $notif_unit['agkeluarinternal_blmnomor'];

			$output['data']['agmasuk_reminder_7'] = (int) $notif_unit['agmasuk_reminder_7'];
			$output['data']['agmasuk_reminder_3'] = (int) $notif_unit['agmasuk_reminder_3'];
			$output['data']['agmasuk_reminder_1'] = (int) $notif_unit['agmasuk_reminder_1'];
			$output['data']['agmasukinternal_reminder_7'] = (int) $notif_unit['agmasukinternal_reminder_7'];
			$output['data']['agmasukinternal_reminder_3'] = (int) $notif_unit['agmasukinternal_reminder_3'];
			$output['data']['agmasukinternal_reminder_1'] = (int) $notif_unit['agmasukinternal_reminder_1'];

			/*notif session*/
			$output['data']['notif_user'] = (int) $notif_panel;
			$output['data']['disposisi_status_baca_tindakan'] = (int) $notif_user['disposisi_status_baca_tindakan'];
			$output['data']['kotakmasuk_belumditindak'] = (int) $notif_user['kotakmasuk_belumditindak'];
			$output['data']['draft_belumditindak'] = (int) $notif_user['draft_belumditindak'];
			$output['data']['tugassaya_belumditindak'] = (int) $notif_user['tugassaya_belumditindak'];

			/*notif asistensi*/
			if ($m_account->get_rule_access('asistensi_monitoring') or $m_account->get_rule_access(crc32('asistensi_monitoring'))) {
				$output['data']['asistensi_all'] = (int) $asistensi_all;
			}
		}

		$this->response($output);
	}

	function newmail($section = null)
	{
		$model = $this->m_notification;
		$records = array();

		if ($section) {
			$records = $model->get_newmail_of($section);
		} else {
			$records = array_merge(
				(array) $model->get_newmail_of('disposisi'),
				(array) $model->get_newmail_of('notadinas'),
				(array) $model->get_newmail_of('masuk'),
				(array) $model->get_newmail_of('koreksi')
				// (array) $model->get_newmail_of('koreksi_status')
			);
		}

		$this->response_records($records);
	}
}
