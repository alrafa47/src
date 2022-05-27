Ext.define("SIPAS.controller.Sipas.pelaporan.report.surat.Tindaklanjut", {
  extend: "SIPAS.controller.Sipas.base.Base",

  views: ["Sipas.pelaporan.report.surat.Tindaklanjut"],

  stores: ["Sipas.surat.tipe.Combo", "Sipas.unit.Combo"],

  api: {
    url: "server.php/sipas/pelaporan/chart_surat_tindaklanjut?unit={unit}&filter={filter}&value={value}&download={download}&excel={excel}&title={title}",
  },

  messages: {
    unit_invalid: "<b>Unit Kerja</b> tidak boleh kosong",
    date_invalid: "<b>Tanggal</b> tidak boleh kosong",
  },

  refs: [
    { ref: "mainview", selector: "sipas_pelaporan_report_surat_tindaklanjut" },
    {
      ref: "compFilter",
      selector:
        "sipas_pelaporan_report_surat_tindaklanjut sipas_com_reportfilter_rekap",
    },
    {
      ref: "cmpFrame",
      selector: "sipas_pelaporan_report_surat_tindaklanjut #Iframe",
    },
    {
      ref: "cmpUnit",
      selector: "sipas_pelaporan_report_surat_tindaklanjut combobox#comboUnit",
    },
    {
      ref: "cmpFilter",
      selector:
        "sipas_pelaporan_report_surat_tindaklanjut sipas_com_reportfilter_rekap #comboFilter",
    },
  ],

  defaultStore: "Sipas.unit.Combo",

  init: function (application) {
    this.control({
      "sipas_pelaporan_report_surat_tindaklanjut sipas_com_reportfilter_rekap":
        {
          process: this.onFilter_Process,
        },
      "sipas_pelaporan_report_surat_tindaklanjut sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_pelaporan_report_surat_tindaklanjut sipas_com_button_print": {
        click: this.onButtonPrint_Click,
      },
      "sipas_pelaporan_report_surat_tindaklanjut sipas_com_button_download#btnDownloadPdf":
        {
          click: this.onButtonDownload_Click,
        },
      "sipas_pelaporan_report_surat_tindaklanjut sipas_com_button_download#btnDownloadExcel":
        {
          click: this.onButtonDownloadExcel_Click,
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

  onFilter_Process: function (component, filter, value, e, eOpts) {
    var view = this.getMainview({ from: component }),
      compFilter = this.getCompFilter({ root: view }),
      filter = compFilter.getValue(),
      value = this.getCmpFilter({ root: view }).getValue();
    if (filter === null) {
      filter = 0;
    }
    this.frameLoad(filter, value, view);
  },

  frameLoad: function (tipe, filter, view) {
    var unit = this.getCmpUnit({ root: view }).getValue(),
      filterContainer = this.getCompFilter({ root: view }),
      value = filterContainer.getValue(),
      iframe = this.getCmpFrame({ root: view }),
      $helper = this.getApplication().Helper(),
      url = this.getApi("url", {
        filter: filter,
        unit: Ext.isEmpty(unit) ? "" : unit,
        value:
          filter == "daterange"
            ? filterContainer.getValue().join("|")
            : filterContainer.getValue(),
        title: btoa(view.title),
      });

    if (!unit) {
      $helper.showMsg({
        success: false,
        message: this.getMessage("unit_invalid"),
      });
    } else {
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
      filter = filterContainer.getFilter(),
      value = filterContainer.getValue(),
      unit = this.getCmpUnit({ root: view }).getValue(),
      url = this.getApi("url", {
        filter: filter,
        unit: Ext.isEmpty(unit) ? "" : unit,
        value:
          filter == "daterange"
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
      filter = filterContainer.getFilter(),
      value = filterContainer.getValue(),
      unit = this.getCmpUnit({ root: view }).getValue(),
      url = this.getApi("url", {
        filter: filter,
        unit: Ext.isEmpty(unit) ? "" : unit,
        value:
          filter == "daterange"
            ? filterContainer.getValue().join("|")
            : filterContainer.getValue(),
        excel: 1,
        title: btoa(view.title),
      });
    iframe.getWindow().location.assign(url);
  },
});
