Ext.define('SIPAS.controller.Sipas.keluar.agenda.ekspedisi.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.keluar.agenda.ekspedisi.List'
    ],
    models: [
        'Sipas.surat.Log'
    ],
    views: [
        'Sipas.keluar.agenda.ekspedisi.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_keluar_agenda_ekspedisi_list' }
    ],

    defaultStore: 'Sipas.keluar.agenda.ekspedisi.List',

    launch: function(config) {
        var $this = this,
            view = this.createView(config);
            
        return view;
    }
});