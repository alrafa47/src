Ext.define('SIPAS.controller.Sipas.unit.cakupan.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.unit.cakupan.Form'
    ],

    store:[
        'Sipas.unit.cakupan.List',
        'Sipas.unit.cakupan.asisten.Combo'
    ],

    views: [
        'Sipas.unit.cakupan.Popup'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_unit_cakupan_popup' },
        { ref: 'form',      selector: 'sipas_unit_cakupan_popup sipas_unit_cakupan_form' },
        { ref: 'grid',      selector: 'sipas_unit_cakupan_popup sipas_unit_cakupan_form grid' }
    ],

    messages: {
        'message_success': ['Berhasil',' data berhasil diperbarui']
    },

    // controllerunitList: 'Sipas.unit.List',

    init: function(application) {
        this.control({
            'sipas_unit_cakupan_popup': {
                show: this.onMainview_Show
            },
            'sipas_unit_cakupan_popup sipas_unit_cakupan_form sipas_com_button_save': {
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
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            mainview = this.getMainview({from:button}),
            grid = this.getGrid({root:mainview}),
            store = grid.getStore(),
            message_success = this.getMessage('message_success');

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length) return;

        mainview.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    store.sync({
                        callback: function(success, record, eOpts){
                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                            mainview.setLoading(false);
                            mainview.close();
                        },
                        success: function(){
                            mainview.setLoading(false);
                            $helper.showMessage({success: true, message: message_success});
                        }
                    });
                } else {
                    mainview.setLoading(false);
                }
            }
        });
    }

});