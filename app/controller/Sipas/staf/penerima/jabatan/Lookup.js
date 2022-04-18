Ext.define('SIPAS.controller.Sipas.staf.penerima.jabatan.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.staf.penerima.jabatan.Lookup',
        'Sipas.staf.penerima.disposisi.jabatan.Lookup'
    ],

    views: [
        'Sipas.staf.penerima.jabatan.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_staf_penerima_jabatan_lookup'},
        { ref: 'grid',      selector: 'sipas_staf_penerima_jabatan_lookup'},
        { ref: 'putin',     selector: 'sipas_staf_penerima_jabatan_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.staf.penerima.jabatan.Lookup',
 
    init: function(application) {
        this.control({
            'sipas_staf_penerima_jabatan_lookup': {
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