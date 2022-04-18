Ext.define('SIPAS.controller.Sipas.masuk.session.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.masuk.session.List',
        'Sipas.masuk.session.blmbaca.List',
        'Sipas.masuk.session.baca.List',
        'Sipas.masuk.session.terus.List',
        'Sipas.staf.wakil.monitoring.masuk.List',
        'Sipas.staf.wakil.monitoring.masuk.Blmbaca',
        'Sipas.staf.wakil.monitoring.masuk.Baca',
        'Sipas.staf.wakil.monitoring.masuk.Terus'
    ],
    
    models: [
        'Sipas.masuk.Penerima',
        'Sipas.Surat',
        'Sipas.disposisi.masuk.Log' /*please do not remove, for list render*/
    ],
    views: [
        'Sipas.masuk.session.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_masuk_session_list' },
        { ref: 'compApprovalInfo',  selector: 'sipas_masuk_session_list sipas_disposisi_session_read_info_pane' },
        { ref: 'compApprovalDetail',selector: 'sipas_masuk_session_list sipas_surat_penyetujuan_detail_pane' },
        { ref: 'compInfo',          selector: 'sipas_masuk_session_list #groupInfo' }
    ],

    messages: {
        approving: 'Memproses penyetujuan surat',
        approval_failure: 'Gagal menyetujui surat. Surat tidak tersedia.',
        approval_success: 'Berhasil menyetujui surat.'
    },

    defaultStore: 'Sipas.masuk.session.List',

    controllerProperty: 'Sipas.disposisi.session.Prop',
    controllerKorespondensi: 'Sipas.korespondensi.Popup',
    controllerEkspedisi: 'Sipas.ekspedisi.Popup',
    controllerSurat: 'Sipas.surat.Prop',
    controllerForwardProperty: 'Sipas.disposisi.forward.Prop', 
    controllerHistoryPopup: 'Sipas.disposisi.riwayat.Popup',

    modelDisposisi: 'Sipas.Disposisi',
    modelApproval: 'Sipas.surat.penyetujuan.Info',
    modelSuratMasukPenerima: 'Sipas.masuk.Penerima',

    init: function(application) {
        this.control({
            "sipas_masuk_session_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_masuk_session_list": {
                afterrender: this.onMainview_AfterRender
            },
            "sipas_masuk_session_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_masuk_session_list #Status": {
                select: this.onComboStatus_Select
            }
            // "sipas_masuk_session_list #statusMasuk": {
            //     select: this.onComboStatus_Select
            // }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }
        return view;
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();

        /*changing paging toolbar store based on mainview's store*/
        pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    },

    onMainview_AfterRender: function(mainview){
        var $helper = this.getApplication().Helper();

        $helper.hideComponent({
            parent: mainview,
            items:[
                '[name=surat_penyetujuan_status_text]'
            ]
        });
    },

    onMainview_DoReload: function(mainview){
        this.refresh(mainview);
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/masuk_blmbaca';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/masuk_baca';
            break;
            case 3:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/masuk_terus';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/account/masuk';
            break;
        }

        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            $app = $this.getApplication(),
            $session = $app.Session(),
            $pengaturan = $app.LocalSetting(),
            asistensi_baca = $pengaturan.get('asistensi_baca_action'),
            pegawaiId = $session.getProfileId(),
            record = selected,
            isAsistensi = view.isAsistensi,
            controllerProperty = $this.getController($this.controllerProperty),
            log = $this.getModel($this.models[2]).create({});

        if((!isAsistensi) || (isAsistensi && asistensi_baca =="1")){
            if(record.get('disposisi_masuk_isbaca') === record.self.statusBaca().BACA_BACA){
                log.reading({
                    staf: pegawaiId,
                    masuk: record.get('disposisi_masuk_id'),
                    callback: function(staf, operation, success){
                        if(success){
                        }
                    }
                });
            }else{
                record.reading({
                    staf: pegawaiId,
                    callback: function(staf, operation, success){
                        if(success){
                        }
                    }
                });
            }
        }

        if(record){
            controllerProperty.launch({
                mode:'edit',
                record: record,
                callback: function(success, record){
                    $this.refresh(view);
                }
            });
        }
    },

    onButtonDelete_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            store = view.getStore(),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'destroy',
            record: record,
            callback: function(success, record){
                if(success && view){
                    $this.refresh(view);
                }
            }
        });
    },

    onButtonDisposisi_DoForward: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            view = $this.getMainview({from:button}),
            property = this.getController(this.controllerForwardProperty),
            record = view.getSelectionModel().getSelection()[0],
            recordForward = $this.getModel($this.modelDisposisi).create({
                'disposisi_induk':          record.getId(),
                'disposisi_tanggal':        new Date(),
                'disposisi_pengirim':       record.get('disposisi_penerima_penerima'),
                'disposisi_surat':          record.get('disposisi_surat'),
                'pengirim_id':              record.get('disposisi_penerima_penerima'),
                'pengirim_nama':            record.get('penerima_nama'),
                'pengirim_unit_nama':       record.get('penerima_unit_nama'),
                'surat_id':                 record.get('surat_id'),
                'surat_agenda':             record.get('surat_agenda'),
                'surat_nomor':              record.get('surat_nomor')
            });      
            
        recordForward.setInduk(record);
        property.launch({
            mode: 'disposisi',
            record: recordForward,
            selfAsPenerima:record,
            callback: function(){
                record.getDisposisiPenerima(function(dispen){
                    dispen.forwarding();
                });
                $this.refresh(view);
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});
        this.refresh(mainview);
    },

    onButtonCorespondent_Click: function(button, e, eOpts){
        var controllerKorespondensi = this.getController(this.controllerKorespondensi),
            view = this.getMainview({from:button}),
            record = view.getSelectionModel().getSelection()[0],
            korespondensiView = controllerKorespondensi.launch();

        // korespondensiView.setLoading(true);
        record.getSurat(function(surat){
            if(surat){
                surat.getKorespondensi(function(korespondensi){
                    if(korespondensi){
                        controllerKorespondensi.loadByRecord(korespondensi);
                    }
                    korespondensiView.setLoading(false);
                });
            }else{
                korespondensiView.setLoading(false);
            }
        });
    },

    onButtonExpedition_Click: function(button, e, eOpts){
        var view = this.getMainview({from:button}),
            controllerEkspedisi = this.getController(this.controllerEkspedisi),
            record = view.getSelectionModel().getSelection()[0];

        view.setLoading(true);
        record.getSurat(function(surat){
            view.setLoading(false);
            controllerEkspedisi.launch({
                reference: surat,
                callback: function(success){
                    if(success && view){
                        this.refresh(view);
                    }
                    
                }
            });
        });
    },

    onButtonPrintResi_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            record = mainview && mainview.getSelectionModel().getSelection()[0],
            cReveiver = this.getController(this.controllerProperty);
        
        cReveiver.printReport(record.get('surat_masuk_id'), 'Cetak Resi');
    },

    onButtonDisposisi_DoHistory: function(button)
    {
        var $this = this,
            history = $this.getController($this.controllerHistoryPopup),
            view = $this.getMainview({from:button}),
            record = view.getSelectionModel().getSelection()[0];

        history.launch({
            record: record,
            selfAsPenerima: record
        });
    }
});