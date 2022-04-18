Ext.define('SIPAS.controller.Sipas.arsip.preview.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    models: [
        'Sipas.Dokumen'
    ],

    views: [
        'Sipas.arsip.preview.Popup'
    ],
    
    refs: [
        {ref: 'mainview',       selector: 'sipas_arsip_preview_popup'},
        {ref: 'dataview',       selector: 'sipas_arsip_preview_popup #panelist #listPreview'},
        {ref: 'cmpeditor',      selector: 'sipas_arsip_preview_popup #panepreview #cmpeditor'},
        {ref: 'cmppreview',     selector: 'sipas_arsip_preview_popup #panepreview #cmppreview'},
        {ref: 'cmppreviews',    selector: 'sipas_arsip_preview_popup #panepreview #cmppreviews'},
        {ref: 'cmplink',        selector: 'sipas_arsip_preview_popup #panepreview #cmplink'},
        {ref: 'panepenerima',   selector: 'sipas_arsip_preview_popup #panepenerima'},
        {ref: 'iframe',         selector: 'sipas_arsip_preview_popup #panepreview #iframe'},
        {ref: 'urllink',        selector: 'sipas_arsip_preview_popup #panepreview #cmplink [name=dokumen_file]'}
    ],

    api: {
        view         : 'server.php/sipas/dokumen/view?id={dokumen_id}',
        read         : 'server.php/sipas/surat_penerimask/penerima_list?id={id}',
        preview_sdoc : 'server.php/sipas/dokumen/preview_sdoc?id={id}&surat={surat}&staf={staf}',
        download     : 'server.php/sipas/dokumen/download?id={dokumen_id}'
    },

    init: function(application)
    {
        this.control({
            'sipas_arsip_preview_popup' : {
                afterrender: this.onMainview_AfterRender
            },
            'sipas_arsip_preview_popup #panelist #listPreview': {
                itemclick: this.onDataview_ItemClick
            },
            'sipas_arsip_preview_popup #panepreview #cmplink #buttonOpenLink': {
                click: this.onOpenLink_Click
            },
            'sipas_arsip_preview_popup #panepenerima': {
                select: this.onPenerima_Select
            },
            'sipas_arsip_preview_popup #panepreview #cmppreview #btndownload': {
                click: this.onDownload_Click
            }
        });
    },

    launch: function(config)
    {
        config = Ext.apply({
            surat: null,
            arsip: null,
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            view = null;

        view = this.createView((function(c){
            return c;
        })(config));

        view.show();
    },

    onMainview_AfterRender: function(view)
    {        
        var $this = this,
            $helper = $this.getApplication().Helper(),
            dataview = $this.getDataview({root:view}),
            arsip = view.arsip,
            record = view.record,
            surat = view.surat,
            docs = arsip.fetchDokumen(),
            extension = record.get('dokumen_ext');
            
        dataview.bindStore(docs);
        dataview.getSelectionModel().select(record);
        view.setTitle('Preview Dokumen - ' + record.get('dokumen_nama'));

        switch(extension){
            case '.link' :
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#cmpeditor' : true,
                        '#cmppreview' : true,
                        '#cmplink' : false,
                        '#panepenerima' : true
                    }
                });

                $this.onLink_Load(view, record);
            break;
            case '.sdoc' :
                if (record.get('dokumen_ispetikan') == 1) {
                    if (surat.get('surat_model_sub') == 1) { /* perorangan */
                        $this.onListPenerima_Load(view, record, function(penerima){
                            $this.onSdoc_Load(view, record, penerima[0].surat_penerimask_staf);
                        });                        

                        $helper.hideComponent({
                            parent: view,
                            items:{
                                '#cmpeditor' : false,
                                '#cmppreview' : true,
                                '#cmplink' : true,
                                '#panepenerima' : true
                            }
                        });
                    }else if (surat.get('surat_model_sub') == 2) { /* kolektif */
                        $this.onSdoc_Load(view, record);
                        $this.onListPenerima_Load(view, record);

                        $helper.hideComponent({
                            parent: view,
                            items:{
                                '#cmpeditor' : false,
                                '#cmppreview' : true,
                                '#cmplink' : true,
                                '#panepenerima' : false
                            }
                        });
                    }
                }else{
                    $this.onSdoc_Load(view, record);

                    $helper.hideComponent({
                        parent: view,
                        items:{
                            '#cmpeditor' : false,
                            '#cmppreview' : true,
                            '#cmplink' : true,
                            '#panepenerima' : true
                        }
                    });
                }
            break;
            default:
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#cmpeditor' : true,
                        '#cmppreview' : false,
                        '#cmplink' : true,
                        '#panepenerima' : true
                    }
                });

                $this.onImage_Load(view, record);
            break;
        }
    },

    onListPenerima_Load: function(view, record, callback){
        var $this = this,
            cmp = $this.getPanepenerima({root:view}),
            store = cmp.getStore(),
            surat = view.surat;

        cmp.setLoading(true);       
        Ext.Ajax.request({
            url: $this.getApi('read', {id : surat.get('surat_id')}),
            callback: function(options, success, response){
                var recs = Ext.decode(response.responseText, true) || {};
                store.removeAll();
                store.add(recs);
                cmp.setLoading(false);

                Ext.callback(callback, null, [recs]);
            }
        });
    },

    onLink_Load: function(view, record){
        var $this = this,
            link = $this.getCmplink({root:view});

        link.loadRecord(record);
    },

    onSdoc_Load: function(view, record, penerima){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            editor = $this.getCmpeditor({root:view}),
            surat = view.surat,
            dokumen_id = record.get('dokumen_id'),
            surat_id = surat.get('surat_id'),
            model = surat.get('surat_model'),
            file = record.get('dokumen_file'),
            value = Ext.util.Format.htmlDecode(atob(file)),
            staf_id = '';

        if (penerima) staf_id = penerima;

        editor.setLoading(true);
        Ext.Ajax.request({
            url: $this.getApi('preview_sdoc', {id:dokumen_id, surat:surat_id, staf:staf_id}),
            callback: function(options, success, response){
                var rec = Ext.decode(response.responseText, true) || {};
                
                switch(model){
                    case 1:
                        if(surat.get('surat_distribusi_tgl')){
                            rec = value;
                        }else{
                            rec = '<div class="draft-state"></div>'+rec;
                        }
                    break;

                    case 2:
                    case 4:
                        if(surat.get('surat_setuju') == 2){
                            rec = value;
                        }else{
                            rec = '<div class="draft-state"></div>'+rec;
                        }
                    break;

                    case 3: 
                        rec = value;

                        $helper.hideComponent({
                            parent: view,
                            items:{
                                '#panepenerima' : true
                            }
                        });   
                    break;
                
                    case 6:
                        if((surat.get('surat_model_sub') == 2 && surat.get('surat_petikan_setuju') == 2 && surat.get('surat_distribusi_tgl')) || (surat.get('surat_model_sub') == 1 && surat.get('surat_setuju') == 2 && surat.get('surat_distribusi_tgl'))){
                            rec = value;

                            if(record.get('dokumen_ispetikan') == 1){
                                $helper.hideComponent({
                                    parent: view,
                                    items:{
                                        '#panepenerima' : true
                                    }
                                });   
                            }
                        }else{
                            rec = '<div class="draft-state"></div>'+rec;
                            
                            if(record.get('dokumen_ispetikan') == 1){
                                if (surat.get('surat_model_sub') == 1) { /* perorangan */
                                    $helper.hideComponent({
                                        parent: view,
                                        items:{
                                            '#panepenerima' : true
                                        }
                                    });   
                                }else{
                                    $helper.hideComponent({
                                        parent: view,
                                        items:{
                                            '#panepenerima' : false
                                        }
                                    });   
                                }
                            }
                        }      
                    break;
                }

                editor.setValue(rec);
                editor.setLoading(false);
            }
        });
    },

    onImage_Load: function(view, record){
        var $this = this, 
            $helper = $this.getApplication().Helper(),
            iframe  = $this.getIframe({root:view}),
            pane  = $this.getCmppreview({root:view}),
            panes  = $this.getCmppreviews({root:view}),
            previewAble = record.get('dokumen_preview'),        
            extension = record.get('dokumen_ext'),
            download = $this.getApi('download', {dokumen_id:record.getId()}),
            link = '';

        if(extension === '.pdf' || previewAble !== null || extension === '.gif'){
            link = window.location.href+$this.getApi('view', {dokumen_id:record.getId()});

            if (extension === '.pdf') {
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#btnzoom' : true,
                        '#btnzoomin' : true,
                        '#btnzoomout' : true,
                        '#btncetak' : true,
                        '#btndownload' : true,
                        '#toolbarControl' : true
                    }
                });
            }else{
               $helper.hideComponent({
                    parent: view,
                    items:{
                        '#btnzoom' : false,
                        '#btnzoomin' : false,
                        '#btnzoomout' : false,
                        '#btncetak' : false,
                        '#btndownload' : false,
                        '#toolbarControl' : false
                    }
                }); 
            }
        }else{
            $helper.hideComponent({
                parent: view,
                items:{
                    '#toolbarControl' : true
                }
            });
            
            link = 'https://docs.google.com/gview?url='+window.location.href+$this.getApi('download', {dokumen_id:record.getId()})+'&embedded=true';
        }

        iframe.load(link);
    },

    onDataview_ItemClick: function(cmp, record, item, index, e, eOpts)
    {
        var $this = this,
            view = $this.getMainview({from:cmp}),
            $helper = $this.getApplication().Helper(),
            iframe  = $this.getIframe({root:view}),
            extension = record.get('dokumen_ext');

        switch(extension){
            case '.link' :
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#cmpeditor' : true,
                        '#cmppreview' : true,
                        '#cmplink' : false,
                        '#panepenerima' : true
                    }
                });

                $this.onLink_Load(view, record);
            break;
            case '.sdoc' :
                $this.onSdoc_Load(view, record);

                if (record.get('dokumen_ispetikan') == 1) {
                    $helper.hideComponent({
                        parent: view,
                        items:{
                            '#cmpeditor' : false,
                            '#cmppreview' : true,
                            '#cmplink' : true,
                            '#panepenerima' : false
                        }
                    });

                    $this.onListPenerima_Load(view, record);
                }else{
                    $helper.hideComponent({
                        parent: view,
                        items:{
                            '#cmpeditor' : false,
                            '#cmppreview' : true,
                            '#cmplink' : true,
                            '#panepenerima' : true
                        }
                    });
                }
            break;
            default:
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#cmpeditor' : true,
                        '#cmppreview' : false,
                        '#cmplink' : true,
                        '#panepenerima' : true
                    }
                });

                $this.onImage_Load(view, record);
            break;
        }

        view.setTitle('Preview Dokumen - ' + record.get('dokumen_nama'));
    },

    onOpenLink_Click: function(mainview)
    {
        var view = this.getMainview({from:mainview}),
            link = this.getUrllink({root:view}),
            urlLink = link.getValue();

        if(this.validateLink(urlLink))
        {
            if (urlLink.indexOf("http://") >= 0 || urlLink.indexOf("https://") >= 0)
            {
                window.open(urlLink, '_blank');
            } else {
                window.open('http://'+urlLink, '_blank');
            }
        }
    },

    validateLink: function(link)
    {
        var urlReg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if( urlReg.test(link) )
        {
            return true;
        }

        var $helper = this.getApplication().Helper(),
            msg = this.getMessage('invalidlink');

        $helper.showMessage({title:msg[0], message:msg[1]});

        return false;
    }, 

    onPenerima_Select: function(cmp, record, eOpts){
        var $this = this,
            view = $this.getMainview({from:cmp}),
            penerima = record.get('surat_penerimask_staf'),
            dataview = $this.getDataview({root:view}),
            dokumen = dataview.getSelectionModel().getSelection()[0];

        $this.onSdoc_Load(view, dokumen, penerima);
    },

    onDownload_Click: function(cmp, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:cmp}),
            dataview = $this.getDataview({root:view}),
            record = dataview.getSelectionModel().getSelection()[0];

        if(record){
            window.open(location.href+$this.getApi('download', {dokumen_id:record.get('dokumen_id')}), '_blank');
        }
    }
});
