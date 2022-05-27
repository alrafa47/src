Ext.define("SIPAS.controller.Sipas.unit.Treelist", {
  extend: "SIPAS.controller.Sipas.base.Base",

  stores: [
    "Sipas.unit.aktif.Treelist",
    "Sipas.unit.semua.Treelist",
    "Sipas.unit.nonaktif.Treelist",
  ],
  models: ["Sipas.Unit"],
  views: ["Sipas.unit.Treelist"],
  refs: [
    { ref: "mainview", selector: "sipas_unit_treelist" },
    { ref: "form", selector: "sipas_unit_treelist > form" },
    { ref: "comboUnit", selector: "sipas_unit_treelist #comboUnit" },
    { ref: "comboStatus", selector: "sipas_unit_treelist #Aktif" },
  ],

  defaultStore: "Sipas.unit.aktif.Treelist",

  controllerProperty: "Sipas.unit.Prop",

  init: function (application) {
    this.control({
      "sipas_unit_treelist sipas_com_button_add": {
        click: this.onButtonAdd_Click,
      },
      "sipas_unit_treelist sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_unit_treelist #Aktif": {
        select: this.onComboStatus_Select,
      },
      "sipas_unit_treelist #comboUnit": {
        select: this.onComboUnit_Select,
      },
      sipas_unit_treelist: {
        selectionchange: this.onGridpanel_SelectionChange,
        // itemdblclick: this.onMainview_DoubleClick
      },
      "sipas_unit_treelist[clickToView=true]": {
        itemclick: this.onMainview_ClickShow,
      },
      "sipas_unit_treelist[dbclickToView=true]": {
        itemdblclick: this.onMainview_DoubleClickShow,
      },
    });
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

  refresh: function (mainview) {
    var mainview = mainview || this.getMainview(),
      store = mainview.getStore();
    // this.getStore(this.defaultStore || this.stores[0]).reload();
    store.reload();
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
      callback: function (success, record) {
        if (success && view) {
          $this.refresh(view);
        }
      },
    });
  },

  onComboStatus_Select: function (combo, selection, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      value = combo.getValue(),
      mainview = $this.getMainview({ from: combo }),
      comboUnit = $this.getComboUnit({ root: mainview }),
      store = mainview.getStore();
    this.updateList(value, comboUnit.getValue(), mainview);
  },

  onComboUnit_Select: function (combo, selection, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      value = combo.getValue(),
      mainview = $this.getMainview({ from: combo }),
      comboStatus = $this.getComboStatus({ root: mainview }),
      store = mainview.getStore();
    this.updateList(comboStatus.getValue(), value, mainview);
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
    });
  },

  onButtonAdd_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      controllerProperty = $this.controllerProperty,
      selectionModel = view.getSelectionModel(),
      parentRecord =
        selectionModel.getSelection()[0] || view.getStore().getRootNode();

    $this.getController(controllerProperty).launch({
      mode: "add",
      parentRecord: parentRecord,
      callback: function (success, record) {
        if (success && view) {
          $this.refresh(view);
        }
        // if(success && view){
        //     parentRecord.appendChild(record);
        //     parentRecord.set('leaf', false);
        //     parentRecord.expand();
        //     record.set('leaf', true);
        //     selectionModel.select(record);
        // }
      },
    });
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var view = this.getMainview({ from: button }),
      checkSession = this.getApplication().getSession().getResetSession(),
      form = this.getForm({ root: view });

    this.refresh(view);
    // form.loadRecord(view.getStore().create({}));
  },

  onGridpanel_SelectionChange: function (model, selected, eOpts) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      view = $this.getMainview({ from: model.view }),
      form = $this.getForm({ root: view }),
      record = selected && selected[0];

    form.loadRecord(record || view.getStore().create({}));
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

  updateList: function (status, unit = "semua", mainview) {
    var $this = this,
      store = mainview.getStore();
    console.log(unit);
    switch (status) {
      case 1:
        store.getProxy().url =
          "server.php/sipas/unit/aktif/tree?node=root&unit=" + unit;
        break;
      case 2:
        store.getProxy().url =
          "server.php/sipas/unit/nonaktif/tree?node=root&unit=" + unit;
        break;
      default:
        store.getProxy().url =
          "server.php/sipas/unit/read/tree?node=root&unit=" + unit;
        break;
    }

    store.reload();
  },

  onMainview_AfterRender: function (mainview) {
    var $this = this,
      featureName = "unit",
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
