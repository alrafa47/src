Ext.define("SIPAS.controller.Sipas.keluar.agenda.registrasi.List", {
  extend: "SIPAS.controller.Sipas.base.Base",

  views: ["Sipas.keluar.agenda.registrasi.List"],

  stores: ["Sipas.keluar.agenda.registrasi.List", "Sipas.surat.scope.Combo"],

  api: {
    datasource:
      "server.php/sipas/surat_keluar/setuju?scope={scope}&bagian_unit={bagianunit}",
  },

  refs: [
    { ref: "mainview", selector: "sipas_keluar_agenda_registrasi_list" },
    {
      ref: "comboScope",
      selector: "sipas_keluar_agenda_registrasi_list #comboScope",
    },
    {
      ref: "comboBagian",
      selector: "sipas_keluar_agenda_registrasi_list #comboBagian",
    },
  ],

  controllerProp: "Sipas.keluar.agenda.Prop",
  controllerKorespondensi: "Sipas.korespondensi.Popup",

  init: function (application) {
    this.control({
      sipas_keluar_agenda_registrasi_list: {
        reload: this.onMainview_Reload,
        afterrender: this.onMainview_AfterRender,
      },
      "sipas_keluar_agenda_registrasi_list sipas_com_button_view": {
        click: this.onButtonView_Click,
      },
      "sipas_keluar_agenda_registrasi_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_keluar_agenda_registrasi_list sipas_com_button_print": {
        click: this.onButtonPrintResi_Click,
      },
      "sipas_keluar_agenda_registrasi_list sipas_com_button_correspondent": {
        click: this.onButtonCorespondent_Click,
      },
      "sipas_keluar_agenda_registrasi_list #comboScope": {
        select: this.onComboScope_Select,
        afterrender: this.onComboScope_AfterRender,
      },
      "sipas_keluar_agenda_registrasi_list #comboBagian": {
        select: this.onComboBagian_Select,
      },
    });
  },

  launch: function (config) {
    var $this = this,
      view = this.createView(config);

    return view;
  },

  onMainview_AfterRender: function (mainview) {
    var $this = this,
      featureName = "agenda_keluar_registrasi",
      comboUnit = $this.getComboScope({ root: mainview }),
      comboBagian = $this.getComboBagian({ root: mainview });

    // set Rule
    this.RuleComboUnit_Bagian(featureName, comboUnit, comboBagian);

    mainview.fireEvent("reload", mainview);
    $this.updateList(comboUnit.getValue(), comboBagian.getValue(), mainview);
  },

  onMainview_Reload: function (grid) {
    grid.getStore().reload();
  },

  onGridpanel_SelectionChange: function (model, selected, eOpts) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      view = model.view.up("gridpanel,treepanel"),
      record = selected && selected[0];

    $helper.disableComponent({
      action: selected.length != 1,
      parent: view,
      items: ["sipas_com_button_view"],
    });
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button });

    view.fireEvent("reload", view);
  },

  onButtonView_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      record = view && view.getSelectionModel().getSelection()[0],
      controllerProp = $this.getController($this.controllerProp);

    controllerProp.launch({
      mode: "view",
      record: record,
      callback: function (success, record) {
        $this.refresh();
      },
    });
  },

  onButtonPrintResi_Click: function (button, e, eOpts) {
    var mainview = this.getMainview({ from: button }),
      record = mainview && mainview.getSelectionModel().getSelection()[0],
      cReveiver = this.getController(this.controllerProp);

    cReveiver.printReport(record.getId());
  },

  onButtonCorespondent_Click: function (button, e, eOpts) {
    var controllerKorespondensi = this.getController(
        this.controllerKorespondensi
      ),
      view = this.getMainview({ from: button }),
      record = view.getSelectionModel().getSelection()[0],
      korespondensiView = controllerKorespondensi.launch();

    korespondensiView.setLoading(true);
    record.getSurat(function (surat) {
      if (surat) {
        surat.getKorespondensi(function (korespondensi) {
          if (korespondensi) {
            controllerKorespondensi.loadByRecord(korespondensi);
          }
          korespondensiView.setLoading(false);
        });
      } else {
        korespondensiView.setLoading(false);
      }
    });
  },

  onComboScope_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      comboBagian = $this.getComboBagian({ root: mainview }),
      unit = combo.getValue();
    // override store combobox bagian unit
    var storeBagian = comboBagian.getStore();
    var proxyBagian = storeBagian.getProxy();
    proxyBagian.url = "server.php/sipas/unit/combobagian/?unit=" + unit;
    storeBagian.setProxy(proxyBagian);
    storeBagian.reload();
    // comboBagian.clearValue();
    comboBagian.setValue("semua");
    $this.updateList(unit, "semua", mainview);
  },

  onComboBagian_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      comboUnit = $this.getComboScope({ root: mainview }),
      comboUnit = comboUnit.getValue(),
      bagianUnit = combo.getValue();
    var unit = bagianUnit !== "semua" ? bagianUnit : comboUnit;
    $this.updateList(unit, bagianUnit, mainview);
  },

  onComboScope_AfterRender: function (component, eOpts) {
    // var $this = this,
    //   mainview = $this.getMainview({ from: component }),
    //   $app = $this.getApplication(),
    //   $session = $app.getSession(),
    //   profile = $session.getProfile();

    // component.getStore().load({
    //   callback: function (record, operation, success) {
    //     component.setValue(profile.staf_unit);
    //     $this.updateList(profile.staf_unit, mainview);
    //   },
    // });
    var store = component.getStore();
    // change url from store
    // store.remove();
    store.getProxy().url = "server.php/sipas/unit/combounit";
    store.reload();
  },

  updateList: function (scope, bagianUnit, mainview) {
    var $this = this,
      pagingtoolbar = mainview.down("pagingtoolbar"),
      store = mainview.getStore(),
      proxy = store.getProxy();

    store.removeAll();
    proxy.url = this.getApi("datasource", {
      scope: scope,
      bagianunit: bagianUnit,
    });

    // mainview.reconfigure(store);
    // pagingtoolbar.bindStore(store);
    store.clearFilter(true);
    store.reload();
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
