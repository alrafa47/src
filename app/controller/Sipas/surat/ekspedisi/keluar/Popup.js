Ext.define('SIPAS.controller.Sipas.surat.ekspedisi.keluar.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.ekspedisi.keluar.Popup'
    ],

    models: [
        'Sipas.surat.Log'
    ],

    stores: [
        'Sipas.keluar.agenda.ekspedisi.List'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_surat_ekspedisi_keluar_popup' },
        { ref: 'form',          selector: 'sipas_surat_ekspedisi_keluar_popup > form' },
        { ref: 'list',          selector: 'sipas_surat_ekspedisi_keluar_popup #listEkspedisi' }
    ],

    init: function(application) {
        this.control({
            'sipas_surat_ekspedisi_keluar_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_surat_ekspedisi_keluar_popup #listEkspedisi': {
                loadassociate: this.onEkspedisiKeluar_LoadAssociate
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

    onEkspedisiKeluar_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storeEkspedisi = cmp.getStore();

        cmp.setLoading(true);
        storeEkspedisi.removeAll();
        if(record){
            var store = record.fetchLog();
            window.record = record;
            store.load(function(){
                store.each(function(record){
                    storeEkspedisi.addSorted(record);
                });
                cmp.setLoading(false);
            });
        }
    }
});