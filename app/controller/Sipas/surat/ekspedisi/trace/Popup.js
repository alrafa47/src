Ext.define('SIPAS.controller.Sipas.surat.ekspedisi.trace.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.surat.ekspedisi.trace.Treelist'
    ],

    views:[
        'Sipas.surat.ekspedisi.trace.Popup'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_surat_ekspedisi_trace_popup' },
        { ref: 'list',      selector: 'sipas_surat_ekspedisi_trace_popup sipas_surat_ekspedisi_trace_treelist' },
        { ref: 'form',      selector: 'sipas_surat_ekspedisi_trace_popup > form' }
    ],

    init: function(application) {
        this.control({
            'sipas_surat_ekspedisi_trace_popup': {
                show: this.onMainview_Show
            }
        });
    },

    launch: function(config) {
        // var $this = this,
        //     config = config || {},
        //     record = config.record, // use id instead of record
        //     mainview = this.createView(config);
            
        // mainview.show();

        var $this = this,
            config = config || {},
            id = config.record, // use id instead of record
            mainview = this.createView(config);
            
        mainview.show(null, function(){
            var list = $this.getList({root: mainview});
            list.fireEvent('loadrecord', list, id);
        });
    },

    onMainview_Show: function(mainview){
        // var $this = this,
        //     list = $this.getList({root: mainview}),
        //     record = $this.createRecord(mainview.record);

        // list.fireEvent('loadrecord', list, record);
    }
});