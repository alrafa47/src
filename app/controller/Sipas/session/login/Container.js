Ext.define("SIPAS.controller.Sipas.session.login.Container", {
  extend: "SIPAS.controller.Sipas.base.View",

  views: ["Sipas.session.login.Container", "Sipas.Viewport"],

  refs: [
    { ref: "mainview", selector: "sipas_session_login_container" },
    {
      ref: "viewport",
      selector: "sipas_viewport",
      autoCreate: true,
      xtype: "sipas_viewport",
    },
  ],

  messages: {
    error: "Gagal membaca pesan dari server",
  },

  controllerHelp: "Sipas.support.about.Popup",

  init: function (application) {
    this.control({
      sipas_session_login_container: {
        afterrender: this.onMainview_AfterRender,
        doauth: this.onMainview_DoAuth,
        dohelp: this.onMainview_DoHelp,
      },
      "sipas_session_login_container button[action]": {
        click: this.onMainview_Action,
      },
      "sipas_session_login_container textfield#textfieldPassword": {
        specialkey: this.onFieldPassword_SpecialKey,
      },
    });
  },

  launch: function (fn, scope) {
    var $this = this,
      view = $this.createView({
        callback: fn,
        scope: scope,
      });

    return view;
  },

  onMainview_AfterRender: function (view) {
    var cmpVersion = view.down("#textVersion");
    cmpVersion &&
      cmpVersion.setText(
        new Ext.Template(cmpVersion.text).apply({
          name: $this.getApplication().name,
          version: $this.getApplication().version,
          vendor: $this.getApplication().vendor,
        })
      );
  },

  onMainview_DoAuth: function (mainview) {
    var $this = this,
      $app = $this.getApplication(),
      $helper = $app.Helper(),
      $session = $app.getSession(),
      view = mainview,
      form = view,
      username = form.down("#textfieldUsername").getValue(),
      password = form.down("#textfieldPassword").getValue(),
      msgInvalid = $this.getMessage("error");

    if (form.getForm().isValid()) {
      $session.auth({
        username: username,
        password: password,
        wait: true,
        callback: function (success, session, response) {
          if (success) {
            var data_logged = $helper.addLoggedUser(session.profiles);
            $helper.setCurrentUser(session.profile.staf_id);
            view.fireEventArgs("authed", [view, session, response]);
            Ext.Ajax.defaultHeaders = {
              "Akun-Id": session.profile.staf_id,
            };
            Ext.each(data_logged, function (item) {
              $app.fireEvent("msgbroker/requestChannel", {
                channelType: "staf",
                channel: item.staf_id,
              });

              $app.fireEvent("msgbroker/requestChannel", {
                channelType: "jabatan",
                channel: item.jabatan_id,
              });
            });
          } else {
            var objres = Ext.decode(response.responseText, true) || {};
            $helper.showMsg({
              success: false,
              message: objres.message || msgInvalid,
            });
          }
        },
        scope: $this,
      });
    }
  },

  onMainview_DoHelp: function (mainview) {
    this.getController(this.controllerHelp).launch();
  },

  onFieldPassword_SpecialKey: function (field, e) {
    if (e.getKey() == e.ENTER) {
      var mainview = this.getMainview({ from: field });
      mainview && mainview.fireEvent("doauth", mainview);
    }
  },
});
