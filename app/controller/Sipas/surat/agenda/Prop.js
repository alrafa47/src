Ext.define("SIPAS.controller.Sipas.surat.agenda.Prop", {
  extend: "SIPAS.controller.Sipas.base.Prop",

  controllers: [
    "Sipas.arsip.Pane",
    "Sipas.surat.penerima.List",
    "Sipas.surat.penyetuju.List",
    "Sipas.surat.informasi.Pane",
    "Sipas.surat.agenda.log.Popup",
    "Sipas.keluar.agenda.Lookup",
  ],

  models: ["Sipas.Surat"],

  stores: [
    "Sipas.jenis.Combo",
    "Sipas.kelas.Combo",
    "Sipas.sifat.Combo",
    "Sipas.prioritas.Combo",
    "Sipas.media.Combo",
    "Sipas.lokasi.Combo",
    "Sipas.surat.kontak.Combo",
    "Sipas.surat.penerimakeluar.List",
  ],

  messages: {
    invalid: "Referensi tidak valid",
    invalidMode: ["Error", "Mode tidak sesuai"],
    receiver_empty: "Penerima surat tidak boleh kosong",
    approver_empty: "Penyetuju surat tidak boleh kosong",
    petikan_empty: "Petikan surat tidak boleh kosong",
    approver_exist: "Penyetuju surat sudah ada",
    korespondensi_empty: "Korespondensi Kosong",
    invalid_retensi: "Tanggal masa aktif yang diatur sudah lewat",
    penyetuju_empty: "<b>Booking nomor aktif</b>, penyetuju tidak boleh kosong",
    invalid_jabatan:
      "Penyetuju terakhir tidak memiliki kode eselon, mohon ganti penyetuju terakhir",
    invalid_penerima:
      "Penerima tidak memiliki akses untuk menjadi penerima, mohon ganti penerima",
    invalid_eselon:
      "Anda tidak memiliki kode eselon, anda tidak bisa menyetujui surat ini",
    receiver_exist: ["Info", "Staf dengan Nama:{id} sudah masuk dalam daftar"],
    receiver_limit: "Batas penerima maksimal hanya 50 pegawai",
    retensi_empty: "Anda belum memilih tanggal masa aktif",
    invalid_berkas_petikan: "Anda belum menambahkan berkas petikan",
    invalid_berkas_skperorangan: "Anda belum menambahkan berkas SK Perorangan",
    not_multiselect: "Hanya bisa memilih 1 penerima",
    alert_penerimask_changed:
      "Anda telah melakukan perubahan di List Penerima. Mohon cek kembali dokumen lampiran kolektif!",
  },

  api: {
    batasReupload: "server.php/sipas/surat/batasReupload",
    saveLokasi: "server.php/sipas/surat/simpanLokasi",
    next_agenda: "server.php/sipas/surat/next/agenda",
    next_registrasi: "server.php/sipas/surat/next/registrasi",
    next_kode: "server.php/sipas/surat/next/kode",
    resi: "server.php/sipas/surat/resi/surat?id={id}",
    ekspedisi: "server.php/sipas/ekspedisi/report?id={id}&download={download}",
    profile_image: "server.php/sipas/staf/get_image/foto?id={id}&dc={dc}",
    prioritas_hari: "server.php/sipas/prioritas/getHari?id={id}",
    sifat: "server.php/sipas/sifat/readrahasia",
    kelas: "server.php/sipas/kelas/readJenis?id={id}",
    read_kelas: "server.php/sipas/kelas/read?id={id}",
    jenisretensi: "server.php/sipas/jenis/read?id={id}",
    print_approval: "server.php/sipas/surat/printApproval?id={id}",
    salinNomor: "server.php/sipas/surat/salinNomor",
    checkTembusan: "server.php/sipas/surat_ekspedisi/checkTembusan",
  },

  refs: [
    { ref: "mainview", selector: "sipas_surat_agenda_prop" },
    { ref: "form", selector: "sipas_surat_agenda_prop form" },
    {
      ref: "containerRetensi",
      selector: "sipas_surat_agenda_prop form sipas_retensi_pane",
    },
    {
      ref: "containerInaktif",
      selector: "sipas_surat_agenda_prop form sipas_retensi_pane",
    },
    {
      ref: "radioJenisPengiriman",
      selector: "sipas_surat_agenda_prop form #radio_jenis_pengiriman",
    },
    {
      ref: "containerAtribut",
      selector: "sipas_surat_agenda_prop form #containerAtributs",
    },
    {
      ref: "cmpAgenda",
      selector: "sipas_surat_agenda_prop form [name=surat_agenda]",
    },
    {
      ref: "cmpRegistrasi",
      selector: "sipas_surat_agenda_prop form [name=surat_registrasi]",
    },
    {
      ref: "cmpNomor",
      selector: "sipas_surat_agenda_prop form [name=surat_nomor]",
    },
    {
      ref: "cmpJenis",
      selector: "sipas_surat_agenda_prop form [name=surat_jenis]",
    },
    {
      ref: "cmpJenisSub",
      selector: "sipas_surat_agenda_prop form [name=surat_jenis_sub]",
    },
    {
      ref: "cmpKelas",
      selector: "sipas_surat_agenda_prop form [name=surat_kelas]",
    },
    {
      ref: "cmpTanggal",
      selector: "sipas_surat_agenda_prop form [name=surat_tanggal]",
    },
    {
      ref: "comboPengirim",
      selector: "sipas_surat_agenda_prop form #comboPengirim",
    },
    {
      ref: "coontainerBerkas",
      selector: "sipas_surat_agenda_prop form sipas_dokumen_paneview",
    },
    {
      ref: "cmpBerkasExist",
      selector:
        "sipas_surat_agenda_prop form sipas_dokumen_paneview [name=jumlah_berkas]",
    },
    {
      ref: "cmpKorespondensi",
      selector:
        "sipas_surat_agenda_prop form sipas_com_surat_korespondensi_pane",
    },
    {
      ref: "cmpUrut",
      selector:
        "sipas_surat_agenda_prop sipas_surat_penyetuju_list #penyetujuUrut",
    },
    {
      ref: "cmpPetikanUrut",
      selector: "sipas_surat_agenda_prop sipas_surat_petikan_list #petikanUrut",
    },
    {
      ref: "listPenerima",
      selector: "sipas_surat_agenda_prop form sipas_surat_penerima_list",
    },
    {
      ref: "listPenerimaKeluar",
      selector: "sipas_surat_agenda_prop form sipas_surat_penerimakeluar_list",
    },
    {
      ref: "listPenyetuju",
      selector: "sipas_surat_agenda_prop form sipas_surat_penyetuju_list",
    },
    {
      ref: "listPetikan",
      selector: "sipas_surat_agenda_prop form sipas_surat_petikan_list",
    },
    {
      ref: "titleListPenyetuju",
      selector:
        "sipas_surat_agenda_prop form sipas_surat_penyetuju_list #textPenyetuju",
    },
    {
      ref: "titleListPetikan",
      selector:
        "sipas_surat_agenda_prop form sipas_surat_petikan_list #textPetikan",
    },
    {
      ref: "titleListPenerima",
      selector:
        "sipas_surat_agenda_prop form sipas_surat_penerima_list toolbar displayfield",
    },
    {
      ref: "cmpTipe",
      selector: "sipas_surat_agenda_prop form [name=surat_itipe]",
    },
    {
      ref: "cmpUnit",
      selector: "sipas_surat_agenda_prop form [name=surat_unit]",
    },
    {
      ref: "cmpRahasia",
      selector: "sipas_surat_agenda_prop form [name=surat_israhasia]",
    },
    { ref: "comboKelas", selector: "sipas_surat_agenda_prop form #kelas_kode" },
    {
      ref: "comboLokasi",
      selector: "sipas_surat_agenda_prop form [name=surat_lokasi]",
    },
    {
      ref: "textLokasiSub",
      selector: "sipas_surat_agenda_prop form [name=surat_lokasi_sub]",
    },
    {
      ref: "comboSifat",
      selector: "sipas_surat_agenda_prop form [name=surat_sifat]",
    },
    {
      ref: "cmpBackdatedInfo",
      selector:
        "sipas_surat_agenda_prop form [name=surat_keluar_backdated_info]",
    },
    {
      ref: "cmpUseBalas",
      selector: "sipas_surat_agenda_prop form [name=surat_usebalas]",
    },
    {
      ref: "cmpPrioritasTgl",
      selector: "sipas_surat_agenda_prop form [name=surat_prioritas_tgl]",
    },
    {
      ref: "txtRetensi",
      selector:
        "sipas_surat_agenda_prop sipas_retensi_pane [name=surat_retensi_tgl]",
    },
    {
      ref: "txtInaktif",
      selector:
        "sipas_surat_agenda_prop sipas_retensi_pane [name=surat_inaktif_tgl]",
    },
    {
      ref: "txtPengirim",
      selector: "sipas_surat_agenda_prop sipas_retensi_pane #textPengirim",
    },
    {
      ref: "txtKetNomor",
      selector: "sipas_surat_agenda_prop form #txtKetNomor",
    },
    {
      ref: "btnNomor",
      selector: "sipas_surat_agenda_prop form #btnNomorSurat",
    },
    {
      ref: "btnSalinNomor",
      selector: "sipas_surat_agenda_prop form #btnSalinNomor",
    },
    {
      ref: "cmpUseSla",
      selector: "sipas_surat_agenda_prop [name=surat_usesla]",
    },
    {
      ref: "containerInformasi",
      selector: "sipas_surat_agenda_prop > form sipas_surat_informasi_pane",
    },
    {
      ref: "textRetensi",
      selector: "sipas_surat_agenda_prop > form sipas_retensi_pane #txtRetensi",
    },
    {
      ref: "cmpRetensi",
      selector:
        "sipas_surat_agenda_prop > form sipas_retensi_pane [name=surat_useretensi]",
    },
    {
      ref: "comboRetensi",
      selector:
        "sipas_surat_agenda_prop > form sipas_retensi_pane #comboRetensi",
    },
    {
      ref: "textPrioritas",
      selector: "sipas_surat_agenda_prop > form #txtPrioritas",
    },
    {
      ref: "txtNomorPengajuan",
      selector: "sipas_surat_agenda_prop > form #txtNomorPengajuan",
    },
    {
      ref: "cmpNomorLama",
      selector: "sipas_surat_agenda_prop > form #nomorLama",
    },
    {
      ref: "btnAddPenyetuju",
      selector:
        "sipas_surat_agenda_prop sipas_surat_penyetuju_list #tambahPenyetuju",
    },
    {
      ref: "columnDeletePenyetuju",
      selector:
        "sipas_surat_agenda_prop sipas_surat_penyetuju_list #columnDelete",
    },
    {
      ref: "columnMoveUpPenyetuju",
      selector:
        "sipas_surat_agenda_prop sipas_surat_penyetuju_list #columnMoveUp",
    },
    {
      ref: "columnMoveDownPenyetuju",
      selector:
        "sipas_surat_agenda_prop sipas_surat_penyetuju_list #columnMoveDown",
    },
    {
      ref: "btnAddPetikan",
      selector:
        "sipas_surat_agenda_prop sipas_surat_petikan_list #tambahPetikan",
    },
    {
      ref: "columnDeletePetikan",
      selector:
        "sipas_surat_agenda_prop sipas_surat_petikan_list #columnDelete",
    },
    {
      ref: "columnMoveUpPetikan",
      selector:
        "sipas_surat_agenda_prop sipas_surat_petikan_list #columnMoveUp",
    },
    {
      ref: "columnMoveDownPetikan",
      selector:
        "sipas_surat_agenda_prop sipas_surat_petikan_list #columnMoveDown",
    },
    {
      ref: "textKores",
      selector: "sipas_surat_agenda_prop > form [name=korespondensi_info]",
    },
    {
      ref: "btnHirarkiKelas",
      selector: "sipas_surat_agenda_prop > form #btnHirarkiKelas",
    },
    {
      ref: "txtReuploadWarning",
      selector: "sipas_surat_agenda_prop sipas_arsip_pane #reuploadWarning",
    },
    {
      ref: "btnListPenerimask",
      selector: "sipas_surat_agenda_prop #buttonListPenerimask",
    },
    {
      ref: "jenisSub",
      selector: "sipas_surat_agenda_prop combobox[name=surat_jenis_sub]",
    },
    {
      ref: "btnSaveDraft",
      selector: "sipas_surat_agenda_prop sipas_com_button_save",
    },
    {
      ref: "panePenerimaKeluar",
      selector: "sipas_surat_agenda_prop #panePenerimaKeluar",
    },
    {
      ref: "btnDistribusiSuratKeluar",
      selector: "sipas_com_button_disposisi #btnDistribusiSuratKeluar",
    },
  ],

  controllerSurat: "Sipas.surat.Prop",
  controllerInformasi: "Sipas.surat.informasi.Pane",
  controllerPenerima: "Sipas.surat.penerima.List",
  controllerPenyetuju: "Sipas.surat.penyetuju.List",
  controllerPropPenyetuju: "Sipas.surat.penyetuju.Prop",
  controllerPopupPenerima: "Sipas.surat.penyetuju.Popup",
  controllerLookupPenerima: "Sipas.staf.penerima.Lookup",
  controllerPopupEkspedisiKeluar: "Sipas.surat.ekspedisi.keluar.Popup",
  controllerLog: "Sipas.surat.agenda.log.Popup",
  // controllerPropRiwayat               : 'Sipas.koreksi.session.riwayat.List',
  controllerPropRiwayat: "Sipas.surat.penyetuju.riwayat.Popup",
  controllerSuratKeluar: "Sipas.keluar.agenda.Prop",
  controllerEkspedisi: "Sipas.surat.ekspedisi.Popup",
  controllerKorespondesi: "Sipas.korespondensi.eksternal.Popup",
  controllerKorespondesiInternal: "Sipas.korespondensi.internal.Popup",
  controllerNomor: "Sipas.surat.agenda.nomor.Popup",
  controllerAktifasi: "Sipas.surat.agenda.aktif.Popup",
  controllerSalinNomor: "Sipas.surat.agenda.nomor.salin.Lookup",
  controllerPopupBerkasFisik: "Sipas.surat.berkasfisik.Popup",

  controllerLookupSuratKeluar: "Sipas.keluar.agenda.Lookup",
  controllerLookupSuratMasuk: "Sipas.masuk.agenda.Lookup",
  controllerLookupSuratIMasuk: "Sipas.internal.masuk.agenda.Lookup",

  controllerLookupAturLokasi: "Sipas.lokasi.atur.Popup",
  controllerLookupHirarki: "Sipas.kelas.hirarki.Lookup",

  controllerAturKorespondensi: "Sipas.surat.agenda.korespondensi.atur.Popup",

  storePenerima: "Sipas.surat.penerima.List",
  storePenerimakeluar: "Sipas.surat.penerimakeluar.List",
  // storePenerimask: "Sipas.surat.penerima.keputusan.List",
  storePenyetuju: "Sipas.surat.penyetuju.List",
  storeContact: "Sipas.surat.kontak.Combo",

  viewViewer: "Sipas.Viewer",

  defaultWindowReport: {
    height: 640,
    width: 800,
    maximizable: true,
    modal: true,
  },

  defaultWindowReportResi: {
    height: 640,
    width: 770,
    maximizable: true,
    modal: true,
  },

  init: function (application) {
    this.control({
      sipas_surat_agenda_prop: {
        show: this.onMainview_Show,
        loadagenda: this.onMainview_LoadAgenda,
        loadregister: this.onMainview_LoadRegister,
        loadnomor: this.onMainview_LoadNomor,
        loadtitle: this.onMainview_LoadTitle,
        // beforeclose: this.onMainview_BeforeClose,
        close: this.onMainview_Close,
      },
      "sipas_surat_agenda_prop sipas_surat_penerima_list sipas_com_button_add":
        {
          click: this.onButtonAdd_Click,
        },
      "sipas_surat_agenda_prop combobox[name=surat_pengirim]": {
        loadassociate: this.onComboDari_LoadAssociate,
        focus: this.onComboParent_Focus,
      },
      "sipas_surat_agenda_prop combobox[name=surat_unit_source]": {
        loadassociate: this.onComboUnitPengirim_LoadAssociate,
        focus: this.onComboParent_Focus,
      },
      "sipas_surat_agenda_prop combobox[name=surat_tujuan]": {
        loadassociate: this.onComboKepada_LoadAssociate,
        focus: this.onComboParent_Focus,
      },
      "sipas_surat_agenda_prop datefield[name=surat_tanggal]": {
        loadassociate: this.onDateField_LoadAssociate,
      },
      "sipas_surat_agenda_prop combobox[name=surat_unit]": {
        loadassociate: this.onComboUnit_LoadAssociate,
        focus: this.onComboParent_Focus,
      },
      "sipas_surat_agenda_prop combobox[name=surat_jenis]": {
        loadassociate: this.onComboJenis_LoadAssociate,
        focus: this.onComboParent_Focus,
        select: this.onComboJenis_Select,
      },
      "sipas_surat_agenda_prop combobox[name=surat_kelas]": {
        loadassociate: this.onComboKelas_LoadAssociate,
        focus: this.onComboParent_Focus,
        select: this.onComboKelas_Select,
      },
      "sipas_surat_agenda_prop combobox[name=surat_sifat]": {
        loadassociate: this.onComboSifat_LoadAssociate,
        focus: this.onComboParent_Focus,
        select: this.onComboSifat_Select,
      },
      "sipas_surat_agenda_prop combobox[name=surat_prioritas]": {
        loadassociate: this.onComboPrioritas_LoadAssociate,
        select: this.onComboPrioritas_Select,
        focus: this.onComboParent_Focus,
      },
      "sipas_surat_agenda_prop combobox[name=surat_media]": {
        loadassociate: this.onComboMedia_LoadAssociate,
        focus: this.onComboParent_Focus,
      },
      "sipas_surat_agenda_prop combobox[name=surat_lokasi]": {
        loadassociate: this.onComboLokasi_LoadAssociate,
        focus: this.onComboParent_Focus,
      },
      "sipas_surat_agenda_prop sipas_retensi_pane checkbox": {
        change: this.onCheckboxRetensi_Change,
      },
      "sipas_surat_agenda_prop form sipas_retensi_pane": {
        loadassociate: this.onRetensiPane_LoadAssociate,
      },
      "sipas_surat_agenda_prop form sipas_retensi_pane [name=surat_retensi_tgl]":
        {
          change: this.onRetensi_Change,
        },
      "sipas_surat_agenda_prop form sipas_retensi_pane #comboRetensi": {
        select: this.onRetensiPane_Select,
      },
      "sipas_surat_agenda_prop form #txtPrioritas": {
        loadassociate: this.onPrioritasText_LoadAssociate,
      },
      "sipas_surat_agenda_prop form button#btnNomorSurat": {
        click: this.onButtonNomorSurat_Click,
      },
      "sipas_surat_agenda_prop button#btnAktifasi": {
        click: this.onButtonAktifasiSurat_Click,
      },
      "sipas_surat_agenda_prop form button#printApproval": {
        click: this.onButtonPrintApproval_Click,
      },
      "sipas_surat_agenda_prop form sipas_com_button_gear[bootstrap]": {
        click: this.onButtonAtributGear_Click,
      },
      "sipas_surat_agenda_prop #buttonLog": {
        click: this.onButtonViewLog_Click,
      },
      "sipas_surat_agenda_prop #buttonAturLokasi": {
        click: this.onButtonAturLokasi_Click,
      },
      "sipas_surat_agenda_prop #buttonAturKorespondensi": {
        click: this.onButtonAturKorespondensi_Click,
      },
      "sipas_surat_agenda_prop #btnHirarkiKelas": {
        click: this.onBtnHirarkiKelas_Click,
      },
      "sipas_surat_agenda_prop #buttonBerkasFisik": {
        click: this.onButtonBerkasFisik_Click,
      },
      "sipas_surat_agenda_prop #radio_jenis_pengiriman": {
        change: this.onRadioJenisPengiriman_Change,
      },
    });
  },

  launch: function (config) {
    config = Ext.applyIf(config, {
      mode: "view",
      akses: null,
      unit: null,
      record: null,
      status_kor: null,
      backdate: null,
      via_session: false,
      callback: Ext.emptyFn,
      is_ekspedisi_eks: false,
      notif_mode: null,
      scope: this,
    });

    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      booking_nomor = $app.LocalSetting().get("use_booking_nomor"),
      reupload = $app.LocalSetting().get("use_reupload_berkas"),
      reupload_jumlah = $app.LocalSetting().get("reupload_berkas_jumlah"),
      reupload_masuk = $app.LocalSetting().get("use_reupload_berkas_masuk"),
      reupload_masuk_jumlah = $app
        .LocalSetting()
        .get("reupload_berkas_surat_masuk_jumlah"),
      $feature = $this.getController("Sipas.sistem.featureable.Feature"),
      record = $this.createRecord(config.record),
      imasuk_lokasi = $feature.getFeatureAccess("agenda_masuk_internal_lokasi"),
      ikeluar_lokasi = $feature.getFeatureAccess(
        "agenda_keluar_internal_lokasi"
      ),
      ikeputusan_lokasi = $feature.getFeatureAccess(
        "agenda_keputusan_internal_lokasi"
      ),
      imasuk_atur_lokasi = $feature.getFeatureAccess(
        "agenda_masuk_internal_atur_lokasi"
      ),
      ikeluar_atur_lokasi = $feature.getFeatureAccess(
        "agenda_keluar_internal_atur_lokasi"
      ),
      ikeputusan_atur_lokasi = $feature.getFeatureAccess(
        "agenda_keputusan_internal_atur_lokasi"
      ),
      penyetuju = $feature.getFeatureAccess("agenda_keluar_penyetuju_list"),
      tembusan = $feature.getFeatureAccess("agenda_keluar_tembusan_list"),
      feature_request_berkas = $feature.getFeatureAccess(
        "disposisi_masuk_request_berkas"
      ),
      prioritas = $session.getRuleAccess("surat_internal_masuk_insert"),
      role_masuk_reupload = $session.getRuleAccess("masuk_reupload"),
      role_imasuk_reupload = $session.getRuleAccess("imasuk_reupload"),
      role_keluar_reupload = $session.getRuleAccess("keluar_reupload"),
      role_ikeluar_reupload = $session.getRuleAccess("ikeluar_reupload"),
      role_ikeputusan_reupload = $session.getRuleAccess("ikeputusan_reupload"),
      masuk_retensi = $session.getRuleAccess("masuk_aktifasi"),
      imasuk_retensi = $session.getRuleAccess("surat_internal_masuk_aktifasi"),
      role_keluar_ubah_revisi = $session.getRuleAccess("keluar_revisi_update"),
      role_keluar_pilih = $session.getRuleAccess("keluar_pilih_nomor"),
      role_ikeluar_ubah_revisi = $session.getRuleAccess(
        "surat_internal_keluar_revisi_update"
      ),
      role_ikeputusan_ubah_revisi = $session.getRuleAccess(
        "surat_internal_keputusan_revisi_update"
      ),
      role_ikeluar_pilih = $session.getRuleAccess("ikeluar_pilih_nomor"),
      role_ikeputusan_pilih = $session.getRuleAccess("ikeputusan_pilih_nomor"),
      role_bank_ubah_revisi = $session.getRuleAccess("bank_revisi_update"),
      role_keluar_batal_nomor = $session.getRuleAccess("keluar_batal_nomor"),
      role_ikeluar_batal_nomor = $session.getRuleAccess("ikeluar_batal_nomor"),
      role_ikeputusan_batal_nomor = $session.getRuleAccess(
        "ikeputusan_batal_nomor"
      ),
      role_bank_batal_nomor = $session.getRuleAccess("bank_batal_nomor"),
      bank_batal_dis = $session.getRuleAccess("bank_batal_distribusi"),
      role_masuk_ekspedisi = $session.getRuleAccess("masuk_ekspedisi"),
      role_imasuk_ekspedisi = $session.getRuleAccess(
        "surat_internal_masuk_ekspedisi"
      ),
      role_keluar_ekspedisi_lacak = $session.getRuleAccess(
        "keluar_ekspedisi_masuk"
      ),
      is_selesai = record.get("surat_isselesai"),
      useretensi = record.get("surat_useretensi"),
      retensi = new Date(
        Ext.Date.format(record.get("surat_retensi_tgl"), "Y-m-d")
      ),
      inaktif = new Date(
        Ext.Date.format(record.get("surat_inaktif_tgl"), "Y-m-d")
      ),
      tgl_surat = new Date(
        Ext.Date.format(record.get("surat_tanggal"), "Y-m-d")
      ),
      now = new Date(Ext.Date.format(new Date(), "Y-m-d")),
      view = null;

    // retensi.setHours(0,0,0,0);
    // now.setHours(0,0,0,0);
    config.record = record;
    config.backdate = config.record.get("jenis_batasibackdate");
    config.penerima = config.record.get("jenis_batasipenerima");
    switch (config.mode) {
      case "add": //for agenda
      case "edit": //for agenda
      case "view": //for agenda
      case "ubah": //for koreksi
      case "reply": //for balas surat
      case "koreksi":
      case "lihat": //for session
      case "bank":
      case "notif": //for notif agenda
        view = this.createView(
          (function (c) {
            c.removeComponents = [
              "#buttonSelesai",
              "#columnAlwaysTtd",
              "#columnStafTtd",
            ];
            c.disableComponents = [];
            c.readonlyComponents = [];
            c.hideComponent = ["#reuploadWarning"];

            c.requireComponents = [
              "[name=surat_unit_source]",
              "[name=surat_pengirim]",
              "[name=surat_tujuan]",
              "[name=surat_perihal]",
              "[name=surat_jenis]",
              "[name=surat_kelas]",
            ];

            if (
              c.mode === "add" ||
              c.mode === "edit" ||
              c.mode === "bank" ||
              c.mode === "ubah" ||
              c.mode === "lihat" ||
              c.mode === "reply" ||
              c.mode === "notif"
            ) {
              c.removeComponents.push(
                "#buttonEditLokasi",
                "#buttonAturLokasi",
                "#buttonAturKorespondensi"
              );
            }

            if (
              c.mode === "add" ||
              c.mode === "edit" ||
              c.mode === "ubah" ||
              c.mode === "reply" ||
              c.mode === "koreksi"
            ) {
              $helper.hideComponent({
                parent: view,
                items: {
                  "#txtRetensi": true,
                  "#containerRetensi": false,
                  "#containerInaktif": false,
                },
              });
            }

            if (feature_request_berkas) {
              c.removeComponents.push("#cbBerkasList");
            }
            if (!c.record.get("surat_useberkas")) {
              c.removeComponents.push("sipas_surat_informasi_berkas_pane");
            }
            if (
              c.record.get("surat_model") != 4 &&
              (c.mode === "view" ||
                c.mode === "lihat" ||
                (c.mode === "notif" && c.notif_mode === "berkas"))
            ) {
              if (!c.record.get("surat_useberkas")) {
                c.removeComponents.push("#useBerkas");
              }
            }
            if (c.mode !== "view") {
              if (c.mode !== "notif" && c.notif_mode !== "berkas") {
                c.removeComponents.push("#buttonBerkasFisik");
              }
            }

            if (c.record && c.record.get("surat_model_sub") != 2) {
              c.removeComponents.push("#btndaftarPetikan");
            }

            switch (c.model) {
              case 1 /*surat masuk*/:
                c.removeComponents.push(
                  "#radio_jenis_pengiriman",
                  "#infoBatalNomor",
                  "#txtNomorPengajuan",
                  "#btndaftarTembusan",
                  "#kirimTembusan",
                  "#ekspedisiKeluar",
                  "#tanggalBerlaku",
                  "#indukUnit",
                  "#ubah",
                  "#infoRating",
                  "#infoTerima",
                  "[name=surat_usesla]",
                  "#useSLA",
                  "[name=korespondensi_unitpengirim]",
                  /*'[name=korespondensi_info_internal]',*/ "[name=korespondensi_unitpenerima]",
                  "#comboTujuan",
                  "#containerPenyetuju",
                  "#textJumlah",
                  "#textPengirim",
                  "#namaArsip",
                  "sipas_com_button_process",
                  "#btnNomorSurat",
                  "#txtKetNomor",
                  "#suratKepada",
                  "#btndaftarPenerima",
                  "#buttonResend",
                  "#btnSalinNomor",
                  "#batalNomor",
                  "#nomorLama",
                  "#containerRightKolektif",
                  "#buttonResendKeputusan",
                  "#containerJenisSub",
                  "#tanggalTmt",
                  "#tanggalTmt"
                );
                if (is_selesai === 1) {
                  c.removeComponents.push("sipas_com_button_disposisi");
                }

                if (c.record.get("surat_ismusnah") == 1) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else {
                  c.removeComponents.push("#infoMusnahSurat");
                }

                if (c.record.get("surat_isarsip") == 1) {
                  c.removeComponents.push("#buttonArsip", "#buttonMusnah");
                } else {
                  c.removeComponents.push("#infoArsipSurat");
                }

                if (c.record && c.record.get("surat_distribusi_tgl") !== null) {
                  c.removeComponents.push(
                    "sipas_com_button_save",
                    "sipas_com_button_savesend",
                    "#perubahan",
                    "#buttonDelete",
                    "#printArsip"
                  );
                  // c.disableComponents.push('sipas_com_button_delete');
                }
                if (!role_masuk_ekspedisi) {
                  c.removeComponents.push("sipas_com_button_expedition");
                }
                if (!masuk_retensi) {
                  c.removeComponents.push("#btnAktifasi");
                }
                if (!useretensi) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else if (useretensi) {
                  if (now > retensi) {
                    c.removeComponents.push(
                      "sipas_com_button_disposisi",
                      "sipas_com_button_putin",
                      "sipas_com_button_edit",
                      "sipas_com_button_delete",
                      "#btnNomorSurat",
                      "#btnSalinNomor"
                    );
                    if (c.mode != "bank") {
                      c.removeComponents.push("sipas_com_button_delete");
                    }
                    if (now <= inaktif) {
                      c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                    }
                  } else if (now <= retensi) {
                    c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                  }
                }

                if (c.record && c.record.get("surat_setuju_staf") === null) {
                  c.removeComponents.push(
                    "#buttonAturLokasi",
                    "#buttonAturKorespondensi"
                  );
                }

                switch (c.mode) {
                  case "add":
                  case "edit":
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonLog",
                      "sipas_surat_penyetuju_list",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_print",
                      "sipas_com_button_expedition",
                      "#toolbarControlMasuk sipas_com_button_putin",
                      "#perubahan",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_disposisi",
                      "sipas_surat_informasi_pane"
                    );
                    break;

                  case "view":
                    c.removeComponents.push(
                      "[action=link]",
                      "[action=sdoc]",
                      "sipas_surat_penyetuju_list",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#btnHirarkiKelas",
                      "sipas_com_button_add",
                      "#containerRight",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#buttonDeletePermanen",
                      "sipas_com_button_gear"
                    );

                    if (c.record && c.record.get("surat_isdistribusi") === 0) {
                      c.removeComponents.push(
                        "sipas_com_button_disposisi",
                        "sipas_com_button_putin"
                      );
                    }
                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") == "0"
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }

                    if (
                      (c.record && c.record.get("surat_isdistribusi") !== 1) ||
                      reupload_masuk != 1 ||
                      !role_masuk_reupload
                    ) {
                      c.removeComponents.push(
                        "#reuploadWarning",
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }

                    if (c.record.get("surat_isdistribusi") != 1) {
                      c.removeComponents.push("#buttonBerkasFisik");
                    }
                    break;

                  case "lihat":
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "#btnHirarkiKelas",
                      "#buttonAdd",
                      "#btnAktifasi",
                      "#buttonLog",
                      "sipas_surat_penyetuju_list",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_print",
                      "#toolbarControlMasuk",
                      "#perubahan",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_print",
                      "#containerRight",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_com_button_gear",
                      "#columnDelete",
                      "sipas_com_button_add",
                      "#containerAtribut",
                      "sipas_com_button_refresh",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit"
                    );
                    c.readonlyComponents.push(
                      "#suratKeterangan",
                      "#containerDetail > textfield",
                      "#containerNomor",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_jenis]",
                      "[name=surat_kelas]",
                      "sipas_retensi_pane",
                      "[name=surat_lampiran]",
                      "[name=surat_lampiran_sub]",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "[name=surat_israhasia]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_lokasi]",
                      "[name=surat_retensi_tgl]",
                      "#comboRetensi",
                      "[name=surat_sifat]",
                      "[name=surat_prioritas]",
                      "[name=surat_media]",
                      "#subagenda"
                    );
                    c.disableComponents.push("[name=surat_useretensi]");

                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") === "0"
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }
                    break;

                  case "bank":
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "#buttonAdd",
                      "#buttonDelete",
                      "sipas_com_button_putin",
                      "#btnAktifasi",
                      "sipas_surat_penyetuju_list",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "#perubahan",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_print",
                      "#containerRight",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_com_button_gear",
                      "#columnDelete",
                      "sipas_com_button_add",
                      "#containerAtribut",
                      "sipas_com_button_refresh",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit",
                      "#btnHirarkiKelas"
                    );
                    c.readonlyComponents.push(
                      "#useBerkas",
                      "#suratKeterangan",
                      "#containerDetail > textfield",
                      "#containerNomor",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_jenis]",
                      "[name=surat_kelas]",
                      "sipas_retensi_pane",
                      "[name=surat_lampiran]",
                      "[name=surat_lampiran_sub]",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "[name=surat_israhasia]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_lokasi]",
                      "[name=surat_retensi_tgl]",
                      "#comboRetensi",
                      "[name=surat_sifat]",
                      "[name=surat_prioritas]",
                      "[name=surat_media]",
                      "#subagenda"
                    );
                    c.disableComponents.push("[name=surat_useretensi]");

                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") === "0"
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }
                    if (c.record.get("surat_properti_ishapus") == 1) {
                      c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                    }
                    if (!bank_batal_dis) {
                      c.removeComponents.push("#btnCabutDistribusi");
                    }
                    break;

                  case "notif":
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "sipas_com_button_putin",
                      /*'sipas_com_button_expedition',*/ "#berkasSeparator",
                      "#buttonHistory",
                      "sipas_com_button_edit",
                      "#resi",
                      "#buttonLog",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_correspondent",
                      "#buttonAturLokasi",
                      "sipas_surat_penyetuju_list",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "sipas_com_button_delete",
                      "#buttonAdd",
                      "sipas_com_button_add",
                      "#containerRight",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_arsip_pane #buttonHapus",
                      "#buttonDeletePermanen",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_gear",
                      "#btnHirarkiKelas"
                    );

                    c.readonlyComponents.push(
                      "#useBerkas",
                      "#suratKeterangan",
                      "#containerDetail > textfield",
                      "#containerNomor",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_jenis]",
                      "[name=surat_kelas]",
                      "[name=surat_useretensi]",
                      "[name=surat_lampiran]",
                      "[name=surat_lampiran_sub]",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "[name=surat_israhasia]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_lokasi]",
                      "[name=surat_retensi_tgl]",
                      "#comboRetensi",
                      "[name=surat_sifat]",
                      "[name=surat_prioritas]",
                      "[name=surat_media]",
                      "#subagenda"
                    );

                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") == "0"
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }
                    switch (c.notif_mode) {
                      case "belum_distribusi":
                        c.removeComponents.push("#btnAktifasi");
                        if (
                          c.record &&
                          c.record.get("surat_isdistribusi") === 0
                        ) {
                          c.removeComponents.push(
                            "sipas_com_button_disposisi",
                            "sipas_com_button_putin"
                          );
                        }
                        break;
                      case "berkas":
                        c.removeComponents.push("#btnAktifasi");
                        break;
                      case "retensi7":
                      case "retensi3":
                      case "retensi1":
                        break;
                    }
                    break;
                }
                break;

              case 2 /*surat keluar*/:
                c.removeComponents.push(
                  "#cbTembusanList",
                  "#indukUnit",
                  "#infoRating",
                  "#infoTerima",
                  "#textJumlah",
                  "[name=korespondensi_unitpengirim]",
                  /*'[name=korespondensi_info_internal]',*/ "[name=korespondensi_unitpenerima]",
                  "[name=surat_usebalas]",
                  "#useBalas",
                  "[name=surat_usesla]",
                  "#useSLA",
                  "#toolbarControl sipas_com_button_putin",
                  "#containerRight",
                  "#containerJenisSub",
                  "#tanggalTmt",
                  "#panePetikan",
                  "#comboPengirim",
                  "#textTujuan",
                  "#namaArsip",
                  "sipas_com_button_process",
                  "#buttonResend",
                  "#useBerkas",
                  "#infoBerkasFisik",
                  "#buttonResendKeputusan",
                  "#simpanSetujui"
                );
                c.readonlyComponents.push("[name=surat_nomor]");
                c.requireComponents.push("[name=surat_sifat]");

                if (!role_keluar_pilih || c.record.get("surat_nomor_urut")) {
                  c.removeComponents.push("#btnSalinNomor");
                }
                if (c.record.get("surat_ismusnah") == 1) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else {
                  c.removeComponents.push("#infoMusnahSurat");
                }

                if (!role_keluar_ekspedisi_lacak) {
                  c.removeComponents.push("sipas_com_button_expedition");
                }

                if (c.record.get("surat_isarsip") == 1) {
                  c.removeComponents.push("#buttonArsip", "#buttonMusnah");
                } else {
                  c.removeComponents.push("#infoArsipSurat");
                }

                if (c.record.get("surat_nomor_isbatal") != 1) {
                  c.removeComponents.push("#infoBatalNomor");
                } else {
                  c.removeComponents.push(
                    "#batalNomor",
                    "#kirimTembusan",
                    "#buttonDelete",
                    "#perubahan"
                  );
                }

                if (c.mode != "bank") {
                  if (c.record && c.record.get("surat_setuju") !== 0) {
                    if (c.record && c.record.get("surat_setuju") === 4) {
                      c.removeComponents.push(
                        "#buttonDelete",
                        "#buttonDeletePermanen",
                        "#simpanSetujui",
                        "#printApproval"
                      );
                    } else {
                      c.removeComponents.push(
                        "sipas_com_button_savesend",
                        "#perubahan",
                        "#buttonDelete",
                        "#buttonDeletePermanen",
                        "#simpanSetujui"
                      );
                    }
                    if (record && record.get("surat_setuju") === 3) {
                      c.removeComponents.push("#printApproval");
                    }
                  }
                  c.removeComponents.push("#perubahanBank");
                }

                if (!useretensi) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else if (useretensi) {
                  if (now > retensi) {
                    c.removeComponents.push(
                      "#kirimTembusan",
                      "sipas_com_button_edit",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "#batalNomor"
                    );
                    if (c.mode != "bank") {
                      c.removeComponents.push("sipas_com_button_delete");
                    }
                    if (now <= inaktif) {
                      c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                    }
                  } else if (now <= retensi) {
                    c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                  }
                }

                if (c.record && c.record.get("surat_setuju") !== 2) {
                  c.removeComponents.push(
                    "#buttonAturLokasi",
                    "#buttonAturKorespondensi"
                  );
                }
                if (
                  !c.record.get("jenis_nomor_awal") &&
                  c.record.get("surat_setuju") !== 2 &&
                  c.record.get("surat_nomor") &&
                  c.mode != "reply"
                ) {
                  c.removeComponents.push("#containerNomor");
                }

                switch (c.mode) {
                  case "add":
                  case "edit":
                  case "reply":
                    if (
                      c.record.get("surat_nomor") &&
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3)
                    ) {
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]",
                        "[name=surat_tanggal]"
                      );
                      c.removeComponents.push("#btnHirarkiKelas", "#nomorLama");
                    } else if (
                      (c.record.get("surat_nomor") &&
                        c.record.get("surat_setuju") == 4) ||
                      (c.record.get("surat_setuju") == 0 &&
                        c.record.get("surat_nomor_urut"))
                    ) {
                      if (
                        c.record.get("surat_setuju") == 0 &&
                        !c.record.get("surat_nomor")
                      ) {
                        c.removeComponents.push("#nomorLama");
                      }
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_tanggal]",
                        "#penyetujuUrut"
                      );
                      c.removeComponents.push("#btnHirarkiKelas");
                    } else {
                      c.removeComponents.push("#nomorLama");
                    }

                    if (c.record.get("surat_setuju") == 4) {
                      c.readonlyComponents.push("[name=surat_jenis]");
                    }
                    if (!c.record.get("jenis_nomor_awal")) {
                      c.hideComponent.push(
                        "#btnNomorSurat",
                        "#txtKetNomor",
                        "#btnSalinNomor"
                      );
                    }
                    c.removeComponents.push(
                      "#kirimTembusan",
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonLog",
                      "#columnStatus",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_print",
                      "sipas_com_button_expedition",
                      "#toolbarControl sipas_com_button_putin",
                      "#perubahan",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_correspondent",
                      "#ubah",
                      "sipas_surat_informasi_pane",
                      "#batalNomor"
                    );

                    if (!penyetuju) {
                      c.removeComponents.push("sipas_surat_penyetuju_list");
                      c.width = 600;
                    }
                    if (!tembusan) {
                      c.removeComponents.push("sipas_surat_penerima_list");
                    }

                    if (
                      c.record.get("surat_setuju") == 4 &&
                      !role_keluar_ubah_revisi &&
                      c.akses !== "view_bank"
                    ) {
                      c.readonlyComponents.push("[name=surat_kelas]");
                      c.removeComponents.push(
                        "#btnHirarkiKelas",
                        "#tambahPenyetuju",
                        "sipas_surat_penyetuju_list #columnDelete",
                        "sipas_surat_penyetuju_list #columnMoveDown",
                        "sipas_surat_penyetuju_list #columnMoveUp"
                      );
                    }
                    if (
                      (c.record.get("surat_setuju") == 0 ||
                        c.record.get("surat_setuju") == 4) &&
                      !role_bank_ubah_revisi &&
                      c.akses == "view_bank"
                    ) {
                      c.readonlyComponents.push("[name=surat_kelas]");
                      c.removeComponents.push(
                        "#btnHirarkiKelas",
                        "#tambahPenyetuju",
                        "sipas_surat_penyetuju_list #columnDelete",
                        "sipas_surat_penyetuju_list #columnMoveDown",
                        "sipas_surat_penyetuju_list #columnMoveUp"
                      );
                    }

                    break;

                  case "view":
                    c.removeComponents.push(
                      "[action=link]",
                      "[action=sdoc]",
                      "#buttonDeletePermanen",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#nomorLama",
                      "#ubah",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_com_button_add",
                      "#containerRight",
                      "#containerRightKolektif",
                      "#simpanSetujui",
                      "sipas_com_button_gear",
                      "#btnHirarkiKelas"
                    );
                    // if(c.record && c.record.get('surat_setuju') !== 2){
                    //     c.removeComponents.push('#nomorSurat');
                    // }
                    if (
                      (c.record.get("surat_setuju") == 0 ||
                        c.record.get("surat_setuju") != 4 ||
                        c.record.get("surat_setuju") == 4) &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    } else if (
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3) &&
                      c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (
                      c.record.get("surat_setuju") == 0 ||
                      c.record.get("surat_setuju") == 4
                    ) {
                      c.removeComponents.push(
                        "#btnNomorSurat",
                        "#btnSalinNomor"
                      );
                    }

                    if (c.record.get("surat_isdistribusi") != 1) {
                      c.removeComponents.push(
                        "#buttonBerkasFisik",
                        "#kirimTembusan"
                      );
                    } else {
                      c.removeComponents.push(
                        "sipas_com_button_disposisi #btnDistribusiSuratKeluar"
                      );
                    }
                    if (c.is_ekspedisi_eks) {
                      c.removeComponents.push(
                        "#buttonAturKorespondensi",
                        "#buttonAturLokasi",
                        "#kirimTembusan"
                      );
                    }
                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") == 0
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }
                    if (
                      c.record.get("surat_setuju") != 2 &&
                      c.record.get("surat_nomor")
                    ) {
                      /*untuk jika booking nomor aktif*/
                      c.removeComponents.push("#kirimTembusan", "#buttonAdd");
                    }
                    if (
                      c.record.get("surat_setuju") != 2 &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push(
                        "#kirimTembusan",
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }
                    if (!c.record.get("jenis_nomor_awal")) {
                      c.hideComponent.push(
                        "#btnNomorSurat",
                        "#txtKetNomor",
                        "#btnSalinNomor",
                        "#batalNomor"
                      );
                    }
                    if (
                      (c.record && c.record.get("surat_setuju") !== 2) ||
                      reupload != 1 ||
                      !role_keluar_reupload
                    ) {
                      c.removeComponents.push(
                        "#reuploadWarning",
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }
                    if (!role_keluar_batal_nomor) {
                      c.removeComponents.push("#batalNomor");
                    }

                    break;

                  case "ubah":
                    c.removeComponents.push(
                      "#perubahan",
                      "#batalNomor",
                      "#buttonMusnah",
                      "#buttonArsip",
                      "sipas_com_button_correspondent",
                      "#kirimTembusan",
                      "#nomorLama",
                      "#btnHirarkiKelas"
                    );
                    if (!tembusan) {
                      c.removeComponents.push("sipas_surat_penerima_list");
                    }
                    if (c.record && record.get("surat_setuju_isurut")) {
                      c.removeComponents.push(
                        "#reuploadWarning",
                        "#btnAktifasi",
                        "#buttonDeletePermanen",
                        "#buttonLog",
                        "[name=itipe_nama]",
                        "[name=surat_unit]",
                        "#buttonDelete",
                        "#buttonDeletePermanen",
                        "sipas_com_button_savesend",
                        "sipas_com_button_save",
                        "#toolbarControl sipas_com_button_putin",
                        "#simpanSetujui",
                        "#ubah",
                        "sipas_surat_informasi_pane",
                        "#simpanSetujui"
                      );
                      c.readonlyComponents.push(
                        "#nomorSurat",
                        "[name=surat_pengirim]",
                        "[name=surat_tujuan]",
                        "[name=surat_israhasia]",
                        "[name=surat_agenda]",
                        "[name=surat_nomor]",
                        "[name=surat_tanggal]",
                        "[name=surat_usesla]",
                        "#useSLA"
                      );
                    } else {
                      c.removeComponents.push(
                        "#reuploadWarning ",
                        "#btnAktifasi",
                        "#buttonDeletePermanen",
                        "#buttonLog",
                        "[name=itipe_nama]",
                        "[name=surat_unit]",
                        "#buttonDelete",
                        "#buttonDeletePermanen",
                        "sipas_com_button_savesend",
                        "sipas_com_button_save",
                        "#tambahPenyetuju",
                        "#toolbarControl sipas_com_button_putin",
                        "#simpanSetujui",
                        "#ubah",
                        "sipas_surat_informasi_pane",
                        "#simpanSetujui"
                      );
                      c.readonlyComponents.push(
                        "#nomorSurat",
                        "[name=surat_pengirim]",
                        "[name=surat_tujuan]",
                        "[name=surat_israhasia]",
                        "[name=surat_agenda]",
                        "[name=surat_nomor]",
                        "[name=surat_tanggal]",
                        "[name=surat_usesla]",
                        "#useSLA"
                      );
                    }
                    if (c.record.get("surat_nomor")) {
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]",
                        "[name=surat_tanggal]",
                        "#btnHirarkiKelas"
                      );
                      c.removeComponents.push("#btnHirarkiKelas");
                    }
                    if (!c.record.get("jenis_nomor_awal")) {
                      c.hideComponent.push(
                        "#btnNomorSurat",
                        "#txtKetNomor",
                        "#btnSalinNomor"
                      );
                    }
                    c.readonlyComponents.push(
                      "#penyetujuUrut",
                      "[name=surat_retensi_tgl]"
                    );
                    c.disableComponents.push("[name=surat_useretensi]");
                    break;

                  case "koreksi":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#kirimTembusan",
                      "#reuploadWarning ",
                      "#btnAktifasi",
                      "#buttonDeletePermanen",
                      "#buttonLog",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#simpanSetujui",
                      "#toolbarControl sipas_com_button_putin",
                      "#simpanUbah",
                      "#containerRight",
                      "#nomorSurat",
                      "#simpanSetujui",
                      "#nomorLama"
                    );
                    c.readonlyComponents.push(
                      "#tanggalBerlaku",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_lampiran]",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]"
                    );
                    c.disableComponents.push("[name=surat_useretensi]");
                    break;

                  case "lihat":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#btnHirarkiKelas",
                      "#kirimTembusan",
                      "#reuploadWarning ",
                      "#btnAktifasi",
                      "#buttonDeletePermanen",
                      "[name=itipe_nama]",
                      "#buttonLog",
                      "[name=surat_unit]",
                      "#buttonDelete",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#perubahan",
                      "#simpanUbah",
                      "#containerRight",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "#nomorLama",
                      "sipas_com_button_print",
                      "#simpanSetujui",
                      "sipas_arsip_pane #buttonAdd",
                      "sipas_com_button_correspondent",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "[name=surat_unit_source]",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit",
                      "#simpanSetujui",
                      "sipas_com_button_gear",
                      "#containerRightKolektif"
                    );
                    c.readonlyComponents.push(
                      "#suratAlamat",
                      "#tanggalBerlaku",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_lampiran]",
                      "[name=surat_lampiran_sub]",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "#suratPerihal",
                      "#suratKepda",
                      "#subagenda",
                      "[name=surat_sifat]",
                      "[name=surat_lokasi_sub]",
                      "#suratKepada"
                    );
                    c.disableComponents.push("[name=surat_useretensi]");
                    if (
                      c.record &&
                      c.status_kor !==
                        c.record.self.statusPenyetujuan().PERSETUJUAN_INIT
                    ) {
                      c.removeComponents.push("#ubah");
                    }
                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") === "0"
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }
                    c.readonlyComponents.push("[name=surat_nomor]");
                    if (c.record && c.record.get("surat_setuju") != 0) {
                      c.removeComponents.push(
                        "sipas_com_button_save",
                        "sipas_com_button_savesend",
                        "#perubahan",
                        "sipas_com_button_delete"
                      );
                      // c.disableComponents.push('sipas_com_button_delete');
                    }
                    if (
                      (c.record && c.record.get("surat_setuju") == 2) ||
                      (c.record && c.record.get("surat_setuju") == 4)
                    ) {
                      c.removeComponents.push("#ubah");
                    }
                    break;

                  case "bank":
                    c.removeComponents.push(
                      "#kirimTembusan",
                      "#reuploadWarning ",
                      "#btnAktifasi",
                      "#buttonAdd",
                      "#buttonDelete",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#perubahan",
                      "#toolbarControl",
                      "#simpanUbah",
                      "#containerRight",
                      "#nomorLama",
                      "sipas_com_button_print",
                      "#simpanSetujui",
                      "sipas_arsip_pane #buttonAdd",
                      "sipas_com_button_correspondent",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit",
                      "#simpanSetujui",
                      "sipas_com_button_gear",
                      "#btnHirarkiKelas",
                      "#containerRightKolektif"
                    );
                    c.readonlyComponents.push(
                      "[name=surat_useretensi]",
                      "#suratAlamat",
                      "#tanggalBerlaku",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_lampiran]",
                      "[name=surat_lampiran_sub]",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "#suratPerihal",
                      "#suratKepada",
                      "#subagenda",
                      "[name=surat_sifat]",
                      "[name=surat_lokasi_sub]",
                      "#suratKepada"
                    );
                    if (
                      c.record &&
                      c.status_kor !==
                        c.record.self.statusPenyetujuan().PERSETUJUAN_INIT
                    ) {
                      c.removeComponents.push("#ubah");
                    }
                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") === "0"
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }
                    if (c.record.get("surat_properti_ishapus") == 1) {
                      c.removeComponents.push(
                        "#batalNomor",
                        "#buttonMusnah",
                        "#buttonArsip"
                      );
                    }
                    if (
                      c.record.get("surat_setuju") == 0 &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    } else if (
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3) &&
                      c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (!role_bank_batal_nomor) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (
                      !role_bank_ubah_revisi ||
                      !c.record.get("surat_nomor") ||
                      c.record.get("surat_setuju") != 0 ||
                      c.record.get("surat_setuju") != 4
                    ) {
                      c.removeComponents.push("#perubahanBank");
                    }

                    break;

                  case "notif":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#reuploadWarning",
                      "#buttonAturKorespondensi",
                      "#buttonAturLokasi",
                      "#kirimTembusan",
                      "[action=link]",
                      "[action=sdoc]",
                      "#buttonDeletePermanen",
                      "#btnAktifasi",
                      "#buttonAdd",
                      "#buttonLog",
                      "#btnMore",
                      "#berkasSeparator",
                      "#buttonHistory",
                      "#resi",
                      "#buttonLog",
                      "sipas_arsip_pane #buttonHapus",
                      "#daftarPenyetuju",
                      "[name=itipe_nama]",
                      "[name=surat_unit]",
                      "sipas_com_button_saveedit",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "sipas_com_button_correspondent",
                      "#ubah",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_com_button_add",
                      "#nomorLama",
                      "#containerRight",
                      "#simpanSetujui",
                      "sipas_com_button_gear",
                      "#btnHirarkiKelas"
                    );

                    c.readonlyComponents.push(
                      "#useBerkas",
                      "#suratAlamat",
                      "#tanggalBerlaku",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_useretensi]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_lampiran]",
                      "[name=surat_lampiran_sub]",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "#suratPerihal",
                      "#suratKepda",
                      "#subagenda",
                      "[name=surat_sifat]",
                      "[name=surat_lokasi_sub]",
                      "#suratKepada"
                    );

                    // if(c.record && c.record.get('surat_setuju') !== 2){
                    //     c.removeComponents.push('#nomorSurat');
                    // }
                    if (
                      !c.record.get("surat_lampiran") ||
                      record.get("surat_lampiran") === "0"
                    ) {
                      c.removeComponents.push("#containerLampiran");
                    }

                    switch (c.notif_mode) {
                      case "berkas":
                        break;
                      case "belum_nomor":
                        break;

                      case "belum_kirim":
                        break;
                    }
                    break;
                }
                break;

              case 3 /*surat internal masuk*/:
                c.removeComponents.push(
                  "#infoBatalNomor",
                  "#txtNomorPengajuan",
                  "#btndaftarTembusan",
                  "#kirimTembusan",
                  "#ekspedisiKeluar",
                  "#tanggalBerlaku",
                  "#buttonAturKorespondensi",
                  "[name=surat_unit]",
                  "#textJumlah",
                  "[name=korespondensi_penerima]",
                  "#columnAlwaysTtd",
                  "#columnStafTtd",
                  "[name=korespondensi_pengirim]",
                  /*'[name=korespondensi_info]',*/ "[name=surat_pengirim]",
                  "[name=surat_unit]",
                  "[name=surat_tujuan]",
                  "#containerLampiran",
                  "#containerMedia",
                  "#batalNomor",
                  "#toolbarControl sipas_com_button_putin",
                  "sipas_com_button_print",
                  "sipas_com_button_saveedit",
                  "[name=surat_usebalas]",
                  "#useBalas",
                  "#namaArsip",
                  "#ubah",
                  "#containerPenyetuju",
                  "#suratKepada",
                  "#btndaftarPenerima",
                  "#buttonResend",
                  "#nomorLama",
                  "#containerRightKolektif",
                  "#buttonResendKeputusan"
                );

                if (c.record.get("surat_model_sub") != 2) {
                  c.removeComponents.push("#containerJenisSub", "#tanggalTmt");
                }

                if (!imasuk_lokasi) {
                  c.removeComponents.push("#containerLokasi");
                }

                if (!role_imasuk_ekspedisi) {
                  c.removeComponents.push("sipas_com_button_expedition");
                }

                if (!imasuk_retensi) {
                  c.removeComponents.push("#btnAktifasi");
                }

                if (!imasuk_atur_lokasi) {
                  c.removeComponents.push("#buttonAturLokasi");
                }

                if (
                  (c.record && c.record.get("surat_setuju") == "0") ||
                  (c.record && c.record.get("surat_setuju") == "1") ||
                  (c.record && c.record.get("surat_setuju") == "4")
                ) {
                  c.removeComponents.push("#buttonAturLokasi");
                }

                if (is_selesai === 1) {
                  c.removeComponents.push("sipas_com_button_disposisi");
                }

                if (c.record.get("surat_ismusnah") == 1) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else {
                  c.removeComponents.push("#infoMusnahSurat");
                }

                if (c.record.get("surat_isarsip") == 1) {
                  c.removeComponents.push("#buttonArsip", "#buttonMusnah");
                } else {
                  c.removeComponents.push("#infoArsipSurat");
                }

                if (!useretensi) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else if (useretensi) {
                  if (now > retensi) {
                    c.removeComponents.push(
                      "sipas_com_button_disposisi",
                      "sipas_com_button_process",
                      "#btnNomorSurat",
                      "#btnSalinNomor"
                    );
                    if (now <= inaktif) {
                      c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                    }
                  } else if (now <= retensi) {
                    c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                  }
                }

                switch (c.mode) {
                  case "add":
                  case "edit":
                    if (!prioritas) {
                      c.removeComponents.push("#containerPrioritas");
                    }
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonDeletePermanen",
                      "#perubahan",
                      "#buttonDelete",
                      "#txtKetNomor",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_surat_informasi_pane",
                      "#panePenyetuju",
                      "sipas_com_surat_korespondensi_pane",
                      "#buttonLog",
                      "#buttonAktifasi",
                      "sipas_com_button_process",
                      "sipas_com_button_disposisi"
                    );
                    break;

                  case "view":
                    c.removeComponents.push(
                      "[action=link]",
                      "[action=sdoc]",
                      "#buttonDeletePermanen",
                      "#buttonLihatRating",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#txtKetNomor",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "#containerRight",
                      "sipas_com_button_gear",
                      "sipas_com_button_save",
                      "sipas_com_button_savesend",
                      "#btnHirarkiKelas"
                    );
                    if (c.record && c.record.get("surat_setuju") === 0) {
                      c.removeComponents.push(
                        "#toolbarControlIMasuk",
                        "#infoRating"
                      );
                    }
                    if (
                      (c.record && c.record.get("surat_setuju") === 2) ||
                      (c.record && c.record.get("surat_isdistribusi") === 1)
                    ) {
                      c.removeComponents.push("#perubahan", "#buttonDelete");
                    }
                    if (
                      c.record &&
                      c.record.get("surat_setuju") === 1 &&
                      c.record &&
                      c.record.get("surat_isdistribusi") === 0
                    ) {
                      c.removeComponents.push(
                        "#infoRating",
                        "#buttonLog",
                        "sipas_com_button_process",
                        "sipas_com_button_disposisi",
                        "#reuploadWarning",
                        "#buttonAdd"
                      );
                    }
                    if (c.record && c.record.get("surat_setuju") === 4) {
                      c.removeComponents.push(
                        "#buttonDelete",
                        "#perubahan",
                        "sipas_com_button_process",
                        "sipas_com_button_disposisi"
                      );
                    }
                    if (
                      c.record.get("surat_setuju") !== 1 ||
                      (c.record.get("surat_setuju") != 1 &&
                        c.record.get("surat_isdistribusi") !== 1) ||
                      reupload_masuk != 1 ||
                      !role_masuk_reupload
                    ) {
                      c.removeComponents.push(
                        "#reuploadWarning",
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }

                    if (c.record.get("surat_isdistribusi") != 1) {
                      c.removeComponents.push("#buttonBerkasFisik");
                    }
                    break;

                  case "lihat":
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "#btnHirarkiKelas",
                      "#btnAktifasi",
                      "#buttonRating",
                      "#buttonLog",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#txtKetNomor",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "#containerRight",
                      "sipas_com_button_save",
                      "sipas_com_button_savesend",
                      "#buttonDeletePermanen",
                      "sipas_com_button_print",
                      "sipas_com_button_saveedit",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "#namaArsip",
                      "#ubah",
                      "#toolbarControlIMasuk",
                      "sipas_com_button_gear",
                      "sipas_arsip_pane #buttonAdd"
                    );
                    c.readonlyComponents.push(
                      "#media_kode",
                      "#lokasi_kode",
                      "#sublokasi",
                      "[name=surat_useretensi]",
                      "[name=surat_usesla]",
                      "[name=surat_nomor]",
                      "[name=surat_unit_source]",
                      "#suratKeterangan",
                      "#nomorSurat",
                      "#suratPerihal",
                      "[name=surat_israhasia]",
                      "#agenda",
                      "#subagenda",
                      "#tanggal",
                      "[name=surat_jenis]",
                      "[name=surat_kelas]",
                      "[name=surat_sifat]",
                      "[name=surat_prioritas]",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "#comboRetensi",
                      "[name=surat_retensi_tgl]",
                      "sipas_arsip_pane #buttonAdd"
                    );
                    if (
                      c.record &&
                      c.record.get("surat_setuju") ===
                        c.record.self.statusPenyetujuan().PERSETUJUAN_INIT
                    ) {
                      c.removeComponents.push(
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit",
                        "sipas_com_button_process",
                        "sipas_com_button_disposisi"
                      );
                      c.readonlyComponents.push(
                        "#suratPerihal",
                        "[name=surat_usesla]",
                        "#useSLA",
                        "#suratKeterangan"
                      );
                    }
                    break;

                  case "bank":
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "sipas_com_button_correspondent",
                      "#buttonAdd",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_process",
                      "sipas_com_button_disposisi",
                      "#btnAktifasi",
                      "#buttonRating",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#txtKetNomor",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "#containerRight",
                      "sipas_com_button_save",
                      "sipas_com_button_savesend",
                      "#perubahan",
                      "#buttonDelete",
                      "#toolbarControl",
                      "sipas_com_button_print",
                      "sipas_com_button_saveedit",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "#namaArsip",
                      "#ubah",
                      "sipas_com_button_gear",
                      "sipas_arsip_pane #buttonAdd",
                      "#btnHirarkiKelas"
                    );
                    c.readonlyComponents.push(
                      "#useBerkas",
                      "[name=surat_useretensi]",
                      "[name=surat_usesla]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_media]",
                      "[name=surat_unit_source]",
                      "[name=surat_nomor]",
                      "#containerMedia",
                      "#containerLokasi",
                      "#suratKeterangan",
                      "#nomorSurat",
                      "#suratPerihal",
                      "[name=surat_israhasia]",
                      "#agenda",
                      "#subagenda",
                      "#tanggal",
                      "#tanggalTmt",
                      "[name=surat_jenis]",
                      "[name=surat_jenis_sub]",
                      "[name=surat_kelas]",
                      "[name=surat_sifat]",
                      "[name=surat_prioritas]",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "#comboRetensi",
                      "[name=surat_retensi_tgl]",
                      "sipas_arsip_pane #buttonAdd"
                    );
                    if (
                      c.record &&
                      c.record.get("surat_setuju") ===
                        c.record.self.statusPenyetujuan().PERSETUJUAN_INIT
                    ) {
                      c.removeComponents.push(
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit",
                        "sipas_com_button_process",
                        "sipas_com_button_disposisi"
                      );
                      c.readonlyComponents.push(
                        "#suratPerihal",
                        "[name=surat_usesla]",
                        "#useSLA",
                        "#suratKeterangan"
                      );
                    }
                    if (c.record.get("surat_properti_ishapus") == 1) {
                      c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                    }
                    if (!bank_batal_dis) {
                      c.removeComponents.push("#btnCabutDistribusi");
                    }
                    break;

                  case "notif":
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "sipas_com_button_correspondent",
                      "#buttonAdd",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_process",
                      "sipas_com_button_disposisi",
                      "#buttonRating",
                      "#buttonLog",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#txtKetNomor",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "#containerRight",
                      "sipas_com_button_save",
                      "sipas_com_button_savesend",
                      "#perubahan",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "#toolbarControl",
                      "sipas_com_button_print",
                      "sipas_com_button_saveedit",
                      "#buttonRating",
                      "#buttonLihatRating",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_process",
                      "sipas_com_button_disposisi",
                      "[name=surat_usebalas]",
                      "#useBalas",
                      "#namaArsip",
                      "#ubah",
                      "sipas_com_button_gear",
                      "sipas_arsip_pane #buttonAdd",
                      "#btnHirarkiKelas"
                    );

                    c.readonlyComponents.push(
                      "#useBerkas",
                      "[name=surat_useretensi]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_media]",
                      "[name=surat_unit_source]",
                      "[name=surat_nomor]",
                      "#containerMedia",
                      "#containerLokasi",
                      "#suratKeterangan",
                      "#nomorSurat",
                      "#suratPerihal",
                      "[name=surat_israhasia]",
                      "#agenda",
                      "#subagenda",
                      "#tanggal",
                      "[name=surat_jenis]",
                      "[name=surat_kelas]",
                      "[name=surat_sifat]",
                      "[name=surat_prioritas]",
                      "[name=surat_usebalas]",
                      "#comboRetensi",
                      "[name=surat_retensi_tgl]",
                      "#suratPerihal",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "#suratKeterangan"
                    );

                    switch (c.notif_mode) {
                      case "berkas":
                        c.removeComponents.push("#btnAktifasi");
                        break;
                      case "retensi7":
                      case "retensi3":
                      case "retensi1":
                        // statements_1
                        break;
                    }
                    break;
                }
                break;

              case 4 /*surat internal keluar*/:
                c.removeComponents.push(
                  "#btndaftarTembusan",
                  "#kirimTembusan",
                  "#ekspedisiKeluar",
                  "#indukUnit",
                  "[name=surat_pengirim]",
                  "#containerJenisSub",
                  "#tanggalTmt",
                  "[name=korespondensi_penerima]",
                  "[name=korespondensi_pengirim]",
                  "#infoTerima",
                  /*'[name=korespondensi_info]',*/ "#infoRating",
                  "[name=surat_tujuan]",
                  "#containerLampiran",
                  "[name=surat_usebalas]",
                  "#useBalas",
                  "sipas_com_button_expedition",
                  "#infoBerkasFisik",
                  "#toolbarControl sipas_com_button_putin",
                  "sipas_com_button_disposisi",
                  "#namaArsip",
                  "sipas_com_button_process",
                  "#suratKepada",
                  "#useBerkas",
                  "#containerRightKolektif",
                  "#buttonResendKeputusan"
                );
                /*'sipas_com_button_print',*/
                c.readonlyComponents.push("[name=surat_nomor]");
                c.removeComponents.push(
                  "#containerMedia",
                  /*'#containerLokasi', */ "#containerLampiran"
                );
                c.requireComponents.push("[name=surat_sifat]");
                if (c.record && c.record.get("surat_setuju") !== 0) {
                  if (c.record && c.record.get("surat_setuju") === 4) {
                    c.removeComponents.push("#buttonDelete", "#simpanSetujui");
                  } else {
                    c.removeComponents.push(
                      "sipas_com_button_save",
                      "sipas_com_button_savesend",
                      "#perubahan",
                      "#buttonDelete",
                      "#simpanSetujui"
                    );
                  }
                } else {
                  c.removeComponents.push("#buttonResend");
                }

                if (!role_ikeluar_pilih || c.record.get("surat_nomor_urut")) {
                  c.removeComponents.push("#btnSalinNomor");
                }

                if (c.record && c.record.get("surat_setuju") !== 2) {
                  c.removeComponents.push("#buttonAturKorespondensi");
                }

                if (!ikeluar_lokasi) {
                  c.removeComponents.push("#containerLokasi");
                }

                if (!ikeluar_atur_lokasi) {
                  c.removeComponents.push("#buttonAturLokasi");
                }

                if (c.record.get("surat_ismusnah") == 1) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else {
                  c.removeComponents.push("#infoMusnahSurat");
                }

                if (c.record.get("surat_isarsip") == 1) {
                  c.removeComponents.push("#buttonArsip", "#buttonMusnah");
                } else {
                  c.removeComponents.push("#infoArsipSurat");
                }

                if (!useretensi) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else if (useretensi) {
                  if (now > retensi) {
                    c.removeComponents.push(
                      "sipas_com_button_edit",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "#batalNomor",
                      "#buttonResend"
                    );
                    if (c.mode != "bank") {
                      c.removeComponents.push("sipas_com_button_delete");
                    }
                    if (now <= inaktif) {
                      c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                    }
                  } else if (now <= retensi) {
                    c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                  }
                }
                if (
                  !c.record.get("jenis_nomor_awal") &&
                  c.record.get("surat_setuju") !== 2 &&
                  c.record.get("surat_nomor")
                ) {
                  c.removeComponents.push("#containerNomor");
                }

                if (c.record.get("surat_nomor_isbatal") != 1) {
                  c.removeComponents.push("#infoBatalNomor");
                } else {
                  c.removeComponents.push(
                    "#batalNomor",
                    "#kirimTembusan",
                    "#buttonDelete",
                    "#perubahan"
                  );
                }

                if (c.mode != "bank") {
                  c.removeComponents.push("#perubahanBank");
                }

                switch (c.mode) {
                  case "add":
                  case "edit":
                    if (
                      c.record.get("surat_nomor") &&
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3)
                    ) {
                      c.removeComponents.push("#btnHirarkiKelas", "#nomorLama");
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]"
                      );
                      c.disableComponents.push("[name=surat_tanggal]");
                    } else if (
                      (c.record.get("surat_nomor") &&
                        c.record.get("surat_setuju") == 4) ||
                      (c.record.get("surat_setuju") == 0 &&
                        c.record.get("surat_nomor_urut"))
                    ) {
                      if (
                        c.record.get("surat_setuju") == 0 &&
                        !c.record.get("surat_nomor")
                      ) {
                        c.removeComponents.push("#nomorLama");
                      }
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "#penyetujuUrut"
                      );
                      c.disableComponents.push("[name=surat_tanggal]");
                      c.removeComponents.push("#btnHirarkiKelas");
                    } else {
                      c.removeComponents.push("#nomorLama");
                    }

                    if (c.record.get("surat_setuju") == "4") {
                      c.readonlyComponents.push("[name=surat_jenis]");
                    }
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonLog",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_print",
                      "sipas_com_button_expedition",
                      "#toolbarControl sipas_com_button_putin",
                      "#ubah",
                      "#perubahan",
                      "#batalNomor",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_disposisi",
                      "sipas_surat_informasi_pane",
                      "#columnStatus",
                      "#buttonResend"
                    );
                    if (
                      c.record.get("surat_setuju") == "4" &&
                      c.record.get("surat_nomor")
                    ) {
                      c.readonlyComponents.push("#penyetujuUrut");
                    }
                    if (
                      c.record.get("surat_setuju") == 4 &&
                      !role_ikeluar_ubah_revisi &&
                      c.akses !== "view_bank"
                    ) {
                      c.readonlyComponents.push("[name=surat_kelas]");
                      c.removeComponents.push(
                        "#btnHirarkiKelas",
                        "#tambahPenyetuju",
                        "sipas_surat_penyetuju_list #columnDelete",
                        "sipas_surat_penyetuju_list #columnMoveDown",
                        "sipas_surat_penyetuju_list #columnMoveUp"
                      );
                    }
                    if (
                      (c.record.get("surat_setuju") == 0 ||
                        c.record.get("surat_setuju") == 4) &&
                      !role_bank_ubah_revisi &&
                      c.akses == "view_bank"
                    ) {
                      c.readonlyComponents.push("[name=surat_kelas]");
                      c.removeComponents.push(
                        "#btnHirarkiKelas",
                        "#tambahPenyetuju",
                        "sipas_surat_penyetuju_list #columnDelete",
                        "sipas_surat_penyetuju_list #columnMoveDown",
                        "sipas_surat_penyetuju_list #columnMoveUp"
                      );
                    }
                    break;

                  case "view":
                    if (
                      c.record.get("surat_setuju") == 0 ||
                      c.record.get("surat_setuju") == 4
                    ) {
                      c.removeComponents.push(
                        "#btnNomorSurat",
                        "#btnSalinNomor"
                      );
                    }
                    if (
                      c.record.get("surat_setuju") != 2 &&
                      c.record.get("surat_nomor")
                    ) {
                      /*untuk jika booking nomor aktif*/
                      c.removeComponents.push("#buttonAdd");
                    }
                    if (c.record.get("surat_nomor")) {
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]",
                        "[name=surat_tanggal]"
                      );
                    }
                    if (!c.record.get("jenis_nomor_awal")) {
                      c.hideComponent.push(
                        "#btnNomorSurat",
                        "#txtKetNomor",
                        "#btnSalinNomor",
                        "#batalNomor"
                      );
                    }
                    if (c.record.get("surat_isdistribusi") != 1) {
                      c.removeComponents.push("#buttonBerkasFisik");
                    }
                    c.removeComponents.push(
                      "[action=link]",
                      "[action=sdoc]",
                      "#buttonDeletePermanen",
                      "#ubah",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "#nomorLama",
                      "#containerRight",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#simpanSetujui",
                      "#btnHirarkiKelas",
                      // '#btndaftarPenerima');
                      "sipas_com_button_gear"
                    );

                    // if(c.status_kor && c.status_kor === c.record.self.statusPenyetujuan().PERSETUJUAN_INIT){
                    //     c.removeComponents.push('#simpanUbah', 'sipas_com_button_savesend', 'sipas_com_button_save',
                    //         'sipas_com_button_add', '#columnMoveUp','#columnMoveDown', '#columnDelete','sipas_arsip_pane #buttonAdd','#containerRight',
                    //         'sipas_com_button_saveedit', 'sipas_com_button_savesend', 'sipas_com_button_save',
                    //         'sipas_com_button_add', '#columnMoveUp','#columnMoveDown', '#columnDelete','sipas_arsip_pane #buttonAdd',
                    //         '#containerRight', '#pilihKorespondensi', '#resetKorespondensi', '#ubah', 'sipas_com_button_correspondent',
                    //         'sipas_surat_atribut_pane [name=surat_lokasi_sub]', '#btnNomorSurat');

                    // }else if (c.status_kor && c.status_kor !== c.record.self.statusPenyetujuan().PERSETUJUAN_INIT){

                    //     // c.removeComponents.push('#buttonDelete', '#buttonDeletePermanen', '#btnNomorSurat');
                    //     c.removeComponents.push('sipas_com_button_delete');
                    // }
                    if (
                      c.record.get("surat_setuju") != 2 &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push(
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }

                    if (
                      c.record.get("surat_setuju") != 2 ||
                      reupload != 1 ||
                      !role_ikeluar_reupload
                    ) {
                      c.removeComponents.push(
                        "#reuploadWarning ",
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }

                    if (
                      (c.record.get("surat_setuju") == 0 ||
                        c.record.get("surat_setuju") != 4 ||
                        c.record.get("surat_setuju") == 4) &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    } else if (
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3) &&
                      c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    }

                    if (!role_ikeluar_batal_nomor) {
                      c.removeComponents.push("#batalNomor");
                    }
                    break;

                  case "ubah":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#buttonMusnah",
                      "#buttonArsip",
                      "#perubahan",
                      "sipas_com_button_correspondent",
                      "#reuploadWarning ",
                      "#btnAktifasi",
                      "#buttonLog",
                      "#ubah",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#simpanSetujui",
                      "sipas_surat_informasi_pane",
                      "#simpanSetujui",
                      "#nomorLama",
                      "#btnHirarkiKelas"
                    );
                    c.readonlyComponents.push(
                      "#penyetujuUrut",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_usesla]",
                      "#useSLA"
                    );
                    // c.disableComponents.push('#cbTembusanList','#cbBerkasList');
                    if (!record.get("surat_setuju_isurut")) {
                      c.removeComponents.push("#tambahPenyetuju");
                    }
                    if (c.record.get("surat_nomor")) {
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]"
                      );
                      c.disableComponents.push("[name=surat_tanggal]");
                    }
                    if (!c.record.get("jenis_nomor_awal")) {
                      c.hideComponent.push(
                        "#btnNomorSurat",
                        "#txtKetNomor",
                        "#btnSalinNomor"
                      );
                    }
                    break;

                  case "koreksi":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#buttonResend",
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonLog",
                      "#simpanUbah",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#simpanSetujui",
                      "#nomorLama"
                    );
                    c.readonlyComponents.push(
                      "#tanggalBerlaku",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_loaksi]",
                      "#suratPerihal",
                      "sipas_arsip_pane"
                    );
                    c.readonlyComponents.push("[name=surat_retensi_tgl]");
                    c.disableComponents.push("[name=surat_useretensi]");
                    break;

                  case "lihat":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#btnHirarkiKelas",
                      "#buttonLog",
                      "#buttonResend",
                      "#reuploadWarning ",
                      "#btnAktifasi",
                      "#simpanUbah",
                      "#perubahan",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#simpanSetujui",
                      "#nomorLama",
                      // 'sipas_com_button_saveedit', '#pilihKorespondensi', '#resetKorespondensi', 'sipas_arsip_pane #toolbarControl', 'sipas_com_button_correspondent');
                      "sipas_com_button_saveedit",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_gear"
                    );
                    c.readonlyComponents.push("[name=surat_retensi_tgl]");
                    c.disableComponents.push("[name=surat_useretensi]");
                    if (
                      c.record &&
                      c.status_kor !==
                        c.record.self.statusPenyetujuan().PERSETUJUAN_INIT
                    ) {
                      c.removeComponents.push("#ubah");
                    }
                    if (
                      (c.record && c.record.get("surat_setuju") == "2") ||
                      (c.record && c.record.get("surat_setuju") == "4")
                    ) {
                      c.removeComponents.push("#ubah");
                    }
                    c.readonlyComponents.push(
                      "#tanggalBerlaku",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_sifat]",
                      "#suratPerihal",
                      "#subagenda"
                    );
                    break;

                  case "bank":
                    c.removeComponents.push(
                      "#buttonResend",
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonAdd",
                      "#simpanUbah",
                      "#perubahan",
                      "#toolbarControl",
                      "#buttonDelete",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#simpanSetujui",
                      "sipas_com_button_saveedit",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_arsip_pane #buttonHapus",
                      "#nomorLama",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_gear",
                      "#ubah",
                      "#btnHirarkiKelas",
                      "#btnNomorSurat",
                      "#btnSalinNomor"
                    );
                    // 'sipas_com_button_saveedit', '#pilihKorespondensi', '#resetKorespondensi', 'sipas_arsip_pane #toolbarControl', 'sipas_com_button_correspondent');
                    c.readonlyComponents.push(
                      "#useBerkas",
                      "[name=surat_useretensi]",
                      "[name=surat_berlaku_tgl]",
                      "[name=surat_retensi_tgl]",
                      "[name=surat_balas_prioritas]",
                      "[name=surat_usebalas]",
                      "[name=surat_unit_source]",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "#tanggal",
                      "[name=surat_usesla]",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_sifat]",
                      "#suratPerihal",
                      "#subagenda"
                    );
                    c.disableComponents.push(
                      "[name=surat_useretensi]",
                      "[name=surat_tanggal]"
                    );

                    if (c.record.get("surat_properti_ishapus") == 1) {
                      c.removeComponents.push(
                        "#batalNomor",
                        "#buttonMusnah",
                        "#buttonArsip"
                      );
                    }
                    if (
                      c.record.get("surat_setuju") == 0 &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    } else if (
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3) &&
                      c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (!role_bank_batal_nomor) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (
                      !role_bank_ubah_revisi ||
                      !c.record.get("surat_nomor") ||
                      c.record.get("surat_setuju") != 0 ||
                      c.record.get("surat_setuju") != 4
                    ) {
                      c.removeComponents.push("#perubahanBank");
                    }
                    break;

                  case "notif":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#reuploadWarning ",
                      "#buttonDeletePermanen",
                      "#btnMore",
                      "#daftarPenyetuju",
                      "#buttonLog",
                      "#buttonResend",
                      "#btnAktifasi",
                      "#buttonAdd",
                      "#simpanUbah",
                      "#perubahan",
                      "#toolbarControl",
                      "#buttonDelete",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#simpanSetujui",
                      "sipas_com_button_saveedit",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_gear",
                      "#ubah",
                      "#btnHirarkiKelas",
                      "#nomorLama"
                    );
                    // 'sipas_com_button_saveedit', '#pilihKorespondensi', '#resetKorespondensi', 'sipas_arsip_pane #toolbarControl', 'sipas_com_button_correspondent');

                    c.readonlyComponents.push(
                      "#useBerkas",
                      "[name=surat_useretensi]",
                      "[name=surat_berlaku_tgl]",
                      "[name=surat_retensi_tgl]",
                      "[name=surat_balas_prioritas]",
                      "[name=surat_usebalas]",
                      "[name=surat_unit_source]",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "#tanggal",
                      "[name=surat_usesla]",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_sifat]",
                      "#suratPerihal",
                      "#subagenda",
                      "[name=surat_useretensi]"
                    );

                    c.disableComponents.push(
                      "[name=surat_useretensi]",
                      "[name=surat_tanggal]"
                    );
                    switch (c.notif_mode) {
                      case "tolak":
                        c.removeComponents.push(
                          "#btnNomorSurat",
                          "#btnSalinNomor"
                        );
                        break;
                      case "sla_tolak":
                        c.removeComponents.push(
                          "#btnNomorSurat",
                          "#btnSalinNomor"
                        );
                        break;
                      case "ulasan":
                        c.removeComponents.push(
                          "#btnNomorSurat",
                          "#btnSalinNomor"
                        );
                        break;
                      case "belum_nomor":
                        break;
                    }
                    break;
                }
                break;

              case 5 /*surat bebas*/:
                c.width = 550;
                c.removeComponents.push(
                  "#ubah",
                  "sipas_sla_pane",
                  "sipas_retensi_pane",
                  "sipas_com_surat_korespondensi_pane",
                  "#containerRight",
                  "sipas_com_button_print",
                  "#containerRightKolektif",
                  "#containerJenisSub",
                  "#tanggalTmt",
                  "#toolbarControl sipas_com_button_putin",
                  "sipas_com_button_expedition",
                  "sipas_com_button_correspondent",
                  "sipas_com_button_disposisi",
                  "[name=surat_pengirim]",
                  "[name=surat_tujuan]",
                  "[name=itipe_nama]",
                  "[name=surat_usebalas]",
                  "#useBalas",
                  "[name=surat_israhasia]",
                  "#containerNomor",
                  "#containerAgenda",
                  "sipas_com_button_savesend",
                  "[name=surat_usesla]",
                  "#useSLA",
                  "sipas_com_button_process",
                  "#buttonResendKeputusan"
                );
                switch (c.mode) {
                  case "add":
                  case "edit":
                    c.removeComponents.push(
                      "#perubahan",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_save",
                      "#suratPerihal",
                      "sipas_surat_informasi_pane",
                      "#containerNomor"
                    );
                    break;

                  case "view":
                    c.removeComponents.push(
                      "sipas_com_button_save",
                      "sipas_com_button_savesend",
                      "sipas_com_button_saveedit",
                      "#fileUpload",
                      "#btnScan",
                      "#buttonAdd",
                      "sipas_com_button_add",
                      "#suratPerihal",
                      "#containerRight",
                      "sipas_arsip_pane #buttonAdd",
                      "sipas_com_button_gear"
                    );
                    break;
                }
                break;

              case 6 /*surat keputusan*/:
                c.removeComponents.push(
                  "#kirimTembusan",
                  "#ekspedisiKeluar",
                  "#indukUnit",
                  "[name=surat_pengirim]",
                  "[name=korespondensi_penerima]",
                  "[name=korespondensi_pengirim]",
                  "#infoTerima",
                  "#infoRating",
                  "[name=surat_tujuan]",
                  "#containerLampiran",
                  "[name=surat_usebalas]",
                  "#useBalas",
                  "sipas_com_button_expedition",
                  "#infoBerkasFisik",
                  "#toolbarControl sipas_com_button_putin",
                  "#namaArsip",
                  "sipas_com_button_process",
                  "#suratKepada",
                  "#useBerkas",
                  "sipas_surat_penerima_list #cbTembusanList",
                  "#buttonResend",
                  "#buttonResendKeputusan",
                  "#containerMedia",
                  "#containerLampiran"
                );
                c.readonlyComponents.push("[name=surat_nomor]");
                c.requireComponents.push(
                  "[name=surat_jenis_sub]",
                  "#tanggalTmt",
                  "[name=surat_sifat]"
                );

                if (c.record && c.record.get("surat_setuju") !== 0) {
                  if (c.record && c.record.get("surat_setuju") === 4) {
                    c.removeComponents.push("#buttonDelete", "#simpanSetujui");
                  } else {
                    if (
                      c.record.get("surat_model_sub") == 1 ||
                      c.model_sub == 1
                    ) {
                      if (c.record.get("surat_setuju") != 2) {
                        c.removeComponents.push(
                          "#perubahan",
                          "sipas_com_button_save"
                        );
                      } else {
                        if (c.record.get("surat_distribusi_tgl")) {
                          c.removeComponents.push(
                            "#perubahan",
                            "sipas_com_button_save"
                          );
                        }
                      }
                    } else if (
                      c.record.get("surat_model_sub") == 2 ||
                      c.model_sub == 2
                    ) {
                      if (c.record.get("surat_petikan_setuju") != 2) {
                        c.removeComponents.push(
                          "#perubahan",
                          "sipas_com_button_save"
                        );
                      } else {
                        if (c.record.get("surat_distribusi_tgl")) {
                          c.removeComponents.push(
                            "#perubahan",
                            "sipas_com_button_save"
                          );
                        }
                      }
                    }
                    c.removeComponents.push(
                      "sipas_com_button_savesend",
                      "#buttonDelete",
                      "#simpanSetujui"
                    );
                  }
                } else {
                  c.removeComponents.push("#buttonResend");
                }

                if (!role_ikeputusan_pilih) {
                  c.removeComponents.push("#btnSalinNomor");
                }

                if (c.record && c.record.get("surat_setuju") !== 2) {
                  c.removeComponents.push("#buttonAturKorespondensi");
                }

                if (!ikeputusan_lokasi) {
                  c.removeComponents.push("#containerLokasi");
                }

                if (!ikeputusan_atur_lokasi) {
                  c.removeComponents.push("#buttonAturLokasi");
                }

                if (c.record.get("surat_ismusnah") == 1) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else {
                  c.removeComponents.push("#infoMusnahSurat");
                }

                if (c.record.get("surat_isarsip") == 1) {
                  c.removeComponents.push("#buttonArsip", "#buttonMusnah");
                } else {
                  c.removeComponents.push("#infoArsipSurat");
                }

                if (!useretensi) {
                  c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                } else if (useretensi) {
                  if (now > retensi) {
                    c.removeComponents.push(
                      "sipas_com_button_edit",
                      "#btnNomorSurat",
                      "#btnSalinNomor",
                      "#batalNomor",
                      "#buttonResend"
                    );
                    if (c.mode != "bank") {
                      c.removeComponents.push("sipas_com_button_delete");
                    }
                    if (now <= inaktif) {
                      c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                    }
                  } else if (now <= retensi) {
                    c.removeComponents.push("#buttonMusnah", "#buttonArsip");
                  }
                }
                if (
                  !c.record.get("jenis_nomor_awal") &&
                  c.record.get("surat_nomor")
                ) {
                  if (c.record.get("surat_model_sub") == 1) {
                    if (c.record.get("surat_setuju") !== 2) {
                      c.removeComponents.push("#containerNomor");
                    }
                  } else {
                    if (
                      c.record.get("surat_setuju") !== 2 ||
                      c.record.get("surat_petikan_setuju") !== 2
                    ) {
                      c.removeComponents.push("#containerNomor");
                    }
                  }
                }

                if (c.record.get("surat_nomor_isbatal") != 1) {
                  c.removeComponents.push("#infoBatalNomor");
                } else {
                  c.removeComponents.push(
                    "#batalNomor",
                    "#kirimTembusan",
                    "#buttonDelete",
                    "#perubahan"
                  );
                }

                if (c.mode != "bank") {
                  c.removeComponents.push("#perubahanBank");
                }

                if (c.record.get("surat_model_sub") == 1 || c.model_sub == 1) {
                  c.removeComponents.push("#containerRightKolektif");
                } else {
                  c.removeComponents.push("#containerRight");
                }

                switch (c.mode) {
                  case "add":
                  case "edit":
                    if (
                      c.record.get("surat_nomor") &&
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3)
                    ) {
                      c.removeComponents.push("#btnHirarkiKelas", "#nomorLama");
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]"
                      );
                      c.disableComponents.push("[name=surat_tanggal]");
                    } else if (
                      (c.record.get("surat_nomor") &&
                        c.record.get("surat_setuju") == 4) ||
                      (c.record.get("surat_setuju") == 0 &&
                        c.record.get("surat_nomor_urut"))
                    ) {
                      if (
                        c.record.get("surat_setuju") == 0 &&
                        !c.record.get("surat_nomor")
                      ) {
                        c.removeComponents.push("#nomorLama");
                      }
                      c.removeComponents.push("#btnHirarkiKelas");
                      c.readonlyComponents.push("[name=surat_jenis]");
                      c.disableComponents.push("[name=surat_tanggal]");
                    } else {
                      c.removeComponents.push("#nomorLama");
                    }

                    if (
                      c.record.get("surat_model_sub") == 1 ||
                      c.model_sub == 1
                    ) {
                      if (c.record.get("surat_setuju") == 2) {
                        c.readonlyComponents.push(
                          "[name=surat_perihal]",
                          "[name=surat_tmt]",
                          "[name=surat_perihal]",
                          "[name=surat_agenda]",
                          "[name=surat_agenda_sub]",
                          "[name=surat_jenis_sub]",
                          "[name=surat_sifat]",
                          "[name=surat_israhasia]",
                          "[name=surat_prioritas]",
                          "[name=surat_keterangan]"
                        );
                        c.disableComponents.push(
                          "sipas_retensi_pane",
                          "sipas_com_surat_korespondensi_pane"
                        );
                      } else {
                        c.removeComponents.push(
                          "sipas_com_button_savedistribute"
                        );
                      }
                    } else if (
                      c.record.get("surat_model_sub") == 2 ||
                      c.model_sub == 2
                    ) {
                      if (c.record.get("surat_petikan_setuju") == 2) {
                        c.readonlyComponents.push(
                          "[name=surat_perihal]",
                          "[name=surat_tmt]",
                          "[name=surat_perihal]",
                          "[name=surat_agenda]",
                          "[name=surat_agenda_sub]",
                          "[name=surat_jenis_sub]",
                          "[name=surat_sifat]",
                          "[name=surat_israhasia]",
                          "[name=surat_prioritas]",
                          "[name=surat_keterangan]"
                        );
                        c.disableComponents.push(
                          "sipas_retensi_pane",
                          "sipas_com_surat_korespondensi_pane"
                        );
                      } else {
                        c.removeComponents.push(
                          "sipas_com_button_savedistribute"
                        );
                      }
                    }

                    if (c.record.get("surat_setuju") == "4") {
                      c.readonlyComponents.push("[name=surat_jenis]");
                    }
                    c.removeComponents.push(
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonLog",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_print",
                      "sipas_com_button_expedition",
                      "#toolbarControl sipas_com_button_putin",
                      "#ubah",
                      "#perubahan",
                      "#batalNomor",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_disposisi",
                      "sipas_surat_informasi_pane",
                      "#columnStatus",
                      "#buttonResend"
                    );
                    if (
                      c.record.get("surat_setuju") == "4" &&
                      c.record.get("surat_nomor")
                    ) {
                      c.readonlyComponents.push("#penyetujuUrut");
                    }
                    if (
                      c.record.get("surat_setuju") == 4 &&
                      !role_ikeputusan_ubah_revisi &&
                      c.akses !== "view_bank"
                    ) {
                      c.readonlyComponents.push("[name=surat_kelas]");
                      c.removeComponents.push(
                        "#btnHirarkiKelas",
                        "#tambahPenyetuju",
                        "sipas_surat_penyetuju_list #columnDelete",
                        "sipas_surat_penyetuju_list #columnMoveDown",
                        "sipas_surat_penyetuju_list #columnMoveUp"
                      );
                    }
                    if (
                      (c.record.get("surat_setuju") == 0 ||
                        c.record.get("surat_setuju") == 4) &&
                      !role_bank_ubah_revisi &&
                      c.akses == "view_bank"
                    ) {
                      c.readonlyComponents.push("[name=surat_kelas]");
                      c.removeComponents.push(
                        "#btnHirarkiKelas",
                        "#tambahPenyetuju",
                        "sipas_surat_penyetuju_list #columnDelete",
                        "sipas_surat_penyetuju_list #columnMoveDown",
                        "sipas_surat_penyetuju_list #columnMoveUp"
                      );
                    }
                    break;

                  case "view":
                    c.removeComponents.push(
                      "#buttonDeletePermanen",
                      "#ubah",
                      "sipas_com_button_saveedit",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "#nomorLama",
                      "#containerRightKolektif",
                      "[action=link]",
                      "[action=sdoc]",
                      "#containerRight",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "#simpanSetujui",
                      "#btnHirarkiKelas",
                      "sipas_com_button_savedistribute",
                      "sipas_com_button_gear",
                      "#containerRightPerorangan",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit"
                    );

                    if (
                      c.record.get("surat_model_sub") == 1 ||
                      c.model_sub == 1
                    ) {
                      if (c.record.get("surat_setuju") != 2) {
                        c.removeComponents.push("sipas_com_button_disposisi");
                      } else {
                        if (c.record.get("surat_distribusi_tgl")) {
                          c.removeComponents.push("sipas_com_button_disposisi");
                        }
                      }
                    } else if (
                      c.record.get("surat_model_sub") == 2 ||
                      c.model_sub == 2
                    ) {
                      if (c.record.get("surat_petikan_setuju") != 2) {
                        c.removeComponents.push("sipas_com_button_disposisi");
                      } else {
                        if (c.record.get("surat_distribusi_tgl")) {
                          c.removeComponents.push("sipas_com_button_disposisi");
                        }
                      }
                    }

                    if (
                      c.record.get("surat_setuju") == 0 ||
                      c.record.get("surat_setuju") == 4
                    ) {
                      c.removeComponents.push(
                        "#btnNomorSurat",
                        "#btnSalinNomor"
                      );
                    }

                    if (
                      c.record.get("surat_setuju") != 2 &&
                      c.record.get("surat_nomor")
                    ) {
                      /*untuk jika booking nomor aktif*/
                      c.removeComponents.push("#buttonAdd");
                    }

                    if (c.record.get("surat_nomor")) {
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]",
                        "[name=surat_tanggal]"
                      );
                    }
                    if (!c.record.get("jenis_nomor_awal")) {
                      c.hideComponent.push(
                        "#btnNomorSurat",
                        "#txtKetNomor",
                        "#btnSalinNomor",
                        "#batalNomor"
                      );
                    }
                    if (c.record.get("surat_isdistribusi") != 1) {
                      c.removeComponents.push("#buttonBerkasFisik");
                    }
                    if (
                      c.record.get("surat_setuju") != 2 &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push(
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }
                    if (
                      c.record.get("surat_setuju") != 2 ||
                      reupload != 1 ||
                      !role_ikeputusan_reupload
                    ) {
                      c.removeComponents.push(
                        "#reuploadWarning ",
                        "#buttonAdd",
                        "sipas_arsip_pane #buttonHapus",
                        "sipas_arsip_pane #buttonEdit"
                      );
                    }
                    if (
                      (c.record.get("surat_setuju") == 0 ||
                        c.record.get("surat_setuju") != 4 ||
                        c.record.get("surat_setuju") == 4) &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    } else if (
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3) &&
                      c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (!role_ikeputusan_batal_nomor) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (c.record.get("surat_petikan_setuju") != 2) {
                      c.removeComponents.push("#printApproval");
                    }
                    break;

                  case "ubah":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#buttonMusnah",
                      "#buttonArsip",
                      "#perubahan",
                      "sipas_com_button_correspondent",
                      "#reuploadWarning ",
                      "#btnAktifasi",
                      "#buttonLog",
                      "#ubah",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_savesend",
                      "sipas_com_button_save",
                      "#simpanSetujui",
                      "sipas_surat_informasi_pane",
                      "#simpanSetujui",
                      "#nomorLama",
                      "#btnHirarkiKelas",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_savedistribute"
                    );
                    c.readonlyComponents.push(
                      "#penyetujuUrut",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_usesla]",
                      "#useSLA"
                    );
                    // c.disableComponents.push('#cbTembusanList','#cbBerkasList');
                    if (!record.get("surat_setuju_isurut")) {
                      c.removeComponents.push("#tambahPenyetuju");
                    }
                    if (c.record.get("surat_nomor")) {
                      c.readonlyComponents.push(
                        "[name=surat_jenis]",
                        "[name=surat_kelas]",
                        "[name=surat_jenis_sub]"
                      );
                      c.disableComponents.push("[name=surat_tanggal]");
                    }
                    if (!c.record.get("jenis_nomor_awal")) {
                      c.hideComponent.push(
                        "#btnNomorSurat",
                        "#txtKetNomor",
                        "#btnSalinNomor"
                      );
                    }
                    break;

                  case "koreksi":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#buttonResend",
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonLog",
                      "#simpanUbah",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#containerBottom",
                      "#simpanSetujui",
                      "#nomorLama",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_savedistribute"
                    );
                    c.readonlyComponents.push(
                      "#tanggalBerlaku",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_loaksi]",
                      "#suratPerihal",
                      "sipas_arsip_pane"
                    );
                    c.readonlyComponents.push("[name=surat_retensi_tgl]");
                    c.disableComponents.push("[name=surat_useretensi]");
                    break;

                  case "lihat":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#btnHirarkiKelas",
                      "#buttonLog",
                      "#buttonResend",
                      "#reuploadWarning ",
                      "#btnAktifasi",
                      "#simpanUbah",
                      "#perubahan",
                      "#buttonDelete",
                      "#buttonDeletePermanen",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#simpanSetujui",
                      "#nomorLama",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_savedistribute",
                      "#containerRightKolektif",
                      "#containerRightPerorangan",
                      // 'sipas_com_button_saveedit', '#pilihKorespondensi', '#resetKorespondensi', 'sipas_arsip_pane #toolbarControl', 'sipas_com_button_correspondent');
                      "sipas_com_button_saveedit",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_gear"
                    );
                    c.readonlyComponents.push(
                      "[name=surat_retensi_tgl]",
                      "[name=surat_tmt]",
                      "[name=surat_jenis_sub]"
                    );
                    c.disableComponents.push("[name=surat_useretensi]");
                    if (
                      c.record &&
                      c.status_kor !==
                        c.record.self.statusPenyetujuan().PERSETUJUAN_INIT
                    ) {
                      c.removeComponents.push("#ubah");
                    }
                    if (
                      (c.record && c.record.get("surat_setuju") == "2") ||
                      (c.record && c.record.get("surat_setuju") == "4")
                    ) {
                      c.removeComponents.push("#ubah");
                    }
                    c.readonlyComponents.push(
                      "#tanggalBerlaku",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "[name=surat_tanggal]",
                      "[name=surat_usesla]",
                      "#useSLA",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_sifat]",
                      "#suratPerihal",
                      "#subagenda"
                    );
                    if (c.record.get("surat_petikan_setuju") != 2) {
                      c.removeComponents.push("#printApproval");
                    }
                    break;

                  case "bank":
                    c.removeComponents.push(
                      "#buttonResend",
                      "#reuploadWarning",
                      "#btnAktifasi",
                      "#buttonAdd",
                      "#simpanUbah",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_savedistribute",
                      "#perubahan",
                      "#toolbarControl",
                      "#buttonDelete",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#containerRightKolektif",
                      "#containerRightPerorangan",
                      "#simpanSetujui",
                      "sipas_com_button_saveedit",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_arsip_pane #buttonHapus",
                      "#nomorLama",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_gear",
                      "#ubah",
                      "#btnHirarkiKelas",
                      "#btnNomorSurat",
                      "#btnSalinNomor"
                    );
                    // 'sipas_com_button_saveedit', '#pilihKorespondensi', '#resetKorespondensi', 'sipas_arsip_pane #toolbarControl', 'sipas_com_button_correspondent');
                    c.readonlyComponents.push(
                      "#useBerkas",
                      "[name=surat_useretensi]",
                      "[name=surat_berlaku_tgl]",
                      "[name=surat_retensi_tgl]",
                      "[name=surat_balas_prioritas]",
                      "[name=surat_usebalas]",
                      "[name=surat_unit_source]",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "#tanggal",
                      "#tanggalTmt",
                      "[name=surat_usesla]",
                      "[name=surat_jenis]",
                      "[name=surat_jenis_sub]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_sifat]",
                      "#suratPerihal",
                      "#subagenda"
                    );
                    c.disableComponents.push(
                      "[name=surat_useretensi]",
                      "[name=surat_tanggal]"
                    );

                    if (c.record.get("surat_properti_ishapus") == 1) {
                      c.removeComponents.push(
                        "#batalNomor",
                        "#buttonMusnah",
                        "#buttonArsip"
                      );
                    }
                    if (
                      c.record.get("surat_setuju") == 0 &&
                      !c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    } else if (
                      (c.record.get("surat_setuju") == 1 ||
                        c.record.get("surat_setuju") == 2 ||
                        c.record.get("surat_setuju") == 3) &&
                      c.record.get("surat_nomor")
                    ) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (!role_bank_batal_nomor) {
                      c.removeComponents.push("#batalNomor");
                    }
                    if (
                      !role_bank_ubah_revisi ||
                      !c.record.get("surat_nomor") ||
                      c.record.get("surat_setuju") != 0 ||
                      c.record.get("surat_setuju") != 4
                    ) {
                      c.removeComponents.push("#perubahanBank");
                    }
                    break;

                  case "notif":
                    c.removeComponents.push(
                      "#batalNomor",
                      "#reuploadWarning ",
                      "#buttonDeletePermanen",
                      "#btnMore",
                      "#daftarPenyetuju",
                      "#buttonLog",
                      "#buttonResend",
                      "#btnAktifasi",
                      "#buttonAdd",
                      "#simpanUbah",
                      "#perubahan",
                      "#toolbarControl",
                      "#buttonDelete",
                      "sipas_com_button_savesend",
                      "#simpanSetujui",
                      "sipas_com_button_save",
                      "sipas_com_button_disposisi",
                      "sipas_com_button_add",
                      "#columnMoveUp",
                      "#columnMoveDown",
                      "#columnDelete",
                      "sipas_arsip_pane #buttonAdd",
                      "#containerRight",
                      "#containerBottom",
                      "#simpanSetujui",
                      "sipas_com_button_saveedit",
                      "#pilihKorespondensi",
                      "#resetKorespondensi",
                      "sipas_arsip_pane #buttonHapus",
                      "sipas_com_button_savedistribute",
                      "sipas_arsip_pane #buttonEdit",
                      "sipas_com_button_correspondent",
                      "sipas_com_button_gear",
                      "#ubah",
                      "#btnHirarkiKelas",
                      "#nomorLama"
                    );

                    c.readonlyComponents.push(
                      "#useBerkas",
                      "[name=surat_useretensi]",
                      "[name=surat_berlaku_tgl]",
                      "[name=surat_retensi_tgl]",
                      "[name=surat_balas_prioritas]",
                      "[name=surat_usebalas]",
                      "[name=surat_unit_source]",
                      "#suratKeterangan",
                      "[name=surat_pengirim]",
                      "[name=surat_tujuan]",
                      "[name=surat_israhasia]",
                      "[name=surat_agenda]",
                      "[name=surat_nomor]",
                      "#tanggal",
                      "[name=surat_usesla]",
                      "[name=surat_jenis]",
                      "[name=surat_prioritas]",
                      "[name=surat_kelas]",
                      "[name=surat_media]",
                      "[name=surat_lokasi]",
                      "[name=surat_lokasi_sub]",
                      "[name=surat_sifat]",
                      "#suratPerihal",
                      "#subagenda",
                      "[name=surat_useretensi]"
                    );

                    c.disableComponents.push(
                      "[name=surat_useretensi]",
                      "[name=surat_tanggal]"
                    );
                    switch (c.notif_mode) {
                      case "tolak":
                        c.removeComponents.push(
                          "#btnNomorSurat",
                          "#btnSalinNomor"
                        );
                        break;
                      case "sla_tolak":
                        c.removeComponents.push(
                          "#btnNomorSurat",
                          "#btnSalinNomor"
                        );
                        break;
                      case "ulasan":
                        c.removeComponents.push(
                          "#btnNomorSurat",
                          "#btnSalinNomor"
                        );
                        break;
                      case "belum_nomor":
                        break;
                    }
                    break;
                }
                break;
            }
            return c;
          })(config)
        );
        view.show();
        break;

      case "destroy":
        $helper.destroyRecord({
          record: config.record,
          callback: config.callback,
          confirm: true,
        });
        break;
    }
  },

  onMainview_Show: function (view) {
    view.setLoading(true);
    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      pegawaiId = $session.getProfileId(),
      profile = $session.getProfile(),
      form = $this.getForm({ root: view }),
      containerAtribut = $this.getContainerAtribut({ root: view }),
      cmpAgenda = $this.getCmpAgenda({ root: view }),
      cmpTipe = $this.getCmpTipe({ root: view }),
      cmpAgenda = $this.getCmpAgenda({ root: view }),
      cmpUnit = $this.getCmpUnit({ root: view }),
      cmpNomor = $this.getCmpNomor({ root: view }),
      cmpTanggal = $this.getCmpTanggal({ root: view }),
      cmpUrut = $this.getCmpUrut({ root: view }),
      cmpPetikanUrut = $this.getCmpPetikanUrut({ root: view }),
      comboLokasi = $this.getComboLokasi({ root: view }),
      textLokasiSub = $this.getTextLokasiSub({ root: view }),
      txtNomorPengajuan = $this.getTxtNomorPengajuan({ root: view }),
      cmpRegistrasi = $this.getCmpRegistrasi({ root: view }),
      listPenerima = $this.getListPenerima({ root: view }),
      listPenerimaKeluar = $this.getListPenerimaKeluar({ root: view }),
      listPenyetuju = $this.getListPenyetuju({ root: view }),
      listPetikan = $this.getListPetikan({ root: view }),
      titleListPenyetuju = $this.getTitleListPenyetuju({ root: view }),
      titleListPetikan = $this.getTitleListPetikan({ root: view }),
      titleListPenerima = $this.getTitleListPenerima({ root: view }),
      storePenerima = listPenerima && listPenerima.getStore(),
      storePenerimaKeluar = listPenerimaKeluar && listPenerimaKeluar.getStore(),
      txtReuploadWarning = $this.getTxtReuploadWarning({ root: view }),
      btnListPenerimask = $this.getBtnListPenerimask({ root: view }),
      jenisSub = $this.getJenisSub({ root: view }),
      btnSaveDraft = $this.getBtnSaveDraft({ root: view }),
      record = view.record,
      rec_jenis = record && record.get("surat_jenis"),
      noagd = record && record.get("surat_agenda"),
      noreg = record && record.get("surat_registrasi"),
      nomor = record && record.get("surat_nomor"),
      pengirim = record && record.get("surat_pengirim"),
      suratunit = record && record.get("surat_unit"),
      model = record && record.get("surat_model"),
      setuju = record && record.get("surat_setuju"),
      issalin = record && record.get("surat_nomor_issalin");

    if (view.model == 6) {
      var penerimask_jumlah = record.get("surat_penerimask_total")
        ? record.get("surat_penerimask_total")
        : 0;

      btnListPenerimask.setText(penerimask_jumlah + " Penerima");

      if (view.model_sub == 2) {
        titleListPenyetuju && titleListPenyetuju.setText(null);
        titleListPenerima && titleListPenerima.setValue(null);
      }
      if (titleListPetikan) {
        titleListPetikan.setText(null);
      }

      if (btnSaveDraft) {
        if (
          (view.model_sub == 1 || record.get("surat_model_sub") == 1) &&
          record.get("surat_setuju") == 2
        ) {
          btnSaveDraft.setText("SIMPAN");
        } else if (
          (view.model_sub == 2 || record.get("surat_model_sub") == 2) &&
          record.get("surat_petikan_setuju") == 2
        ) {
          btnSaveDraft.setText("SIMPAN");
        }
      }
    }

    if (model === 2 || model === 4 || model === 6) {
      txtReuploadWarning &&
        txtReuploadWarning.setValue($app.getGrammar("berkas_reupload_warning"));
    } else {
      txtReuploadWarning &&
        txtReuploadWarning.setValue(
          $app.getGrammar("berkas_reupload_warning_masuk")
        );
    }

    if (view.model === 1) {
      cmpNomor.emptyText = "";
      cmpNomor.applyEmptyText();
    }

    var storeJenis =
        containerAtribut.down("#containerJenis combobox") &&
        containerAtribut.down("#containerJenis combobox").getStore(),
      storeKelas =
        containerAtribut.down("#containerKelas combobox") &&
        containerAtribut.down("#containerKelas combobox").getStore(),
      storeSifat =
        containerAtribut.down("#containerSifat combobox") &&
        containerAtribut.down("#containerSifat combobox").getStore(),
      storePrioritas =
        containerAtribut.down("#containerPrioritas combobox") &&
        containerAtribut.down("#containerPrioritas combobox").getStore(),
      storeMedia =
        containerAtribut.down("#containerMedia combobox") &&
        containerAtribut.down("#containerMedia combobox").getStore(),
      storeLokasi =
        containerAtribut.down("#containerLokasi combobox") &&
        containerAtribut.down("#containerLokasi combobox").getStore(),
      jenisOn = null;

    if (record.get("surat_unit")) {
      if (view.model === 1) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=1";
      }
      if (view.model === 2) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=2";
        if (view.mode) storePenerima && storePenerima.removeAll();
        if (view.mode) storePenerimaKeluar && storePenerimaKeluar.removeAll();
      }
      if (view.model === 3)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=3";
      if (view.model === 4)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=3";
      if (view.model === 6)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=4";
    } else {
      if (view.model === 1) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=1";
      }
      if (view.model === 2) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=2";
        if (view.mode) storePenerima && storePenerima.removeAll();
        if (view.mode) storePenerimaKeluar && storePenerimaKeluar.removeAll();
      }
      if (view.model === 3)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=3";
      if (view.model === 4)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=3";
      if (view.model === 6)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=4";
    }

    //check again
    if (
      !rec_jenis &&
      (view.mode === "add" || view.mode === "edit" || view.mode === "ubah")
    ) {
      view.setLoading(true);
      storeJenis &&
        storeJenis.load(function () {
          view.setLoading(false);
        });
    }

    if (
      (view.mode == "add" ||
        view.mode == "edit" ||
        view.mode == "ubah" ||
        view.mode == "lihat" ||
        view.mode == "view") &&
      !record.get("surat_jenis_sub") &&
      view.model == 6
    ) {
      jenisSub.forceSelection = true;
    }

    switch (view.mode) {
      case "add":
        record.set({
          surat_unit: view.unit,
          surat_tanggal: new Date(),
          surat_model: view.model,
          surat_arah_tgl: new Date(),
          surat_arah_staf: pegawaiId,
          surat_buat_tgl: new Date(),
          surat_buat_staf: pegawaiId,
        });

        if (view.model == 6) {
          record.set({
            surat_model_sub: view.model_sub,
          });
        }

        /*make sure to register surat*/
        // view.setLoading(true);
        $helper.saveRecord({
          record: record,
          message: false,
          wait: true,
          waitTitle: "Menyiapkan Surat",
          waitText: "Harap Tunggu Sebentar",
          callback: function (success, record, response) {
            // view.setLoading(false);
            if (!success) {
              $helper.showMsg({
                success: false,
                message:
                  "Gagal menyiapkan surat. Silahkan tutup dan ulangi lagi !",
              });
              return;
            }
            form.loadRecord(record);
            if (!noagd) {
              view.fireEvent("loadagenda", view);
            }
            if (!noreg) {
              // view.fireEvent('loadregister', view);
            }
            if (
              record.get("surat_model") !== record.self.modelType().SURAT_MASUK
            ) {
              view.fireEvent("loadnomor", view);
            }
            if (!suratunit) {
              cmpUnit && cmpUnit.setValue(view.unit);
            }
            view.fireEvent("loadtitle", view);
            cmpUrut && cmpUrut.setValue(true);
            cmpPetikanUrut && cmpPetikanUrut.setValue(true);
          },
        });
        break;
      case "reply":
        // view.fireEvent('loadregister', view);
        // view.fireEvent('loadagenda', view);
        // view.fireEvent('loadnomor', view);

        recordKeluar = $this.createRecord();
        recordKeluar.set({
          surat_tanggal: new Date(),
          pembuat_nama: $session.getProfile().staf_nama,
          surat_korespondensi: record.get("surat_korespondensi"),
          surat_korespondensi_surat: record.get("surat_id"),
          korespondensi_kode: record.get("korespondensi_kode"),
          surat_perihal: "Membalas " + record.get("surat_perihal"),
          surat_tujuan: record.get("surat_pengirim"),
          surat_agenda: cmpAgenda.getValue(),
          surat_israhasia: record.get("surat_israhasia"),
          surat_unit: view.unit,
          surat_model: view.model,
          surat_jenis: record.get("jenis_id"),
          surat_sifat: record.get("sifat_id"),
          surat_media: record.get("media_id"),
          surat_kelas: record.get("kelas_id"),
          surat_lokasi: record.get("lokasi_id"),
        });

        $helper.saveRecord({
          record: recordKeluar,
          message: false,
          wait: true,
          waitTitle: "Menyiapkan Surat",
          waitText: "Harap Tunggu Sebentar",
          callback: function (success, record, response) {
            // view.setLoading(false);
            if (!success) {
              $helper.showMsg({
                success: false,
                message:
                  "Gagal menyiapkan surat. Silahkan tutup dan ulangi lagi !",
              });
              return;
            }

            form.loadRecord(record);

            var noagd = record && record.get("surat_agenda"),
              noreg = record && record.get("surat_registrasi"),
              nomor = record && record.get("surat_nomor");

            if (!noagd) {
              view.fireEvent("loadagenda", view);
            }
            if (!noreg) {
              // view.fireEvent('loadregister', view);
            }
            if (
              record.get("surat_model") !== record.self.modelType().SURAT_MASUK
            ) {
              view.fireEvent("loadnomor", view);
            }
            view.fireEvent("loadtitle", view);
          },
        });
        break;
      default:
        form.loadRecord(record);
        // if(view.mode = 'bank' && view.model === 4){
        //    cmpTanggal && cmpTanggal.setReadOnly(true);
        // }
        if (!noagd && view.mode != "view") {
          view.fireEvent("loadagenda", view);
        }
        if (!noreg && (view.mode === "edit" || view.mode === "ubah")) {
          view.fireEvent("loadregister", view);
        }
        if (record.get("surat_model") !== record.self.modelType().SURAT_MASUK) {
          view.fireEvent("loadnomor", view);
        }
        if (!suratunit) {
          view.unit && cmpUnit.setValue(view.unit);
        }
        if (!rec_jenis) {
          view.tipe && cmpTipe.setValue(view.tipe);
        }

        view.fireEvent("loadtitle", view);
        break;
    }
    if (
      record.get("surat_nomor") &&
      !record.get("jenis_nomor_awal") &&
      (view.mode == "view" || view.mode == "lihat" || view.mode == "koreksi") &&
      record.get("surat_setuju") != 2
    ) {
      txtNomorPengajuan && txtNomorPengajuan.show();
    } else {
      txtNomorPengajuan && txtNomorPengajuan.hide();
    }
    view.setLoading(false);
  },

  onButtonAdd_Click: function (button, e, eOpts) {
    var $this = this,
      list = button.up("sipas_surat_penerima_list"), // get view button
      $helper = $this.getApplication().Helper(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      listPenerima = $this.getListPenerima({ root: view }),
      listPenerimaKeluar = $this.getListPenerimaKeluar({ root: view }),
      record = form && form.updateRecord().getRecord(),
      dataStore = $this.storePenerima,
      controllerLookup = $this.getController($this.controllerLookupPenerima),
      multiselect = true;
    console.log(dataStore);

    //   change store if view id is panepenerimakeluar
    if (list.getItemId() === "panePenerimaKeluar") {
      dataStore = "Sipas.surat.penerimakeluar.List";
      console.log(dataStore);
    }

    var storePenerima = $this.getStore(dataStore);
    if (view.model == record.self.modelType().MODEL_IKELUAR && view.penerima) {
      mode = "ikeluar";
    } else if (
      view.model == record.self.modelType().MODEL_KEPUTUSAN &&
      view.penerima
    ) {
      mode = "keputusan";
    } else {
      mode = "disposisi";
    }

    controllerLookup.launch({
      multiselect: multiselect,
      mode: mode,
      callback: function (selections) {
        for (var i in selections) {
          var find = storePenerima.findRecord(
            "staf_id",
            selections[i].data.staf_id
          );
          if (!find) {
            storePenerima.add(selections[i].data);
          } else {
            var msg = $this.getMessage("receiver_exist", {
              id: selections[i].data.staf_nama,
            });
            $helper.showNotification(msg[0], msg[1]);
          }
        }
        if (
          record.get("surat_model") == 6 &&
          record.get("surat_model_sub") == 2
        )
          if (list.getItemId() === "panePenerimaKeluar") {
            listPenerimaKeluar.setTitle(
              '<b style="color:#04408c; font-size: 13px">Penerima (' +
                storePenerima.data.length +
                ")</b>"
            );
          } else {
            listPenerima.setTitle(
              '<b style="color:#04408c; font-size: 13px">Tembusan (' +
                storePenerima.data.length +
                ")</b>"
            );
          }
      },
    });
  },

  onButtonAturLokasi_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      $helper = $this.getApplication().Helper(),
      view = $this.getMainview({ from: button }),
      controllerLookupAturLokasi = $this.getController(
        $this.controllerLookupAturLokasi
      ),
      // record = view.record,
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord();
    comboLokasi = $this.getComboLokasi({ root: view });
    textLokasiSub = $this.getTextLokasiSub({ root: view });

    controllerLookupAturLokasi.launch({
      record: record,
      mode: "edit",
      callback: function (success, record, operation) {
        Ext.callback(view.callback, view, [true, record, eOpts]);
        form.loadRecord(record);
        record.reload();
      },
    });
  },

  onBtnHirarkiKelas_Click: function (button, e, eOpts) {
    var $this = this,
      controllerLookupHirarki = $this.getController(
        $this.controllerLookupHirarki
      ),
      $helper = $this.getApplication().Helper(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      cmp = $this.getComboKelas({ root: view }),
      record = form && form.updateRecord().getRecord();

    controllerLookupHirarki.launch({
      record: record,
      mode: "edit",
      callback: function (selection) {
        cmp.select(selection[0]);
        $this.onComboKelas_Select(cmp, selection);
      },
    });
  },

  onButtonAturKorespondensi_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      controllerAturKorespondensi = $this.getController(
        $this.controllerAturKorespondensi
      ),
      $helper = $this.getApplication().Helper(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      txtKores = $this.getTextKores({ root: view }),
      cmpKorespondensi = $this.getCmpKorespondensi({ root: view }),
      txtKores = $this.getTextKores({ root: view });
    record = form && form.updateRecord().getRecord();
    // record = view.record;

    controllerAturKorespondensi.launch({
      record: record,
      mode: "edit",
      callback: function (success, record, operation) {
        Ext.callback(view.callback, view, [true, record, eOpts]);
        form.loadRecord(record);
        record.reload();
        // view.refresh();
        // record.getKorespondensiSurat(function(surat){
        // txtKores.setValue($this.renderKorespondensiTemplate(record));
        // $this.onKorespondensi_LoadAssociate(record, form, cmpKorespondensi);
        // });
        // view.close();
      },
    });
  },

  onButtonBerkasFisik_Click: function (button, e, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: button }),
      form = $this.getForm({ root: mainview }),
      record = form && form.updateRecord().getRecord(),
      infoSurat = $this.getContainerInformasi({ root: mainview }),
      controllerPopup = $this.getController($this.controllerPopupBerkasFisik);

    controllerPopup.launch({
      mode: "view",
      record: record,
      callback: function (success, records, operation) {
        form && form.loadRecord(records);
        Ext.callback(mainview.callback, mainview, [true, records, eOpts]);
      },
    });
  },

  onButtonAtributGear_Click: function (mainview) {
    var $this = this,
      bootstrap = mainview.bootstrap,
      btnType = mainview.btnType,
      record = mainview.record,
      view = $this.getMainview({ from: mainview }),
      containerAtribut = $this.getContainerAtribut({ root: view }),
      controllerAtrib = $this.getController(bootstrap);

    var storeJenis =
        containerAtribut.down("#containerJenis combobox") &&
        containerAtribut.down("#containerJenis combobox").getStore(),
      storeKelas =
        containerAtribut.down("#containerKelas combobox") &&
        containerAtribut.down("#containerKelas combobox").getStore(),
      storeSifat =
        containerAtribut.down("#containerSifat combobox") &&
        containerAtribut.down("#containerSifat combobox").getStore(),
      storePrioritas =
        containerAtribut.down("#containerPrioritas combobox") &&
        containerAtribut.down("#containerPrioritas combobox").getStore(),
      storeMedia =
        containerAtribut.down("#containerMedia combobox") &&
        containerAtribut.down("#containerMedia combobox").getStore(),
      storeLokasi =
        containerAtribut.down("#containerLokasi combobox") &&
        containerAtribut.down("#containerLokasi combobox").getStore();

    var cmpRahasia = $this.getCmpRahasia({ root: view }),
      value = $this.getComboSifat({ root: view }).getValue();

    if (record && record.get("surat_unit")) {
      if (view.model === 1) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=1";
      }
      if (view.model === 2) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=2";
      }
      if (view.model === 3)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=3";
      if (view.model === 4)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=3";
      if (view.model === 6)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          record.get("surat_unit") +
          "&tampil=4";
    } else {
      if (view.model === 1) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=1";
      }
      if (view.model === 2) {
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=2";
      }
      if (view.model === 3)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=3";
      if (view.model === 4)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=3";
      if (view.model === 6)
        storeJenis.getProxy().url =
          "server.php/sipas/jenis/jenis_perunit?unit=" +
          view.unit +
          "&tampil=4";
    }

    controllerAtrib.launch({
      callback: function (success, record, operation) {
        if (btnType === "jenis") {
          storeJenis.reload();
        } else if (btnType === "kelas") {
          storeKelas.reload();
        } else if (btnType === "sifat") {
          storeSifat.reload();

          if (value) {
            Ext.Ajax.request({
              url: $this.getApi("sifat"),
              params: { sifat_id: value },
              success: function (response, options) {
                var objres = Ext.decode(response.responseText, true) || {},
                  data = objres.data;

                if (data.sifat_israhasia === "1") {
                  cmpRahasia.setValue(true);
                } else {
                  cmpRahasia.setValue(false);
                }
              },
            });
          }
        } else if (btnType === "prioritas") {
          storePrioritas.reload();
        } else if (btnType === "media") {
          storeMedia.reload();
        } else if (btnType === "lokasi") {
          storeLokasi.reload();
        }
      },
    });
  },

  onMainview_LoadAgenda: function (mainview, e, eOpts) {
    var $this = this,
      model = mainview.model,
      unit = mainview.unit,
      cmp = $this.getCmpAgenda({ root: mainview });

    // cmp && cmp.setLoading(true);
    mainview && mainview.setLoading(true);
    Ext.Ajax.request({
      url: $this.getApi("next_agenda"),
      params: {
        model: model,
        unit: unit,
      },
      success: function (response, eOpts) {
        var res = Ext.decode(response.responseText, true);
        cmp && cmp.setValue(res.next);
        // cmp && cmp.setLoading(false);
        mainview && mainview.setLoading(false);
      },
    });
  },

  onMainview_LoadRegister: function (mainview, e, eOpts) {
    var $this = this,
      cmp = $this.getCmpRegistrasi({ root: mainview });

    // cmp.setLoading(true);
    mainview && mainview.setLoading(true);
    Ext.Ajax.request({
      url: this.getApi("next_registrasi"),
      success: function (response, eOpts) {
        var res = Ext.decode(response.responseText, true) || {};
        cmp.setValue(res.next);
        // cmp.setLoading(false);
        mainview && mainview.setLoading(false);
      },
    });
  },

  onMainview_LoadNomor: function (mainview, e, eOpts) {
    mainview && mainview.setLoading(true);
    var $this = this,
      record = mainview.record,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $language = $app.Language(),
      $session = $app.getSession(),
      bank_update = $session.getRuleAccess("bank_update"),
      booking_nomor = $app.LocalSetting().get("use_booking_nomor"),
      auto_nomor_eks = $app.LocalSetting().get("use_auto_nomor_eksternal"),
      auto_nomor_int = $app.LocalSetting().get("use_auto_nomor_internal"),
      txtKetNomor = $this.getTxtKetNomor({ root: mainview }),
      btnNomor = $this.getBtnNomor({ root: mainview }),
      cmpNomor = $this.getCmpNomor({ root: mainview }),
      cmpNomorLama = $this.getCmpNomorLama({ root: mainview }),
      btnSalinNomor = $this.getBtnSalinNomor({ root: mainview }),
      add = $this.getBtnAddPenyetuju({ root: mainview }),
      del = $this.getColumnDeletePenyetuju({ root: mainview }),
      up = $this.getColumnMoveUpPenyetuju({ root: mainview }),
      down = $this.getColumnMoveDownPenyetuju({ root: mainview }),
      langAutoNomorEks1 = $language.getGrammar("auto_nomor_eks_1_desc", false),
      langAutoNomorEks0 = $language.getGrammar("auto_nomor_eks_0_desc", false),
      langAutoNomorInt1 = $language.getGrammar("auto_nomor_int_1_desc", false),
      langAutoNomorInt0 = $language.getGrammar("auto_nomor_int_0_desc", false),
      langBooking = $language.getGrammar("booking_nomor_active_desc", false),
      langNomorUlang = $language.getGrammar("nomor_ulang_desc", false),
      vmode = mainview.mode == "view" ? true : false,
      replyMode = mainview.mode == "reply" ? true : false,
      editMode = mainview.mode == "edit" ? true : false,
      auto_nomor_eks = auto_nomor_eks == "1" ? true : false,
      auto_nomor_int = auto_nomor_int == "1" ? true : false,
      model = record.get("surat_model"),
      model_sub = record.get("surat_model_sub"),
      isSetuju = record && record.get("surat_setuju") == 2 ? true : false,
      isSetujuPetikan =
        record && record.get("surat_petikan_setuju") == 2 ? true : false,
      isNomor = record && record.get("surat_isnomor") ? true : false,
      issalin = record && record.get("surat_nomor_issalin") ? true : false;

    if (
      editMode &&
      record.get("surat_nomor") &&
      (record.get("surat_setuju") == 0 || record.get("surat_setuju") == 4)
    ) {
      $helper.hideComponent({
        parent: mainview,
        items: {
          "sipas_surat_penyetuju_list #tambahPenyetuju": false,
          "sipas_surat_penyetuju_list #columnDelete": false,
          "sipas_surat_penyetuju_list #columnMoveDown": false,
          "sipas_surat_penyetuju_list #columnMoveUp": false,

          "sipas_surat_petikan_list #tambahPetikan": false,
          "sipas_surat_petikan_list #columnDelete": false,
          "sipas_surat_petikan_list #columnMoveDown": false,
          "sipas_surat_petikan_list #columnMoveUp": false,
        },
      });
      if (record.get("jenis_nomor_awal") && model != 1) {
        // cmpNomorLama.setValue(record.get('surat_nomor'));
        // cmpNomor.setValue(null);
        cmpNomorLama && cmpNomorLama.hide();
        btnNomor && btnNomor.hide();
        if (btnSalinNomor) {
          btnSalinNomor.hide();
        }
      }
    } else if (record.get("surat_nomor")) {
      if (issalin) {
        cmpNomor.setValue($app.getGrammar("txt_nomor_salin"));
      }

      if (!replyMode) {
        $helper.hideComponent({
          parent: mainview,
          items: {
            // '#nomorSurat' : vmode && !isNomor,
            "sipas_surat_penyetuju_list #tambahPenyetuju":
              (!isSetuju && !isNomor) || isNomor,
            "sipas_surat_penyetuju_list #columnDelete":
              (!isSetuju && !isNomor) || isNomor,
            "sipas_surat_penyetuju_list #columnMoveDown":
              (!isSetuju && !isNomor) || isNomor,
            "sipas_surat_penyetuju_list #columnMoveUp":
              (!isSetuju && !isNomor) || isNomor,

            "sipas_surat_petikan_list #tambahPetikan":
              (!isSetuju && !isNomor) || isNomor,
            "sipas_surat_petikan_list #columnDelete":
              (!isSetuju && !isNomor) || isNomor,
            "sipas_surat_petikan_list #columnMoveDown":
              (!isSetuju && !isNomor) || isNomor,
            "sipas_surat_petikan_list #columnMoveUp":
              (!isSetuju && !isNomor) || isNomor,
            // '#containerNomor' : vmode && !isSetuju && !isNomor
          },
        });
      }

      if (
        (!record.get("jenis_nomor_awal") && record.get("surat_model") == 1) ||
        record.get("surat_model") !== 1
      ) {
        if (model == 6 && model_sub == 2) {
          $helper.hideComponent({
            parent: mainview,
            items: {
              "#txtKetNomor":
                (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
              "#btnNomorSurat":
                (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
              "#btnSalinNomor":
                (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
            },
          });
        } else {
          $helper.hideComponent({
            parent: mainview,
            items: {
              "#txtKetNomor": (!isSetuju && !isNomor) || isNomor,
              "#btnNomorSurat": (!isSetuju && !isNomor) || isNomor,
              "#btnSalinNomor": (!isSetuju && !isNomor) || isNomor,
            },
          });
        }
      }
    } else {
      if (!booking_nomor) {
        if (model == 6 && model_sub == 2) {
          $helper.hideComponent({
            parent: mainview,
            items: {
              "#txtKetNomor":
                (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
              "#btnNomorSurat":
                (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
              "#btnSalinNomor":
                (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
            },
          });
        } else {
          $helper.hideComponent({
            parent: mainview,
            items: {
              "#txtKetNomor": (!isSetuju && !isNomor) || isNomor,
              "#btnNomorSurat": (!isSetuju && !isNomor) || isNomor,
              "#btnSalinNomor": (!isSetuju && !isNomor) || isNomor,
            },
          });
        }
      } else {
        if (!record.get("jenis_nomor_awal")) {
          if (model == 6 && model_sub == 2) {
            $helper.hideComponent({
              parent: mainview,
              items: {
                "#txtKetNomor":
                  (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
                "#btnNomorSurat":
                  (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
                "#btnSalinNomor":
                  (!isSetuju && !isSetujuPetikan && !isNomor) || isNomor,
              },
            });
          } else {
            $helper.hideComponent({
              parent: mainview,
              items: {
                "#txtKetNomor": (!isSetuju && !isNomor) || isNomor,
                "#btnNomorSurat": (!isSetuju && !isNomor) || isNomor,
                "#btnSalinNomor": (!isSetuju && !isNomor) || isNomor,
              },
            });
          }
        }
      }
    }

    if (!booking_nomor) {
      if (cmpNomor) {
        if (model === 2) {
          if (!auto_nomor_eks) {
            cmpNomor.emptyText = langAutoNomorEks0;
          } else {
            cmpNomor.emptyText = langAutoNomorEks1;
          }
          cmpNomor.applyEmptyText();
        } else if (model === 4 || model === 6) {
          if (!auto_nomor_int) {
            cmpNomor.emptyText = langAutoNomorInt0;
          } else {
            cmpNomor.emptyText = langAutoNomorInt1;
          }
          cmpNomor.applyEmptyText();
        }
      }
    }
    if (!!txtKetNomor) {
      if (record.get("surat_setuju") == 0 || record.get("surat_setuju") == 4) {
        txtKetNomor.setValue(langNomorUlang);
      } else {
        txtKetNomor.setValue(langBooking);
      }
    }
    mainview && mainview.setLoading(false);
  },

  onMainview_LoadTitle: function (view, e, eOpts) {
    view && view.setLoading(true);
    var $this = this,
      form = $this.getForm({ root: view }),
      titleListPenerima = $this.getTitleListPenerima({ root: view }),
      record = form && form.updateRecord().getRecord(),
      model = record.get("surat_model"),
      model_sub = record.get("surat_model_sub"),
      title_sub = "";

    if (
      titleListPenerima &&
      (view.model === 2 || (view.model == 6 && model_sub == 1))
    ) {
      titleListPenerima.setValue('<b style="color:#04408c">Tembusan</b>');
    }

    if (model == 6) {
      if (model_sub == 2) {
        title_sub = " (Kolektif)";
      } else {
        title_sub = " (Perorangan)";
      }
    }

    if (model == 3) {
      if (model_sub == 2) {
        title_sub = " (Kolektif)";
      } else if (model_sub == 1) {
        title_sub = " (Perorangan)";
      } else {
        title_sub = "";
      }
    }

    switch (view.mode) {
      case "add":
        view.setTitle("Tambah Agenda " + record.getModelDisplay() + title_sub);
        break;

      case "edit":
        view.setTitle("Ubah Agenda " + record.getModelDisplay() + title_sub);
        break;

      case "ubah":
        view.setTitle("Ubah Agenda " + record.getModelDisplay() + title_sub);
        break;

      case "koreksi":
        view.setTitle(
          "Identitas Agenda " + record.getModelDisplay() + title_sub
        );
        break;

      case "view":
        view.setTitle(
          "Identitas Agenda " + record.getModelDisplay() + title_sub
        );
        break;

      case "reply":
        view.setTitle("Balas Agenda " + record.getModelDisplay() + title_sub);
        break;

      case "lihat":
        view.setTitle(
          "Identitas Agenda " + record.getModelDisplay() + title_sub
        );
        break;

      case "bank":
        view.setTitle(
          "Identitas Agenda " + record.getModelDisplay() + title_sub
        );
        break;

      case "notif":
        view.setTitle(
          "Identitas Agenda " + record.getModelDisplay() + title_sub
        );
        break;
    }
    view && view.setLoading(true);
  },

  onPenerima_LoadAssociate: function (record, form, cmp) {
    var $this = this,
      mainview = $this.getMainview({ from: form }),
      model = record.get("surat_model"),
      storeStack = cmp.getStore();

    storeStack.removeAll();
    if (model == 6)
      cmp.setTitle(
        '<b style="color:#04408c; font-size: 13px">Tembusan (' +
          storeStack.data.length +
          ")</b>"
      );
    if (record && mainview.mode != "add") {
      cmp.setLoading(true);
      var store = record.fetchStackDisposisi();
      if (model == 6) {
        var store = record.fetchTembusansk();
      }
      store.load(function () {
        store.each(function (record) {
          storeStack.add(record);
        });
        if (model == 6)
          cmp.setTitle(
            '<b style="color:#04408c; font-size: 13px">Tembusan (' +
              storeStack.data.length +
              ")</b>"
          );
        cmp.setLoading(false);
      });
    }
  },

  onPenerimaKeluar_LoadAssociate: function (record, form, cmp) {
    var $this = this,
      mainview = $this.getMainview({ from: form }),
      list = $this.getPanePenerimaKeluar({ root: mainview }),
      storeStack = cmp.getStore();

    storeStack.removeAll();
    if (record && mainview.mode != "add") {
      storeStack.getProxy().url =
        "server.php/sipas/surat_stack/disposisi/penerimakeluar?surat_id=" +
        record.get("surat_id");
      storeStack.reload();
    }
  },

  onPenyetuju_LoadAssociate: function (record, form, cmp) {
    var $this = this,
      mainview = $this.getMainview({ from: cmp }),
      model = record.get("surat_model"),
      storePenyetuju = cmp.getStore();

    storePenyetuju.removeAll();
    if (model == 6)
      cmp.setTitle(
        '<b style="color:#04408c; font-size: 13px">Penyetuju (' +
          storePenyetuju.data.length +
          ")</b>"
      );

    if (record && mainview.mode != "add") {
      cmp.setLoading(true);
      var store = record.fetchStackKoreksi();
      store.load(function () {
        store.each(function (record) {
          storePenyetuju.addSorted(record);
        });

        if (model == 6)
          cmp.setTitle(
            '<b style="color:#04408c; font-size: 13px">Penyetuju (' +
              storePenyetuju.data.length +
              ")</b>"
          );
        cmp.setLoading(false);
      });
    }
  },

  onPetikan_LoadAssociate: function (record, form, cmp) {
    var $this = this,
      mainview = $this.getMainview({ from: form }),
      model = record.get("surat_model"),
      storeStack = cmp.getStore();

    storeStack.removeAll();
    if (model == 6)
      cmp.setTitle(
        '<b style="color:#04408c; font-size: 13px">Petikan (' +
          storeStack.data.length +
          ")</b>"
      );

    if (record && mainview.mode != "add") {
      cmp.setLoading(true);
      var store = record.fetchStackPetikan();
      store.load(function () {
        store.each(function (record) {
          storeStack.addSorted(record);
        });

        if (model == 6)
          cmp.setTitle(
            '<b style="color:#04408c; font-size: 13px">Petikan (' +
              storeStack.data.length +
              ")</b>"
          );
        cmp.setLoading(false);
      });
    }
  },

  onArsip_LoadAssociate: function (record, form, cmp) {
    var view = this.getMainview({ from: cmp }),
      mode = view.mode,
      $app = this.getApplication(),
      $session = $app.getSession(),
      pegawaiId = $session.getProfileId();

    cmp.setLoading(true);
    record.getArsip(function (arsip) {
      cmp.setLoading(false);
      if (arsip) {
        cmp.fireEvent(
          "load",
          cmp,
          record,
          arsip,
          record.get("surat_israhasia"),
          mode,
          pegawaiId
        );
      }
    });
  },

  onKorespondensi_LoadAssociate: function (record, form, cmp) {
    var $this = this,
      mainview = $this.getMainview({ from: cmp }),
      $helper = $this.getApplication().Helper(),
      mode = mainview.mode,
      kores_pengirim = cmp.down("[name=korespondensi_pengirim]"),
      kores_penerima = cmp.down("[name=korespondensi_penerima]"),
      kores_unitpenerima = cmp.down("[name=korespondensi_unitpenerima]"),
      kores_unitpengirim = cmp.down("[name=korespondensi_unitpengirim]"),
      cmpKorespondensiInfo = cmp.down("[name=korespondensi_info]");

    if (record.get("surat_korespondensi_surat")) {
      cmp.setLoading(true);
      record.getKorespondensiSurat(function (surat) {
        cmp.setLoading(false);
        if (surat && surat.get("surat_id")) {
          cmp.expand && cmp.expand();
          cmpKorespondensiInfo.setValue(
            $this.renderKorespondensiTemplate(surat)
          );
        } else {
          cmp.collapse && cmp.collapse();
          if (
            mode == "view" ||
            mode == "lihat" ||
            mode == "bank" ||
            mode == "ubah" ||
            mode == "notif"
          ) {
            cmpKorespondensiInfo.setValue(
              $this.renderKorespondensiTemplate(record)
            );
          } else if (mode == "edit" || mode == "add") {
            cmpKorespondensiInfo.setValue(
              $this.renderKorespondensiTemplate(null)
            );
          }
        }
      });
    } else {
      $helper.hideComponent({
        parent: form,
        items: {
          sipas_com_button_correspondent: true,
          "#resetKorespondensi": true,
        },
      });
      cmpKorespondensiInfo.setValue($this.renderKorespondensiTemplate(null));
    }
  },

  renderKorespondensiTemplate: function (record) {
    var instansi_pengirim = record && record.get("surat_pengirim"),
      tujuan = record && record.get("surat_tujuan"),
      unit_pengirim = record && record.get("unit_source_nama"),
      surat_perihal = record && record.get("surat_perihal"),
      surat_nomor = record && record.get("surat_nomor"),
      nomor = record && record.get("korespondensi_nomor"),
      surat_model = record && record.get("surat_model"),
      in_pengirim =
        instansi_pengirim === null || instansi_pengirim === ""
          ? '<span class="alternative">(Tidak ada pengirim)</span>'
          : instansi_pengirim,
      un_pengirim =
        unit_pengirim === null || unit_pengirim === ""
          ? '<span class="alternative">(Tidak ada pengirim)</span>'
          : unit_pengirim,
      kores_surat_nomor =
        surat_nomor === null || surat_nomor === ""
          ? '<span class="alternative">(Tidak ada nomor)</span>'
          : "No.Surat: " + surat_nomor,
      kores_perihal =
        surat_perihal === null || surat_perihal === ""
          ? '<span class="alternative">(Tidak ada perihal)</span>'
          : surat_perihal,
      kores_nomor =
        nomor === null || nomor === ""
          ? '<span class="alternative">(Tidak ada nomor)</span>'
          : "No.Korespondensi: " + nomor;

    if (surat_model == 1) {
      kores_pengirim = "Dari: " + in_pengirim;
    } else if (surat_model == 2) {
      kores_pengirim = "Tujuan: " + tujuan;
    } else if (surat_model == 3) {
      kores_pengirim = "Dari: " + un_pengirim;
    } else if (surat_model == 4 || surat_model == 6) {
      kores_pengirim = "Tujuan: Internal";
    }

    if (record) {
      return new Ext.XTemplate([
        '<div style="display:flex"><div class="cell-visual cell-visual-left">',
        '<div class="img img-circle img-32">',
        '<i class="bigger-1-25 icon ion-md-link"></i>',
        "</div>",
        "</div>",
        '<div class="cell-text">',
        '<div class="subtext bold">{perihal}</div>',
        '<div class="subtext">{pengirim}</div>',
        '<div class="supporttext supporttext-dark margin-top-4">',
        '<span class="badge badge-outline badge-primary margin-right-8">',
        "{surat_nomor}",
        "</span>",
        '<span class="badge badge-outline margin-right-8">',
        "{nomor}",
        "</span>",
        "</div>",
        "</div></div>",
      ]).apply({
        perihal: kores_perihal,
        pengirim: kores_pengirim,
        surat_nomor: kores_surat_nomor,
        nomor: kores_nomor,
      });
    } else {
      return new Ext.XTemplate([
        '<div class="cell-visual cell-visual-left">',
        '<div class="img img-circle img-32">',
        '<i class="bigger-1-25 icon ion-md-link"></i>',
        "</div>",
        "</div>",
        '<div class="cell-text">',
        '<div class="subtext alternative margin-top-8">{message}</div>',
        "</div>",
      ]).apply({
        message: "(Tidak ada korespondensi)",
      });
    }
  },

  setKorespondensi: function (surat, form) {
    var hiddenfield = form.down("hiddenfield"),
      reset = form.down(
        "sipas_com_surat_korespondensi_pane #resetKorespondensi"
      ),
      koresp_nomor = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_nomor]"
      ),
      surat_korespondensi = form.down(
        "sipas_com_surat_korespondensi_pane [name=surat_korespondensi]"
      ),
      surat_nomor = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_surat_nomor]"
      ),
      kores_pengirim = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_pengirim]"
      ),
      kores_penerima = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_penerima]"
      ),
      kores_unitpenerima = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_unitpenerima]"
      ),
      kores_unitpengirim = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_unitpengirim]"
      ),
      perihal_koresp = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_surat_perihal]"
      ),
      cmpKorespondensiInfo = form.down(
        "sipas_com_surat_korespondensi_pane [name=korespondensi_info]"
      );

    if (surat == null) {
      reset.hide();
    } else {
      reset.show();
    }

    hiddenfield.setValue(surat && surat.get("surat_id"));
    koresp_nomor &&
      koresp_nomor.setValue(surat && surat.get("korespondensi_nomor"));
    surat_korespondensi &&
      surat_korespondensi.setValue(surat && surat.get("surat_korespondensi"));
    surat_nomor && surat_nomor.setValue(surat && surat.get("surat_nomor"));
    kores_penerima &&
      kores_penerima.setValue(surat && surat.get("surat_tujuan"));
    perihal_koresp &&
      perihal_koresp.setValue(surat && surat.get("surat_perihal"));
    kores_pengirim &&
      kores_pengirim.setValue(surat && surat.get("surat_pengirim"));
    kores_unitpengirim &&
      kores_unitpengirim.setValue(
        surat && surat.get("korespondensi_unitpengirim_nama")
      );
    cmpKorespondensiInfo.setValue(this.renderKorespondensiTemplate(surat));
  },

  onButtonKorespondensiClear_Click: function (button, e, eOpts) {
    var $this = this,
      $checkSession = $this.getApplication().getSession().getResetSession();

    $this.setKorespondensi(null, this.getMainview({ from: button }));
  },

  onButtonNomorSurat_Click: function (button, e, eOpts) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      mainview = $this.getMainview({ from: button }),
      form = $this.getForm({ root: mainview }),
      add = $this.getBtnAddPenyetuju({ root: mainview }),
      del = $this.getColumnDeletePenyetuju({ root: mainview }),
      up = $this.getColumnMoveUpPenyetuju({ root: mainview }),
      down = $this.getColumnMoveDownPenyetuju({ root: mainview }),
      addPetikan = $this.getBtnAddPetikan({ root: mainview }),
      delPetikan = $this.getColumnDeletePetikan({ root: mainview }),
      upPetikan = $this.getColumnMoveUpPetikan({ root: mainview }),
      downPetikan = $this.getColumnMoveDownPetikan({ root: mainview }),
      record = form && form.updateRecord().getRecord(),
      txtKetNomor = $this.getTxtKetNomor({ root: mainview }),
      btnNomor = $this.getBtnNomor({ root: mainview }),
      btnSalinNomor = $this.getBtnSalinNomor({ root: mainview }),
      cmpNomor = $this.getCmpNomor({ root: mainview }),
      jenis = $this.getCmpJenis({ root: mainview }),
      kelas = $this.getCmpKelas({ root: mainview }),
      btnHirarkiKelas = $this.getBtnHirarkiKelas({ root: mainview }),
      tanggal = $this.getCmpTanggal({ root: mainview }),
      controllerNomor = $this.getController($this.controllerNomor),
      panePenyetuju = mainview.down("#panePenyetuju"),
      panePenerima = mainview.down("#panePenerima"),
      storePenyetuju = panePenyetuju && panePenyetuju.getStore(),
      storePenerima = panePenerima && panePenerima.getStore(),
      $app = $this.getApplication(),
      $session = $app.getSession(),
      checkSession = $session.getResetSession(),
      stafId = $session.getProfileId(),
      jenis_isbatas = record.get("jenis_isbatas"),
      batas_jumlah = record.get("jenis_batas_jumlah"),
      penyetuju_terakhir = [],
      jabatan_ispenerima = [],
      params = {
        "py[]": [], //penyetuju
        "py_p[]": [], //penyetuju_profil
        "pn[]": [], //penerima
        "pn_p[]": [], //penerima_profil
        "t[]": [], //tembusan
        // 'b[]': [], //berkas
        temp: 1,
        sdoc: 1,
        check: 1,
      };

    if (mainview.mode == "view") {
      controllerNomor.launch({
        record: record,
        backdate: record.get("surat_nomor_backdate"),
        urut: record.get("surat_nomor_urut"),
        mode: "ubah",
        callback: function (success, record, operation) {
          mainview.mode = "edit";
          form.loadRecord(record);
          record.reload();
          if (record.get("surat_nomor")) {
            btnNomor && btnNomor.hide();
            if (btnSalinNomor) {
              btnSalinNomor && btnSalinNomor.hide();
            }
            txtKetNomor && txtKetNomor.hide();
            add && add.hide();
            del && del.hide();
            up && up.hide();
            down && down.hide();

            addPetikan && addPetikan.hide();
            delPetikan && delPetikan.hide();
            upPetikan && upPetikan.hide();
            downPetikan && downPetikan.hide();

            jenis && jenis.setReadOnly(true);
            kelas && kelas.setReadOnly(true);
            tanggal && tanggal.setReadOnly(true);
          } else {
            btnNomor && btnNomor.show();
            if (btnSalinNomor) {
              btnSalinNomor && btnSalinNomor.hide();
            }
            txtKetNomor && txtKetNomor.show();
            add && add.show();
            del && del.show();
            up && up.show();
            down && down.show();

            addPetikan && addPetikan.hide();
            delPetikan && delPetikan.hide();
            upPetikan && upPetikan.hide();
            downPetikan && downPetikan.hide();

            jenis && jenis.setReadOnly(false);
            kelas && kelas.setReadOnly(false);
            tanggal && tanggal.setReadOnly(false);
          }

          if (!record.get("surat_agenda")) {
            view.fireEvent("loadagenda", view);
          }
        },
      });
    } else {
      storePenyetuju &&
        storePenyetuju.each(function (r) {
          params["py[]"].push(r.get("staf_id"));
          penyetuju_terakhir.push(r.get("jabatan_isnomor"));
          if (r.get("surat_stack_profil")) {
            params["py_p[]"].push(r.get("surat_stack_profil"));
          } else {
            params["py_p[]"].push(r.get("staf_profil"));
          }
        });

      storePenerima &&
        storePenerima.each(function (r) {
          params["pn[]"].push(r.get("staf_id"));
          params["t[]"].push(r.get("surat_stack_istembusan"));
          // params['b[]'].push(r.get('surat_stack_isberkas'));
          if (r.get("surat_stack_profil")) {
            params["pn_p[]"].push(r.get("surat_stack_profil"));
          } else {
            params["pn_p[]"].push(r.get("staf_profil"));
          }
          if (!r.get("jabatan_ispenerima"))
            jabatan_ispenerima.push(r.get("jabatan_ispenerima"));
        });

      if (!params["py[]"].length) {
        $helper.showMsg({
          success: false,
          message: $this.getMessage("approver_empty"),
        });
        return;
      } else if (params["pn[]"].length > 50) {
        $helper.showMsg({
          title: "Info",
          message: $this.getMessage("receiver_limit"),
        });
        return;
      } else {
        hasil = penyetuju_terakhir.length;
        indeks = hasil - 1;
        penyetujuTerakhir = storePenyetuju && storePenyetuju.getAt(indeks);
        if (penyetujuTerakhir.get("jabatan_isnomor") == 0) {
          $helper.showMsg({
            success: false,
            message: $this.getMessage("invalid_jabatan"),
          });
          return;
        }
      }

      if (jenis_isbatas) {
        Ext.Ajax.request({
          url: $this.getApi("batasReupload"),
          params: {
            staf_id: stafId,
            jenis: record.get("surat_jenis"),
            unit: record.get("surat_unit"),
            model: record.get("surat_model"),
          },
          success: function (response, eOpts) {
            var objres = Ext.decode(response.responseText, true) || {};
            if (objres.count_surat >= batas_jumlah) {
              $helper.showMsg({
                success: false,
                message:
                  "Anda belum re-upload berkas disurat sebelumnya dengan jenis <b>" +
                  record.get("jenis_nama"),
              });
              return;
            } else {
              $helper.saveRecord({
                form: form,
                record: record,
                params: params,
                message: false,
                wait: true,
                callback: function (success, records, eOpts, response) {
                  if (success) {
                    controllerNomor.launch({
                      record: records,
                      mode: "ubah",
                      backdate: record.get("surat_nomor_backdate"),
                      urut: record.get("surat_nomor_urut"),
                      callback: function (success, records, operation) {
                        mainview.mode = "edit";
                        // form.loadRecord(records);
                        // records.reload();
                        if (records.get("surat_nomor")) {
                          cmpNomor.setValue(records.get("surat_nomor"));
                          btnNomor.hide();
                          if (btnSalinNomor) {
                            btnSalinNomor.hide();
                          }
                          btnHirarkiKelas && btnHirarkiKelas.hide();
                          txtKetNomor.hide();
                          add.hide();
                          del.hide();
                          up.hide();
                          down.hide();

                          addPetikan && addPetikan.hide();
                          delPetikan && delPetikan.hide();
                          upPetikan && upPetikan.hide();
                          downPetikan && downPetikan.hide();

                          jenis.setReadOnly(true);
                          kelas.setReadOnly(true);
                          tanggal.setReadOnly(true);
                        } else {
                          cmpNomor.setValue("");
                          btnNomor.show();
                          btnSalinNomor.show();
                          btnHirarkiKelas && btnHirarkiKelas.hide();
                          txtKetNomor.show();
                          add.show();
                          del.show();
                          up.show();
                          down.show();

                          addPetikan && addPetikan.hide();
                          delPetikan && delPetikan.hide();
                          upPetikan && upPetikan.hide();
                          downPetikan && downPetikan.hide();

                          jenis.setReadOnly(false);
                          kelas.setReadOnly(false);
                          tanggal.setReadOnly(false);
                        }

                        if (!records.get("surat_agenda")) {
                          view.fireEvent("loadagenda", view);
                        }
                      },
                    });
                  } else {
                    $helper.showMsg({
                      success: false,
                      message: "Anda tidak bisa backdate pada tanggal ini",
                    });
                  }
                },
              });
            }
          },
        });
      } else {
        $helper.saveRecord({
          form: form,
          record: record,
          params: params,
          message: false,
          wait: true,
          callback: function (success, records, eOpts, response) {
            if (success) {
              controllerNomor.launch({
                record: records,
                mode: "ubah",
                backdate: record.get("surat_nomor_backdate"),
                urut: record.get("surat_nomor_urut"),
                callback: function (success, records, operation) {
                  mainview.mode = "edit";
                  // form.loadRecord(records);
                  // records.reload();
                  if (records.get("surat_nomor")) {
                    cmpNomor.setValue(records.get("surat_nomor"));
                    btnNomor.hide();
                    if (btnSalinNomor) {
                      btnSalinNomor.hide();
                    }
                    btnHirarkiKelas && btnHirarkiKelas.hide();
                    txtKetNomor.hide();
                    add.hide();
                    del.hide();
                    up.hide();
                    down.hide();

                    addPetikan && addPetikan.hide();
                    delPetikan && delPetikan.hide();
                    upPetikan && upPetikan.hide();
                    downPetikan && downPetikan.hide();

                    jenis.setReadOnly(true);
                    kelas.setReadOnly(true);
                    tanggal.setReadOnly(true);
                  } else {
                    cmpNomor.setValue("");
                    btnNomor.show();
                    btnSalinNomor.show();
                    btnHirarkiKelas && btnHirarkiKelas.hide();
                    txtKetNomor.show();
                    add.show();
                    del.show();
                    up.show();
                    down.show();

                    addPetikan && addPetikan.hide();
                    delPetikan && delPetikan.hide();
                    upPetikan && upPetikan.hide();
                    downPetikan && downPetikan.hide();

                    jenis.setReadOnly(false);
                    kelas.setReadOnly(false);
                    tanggal.setReadOnly(false);
                  }

                  if (!records.get("surat_agenda")) {
                    view.fireEvent("loadagenda", view);
                  }
                },
              });
            } else {
              $helper.showMsg({
                success: false,
                message: "Anda tidak bisa backdate pada tanggal ini",
              });
            }
          },
        });
      }
    }
  },

  onButtonAktifasiSurat_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      mainview = $this.getMainview({ from: button }),
      form = $this.getForm({ root: mainview }),
      record = form && form.updateRecord().getRecord();
    controllerAktifasi = $this.getController($this.controllerAktifasi);

    controllerAktifasi.launch({
      record: record,
      mode: "ubah",
      callback: function (success, record, operation) {
        Ext.callback(mainview.callback, mainview, [true, record, eOpts]);
        form.loadRecord(record);
        record.reload();
        $this.renderRetensiTemplate(record, mainview);
      },
    });
  },

  onButtonPrintApproval_Click: function (button, e, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: button }),
      form = $this.getForm({ root: mainview }),
      viewer = $this.getView($this.viewViewer),
      record = form.getRecord();

    if (record) {
      link =
        window.location.href +
        $this.getApi("print_approval", { id: record.getId() });
      var view = viewer
        .create({
          modal: true,
          height: 600,
          width: 1024,
          maximizable: true,
        })
        .show()
        .load(link);
      view.setTitle("Cetak Lembar Persetujuan");
    }
  },

  launchExpedition: function (reference, onlaunch, scope) {
    scope = scope || this;
    onlaunch = onlaunch || Ext.emptyFn;

    var $this = this,
      valid = $this.validateReference(reference, true);

    Ext.callback(onlaunch, scope, [valid, reference, $this]);
    if (!valid) return;

    $this.getController($this.controllerEkspedisi).launch({
      mode: "view",
      reference: reference,
    });
  },

  onRadioTipe_Change: function (radiogroup, newValue, oldValue) {
    var $this = this,
      containerAtribut = $this.getContainerAtribut(),
      view = $this.getMainview({ from: radiogroup }),
      containerJenis = containerAtribut.down("#containerJenis"),
      containerAsal = containerAtribut.down("#containerAsal"),
      surat_tipe = radiogroup,
      tipevalue = surat_tipe.getValue(),
      value = tipevalue.surat_masuk_internal;

    switch (value) {
      case "0":
        /*external*/
        containerJenis.show();
        containerAsal.show();
        break;
      case "1":
        /*internal*/
        containerJenis.hide();
        containerAsal.hide();
        break;
    }

    if (view.mode == "add") {
      view.fireEvent("loadagenda", view);
    }
  },

  validateReference: function (reference, alert) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      isValid = reference instanceof $this.getModel($this.models[0]);

    if (!isValid && alert)
      $helper.showMsg({ success: false, message: $this.getMessage("invalid") });
    return isValid;
  },

  fetchSuratMasuk: function (recordSurat, view) {
    var $this = this,
      rec = {};
    if (recordSurat) {
      rec = {
        surat_korespondensi: recordSurat.get("surat_korespondensi"),
        surat_korespondensi_surat: recordSurat.get("surat_id"),
        korespondensi_kode: recordSurat.get("korespondensi_kode"),
        surat_perihal: recordSurat.get("surat_perihal"),
        surat_tujuan: recordSurat.get("surat_pengirim"),
        jenis_id: recordSurat.get("jenis_id"),
        sifat_id: recordSurat.get("sifat_id"),
        prioritas_id: recordSurat.get("prioritas_id"),
        media_id: recordSurat.get("media_id"),
        kelas_id: recordSurat.get("kelas_id"),
        lokasi_id: recordSurat.get("lokasi_id"),
      };
    } else {
      rec = {};
    }
    return rec;
  },

  onMainview_Close: function (mainview, eOpts) {
    var $this = this,
      form = $this.getForm({ root: mainview }),
      record = form && form.getRecord();

    if (!mainview.via_session) {
      record && record.reject();
      Ext.callback(mainview.callback, mainview.scope, [record]);
    } else if (mainview.via_session) {
      record && record.reject();
      Ext.callback(mainview.callback, mainview, [null, record, null]);
    }
  },

  // parent
  onComboDari_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) return;

    cmp.setLoading(true);

    if (record) {
      cmp.setLoading(false);
      cmp.setValue(record.get("surat_pengirim"));
    }
  },

  onComboUnitPengirim_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) {
      if (!record.get("unit_source_id")) {
        return;
      } else {
        record.set(cmp.getName(), record.get("unit_source_id"));
      }
    }

    cmp.setLoading(true);

    record.getSourceUnit(function (r) {
      cmp.setLoading(false);

      if (cmp.getStore().getCount()) {
        cmp.setValue(record.get("unit_source_id"));
      } else {
        cmp.setValue(r);
      }
    });
  },

  onComboParent_Focus: function (combobox, e, eOpts) {
    if (!combobox) return false;
    var store = combobox && combobox.getStore();

    // only load combo list when its not readonly and store is empty
    if (!combobox.readOnly && !store.getCount()) {
      store.removeFilter(true);
      store.load();
    }
  },

  onComboKepada_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) return;

    cmp.setLoading(true);

    if (record) {
      cmp.setLoading(false);
      cmp.setValue(record.get("surat_tujuan"));
    }
  },

  onDateField_LoadAssociate: function (record, form, cmp) {
    // cmp.maxValue = new Date();
    cmp.setMaxValue(new Date());
  },

  onComboUnit_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) {
      if (!record.get("unit_id")) {
        return;
      } else {
        record.set(cmp.getName(), record.get("unit_id"));
      }
    }

    cmp.setLoading(true);

    record.getUnit(function (r) {
      cmp.setLoading(false);

      if (cmp.getStore().getCount()) {
        cmp.setValue(record.get("unit_id"));
      } else {
        cmp.setValue(r);
      }
    });
  },

  onComboJenis_LoadAssociate: function (record, form, cmp) {
    // if(!record.get(cmp.getName())) return;
    if (!record.get(cmp.getName())) {
      if (!record.get("jenis_id")) {
        return;
      } else {
        record.set(cmp.getName(), record.get("jenis_id"));
      }
    }

    cmp.setLoading(true);
    record.getJenis(function (r) {
      cmp.setLoading(false);
      if (cmp.getStore().getCount()) {
        cmp.setValue(record.get("jenis_id"));
      } else {
        cmp.setValue(r);
      }
    });
  },

  onComboJenis_Select: function (combo, selection, eOpts) {
    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      $feature = $this.getController("Sipas.sistem.featureable.Feature"),
      jenisRetensi = $feature.getFeatureAccess("jenis_retensi"),
      booking_nomor = $app.LocalSetting().get("use_booking_nomor"),
      mainview = $this.getMainview({ from: combo }),
      form = $this.getForm({ root: mainview }),
      record = form && form.updateRecord().getRecord(),
      btnNomor = $this.getBtnNomor({ root: mainview }),
      btnSalinNomor = $this.getBtnSalinNomor({ root: mainview }),
      comboKelas = $this.getComboKelas({ root: mainview }),
      cmpRetensi = $this.getCmpRetensi({ root: mainview }),
      txtRetensi = $this.getTxtRetensi({ root: mainview }),
      cmpBackdatedInfo = $this.getCmpBackdatedInfo({ root: mainview }),
      model = record.get("surat_model"),
      surat_tanggal = new Date(
        Ext.Date.format(record.get("surat_tanggal"), "Y-m-d")
      ),
      pembuatan_tanggal = new Date(Ext.Date.format(new Date(), "Y-m-d")),
      value = combo.getValue();

    jenis_retensi = selection[0].get("jenis_retensi");
    jenis_nomor_awal = selection[0].get("jenis_nomor_awal");

    mainview.backdate = selection[0].get("jenis_batasibackdate");
    mainview.penerima = selection[0].get("jenis_batasipenerima");

    record.set({
      surat_jenis: selection[0].get("jenis_id"),
      jenis_id: selection[0].get("jenis_id"),
      jenis_nama: selection[0].get("jenis_nama"),
      jenis_kode: selection[0].get("jenis_kode"),
      jenis_isbatas: selection[0].get("jenis_isbatas"),
      jenis_batas_jumlah: selection[0].get("jenis_batas_jumlah"),
    });

    if (jenisRetensi) {
      txtRetensi.setLoading(true);
      if (jenis_retensi > 0) {
        cmpRetensi.setValue(true);
        txtRetensi.setValue(
          Ext.Date.add(new Date(), Ext.Date.DAY, jenis_retensi)
        );
      } else {
        cmpRetensi.setValue(false);
      }
      txtRetensi.setLoading(false);
    }

    if (
      !record.get("surat_nomor") &&
      (model == 2 || model == 4 || model == 6) &&
      booking_nomor
    ) {
      if (jenis_nomor_awal || jenis_nomor_awal == 1) {
        btnNomor && btnNomor.show();
        btnSalinNomor && btnSalinNomor.show();
      } else {
        btnNomor && btnNomor.hide();
        if (btnSalinNomor) {
          btnSalinNomor && btnSalinNomor.hide();
        }
      }
    }

    $this.onComboKelas_Load(mainview, value);

    if (model == 2 || model == 4 || model == 6) {
      if (!record.get("surat_nomor") && surat_tanggal < pembuatan_tanggal) {
        if (
          (model == 2 && !$session.getRuleAccess("keluar_backdate")) ||
          ((model == 4 || model == 6) &&
            !$session.getRuleAccess("surat_internal_keluar_backdate"))
        ) {
          if (!selection[0].get("jenis_batasibackdate")) {
            $helper.disableComponent({
              parent: mainview,
              items: {
                "#buttonSaveSend": false,
                "#simpanSetujui": false,
                "#btnNomorSurat": false,
                "#btnSalinNomor": false,
              },
            });
            $helper.hideComponent({
              parent: mainview,
              items: {
                "#infobackDate": true,
                "[name=surat_keluar_backdated_info]": false,
              },
            });
          } else {
            $helper.disableComponent({
              parent: mainview,
              items: {
                "#buttonSaveSend": true,
                "#simpanSetujui": true,
                "#btnNomorSurat": true,
                "#btnSalinNomor": true,
              },
            });
            $helper.hideComponent({
              parent: mainview,
              items: {
                "#infobackDate": false,
                "[name=surat_keluar_backdated_info]": false,
              },
            });
          }
        } else {
          $helper.disableComponent({
            parent: mainview,
            items: {
              "#buttonSaveSend": false,
              "#simpanSetujui": false,
              "#btnNomorSurat": false,
              "#btnSalinNomor": false,
            },
          });
          $helper.hideComponent({
            parent: mainview,
            items: {
              "#infobackDate": true,
              "[name=surat_keluar_backdated_info]": false,
            },
          });
        }
        cmpBackdatedInfo.setValue("*Surat ini menggunakan tanggal backdate");
      } else {
        $helper.disableComponent({
          parent: mainview,
          items: {
            "#buttonSaveSend": false,
            "#simpanSetujui": false,
            "#btnNomorSurat": false,
            "#btnSalinNomor": false,
          },
        });
        $helper.hideComponent({
          parent: mainview,
          items: {
            "#infobackDate": true,
            "[name=surat_keluar_backdated_info]": true,
          },
        });
      }
    }
  },

  onComboKelas_Load: function (mainview, value) {
    var $this = this,
      cmp = $this.getComboKelas({ root: mainview }),
      storeCmp = cmp.getStore(),
      proxy = storeCmp.getProxy();

    cmp.setValue(null);
    cmp.setLoading(true);
    storeCmp.removeAll();
    storeCmp.removeFilter();
    proxy.url = $this.getApi("kelas", { id: value });
    storeCmp.reload();
    cmp.setLoading(false);
  },

  onComboKelas_LoadAssociate: function (record, form, cmp) {
    // if(!record.get(cmp.getName())) return;

    if (!record.get(cmp.getName())) {
      if (!record.get("kelas_id")) {
        return;
      } else {
        record.set(cmp.getName(), record.get("kelas_id"));
      }
    }

    cmp.setLoading(true);

    record.getKelas(function (r) {
      cmp.setLoading(false);
      if (cmp.getStore().getCount()) {
        cmp.setValue(record.get("kelas_id"));
      } else {
        cmp.setValue(r);
      }
    });
  },

  onComboKelas_Select: function (combo, selection, eOpts) {
    var $this = this,
      form = $this.getForm({ root: mainview }),
      record = form && form.updateRecord().getRecord(),
      mainview = $this.getMainview({ from: combo }),
      comboKelas = $this.getComboKelas({ root: mainview }),
      cmpRetensi = $this.getCmpRetensi({ root: mainview }),
      txtRetensi = $this.getTxtRetensi({ root: mainview }),
      txtInaktif = $this.getTxtInaktif({ root: mainview }),
      btnNomor = $this.getBtnNomor({ root: mainview }),
      cmpNomor = $this.getCmpNomor({ root: mainview }),
      cmpNomorLama = $this.getCmpNomorLama({ root: mainview }),
      btnSalinNomor = $this.getBtnSalinNomor({ root: mainview }),
      value = combo.getValue(),
      kelas_retensi = selection[0].get("kelas_retensi"),
      kelas_limitdays = selection[0].get("kelas_limitdays");

    if (
      (record.get("surat_nomor") && record.get("surat_setuju") == 4) ||
      (record.get("surat_setuju") == 0 &&
        record.get("surat_nomor_urut") &&
        record.get("jenis_nomor_awal") == 1)
    ) {
      if (cmpNomorLama && record.get("surat_nomor")) {
        cmpNomorLama.show();
        cmpNomorLama.setValue(record.get("surat_nomor"));
      }
      cmpNomor.setValue(null);
      btnNomor.show();
      if (btnSalinNomor) {
        btnSalinNomor && btnSalinNomor.show();
      }
    }

    record.set("kelas_limitdays", kelas_limitdays);

    if (kelas_retensi > 0) {
      cmpRetensi.setValue(true);
      txtRetensi.setValue(
        Ext.Date.add(new Date(), Ext.Date.DAY, kelas_retensi)
      );
      txtInaktif.setValue(
        Ext.Date.add(new Date(), Ext.Date.DAY, kelas_retensi + kelas_limitdays)
      );
    } else {
      cmpRetensi.setValue(false);
    }
  },

  onComboSifat_LoadAssociate: function (record, form, cmp) {
    // if(!record.get(cmp.getName())) return;

    if (!record.get(cmp.getName())) {
      if (!record.get("sifat_id")) {
        return;
      } else {
        record.set(cmp.getName(), record.get("sifat_id"));
      }
    }

    cmp.setLoading(true);

    record.getSifat(function (r) {
      cmp.setLoading(false);
      cmp.setValue(r);
    });
  },

  onComboPrioritas_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) return;

    cmp.setLoading(true);

    record.getPrioritas(function (r) {
      cmp.setLoading(false);
      cmp.setValue(r);
    });
  },

  onComboMedia_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) return;

    cmp.setLoading(true);

    record.getMedia(function (r) {
      cmp.setLoading(false);
      cmp.setValue(r);
    });
  },

  onComboLokasi_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) return;

    cmp.setLoading(true);

    record.getLokasi(function (r) {
      cmp.setLoading(false);
      cmp.setValue(r);
    });
  },

  onComboSifat_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      cmpRahasia = $this.getCmpRahasia({ root: mainview }),
      value = combo.getValue();

    rahasia = selection[0].get("sifat_israhasia");

    if (rahasia || rahasia == 1) {
      cmpRahasia.setValue(true);
    } else {
      cmpRahasia.setValue(false);
    }
  },

  onComboPrioritas_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      cmpPrioritasTgl = $this.getCmpPrioritasTgl({ root: mainview }),
      form = $this.getForm({ root: mainview }),
      record = form.getRecord(),
      store = combo.getStore(),
      value = combo.getValue(),
      tgl = record.get("surat_properti_buat_tgl") || new Date(),
      hari = Ext.Date.add(
        tgl,
        Ext.Date.DAY,
        selection[0].get("prioritas_retensi")
      );

    cmpPrioritasTgl && cmpPrioritasTgl.setValue(hari);
  },

  onButtonExpedition_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      $app = $this.getApplication(),
      mode = view.mode,
      $helper = $app.Helper(),
      record = form.getRecord(),
      model = record.get("surat_model"),
      controllerEkspedisi = $this.getController($this.controllerEkspedisi);

    if (model == "2") {
      Ext.Ajax.request({
        url: "server.php/sipas/surat_ekspedisi/checkTembusan",
        params: {
          id: record.get("surat_id"),
        },
        success: function (response, eOpts) {
          var objres = Ext.decode(response.responseText, true) || {};
          if (objres.exist == 0) {
            $helper.showMsg({
              success: false,
              message:
                "Tidak dapat melacak penerima tembusan, surat ini tidak memiliki penerima tembusan",
            });
            return;
          } else {
            controllerEkspedisi.launch({
              record: record,
              mode: mode,
              callback: function (success) {
                Ext.callback(view.callback, view, [success, record, eOpts]);
                view.close();
              },
            });
          }
        },
      });
    } else {
      controllerEkspedisi.launch({
        record: record,
        mode: mode,
        callback: function (success) {
          Ext.callback(view.callback, view, [success, record, eOpts]);
          view.close();
        },
      });
    }
  },

  onButtonKorespondensi_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form.getRecord(),
      controllerKorespondesi = $this.getController(
        $this.controllerKorespondesi
      ),
      controllerKorespondesiInternal = $this.getController(
        $this.controllerKorespondesiInternal
      );

    record.getKorespondensi(function (korespondensi) {
      if (korespondensi.get("korespondensi_isinternal")) {
        controllerKorespondesiInternal.launch({
          record: korespondensi,
          callback: function (success) {},
        });
      } else {
        controllerKorespondesi.launch({
          record: korespondensi,
          callback: function (success) {},
        });
      }
    });
  },

  onButtonReset_Click: function (button, e, eOpts) {
    // var $this = this,
    //     view = $this.getMainview({from:button}),
    //     form = $this.getForm({root:view}),
    //     record = form.getRecord(),
    //     controllerKorespondesi = $this.getController($this.controllerKorespondesi);
    // record.getKorespondensi(function(korespondensi){
    //     if(korespondensi){
    //         controllerKorespondesi.launch({
    //             record: korespondensi,
    //             callback: function(success){
    //             }
    //         });
    //     }
    // });
  },

  onCheckboxRetensi_Change: function (checkbox, newValue, oldValue, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: checkbox }),
      form = $this.getForm({ root: mainview }),
      record = form && form.updateRecord().getRecord(),
      txtRetensi = $this.getTxtRetensi({ root: mainview });

    if (!record.get("surat_retensi_tgl")) {
      txtRetensi.setValue(Ext.Date.add(new Date(), Ext.Date.DAY, 30));
    }
  },

  onRetensi_Change: function (checkbox, newValue, oldValue, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: checkbox }),
      form = $this.getForm({ root: mainview }),
      record = form.getRecord(),
      txtInaktif = $this.getTxtInaktif({ root: mainview }),
      txtRetensi = $this.getTxtRetensi({ root: mainview });

    if (record) {
      kelas_limitdays = record.get("kelas_limitdays");
      txtInaktif.setValue(
        Ext.Date.add(new Date(newValue), Ext.Date.DAY, kelas_limitdays)
      );
    }
  },

  onRadioJenisPengiriman_Change: function (radio, newValue, oldValue, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: radio }),
      //   record = form.getRecord(),
      radio = $this.getRadioJenisPengiriman({ root: mainview }),
      value = radio.getValue();
    //   txtPengiriman = $this.getTxtPengiriman({ root: mainview });

    /*
     * by alfrizal 12 may 2020
     * jika mode add dan edit maka tampilkan pane
     */
    const mode = ["add", "edit"];
    mainview.mode;
    if (mode.includes(mainview.mode)) {
      if (newValue.surat_keluar_type == "1") {
        //* jika jenis pengiriman surat keluar adalah dalam perusahaan, maka..
        $this.getPanePenerimaKeluar({ root: mainview }).show();
      } else {
        $this.getPanePenerimaKeluar({ root: mainview }).hide();
      }
    }
  },

  onRetensiPane_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      form = $this.getForm({ root: mainview }),
      record = form.getRecord(),
      store = combo.getStore(),
      value = combo.getValue(),
      txtInaktif = $this.getTxtInaktif({ root: mainview }),
      txtRetensi = $this.getTxtRetensi({ root: mainview }),
      kelas_limitdays = record.get("kelas_limitdays"),
      jumlah_hari = selection[0].get("retensi_hari") + kelas_limitdays;

    txtInaktif.setValue(Ext.Date.add(new Date(), Ext.Date.DAY, jumlah_hari));
  },

  onButtonDistribusi_Click: function (button, e, eOpts) {
    var $this = this,
      $app = $this.getApplication(),
      $session = $app.getSession(),
      $checkSession = $session.getResetSession(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      property = $this.getController($this.controllerDistribusi),
      // propertyJabatan = $this.getController($this.controllerDistribusiJabatan),
      record = form && form.updateRecord().getRecord(),
      model = record.get("surat_model"),
      model_sub = record.get("surat_model_sub")
        ? record.get("surat_model_sub")
        : 0,
      recordForward = $this.getModel($this.modelDisposisi).create({
        disposisi_tgl: new Date(),
        disposisi_staf: $session.getProfile().staf_id,
        disposisi_surat: record.get("surat_id"),
        disposisi_pengirim_id: $session.getProfile().staf_id,
        disposisi_pengirim_nama: $session.getProfile().staf_nama,
        disposisi_pengirim_unit_nama: $session.getProfile().unit_nama,
        disposisi_pelaku: $session.getProfile().staf_id,
        disposisi_pelaku_id: $session.getProfile().staf_id,
        disposisi_pelaku_nama: $session.getProfile().staf_nama,
        disposisi_pelaku_unit_nama: $session.getProfile().unit_nama,
        surat_id: record.get("surat_id"),
        surat_agenda: record.get("surat_agenda"),
        surat_nomor: record.get("surat_nomor"),
        surat_model: record.get("surat_model"),
        surat_model_sub: record.get("surat_model_sub"),
      });

    // if(model_sub == 2) {
    property.launch({
      mode: "distribusi",
      record: recordForward,
      surat: record,
      selfAsPenerima: record,
      callback: function (success) {
        view.close();
      },
    });
    // } else {
    //     propertyJabatan.launch({
    //         mode: 'distribusi',
    //         record: recordForward,
    //         surat: record,
    //         selfAsPenerima:record,
    //         callback: function(success){
    //             view.close();
    //         }
    //     });
    // }
  },

  onButtonViewLog_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form.getRecord(),
      controllerLog = $this.getController($this.controllerLog);

    view.setLoading(true);
    controllerLog.launch({
      mode: "view",
      record: record,
    });
    view.setLoading(false);
  },

  onRetensiPane_LoadAssociate: function (record, form, cmp) {
    var $this = this,
      mainview = $this.getMainview({ from: cmp }),
      $app = $this.getApplication(),
      $session = $app.getSession(),
      $helper = $app.Helper();

    $this.renderRetensiTemplate(record, mainview);
  },

  onPrioritasText_LoadAssociate: function (record, form, cmp) {
    var $this = this,
      mainview = $this.getMainview({ from: cmp }),
      $app = $this.getApplication(),
      $session = $app.getSession(),
      $helper = $app.Helper();

    $this.renderPrioritasTemplate(record, mainview);
  },

  renderRetensiTemplate: function (record, mainview) {
    var $this = this,
      $app = $this.getApplication(),
      $session = $app.getSession(),
      $helper = $app.Helper(),
      useretensi = record.get("surat_useretensi"),
      retensi_tgl = record.get("surat_retensi_tgl"),
      inaktif_tgl = record.get("surat_inaktif_tgl"),
      txtRetensi = $this.getTextRetensi({ root: mainview }),
      word = "",
      color = "grey-700-i",
      icon_color = "grey-700-i",
      bg_color = "",
      tpl = new Ext.XTemplate([
        '<div class="margin-left-4"><div class="cell-visual cell-visual-left">',
        '<div class="img img-circle img-32 {bg_color}">',
        '<i class="bigger-1-25 icon ion-md-calendar {icon_color}"></i>',
        "</div>",
        "</div>",
        '<div class="cell-text">',
        '<div class="subtext {color}">{word}</div>',
        '<div class="supporttext {color}">{tgl_aktif}</div>',
        '<div class="supporttext {color}">{tgl_inaktif}</div>',
        "</div></div>",
      ]);

    if (
      mainview.mode == "lihat" ||
      mainview.mode == "view" ||
      mainview.mode == "bank" ||
      mainview.mode == "notif"
    ) {
      if (useretensi) {
        var tanggal = new Date(),
          tanggal_display = Ext.util.Format.date(retensi_tgl, "d M Y");
        inaktif_display = Ext.util.Format.date(inaktif_tgl, "d M Y");

        if (retensi_tgl) {
          retensi_tgl && retensi_tgl.setHours(0, 0, 0, 0);
        }
        if (inaktif_tgl) {
          inaktif_tgl && inaktif_tgl.setHours(0, 0, 0, 0);
        }
        if (tanggal) {
          tanggal && tanggal.setHours(0, 0, 0, 0);
        }
        var isretensi = retensi_tgl < tanggal ? 1 : 0,
          is_inaktif = inaktif_tgl < tanggal ? 1 : 0,
          selisih = (retensi_tgl - tanggal) / 1000,
          hasil = Math.floor(selisih / 86400);

        if (is_inaktif) {
          word = "Telah melewati masa inaktif";
          bg_color = "";
          icon_color = "grey-600-i";
          color = "alternative";
        } else if (isretensi) {
          word = "Masa aktif surat sudah terlewat " + Math.abs(hasil) + " hari";
          bg_color = "";
          icon_color = "grey-600-i";
          color = "alternative";
        } else {
          if (selisih === 0) {
            word = "Masa aktif surat sampai hari ini";
            bg_color = "bg-red-700-i";
            icon_color = "grey-100-i";
            color = "red-700-i";
          } else {
            word = "Masa aktif surat kurang " + hasil + " hari lagi";
            bg_color = "";
            icon_color = "grey-600-i";
            color = "";

            if (hasil <= 7) {
              word = "Masa aktif surat kurang " + hasil + " hari lagi";
              bg_color = "bg-yellow-700-i";
              icon_color = "grey-100-i";
              color = "yellow-700-i";
            }
            if (hasil <= 3) {
              word = "Masa aktif surat kurang " + hasil + " hari lagi";
              bg_color = "bg-orange-700-i";
              icon_color = "grey-100-i";
              color = "orange-700-i";
            }
            if (hasil === 1) {
              word = "Masa aktif surat kurang " + hasil + " hari lagi";
              bg_color = "bg-red-700-i";
              icon_color = "grey-100-i";
              color = "red-700-i";
            }
          }
        }
        if (inaktif_display) {
          tgl_inaktif = "Masa inaktif berakhir pada: " + inaktif_display;
        } else {
          tgl_inaktif = "";
        }

        $helper.hideComponent({
          parent: mainview,
          items: {
            "#txtRetensi": false,
            "#containerRetensi": true,
            "#containerInaktif": true,
          },
        });
        txtRetensi.setValue(
          tpl.apply({
            bg_color: bg_color,
            icon_color: icon_color,
            color: color,
            word: word,
            tgl_aktif: "Masa aktif berakhir pada: " + tanggal_display,
            tgl_inaktif: tgl_inaktif,
          })
        );
      }
    } else {
      $helper.hideComponent({
        parent: mainview,
        items: {
          "#txtRetensi": true,
          "#containerRetensi": false,
          "#containerInaktif": false,
        },
      });
    }
  },

  renderPrioritasTemplate: function (record, mainview) {
    var $this = this,
      $app = $this.getApplication(),
      $session = $app.getSession(),
      $helper = $app.Helper(),
      txtPrioritas = $this.getTextPrioritas({ root: mainview }),
      useprioritas = record.get("surat_prioritas"),
      prioritas_tgl = record.get("surat_prioritas_tgl"),
      is_selesai = record.get("surat_isselesai"),
      icon = "ion-md-alert",
      text_color = "grey-700-i",
      word = "",
      tgl = "",
      icon_color = "grey-700-i",
      tpl = new Ext.XTemplate([
        '<div class="margin-left-4 margin-bottom-12"><div class="cell-visual cell-visual-left">',
        '<i class="bigger-2-25 icon {icon} {icon_color}"></i>',
        "</div>",
        '<div class="cell-text">',
        '<div class="supporttext {text_color}">{word}</div>',
        '<div class="supporttext {text_color}">{tgl}</div>',
        "</div></div>",
      ]);

    if (
      mainview.mode == "lihat" ||
      mainview.mode == "view" ||
      mainview.mode == "bank" ||
      mainview.mode == "notif"
    ) {
      if (useprioritas !== null && prioritas_tgl) {
        var tanggal = new Date(),
          tanggal_selesai_display = Ext.util.Format.date(
            record.get("surat_selesai_tgl"),
            "d M Y H:i"
          ),
          tanggal_display = Ext.util.Format.date(prioritas_tgl, "d M Y");

        if (prioritas_tgl) {
          prioritas_tgl.setHours(0, 0, 0, 0);
        }
        if (tanggal) {
          tanggal.setHours(0, 0, 0, 0);
        }
        var isprioritas = prioritas_tgl < tanggal ? 1 : 0,
          selisih = (prioritas_tgl - tanggal) / 1000,
          hasil = Math.floor(selisih / 86400);

        if (!isprioritas) {
          if (is_selesai == "1") {
            // word = 'Prioritas surat selesai';
            // icon_color = 'green-700-i';
            // icon = 'ion-md-checkmark';
            // text_color = '';
            // tgl = 'Pada '+tanggal_selesai_display;
            $helper.hideComponent({
              parent: mainview,
              items: {
                "#txtPrioritas": true,
              },
            });
            return; // please don't remove this if #txtPrioritas hide = true (above)
          } else {
            word = "Prioritas surat kurang " + hasil + " hari lagi";
            icon_color = "grey-700-i";
            text_color = "alternative";
            tgl = "Berakhir pada: " + tanggal_display;

            if (hasil <= 7) {
              word = "Prioritas surat kurang " + hasil + " hari lagi";
              icon_color = "yellow-700-i";
              text_color = "yellow-700-i";
            }
            if (hasil <= 3) {
              word = "Prioritas surat kurang " + hasil + " hari lagi";
              icon_color = "orange-700-i";
              text_color = "orange-700-i";
            }
            if (hasil === 1) {
              word = "Prioritas surat kurang " + hasil + " hari lagi";
              icon_color = "red-700-i";
              text_color = "red-700-i";
            }
            if (hasil === 0) {
              word = "Prioritas surat sampai hari ini";
              icon_color = "red-700-i";
              text_color = "red-700-i";
            }
          }
        } else {
          var selisih = (tanggal - prioritas_tgl) / 1000,
            hasil = Math.floor(selisih / 86400);

          if (is_selesai == "1") {
            // word = 'Prioritas surat selesai';
            // icon_color = 'green-700-i';
            // icon = 'ion-md-checkmark';
            // text_color = 'green-700-i';
            // tgl = 'Pada '+tanggal_selesai_display;
            $helper.hideComponent({
              parent: mainview,
              items: {
                "#txtPrioritas": true,
              },
            });
            return; // please don't remove this if #txtPrioritas hide = true (above)
          } else {
            tgl = "Berakhir pada: " + tanggal_display;
            if (selisih === 0) {
              word = "Prioritas surat sampai hari ini";
              icon_color = "red-700-i";
              text_color = "red-700-i";
            } else {
              word =
                "Prioritas surat sudah terlewat " + Math.abs(hasil) + " hari";
              icon_color = "red-700-i";
              text_color = "red-700-i";
            }
          }
        }
        $helper.hideComponent({
          parent: mainview,
          items: {
            "#txtPrioritas": false,
          },
        });
        txtPrioritas.setValue(
          tpl.apply({
            icon_color: icon_color,
            word: word,
            icon: icon,
            text_color: text_color,
            tgl: tgl,
          })
        );
      } else {
        // var selisih = (tanggal-prioritas_tgl)/1000,
        //     hasil = Math.floor(selisih/(86400)),
        //     tanggal_selesai_display = Ext.util.Format.date(record.get('surat_selesai_tgl'), 'd M Y H:i');

        // if(is_selesai == '1'){
        //     word = 'Prioritas surat selesai';
        //     icon_color = 'green-700-i';
        //     icon = 'ion-md-checkmark';
        //     text_color = 'green-700-i';
        //     tgl = 'Pada '+tanggal_selesai_display;

        //     $helper.hideComponent({
        //         parent: mainview,
        //         items:{
        //             '#txtPrioritas': false
        //         }
        //     });
        //     txtPrioritas.setValue(tpl.apply({
        //         icon_color: icon_color,
        //         word: word,
        //         icon: icon,
        //         text_color: text_color,
        //         tgl: tgl
        //     }));
        // } else {
        $helper.hideComponent({
          parent: mainview,
          items: {
            "#txtPrioritas": true,
          },
        });
        // }
      }
    } else {
      $helper.hideComponent({
        parent: mainview,
        items: {
          "#txtPrioritas": true,
        },
      });
    }
  },
});
