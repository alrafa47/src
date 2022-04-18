Ext.define('SIPAS.controller.Sipas.disposisi.session.penerima.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.disposisi.session.penerima.Popup'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.Stack',
        'Sipas.disposisi.Masuk'
    ],

    stores: [
        'Sipas.disposisi.session.penerima.Popup'
    ],

    api: {
        'penerima': 'server.php/sipas/kotak_masuk/penerima?id={id}'
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_disposisi_session_penerima_popup' },
        { ref: 'form',     selector: 'sipas_disposisi_session_penerima_popup > form' },
        { ref: 'list',     selector: 'sipas_disposisi_session_penerima_popup #listPenerima' }
    ],

    init: function(application) {
        this.control({
            'sipas_disposisi_session_penerima_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_disposisi_session_penerima_popup #listPenerima': {
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

    onPenerima_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePenerima = cmp.getStore(),
            disposisi_id = record.get('disposisi_masuk_disposisi');

        cmp.setLoading(true);
        storePenerima.removeAll();

        Ext.Ajax.request({
            url: $this.getApi('penerima', {id: disposisi_id}),
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {};
                storePenerima.addSorted(objres);
                cmp.setLoading(false);
            }
        });
    }
});