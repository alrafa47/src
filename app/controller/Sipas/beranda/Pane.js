Ext.define('SIPAS.controller.Sipas.beranda.Pane', {
    extend: 'SIPAS.controller.Sipas.base.View',

    controllers:[
        'Sipas.beranda.chart.Pane',
        'Sipas.beranda.notification.Pane',
        'Sipas.beranda.surat.counter.Pane'
    ],

    views: [
        'Sipas.beranda.Pane'
    ],

    stores: [
        'Sipas.beranda.notification.List',
        'Sipas.beranda.surat.counter.List',
        'Sipas.beranda.chart.Line'
    ],

    refs: [
        {ref: 'mainview', selector: 'sipas_beranda_pane'},
        {ref: 'cmpMonthChart', selector: 'sipas_beranda_pane sipas_beranda_board_chart_pane #datefieldMonth'}
    ],

    storeChartLine: 'Sipas.beranda.chart.Line',
    storeSuratCounter: 'Sipas.beranda.surat.counter.List',
    storeNotification: 'Sipas.beranda.notification.List',

    init: function(application) {
        this.control({

        });
    },

    launch: function(config) {
       var $this = this,
            view = this.createView(config),
            storeNotif = $this.getStore($this.storeNotification),
            storeSuratCounter = $this.getStore($this.storeSuratCounter),
            storeChartLine = $this.getStore($this.storeChartLine),
            cmpMonthChart = $this.getCmpMonthChart({root:view});

            if(view){
                storeChartLine.reload();
                storeSuratCounter.reload();
                storeNotif.reload();

                cmpMonthChart.emptyText = 'Bulan '+Ext.Date.format(new Date, 'M');
                cmpMonthChart.applyEmptyText();

            }
        return view;
    }
});