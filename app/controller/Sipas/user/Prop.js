Ext.define('SIPAS.controller.Sipas.user.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.User'
    ],
    
    stores: [
        'Sipas.peran.Combo'
    ],
    
    views: [
        'Sipas.user.Prop'
    ],
    
    refs: [
        {ref: 'prop', selector: 'sipas_user_prop'}
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    delegateView: 'Sipas.user.Prop',
    delegateViewSelector: '#propSipasUser',
    defaultModel: 'Sipas.User',

    init: function(application) {
        this.control({
            "sipas_user_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_user_prop [name=user_role]": {
                loadassociate: this.onComboParent_LoadAssociate,
                focus: this.onComboParent_Focus
            }
        });
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = this.getApplication().Helper(),
            view = button.up('window'),
            form = view.down('form'),
            record = form.getForm().updateRecord().getRecord(),
            pass = form.down('[name=user_password]').getValue();

        if(!Ext.isEmpty(pass)){
            record.set('user_password', CryptoJS.MD5(pass).toString());
        }

        $helper.saveRecord({
            form: form,
            record: record,
            message: true,
            wait: true,
            callback: function(success, record, operation){
                if(success) view.close();
                record.set('user_password',null);
                Ext.callback(view.callback || Ext.emptyFn, view.scope, [success, record, operation]);
            }
        });
    },

    launch: function(config){
        config = Ext.applyIf(config,{
            mode: 'view',
            record: config.mode === 'add' ? this.getModel(this.defaultModel || this.models[0]).create({}) : null,
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

                config.requireComponents = ['[name=user_name]', '[name=user_password]'];
                if(config.mode === 'edit') config.readonlyComponents = [];
                if(config.mode === 'view') config.removeComponent = ['sipas_com_button_save'];

                view = $this.createView(config);
                
                switch(view.mode){
                    case 'add': view.down('form').setTitle('Tambah User'); break;
                    case 'edit': view.down('form').setTitle('Ubah User'); break;
                    case 'view': view.down('form').setTitle('Detail User'); break;
                }

                view.on({show:onShow});
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
    },

    // parent
    onComboParent_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        if(record){
            cmp.setLoading(false);
            cmp.setValue(record);
        }
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
    }

});
