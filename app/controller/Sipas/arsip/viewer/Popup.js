Ext.define('SIPAS.controller.Sipas.arsip.viewer.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Surat'
    ],
    
    views:[
        'Sipas.arsip.viewer.Popup'
    ],
    
    stores: [
        'Sipas.arsip.ListAbstract'
    ],


    refs : [
        { ref: 'mainview',          selector: 'sipas_arsip_viewer_popup'},
        { ref: 'form',              selector: 'sipas_arsip_viewer_popup form'},
        { ref: 'list',              selector: 'sipas_arsip_viewer_popup dataview'},
        { ref: 'iframe',            selector: 'sipas_arsip_viewer_popup sipas_com_iframe'},
        { ref: 'info',              selector: 'sipas_arsip_viewer_popup toolbar#toolbarInfo'}
    ],

    messages: {
        'upload_success'  : 'Upload berhasil',
        'upload_failed'   : 'Upload gagal',
        'invalidMode'     : ['Error', 'Mode tidak sesuai'],
        'wait'            : 'Menyimpan data',
        'success'         : ['Berhasil', 'Berhasil menyimpan data'],
        'failure'         : ['Gagal', 'gagal menyimpan data']
    },

    api: {
        readAll     : 'server.php/sipas/dokumen/read?dokumen_surat={surat_id}'
    },

    defaultStore: 'Sipas.surat.berkas.List',
    viewViewerPopup: 'Sipas.viewer.Popup',
    modelSurat: 'Sipas.Surat',

    init: function(application) {
        this.control({
            'sipas_arsip_viewer_popup dataview' : {
                selectionchange: this.onList_SelectionChange
            }
        });
    },

    launch: function(config){
        config = Ext.applyIf(config,{
            mode: 'view',            
            reference: null,
            callback: Ext.emptyFn,
            scope: this
        });

        var $this = this,
            $app = this.getApplication(),
            $helper = $app.Helper(),
            record = config.reference,
            surat = record || record.getSurat(),
            store = surat.fetchBerkas(),
            view = null,
            constrainParent = config.constrainTo || $app.moduleView;

        switch(config.mode)
        {
            case 'view' :
                $this.createView({
                    record: surat,
                    mode: 'view',
                    modal: true,
                    height: 600,
                    width: 800,
                    maximizable: true,
                    maximized: true,
                    enableDownload: true,
                    downloadUrl: record.get('dokumen_download')
                }).show().load(record.get('dokumen_file'));
                $this.getList({root:view}).bindStore(store);
                store.reload();
            break;

            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
            break;
        }
    },

    onList_SelectionChange: function(model, selected){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view    = $this.getMainview({from:model.view}),
            iframe  = $this.getIframe({root:view}),
            info    = $this.getInfo({root:view}),
            record  = selected && selected[0],
            link    = "";

        if(record.get('dokumen_ext') === '.pdf'){
            link = window.location.href+'resources/pdfjs/web/viewer.html?file='+window.location.href+record.get('dokumen_download');
        }else{
            link = record.get('dokumen_file');
        }

        iframe.load(link || view.getStore().create({}));
        info.down('#nama').setText(record.get('dokumen_nama'));
        info.down('#size').setText(record.get('dokumen_size'));
        info.down('#date').setText(record.get('dokumen_date'));
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: []
        });
    }
});