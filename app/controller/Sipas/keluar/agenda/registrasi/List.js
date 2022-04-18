Ext.define('SIPAS.controller.Sipas.keluar.agenda.registrasi.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.keluar.agenda.registrasi.List'
    ],

    stores: [
        'Sipas.keluar.agenda.registrasi.List',
        'Sipas.surat.scope.Combo'
    ],

    api: {
        'datasource': 'server.php/sipas/surat_keluar/setuju?scope={scope}'
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_keluar_agenda_registrasi_list' },
        { ref: 'compScope',  selector: 'sipas_keluar_agenda_registrasi_list #comboScope' }
    ],

    controllerProp: 'Sipas.keluar.agenda.Prop',
    controllerKorespondensi: 'Sipas.korespondensi.Popup',

    init: function(application) {
        this.control({
            'sipas_keluar_agenda_registrasi_list': {
                reload: this.onMainview_Reload,
                afterrender: this.onMainview_AfterRender
            },
            "sipas_keluar_agenda_registrasi_list sipas_com_button_view": {
                click: this.onButtonView_Click
            },
            'sipas_keluar_agenda_registrasi_list sipas_com_button_refresh': {
                click: this.onButtonRefresh_Click
            },
            'sipas_keluar_agenda_registrasi_list sipas_com_button_print': {
                click: this.onButtonPrintResi_Click
            },
            "sipas_keluar_agenda_registrasi_list sipas_com_button_correspondent": {
                click: this.onButtonCorespondent_Click
            },
            "sipas_keluar_agenda_registrasi_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        return view;
    },

    onMainview_AfterRender: function(mainview){
        mainview.fireEvent('reload', mainview);
    },

    onMainview_Reload: function(grid){
        grid.getStore().reload();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];

        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view']
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button});

        view.fireEvent('reload', view);
    },

    onButtonView_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProp = $this.getController($this.controllerProp);

        controllerProp.launch({
            mode:'view',
            record: record,
            callback: function(success, record){
                $this.refresh();
            }
        });
    },

    onButtonPrintResi_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            record = mainview && mainview.getSelectionModel().getSelection()[0],
            cReveiver = this.getController(this.controllerProp);
           
        cReveiver.printReport(record.getId());
    },

    onButtonCorespondent_Click: function(button, e, eOpts) {
       var controllerKorespondensi = this.getController(this.controllerKorespondensi),
            view = this.getMainview({from:button}),
            record = view.getSelectionModel().getSelection()[0],
            korespondensiView = controllerKorespondensi.launch();

        korespondensiView.setLoading(true);
        record.getSurat(function(surat){
            if(surat){
                surat.getKorespondensi(function(korespondensi){
                    if(korespondensi){
                        controllerKorespondensi.loadByRecord(korespondensi);
                    }
                    korespondensiView.setLoading(false);
                });
            }else{
                korespondensiView.setLoading(false);
            }
        });
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            scope = combo.getValue();

        $this.updateList(scope, mainview);
    },

    onComboScope_AfterRender: function (component, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from: component}),
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();
        
        component.getStore().load({
            callback: function(record, operation, success){
                component.setValue(profile.staf_unit);
                $this.updateList(profile.staf_unit, mainview);
            }
        });
    },

    updateList: function(scope, mainview){
        var $this = this,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            store = mainview.getStore(),
            proxy = store.getProxy();

        store.removeAll();
        proxy.url = this.getApi('datasource',{scope:scope});
        
        // mainview.reconfigure(store);
        // pagingtoolbar.bindStore(store);
        store.clearFilter(true);
        store.reload();
    }
});