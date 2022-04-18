Ext.define('SIPAS.controller.Sipas.surat.penyetuju.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.penyetuju.Prop'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.Stack'
    ],

    stores: [
        'Sipas.surat.penyetuju.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_surat_penyetuju_prop' },
        { ref: 'form',     selector: 'sipas_surat_penyetuju_prop > form' },
        { ref: 'list',     selector: 'sipas_surat_penyetuju_prop #listPenyetuju' }
    ],

    init: function(application) {
        this.control({
            'sipas_surat_penyetuju_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_surat_penyetuju_prop #listPenyetuju': {
                loadassociate: this.onPenyetuju_LoadAssociate
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
            $app    = $this.getApplication(),
            use_ttd = $app.LocalSetting().get('use_signature'),
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

                    if (record.get('jenis_ttd')){
                        if (use_ttd) {
                            c.removeComponents.push('#columnStafTtd');
                        } else {
                            c.removeComponents.push('#columnAlwaysTtd');
                        }
                    }else{
                        c.removeComponents.push('#columnAlwaysTtd', '#columnStafTtd');
                    }

                    c.removeComponents.push('sipas_com_button_add', '#textPenyetuju', '#columnDelete', '#columnMoveUp', '#columnMoveDown');

                    return c;
                })(config));
                view.show();
                break;
            
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onPenyetuju_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePenyetuju = cmp.getStore();

        cmp.setLoading(true);
        storePenyetuju.removeAll();
        if(record){
            var store = record.fetchStackKoreksi();
            store.load(function(){
                store.each(function(record){
                    storePenyetuju.addSorted(record);
                });
                cmp.setLoading(false);
            });
        }
    }
});