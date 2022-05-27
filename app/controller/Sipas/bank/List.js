Ext.define("SIPAS.controller.Sipas.bank.List", {
  extend: "SIPAS.controller.Sipas.base.List",

  stores: ["Sipas.bank.List", "Sipas.bank.Combo", "Sipas.bank.status.Combo"],

  models: ["Sipas.Surat"],

  views: ["Sipas.bank.List"],

  refs: [
    { ref: "mainview", selector: "sipas_bank_list" },
    { ref: "comboTipe", selector: "sipas_bank_list #comboTipeSurat" },
    { ref: "comboStatus", selector: "sipas_bank_list #comboStatus" },
    {
      ref: "comboUnit",
      selector: "sipas_bank_list #comboUnit",
    },
    {
      ref: "comboBagian",
      selector: "sipas_bank_list #comboBagian",
    },
  ],

  api: {
    semua:
      "server.php/sipas/bank/read/{tipe}?unit={unit}&bagian_unit={bagianunit}",
    aktif:
      "server.php/sipas/bank/aktif/{tipe}?unit={unit}&bagian_unit={bagianunit}",
    nonaktif:
      "server.php/sipas/bank/nonaktif/{tipe}?unit={unit}&bagian_unit={bagianunit}",
    batal_nomor:
      "server.php/sipas/bank/batal_nomor/{tipe}?unit={unit}&bagian_unit={bagianunit}",
    salin_nomor:
      "server.php/sipas/bank/salin_nomor/{tipe}?unit={unit}&bagian_unit={bagianunit}",
    musnah:
      "server.php/sipas/bank/musnah/{tipe}?unit={unit}&bagian_unit={bagianunit}",
    arsip:
      "server.php/sipas/bank/arsip/{tipe}?unit={unit}&bagian_unit={bagianunit}",
  },

  defaultStore: "Sipas.bank.List",
  controllerSurat: "Sipas.surat.Prop",

  // controllerCmbUnitBagian: "Sipas.unit.ComboUnitBagian",

  controllerMasuk: "Sipas.masuk.agenda.Prop",
  controllerIMasuk: "Sipas.internal.masuk.agenda.Prop",

  controllerKeluar: "Sipas.keluar.agenda.Prop",
  controllerIKeluar: "Sipas.internal.keluar.agenda.Prop",
  controllerIKeputusan: "Sipas.internal.keputusan.agenda.Prop",

  init: function (application) {
    this.control({
      sipas_bank_list: {
        afterrender: this.onGridpanel_AfterRender,
      },
      "sipas_bank_list sipas_com_button_refresh": {
        click: this.onButtonRefresh_Click,
      },
      "sipas_bank_list #comboTipeSurat": {
        select: this.onComboTipe_Select,
        // afterrender: this.onComboTipe_AfterRender,
      },
      "sipas_bank_list #comboStatus": {
        select: this.onComboStatus_Select,
        afterrender: this.onComboStatus_AfterRender,
      },
      "sipas_bank_list[clickToView=true]": {
        itemclick: this.onMainview_ClickShow,
      },
      "sipas_bank_list #comboUnit": {
        afterrender: this.onComboUnit_AfterRender,
        select: this.onComboUnit_Select,
      },
      "sipas_bank_list #comboBagian": {
        select: this.onComboBagian_Select,
      },
    });
  },

  onButtonView_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      record = view && view.getSelectionModel().getSelection()[0],
      controllerSurat = $this.getController($this.controllerSurat);

    record.getSurat(function (surat) {
      controllerSurat.launch(surat);
    });
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
      view.on("afterrender", function () {});
    }
    return view;
  },

  onGridpanel_AfterRender: function (mainview, eOpts) {
    var $this = this,
      comboTipe = $this.getComboTipe({ root: mainview }),
      comboStatus = $this.getComboStatus({ root: mainview }),
      featureName = "bank",
      comboUnit = $this.getComboUnit({ root: mainview }),
      comboBagian = $this.getComboBagian({ root: mainview }),
      tipe = comboTipe.getValue(),
      status = comboStatus.getValue(),
      $app = this.getApplication(),
      session = $app.Session();

    // set Rule
    this.RuleComboUnit_Bagian(featureName, comboUnit, comboBagian);

    $this.updateList(
      tipe,
      status,
      comboUnit.getValue(),
      comboBagian.getValue(),
      mainview
    );
  },

  onMainview_ClickShow: function (model, selected, eOpts) {
    var $this = this,
      checkSession = this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: model.view }),
      record = selected,
      controllerMasuk = $this.getController($this.controllerMasuk),
      controllerIMasuk = $this.getController($this.controllerIMasuk),
      controllerKeluar = $this.getController($this.controllerKeluar),
      controllerIKeluar = $this.getController($this.controllerIKeluar);
    controllerIKeputusan = $this.getController($this.controllerIKeputusan);

    view.setLoading(true);
    if (record.get("surat_model") === record.self.modelType().MODEL_MASUK) {
      view.setLoading(false);
      controllerMasuk.launch({
        propType: "masuk",
        unit: null,
        model: record.self.modelType().MODEL_MASUK,
        mode: "bank",
        record: record,
        callback: function () {
          $this.refresh(view);
        },
      });
    } else if (
      record.get("surat_model") === record.self.modelType().MODEL_IMASUK
    ) {
      view.setLoading(false);
      controllerIMasuk.launch({
        propType: "imasuk",
        unit: record.get("surat_unit"),
        // tipe: record.get('surat_itipe'),
        model: record.self.modelType().MODEL_IMASUK,
        mode: "bank",
        record: record,
        callback: function () {
          $this.refresh(view);
        },
      });
    } else if (
      record.get("surat_model") === record.self.modelType().MODEL_KELUAR
    ) {
      view.setLoading(false);
      controllerKeluar.launch({
        propType: "keluar",
        unit: null,
        status_kor: 2,
        model: record.self.modelType().MODEL_KELUAR,
        mode: "bank",
        record: record,
        callback: function () {
          $this.refresh(view);
        },
      });
    } else if (
      record.get("surat_model") === record.self.modelType().MODEL_IKELUAR
    ) {
      view.setLoading(false);
      controllerIKeluar.launch({
        propType: "ikeluar",
        unit: record.get("surat_unit"),
        status_kor: 2,
        //tipe: record.get('surat_itipe'),
        model: record.self.modelType().MODEL_IKELUAR,
        mode: "bank",
        record: record,
        callback: function () {
          $this.refresh(view);
        },
      });
    } else if (
      record.get("surat_model") === record.self.modelType().MODEL_KEPUTUSAN
    ) {
      view.setLoading(false);
      controllerIKeputusan.launch({
        propType: "keputusan",
        unit: record.get("surat_unit"),
        status_kor: 2,
        //tipe: record.get('surat_itipe'),
        model: record.self.modelType().MODEL_KEPUTUSAN,
        mode: "bank",
        record: record,
        callback: function () {
          $this.refresh(view);
        },
      });
    }
  },

  onComboStatus_AfterRender: function (combo) {
    var $this = this,
      mainview = $this.getMainview({ from: combo });

    combo.getStore().load({
      callback: function (record, operation, success) {
        combo.setValue("0");
      },
    });
  },

  onComboStatus_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      tipe = $this.getComboTipe({ root: mainview }).getValue(),
      unit = $this.getComboUnit({ root: mainview }).getValue(),
      bagianUnit = $this.getComboUnit({ root: mainview }).getValue();

    $this.updateList(tipe, combo.getValue(), unit, bagianUnit, mainview);
  },

  onComboUnit_AfterRender: function (component, eOpts) {
    var store = component.getStore();
    // change url from store
    // store.remove();
    store.getProxy().url = "server.php/sipas/unit/combounit";
    store.reload();
  },

  onComboBagian_AfterRender: function (combo) {
    combo.getStore().load({
      callback: function (record, operation, success) {
        combo.setValue("semua");
      },
    });
  },

  onComboUnit_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      comboTipe = $this.getComboTipe({ root: mainview }),
      comboStatus = $this.getComboStatus({ root: mainview }),
      comboBagian = $this.getComboBagian({ root: mainview }),
      tipe = comboTipe.getValue(),
      status = comboStatus.getValue(),
      unit = combo.getValue();
    // override store combobox bagian unit
    var storeBagian = comboBagian.getStore();
    var proxyBagian = storeBagian.getProxy();
    proxyBagian.url = "server.php/sipas/unit/combobagian/?unit=" + unit;
    storeBagian.setProxy(proxyBagian);
    storeBagian.reload();
    // comboBagian.clearValue();
    comboBagian.setValue("semua");
    $this.updateList(tipe, status, unit, "semua", mainview);
  },

  onComboBagian_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      comboTipe = $this.getComboTipe({ root: mainview }),
      comboStatus = $this.getComboStatus({ root: mainview }),
      comboUnit = $this.getComboUnit({ root: mainview }),
      tipe = comboTipe.getValue(),
      status = comboStatus.getValue(),
      comboUnit = comboUnit.getValue(),
      bagianUnit = combo.getValue();
    var unit = bagianUnit !== "semua" ? bagianUnit : comboUnit;
    $this.updateList(tipe, status, unit, bagianUnit, mainview);
  },

  onComboTipe_Select: function (combo, selection, eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: combo }),
      status = $this.getComboStatus({ root: mainview }).getValue(),
      unit = $this.getComboUnit({ root: mainview }).getValue(),
      bagianUnit = $this.getComboBagian({ root: mainview }).getValue();

    $this.updateList(combo.getValue(), status, unit, bagianUnit, mainview);
  },

  updateList: function (tipe, status, unit, bagianUnit, mainview) {
    var $this = this,
      checkSession = this.getApplication().getSession().getResetSession(),
      pagingtoolbar = mainview.down("pagingtoolbar"),
      store = mainview.getStore(),
      proxy = store.getProxy(),
      params = {
        unit: unit,
        bagianunit: bagianUnit,
      };

    if (tipe) {
      params.tipe = tipe;
    }

    store.removeAll();
    switch (status) {
      case "1":
        proxy.url = $this.getApi("aktif", params);
        break;
      case "2":
        proxy.url = $this.getApi("nonaktif", params);
        break;
      case "3":
        proxy.url = $this.getApi("batal_nomor", params);
        break;
      case "4":
        proxy.url = $this.getApi("salin_nomor", params);
        break;
      case "5":
        proxy.url = $this.getApi("arsip", params);
        break;
      case "6":
        proxy.url = $this.getApi("musnah", params);
        break;
      default:
        proxy.url = $this.getApi("semua", params);
        break;
    }
    mainview.reconfigure(store);
    pagingtoolbar.bindStore(store);
    store.clearFilter(true);
    pagingtoolbar.moveFirst();
  },

  onButtonRefresh_Click: function (button, e, eOpts) {
    var mainview = this.getMainview({ from: button });
    this.refresh(mainview);
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
