Ext.define('SIPAS.controller.Sipas.keluar.agenda.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',

    stores: [
        'Sipas.keluar.agenda.List',
        'Sipas.surat.scope.Combo',
        // 'Sipas.keluar.session.List'
        'Sipas.keluar.agenda.session.List'
    ],

    views: [
        'Sipas.keluar.agenda.List'
    ],

    api: {
        // 'datasource':'server.php/sipas/surat_keluar/read?scope={scope}',
        // 'datasource2':'server.php/sipas/account/surat_keluar?scope={scope}'
        'datasource':'server.php/sipas/surat_keluar/{status}?scope={scope}',
        'datasource2':'server.php/sipas/account/surat_keluar/{section}?scope={scope}'
    },

    refs: [
        { ref: 'mainview',             selector: 'sipas_keluar_agenda_list' },
        { ref: 'btnTambah',            selector: 'sipas_keluar_agenda_list #tambahAgenda' },
        { ref: 'compScope',            selector: 'sipas_keluar_agenda_list #comboScope' },
        { ref: 'comStatus',            selector: 'sipas_keluar_agenda_list #comboStatus' },
        { ref: 'comStatusSession',     selector: 'sipas_keluar_agenda_list #comboStatusSession' }
    ],

    defaultStore: 'Sipas.keluar.agenda.List',
    controllerProperty: 'Sipas.keluar.agenda.Prop',
    controllerTransfer: 'Sipas.internal.masuk.agenda.transfer.Popup',
    controllerTransferBebas: 'Sipas.bebas.transfer.Popup',
    controllerKorespondensi: 'Sipas.korespondensi.Popup',

    init: function(application) {
        this.control({
            "sipas_keluar_agenda_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_keluar_agenda_list combobox[name=tampilcombo]": {
                afterrender:this.onComboStatus_AfterRender,
                select: this.onComboStatus_Select
            },
            "sipas_keluar_agenda_list #tambahAgenda": {
                click: this.onButtonAdd_Click
            },
            "sipas_keluar_agenda_list #tambahSession": {
                click: this.onButtonAddSession_Click
            },
            "sipas_keluar_agenda_list sipas_com_button_process": {
                click: this.onButtonTransfer_Click
            },
            "sipas_keluar_agenda_list #btnTransfer": {
                click: this.onButtonTransferBebas_Click
            },
            "sipas_keluar_agenda_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_keluar_agenda_list[clickToView=true]": {
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
                    languageable: true, languageCode: $this.lgKeluarAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarDraft
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarDlmSetuju
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarSetuju
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarRevisi
                },
                {
                    value: 5, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarBlmNomor
                },
                {
                    value: 6, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarBlmEkspedisi
                },
                {
                    value: 7, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarSdhEkspedisi
                },
                {
                    value: 8, nama: null,
                    featureable: true, featureName: $this.batalNomor,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarBatalNomor
                },
                {
                    value: 9, nama: null,
                    featureable: true, featureName: $this.batalNomor,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarSalinNomor
                },
                {
                    value: 10, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarAktif
                },
                {
                    value: 11, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarNonaktif
                },
                {
                    value: 12, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgKeluarTerlewatNonaktif
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
        component.setValue($language.getGrammar($this.lgKeluarAll, false));
        component.setLoading(false);
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
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
            message = $this.getMessage('scope_null'),
            suratProto = $this.getModel($this.models[0]).create({}),
            controllerProperty = $this.getController($this.controllerProperty);

        if(scopeValue === null){
            Ext.Msg.alert(message[0], message[1]);
        }
        else{
            controllerProperty.launch({
                propType: 'keluar',
                mode:'add',
                unit: scopeValue,
                model: suratProto.self.modelType().MODEL_KELUAR,
                callback: function(success, record){
                    if(success && view){
                        // view.getStore().insert(0, record);
                        view.getStore().reload();
                    }
                }
            });
        }
    },

    onButtonAddSession_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            view = $this.getMainview({from:button}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            message = $this.getMessage('scope_null'),
            suratProto = $this.getModel($this.models[0]).create({}),
            controllerProperty = $this.getController($this.controllerProperty);

        if(scopeValue === null){
            Ext.Msg.alert(message[0], message[1]);
        }
        else{
            controllerProperty.launch({
                propType: 'skeluar',
                mode:'add',
                unit: scopeValue,
                model: suratProto.self.modelType().MODEL_KELUAR,
                callback: function(success, record){
                    if(success && view){
                        // view.getStore().insert(0, record);
                        view.getStore().reload();
                    }
                }
            });
        }
    },

    onButtonTransfer_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            controllerProperty = $this.getController($this.controllerTransfer);

        controllerProperty.launch({
            mode:'transfer',
            callback: function(success, record){
                view.getStore().reload();
            }
        });
    },

    onButtonTransferBebas_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            controllerPopup = $this.getController($this.controllerTransferBebas);
        
        controllerPopup.launch({
            mode:'transfer',
            propType: 'keluar',
            unit: scopeValue,
            model: 2,
            callback: function(success, record){
                view.getStore().reload();
            }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.Session(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            role_lihat = $session.getRuleAccess('keluar_lihat'),
            view = $this.getMainview({from:model.view}),
            comboScope = $this.getCompScope({root:view}),
            scopeValue = comboScope.getValue(),
            record = selected,
            tanggal = new Date(),
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
            // view.setLoading(true);
            if(view.isSession){
                if(record && (record.get('surat_properti_pembuat_id') == my_id)){
                    controllerProperty.launch({
                        propType: 'skeluar',
                        unit: scopeValue,
                        model: record.self.modelType().MODEL_KELUAR,
                        mode:'view',
                        record: record,
                        afterload: function(records, success, store, viewInstance, grid){
                            // view.setLoading(false);
                        },
                        callback: function(success, record){
                            view.getStore().reload();
                        }
                    });
                } else {
                    if (role_lihat){
                        controllerProperty.launch({
                            propType: 'skeluar',
                            unit: scopeValue,
                            model: record.self.modelType().MODEL_KELUAR,
                            mode:'view',
                            record: record,
                            afterload: function(records, success, store, viewInstance, grid){
                                // view.setLoading(false);
                            },
                            callback: function(success, record){
                                view.getStore().reload();
                            }
                        });
                    } else {
                        $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                    }
                }
            } else{
                if(record && (record.get('surat_properti_pembuat_id') == my_id)){
                    controllerProperty.launch({
                        propType: 'keluar',
                        unit: scopeValue,
                        model: record.self.modelType().MODEL_KELUAR,
                        mode:'view',
                        record: record,
                        afterload: function(records, success, store, viewInstance, grid){
                            // view.setLoading(false);
                        },
                        callback: function(success, record){
                            view.getStore().reload();
                        }
                    });
                } else {
                    if (role_lihat){
                        controllerProperty.launch({
                            propType: 'keluar',
                            unit: scopeValue,
                            model: record.self.modelType().MODEL_KELUAR,
                            mode:'view',
                            record: record,
                            afterload: function(records, success, store, viewInstance, grid){
                                // view.setLoading(false);
                            },
                            callback: function(success, record){
                                view.getStore().reload();
                            }
                        });
                    } else {
                        $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                    }
                }
            }
        }

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
                    btnTambah.setDisabled(false);
                    btnTambah.setTooltip(false);
                }else{
                    btnTambah.setDisabled(true);
                    btnTambah.setTooltip($app.getGrammar('txt_unit_tooltip'));
                }
            }else{
                btnTambah.setDisabled(false);
            }
            
        component.setLoading(true);
        component.getStore().load({
            callback: function(record, operation, success){
                component.setLoading(false);
                component.setValue(profile.staf_unit);
                $this.updateList(profile.staf_unit, mainview);
            }
        });
    },

    onComboScope_Select: function(combo, selection, eOpts, button){
        var $this           = this,
            mainview        = $this.getMainview({from:combo}),
            $app            = $this.getApplication(),
            view            = $this.getMainview({from:button}),
            btnTambah       = $this.getBtnTambah({root:view}),
            buatSuratKeluar = $app.LocalSetting().get('use_unit_buat_surat_keluar'),

            scope           = combo.getValue();

            if (buatSuratKeluar) {
                if (selection[0].get('unit_isbuatsurat') == true) {
                    btnTambah.setDisabled(false);
                    btnTambah.setTooltip(false);
                }else{
                    btnTambah.setDisabled(true);
                    btnTambah.setTooltip($app.getGrammar('txt_unit_tooltip'));
                }
            }else{
                btnTambah.setDisabled(false);
            }

        $this.updateList(scope, mainview);
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
                    status = 'blm_ekspedisi';
                break;
                case 7:
                    status = 'ekspedisi';
                break;
                case 8:
                    status = 'batal_nomor';
                break;
                case 9:
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
                    status = 'blm_ekspedisi';
                break;
                case 7:
                    status = 'ekspedisi';
                break;
                case 8:
                    status = 'batal_nomor';
                break;
                case 9:
                    status = 'salin_nomor';
                break;
                case 10:
                    status = 'aktif';
                break;
                case 11:
                    status = 'nonaktif';
                break;
                case 12:
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