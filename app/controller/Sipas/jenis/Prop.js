Ext.define('SIPAS.controller.Sipas.jenis.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.jenis.Prop'
    ],

    models: [
        'Sipas.Jenis'
    ],

    stores: [
        'Sipas.retensi.Combo'
    ],

    refs : [
        { ref: 'mainview',      selector: 'sipas_jenis_prop' },
        { ref: 'form',          selector: 'sipas_jenis_prop > form' },
        { ref: 'cbUJ',          selector: 'sipas_jenis_prop #cbUJ' },
        { ref: 'cbPusat',       selector: 'sipas_jenis_prop #cbPusat' },
        { ref: 'cbBatas',       selector: 'sipas_jenis_prop #batasReupload' },
        { ref: 'fieldBatas',    selector: 'sipas_jenis_prop #batasMax' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    controllerUnit: 'Sipas.jenis.unit.Popup',    

    init: function(application) {
        this.control({
            'sipas_jenis_prop': {
                afterrender: this.onMainview_AfterRender,
                show : this.onMainview_Show,
                close: this.onMainview_Close
            },
            "sipas_jenis_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_jenis_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_jenis_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            'sipas_jenis_prop button#btnUnit':{
                click: this.onButtonUnit_Click
            },
            'sipas_jenis_prop #cbUJ': {
                change: this.onCheckboxUJ_Change
            },
            'sipas_jenis_prop #cbPusat': {
                change: this.onCheckboxPusat_Change
            },
            'sipas_jenis_prop [name=jenis_tipe]': {
                change: this.onCheckboxJenisTipe_Change
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
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $settings = $app.LocalSetting(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            record = this.createRecord(config.record),
            view = null;
            
        config.record = record;
        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    c.hideComponent         = [];
                    
                    c.requireComponents = ['[name=jenis_kode]', '[name=jenis_nama]'];

                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_save');
                        
                        if(!c.record.get('jenis_tipe')){
                            c.removeComponents.push('#btnUnit');
                        }
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete', '#btnUnit');
                    }

                    if(c.mode === 'add') {
                        c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete', '#btnUnit');
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
                });
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onButtonUnit_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            unit = $this.getController($this.controllerUnit);

        unit.launch({
            mode:'edit',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.setLoading(false);
    },

    onMainview_Show: function(view){
        var $this   = this,
            $app    = $this.getApplication(),
            form    = $this.getForm({root:view}),
            $helper = $this.getApplication().Helper(),
            record  = view.record || $this.getModel($this.defaultModel || $this.models[0]).create({}),
            jenis_tipe = record.get('jenis_tipe'),
            mode = view.mode,
            cbUJ = $this.getCbUJ({root:view}),
            cbPusat = $this.getCbPusat({root:view});

        if(record.get('jenis_terpusat') === 1){
            $helper.disableComponent({
                parent: view,
                items:{
                    '#cbUJ' : true,
                    '#cbPusat': false
                }
            });
            cbPusat.setValue(true);
        }else if(record.get('jenis_terpusat') === 2){
            $helper.disableComponent({
                parent: view,
                items:{
                    '#cbUJ' : false,
                    '#cbPusat': true
                }
            });
            cbUJ.setValue(true);
        }

        if (mode === 'add'){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#btnUnit': true
                }
            });
        } else if (mode === 'edit'){
            if (jenis_tipe){
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#btnUnit': false
                    }
                });
            } else {
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#btnUnit': true
                    }
                });
            }
        }
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            cbUJ = $this.getCbUJ({root:view}),
            cbPusat = $this.getCbPusat({root:view}),
            cbBatas = $this.getCbBatas({root:view}),
            fieldBatas = $this.getFieldBatas({root:view}),
            record = form && form.updateRecord().getRecord(),
            wait = $this.getMessage('wait'),
            custom ='';

        if(!record) return;
        // record.get('jenis_tampil').toString();

        if(cbPusat.getValue()){
            custom = 1;
        }else if(cbUJ.getValue()){
            custom = 2;
        }else{
            custom = 0;
        }
        
        if (cbBatas.getValue() && !fieldBatas.getValue()) {
            $helper.showMsg({message:'Silahkan atur batas maksimal reupload'});
            return;
        }

        $helper.saveRecord({
            record: record,
            form: form,
            wait: true,
            params:{custom:custom},
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

    onCheckboxUJ_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            view = view || $this.getMainview(),
            $helper = $this.getApplication().Helper();

        $helper.disableComponent({
            parent: view,
            items:{
                '#cbPusat' : newValue
            }
        });
    },

    onCheckboxPusat_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            view    = view || $this.getMainview(),
            $helper     = $this.getApplication().Helper();

        $helper.disableComponent({
            parent: view,
            items:{
                '#cbUJ' : newValue
            }
        });
    },

    onCheckboxJenisTipe_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $settings = $app.LocalSetting(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            feature_jenis_perunit = $feature.getFeatureAccess('jenis_perunit'),
            role_jenis_unit = $session.getRuleAccess('jenis_unit'),
            view = view || $this.getMainview(),
            value = checkbox.getValue();

        if (value){
            if (role_jenis_unit){
                $helper.hideComponent({
                    parent: view,
                    items: {
                        '#btnUnit':false
                    }
                });
            } else {
                $helper.hideComponent({
                    parent: view,
                    items: {
                        '#btnUnit':true
                    }
                });
            }
        } else {
            $helper.hideComponent({
                parent: view,
                items: {
                    '#btnUnit':true
                }
            });
        }
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
            }
        });
        view.close()
    }

});