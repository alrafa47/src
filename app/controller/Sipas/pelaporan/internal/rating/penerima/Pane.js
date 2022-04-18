Ext.define('SIPAS.controller.Sipas.pelaporan.internal.rating.penerima.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.pelaporan.internal.rating.penerima.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/surat_ulasan/report_penerima?unit={unit}&filter={filter}&value={value}&download={download}&excel={excel}&title={title}'
    },  

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_internal_rating_penerima_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_internal_rating_penerima_pane sipas_com_reportfilter' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_internal_rating_penerima_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_internal_rating_penerima_pane combobox#comboUnit' }
    ],

    defaultStore: 'Sipas.unit.Combo',

    init: function(application){
        this.control({
            "sipas_pelaporan_internal_rating_penerima_pane sipas_com_reportfilter":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_internal_rating_penerima_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_internal_rating_penerima_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_internal_rating_penerima_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_internal_rating_penerima_pane sipas_com_button_download#btnDownloadExcel":{
                click: this.onButtonDownloadExcel_Click
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
        var view    = this.getMainview({from:component}),
            unit    = this.getCmpUnit({root:view}).getValue(),
            $helper = $app.Helper(),
            iframe  = this.getCmpFrame({root:view}),
            url = this.getApi('url', {
                filter: filter,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? value.join('|') : value,
                title: btoa(view.title)
            });

        // if( ! unit){
        //     $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        // }else{
            iframe.load(url);
        // }
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            iframe = this.getCmpFrame({root:view});

        iframe.reload();
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            $helper = $app.Helper(),
            unit    = this.getCmpUnit({root:view}).getValue(),
            iframe = this.getCmpFrame({root:view});

        // if( ! unit){
        //     $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        // }else{
            iframe.print();
        // }
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            $helper = $app.Helper(),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                download: 1,
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                title: btoa(view.title)
            });

        // if( ! unit){
        //     $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        // }else{
            iframe.getWindow().location.assign(url);
        // }
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            $helper = $app.Helper(),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                excel: 1,
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                title: btoa(view.title)
            });
        iframe.getWindow().location.assign(url);
    }

});