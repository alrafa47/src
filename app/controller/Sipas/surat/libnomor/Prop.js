Ext.define("SIPAS.controller.Sipas.surat.libnomor.Prop", {
  extend: "SIPAS.controller.Sipas.base.Prop",

  views: ["Sipas.surat.libnomor.Prop"],

  models: ["Sipas.surat.Libnomor"],

  stores: [
    "Sipas.surat.libnomor.List",
    "Sipas.unit.Combo",
    "Sipas.surat.libnomor.unit.penyetuju.Combo",
    "Sipas.surat.libnomor.jabatan.penyetuju.Combo",
    "Sipas.jabatan.Combo",
    "Sipas.jenis.Combo",
    "Sipas.kelas.Combo",
    "Sipas.sifat.Combo",
    "Sipas.lokasi.Combo",
  ],

  refs: [
    { ref: "mainview", selector: "sipas_surat_libnomor_prop" },
    { ref: "form", selector: "sipas_surat_libnomor_prop > form" },
    {
      ref: "comboModel",
      selector: "sipas_surat_libnomor_prop > form #comboModel",
    },
  ],

  messages: {
    invalidMode: ["Error", "Mode tidak sesuai"],
    wait: "Menyimpan data",
    success: ["Berhasil", "Berhasil menyimpan data"],
    failure: ["Gagal", "gagal menyimpan data"],
  },

  init: function (application) {
    this.control({
      sipas_surat_libnomor_prop: {
        afterrender: this.onMainview_AfterRender,
        close: this.onMainview_Close,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_model]": {
        afterrender: this.onComboModel_AfterRender,
        change: this.onComboModel_Change,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_unit_pembuat]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_unit_penyetuju]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_jabatan_pembuat]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_jabatan_penyetuju]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_jenis]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_kelas]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_sifat]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop [name=surat_libnomor_lokasi]": {
        loadassociate: this.onCombo_LoadAssociate,
      },
      "sipas_surat_libnomor_prop sipas_com_button_save": {
        click: this.onButtonSave_Click,
      },
      "sipas_surat_libnomor_prop sipas_com_button_edit": {
        click: this.onButtonEdit_Click,
      },
      "sipas_surat_libnomor_prop sipas_com_button_delete": {
        click: this.onButtonDelete_Click,
      },
    });
  },

  launch: function (config) {
    config = Ext.apply(
      {
        mode: "view",
        record: null,
        parentRecord: null,
        callback: Ext.emptyFn,
      },
      config
    );

    var $this = this,
      $helper = this.getApplication().Helper(),
      record = this.createRecord(config.record),
      view = null;

    switch (config.mode) {
      case "add":
      case "edit":
      case "view":
        view = $this.createView(
          (function (c) {
            c.requireComponents = [];
            c.removeComponents = [];
            c.readonlyComponents = [];

            if (c.mode === "view") {
              c.removeComponents = [
                "sipas_com_button_save",
                "sipas_com_button_cross",
              ];
            }

            if (c.mode === "edit") {
              c.removeComponents = [
                "sipas_com_button_edit",
                "sipas_com_button_delete",
              ];
            }

            if (c.mode === "add") {
              c.removeComponents = [
                "sipas_com_button_edit",
                "sipas_com_button_delete",
              ];
            }

            return c;
          })(config)
        );

        view.show();
        if (record.isRegistrasi()) {
          var form = $this.getForm({ root: view });
          $this.disableComponent(form, true);
        }
        break;

      case "destroy":
        $helper.destroyRecord({
          record: record,
          callback: config.callback,
          scope: config.scope,
          confirm: true,
        });
        break;

      default:
        var message = $this.getMessage("invalidMode");
        Ext.Msg.alert(message[0], message[1]);
    }
  },

  onMainview_AfterRender: function (mainview) {
    var $this = this,
      record = $this.createRecord(mainview.record),
      form = $this.getForm({ root: mainview });
    // if(mainview.mode !== 'add'){
    form.loadRecord(record);
    // }
  },

  onButtonEdit_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord();

    this.launch({
      mode: "edit",
      record: record,
      callback: function (success, record, eOpts) {
        Ext.callback(view.callback, view, [success, record, eOpts]);
      },
    });
    view.close();
  },

  onButtonDelete_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord();

    this.launch({
      mode: "destroy",
      record: record,
      callback: function (success, record) {
        Ext.callback(view.callback, view, [success, record, eOpts]);
        if (success) view.close();
      },
    });
  },

  onButtonSave_Click: function (button, _e, _eOpts) {
    var $this = this,
      $helper = this.getApplication().Helper(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord();
    wait = $this.getMessage("wait");

    if (!record) return;
    $helper.saveRecord({
      record: record,
      form: form,
      wait: true,
      message: true,
      callback: function (success, record, eOpts) {
        Ext.callback(view.callback, view, [success, record, eOpts]);
        if (success) view.close();
      },
    });
  },

  onCombo_LoadAssociate: function (record, _form, cmp) {
    var getterAssoc = cmp.assocRecord,
      view = this.getMainview({ from: cmp });
    if (view.mode !== "add") {
      if (record.get(cmp.getName()) !== null) {
        cmp.setLoading(true);
        record[getterAssoc] &&
          record[getterAssoc](function (r) {
            if (r) {
              cmp.setValue(r);
            }
            cmp.setLoading(false);
          });
        if (!record[getterAssoc]) cmp.setLoading(false); //
      }
    }
  },

  onComboModel_AfterRender: function (cmp, _eOpts) {
    cmp.getStore().reload();
  },

  disableComponent: function (cmp, disabled) {
    var disabled = disabled ? true : false,
      isForm = cmp instanceof Ext.form.Panel ? true : false,
      isCmbx = !isForm && cmp instanceof Ext.form.field.Combobox ? true : false;

    if (isForm) {
      var form = cmp.getForm();
      form.getFields().each(function (item) {
        if (item.assocRecord !== undefined) {
          item.setDisabled(disabled);
        }
      });
    }

    if (isCmbx) {
      cmp.setDisabled(disabled);
    }
  },

  onComboModel_Change: function (cmp, newValue, _oldValue, _eOpts) {
    var $this = this,
      mainview = $this.getMainview({ from: cmp }),
      form = $this.getForm({ root: mainview });

    if (newValue === 0) {
      $this.disableComponent(form, true);
    } else {
      $this.disableComponent(form);
    }
  },
});
