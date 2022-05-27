Ext.define("SIPAS.controller.Sipas.lokasi.List", {
  extend: "SIPAS.controller.Sipas.base.Base",

  stores: [
    "Sipas.lokasi.semua.List",
    "Sipas.lokasi.aktif.List",
    "Sipas.lokasi.nonaktif.List",
    "Sipas.lokasi.Combo",
  ],
  models: ["Sipas.Lokasi"],
  views: ["Sipas.lokasi.List"],

  refs: [
    { ref: "mainview", selector: "sipas_lokasi_list" },
    { ref: "comboUnit", selector: "sipas_lokasi_list #comboUnit" },
    { ref: "comboStatus", selector: "sipas_lokasi_list #Aktif" },
  ],

  defaultStore: "Sipas.lokasi.semua.List",

  controllerProperty: "Sipas.lokasi.Prop",

  init: function (application) {
    this.control({
      "sipas_lokasi_list sipas_com_button_add": {
        click: this.onButtonAdd_Click,
      },
      "sipas_lokasi_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_lokasi_list #Aktif": {
        select: this.onComboStatus_Select,
      },
      "sipas_lokasi_list #comboUnit": {
        select: this.onComboUnit_select,
      },
      sipas_lokasi_list: {
        selectionchange: this.onGridpanel_SelectionChange,
        itemdblclick: this.onMainview_DoubleClick,
        afterrender: this.onMainview_AfterRender,
      },
      "sipas_lokasi_list[clickToView=true]": {
        itemclick: this.onMainview_ClickShow,
      },
      "sipas_lokasi_list[dbclickToView=true]": {
        itemdblclick: this.onMainview_DoubleClickShow,
      },
    });
  },

  onMainview_DoubleClickShow: function (model, selected, eOpts) {
    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      view = $this.getMainview({ from: model.view }),
      record = selected,
      controllerProperty = $this.getController($this.controllerProperty);

    controllerProperty.launch({
      mailValue: view.mailValue,
      mode: "view",
      record: record,
      // callback: function(success, record){
      //     if(success && view){
      //         $this.refresh(view);
      //     }
      // }
    });
  },

  onMainview_ClickShow: function (model, selected, eOpts) {
    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      view = $this.getMainview({ from: model.view }),
      record = selected,
      controllerProperty = $this.getController($this.controllerProperty);

    controllerProperty.launch({
      mailValue: view.mailValue,
      mode: "view",
      record: record,
      // callback: function(success, record){
      //     if(success && view){
      //         $this.refresh(view);
      //     }
      // }
    });
  },

  onButtonAdd_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      controllerProperty = $this.getController($this.controllerProperty);

    controllerProperty.launch({
      mode: "add",
      callback: function (success, record) {
        if (success && view) {
          view.getStore().insert(0, record);
          view.getView().refresh();
          // $this.refresh(view);
        }
      },
    });
  },

  onMainview_DoubleClick: function (model, selected, eOpts) {
    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      view = $this.getMainview({ from: model.view }),
      record = selected,
      controllerProperty = $this.getController($this.controllerProperty);

    if ($session.getRuleAccess("lokasi_update")) {
      controllerProperty.launch({
        mailValue: view.mailValue,
        mode: "edit",
        record: record,
      });
    } else {
      controllerProperty.launch({
        mailValue: view.mailValue,
        mode: "view",
        record: record,
      });
    }
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var checkSession = this.getApplication().getSession().getResetSession();
    this.refresh();
  },

  onGridpanel_SelectionChange: function (model, selected, eOpts) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      view = $this.getMainview({ from: model.view }),
      record = selected && selected[0];

    $helper.disableComponent({
      action: selected.length != 1,
      parent: view,
      items: [
        "sipas_com_button_view",
        "sipas_com_button_edit",
        "sipas_com_button_delete",
      ],
    });
  },

  onComboStatus_Select: function (combo, selection, eOpts) {
    var $this = this,
      value = combo.getValue(),
      mainview = $this.getMainview({ from: combo }),
      comboUnit = $this.getComboUnit({ root: mainview }),
      store = mainview.getStore();

    this.updateList(value, comboUnit.getValue(), mainview);
    // store.reload();
  },

  onComboUnit_select: function (combo, selection, eOpts) {
    var $this = this,
      value = combo.getValue(),
      mainview = $this.getMainview({ from: combo }),
      comboStatus = $this.getComboStatus({ root: mainview });
    this.updateList(comboStatus.getValue(), value, mainview);
  },

  updateList: function (status, unit = "semua", mainview) {
    var store = mainview.getStore();

    switch (status) {
      case 1:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/lokasi/aktif?unit=" + unit;
        break;
      case 2:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/lokasi/nonaktif?unit=" + unit;
        break;
      default:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/lokasi/read?unit=" + unit;
        break;
    }

    mainview.down("pagingtoolbar").moveFirst();
  },

  refresh: function (view) {
    var view = view || this.getMainview(),
      $this = this;
    view.getStore().reload();
  },

  launch: function (config) {
    var $this = this,
      view = this.createView(config);

    if (view) {
      view.on("afterrender", function () {
        view.getStore().load();
      });
    }
    return view;
  },

  onMainview_AfterRender: function (mainview) {
    var $this = this,
      featureName = "lokasi",
      $app = this.getApplication(),
      session = $app.Session(),
      profile = session.getProfile(),
      comboUnit = $this.getComboUnit({ root: mainview }),
      comboStatus = $this.getComboStatus({ root: mainview });
    comboUnit.getStore().load();

    if (session.getRuleAccess(`${featureName}_combo_unit`)) {
      comboUnit.setDisabled(false);
    } else {
      comboUnit.setDisabled(true);
    }
    comboUnit.setValue(profile.unit_induk);

    this.updateList(comboStatus.getValue(), profile.unit_induk, mainview);
  },
});
