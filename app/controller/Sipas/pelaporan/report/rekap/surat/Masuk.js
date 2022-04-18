Ext.define('SIPAS.controller.Sipas.pelaporan.report.rekap.surat.Masuk', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.pelaporan.report.rekap.surat.Masuk'
    ],

    stores:[
        'Sipas.surat.tipe.Combo',
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/pelaporan/rekap_surat_masuk?unit={unit}&filter={filter}&value={value}&download={download}&excel={excel}&title={title}'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_report_rekap_surat_masuk' },
        { ref: 'toolbar',       selector: 'sipas_pelaporan_report_rekap_surat_masuk toolbar' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_report_rekap_surat_masuk sipas_com_reportfilter' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_report_rekap_surat_masuk #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_report_rekap_surat_masuk combobox#comboUnit' },
        { ref: 'cmpFilter',     selector: 'sipas_pelaporan_report_rekap_surat_masuk sipas_com_reportfilter#comboFilter' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_report_rekap_surat_masuk":{
                show: this.onMainview_Show
            },
            "sipas_pelaporan_report_rekap_surat_masuk sipas_com_reportfilter":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_report_rekap_surat_masuk sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_report_rekap_surat_masuk sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_report_rekap_surat_masuk sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_report_rekap_surat_masuk sipas_com_button_download#btnDownloadExcel":{
                click: this.onButtonDownloadExcel_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            storeDep = $this.getStore($this.defaultStore),
            view = $this.createView(config);
        if(view){
            view.on('afterrender', function(){
                storeDep.reload();
            });
        }
        return view;
    },

    onMainview_Show: function(mainview){
        $this = this;
        $this.getCmpUnit().hide();
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view        = this.getMainview({from:component}),
            unit = this.getCmpUnit({root:view}).getValue(),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                value:  filterContainer.getValue(),
                title:  btoa(view.title)
            });
        iframe.load(url);
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            iframe = this.getCmpFrame({root:view});

        iframe.reload();
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            iframe = this.getCmpFrame({root:view});

        iframe.print();
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                value: filterContainer.getValue(),
                download: 1,
                title: btoa(view.title)
            });
        iframe.getWindow().location.assign(url);
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                value: filterContainer.getValue(),
                excel: 1,
                title: btoa(view.title)
            });
        iframe.getWindow().location.assign(url);
    }

});