Ext.define('SIPAS.controller.Sipas.staf.penerima.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.staf.penerima.List'
    ],

    stores: [
        'Sipas.staf.penerima.List'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_staf_penerima_list' }
    ],

    init: function(application) {
        this.control({
            'sipas_staf_penerima_list': {
                // selectionchange:    this.onMainview_SelectionChange,
                removerecord:       this.onMainview_ActionRemoveRecord
            }
        });
    },

    // onMainview_SelectionChange: function(model, selected, eOpts){
    //     var $this = this,
    //         $helper = $this.getApplication().Helper(),
    //         view = model.view.up('gridpanel,treepanel'),
    //         record = selected && selected[0];

    //     $helper.disableComponent({
    //         action: (selected.length != 1),
    //         parent: view,
    //         items: ['sipas_com_button_delete', 'sipas_com_button_putin']
    //     });
    // },

    onMainview_ActionRemoveRecord: function(view, rowIdx, colIdx, item, e, record, row){
        var $this = this,
            $helper = $this.getApplication().Helper();

        view.getStore().remove(record);
        // if(rowIdx == 0){
        //     $helper.disableComponent({
        //         parent: view.up('gridpanel,treepanel'),
        //         items: ['sipas_staf_penerima_lookup #pilih']
        //     });
        // }
    },

});