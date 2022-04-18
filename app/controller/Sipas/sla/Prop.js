Ext.define('SIPAS.controller.Sipas.sla.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    views: [
        'Sipas.sla.Prop'
    ],

    models: [
        'Sipas.Sla'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_sla_prop' },
        { ref: 'form',      selector: 'sipas_sla_prop > form' },
        { ref: 'listRumus', selector: 'sipas_sla_prop sipas_sla_rumus_list' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    // defaultModel: 'Sipas.Sla',
    controllerHelper: 'Sipas.Helper',
    storeRumusList: 'Sipas.sla.rumus.List',

    init: function(application) {
        this.control({
            'sipas_sla_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            "sipas_sla_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_sla_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_sla_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            "sipas_sla_prop sipas_sla_rumus_list": {
                loadassociate: this.onRumusList_LoadAssociate
            },
            "sipas_sla_prop [name=sla_isaktif]": {
                change: this.onCheckField_Change
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
                    c.hideComponent = [];
                    
                    c.requireComponents = ['[name=sla_nama]'];
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_plus','sipas_com_button_minus', 'sipas_com_button_save');
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
                if(config.mode === 'view'){
                    $helper.hideComponent({
                parent: view,
                items:{
                    '#columnDelete' : true,
                    '#columnMoveDown' : true,
                    '#columnMoveUp' : true
                }
            });
                }
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
            $helper = this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            storeRumusList = $this.getStore($this.storeRumusList),
            params = {
                'rumus[]' : [],
                'nilai[]' : []
            };

        if(! record) return;
        storeRumusList.each(function(r){
            params['rumus[]'].push(r.get('sla_rumus_formula'));
            params['nilai[]'].push(r.get('sla_rumus_nilai'));
        });
            
        $helper.saveRecord({
            record: record,
            params: params,
            form: form,
            wait: true,
            message: true,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
                if(success)view.close();
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts) 
    {
        var view = this.getMainview({from:button}),
            form = this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        view.close();
        if(record){
            this.launch({
                mode:'edit',
                record: record
            });
        }
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
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
    },

    onRumusList_LoadAssociate: function(record, form, cmp){
        var storeRumus = cmp.getStore(),
            store = record.fetchRumus();

        storeRumus.removeAll();
        store.load(function(){
            store.each(function(record){
                storeRumus.add(record);
            });
        }); 
    },

    onCheckField_Change: function(field, newValue, oldValue, eOpts){
        
    }
});