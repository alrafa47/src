Ext.define('SIPAS.controller.Sipas.surat.atribut.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views:[
        // 'Sipas.surat.atribut.Pane'
    ],

    stores:[
        'Sipas.lokasi.Combo',
        'Sipas.jenis.Combo',
        'Sipas.sifat.Combo',
        'Sipas.kelas.Combo',
        'Sipas.prioritas.Combo',
        'Sipas.media.Combo'
    ],

    refs: [
        { ref:'mainview',           selector: 'sipas_surat_atribut_pane'},
        { ref:'containerJenis',     selector: 'sipas_surat_atribut_pane #containerJenis'},
        { ref:'containerSifat',     selector: 'sipas_surat_atribut_pane #containerSifat'},
        { ref:'containerPrioritas', selector: 'sipas_surat_atribut_pane #containerPrioritas'},
        { ref:'containerMedia',     selector: 'sipas_surat_atribut_pane #containerMedia'},
        { ref:'containerLokasi',    selector: 'sipas_surat_atribut_pane #containerLokasi'},
        { ref:'comboJenis',         selector: 'sipas_surat_atribut_pane #containerJenis combobox'},
        { ref:'comboSifat',         selector: 'sipas_surat_atribut_pane #containerSifat combobox'},
        { ref:'comboKelas',         selector: 'sipas_surat_atribut_pane #containerKelas combobox'},
        { ref:'comboPrioritas',     selector: 'sipas_surat_atribut_pane #containerPrioritas combobox'},
        { ref:'comboMedia',         selector: 'sipas_surat_atribut_pane #containerMedia combobox'},
        { ref:'comboLokasi',        selector: 'sipas_surat_atribut_pane #containerLokasi combobox'}
    ],

    delegateSelector: 'sipas_surat_atribut_pane',
    
    init: function(application){
        this.control({
            "sipas_surat_atribut_pane sipas_com_button_gear":{
                click: this.onButtonGearAttribute_Click,
                afterrender: this.onButtonGearAttribute_Afterrender
            },
            "sipas_surat_atribut_pane combobox":{
                runconfig: this.onComboAttribute_RunConfig,
                loadassociate: this.onComboAtribut_LoadAssociate,
                focus: this.onComboAtribut_Focus
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            jenisConfig: {},
            sifatConfig: {},
            kelasConfig: {},
            prioritasConfig: {},
            mediaConfig: {},
            lokasiConfig: {},
            useJenis:true,
            useSifat:true,
            useKelas:true,
            usePrioritas:true,
            useMedia:true,
            useLokasi:true
        },config);
        
        var $this = this,
            view = $this.createView(config);

        return view;
    },

    onButtonGearAttribute_Afterrender: function(component, e, eOpts){
        var view = this.getMainview({from:component});
        
        if(view.mode == 'view' || view.mode == 'lihat'){
            component.up('container').remove(component, true);
        }
    },

    onButtonGearAttribute_Click: function(button, e, eOpts){
        var combo = button.prev('combo');
        combo && combo.fireEvent('runconfig', combo, e, eOpts);
    },

    onComboAttribute_RunConfig: function(combo, e, eOpts){
        var c = this.getController(combo.bootstrapProperty),
            associatedId = combo.getValue();

        c && c.launch({
            callback: function(success, record, eOpts){
                var store = combo.getStore();
                store.load({
                    callback: function(){
                        var found = store.getById(associatedId);
                        if(!found)
                        {
                            combo.setValue();
                        }
                    }
                })
            }
        });
    },

    // parent
    onComboAtribut_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;
        var mainview = this.getMainview({from:cmp});

        cmp.setLoading(true);

        if(record){
            cmp.setLoading(false);
            cmp.setValue(record);
            if(mainview && mainview.mode == 'lihat'){
              cmp.setReadOnly(true);  
            } 
        }
    },

    onComboAtribut_Focus: function(combobox, e, eOpts)
    {
        var store = combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    }
});