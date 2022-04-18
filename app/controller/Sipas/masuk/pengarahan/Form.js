Ext.define('SIPAS.controller.Sipas.masuk.pengarahan.Form', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.keluar.agenda.ekspedisi.List'
    ],

    views: [
        'Sipas.masuk.pengarahan.Form'
    ],

    stores: [
        'Sipas.unit.Combo'
    ],

    refs : [
        { ref: 'mainview',      selector: 'sipas_masuk_pengarahan_form' },
        { ref: 'form',          selector: 'sipas_masuk_pengarahan_form #form' },
        { ref: 'cmpTipeSurat',  selector: 'sipas_masuk_pengarahan_form combobox#tipeSurat' },
        { ref: 'grid',          selector: 'sipas_masuk_pengarahan_form sipas_keluar_agenda_ekspedisi_list' },
        { ref: 'cmpRegistrasi', selector: 'sipas_masuk_pengarahan_form [name=surat_registrasi]' },
        { ref: 'cmpAgenda',     selector: 'sipas_masuk_pengarahan_form [name=surat_keluar_agenda]' },
        { ref: 'compWithPrint', selector: 'sipas_masuk_pengarahan_form #toolbarAction checkboxfield' },
        { ref: 'buttonSave',  selector: 'sipas_masuk_pengarahan_form sipas_com_button_save' },
        { ref: 'comboUnit',  selector: 'sipas_masuk_pengarahan_form #comboUnit' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    controllerHelper: 'Sipas.Helper',

    init: function(application) {
        this.control({
            'sipas_masuk_pengarahan_form':{
                init      : this.onMainview_Init
            },
            'sipas_masuk_pengarahan_form #comboUnit': {
                runconfig: this.onComboAttribute_RunConfig,
                loadassociate: this.onComboUnit_LoadAssociate,
                focus: this.onComboParent_Focus
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        },config);

        return this.createView(config);
    },

    onMainview_Init: function(mainview, config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        },config);

        var $this = this,
            form = $this.getForm({root:mainview}),
            record = config.record,
            grid = $this.getGrid({root:mainview}),
            combo = $this.getComboUnit({root:mainview}),
            buttonSave = $this.getButtonSave({root:mainview});

        if(config.mode == 'view'){
            form.loadRecord(record);
            form.callback = config.callback;
            form.scope = config.scope;

            if(record.get('surat_unit')){
                combo.setReadOnly(true);
                buttonSave.hide();
            }else{
                combo.setReadOnly(false);
                buttonSave.show();
            }
        }
    },

    onComboAttribute_RunConfig: function(combo, e, eOpts){
        var associatedId = combo.getValue(),
            store = combo.getStore();
        
        store.load({
            callback: function(){
                var found = store.getById(associatedId);
                if(!found)
                {
                    combo.setValue();
                }
            }
        });
    },

    onComboUnit_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);
        
        record.getUnit(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onComboParent_Focus: function(combobox, e, eOpts)
    {
        var store = combobox && combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    },

    // onSave_Click: function(button, e, eOpts)
    // {
    //     var $this = this,
    //         form = $this.getForm({from:button}),
    //         $app = $this.getApplication(),
    //         $helper = $app.Helper(),
    //         $session = $app.getSession(),
    //         pegawaiId = $session.getProfileId();
    //         combo = $this.getComboUnit({root:form}),
    //         value = combo.getValue(),
    //         record = form && form.updateRecord().getRecord();

    //     $helper.showConfirm({
    //         confirmTitle: 'Konfirmasi Pengarahan Surat Masuk',
    //         confirmText : 'Apakah unit yang anda pilih sudah benar ?',
    //         callback: function(button){
    //             if(button == 'yes'){
    //                 record.arahkan({
    //                     staf: pegawaiId,
    //                     unit: value,
    //                     callback: function(staf, operation, success){
    //                         if(success){
    //                         }
    //                     }
    //                 });
    //                 form.getForm().reset();
    //                 if(record.get('surat_unit')){
    //                     combo.setReadOnly(true);
    //                     button.hide();
    //                 }else{
    //                     combo.setReadOnly(false);
    //                     button.show();
    //                 }
    //             }
    //             form.getForm().reset();
    //             form.loadRecord(record);
    //             $helper.showMsg({success: true, message: 'Berhasil Mengarahkan'});
    //         }
    //     });  
    // },

    onMainview_AfterRender: function(mainview){
        var $this = this,
            form = mainview;
                        
        // $this.getStore($this.storeComboMedia).reload();
        // $this.getStore($this.storeComboTipe).reload();
    }

});