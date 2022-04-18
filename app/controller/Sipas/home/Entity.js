Ext.define('SIPAS.controller.Sipas.home.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

	controllers: [
        'Sipas.Door',
        'Sipas.Home',
        'Sipas.home.page.Pane',
        'Sipas.home.side.Pane',
        'Sipas.dashboard.Pane'
    ]
	
});