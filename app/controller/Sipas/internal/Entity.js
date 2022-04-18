Ext.define('SIPAS.controller.Sipas.internal.Entity', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.internal.masuk.agenda.list.Compact',
        'Sipas.internal.masuk.agenda.list.approved.List',
        'Sipas.internal.masuk.agenda.list.unapproved.List',
        'Sipas.internal.masuk.agenda.approval.Popup',
        'Sipas.internal.masuk.agenda.List',
        'Sipas.internal.masuk.agenda.Prop',
        'Sipas.internal.masuk.agenda.Lookup',
        'Sipas.internal.masuk.agenda.distribusi.Prop',
        'Sipas.internal.masuk.agenda.distribusi.jabatan.Prop',
        'Sipas.internal.masuk.agenda.distribusi.penerima.List',
        'Sipas.internal.masuk.agenda.distribusi.jabatan.List',
        'Sipas.internal.masuk.agenda.transfer.Popup',
        'Sipas.internal.masuk.agenda.rating.Popup',
        
        'Sipas.internal.keluar.agenda.List',
        'Sipas.internal.keluar.agenda.prop.PenerimaComponent',
        'Sipas.internal.keluar.agenda.prop.PenyetujuComponent',
        'Sipas.internal.keluar.agenda.prop.TemplateComponent',
        'Sipas.internal.keluar.agenda.Prop',
        'Sipas.internal.keluar.agenda.Popup',
        'Sipas.internal.keluar.agenda.Lookup',
        
        'Sipas.internal.keputusan.agenda.List',
        'Sipas.internal.keputusan.agenda.Prop',
        'Sipas.internal.keputusan.agenda.prop.TemplateComponent'
    ]
	
});