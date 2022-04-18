Ext.define('SIPAS.controller.Sipas.pelaporan.umum.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.pelaporan.umum.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/staf/pegawai_report?tipe={tipe}&?unit={unit}&filter={filter}&value={value}&download={download}'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_umum_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_umum_pane sipas_com_reportfilter_internal' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_umum_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_umum_pane combobox#comboUnit' },
        { ref: 'cmpStaf',       selector: 'sipas_pelaporan_umum_pane combobox#comboStaf' },
        { ref: 'cmpFilter',     selector: 'sipas_pelaporan_umum_pane sipas_com_reportfilter_internal #comboFilter' },
        { ref: 'cmpTipe',       selector: 'sipas_pelaporan_umum_pane sipas_com_reportfilter_internal #comboTipeInternal' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_umum_pane":{
                show: this.onMainview_Show
            },
            "sipas_pelaporan_umum_pane sipas_com_reportfilter_internal":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_umum_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_umum_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_umum_pane sipas_com_button_download":{
                click: this.onButtonDownload_Click
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
        $this.getCmpStaf().hide();
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view = this.getMainview({from:component}),
            compTipe = this.getCmpTipe({root:view}),
            filter = compTipe.getValue(),
            value = filter;
            if(filter === null){
                filter = 0 ;
            }
        this.frameLoad(filter, value, view);
            
    },
    frameLoad: function(tipe, filter, view){
      var unit = this.getCmpUnit({root:view}).getValue(),
          filterContainer = this.getCompFilter({root:view}),
          iframe = this.getCmpFrame({root:view}),
          url = this.getApi('url', {
                filter: filter,
                tipe: tipe,
                unit: (Ext.isEmpty(unit) ? '' : unit)
                // value: filter == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue()
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