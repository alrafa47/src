Ext.define('SIPAS.controller.Sipas.pelaporan.laporan.ekspedisi.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.laporan.ekspedisi.Pane'
    ],

    stores:[
        'Sipas.masuk.agenda.Combo'
    ],

    api: {
        'url': 'server.php/sipas/ekspedisi/report?id={id}&download={download}'
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_pelaporan_laporan_ekspedisi_pane' },
        { ref: 'compFilter', selector: 'sipas_pelaporan_laporan_ekspedisi_pane sipas_com_report_filter2' },
        { ref: 'comboFilter', selector: 'sipas_pelaporan_laporan_ekspedisi_pane sipas_com_report_filter2 #comboFilter' }
    ],

    defaultStore : 'Sipas.masuk.agenda.Combo',

    init: function(application){
        this.control({
            "sipas_pelaporan_laporan_ekspedisi_pane sipas_com_report_filter2":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_laporan_ekspedisi_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_laporan_ekspedisi_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_laporan_ekspedisi_pane sipas_com_button_download":{
                click: this.onButtonDownload_Click
            }
        });
    },

    launch: function(config){
        var $this = this,
            storeSM = $this.getStore($this.defaultStore),
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                storeSM.reload();
            });
        }
        return view;
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view = this.getMainview({from:component}),
            iframe = view.down('#Iframe'),
            url = this.getApi('url', {
                id: value,
                filter: filter,
                value: filter == 'daterange' ? value.join('|') : value
            });
        iframe.load(url);
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            iframe = view.down('#Iframe'),
            storeSM = $this.getStore($this.defaultStore);

        iframe.reload();
        storeSM.reload();
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            iframe = view.down('#Iframe');

        iframe.print();
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getComboFilter({root:view}),
            iframe = view.down('#Iframe'),
            url = this.getApi('url', {
                id: filterContainer.getValue(),
                download: 1
            });

        iframe.getWindow().location.assign(url);
    }

});