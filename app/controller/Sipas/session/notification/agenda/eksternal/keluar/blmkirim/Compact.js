Ext.define('SIPAS.controller.Sipas.session.notification.agenda.eksternal.keluar.blmkirim.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.keluar.agenda.registrasi.Form',
        'Sipas.keluar.agenda.registrasi.List'
    ],

    stores: [
        'Sipas.session.notification.agenda.eksternal.keluar.blmkirim.Compact'
    ],

    api: {
        'datasource':'server.php/sipas/notif_agenda/eksternal/keluar_blmkirim?scope={scope}'
    },

    views: [
        'Sipas.session.notification.agenda.eksternal.keluar.blmkirim.Compact'
    ],

    controllerStatusPopup: 'Sipas.keluar.agenda.ekspedisi.Popup',
    controllerPropKeluar: 'Sipas.keluar.agenda.Prop',

    refs:[
        { ref: 'mainview',  selector: 'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact' },
        { ref: 'paneForm',  selector: 'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact #paneForm' },
        { ref: 'form',      selector: 'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact #paneForm form' },
        { ref: 'grid',      selector: 'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list' },
        { ref: 'list',      selector: 'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact #List' },
        { ref: 'btnTerima', selector: 'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list #buttonTerima' }
    ],

    modelKeluarEkspedisi : 'Sipas.keluar.Ekspedisi',

    init: function(application) {
        this.control({
            "sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact #List #comboScope": {
                select: this.onComboScope_Select,
                afterrender: this.onComboScope_AfterRender
            },
            'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact #List': {
                selectionchange: this.onGridpanel_SelectionChange,
                itemdblclick: this.onMainview_DoubleClickShow
            },
            "sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list #buttonTerima': {
                click : this.onButtonTerima_Click
            },
            'sipas_session_notification_agenda_eksternal_keluar_blmkirim_compact sipas_keluar_agenda_registrasi_form sipas_keluar_agenda_ekspedisi_list': {
                itemclick: this.onMainview_DoubleClick
            }
        });
    },

    launch: function(config) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            view = $this.createView(config),
            profile = $session.getProfile();

        if(view){
            view.on('afterrender', function(){
                $this.updateList(profile.staf_unit, view);
            });
        }

        return view;
    },

    onButtonAdd_Toggle: function(button, pressed, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            list = $this.getList({root:mainview});

        form && form.setDisabled(!pressed);

        if(pressed){
            form.fireEvent('init', form, {
                mode: 'add',
                callback: function(success){
                    if(success){
                        Ext.each(Ext.ComponentQuery.query('[toggleGroup='+button.toggleGroup+']', mainview), function(item){
                            item.toggle();
                        });
                        list.fireEvent('reload', list);
                        form.reset();
                    }
                }
            });
        }else{
            form.reset();
        }
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:model}),
            form = $this.getForm({root:mainview}),
            paneform = $this.getPaneForm({root:mainview}),
            btnTerima = $this.getBtnTerima({root:mainview}),
            list = $this.getList({root:mainview}),
            grid = $this.getGrid({root:mainview}),
            record = selected && selected[0];

        if( selected.length){
            paneform && paneform.setDisabled(!selected);
            btnTerima && btnTerima.setDisabled(!selected);

            form.fireEvent('init', form, {
                mode: 'view',
                record: record,
                callback: function(success){
                    if(success){
                        list.fireEvent('reload', list);
                        paneform.reset();
                        paneform.setDisabled(selected);
                        btnTerima.setDisabled(selected);
                    }
                }
            });
        }else{
            // grid.getStore().each(function(record){
            //     grid.getStore().remove(record);
            // });
            grid.getStore().removeAll();
            // grid.getStore().reload();
            paneform && paneform.setDisabled(selected);
            btnTerima && btnTerima.setDisabled(selected);
        }

        // $helper.disableComponent({
        //     action: (selected.length != 1),
        //     parent: list,
        //     items: ['sipas_com_button_view']
        // });
    },

    onMainview_DoubleClick: function(model, selected, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            record = selected,
            controllerProperty = $this.getController($this.controllerStatusPopup);

        controllerProperty.launch({
            mode:'view',
            record: record
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.Session(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            role_lihat = $session.getRuleAccess('keluar_lihat'),
            view = $this.getMainview({from:model.view}),
            record = selected,
            tanggal = new Date(),
            useretensi = record.get('surat_useretensi'),
            inaktif_tgl = record.get('surat_inaktif_tgl'),
            inaktif_display = Ext.util.Format.date(inaktif_tgl, 'd M Y') ? Ext.util.Format.date(inaktif_tgl, 'd M Y') : '',
            controllerProperty = $this.getController($this.controllerPropKeluar);

        if(useretensi && is_inaktif){
            $helper.showMsg({success: false, message: 'Surat telah melewati masa inaktif'});
        }else{
            if (role_lihat){
                controllerProperty.launch({
                    propType: 'keluar',
                    mode:'notif',
                    notif_mode:'belum_kirim',
                    model:2,
                    record: record,
                    is_ekspedisi_eks: true
                });
            } else {
                $helper.showMsg({success: false, message: 'Anda bukan pembuat surat ini'});
            }
        }
    },

    onButtonTerima_Click: function(button, e, eOpts){
        var $this = this,
            controllerStatusPopup = $this.getController($this.controllerStatusPopup),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            grid = $this.getGrid({root:view}),
            list = $this.getList({root:view}),
            record = form && form.updateRecord().getRecord(),
            // statusProto = $this.getModel($this.modelKeluarEkspedisi).create({}),
            // statusField = record && record.get('surat_terima_status'),
            mode=null;

        // if(statusField == statusProto.self.status().INIT || statusField == statusProto.self.status().SENDING){
            mode='add';
        // }else{
            // mode='done';
        // }
        // if (record.get('surat_terima_status') == 4) {
        // }else if (record.get('surat_terima_status') == 3) {
        //     mode='done';
        // }else if (record.get('surat_terima_status') == 2) {
        //     mode='done';
        // }else {
        // }
        
        controllerStatusPopup.launch({
            mode:mode,
            record: record,
            callback: function(success, record){
                list.getStore().reload();
                grid.getStore().reload();
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from: button}),
            list = $this.getList({root:mainview});

        $this.refresh(list);
    },

    onComboScope_AfterRender: function (component, eOpts) {
        component.setLoading(true);
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();
        
        component.getStore().load({
            callback: function(record, operation, success){
                component.setValue(profile.staf_unit);
                component.setLoading(false);
            }
        });
    },

    onComboScope_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:combo}),
            scope = combo.getValue();

        $this.updateList(scope, mainview);
    },

    updateList: function(scope, mainview){
        var $this = this,
            list = $this.getList({root:mainview}),
            pagingtoolbar = list.down('pagingtoolbar'),
            store = list.getStore(),
            proxy = store.getProxy(),
            api = null,
            status = null;

        store.removeAll();
        proxy.url = this.getApi('datasource',{scope:scope});
        pagingtoolbar.moveFirst();
        // store.reload();
    },

    refresh: function(view){
        var view = view || this.getMainview();
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();
        /*changing paging toolbar store based on mainview's store*/
        pagingtoolbar && pagingtoolbar.bindStore(newStore);
        newStore.load({
            callback: function(record, operation, success){
                var objres = Ext.decode(operation.response.responseText, true) || {};
                view.getSelectionModel().deselectAll();
                view.fireEvent('selectionchange', view, view.getSelectionModel().getSelection());
            }
        });
    }
});