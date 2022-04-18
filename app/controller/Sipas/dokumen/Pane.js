Ext.define('SIPAS.controller.Sipas.surat.berkas.Pane', {
    extend: 'Ext.app.Controller',

    mixins:{
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    stores: [
        'Sipas.surat.berkas.List'
    ],

    views: [
        'Sipas.surat.berkas.Pane',
        'Sipas.Viewer'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_surat_berkas_pane'},
        { ref: 'form',              selector: 'sipas_surat_berkas_pane form'},
        { ref: 'list',              selector: 'sipas_surat_berkas_pane gridpanel'},
        { ref: 'compPreview',       selector: 'sipas_surat_berkas_pane #panePreview'},
        { ref: 'compButtonPreview', selector: 'sipas_surat_berkas_pane #panePreview sipas_com_button_view'}
    ],

    messages: {
        upload_success: 'Upload berhasil',
        upload_failed:  'Upload gagal'
    },

    api: {
        upload      : 'server.php/sipas/surat_berkas/create?surat_berkas_surat={surat_berkas_surat}',
        view        : 'server.php/sipas/surat_berkas/view/{id}',
        preview     : 'server.php/sipas/surat_berkas/preview/{id}',
        download    : 'server.php/sipas/surat_berkas/download/{id}',
        available   : 'server.php/sipas/surat_berkas/available/{id}',
        list        : 'server.php/sipas/surat_berkas/list/{id}'
    },

    controllerSurat: 'Sipas.surat.Prop',
    defaultStore: 'Sipas.surat.berkas.List',
    viewViewer: 'Sipas.Viewer',
    modelSurat: 'Sipas.Surat',

    init: function(application) {
        this.control({
            "sipas_surat_berkas_pane form filefield#fileUpload" : {
                change: this.onFileUpload_Change
            },
            "sipas_surat_berkas_pane #toolbarControl sipas_com_button_refresh" : {
                click: this.onButtonRefresh_Click
            },
            "sipas_surat_berkas_pane grid" : {
                selectionchange: this.onGridpanel_SelectionChange,
                action_download: this.onGridpanel_Download,
                action_remove: this.onGridpanel_Remove
            },
            "sipas_surat_berkas_pane #panePreview sipas_com_button_view" : {
                click: this.onButtonView_Click
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
                    'gridpanel #columnRemove'
                ] : []
            },config));

        $this.load(reference, view);

        return view;
    },

    load: function(reference, view){
        reference = reference instanceof this.getModel(this.modelSurat) ? reference.getId() : reference;
        view = view || this.getMainview();

        var store = this.getStore(this.defaultStore);
            
        store.clearFilter(true);
        store.removeAll();
        store.filter('surat_berkas_surat', reference);
        store.load();
    },

    onFileUpload_Change: function(filefield, value, eOpts)
    {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:filefield}),
            form = $this.getForm({root:view}),
            list = $this.getList({root:view}),
            store = list.getStore(),
            record = store.model.create({
                surat_berkas_nama: filefield.getValue().replace('C:\\fakepath\\',''),
                surat_berkas_preview: null,
                surat_berkas_file: null
            });

        store.insert(0, record);
        record.set('surat_berkas_progress', record.statics.uploadStatus.PROGRESS);
        record.commit();

        form.getForm().submit({
            url: $this.getApi('upload',{surat_berkas_surat: view.reference}),
            params: {
                surat_berkas_surat: view.reference
            },            
            success: function(form, action){
                record.set((action.result && action.result.record) || {});
                record.set('surat_berkas_progress', record.statics.uploadStatus.SUCCESS);
                record.commit();
            },
            failure: function(form, action){
                record.set('surat_berkas_progress', record.statics.uploadStatus.FAILED);
                record.commit();
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts){
        var view = button.up('gridpanel'),
            store = view.getStore(),
            recordsOnProgress = [];

        // save the records wich on progress to be still available in grid.
        store.each(function(record){
            if(record.get('surat_berkas_progress') == record.statics.uploadStatus.PROGRESS){
                recordsOnProgress.push(record);
            }
        });

        // then load the store
        store.reload({
            callback: function(){
                // then add the record on progress into it
                // insert it into store in first
                Ext.Array.each(recordsOnProgress, function(record){
                    store.insert(0, record);
                }, this, true);

                view.getView().refresh();
            }
        });
    },

    onButtonView_Click: function(button, e, eOpts){
        var $this = this,
            view = button.up('panel'),
            viewer = $this.getView($this.viewViewer),
            record = view.record;
           
        if(record && record.isPreviewable()){
            viewer.create({
                height: 600,
                width: 800,
                maximizable: true,
                enableDownload: true
            }).show().load($this.getApi('view', {
                id: record.getId()
            }));
        }
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = selected.length && selected[0],
            view = $this.getMainview({from:model.view}),
            panePreview = $this.getCompPreview({root:view}),
            btnView = $this.getCompButtonPreview({root:view});

        panePreview.record = record;

        if(record.isPreviewable()){
            btnView.setDisabled(false);
            panePreview.update( (new Ext.Template('<img src="{src}"/>')).apply({
                src: $this.getApi('preview',{id: record.getId()})
            }) );
        }else{
            btnView.setDisabled(true);
            panePreview.update('');
        }
    },

    onGridpanel_Download: function(view, rowIdx, colIdx, item, e, record, row){
        if(record.isDownloadable()){
            window.location.assign(this.getApi('download',{
                id: record.getId()
            }));
        }
    },

    onGridpanel_Remove: function(view, rowIdx, colIdx, item, e, record, row){
        var $helper = $this.getApplication().Helper()
            viewRef = $this.getMainview({from:view}),
            store = $this.getList({root:viewRef}),
            status = record.statics.uploadStatus;

        if(record.get('surat_berkas_progress') === status.FAILED){
            store.remove(record);
        }else{
            record.set('surat_berkas_progress', record.statics.uploadStatus.PROGRESS);
            record.destroy({
                success: function(){
                    store.remove(record);
                },
                failure:function(){
                    record.set('surat_berkas_progress', record.statics.uploadStatus.INIT);
                }
            });
        }
    }

});
