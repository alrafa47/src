Ext.define('SIPAS.controller.Sipas.peran.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Peran'
    ],
    views: [
        'Sipas.peran.Prop'
    ],
    refs: [
        {ref: 'prop', selector: 'window#propSipasPeran'},
        {ref: 'form', selector: 'window#propSipasPeran > form'}
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    delegateView: 'Sipas.peran.Prop',
    delegateViewSelector: '#propSipasPeran',
    // defaultModel: 'Sipas.Peran',

    controllerProperty: 'Sipas.peran.Prop',
    controllerStaf: 'Sipas.peran.staf.Popup',

    init: function(application) {
        this.control({
            // 'sipas_peran_prop': {
            //     afterrender: this.onMainview_AfterRender,
            //     close: this.onMainview_Close
            // },
            "window#propSipasPeran sipas_com_button_save": {
                click: this.onBtnSave_Click
            },
            "window#propSipasPeran sipas_com_button_edit": {
                click: this.onBtnEdit_Click
            },
            'window#propSipasPeran button#btnStaf':{
                click: this.onButtonStaf_Click
            },
            "window#propSipasPeran sipas_com_button_delete": {
                click: this.onBtnDelete_Click
            }
        });
    },

    onBtnSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = button.up('window'),
            form = view.down('form'),
            record = form.getForm().updateRecord().getRecord();

        $helper.saveRecord({
            form: form,
            record: record,
            message: true,
            wait: true,
            callback: function(success, record, operation){
                if(success) view.close();
                Ext.callback(view.callback || Ext.emptyFn, view.scope, [success, record, operation]);
            }
        });
    },

    onBtnEdit_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            // view = $this.getMainview({from:button}),
            view = button.up('window'),
            // form = $this.getForm({root:view}),
            form = view.down('form'),
            record = form && form.updateRecord().getRecord();

        this.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                view.close();
            }
        });
    },

    onButtonStaf_Click: function(button, e, eOpts){
        var $this = this,
            view = button.up('window'),
            form = view.down('form'),
            record = form && form.updateRecord().getRecord(),
            asisten = $this.getController($this.controllerStaf);
        
        asisten.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.setLoading(false);
    },

    onBtnDelete_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = button.up('window'),
            form = view.down('form'),
            record = form && form.updateRecord().getRecord();

        this.launch({
            mode:'destroy',
            record: record,
            callback: function(success, record){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                view.close();
            }
        });
    },

    launch: function(config){
        config = Ext.applyIf(config,{
            mode: 'view',
            // record: config.mode === 'add' ? this.getModel(this.defaultModel || this.models[0]).create({}) : null,
            record: config.mode === 'add' ? this.getModel(this.models[0]).create({}) : null,
            callback: Ext.emptyFn
        });

        var $this = this,
            $helper = this.getApplication().Helper(),
            view = null,
            onShow = function(viewComponent){
                $this.getStore('Sipas.peran.Combo').reload();
                viewComponent.down('form').loadRecord(config.record);
            };

        switch(config.mode)
        {
            case 'add'  :
            case 'edit' :
            case 'view' :

                view = $this.createView( (function(c){
                    c.requireComponents = [];
                    if(c.mode === 'view') {
                        // c.removeComponents = ['#toolbarAction','#containerPassword', '#fileUpload'];
                        c.removeComponents = ['sipas_com_button_save'];
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents = ['#btnStaf', 'sipas_com_button_edit', 'sipas_com_button_delete'];
                    }

                    if(c.mode === 'add') {
                        c.removeComponents = ['#btnStaf', 'sipas_com_button_edit', 'sipas_com_button_delete'];
                    }
                    return c;
                })(config) );

                config.requireComponents = ['[name=peran_name]'];
                if(config.mode === 'view') config.removeComponent = ['sipas_com_button_save'];

                view = $this.createView(config);
                
                switch(view.mode){
                    case 'add': view.down('form').setTitle('Tambah User'); break;
                    case 'edit': view.down('form').setTitle('Ubah User'); break;
                    case 'view': view.down('form').setTitle('Detail User'); break;
                }

                view.on({ show: onShow});
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: config.record,
                    callback: config.callback,
                    confirm: true
                })
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    }

});
