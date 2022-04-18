Ext.define('SIPAS.controller.Sipas.jabatan.wakil.Lookup', {
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
        'Sipas.jabatan.wakil.Lookup'
    ],

    views: [
        'Sipas.jabatan.wakil.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_jabatan_wakil_lookup'},
        { ref: 'grid',      selector: 'sipas_jabatan_wakil_lookup gridpanel, sipas_jabatan_wakil_lookup treepanel'},
        { ref: 'putin',     selector: 'sipas_jabatan_wakil_lookup sipas_com_button_putin'}
    ],

    defaultStore: 'Sipas.jabatan.wakil.Lookup',

    init: function(application) {
        this.control({
            "sipas_jabatan_wakil_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_jabatan_wakil_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    }

});