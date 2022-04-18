Ext.define('SIPAS.controller.Sipas.akun.staf.Lookup', {
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
        'Sipas.akun.staf.Lookup'
    ],

    views: [
        'Sipas.akun.staf.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_akun_staf_lookup'},
        { ref: 'grid',      selector: 'sipas_akun_staf_lookup gridpanel' },
        { ref: 'putin',     selector: 'sipas_akun_staf_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.akun.staf.Lookup',

    init: function(application) {
        this.control({
            "sipas_akun_staf_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_akun_staf_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    }

});