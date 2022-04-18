Ext.define('SIPAS.controller.Sipas.disposisi.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.disposisi.Lookup'
    ],
    views: [
        'Sipas.disposisi.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_disposisi_lookup'},
        { ref: 'grid',      selector: 'sipas_disposisi_lookup gridpanel' },
        { ref: 'putin',     selector: 'sipas_disposisi_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.disposisi.Lookup',
    
    init: function(application) {
        this.control({
            "sipas_disposisi_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_disposisi_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    }
});