Ext.define('SIPAS.controller.Sipas.dashboard.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.dashboard.Pane'
    ],
    
    models:[
        'Sipas.dashboard.board.Chart'
        // 'Sipas.Masuk',
        // 'Sipas.Keluar'
    ],

    stores: [
        'Sipas.dashboard.board.chart.List',
        'Sipas.dashboard.board.surat.masuk.toplast.List',
        'Sipas.dashboard.board.surat.keluar.toplast.List',
        'Sipas.dashboard.board.disposisi.penerima.top.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_dasbor_pane' }
    ],

    storeChart: 'Sipas.dashboard.board.chart.List',
    storeSuratMasuk: 'Sipas.dashboard.board.surat.masuk.toplast.List',
    storeSuratKeluar: 'Sipas.dashboard.board.surat.keluar.toplast.List',
    storeDisposisiTerima: 'Sipas.dashboard.board.disposisi.penerima.top.List',

    launch: function(config) {
       var $this        = this,
            view        = this.createView(config),
            smList      = $this.getStore($this.storeSuratMasuk),
            skList      = $this.getStore($this.storeSuratKeluar);
            dpList      = $this.getStore($this.storeDisposisiTerima);
            storeChart  = $this.getStore($this.storeChart);

            if(view){
                smList.reload();
                skList.reload();
                dpList.reload();
                storeChart.reload();
            }
        return view;
    }
});