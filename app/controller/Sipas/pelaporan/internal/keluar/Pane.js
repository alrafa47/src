Ext.define('SIPAS.controller.Sipas.pelaporan.internal.keluar.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.internal.keluar.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/surat_ikeluar/internal_report?tipe={tipe}&unit={unit}&internal=Internal&filter={filter}&value={value}&download={download}&excel={excel}&title={title}'
    },

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_internal_keluar_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_internal_keluar_pane sipas_com_reportfilter_internal' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_internal_keluar_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_internal_keluar_pane combobox#comboUnit' },
        { ref: 'cmpStaf',       selector: 'sipas_pelaporan_internal_keluar_pane combobox#comboStaf' },
        { ref: 'cmpFilter',     selector: 'sipas_pelaporan_internal_keluar_pane sipas_com_reportfilter_internal #comboFilter' },
        { ref: 'cmpTipe',       selector: 'sipas_pelaporan_internal_keluar_pane sipas_com_reportfilter_internal #comboTipeInternal' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_internal_keluar_pane":{
                show: this.onMainview_Show
            },
            "sipas_pelaporan_internal_keluar_pane sipas_com_reportfilter_internal":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_internal_keluar_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_internal_keluar_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_internal_keluar_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_internal_keluar_pane sipas_com_button_download#btnDownloadExcel":{
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
        var $this = this,
            $app            = $this.getApplication(),
            buatSuratKeluar = $app.LocalSetting().get('use_unit_buat_surat_keluar'),
            cmpUnit         = $this.getCmpUnit(),
            storeUnit       = cmpUnit.getStore();

        $this.getCmpStaf().hide();
        if(buatSuratKeluar){
            storeUnit.getProxy().url = 'server.php/sipas/unit/owner';
        }else{
            storeUnit.getProxy().url = 'server.php/sipas/unit/aktif';
        }
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
          filter = filterContainer.getFilter(),
          $helper = $app.Helper(),
          url = this.getApi('url', {
                filter: filter,
                tipe: tipe,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                title: btoa(view.title)
            });
        
        // iframe.load(url);  
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
            $helper = $app.Helper(),
            unit = this.getCmpUnit({root:view}).getValue(),
            iframe = this.getCmpFrame({root:view});

        // iframe.print();
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
            compTipe = this.getCmpTipe({root:view}),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                tipe: (compTipe.getValue() === null) ? 0 : compTipe.getValue(),
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                download: 1,
                title: btoa(view.title)
            });
        
        // iframe.getWindow().location.assign(url);
        if( ! unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.getWindow().location.assign(url);
        }
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            iframe = this.getCmpFrame({root:view}),
            compTipe = this.getCmpTipe({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                tipe: (compTipe.getValue() === null) ? 0 : compTipe.getValue(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                excel: 1,
                title: btoa(view.title)
            });
        
        // iframe.getWindow().location.assign(url);
        if( ! unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.getWindow().location.assign(url);
        }
    }

});