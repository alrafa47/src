Ext.define('SIPAS.controller.Sipas.tugassaya.session.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.tugassaya.session.List',
        'Sipas.koreksi.session.draf.List',
        'Sipas.masuk.session.kotak.List',
        'Sipas.masuk.session.blmbaca.List',
        'Sipas.masuk.session.baca.List',
        'Sipas.masuk.session.terus.List'
    ],
    
    models: [
        'Sipas.masuk.Penerima',
        'Sipas.Surat',
        'Sipas.disposisi.masuk.Log' /*please do not remove, for list render*/
    ],
    views: [
        'Sipas.tugassaya.session.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_tugassaya_session_list' },
        { ref: 'compApprovalInfo',  selector: 'sipas_tugassaya_session_list sipas_disposisi_session_read_info_pane' },
        { ref: 'compApprovalDetail',selector: 'sipas_tugassaya_session_list sipas_surat_penyetujuan_detail_pane' },
        { ref: 'compInfo',          selector: 'sipas_tugassaya_session_list #groupInfo' },
        { ref: 'cmbStatus',         selector: 'sipas_tugassaya_session_list #status' }
    ],

    messages: {
        approving: 'Memproses penyetujuan surat',
        approval_failure: 'Gagal menyetujui surat. Surat tidak tersedia.',
        approval_success: 'Berhasil menyetujui surat.'
    },

    defaultStore: 'Sipas.tugassaya.session.List',

    controllerProperty: 'Sipas.disposisi.session.Prop',
    controllerKorespondensi: 'Sipas.korespondensi.Popup',
    controllerEkspedisi: 'Sipas.ekspedisi.Popup',
    controllerSurat: 'Sipas.surat.Prop',
    controllerForwardProperty: 'Sipas.disposisi.forward.Prop', 
    controllerHistoryPopup: 'Sipas.disposisi.riwayat.Popup',
    controllerKoreksi: 'Sipas.koreksi.session.Prop',

    // language for combo selection
    lgTugasAll          : 'cmb_tugas_all',
    lgTugasDisposisi    : 'cmb_tugas_disposisi',
    lgTugasEksternal    : 'cmb_tugas_eks',
    lgTugasInternal     : 'cmb_tugas_int',
    lgTugasDraf         : 'cmb_tugas_draf',

    modelDisposisi: 'Sipas.Disposisi',
    modelApproval: 'Sipas.surat.penyetujuan.Info',
    modelSuratMasukPenerima: 'Sipas.masuk.Penerima',
    modelKoreksi: 'Sipas.koreksi.Masuk',

    featureDisposisi: 'disposisi' ,
    featureNotadinas: 'nota_dinas',

    roleDisposisi: 'disposisi',
    roleNotadinas: 'notadinas',

    _clicks : 0,

    init: function(application) {
        this.control({
            "sipas_tugassaya_session_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_tugassaya_session_list": {
                afterrender: this.onMainview_AfterRender
            },
            "sipas_tugassaya_session_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_tugassaya_session_list #status": {
                select: this.onComboStatus_Select
            }
        });
    },

    launch: function(config) {
        var selectionCombo = [
            {
                value: 0, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgTugasAll
            },
            {
                value: 1, nama: null,
                featureable: true, featureName: this.featureDisposisi,
                roleable: false, roleName: this.roleDisposisi,
                languageable: true, languageCode: this.lgTugasDisposisi
            },
            {
                value: 2, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: this.roleNotadinas,
                languageable: true, languageCode: this.lgTugasEksternal
            },
            {
                value: 3, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgTugasInternal
            },
            {
                value: 4, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgTugasDraf
            }
        ];

        var $this = this,
            view = this.createView(config),
            mainview = view || this.createView(config),
            $app = this.getApplication(),
            $session = $app.Session(),
            $feature = $app.Feature(),
            $language = $app.Language(),
            viewStore = mainview.getStore(),
            cmbStatus = $this.getCmbStatus({root:mainview}),
            storeCom = cmbStatus.getStore().getProxy(),
            comboSelectionList = Ext.clone(selectionCombo),
            comboStore = cmbStatus.getStore(),
            comboProxy = comboStore.getProxy();

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }

        Ext.each(comboSelectionList, function(item, index, all)
        {
            if(item.featureable){
                if (!$feature.getFeatureAccess(item.featureName)){
                    all.splice(index, 1); return;
                }
            }
            if(item.roleable){
                if (!$session.getRuleAccess(item.roleName)){
                    all.splice(index, 1); return;
                }
            }
            if(item.languageable){
                var grammar = $language.getGrammar(item.languageCode, false);
                item.nama = grammar;
            }
        }, this, true);

        comboStore.getProxy().data = comboSelectionList;
        cmbStatus.setValue($language.getGrammar(this.lgTugasAll, false));

        // viewStore.getProxy().url = 'server.php/sipas/kotak_masuk/tugassaya';

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
        var $helper = this.getApplication().Helper(),
            checkSession = this.getApplication().getSession().getResetSession();

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
            checkSession = $this.getApplication().getSession().getResetSession(),
            store = mainview.getStore(),
            cmbStatus = $this.getCmbStatus({root:mainview}),
            comboStore = cmbStatus.getStore(),
            storeComboList = Ext.clone(comboStore.getProxy().data);

        switch(value){
            case 0:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/tugassaya';
            break;
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/tugassaya/disposisi';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/tugassaya/eksternal';
            break;
            case 3:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/tugassaya/internal';
            break;
            case 4:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/tugassaya/draf';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/tugassaya';
            break;
        }

        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $pengaturan = $app.LocalSetting(),
            // asistensi_baca = $pengaturan.get('asistensi_baca_action'),
            pegawaiId = $session.getProfileId(),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty),
            controllerKoreksi = $this.getController($this.controllerKoreksi),
            statusPenyetujuan = record.get('disposisi_masuk_status'),
            iscabut = record.get('disposisi_masuk_iscabut'),
            mode = record.get('disposisi_mode'),
            log = $this.getModel($this.models[2]).create({});
        // sudah dicoba pakai event itemdblclick dan sudah di return false,
        // tetap saja masih membuka 2 prop dan mendapat error
        
        if(!record.get('disposisi_masuk_iscabut')){
            $this._clicks++;

            if(record && $this._clicks <= 1){
                if (mode === "Draf" || mode === "Petikan"){
                    if(statusPenyetujuan){
                        mode = 'view';
                    } else {
                        mode = 'edit';
                    }
                    record.getKoreksiMasuk(function(koreksi){
                        if(koreksi.get('disposisi_masuk_plt') !== 1){
                            if(koreksi.get('disposisi_masuk_isbaca') === 1){
                                if(koreksi.get('disposisi_masuk_ispengingat')){
                                    log.ingatkan({
                                        staf: $session.getProfile().staf_id,
                                        masuk: koreksi.get('disposisi_masuk_id'),
                                        callback: function(staf, operation, success){
                                            if(success){
                                                $this.refresh(view);
                                            }
                                        }
                                    });  
                                }
                                log.reading({
                                    staf: $session.getProfile().staf_id,
                                    masuk: koreksi.get('disposisi_masuk_id'),
                                    callback: function(staf, operation, success){
                                        if(success){
                                            $this.refresh(view);
                                        }
                                    }
                                });    
                            }else{
                                koreksi.reading({
                                    staf: $session.getProfile().staf_id,
                                    callback: function(staf, operation, success){
                                        if(success){
                                            $this.refresh(view);
                                        }
                                    }
                                });
                            }
                        }
                        controllerKoreksi.launch({
                            mode: mode,
                            record: koreksi,
                            callback: function(success, record){
                                if(success && view){
                                    $this.refresh(view);
                                }
                                $this._clicks = 0;
                            }
                        });
                    });
                } else {
                    if(record.get('disposisi_masuk_plt') !== 1){
                        if(record.get('disposisi_masuk_isbaca') === record.self.statusBaca().BACA_BACA){
                            if(record.get('disposisi_masuk_ispengingat')){
                                log.ingatkan({
                                    staf: $session.getProfile().staf_id,
                                    masuk: record.get('disposisi_masuk_id'),
                                    callback: function(staf, operation, success){
                                        if(success){
                                            $this.refresh(view);
                                        }
                                    }
                                });  
                            }
                            log.reading({
                                staf: pegawaiId,
                                masuk: record.get('disposisi_masuk_id'),
                                callback: function(staf, operation, success){
                                    if(success){
                                        $this.refresh(view);
                                    }
                                }
                            });
                        }else{
                            record.reading({
                                staf: pegawaiId,
                                callback: function(staf, operation, success){
                                    if(success){
                                        $this.refresh(view);
                                    }
                                }
                            });
                        }
                    }

                    controllerProperty.launch({
                        mode:'edit',
                        record: record,
                        callback: function(success, record){
                            $this.refresh(view);
                            $this._clicks = 0;
                        }
                    });
                }
            }
        }else {
            $helper.showMsg({success: false, message: 'Surat ini telah dibatalkan'});
            // return;
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
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:button});
            
        $this.refresh(mainview);
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