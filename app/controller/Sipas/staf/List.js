Ext.define("SIPAS.controller.Sipas.staf.List", {
  extend: "SIPAS.controller.Sipas.base.Base",

  stores: [
    "Sipas.staf.semua.List",
    "Sipas.staf.aktif.List",
    "Sipas.staf.nonaktif.List",
    "Sipas.staf.Combo",
    "Sipas.unit.Combo",
  ],
  models: ["Sipas.Staf"],
  views: ["Sipas.staf.List"],

  refs: [
    { ref: "mainview", selector: "sipas_staf_list" },
    { ref: "comboUnit", selector: "sipas_staf_list #comboUnit" },
    { ref: "comboStatus", selector: "sipas_staf_list #Aktif" },
  ],

  controllerProperty: "Sipas.staf.Prop",
  controllerPropertyImpt: "Sipas.staf.impt.Prop",

  init: function (application) {
    this.control({
      "sipas_staf_list sipas_com_button_add": {
        click: this.onButtonAdd_Click,
      },
      "sipas_staf_list #btnImport": {
        click: this.onButtonImpt_Click,
      },
      "sipas_staf_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_staf_list #comboUnit": {
        afterrender: this.onComboUnit_AfterRender,
        select: this.onComboUnit_select,
      },
      // "sipas_staf_list combobox[name=tampilcombo]": {
      //     afterrender:this.onComboStatus_AfterRender,
      //     select: this.onComboStatus_Select
      // },
      "sipas_staf_list #Aktif": {
        select: this.onComboStatus_Select,
      },
      sipas_staf_list: {
        refresh: this.onMainview_Refresh,
        selectionchange: this.onGridpanel_SelectionChange,
        afterrender: this.onMainview_AfterRender,
      },
      "sipas_staf_list[clickToView=true]": {
        itemclick: this.onMainview_ClickShow,
      },
      "sipas_staf_list[dbclickToView=true]": {
        itemdblclick: this.onMainview_DoubleClickShow,
      },
    });
  },

  refresh: function (view) {
    var view = view || this.getMainview(),
      $this = this;
    view.getStore().reload();
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
      callback: function (success, record, eOpts) {
        view && view.getStore().reload();
      },
    });
  },

  onButtonAdd_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      controllerProperty = $this.getController($this.controllerProperty);

    controllerProperty.launch({
      mode: "add",
      callback: function (success, record) {
        if (success && view) {
          view.getStore().insert(0, record);
          view.fireEvent("refresh", view);
          // $this.refresh(view);
        }
      },
    });
  },

  onButtonImpt_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      controllerProperty = $this.getController($this.controllerPropertyImpt);

    controllerProperty.launch({
      mode: "view",
      callback: function (success, record) {
        if (success && view) {
          view.getStore().insert(0, record);
          view.fireEvent("refresh", view);
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

    if ($session.getRuleAccess("staf_update")) {
      controllerProperty.launch({
        mailValue: view.mailValue,
        mode: "edit",
        record: record,
        callback: function (success, record) {
          if (success && view) {
            $this.refresh(view);
          }
        },
      });
    } else {
      controllerProperty.launch({
        mailValue: view.mailValue,
        mode: "view",
        record: record,
        callback: function (success, record) {
          if (success && view) {
            $this.refresh(view);
          }
        },
      });
    }
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button });
    view.fireEvent("refresh", view);
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

  onMainview_Refresh: function (mainview) {
    mainview && mainview.getStore().reload();
  },

  launch: function (config) {
    var $this = this,
      view = this.createView(config);

    if (view) {
      view.on("afterrender", function () {
        view.getStore().clearFilter(true);
        // view.fireEvent('refresh',view);
        $this.refresh(view);
      });
    }
    return view;
  },

  onComboStatus_Select: function (combo, selection, eOpts) {
    var $this = this,
      value = combo.getValue(),
      mainview = $this.getMainview({ from: combo }),
      comboUnit = $this.getComboUnit({ root: mainview }),
      store = mainview.getStore();
    this.updateList(value, comboUnit.getValue(), mainview);
  },

  onComboUnit_AfterRender: function (combo, selection, eOpts) {
    var $app = this.getApplication(),
      $session = $app.Session(),
      profile = $session.getProfile();
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
        store.getProxy().url = "server.php/sipas/staf/aktif?unit=" + unit;
        break;
      case 2:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/staf/nonaktif?unit=" + unit;
        break;
      default:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/staf/read?unit=" + unit;
        break;
    }
    mainview.down("pagingtoolbar").moveFirst();
    // store.reload();
  },

  onMainview_AfterRender: function (mainview) {
    var $this = this,
      featureName = "staf",
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
});
