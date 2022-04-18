Ext.define('SIPAS.controller.Sipas.kelas.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.kelas.Lookup'
    ],

    views: [
        'Sipas.kelas.Lookup'
    ],
    
    refs: [
        { ref: 'mainview',  selector: 'sipas_kelas_lookup' },
        { ref: 'list',      selector: 'sipas_kelas_lookup gridpanel' },
        { ref: 'putin',     selector: 'sipas_kelas_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.kelas.Lookup',

    init: function(application) {
        this.control({
            "sipas_kelas_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_kelas_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    }
});
