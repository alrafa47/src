Ext.define('SIPAS.controller.Sipas.surat.petikan.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.petikan.Prop'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.Stack'
    ],

    stores: [
        'Sipas.surat.petikan.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_surat_petikan_prop' },
        { ref: 'form',     selector: 'sipas_surat_petikan_prop > form' },
        { ref: 'list',     selector: 'sipas_surat_petikan_prop #listPetikan' }
    ],

    init: function(application) {
        this.control({
            'sipas_surat_petikan_prop': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_surat_petikan_prop #listPetikan': {
                loadassociate: this.onPetikan_LoadAssociate
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

                    c.removeComponents.push('sipas_com_button_add', '#textPetikan', '#columnDelete', '#columnMoveUp', '#columnMoveDown');

                    return c;
                })(config));
                view.show();
                break;
            
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onPetikan_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePetikan = cmp.getStore();

        cmp.setLoading(true);
        storePetikan.removeAll();
        if(record){
            var store = record.fetchStackPetikan();
            store.load(function(){
                store.each(function(record){
                    storePetikan.addSorted(record);
                });
                cmp.setLoading(false);
            });
        }
    }
});