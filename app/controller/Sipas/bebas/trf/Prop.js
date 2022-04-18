Ext.define('SIPAS.controller.Sipas.bebas.trf.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.bebas.trf.Prop'
    ],

    stores:[
        'Sipas.bebas.trf.surat.Combo',
        'Sipas.itipe.Combo',
        'Sipas.surat.scope.Combo'
    ],

    models:[
        'Sipas.Surat'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_bebas_trf_prop' },
        { ref: 'form',      selector: 'sipas_bebas_trf_prop > form' },
        { ref: 'cmpModel',  selector: 'sipas_bebas_trf_prop > form [name=surat_model]' },
        { ref: 'cmpTipe',   selector: 'sipas_bebas_trf_prop > form #comboTipe' },
        { ref: 'cmpScope',  selector: 'sipas_bebas_trf_prop > form #comboScope' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data'],
        'internalFailure': ['Surat Internal Gagal', 'gagal menyiapkan data, harap mengisi Tipe Internal'],
        'suratFailure': ['Gagal Import', 'Gagal menyiapkan data, harap memilih Surat']
    },

    api: {
        import : 'server.php/sipas/surat/createImport'
    },
    
    controllerSurat: 'Sipas.surat.agenda.Prop',

    init: function(application) {
        this.control({
            "sipas_bebas_trf_prop #btnImport": {
                click: this.onButtonImport_CLick
            },
            "sipas_bebas_trf_prop [name=surat_model]": {
                select: this.onComboSM_Select
            },
            "sipas_bebas_trf_prop #comboScope": {
                afterrender: this.onComboScope_AfterRender
            }
        });
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            record: null,
            arsip: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = $this.createRecord(config.record || $this.models[0]),
            view = null;
            
        switch(config.mode)
        {
            case 'import' :

                view = $this.createView((function(c){
                    c.requireComponents     = ['[name=surat_model]', '#comboScope'];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    c.hideComponent         = [];
                    
                    return c;
                })(config));
                
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onComboSM_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            cmpTipe = $this.getCmpTipe({root:mainview}),
            value = combo.getValue();

        if(value === 4){
            cmpTipe.show();
            cmpTipe.setValue(null);
        }
        else{
            cmpTipe.hide();
            cmpTipe.setValue(null);
        }
    },

    onComboScope_AfterRender: function (component, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            profile = $session.getProfile();
        
        component.setLoading(true);
        component.getStore().load({
            callback: function(record, operation, success){
                component.setLoading(false);
                component.setValue(profile.staf_unit);
            }
        });
    },

    onButtonImport_CLick: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            mainview = $this.getMainview({from: button}),
            form = $this.getForm({root:mainview}),
            cmpModel = $this.getCmpModel({root:mainview}),
            cmpScope = $this.getCmpScope({root:mainview}),
            cmpTipe = $this.getCmpTipe({root:mainview}),
            controllerSurat = $this.getController($this.controllerSurat),
            recordImport = $this.createRecord(mainview.record);

        mainview.setLoading(true);
        if(cmpModel.getValue() === 4 && cmpTipe.getValue() === null){
            mainview.setLoading(false);
            Ext.Msg.alert($this.getMessage('internalFailure')[0], $this.getMessage('internalFailure')[1]);
        }
        else if(cmpModel.getValue() === null){
            mainview.setLoading(false);
            Ext.Msg.alert($this.getMessage('suratFailure')[0], $this.getMessage('suratFailure')[1]);
        }
        else{
            Ext.Ajax.request({
                url: $this.getApi('import'),
                params: {
                    'arsip'         : mainview.arsip,
                    'surat_model'   : cmpModel.getValue(),
                    'surat_unit'    : cmpScope.getValue(),
                    'surat_itipe'   : cmpTipe.getValue()
                },
                success: function(response, eOpts){
                    mainview.setLoading(false);

                    var model = cmpModel.getValue(),
                        res = Ext.decode(response.responseText),
                        success = res.success;
                    
                    if(!success){
                        $helper.showMsg({success:false, message:'Gagal menyiapkan surat. Silahkan tutup dan ulangi lagi !'});
                        return;
                    }
                    if(success){
                        switch(model){
                            case 1:
                                $this.getController('Sipas.masuk.agenda.Prop').launch({
                                    propType: 'masuk',
                                    unit: cmpScope.getValue(),
                                    tipe: cmpTipe.getValue(),
                                    mode:'edit',
                                    model: model,
                                    record: res.data
                                });
                            break;
                            case 2:
                                $this.getController('Sipas.keluar.agenda.Prop').launch({
                                    propType: 'keluar',
                                    unit: cmpScope.getValue(),
                                    tipe: cmpTipe.getValue(),
                                    mode:'edit',
                                    model: model,
                                    record: res.data
                                });
                            break;
                            case 4:
                                $this.getController('Sipas.internal.keluar.agenda.Prop').launch({
                                    propType: 'ikeluar',
                                    unit: cmpScope.getValue(),
                                    tipe: cmpTipe.getValue(),
                                    mode:'edit',
                                    model: model,
                                    record: res.data
                                });
                            break;
                        }
                    }
                    mainview.close();
                }
            });
        }
    }

});