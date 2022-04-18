Ext.define('SIPAS.controller.Sipas.pelaporan.eksternal.korespondensi.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	'Sipas.pelaporan.eksternal.korespondensi.Pane'
    ],

    stores:[
        'Sipas.surat.kontak.Combo',
        'Sipas.korespondensi.perihal.Combo'
    ],

    api: {
        'url':          'server.php/sipas/korespondensi/report/all?instansi={instansi}&perihal={perihal}&download={download}&excel={excel}',
        'datasource':   'server.php/sipas/korespondensi/perihal?instansi={instansi}'
    },

    messages :{
        unit_invalid        : '<b>Unit Kerja</b> tidak boleh kosong'
    },

    refs:[
        { ref: 'mainview',      selector: 'sipas_pelaporan_eksternal_korespondensi_pane' },
        { ref: 'compFilter',    selector: 'sipas_pelaporan_eksternal_korespondensi_pane sipas_com_reportfilter_korespondensi' },
        { ref: 'comboInstansi', selector: 'sipas_pelaporan_eksternal_korespondensi_pane sipas_com_reportfilter_korespondensi #comboInstansi' },
        { ref: 'comboFilter',   selector: 'sipas_pelaporan_eksternal_korespondensi_pane sipas_com_reportfilter_korespondensi #comboFilter' }
    ],

    defaultStore : 'Sipas.masuk.agenda.Combo',

    init: function(application){
        this.control({
            "sipas_pelaporan_eksternal_korespondensi_pane sipas_com_reportfilter_korespondensi #buttonProcess":{
                click: this.onFilter_Process
            },
            "sipas_pelaporan_eksternal_korespondensi_pane sipas_com_button_refresh":{
                click: this.onButtonRefresh_Click
            },
            "sipas_pelaporan_eksternal_korespondensi_pane sipas_com_button_print":{
                click: this.onButtonPrint_Click
            },
            "sipas_pelaporan_eksternal_korespondensi_pane sipas_com_button_download#btnDownloadPdf":{
                click: this.onButtonDownload_Click
            },
            "sipas_pelaporan_eksternal_korespondensi_pane sipas_com_button_download#btnDownloadExcel":{
                click: this.onButtonDownloadExcel_Click
            },
            "sipas_pelaporan_eksternal_korespondensi_pane sipas_com_reportfilter_korespondensi #comboInstansi":{
                select: this.onComboInstansi_Select
            }
        });
    },

    launch: function(config){
        var $this = this,
            view = null;

        view = $this.createView( (function(c){
            c.hideComponents = [];

            return c;
        })(config) );

        $this.getStore('Sipas.surat.kontak.Combo').reload();
        $this.getStore('Sipas.korespondensi.perihal.Combo').reload();

    	return view;
    },

    onFilter_Process: function(button, e, eOpts){
        var view = this.getMainview({from:button}),
            comboFilter = this.getComboFilter({root:view}),
            comboInstansi = this.getComboInstansi({root:view}),
            valueInstansi = comboInstansi.getValue(),
            valueFilter = comboFilter.getValue(),
            iframe = view.down('#Iframe'),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                instansi:valueInstansi,
                perihal:valueFilter
            });
        iframe.load(url);
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            iframe = view.down('#Iframe');

        iframe.reload();
    },

    onButtonPrint_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            $helper = $app.Helper(),
            iframe = view.down('#Iframe');

        iframe.print();
    },

    onButtonDownload_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            comboFilter = this.getComboFilter({root:view}),
            comboInstansi = this.getComboInstansi({root:view}),
            valueInstansi = comboInstansi.getValue(),
            valueFilter = comboFilter.getValue(),
            iframe = view.down('#Iframe'),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                instansi:valueInstansi,
                perihal:valueFilter,
                download:1
            });

        iframe.getWindow().location.assign(url);
    },

    onButtonDownloadExcel_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            comboFilter = this.getComboFilter({root:view}),
            comboInstansi = this.getComboInstansi({root:view}),
            valueInstansi = comboInstansi.getValue(),
            valueFilter = comboFilter.getValue(),
            iframe = view.down('#Iframe'),
            $helper = $app.Helper(),
            url = this.getApi('url', {
                instansi:valueInstansi,
                perihal:valueFilter,
                excel:1
            });

        iframe.getWindow().location.assign(url);
    },

    onComboInstansi_Select: function(combo, selection, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            mainview = $this.getMainview({from:combo}),
            comboFilter = $this.getComboFilter({root:mainview}),
            storeFilter = comboFilter.getStore(),
            proxy = storeFilter.getProxy(),
            valueInstansi = combo.getValue();

        storeFilter.removeAll();
        proxy.url = this.getApi('datasource',{instansi:valueInstansi});

        storeFilter.clearFilter(true);
        storeFilter.reload();
        comboFilter.setDisabled(false);
    }
});