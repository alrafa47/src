Ext.define("SIPAS.controller.Sipas.unit.Prop", {
  extend: "SIPAS.controller.Sipas.base.Prop",

  views: ["Sipas.unit.Prop"],

  stores: ["Sipas.unit.Combo"],

  models: ["Sipas.Unit"],

  refs: [
    { ref: "mainview", selector: "sipas_unit_prop" },
    { ref: "form", selector: "sipas_unit_prop > form" },
    {
      ref: "containerParent",
      selector: "sipas_unit_prop > form > container#containerParent",
    },
    {
      ref: "comboParent",
      selector:
        "sipas_unit_prop > form > container#containerParent triggerfield#comboParent",
    },
    {
      ref: "comboInduk",
      selector:
        "sipas_unit_prop > form > container#containerParent #comboParent",
    },
  ],

  messages: {
    wait: "Menyimpan data",
    success: ["Berhasil", "Berhasil menyimpan data"],
    failure: ["Gagal", "gagal menyimpan data"],
  },

  path: null,
  changePath: null,

  lookupController: "Sipas.staf.Lookup",
  controllerSlaUnit: "Sipas.sla.unit.Popup",
  controllerStaf: "Sipas.unit.staf.Popup",

  init: function (application) {
    this.control({
      sipas_unit_prop: {
        afterrender: this.onMainview_AfterRender,
        close: this.onMainview_Close,
        setmanager: this.onMainview_SetManager,
      },
      "sipas_unit_prop sipas_com_button_save": {
        click: this.onButtonSave_Click,
      },
      "sipas_unit_prop sipas_com_button_edit": {
        click: this.onButtonEdit_Click,
      },
      "sipas_unit_prop button#btnUnit": {
        click: this.onButtonUnit_Click,
      },
      "sipas_unit_prop sipas_com_button_delete": {
        click: this.onButtonDelete_Click,
      },
      "sipas_unit_prop button#btnStafUnit": {
        click: this.onButtonStafUnit_Click,
      },
      "sipas_unit_prop container#containerManager triggerfield#comboManager": {
        loadassociate: this.onTriggerField_LoadAssociate,
        triggerclick: this.onComboManager_TriggerClick,
      },
      "sipas_unit_prop container#containerManager sipas_com_button_cross": {
        click: this.onButtonManagerClear_Click,
      },
      "sipas_unit_prop container#containerParent sipas_com_button_cross": {
        click: this.onButtonParentClear_Click,
      },
      "sipas_unit_prop container#containerParent combo#comboParent": {
        loadassociate: this.onComboParent_LoadAssociate,
        focus: this.onComboParent_Focus,
        select: this.onComboParent_Select,
      },
    });
  },

  launch: function (config) {
    config = Ext.apply(
      {
        mode: "view",
        record: null,
        // record: this.createRecord(config.record),
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

            c.requireComponents = [
              "[name=unit_kode]",
              "[name=unit_kode_rubrik]",
              "[name=unit_nama]",
            ];

            if (c.mode === "view") {
              // c.removeComponents.push('#toolbarAction','sipas_com_button_cross');
              c.removeComponents.push(
                "sipas_com_button_cross",
                "sipas_com_button_save"
              );
            }

            if (c.mode === "edit") {
              c.removeComponents.push(
                "#btnStafUnit",
                "sipas_com_button_delete",
                "sipas_com_button_edit",
                "#btnUnit"
              );
            }

            if (c.mode === "add") {
              c.removeComponents.push(
                "#btnStafUnit",
                "sipas_com_button_delete",
                "sipas_com_button_edit",
                "#btnUnit"
              );
            }
            return c;
          })(config)
        );

        view.show();
        break;

      case "destroy":
        $helper.destroyRecord({
          record: record,
          callback: config.callback,
          scope: config.scope,
          confirm: true,
        });
        break;
    }
  },

  // manipulate
  onButtonSave_Click: function (button, e, eOpts) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      checkSession = $this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord();
    wait = $this.getMessage("wait");

    if ($this.changePath === 1) {
      params = {
        isChange: true,
        path: this.path,
        unit_path: record.get("unit_parent_path"),
      };
    } else {
      params = {
        path: this.path,
      };
    }

    if (!record) return;
    $helper.saveRecord({
      record: record,
      form: form,
      params: params,
      wait: true,
      message: true,
      callback: function (success, record, eOpts) {
        Ext.callback(view.callback, view, [success, record, eOpts]);
        if (success) view.close();
      },
    });
  },

  onButtonUnit_Click: function (button, e, eOpts) {
    var $this = this,
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord(),
      slaunit = $this.getController($this.controllerSlaUnit);

    slaunit.launch({
      mode: "edit",
      record: record,
      callback: function (success, record, eOpts) {
        Ext.callback(view.callback, view, [success, record, eOpts]);
      },
    });
    view.setLoading(false);
  },

  onButtonEdit_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord();

    this.launch({
      mode: "edit",
      record: record,
      callback: function (success, record, eOpts) {
        Ext.callback(view.callback, view, [success, record, eOpts]);
        if (success) view.close();
      },
    });
    view.close();
  },

  onButtonDelete_Click: function (button, e, eOpts) {
    var $this = this,
      checkSession = $this.getApplication().getSession().getResetSession(),
      view = $this.getMainview({ from: button }),
      form = $this.getForm({ root: view }),
      record = form && form.updateRecord().getRecord();

    this.launch({
      mode: "destroy",
      record: record,
      callback: function (success, record) {
        view.close();
        Ext.callback(view.callback, view, [success, record, eOpts]);
        if (success) view.close();
      },
    });
  },

  onButtonStafUnit_Click: function (button, e, eOpts) {
    var $this = this,
      view = button.up("window"),
      form = view.down("form"),
      record = form && form.updateRecord().getRecord(),
      asisten = $this.getController($this.controllerStaf);

    asisten.launch({
      mode: "edit",
      record: record,
      callback: function (success, record, eOpts) {
        Ext.callback(view.callback, view, [success, record, eOpts]);
      },
    });
    view.setLoading(false);
  },

  // manager
  onMainview_SetManager: function (mainview, record) {
    var triggerfield = mainview.down(
        "container#containerManager triggerfield#comboManager"
      ),
      hiddenfield = mainview.down(
        "container#containerManager hiddenfield#hiddenManager"
      );

    triggerfield.setHiddenValue(record);
    hiddenfield.setValue(record && record.get("staf_id"));
    triggerfield.setValue(record && record.get("staf_nama"));
  },

  onTriggerField_LoadAssociate: function (record, form, cmp) {
    if (record) {
      cmp.setLoading(true);
      cmp.setValue(record.get("manager_nama"));
      cmp.setLoading(false);
    }
  },

  onComboManager_TriggerClick: function (triggerfield) {
    var $this = this,
      controllerLookup = $this.getController($this.lookupController);

    controllerLookup.launch({
      multiselect: false,
      title: "Pilih Kepala Unit ",
      afterload: function (records, success, store, viewInstance, grid) {
        var currentSelected = triggerfield.getHiddenValue();
        if (currentSelected) {
          grid.getSelectionModel().select([currentSelected]);
        }
      },
      callback: function (selection) {
        var mainview = $this.getMainview({ from: triggerfield });
        mainview.fireEvent("setmanager", mainview, selection[0]);
      },
    });
  },

  onButtonManagerClear_Click: function (button, e, eOpts) {
    var mainview = this.getMainview({ from: button });
    mainview.fireEvent("setmanager", mainview, null);
  },

  // parent
  onComboParent_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) return;

    cmp.setLoading(true);

    record.getParent(function (r) {
      cmp.setLoading(false);

      cmp.setValue(r);
    });
  },

  onComboParent_Focus: function (combobox, e, eOpts) {
    var store = combobox.getStore();

    // only load combo list when its not readonly and store is empty
    if (!combobox.readOnly && !store.getCount()) {
      store.removeFilter(true);
      store.load();
    }
  },

  onComboParent_Select: function (combo, selection, eOpts) {
    if (selection[0].get("unit_parent_path")) {
      this.path = selection[0].get("unit_parent_path");
    } else {
      this.path = null;
    }
    this.changePath = 1;
  },

  onButtonParentClear_Click: function (button, e, eOpts) {
    this.setParent(null, this.getMainview({ from: button }));
    this.path = null;
    this.changePath = 1;
  },

  setParent: function (record, view) {
    var comboInduk = this.getComboInduk({ root: view });

    comboInduk.setValue(null);
  },
});
