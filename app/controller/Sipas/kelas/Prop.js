Ext.define('SIPAS.controller.Sipas.kelas.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.kelas.Prop'
    ],

    models: [
        'Sipas.Kelas'
    ],

    stores: [
        'Sipas.kelas.semua.List',
        'Sipas.retensi.Combo'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_kelas_prop' },
        { ref: 'form',              selector: 'sipas_kelas_prop > form' },
        { ref: 'comboJenis',        selector: 'sipas_kelas_prop > form #containerJenis combo' },
        { ref: 'containerInduk',    selector: 'sipas_kelas_prop > form #containerInduk' },
        { ref: 'containerParent',   selector: 'sipas_kelas_prop > form > container#containerParent' },
        { ref: 'comboParent',       selector: 'sipas_kelas_prop > form > container#containerParent triggerfield#comboParent' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    path: null,
    changePath: null,

    lookupController:   'Sipas.kelas.Lookup',
    storeList:          'Sipas.kelas.aktif.List',

    init: function(application) {
        this.control({
            'sipas_kelas_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            "sipas_kelas_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_kelas_prop container#containerParent triggerfield#comboParent": {
                triggerclick: this.onComboParent_TriggerClick
            },
            "sipas_kelas_prop container#containerJenis sipas_com_button_cross": {
                click: this.onButtonJenisClear_Click
            },
            "sipas_kelas_prop container#containerParent sipas_com_button_cross": {
                click: this.onButtonParentClear_Click
            },
            "sipas_kelas_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_kelas_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            parentRecord: null,
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
                    
                    c.requireComponents = ['[name=kelas_kode]', '[name=kelas_nama]'];
                    
                    if(c.mode === 'view') {
                        c.removeComponents = ['sipas_com_button_save','sipas_com_button_cross'];
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents = ['sipas_com_button_edit', 'sipas_com_button_delete'];
                    }

                    if(c.mode === 'add') {
                        c.removeComponents = ['sipas_com_button_edit', 'sipas_com_button_delete'];
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

    onMainview_AfterRender: function(mainview) {
        var $this = this,
            record = $this.createRecord(mainview.record),
            comboJenis = $this.getComboJenis({root:mainview}),
            form = $this.getForm({root:mainview}),
            storeJenis = comboJenis.getStore();

        storeJenis.reload();
        form.loadRecord(record);
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
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
            }
        });
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            storeList = $this.getStore(this.storeList),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();
            wait = $this.getMessage('wait'); 

            if($this.changePath === 1){
                params = {
                    'isChange': true,
                    'path' : this.path,
                    'kelas_path': record.get('kelas_parent_path')
                };
            }else{
                params = {
                    'path' : this.path
                };
            }

        if(! record) return;
            
        $helper.saveRecord({
            record: record,
            form: form,
            params: params,
            wait: true,
            message: true,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
            }
        });
    },

    onComboParent_TriggerClick: function(triggerfield, eOpts){
        var $this = this;
        $this.getController($this.lookupController).launch({
            multiselect: false,
            afterload: function(records, success, store, lookup){
                var currentselected = triggerfield.getHiddenValue();
                if(currentselected){
                    lookup.down('treepanel').getSelectionModel().select([currentselected]);
                }
            },
            callback: function(selection){
                $this.setParent(selection[0], $this.getMainview({from:triggerfield}));
                if(selection[0].get('kelas_parent_path')){
                    this.path = selection[0].get('kelas_parent_path');
                }else{
                    this.path = null;
                }
                this.changePath = 1;
            }
        });
    },

    onButtonParentClear_Click: function(button, e, eOpts) {
        this.setParent(null, this.getMainview({from:button}));
        this.path = null;
        this.changePath = 1;
    },

    onButtonJenisClear_Click: function(button, e, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from:button}),
            comboJenis = $this.getComboJenis({root:mainview});

        comboJenis.setValue(null);
    },

    setParent: function(record, view){
        var containerParent = this.getContainerParent({root:view});
        var triggerfield = containerParent.down('triggerfield'),
            hiddenfield = containerParent.down('hiddenfield');

        triggerfield.setHiddenValue(record);
        triggerfield.setValue(record && record.get('kelas_nama'));
        hiddenfield.setValue(record && record.get('kelas_id'));
    }

});