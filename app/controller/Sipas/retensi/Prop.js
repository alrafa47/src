Ext.define('SIPAS.controller.Sipas.retensi.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.retensi.Prop'
    ],

    models: [
        'Sipas.Retensi'
    ],

    stores: [
        'Sipas.retensi.semua.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_retensi_prop' },
        { ref: 'form',      selector: 'sipas_retensi_prop > form' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    // defaultModel: 'Sipas.Retensi',
    defaultStore: 'Sipas.retensi.semua.List',
    controllerProperty: 'Sipas.retensi.Prop',
    
    init: function(application) {
        this.control({
            'sipas_retensi_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            "sipas_retensi_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_retensi_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_retensi_prop sipas_com_button_delete": {
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
            $helper = $this.getApplication().Helper(),
            // record = config.record || $this.getModel(this.defaultModel || this.models[0]).create({}),
            record = config.record || $this.getModel(this.models[0]).create({}),
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
                    
                    c.requireComponents = ['[name=surat_retensi_nama]', '[name=surat_retensi_hari]'];
                    
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
                
                // view.on({
                //     show: function(viewCmp){
                //         var form = $this.getForm({root:viewCmp});
                        
                //         form.loadRecord(record);

                //         switch(view.mode){
                //             case 'add': form.setTitle('Tambah Retensi'); break;
                //             case 'edit': form.setTitle('Ubah Retensi'); break;
                //             case 'view': form.setTitle('Detail Retensi'); break;
                //         }
                //     },
                //     close: function (viewCmp) {
                //         var form = this.getForm({root:viewCmp}),
                //             record = form.getRecord();

                //         record && record.reject();
                //     },
                //     scope: $this
                // });
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
                $this.getStore($this.defaultStore).reload();
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
                view.close();
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
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    }
});