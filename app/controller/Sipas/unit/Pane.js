Ext.define('SIPAS.controller.Sipas.unit.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.unit.Compact',
        'Sipas.unit.jabatan.List',
        'Sipas.unit.jabatan.Treelist',
        'Sipas.unit.staf.List'
    ],

    views: [
        'Sipas.unit.Pane'
    ],

    stores: [
        'Sipas.unit.staf.semua.List',
        'Sipas.unit.jabatan.semua.List',
        'Sipas.unit.jabatan.semua.Treelist',
        'Sipas.unit.semua.List'
    ],

    refs:[
        { ref : 'mainview',             selector: 'sipas_unit_pane'},
        { ref : 'mainviewDepartemen',   selector: 'sipas_unit_pane sipas_unit_compact'},
        { ref : 'listDepartemen',       selector: 'sipas_unit_pane sipas_unit_compact sipas_unit_list'},
        { ref : 'CmplistDepartemen',       selector: 'sipas_unit_pane sipas_unit_compact sipas_unit_list'},
        { ref : 'treeDepartemen',       selector: 'sipas_unit_pane sipas_unit_compact sipas_unit_treelist'},
        { ref : 'mainviewStaf',      selector: 'sipas_unit_pane sipas_unit_staf_list'},
        { ref : 'listStaf',          selector: 'sipas_unit_pane sipas_unit_staf_list'},
        { ref : 'CmplistStaf',          selector: 'sipas_unit_pane sipas_unit_staf_list'},
        { ref : 'mainviewJabatan',      selector: 'sipas_unit_pane #jabatanTab'},
        { ref : 'listJabatan',          selector: 'sipas_unit_pane #jabatanTab sipas_unit_jabatan_list'},
        { ref : 'CmplistJabatan',          selector: 'sipas_unit_pane #jabatanTab sipas_unit_jabatan_list'},
        { ref : 'treeJabatan',          selector: 'sipas_unit_pane #jabatanTab sipas_unit_jabatan_treelist'}
    ],

    storeStaf: 'Sipas.unit.staf.semua.List',
    storeJabatan: 'Sipas.unit.jabatan.semua.List',
    storeUnit: 'Sipas.unit.semua.List',

    init: function(application) {
        this.control({
            'sipas_unit_pane sipas_unit_compact': {
                tabchange: this.onMainviewDepartemen_TabChange
            },
            'sipas_unit_pane sipas_unit_compact sipas_unit_list[clickToView=false]': {
                selectionchange: this.onListOrTreelistDepartemen_SelectionChange
            },
            'sipas_unit_pane sipas_unit_compact sipas_unit_treelist[clickToView=false]': {
                selectionchange: this.onListOrTreelistDepartemen_SelectionChange
            }
        });
    },

    // launch: function(config) {
    //     var $this = this,
    //         view = this.createView(config);

    //     if(view){
    //         view.on('afterrender', function(){
    //             $this.getStore($this.storeStaf).reload();
    //             $this.getStore($this.storeJabatan).reload();
    //             $this.getStore($this.storeUnit).reload();
    //         });
    //     }
    //     return view;
    // },

    launch: function(config) {
        var $this = this,
            view = null;

        view = $this.createView(config);
        if(view){
            view.on('afterrender', function(){
                $this.refresh(view);
            });
        }        
        return view;
    },

    refresh: function(mainview) {
        var $this = this,
            CmplistStaf = $this.getCmplistStaf({root:mainview}),
            CmplistJabatan = $this.getCmplistJabatan({root:mainview}),
            CmplistDepartemen = $this.getCmplistDepartemen({root:mainview});

        $this.getController('Sipas.unit.staf.List').refresh(CmplistStaf);
        $this.getController('Sipas.unit.jabatan.List').refresh(CmplistJabatan);
        this.getController('Sipas.staf.List').refresh(CmplistDepartemen);
        // $this.getController('Sipas.unit.Treelist').refresh(CmplistDepartemen);
    },

    onMainviewDepartemen_TabChange: function( tabPanel, newCard, oldCard, eOpts ){
        newCard.fireEvent('selectionchange', newCard, newCard.getSelectionModel().getSelection());
    },

    onListOrTreelistDepartemen_SelectionChange: function(grid, selection){
        var mainview = this.getMainview({from:grid}),
            listStaf = this.getListStaf({root:mainview}),
            listJabatan = this.getListJabatan({root:mainview}),
            treeJabatan = this.getTreeJabatan({root:mainview}),
            record = selection[0],
            id = record && record.getId();
            
        if(!record) return;

        if(listStaf)
        {
            var storeListStaf = listStaf.getStore();
            storeListStaf.clearFilter(true);
            // no need to do `load`, filter is lready deal with it
            storeListStaf.filter('staf_unit', id);
        }
        
        if(listJabatan)
        {
            var storeListJabatan = listJabatan.getStore();
            storeListJabatan.clearFilter(true);
            // no need to do `load`, filter is lready deal with it
            storeListJabatan.filter('jabatan_unit', id);
        }

        // if(treeJabatan) 
        // {
        //     var storeTreeJabatan = treeJabatan.getStore();
        //     storeTreeJabatan.clearFilter(true);
        //     storeTreeJabatan.load({
        //         params: {
        //             jabatan_unit: id
        //         }
        //     });
        // }
    }

});