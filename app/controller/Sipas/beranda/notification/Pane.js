Ext.define('SIPAS.controller.Sipas.beranda.notification.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.beranda.board.notification.Pane'
    ],
    
    models:[
        'Sipas.beranda.Notification'
    ],

    stores: [
        'Sipas.beranda.notification.List'
    ],

    refs: [
        {ref: 'mainview', selector: 'sipas_beranda_board_notification_pane'},
        {ref: 'dataview', selector: 'sipas_beranda_board_notification_pane > dataview'}
    ],

    storeNotification: 'Sipas.beranda.notification.List',    

    controllerSessionMasuk: 'Sipas.masuk.session.Prop',
    controllerSessionKonsep: 'Sipas.keluar.agenda.Prop',
    controllerSessionInternal: 'Sipas.internal.keluar.agenda.Prop',
    controllerSessionKeputusan: 'Sipas.internal.keputusan.agenda.Prop',
    controllerSessionDraft: 'Sipas.koreksi.session.Prop',
    controllerSessionStaf: 'Sipas.disposisi.session.Prop',

    modelKoreksiPenerima : 'Sipas.koreksi.Masuk',
    modelDisposisiPenerima : 'Sipas.disposisi.Masuk',

    init: function(application) {
        this.control({
            "sipas_beranda_board_notification_pane > toolbar sipas_com_button_refresh": {
                click: this.onButtonRefreshNotif_Click
            },
            "sipas_beranda_board_notification_pane": {
                itemclick: this.onGridpanel_ItemDblClick
            }
        });
    },

    onButtonRefreshNotif_Click: function(button, e, eOpts) {
        
        var mainview = this.getMainview({from:button});
        this.refresh(mainview);
    },

    refresh: function(mainview) {
        mainview.getStore().reload();
    },

    onGridpanel_ItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from: dataview}),
            dataview = $this.getDataview({root:view}),
            controllerSessionMasuk = $this.getController($this.controllerSessionMasuk),
            controllerSessionStaf = $this.getController($this.controllerSessionStaf),
            controllerSessionDraft = $this.getController($this.controllerSessionDraft),
            controllerSessionInternal = $this.getController($this.controllerSessionInternal),
            controllerSessionKeputusan = $this.getController($this.controllerSessionKeputusan),
            controllerSessionKonsep = $this.getController($this.controllerSessionKonsep),
            statusDisposisiProto = $this.getModel(this.modelDisposisiPenerima).create({}),
            statusKoreksiProto = $this.getModel(this.modelKoreksiPenerima).create({}),
            refRecord = record;
            
        if(refRecord.get('notification_kelompok_kode') == 'masuk'){
            refRecord.getDisposisi(function(record){
                
                if(!record) return;
                
                record.reading();
                controllerSessionStaf.launch({
                    mode: 'edit',
                    record: record,
                    callback: function(success, record){
                        $this.refresh(dataview);
                    }
                });
            });           
        }
        else if(refRecord.get('notification_kelompok_kode') == 'disposisi'){
            refRecord.getDisposisi(function(record){
                
                if(!record) return;
                
                record.reading();
                controllerSessionStaf.launch({
                    mode: 'edit',
                    record: record,
                    callback: function(success, record){
                        $this.refresh(dataview);
                    }
                });
            });           
        }
        else if(refRecord.get('notification_kelompok_kode') == 'notadinas'){
            refRecord.getDisposisi(function(record){
                
                if(!record) return;
                
                record.reading();
                controllerSessionStaf.launch({
                    mode: 'edit',
                    record: record,
                    callback: function(success, record){
                        $this.refresh(dataview);
                    }
                });
            });           
        }
        else if(refRecord.get('notification_kelompok_kode') == 'koreksi'){
            refRecord.getKoreksiMasuk(function(record){
                
                if(!record) return;
                
                record.reading();
                controllerSessionDraft.launch({
                    mode: 'edit',
                    record: record,
                    callback: function(success, record){
                        $this.refresh(dataview);
                    }
                });
            });
        }else if(refRecord.get('notification_kelompok_kode') == 'koreksi_status'){
            refRecord.getKoreksi(function(record){
                if(!record) return;
                record.reading();
                record.getSurat(function(surat){
                    if(surat.isIKeluar()){
                        // surat.getInternal(function(record){
                            if(!record) return;       
                            // record.reading();
                            controllerSessionInternal.launch({
                                mode: 'lihat',
                                record: surat,
                                propType: 'ikeluar',
                                model: surat.self.modelType().MODEL_IKELUAR,
                                callback: function(success, surat){
                                    $this.refresh(dataview);
                                }
                            // });
                        });
                    }else if(surat.isKeluar()){
                        // surat.getKonsep(function(record){
                            if(!record) return;       
                            // record.reading();
                            controllerSessionKonsep.launch({
                                mode: 'lihat',
                                record: surat,
                                propType: 'keluar',
                                model: surat.self.modelType().MODEL_KELUAR,
                                callback: function(success, surat){
                                    $this.refresh(dataview);
                                }
                            // });
                        });
                    }else if(surat.isKeputusan()){
                        // surat.getInternal(function(record){
                            if(!record) return;       
                            // record.reading();
                            controllerSessionKeputusan.launch({
                                mode: 'lihat',
                                record: surat,
                                propType: 'keputusan',
                                model: surat.self.modelType().MODEL_KEPUTUSAN,
                                callback: function(success, surat){
                                    $this.refresh(dataview);
                                }
                            // });
                        });
                    }
                });
            });
        }
    }
});