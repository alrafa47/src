Ext.define('SIPAS.controller.Sipas.akses.Entity', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.akses.Compact',
        'Sipas.akses.List',
        'Sipas.peran.List',
        'Sipas.peran.Prop',
        'Sipas.peran.staf.Popup',
        'Sipas.user.List',
        'Sipas.user.Prop'
    ]
	
});