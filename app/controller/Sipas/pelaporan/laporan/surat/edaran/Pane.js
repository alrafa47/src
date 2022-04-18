Ext.define('SIPAS.controller.Sipas.pelaporan.laporan.surat.edaran.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.laporan.surat.edaran.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/surat_edaran/report?unit={unit}&filter={filter}&value={value}&download={download}'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_laporan_surat_edaran_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_laporan_surat_edaran_pane sipas_com_reportfilter' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_laporan_surat_edaran_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_laporan_surat_edaran_pane combobox#comboUnit' }
    ],

    defaultStore: 'Sipas.unit.Combo',

    init: function(application){
        this.control({
            "sipas_pelaporan_laporan_surat_edaran_pane sipas_com_reportfilter":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_laporan_surat_edaran_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_laporan_surat_edaran_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_laporan_surat_edaran_pane sipas_com_button_download":{
                click: this.onButtonDownload_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            storeDep = $this.getStore($this.defaultStore),
            view = this.createView(config);
            
        if(view){
            view.on('afterrender', function(){
                storeDep.reload();
            });
        }
        return view;
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view = this.getMainview({from:component}),
            unit = this.getCmpUnit({root:view}).getValue(),
            iframe = this.getCmpFrame({root:view}),
            url = this.getApi('url', {
                filter: filter,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? value.join('|') : value
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
    }

});