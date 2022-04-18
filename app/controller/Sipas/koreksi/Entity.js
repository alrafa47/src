Ext.define('SIPAS.controller.Sipas.koreksi.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.draft.session.Compact',
        'Sipas.koreksi.session.Compact',
        'Sipas.koreksi.session.List',
        'Sipas.koreksi.session.Prop',
        'Sipas.koreksi.session.riwayat.List',
        'Sipas.koreksi.session.penyetuju.Popup',
        'Sipas.koreksi.session.pengajuan.List',
        'Sipas.koreksi.log.Popup',
        'Sipas.koreksi.stack.List',
        'Sipas.koreksi.session.informasi.penyetujuan.status.Pane',
        'Sipas.koreksi.session.informasi.penyetujuan.Pane',
        'Sipas.koreksi.setuju.ttd.Popup'
    ]
	
});