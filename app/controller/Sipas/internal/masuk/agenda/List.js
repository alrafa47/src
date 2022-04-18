Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',
    
    models: [
        'Sipas.Surat'
    ],

    stores: [ /*please do not re-order*/
        'Sipas.internal.masuk.agenda.list.approved.aktif.List', /*default*/
        'Sipas.internal.masuk.agenda.list.unapproved.pending.List', /*default*/
        'Sipas.internal.masuk.agenda.list.approved.nonaktif.List',
        'Sipas.internal.masuk.agenda.list.approved.semua.List',
        'Sipas.internal.masuk.agenda.list.unapproved.tolak.List',
        'Sipas.internal.masuk.agenda.list.unapproved.semua.List'
    ],

    views: [
        'Sipas.internal.masuk.agenda.List'
    ],

    messages: {
        'scope_null' : 'Unit Tidak Boleh Kosong',
        'tipe_null' : 'Tipe Surat Tidak Boleh Kosong'
    },

    api: {
        datasource: 'server.php/sipas/surat_imasuk/{status}?scope={scope}'
    },

    refs:[
        { ref : 'mainview',     selector: 'sipas_internal_masuk_agenda_list'},
        { ref : 'compScope',    selector: 'sipas_internal_masuk_agenda_list #comboScope' },
        // { ref : 'compTipe',     selector: 'sipas_internal_masuk_agenda_list #comboTipe' },
        { ref : 'compStatus',   selector: 'sipas_internal_masuk_agenda_list #comboStatus' }
    ],

    modelDisposisi: 'Sipas.Disposisi',
    controllerProperty: 'Sipas.internal.masuk.agenda.Prop',
    controllerApproval: 'Sipas.internal.masuk.agenda.approval.Popup',
    controllerDistribusi: 'Sipas.internal.masuk.agenda.distribusi.Prop',

    init: function(application) {
        this.control({
            "sipas_internal_masuk_agenda_list toolbar #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            "sipas_internal_masuk_agenda_list toolbar sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_internal_masuk_agenda_list toolbar sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            // "sipas_internal_masuk_agenda_list toolbar #buttonReset": {
            //     click: this.onButtonReset_Click
            // },
            "sipas_internal_masuk_agenda_list toolbar #comboStatus": {
                select: this.onComboStatus_Select,
                afterrender: this.onComboStatus_AfterRender
            },
            // "sipas_internal_masuk_agenda_list toolbar #comboTipe": {
            //     select: this.onComboTipe_Select,
            //     afterrender: this.onComboTipe_AfterRender
            // },
            'sipas_internal_masuk_agenda_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = $this.createView(config);
            
        return view;
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            view = $this.getMainview({from:button}),
            comboScope = $this.getCompScope({root:view}),
            // comboTipe = $this.getCompTipe({root:view}),
            scopeValue = comboScope.getValue(),
            // tipeValue = comboTipe.getValue(),
            messageScope = $this.getMessage('scope_null'),
            messageTipe = $this.getMessage('tipe_null'),
            suratProto = $this.getModel($this.models[0]).create({}),
            controllerProperty = $this.getController($this.controllerProperty);

        if(scopeValue === null){
            Ext.Msg.alert('Peringatan', messageScope);
        }
        else{
            controllerProperty.launch({
                propType: 'imasuk',
                // tipe: tipeValue,
                unit: scopeValue,
                model: suratProto.self.modelType().MODEL_IMASUK,
                mode:'add',
                callback: function(success, record){
                    if(success && view){
                        // view.getStore().insert(0, record);
                        view.getStore().reload();
                    }
                }
            });
        }
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            compScope = $this.getCompScope({root:mainview}),
            // compTipe = $this.getCompTipe({root:mainview}),
            status = combo.getValue(),
            scope = compScope.getValue();
            // tipe = compTipe.getValue();

        // if(tipe == null) tipe = 'all';
    
        $this.updateList(status, scope, mainview);
    },

    onComboStatus_AfterRender: function(component, eOpts){
        component.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $language = $app.Language(),
            profile = $session.getProfile(),
            mainview = $this.getMainview({from:component}),
            // compTipe = $this.getCompTipe({root:mainview}),
            // tipe = compTipe.getValue(),
            // status = component.rawValue,
            scope = profile.staf_unit,
            comboProxy = component.getStore().getProxy(),
            comboList = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukDraft
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukPending
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukTerima
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukTolak
                },
                {
                    value: 5, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukBlmDistribusi
                },
                {
                    value: 6, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukSdhDistribusi
                },
                {
                    value: 7, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukBatalDistribusi
                },
                {
                    value: 8, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukAktif
                },
                {
                    value: 9, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukAktif7
                },
                {
                    value: 10, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukAktif3
                },
                {
                    value: 11, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukAktif1
                },
                {
                    value: 12, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukAktif1
                },
                {
                    value: 13, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukTidakAktif
                },
                {
                    value: 14, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: $this.lgImasukTerlewatTidakAktif
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


        // if(tipe == null) tipe = 'all';
        
        // component.setValue(this.stores[1]);
        component.setValue($language.getGrammar($this.lgImasukAll, false));
        $this.updateList(component.getValue(), scope, mainview);
        component.setLoading(false);
    },

    onComboTipe_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            compStatus = $this.getCompStatus({root:mainview}),
            compScope = $this.getCompScope({root:mainview}),
            // status = compStatus.rawValue,
            status = compStatus.getValue(),
            scope = compScope.getValue(),
            tipe = combo.getValue();

        // $this.updateList(status, scope, tipe, mainview);
    },

    onComboTipe_AfterRender: function (component, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from:component}),
            compScope = $this.getCompScope({root:mainview}),
            compStatus = $this.getCompStatus({root:mainview}),
            comboTipe = $this.getCompTipe({root:mainview});
            // status = compStatus.rawValue,
            status = compStatus.getValue();

        // $this.updateList(status, compScope.getValue(), 'all', mainview);
    },

    onButtonReset_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            compStatus = $this.getCompStatus({root:mainview}),
            compScope = $this.getCompScope({root:mainview}),
            comboTipe = $this.getCompTipe({root:mainview}),
            // status = compStatus.rawValue,
            status = compStatus.getValue();

        comboTipe.setValue(null);
        // $this.updateList(status, compScope.getValue(), 'all', mainview);
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            checkSession = $this.getApplication().getSession().getResetSession(),
            compStatus = $this.getCompStatus({root:mainview}),
            scope = combo.getValue(),
            status = compStatus.getValue();

        $this.updateList(status, scope, mainview);
    },

    onComboScope_AfterRender: function (component, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();
        
        component.setLoading(true);
        component.getStore().load({
            callback: function(record, operation, success){
                component.setLoading(false);
                component.setValue(profile.staf_unit);
            }
        });
    },

    updateList: function(status, scope, mainview){
        var $this = this,
            value = scope,
            pagingtoolbar = mainview.down('pagingtoolbar'),
            stores = mainview.getStore();

        switch(status){
            case 0:
                status = 'read';
            break;
            case 1:
                status = 'draft';
            break;
            case 2:
                status = 'pending';
            break;
            case 3:
                status = 'terima';
            break;
            case 4:
                status = 'tolak';
            break;
            case 5:
                status = 'blm_distribusi';
            break;
            case 6:
                status = 'distribusi';
            break;
            case 7:
                status = 'batal_distribusi';
            break;
            case 8:
                status = 'aktif_list';
            break;
            case 9:
                status = 'aktif7';
            break;
            case 10:
                status = 'aktif3';
            break;
            case 11:
                status = 'aktif1';
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
        // store.removeAll();
        // proxy.url = $this.getApi('datasource',{status:status, scope:scope, tipe: tipe});
        // mainview.reconfigure(store);
        // pagingtoolbar && pagingtoolbar.bindStore(store);
        // store.clearFilter(true);
        // store.removeAll();
        stores.getProxy().url = $this.getApi('datasource',{status:status, scope:scope});
        pagingtoolbar.moveFirst();
        // store.reload();
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $app.Helper(),
            checkSession = $session.getResetSession(),
            role_lihat = $session.getRuleAccess('surat_internal_masuk_lihat'),
            role_distribusi = $session.getRuleAccess('surat_internal_masuk_distribusi'),
            view = $this.getMainview({from:model.view}),
            comboScope = $this.getCompScope({root:view}),
            property = $this.getController($this.controllerDistribusi),
            controllerProperty = $this.getController($this.controllerProperty),
            controllerApproval = $this.getController($this.controllerApproval),
            scopeValue = comboScope.getValue(),
            record = selected,
            tanggal = new Date(),
            useretensi = record.get('surat_useretensi'),
            inaktif_tgl = record.get('surat_inaktif_tgl'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            inaktif_display = Ext.util.Format.date(inaktif_tgl, 'd M Y') ? Ext.util.Format.date(inaktif_tgl, 'd M Y') : '',
            recordForward = $this.getModel($this.modelDisposisi).create({
                'disposisi_tgl':                new Date(),
                'disposisi_staf':               $session.getProfile().staf_id,
                'disposisi_surat':              record.get('surat_id'),
                'disposisi_pengirim_id':        $session.getProfile().staf_id,
                'disposisi_pengirim_nama':      $session.getProfile().staf_nama,
                'disposisi_pengirim_unit_nama': $session.getProfile().unit_nama,
                'disposisi_pelaku':             $session.getProfile().staf_id,
                'disposisi_pelaku_id':          $session.getProfile().staf_id,
                'disposisi_pelaku_nama':        $session.getProfile().staf_nama,
                'disposisi_pelaku_unit_nama':   $session.getProfile().unit_nama,
                'surat_id':                     record.get('surat_id'),
                'surat_agenda':                 record.get('surat_agenda'),
                'surat_nomor':                  record.get('surat_nomor')
            });

        if(inaktif_tgl) inaktif_tgl.setHours(0,0,0,0);
        if(retensi_tgl) retensi_tgl.setHours(0,0,0,0);
        if(tanggal) tanggal.setHours(0,0,0,0);

        var is_inaktif = (inaktif_tgl < tanggal)? 1 : 0,
            is_retensi = (retensi_tgl < tanggal)? 1 : 0;

        if(useretensi && is_inaktif){
            $helper.showMsg({success: false, message: 'Surat telah melewati masa inaktif'});
        }else{
            if(record.get('surat_setuju') === 2 || record.get('surat_setuju') === 1){
                if (role_lihat) {
                    controllerProperty.launch({
                        propType: 'imasuk',
                        unit: scopeValue,
                        model: record.self.modelType().MODEL_IMASUK,
                        mode:'view',
                        record: record,
                        callback: function(success, record){
                            view.getStore().reload();                
                        }
                    });
                } else {
                    if(role_distribusi){
                        if(record.get('surat_isselesai') === 1){
                            $helper.showMsg({success: false, message: 'Anda tidak dapat melihat isi surat ini'});
                        } else {
                            if(useretensi && is_retensi){
                                $helper.showMsg({success: false, message: 'Surat telah melewati masa aktif'});
                            } else {
                                property.launch({
                                    mode: 'distribusi',
                                    record: recordForward,
                                    surat: record,
                                    selfAsPenerima:record,
                                        callback: function(success, record){
                                            view.getStore().reload();                
                                        }
                                });
                            }
                        }
                    } else {
                        $helper.showMsg({success: false, message: 'Anda tidak dapat melihat isi surat ini'});
                    }
                }
            }else{
                controllerApproval.launch({
                    unit: scopeValue,
                    model: record.self.modelType().MODEL_IMASUK,
                    mode:'edit',
                    record: record,
                    callback: function(success, record){
                        view.getStore().reload();                
                    }
                });
            }
        }
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: button});

        $this.refresh(mainview);
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            $app = $this.getApplication(),
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();
        /*changing paging toolbar store based on mainview's store*/
        // pagingtoolbar && pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    }
});