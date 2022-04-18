Ext.define('SIPAS.controller.Sipas.unit.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    stores: [
        'Sipas.unit.Lookup'
    ],
    
    views: [
        'Sipas.unit.Lookup'
    ],
    
    refs: [
        { ref: 'mainview',  selector: 'sipas_unit_lookup' },
        { ref: 'list',      selector: 'sipas_unit_lookup gridpanel' },
        { ref: 'putin',     selector: 'sipas_unit_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.unit.Lookup',

    init: function(application) {
        this.control({
            "sipas_unit_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_unit_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    }
});
