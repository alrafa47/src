Ext.define('SIPAS.controller.Sipas.beranda.chart.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.beranda.board.chart.Pane'
    ],
    
    models:[
        'Sipas.beranda.Chartline'
    ],

    stores: [
        'Sipas.beranda.chart.Line'
    ],

    refs: [
        {ref: 'mainview', selector: 'sipas_beranda_board_chart_pane'},
        {ref: 'chart', selector: 'sipas_beranda_board_chart_pane > chart'},
        {ref: 'chartDateField', selector: 'sipas_beranda_board_chart_pane sipas_com_form_field_month'}
    ],

    storeChartLine: 'Sipas.beranda.chart.Line',

    init: function(application) {
        this.control({
            "sipas_beranda_board_chart_pane sipas_com_button_refresh": {
                click: this.onButtonRefreshChart_Click
            },
            "sipas_beranda_board_chart_pane sipas_com_form_field_month":{
                select: this.onFieldDate_Select
            }
        });
    },

    onButtonRefreshChart_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            chartDateField = $this.getChartDateField({root:view}),
            chart = $this.getChart({root:view}),
            storeChartLine = $this.getStore($this.storeChartLine),
            dateFilter = chartDateField.getSubmitValue();
        if(dateFilter){
            $this.refresh(storeChartLine, dateFilter, view);
        }else{
            view.setLoading(true);
            storeChartLine.load(function(){
                view.setLoading(false);
            });
        }
    },

    refresh: function(store, value, mainview){
        mainview.setLoading(true);
        store.load(function(){
            mainview.setLoading(false);
            store.clearFilter();
            store.filter([
                {property: "month", value: value}
            ]);
        });
    },

    onFieldDate_Select: function(field, value, eOpts) {
        var $this = this,
            view = $this.getMainview({from:field}),
            chart = $this.getChart({root:view}),
            storeChartLine = $this.getStore($this.storeChartLine);

        if(value){
            $this.refresh(storeChartLine, field.getSubmitValue(), view);
        }
    }
});