Ext.define('SIPAS.controller.Sipas.pelaporan.umum.jenis.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.umum.jenis.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/surat/report_jenis?jenis={jenis}&unit={unit}&filter={filter}&value={value}&download={download}&excel={excel}&title={title}'
    },

    messages :{
        date_invalid        : '<b>Tanggal</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_umum_jenis_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_umum_jenis_pane sipas_com_reportfilter_jenis' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_umum_jenis_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_umum_jenis_pane combobox#comboUnit' },
        { ref: 'cmpFilter',     selector: 'sipas_pelaporan_umum_jenis_pane sipas_com_reportfilter_jenis #comboFilter' },
        { ref: 'cmpJenis',      selector: 'sipas_pelaporan_umum_jenis_pane sipas_com_reportfilter_jenis #comboJenis' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_umum_jenis_pane sipas_com_reportfilter_jenis":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_umum_jenis_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_umum_jenis_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_umum_jenis_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_umum_jenis_pane sipas_com_button_download#btnDownloadExcel":{
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

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view = this.getMainview({from:component}),
            compJenis = this.getCmpJenis({root:view}),
            value  = this.getCmpFilter({root:view}).getValue(),
            filter = compJenis.getValue();
            if(filter === null){
                filter = 0 ;
            }

        this.frameLoad(filter, view, value);
    },

    frameLoad: function(jenis, view){
        var unit = this.getCmpUnit({root:view}).getValue(),
            filterContainer = this.getCompFilter({root:view}),
            filter = filterContainer.getFilter(),
            value = filterContainer.getValue(),
            iframe = this.getCmpFrame({root:view}),
            $helper = this.getApplication().Helper(),
            url = this.getApi('url', {
                filter: filter,
                jenis: jenis,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                title: btoa(view.title)
            });
        
            if(!filter){
                iframe.load(url);
            }else{
                if(!value || (filter === 'daterange' && (!value[0] || !value[1]))){
                    $helper.showMsg({success:false, message:this.getMessage('date_invalid')});   
                }else{
                    iframe.load(url);
                }
            }
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            unit = this.getCmpUnit({root:view}).getValue(),
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
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            compJenis = this.getCmpJenis({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                jenis: (compJenis.getValue() === null) ? 0 : compJenis.getValue(),
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                download: 1,
                title: btoa(view.title)
            });

        iframe.getWindow().location.assign(url);
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            compJenis = this.getCmpJenis({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                jenis: (compJenis.getValue() === null) ? 0 : compJenis.getValue(),
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                excel: 1,
                title: btoa(view.title)
            });
        
        iframe.getWindow().location.assign(url);
    }

});