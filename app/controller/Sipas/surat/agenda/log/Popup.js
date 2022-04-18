Ext.define('SIPAS.controller.Sipas.surat.agenda.log.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.agenda.log.Popup'
    ],

    models: [
        'Sipas.surat.agenda.Log'
    ],

    stores: [
        'Sipas.surat.agenda.log.Popup'
    ],

    api: {
        'log': 'server.php/sipas/surat_log/read?filter={filter}'
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_surat_agenda_log_popup' },
        { ref: 'form',     selector: 'sipas_surat_agenda_log_popup > form' },
        { ref: 'list',     selector: 'sipas_surat_agenda_log_popup #listLog' }
    ],

    controllerStaf : 'Sipas.staf.Prop',

    init: function(application) {
        this.control({
            'sipas_surat_agenda_log_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_surat_agenda_log_popup #listLog': {
                loadassociate: this.onPenerima_LoadAssociate,
                itemclick: this.onMainview_ClickShow
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

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerStaf = $this.getController($this.controllerStaf);

        controllerStaf.launch({
            record:record,
            mode:'auditview'
        });
    },

    onPenerima_LoadAssociate: function(record, form, cmp){
        var store = record.fetchLog2();
        cmp.reconfigure(store);
        cmp.record = record;
        record.getId() && store.reload();
        
        // var $this = this,
        //     mainview = $this.getMainview({from:cmp}),
        //     storeLog = cmp.getStore(),
        //     surat_id = record.get('surat_id'),
        //     filter = [{
        //         "property" : "surat_log_surat",
        //         "value" : surat_id
        //     }];

        // cmp.setLoading(true);
        // storeLog.removeAll();

        // Ext.Ajax.request({
        //     url: $this.getApi('log', {filter: Ext.encode(filter)}),
        //     success: function(response, options){
        //         var objres = Ext.decode(response.responseText, true) || {};
        //         storeLog.addSorted(objres.data);
        //         cmp.setLoading(false);
        //     }
        // });
    }
});