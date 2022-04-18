Ext.define('SIPAS.controller.Sipas.internal.keluar.agenda.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.internal.keluar.agenda.Lookup'
    ],
    api: {
        'datasource':'server.php/sipas/surat_ikeluar/referensi?scope={scope}&jenis={jenis}'
    },

    views: [
        'Sipas.internal.keluar.agenda.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_internal_keluar_agenda_lookup'},
        { ref: 'grid',      selector: 'sipas_internal_keluar_agenda_lookup grid'},
        // { ref: 'putin',     selector: 'sipas_internal_keluar_agenda_lookup sipas_com_button_putin'},
        { ref: 'compScope',  selector: 'sipas_internal_keluar_agenda_lookup #comboScope' }
    ],

    defaultStore: 'Sipas.internal.keluar.agenda.Lookup',

    init: function(application) {
        this.control({
            // "sipas_internal_keluar_agenda_lookup sipas_com_button_putin": {
            //     click: this.onButtonPutin_Click
            // },
            "sipas_internal_keluar_agenda_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            "sipas_internal_keluar_agenda_lookup #comboScope": {
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