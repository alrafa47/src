Ext.define('SIPAS.controller.Sipas.staf.wakil.Lookup', {
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
        'Sipas.staf.wakil.Lookup'
    ],

    views: [
        'Sipas.staf.wakil.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_staf_wakil_lookup'},
        { ref: 'grid',      selector: 'sipas_staf_wakil_lookup gridpanel, sipas_staf_wakil_lookup treepanel' },
        { ref: 'putin',     selector: 'sipas_staf_wakil_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.staf.wakil.Lookup',

    init: function(application) {
        this.control({
            "sipas_staf_wakil_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_staf_wakil_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    }

});