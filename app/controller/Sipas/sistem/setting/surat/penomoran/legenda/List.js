Ext.define('SIPAS.controller.Sipas.sistem.setting.surat.penomoran.legenda.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.pengaturan.surat.penomoran.legenda.List'
    ],

    views: [
        'Sipas.pengaturan.surat.penomoran.legenda.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_pengaturan_surat_penomoran_legenda_list' }
    ],

    api: {

    },

    messages: {

    },

    init: function(application) {
        this.control({
            'sipas_pengaturan_surat_penomoran_legenda_list': {
                afterrender: this.onMainview_AfterRender
            }
        });
    },

    onMainview_AfterRender: function(component, e, eOpts){
        var store = component.getStore();
        store && store.reload();
    }

})
