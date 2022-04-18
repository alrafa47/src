Ext.define('SIPAS.controller.Sipas.surat.penyetuju.riwayat.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.penyetuju.riwayat.Popup'
    ],

    models: [
        'Sipas.koreksi.Riwayat'
    ],

    stores: [
        'Sipas.koreksi.session.riwayat.List'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_surat_penyetuju_riwayat_popup' },
        { ref: 'form',          selector: 'sipas_surat_penyetuju_riwayat_popup > form' },
        { ref: 'list',          selector: 'sipas_surat_penyetuju_riwayat_popup #listPenerima' }
    ],

    init: function(application) {
        this.control({
            'sipas_surat_penyetuju_riwayat_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_surat_penyetuju_riwayat_popup sipas_koreksi_session_riwayat_list': {
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
            storeRiwayat = cmp.getStore();

        var koreksi = record.fetchKoreksiRiwayat();

        cmp.setLoading(true);
        storeRiwayat.removeAll();
        koreksi.load(function(){
            koreksi.each(function(record){
                var find = storeRiwayat.findRecord('disposisi_masuk_id', record.get('disposisi_masuk_id'));
                if(!find){
                    storeRiwayat.addSorted(record);
                }
            });
            cmp.setLoading(false);
        });
    }
});