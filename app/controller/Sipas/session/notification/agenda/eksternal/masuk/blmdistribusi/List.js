Ext.define('SIPAS.controller.Sipas.session.notification.agenda.eksternal.masuk.blmdistribusi.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',

    stores: [
        'Sipas.session.notification.agenda.eksternal.masuk.blmdistribusi.List'
    ],
    
    views: [
        'Sipas.session.notification.agenda.eksternal.masuk.blmdistribusi.List'
    ],

    api: {
        'datasource':'server.php/sipas/notif_agenda/eksternal/masuk_blmdistribusi?scope={scope}'
    },

    refs: [
        { ref: 'mainview',  selector: 'sipas_session_notification_agenda_eksternal_masuk_blmdistribusi_list' }
    ],

    controllerProperty: 'Sipas.masuk.agenda.Prop',

    init: function(application) {
        this.control({
            "sipas_session_notification_agenda_eksternal_masuk_blmdistribusi_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_session_notification_agenda_eksternal_masuk_blmdistribusi_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_session_notification_agenda_eksternal_masuk_blmdistribusi_list": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_session_notification_agenda_eksternal_masuk_blmdistribusi_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    launch: function(config) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            view = $this.createView(config),
            profile = $session.getProfile();

        if(view){
            view.on('afterrender', function(){
                $this.updateList(profile.staf_unit, view);
            });
        }

        return view;
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            my_id = $session.getProfileId(),
            role_masuk_lihat = $session.getRuleAccess('masuk_lihat'),
            view = $this.getMainview({from:model.view}),
            // comboScope = $this.getCompScope({root:view}),
            // scopeValue = comboScope.getValue(),
            record = selected,
            tanggal = new Date(),
            useretensi = record.get('surat_useretensi'),
            inaktif_tgl = record.get('surat_inaktif_tgl'),
            inaktif_display = Ext.util.Format.date(inaktif_tgl, 'd M Y') ? Ext.util.Format.date(inaktif_tgl, 'd M Y') : '',
            controllerProperty = $this.getController($this.controllerProperty);

        if(inaktif_tgl) inaktif_tgl.setHours(0,0,0,0);
        if(tanggal) tanggal.setHours(0,0,0,0);

        var is_inaktif = (inaktif_tgl < tanggal)? 1 : 0;

        if(useretensi && is_inaktif){
            $helper.showMsg({success: false, message: 'Surat telah melewati masa inaktif'});
        }else{
            if (record.get('surat_properti_pembuat_id') == my_id){
                controllerProperty.launch({
                    propType: 'masuk',
                    // unit: scopeValue,
                    model: record.self.modelType().MODEL_MASUK,
                    mode:'notif',
                    notif_mode: 'belum_distribusi',
                    record: record,
                    callback: function(success, record){
                        view.getStore().reload();
                    }
                });
            }else{
                if (role_masuk_lihat){
                    controllerProperty.launch({
                        propType: 'masuk',
                        // unit: scopeValue,
                        model: record.self.modelType().MODEL_MASUK,
                        mode:'notif',
                        notif_mode: 'belum_distribusi',
                        record: record,
                        callback: function(success, record){
                            view.getStore().reload();
                        }
                    });
                } else {
                    $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                }
            }
        }
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            // store = $this.getStore(compStatus.getValue()),
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