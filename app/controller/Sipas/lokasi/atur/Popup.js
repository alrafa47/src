Ext.define('SIPAS.controller.Sipas.lokasi.atur.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',
    
    views: [
        'Sipas.lokasi.atur.Popup'
    ],

    stores: [
        'Sipas.lokasi.Combo'
    ],

    models: [
        'Sipas.Lokasi'
    ],

    refs : [
        { ref: 'mainview',      selector: 'sipas_lokasi_atur_popup' },
        { ref: 'form',          selector: 'sipas_lokasi_atur_popup form' },
        { ref: 'comboLokasi',   selector: 'sipas_lokasi_atur_popup form [name=surat_lokasi]' },
        { ref: 'txtLokasiSub',  selector: 'sipas_lokasi_atur_popup form [name=surat_lokasi_sub]' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    api: {
        'saveLokasi' : 'server.php/sipas/surat/simpanLokasi'
    },

    defaultModel: 'Sipas.Lokasi',
    controllerHelper: 'Sipas.Helper',
    
    init: function(application) {
        this.control({
            'sipas_lokasi_atur_popup': {
                show: this.onMainview_Show
            },
            'sipas_lokasi_atur_popup combobox[name=surat_lokasi]': {
                loadassociate: this.onComboLokasi_LoadAssociate,
                focus: this.onComboParent_Focus
            },
            "sipas_lokasi_atur_popup sipas_com_button_save": {
                click: this.onButtonSave_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'edit',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = $this.createRecord(config.record),
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
            comboLokasi = $this.getComboLokasi({root:mainview}),
            record = mainview.record;

        form && form.loadRecord(record);
        comboLokasi && comboLokasi.getStore().reload();
    },

    onComboLokasi_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        record.getLokasi(function(r)
        {
            cmp.setLoading(false);
            cmp.setValue(r);
        });
    },

    onComboParent_Focus: function(combobox, e, eOpts)
    {   
        if(!combobox) return false;
        var store = combobox && combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from: button}),
            form = $this.getForm({root: mainview}),
            comboLokasi = $this.getComboLokasi({root:mainview}),
            textLokasiSub = $this.getTxtLokasiSub({root:mainview}),
            record =      form && form.updateRecord().getRecord(),
            params ={
                'log' : 11
            };

        if (!comboLokasi.getValue()){
            $helper.showMsg({success: false, message: 'Anda belum memilih lokasi arsip'});
        } else {
            mainview.setLoading(true);
            $helper.saveRecord({
                record: record,
                form: form,
                params: params,
                wait: true,
                message: false,
                confirm: true,
                confirmText: 'Apakah anda yakin memindahkan lokasi surat ?',
                confirmTitle: 'Atur Lokasi',
                callback: function(success, record, eOpts, response){
                    $helper.showMsg({success: true, message: 'Berhasil memindahkan lokasi surat'});
                    mainview.close();
                    Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                }
            });
            mainview.setLoading(false);
        }
    }
});