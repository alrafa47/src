Ext.define('SIPAS.controller.Sipas.jabatan.wakil.asisten.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.jabatan.wakil.asisten.Form'
    ],

    store:[
        'Sipas.jabatan.wakil.asisten.List',
        'Sipas.jabatan.wakil.Combo'
    ],

    models: [
        'Sipas.Jabatan'
    ],

    views: [
        'Sipas.jabatan.wakil.asisten.Popup'
    ],

    refs:[
        { ref: 'mainview',      selector: 'sipas_jabatan_wakil_asisten_popup' },
        { ref: 'form',          selector: 'sipas_jabatan_wakil_asisten_popup sipas_jabatan_wakil_asisten_form' },
        { ref: 'grid',          selector: 'sipas_jabatan_wakil_asisten_popup sipas_jabatan_wakil_asisten_form grid' },
        { ref: 'cmpStaf',       selector: 'sipas_jabatan_wakil_asisten_popup > form [name=staf_nama]' },
        { ref: 'cmpUnit',       selector: 'sipas_jabatan_wakil_asisten_popup > form [name=unit_nama]' },
        { ref: 'cmpJabatan',    selector: 'sipas_jabatan_wakil_asisten_popup > form [name=jabatan_nama]' }
    ],

    messages: {
        'message_success': ['Berhasil',' data berhasil diperbarui']
    },

    // controllerjabatanList: 'Sipas.jabatan.List',

    init: function(application) {
        this.control({
            'sipas_jabatan_wakil_asisten_popup': {
                show: this.onMainview_Show
            },
            'sipas_jabatan_wakil_asisten_popup sipas_jabatan_wakil_asisten_form sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'edit',
            record: null,
            staf: null,
            unit: null,
            jabatan: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'edit' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = [];
                    

                    return c;
                })(config));
                view.show();
                break;
            
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this = this,
            form = $this.getForm({root:mainview}),
            grid = $this.getGrid({root:mainview}),
            cmpStaf = $this.getCmpStaf({root:mainview}),
            cmpUnit = $this.getCmpUnit({root:mainview}),
            cmpJabatan = $this.getCmpJabatan({root:mainview}),
            record = mainview.record;

        grid.record = mainview.record;

        if(!form) return;
        // form.loadRecord(record);
        form.loadRecord(record);
        cmpStaf.setValue(mainview.staf);
        cmpUnit.setValue(mainview.unit);
        cmpJabatan.setValue(mainview.jabatan);

    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            mainview = this.getMainview({from:button}),
            grid = this.getGrid({root:mainview}),
            store = grid.getStore(),
            message_success = this.getMessage('message_success');

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length){
            $helper.showMsg({success:false, message:'Tidak Ada Perubahan'});
            return;
        }

        grid.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    store.sync({
                        callback: function(success, response){
                            var record = Ext.decode(response.responseText, true);
                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                            grid.setLoading(false);
                            mainview.close();
                        },
                        success: function(){
                            grid.setLoading(false);
                            $helper.showMessage({success: true, message: message_success});
                        }
                    });
                } else {
                    grid.setLoading(false);
                }
            }
        });
    }

});