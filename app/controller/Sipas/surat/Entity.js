Ext.define('SIPAS.controller.Sipas.surat.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.surat.atribut.Entity',
        'Sipas.surat.informasi.detail.Pane',
        'Sipas.surat.penerima.List',
        'Sipas.surat.penerima.Popup',
        'Sipas.surat.penerima.staf.List',
        'Sipas.surat.penerima.staf.Popup',
        'Sipas.surat.penerima.tembusan.Popup',
        'Sipas.surat.penerima.keputusan.List',
        'Sipas.surat.penerima.keputusan.Popup',
        'Sipas.surat.penerima.keputusan.unggah.Prop',
        'Sipas.surat.agenda.Prop',
        'Sipas.surat.agenda.List',
        'Sipas.surat.agenda.aktif.Popup',
        'Sipas.surat.agenda.nomor.Popup',
        'Sipas.surat.ekspedisi.Entity',
        'Sipas.surat.penyetuju.Prop',
        'Sipas.surat.penyetuju.Popup',
        'Sipas.surat.penyetuju.List',
        'Sipas.surat.tembusan.List',
        'Sipas.surat.tembusan.Popup',
        'Sipas.surat.tembusan.stack.Popup',
        'Sipas.surat.penyetuju.riwayat.Popup',
        'Sipas.surat.petikan.List',
        'Sipas.surat.petikan.Prop',
        'Sipas.surat.petikan.riwayat.Popup',
        'Sipas.surat.agenda.korespondensi.atur.Popup',
        'Sipas.surat.agenda.nomor.salin.Lookup',
        'Sipas.surat.berkasfisik.Popup',
        'Sipas.surat.berkasfisik.tolak.Popup',
        'Sipas.surat.libnomor.List',
        'Sipas.surat.libnomor.Prop'
    ]
	
});