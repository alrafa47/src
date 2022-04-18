Ext.define('SIPAS.controller.Sipas.arsip.Pane', {
    extend: 'SIPAS.controller.Sipas.base.View',

    controllers: [
        'Sipas.arsip.pane.AddComponent',
        'Sipas.arsip.pane.ItemComponent'
    ],

    models: [
        'Sipas.Arsip'
    ],

    stores: [
        'Sipas.arsip.ListAbstract'
    ],

    views: [
        'Sipas.arsip.Pane',
        'Sipas.Viewer'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_arsip_pane'},
        { ref: 'form',              selector: 'sipas_arsip_pane form'},
        { ref: 'txtArahan',         selector: 'sipas_arsip_pane #reuploadWarning'},
        { ref: 'list',              selector: 'sipas_arsip_pane dataview'},
        { ref: 'buttonMenu',        selector: 'sipas_arsip_pane #buttonMenuArsip'},
        { ref: 'buttonHapus',       selector: 'sipas_arsip_pane #buttonHapus'},
        { ref: 'buttonEdit',        selector: 'sipas_arsip_pane #buttonEdit'}

    ],

    api: {
        'auth'  : 'server.php/sipas/arsip/arsip_auth/',
        'upload': 'server.php/sipas/dokumen/create/dokumen'
    },

    messages: {
        upload_success: 'Upload berhasil',
        upload_failed:  'Upload gagal'
    },

    defaultStore: 'Sipas.arsip.ListAbstract',
    controllerViewerPopup: 'Sipas.dokumen.viewer.Popup',
    viewerPopup: 'Sipas.dokumen.viewer.Popup',
    viewViewer: 'Sipas.Viewer',
    modelSurat: 'Sipas.Surat',

    init: function(application) {
        this.control({
            'sipas_arsip_pane' : {
                load: this.onMainview_Load,
                doshowall: this.onMainview_DoShowAll,
                doreload: this.onMainview_DoReload
            },
            'sipas_arsip_pane dataview' : {
                itemdblclick: this.onList_DblClick,
                itemclick: this.onList_ItemClick,
                itemcontextmenu: this.onList_ItemContextMenu
            },
            'sipas_arsip_pane > toolbar button[action]' : {
                click: this.onMainview_Action
            }
        }); 
    },

    onMainview_Load: function(mainview, surat, arsip, rahasia, mode, staf, penerima){
        var $this    = this,
            store    = arsip && arsip.fetchDokumen(),
            dataview = mainview.down('dataview'),
            $app     = $this.getApplication(),
            $helper  = $app.Helper(),
            list     = $this.getList({root:mainview}),
            $session = $app.getSession(),
            $language= $app.Language(),
            txtArahan= $this.getTxtArahan({root:mainview}),
            profile  = $session.getProfile();

        if (mode == 'add_disposisi'){
            if (surat.get('surat_model') == 1 || surat.get('surat_model') == 2) {
                var buktiArahan = $language.getGrammar('bukti_arahan_eks', false);
            } else {
                var buktiArahan = $language.getGrammar('bukti_arahan_int', false);
            }
            
            txtArahan && txtArahan.setValue(buktiArahan);
        }

        // if (mainview.isSession){
        //     $helper.hideComponent({
        //         parent: mainview,
        //         items: {
        //             '#buttonHapus': true,
        //             '#berkasSeparator': true,
        //             '#buttonEdit': true,
        //             '#buttonHistory': true
        //         }
        //     });
        // }

        // var scroller = list.getScrollable().getScroller();
        // scroller.on('scrollend', 'onScrollEnd', this);

        // debugger;

        if(rahasia){
            mainview.setLoading(true);
            Ext.Ajax.request({
                url: $this.getApi('auth'),
                params: {
                    'surat_id': surat && surat.get('surat_id'),
                    'staf_id' : profile.staf_id
                    // 'jabatan_id' : profile.jabatan_id
                },
                success: function(response, eOpts){
                    var objres = Ext.decode(response.responseText, 1) || {};
                    mainview.setLoading(false);
                    
                    if(objres.allowed){
                        mainview.arsip = arsip;
                        mainview.surat = surat;
                        mainview.mode = mode;
                        mainview.staf = staf;
                        if (surat && surat.get('surat_model') == 3) {
                            if (!penerima) {
                                store.getProxy().api.read = 'server.php/sipas/dokumen/read_docs_kolektif?mode=surat&unit='+surat.get('surat_unit')+'&model_sub='+surat.get('surat_model_sub');
                                store && dataview.bindStore(store);
                            }else{
                                store.getProxy().api.read = 'server.php/sipas/dokumen/read_docs_kolektif?mode=disposisi&unit='+surat.get('surat_unit')+'&staf='+penerima;
                                store && dataview.bindStore(store);
                            }
                        }else{
                            store.getProxy().api.read = 'server.php/sipas/dokumen/read';
                            store && dataview.bindStore(store);
                        }

                        store && store.reload({
                            callback: function(record, operation, success){
                                // mainview.setLoading(false);
                            }
                        });
                    }else{
                        dataview.emptyText = 'Berkas rahasia';
                        dataview.getStore().reload({
                            callback: function(record, operation, success){
                                // mainview.setLoading(false);
                            }
                        });
                    }
                }
            });
        }else{
            if(!store){ dataview.emptyText = 'Berkas Surat';}
            mainview.arsip = arsip;
            mainview.surat = surat;
            mainview.mode = mode;  
            mainview.staf = staf;  

            if (surat && surat.get('surat_model') == 3) {
                if (!penerima) {
                    store.getProxy().api.read = 'server.php/sipas/dokumen/read_docs_kolektif?mode=surat&unit='+surat.get('surat_unit')+'&model_sub='+surat.get('surat_model_sub');
                    store && dataview.bindStore(store);
                    store && store.removeAll();
                }else{
                    store.getProxy().api.read = 'server.php/sipas/dokumen/read_docs_kolektif?mode=disposisi&unit='+surat.get('surat_unit')+'&staf='+penerima;
                    store && dataview.bindStore(store);
                    store && store.removeAll();
                }
            }else{
                store.getProxy().api.read = 'server.php/sipas/dokumen/read';
                store && dataview.bindStore(store);
                store && store.removeAll();
            }

            mainview.setLoading(true);
            store && store.reload({
                callback: function(record, operation, success){
                    // mainview.setLoading(false);
                }
            });
            mainview.setLoading(false);
            // store.getProxy().startParam =0;
            // store && store.loadPage(1);
        }
        // this.loadNextPage();
        // if(mode == 'view'){
            // store.nextPage({
            //   addRecords: true
            // });
        // }
    },

    onMainview_Unload: function(mainview)
    {
        mainview.record = null;
        mainview.down('dataview').store = null;
    },

    onMainview_DoShowAll: function(mainview)
    {
        this.getController(this.controllerViewerPopup).launch({
            mode: 'view',
            reference: mainview.record
        });
    },

    onMainview_DoReload: function(mainview)
    {
        var list = this.getList({root:mainview}),
            store = list.getStore();
            
        mainview.setLoading(true);
        store.reload({
            callback: function(record, operation, success){
                mainview.setLoading(false);
            }
        });
    },
 
    onList_DblClick: function( dataview, record, item, index, e, eOpts )
    {
        var mainview = this.getMainview({from:dataview});
        mainview.fireEvent('doitemopen', mainview, record);
    },

    onList_ItemClick: function( dataview, record, item, index, e, eOpts )
    {   
        var $this = this,
            mainview = $this.getMainview({from:dataview}),
            surat = mainview.surat,
            mode = mainview.mode,
            staf = mainview.staf,
            $helper = $this.getApplication().Helper(),
            buttonMenu = $this.getButtonMenu({root:mainview}),
            buttonHapus = $this.getButtonHapus({root:mainview}),
            buttonEdit = $this.getButtonEdit({root:mainview}),
            menu = buttonMenu && buttonMenu.menu;

        if(mode === 'add_disposisi'){
            if(record.get('dokumen_disposisi') === 1){
                if (staf === record.get('dokumen_buat_staf')) {
                    buttonHapus && buttonHapus.setDisabled(false);
                    buttonEdit && buttonEdit.setDisabled(false);
                } else {
                    buttonHapus && buttonHapus.setDisabled(true);
                    buttonEdit && buttonEdit.setDisabled(true);
                }
            }else{
                buttonHapus && buttonHapus.setDisabled(true);
                buttonEdit && buttonEdit.setDisabled(true);
             }
        }

        if(record.get('dokumen_reupload') === 1){
            if(mode === 'lihat' || mode === 'bank'){
                $helper.hideComponent({
                    parent: mainview,
                    items:{
                        '#buttonEdit' : true,
                        '#buttonHapus' : true
                    }
                });
            }else{
                $helper.hideComponent({
                    parent: mainview,
                    items:{
                        '#buttonEdit' : false,
                        '#buttonHapus' : false
                    }
                });
            }
        }else{
            if(mode === 'view' || mode === 'lihat' || mode === 'bank'){
                $helper.hideComponent({
                    parent: mainview,
                    items:{
                        '#buttonEdit' : true,
                        '#buttonHapus' : true
                    }
                });
            }else{
                $helper.hideComponent({
                    parent: mainview,
                    items:{
                        '#buttonEdit' : false,
                        '#buttonHapus' : false
                    }
                });
            }
        }
        if(menu){
            menu.record = record;
            menu.showBy(item);
        }
    },

    onList_ItemContextMenu: function( dataview, record, item, index, e, eOpts )
    {
        e.preventDefault();
        
        dataview.fireEventArgs('itemclick', arguments);
    }
});
