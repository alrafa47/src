Ext.define('SIPAS.controller.Sipas.staf.wakil.monitoring.koreksi.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        // 'Sipas.koreksi.session.List',
        'Sipas.koreksi.session.draf.List',
        'Sipas.koreksi.session.blmtindak.List',
        'Sipas.koreksi.session.setuju.List',
        'Sipas.koreksi.session.tolak.List'
    ],

    models: [
        'Sipas.koreksi.Masuk',
        'Sipas.Surat',
        'Sipas.disposisi.masuk.Log' /*please do not remove, for list render*/
    ],
    
    views: [
        'Sipas.staf.wakil.monitoring.koreksi.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_staf_wakil_monitoring_koreksi_list' },
        { ref: 'compApprovalInfo',  selector: 'sipas_staf_wakil_monitoring_koreksi_list sipas_konsep_info_pane' },
        { ref: 'compApprovalDetail',selector: 'sipas_staf_wakil_monitoring_koreksi_list sipas_surat_penyetujuan_detail_pane' },
        { ref: 'compInfo',          selector: 'sipas_staf_wakil_monitoring_koreksi_list #groupInfo' },
        { ref: 'statusKoreksi',     selector: 'sipas_staf_wakil_monitoring_koreksi_list #statusKoreksi' }
    ],

    api: {
        pengingat_asisten   : 'server.php/sipas/disposisi_masuk/pengingat_asisten'
    },

    messages: {
        approving: 'Memproses penyetujuan surat',
        approval_failure: 'Gagal menyetujui surat. Surat tidak tersedia.',
        approval_success: 'Berhasil menyetujui surat.'
    },

    controllerProperty: 'Sipas.koreksi.session.Prop',

    modelDefault: 'Sipas.koreksi.Masuk',
    modelSurat: 'Sipas.Surat',

    lgDrafAll           : "cmb_draf_all",
    lgDrafBlmTindak     : "cmb_draf_blm_tindaklanjut",
    lgDrafSetuju        : "cmb_draf_setuju",
    lgDrafTolak         : "cmb_draf_tolak",

    _clicks : 0,

    init: function(application) {
        this.control({
            "sipas_staf_wakil_monitoring_koreksi_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_staf_wakil_monitoring_koreksi_list": {
                doreload: this.onMainview_DoReload,
                // afterrender: this.onMainview_AfterRender,
                selectionchange: this.onGridpanel_SelectionChange
            },
            "sipas_staf_wakil_monitoring_koreksi_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_staf_wakil_monitoring_koreksi_list[dbclickToView=true]": {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = $this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }

        return view;
    },

    onMainview_DoReload: function(mainview){        
        this.refresh(mainview);
    },

    // onMainview_AfterRender: function(mainview, eOpts){
    //     var storeCombo = [
    //             {
    //                 value: 0, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgDrafAll
    //             },
    //             {
    //                 value: 1, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgDrafBlmTindak
    //             },
    //             {
    //                 value: 2, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgDrafSetuju
    //             },
    //             {
    //                 value: 3, nama: null,
    //                 featureable: false, featureName: null,
    //                 roleable: false, roleName: null,
    //                 languageable: true, languageCode: this.lgDrafTolak
    //             }
    //         ];

    //     var $this = this,
    //         $app = $this.getApplication(),
    //         $language = $app.Language(),
    //         storeComboList = Ext.clone(storeCombo),
    //         isAsistensi = mainview.isAsistensi;

    //     Ext.each(storeComboList, function(item, index, all)
    //     {
    //         if(item.languageable){
    //             var grammar = $language.getGrammar(item.languageCode, false);
    //             item.nama = grammar;
    //         }
    //     }, this, true);

    //     if (!isAsistensi){
    //         var cmbStatus = $this.getStatus({root:mainview}),
    //             comboStore = cmbStatus.getStore();

    //         comboStore.getProxy().data = storeComboList;
    //         cmbStatus.setValue($language.getGrammar($this.lgDrafAll, false));
    //     }
    // },

    refresh: function(mainview) {
        var view = mainview || this.getMainview(),
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

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            role_asistensi_lihat = $session.getRuleAccess('asistensi_lihat'),
            role_pgs_lihat = $session.getRuleAccess('pgs_lihat'),
            role_asistensi_pengingat = $session.getRuleAccess('asistensi_pengingat'),
            $pengaturan = $app.LocalSetting(),
            asistensi_baca = $pengaturan.get('asistensi_baca_action'),
            view = $this.getMainview({from:model.view}),
            isAsistensi = view.isAsistensi,
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty),
            statusBaca = record.get('disposisi_masuk_baca_tgl'),
            statusPenyetujuan = record.get('disposisi_masuk_status'),
            mode = '',
            type = '',
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

        if ((type == 'asisten' && !role_asistensi_lihat)  || (type == 'pgs' && !role_pgs_lihat)) {
            if (type == 'asisten' && role_asistensi_pengingat && !record.get('disposisi_masuk_ispengingat') && (record.get('disposisi_masuk_status') == 0 || record.get('disposisi_masuk_status') == null)) {
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
                if(record.get('disposisi_masuk_plt') !== 1){
                    if(isAsistensi){
                        // if (type == 'pgs') {
                            if(record.get('disposisi_masuk_isbaca') === 1){
                                log.reading({
                                    staf: $session.getProfile().staf_id,
                                    masuk: record.get('disposisi_masuk_id'),
                                    callback: function(staf, operation, success){
                                        if(success){
                                        }
                                    }
                                });
                            }else{
                                record.reading({
                                    staf: $session.getProfile().staf_id,
                                    callback: function(staf, operation, success){
                                        if(success){
                                            $this.refresh(view);
                                        }
                                    }
                                });
                            }
                        // }else{
                        //     log.reading({
                        //         staf: $session.getProfile().staf_id,
                        //         masuk: record.get('disposisi_masuk_id'),
                        //         callback: function(staf, operation, success){
                        //             if(success){
                        //             }
                        //         }
                        //     });
                        // }
                    }
                }

                if(record){
                    if(statusPenyetujuan){
                        mode = 'view';
                    }else{
                        mode = 'edit';
                    }
                    controllerProperty.launch({
                        mode: mode,
                        type: type,
                        record: record,
                        callback: function(success, record){
                            if(success && view){
                                $this.refresh(view);
                            }
                            $this._clicks = 0;
                        }
                    });
                }
            }
        }
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        return false;
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});
        this.refresh(mainview);
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts){
        
    }
});