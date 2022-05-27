Ext.define("SIPAS.controller.Sipas.pelaporan.internal.masuk.tolak.semua.Pane", {
  extend: "SIPAS.controller.Sipas.base.Base",

  views: ["Sipas.pelaporan.internal.masuk.tolak.semua.Pane"],

  stores: ["Sipas.unit.Combo"],

  api: {
    url: "server.php/sipas/surat_imasuk/internal_report_tolak_semua?tipe={tipe}&unit={unit}&internal=Internal&filter={filter}&value={value}&download={download}&excel={excel}&title={title}",
  },

  messages: {
    date_invalid: "<b>Tanggal</b> tidak boleh kosong",
  },

  refs: [
    {
      ref: "mainview",
      selector: "sipas_pelaporan_internal_masuk_tolak_semua_pane",
    },
    {
      ref: "compFilter",
      selector:
        "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_reportfilter_internal",
    },
    {
      ref: "cmpFrame",
      selector: "sipas_pelaporan_internal_masuk_tolak_semua_pane #Iframe",
    },
    {
      ref: "cmpUnit",
      selector:
        "sipas_pelaporan_internal_masuk_tolak_semua_pane combobox#comboUnit",
    },
    {
      ref: "cmpBagian",
      selector:
        "sipas_pelaporan_internal_masuk_tolak_semua_pane combobox#comboBagian",
    },
    {
      ref: "cmpStaf",
      selector:
        "sipas_pelaporan_internal_masuk_tolak_semua_pane combobox#comboStaf",
    },
    {
      ref: "cmpFilter",
      selector:
        "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_reportfilter_internal #comboFilter",
    },
    {
      ref: "cmpTipe",
      selector:
        "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_reportfilter_internal #comboTipeInternal",
    },
  ],

  defaultStore: "Sipas.unit.Combo",

  init: function (application) {
    this.control({
      sipas_pelaporan_internal_masuk_tolak_semua_pane: {
        show: this.onMainview_Show,
      },
      "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_reportfilter_internal":
        {
          process: this.onFilter_Process,
        },
      "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_button_refresh":
        {
          click: this.onButtonRefresh_Click,
        },
      "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_button_print":
        {
          click: this.onButtonPrint_Click,
        },
      "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_button_download#btnDownloadPdf":
        {
          click: this.onButtonDownload_Click,
        },
      "sipas_pelaporan_internal_masuk_tolak_semua_pane sipas_com_button_download#btnDownloadExcel":
        {
          click: this.onButtonDownloadExcel_Click,
        },
      "sipas_pelaporan_internal_masuk_rekap_pane combobox#comboUnit": {
        afterrender: this.onComboUnit_AfterRender,
      },
    });
  },

  launch: function (config) {
    var $this = this,
      storeDep = $this.getStore($this.defaultStore),
      view = $this.createView(config);

    if (view) {
      view.on("afterrender", function () {
        storeDep.reload();
      });
    }
    return view;
  },

  onMainview_Show: function (mainview) {
    $this = this;
    $this.getCmpBagian().hide();
    $this.getCmpStaf().hide();
    $this.getCmpTipe().hide();
  },

  onFilter_Process: function (component, filter, value, e, eOpts) {
    var view = this.getMainview({ from: component }),
      compTipe = this.getCmpTipe({ root: view }),
      tipe = compTipe.getValue();

    if (tipe === null) {
      tipe = 0;
    }

    this.frameLoad(tipe, filter, value, view);
  },
  frameLoad: function (tipe, filter, value, view) {
    var unit = this.getCmpUnit({ root: view }).getValue(),
      filterContainer = this.getCompFilter({ root: view }),
      iframe = this.getCmpFrame({ root: view }),
      url = this.getApi("url", {
        unit: unit,
        filter: filter,
        value: filter == "daterange" ? value.join("|") : value,
        title: btoa(view.title),
      });

    if (!filter) {
      iframe.load(url);
    } else {
      if (!value || (filter === "daterange" && (!value[0] || !value[1]))) {
        $helper.showMsg({
          success: false,
          message: this.getMessage("date_invalid"),
        });
      } else {
        iframe.load(url);
      }
    }
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var view = this.getMainview({ from: button }),
      iframe = this.getCmpFrame({ root: view });

    iframe.reload();
  },

  onButtonPrint_Click: function (button, e, eOpts) {
    var view = this.getMainview({ from: button }),
      iframe = this.getCmpFrame({ root: view });

    iframe.print();
  },

  onButtonDownload_Click: function (button, e, eOpts) {
    var view = this.getMainview({ from: button }),
      filterContainer = this.getCompFilter({ root: view }),
      iframe = this.getCmpFrame({ root: view }),
      url = this.getApi("url", {
        filter: filterContainer.getFilter(),
        value:
          filterContainer.getFilter() == "daterange"
            ? filterContainer.getValue().join("|")
            : filterContainer.getValue(),
        download: 1,
        title: btoa(view.title),
      });

    iframe.getWindow().location.assign(url);
  },

  onButtonDownloadExcel_Click: function (button, e, eOpts) {
    var view = this.getMainview({ from: button }),
      filterContainer = this.getCompFilter({ root: view }),
      iframe = this.getCmpFrame({ root: view }),
      url = this.getApi("url", {
        filter: filterContainer.getFilter(),
        value:
          filterContainer.getFilter() == "daterange"
            ? filterContainer.getValue().join("|")
            : filterContainer.getValue(),
        excel: 1,
        title: btoa(view.title),
      });

    iframe.getWindow().location.assign(url);
  },

  onComboUnit_AfterRender: function (component, eOpts) {
    var store = component.getStore();
    // change url from store
    store.getProxy().url = "server.php/sipas/unit/combounit";
    store.load();
  },
});
