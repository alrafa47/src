Ext.define("SIPAS.controller.Sipas.masuk.registrasi.List", {
  extend: "SIPAS.controller.Sipas.base.Base",

  views: ["Sipas.masuk.registrasi.List"],

  stores: [
    "Sipas.masuk.registrasi.List",
    "Sipas.unit.Combo",
    "Sipas.masuk.pengarahan.registrasi.List",
    "Sipas.masuk.pengarahan.registrasi.Arah",
    "Sipas.masuk.pengarahan.registrasi.Blmarah",
  ],

  refs: [
    { ref: "mainview", selector: "sipas_masuk_registrasi_list" },
    { ref: "comboStatus", selector: "sipas_masuk_registrasi_list #Status" },
    {
      ref: "comboUnit",
      selector: "sipas_masuk_registrasi_list combobox#comboUnit",
    },
    {
      ref: "comboBagian",
      selector: "sipas_masuk_registrasi_list combobox#comboBagian",
    },
  ],

  controllerProp: "Sipas.masuk.agenda.Prop",

  init: function (application) {
    this.control({
      sipas_masuk_registrasi_list: {
        reload: this.onMainview_Reload,
        afterrender: this.onMainview_AfterRender,
      },
      "sipas_masuk_registrasi_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_masuk_registrasi_list sipas_com_button_edit": {
        click: this.onButtonEdit_Click,
      },
      "sipas_masuk_registrasi_list sipas_com_button_delete": {
        click: this.onButtonDelete_Click,
      },
      "sipas_masuk_registrasi_list #Status": {
        select: this.onComboStatus_Select,
      },
      "sipas_masuk_registrasi_list combobox#comboUnit": {
        select: this.onComboUnit_Select,
        // afterrender: this.onComboUnit_AfterRender,
      },
      "sipas_masuk_registrasi_list #comboBagian": {
        select: this.onComboBagian_Select,
      },
    });
  },

  launch: function (config) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      view = this.createView(config);

    return view;
  },

  onMainview_AfterRender: function (mainview) {
    var store = mainview.getStore();
    var $this = this,
      status = $this.getComboStatus({ root: mainview }).getValue(),
      featureName = "agenda_masuk_registrasi",
      comboUnit = $this.getComboUnit({ root: mainview }),
      comboBagian = $this.getComboBagian({ root: mainview });

    this.RuleComboUnit_Bagian(featureName, comboUnit, comboBagian);

    store.removeAll();
    store.getProxy().url = `server.php/sipas/surat_masuk/blm_arah?unit=${comboUnit.getValue()}&bagian_unit=${comboBagian.getValue()}`;
    mainview.fireEvent("reload", mainview);
  },

  onComboStatus_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      cmpCompact = mainview.up("sipas_masuk_registrasi_compact"),
      cmpPengarahan = cmpCompact.down("sipas_masuk_pengarahan_form"),
      unit = $this.getComboUnit({ root: mainview }).getValue(),
      bagianUnit = $this.getComboBagian({ root: mainview }).getValue(),
      comUnitPengarahan = cmpPengarahan.down("#form #comboUnit");

    $this.updateList(combo.getValue(), unit, bagianUnit, mainview);
  },

  onComboUnit_AfterRender: function (component, eOpts) {
    var store = component.getStore();
    // change url from store
    store.getProxy().url = "server.php/sipas/unit/combounit";
    store.load();
  },

  onMainview_Reload: function (grid) {
    grid.getStore().reload();
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var view = this.getMainview({ from: button });
    view.fireEvent("reload", view);
  },

  onButtonEdit_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      record = view && view.getSelectionModel().getSelection()[0],
      controllerProp = $this.getController($this.controllerProp);

    controllerProp.launch({
      mode: "resepsionis",
      record: record,
      callback: function (success, record) {},
    });
  },

  onButtonDelete_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      record = view && view.getSelectionModel().getSelection()[0],
      controllerProp = $this.getController($this.controllerProp);

    controllerProp.launch({
      mode: "destroy",
      record: record,
      callback: function (success, record) {
        view.getStore().reload();
      },
    });
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
        "sipas_com_button_print",
      ],
    });
  },

  onComboUnit_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      status = $this.getComboStatus({ root: mainview }).getValue(),
      comboBagian = $this.getComboBagian({ root: mainview });

    // override store combobox bagian unit
    var storeBagian = comboBagian.getStore(),
      proxyBagian = storeBagian.getProxy();
    proxyBagian.url = "server.php/sipas/unit/combobagian/?unit=" + unit;
    storeBagian.setProxy(proxyBagian);
    storeBagian.reload();
    // comboBagian.clearValue();

    $this.updateList(status, combo.getValue(), "semua", mainview);
  },

  onComboBagian_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      status = $this.getComboStatus({ root: mainview }).getValue(),
      unit = $this.getComboUnit({ root: mainview }).getValue(),
      status = comboStatus,
      comboUnit = comboUnit.getValue();

    $this.updateList(status, unit, combo.getValue(), mainview);
  },

  updateList: function (status, unit, bagianUnit, mainview) {
    var $this = this,
      pagingtoolbar = mainview.down("pagingtoolbar"),
      store = mainview.getStore();

    store.removeAll();
    switch (status) {
      case 1:
        store.removeAll();
        store.getProxy().url = `server.php/sipas/surat_masuk/arah?unit=${unit}&bagian_unit=${bagianUnit}`;
        break;
      case 2:
        store.removeAll();
        store.getProxy().url = `server.php/sipas/surat_masuk/blm_arah?unit=${unit}&bagian_unit=${bagianUnit}`;
        break;
      default:
        store.removeAll();
        store.getProxy().url = `server.php/sipas/surat_masuk/registrasi?unit=${unit}&bagian_unit=${bagianUnit}`;
        break;
    }
    mainview.down("pagingtoolbar").moveFirst();
    mainview.reconfigure(store);
    pagingtoolbar.bindStore(store);
    store.clearFilter(true);
    pagingtoolbar.moveFirst();
  },

  RuleComboUnit_Bagian: function (featureName, comboUnit, comboBagian) {
    var $app = this.getApplication(),
      session = $app.Session();

    //   disabled or enabled combo box unit and combo unit bagian
    if (session.getRuleAccess(`${featureName}_combo_unit`)) {
      comboUnit.setDisabled(false);
      if (!session.getRuleAccess(`${featureName}_combo_bagian_unit`)) {
        comboBagian.setDisabled(true);
      }
    } else {
      comboUnit.setDisabled(true);
      if (!session.getRuleAccess(`${featureName}_combo_bagian_unit`)) {
        comboBagian.setDisabled(true);
      }
    }

    // proses set combobox
    var profile = session.getProfile();
    comboUnit.getStore().load();
    if (!profile.unit_induk) {
      comboUnit.setValue(profile.unit_id);
      this.updateProxyBagianUnit(comboUnit, comboBagian);
      comboBagian.setValue("semua");
    } else {
      comboUnit.setValue(profile.unit_induk);
      this.updateProxyBagianUnit(comboUnit, comboBagian);
      comboBagian.getStore().load();
      comboBagian.setValue(profile.unit_id);
      // comboBagian.setDisabled(true);
      // comboUnit.setDisabled(true);
    }

    // update proxy

    return profile.unit_id;
  },

  updateProxyBagianUnit: function (comboUnit, comboBagian) {
    var unit = comboUnit.getValue();
    //  override store combobox bagian unit
    var storeBagian = comboBagian.getStore();
    var proxyBagian = storeBagian.getProxy();
    proxyBagian.url = "server.php/sipas/unit/combobagian/?unit=" + unit;
    storeBagian.setProxy(proxyBagian);
    storeBagian.reload();
    comboBagian.clearValue();

    return unit;
  },
});
