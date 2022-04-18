Ext.define('SIPAS.controller.Sipas.internal.keluar.agenda.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',
        
    stores: [
        'Sipas.internal.keluar.agenda.List',
        // 'Sipas.internal.keluar.session.List',
        'Sipas.internal.keluar.agenda.session.List',
        'Sipas.itipe.Combo',
        'Sipas.surat.scope.Combo'
    ],
    
    views: [
        'Sipas.internal.keluar.agenda.List'
    ],

    refs: [
        { ref: 'mainview',              selector: 'sipas_internal_keluar_agenda_list' },
        { ref: 'btnTambah',             selector: 'sipas_internal_keluar_agenda_list #tambahAgenda' },
        { ref: 'dataview',              selector: 'sipas_internal_keluar_agenda_list dataview' },
        { ref: 'compInfo',              selector: 'sipas_internal_keluar_agenda_list #groupInfo' },
        { ref: 'compScope',             selector: 'sipas_internal_keluar_agenda_list #comboScope' },
        { ref: 'comStatus',             selector: 'sipas_internal_keluar_agenda_list #comboStatus' },
        { ref: 'comStatusSession',      selector: 'sipas_internal_keluar_agenda_list #comboStatusSession' }
        // { ref: 'compTipe',              selector: 'sipas_internal_keluar_agenda_list #comboTipe' }
    ],
    
    api: {
        // datasource: 'server.php/sipas/surat_ikeluar/read?scope={scope}',
        // datasource2: 'server.php/sipas/account/surat_ikeluar?scope={scope}'
        datasource: 'server.php/sipas/surat_ikeluar/{status}?scope={scope}',
        datasource2: 'server.php/sipas/account/surat_ikeluar/{section}?scope={scope}'
    },

    controllerProperty: 'Sipas.internal.keluar.agenda.Prop',
    controllerTransferBebas: 'Sipas.bebas.transfer.Popup',

    init: function(application) {
        this.control({
            "sipas_internal_keluar_agenda_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_internal_keluar_agenda_list combobox[name=tampilcombo]": {
                afterrender:this.onComboStatus_AfterRender,
                select: this.onComboStatus_Select
            },
            "sipas_internal_keluar_agenda_list #tambahAgenda": {
                click: this.onButtonAdd_Click
            },
            "sipas_internal_keluar_agenda_list #tambahSession": {
                click: this.onButtonAddSession_Click
            },
            "sipas_internal_keluar_agenda_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_internal_keluar_agenda_list #buttonReset": {
                click: this.onButtonReset_Click
            },
            // "sipas_internal_keluar_agenda_list #comboTipe": {
            //     select: this.onComboTipe_Select,
            //     afterrender: this.onComboTipe_AfterRender
            // },
            "sipas_internal_keluar_agenda_list #btnTransfer": {
                click: this.onButtonTransferBebas_Click
            },
            "sipas_internal_keluar_agenda_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    onComboStatus_AfterRender: function(component, eOpts){
        component.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $language = $app.Language(),
            profile = $session.getProfile(),
            mainview = $this.getMainview({from:component}),
            // store = $this.getStore(component.getValue()),
            scope = profile.staf_unit,
            comboProxy = component.getStore().getProxy(),
            comboList = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarDraft
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarDlmSetuju
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarSetuju
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarRevisi
                },
                {
                    value: 5, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarBlmNomor
                },
                {
                    value: 6, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarBlmTerima
                },
                {
                    value: 7, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarSdhTerima
                },
                {
                    value: 8, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarTolak
                },
                {
                    value: 9, nama: null,
                    featureable: true, featureName: $this.batalNomor,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarBatalNomor
                },
                {
                    value: 10, nama: null,
                    featureable: true, featureName: $this.batalNomor,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarSalinNomor
                },
                {
                    value: 11, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarAktif
                },
                {
                    value: 12, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarNonaktif
                },
                {
                    value: 13, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgIkeluarTerlewatNonaktif
                }
            ],
            selectionList = Ext.clone(comboList);

        Ext.each(selectionList, function(item, index, all)
        {
            if(item.languageable)
            {
                var grammar = $language.getGrammar(item.languageCode, false);
                item.nama = grammar;
            }
        }, this, true);

        comboProxy.data = selectionList;

        // $this.updateList(scope, mainview);
        component.setValue($language.getGrammar($this.lgIkeluarAll, false));
        component.setLoading(false);
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            // store = $this.getStore(combo.getValue()),
            compScope = $this.getCompScope({root:mainview}),
            scope = compScope.getValue();

        $this.updateList(scope, mainview);
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            view = $this.getMainview({from:button}),
            checkSession = $app.getSession().getResetSession(),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            // comboTipe = $this.getCompTipe({root:view}),
            // tipeValue = comboTipe.getValue(),
            message = $this.getMessage('scope_tipe_null'),
            suratProto = $this.getModel($this.models[0]).create({}),
            controllerProperty = $this.getController($this.controllerProperty);

        if(scopeValue === null){
            Ext.Msg.alert(message[0], message[1]);
        }
        else{
            controllerProperty.launch({
                propType: 'ikeluar',
                mode:'add',
                // tipe: tipeValue,
                unit: scopeValue,
                model: suratProto.self.modelType().MODEL_IKELUAR,
                callback: function(success, record){
                    if(success && view){
                    }
                        // view.getStore().insert(0, record);
                        view.getStore().reload();
                }
            });
        }
    },

    onButtonTransferBebas_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            checkSession = $this.getApplication().getSession().getResetSession(),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            // comboTipe = $this.getCompTipe({root:view}),
            // tipeValue = comboTipe.getValue(),
            message = $this.getMessage('scope_tipe_null'),
            controllerPopup = $this.getController($this.controllerTransferBebas);
        
        if(scopeValue === null){
            Ext.Msg.alert(message[0], message[1]);
        }
        else{
            controllerPopup.launch({
                mode:'transfer',
                propType: 'ikeluar',
                unit: scopeValue,
                // tipe: tipeValue,
                model: 4,
                callback: function(success, record){
                    view.getStore().reload();
                }
            });
        }
    },

    onButtonAddSession_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            view = $this.getMainview({from:button}),
            checkSession = $app.getSession().getResetSession(),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            // comboTipe = $this.getCompTipe({root:view}),
            // tipeValue = comboTipe.getValue(),
            message = $this.getMessage('scope_tipe_null'),
            suratProto = $this.getModel($this.models[0]).create({}),
            controllerProperty = $this.getController($this.controllerProperty);
        
        if(scopeValue === null/* || tipeValue === null || tipeValue === 'all'*/){
            Ext.Msg.alert(message[0], message[1]);
        }
        else{
            controllerProperty.launch({
                propType: 'sikeluar',
                mode:'add',
                // tipe: tipeValue,
                unit: scopeValue,
                model: suratProto.self.modelType().MODEL_IKELUAR,
                callback: function(success, record){
                    if(success && view){
                    }
                        // view.getStore().insert(0, record);
                        view.getStore().reload();
                }
            });
        }
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            role_lihat = $session.getRuleAccess('ikeluar_lihat'),
            view = $this.getMainview({from:model.view}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            // comboTipe = $this.getCompTipe({root:view}),
            // tipeValue = comboTipe.getValue(),
            tanggal = new Date(),
            record = selected,
            useretensi = record.get('surat_useretensi'),
            inaktif_tgl = record.get('surat_inaktif_tgl'),
            inaktif_display = Ext.util.Format.date(inaktif_tgl, 'd M Y') ? Ext.util.Format.date(inaktif_tgl, 'd M Y') : '',
            controllerProperty = $this.getController($this.controllerProperty),
            my_id = $session.getProfileId();

        if(inaktif_tgl) inaktif_tgl.setHours(0,0,0,0);
        if(tanggal) tanggal.setHours(0,0,0,0);

        var is_inaktif = (inaktif_tgl < tanggal)? 1 : 0;

        if(useretensi && is_inaktif){
            $helper.showMsg({success: false, message: 'Surat telah melewati masa inaktif'});
        }else{
            if(record.get('surat_properti_pembuat_id') == my_id){
                if(record.get('surat_tolak_isbaca') === 0 && record.get('surat_imasuk_tolak') > 0){
                    record.readingTolak({
                        staf: $session.getProfile().staf_id,
                        callback: function(staf, operation, success){
                            if(success){
                            }
                                view.getStore().reload();
                        }
                    });    
                }

                if(record.get('surat_sla_tolak_isbaca') === 0 && record.get('surat_sla_tolak_jumlah') > 0){
                    record.readingSlaTolak({
                        staf: $session.getProfile().staf_id,
                        callback: function(staf, operation, success){
                            if(success){
                                view.getStore().reload();
                            }
                        }
                    });    
                }

                if(record.get('surat_ulasan_isbaca') === 0 && record.get('surat_imasuk_ulasan_jumlah') > 0){
                    record.readingUlasan({
                        staf: $session.getProfile().staf_id,
                        callback: function(staf, operation, success){
                            if(success){
                                view.getStore().reload();
                            }
                        }
                    });    
                }

                if(view.isSession){
                    controllerProperty.launch({
                        propType: 'sikeluar',
                        unit: scopeValue,
                        // tipe: tipeValue,
                        model: record.self.modelType().MODEL_IKELUAR,
                        mode:'view',
                        record: record,
                        callback: function(success, record){
                            view.getStore().reload();
                            if(success && view){
                            }
                        }
                    });
                }
                else{
                    controllerProperty.launch({
                        propType: 'ikeluar',
                        unit: scopeValue,
                        // tipe: tipeValue,
                        model: record.self.modelType().MODEL_IKELUAR,
                        mode:'view',
                        record: record,
                        callback: function(success, record){
                            view.getStore().reload();
                            if(success && view){
                            }
                        }
                    });
                }
            } else {
                if (role_lihat){
                    if(record.get('surat_tolak_isbaca') === 0 && record.get('surat_imasuk_tolak') > 0){
                        record.readingTolak({
                            staf: $session.getProfile().staf_id,
                            callback: function(staf, operation, success){
                                if(success){
                                    view.getStore().reload();
                                }
                            }
                        });    
                    }

                    if(record.get('surat_sla_tolak_isbaca') === 0 && record.get('surat_sla_tolak_jumlah') > 0){
                        record.readingSlaTolak({
                            staf: $session.getProfile().staf_id,
                            callback: function(staf, operation, success){
                                if(success){
                                    view.getStore().reload();
                                }
                            }
                        });    
                    }

                    if(record.get('surat_ulasan_isbaca') === 0 && record.get('surat_imasuk_ulasan_jumlah') > 0){
                        record.readingUlasan({
                            staf: $session.getProfile().staf_id,
                            callback: function(staf, operation, success){
                                if(success){
                                    view.getStore().reload();
                                }
                            }
                        });    
                    }

                    if(view.isSession){
                        controllerProperty.launch({
                            propType: 'sikeluar',
                            unit: scopeValue,
                            // tipe: tipeValue,
                            model: record.self.modelType().MODEL_IKELUAR,
                            mode:'view',
                            record: record,
                            callback: function(success, record){
                                view.getStore().reload();
                                if(success && view){
                                }
                            }
                        });
                    }
                    else{
                        controllerProperty.launch({
                            propType: 'ikeluar',
                            unit: scopeValue,
                            // tipe: tipeValue,
                            model: record.self.modelType().MODEL_IKELUAR,
                            mode:'view',
                            record: record,
                            callback: function(success, record){
                                view.getStore().reload();
                                if(success && view){
                                }
                            }
                        });
                    }
                } else {
                    $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                }
            }
        }

    },

    onComboScope_Select: function(combo, selection, eOpts, button){
        var $this           = this,
            mainview        = $this.getMainview({from:combo}),
            $app            = $this.getApplication(),
            view            = $this.getMainview({from:button}),
            btnTambah       = $this.getBtnTambah({root:view}),
            buatSuratKeluar = $app.LocalSetting().get('use_unit_buat_surat_keluar'),
            checkSession = this.getApplication().getSession().getResetSession(),
            scope = combo.getValue();

            if (buatSuratKeluar) {
                if (selection[0].get('unit_isbuatsurat') == true) {
                    btnTambah && btnTambah.setDisabled(false);
                    btnTambah.setTooltip(false);
                }else{
                    btnTambah && btnTambah.setDisabled(true);
                    btnTambah.setTooltip($app.getGrammar('txt_unit_tooltip'));
                }
            }else{
                btnTambah && btnTambah.setDisabled(false);
            }

        // if(tipe == null) tipe = 'all';
        $this.updateList(scope, mainview);
    },

    onComboTipe_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            scope = $this.getCompScope({root:mainview}).getValue(),
            tipe = combo.getValue(),
            checkSession = this.getApplication().getSession().getResetSession();

        // $this.updateList(scope, tipe, mainview);
    },

    onButtonReset_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            comboTipe = $this.getCompTipe({root:mainview}),
            comboScope = $this.getCompScope({root:mainview});

        comboTipe.setValue(null);
        // $this.updateList(comboScope.getValue(), 'all', mainview);
    },

    onComboScope_AfterRender: function (component, eOpts, button) {
        var $this           = this,
            mainview        = $this.getMainview({from: component}),
            $app            = $this.getApplication(),
            $session        = $app.getSession(),
            profile         = $session.getProfile(),
            view            = $this.getMainview({from:button}),
            btnTambah       = $this.getBtnTambah({root:view}),
            buatSuratKeluar = $app.LocalSetting().get('use_unit_buat_surat_keluar');

            if (buatSuratKeluar) {
                if (profile.unit_isbuatsurat) {
                    btnTambah && btnTambah.setDisabled(false);
                    btnTambah.setTooltip(false);
                }else{
                    btnTambah && btnTambah.setDisabled(true);
                    btnTambah.setTooltip($app.getGrammar('txt_unit_tooltip'));
                }
            }else{
                btnTambah && btnTambah.setDisabled(false);
            }
        
        component.setLoading(true);
        component.getStore().load({
            callback: function(record, operation, success){
                component.setLoading(false);
                component.setValue(profile.staf_unit);
            }
        });

        $this.updateList(profile.staf_unit, mainview);
    },

    updateList: function(scope, mainview){
        var $this = this,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            store = mainview.getStore(),
            proxy = store.getProxy(),
            status = null;

        if (mainview.isSession){
            var comStatusSession = $this.getComStatusSession({root:mainview}),
                storeStatusSession = comStatusSession.getStore();

            switch(comStatusSession.getValue()){
                case 0:
                    status = 'read';
                break;
                case 1:
                    status = 'draft';
                break;
                case 2:
                    status = 'dlm_setuju';
                break;
                case 3:
                    status = 'setuju';
                break;
                case 4:
                    status = 'revisi';
                break;
                case 5:
                    status = 'blm_nomor';
                break;
                case 6:
                    status = 'blm_terima';
                break;
                case 7:
                    status = 'terima';
                break;
                case 8:
                    status = 'tolak';
                break;
                case 9:
                    status = 'batal_nomor';
                break;
                case 10:
                    status = 'salin_nomor';
                break;
                default:
                    status = 'read';
                break;
            }
            store.removeAll();
            proxy.url = $this.getApi('datasource2',{section:status, scope:scope});
        } else {
            var comStatus = $this.getComStatus({root:mainview}),
                storeStatus = comStatus.getStore();

            switch(comStatus.getValue()){
                case 0:
                    status = 'read';
                break;
                case 1:
                    status = 'draft';
                break;
                case 2:
                    status = 'dlm_setuju';
                break;
                case 3:
                    status = 'setuju_list';
                break;
                case 4:
                    status = 'revisi';
                break;
                case 5:
                    status = 'blm_nomor';
                break;
                case 6:
                    status = 'blm_terima';
                break;
                case 7:
                    status = 'terima';
                break;
                case 8:
                    status = 'tolak';
                break;
                case 9:
                    status = 'batal_nomor';
                break;
                case 10:
                    status = 'salin_nomor';
                break;
                case 11:
                    status = 'aktif';
                break;
                case 12:
                    status = 'nonaktif';
                break;
                case 13:
                    status = 'terlewat_nonaktif';
                break;
                default:
                    status = 'read';
                break;
            }
            store.removeAll();
            proxy.url = $this.getApi('datasource',{status:status, scope:scope});
        }
        
        pagingtoolbar.moveFirst();
        // store.reload();
    }
});