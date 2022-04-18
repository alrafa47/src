Ext.define('SIPAS.controller.Sipas.pengaturan.surat.pengajuan.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.unit.Combo'
    ],

    views: [
        'Sipas.pengaturan.surat.pengajuan.Form'
    ],

    refs: [
        { ref: 'form', selector: 'sipas_pengaturan_surat_pengajuan_form' }
    ],

    init: function(application) {
        this.control({
            'sipas_pengaturan_surat_pengajuan_form combobox': {
                afterrender: this.onMainview_AfterRender
            }
        });
    },

    onMainview_AfterRender: function(component, e, eOpts){
        var store = component.getStore();
        store && store.reload();
    }

})
