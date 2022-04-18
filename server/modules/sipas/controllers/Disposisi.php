<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Disposisi extends Base_Controller {

	public $report_template = 'sipas/disposisi/pengirim';
	public $report_title = 'Surat Keterangan Pengirim Disposisi';
	public $report_subtitle = 'Surat ini menerangkan bahwa pegawai dibawah ini telah melakukan disposisi dengan rincian sebagai berikut:';

	function __construct() {
		parent::__construct();
		$this->m_notifikasi = $this->model('sipas/notifikasi', true);
		$this->m_user = $this->model('sipas/akun', true);
		$this->m_account = $this->model('sipas/account', true);
		$this->m_staf = $this->model('sipas/staf', true);
		$this->m_staf_view = $this->model('sipas/staf_view', true);
		$this->m_pengaturan = $this->model('sipas/pengaturan', true);

		$this->m_report = $this->model('sipas/report', true);
		$this->m_asset = $this->model('sipas/asset', true);

		$this->m_surat = $this->model('sipas/surat', true);
		$this->m_surat_view = $this->model('sipas/surat_view', true);
		$this->m_surat_log = $this->model('sipas/surat_log', true);
		$this->m_staf_view = $this->model('sipas/staf_view', true);
		$this->m_disposisi = $this->model('sipas/disposisi', true);
		$this->m_disposisi_view = $this->model('sipas/disposisi_view', true);
		$this->m_disposisi_netral_view = $this->model('sipas/disposisi_netral_view', true);
		$this->m_disposisi_aktif_view = $this->model('sipas/disposisi_aktif_view', true);
		$this->m_disposisi_lite_view = $this->model('sipas/disposisi_lite_view', true);

		$this->m_disposisi_masuk = $this->model('sipas/disposisi_masuk', true);
		$this->m_disposisi_masuk_aktif_view = $this->model('sipas/disposisi_masuk_aktif_view', true);
		$this->m_disposisi_masuk_lite_view = $this->model('sipas/disposisi_masuk_lite_view', true);
		$this->m_disposisi_masuk_log = $this->model('sipas/disposisi_masuk_log', true);
		$this->m_disposisi_perintah_log = $this->model('sipas/disposisi_perintah_log', true);
		$this->m_staf_recent = $this->model('sipas/staf_aktual', true);
		$this->m_jabatan_recent = $this->model('sipas/jabatan_aktual', true);

		$this->m_disposisi_masuk_view = $this->model('sipas/disposisi_masuk_netral_view', true);
		// $this->m_addons                 = $this->model('sipas/addons_config',          true);
		$this->m_properti = $this->model('sipas/properti', true);

		$this->m_disposisi_riwayat_view = $this->model('sipas/disposisi_riwayat_view', true);
	}

	function index() {
		$this->read();
	}

	function read($section = null) {
		$me = $this;

		$user = $me->m_account->get_profile();
		$profileId = $me->m_account->get_profile_id();
		$disposisi = $this->m_disposisi;
		$disposisi_view = $this->m_disposisi_netral_view;

        $now = date('Y-m-d'); 

        $useredis = Config()->item('useredis');
        if($useredis == 1){
            $pgs = $redis->get(Config()->item('redisPrefix').'staf_wakil_staf:'.$staf_id);
            $pgs = json_decode($pgs, true);
        }

		$pegawai = $user['staf_id'];
		$filter = json_decode(varGet('filter', '[]'));
		$limit = varGet('limit');
		$start = varGet('start', 0);
		$sorter = json_decode(varGet('sort', '[]'));

		if (varGetHas('id') || varGetHas('disposisi_id')) {
			$id = varGet('id', varGet('disposisi_id'));
			$record = $disposisi_view->read($id);

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     $record['disposisi_masuk_plt'] = 1;
            // }else{
            //     $record['disposisi_masuk_plt'] = 0;
            // }
            if (($user['staf_jabatan'] !== $record['disposisi_pengirim_jabatan']) || ($user['staf_unit'] !== $record['disposisi_pengirim_unit'])) {
                $record['disposisi_profil_isganti'] = 1;
            }else{
                $record['disposisi_profil_isganti'] = 0;
            }

            if ($user['staf_status'] == 1) {
                $record['staf_hide'] = 1;
            } else {
                $record['staf_hide'] = 0;
            }
			// $record['debug'] = $disposisi_view->get_lastquery();
			$this->response_record($record);
		} else {

			$filter = json_encode($filter);
			$operation = $disposisi_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));

            // if($pgs['staf_wakil_tgl_mulai'] <= $now && $pgs['staf_wakil_tgl_selesai'] >= $now){
            //     foreach ($operation['data'] as $key => &$value) {
            //         $value['disposisi_masuk_plt'] = 1;
            //     }
            // }else{
            //     foreach ($operation['data'] as $key => &$value) {
            //         $value['disposisi_masuk_plt'] = 0;
            //     }
            // }
            foreach ($operation['data'] as $key => &$value) {
                if (($user['staf_jabatan'] !== $value['disposisi_pengirim_jabatan']) || ($user['staf_unit'] !== $value['disposisi_pengirim_unit'])) {
                    $value['disposisi_profil_isganti'] = 1;
                }else{
                    $value['disposisi_profil_isganti'] = 0;
                }
                
	            if ($user['staf_status'] == 1) {
	                $value['staf_hide'] = 1;
	            } else {
	                $value['staf_hide'] = 0;
	            }

            }
			// $operation['debug'] = $disposisi_view->get_lastquery();
			$this->response($operation);
		}
	}

	function riwayat($section = null, $id = null) {
		/*nggak di pakai*/
		$me = $this;

		$user = $me->m_account->get_profile();
		$disposisi = $this->m_disposisi;
		$disposisi_view = $this->m_disposisi_view;

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
				'type' => 'custom',
				'value' => 'IFNULL(' . $disposisi_view::$field_iscabut . ', 0) = ' . $disposisi_view::AKTIF,
			));
			array_unshift($filter, (object) array(
				'type' => 'exact',
				'property' => 'disposisi_staf',
				'value' => $pegawai,
			));
			$filter = json_encode($filter);
			$operation = $disposisi_view->select(array(
				'limit' => $limit,
				'start' => $start,
				'filter' => $filter,
				'sorter' => $sorter,
			));
			$this->response($operation);
		}
	}

	function create($usePayload = true) {
		$me = $this;
		$worker_mode = Config()->item('worker_mode');
		$queuetubeDisposisi = Config()->item('queueServer_tubeDisposisi');

		$model = $me->m_disposisi;
		$notifikasi = $me->m_notifikasi;
		$recent = $me->m_staf_recent;
		$recent_jabatan = $me->m_jabatan_recent;
		$pengaturan = $me->m_pengaturan;
		$properti = $me->m_properti;
		$staf_model = $me->m_staf;
		$surat = $me->m_surat;
		$surat_view = $me->m_surat_view;
		$surat_log = $me->m_surat_log;
		
		$disposisi_perintah_log  = $me->m_disposisi_perintah_log;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_lite = $me->m_disposisi_masuk_lite_view;
		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk_view = $me->m_disposisi_masuk_view;
		$disposisi_masuk_log = $me->m_disposisi_masuk_log;
		$account = $me->m_account->get_profile();
		$account2 = $me->m_account;
		$akun = $account2->get_profile_id();
		$stafProfil = $staf_model->read($akun);

		$now = date('Y-m-d H:i:s');
		$penerima = varReq('user');
		$tembusansk = varReq('tsk');
		$istembusan = varReq('t');
		// $isberkas = varReq('b');
		$approval = varReq('approval');
		$induk = varReq('induk');
		$is_asistensi = varReq('is_asistensi');
		$pimpinan = varReq('pimpinan');
		$kolektif = varReq('kolektif');
		$induk = varReq('induk');
		$payload = getRequestPayload();
		$data = (array) ($usePayload ? $payload : varPost());

		$data['disposisi_tgl'] = date('Y-m-d H:i:s');
		$pengirim = $data['disposisi_staf'];

		$data['disposisi_model'] = $disposisi_view::MODEL_DISPOSISI;

		if ($approval == 'distribusi' || $induk) {
			$staf_profil = $staf_model->read($data['disposisi_staf']);
			$staf_pelaku_profil = $staf_model->read($data['disposisi_pelaku']);

			$data['disposisi_profil'] = $staf_profil['staf_profil'];
			$data['disposisi_pelaku_profil'] = $staf_pelaku_profil['staf_profil'];
		}

		$operation = $model->insert($data, null, function ($response)
			 use ($me, $now, $surat_view, $penerima, $pengirim, $data, $model, $recent, $staf_model, $disposisi_masuk_log, $istembusan, /*$isberkas,*/ $disposisi_masuk_view, $disposisi_perintah_log, $notifikasi, $kolektif, $disposisi_masuk, $account, $properti, $akun, $surat, $surat_log, $pengaturan, $worker_mode, $queuetubeDisposisi, $disposisi_masuk_lite, $induk, $stafProfil, $tembusansk) {

				$inserted_data = $model->read($model->get_insertid());
				$disposisi_id = $me->m_disposisi->get_insertid();
			 	
				$op = $properti->updated($inserted_data['disposisi_properti'], $akun, $inserted_data, 'disposisi', $inserted_data['disposisi_id']);

				if (!$inserted_data['disposisi_induk']) {
					$dispo_parent = null;
					$dispo_masuk_parent = null;
					$dataLog = array(
						'surat_log_tipe'=> 7,
						'surat_log_surat' => $inserted_data['disposisi_surat'],
						'surat_log_staf' => $akun,
						'surat_log_profil'=>$stafProfil['staf_profil'],
						'surat_log_tgl'=>$now);

					$operation_log = $surat_log->insert($dataLog, null, function ($response) {});
				}else{
					$parent = $disposisi_masuk_lite->read($inserted_data['disposisi_induk']);
					$dispo_parent = $parent['disposisi_parent_path'];
					$dispo_masuk_parent = $parent['disposisi_masuk_parent_path'];
				}
				$dis_update = $model->update($disposisi_id, array(
					'disposisi_parent_path' => $dispo_parent.'/'.$disposisi_id
				));
				
				$disposisi_perintah_log->insert(array(
					'disposisi_perintah_log_perintah' => $inserted_data['disposisi_perintah'],
					'disposisi_perintah_log_pesan' => $inserted_data['disposisi_pesan'],
					'disposisi_perintah_log_disposisi' => $inserted_data['disposisi_id'],
					'disposisi_perintah_log_staf' => $akun,
					'disposisi_perintah_log_profil' => $stafProfil['staf_profil'],
					'disposisi_perintah_log_tgl' => $now
				), null, function($response){});

				$rec_surat = $surat->read($data['disposisi_surat']);
				$surat_id = $rec_surat['surat_id'];

				if ($rec_surat['surat_distribusi_cabut_tgl'] !== NULL) {
					/*update status distribusis surat*/
					$surat->update($surat_id, array(
						'surat_distribusi_iscabut' => 0,
						'surat_distribusi_cabut_staf' => null,
						'surat_distribusi_cabut_profil' => null,
						'surat_distribusi_cabut_tgl' => null
					));
				}

				if (($rec_surat['surat_distribusi_cabut_tgl'] !== NULL) && ($rec_surat['surat_usebalas'] != 1)) {
					/*update status selesai surat*/
					$surat->update($surat_id, array(
						'surat_selesai_tgl' => $now,
						'surat_selesai_staf' => $account['staf_id'],
						'surat_selesai_profil' => $stafProfil['staf_profil']
					));

					$dataLog = array(
						'surat_log_tipe'=> 8,
						'surat_log_surat'=>$surat_id,
						'surat_log_staf'=>$account['staf_id'],
						'surat_log_profil'=>$stafProfil['staf_profil'],
						'surat_log_tgl'=>$now
					);

					$operation_log = $surat_log->insert($dataLog, null, function ($response) {});
				}
				
				if ($rec_surat['surat_distribusi_tgl'] === NULL) {
					$surat_id = $rec_surat['surat_id'];

					/*updating status surat*/
					$surat->update(array(
						'surat_id' => $surat_id), array(
						'surat_distribusi_tgl' => $now,
						'surat_distribusi_staf' => $akun,
						'surat_distribusi_profil' => $stafProfil['staf_profil']
					), function ($response) use ($surat, $properti, $surat_id, $akun) {
						if ($response[$surat->successProperty] !== true) {
							return;
						}

						$inserted_data = $surat->read($surat_id);
						$idProp = $inserted_data['surat_properti'];
						if (empty($idProp)) {
							$op = $properti->created($akun, $inserted_data, 'surat', $inserted_data['surat_id'], $inserted_data['surat_registrasi']);
							if ($op) {
								$surat->update($inserted_data['surat_id'], array(
									'surat_properti' => $op['properti_id'],
								));
							}
						}
						$properti->updated($idProp, $akun, $inserted_data, $inserted_data['surat_registrasi']);
					});
				}

				if ($response[$model->successProperty] !== true) {
					return;
				}

				/*mark forward for disposisi_induk*/
				// $disposisi_induk_id = array_key_exists('disposisi_induk', $data) ? $data['disposisi_induk'] : null;
				// if($disposisi_induk_id){
				//     $disposisi_masuk->update($disposisi_induk_id, array(
				//         'disposisi_masuk_terus_tgl'=> $now,
				//         'disposisi_masuk_terus_staf'=> $account['staf_id']
				//     ));
				// }

				/*insert on penerima*/
				if (!is_array($penerima)) {
					$penerima = array();
				}

				if (!is_array($istembusan)) {
					$istembusan = array();
				}

				// if (!is_array($isberkas)) {
				// 	$isberkas = array();
				// }

				if (!is_array($tembusansk)) $tembusansk = array();

				$count_penerima = count($penerima);
				$count_tembusansk = count($tembusansk);

				if(empty($data['disposisi_induk']) && $data['surat_model_sub'] > 0) {
					$count_penerima = $count_penerima + $count_tembusansk;
				}

				$query = "INSERT INTO disposisi_jumlah_penerima (disposisi_masuk_disposisi, disposisi_jumlah_penerima) VALUES('".$disposisi_id."', ".$count_penerima.")";
				$result = $this->db->query($query);

				foreach ($penerima as $index => $p) {
					if ($istembusan[$index] === 'true') {
						$istembusan[$index] = true;
					}
					// if ($isberkas[$index] === 'true') {
					// 	$isberkas[$index] = true;
					// }

					if (is_string($p)) {
						$penerima_id = $p;
						$tembusan = ((int) $istembusan[$index] != '') ? 1 : 0;
						// $berkas = ((int) $isberkas[$index] != '') ? 1 : 0;
					} else if (is_object($p)) {
						$penerima_id = property_exists($p, 'staf_id') ? $p->staf_id : null;
						$tembusan = ((int) $istembusan[$index] != '') ? 1 : 0;
						// $berkas = ((int) $isberkas[$index] != '') ? 1 : 0;
					} else if (is_array($p)) {
						$penerima_id = array_key_exists('staf_id', $p) ? $p['staf_id'] : null;
						$tembusan = ((int) $istembusan[$index] != '') ? 1 : 0;
						// $berkas = ((int) $isberkas[$index] != '') ? 1 : 0;
					}

					if (empty($penerima_id)) {
						continue;
					}

					$profil = $staf_model->read($p);

					$data_diposisi_masuk = array(
						'disposisi_id' => $disposisi_id,
						'disposisi_masuk_profil' => $profil['staf_profil'],
						'dispo_masuk_parent' => $dispo_masuk_parent,
						'penerima_id' => $penerima_id,
						'penerima_jabatan' => null,
						'pengirim_id' => $pengirim,
						'berkas' => $data['surat_useberkas'],
						'tembusan' => $tembusan,
						'key_redis' => Config()->item('redisPrefix').'disposisi_sama:'.$data['disposisi_surat'].'-'.$penerima_id
					);

					if($worker_mode == 'local'){
						$create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
					}else{
						$addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
					}

					/*recent*/
					$recent_exist = $recent->read(array(
						'staf_aktual_pengirim' => $pengirim,
						'staf_aktual_penerima' => $penerima_id,
					));
					if ($recent_exist) {
						$recent->update(array(
							'staf_aktual_pengirim' => $pengirim,
							'staf_aktual_penerima' => $penerima_id,
						), array(
							'staf_aktual_pengirim' => $pengirim,
							'staf_aktual_penerima' => $penerima_id,
							'staf_aktual_tgl' => $now,
							'staf_aktual_tipe' => $model::MODEL_DISPOSISI,
						), function ($response) use ($properti, $akun, $recent) {
							$recent_data = $response['data'];
							$updated_data = $recent->read($recent_data['staf_aktual_id']);
							$idProp = $updated_data['staf_aktual_properti'];

							$properti->updated($idProp, $akun, $updated_data, 'staf_aktual ' . $updated_data['staf_aktual_tgl']);
						});
					} else {
						$recent->insert(array(
							'staf_aktual_pengirim' => $pengirim,
							'staf_aktual_penerima' => $penerima_id,
							'staf_aktual_tgl' => $now,
							'staf_aktual_tipe' => $model::MODEL_DISPOSISI,
						), null, function ($response) use ($data, $properti, $recent, $akun) {

							$inserted_data = $recent->read($recent->get_insertid());
							$op = $properti->created($akun, $inserted_data, 'staf_aktual', $inserted_data['staf_aktual_id'], 'staf_aktual ' . $inserted_data['staf_aktual_tgl']);
							if ($op) {
								$recent->update($inserted_data['staf_aktual_id'], array(
									'staf_aktual_properti' => $op['properti_id'],
								));
							}
						});
					}

					/*add ons*/
					$useNotifEmail = $pengaturan->getSettingByCode('notif_email');
					$useNotifEmailDisposisi = $pengaturan->getSettingByCode('notif_email_disposisi');
					$data['distributor_nama'] = $profil['staf_nama'];

					if ($useNotifEmail && $useNotifEmailDisposisi) {
						$data_surat = $surat_view->read($data['disposisi_surat']);
						$notifikasi->created('email', $data_surat, $penerima_id, NULL, 'disposisi', NULL);
					}

					foreach ($tembusansk as $index => $n) {
						if (is_string($n)) {
							$tembusan_id = $n;
						} else if (is_object($n)) {
							$tembusan_id = property_exists($n, 'staf_id') ? $n->staf_id : null;
						} else if (is_array($n)) {
							$tembusan_id = array_key_exists('staf_id', $n) ? $n['staf_id'] : null;
						}
	
						if (empty($tembusan_id)) continue;
	
						$profil = $staf_model->read($n);
	
						$data_diposisi_masuk = array(
							'disposisi_id' => $disposisi_id,
							'disposisi_masuk_profil' => $profil['staf_profil'],
							'dispo_masuk_parent' => $dispo_masuk_parent,
							'penerima_id' => $tembusan_id,
							'penerima_jabatan' => null,
							'pengirim_id' => $pengirim,
							'berkas' => $data['surat_useberkas'],
							'tembusan' => 1,
							'key_redis' => Config()->item('redisPrefix').'disposisi_sama:'.$data['disposisi_surat'].'-'.$tembusan_id
						);


						if($worker_mode == 'local'){
							$create_dispoma = $disposisi_masuk_view->create_disposisi($data_diposisi_masuk);
						}else{
							$addJob = create_job($queuetubeDisposisi, $data_diposisi_masuk);
						}
	
						/*add ons*/
						$useNotifEmail = $pengaturan->getSettingByCode('notif_email');
						$useNotifEmailDisposisi = $pengaturan->getSettingByCode('notif_email_disposisi');
						$akunLogin = $account->get_profile();
						$data['distributor_nama'] = $akunLogin['staf_nama'];
	
						if ($useNotifEmail && $useNotifEmailDisposisi) {
							$data_surat = $surat_view->read($data['disposisi_surat']);
							$notifikasi->created('email', $data_surat, $tembusan_id, NULL, 'disposisi', NULL);
						}
					}
				}
			});
		$this->response($operation);
	}

	function update($usePayload = true) {
		$me = $this;
		$queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

		$model = $this->m_disposisi;
		$disposisi_view = $this->m_disposisi_view;
		$disposisi_aktif_view = $this->m_disposisi_aktif_view;
		$suratpegawaiview = $this->m_disposisi_masuk_view;
		$disposisi_masuk_log = $this->m_disposisi_masuk_log;
		$disposisi_perintah_log = $this->m_disposisi_perintah_log;
		$disposisi_penerima = $this->m_disposisi_masuk;
		$model_staf = $this->m_staf;
		$account = $this->m_account->get_profile();
		$account2 = $this->m_account;
		$akun = $account2->get_profile_id();
		$properti = $this->m_properti;

		$primary = $model->get_primary();
		$payload = getRequestPayload();
		$data = (array) ($usePayload ? $payload : varPost());
		$iscabut = (array_key_exists('iscabut', $data)) ? $data['iscabut'] : NULL;
		$now = date('Y-m-d H:i:s');

		$stafProfil = $model_staf->read($akun);
		$id = array_key_exists('id', $data) ? $data['id'] : (array_key_exists($primary, $data) ? $data[$primary] : null);

		if ($iscabut === 1) {
			$operation = $this->cabut_unread($data);
			$this->response($operation);
		} else if ($iscabut === 2) {
			$operation = $this->cabut_all($data);
			$this->response($operation);
		} else if ($iscabut === 3) {
			$operation = $model->update($id, $data, function ($response)
				use ($model, $data, $id, $suratpegawaiview, $disposisi_penerima,
					$disposisi_view, $disposisi_masuk_log, $account, $disposisi_aktif_view,
					$akun, $now, $properti, $queueTubeRedis, $stafProfil) {
					if ($response[$model->successProperty] !== true) {
						return;
					}
					if (Config()->item('queueServer')['host']) {
						$data_redis = array(
	                        'type'=>'Disposisi-Staf',
	                        'staf_id'=>$data['disposisi_staf'],
	                        'jabatan_id'=>null,
	                        'unit_id'=>null,
	                        'data'=> $data['disposisi_staf']
						);
						$addJobStaf = create_job($queueTubeRedis, $data_redis);
					}
					$updated_data = $model->read($data['disposisi_id']);
                    
					// pushEvent(array(
					// 	'to' => $data['disposisi_staf'],
					// 	'data' => array(
					//         'api' => 'disposisi',
					// 		'id' => $updated_data['disposisi_id']
					//     ),
					// 	'group' => array('staf', 'asistensi'),
					// 	'type' => 'terkirim'
					// ));
					
					$idProp = $updated_data['disposisi_properti'];
					$properti->updated($idProp, $akun, $updated_data, $updated_data['disposisi_nomor']);

					$disId = $data['disposisi_id'];
					$s_modelpenerima = $suratpegawaiview->find(array(
						'disposisi_id' => $disId));

					foreach ($s_modelpenerima as $j => $sPen) {
						$disposisi_penerima->update($sPen['disposisi_masuk_id'], array(
							'disposisi_masuk_cabut_tgl' => $now,
							'disposisi_masuk_cabut_staf' => $akun,
							'disposisi_masuk_cabut_profil' => $stafProfil['staf_profil']
						), function ($response) use ($disposisi_penerima, $properti, $akun, $model, $queueTubeRedis, $stafProfil) {
							$disposisi_penerima_data = $response['data'];
							
							if (Config()->item('queueServer')['host']) {
								$data_redis = array(
	                    			'type'=>'Disposisi-Staf',
	                    			'staf_id'=>$disposisi_penerima_data['disposisi_masuk_staf'],
	                    			'jabatan_id'=>null,
	                    			'unit_id'=>null,
	                    			'data'=> $disposisi_penerima_data['disposisi_masuk_staf']
	                			);
								$addJobStaf = create_job($queueTubeRedis, $data_redis);
		                    }

							$updated_data = $model->read($disposisi_penerima_data['disposisi_masuk_disposisi']);
		                    
							// pushEvent(array(
							// 	'to' => $disposisi_penerima_data['disposisi_masuk_staf'],
							// 	'data' => array(
							//     'api' => 'disposisi_masuk',
							// 		'id' => $sPen['disposisi_masuk_id']
							//    ),
							// 	'group' => array('staf', 'asistensi'),
							// 	'type' => 'disposisi_masuk'
							// ));

							$idProp = $updated_data['disposisi_properti'];
							$properti->updated($idProp, $akun, $updated_data, $updated_data['disposisi_nomor']);
						});
						$disposisi_masuk_log->insert(array(
							'disposisi_masuk_log_tipe' => 4,
							'disposisi_masuk_log_staf' => $akun,
							'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
							'disposisi_masuk_log_masuk' => $sPen['disposisi_masuk_id'],
							'disposisi_masuk_log_tgl' => $now,
						), null, function ($response) {});

						$this->cabut_trace($sPen);
					}

					$dispo = $suratpegawaiview->find(array(
						'disposisi_masuk_id' => $data['disposisi_induk'],
					));
					$dis = $disposisi_aktif_view->find(array(
						'disposisi_induk' => $data['disposisi_induk'],
					));
					$countdis = count($dis);

					// echo $countdis;
					if ($countdis === 0) {
						$iddis = $dispo[0]['disposisi_masuk_id'];
						$disposisi_penerima->update($iddis, array(
							'disposisi_masuk_terus_tgl' => null,
							'disposisi_masuk_terus_staf' => null,
							'disposisi_masuk_terus_profil' => null							
						), function ($res) use ($disposisi_masuk_log, $disposisi_penerima,
							$account, $iddis, $now, $stafProfil) {
							$disposisi_masuk_log->insert(array(
								'disposisi_masuk_log_tipe' => 4,
								'disposisi_masuk_log_staf' => $account['staf_id'],
								'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
								'disposisi_masuk_log_masuk' => $iddis,
								'disposisi_masuk_log_tgl' => $now,
							), null, function ($response) {});
						});
					}
				});
			$this->response($operation);
		} else {
			/*SELAIN CABUT*/
			// $operation = 'disisni';
			$operation = $model->update($id, $data, function ($response) {});
			$this->response($operation);
		}
	}

	function cabut_trace($data) {
		$model = $this->m_disposisi;
		$disposisi_penerima = $this->m_disposisi_masuk;
		$account = $this->m_account->get_profile();
		$account2 = $this->m_account;
		$akun = $account2->get_profile_id();
		$data = $data;
		$disposisi_masuk_log = $this->m_disposisi_masuk_log;
		$suratpegawaiview = $this->m_disposisi_masuk_view;
		$model_staf = $this->m_staf;
		$now = date('Y-m-d H:i:s');

		$stafProfil = $model_staf->read($akun);

		$s_induk = $model->find(array('disposisi_induk' => $data['disposisi_masuk_id']));
		foreach ($s_induk as $i => $sInduk) {
			$id_dis = $sInduk['disposisi_id'];
			$model->update($id_dis, array(
				'disposisi_cabut_tgl' => $now,
				// 'disposisi_cabut_staf'=>$data['disposisi_cabut_staf']
			), function ($res) use ($disposisi_penerima, $sInduk, $akun, $id_dis,
				$suratpegawaiview, $now, $disposisi_masuk_log, $stafProfil) {

				$s_modelpenerima = $suratpegawaiview->find(array('disposisi_id' => $id_dis,
					'disposisi_masuk_iscabut' => 0,
				));
				foreach ($s_modelpenerima as $j => $sPen) {
					$disposisi_penerima->update($sPen['disposisi_masuk_id'], array(
						'disposisi_masuk_cabut_tgl' => $now,
						'disposisi_masuk_cabut_staf' => $akun,
						'disposisi_masuk_cabut_profil' => $stafProfil['staf_profil']
					));
					$disposisi_masuk_log->insert(array(
						'disposisi_masuk_log_tipe' => 4,
						'disposisi_masuk_log_staf' => $akun,
						'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
						'disposisi_masuk_log_masuk' => $sPen['disposisi_masuk_id'],
						'disposisi_masuk_log_tgl' => $now,
					), null, function ($response) {});
					$this->cabut_trace($sPen);
				}
			});
		}
	}

	function cabut_all($data) {
		$model = $this->m_disposisi;
		$disposisi_penerima = $this->m_disposisi_masuk;
		$account = $this->m_account->get_profile();
		$account2 = $this->m_account;
		$model_staf = $this->m_staf;
		$akun = $account2->get_profile_id();
		$data = $data;
		$disposisi_masuk_log = $this->m_disposisi_masuk_log;
		$suratpegawaiview = $this->m_disposisi_masuk_view;
		$disposisi_aktif_view = $this->m_disposisi_aktif_view;
		$now = date('Y-m-d H:i:s');

		$stafProfil = $model_staf->read($akun);

		$id_dis = $data['disposisi_id'];
		$operation = $model->update($id_dis, array(
			'disposisi_cabut_tgl' => $now,
			// 'disposisi_cabut_staf'=>$data['disposisi_cabut_staf']
		), function ($res) use ($data, $disposisi_penerima, $account, $akun,
			$id_dis, $suratpegawaiview, $now, $disposisi_masuk_log, $disposisi_aktif_view, $stafProfil) {

			$s_modelpenerima = $suratpegawaiview->find(array('disposisi_id' => $id_dis,
				'disposisi_masuk_iscabut' => 0,
			));
			foreach ($s_modelpenerima as $j => $sPen) {
				$disposisi_penerima->update($sPen['disposisi_masuk_id'], array(
					'disposisi_masuk_cabut_tgl' => $now,
					'disposisi_masuk_cabut_staf' => $akun,
					'disposisi_masuk_cabut_profil' => $stafProfil['staf_profil']
				));
				$disposisi_masuk_log->insert(array(
					'disposisi_masuk_log_tipe' => 4,
					'disposisi_masuk_log_staf' => $akun,
					'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
					'disposisi_masuk_log_masuk' => $sPen['disposisi_masuk_id'],
					'disposisi_masuk_log_tgl' => $now,
				), null, function ($response) {});
			}

			$dispo = $suratpegawaiview->find(array(
				'disposisi_masuk_id' => $data['disposisi_induk'],
			));
			$dis = $disposisi_aktif_view->find(array(
				'disposisi_induk' => $data['disposisi_induk'],
			));
			$countdis = count($dis);

			if ($countdis === 0) {
				$iddis = $dispo[0]['disposisi_masuk_id'];
				$disposisi_penerima->update($iddis, array(
					'disposisi_masuk_terus_tgl' => null,
					'disposisi_masuk_terus_staf' => null,
					'disposisi_masuk_terus_profil' => null
				), function ($res) use ($disposisi_masuk_log, $disposisi_penerima,
					$account, $iddis, $now, $stafProfil) {
					$disposisi_masuk_log->insert(array(
						'disposisi_masuk_log_tipe' => 4,
						'disposisi_masuk_log_staf' => $account['staf_id'],
						'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
						'disposisi_masuk_log_masuk' => $iddis,
						'disposisi_masuk_log_tgl' => $now,
					), null, function ($response) {});
				});
			}
		});
		return $operation;
	}

	function baca_aksi($usePayload = true) {
		$me = $this;
		$queueTube = Config()->item('queueServer_notifTube');
		$queueTubeRedis = Config()->item('queueServer_notifTubeRedis');

		$disposisi = $me->m_disposisi;
		$disposisi_view = $me->m_disposisi_view;
		$disposisi_masuk = $me->m_disposisi_masuk;
		$disposisi_masuk_view = $me->m_disposisi_masuk_aktif_view;
		$model_staf = $me->m_staf;
		$id = varReq('id');
		$now = date('Y-m-d H:i:s');
		$account = $me->m_account;
		$account_record = $account->get_profile();
		$account_id = $account->get_profile_id();
		
		$stafProfil = $model_staf->read($account_id);

		$penerima = $disposisi_masuk->find(array(
			'disposisi_masuk_disposisi' => $id,
		));

		if (!empty($penerima)) {
			foreach ($penerima as $index => $data) {
				if ($data['disposisi_masuk_aksi_baca_tgl'] == null AND $data['disposisi_masuk_aksi_tgl'] != null) {
					$operation = $disposisi_masuk->update($data['disposisi_masuk_id'], array(
						'disposisi_masuk_aksi_baca_tgl' => $now, 
						'disposisi_masuk_aksi_baca_staf' => $account_id,
						'disposisi_masuk_aksi_baca_profil' => $stafProfil['staf_profil']
					), function ($response) use ($me, $id, $queueTubeRedis) {});
				}
			}
		}

		$operation[$disposisi->dataProperty] = $disposisi_view->read($id);
		if (Config()->item('queueServer')['host']) {
				$data_redis = array(
					'type'=>'Disposisi-Staf',
					'staf_id'=>$operation[$disposisi->dataProperty]['disposisi_staf'],
					'jabatan_id'=>null,
					'unit_id'=>null,
					'data'=> $operation[$disposisi->dataProperty]['disposisi_staf']
				);
				$addJobStaf = create_job($queueTubeRedis, $data_redis);
		}

		$this->response($operation);
	}

	function cabut_unread($data) {
		$model = $this->m_disposisi;
		$disposisi_penerima = $this->m_disposisi_masuk;
		$model_staf = $this->m_staf;
		$account = $this->m_account->get_profile();
		$account2 = $this->m_account;
		$akun = $account2->get_profile_id();
		$data = $data;
		$suratpegawaiview = $this->m_disposisi_masuk_view;
		$disposisi_masuk_log = $this->m_disposisi_masuk_log;
		$disposisi_aktif_view = $this->m_disposisi_aktif_view;
		$now = date('Y-m-d H:i:s');

		$stafProfil = $model_staf->read($akun);

		// $s_induk = $model->find(array('disposisi_induk'=>$data['disposisi_masuk_id']));
		$s_modelpenerima = $suratpegawaiview->find(array(
			'disposisi_id' => $data['disposisi_id'],
			'disposisi_masuk_iscabut' => 0,
			'disposisi_masuk_isbaca' => 0
		));
		foreach ($s_modelpenerima as $i => $sInduk) {
			$operation = $disposisi_penerima->update($sInduk['disposisi_masuk_id'], array(
				'disposisi_masuk_cabut_tgl' => $now,
				'disposisi_masuk_cabut_staf' => $akun,
				'disposisi_masuk_cabut_profil' => $stafProfil['staf_profil']
			));
			$disposisi_masuk_log->insert(array(
				'disposisi_masuk_log_tipe' => 4,
				'disposisi_masuk_log_staf' => $akun,
				'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
				'disposisi_masuk_log_masuk' => $sInduk['disposisi_masuk_id'],
				'disposisi_masuk_log_tgl' => $now,
			), null, function ($response) {});
		}

		$disca = $suratpegawaiview->find(array(
			'disposisi_masuk_iscabut' => 0,
			'disposisi_masuk_disposisi' => $data['disposisi_id'],
		));
		$countdisca = count($disca);

		if ($countdisca === 0) {
			$model->update($data['disposisi_id'], array(
				'disposisi_cabut_tgl' => $now,
			));
		}

		$dispo = $suratpegawaiview->find(array(
			'disposisi_masuk_id' => $data['disposisi_induk'],
		));
		$dis = $disposisi_aktif_view->find(array(
			'disposisi_induk' => $data['disposisi_induk'],
		));
		$countdis = count($dis);

		if ($countdis === 0) {
			$iddis = $dispo[0]['disposisi_masuk_id'];
			$disposisi_penerima->update($iddis, array(
				'disposisi_masuk_terus_tgl' => null,
				'disposisi_masuk_terus_staf' => null,
				'disposisi_masuk_terus_profil' => null				
			), function ($res) use ($disposisi_masuk_log, $disposisi_penerima, $account, $iddis, $now, $stafProfil) {
				$disposisi_masuk_log->insert(array(
					'disposisi_masuk_log_tipe' => 4,
					'disposisi_masuk_log_staf' => $account['staf_id'],
					'disposisi_masuk_log_profil' => $stafProfil['staf_profil'],
					'disposisi_masuk_log_masuk' => $iddis,
					'disposisi_masuk_log_tgl' => $now,
				), null, function ($response) {});
			});
		}
		return $operation;
	}

	function cek_disposisi_isexist() {
		$mode = varReq('mode', true);
		$model = $this->m_disposisi_lite_view;
		$model_account = $this->m_account;
		$field = ($mode === 'masuk') ? varReq('disposisi_surat') : varReq('disposisi_induk');
		$selectfield = ($mode === 'masuk') ? 'disposisi_surat' : 'disposisi_induk';

		switch ($mode) {
		case 'masuk':
			$message = ' SURAT ' . strtoupper($mode);
			$field = varReq('disposisi_surat');
			$selectfield = 'disposisi_surat';
			$selectmodel = 'disposisi_model = 0';
			break;

		case 'draf':
			$message = strtoupper($mode);
			$field = varReq('disposisi_surat');
			$selectfield = 'disposisi_surat';
			$selectmodel = 'disposisi_model = 1';
			break;

		case 'disposisi':
			$message = strtoupper($mode);
			$field = varReq('disposisi_induk');
			$selectfield = 'disposisi_induk';
			$selectmodel = '(disposisi_model_sub = 0 OR disposisi_model_sub IS NULL)';
			break;

		default:
			$message = strtoupper($mode);
			$field = varReq('disposisi_induk');
			$selectfield = 'disposisi_induk';
			$selectmodel = 'disposisi_model_sub = 1';
			break;
		}

		$countexist = $model->count_exist(array(
			$selectfield => $field,
			'disposisi_masuk_staf' => $model_account->get_profile_id(),
			$selectmodel => null,
		));

		$this->response(array(
			'total' => $countexist,
			'message' => 'Anda pernah menerima ' . $message . ' ini',
			'isexist' => ($countexist > 1) ? true : false,
		));
	}

	function report($section = 'sender') {
		$me = $this;

		$disposisi_id = varGet('id');

		$filter = varGet('filter');
		$filterValue = varGet('value');
		$download = varGet('download', 0);
		if (strtolower($download) == 'false') {
			$download = 0;
		}

		$download = (boolean) $download;

		$user = $me->m_account->get_profile();
		$pegawai = $user['staf_id'];

		$disposisi = $me->m_disposisi->read($disposisi_id);
		$disposisi_find = $me->m_disposisi->find(array('disposisi_id' => $disposisi_id));
		$surat = $me->m_surat_view->find(array('surat_id' => $disposisi['disposisi_surat']));
		$surat_staf = $me->m_disposisi_masuk_view->read(array('disposisi_id' => $disposisi_id));

		$penerima = $me->m_disposisi_masuk_view->find(
			array(
				'disposisi_id' => $disposisi_id,
			)
		);
		foreach ($penerima as $i => &$r) {
			$r['no'] = $i + 1;
		}
		$report_data = array(
			'style' => array(array('params' => 'media="all"', 'content' => $me->m_asset->css('style.css', false))),
			'title' => $this->report_title,
			'subtitle' => $this->report_subtitle,
			'header' => $me->m_report->generateHeader($download),
			'surat' => $surat,
			'disposisi' => $disposisi_find,
			'penerima' => $penerima,
			'surat_staf' => $surat_staf,
			'penyetuju' => $surat[0]['penyetuju_nama'],
			'penyetuju_nip' => $surat[0]['penyetuju_nip'],
			'pengirim' => $penerima[0]['pengirim_nama'],
			'pengirim_nip' => $penerima[0]['pengirim_nip'],
		);

		if ($download) {
			$me->m_report->generateReportPdf($this->report_template, $report_data, 'report');
		} else {
			$me->m_report->generateReport($this->report_template, $report_data, true, true);
		}
	}

	function next($section) {
		if ($section == 'code') {
			$model = $this->m_disposisi;
			$next = $model->generate_code('#');
			$this->response(array(
				'next' => $next,
			));
		}
	}

	public function transporter_path(){
        $disposisi = $this->m_disposisi;
        $disposisi_masuk = $this->m_disposisi_masuk_lite_view;
        $query = $this->db->get_where('disposisi', array('disposisi_parent_path' => NULL), 5000);
        $data = $query->result_array();
        foreach ($data as $key => &$value){
            $id = $value['disposisi_id'];
            if($value['disposisi_induk'] && ($value['disposisi_induk'] !== $id) && !$value['disposisi_parent_path']){
                $data_disposisi =$disposisi->read($id);
                if(!$data_disposisi['disposisi_parent_path']){
                    $parent = $disposisi_masuk->read($data_disposisi['disposisi_induk']);
                    if(!$parent['disposisi_parent_path']){
                        $data_parent = $this->parent_path($parent);
                        $value['disposisi_parent_path'] = $data_parent['disposisi_parent_path'].'/'.$data_disposisi['disposisi_id'];
                    }else{
                        $value['disposisi_parent_path'] = $parent['disposisi_parent_path'].'/'.$data_disposisi['disposisi_id'];
                    }
        			$operation = $disposisi->update($id, $value);
                }else{
                    $value['disposisi_parent_path'] = $data_disposisi['disposisi_parent_path'];
                }
            }else{
                $data_disposisi =$disposisi->read($id);
                if(!$data_disposisi['disposisi_parent_path']){
            		$value['disposisi_parent_path'] = '/'.$data_disposisi['disposisi_id'];
        			$operation = $disposisi->update($id, $value);
        		}else{
                    $value['disposisi_parent_path'] = $data_disposisi['disposisi_parent_path'];
        		}
            }
        }

        $this->response($data);
    }

    public function parent_path($data){
        $disposisi = $this->m_disposisi;
        $disposisi_masuk = $this->m_disposisi_masuk_lite_view;

        $id = $data['disposisi_id'];
        if($data['disposisi_induk'] && ($data['disposisi_induk'] !== $id)){
	        $parent = $disposisi_masuk->read($data['disposisi_induk']);
	        if(!$parent['disposisi_parent_path']){
	            $data_parent = $this->parent_path($parent);
	            $data['disposisi_parent_path'] = $data_parent['disposisi_parent_path'].'/'.$data['disposisi_id'];
	        }else{
	            $data['disposisi_parent_path'] = $parent['disposisi_parent_path'].'/'.$data['disposisi_id'];
	        }
        }else{
            $data['disposisi_parent_path'] = '/'.$data['disposisi_id'];
        }
        $operation = $disposisi->update($id, $data);
        return $data;
    }
}