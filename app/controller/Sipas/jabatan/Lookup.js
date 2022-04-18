Ext.define('SIPAS.controller.Sipas.jabatan.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    requires: [
        'Ext.ux.controller.Hasview',
        'Ext.ux.controller.Template'
    ],

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    stores: [
        'Sipas.jabatan.Lookup'
    ],

    views: [
        'Sipas.jabatan.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_jabatan_lookup'},
        { ref: 'grid',      selector: 'sipas_jabatan_lookup gridpanel, sipas_jabatan_lookup treepanel' },
        { ref: 'putin',     selector: 'sipas_jabatan_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.jabatan.Lookup',

    init: function(application) {
        this.control({
            "sipas_jabatan_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_jabatan_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onGridpanel_AfterRender: function(component, eOpts){
        var $this = this,
            grid = component,
            view = $this.getMainview({from:grid}),
            store = grid.getStore();
            
            window.grid = grid;

        store.load({
            url: view.url || store.getProxy().url,
            callback: function(records, operation, success) {
                // grid.getSelectionModel().select([store.getRootNode()]);
                Ext.callback(view.afterload || Ext.emptyFn, view.scope || $this, [records, success, store, view, grid]);
            }
        });
    }
});