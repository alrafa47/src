Ext.define('SIPAS.controller.Sipas.masuk.session.kotak.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
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
        'Sipas.masuk.session.kotak.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_masuk_session_kotak_list' },
        { ref: 'compApprovalInfo',  selector: 'sipas_masuk_session_kotak_list sipas_disposisi_session_read_info_pane' },
        { ref: 'compApprovalDetail',selector: 'sipas_masuk_session_kotak_list sipas_surat_penyetujuan_detail_pane' },
        { ref: 'compInfo',          selector: 'sipas_masuk_session_kotak_list #groupInfo' },
        { ref: 'cmbStatus',         selector: 'sipas_masuk_session_kotak_list #status' }
    ],

    messages: {
        approving: 'Memproses penyetujuan surat',
        approval_failure: 'Gagal menyetujui surat. Surat tidak tersedia.',
        approval_success: 'Berhasil menyetujui surat.'
    },

    defaultStore: 'Sipas.masuk.session.kotak.List',

    controllerProperty: 'Sipas.disposisi.session.Prop',
    controllerKorespondensi: 'Sipas.korespondensi.Popup',
    controllerEkspedisi: 'Sipas.ekspedisi.Popup',
    controllerSurat: 'Sipas.surat.Prop',
    controllerForwardProperty: 'Sipas.disposisi.forward.Prop', 
    controllerHistoryPopup: 'Sipas.disposisi.riwayat.Popup',

    modelDisposisi: 'Sipas.Disposisi',
    modelApproval: 'Sipas.surat.penyetujuan.Info',
    modelSuratMasukPenerima: 'Sipas.masuk.Penerima',

    featureDisposisi    : 'disposisi',
    featureNotadinas    : 'nota_dinas',

    roleDisposisi       : 'disposisi',
    roleNotadinas       : 'notadinas',

    lgKMasukAll         : "cmb_kmasuk_all",
    lgKMasukDisposisi   : "cmb_kmasuk_disposisi",
    lgKMasukNotaDinas   : "cmb_kmasuk_notadinas",
    lgKMasukEks         : "cmb_kmasuk_eks",
    lgKMasukInt         : "cmb_kmasuk_int",
    lgKMasukTembusan    : "cmb_kmasuk_tembusan",
    lgKMasukBerkas      : "cmb_kmasuk_berkas",
    lgKMasukTerus       : "cmb_kmasuk_terus",

    _clicks : 0,

    init: function(application) {
        this.control({
            "sipas_masuk_session_kotak_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_masuk_session_kotak_list": {
                afterrender: this.onMainview_AfterRender
            },
            "sipas_masuk_session_kotak_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_masuk_session_kotak_list #status": {
                select: this.onComboStatus_Select
            }
        });
    },

    launch: function(config) {
        var storeCombo = [
            {
                value: 0, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgKMasukAll
            },
            {
                value: 1, nama: null,
                featureable: true, featureName: this.featureDisposisi,
                roleable: false, roleName: this.roleDisposisi,
                languageable: true, languageCode: this.lgKMasukDisposisi
            },
            {
                value: 2, nama: null,
                featureable: true, featureName: this.featureNotadinas,
                roleable: false, roleName: this.roleNotadinas,
                languageable: true, languageCode: this.lgKMasukNotaDinas
            },
            {
                value: 3, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgKMasukEks
            },
            {
                value: 4, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgKMasukInt
            },
            /*{ || NOT YET ||
                value: 5, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgKMasukTembusan
            },
            {
                value: 6, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgKMasukBerkas
            },*/
            {
                value: 7, nama: null,
                featureable: false, featureName: null,
                roleable: false, roleName: null,
                languageable: true, languageCode: this.lgKMasukTerus
            }
        ];

        var $this = this,
            view = this.createView(config),
            mainview = view || this.createView(config),
            $app = this.getApplication(),
            $session = $app.Session(),
            $feature = $app.Feature(),
            $language = $app.Language(),
            cmbStatus = $this.getCmbStatus({root:mainview}),
            storeCom = cmbStatus.getStore().getProxy(),
            storeComboList = Ext.clone(storeCombo),
            comboStore = cmbStatus.getStore(),
            comboProxy = comboStore.getProxy(),
            viewStore = mainview.getStore(),
            withDisposisi = false,
            withNotadinas = false;

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }

        Ext.each(storeComboList, function(item, index, all)
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

        comboStore.getProxy().data = storeComboList;

        // Ext.each(storeComboList, function(item, index, all)
        // {
        //     if (item.roleName === $this.roleDisposisi){
        //         withDisposisi = true;
        //     } else if (item.roleName === $this.roleNotadinas){
        //         withNotadinas = true;
        //     }
        // }, this, true);

        cmbStatus.setValue($language.getGrammar(this.lgKMasukAll, false));
        // viewStore.getProxy().url = 'server.php/sipas/kotak_masuk/surat_all';
        // viewStore.getProxy().url = 'server.php/sipas/kotak_masuk/surat_all?disposisi='+withDisposisi+'&notadinas='+withNotadinas;
        return view;
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
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
        var $checkSession = this.getApplication().getSession().getResetSession(),
            $helper = this.getApplication().Helper();

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
            $checkSession = $this.getApplication().getSession().getResetSession(),
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore(),
            cmbStatus = $this.getCmbStatus({root:mainview}),
            comboStore = cmbStatus.getStore(),
            storeComboList = Ext.clone(comboStore.getProxy().data),
            withDisposisi = false,
            withNotadinas = false;

        // Ext.each(storeComboList, function(item, index, all)
        // {
        //     if (item.roleName === $this.roleDisposisi){
        //         withDisposisi = true;
        //     } else if (item.roleName === $this.roleNotadinas){
        //         withNotadinas = true;
        //     }
        // }, this, true);

        switch(value){
            case 0:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/surat_all';
                // store.getProxy().url = 'server.php/sipas/kotak_masuk/surat_all?disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/disposisimasuk';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/notadinas';
            break;
            case 3:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/suratmasuk_eks';
            break;
            case 4:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/suratmasuk_int';
            break;
            // case 5:
            //     store.removeAll();
            //     store.getProxy().url = 'server.php/sipas/kotak_masuk/tembusan';
            // break;
            // case 6:
            //     store.removeAll();
            //     store.getProxy().url = 'server.php/sipas/kotak_masuk/terimaberkas';
            // break;
            case 7:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/teruskan';
                // store.getProxy().url = 'server.php/sipas/kotak_masuk/teruskan?disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/kotak_masuk/surat_all';
                // store.getProxy().url = 'server.php/sipas/kotak_masuk/surat_all?disposisi='+withDisposisi+'&notadinas='+withNotadinas;
            break;
        }

        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            $pengaturan = $app.LocalSetting(),
            asistensi_baca = $pengaturan.get('asistensi_baca_action'),
            pegawaiId = $session.getProfileId(),
            record = selected,
            // isAsistensi = view.isAsistensi,
            controllerProperty = $this.getController($this.controllerProperty),
            log = $this.getModel($this.models[2]).create({});

        // sudah dicoba pakai event itemdblclick dan sudah di return false,
        // tetap saja masih membuka 2 prop dan mendapat error

        if(!record.get('disposisi_masuk_iscabut')){
            $this._clicks++;
            if ($this._clicks <= 1){
                if(record.get('disposisi_masuk_plt') !== 1){
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
                            $this._clicks = 0;
                        }
                    });
                }
            }
        } else {
            $helper.showMsg({success:false, message:'Surat ini telah dibatalkan'});
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
        var $checkSession = this.getApplication().getSession().getResetSession(),
            mainview = this.getMainview({from:button});
            
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