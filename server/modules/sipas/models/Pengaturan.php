<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Sipas_model_Pengaturan extends Base_model {
	protected $pengaturan_default = array(
		'email_name' => null,
		'email_address' => null,
		'email_password' => null,
		'email_host' => null,
		'email_port' => null,
		'email_protocol' => null,
		'email_limit' => null,
		'instance_address' => null,
		'instance_akronim' => null,
		'instance_name' => null,
		
		'notif_email' => null,
		'notif_email_disposisi' => null,
		'notif_email_disposisi_template' => null,
		'notif_email_disposisi_subject' => null,
		'notif_email_suratmasuk' => null,
		'notif_email_suratmasuk_template' => null,
		'notif_email_suratmasuk_subject' => null,
		'notif_email_notadinas' => null,
		'notif_email_notadinas_template' => null,
		'notif_email_notadinas_subject' => null,
		'notif_email_koreksi' => null,
		'notif_email_koreksi_template' => null,
		'notif_email_koreksi_subject' => null,
		'notif_email_suratdraft' => null,
		'notif_email_suratdraft_template' => null,
		'notif_email_suratdraft_subject' => null,

		'notif_sms' => null,
		'notif_sms_disposisi' => null,
		'notif_sms_disposisi_template' => null,
		'notif_sms_suratmasuk' => null,
		'notif_sms_suratmasuk_template' => null,
		'notif_sms_notadinas' => null,
		'notif_sms_notadinas_template' => null,
		'notif_sms_koreksi' => null,
		'notif_sms_koreksi_template' => null,

		'template_penomoran' => null,
		'template_header' => null,
		'template_header1' => null,
		'template_header2' => null,
		'template_header3' => null,
		'template_header4' => null,
		'template_header5' => null,
		'template_header_useheader1' => null,
		'template_header_useheader2' => null,
		'template_header_useheader3' => null,
		'template_header_useheader4' => null,
		'template_header_useheader5' => null,
		'template_header_useleftlogo' => null,
		'template_header_userightlogo' => null,
		'template_header_uselogo1' => null,
		'template_header_uselogo2' => null,
		'template_header_uselogo3' => null,
		'template_header_uselogo4' => null,
		'template_header_uselogo5' => null,

		'template_use_surat_registrasi' => null,
		'template_digit_nomor_registrasi' => null,
		'template_nomor_surat_registrasi' => null,
		'template_index_surat_registrasi_pertahun' => null,
		'template_index_surat_registrasi_kustom' => null,
		'template_index_surat_registrasi' => null,
		
		'template_use_surat_keluar' => null,
		'template_digit_nomor_surat_keluar' => null,
		'template_nomor_surat_keluar' => null,
		'template_nomor_surat_keluar_backdate' => null,
		'template_index_surat_keluar_pertahun' => null,
		'template_index_surat_keluar_kustom' => null,
		'template_index_surat_keluar' => null,
		'template_nomor_keluar_perjenis_terpusat' => null,
		'template_nomor_keluar_perjenis_unit' => null,
		'template_nomor_keluar_perunit' => null,
		'template_nomor_keluar_terpusat' => null,
		
		'template_use_surat_internal' => null,
		'template_digit_nomor_surat_internal' => null,
		'template_nomor_surat_internal' => null,
		'template_nomor_surat_internal_backdate' => null,
		'template_index_surat_internal_pertahun' => null,
		'template_index_surat_internal_kustom' => null,
		'template_index_surat_internal' => null,
		'template_nomor_internal_perjenis_terpusat' => null,
		'template_nomor_internal_perjenis_unit' => null,
		'template_nomor_internal_perunit' => null,
		'template_nomor_internal_terpusat' => null,
		
		'template_use_arsip_bebas' => null,
		'template_digit_nomor_arsip_bebas' => null,
		'template_nomor_arsip_bebas' => null,
		'template_index_arsip_bebas_pertahun' => null,
		'template_index_arsip_bebas_pertahun' => null,
		'template_index_arsip_bebas' => null,
		
		'template_use_korespondensi' => null,
		'template_digit_nomor_korespondensi' => null,
		'template_nomor_korespondensi' => null,
		'template_index_korespondensi_pertahun' => null,

		'wajib_korespondensi' => null,
		'wajib_berkas_masuk' => null,
		'wajib_berkas_keluar' => null,
		'wajib_berkas_internal' => null,
		'wajib_berkas_konsep' => null,
		'wajib_berkas_arsip' => null,
		'surat_pengirim_default' => null,
		'surat_pengirim_lock' => null,
		'surat_pengajuan_unitkerja_default'=>null,
		'surat_pengajuan_lock' => true,
		'auto_logout'=> null,
		'auto_logout_time'=> null,

		'sso_usessoldap' => null,
		'sso_url' => null,
		'sso_apikey' => null,
		'sso_useenkripsi_password' => null,

		'use_unit_pengirim' => null,
		'unit_pengirim' => null,
		'use_unit_penerima' => null,
		'unit_penerima' => null,

		'data_perusahaan_nama' => null,
		'data_perusahaan_alamat' => null,
		'data_perusahaan_email' => null,
		'data_perusahaan_telp' => null,
		'data_perusahaan_fax' => null,
		'data_perusahaan_website' => null,

		'use_lock_internal_tgl' => null,
		'use_auto_nomor_eksternal' => null,
		'use_auto_nomor_internal' => null,
		'use_auto_distribusi_internal' => null,
		'use_booking_nomor' => null,
		'use_jenis' => null,
		'use_data_merge' => null,
		'use_nomor_backdate' => null,

		'use_reupload_berkas' => null,
		'reupload_berkas_jumlah' => null,

		'use_reupload_berkas_masuk' => null,
		'reupload_berkas_surat_masuk_jumlah' => null,

		'use_sla_otomatis' => null,
		'sla_default' => null,

		'dokumen_allowedtype' => null,
		'dokumen_maxsize' => null,

		'asistensi_baca_action' => null,
		
		'template_cetak_resi' => null,
		'template_lembar_disposisi' => null,
		'template_cetak_ekspedisi' => null,
		'template_cetak_korespondensi' => null,
		'template_cetak_penyetujuan_sk' => null,
		'template_cetak_penerima_ikeluar' => null,

		'use_asistensi_batas_hirarki' => null,
		'use_signature' => null,
		'use_ttd_penyetuju_akhir' => null,

		'use_unit_buat_surat_masuk' => null,
		'use_unit_buat_surat_keluar' => null,
		
		'use_disable_approve' => null
	);

	public $template_penomoran_legenda = array(
		'{#}' 						=> 'Surat-Nomor urut surat (sesuai dengan format pencarian index)',
		'{backdate}'				=> 'Surat - Nomor Backdate',

		'{nip_staf}' 				=> 'Staf - NIP Staf',
		'{nama_staf}' 				=> 'Staf - Nama Staf',
		'{kode_unitkerja}' 			=> 'Staf - Kode unit',
		'{rubrik_unitkerja}'		=> 'Staf - Rubrik unit',
		'{nama_unitkerja}' 			=> 'Staf - Nama unit',
		'{nama_jabatan}' 			=> 'Staf - Nama Jabatan',
		'{kode_jabatan}' 			=> 'Staf - Kode Jabatan',

		'{kode_unit_asal}' 			=> 'Atribut - Kode unit Asal',
		'{rubrik_unit_asal}'		=> 'Atribut - Rubrik unit Asal',
		'{nama_unit_asal}' 			=> 'Atribut - Nama unit Asal',

		'{nip_staf_pembuat}' 				=> 'Pembuat - NIP Staf',
		'{nama_staf_pembuat}' 				=> 'Pembuat - Nama Staf',
		'{kode_unitkerja_pembuat}' 			=> 'Pembuat - Kode unit',
		'{rubrik_unitkerja_pembuat}' 		=> 'Pembuat - Rubrik unit',
		'{nama_unitkerja_pembuat}' 			=> 'Pembuat - Nama unit',
		'{nama_jabatan_pembuat}' 			=> 'Pembuat - Nama Jabatan',
		'{kode_jabatan_pembuat}' 			=> 'Pembuat - Kode Jabatan',
		
		'{nip_staf_penyetuju}' 				=> 'Penyetuju - NIP Staf',
		'{nama_staf_penyetuju}' 			=> 'Penyetuju - Nama Staf',
		'{kode_unitkerja_penyetuju}' 		=> 'Penyetuju - Kode unit',
		'{rubrik_unitkerja_penyetuju}' 		=> 'Penyetuju - Rubrik unit',
		'{nama_unitkerja_penyetuju}' 		=> 'Penyetuju - Nama unit',
		'{nama_jabatan_penyetuju}' 			=> 'Penyetuju - Nama Jabatan',
		'{kode_jabatan_penyetuju}' 			=> 'Penyetuju - Kode Jabatan',
		'{pos_code_jabatan_penyetuju}'		=> 'Penyetuju - Pos Code Jabatan',

		'{nip_staf_pendistribusi}' 				=> 'Pendistribusi - NIP Staf',
		'{nama_staf_pendistribusi}' 			=> 'Pendistribusi - Nama Staf',
		'{kode_unitkerja_pendistribusi}' 		=> 'Pendistribusi - Kode unit',
		'{rubrik_unitkerja_pendistribusi}' 		=> 'Pendistribusi - Rubrik unit',
		'{nama_unitkerja_pendistribusi}' 		=> 'Pendistribusi - Nama unit',
		'{nama_jabatan_pendistribusi}' 			=> 'Pendistribusi - Nama Jabatan',
		'{kode_jabatan_pendistribusi}' 			=> 'Pendistribusi - Kode Jabatan',

		'{kode_klasifikasi}'		=> 'Atribut - Kode Klasifikasi',
		'{nama_klasifikasi}'		=> 'Atribut - Nama Klasifikasi',
		'{kode_jenis}' 				=> 'Atribut - Kode Jenis',
		'{nama_jenis}' 				=> 'Atribut - Nama Jenis',
		'{kode_lokasi}'				=> 'Atribut - Kode Lokasi',
		'{nama_lokasi}' 			=> 'Atribut - Nama Lokasi',
		'{kode_media}' 				=> 'Atribut - Kode Media',
		'{nama_media}' 				=> 'Atribut - Nama Media',
		'{kode_prioritas}'			=> 'Atribut - Kode Prioritas',
		'{nama_prioritas}'			=> 'Atribut - Nama Prioritas',
		'{kode_sifat}' 				=> 'Atribut - Kode Sifat',
		'{nama_sifat}' 				=> 'Atribut - Nama Sifat',

		'{tipe_surat_internal}'		=> 'Atribut - Tipe surat internal',

		'{header_umum}'				=> 'Header - Umum',
		'{header_pelaporan}'		=> 'Header - Pelaporan',
		'{header1}'					=> 'Header - Lain 1',
		'{header2}' 				=> 'Header - Lain 2',
		'{header3}'					=> 'Header - Lain 3',
		
		'{tanggal_sekarang}' 		=> 'Waktu - Tanggal sekarang (Tanggal-Bulan-Tahun)',
		'{tanggal_sekarang_7}'      => 'Waktu - Tanggal sekarang + 7 hari (Tanggal-Bulan-Tahun)',
		'{tanggal_sekarang_14}'     => 'Waktu - Tanggal sekarang + 14 hari (Tanggal-Bulan-Tahun)',
		'{tanggal_sekarang_30}'     => 'Waktu - Tanggal sekarang + 30 hari (Tanggal-Bulan-Tahun)',
		'{tanggal_sekarang_60}'     => 'Waktu - Tanggal sekarang + 60 hari (Tanggal-Bulan-Tahun)',
		'{tanggal_sekarang_90}'     => 'Waktu - Tanggal sekarang + 90 hari (Tanggal-Bulan-Tahun)',
		'{tanggal_sekarang_120}'    => 'Waktu - Tanggal sekarang + 120 hari (Tanggal-Bulan-Tahun)',
		'{tanggal_sekarang_180}'    => 'Waktu - Tanggal sekarang + 180 hari (Tanggal-Bulan-Tahun)',
		'{tahun}' 					=> 'Waktu - Tahun sekarang (4 digit)',
		'{tahun_yy}' 				=> 'Waktu - Tahun sekarang (2 digit)',
		'{tahun_yyyy}' 				=> 'Waktu - Tahun sekarang (4 digit)',
		'{bulan}' 					=> 'Waktu - Bulan sekarang (angka)',
		'{bulan_nama}' 				=> 'Waktu - Bulan sekarang (nama)',
		'{bulan_romawi}' 			=> 'Bulan sekarang (Romawi)',
		'{hari}' 					=> 'Waktu - Tanggal sekarang (2 digit angka)',
		'{hari_nama}' 				=> 'Waktu - Hari sekarang (nama hari)',
		'{jam_sekarang}'			=> 'Waktu - Jam sekarang (jam:menit:detik)',
		'{jam}' 					=> 'Waktu - Jam sekarang (jam)',
        '{jam_j}' 					=> 'Waktu - Jam sekarang (jam)',
        '{jam_jm}'					=> 'Waktu - Jam sekarang (jam:menit)',
        '{jam_jmd}'					=> 'Waktu - Jam sekarang (jam:menit:detik)',
        '{menit}'					=> 'Waktu - Menit sekarang',
        '{detik}'					=> 'Waktu - Detik sekarang',
        '{mikrodetik}'				=> 'Waktu - Mikrodetik sekarang'
	);

	public $template_penomoran_markup = array(
		'nip_staf' 				=> 'staf_kode',
		'nama_staf' 			=> 'staf_nama',
		'kode_unitkerja' 		=> 'unit_kode',
		'rubrik_unitkerja' 		=> 'unit_rubrik',
		'nama_unitkerja' 		=> 'unit_nama',
		'nama_jabatan' 			=> 'jabatan_nama',
		'kode_jabatan' 			=> 'jabatan_kode',

		'kode_unit_asal' 		=> 'unit_asal_kode',
		'rubrik_unit_asal' 		=> 'unit_asal_rubrik',
		'nama_unit_asal' 		=> 'unit_asal_nama',

		'nip_staf_pembuat' 					=> 'surat_properti_pembuat_kode',
		'nama_staf_pembuat' 				=> 'surat_properti_pembuat_nama',
		'kode_unitkerja_pembuat' 			=> 'surat_properti_pembuat_unit_kode',
		'rubrik_unitkerja_pembuat' 			=> 'surat_properti_pembuat_unit_rubrik',
		'nama_unitkerja_pembuat' 			=> 'surat_properti_pembuat_unit_nama',
		'nama_jabatan_pembuat' 				=> 'surat_properti_pembuat_jabatan_nama',
		'kode_jabatan_pembuat' 				=> 'surat_properti_pembuat_jabatan_kode',
		
		'nip_staf_penyetuju' 				=> 'penyetuju_kode',
		'nama_staf_penyetuju' 				=> 'penyetuju_nama',
		'kode_unitkerja_penyetuju' 			=> 'penyetuju_unit_kode',
		'rubrik_unitkerja_penyetuju' 		=> 'penyetuju_unit_rubrik',
		'nama_unitkerja_penyetuju' 			=> 'penyetuju_unit_nama',
		'nama_jabatan_penyetuju' 			=> 'penyetuju_jabatan_nama',
		'kode_jabatan_penyetuju' 			=> 'penyetuju_jabatan_kode',
		'pos_code_jabatan_penyetuju' 		=> 'penyetuju_jabatan_pos_code',

		'nip_staf_pendistribusi' 			=> 'distributor_kode',
		'nama_staf_pendistribusi' 			=> 'distributor_nama',
		'kode_unitkerja_pendistribusi' 		=> 'distributor_unit_kode',
		'rubrik_unitkerja_pendistribusi' 	=> 'distributor_unit_rubrik',
		'nama_unitkerja_pendistribusi' 		=> 'distributor_unit_nama',
		'nama_jabatan_pendistribusi' 		=> 'distributor_jabatan_nama',
		'kode_jabatan_pendistribusi' 		=> 'distributor_jabatan_kode',

		'surat_perihal'			=> 'surat_perihal',
		'kode_klasifikasi' 		=> 'kelas_kode',
		'nama_klasifikasi' 		=> 'kelas_nama',
		'kode_jenis' 			=> 'jenis_kode',
		'nama_jenis' 			=> 'jenis_nama',
		'kode_lokasi' 			=> 'lokasi_kode',
		'nama_lokasi' 			=> 'lokasi_nama',
		'lokasi_nama_sub' 		=> 'surat_lokasi_sub', //sub lokasi

		'kode_media' 			=> 'media_kode',
		'nama_media' 			=> 'media_nama',
		'kode_prioritas' 		=> 'prioritas_kode',
		'nama_prioritas' 		=> 'prioritas_nama',
		'kode_sifat' 			=> 'sifat_kode',
		'nama_sifat' 			=> 'sifat_nama'
	);

	protected $templates = array(
		'template_header',
		'notif_email_disposisi_template'
	);

	// setting may contain image, and the name should include on:
	protected $acceptableImageSetting = array(
		'template_header_logo1',
		'template_header_logo2',
		'template_header_logo3',
		'template_header_logo4',
		'template_header_logo5',
		
		'instance_logo',
		'template_header_leftlogo',
		'template_header_rightlogo',
	);

	protected $imagepath = "data/sistem/";
	
	protected $code_field = 'pengaturan_nama';
	protected $value_field = 'pengaturan_isi';
	
	static protected $settingsCacheData;
	
	function __construct() {
		parent::__construct(array(
            'table' =>array(
                'name'=>'pengaturan',
				'primary' => 'pengaturan_id',
				'fields' => array(
					array('name' => 'pengaturan_id', 'update' => false, 'unique' => true, 'notnull' => true),
					array('name' => 'pengaturan_nama', 'display' => 'Name Setting'),
					array('name' => 'pengaturan_judul', 'display' => 'Title Setting'),
					array('name' => 'pengaturan_isi', 'display' => 'Value Setting', 'convert'=>function($value){
                		return htmlspecialchars_decode($value);
            		}),
					array('name' => 'pengaturan_info', 'display' => 'Info Setting'),
					array('name' => 'pengaturan_grup', 'display' => 'Group Setting')
				),
			),
			'auto_id' => true,
		));
	}

	function getCodeField() {
		return $this->code_field;
	}

	function getValueField() {
		return $this->value_field;
	}

	// function getSettingByCode($codename, $allfield = false, $return_type = 'array') {
	// 	$query = $this->db->get_where($this->get_table_name(), array($this->code_field => $codename));
		
	// 	if ($record = $query->row_array()) {
	// 		if($record and in_array($record['pengaturan_nama'], $this->templates) ){
	// 			$record['pengaturan_isi'] = htmlspecialchars_decode($record['pengaturan_isi']);
	// 		}
	// 		if ($allfield === false) {
	// 			return $record['pengaturan_isi'];
	// 		} else if ($allfield === true) {
	// 			if ($return_type == 'object') {
	// 				return (object) $record;
	// 			} else if ($return_type === 'array') {
	// 				return (array) $record;
	// 			}
	// 		}
	// 	}
	// 	return false;
	// }

	function getSettingByCode($codename, $allfield = false, $return_type = 'array') {
		$record = $this->getSettings();
		
		if ($record and $codename) {
			if($record and in_array($record[$codename], $this->templates) ){
				$rec = htmlspecialchars_decode($record[$codename]);
			}
			if(in_array($record[$codename], $this->pengaturan_default) ){
				$rec = $record[$codename];
				if ($allfield === false) {
					return $rec;
				} else if ($allfield === true) {
					if ($return_type == 'object') {
						return (object) $rec;
					} else if ($return_type === 'array') {
						return (array) $rec;
					}
				}
			}
			else {
				return false;
			}
		}
		return false;
	}

	function getSettingByGroup($groupname, $allfield = false, $orderby = 'setting_order', $return_type = 'array') {
		$ret = array();
		$this->db->order_by($orderby, "asc");
		$query = $this->db->get_where($this->get_table_name(), array('pengaturan_grup' => $groupname));
		if ($allfield === true) {
			if ($return_type == 'object') {
				$ret = $query->result();
			} else if ($return_type == 'array') {
				$ret = $query->result_array();
			}
		} else if ($allfield === false) {
			foreach ($query->result_array() as $row) {
				$ret[$row['pengaturan_nama']] = $row['pengaturan_isi'];
			}
			if ($return_type == 'object') {
				$ret = (object) $ret;
			} else if ($return_type == 'array') {
				$ret = (array) $ret;
			}
		}
		return $ret;
	}

	function getSetting($settingId = null, $allfield = false, $return_type = 'array') {
		$record = $this->read($settingId);
		if($record and in_array($record['pengaturan_nama'], $this->templates) ){
			$record['pengaturan_isi'] = htmlspecialchars_decode($record['pengaturan_isi']);
		}
		if ($allfield) {
			if ($return_type == 'object') {
				return $record = (object) $record;
			} else {
				return $record;
			}

		} else {
			if (is_array($record) and array_key_exists($this->value_field, $record)) {
				return $record[$this->value_field];
			}
		}
	}

	function setSetting($settingId = null, $settingValue = null) {
		$response = array('success' => false);
		if (is_array($settingId) and array_key_exists($this->code_field, $settingId) and empty($settingId[$this->code_field])) {
			return $response;
		}

		$record = $this->read($settingId);
		$me = $this;
		if ($record) {
			// echo "update ".$this->value_field." => ".$settingValue. "| ";
			return $this->update($record[$this->get_primary()], array(
				$this->value_field => $settingValue,
			), function () use ($me) {
			});
		} else if (is_array($settingId) and array_key_exists($this->code_field, $settingId) and !is_null($settingId[$this->code_field])) {
			// echo "insert | ";
			return $this->insert(array(
				$this->code_field => $settingId[$this->code_field],
				$this->value_field => $settingValue,
			));
		}
		return $response;
	}

	function getSettings($withPrivate = true) {
		if(!static::$settingsCacheData)
		{
			static::$settingsCacheData = $this->find();
		}
	
		$records = static::$settingsCacheData;

		// $records = $this->find();
		// if($withPrivate){
		// }else{
		// 	$records = $this->find(array(
		// 		'IFNULL(setting_private, 0) = 0' => null
		// 	));
		// }

		$response = array();
		foreach ($records as $row) {
			if( in_array($row['pengaturan_nama'], $this->templates) ){
				$row['pengaturan_isi'] = htmlspecialchars_decode($row['pengaturan_isi']);
			}
			$response[$row['pengaturan_nama']] = $row['pengaturan_isi'];
		}
		return $response;
	}

	function setSettings($setting = null) {
		$model = $this;
		$response = array('success' => false, 'message' => 'Konfigurasi gagal disimpan');
		if (!empty($setting)) {
			foreach ($setting as $key => $value) {

				if (!array_key_exists($key, $this->pengaturan_default)) {
					continue;
				}

				$op = $this->setSetting(array($this->code_field => $key), $value);
				if ($op[$model->successProperty] !== true) {
					return $response;
				}
			}
			$response[$model->successProperty] = true;
			$response['message'] = 'Konfigurasi berhasil disimpan';
		}
		return $response;
	}

	function getImage($section) {
		switch ($section) {
			case 'instance_logo':
			case 'template_header_leftlogo':
			case 'template_header_rightlogo':
			case 'template_header_logo1':
			case 'template_header_logo2':
			case 'template_header_logo3':
			case 'template_header_logo4':
			case 'template_header_logo5':

				$path = $this->imagepath . $section . '.png';
				if (file_exists($path)) {
					return file_get_contents($path);
				}
		}
	}
	function setImage($section) {
		$model = $this;
		$response = array('success' => false);

		$imagelist = $this->acceptableImageSetting;
		if (varMatchIn($section, $imagelist)) {
			if (!file_exists($this->imagepath)) {mkdir($this->imagepath, 0777, TRUE);}
			if (!empty($_FILES[$section])) {
				$this->load->library('upload', array(
					'upload_path' => $this->imagepath,
					'allowed_types' => 'gif|jpg|png',
					'file_name' => $section . '.png',
					'max_size' => 0,
					'encrypt_name' => false,
					'overwrite' => true,
				));
				if ($this->upload->do_upload($section)) {
					$response[$model->successProperty] = true;
					$uploaddata = $this->upload->data();

					$this->load->library('image_lib');
					$this->image_lib->initialize(array(
						'source_image' => $uploaddata['full_path'],
						'width' => '100',
						'height' => '100',
					));
					if (!$this->image_lib->resize()) {
						$response['message'] = $this->image_lib->display_errors();
					}
				} else {
					$response['message'] = 'File tidak valid';
					$response['message'] .= '<br/>'.$this->upload->display_errors();
				}
			} else {
				$response['message'] = 'File tidak boleh kosong';
			}
		}
		return $response;
	}

	/**
	 * $markupLib => array (key => from)
	 */
	function getMarkedData($markupLib = array(), $dataInput = array(), $keepAllField = true){
        $data = $dataInput;
        foreach ($markupLib as $key => $mark) {
            $data[$key] = array_key_exists($mark, $dataInput) ? $dataInput[$mark] : null;
		}

        $dataReturn = array();
        if(!$keepAllField){
            foreach ($markupLib as $key => $mark) {
                $dataReturn[$key] = array_key_exists($key, $data) ? $data[$key] : null ;
            }
        }else{
            $dataReturn = $data;
        }
        return $dataReturn;
    }

	function getCompiledDataTemplate($id = null, $penyetuju_akhir = null, $tgl = null, $stafPenerima = null){
		$CI 				= get_instance();
		$now                = ($tgl) ? $tgl : date('Y-m-d H:i:s');
		$nowTime 			= strtotime($now);
		
		$model_account		= $CI->model('sipas/account', true);
		$surat_model		= $CI->model('sipas/surat', true);
		$surat_view		 	= $CI->model('sipas/surat_view', true);
		$surat_stack		= $CI->model('sipas/surat_stack', true);
		$m_stack_koreksi 	= $CI->model('sipas/surat_stack_koreksi_view', true);
		$m_stack_disposisi 	= $CI->model('sipas/surat_stack_disposisi_view', true);
		$koreksi_masuk_view = $CI->model('sipas/koreksi_masuk_view', true);
		$staf_model		 	= $CI->model('sipas/staf', true);
		$staf_view		 	= $CI->model('sipas/staf_view', true);
		$report_model		= $CI->model('sipas/report', true);
		$penerimask			= $CI->model('sipas/surat_penerimask_view', true);
		
		$model_jenis 		= $CI->model('sipas/jenis', true);
		$model_dokumen 		= $CI->model('sipas/dokumen', true);
		
		$use_ttd  		= (bool)$this->getSettingByCode('use_signature');

		$logged_profile = $model_account->get_profile();
		$surat = $surat_view->read($id);
		$response = array();

		if(!empty($surat)){
			$stack_koreksi = $m_stack_koreksi->find(array(
				'surat_stack_surat'=>$surat['surat_id']
			),false, false, true, array('surat_stack_level'=>'ASC'));

			$stack_penerima = $m_stack_disposisi->find(array(
				'surat_stack_surat' => $surat['surat_id'],
				'surat_stack_istembusan' => '0'
			), false, false, true, array('surat_stack_level' => 'ASC'));

			$stack_tembusan = $m_stack_disposisi->find(array(
				'surat_stack_surat' => $surat['surat_id'],
				'surat_stack_istembusan' => '1'
			),false, false, true, array('surat_stack_level'=>'ASC'));

			$stack = $m_stack_disposisi->find(array(
				'surat_stack_surat' => $surat['surat_id']
			),false, false, true, array('surat_stack_level'=>'ASC'));

			$stack_penerimask = $penerimask->find(array(
				'surat_penerimask_surat' => $surat['surat_id']
			),false, false, true, array('surat_penerimask_level'=>'ASC'));

			$tembusan = [];
			$bagian = [];
			$tembusan_jabatan = [];
			$tpl_tembusan = '';
			$tpl_tembusan_jabatan = '';
			$tpl_bagian = '';

			/** Parsing for all receiver (Tembusan + Penerima) **/
			if($stack){
				$penerima_jabatan = array();
	    		$penerima_nama = array();
	    		$penerima_unit = array();
	    		if(count($stack) > 1){
	    			foreach ($stack as $key => $value) {
	                	if (!in_array($value['jabatan_nama'], $penerima_jabatan)) {
	                    	array_push($penerima_jabatan, $value['jabatan_nama'] . '<br>');
	                    }
	                    if (!in_array($value['staf_nama'], $penerima_nama)) {
	                    	array_push($penerima_nama, $value['staf_nama'] . '<br>');
	                    }
	                    if (!in_array($value['unit_nama'], $penerima_unit)) {
	                    	array_push($penerima_unit, $value['unit_nama'] . '<br>');
	                    }
	                }
	                $dPenerima_nama = implode("", $penerima_nama);
	                $dPenerima_jabatan = implode("", $penerima_jabatan);
	                $dPenerima_unit = implode("", array_unique($penerima_unit));
	            }else{
	                $dPenerima_jabatan = $stack[0]['jabatan_nama'];
	                $dPenerima_nama = $stack[0]['staf_nama'];
	                $dPenerima_unit = $stack[0]['unit_nama'];
	            }
	        } else {
	        	$dPenerima_nama = '';
	    		$dPenerima_jabatan = '';
	    		$dPenerima_unit = '';
	    	}

	        /** Parsing only for Penerima **/
	    	if ($stack_penerima) {
	    		$penerima_kepada_jabatan = array();
	    		$penerima_kepada_nama = array();
	            $penerima_kepada_unit = array();
	    		foreach ($stack_penerima as $key => $value) {
	    			if (!in_array($value['jabatan_nama'], $penerima_kepada_jabatan)) {
	    				array_push($penerima_kepada_jabatan, $value['jabatan_nama'] . '<br>');
		    		}
		    		if (!in_array($value['staf_nama'], $penerima_kepada_nama)) {
	    				array_push($penerima_kepada_nama, $value['staf_nama'] . '<br>');
		    		}
		    		if (!in_array($value['unit_nama'], $penerima_kepada_unit)) {
	    			$un = explode("-", $value['unit_nama']);
	    			array_push($penerima_kepada_unit, $un[0] . '<br>');
		    		}
	    		}
	    		$dPenerima_kepada_nama = implode("", $penerima_kepada_nama);
	    		$dPenerima_kepada_jabatan = implode("", $penerima_kepada_jabatan);
	            $dPenerima_kepada_unit = implode("", array_unique($penerima_kepada_unit));
	    	} else {
	    		$dPenerima_kepada_nama = '';
	    		$dPenerima_kepada_jabatan = '';
	            $dPenerima_kepada_unit = '';
	    	}

	    	/** Parsing only for Tembusan **/
	    	if ($stack_tembusan) {
	    		$tembusan_kepada_jabatan = array();
	    		$tembusan_kepada_nama = array();
	            $tembusan_kepada_unit = array();
	    		foreach ($stack_tembusan as $key => $value) {
	    			if (!in_array($value['jabatan_nama'], $tembusan_kepada_jabatan)) {
	    				array_push($tembusan_kepada_jabatan, $value['jabatan_nama'] . '<br>');
	    			}
	    			if (!in_array($value['staf_nama'], $tembusan_kepada_nama)) {
	    				array_push($tembusan_kepada_nama, $value['staf_nama'] . '<br>');
	    			}
	                if (!in_array($value['unit_nama'], $tembusan_kepada_unit)) {
	                    $un = explode("-", $value['unit_nama']);
	                    array_push($tembusan_kepada_unit, $un[0] . '<br>');
	                }
	    		}
	    		$dTembusan_kepada_nama = implode("", $tembusan_kepada_nama);
	    		$dTembusan_kepada_jabatan = implode("", $tembusan_kepada_jabatan);
	            $dTembusan_kepada_unit = implode("", array_unique($tembusan_kepada_unit));
	    	} else {
	    		$dTembusan_kepada_nama = '';
	    		$dTembusan_kepada_jabatan = '';
	            $dTembusan_kepada_unit = '';
	    	}

	    	if ($stack_tembusan) {
	    		foreach ($stack_tembusan as $k => $v) {
	    			if ($v['surat_stack_istembusan'] === '1') {
	    				$tembusan[$k] = $v['jabatan_nama'];
	    				// $tembusan[$k] = '- '.$v['jabatan_penerima_nama'];
	    			}else{
	    				$tembusan[$k] = "-";
	    			}
	    		}
			$tembusan = array_unique($tembusan);
	    	}

	        // $jab = array_slice($tembusan, 0, 5);
	        // $tembusan = implode("<br>", $jab);

	        $jumlahTembusan = count($tembusan);
	        $staf = array_slice($tembusan, 0, 5);
	        $tembusan = implode("<br>", $staf);
	        // $tembusan = implode("<br>", array_unique($staf));

	        if($jumlahTembusan >= 5) {
	            $lmt = (int)$jumlahTembusan - 5;
	            $tembusan = $tembusan."<br> dan ".$lmt." Jabatan lainnya";
	        }

	        $tembusan_luar = '';
	        if($surat['surat_model'] === '2'){
	        	$tembusan_luar = $surat['surat_kepada'];
	        }

	        /** For surat_lampiran**/
	        if(empty($surat['surat_lampiran'])) $surat['surat_lampiran'] = '-';

	        //ttd digital
	        $jenis = $model_jenis->read($surat['surat_jenis']);
	        $data_stack_koreksi = $m_stack_koreksi->read(array(
	            'surat_stack_surat' => $surat['surat_id'],
	            'surat_stack_staf' => $surat['surat_setuju_akhir_staf']
	        ));

	        $stack_staf = isset($data_stack_koreksi['surat_stack_staf']) ? $data_stack_koreksi['surat_stack_staf'] : null;
	        $stack_pelaku = isset($data_stack_koreksi['surat_stack_pelaku']) ? $data_stack_koreksi['surat_stack_pelaku'] : null;
	        if ($jenis['jenis_ttd'] == 1) {
	            // if ($use_ttd) {
		    //        $ttd_source = $data_stack_koreksi['surat_stack_status_ttd'];
	            //}else{
		    //        if ($stack_staf != $stack_pelaku) {
		    //            $ttd_source = base_url().'server.php/sipas/staf/get_ttd?id='.$stack_pelaku;
		    //        } else {
		    //            $ttd_source = base_url().'server.php/sipas/staf/get_ttd?id='.$stack_staf;
		    //        }
	            //}
		    	$ttd_source = isset($data_stack_koreksi['surat_stack_status_ttd']) ? $data_stack_koreksi['surat_stack_status_ttd'] : null;

	            if ($stack_staf != $stack_pelaku) {
	                $ttd_source = base_url().'server.php/sipas/staf/get_image/ttd?id='.$stack_pelaku;
	            } else {
	                $ttd_source = base_url().'server.php/sipas/staf/get_image/ttd?id='.$stack_staf;
	            }
	        } else {
	            $idPenyetuju = $surat['surat_setuju_akhir_staf'];
	            $ttd_source = base_url().'server.php/sipas/staf/get_image/ttd?id='.$idPenyetuju;
	        }

		    $suratTanggal = $surat['surat_tanggal'];
	        $createSuratTanggal = new DateTime($suratTanggal);
	        $surat['surat_tanggal'] = $createSuratTanggal->format('d M Y');

	        /*for disposisi pelaku*/
	        $penerima = $koreksi_masuk_view->read(array(
	            'disposisi_surat' => $id,
	            'disposisi_masuk_penerima_id' => $surat['surat_setuju_akhir_staf'],
	            'disposisi_masuk_koreksi_status' => 0
	        ));

	        $staf_penerima = isset($penerima['disposisi_masuk_penerima_id']) ? $penerima['disposisi_masuk_penerima_id'] : null;
	        $staf_pelaku = isset($penerima['disposisi_masuk_status_staf']) ? $penerima['disposisi_masuk_status_staf'] : null;
	        $pelaku = $staf_model->read($staf_pelaku);
	        $stafPenyetuju = $staf_view->read($surat['surat_setuju_akhir_staf']);
	        $stafPetikan = $staf_view->read($surat['surat_petikan_akhir_staf']);
		$ttd_petikan = base_url().'server.php/sipas/staf/get_image/ttd?id='.$surat['surat_petikan_akhir_staf'];

	        if ($staf_penerima != $staf_pelaku) {
	            $jabatan_penyetuju = 'Pgs. '.$stafPenyetuju['jabatan_nama'];
	            $nama_penyetuju = isset($pelaku['staf_nama']) ? $pelaku['staf_nama'] : '-';
	            $nip_penyetuju = isset($pelaku['staf_kode']) ? $pelaku['staf_kode'] : '-';
	            $ttd_penyetuju = base_url().'server.php/sipas/staf/get_image/ttd?id='.$pelaku['staf_id'];
	        }else{
	            $jabatan_penyetuju = isset($stafPenyetuju['jabatan_nama']) ? $stafPenyetuju['jabatan_nama'] : '-';
	            $nama_penyetuju = isset($stafPenyetuju['staf_nama']) ? $stafPenyetuju['staf_nama'] : '-';
	            $nip_penyetuju = isset($stafPenyetuju['staf_kode']) ? $stafPenyetuju['staf_kode'] : '-';
	            $ttd_url = '<img src="'.$ttd_source.'" height="auto" width="150px" alt=""/>';
	            $ttd_penyetuju = base_url().'server.php/sipas/staf/get_image/ttd?id='.$surat['surat_setuju_akhir_staf'];
	        }

	        if ($stack_penerima) {
	            $penerima_kepada_jabatan = array();
	            $penerima_kepada_nama = array();
	            // $end = end($stack_penerima);
	            // $kepada = $end['jabatan_nama'];
	            if(count($stack_penerima) > 1){
	                foreach ($stack_penerima as $key => $value) {
	                    if (!in_array($value['staf_nama'], $penerima_kepada_nama)) {
	                        array_push($penerima_kepada_nama, '- ' . $value['staf_nama'] . '<br>');
	                    }
	                    if (!in_array($value['jabatan_nama'], $penerima_kepada_jabatan)) {
	                        array_push($penerima_kepada_jabatan, '- ' . $value['jabatan_nama'] . '<br>');
	                    }
	                }
	                $dPenerima_kepada_nama = implode("", $penerima_kepada_nama);
	                $dPenerima_kepada_jabatan = implode("", $penerima_kepada_jabatan);

	            }else{
	                $dPenerima_kepada_nama = $stack_penerima[0]['staf_nama'];
			$dPenerima_kepada_jabatan = $stack_penerima[0]['jabatan_nama'];
	            }
	        } else {
	            $dPenerima_kepada_nama = '';
	            $dPenerima_kepada_jabatan = '';
	        }

	        /** For surat_kepada**/
	        if ($surat['surat_model'] === '1' || $surat['surat_model'] === '2') {
	            $kepada = $surat['surat_tujuan'];
	        }elseif ($surat['surat_model'] === '3' || $surat['surat_model'] === '4') {
	            $kepada = $dPenerima_kepada_jabatan;
	        }else{
	            $kepada = '';
	        }

	        /** For surat_pengirim **/
	        if ($surat['surat_model'] == 4) {
	        	$pengirim = $surat['unit_nama'];
	        }else{
	        	$pengirim = $surat['surat_pengirim'];
	        }

	        /** For surat_tanggal **/
	        if($surat['surat_tanggal']){
	            $date = $surat['surat_tanggal'];
	            $createDate = new DateTime($date);
	            $surat['surat_tanggal'] = $surat_model->tglIndonesia($createDate->format('d F Y'));
	        }

			/** For surat_setuju_tgl **/
			$dateSetuju = $surat['surat_setuju_tgl'];
	        $createDateSetuju = new DateTime($dateSetuju);
	        $surat['surat_setuju_tgl'] = $surat_model->tglIndonesia($createDateSetuju->format('d F Y'));

	        /** For Logo**/
	        $Logo = '';
	        $LogoNormal = '';
	        $file = base_url().'server.php/sipas/staf/get_image_logo_new';

	        if($file) {
				$Logo = '<img style="width: 64mm; height: 17mm; margin-left: -19mm;" src="'.$file.'"/>';
				$LogoNormal = '<img style="width: 64mm; height: 17mm;" src="'.$file.'"/>';
			}

	        $table_open = '<table border="1 solid black" width="100%" style="border-collapse:collapse;">
	        					<tr style="text-align:center">
	        						<td rowspan="2"><strong>NO</strong></td>
	        						<td rowspan="2"><strong>NAMA / NIK</strong></td>
	        						<td rowspan="2"><strong>GOL</strong></td>
	        						<td rowspan="2"><strong>JABATAN LAMA</strong></td>
	        						<td rowspan="2"><strong>JABATAN BARU</strong></td>
	        						<td colspan="2"><strong>JENJANG JABATAN</strong></td>
	        						<td rowspan="2"><strong>KETERANGAN</strong></td>
	        					</tr>
	        					<tr style="text-align:center; font-weight: bold">
	        						<td>LAMA</td>
	        						<td>BARU</td>
	        					</tr>
	        					<tr style="text-align:center; font-weight:bold">
	        						<td>1</td>
	        						<td>2</td>
	        						<td>3</td>
	        						<td>4</td>
	        						<td>5</td>
	        						<td>6</td>
	        						<td>7</td>
	        						<td>8</td>
	        					<tr>';

	        $table_body = '';
	        $no_pen = 1;

			$stafPenerimask = array();

			$jml_penerimask = count($stack_penerimask);

			$first_penerimask = '';
			$first_penerimask_unit = '';
			if($stack_penerimask) {
				$stack_penerimask_pertama = $stack_penerimask[0];

				if($surat['surat_jenis_sub']) {
					$jenis_sub_all = $model_jenis->get_jenis_sub();
					$jenis_sub = null;
					foreach ($jenis_sub_all as $key => $val) {
						if($val->sub_id == $surat['surat_jenis_sub']) {
							$jenis_sub = $val->sub_tipe;
						}
					}
					
					if($jenis_sub == 0) {
						$first_penerimask_unit = $stack_penerimask_pertama['jabatan_baru_unit_nama'];
					} else {
						$first_penerimask_unit = $stack_penerimask_pertama['unit_nama'];
					}
				}

				$penerimask_sdr_pertama = null;
				if($stack_penerimask_pertama['staf_kelamin'] == 1) {
					$penerimask_sdr_pertama = 'Sdr.';
				} else {
					$penerimask_sdr_pertama = 'Sdri.';
				}

				$first_penerimask = $stack_penerimask_pertama['staf_nama'];
			}

	        foreach ($stack_penerimask as $key => $val) {
	        	$rec = '<tr style="text-align:center;"">
					<td>'.$no_pen.'</td>
					<td>'.$val['staf_nama'].' / '.$val['staf_kode'].'</td>
					<td>'.$val['golongan_baru_level'].'</td>
					<td>'.$val['jabatan_lama_nama'].'</td>
					<td>'.$val['jabatan_baru_nama'].'</td>
					<td>'.$val['surat_penerimask_jenjang_jabatan_lama'].'</td>
					<td>'.$val['surat_penerimask_jenjang_jabatan_baru'].'</td>
					<td>'.$val['surat_penerimask_keterangan'].'</td>
				</tr>';

	        	$table_body = $table_body.$rec;
	        	$no_pen++;

        		if($val['staf_id'] == $stafPenerima) {
					$tmtLamaDate = new DateTime($val['surat_penerimask_tmt']);
	        		$tmtLamaRendered = $surat_model->tglIndonesia($tmtLamaDate->format('d F Y'));

					$penerimask_sdr = null;
					if($val['staf_kelamin'] == 1) {
						$penerimask_sdr = 'Sdr.';
					} else {
						$penerimask_sdr = 'Sdri.';
					}
					
					$stafPenerimask['penerimask_nama'] 				= $val['staf_nama'];
					$stafPenerimask['penerimask_nip'] 				= $val['staf_kode'];
					$stafPenerimask['penerimask_unit'] 				= $val['unit_nama'];
					$stafPenerimask['penerimask_sdr'] 				= $penerimask_sdr;
					$stafPenerimask['penerimask_jabatan_lama'] 		= $val['jabatan_lama_nama'];
					$stafPenerimask['penerimask_jabatan_baru'] 		= $val['jabatan_baru_nama'];
					$stafPenerimask['penerimask_unit_jabatan_lama']	= $val['jabatan_lama_unit_nama'];
					$stafPenerimask['penerimask_unit_jabatan_baru']	= $val['jabatan_baru_unit_nama'];
					$stafPenerimask['penerimask_golongan_lama'] 	= $val['golongan_lama_level'];
					$stafPenerimask['penerimask_golongan_baru'] 	= $val['golongan_baru_level'];
					$stafPenerimask['penerimask_sgt_lama'] 			= $val['surat_penerimask_sglama'];
					$stafPenerimask['penerimask_sgt_baru'] 			= $val['surat_penerimask_sgbaru'];
					$stafPenerimask['penerimask_gaji_pokok_lama']	= $val['surat_penerimask_gplama'];
					$stafPenerimask['penerimask_gaji_pokok_baru'] 	= $val['surat_penerimask_gpbaru'];
					$stafPenerimask['penerimask_tmt'] 	            = $tmtLamaRendered;
					$stafPenerimask['jenjang_jabatan_lama'] 		= $val['surat_penerimask_jenjang_jabatan_lama'];
					$stafPenerimask['jenjang_jabatan_baru'] 		= $val['surat_penerimask_jenjang_jabatan_baru'];
					$stafPenerimask['penerimask_ket'] 				= $val['surat_penerimask_keterangan'];
					$stafPenerimask['penerimask_no_urut'] 			= $val['surat_penerimask_level'];
				}
	        }

	        $table_close = '</table>';
	        $record_penerimask = $table_open.$table_body.$table_close;

	        if ($surat['surat_tmt']) {
	        	$tmtDate = new DateTime($surat['surat_tmt']);
	        	$tmt = $surat_model->tglIndonesia($tmtDate->format('d F Y'));
	        }else{
	        	$tmt = '';
	        }

			$response = array(
	            'logo' => $Logo,
	            'logo_normal' => $LogoNormal,
	            'header1' => $report_model->generateHeader(true, 7, 'header1'),
	            'header2' => $report_model->generateHeader(true, 7, 'header2'),
	            'header3' => $report_model->generateHeader(true, 7, 'header3'),
	            'header_umum' => $report_model->generateHeader(true, 7, 'header4'),
	            'header_pelaporan' => $report_model->generateHeader(true, 7, 'header5'),
	            
	            'tanggal_persetujuan' => $surat['surat_setuju_tgl'],

	            /*semua penerima (tembusan + penerima)*/
	            'penerima_unit' => $dPenerima_kepada_unit,
	    	    'penerima_jabatan' => $dPenerima_kepada_jabatan,
	    	    'penerima_nama' => $dPenerima_kepada_nama,

	    	    /*semua penerima (penerima)*/
	            'penerima_penerima_unit' => $dPenerima_kepada_unit,
	    	    'penerima_penerima_jabatan' => $dPenerima_kepada_jabatan,
	    	    'penerima_penerima_nama' => $dPenerima_kepada_nama,

	    	    /*semua penerima (tembusan)*/
	    	    'penerima_tembusan_unit' => $dTembusan_kepada_unit,
	    	    'penerima_tembusan_jabatan' => $dTembusan_kepada_jabatan,
	    	    'penerima_tembusan_nama' => $dTembusan_kepada_nama,

	    	    'surat_kepada' => $kepada,
	    	    'surat_pengirim' => $pengirim,
	    	    'surat_tembusan' => $tembusan_luar,
	    	    'tembusan' => $tembusan,

                'surat_nomor' => $surat['surat_nomor'],
                'surat_tujuan' => $surat['surat_tujuan'],
                'surat_pengirim' => $surat['surat_pengirim'],
                'surat_tanggal' => $surat['surat_tanggal'],
                'surat_lampiran' => $surat['surat_lampiran'],
                'kode_sifat' => $surat['sifat_kode'],
                'kode_prioritas' => $surat['prioritas_kode'],
                'surat_perihal' => $surat['surat_perihal'],
                'tembusan_surat' => '',

                'jabatan_penyetuju_terakhir' => isset($stafPenyetuju['jabatan_nama']) ? $stafPenyetuju['jabatan_nama'] : '',
                'nama_penyetuju_terakhir' => isset($stafPenyetuju['staf_nama']) ? $stafPenyetuju['staf_nama'] : '',
                'nip_penyetuju_terakhir' => isset($stafPenyetuju['staf_kode']) ? $stafPenyetuju['staf_kode'] : '',
                'jabatan_penyetuju_pelaku' => $jabatan_penyetuju,
                'nama_penyetuju_pelaku' => $nama_penyetuju,
                'nip_penyetuju_pelaku' => $nip_penyetuju,
                'tanda_tangan' => '<img src="'.$ttd_penyetuju.'" height="auto" width="150px" alt=""/>',
				
                'qrcode' => '<img src="'.$surat_model->qrcode($id).'" alt="" />',
                'qrcode_text' => 'ditandatangani secara digital',
                'ttd_digital' => '<img src="'.$ttd_source.'" height="auto" width="150px" alt=""/>',
				
                'penerimask'=> $record_penerimask,
				
				'jabatan_petikan_terakhir' 		=> isset($stafPetikan['jabatan_nama']) ? $stafPetikan['jabatan_nama'] : '',
                'nama_petikan_terakhir' 		=> isset($stafPetikan['staf_nama']) ? $stafPetikan['staf_nama'] : '',
                'nip_petikan_terakhir' 			=> isset($stafPetikan['staf_kode']) ? $stafPetikan['staf_kode'] : '',
                'ttd_petikan_terakhir' 			=> '<img src="'.$ttd_petikan.'" height="auto" width="150px" alt=""/>',

				'penerimask_nama' 				=> isset($stafPenerimask['penerimask_nama']) ? $stafPenerimask['penerimask_nama'] : '-',
				'penerimask_nip' 				=> isset($stafPenerimask['penerimask_nip']) ? $stafPenerimask['penerimask_nip'] : '-',
				'penerimask_unit' 				=> isset($stafPenerimask['penerimask_unit']) ? $stafPenerimask['penerimask_unit'] : '-',
				'penerimask_sdr' 				=> isset($penerimask_sdr) ? $penerimask_sdr : '-',
				'penerimask_jabatan_lama' 		=> isset($stafPenerimask['penerimask_jabatan_lama']) ? $stafPenerimask['penerimask_jabatan_lama'] : '-',
				'penerimask_jabatan_baru' 		=> isset($stafPenerimask['penerimask_jabatan_baru']) ? $stafPenerimask['penerimask_jabatan_baru'] : '-',
				'penerimask_unit_jabatan_lama'	=> isset($stafPenerimask['penerimask_unit_jabatan_lama']) ? $stafPenerimask['penerimask_unit_jabatan_lama'] : '-',
				'penerimask_unit_jabatan_baru'	=> isset($stafPenerimask['penerimask_unit_jabatan_baru']) ? $stafPenerimask['penerimask_unit_jabatan_baru'] : '-',
				'penerimask_golongan_lama'		=> isset($stafPenerimask['penerimask_golongan_lama']) ? $stafPenerimask['penerimask_golongan_lama'] : '-',
				'penerimask_golongan_baru'		=> isset($stafPenerimask['penerimask_golongan_baru']) ? $stafPenerimask['penerimask_golongan_baru'] : '-',
				'penerimask_sgt_lama' 			=> isset($stafPenerimask['penerimask_sgt_lama']) ? $stafPenerimask['penerimask_sgt_lama'] : '-',
				'penerimask_sgt_baru' 			=> isset($stafPenerimask['penerimask_sgt_baru']) ? $stafPenerimask['penerimask_sgt_baru'] : '-',
				'penerimask_gaji_pokok_lama' 	=> isset($stafPenerimask['penerimask_gaji_pokok_lama']) ? 'Rp. '.number_format($stafPenerimask['penerimask_gaji_pokok_lama'],0,null,".").',-' : '-',
				'penerimask_gaji_pokok_baru' 	=> isset($stafPenerimask['penerimask_gaji_pokok_baru']) ? 'Rp. '.number_format($stafPenerimask['penerimask_gaji_pokok_baru'],0,null,".").',-' : '-',
				'penerimask_tmt' 				=> isset($stafPenerimask['penerimask_tmt']) ? $stafPenerimask['penerimask_tmt'] : '-',
				'jenjang_jabatan_lama' 			=> isset($stafPenerimask['jenjang_jabatan_lama']) ? $stafPenerimask['jenjang_jabatan_lama'] : '-',
				'jenjang_jabatan_baru' 			=> isset($stafPenerimask['jenjang_jabatan_baru']) ? $stafPenerimask['jenjang_jabatan_baru'] : '-',
				'penerimask_ket' 				=> isset($stafPenerimask['penerimask_ket']) ? $stafPenerimask['penerimask_ket'] : '-',
				'penerimask_no_urut' 			=> isset($stafPenerimask['penerimask_no_urut']) ? $stafPenerimask['penerimask_no_urut'] + 1 : '-',
				'penerimask_jumlah' 			=> isset($jml_penerimask) ? $jml_penerimask . ' ORANG' : '0 ORANG',
				'penerimask_pertama' 			=> isset($first_penerimask) ? strtoupper($first_penerimask) : '-',
				'penerimask_sdr_pertama' 		=> isset($penerimask_sdr_pertama) ? $penerimask_sdr_pertama : '-',
				'penerimask_unit_pertama' 		=> isset($first_penerimask_unit) ? strtoupper($first_penerimask_unit) : '-',
				'terhitung_mulai_tgl' 			=> isset($tmt) ? $tmt : '-'
		    );
        }

		$bulan = date('n');
		$romawi = $this->getRomawi($bulan);

		$dataDate = array(
			'tanggal_sekarang'      =>date('d-m-Y', $nowTime),
			'tanggal_sekarang_7'    =>date('d-m-Y', strtotime($now . ' + 7 days')),
			'tanggal_sekarang_14'   =>date('d-m-Y', strtotime($now . ' + 14 days')),
			'tanggal_sekarang_30'   =>date('d-m-Y', strtotime($now . ' + 30 days')),
			'tanggal_sekarang_60'   =>date('d-m-Y', strtotime($now . ' + 60 days')),
			'tanggal_sekarang_90'   =>date('d-m-Y', strtotime($now . ' + 90 days')),
			'tanggal_sekarang_120'  =>date('d-m-Y', strtotime($now . ' + 120 days')),
			'tanggal_sekarang_180'  =>date('d-m-Y', strtotime($now . ' + 180 days')),
			'tahun'                 =>date('Y', $nowTime),
			'tahun_yy'              =>date('y', $nowTime),
			'tahun_yyyy'            =>date('Y', $nowTime),
			'bulan'                 =>date('m', $nowTime),
			'bulan_nama'            =>date('M', $nowTime),
			'bulan_romawi'          =>$romawi,
			'hari'                  =>date('d', $nowTime),
			'hari_nama'             =>date('D', $nowTime),
			'jam_sekarang'          =>date('H:i:s', $nowTime),
			'jam'                   =>date('H', $nowTime),
			'jam_j'                 =>date('H', $nowTime),
			'jam_jm'                =>date('H:i', $nowTime),
			'jam_jmd'               =>date('H:i:s', $nowTime),
			'menit'                 =>date('i', $nowTime),
			'detik'                 =>date('i', $nowTime),
			'mikrodetik'            =>date('u', $nowTime),
        );

        if($penyetuju_akhir){
            $r_staf = $staf_view->find(array('staf_id'=>$penyetuju_akhir));
            if(array_key_exists(0,$r_staf)){
                $surat['penyetuju_kode'] = $r_staf[0]['staf_kode'];
                $surat['penyetuju_nama'] = $r_staf[0]['staf_nama'];
                $surat['penyetuju_unit_kode'] = $r_staf[0]['unit_kode'];
                $surat['penyetuju_unit_rubrik'] = $r_staf[0]['unit_rubrik'];
                $surat['penyetuju_unit_nama'] = $r_staf[0]['unit_nama'];
                $surat['penyetuju_jabatan_nama'] = $r_staf[0]['jabatan_nama'];
                $surat['penyetuju_jabatan_kode'] = $r_staf[0]['jabatan_kode'];
                $surat['penyetuju_jabatan_pos_code'] = $r_staf[0]['jabatan_pos_code'];
            }
        }

		$data = $this->getMarkedData($this->template_penomoran_markup,
            array_merge(
				(array)$dataDate,
				(array)$logged_profile,
				(array)$surat,
				(array)$response
            )
        );

		return $data;
	}

	function getRomawi($v){
        switch ($v){
            case 1: 
                return "I";
                break;
            case 2:
                return "II";
                break;
            case 3:
                return "III";
                break;
            case 4:
                return "IV";
                break;
            case 5:
                return "V";
                break;
            case 6:
                return "VI";
                break;
            case 7:
                return "VII";
                break;
            case 8:
                return "VIII";
                break;
            case 9:
                return "IX";
                break;
            case 10:
                return "X";
                break;
            case 11:
                return "XI";
                break;
            case 12:
                return "XII";
                break;
            case 13:
                return "XIII";
                break;
            case 14:
                return "XIV";
                break;
            case 15:
                return "XV";
                break;
            case 16:
                return "XVI";
                break;
            case 17:
                return "XVII";
                break;
            case 18:
                return "XVIII";
                break;
            case 19:
                return "XIX";
                break;
            case 20:
                return "XX";
                break;
        }
    }
}