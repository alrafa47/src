Ext.define('SIPAS.controller.Sipas.surat.ekspedisi.batal.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.ekspedisi.batal.Popup'
    ],

    models: [
        'Sipas.Surat'
    ],

    messages: {
        'cabut_confirm'     : ['Konfirmasi','Semua distribusi surat akan dibatalkan.<br/>Apakah anda yakin untuk melanjutkan?'],
        'retracting'        : 'Memproses Pembatalan Surat',
        'retract_failure'   : 'Gagal Membatalkan Distribusi. Ditribusi tidak tersedia',
        'retract_success'   : 'Berhasil Membatalkan Distribusi'
    }, 

    refs: [
        { ref: 'mainview',          selector: 'sipas_surat_ekspedisi_batal_popup' },
        { ref: 'form',              selector: 'sipas_surat_ekspedisi_batal_popup > #form' },
        { ref: 'textPesan',         selector: 'sipas_surat_ekspedisi_batal_popup > #form #textPesan' }
    ],

    api: {
        'batal_distribusi': 'server.php/sipas/surat/batalDistribusi'
    },

    init: function(application) {
        this.control({
            // 'sipas_surat_ekspedisi_batal_popup': {
            //     show: this.onMainview_Show
            //     loadrecord: this.onMainview_LoadRecord
            // },
            'sipas_surat_ekspedisi_batal_popup sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        });
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            record: record,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;

        view = $this.createView((function(c){
            c.removeComponents = [];
            c.readonlyComponents = [];
            c.requireComponents = ['#textPesan'];
            c.removeComponents = [];
            
            return c;
        })(config));

        $helper.readonlyComponent({
            parent: view,
            items: {
                '#textPesan' : false
            }
        });

        view.show();
    },

    // onMainview_Show: function(view){
    //     var record = view.record;
    //     view && view.fireEvent('loadrecord', view, record);
    // },

    // onMainview_LoadRecord: function(mainview, record){
    //     var $this = this,
    //         form = $this.getForm({root:mainview}),
    //         record = record || form && form.updateRecord().getRecord();

    //     form.loadRecord(record);
    //     record.reload();
    //     $this.textPesan = record.get('surat_distribusi_cabut_pesan');
    // },

    onButtonSave_Click: function(button, e, eOpts){
        var $this       = this,
            $app        = $this.getApplication(),
            $helper     = $app.Helper(),
            $session    = $app.getSession(),
            checkSession = $session.getResetSession(),
            mainview    = $this.getMainview({from:button}),
            txtPesan    = $this.getTextPesan({root:mainview}),
            pegawai     = $session.getProfile(),
            pegawaiId   = $session.getProfileId(),
            record      = mainview.record,
            msg         = $this.getMessage('cabut_confirm');

        if (!txtPesan.getValue()){
            $helper.showMsg({success: false, message: 'Anda belum memberi komentar'});
        } else {
            mainview.setLoading(true);
            $helper.showConfirm({
                confirmTitle: msg[0],
                confirmText: msg[1],
                callback: function(button){
                    if(button == 'yes'){
                        Ext.Ajax.request({
                            url: $this.getApi('batal_distribusi'),
                            params: {
                                'id' : record.get('surat_id'),
                                'surat_unit' : record.get('surat_unit'),
                                'pesan' : txtPesan.getValue()
                            },
                            callback: function(success, record, eOpts){
                                var message = null;
                                if(success){
                                    mainview.setLoading(false);
                                    message = $this.getMessage('retract_success');
                                    Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                                    $helper.showMsg({success: success, message: message});
                                    mainview.close();
                                }else{
                                    mainview.setLoading(false);
                                    message = $this.getMessage('retract_failure');
                                    $helper.showMsg({success: success, message: message});
                                    Ext.callback(mainview.callback, mainview, [false, record, eOpts]);
                                }
                           } 
                        })
                    } else {
                        mainview.setLoading(false);
                    }
                }
            });
        }
    }
});