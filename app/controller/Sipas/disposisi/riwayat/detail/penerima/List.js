Ext.define('SIPAS.controller.Sipas.disposisi.riwayat.detail.penerima.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.disposisi.riwayat.detail.penerima.List'
    ],

    models:[
        'Sipas.disposisi.Masuk'
    ],

    stores: [
        'Sipas.disposisi.riwayat.detail.penerima.List'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_disposisi_riwayat_detail_penerima_list' }
    ],

    init: function(application) {
        this.control({
        });
    },

    launch: function(config) {
        var $this = this,
            view = $this.createView(config);

        return view;
    }

});