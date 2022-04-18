Ext.define('SIPAS.controller.Sipas.sifat.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.sifat.Prop'
    ],

    models: [
        'Sipas.Sifat'
    ],

    stores: [
        'Sipas.sifat.semua.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_sifat_prop' },
        { ref: 'sifatColor',  selector: 'sipas_sifat_prop #sifatColor' },
        { ref: 'color',  selector: 'sipas_sifat_prop #color' },
        { ref: 'form',      selector: 'sipas_sifat_prop > form' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    // defaultModel:       'Sipas.Sifat',
    // storeList:          'Sipas.sifat.semua.List',
    // controllerHelper:   'Sipas.Helper',
    // controllerProperty: 'Sipas.sifat.Prop',

    init: function(application) {
        this.control({
            'sipas_sifat_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_sifat_prop #color': {
                select: this.onColorPicker1Select
            },
            "sipas_sifat_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_sifat_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_sifat_prop sipas_com_button_delete": {
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
                    
                    c.requireComponents = ['[name=sifat_kode]', '[name=sifat_nama]'];
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_save', '#containerColor');
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents.push('sipas_com_button_delete', 'sipas_com_button_edit');
                    }

                    if(c.mode === 'add') {
                        c.removeComponents.push('sipas_com_button_delete', 'sipas_com_button_edit');
                    }
                    return c;
                })(config));
                
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

    // onColor_Change: function(colormenu, newValue, oldValue, eOpts){
    //     var $this = this,
    //         mainview = $this.getMainview({from: colormenu}),
    //         sifatColor = $this.getSifatColor({root:mainview});

    //     sifatColor.setValue(newValue);
    // },

    onColorPicker1Select: function(colorpicker, color, e0pts) {
        var $this = this,
            mainview = $this.getMainview({from: colorpicker}),
            sifatColor = $this.getSifatColor({root:mainview});

        sifatColor.setValue('#'+color);
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();
            wait = $this.getMessage('wait'); 

        if(! record) return;
            
        $helper.saveRecord({
            record: record,
            form: form,
            wait: true,
            message: true,
            callback: function(success, record, eOpts){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        this.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close();
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        this.launch({
            mode:'destroy',
            record: record,
            callback: function(success, record){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    }

});