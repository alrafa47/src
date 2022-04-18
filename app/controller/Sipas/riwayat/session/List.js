Ext.define('SIPAS.controller.Sipas.riwayat.session.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores:[
        'Sipas.riwayat.session.Aktif',
        // 'Sipas.riwayat.session.List',
        'Sipas.riwayat.session.Nonaktif',
        'Sipas.riwayat.session.terkirim.List'
    ],

    models:[
        'Sipas.disposisi.Masuk'
    ],

    views:[
        'Sipas.riwayat.session.List'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_riwayat_session_list' },
        { ref: 'aktif',  selector: 'sipas_riwayat_session_list #Aktif' },
        { ref: 'refresh',  selector: 'sipas_riwayat_session_list sipas_com_button_refresh' }
    ],

    controllerProp: 'Sipas.riwayat.session.Prop',

    lgRiwayatAll                : "cmb_terkirim_all",
    lgRiwayatDisposisi          : "cmb_terkirim_disposisi",
    lgRiwayatNotaDinas          : "cmb_terkirim_notadinas",
    lgRiwayatEksternal          : "cmb_terkirim_eksternal",
    lgRiwayatInternal           : "cmb_terkirim_internal",
    lgRiwayatAllCabut           : "cmb_terkirim_all_cabut",

    _clicks : 0,

    init: function(application) {
        this.control({
            'sipas_riwayat_session_list': {
                load: this.onMainview_Load,
                loadbyrecord: this.onMainview_LoadByRecord
            },
            'sipas_riwayat_session_list sipas_com_button_refresh': {
                click: this.onMainview_DoReload
            },
            "sipas_riwayat_session_list #Aktif": {
                select: this.onComboStatus_Select,
                afterrender: this.onComboStatus_AfterRender
            },
            "sipas_riwayat_session_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    launch: function(config) {
        var $checkSession = this.getApplication().getSession().getResetSession(),
            storeCombo = [
                {
                    value: 0, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatAll
                },
                {
                    value: 1, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatDisposisi
                },
                {
                    value: 2, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatNotaDinas
                },
                {
                    value: 3, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatEksternal
                },
                {
                    value: 4, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatInternal
                },
                {
                    value: 5, nama: null,
                    featureable: false, featureName: null,
                    roleable: false, roleName: null,
                    languageable: true, languageCode: this.lgRiwayatAllCabut
                }
            ];

        var $this = this,
            $app = $this.getApplication(),
            $language = $app.Language(),
            view = this.createView(config),
            mainview = view || this.createView(config),
            isAsistensi = mainview.isAsistensi,
            storeComboList = Ext.clone(storeCombo);

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }

        Ext.each(storeComboList, function(item, index, all){
            if(item.languageable){
                var grammar = $language.getGrammar(item.languageCode, false);
                item.nama = grammar;
            }
        }, this, true);

        var cmbStatus = $this.getAktif({root:mainview}),
            comboStore = cmbStatus.getStore();

        comboStore.getProxy().data = storeComboList;
        cmbStatus.setValue($language.getGrammar(this.lgRiwayatAll, false));

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
        view.reconfigure(newStore);
        pagingtoolbar.bindStore(newStore);
        newStore.reload();
    },

    onMainview_Load: function(mainview, record){
        if(record && record.isModel){
            mainview.fireEvent('loadbyrecord', mainview, record);
        }else{
            this.getModel(this.models[0]).load(record, {
                callback: function(r){
                    mainview.fireEvent('loadbyrecord', mainview, r);
                }
            });
        }
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            $checkSession = $this.getApplication().getSession().getResetSession(),
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 0:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/terkirim/read';
            break;
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/terkirim/disposisi';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/terkirim/notadinas';
            break;
            case 3:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/terkirim/eksternal';
            break;
            case 4:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/terkirim/internal';
            break;
            case 5:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/terkirim/tercabut';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/terkirim/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    onComboStatus_AfterRender: function(component, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $language = $app.Language(),
            mainview = $this.getMainview({from: component}),
            isAsistensi = mainview.isAsistensi,
            cvalue = (isAsistensi)? $this.stores[1] : $this.stores[0];

        component.setValue($language.getGrammar($this.lgRiwayatAll, false));
    },

    onMainview_LoadByRecord: function(mainview, record){
        var s = record.fetchRiwayat();

        mainview.record = record;
        mainview.reconfigure(s);
        s.reload();
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $checkSession = $app.getSession().getResetSession(),
            refresh = $this.getRefresh({root:view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProp);

        // sudah dicoba pakai event itemdblclick dan sudah di return false,
        // tetap saja masih membuka 2 prop dan mendapat error
        
        if(!record.get('disposisi_iscabut')){
            $this._clicks++;
            if ($this._clicks <= 1){
                controllerProperty.launch({
                    mode:'view',
                    record: record,
                    callback: function(records, operation, success){
                        refresh.setDisabled(true);
                        Ext.Ajax.request({
                            url: 'server.php/sipas/disposisi/baca_aksi',
                            params: {
                                'id'      : record && record.get('disposisi_id')
                            },
                            success: function(response, eOpts){
                            },
                            callback: function(record, operation, success){
                                $this.refresh(view);
                                $this._clicks = 0;
                                refresh.setDisabled(false);
                            }
                        });
                    }
                });
            }
        }else {
            $helper.showMsg({success: false, message: 'Surat ini telah dibatalkan'});
            // return;
        }
    },

    onMainview_DoReload: function(button, e, eOpts){
        var $checkSession = this.getApplication().getSession().getResetSession(),
            mainview = this.getMainview({from:button});
        this.refresh(mainview);
    }
});