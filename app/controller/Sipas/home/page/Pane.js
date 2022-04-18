Ext.define('SIPAS.controller.Sipas.home.page.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.home.page.Pane'
    ],

    refs: [
        { ref: 'mainview',                          selector: 'sipas_home_page_pane' },
        { ref: 'pageContainer',                     selector: 'sipas_home_page_pane' },
        { ref: 'toolbarTask',                       selector: 'sipas_home_page_pane #toolbarTask' },
        { ref: 'btnNotif',                          selector: 'sipas_home_page_pane #buttonNotifications' },
        { ref: 'compAgendaBelumDiarahkan',          selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnArah'},
        { ref: 'compMasukBelumDidistribusi',        selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnDidistribusikan'},
        { ref: 'compKeluarBelumDikirim',            selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnDikirim'},
        { ref: 'compKeluarSiapNomor',               selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnSiapNomor'},
        { ref: 'compMasukInternalBaru',             selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnInternalBaru'},
        { ref: 'compMasukInternalTolak',            selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnInternalTolak'},
        { ref: 'compMasukInternalSlaTolak',         selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnInternalSlaTolak'},
        { ref: 'compMasukInternalUlasan',           selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnInternalUlasan'},
        { ref: 'compKeluarInternalSiapNomor',       selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnInternalSiapNomor'},
        { ref: 'compEksReminder7',                  selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnEksReminder7'},
        { ref: 'compEksReminder3',                  selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnEksReminder3'},
        { ref: 'compEksReminder1',                  selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnEksReminder1'},
        { ref: 'compIntReminder7',                  selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnIntReminder7'},
        { ref: 'compIntReminder3',                  selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnIntReminder3'},
        { ref: 'compIntReminder1',                  selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnIntReminder1'},
        { ref: 'compMasukReqBerkas',                selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnMasukReqBerkas'},
        { ref: 'compKeluarReqBerkas',               selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnKeluarReqBerkas'},
        { ref: 'compIMasukReqBerkas',               selector: 'sipas_home_page_pane sipas_com_menuitem_valueable#btnIntReqBerkas'},
        { ref: 'comNotif',                          selector: 'sipas_home_page_pane #comNotif'}
    ],

    messages: {
        'agmasuk_pengarahan'            : [null,'Anda mempunyai <span class="bold">{value} Registrasi Surat Masuk</span> Belum Diarahkan'],
        'agmasuk_pendistribusian'       : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Masuk</span> Belum Didistribusikan'],
        'agkeluar_blmekspedisi'         : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Keluar</span> Belum Dikirim'],
        'agkeluar_blmnomor'             : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Keluar</span> Siap Diberi Nomor'],
        'agmasukinternal_pending'       : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Masuk Internal</span> Baru'],
        'agmasukinternal_tolak'         : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Masuk Internal</span> Tertolak'],
        'agkaluarinternal_slatolak'     : [null,'Anda mempunyai <span class="bold">{value} Permintaan SLA yang</span> Ditolak'],
        'agkeluarinternal_ulasan'       : [null,'Anda mempunyai <span class="bold">{value} Ulasan</span> Baru'],
        'agkeluarinternal_blmnomor'     : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat keluar Internal</span> Siap Diberi Nomor'],
        'agmasuk_reminder_7'            : [null,'<span class="bold">{value} Agenda Surat Masuk Eksternal</span> Akan Berakhir Dalam 7 Hari'],
        'agmasuk_reminder_3'            : [null,'<span class="bold">{value} Agenda Surat Masuk Eksternal</span> Akan Berakhir Dalam 3 Hari'],
        'agmasuk_reminder_1'            : [null,'<span class="bold">{value} Agenda Surat Masuk Eksternal</span> Akan Berakhir Dalam 1 Hari'],
        'agmasukinternal_reminder_7'    : [null,'<span class="bold">{value} Agenda Surat Masuk Internal</span> Akan Berakhir Dalam 7 Hari'],
        'agmasukinternal_reminder_3'    : [null,'<span class="bold">{value} Agenda Surat Masuk Internal</span> Akan Berakhir Dalam 3 Hari'],
        'agmasukinternal_reminder_1'    : [null,'<span class="bold">{value} Agenda Surat Masuk Internal</span> Akan Berakhir Dalam 1 Hari'],
        'agmasuk_request_berkas'        : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Masuk Request Berkas Fisik</span> Untuk Dikonfirmasi'],
        'agkeluar_request_berkas'       : [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Keluar Request Berkas Fisik</span> Untuk Dikonfirmasi'],
        'agmasukinternal_request_berkas': [null,'Anda mempunyai <span class="bold">{value} Agenda Surat Masuk Internal Request Berkas Fisik</span> Untuk Dikonfirmasi']
    },

    stores: [
        'Sipas.notif.user.Combo'
    ],

    api:{
        event_page_close: 'sipas/page/close',
        event_page_launch: 'sipas/page/launch',
        news: 'server.php/sipas/notif_user/news'
    },

    notifIgnoreAlert: [
        'penyetujuan_surat_masuk',
        'penyetujuan_surat_keluar',
        'penyetujuan_surat_internal',
        'penyetujuan_surat_edaran',
        'penyetujuan_surat_konsep'
    ],

    componentMapGetter: {
        agmasuk_pengarahan          : 'getCompAgendaBelumDiarahkan',
        agmasuk_pendistribusian     : 'getCompMasukBelumDidistribusi',
        agkeluar_blmekspedisi       : 'getCompKeluarBelumDikirim',
        agkeluar_blmnomor           : 'getCompKeluarSiapNomor',
        agmasukinternal_pending     : 'getCompMasukInternalBaru',
        agmasukinternal_tolak       : 'getCompMasukInternalTolak',
        agkeluarinternal_slatolak   : 'getCompMasukInternalSlaTolak',
        agkeluarinternal_ulasan     : 'getCompMasukInternalUlasan',
        agmasuk_reminder_7          : 'getCompEksReminder7',
        agmasuk_reminder_3          : 'getCompEksReminder3',
        agmasuk_reminder_1          : 'getCompEksReminder1',
        agmasukinternal_reminder_7  : 'getCompIntReminder7',
        agmasukinternal_reminder_3  : 'getCompIntReminder3',
        agmasukinternal_reminder_1  : 'getCompIntReminder1',
        agkeluarinternal_blmnomor   : 'getCompKeluarInternalSiapNomor',
        agmasuk_request_berkas      : 'getCompMasukReqBerkas',
        agkeluar_request_berkas     : 'getCompKeluarReqBerkas',
        agmasukinternal_request_berkas : 'getCompIMasukReqBerkas',
        notif_user                  : 'getComNotif'
    },

    controllerMasuk : 'Sipas.masuk.agenda.Prop',
    controllerKeluar : 'Sipas.keluar.agenda.Prop',
    controllerIMasuk : 'Sipas.internal.masuk.agenda.Prop',
    controllerIKeluar : 'Sipas.internal.keluar.agenda.Prop',
    controllerIKeputusan : 'Sipas.internal.keputusan.agenda.Prop',

    // initBoot: 'Sipas.dasbor.Pane',
    allowDuplicate: false,
    duplicateIdentifier: 'xtype',
    maxPageCount: 10,

    valNotifUser: 0,
    valNewOpen: 1,

    init: function(application)
    {
        application.on({
            'sipas/page/dolaunch': this.onApp_DoPageLaunch,
            'sipas/page/boot': this.onApp_Boot,
            'sipas/home/ready': this.onApp_HomeReady,
            'sipas/session/notification/notify': this.onApp_Notify,
            scope: this
        });

        this.control({
            'sipas_home_page_pane': {
                afterrender: this.onMainview_AfterRender
            },
            'sipas_home_page_pane #toolbarHeader button[pageLauncher=true],sipas_home_page_pane #toolbarHeader button[popupLauncher=true]': {
                click: this.onPageAndPopupLauncher_Click
            },
            'sipas_home_page_pane #toolbarHeader button menu menuitem[pageLauncher=true],sipas_home_page_pane #toolbarHeader button menu menuitem[popupLauncher=true]': {
                click: this.onPageAndPopupLauncher_Click
            },
            'sipas_home_page_pane #comNotif': {
                select: this.onComboNotif_Select,
                expand: this.onComboNotif_Expand
            },
            'sipas_home_page_pane #toolbarHeader #buttonToogleSide': {
                afterrender: this.onButtonToogle_AfterRender,
                click: this.onButtonToogle_Click
            },
            'sipas_home_page_pane #toolbarHeader [followToggle=true]': {
                afterrender: this.onButtonFollowToogle_AfterRender
            },
            'sipas_home_page_pane #toolbarTask button[toggleGroup=sipas_home_page_page]': {
                toggle: this.onButtonTask_Toogle,
                click: this.onButtonTask_Click
            },
            'sipas_home_page_pane #toolbarTask button#buttonClose': {
                click: this.onButtonTaskClose_Click
            }
        });
    },

    onApp_DoPageLaunch: function(page)
    {
        this.pageLaunch(page);
    },

    onApp_HomeReady: function()
    {
        this.maxPageCount = this.getApplication().getMetadata('maxPageCount') || this.maxPageCount;
    },

    onApp_Boot: function(bootstrap, popup)
    {
        this.boot(bootstrap, popup);
    },

    onApp_Notify: function(data){
        data = data || {};
        
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            newValue = parseInt(data.newValue || 0),
            oldValue = parseInt(data.oldValue || 0);

        var button = this[this.componentMapGetter[data.name]] && this[this.componentMapGetter[data.name]]();
        if(data.name == 'notif_user' && data.newValue != 0){
            var cls = button.cls;
            // if(this.valNewOpen == 1){
            //     this.valNewOpen = 2;
            // }
            this.valNotifUser = data.newValue;
            if(cls == 'x-field-triggeronly-notif'){
                button.removeCls('x-field-triggeronly-notif');
                button.addCls('x-field-triggeronly-notif-unread');
            }
        }

        if(data.name == 'notif_user' && data.newValue == 0){
            var cls = button.cls;
            this.valNotifUser = data.newValue;
            if(cls == 'x-field-triggeronly-notif-unread'){
                button.removeCls('x-field-triggeronly-notif-unread');
                button.addCls('x-field-triggeronly-notif');
            }
        }

        if(button){
            button.setValue({badge:newValue});
            if(newValue && (newValue > 0) ){   

                // var tpl = $this.getMessage(data.name,{
                //     value: newValue
                // });

                // if(!Ext.Array.contains($this.notifIgnoreAlert, data.name))
                // {
                //     tpl && $helper.showNotification(tpl[0] || '', tpl[1] || '');
                //     $app.fireEvent('sipas/session/notification/notify/sound');
                // }
                // button.up('#buttonNotifications').addCls('x-menu-item-notext');
                // console.log(button.up('#buttonNotifications'));
                button.show();
            }
        }
    },

    pageLaunch: function(view, fn, scope) {
        var view = view || ( (view || {}).create && view.create() ) ;

        var $this = this,
            $app = $this.getApplication(),
            page = null,
            pageContainer = $this.getPageContainer();
    
        if(view instanceof Ext.Component){

            //////////////////////
            // VIEW PREPARATION //
            //////////////////////
            if(view.rendered)
            {
                view.getHeader && view.getHeader() && view.getHeader().hide();
                view.setBorder && view.setBorder(false);   
            }else{
                Ext.apply(view, {
                    header: false,
                    border: false
                });
            }
        
            // start logic duplicate
            if(!$this.allowDuplicate)
            {
                var found = null;
                Ext.each(pageContainer.getLayout().getLayoutItems(), function(item, i)
                {                 
                    var itemIdentifier = item.pageContent && item.pageContent[$this.duplicateIdentifier],
                        viewIdentifier = view[$this.duplicateIdentifier];

                    if(itemIdentifier == viewIdentifier){
                        found = item;
                        return false;
                    }
                });
                // debugger;
                if(found)
                {
                    if((found != view) && (view.rendered))
                    {
                        view.destroy();
                    }
                    page = found;
                    pageContainer.getLayout().setActiveItem(found);
                    Ext.callback(fn || Ext.emptyFn, scope || $this, [page]);
                    return page;
                }
            }
            // end logic duplicate

            //////////////////////
            // PAGE PREPARATION //
            //////////////////////

            // mask view on a panel called page
            var page = Ext.create('Ext.panel.Panel', {
                layout: 'fit',
                frame: true,
                title: view.title,
                // iconCls: view.iconCls || 'fam application',
                pageContent: view, // custom property 
                items: [],
                tools: [
                    {
                        type:'maximize',
                        callback: function(p){
                            p.fireEvent('maximize', p);
                        }
                    },
                    {
                        type: 'close',
                        callback: function(p){
                            p.close();
                        }
                    }
                ]
            });
            view.on({
                titlechange: function(v, newTitle, oldTitle, eOpts){
                    var title = (newTitle || "").replace(/\w\S*/g, function(txt){
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    page.setTitle(title);
                }
            });
            page.add(view);

            // listen new page for pages manipulation
            page.on({
                close: function(p)
                {
                    // return focus onto previous or next task
                    // get index current close page;
                    var l = pageContainer.getLayout(),
                        prev = l.getPrev(),
                        next = l.getNext(),
                        current = l.getActiveItem();

                    if(p == current)
                    {
                        // prev.locked or next.locked is mockupPane, so ignore it
                        if(prev && !prev.locked){
                            l.setActiveItem(prev);
                        }else if(next && !next.locked){
                            l.setActiveItem(next);
                        }
                    }
                }
            });

            // listen to page for view
            page.on({
                close: function(p){
                    $app.fireEvent($this.getApi('event_page_close'), page);
                },
                maximize: function(){
                    view.fireEvent('maximize', view);
                },
                restore: function(){
                    view.fireEvent('restore', view);
                }
            });

            // listen to page for window
            page.on({
                maximize: function()
                {
                    if(!page.win){
                        page.win = Ext.create('Ext.window.Window', {
                            layout: 'fit',
                            maximized: true,
                            modal: true,
                            closable: false, // prevent default close behavior
                            title: page.title,
                            iconCls: page.iconCls,
                            tools: [
                                {
                                    type:'restore',
                                    callback: function(w){
                                        page.fireEventArgs('restore', [page]);
                                        page.add(w.remove(view, false));
                                        w.hide(); // use hide for cache
                                    }
                                },
                                {
                                    type: 'close',
                                    callback: function(w){
                                        w.close();
                                        page.close();
                                    }
                                }
                            ]
                        });
                    }

                    page.win.show(); // show it first for bugfix error run layout
                    page.win.add(page.remove(view, false));
                },
                close: function(p)
                {
                    page.win && (!page.win.isDestroyed) && page.win.close();
                },
                titlechange: function(p, newTitle, oldTitle, eOpts)
                {
                    page.win && page.win.setTitle && page.win.setTitle(newTitle);
                }
            });
            
            // listen page for button
            page.on({
                afterrender: function(page)
                {
                    var barTask = $this.getToolbarTask();
                    var buttonTask = Ext.create('Ext.button.Split', {
                        enableToggle: true,
                        allowDepress: false,
                        toggleGroup: 'sipas_home_page_page',
                        iconCls: [page.iconCls].join(' '),
                        cls: ['arrow_cross', 'x-btn-compact'].join(' '),
                        page: page,
                        text: page.title,
                        maxWidth: 200,
                        pressed: true,
                        arrowHandler: function(btn){
                            btn.page && btn.page.close();
                        }
                    });
                    page.buttonTask = buttonTask;
                    barTask.add(buttonTask);
                },
                close: function()
                {
                    page.buttonTask && page.buttonTask.hide().destroy();
                },
                activate: function()
                {
                    page.buttonTask && page.buttonTask.toggle(true);
                },
                deactivate: function()
                {
                    page.buttonTask && page.buttonTask.toggle(false);
                },
                titlechange: function(p, newTitle, oldTitle, eOpts)
                {
                    page.buttonTask && page.buttonTask.setTitle && page.buttonTask.setTitle(newTitle);
                }
            });

            ////////////////////
            // PAGE ATTACHING //
            ////////////////////
            pageContainer.body.mask('Memuat halaman');

            if($this.maxPageCount <= 0)
            {
                pageContainer.add(page);
            }
            else
            {
                var count = pageContainer.getLayout().getLayoutItems().length,
                    firstCard = pageContainer.getLayout().getLayoutItems()[0];

                if(count == $this.maxPageCount){
                    firstCard.close();               
                }
                pageContainer.add(page);
            }

            pageContainer.body.unmask();
            pageContainer.getLayout().setActiveItem(page);
        }

        $app.fireEvent($this.getApi('event_page_launch'), page);
        Ext.callback(fn || Ext.emptyFn, scope || $this, [page]);

        return page;
    },

    boot: function(boot, popup)
    {
        var $this = this,
            args = [],
            bootstrap = boot.split('@'),
            controller = $this.getController(bootstrap[0]),
            controller_fn = bootstrap[1] || 'launch',
            view;

        if(!controller) return;

        view = Ext.callback(controller[controller_fn] || Ext.emptyFn, controller, []);

        if(!view) return;

        if(view instanceof Ext.window.Window){
            view.show();
        }else if (view instanceof Ext.Component){
            $this.pageLaunch(view);
        }
        return view;
    },

    onMainview_AfterRender: function(component, e, eOpts)
    {
        this.initBoot && this.boot(this.initBoot);
    },

    onPageAndPopupLauncher_Click: function(button, e, eOpts)
    {
        this.getApplication().fireEvent('sipas/page/boot', button.bootstrap, button.popupLauncher);
    },

    onButtonToogle_AfterRender: function(component)
    {
        this.getApplication().on({
            'sipas/home/side/collapse': function(){
                component.toogle(true);
            },
            'sipas/home/side/expand': function(){
                component.toogle(true);
            }
        });
    },

    onButtonFollowToogle_AfterRender: function(component)
    {
        this.getApplication().on({
            'sipas/home/side/collapse':function(){
                component.show()
            },
            'sipas/home/side/expand':function(){
                component.hide();
            }
        });
    },

    onButtonToogle_Click: function(button, e, eOpts)
    {
        if(button.toogled){
            this.getApplication().fireEvent('sipas/home/side/expand');
        }else{
            this.getApplication().fireEvent('sipas/home/side/collapse');
        }
    },

    onButtonTask_Toogle: function(button, pressed, eOpts)
    {
        if(!button.iconCls) return;
        if(pressed){
            // button.setIconCls('fam application');
        }else{
            // button.setIconCls('fam application_osx');
        }
    },

    onButtonTask_Click: function(button, pressed, eOpts)
    {
        var mainview = this.getMainview({from:button}),
            pageContainer = mainview;
        
        button.page && pageContainer && pageContainer.getLayout().setActiveItem(button.page);
    },

    onButtonTaskClose_Click: function(button, e, eOpts)
    {
        var mainview = this.getMainview({from:button}),
            pageContainer = mainview;

        if(!pageContainer) return;

        var pages = pageContainer.getLayout().getLayoutItems(); // exclude mockuppane for bugfix
        Ext.Array.each(pages, function(item, i){
            Ext.defer(function(){
                item.close();
            }, ( i + 1) * 200)
        }, this, true);
    },

    onComboNotif_Expand: function(combo, eOpts){
        var $app = this.getApplication(),
            $session = $app.getSession(),
            staf_id = $session.getProfileId(),
            params = {
                'id' : staf_id
            };
        if(this.valNewOpen == 0){
            combo.getStore().reload();
        }else{
            this.valNewOpen = 0;
        }
        if(this.valNotifUser != 0){
            // Ext.Ajax.request({
            //     url: this.getApi('news'),
            //     params: params,
            //     success: function(response, eOpts){
            //     }
            // });
            combo.removeCls('x-field-triggeronly-notif-unread');
            combo.addCls('x-field-triggeronly-notif');
            this.valNotifUser = 0;
        }
    },

    onComboNotif_Select: function(combo, selection, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            staf_id = $session.getProfileId(),
            record = selection[0],
            controllerMasuk = $this.getController($this.controllerMasuk),
            controllerKeluar = $this.getController($this.controllerKeluar),
            controllerIMasuk = $this.getController($this.controllerIMasuk),
            controllerIKeluar = $this.getController($this.controllerIKeluar);
            controllerIKeputusan = $this.getController($this.controllerIKeputusan);
            
        if(record.get('notif_user_isbaca') === 0){
            record.reading({
                staf: staf_id,
                id: record.get('notif_user_id'),
                callback: function(staf, operation, success){
                    if(success){
                    }
                }
            });
        }
        if(record.get('notif_user_tipe') == 1){
            record.getSurat(function(surat){
                if(surat.get('surat_model') === surat.self.modelType().MODEL_MASUK){
                    controllerMasuk.launch({
                        propType: 'masuk',
                        unit: null,
                        model: surat.self.modelType().MODEL_MASUK,
                        mode:'view',
                        record: surat,
                        callback: function(){
                            // $this.refresh(view);
                        }
                    });
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_KELUAR){
                    controllerKeluar.launch({
                        propType: 'keluar',
                        unit: null,
                        model: surat.self.modelType().MODEL_KELUAR,
                        mode:'view',
                        record: surat,
                        callback: function(){
                            // $this.refresh(view);
                        }
                    });
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_IMASUK){
                    controllerIMasuk.launch({
                        propType: 'imasuk',
                        unit: surat.get('surat_unit'),
                        model: surat.self.modelType().MODEL_IMASUK,
                        mode:'view',
                        record: surat,
                        callback: function(){
                            // $this.refresh(view);
                        }
                    });
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_IKELUAR){
                    controllerIKeluar.launch({
                        propType: 'ikeluar',
                        unit: surat.get('surat_unit'),
                        model: surat.self.modelType().MODEL_IKELUAR,
                        mode:'view',
                        record: surat,
                        callback: function(){
                            // $this.refresh(view);
                        }
                    });
                }else if(surat.get('surat_model') === surat.self.modelType().MODEL_KEPUTUSAN){
                    controllerIKeputusan.launch({
                        propType: 'keputusan',
                        unit: surat.get('surat_unit'),
                        model: surat.self.modelType().MODEL_KEPUTUSAN,
                        mode:'view',
                        record: surat,
                        callback: function(){
                            // $this.refresh(view);
                        }
                    });
                }
            })
        }else{
             this.getApplication().fireEvent('sipas/page/boot', 'Sipas.session.notification.List', false);
             combo.reset();
        }
    }   

});
