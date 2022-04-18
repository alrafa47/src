Ext.define('SIPAS.controller.Sipas.pelaporan.eksternal.rekap.bulan.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.pelaporan.eksternal.rekap.bulan.Pane'
    ],

    stores:[
        'Sipas.surat.tipe.Combo',
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/pelaporan/chart_eksternal_bulanan?unit={unit}&filter={filter}&value={value}&download={download}'
    },

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_eksternal_rekap_bulan_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_eksternal_rekap_bulan_pane sipas_com_reportfilter_rekap_bulanan' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_eksternal_rekap_bulan_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_eksternal_rekap_bulan_pane combobox#comboUnit' },
        { ref: 'cmpFilter',     selector: 'sipas_pelaporan_eksternal_rekap_bulan_pane sipas_com_reportfilter_rekap_bulanan #comboFilter' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_eksternal_rekap_bulan_pane sipas_com_reportfilter_rekap_bulanan":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_eksternal_rekap_bulan_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_eksternal_rekap_bulan_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_eksternal_rekap_bulan_pane sipas_com_button_download":{
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
          url = this.getApi('url', {    
                filter: filter,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue()
            });

          if( ! unit){
                $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
            }else{
                iframe.load(url);
            }
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            iframe = this.getCmpFrame({root:view});

        iframe.reload();
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            unit = this.getCmpUnit({root:view}).getValue(),
            iframe = this.getCmpFrame({root:view});

        if( ! unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.print();   
        }
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: this.getCmpFilter().getValue(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getValue() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                download: 1
            });
            
        if( ! unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.getWindow().location.assign(url);
        }
    }

});