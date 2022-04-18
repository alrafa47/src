Ext.define('SIPAS.controller.Sipas.staf.wakil.pgs.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.staf.wakil.pgs.List'
    ],
    
    views: [
        'Sipas.staf.wakil.pgs.Form'
    ],

    stores: [
        'Sipas.staf.Combo'
    ],

    api: {
        'read' : "server.php/sipas/staf_wakil_pgs/read?id={id}"
    },
    
    refs:[
        { ref: 'mainview',  selector: 'sipas_staf_wakil_pgs_form' },
        { ref: 'grid',      selector: 'sipas_staf_wakil_pgs_form grid' }
    ],

    defaultStore    : 'Sipas.staf.wakil.pgs.List',

    init: function(application) {
        this.control({
            'sipas_staf_wakil_pgs_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        return view;
    },

    onMainview_LoadRecord: function(record, form){
        var $this = this,
            mainview = $this.getMainview({from:form}),
            grid = $this.getGrid({root:form}),
            store = grid.getStore(),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            storePgs = grid.getStore($this.defaultStore),
            proxy = storePgs.getProxy(),
            $data = grid.getStore().data.items;

            storePgs.removeAll();
            proxy.api.read = $this.getApi('read', {id: record.getId()});
            storePgs.reload(); 
    },

    onMainview_ClearRecord: function(form, unbind){
        var grid = this.getGrid({root:form}),
            newStore = this.getStore(this.stores[0]);

        newStore.removeAll();
        grid.reconfigure(newStore);
    }

})