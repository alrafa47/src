Ext.define('SIPAS.controller.Sipas.arsip.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.arsip.Pane',
        'Sipas.arsip.viewer.Popup',
        'Sipas.arsip.log.Popup',
        'Sipas.arsip.Lookup',
        'Sipas.arsip.preview.Popup'
    ]
	
});