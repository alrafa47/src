Ext.define('SIPAS.controller.Sipas.jabatan.penerima.tim.anggota.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.jabatan.penerima.tim.anggota.List',
        // 'Sipas.jabatan.penerima.disposisi.tim.anggota.List'
    ],

    views: [
        'Sipas.jabatan.penerima.tim.anggota.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_jabatan_penerima_tim_anggota_List'},
        { ref: 'grid',              selector: 'sipas_jabatan_penerima_tim_anggota_List'}
    ],

    defaultStore: 'Sipas.jabatan.penerima.tim.anggota.List',

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