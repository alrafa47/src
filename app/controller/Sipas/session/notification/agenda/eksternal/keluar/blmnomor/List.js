Ext.define('SIPAS.controller.Sipas.session.notification.agenda.eksternal.keluar.blmnomor.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',

    stores: [
        'Sipas.session.notification.agenda.eksternal.keluar.blmnomor.List'
    ],

    views: [
        'Sipas.session.notification.agenda.eksternal.keluar.blmnomor.List'
    ],

    api: {
        'datasource':'server.php/sipas/notif_agenda/eksternal/keluar_blmnomor?scope={scope}'
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_session_notification_agenda_eksternal_keluar_blmnomor_list' }
    ],

    controllerProperty: 'Sipas.keluar.agenda.Prop',

    init: function(application) {
        this.control({
            "sipas_session_notification_agenda_eksternal_keluar_blmnomor_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_session_notification_agenda_eksternal_keluar_blmnomor_list": {
                afterrender: this.onMainview_AfterRender
            },
            "sipas_session_notification_agenda_eksternal_keluar_blmnomor_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_session_notification_agenda_eksternal_keluar_blmnomor_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    onMainview_AfterRender: function(mainview){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            profile = $session.getProfile();

        $this.updateList(profile.staf_unit, mainview);
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            role_keluar_lihat = $session.getRuleAccess('keluar_lihat'),
            view = $this.getMainview({from:model.view}),
            $checkSession = $session.getResetSession(),
            // comboScope = $this.getCompScope({root:view}),
            // scopeValue = comboScope.getValue(),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);


        // view.setLoading(true);
        if(record){
            if (role_keluar_lihat){
                controllerProperty.launch({
                    propType: 'keluar',
                    // unit: scopeValue,
                    model: record.self.modelType().MODEL_KELUAR,
                    mode:'notif',
                    notif_mode: 'belum_nomor',
                    record: record,
                    afterload: function(records, success, store, viewInstance, grid){
                        // view.setLoading(false);
                    },
                    callback: function(success, record){
                        view.getStore().reload();
                    }
                });
            } else {
                $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
            }
        }
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            checkSession = $this.getApplication().getSession().getResetSession(),
            scope = combo.getValue();

        $this.updateList(scope, mainview);
    },

    updateList: function(scope, mainview){
        var $this = this,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            store = mainview.getStore(),
            proxy = store.getProxy(),
            api = null,
            status = null;

        store.removeAll();
        proxy.url = this.getApi('datasource',{scope:scope});
        pagingtoolbar.moveFirst();
        // store.reload();
    }
});