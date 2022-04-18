Ext.define('SIPAS.controller.Sipas.surat.atribut.Entity', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.golongan.List',
        'Sipas.golongan.Prop',

        'Sipas.jenis.List',
        'Sipas.jenis.Prop',
        'Sipas.jenis.Popup',
        'Sipas.jenis.setting.Popup',
        'Sipas.jenis.unit.List',
        'Sipas.jenis.unit.Form',
        'Sipas.jenis.unit.Popup',

        'Sipas.sifat.List',
        'Sipas.sifat.Prop',
        'Sipas.sifat.Popup',
        
        'Sipas.lokasi.atur.Popup',
        'Sipas.lokasi.List',
        'Sipas.lokasi.Prop',
        'Sipas.lokasi.Popup',
        
        'Sipas.prioritas.List',
        'Sipas.prioritas.Prop',
        'Sipas.prioritas.Popup',
        
        'Sipas.media.Prop',
        'Sipas.media.List',
        'Sipas.media.Popup',

        'Sipas.kelas.List',
        'Sipas.kelas.Prop',
        'Sipas.kelas.Popup',
        'Sipas.kelas.Treelist',
        'Sipas.kelas.Lookup',
        'Sipas.kelas.Compact',
        'Sipas.kelas.hirarki.Lookup',

        'Sipas.retensi.List',
        'Sipas.retensi.Prop',

        'Sipas.itipe.List',
        'Sipas.itipe.Prop'
    ]
	
});