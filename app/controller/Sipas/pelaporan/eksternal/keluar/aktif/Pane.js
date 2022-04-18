Ext.define('SIPAS.controller.Sipas.pelaporan.eksternal.keluar.aktif.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.eksternal.keluar.aktif.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/surat_keluar/report?unit={unit}&filter={filter}&value={value}&download={download}&excel={excel}&title={title}'
    },

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong',
        date_invalid        : '<b>Tanggal</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_eksternal_keluar_aktif_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_eksternal_keluar_aktif_pane sipas_com_reportfilter' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_eksternal_keluar_aktif_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_eksternal_keluar_aktif_pane combobox#comboUnit' }
    ],

    defaultStore: 'Sipas.unit.Combo',

    init: function(application){
        this.control({
            "sipas_pelaporan_eksternal_keluar_aktif_pane":{
                show: this.onMainview_Show
            },
            "sipas_pelaporan_eksternal_keluar_aktif_pane sipas_com_reportfilter":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_eksternal_keluar_aktif_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_eksternal_keluar_aktif_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_eksternal_keluar_aktif_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_eksternal_keluar_aktif_pane sipas_com_button_download#btnDownloadExcel":{
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

    onMainview_Show: function(mainview){
        var $this = this,
            $app            = $this.getApplication(),
            buatSuratKeluar = $app.LocalSetting().get('use_unit_buat_surat_keluar'),
            cmpUnit         = $this.getCmpUnit(),
            storeUnit       = cmpUnit.getStore();

        if(buatSuratKeluar){
            storeUnit.getProxy().url = 'server.php/sipas/unit/owner';
        }else{
            storeUnit.getProxy().url = 'server.php/sipas/unit/aktif';
        }
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var view    = this.getMainview({from:component}),
            filterContainer = this.getCompFilter({root:view}),
            unit    = this.getCmpUnit({root:view}).getValue(),
            $helper = this.getApplication().Helper(),
            iframe  = this.getCmpFrame({root:view}),
            url = this.getApi('url', {
                filter: filter,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? value.join('|') : value,
                title: btoa(view.title)
            });
            
        if(!unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            if(!filter){
                iframe.load(url);
            }else{
                if(!value || (filter === 'daterange' && (!value[0] || !value[1]))){
                    $helper.showMsg({success:false, message:this.getMessage('date_invalid')});   
                }else{
                    iframe.load(url);
                }
            }
        }
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter(),
            filter = filterContainer.getFilter(),
            value = filterContainer.getValue(),
            iframe = this.getCmpFrame({root:view});

        iframe.reload();
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter(),
            filter = filterContainer.getFilter(),
            value = filterContainer.getValue(),
            unit    = this.getCmpUnit({root:view}).getValue(),
            iframe = this.getCmpFrame({root:view});

        iframe.print();   
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            filter = filterContainer.getFilter(),
            value = filterContainer.getValue(),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                download: 1,
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                title: btoa(view.title)
            });
   
        iframe.getWindow().location.assign(url);
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            filterContainer = this.getCompFilter({root:view}),
            filter = filterContainer.getFilter(),
            value = filterContainer.getValue(),
            iframe = this.getCmpFrame({root:view}),
            unit = this.getCmpUnit({root:view}).getValue(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                excel: 1,
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                title : btoa(view.title)
            });
  
        iframe.getWindow().location.assign(url);
    }

});