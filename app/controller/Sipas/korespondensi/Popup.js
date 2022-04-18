Ext.define('SIPAS.controller.Sipas.korespondensi.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [],

    models:[
        'Sipas.Korespondensi',
        'Sipas.Surat'
    ],

    stores: [],
    refs: [],

    viewViewer: 'Sipas.Viewer',

    defaultWindowReport: {
        modal: true,
        height: 600,
        width: 800,
        maximizable:true
        // enableDownload:true
    },

    surat_korespondensi: null,

    launch: function(config){
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn
        }, config);

        var $this = this,
            $helper = $this.getApplication().Helper,
            view = null,
            record = $this.createRecord(config.record);

        switch(config.mode)
        {
            case 'view' :

                config.requireComponents = [];
                view = $this.createView(config);
                
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
        return view;
    },

    onMainview_Show: function(view){
        var $this = this,
            mainview = view || $this.getMainview(),
            form = $this.getForm({root:mainview}),
            grid = this.getGrid({root:mainview}),
            record = view.record || $this.createRecord(view.record),
            store = record && record.fetchSurat(),
            cmpKoresInfo = $this.getKoresInfo({root:view}),
            cmpKoresLegend = $this.getKoresLegend({root:view}),
            kores_info = '',
            kores_legend = '';
            // storeGrid = grid.getStore(),
            // surat_korespondensi = record.get('surat_korespondensi'),
            // filter = [{
            //     "property" : "surat_korespondensi",
            //     "value" : surat_korespondensi
            // }];

        // $this.surat_korespondensi = surat_korespondensi;
        form.loadRecord(record);
        grid.reconfigure(store);
        store.reload();

        // grid.setLoading(true);
        // storeGrid.removeAll();

        // Ext.Ajax.request({
        //     url: $this.getApi('korespondensi', {filter: Ext.encode(filter)}),
        //     success: function(response, options){
        //         var objres = Ext.decode(response.responseText, true) || {};
        //         storeGrid.addSorted(objres.data);
        //         grid.setLoading(false);
        //     }
        // });

        kores_info = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                '<div class="img img-circle img-32">',
                    '<i class="bigger-1-25 icon ion-md-link"></i>',
                '</div>',
            '</div>',
            '<div class="cell-text">',
                '<div class="maintext">{no_ref}</div>',
                '<div class="supporttext">Jumlah surat : {jumlah}</div>',
                '<div class="supporttext margin-top-4">',
                    '<i class="bigger-1-25 icon ion-md-calendar gray-600-i margin-right-4"></i>',
                    '{tgl_mulai} s/d {tgl_selesai}',
                '</div>',
            '</div>']).apply({
                no_ref: record && record.get('korespondensi_nomor') ? record.get('korespondensi_nomor') : '<span class="alternative">(Tidak ada nomor korespondensi)</span>',
                jumlah: record && record.get('korespondensi_jumlah') ? record.get('korespondensi_jumlah') : '<span class="alternative">(Tidak ada surat)</span>',
                tgl_mulai: record && record.get('korespondensi_tgl_mulai') ? Ext.util.Format.date(record.get('korespondensi_tgl_mulai'), 'd M Y') : '<span class="alternative">(Tidak ada tanggal mulai)</span>',
                tgl_selesai: record && record.get('korespondensi_tgl_selesai') ? Ext.util.Format.date(record.get('korespondensi_tgl_selesai'), 'd M Y') : '<span class="alternative">(Tidak ada tanggal selesai)</span>'
            });

        kores_legend = new Ext.XTemplate(['<div class="cell-visual cell-visual-left">',
                                                '<div class="img img-circle img-20">',
                                                    '<i class="bigger-1-25 icon ion-md-arrow-round-down indigo-600-i"></i>',
                                                '</div>',
                                            '</div>',
                                            '<div class="cell-text margin-bottom-16">',
                                                '<div class="subtext margin-top-4">{masuk}</div>',
                                            '</div>',
                                            '</br>',
                                            '<div class="cell-visual cell-visual-left">',
                                                '<div class="img img-circle img-20">',
                                                    '<i class="bigger-1-25 icon ion-md-arrow-round-up amber-600-i"></i>',
                                                '</div>',
                                            '</div>',
                                            '<div class="cell-text">',
                                                '<div class="subtext margin-top-4">{keluar}</div>',
                                            '</div>']).apply({
                                                masuk: 'Surat masuk',
                                                keluar: 'Surat keluar'
                                            });

        cmpKoresInfo.setValue(kores_info);
        cmpKoresLegend.setValue(kores_legend);
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from:model.view}),
            record = selected && selected[0];
    },

    onButtonPrint_Click: function (button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = this.getForm({root:view}),
            record = form.getRecord(),
            fetchSurat = record.fetchSurat(),
            surat_korespondensi = fetchSurat && fetchSurat.data.items[0].data['surat_korespondensi'];
            
        $this.printReport(surat_korespondensi, null, null , 'Cetak Laporan Korespondensi Surat');
    },

    printReport: function(surat_korespondensi, callback, scope, title){
        var viewer = this.getView(this.viewViewer).create(Ext.apply(this.defaultWindowReport, {}))
        viewer.show().load(this.getApi('report', {
            surat_korespondensi: surat_korespondensi
        }));
        viewer.setTitle(title);
    }
});