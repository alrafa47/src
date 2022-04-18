Ext.define('SIPAS.controller.Sipas.base.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.View',

    models:[
    
    ],

    stores:[
        
    ],

    /**
     * should have mainview,list,putin ref
     * @type {Object}
     */
    refs: [
    ],

    /**
     * use if list not found, call store manually instead
     * @type {String}
     */
    defaultStore: null,

    launch: function(config) {
        var store = this.getStore(this.defaultStore);
        config = Ext.applyIf(config || {},{
            url: store && store.getProxy().url,
            multiselect: false,
            callback: Ext.emptyFn,
            afterload: Ext.emptyFn,
            aftershow: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            view = $this.createView(config),
            grid = view && view.down('treepanel,gridpanel'),
            store = grid && grid.getStore(),
            selectionModel = grid && grid.getSelectionModel();

        view.on('afterrender', function(){
            // $this.refresh();
            Ext.callback(config.aftershow, $this, [view, grid, $this]);
        });

        if(config.multiselect === true){
            selectionModel.setSelectionMode('MULTI');
        }else{
            selectionModel.setSelectionMode('SINGLE');
        }
        view.show();
    },

    onGridpanel_AfterRender: function(component, eOpts){
        var $this = this,
            grid = component,
            view = $this.getMainview({from:grid}),
            store = grid.getStore();

        store.load({
            url: view.url || store.getProxy().url,
            callback: function(records, operation, success) {
                // grid.getSelectionModel().select([store.getRootNode()]);
                Ext.callback(view.afterload || Ext.emptyFn, view.scope || $this, [records, success, store, view, grid]);
            }
        });
    },

    onButtonPutin_AfterRender: function(component, eOpts) {
        component.setDisabled(true);
    },

    onButtonPutin_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            selection = view.down('gridpanel,treepanel').getSelectionModel().getSelection();
        
        view.close();
        Ext.callback(view.callback, view.scope || $this, [selection]);
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            view = $this.getMainview({from:model.view}),
            putin = $this.getPutin({root:view});

        putin && putin.setDisabled(!selected.length);
    },

    refresh: function() {
        this.getStore(this.defaultStore || this.stores[0]).reload();
    }

});