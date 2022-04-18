Ext.define('SIPAS.controller.Sipas.surat.ekspedisi.trace.Treelist', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.surat.ekspedisi.trace.Treelist'
    ],

    models: [
        'Sipas.surat.Ekspedisi',
        'Sipas.Disposisi',
        'Sipas.disposisi.Masuk'
    ],

    stores: [
        'Sipas.surat.ekspedisi.trace.Treelist'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_surat_ekspedisi_trace_treelist' }
    ],

    init: function(application) {
        this.control({
      		'sipas_surat_ekspedisi_trace_treelist': {
      			loadrecord: this.onMainview_LoadRecord
      		}      
        });
    },

    onMainview_LoadRecord: function(mainview, record){
        var $this = this;

    	if(!mainview) return;
    	if(!record) return;

    	var store = mainview.getStore(),
    		id = null;

    	if(record instanceof this.getModel($this.models[1])){
    		id = record.get('disposisi_induk')
    	}else if(record instanceof this.getModel($this.models[2])){
    		id = record.getId();
    	}else{
    		id = record;
    	}

    	store.load({
    		params: {
    			id: id
    		}
    	});
    }
});