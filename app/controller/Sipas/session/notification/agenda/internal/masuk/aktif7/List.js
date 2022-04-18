Ext.define('SIPAS.controller.Sipas.session.notification.agenda.internal.masuk.aktif7.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Surat'
    ],

    stores: [
        'Sipas.session.notification.agenda.internal.masuk.aktif7.List'
    ],

    views: [
        'Sipas.session.notification.agenda.internal.masuk.aktif7.List'
    ],

    api: {
        'datasource':'server.php/sipas/notif_agenda/internal/masuk_aktif7?scope={scope}'
    },

    refs:[
        { ref : 'mainview',     selector: 'sipas_session_notification_agenda_internal_masuk_aktif7_list'},
        { ref : 'compScope',    selector: 'sipas_session_notification_agenda_internal_masuk_aktif7_list #comboScope' }
    ],

    controllerProperty: 'Sipas.internal.masuk.agenda.Prop',

    init: function(application) {
        this.control({
            "sipas_session_notification_agenda_internal_masuk_aktif7_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_session_notification_agenda_internal_masuk_aktif7_list toolbar sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            'sipas_session_notification_agenda_internal_masuk_aktif7_list[clickToView=true]': {
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
            view = $this.getMainview({from:model.view}),
            checkSession = $this.getApplication().getSession().getResetSession(),
            // comboScope = $this.getCompScope({root:view}),
            // scopeValue = comboScope.getValue(),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);
            
            controllerProperty.launch({
                propType: 'imasuk',
                // unit: scopeValue,
                model: record.self.modelType().MODEL_IMASUK,
                mode:'notif',
                notif_mode: 'retensi7',
                record: record,
                callback: function(success, record){
                    view.getStore().reload();
                }
            });
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from: button});

        $this.refresh(mainview);
    },

    refresh: function(view) {
        var view = view || this.getMainview();
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();
        /*changing paging toolbar store based on mainview's store*/
        // pagingtoolbar && pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    },

    onComboScope_AfterRender: function (component, eOpts) {
        component.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();
        
        component.getStore().load({
            callback: function(record, operation, success){
                component.setLoading(false);
                component.setValue(profile.staf_unit);
            }
        });
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