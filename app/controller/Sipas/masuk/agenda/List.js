Ext.define('SIPAS.controller.Sipas.masuk.agenda.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',

    stores: [
        'Sipas.masuk.agenda.semua.List',
        'Sipas.masuk.retensi.Combo',
        'Sipas.surat.scope.Combo',
        'Sipas.masuk.agenda.aktif.List',
        'Sipas.masuk.agenda.nonaktif.List',
        'Sipas.masuk.agenda.semua.List'
    ],
    
    views: [
        'Sipas.masuk.agenda.List'
    ],

    api: {
        'datasource':'server.php/sipas/surat_masuk/{status}?scope={scope}&prioritas={priority}'
    },

    refs: [
        { ref: 'mainview',      selector: 'sipas_masuk_agenda_list' },
        { ref: 'btnTambah',     selector: 'sipas_masuk_agenda_list #tambahAgenda' },
        { ref: 'compScope',     selector: 'sipas_masuk_agenda_list #comboScope' },
        { ref: 'compStatus',    selector: 'sipas_masuk_agenda_list combobox[name=tampilcombo]' },
        { ref: 'compPrioritas', selector: 'sipas_masuk_agenda_list combobox[name=comboprioritas]' }
    ],

    defaultStore: 'Sipas.masuk.agenda.semua.List',
    controllerProperty: 'Sipas.masuk.agenda.Prop',
    controllerTransferBebas: 'Sipas.bebas.transfer.Popup',

    init: function(application) {
        this.control({
            "sipas_masuk_agenda_list #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_masuk_agenda_list #tambahAgenda": {
                click: this.onButtonAdd_Click
            },
            "sipas_masuk_agenda_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_masuk_agenda_list combobox[name=tampilcombo]": {
                afterrender: this.onComboStatus_AfterRender,
                select: this.onComboStatus_Select
            },
            "sipas_masuk_agenda_list combobox[name=comboprioritas]": {
                afterrender: this.onComboPrioritas_AfterRender,
                select: this.onComboPrioritas_Select
            },
            "sipas_masuk_agenda_list": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_masuk_agenda_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
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
                propType: 'masuk',
                mode:'add',
                unit: scopeValue,
                model: suratProto.self.modelType().MODEL_MASUK,
                callback: function(success, record){
                    if(success && view){
                        // view.getStore().insert(0, record);
                        view.getStore().reload();
                    }
                }
            });
        }
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.Session(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            role_lihat = $session.getRuleAccess('masuk_lihat'),
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
            if (record.get('surat_properti_pembuat_id') == my_id){
                controllerProperty.launch({
                    propType: 'masuk',
                    unit: scopeValue,
                    model: record.self.modelType().MODEL_MASUK,
                    mode:'view',
                    record: record,
                    callback: function(success, record){
                        view.getStore().reload();
                    }
                });
            } else {
                if (role_lihat){
                    controllerProperty.launch({
                        propType: 'masuk',
                        unit: scopeValue,
                        model: record.self.modelType().MODEL_MASUK,
                        mode:'view',
                        record: record,
                        callback: function(success, record){
                            view.getStore().reload();
                        }
                    });
                } else {
                    $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                }
            }
        }
    },

    onComboStatus_AfterRender: function(component, eOpts){
        component.setLoading(true);
        var $this           = this,
            $app            = $this.getApplication(),
            $session        = $app.getSession(),
            $language       = $app.Language(),
            profile         = $session.getProfile(),
            mainview        = $this.getMainview({from:component}),

            // store = $this.getStore(component.getValue()),
            scope = profile.staf_unit,
            comboProxy = component.getStore().getProxy(),
            comboList = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukBelumDistribusi
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukSudahDistribusi
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukBatalDistribusi
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukAktif
                },
                {
                    value: 5, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukAktif7
                },
                {
                    value: 6, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukAktif3
                },
                {
                    value: 7, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukAktif1
                },
                {
                    value: 8, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukTidakAktif
                },
                {
                    value: 9, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukTerlewatTidakAktif
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

        $this.updateList(scope, 0, mainview);
        component.setValue($language.getGrammar($this.lgMasukAll, false));
        component.setLoading(false);
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            checkSession = $this.getApplication().getSession().getResetSession(),
            compScope = $this.getCompScope({root:mainview}),
            compPrioritas = $this.getCompPrioritas({root:mainview}),
            prioritas = compPrioritas.getValue(),
            scope = compScope.getValue();

        $this.updateList(scope, prioritas, mainview);
    },

    onComboPrioritas_AfterRender: function(component, eOpts){
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
                    languageable: true, languageCode: $this.lgMasukPrioritasAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukPrioritasBlmSelesai
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgMasukPrioritasSelesai
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

        component.setValue($language.getGrammar($this.lgMasukPrioritasAll, false));
        component.setLoading(false);
    },

    onComboPrioritas_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            checkSession = $this.getApplication().getSession().getResetSession(),
            prioritas = combo.getValue(),
            compScope = $this.getCompScope({root:mainview}),
            scope = compScope.getValue();

        $this.updateList(scope, prioritas, mainview);
    },

    onComboScope_AfterRender: function (component, eOpts, button) {
        var $this           = this,
            mainview        = $this.getMainview({from: component}),
            $app            = $this.getApplication(),
            $session        = $app.getSession(),
            profile         = $session.getProfile(),
            checkSession  = $session.getResetSession(),
            view            = $this.getMainview({from:button}),
            btnTambah       = $this.getBtnTambah({root:view}),
            buatSuratMasuk  = $app.LocalSetting().get('use_unit_buat_surat_masuk');

            if (buatSuratMasuk) {
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
    },


    onComboScope_Select: function(combo, selection, eOpts, button){
        var $this           = this,
            mainview        = $this.getMainview({from:combo}),
            compStatus      = $this.getCompStatus({root:mainview}),
            // store = $this.getStore(compStatus.getValue()),
            compPrioritas   = $this.getCompPrioritas({root:mainview}),
            prioritas       = compPrioritas.getValue(),

            $app            = $this.getApplication(),
            $session        = $app.getSession(),
            profile         = $session.getProfile(),

            view            = $this.getMainview({from:button}),
            btnTambah       = $this.getBtnTambah({root:view}),
            buatSuratMasuk  = $app.LocalSetting().get('use_unit_buat_surat_masuk'),

            scope           = combo.getValue();

            if (buatSuratMasuk) {
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

        $this.updateList(scope, prioritas, mainview);
    },

    updateList: function(scope, prioritas, mainview){
        var $this = this,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            compStatus = $this.getCompStatus({root:mainview}),
            storeStatus = compStatus.getStore(),
            store = mainview.getStore(),
            proxy = store.getProxy(),
            api = null,
            status = null;
            
        switch(compStatus.getValue()){
            case 0:
                status = 'read';
            break;
            case 1:
                status = 'blm_distribusi';
            break;
            case 2:
                status = 'distribusi';
            break;
            case 3:
                status = 'batal_distribusi';
            break;
            case 4:
                status = 'aktif';
            break;
            case 5:
                status = 'aktif7';
            break;
            case 6:
                status = 'aktif3';
            break;
            case 7:
                status = 'aktif1';
            break;
            case 8:
                status = 'nonaktif';
            break;
            case 9:
                status = 'terlewat_nonaktif';
            break;
            default:
                status = 'read';
            break;
        }

        switch(prioritas){
            case 1:
                prioritas = 'not_finished';
            break;
            case 2:
                prioritas = 'finished';
            break;
            default:
                prioritas = null;
            break;
        }

        store.removeAll();
        proxy.url = this.getApi('datasource',{status:status, scope:scope, priority:prioritas});
        pagingtoolbar.moveFirst();
        // store.reload();
    }
});