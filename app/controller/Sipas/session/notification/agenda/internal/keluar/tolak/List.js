Ext.define('SIPAS.controller.Sipas.session.notification.agenda.internal.keluar.tolak.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',
        
    stores: [
        'Sipas.session.notification.agenda.internal.keluar.tolak.List'
    ],
    
    views: [
        'Sipas.session.notification.agenda.internal.keluar.tolak.List'
    ],

    api: {
        'datasource':'server.php/sipas/notif_agenda/internal/keluar_tolak?scope={scope}'
    },

    refs: [
        { ref: 'mainview',              selector: 'sipas_session_notification_agenda_internal_keluar_tolak_list' },
        { ref: 'compScope',             selector: 'sipas_session_notification_agenda_internal_keluar_tolak_list #comboScope' }
    ],

    controllerProperty: 'Sipas.internal.keluar.agenda.Prop',

    init: function(application) {
        this.control({
            "sipas_session_notification_agenda_internal_keluar_tolak_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_session_notification_agenda_internal_keluar_tolak_list": {
                afterrender: this.onMainview_AfterRender
            },
            "sipas_session_notification_agenda_internal_keluar_tolak_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_session_notification_agenda_internal_keluar_tolak_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    // launch: function(config) {
    //     var $this = this,
    //         view = $this.createView(config);

    //     if(view){
    //         view.on('afterrender', function(){
    //             view.getStore().load();
    //         });
    //     }

    //     return view;
    // },
    
    onMainview_AfterRender: function(mainview){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();

        $this.updateList(profile.staf_unit, mainview);
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            role_ikeluar_lihat = $session.getRuleAccess('ikeluar_lihat'),
            view = $this.getMainview({from:model.view}),
            // comboScope = $this.getCompScope({root:view}),
            // scopeValue = comboScope.getValue(),
            // comboTipe = $this.getCompTipe({root:view}),
            // tipeValue = comboTipe.getValue(),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        if(record.get('surat_tolak_isbaca') === 0 && record.get('surat_imasuk_tolak') > 0){
            record.readingTolak({
                staf: $session.getProfile().staf_id,
                callback: function(staf, operation, success){
                    if(success){
                    }
                        view.getStore().reload();
                }
            });    
        }

        if(record.get('surat_sla_tolak_isbaca') === 0 && record.get('surat_sla_tolak_jumlah') > 0){
            record.readingSlaTolak({
                staf: $session.getProfile().staf_id,
                callback: function(staf, operation, success){
                    if(success){
                        view.getStore().reload();
                    }
                }
            });    
        }

        if(record.get('surat_ulasan_isbaca') === 0 && record.get('surat_imasuk_ulasan_jumlah') > 0){
            record.readingUlasan({
                staf: $session.getProfile().staf_id,
                callback: function(staf, operation, success){
                    if(success){
                        view.getStore().reload();
                    }
                }
            });    
        }

        if (role_ikeluar_lihat){
            controllerProperty.launch({
                propType: 'ikeluar',
                // unit: scopeValue,
                // tipe: tipeValue,
                model: record.self.modelType().MODEL_IKELUAR,
                mode:'notif',
                notif_mode: 'tolak',
                record: record,
                callback: function(success, record){
                        view.getStore().reload();
                    if(success && view){
                    }
                }
            });
        } else {
            $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
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