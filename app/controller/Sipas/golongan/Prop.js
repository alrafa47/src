Ext.define('SIPAS.controller.Sipas.golongan.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.golongan.Prop'
    ],

    models: [
        'Sipas.Golongan'
    ],

    stores: [
        'Sipas.golongan.semua.List'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_golongan_prop' },
        { ref: 'form',      selector: 'sipas_golongan_prop > form' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    // defaultModel: 'Sipas.Golongan',
    controllerHelper: 'Sipas.Helper',
    storeList: 'Sipas.golongan.semua.List',
    controllerProperty: 'Sipas.golongan.Prop',

    init: function(application) {
        this.control({
            'sipas_golongan_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            "sipas_golongan_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_golongan_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_golongan_prop sipas_com_button_delete": {
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
                    
                    c.requireComponents = ['[name=golongan_level]', '[name=golongan_sgt]', '[name=golongan_gaji_pokok]'];
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_save');
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete');
                    }

                    if(c.mode === 'add') {
                        c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete');
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
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
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
            record = form && form.updateRecord().getRecord();

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
