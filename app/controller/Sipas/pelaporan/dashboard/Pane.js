Ext.define('SIPAS.controller.Sipas.pelaporan.dashboard.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.pelaporan.dashboard.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/dasbor/get_dashboard?unit={unit}&download={download}&excel={excel}'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_dashboard_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_dashboard_pane sipas_com_reportfilter' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_dashboard_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_dashboard_pane combobox#comboUnit' },
        { ref: 'cmpFilter',     selector: 'sipas_pelaporan_dashboard_pane sipas_com_reportfilter #comboFilter' }
        // { ref: 'cmpTipe',       selector: 'sipas_pelaporan_dashboard_pane sipas_com_reportfilter #comboTipeInternal' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_dashboard_pane":{
                show: this.onMainView_Show
            },
            "sipas_pelaporan_dashboard_pane sipas_com_reportfilter":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_dashboard_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_dashboard_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_dashboard_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_dashboard_pane sipas_com_button_download#btnDownloadExcel":{
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
                $this.frameLoad();
            });
        }
        return view;
    },

    onMainView_Show: function(mainview){
        $this = this;
        $this.getCmpFilter().hide();
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view = this.getMainview({from:component});
            if(filter === null){
                filter = 0 ;
            }
        this.frameLoad(filter, value, view);
            
    },

    // frameLoad: function(tipe, filter, view){
    //   var unit = this.getCmpUnit({root:view}).getValue(),
    //       filterContainer = this.getCompFilter({root:view}),
    //       iframe = this.getCmpFrame({root:view}),
    //       url = this.getApi('url', {
    //             filter: filter,
    //             tipe: tipe,
    //             unit: (Ext.isEmpty(unit) ? '' : unit),
    //             // value: filter == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue()
    //         });
    //     iframe.load(url);  
    // },

     frameLoad: function(){
      var view = this.getMainview(),
          iframe = this.getCmpFrame({root:view}),
          unit    = this.getCmpUnit({root:view}).getValue(),
          url = this.getApi('url', {
                unit : unit
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
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                download: 1
            });
        
        iframe.getWindow().location.assign(url);
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                excel: 1
            });
        
        iframe.getWindow().location.assign(url);
    }

});