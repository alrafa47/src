Ext.define('SIPAS.controller.Sipas.arsip.log.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.arsip.log.List'
    ],
    models: [
        'Sipas.Dokumen'
    ],
    views: [
        'Sipas.arsip.log.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_arsip_log_list' }
    ],

    api: {
        destroy     : 'server.php/sipas/dokumen/destroy',
        view        : 'server.php/sipas/dokumen/view?id={dokumen_id}',
        download    : 'server.php/sipas/dokumen/download/{dokumen_id}'
    },

    defaultStore: 'Sipas.arsip.log.List',
    viewViewer: 'Sipas.Viewer',

    init: function(application) {
        this.control({
            'sipas_arsip_log_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            controllerLink = $this.getController('Sipas.arsip.link.Prop'),
            controllerSdoc = $this.getController('Sipas.arsip.sdoc.Prop'),
            controllerEditor = $this.getController('Sipas.sdoc.editor.Popup'),
            store = $this.getStore($this.defaultStore),
            record = selected,
            extension = record.get('dokumen_ext'),
            mime = record.get('dokumen_mime'),
            file = record.get('dokumen_file'),
            name = record.get('dokumen_nama'),
            download = $this.getApi('download', {dokumen_id:record.getId()});

        switch(extension){
            case '.link' :
                controllerLink.launch({
                    record : record,
                    mode: 'view'
                });
            break;
            case '.sdoc' :
                controllerEditor.launch({
                    sdoc: {
                        name: name,
                        value: Ext.util.Format.htmlDecode(atob(file))
                        // value: Ext.util.Format.htmlDecode(file)
                    },
                    // surat: surat,
                    // arsip: arsip,
                    record: record,
                    mode : 'view',
                    callback: function(sdoc){
                    }
                });
            break;
            default:
                if(extension === '.pdf'){
                    link = window.location.href+$this.getApi('view', {dokumen_id:record.getId()});
                    var viewer = $this.getView($this.viewViewer);
                    viewer.create({
                        modal: true,
                        height: 650,
                        width: 1000,
                        title: (name+extension),
                        maximizable: true,
                        enableDownload: true,
                        downloadUrl: download,
                        useImageStyle: (extension !== '.pdf')
                    }).show().load(link);
                }else{
                    link = window.location.href+$this.getApi('view', {dokumen_id:record.getId()});
                    if(record && record.isPreviewable()){
                        var viewer = $this.getView($this.viewViewer);
                        viewer.create({
                            modal: true,
                            height: 650,
                            width: 1000,
                            title: (name+extension),
                            maximizable: true,
                            enableDownload: true,
                            downloadUrl: download,
                            useImageStyle: (extension !== '.pdf')
                        }).show().load(link);
                    }
                }
            break;
        }
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
        });
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh();
            });
        }
        return view;
    }
});