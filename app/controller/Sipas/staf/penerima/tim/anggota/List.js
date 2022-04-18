Ext.define('SIPAS.controller.Sipas.staf.penerima.tim.anggota.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.staf.penerima.tim.anggota.List',
        'Sipas.staf.penerima.disposisi.tim.anggota.List'
    ],

    views: [
        'Sipas.staf.penerima.tim.anggota.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_staf_penerima_tim_anggota_List'},
        { ref: 'grid',              selector: 'sipas_staf_penerima_tim_anggota_List'}
    ],

    defaultStore: 'Sipas.staf.penerima.tim.anggota.List',

    init: function(application) {
        this.control({
            'sipas_disposisi_forward_penerima_tim_anggota_List': {
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onGridpanel_AfterRender: function(component, eOpts){
        var store = component.getStore();
        store && store.reload();
    }
});