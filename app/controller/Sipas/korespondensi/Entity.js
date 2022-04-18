Ext.define('SIPAS.controller.Sipas.korespondensi.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.korespondensi.Compact',
        'Sipas.korespondensi.List',
        'Sipas.korespondensi.Popup',
        'Sipas.korespondensi.Pane',
        'Sipas.korespondensi.eksternal.List',
        'Sipas.korespondensi.eksternal.Popup',
        'Sipas.korespondensi.internal.List',
        'Sipas.korespondensi.internal.Popup'
    ]
	
});