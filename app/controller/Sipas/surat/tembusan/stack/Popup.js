Ext.define('SIPAS.controller.Sipas.surat.tembusan.stack.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.tembusan.stack.Popup'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.stack.Disposisi'
    ],

    stores: [
        'Sipas.surat.tembusan.stack.Popup'
    ],

    api: {
        'tembusan': 'server.php/sipas/surat_stack/tujuan_tembusan_stack?surat_id={id}', 
        'tembusansk': 'server.php/sipas/surat_stack/tujuan_tembusansk_stack?surat_id={id}'
    },

    refs: [
        { ref: 'mainview',     selector: 'sipas_surat_tembusan_stack_popup' },
        { ref: 'form',     selector: 'sipas_surat_tembusan_stack_popup > form' },
        { ref: 'list',     selector: 'sipas_surat_tembusan_stack_popup #listPenerima' }
    ],

    controllerProperty: 'Sipas.keluar.agenda.Prop',

    init: function(application) {
        this.control({
            'sipas_surat_tembusan_stack_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_surat_tembusan_stack_popup #listPenerima': {
                loadassociate: this.onTembusan_LoadAssociate
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
                    
                    // c.removeComponents.push('sipas_com_button_add', '#textPenyetuju', '#columnDelete', '#columnMoveUp', '#columnMoveDown');

                    return c;
                })(config));
                view.show();
                break;
            
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onTembusan_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePenyetuju = cmp.getStore(),
            surat_id = record.get('surat_id');

        cmp.setLoading(true);
        storePenyetuju.removeAll();

        if (record.get('surat_model') == 6) {
            Ext.Ajax.request({
                url: $this.getApi('tembusansk', {id: surat_id}),
                success: function(response, options){
                    var objres = Ext.decode(response.responseText, true) || {};
                    storePenyetuju.addSorted(objres.data);
                    cmp.setLoading(false);
                }
            });
        }else{
            Ext.Ajax.request({
                url: $this.getApi('tembusan', {id: surat_id}),
                success: function(response, options){
                    var objres = Ext.decode(response.responseText, true) || {};
                    storePenyetuju.addSorted(objres.data);
                    cmp.setLoading(false);
                }
            });
        }
    }
});