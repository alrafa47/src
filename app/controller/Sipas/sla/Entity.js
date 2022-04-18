Ext.define('SIPAS.controller.Sipas.sla.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.sla.List',
        'Sipas.sla.Prop',
        'Sipas.sla.Lookup',
        'Sipas.sla.rumus.List',
        'Sipas.sla.unit.List',
        'Sipas.sla.unit.Form',
        'Sipas.sla.unit.Popup',
        'Sipas.sla.unit.Compact',
        'Sipas.sla.unit.def.Prop'
    ]
	
});