Ext.define('SIPAS.controller.Sipas.sla.Lookup', {
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
        'Sipas.sla.Lookup'
    ],

    views: [
        'Sipas.sla.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_sla_lookup'},
        { ref: 'grid',      selector: 'sipas_sla_lookup gridpanel, sipas_sla_lookup treepanel' },
        { ref: 'putin',     selector: 'sipas_sla_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.sla.Lookup',

    init: function(application) {
        this.control({
            "sipas_sla_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_sla_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    }

});