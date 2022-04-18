Ext.define('SIPAS.controller.Sipas.staf.penerima.tim.disposisi.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.staf.penerima.tim.anggota.List'
    ],

    stores: [
        'Sipas.staf.penerima.tim.Lookup'
    ],

    views: [
        'Sipas.staf.penerima.tim.disposisi.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_staf_penerima_tim_disposisi_lookup'},
        { ref: 'grid',      selector: 'sipas_staf_penerima_tim_disposisi_lookup sipas_staf_penerima_tim_anggota_list'},
        { ref: 'putin',     selector: 'sipas_staf_penerima_tim_disposisi_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.staf.penerima.tim.Lookup',

    init: function(application) {
        this.control({
            'sipas_staf_penerima_tim_disposisi_lookup': {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            }
        });
    },

    onGridpanel_AfterRender: function(component, eOpts){
        this.getStore(this.defaultStore).reload();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            view  = $this.getMainview({from:model.view}),
            putin = $this.getPutin({root:view}),
            grid  = $this.getGrid({root:view}),
            rec = selected[0],
            newStore = rec.fetchAnggota(),
            store = grid.getStore();

        grid.reconfigure(newStore);
        newStore.load({
            callback: function(records, operation, success){
                putin && putin.setDisabled(!selected.length);
                grid.setDisabled(selected.length != 1);
                grid.getSelectionModel().selectAll(true);
            }
        });
    }
});