Ext.define('SIPAS.controller.Sipas.arsip.log.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers: [
        'Sipas.arsip.log.List'
    ],
    
    models: [
        'Sipas.Dokumen'
    ],
    
    stores: [
        'Sipas.arsip.log.Treelist',
        'Sipas.arsip.log.List'
    ],
    
    views: [
        'Sipas.arsip.log.Popup'
    ],

    messages: {
        invalidMode: 'Mode tidak sesuai'
    }, 

    refs: [
        { ref: 'mainview',  selector: 'sipas_arsip_log_popup' },
        { ref: 'list',      selector: 'sipas_arsip_log_popup > grid' }
    ],

    api: {
        'report': 'server.php/sipas/surat_ekspedisi/report?id={id}'
    },

    viewViewer: 'Sipas.Viewer',

    defaultWindowReport: {
        modal: true,
        height: 600,
        width: 800,
        maximizable:true,
        maximized: true
    },

    init: function(application) {
        this.control({
            "sipas_arsip_log_popup": {
                show: this.onMainview_Show
            },
            "sipas_arsip_log_popup sipas_com_button_view": {
                click: this.onButtonViewSurat_Click
            },
            "sipas_arsip_log_popup sipas_com_button_print" : {
                click : this.onButtonPrint_Click
            }
        });
    },

    launch: function(config) {
        config = Ext.apply({
            mode: 'view',
            record: null,
            callback: Ext.emptyFn,
            scope: this
        }, config);

        var $this = this,
            record = $this.createRecord(config.record),
            view = null;

        switch(config.mode)
        {
            case 'view' :

                view = $this.createView(config);
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
        return view;  
    },

    onMainview_Show: function(mainview){
        var $this = this,
            record = mainview.record || $this.createRecord(mainview.record);

        $this.loadTrace(record, mainview);
        // $this.loadTree(record, mainview);
    },

    loadTrace: function(record, view){
        view = view || this.getMainview();
        
        var $this = this;
            trace = $this.getList({root:view}),
            id = record.getId(),
            store = trace.getStore();

        store.removeAll();
        if(record.get('dokumen_induk') !== null){
            id = record.get('dokumen_induk');
        }
        store.load({
            params: {
                id: id
            },
            scope: this,
            callback: function(store,construct,bool){
            }
        });
    },

    loadTree: function(record, view){
        view = view || this.getMainview();
        
        var $this = this;
            tree = view.down('treepanel'),
            store = tree.getStore();
        
        store.load({
            params: {
                id: record.getId()
            },
            scope: this,
            callback: function(store,construct,bool){
                tree.getView().refresh();
                var resp = Ext.JSON.decode(construct.response.responseText,true);
                $this.getMainview().down('textfield#txtJumlahPenerima').setValue(resp.metainfo.count);
                $this.getMainview().down('datefield#txtTanggalMulai').setValue(new Date(resp.metainfo.startdate));
                $this.getMainview().down('datefield#txtTanggalSelesai').setValue(new Date(resp.metainfo.enddate));
            }
        });
    },

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerMasuk = $this.getController($this.controllerMasuk);

        view.setLoading(true);
        record.forward && record.forward();

        view.setLoading(true);
        if(record.get('surat_model') === record.self.modelType().MODEL_MASUK){
            view.setLoading(false);
            controllerMasuk.launch({
                propType: 'masuk',
                unit: null,
                model: record.self.modelType().MODEL_MASUK,
                mode:'view',
                record: record
            });
        }
    },

    onButtonPrint_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = this.getForm({root:view}),
            record = form.getRecord();
        
        $this.printReport(record.getId());
    },

    printReport: function(id, callback, scope){
        var viewer = this.getView(this.viewViewer).create(Ext.apply(this.defaultWindowReport, {}))
        var url = this.getApi('report', {id: id});
        viewer.show().load(url);
    }
});