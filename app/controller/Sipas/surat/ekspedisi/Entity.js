Ext.define('SIPAS.controller.Sipas.surat.ekspedisi.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.surat.ekspedisi.Popup',
        'Sipas.surat.ekspedisi.batal.Popup',
        'Sipas.surat.ekspedisi.keluar.Popup',
        'Sipas.surat.ekspedisi.trace.Popup',
        'Sipas.surat.ekspedisi.trace.Treelist'
    ]
	
});