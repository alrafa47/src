Ext.define('SIPAS.controller.Sipas.pelaporan.rekap.staf.akses.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.pelaporan.rekap.staf.akses.Pane'
    ],

    stores:[
        'Sipas.surat.tipe.Combo',
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/staf/pegawai_akun_report?unit={unit}&filter={filter}&value={value}&download={download}&excel={excel}&title={title}'
    },

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_rekap_staf_akses_pane' },
        { ref: 'toolbar',      selector: 'sipas_pelaporan_rekap_staf_akses_pane toolbar' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_rekap_staf_akses_pane sipas_com_reportfilter_rekap' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_rekap_staf_akses_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_rekap_staf_akses_pane combobox#comboUnit' },
        { ref: 'cmpFilter',     selector: 'sipas_pelaporan_rekap_staf_akses_pane sipas_com_reportfilter_rekap #comboFilter' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_rekap_staf_akses_pane":{
                show: this.onMainview_Show
            },
            "sipas_pelaporan_rekap_staf_akses_pane sipas_com_reportfilter_rekap":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_rekap_staf_akses_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_rekap_staf_akses_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_rekap_staf_akses_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_rekap_staf_akses_pane sipas_com_button_download#btnDownloadExcel":{
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
        $this.getToolbar().hide();
        $this.onFilter_Process();
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view        = this.getMainview({from:component}),
            compFilter  = this.getCompFilter({root:view}),
            filter      = compFilter.getValue(),
            value       = this.getCmpFilter({root:view}).getValue();
            if(filter === null){
                filter = 0 ;
            }
        this.frameLoad(filter, value, view);
    },

    frameLoad: function(tipe, filter, view){
      var unit = this.getCmpUnit({root:view}).getValue(),
          filterContainer = this.getCompFilter({root:view}),
          iframe = this.getCmpFrame({root:view}),
          $app = this.getApplication();
          $helper = $app.Helper(),
          url = this.getApi('url', {
                filter: filter,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                title: btoa(view.title)
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
            $helper = $app.Helper(),
            unit = this.getCmpUnit({root:view}).getValue(),
            iframe = this.getCmpFrame({root:view});
            iframe.print();
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCmpFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getValue(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getValue() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                download: 1,
                title: btoa(view.title)
            });
            iframe.getWindow().location.assign(url);
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCmpFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getValue(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getValue() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                excel: 1,
                title: btoa(view.title)
            });
            iframe.getWindow().location.assign(url);
    }

});