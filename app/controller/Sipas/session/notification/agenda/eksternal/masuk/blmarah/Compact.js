Ext.define('SIPAS.controller.Sipas.session.notification.agenda.eksternal.masuk.blmarah.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.masuk.registrasi.Form',
        'Sipas.masuk.registrasi.List'
    ],

    views: [
        'Sipas.session.notification.agenda.eksternal.masuk.blmarah.Compact'
    ],

    stores: [
        'Sipas.session.notification.agenda.eksternal.masuk.blmarah.Compact'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact' },
        { ref: 'list',      selector: 'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact #List' },
        { ref: 'arah',      selector: 'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact sipas_masuk_pengarahan_form' },
        { ref: 'formArah',  selector: 'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact sipas_masuk_pengarahan_form #form' },
        { ref: 'buttonSave',selector: 'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact sipas_masuk_pengarahan_form #form sipas_com_button_save' },
        { ref: 'comboUnit', selector: 'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact sipas_masuk_pengarahan_form #form #comboUnit' }
    ],

    controllerProp: 'Sipas.masuk.agenda.Prop',

    init: function(application) {
        this.control({
            'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact #List': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact sipas_masuk_pengarahan_form #form sipas_com_button_print': {
                click: this.onButtonPrintResi_Click
            },
            "sipas_session_notification_agenda_eksternal_masuk_blmarah_compact sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            'sipas_session_notification_agenda_eksternal_masuk_blmarah_compact sipas_masuk_pengarahan_form #form sipas_com_button_save':{
                click: this.onSave_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.down('#List').getStore().load();
            });
        }
            
        return view;
    },

    onButtonPrintResi_Click: function(button, e, eOpts){
        var view = this.getMainview({from:button}),
            list = this.getList({root:view}),
            record = list && list.getSelectionModel().getSelection()[0],
            cReveiver = this.getController(this.controllerProp);
           
        cReveiver.printReport(record.getId(), 'Cetak Resi');
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from: button}),
            list = $this.getList({root:mainview});

        $this.refresh(list);
    },

    onSave_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            pegawaiId = $session.getProfileId(),
            form = $this.getFormArah({root:view}),
            arah = $this.getArah({root:view}),
            list = $this.getList({root:view}),
            combo = $this.getComboUnit({root:view}),
            buttonSave = $this.getButtonSave({root:view}),
            value = combo.getValue(),
            record = form && form.updateRecord().getRecord();

        if (!value){
            $helper.showMsg({success: false, message: 'Anda belum memilih unit tujuan'});
            return;
        }

        $helper.showConfirm({
            confirmTitle: 'Konfirmasi Pengarahan Surat Masuk',
            confirmText : 'Apakah unit yang anda pilih sudah benar ?',
            callback: function(buttonYes){
                if(buttonYes == 'yes'){
                    record.arahkan({
                        staf: pegawaiId,
                        unit: value,
                        callback: function(staf, operation, success){
                            if(success){
                            }
                        }
                    });
                    form.getForm().reset();
                    if(record.get('surat_unit')){
                        combo.setReadOnly(true);
                        buttonSave.hide();
                        list.getStore().reload();
                        arah.setDisabled(true);
                    }else{
                        combo.setReadOnly(false);
                        buttonSave.show();
                        arah.setDisabled(false);
                    }
                $helper.showMsg({success: true, message: 'Berhasil Mengarahkan'});
                }
                form.loadRecord(record);
            }
        });  
    },
    
    onGridpanel_ItemClick: function(model, selected, eOpts) {
        var $this = this,
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.Session(),
            mainview = $this.getMainview({from:model}),
            arah = $this.getArah({root:mainview}),
            list = $this.getList({root:mainview}),
            form = $this.getFormArah({root:mainview}),
            record = selected,
            cReveiver = this.getController(this.controllerProp);

        if($session.getRuleAccess('pengarahanmasuk')){
            form && form.reset();
            arah && arah.setDisabled(!selected);

            arah.fireEvent('init', arah, {
                mode: 'view',
                record: record,
                callback: function(success){
                    if(success){
                        list.fireEvent('reload', list);
                        arah.reset();
                        form.setDisabled(selected);
                    }
                }
            });
        } else{
            cReveiver.printReport(record.getId(), 'Cetak Resi');
        }
    },

    refresh: function(view){
        var view = view || this.getMainview(),
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