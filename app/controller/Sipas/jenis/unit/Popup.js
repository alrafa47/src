Ext.define('SIPAS.controller.Sipas.jenis.unit.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.jenis.unit.Form'
    ],

    store:[
        'Sipas.jenis.unit.List',
        'Sipas.jenis.unit.asisten.Combo'
    ],

    views: [
        'Sipas.jenis.unit.Popup'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_jenis_unit_popup' },
        { ref: 'form',      selector: 'sipas_jenis_unit_popup sipas_jenis_unit_form' },
        { ref: 'grid',      selector: 'sipas_jenis_unit_popup sipas_jenis_unit_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' Data berhasil diperbarui']
    },

    // controllerunitList: 'Sipas.unit.List',

    init: function(application) {
        this.control({
            'sipas_jenis_unit_popup': {
                show: this.onMainview_Show
            },
            'sipas_jenis_unit_popup sipas_jenis_unit_form sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'edit',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'edit' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = [];
                    

                    return c;
                })(config));
                view.show();
                break;
            
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var form = this.getForm({root:mainview}),
            record = mainview.record;

        if(!form) return;
    
        form.loadRecord(record);
    },

    onButtonSave_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button}),
            checkSession = this.getApplication().getSession().getResetSession(),
            grid = this.getGrid({root:mainview}),
            store = grid.getStore(),
            message_success = this.getMessage('message_success');

        grid.setLoading(true);
        store.sync({
            callback: function(success, record, eOpts){
                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                mainview.close();
            },
            success: function(){
                $helper.showMessage({success: true, message: message_success});
            }
        });
    }

});