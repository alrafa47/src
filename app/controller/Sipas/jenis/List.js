Ext.define("SIPAS.controller.Sipas.jenis.List", {
  extend: "SIPAS.controller.Sipas.base.Base",

  stores: [
    "Sipas.jenis.semua.List",
    "Sipas.jenis.aktif.List",
    "Sipas.jenis.nonaktif.List",
    "Sipas.jenis.status.Combo",
  ],
  models: ["Sipas.Jenis"],
  views: ["Sipas.jenis.List"],

  refs: [
    { ref: "mainview", selector: "sipas_jenis_list" },
    { ref: "comboUnit", selector: "sipas_jenis_list #comboUnit" },
    { ref: "comboStatus", selector: "sipas_jenis_list #Aktif" },
  ],

  defaultStore: "Sipas.jenis.aktif.List",
  controllerProperty: "Sipas.jenis.Prop",

  init: function (application) {
    this.control({
      "sipas_jenis_list sipas_com_button_add": {
        click: this.onButtonAdd_Click,
      },
      "sipas_jenis_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_jenis_list #Aktif": {
        select: this.onComboStatus_Select,
      },
      "sipas_jenis_list #comboUnit": {
        // afterrender: this.onComboUnit_AfterRender,
        select: this.onComboUnit_select,
      },
      sipas_jenis_list: {
        selectionchange: this.onGridpanel_SelectionChange,
        afterrender: this.onMainview_AfterRender,
      },
      "sipas_jenis_list[clickToView=true]": {
        itemclick: this.onMainview_ClickShow,
      },
      "sipas_jenis_list[dbclickToView=true]": {
        itemdblclick: this.onMainview_DoubleClickShow,
      },
    });
  },

  onMainview_DoubleClickShow: function (model, selected, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
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
      checkSession = $this.getApplication().getSession().getResetSession(),
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
      checkSession = $this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      comboUnit = $this.getComboUnit({ root: view }),
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
      unit: comboUnit.getValue(),
    });
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    this.refresh();
  },

  onGridpanel_SelectionChange: function (model, selected, eOpts) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      view = model.view.up("gridpanel,treepanel"),
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
      mainview = $this.getMainview({ from: combo }),
      comboUnit = $this.getComboUnit({ root: mainview });

    this.updateList(combo.getValue(), comboUnit.getValue(), mainview);
  },

  refresh: function (view) {
    var view = view || this.getMainview(),
      $this = this,
      newStore = view.getStore();

    newStore.reload();
  },

  onComboUnit_select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      comboStatus = $this.getComboStatus({ root: mainview });

    this.updateList(comboStatus.getValue(), combo.getValue(), mainview);
  },

  launch: function (config) {
    var $this = this,
      view = this.createView(config);

    if (view) {
      view.on("afterrender", function () {
        $this.refresh();
      });
    }
    return view;
  },

  onMainview_AfterRender: function (mainview) {
    var $this = this,
      featureName = "jenis",
      $app = this.getApplication(),
      session = $app.Session(),
      profile = session.getProfile(),
      comboStatus = $this.getComboStatus({ root: mainview }),
      comboUnit = $this.getComboUnit({ root: mainview });
    comboUnit.getStore().load();

    if (session.getRuleAccess(`${featureName}_combo_unit`)) {
      comboUnit.setDisabled(false);
    } else {
      comboUnit.setDisabled(true);
    }
    comboUnit.setValue(profile.unit_induk);

    this.updateList(comboStatus.getValue(), profile.unit_induk, mainview);
  },

  updateList: function (status, unit = "semua", mainview) {
    var store = mainview.getStore();

    switch (status) {
      case 1:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/jenis/aktif?unit=" + unit;
        break;
      case 2:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/jenis/nonaktif?unit=" + unit;
        break;
      default:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/jenis/read?unit=" + unit;
        break;
    }

    mainview.down("pagingtoolbar").moveFirst();
  },
});
