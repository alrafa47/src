Ext.define('SIPAS.controller.Sipas.pelaporan.internal.keputusan.aktif.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.internal.keputusan.aktif.Pane'
    ],

    stores:[
        'Sipas.unit.Combo'
    ],

    api: {
        'url': 'server.php/sipas/surat_keputusan/internal_report?tipesk={tipesk}&jenissub={jenissub}&unit={unit}&internal=Internal&filter={filter}&value={value}&download={download}&excel={excel}&title={title}'
    },

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong',
        date_invalid        : '<b>Tanggal</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',          selector: 'sipas_pelaporan_internal_keputusan_aktif_pane' },
        { ref: 'compFilter',        selector: 'sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_reportfilter_keputusan' },
        { ref: 'cmpFrame',          selector: 'sipas_pelaporan_internal_keputusan_aktif_pane #Iframe'},
        { ref: 'cmpUnit',           selector: 'sipas_pelaporan_internal_keputusan_aktif_pane combobox#comboUnit' },
        { ref: 'cmpFilter',         selector: 'sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_reportfilter_keputusan #comboFilter' },
        { ref: 'cmpTipeSK',         selector: 'sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_reportfilter_keputusan #comboTipeSK' },
        { ref: 'cmpJenisSub',       selector: 'sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_reportfilter_keputusan #comboJenisSub' }
    ],

    defaultStore: 'Sipas.unit.Combo',
    
    init: function(application){
        this.control({
            "sipas_pelaporan_internal_keputusan_aktif_pane":{
                show: this.onMainview_Show
            },
            "sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_reportfilter_keputusan":{
                process: this.onFilter_Process
            },
            "sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_internal_keputusan_aktif_pane sipas_com_button_download#btnDownloadExcel":{
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
            buatSuratKeluar = $app.LocalSetting().get('use_unit_buat_surat_keputusan'),
            cmpUnit         = $this.getCmpUnit(),
            storeUnit       = cmpUnit.getStore();

        if(buatSuratKeluar){
            storeUnit.getProxy().url = 'server.php/sipas/unit/owner';
        }else{
            storeUnit.getProxy().url = 'server.php/sipas/unit/aktif';
        }
    },

    onFilter_Process: function(component, filter, value, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:component}),
            compTipeSK = $this.getCmpTipeSK({root:view}),
            compJenisSub = $this.getCmpJenisSub({root:view}),
            tipeSK = compTipeSK.getValue(),
            jenisSub = compJenisSub.getValue();
        
        if(tipeSK === null) tipeSK = 0 ;

        $this.frameLoad(tipeSK, jenisSub, view);
    },

    frameLoad: function(tipeSK, jenisSub, view){
        var $this = this,
            unit = $this.getCmpUnit({root:view}).getValue(),
            filterContainer = $this.getCompFilter({root:view}),
            iframe = $this.getCmpFrame({root:view}),
            filter = filterContainer.getFilter(),
            value = filterContainer.getValue(),
            $helper = $this.getApplication().Helper(),
            url = $this.getApi('url', {
                filter: filter,
                tipesk: tipeSK,
                jenissub: jenisSub,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filter == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
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
        var $this = this, 
            view = $this.getMainview({from:button}),
            iframe = $this.getCmpFrame({root:view});

        iframe.reload();
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            unit = $this.getCmpUnit({root:view}).getValue(),
            iframe = $this.getCmpFrame({root:view});

        if(!unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.print();
        }
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            filterContainer = $this.getCompFilter({root:view}),
            iframe = $this.getCmpFrame({root:view}),
            unit = $this.getCmpUnit({root:view}).getValue(),
            compTipeSK = $this.getCmpTipeSK({root:view}),
            compJenisSub = $this.getCmpJenisSub({root:view}),
            tipeSK = compTipeSK.getValue() ? compTipeSK.getValue() : 0,
            jenisSub = compJenisSub.getValue() ? compJenisSub.getValue() : 0,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            url = $this.getApi('url', {
                tipesk: tipeSK,
                jenissub: jenisSub,
                filter: filterContainer.getFilter(),
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                download: 1,
                title: btoa(view.title)
            });
        
        if(!unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.getWindow().location.assign(url);
        }
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            filterContainer = $this.getCompFilter({root:view}),
            iframe = $this.getCmpFrame({root:view}),
            compTipeSK = $this.getCmpTipeSK({root:view}),
            compJenisSub = $this.getCmpJenisSub({root:view}),
            tipeSK = compTipeSK.getValue() ? compTipeSK.getValue() : 0,
            jenisSub = compJenisSub.getValue() ? compJenisSub.getValue() : 0,
            unit = $this.getCmpUnit({root:view}).getValue(),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            url = $this.getApi('url', {
                filter: filterContainer.getFilter(),
                tipesk: tipeSK,
                jenissub: jenisSub,
                unit: (Ext.isEmpty(unit) ? '' : unit),
                value: filterContainer.getFilter() == 'daterange' ? filterContainer.getValue().join('|') : filterContainer.getValue(),
                excel: 1,
                title: btoa(view.title)
            });
    
        if(!unit){
            $helper.showMsg({success:false, message:this.getMessage('unit_invalid')});
        }else{
            iframe.getWindow().location.assign(url);
        }
    }
});