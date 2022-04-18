Ext.define('SIPAS.controller.Sipas.masuk.registrasi.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.masuk.registrasi.Form',
        'Sipas.masuk.registrasi.List'
    ],

    views: [
        'Sipas.masuk.registrasi.Compact'
    ],

    stores: [
        'Sipas.unit.Combo'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_masuk_registrasi_compact' },
        { ref: 'paneForm',  selector: 'sipas_masuk_registrasi_compact #paneForm' },
        { ref: 'btnAdd',    selector: 'sipas_masuk_registrasi_compact #btnAdd' },
        { ref: 'form',      selector: 'sipas_masuk_registrasi_compact #paneForm form' },
        { ref: 'list',      selector: 'sipas_masuk_registrasi_compact sipas_masuk_registrasi_list' },
        { ref: 'arah',      selector: 'sipas_masuk_registrasi_compact sipas_masuk_pengarahan_form' },
        { ref: 'formArah',  selector: 'sipas_masuk_registrasi_compact sipas_masuk_pengarahan_form #form' },
        { ref: 'buttonSave',selector: 'sipas_masuk_registrasi_compact sipas_masuk_pengarahan_form #form sipas_com_button_save' },
        { ref: 'comboUnit', selector: 'sipas_masuk_registrasi_compact sipas_masuk_pengarahan_form #form #comboUnit' }
    ],

    controllerProp: 'Sipas.masuk.agenda.Prop',

    init: function(application) {
        this.control({
            'sipas_masuk_registrasi_compact #paneForm > toolbar sipas_com_button_add': {
                toggle: this.onButtonAdd_Toggle
            },
            'sipas_masuk_registrasi_compact sipas_masuk_registrasi_list': {
                itemclick: this.onGridpanel_ItemClick
            },
            'sipas_masuk_registrasi_compact sipas_masuk_pengarahan_form #form sipas_com_button_print': {
                click: this.onButtonPrintResi_Click
            },
            'sipas_masuk_registrasi_compact sipas_masuk_pengarahan_form #form sipas_com_button_save':{
                click      : this.onSave_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config),
            
            $app            = $this.getApplication(),
            $session        = $app.getSession(),
            profile         = $session.getProfile(),
            btnTambah       = $this.getBtnAdd({root:view}),
            buatSuratMasuk  = $app.LocalSetting().get('use_unit_buat_surat_masuk');

            if (buatSuratMasuk) {
                if (profile.unit_isbuatsurat) {
                    btnTambah && btnTambah.setDisabled(false);
                }else{
                    btnTambah && btnTambah.setDisabled(true);
                    btnTambah.setTooltip($app.getGrammar('txt_unit_tooltip'));
                }
            }else{
                btnTambah && btnTambah.setDisabled(false);
            }
            
        return view;
    },

    onButtonAdd_Toggle: function(button, pressed, eOpts){
        var $this = this,
            $checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            list = $this.getList({root:mainview});

        form && form.setDisabled(!pressed);

        if(pressed){
            form.fireEvent('init', form, {
                mode: 'add',
                callback: function(success, record){
                    if(success){
                        Ext.each(Ext.ComponentQuery.query('[toggleGroup='+button.toggleGroup+']', mainview), function(item){
                            item.toggle();
                        });
                        list.fireEvent('reload', list);
                        list.getSelectionModel().select(record,false,false);
                        form.reset();
                    }
                }
            });
        }else{
            form.reset();
        }
    },

    onButtonPrintResi_Click: function(button, e, eOpts){
        var view = this.getMainview({from:button}),
            list = this.getList({root:view}),
            record = list && list.getSelectionModel().getSelection()[0],
            cReveiver = this.getController(this.controllerProp);
           
        cReveiver.printReport(record.getId(), 'Cetak Resi');
    },

    onSave_Click: function(button, e, eOpts)
    {
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
        }
        else{
            cReveiver.printReport(record.getId(), 'Cetak Resi');
        }
    }
});