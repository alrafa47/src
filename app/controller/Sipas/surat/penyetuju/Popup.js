Ext.define('SIPAS.controller.Sipas.surat.penyetuju.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    views: [
        'Sipas.surat.penyetuju.Popup'
    ],

    models: [
        'Sipas.Staf',
        'Sipas.surat.Stack'
    ],

    stores: [
        'Sipas.surat.penyetuju.Popup'
    ],

    api: {
        'penerima'          : 'server.php/sipas/surat_stack/tujuan_penerima?surat_id={id}',
        'penerima_type'     : 'server.php/sipas/surat_stack/tujuan_penerima?surat_id={id}&type={type}',
        'print_penerima'    : 'server.php/sipas/surat_stack/print_tujuan_penerima?surat_id={id}&download={download}&type={type}'
    },

    refs: [
        { ref: 'mainview',      selector: 'sipas_surat_penyetuju_popup' },
        { ref: 'form',          selector: 'sipas_surat_penyetuju_popup > form' },
        { ref: 'list',          selector: 'sipas_surat_penyetuju_popup #listPenerima' },
        { ref: 'list1',         selector: 'sipas_surat_penyetuju_popup #listPenerima1' }
    ],

    viewViewer: 'Sipas.Viewer',

    surat_id: null,

    init: function(application) {
        this.control({
            'sipas_surat_penyetuju_popup': {
                afterrender: this.onMainview_AfterRender,
                close: this.onMainview_Close
            },
            'sipas_surat_penyetuju_popup sipas_com_button_print': {
                click: this.onButtonPrintPenerima_Click
            }
        });
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            record: null,
            model: null,
            type: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'view' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = [];

                    if (c.record.get('surat_isdistribusi') == '1'){
                        c.removeComponents.push('#listPenerima1');
                    } else {
                        c.removeComponents.push('#listPenerima');
                    }

                    if (c.record.get('surat_isdistribusi') != 1){
                        c.removeComponents.push('sipas_com_button_print');
                    }

                    return c;
                })(config));
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_AfterRender: function(mainview)
    {
        var record = this.createRecord(mainview.record),
            form = this.getForm({root:mainview}),
            list = this.getList({root:mainview}),
            list1 = this.getList1({root:mainview});

        if(mainview.type == 'tembusan') {
            mainview.setTitle('Daftar Tembusan');
        }

        if (record.get('surat_isdistribusi') == '1'){
            this.loadListPenerima(record, form, list);
        } else {
            this.loadListPenerima(record, form, list1);
        }
    },

    loadListPenerima: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePenyetuju = cmp.getStore(),
            surat_id = record.get('surat_id'),
            model = mainview.model,
            type = mainview.type;

        $this.surat_id = surat_id;

        cmp.setLoading(true);
        storePenyetuju.removeAll();

        Ext.Ajax.request({
            url: $this.getApi('penerima_type', {id: surat_id, type: type}),
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {};
                storePenyetuju.addSorted(objres.data);
                cmp.setLoading(false);
            }
        });
    }, 

    onButtonPrintPenerima_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            surat_id = $this.surat_id;

        if (surat_id){
            $this.printPenerima(surat_id, null, null, 'Cetak Penerima Surat Keluar Internal', mainview);
        }
    },

    printPenerima: function(id, callback, scope, title, mainview){
        var viewer = this.getView(this.viewViewer).create(Ext.apply({
            modal: true,
            height: 600,
            width: 800,
            maximizable:true,
            maximized: false,
            enableDownload:true,
            downloadUrl: this.getApi('print_penerima', {id: id, download:1, type: mainview.type})
        }, {}));
        var url = this.getApi('print_penerima', {id: id, type: mainview.type});
        viewer.show().load(url);
        viewer.setTitle(title);
    }
});