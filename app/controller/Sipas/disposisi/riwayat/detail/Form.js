Ext.define('SIPAS.controller.Sipas.disposisi.riwayat.detail.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.riwayat.detail.penerima.List'
    ],
    
    views: [
        'Sipas.disposisi.riwayat.detail.Form'
    ],

    models: [
        'Sipas.Disposisi'
    ],

    stores: [
        'Sipas.perintah.Combo'
    ],

    messages: {
        'retract_confirm'   : ['Konfirmasi','Disposisi yang dicabut tidak bisa dibatalkan.<br/>Apakah anda yakin untuk melanjutkan ?'],
        'retracting'        : 'Memproses Pencabutan',
        'retract_failure'   : 'Gagal Mencabut Disposisi. Disposisi tidak tersedia.',
        'retract_success'   : 'Berhasil mencabut Disposisi.'
    },

    refs: [
        { ref: 'mainview',      selector: 'sipas_disposisi_riwayat_detail_form' },
        { ref: 'compSurat',     selector: 'sipas_disposisi_riwayat_detail_form sipas_com_surat_pane'},
        { ref: 'compRetract',   selector: 'sipas_disposisi_riwayat_detail_form #buttonCabutDisposisi'},
        { ref: 'compPrint',     selector: 'sipas_disposisi_riwayat_detail_form sipas_com_button_print'},
        { ref: 'toolbar',       selector: 'sipas_disposisi_riwayat_detail_form #buttonCabutDisposisi'},
        { ref: 'perintahCombo', selector: 'sipas_disposisi_riwayat_detail_form combobox[name=disposisi_perintah]'},
        { ref: 'buttonArahan',  selector: 'sipas_disposisi_riwayat_detail_form #buttonArahan'}
    ],

    defaultWindowReport: {
        height: 640, 
        width: 800,
        maximizable: true,
        modal: true
    },

    defaultModel        : 'Sipas.Disposisi',
    defaultStoreRiwayat : 'Sipas.disposisi.riwayat.List',
    controllerSurat     : 'Sipas.surat.Prop',
    controllerForward   : 'Sipas.disposisi.forward.Form',
    controllerCabut     : 'Sipas.disposisi.riwayat.cabut.Popup',
    viewViewer          : 'Sipas.Viewer',

    init: function(application) {
        this.control({
            'sipas_disposisi_riwayat_detail_form': {
                loadrecord: this.onMainview_LoadRecord,
                clearrecord: this.onMainview_ClearRecord
            },
            'sipas_disposisi_riwayat_detail_form sipas_disposisi_riwayat_detail_penerima_list' : {
                loadassociate: this.onPenerima_LoadAssociate
            },
            'sipas_disposisi_riwayat_detail_form sipas_com_disposisi_pengirim_pane' : {
                loadassociate: this.onPengirim_LoadAssociate
            },
            'sipas_disposisi_riwayat_detail_form sipas_com_surat_pane' : {
                loadassociate: this.onSurat_LoadAssociate
            },
            'sipas_disposisi_riwayat_detail_form sipas_com_surat_pane sipas_com_button_view' : {
                click: this.onButtonViewSurat_Click
            },
            // 'sipas_disposisi_riwayat_detail_form #buttonCabutDisposisi': {
            //     click: this.onButtonRetract_Click
            // },
            'sipas_disposisi_riwayat_detail_form sipas_com_button_print': {
                click: this.onButtonPrint_Click
            },
            'sipas_disposisi_riwayat_detail_form combobox[name=disposisi_perintah],sipas_disposisi_riwayat_detail_form combobox[name=disposisi_aksi]': {
                expand: this.onCombobox_Expand
            }
        });
    },

    onMainview_LoadRecord: function(record, mainview){
        var $this = this,
            compRetract = $this.getCompRetract({root:mainview}),
            $helper     = $this.getApplication().Helper(),
            comboP      = $this.getPerintahCombo({root:mainview}),
            toolbar     = $this.getToolbar({root:mainview}),
            btnArahan   = $this.getButtonArahan({root:mainview});

        if(record.get('disposisi_jumlah_penerima_baca') >= 1){
            btnArahan && btnArahan.hide();
        }else{
            btnArahan && btnArahan.show();
        }
        if(record.get('disposisi_iscabut') === 1){
            // toolbar.hide();
            btnArahan && btnArahan.hide();
        }else{
            // toolbar.show();
        }
        comboP.getStore().reload();
        compRetract && compRetract.setDisabled(false);
    },

    onMainview_ClearRecord: function(mainview, unbind){
        var compRetract = this.getCompRetract({root:mainview});        
        compRetract && compRetract.setDisabled(true);
    },

    onPengirim_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        record.getPengirim(function(pengirim){
            cmp.setLoading(false); 
        });
    },

    onSurat_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        record.getDisposisi(function(disposisi){
            if(!disposisi){
                cmp.setLoading(false);
                return;
            }
            disposisi.getSurat(function(surat){
                cmp.setLoading(false); 
            }) 
        });
    },

    onPenerima_LoadAssociate: function(record, form, cmp){
        var store = record.fetchRiwayatPenerima();
        cmp.reconfigure(store);

        store.reload();
    },

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = view,
            record = form.getRecord(),
            $checkSession = this.getApplication().getSession().getResetSession(),
            controllerSurat = $this.getController($this.controllerSurat);

        view.setLoading(true);
        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                view.setLoading(false);
                controllerSurat.launch(surat, function(){
                });
            });
        })
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var mainview = this.getMainview({from:button}),
            record = mainview && mainview.getForm().getRecord(),
            c = this.getController(this.controllerForward);

        if(! record) return;
        c && c.printReportSender(record.getId(), null, null, 'Cetak Lembar Disposisi');
    },

    onCombobox_Expand: function(field){
        var store = field.getStore();
        if( !store.isLoading() && !store.data.getCount()){
            store.reload();
        }
    }
});