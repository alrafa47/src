Ext.define('SIPAS.controller.Sipas.staf.penerima.available.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.staf.penerima.available.Lookup',
        'Sipas.staf.penerima.disposisi.available.Lookup'
    ],

    views: [
        'Sipas.staf.penerima.available.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_staf_penerima_available_lookup'},
        { ref: 'grid',      selector: 'sipas_staf_penerima_available_lookup'},
        { ref: 'putin',     selector: 'sipas_staf_penerima_available_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.staf.penerima.available.Lookup',
 
    init: function(application) {
        this.control({
            'sipas_staf_penerima_available_lookup': {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onGridpanel_AfterRender: function(component, eOpts){
        var store = component.getStore(),
            pagingtoolbar = component.down('pagingtoolbar');

        pagingtoolbar && pagingtoolbar.bindStore(store);
        store && store.reload();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            putin = $this.getPutin({root:view});

        putin && putin.setDisabled(!selected.length);
    }

});