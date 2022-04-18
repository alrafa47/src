Ext.define('SIPAS.controller.Sipas.jenis.setting.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.jenis.setting.Popup'
    ],

    models: [
        'Sipas.Jenis'
    ],

    stores: [
        'Sipas.jenis.aktif.List'
    ],

    refs : [
        { ref: 'mainview',  selector: 'sipas_jenis_setting_popup' }
    ],

    messages: {
        'invalidMode': ['Error', 'Mode tidak sesuai']
    },

    defaultStore: 'Sipas.jenis.aktif.List',
    
    init: function(application) {
        this.control({
            "sipas_jenis_setting_popup sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
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
            record = config.record || $this.getModel(this.defaultModel || this.models[0]).create({}),
            // record = config.record || $this.getModel(this.models[0]).create({}),
            view = null;
            
        switch(config.mode)
        {
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    return c;
                })(config));
                view.show();

                break;

            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
        this.refresh(view);
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = pagingtoolbar.getStore();
        newStore.reload();
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    }
});