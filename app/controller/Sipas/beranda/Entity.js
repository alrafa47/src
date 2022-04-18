Ext.define('SIPAS.controller.Sipas.beranda.Entity', {
extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.beranda.Pane',
        'Sipas.beranda.chart.Pane',
        'Sipas.beranda.notification.Pane',
        'Sipas.beranda.surat.counter.Pane'
    ]
	
});