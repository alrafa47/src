Ext.define('SIPAS.controller.Sipas.keluar.agenda.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.keluar.agenda.Popup'
    ],

    api: {
        'datasource':'server.php/sipas/surat_keluar/referensi?scope={scope}&jenis={jenis}'
    },

    views: [
        'Sipas.keluar.agenda.Popup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_keluar_agenda_popup'},
        { ref: 'grid',      selector: 'sipas_keluar_agenda_popup grid'},
        // { ref: 'putin',     selector: 'sipas_keluar_agenda_popup sipas_com_button_putin'},
        { ref: 'compScope',  selector: 'sipas_keluar_agenda_popup #comboScope' }
    ],

    defaultStore: 'Sipas.keluar.agenda.Popup',

    init: function(application) {
        this.control({
            // "sipas_keluar_agenda_popup sipas_com_button_putin": {
            //     click: this.onButtonPutin_Click
            // },
            "sipas_keluar_agenda_popup grid": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            "sipas_keluar_agenda_popup #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            }
        });
    },

    onComboScope_AfterRender: function (component, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from: component}),
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile(),
            record = mainview.record;
        
        component.getStore().load({
            callback: function(records, operation, success){
                component.setValue(record.data.surat_unit);
                $this.updateList(record.data.surat_unit, mainview);
            }
        });
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            scope = combo.getValue();
        
        $this.updateList(scope, mainview);
    },

    updateList: function(scope, mainview){
        var $this = this,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            grid = $this.getGrid({root:mainview}),
            store = grid.getStore(),
            proxy = store.getProxy(),
            record = mainview.record;

        store.removeAll();
        proxy.url = this.getApi('datasource',{scope:scope, jenis:record.get('surat_jenis')});

        grid.reconfigure(store);
        pagingtoolbar.bindStore(store);
        store.clearFilter(true);
        store.reload();
    }
});