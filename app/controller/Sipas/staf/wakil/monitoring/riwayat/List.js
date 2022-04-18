Ext.define('SIPAS.controller.Sipas.staf.wakil.monitoring.riwayat.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores:[
        'Sipas.riwayat.session.Aktif',
        // 'Sipas.riwayat.session.List',
        'Sipas.riwayat.session.Nonaktif',
        'Sipas.riwayat.session.terkirim.List',
        'Sipas.staf.wakil.monitoring.disposisi.riwayat.Aktif',
        'Sipas.staf.wakil.monitoring.disposisi.riwayat.List',
        'Sipas.staf.wakil.monitoring.disposisi.riwayat.Nonaktif'
    ],

    models:[
        'Sipas.disposisi.Masuk'
    ],

    views:[
        'Sipas.staf.wakil.monitoring.riwayat.List'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_staf_wakil_monitoring_riwayat_list' },
        { ref: 'aktifAsisten',  selector: 'sipas_staf_wakil_monitoring_riwayat_list #AktifAsisten' },
        { ref: 'refresh',       selector: 'sipas_staf_wakil_monitoring_riwayat_list sipas_com_button_refresh' }
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
            'sipas_staf_wakil_monitoring_riwayat_list': {
                load: this.onMainview_Load,
                loadbyrecord: this.onMainview_LoadByRecord
            },
            'sipas_staf_wakil_monitoring_riwayat_list sipas_com_button_refresh': {
                click: this.onMainview_DoReload
            },
            // "sipas_staf_wakil_monitoring_riwayat_list #Aktif": {
            //     select: this.onComboStatus_Select,
            //     afterrender: this.onComboStatus_AfterRender
            // },
            "sipas_staf_wakil_monitoring_riwayat_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            }
        });
    },

    // launch: function(config) {
    //     var storeCombo = [
    //             {
    //                 value: 0, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgRiwayatAll
    //             },
    //             {
    //                 value: 1, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgRiwayatDisposisi
    //             },
    //             {
    //                 value: 2, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgRiwayatNotaDinas
    //             },
    //             {
    //                 value: 3, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgRiwayatEksternal
    //             },
    //             {
    //                 value: 4, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgRiwayatInternal
    //             },
    //             {
    //                 value: 5, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgRiwayatAllCabut
    //             }
    //         ];

    //     var $this = this,
    //         $app = $this.getApplication(),
    //         $language = $app.Language(),
    //         view = this.createView(config),
    //         mainview = view || this.createView(config),
    //         isAsistensi = mainview.isAsistensi,
    //         storeComboList = Ext.clone(storeCombo);

    //     if(view){
    //         view.on('afterrender', function(){
    //             $this.refresh(view);
    //         });
    //     }

    //     Ext.each(storeComboList, function(item, index, all)
    //     {
    //         if(item.languageable){
    //             var grammar = $language.getGrammar(item.languageCode, false);
    //             item.nama = grammar;
    //         }
    //     }, this, true);

    //     var cmbStatus = $this.getAktif({root:mainview}),
    //         comboStore = cmbStatus.getStore();

    //     comboStore.getProxy().data = storeComboList;
    //     cmbStatus.setValue($language.getGrammar(this.lgRiwayatAll, false));

    //     return view;
    // },

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

    onMainview_LoadByRecord: function(mainview, record){
        var s = record.fetchRiwayat(),
            aktifAsisten = this.getAktifAsisten({root:mainview});
            // aktif = this.getAktif({root:mainview});

        mainview.record = record;
        mainview.reconfigure(s);
        s.reload();
        aktifAsisten.getStore().reload();
        // aktif.getStore().reload();
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            role_asistensi_lihat = $session.getRuleAccess('asistensi_lihat'),
            view = $this.getMainview({from:model.view}),
            refresh = $this.getRefresh({root:view}),
            record = selected,
            isAsistensi = view.isAsistensi,
            type = '',
            controllerProperty = $this.getController($this.controllerProp);

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

        if(!record.get('disposisi_iscabut')){
            if (type == 'asisten' && !role_asistensi_lihat) {
                $helper.showMsg({success: false, message: 'Anda tidak memiliki akses untuk melihat surat'});
            }else {
                $this._clicks++;
                if ($this._clicks <= 1){
                    controllerProperty.launch({
                        mode:'view',
                        type: type,
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
            }
        }else {
            $helper.showMsg({success: false, message: 'Surat ini telah dibatalkan'});
            // return;
        }
    },

    onMainview_DoReload: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});
        this.refresh(mainview);
    }
});