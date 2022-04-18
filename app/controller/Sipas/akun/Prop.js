Ext.define('SIPAS.controller.Sipas.akun.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    views: [
        'Sipas.akun.Prop'
    ],

    models: [
        'Sipas.Akun'
    ],
    stores: [
        'Sipas.akun.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_akun_prop' },
        { ref: 'form',      selector: 'sipas_akun_prop > form' }
    ],

    api: {
        reset_login : 'server.php/sipas/account/reset_login/{section}?id={id}' 
    },

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'wait': 'Menyimpan data',
        'success': ['Berhasil', 'Berhasil menyimpan data'],
        'failure': ['Gagal', 'gagal menyimpan data']
    },

    init: function(application) {
        this.control({
            'sipas_akun_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            "sipas_akun_prop sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_akun_prop sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_akun_prop sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            'sipas_akun_prop button#btnResetWeb': {
                click: this.onButtonResetWeb_Click
            },
            'sipas_akun_prop button#btnResetMobile': {
                click: this.onButtonResetMobile_Click
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
                    
                    c.requireComponents = ['[name=akun_nama]'];
                    
                    if(c.mode === 'view') {
                        c.removeComponents.push('sipas_com_button_save');
                    }

                    if(c.mode === 'edit') {
                        c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete','#btnResetWeb','#btnResetMobile');
                    }

                    if(c.mode === 'add') {
                        c.removeComponents.push('sipas_com_button_edit', 'sipas_com_button_delete','#btnResetWeb','#btnResetMobile');
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
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = this.getApplication().Helper(),
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
            }
        });
        view.close();
    },

    onButtonResetWeb_Click: function(button, e, eOpts){
        var $this = this,            
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}),
            record = view.record;

        view && view.setLoading(true);
        Ext.Ajax.request({
            url: this.getApi('reset_login', {section:'web', id:record.getId()}),
            success: function(response, eOpts){
                view && view.setLoading(false);
                var objres = Ext.decode(response.responseText, true) || {},
                    success = objres.success;

                if(success){
                    $helper.showMsg({success:true, message: objres.message});    
                    view.close();
                }else{
                    $helper.showMsg({success:false, message: objres.message});    
                    return;
                }                
            }
        });
    },

    onButtonResetMobile_Click: function(button, e, eOpts){
        var $this = this,            
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}),
            record = view.record;

        view && view.setLoading(true);
        Ext.Ajax.request({
            url: this.getApi('reset_login', {section:'mobile', id:record.getId()}),
            success: function(response, eOpts){
                view && view.setLoading(false);
                var objres = Ext.decode(response.responseText, true) || {},
                    success = objres.success;

                if(success){
                    $helper.showMsg({success:true, message: objres.message});    
                    view.close();
                }else{
                    $helper.showMsg({success:false, message: objres.message});    
                    return;
                }
                
            }
        });
    }
});