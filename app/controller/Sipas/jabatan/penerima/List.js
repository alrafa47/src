Ext.define('SIPAS.controller.Sipas.jabatan.penerima.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.jabatan.penerima.List'
    ],

    stores: [
        'Sipas.jabatan.penerima.List'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_jabatan_penerima_list' }
    ],

    init: function(application) {
        this.control({
            'sipas_jabatan_penerima_list': {
                // selectionchange:    this.onMainview_SelectionChange,
                removerecord:       this.onMainview_ActionRemoveRecord
            }
        });
    },

    onMainview_ActionRemoveRecord: function(view, rowIdx, colIdx, item, e, record, row){
        var $this = this,
            $helper = $this.getApplication().Helper();

        view.getStore().remove(record);
    },

});