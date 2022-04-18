Ext.define('SIPAS.controller.Sipas.disposisi.session.detail.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.disposisi.session.detail.Popup'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.Stack',
        'Sipas.disposisi.Masuk'
    ],

    stores: [
        'Sipas.disposisi.session.detail.Popup'
    ],

    api: {
        'penerima': 'server.php/sipas/kotak_masuk/disposisiSama?id={id}&stafId={stafId}&jabatanId={jabatanId}&dm_id={dm_id}'
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_disposisi_session_detail_popup' },
        { ref: 'form',     selector: 'sipas_disposisi_session_detail_popup > form' },
        { ref: 'list',     selector: 'sipas_disposisi_session_detail_popup #listPenerima' }
    ],

    init: function(application) {
        this.control({
            'sipas_disposisi_session_detail_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_disposisi_session_detail_popup #listPenerima': {
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
            disposisi_id = record.get('disposisi_masuk_disposisi'),
            dm_id = record.get('disposisi_masuk_id'),
            dm_staf = record.get('disposisi_masuk_staf') ? record.get('disposisi_masuk_staf') : '',
            dm_jabatan = record.get('disposisi_masuk_jabatan') ? record.get('disposisi_masuk_jabatan') : '',
            surat_id = record.get('surat_id');

        cmp.setLoading(true);
        storePenerima.removeAll();

        Ext.Ajax.request({
            url: $this.getApi('penerima', {
                id: surat_id, 
                stafId: dm_staf, 
                jabatanId: dm_jabatan, 
                dm_id: dm_id
            }),
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {};
                storePenerima.addSorted(objres);
                cmp.setLoading(false);
            }
        });
    }
});