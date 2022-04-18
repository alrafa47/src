Ext.define('SIPAS.controller.Sipas.prioritas.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.prioritas.Prop'
    ],

    models: [
        'Sipas.Prioritas'
    ],

    stores: [
        'Sipas.prioritas.semua.List',
        'Sipas.retensi.Combo'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_prioritas_prop' },
        { ref: 'form',      selector: 'sipas_prioritas_prop > form' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    // defaultModel: 'Sipas.Prioritas',
    controllerHelper: 'Sipas.Helper',
    storeList: 'Sipas.prioritas.semua.List',
    controllerProperty: 'Sipas.prioritas.Prop',

    init: function(application) {
        this.control({
            'sipas_prioritas_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            "sipas_prioritas_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_prioritas_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_prioritas_prop sipas_com_button_delete": {
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
                    
                    c.requireComponents = ['[name=prioritas_kode]', '[name=prioritas_nama]', '[name=prioritas_retensi]'];
                    
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
