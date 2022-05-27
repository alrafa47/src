Ext.define("SIPAS.controller.Sipas.klise.List", {
  extend: "SIPAS.controller.Sipas.base.Base",

  stores: [
    // 'Sipas.klise.List'

    "Sipas.klise.semua.List",
    "Sipas.klise.aktif.List",
    "Sipas.klise.nonaktif.List",
  ],

  models: ["Sipas.Klise"],

  views: ["Sipas.klise.List"],

  refs: [
    { ref: "mainview", selector: "sipas_klise_list" },
    { ref: "comboUnit", selector: "sipas_klise_list #comboUnit" },
    { ref: "comboStatus", selector: "sipas_klise_list #Aktif" },
  ],

  api: {
    preview: "server.php/sipas/klise/preview?id={id}&header={header}",
  },

  defaultStore: "Sipas.klise.List",
  controllerProperty: "Sipas.klise.Prop",

  init: function (application) {
    this.control({
      sipas_klise_list: {
        doreload: this.onMainview_DoReload,
        afterrender: this.onGridpanel_AfterRender,
        selectionchange: this.onGridpanel_SelectionChange,
      },
      "sipas_klise_list sipas_com_button_add": {
        click: this.onButtonAdd_Click,
      },
      "sipas_klise_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_klise_list #Aktif": {
        select: this.onComboStatus_Select,
      },
      "sipas_klise_list #comboUnit": {
        // afterrender: this.onComboUnit_AfterRender,
        select: this.onComboUnit_select,
      },
    });
  },

  onMainview_DoReload: function (mainview) {
    var store = mainview && mainview.getStore();
    store && store.reload();
  },

  onGridpanel_AfterRender: function (component) {
    var $this = this,
      mainview = component,
      featureName = "template",
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
    component.fireEvent("doreload", component);
  },

  onButtonAdd_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
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

  onButtonRefresh_Click: function (button, e, eOpts) {
    this.refresh();
  },

  onGridpanel_SelectionChange: function (model, selected, eOpts) {
    // var $this = this,
    //     $helper = $this.getApplication().Helper(),
    //     view = model.view.up('gridpanel,treepanel'),
    //     record = selected && selected[0];

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

  refresh: function (view) {
    var view = view || this.getMainview(),
      $this = this;
    view.getStore().reload();
  },

  launch: function (config) {
    // var $this = this,
    //      view = $this.createView(config);

    //  return view;

    var $this = this,
      view = this.createView(config);

    if (view) {
      view.on("afterrender", function () {
        $this.refresh();
      });
    }
    return view;
  },

  updateList: function (status, unit = "semua", mainview) {
    var store = mainview.getStore();

    switch (status) {
      case 1:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/klise/aktif?unit=" + unit;
        break;
      case 2:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/klise/nonaktif?unit=" + unit;
        break;
      default:
        store.removeAll();
        store.getProxy().url = "server.php/sipas/klise/read?unit=" + unit;
        break;
    }

    mainview.down("pagingtoolbar").moveFirst();
  },
});
