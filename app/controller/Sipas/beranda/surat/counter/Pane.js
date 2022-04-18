Ext.define('SIPAS.controller.Sipas.beranda.surat.counter.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.beranda.board.surat.counter.Pane'
    ],
    
    models:[
        'Sipas.beranda.Counter'
    ],

    stores: [
        'Sipas.beranda.surat.counter.List'
    ],

    refs: [
        {ref: 'mainview', selector: 'sipas_beranda_board_surat_counter_pane'},
        {ref: 'counterDateField', selector: 'sipas_beranda_board_surat_counter_pane sipas_com_form_field_month'}
    ],

    storeSuratCounter: 'Sipas.beranda.surat.counter.List',

    init: function(application) {
        this.control({
            "sipas_beranda_board_surat_counter_pane sipas_com_button_refresh": {
                click: this.onButtonRefreshCounter_Click
            },
            "sipas_beranda_board_surat_counter_pane sipas_com_form_field_month":{
                select: this.onFieldDate_Select
            }
        });
    },

    onButtonRefreshCounter_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            counterDateField = $this.getCounterDateField({root:view}),
            storeSuratCounter = $this.getStore($this.storeSuratCounter),
            dateFilter = counterDateField.getSubmitValue();

        if(dateFilter){
            $this.refreshCounter(storeSuratCounter, dateFilter);
        }else{
            storeSuratCounter.reload();
        }  
    },

    refreshCounter: function(store, value){
        store.load(function(){
            store.clearFilter();
            store.filter([
                {property: "month", value: value}
            ]);
        });
    },

    onFieldDate_Select: function(field, value, eOpts) {
        var $this = this,
            storeSuratCounter = $this.getStore($this.storeSuratCounter);

        if(value){
            $this.refreshCounter(storeSuratCounter, field.getSubmitValue());
        }
    }
});