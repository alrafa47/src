Ext.define('SIPAS.controller.Sipas.surat.berkas.Paneview', {
    extend: 'Ext.app.Controller',

    mixins:{
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    controllers: [
        'Sipas.surat.berkas.paneview.ScanComponent'
    ],

    stores: [
        'Sipas.surat.berkas.List'
    ],

    views: [
        'Sipas.surat.berkas.Paneview',
        'Sipas.Viewer'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_surat_berkas_paneview'},
        { ref: 'form',              selector: 'sipas_surat_berkas_paneview form'},
        { ref: 'list',              selector: 'sipas_surat_berkas_paneview dataview'}

    ],

    messages: {
        upload_success: 'Upload berhasil',
        upload_failed:  'Upload gagal'
    },

    api: {
        upload      : 'server.php/sipas/surat_berkas/create'
    },

    defaultStore: 'Sipas.surat.berkas.List',
    controllerViewerPopup: 'Sipas.surat.berkas.viewer.Popup',
    viewerPopup: 'Sipas.surat.berkas.viewer.Popup',
    viewViewer: 'Sipas.Viewer',
    modelSurat: 'Sipas.Surat',

    init: function(application) {
        this.control({
            'sipas_surat_berkas_paneview' : {
                load: this.onMainview_Load,
                doshowimage: this.onMainview_DoShowImage,
                showimageall: this.onMainview_ShowImageAll,
                showimage: this.onMainview_ShowImage,
                dodownload: this.onMainview_DoDownload,
                download: this.onMainview_Download,
                doremoverecord: this.onMainview_DoRemoveRecord,
                removerecord: this.onMainview_RemoveRecord
            },
            'sipas_surat_berkas_paneview dataview' : {
                selectionchange: this.onList_SelectionChange,
                itemdblclick: this.onList_DblClick
            },
            'sipas_surat_berkas_paneview form filefield#fileUpload' : {
                change: this.onFileUpload_Change
            },
            'sipas_surat_berkas_paneview toolbar sipas_com_button_view' : {
                click: this.onButtonView_Click
            },
            'sipas_surat_berkas_paneview toolbar sipas_com_button_download' : {
                click: this.onButtonDownload_Click
            },
            'sipas_surat_berkas_paneview toolbar sipas_com_button_delete' : {
                click: this.onButtonDelete_Click
            },
            'sipas_surat_berkas_paneview toolbar sipas_com_button_refresh' : {
                click: this.onButtonRefresh_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            reference = config.reference,
            view = $this.createView(Ext.apply({
                removeComponents: (config.mode == 'view' || config.mode == 'readonly') ? [
                    'gridpanel #toolbarControl form #fileUpload',
                    'gridpanel #columnProgress',
                    'gridpanel #columnRemove',
                    '#toolbarControl #btnScan'
                ] : []
            },config));
            
        $this.load(reference, view);

        return view;
    },

    onMainview_Load: function(mainview, surat){
        var store = surat.fetchBerkas();
        mainview.record = surat;
        mainview.down('dataview').bindStore(store);
        store.reload();
    },

    onMainview_Unload: function(mainview){
        mainview.record = null;
        mainview.down('dataview').store = null;
    },

    onMainview_Download: function(mainview, record){
        if(record && record.isDownloadable()){
            var viewer = this.getView(this.viewViewer);
            window.open(record.get('surat_berkas_download', '_bank'));
        }
    },

    onMainview_DoDownload: function(mainview){
        var selection = mainview.down('dataview').getSelectionModel().getSelection();

        if(selection.length){
            mainview.fireEvent('download', mainview, selection[0]);
        }
    },

    onMainview_ShowImageAll: function(mainview, record){
        this.getController(this.controllerViewerPopup).launch({
            mode: 'view',
            reference: record
        });
    },

    onMainview_ShowImage: function(mainview, record){

        if(record.get('surat_berkas_ext') == '.pdf'){
            link = window.location.href+'resources/pdfjs/web/viewer.html?file='+window.location.href+record.get('surat_berkas_download');
        }else{
            link = record.get('surat_berkas_file');
        }

        if(record && record.isPreviewable()){
            var viewer = this.getView(this.viewViewer);
            viewer.create({
                modal: true,
                height: 650,
                width: 1000,
                maximizable: true,
                enableDownload: true,
                downloadUrl: record.get('surat_berkas_download'),
                useImageStyle: (record.get('surat_berkas_ext') !== '.pdf')
            }).show().load(link);
        }
    },

    onMainview_DoShowImage: function(mainview){
        var dataview = mainview.down('dataview'),
            record = mainview.record;
        
        mainview.fireEvent('showimageall', mainview, record);
    },

    onMainview_RemoveRecord: function(mainview, record){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            viewRef = $this.getMainview({from:mainview}),
            dataview = $this.getList({root:viewRef}),
            store = dataview && dataview.getStore(),
            status = record.self.uploadStatus();

        if(!dataview) return;

        if(record.get('surat_berkas_progress') === status.FAILED){
            store.remove(record);
        }else{
            record.set('surat_berkas_progress', status.PROGRESS);
            record.destroy({
                success: function(){
                    store.remove(record);
                },
                failure:function(){
                    record.set('surat_berkas_progress', status.INIT);
                }
            });
        }
    },

    onMainview_DoRemoveRecord: function(mainview){
        var selection = this.getList({root:mainview}).getSelectionModel().getSelection();

        if(selection.length){
            mainview.fireEvent('removerecord', mainview, selection[0]);
        }
    },

    onList_SelectionChange: function(model, selected){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel,panel'),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_delete','sipas_com_button_download']
        });
    },

    onList_DblClick: function( dataview, record, item, index, e, eOpts ){
        var mainview = this.getMainview({from:dataview});
        mainview.fireEvent('showimage', mainview, record);
    },

    onFileUpload_Change: function(filefield, value, eOpts)
    {
        var $this = this,
            $app = this.getApplication(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:filefield}),
            form = $this.getForm({root:view}),
            list = $this.getList({root:view}),
            store = list.getStore(),
            record = store.model.create({
                'surat_berkas_nama': filefield.getValue().replace('C:\\fakepath\\',''),
                'surat_berkas_surat': view.record && view.record.getId()
            }),
            status = record.self.uploadStatus();

        store.insert(0, record);

        record.set('surat_berkas_progress', status.PROGRESS);
        record.commit();

        form.getForm().submit({
            url: $this.getApi('upload'),
            params: {
                'surat_berkas_surat': view.record && view.record.getId()
            },            
            success: function(form, action){
                record.set((action.result && action.result.data) || {});
                record.set('surat_berkas_progress', status.SUCCESS);
                record.commit();
                list.refresh();
            },
            failure: function(form, action){
                record.set('surat_berkas_progress', status.FAILED);
                record.commit();
                $helper.showMessageResponse({action:action});
            }
        });
    },

    onButtonView_Click: function(button, e, eOpts){
        var $this = this,
            mainview = this.getMainview({from:button});
        mainview.fireEvent('doshowimage', mainview);
    },

    onButtonDownload_Click: function(button, e, eOpts){
        var $this = this,
            mainview = this.getMainview({from:button});
        mainview.fireEvent('dodownload', mainview);
    },

    onButtonDelete_Click: function(button, e, eOpts){
        var $this = this,
            mainview = this.getMainview({from:button});
        mainview.fireEvent('doremoverecord', mainview);
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            list = $this.getList({root:view}),
            store = list.getStore();
        store.reload();
    }
});
