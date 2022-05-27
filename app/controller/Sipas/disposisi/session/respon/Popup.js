Ext.define("SIPAS.controller.Sipas.disposisi.session.respon.Popup", {
  extend: "SIPAS.controller.Sipas.base.Prop",

  views: ["Sipas.disposisi.session.respon.Popup"],

  models: [
    "Sipas.disposisi.Masuk" /*default model*/,
    "Sipas.Disposisi",
    "Sipas.Surat",
  ],

  stores: ["Sipas.aksi.Combo", "Sipas.perintah.Combo"],

  refs: [
    { ref: "mainview", selector: "sipas_disposisi_session_respon_popup" },
    { ref: "form", selector: "sipas_disposisi_session_respon_popup > #form" },
    {
      ref: "aksiCombo",
      selector:
        "sipas_disposisi_session_respon_popup > #form combobox[name=disposisi_masuk_aksi]",
    },
    {
      ref: "aksiPesan",
      selector: "sipas_disposisi_session_respon_popup > #form #textAksi",
    },
  ],

  /*do not remove this*/
  aksiID: null,
  aksiPesan: null,

  init: function (application) {
    this.control({
      sipas_disposisi_session_respon_popup: {
        show: this.onMainview_Show,
        loadrecord: this.onMainview_LoadRecord,
      },
      "sipas_disposisi_session_respon_popup sipas_com_button_save": {
        click: this.onButtonSave_Click,
      },
      "sipas_disposisi_session_respon_popup [name=disposisi_masuk_aksi]": {
        loadassociate: this.onComboParent_LoadAssociate,
        focus: this.onComboParent_Focus,
      },
      "sipas_disposisi_session_respon_popup > #form combobox[name=disposisi_masuk_aksi]":
        {
          afterrender: this.onComboParent_AfterRender,
        },
    });
  },

  launch: function (config) {
    config = Ext.apply(
      {
        mode: "view",
        record: null,
        callback: Ext.emptyFn,
      },
      config
    );

    var $this = this,
      $helper = this.getApplication().Helper(),
      record = this.createRecord(config.record),
      view = null;

    view = $this.createView(
      (function (c) {
        c.removeComponents = [];
        c.readonlyComponents = [];
        c.requireComponents = ["#comAksi"];
        c.removeComponents = [];

        return c;
      })(config)
    );

    $helper.readonlyComponent({
      parent: view,
      items: {
        "#comAksi": false,
        "#textAksi": false,
      },
    });

    view.show();
  },

  onMainview_Show: function (view) {
    var record = view.record;
    view && view.fireEvent("loadrecord", view, record);
  },

  onMainview_LoadRecord: function (mainview, record) {
    var $this = this,
      form = $this.getForm({ root: mainview }),
      record = record || (form && form.updateRecord().getRecord());

    form.loadRecord(record);
    record.reload();
    $this.aksiID = record.get("disposisi_masuk_aksi");
    $this.aksiPesan = record.get("disposisi_masuk_pesan");
  },

  onComboParent_AfterRender: function (combo, eOpts) {
    var $this = this,
      store = combo.getStore();
    store.load();
  },

  // parent
  onComboParent_LoadAssociate: function (record, form, cmp) {
    if (!record.get(cmp.getName())) return;

    cmp.setLoading(true);

    if (record) {
      cmp.setLoading(false);
      cmp.setValue(record);
    }
  },

  onComboParent_Focus: function (combobox, e, eOpts) {
    var store = combobox.getStore();

    // only load combo list when its not readonly and store is empty
    if (!combobox.readOnly && !store.getCount()) {
      store.removeFilter(true);
      store.load();
    }
  },

  onButtonSave_Click: function (button, e, eOpts) {
    var $this = this,
      $helper = $this.getApplication().Helper(),
      $session = $this.getApplication().getSession(),
      pegawaiId = $session.getProfileId(),
      $checkSession = $session.getResetSession(),
      mainview = $this.getMainview({ from: button }),
      form = $this.getForm({ root: mainview }),
      comAksi = $this.getAksiCombo({ root: mainview }),
      txtAksi = $this.getAksiPesan({ root: mainview }),
      pesan = txtAksi.getValue() ? txtAksi.getValue() : null,
      record = form && form.updateRecord().getRecord();

    if (comAksi.getValue() == $this.aksiID && pesan == $this.aksiPesan) {
      $helper.showMsg({ success: false, message: "Tidak Ada Perubahan" });
      return;
    }

    record.set({
      disposisi_masuk_aksi_baca_tgl: null,
      disposisi_masuk_aksi_baca_staf: null,
      disposisi_masuk_aksi_baca_profil: null,
    });
    record.commit();

    if (!comAksi.getValue()) {
      $helper.showMsg({ success: false, message: "Anda belum memilih respon" });
    } else {
      if (!record) return;
      $helper.showConfirm({
        confirmTitle: "Konfirmasi Beri Respon",
        confirmText: "Apakah anda yakin memberi respon ?",
        callback: function (button) {
          if (button == "yes") {
            mainview.setLoading(true);
            record.saveAksi({
              staf: pegawaiId,
              callback: function (staf, operation, success) {
                mainview.setLoading(false);
                var res =
                  Ext.decode(operation.response.responseText, true) || {};
                if (success) {
                  $this.aksiID = res.data.disposisi_masuk_aksi;
                  mainview.close();
                  $helper.showMsg({
                    success: true,
                    message: "Berhasil menyimpan respon",
                  });
                  Ext.callback(mainview.callback, mainview, [
                    true,
                    staf,
                    eOpts,
                  ]);
                } else {
                  $helper.showMsg({
                    success: false,
                    message: "Gagal menyimpan respon",
                  });
                }
              },
            });
          }
        },
      });
    }
  },
});
