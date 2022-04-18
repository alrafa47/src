Ext.define('SIPAS.controller.Sipas.jabatan.penerima.jabatan.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.jabatan.penerima.jabatan.Lookup',
        // 'Sipas.jabatan.penerima.disposisi.jabatan.Lookup'
    ],

    views: [
        'Sipas.jabatan.penerima.jabatan.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_jabatan_penerima_jabatan_lookup'},
        { ref: 'grid',      selector: 'sipas_jabatan_penerima_jabatan_lookup'},
        { ref: 'putin',     selector: 'sipas_jabatan_penerima_jabatan_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.jabatan.penerima.jabatan.Lookup',
 
    init: function(application) {
        this.control({
            'sipas_jabatan_penerima_jabatan_lookup': {
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