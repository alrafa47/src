Ext.define('SIPAS.controller.Sipas.akun.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

	controllers: [
        'Sipas.akun.Compact',
        'Sipas.akun.List',
        'Sipas.akun.Prop',
        'Sipas.akun.staf.List',
        'Sipas.akun.staf.Form',
        'Sipas.akun.staf.Lookup'
	]
	
});