Ext.define('SIPAS.controller.Sipas.disposisi.Entity', {
extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.aksidanperintah.Pane',
        'Sipas.disposisi.riwayat.Popup',
        'Sipas.disposisi.riwayat.List',
        'Sipas.disposisi.session.List',
        'Sipas.disposisi.forward.penerima.jabatan.List',
        'Sipas.disposisi.forward.penerima.List',
        'Sipas.disposisi.session.detail.Popup',
        'Sipas.disposisi.session.penerima.Popup',
        'Sipas.disposisi.session.penerima.jabatan.Popup',
        'Sipas.disposisi.session.respon.Popup',
        'Sipas.disposisi.session.informasi.arahan.Pane',
        'Sipas.disposisi.riwayat.detail.penerima.List',
        'Sipas.disposisi.riwayat.detail.Form',
        'Sipas.disposisi.riwayat.cabut.Popup',
        'Sipas.disposisi.riwayat.cabut.List',
        'Sipas.disposisi.session.Prop',
        'Sipas.disposisi.Lookup',
        'Sipas.disposisi.log.Popup'
    ]
	
});