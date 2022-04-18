Ext.define('SIPAS.controller.Sipas.disposisi.log.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.disposisi.log.Popup'
    ],

    models: [
        'Sipas.disposisi.masuk.Log'
    ],

    stores: [
        'Sipas.disposisi.masuk.log.Popup'
    ],

    refs: [
        { ref: 'mainview',     selector: 'sipas_disposisi_log_popup' },
        { ref: 'form',     selector: 'sipas_disposisi_log_popup > form' },
        { ref: 'list',     selector: 'sipas_disposisi_log_popup #listLog' }
    ],

    init: function(application) {
        this.control({
            'sipas_disposisi_log_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_disposisi_log_popup #listLog': {
                loadassociate: this.onPenerima_LoadAssociate
            }
        });
    },

    launch: function(config)
    {
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
            case 'view' :
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

    onPenerima_LoadAssociate: function(record, form, cmp){
        var store = record.fetchLog();
        cmp.reconfigure(store);
        cmp.record = record;
        record.getId() && store.reload();
    }
});