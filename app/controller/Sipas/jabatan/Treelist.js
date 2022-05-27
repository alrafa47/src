Ext.define("SIPAS.controller.Sipas.jabatan.Treelist", {
  extend: "SIPAS.controller.Sipas.base.Base",

  stores: [
    "Sipas.jabatan.aktif.Treelist",
    "Sipas.jabatan.semua.Treelist",
    "Sipas.jabatan.nonaktif.Treelist",
  ],
  models: ["Sipas.Jabatan"],
  views: ["Sipas.jabatan.Treelist"],
  refs: [
    { ref: "mainview", selector: "sipas_jabatan_treelist" },
    { ref: "form", selector: "sipas_jabatan_treelist > form" },
    { ref: "comboStatus", selector: "sipas_jabatan_treelist #Aktif" },
    {
      ref: "comboUnit",
      selector: "sipas_jabatan_treelist #comboUnit",
    },
  ],

  defaultStore: "Sipas.jabatan.semua.Treelist",

  controllerProperty: "Sipas.jabatan.Prop",

  init: function (application) {
    this.control({
      "sipas_jabatan_treelist sipas_com_button_add": {
        click: this.onButtonAdd_Click,
      },
      "sipas_jabatan_treelist sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_jabatan_treelist #Aktif": {
        select: this.onComboStatus_Select,
      },
      sipas_jabatan_treelist: {
        selectionchange: this.onGridpanel_SelectionChange,
        // itemdblclick: this.onMainview_DoubleClick
      },
      "sipas_jabatan_treelist[clickToView=true]": {
        itemclick: this.onMainview_ClickShow,
      },
      "sipas_jabatan_treelist[dbclickToView=true]": {
        itemdblclick: this.onMainview_DoubleClickShow,
      },
      "sipas_jabatan_treelist #comboUnit": {
        // afterrender: this.onComboUnit_AfterRender,
        select: this.onComboUnit_Select,
      },
    });
  },

  launch: function (config) {
    var $this = this,
      view = this.createView(config);

    if (view) {
      view.on("afterrender", function () {
        $this.refresh(view);
        // view.getStore().load();
      });
    }
    return view;
  },

  refresh: function (mainview) {
    var mainview = mainview || this.getMainview(),
      store = mainview.getStore();

    // this.getStore(this.stores[0]).reload();
    store.reload();
  },

  onButtonAdd_Click: function (button, e, eOpts) {
    var $this = this,
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
          // parentRecord.appendChild(record);
          // parentRecord.set('leaf', false);
          // parentRecord.expand();
          // record.set('leaf', true);
          // selectionModel.select(record);
        }
      },
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
      callback: function (success, record) {
        if (success && view) {
          $this.refresh(view);
        }
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
      callback: function (success, record) {
        if (success && view) {
          $this.refresh(view);
        }
      },
    });
  },

  onComboStatus_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      unit = $this.getComboUnit({ root: mainview }).getValue();
    $this.updateList(unit, combo.getValue(), mainview);
  },

  onComboUnit_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      status = $this.getComboStatus({ root: mainview }).getValue();
    $this.updateList(combo.getValue(), status, mainview);
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var view = this.getMainview({ from: button }),
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

  updateList: function (unit, status, mainview) {
    var $this = this,
      store = mainview.getStore();
    store.getRootNode();
    console.log(store.getRootNode());
    switch (status) {
      case 1:
        // store.removeAll();
        store.getProxy().url =
          "server.php/sipas/jabatan/aktif/tree?jabatan_unit=" + unit;
        break;
      case 2:
        // store.removeAll();
        store.getProxy().url =
          "server.php/sipas/jabatan/nonaktif/tree?jabatan_unit=" + unit;
        break;
      default:
        // store.removeAll();
        store.getProxy().url =
          "server.php/sipas/jabatan/read/tree?jabatan_unit=" + unit;
        break;
    }
    // mainview.down('pagingtoolbar').moveFirst();
    store.reload();
  },
});
