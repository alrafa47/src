Ext.define('SIPAS.controller.Sipas.session.notification.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.notif.user.List'
    ],

    models: [
        'Sipas.disposisi.masuk.Log', /*please do not remove, for list render*/
        'Sipas.notif.User'
    ],

    views: [
        'Sipas.session.notification.List',
        'Sipas.Viewer'
    ],

    api: {
        reading: 'server.php/sipas/notif_user/reading',
        
    },

    refs: [
        { ref: 'mainview',      selector: 'sipas_session_notification_list' },
        { ref: 'cmpPerihal',    selector: 'sipas_session_notification_list [name=notif_user_isi]' },
    ],

    controllerMasuk : 'Sipas.masuk.agenda.Prop',
    controllerKeluar : 'Sipas.keluar.agenda.Prop',
    controllerIMasuk : 'Sipas.internal.masuk.agenda.Prop',
    controllerIKeluar : 'Sipas.internal.keluar.agenda.Prop',
    controllerIKeputusan : 'Sipas.internal.keputusan.agenda.Prop',

    defaultStore: 'Sipas.session.notification.List',

    modelDefault: 'Sipas.notif.User',

    init: function(application) {
        this.control({
            "sipas_session_notification_list[clickToView=true]": {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_session_notification_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_session_notification_list #readAll": {
                click: this.onButtonReadAll_Click
            },
            "sipas_session_notification_list [name=notif_user_isi]": {
                change: this.onSearch_Change
            },
            "sipas_session_notification_list sipas_com_button_cross": {
                click: this.onButtonClear_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config),
            store = view.store;

        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
                store.clearFilter();
            });
        }
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

    onButtonRefresh_Click: function(button, e, eOpts){
        var checkSession = this.getApplication().getSession().getResetSession(),
            mainview = this.getMainview({from:button});
        this.refresh(mainview);
    },

    onButtonReadAll_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            staf_id = $session.getProfileId(),
            params = {
                'id' : staf_id
            };

        $helper.showConfirm({
            confirmTitle: 'Konfirmasi',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('reading'),
                        params: params,
                        success: function(response, eOpts){
                            var objres = Ext.decode(response.responseText, true) || {};
                            $helper.showMsg({success: objres.success, message: objres.message});
                            
                            if(objres.success){
                                $this.refresh(mainview);
                            }
                        }
                    });
                }
            }
        });
    },

    onSearch_Change: function(textfield, newValue, oldValue, eOpts ){
        var $this = this,
            view = $this.getMainview({from:textfield}),
            store = view.store;

        if(newValue.length >= 3){
            store.addFilter({
                id: 'notif_user_isi',
                field: 'notif_user_isi',
                value: newValue
            });

            store.removeFilter('notif_user_isi');
        }else if((oldValue && oldValue.length >= 3) && newValue.length < 3){
            store.clearFilter();
        }
    },

    onButtonClear_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            cmpPerihal = $this.getCmpPerihal({root:view}),
            store = view.store;

        store.clearFilter();
        cmpPerihal.setValue(null);
    },

    onMainview_ClickShow: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            staf_id = $session.getProfileId(),
            record = selected,
            role_masuk_lihat = $session.getRuleAccess('masuk_lihat'),
            role_keluar_lihat = $session.getRuleAccess('keluar_lihat'),
            role_ikeluar_lihat = $session.getRuleAccess('ikeluar_lihat'),
            role_ikeputusan_lihat = $session.getRuleAccess('ikeputusan_lihat'),
            controllerMasuk = $this.getController($this.controllerMasuk),
            controllerKeluar = $this.getController($this.controllerKeluar),
            controllerIMasuk = $this.getController($this.controllerIMasuk),
            controllerIKeluar = $this.getController($this.controllerIKeluar);
            controllerIKeputusan = $this.getController($this.controllerIKeputusan);
            
        if(record.get('notif_user_isbaca') === 0){
            record.reading({
                staf: staf_id,
                id: record.get('notif_user_id'),
                callback: function(staf, operation, success){
                    if(success){
                    }
                }
            });
        }
        if(record.get('notif_user_tipe') == 1){
            record.getSurat(function(surat){
                if(surat.get('surat_model') === surat.self.modelType().MODEL_MASUK){
                    if (role_masuk_lihat){
                        controllerMasuk.launch({
                            propType: 'masuk',
                            unit: null,
                            model: surat.self.modelType().MODEL_MASUK,
                            mode:'view',
                            record: surat,
                            callback: function(){
                                // $this.refresh(view);
                            }
                        });
                    } else {
                        $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                    }
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_KELUAR){
                    if (role_keluar_lihat){
                        controllerKeluar.launch({
                            propType: 'keluar',
                            unit: null,
                            model: surat.self.modelType().MODEL_KELUAR,
                            mode:'view',
                            record: surat,
                            callback: function(){
                                // $this.refresh(view);
                            }
                        });
                    } else {
                        $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                    }
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_IMASUK){
                    controllerIMasuk.launch({
                        propType: 'imasuk',
                        unit: surat.get('surat_unit'),
                        model: surat.self.modelType().MODEL_IMASUK,
                        mode:'view',
                        record: surat,
                        callback: function(){
                            // $this.refresh(view);
                        }
                    });
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_IKELUAR){
                    if (role_ikeluar_lihat){
                        controllerIKeluar.launch({
                            propType: 'ikeluar',
                            unit: surat.get('surat_unit'),
                            model: surat.self.modelType().MODEL_IKELUAR,
                            mode:'view',
                            record: surat,
                            callback: function(){
                                // $this.refresh(view);
                            }
                        });
                    } else {
                        $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                    }
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_KEPUTUSAN){
                    if (role_ikeputusan_lihat){
                        controllerIKeputusan.launch({
                            propType: 'keputusan',
                            unit: surat.get('surat_unit'),
                            model: surat.self.modelType().MODEL_KEPUTUSAN,
                            mode:'view',
                            record: surat,
                            callback: function(){
                                // $this.refresh(view);
                            }
                        });
                    } else {
                        $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
                    }
                }
            })
        }
    }

});