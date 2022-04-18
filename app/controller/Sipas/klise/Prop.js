Ext.define('SIPAS.controller.Sipas.klise.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.klise.Prop'
    ],

    models: [
        'Sipas.Klise'
    ],

    stores: [
        'Sipas.klise.kelompok.Combo',
        'Sipas.klise.legend.List'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_klise_prop' },
        { ref: 'form',              selector: 'sipas_klise_prop > form' },
        { ref: 'isi',               selector: 'sipas_klise_prop [name=klise_isi]' },
        { ref: 'cmpRequirement',    selector: 'sipas_klise_prop #gridRequirement' },
        { ref: 'cmpLegend',         selector: 'sipas_klise_prop sipas_surat_klise_legend_list' },
        { ref: 'nama',              selector: 'sipas_klise_prop > form [name=klise_nama]' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    storeKelompokCombo: 'Sipas.klise.kelompok.Combo',
    storeLegend: 'Sipas.klise.legend.List',

    init: function(application) {
        this.control({
            'sipas_klise_prop sipas_com_button_save': {
                click: this.onButtonSave_Click
            },
            'sipas_klise_prop combobox[name=surat_klise_kelompok]': {
                // specialkey: this.onComboKelompok_SpecialKey
            },
            "sipas_klise_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_klise_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            mode = config.mode,
            view = null;
            
        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    
                    c.requireComponents.push('[name=surat_klise_nama]');
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_save');
                    }

                    if(c.mode === 'add') {
                        c.removeComponents.push('sipas_com_button_edit','sipas_com_button_delete');
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents.push('sipas_com_button_edit','sipas_com_button_delete');
                    }
                    return c;
                })(config));
                
                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp}),
                            requirements = $this.getCmpRequirement({root:viewCmp}),
                            legends = $this.getCmpLegend({root:viewCmp});

                        $this.getStore($this.storeKelompokCombo).reload();
                        $this.getStore($this.storeLegend).reload();
                        if(mode === 'view') record.set('klise_isi', atob(record.get('klise_isi')));
                        form.loadRecord(record);

                        requirements && requirements.getStore().loadData(record.getRequirement() || []);
                        legends && legends.getStore().load();
                    },
                    close: function (viewCmp) {
                        var form = this.getForm({root:viewCmp}),
                            record = form.updateRecord().getRecord();

                        record && record.reject();
                    },
                    scope: $this
                });
                
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                })
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            nama = $this.getNama({root:view}),
            isi = $this.getIsi({root:view}),
            record = form && form.updateRecord().getRecord();
            wait = $this.getMessage('wait'),
            // recCmp = $this.getCmpRequirement({root:view}),
            recs = [];

        if(!record) return;

        if (!nama.getValue()){
            $helper.showMsg({success: false, message: 'Silahkan isi nama template'});
            return;
        }

        // recCmp.getStore().each(function(r){
        //     recs.push(r.getData());
        // });
        // record.setRequirement(recs);

        view.setLoading(true);
        $helper.showConfirm({
            confirmTitle: "Simpan",
            confirmText: "Apakah anda yakin ?",
            callback: function(button){
                if (button == 'yes'){
                    record.set('klise_isi', btoa(isi.getValue()));
                    $helper.saveRecord({
                        record: record,
                        form: form,
                        wait: true,
                        message: true,
                        callback: function(success, record, eOpts){
                            Ext.callback(view.callback, view, [success, record, eOpts]);
                            if(success){
                                view.setLoading(false);
                                view.close();
                            }
                        }
                    });
                } else {
                    view.setLoading(false);
                }
            }
        });

    },

    onComboKelompok_SpecialKey: function(combo, e){
        if (e.getKey() == e.ENTER) {
            var store = combo.getStore(),
                found = store.findRecord('surat_klise_kelompok', e.value);

            if(found){
                store.setValue(e.value);
            }else{
                var added = store.add({surat_klise_kelompok: e.value})[0];
                added && combo.select(added);
            }
        }
    },

    onButtonEdit_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.getRecord();

        this.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
            }
        });
        view.close();
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.getRecord();

        this.launch({
            mode:'destroy',
            record: record,
            callback: function(success, record){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
            }
        });
    }
});
