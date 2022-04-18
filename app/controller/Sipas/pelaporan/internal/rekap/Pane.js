Ext.define('SIPAS.controller.Sipas.pelaporan.internal.rekap.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.internal.rekap.Pane'
    ],

    stores:[
        'Sipas.surat.tipe.Combo',
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/surat/report_internal?unit={unit}&tipe={tipe}&filter={filter}&value={value}&download={download}'
    },

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_internal_rekap_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_internal_rekap_pane sipas_com_reportfilter_rekap_bulanan' },
        { ref: 'cmpFrame',      selector: 'sipas_pelaporan_internal_rekap_pane #Iframe'},
        { ref: 'cmpUnit',       selector: 'sipas_pelaporan_internal_rekap_pane combobox#comboUnit' },
        { ref: 'cmpFilter',       selector: 'sipas_pelaporan_internal_rekap_pane combobox#comboFilter' }
        // { ref: 'cmpTipe',       selector: 'sipas_pelaporan_internal_rekap_pane combobox#comboTipe' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    tipeStore: 'Sipas.surat.tipe.Combo',

    init: function(application){
        this.control({
            "sipas_pelaporan_internal_rekap_pane":{
                show: this.onMainview_Show
            },
            "sipas_pelaporan_internal_rekap_pane sipas_com_reportfilter_rekap_bulanan":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_internal_rekap_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_internal_rekap_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_internal_rekap_pane sipas_com_button_download":{
                click: this.onButtonDownload_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            storeDep = $this.getStore($this.defaultStore),
            // storeTipe = $this.getStore($this.tipeStore),
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                storeDep.reload();
                // storeTipe.reload();
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
        var view = this.getMainview({from:component}),
            unit = this.getCmpUnit({root:view}).getValue(),
            // tipe = this.getCmpTipe({root:view}).getValue(),
            iframe = this.getCmpFrame({root:view}),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                filter: filter,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                // tipe: (Ext.isEmpty(tipe) ? '' : tipe),
                value: filter == 'daterange' ? value.join('|') : value
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
            $helper = $app.Helper(),
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
            // tipe = this.getCmpTipe({root:view}).getValue(),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                // tipe: (Ext.isEmpty(tipe) ? '' : tipe),
                download: 1
                // value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
            });
        
        if( ! unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.getWindow().location.assign(url);
        }
    }

});