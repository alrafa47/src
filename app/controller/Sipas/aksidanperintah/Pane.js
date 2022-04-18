Ext.define('SIPAS.controller.Sipas.aksidanperintah.Pane', {
    extend: 'SIPAS.controller.Sipas.base.View',

    controllers: [
        'Sipas.aksi.List',
        'Sipas.aksi.Prop',
        'Sipas.perintah.List',
        'Sipas.perintah.Prop'
    ],

    views: [
        'Sipas.aksidanperintah.Pane'
    ],

    stores: [
        'Sipas.aksi.semua.List',
        'Sipas.perintah.semua.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_aksidanperintah_pane' }
    ],

    storeAksi: 'Sipas.aksi.semua.List',
    storePerintah: 'Sipas.perintah.semua.List',

    init: function(application) {

    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                // $this.getStore($this.storeAksi).reload();
                // $this.getStore($this.storePerintah).reload();
                $this.refresh();
            });
        }
        return view;
    },

    refresh: function() {
        this.getController('Sipas.aksi.List').refresh();
        this.getController('Sipas.perintah.List').refresh();
    }

});