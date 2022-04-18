Ext.define('SIPAS.controller.Sipas.staf.wakil.monitoring.masuk.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.masuk.session.kotak.List',
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
        'Sipas.staf.wakil.monitoring.masuk.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_staf_wakil_monitoring_masuk_list' },
        { ref: 'compApprovalInfo',  selector: 'sipas_staf_wakil_monitoring_masuk_list sipas_disposisi_session_read_info_pane' },
        { ref: 'compApprovalDetail',selector: 'sipas_staf_wakil_monitoring_masuk_list sipas_surat_penyetujuan_detail_pane' },
        { ref: 'compInfo',          selector: 'sipas_staf_wakil_monitoring_masuk_list #groupInfo' }
    ],

    api: {
        pengingat_asisten   : 'server.php/sipas/disposisi_masuk/pengingat_asisten'
    },

    messages: {
        approving: 'Memproses penyetujuan surat',
        approval_failure: 'Gagal menyetujui surat. Surat tidak tersedia.',
        approval_success: 'Berhasil menyetujui surat.',
        invalid_dispo_rahasia: 'Disposisi bersifat rahasia, anda tidak memiliki akses untuk melihat'
    },

    defaultStore: 'Sipas.staf.wakil.monitoring.masuk.List',
    // defaultStore: 'Sipas.masuk.session.kotak.List',

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
            "sipas_staf_wakil_monitoring_masuk_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_staf_wakil_monitoring_masuk_list": {
                afterrender: this.onMainview_AfterRender
            },
            "sipas_staf_wakil_monitoring_masuk_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
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

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            role_asistensi_lihat = $session.getRuleAccess('asistensi_lihat'),
            role_asistensi_pengingat = $session.getRuleAccess('asistensi_pengingat'),
            role_pgs_lihat = $session.getRuleAccess('pgs_lihat'),
            $pengaturan = $app.LocalSetting(),
            //asistensi_baca = $pengaturan.get('asistensi_baca_action'),
            role_dispo_rahasia = $session.getRuleAccess('asistensi_disposisi_rahasia'),
            role_dispo_rahasia_pgs = $session.getRuleAccess('pgs_disposisi_rahasia'),
            pegawaiId = $session.getProfileId(),
            record = selected,
            isAsistensi = view.isAsistensi,
            type = '',
            controllerProperty = $this.getController($this.controllerProperty),
            log = $this.getModel($this.models[2]).create({}),
            params = {
                'id': record.get('disposisi_masuk_id')
            };

        // sudah dicoba pakai event itemdblclick dan sudah di return false,
        // tetap saja masih membuka 2 prop dan mendapat error

        if (isAsistensi) {
            var plt       = view.up('sipas_staf_wakil_monitoring_mainview').down('[name=staf_wakil_plt]'),
                getPlt    = plt.getValue();

            if (getPlt == 'true') {
                type = 'pgs';
            } else {
                type = 'asisten';
            }
        }else{
            type = ''
        }

        if(!record.get('disposisi_masuk_iscabut')){
            if ((type == 'asisten' && !role_asistensi_lihat) || (type == 'pgs' && !role_pgs_lihat)) {
                if (type == 'asisten' && role_asistensi_pengingat && !record.get('disposisi_masuk_ispengingat') && ((record.get('disposisi_masuk_istembusan') == 1 && record.get('disposisi_masuk_isbaca') !== 1) || (record.get('disposisi_masuk_istembusan') == 0 && (record.get('disposisi_masuk_isterus') !== 1 && record.get('disposisi_masuk_aksi') == null)))) {
                    $helper.showConfirm({
                        confirmTitle: 'Pengingat Surat',
                        confirmText : 'Anda memiliki hak akses pengingat. Apakah anda yakin untuk mengingatkan pimpinan ?',
                        callback: function(button){
                            if(button == 'yes'){
                                Ext.Ajax.request({
                                    url: $this.getApi('pengingat_asisten'),
                                    params: params,
                                    success: function(response, eOpts){
                                        var res = Ext.decode(response.responseText),
                                            success = res.success;
                                        view.setLoading(false);
                                        if(!success){
                                            $helper.showMsg({success:false, message:'Gagal mengingatkan pimpinan'});
                                            return;
                                        }
                                        if(success){
                                            $helper.showMsg({success:true, message:'Berhasil mengingatkan pimpinan'});
                                            $this.refresh(view);
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    $helper.showMsg({success: false, message: 'Anda tidak memiliki akses untuk melihat surat'});
                }
            }else {
                $this._clicks++;
                if ($this._clicks <= 1){
                    if((record.get('disposisi_israhasia') && type === 'asisten' && !role_dispo_rahasia) || (record.get('disposisi_israhasia') === 1 && type === 'pgs' && !role_dispo_rahasia_pgs)){
                        $helper.showMsg({success:false, message:$this.getMessage('invalid_dispo_rahasia')});
                        $this._clicks = 0;
                    }else {
                        if(record.get('disposisi_masuk_plt') !== 1){
                            if(isAsistensi){
                                // if (type == 'pgs') {
                                    if(record.get('disposisi_masuk_isbaca') === 1){
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
                                // }else{
                                //     log.reading({
                                //         staf: pegawaiId,
                                //         masuk: record.get('disposisi_masuk_id'),
                                //         callback: function(staf, operation, success){
                                //             if(success){
                                //                 $this.refresh(view);
                                //             }
                                //         }
                                //     });
                                // }
                            }
                        }
                        
                        if(record){
                            controllerProperty.launch({
                                mode:'edit',
                                type: type,
                                isAsistensi: isAsistensi,
                                record: record,
                                callback: function(success, record){
                                    $this.refresh(view);
                                    $this._clicks = 0;
                                }
                            });
                        }
                    }
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