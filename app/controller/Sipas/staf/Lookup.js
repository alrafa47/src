Ext.define('SIPAS.controller.Sipas.staf.Lookup', {
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
        'Sipas.staf.Lookup'
    ],

    views: [
        'Sipas.staf.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_staf_lookup'},
        { ref: 'grid',      selector: 'sipas_staf_lookup gridpanel, sipas_staf_lookup treepanel' },
        { ref: 'putin',     selector: 'sipas_staf_lookup sipas_com_button_putin' },
        { ref: 'nip',       selector: 'sipas_staf_lookup #nip' }
    ],

    defaultStore: 'Sipas.staf.Lookup',

    init: function(application) {
        this.control({
            "sipas_staf_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_staf_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onGridpanel_AfterRender: function(component, eOpts){
        var $this = this,
            grid = component,
            view = $this.getMainview({from:grid}),
            store = grid.getStore(),
            nip = $this.getNip({root:view});

        if(view.keputusan) {
            nip.setVisible(true);
        }
    
        store.load({
            url: view.url || store.getProxy().url,
            callback: function(records, operation, success) {
                // grid.getSelectionModel().select([store.getRootNode()]);
                Ext.callback(view.afterload || Ext.emptyFn, view.scope || $this, [records, success, store, view, grid]);
            }
        });
    }
});