Ext.define("SIPAS.controller.Sipas.koreksi.session.List", {
  extend: "SIPAS.controller.Sipas.base.Base",

  stores: [
    // 'Sipas.koreksi.session.List',
    "Sipas.koreksi.session.draf.List",
    "Sipas.koreksi.session.blmtindak.List",
    "Sipas.koreksi.session.setuju.List",
    "Sipas.koreksi.session.tolak.List",
  ],

  models: [
    "Sipas.koreksi.Masuk",
    "Sipas.Surat",
    "Sipas.disposisi.masuk.Log" /*please do not remove, for list render*/,
  ],

  views: ["Sipas.koreksi.session.List"],

  refs: [
    { ref: "mainview", selector: "sipas_koreksi_session_list" },
    {
      ref: "compApprovalInfo",
      selector: "sipas_koreksi_session_list sipas_konsep_info_pane",
    },
    {
      ref: "compApprovalDetail",
      selector:
        "sipas_koreksi_session_list sipas_surat_penyetujuan_detail_pane",
    },
    { ref: "compInfo", selector: "sipas_koreksi_session_list #groupInfo" },
    { ref: "status", selector: "sipas_koreksi_session_list #Status" },
    {
      ref: "statusKoreksi",
      selector: "sipas_koreksi_session_list #statusKoreksi",
    },
    { ref: "tipeSurat", selector: "sipas_koreksi_session_list #tipe_surat" },
  ],

  messages: {
    approving: "Memproses penyetujuan surat",
    approval_failure: "Gagal menyetujui surat. Surat tidak tersedia.",
    approval_success: "Berhasil menyetujui surat.",
  },

  controllerProperty: "Sipas.koreksi.session.Prop",

  modelDefault: "Sipas.koreksi.Masuk",
  modelSurat: "Sipas.Surat",

  lgDrafAll: "cmb_draf_all",
  lgDrafBlmTindak: "cmb_draf_blm_tindaklanjut",
  lgDrafSetuju: "cmb_draf_setuju",
  lgDrafTolak: "cmb_draf_tolak",

  _clicks: 0,

  init: function (application) {
    this.control({
      "sipas_koreksi_session_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      sipas_koreksi_session_list: {
        doreload: this.onMainview_DoReload,
        afterrender: this.onMainview_AfterRender,
        selectionchange: this.onGridpanel_SelectionChange,
      },
      "sipas_koreksi_session_list[clickToView=true]": {
        itemclick: this.onMainview_ClickShow,
      },
      "sipas_koreksi_session_list[dbclickToView=true]": {
        itemdblclick: this.onMainview_DoubleClickShow,
      },
      "sipas_koreksi_session_list #Status": {
        select: this.onComboStatus_Select,
      },
      "sipas_koreksi_session_list #tipe_surat": {
        select: this.onComboTipeSurat_Select,
      },
    });
  },

  launch: function (config) {
    var $this = this,
      view = $this.createView(config),
      comboTipeSurat = $this.getTipeSurat({ root: view });
    comboTipeSurat.setValue(0);

    if (view) {
      view.on("afterrender", function () {
        $this.refresh(view);
      });
    }

    return view;
  },

  onMainview_DoReload: function (mainview) {
    this.refresh(mainview);
  },

  onMainview_AfterRender: function (mainview, eOpts) {
    var $checkSession = this.getApplication().getSession().getResetSession(),
      storeCombo = [
        {
          value: 0,
          nama: null,
          featureable: false,
          featureName: null,
          roleable: false,
          roleName: null,
          languageable: true,
          languageCode: this.lgDrafAll,
        },
        {
          value: 1,
          nama: null,
          featureable: false,
          featureName: null,
          roleable: false,
          roleName: null,
          languageable: true,
          languageCode: this.lgDrafBlmTindak,
        },
        {
          value: 2,
          nama: null,
          featureable: false,
          featureName: null,
          roleable: false,
          roleName: null,
          languageable: true,
          languageCode: this.lgDrafSetuju,
        },
        {
          value: 3,
          nama: null,
          featureable: false,
          featureName: null,
          roleable: false,
          roleName: null,
          languageable: true,
          languageCode: this.lgDrafTolak,
        },
      ];

    var $this = this,
      $app = $this.getApplication(),
      $language = $app.Language(),
      storeComboList = Ext.clone(storeCombo),
      isAsistensi = mainview.isAsistensi;

    Ext.each(
      storeComboList,
      function (item, index, all) {
        if (item.languageable) {
          var grammar = $language.getGrammar(item.languageCode, false);
          item.nama = grammar;
        }
      },
      this,
      true
    );

    var cmbTipeSurat = $this.getTipeSurat({ root: mainview });
    if (!isAsistensi) {
      var cmbStatus = $this.getStatus({ root: mainview }),
        comboStore = cmbStatus.getStore();

      comboStore.getProxy().data = storeComboList;
      cmbStatus.setValue($language.getGrammar($this.lgDrafAll, false));
    }
    cmbTipeSurat.setValue(0);
  },

  onComboStatus_Select: function (combo, selection, eOpts) {
    var $this = this,
      $checkSession = this.getApplication().getSession().getResetSession(),
      value = combo.getValue(),
      mainview = $this.getMainview({ from: combo }),
      tipe_surat = $this.getStatus({ root: mainview }).getValue(),
      store = mainview.getStore();
    $this.updateList(value, tipe_surat, mainview);
  },

  onComboTipeSurat_Select: function (combo, selection, eOpts) {
    var $this = this,
      $checkSession = this.getApplication().getSession().getResetSession(),
      value = combo.getValue(),
      mainview = $this.getMainview({ from: combo }),
      status = $this.getStatus({ root: mainview }).getValue(),
      store = mainview.getStore();
    $this.updateList(status, value, mainview);
  },

  updateList(status, tipe_surat, mainview) {
    var $this = this,
      $checkSession = this.getApplication().getSession().getResetSession(),
      store = mainview.getStore();

    switch (status) {
      // Belum Tindak Lanjut
      case 1:
        store.removeAll();
        store.getProxy().url =
          "server.php/sipas/draft/blmtindak?tipe_surat=" + tipe_surat;
        break;

      // Setuju
      case 2:
        store.removeAll();
        store.getProxy().url =
          "server.php/sipas/draft/setuju?tipe_surat=" + tipe_surat;
        break;

      // Tolak
      case 3:
        store.removeAll();
        store.getProxy().url =
          "server.php/sipas/draft/tolak?tipe_surat=" + tipe_surat;
        break;

      // Semua
      default:
        store.removeAll();
        store.getProxy().url =
          "server.php/sipas/draft/read?tipe_surat=" + tipe_surat;
        break;
    }

    mainview.down("pagingtoolbar").moveFirst();
    // store.reload();
  },

  refresh: function (mainview) {
    var view = mainview || this.getMainview(),
      $this = this,
      $app = $this.getApplication(),
      $session = $app.getSession(),
      pagingtoolbar = view.down("pagingtoolbar"),
      newStore = view.getStore();

    /*changing paging toolbar store based on mainview's store*/
    pagingtoolbar.bindStore(newStore);
    newStore.load({
      callback: function (record, operation, success) {
        var objres = Ext.decode(operation.response.responseText, true) || {};
        view.getSelectionModel().deselectAll();
        view.fireEvent(
          "selectionchange",
          view,
          view.getSelectionModel().getSelection()
        );
      },
    });
  },

  onMainview_ClickShow: function (model, selected, eOpts) {
    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      $checkSession = $session.getResetSession(),
      $pengaturan = $app.LocalSetting(),
      asistensi_baca = $pengaturan.get("asistensi_baca_action"),
      view = $this.getMainview({ from: model.view }),
      record = selected,
      controllerProperty = $this.getController($this.controllerProperty),
      statusBaca = record.get("disposisi_masuk_baca_tgl"),
      statusPenyetujuan = record.get("disposisi_masuk_status"),
      mode = "",
      log = $this.getModel($this.models[2]).create({});

    // sudah dicoba pakai event itemdblclick dan sudah di return false,
    // tetap saja masih membuka 2 prop dan mendapat error
    $this._clicks++;
    if ($this._clicks <= 1) {
      if (record.get("disposisi_masuk_ispengingat")) {
        log.ingatkan({
          staf: $session.getProfile().staf_id,
          masuk: record.get("disposisi_masuk_id"),
          callback: function (staf, operation, success) {
            if (success) {
              $this.refresh(view);
            }
          },
        });
      }
      if (record.get("disposisi_masuk_isbaca") === 1) {
        log.reading({
          staf: $session.getProfile().staf_id,
          masuk: record.get("disposisi_masuk_id"),
          callback: function (staf, operation, success) {
            if (success) {
              $this.refresh(view);
            }
          },
        });
      } else {
        record.reading({
          staf: $session.getProfile().staf_id,
          callback: function (staf, operation, success) {
            if (success) {
              $this.refresh(view);
            }
          },
        });
      }

      if (record) {
        if (statusPenyetujuan) {
          mode = "view";
        } else {
          mode = "edit";
        }
        controllerProperty.launch({
          mode: mode,
          record: record,
          callback: function (success, record) {
            if (success && view) {
              $this.refresh(view);
            }
            $this._clicks = 0;
          },
        });
      }
    }
  },

  onMainview_DoubleClickShow: function (model, selected, eOpts) {
    return false;
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var mainview = this.getMainview({ from: button }),
      $checkSession = this.getApplication().getSession().getResetSession();

    this.refresh(mainview);
  },

  onGridpanel_SelectionChange: function (model, selected, eOpts) {},
});
