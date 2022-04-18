Ext.define('SIPAS.controller.Sipas.jabatan.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.jabatan.Prop'
    ],

    stores: [
        'Sipas.unit.Combo',
        'Sipas.jabatan.Combo'
    ],

    models: [
        'Sipas.Jabatan'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_jabatan_prop' },
        { ref: 'form',              selector: 'sipas_jabatan_prop > form' },
        { ref: 'containerParent',   selector: 'sipas_jabatan_prop > form > container#containerParent' },
        { ref: 'comboParent',       selector: 'sipas_jabatan_prop > form > container#containerParent triggerfield#comboParent' },
        { ref: 'comboInduk',       selector: 'sipas_jabatan_prop > form > container#containerParent #comboInduk' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    path: null,
    changePath: null,

    storeUnitCombo:     'Sipas.unit.Combo',
    // defaultModel:       'Sipas.Jabatan',
    lookupController:   'Sipas.jabatan.Lookup',
    controllerProperty: 'Sipas.jabatan.Prop',
    controllerCakupan: 'Sipas.unit.cakupan.Popup',
    controllerStaf: 'Sipas.jabatan.staf.Popup',

    init: function(application) {
        this.control({
            'sipas_jabatan_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            "sipas_jabatan_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_jabatan_prop container#containerParent triggerfield#comboParent": {
                triggerclick: this.onComboParent_TriggerClick
            },
            "sipas_jabatan_prop container#containerParent sipas_com_button_cross": {
                click: this.onButtonParentClear_Click
            },
            "sipas_jabatan_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_jabatan_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            'sipas_jabatan_prop button#btnUnit':{
                click: this.onButtonUnit_Click
            },
            'sipas_jabatan_prop button#btnStafJabatan':{
                click: this.onButtonStafJabatan_Click
            },
            'sipas_jabatan_prop container#containerParent #comboParent': {
                loadassociate: this.onComboParent_LoadAssociate,
                focus: this.onComboParent_Focus
            },
            'sipas_jabatan_prop [name=jabatan_unit]': {
                loadassociate: this.onComboJabatan_LoadAssociate,
                focus: this.onComboParent_Focus
            },
            'sipas_jabatan_prop [name=jabatan_induk]': {
                loadassociate: this.onComboInduk_LoadAssociate,
                focus: this.onComboParent_Focus,
                select: this.onComboParent_Select
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
                    
                    c.requireComponents = ['[name=jabatan_kode]', '[name=jabatan_nama]'];
                    c.readonlyComponents.push('#jabatan_pos_code');
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_save','sipas_com_button_cross');
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents.push('#btnStafJabatan', '#btnUnit', 'sipas_com_button_edit', 'sipas_com_button_delete');
                    }

                    if(c.mode === 'add') {
                        c.removeComponents.push('#btnStafJabatan', '#btnUnit', 'sipas_com_button_edit', 'sipas_com_button_delete');
                    }
                    return c;
                })(config));
                
                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp}),
                            triggerfield = form.down('triggerfield'),
                            comboUnit = form.down('combobox'),
                            parent = config.parentRecord;
                        

                        $this.getStore($this.storeUnitCombo).reload();
                        form.loadRecord(record);

                        if(parent != null){
                            var parentRecord = parent.data['jabatan_id'];
                            if(parentRecord != "root"){
                                viewCmp.setLoading(true);
                                $this.setParent(parent, viewCmp);
                                comboUnit && comboUnit.setValue(parent.data['jabatan_unit']);
                                viewCmp.setLoading(false);
                            }

                        }

                        switch(view.mode){
                            case 'add': form.setTitle('Tambah Jabatan'); break;
                            case 'edit': form.setTitle('Ubah Jabatan'); break;
                            case 'view': form.setTitle('Detail Jabatan'); break;
                        }
                    },
                    close: function (viewCmp) {
                        var form = this.getForm({root:viewCmp}),
                            record = form.getRecord();

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

    onButtonUnit_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            cakupan = $this.getController($this.controllerCakupan);

        cakupan.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.setLoading(false);
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            wait = $this.getMessage('wait'); 

            if($this.changePath === 1){
                params = {
                    'isChange': true,
                    'path' : this.path,
                    'jabatan_path': record.get('jabatan_parent_path')
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
    },

    onButtonStafJabatan_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
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

    onComboParent_Select: function(combo, selection, eOpts){
        if(selection[0].get('jabatan_parent_path')){
            this.path = selection[0].get('jabatan_parent_path');
        }else{
            this.path = null;
        }
        this.changePath = 1;
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
            }
        });
    },

    onButtonParentClear_Click: function(button, e, eOpts) {
        this.setParent(null, this.getMainview({from:button}));
        this.path = null;
        this.changePath = 1;
    },

    setParent: function(record, view){
        var containerParent = this.getContainerParent({root:view});
        var triggerfield = containerParent.down('#comboInduk'),
            hiddenfield = containerParent.down('hiddenfield');

        triggerfield.setHiddenValue(record);
        triggerfield.setValue(record && record.get('jabatan_nama'));
        hiddenfield.setValue(record && record.get('jabatan_id'));
    },

    // parent
    onComboParent_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        record.getParent(function(r){
            cmp.setLoading(false);

            cmp.setValue(r);
        });
    },

    onComboParent_Focus: function(combobox, e, eOpts)
    {
        var store = combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    },

    onComboJabatan_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        record.getUnit(function(r){
            cmp.setLoading(false);

            cmp.setValue(r);
        });
    },

    onComboInduk_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        record.getParent(function(r){
            cmp.setLoading(false);

            cmp.setValue(r);
        });
    }

});
