Ext.define('SIPAS.controller.Sipas.korespondensi.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.korespondensi.eksternal.List',
        'Sipas.korespondensi.internal.List'
    ],

    views: [
        'Sipas.com.surat.korespondensi.Pane'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_com_surat_korespondensi_pane'},
        { ref: 'form',              selector: 'sipas_com_surat_korespondensi_pane form'}
    ],

    modelSurat: 'Sipas.Surat',

    init: function(application) {
        this.control({
            'sipas_com_surat_korespondensi_pane' : {
                load: this.onMainview_Load
            }
        });
    },

    launch: function(config) {
        var $this = this,
            reference = config.reference,
            view = $this.createView(Ext.apply({
                removeComponents: (config.mode == 'view' || config.mode == 'readonly') ? [
                    'sipas_com_surat_korespondensi_pane sipas_com_button_cross'
                ] : []
            },config));

        $this.load(reference, view);

        return view;
    },

    onMainview_Load: function(mainview, surat_korespondensi){
        var $this = this;
        $this.setKorespondensi(surat_korespondensi, mainview);
    },

    setKorespondensi: function(surat, form){
        var hiddenfield         = form.down('hiddenfield'),
            koresp_nomor        = form.down('[name=korespondensi_nomor]'),
            korespondensi_surat = surat && surat.get('surat_korespondensi_surat'),
            surat_korespondensi = form.down('[name=surat_korespondensi]'),
            surat_nomor         = form.down('[name=korespondensi_surat_nomor]'),
            kores_pengirim      = form.down('[name=korespondensi_pengirim]'),
            kores_penerima      = form.down('[name=korespondensi_penerima]'),
            kores_unitpenerima  = form.down('[name=korespondensi_unitpenerima]'),
            kores_unitpengirim  = form.down('[name=korespondensi_unitpengirim]'),
            perihal_koresp      = form.down('[name=korespondensi_surat_perihal]');

        hiddenfield && hiddenfield.setValue(surat && surat.get('surat_id'));
        koresp_nomor && koresp_nomor.setValue(surat && surat.get('korespondensi_nomor'));
        surat_korespondensi && surat_korespondensi.setValue(surat && surat.get('surat_korespondensi'));
        surat_nomor && surat_nomor.setValue(surat && surat.get('surat_nomor'));
        kores_pengirim && kores_pengirim.setValue(surat && surat.get('surat_pengirim'));
        kores_penerima && kores_penerima.setValue(surat && surat.get('surat_tujuan'));
        kores_unitpengirim && kores_unitpengirim.setValue(surat && surat.get('korespondensi_unitpengirim_nama'));
        perihal_koresp && perihal_koresp.setValue(surat && surat.get('korespondensi_perihal'));
    }
});
