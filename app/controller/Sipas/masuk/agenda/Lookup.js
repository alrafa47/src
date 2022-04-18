Ext.define('SIPAS.controller.Sipas.masuk.agenda.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.masuk.agenda.Lookup'
    ],

    api: {
        'datasource':'server.php/sipas/surat_masuk/distribusi?scope={scope}'
    },

    views: [
        'Sipas.masuk.agenda.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_masuk_agenda_lookup'},
        { ref: 'grid',      selector: 'sipas_masuk_agenda_lookup grid'},
        { ref: 'putin',     selector: 'sipas_masuk_agenda_lookup sipas_com_button_putin'},
        { ref: 'compScope',  selector: 'sipas_masuk_agenda_lookup #comboScope' }
    ],

    defaultStore: 'Sipas.masuk.agenda.Lookup',

    init: function(application) {
        this.control({
            "sipas_masuk_agenda_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_masuk_agenda_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            "sipas_masuk_agenda_lookup #comboScope": {
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
            profile = $session.getProfile();
        
        component.getStore().load({
            callback: function(record, operation, success){
                component.setValue(profile.staf_unit);
                $this.updateList(profile.staf_unit, mainview);
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
            proxy = store.getProxy();

        store.removeAll();
        proxy.url = this.getApi('datasource',{scope:scope});

        grid.reconfigure(store);
        pagingtoolbar.bindStore(store);
        store.clearFilter(true);
        store.reload();
    }
});