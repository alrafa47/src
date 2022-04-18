Ext.define('SIPAS.controller.Sipas.disposisi.riwayat.cabut.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.disposisi.riwayat.detail.penerima.List'
    ],
    
    views: [
        'Sipas.disposisi.riwayat.cabut.Popup'
    ],

    models: [
        'Sipas.Disposisi',
        'Sipas.disposisi.Masuk'
    ],

    stores: [
        'Sipas.perintah.Combo',
        'Sipas.disposisi.riwayat.cabut.List'
    ],

    messages: {
        'retract_confirm'   : ['Konfirmasi','Disposisi yang direvisi tidak bisa dibatalkan.<br/>Apakah anda yakin untuk melanjutkan ?'],
        'retracting'        : 'Memproses Revisi',
        'retract_failure'   : 'Gagal Merevisi Disposisi. Disposisi tidak tersedia.',
        'retract_success'   : 'Berhasil merevisi Disposisi.'
    },

    refs: [
        { ref: 'mainview',              selector: 'sipas_disposisi_riwayat_cabut_popup' },
        { ref: 'form',                  selector: 'sipas_disposisi_riwayat_cabut_popup > form' },
        { ref: 'text',                  selector: 'sipas_disposisi_riwayat_cabut_popup > form #text' },
        { ref: 'compSurat',             selector: 'sipas_disposisi_riwayat_cabut_popup sipas_com_surat_pane'},
        { ref: 'unread',                selector: 'sipas_disposisi_riwayat_cabut_popup #unread'},
        { ref: 'unreadDetail',          selector: 'sipas_disposisi_riwayat_cabut_popup #unreadDetail'},
        { ref: 'all',                   selector: 'sipas_disposisi_riwayat_cabut_popup #all'},
        { ref: 'allDetail',             selector: 'sipas_disposisi_riwayat_cabut_popup #allDetail'},
        { ref: 'nested',                selector: 'sipas_disposisi_riwayat_cabut_popup #nested'},
        { ref: 'nestedDetail',          selector: 'sipas_disposisi_riwayat_cabut_popup #nestedDetail'},
        { ref: 'compRetract',           selector: 'sipas_disposisi_riwayat_cabut_popup #buttonCabutDisposisi'},
        { ref: 'compPengirimImage',     selector: 'sipas_disposisi_riwayat_cabut_popup sipas_com_disposisi_pengirim_pane #pengirimImg'},
        { ref: 'compDetailPerintah',    selector: 'sipas_disposisi_riwayat_cabut_popup > form #perintahDetail'},
        { ref: 'perintahCombo',         selector: 'sipas_disposisi_riwayat_cabut_popup combobox[name=disposisi_perintah]'},
        { ref: 'compJenisSurat',        selector: 'sipas_disposisi_riwayat_cabut_popup sipas_com_surat_pane #jenisSurat'},
        { ref: 'compDetailSurat',       selector: 'sipas_disposisi_riwayat_cabut_popup sipas_com_surat_pane #suratDetail'}
    ],

    api: {
        profile_image: 'server.php/sipas/staf/get_image/foto?id={id}'
    },

    defaultWindowReport: {
        height: 640, 
        width: 800,
        maximizable: true,
        modal: true
    },

    defaultModel        : 'Sipas.Disposisi',
    defaultStoreRiwayat : 'Sipas.disposisi.riwayat.List',
    controllerSurat     : 'Sipas.masuk.agenda.Prop',
    controllerSurat2     : 'Sipas.internal.masuk.agenda.Prop',
    viewViewer          : 'Sipas.Viewer',

    init: function(application) {
        this.control({
            'sipas_disposisi_riwayat_cabut_popup sipas_disposisi_riwayat_cabut_list' : {
                loadassociate: this.onPenerima_LoadAssociate
            },
            'sipas_disposisi_riwayat_cabut_popup sipas_com_disposisi_pengirim_pane' : {
                loadassociate: this.onPengirim_LoadAssociate
            },
            'sipas_disposisi_riwayat_cabut_popup sipas_com_surat_pane' : {
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            'sipas_disposisi_riwayat_cabut_popup sipas_com_perintah_pane' : {
                loadassociate: this.onSuratPerintahInfo_LoadAssociate
            },
            'sipas_disposisi_riwayat_cabut_popup sipas_com_surat_pane sipas_com_button_view' : {
                click: this.onButtonViewSurat_Click
            },
            'sipas_disposisi_riwayat_cabut_popup #unread': {
                change: this.onCheckboxUnread_Change
            },
            'sipas_disposisi_riwayat_cabut_popup #all': {
                change: this.onCheckboxAll_Change
            },
            'sipas_disposisi_riwayat_cabut_popup #nested': {
                change: this.onCheckboxNested_Change
            },
            'sipas_disposisi_riwayat_cabut_popup #buttonCabutDisposisi': {
                click: this.onButtonRetract_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'cabut',
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = config.record || $this.getModel(this.defaultModel || this.models[0]).create({}),
            view = null;
            
        switch(config.mode)
        {
            case 'cabut' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = ['#btnMore'];
                    c.readonlyComponents    = [];
                    
                    c.requireComponents = [];
                    if(c.record.get('disposisi_cabut') === 1){
                        c.removeComponents.push('sipas_disposisi_riwayat_cabut_popup #toolbarAction');
                    }
                    
                    return c;
                })(config));
                
                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp}),
                            comboP = $this.getPerintahCombo({root:viewCmp}),
                            cmpJenis = $this.getCompJenisSurat({root:viewCmp}),
                            text = $this.getText({root:viewCmp});
                        record.getDisposisi(function(disposisi){
                            disposisi.getSurat(function(surat){
                                form.loadRecord(record);
                                if(surat.isMasuk()){
                                    cmpJenis.setValue('<span style="color:grey;">Surat Masuk Eksternal</span>');    
                                // }else if(surat.isKonsep()){
                                //     cmpJenis.setValue('<span style="color:grey;">Surat Konsep</span>');
                                }else if(surat.isIMasuk()){
                                    cmpJenis.setValue('<span style="color:grey;">Surat Masuk Internal</span>');
                                }
                            })
                        });
                        comboP.getStore().reload();
                    },
                    close: function (viewCmp) {
                        var form = this.getForm({root:viewCmp}),
                            record = form.getRecord();

                        record && record.reject();
                    },
                    scope: $this
                });
                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                });
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onCheckboxUnread_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            view    = $this.getMainview(),
            $helper     = $this.getApplication().Helper();

        if(newValue === true){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#all' : true,
                    '#nested' : true,
                    '#buttonCabutDisposisi' : false,
                    '#unreadDetail' : false
                }
            });
        }else if(newValue === false){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#all' : false,
                    '#nested' : false,
                    '#buttonCabutDisposisi' : true,
                    '#unreadDetail' : true
                }
            });
        }
    },

    onCheckboxAll_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            view    = $this.getMainview(),
            $helper     = $this.getApplication().Helper();

        if(newValue === true){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#unread' : true,
                    '#nested' : true,
                    '#buttonCabutDisposisi' : false,
                    '#allDetail' : false
                }
            });
        }else if(newValue === false){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#unread' : false,
                    '#nested' : false,
                    '#buttonCabutDisposisi' : true,
                    '#allDetail' : true
                }
            });
        }
    },    

    onCheckboxNested_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this   = this,
            view    = $this.getMainview(),
            $helper     = $this.getApplication().Helper();

        if(newValue === true){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#all' : true,
                    '#unread' : true,
                    '#buttonCabutDisposisi' : false,
                    '#nestedDetail' : false
                }
            });
        }else if(newValue === false){
            $helper.hideComponent({
                parent: view,
                items:{
                    '#all' : false,
                    '#unread' : false,
                    '#buttonCabutDisposisi' : true,
                    '#nestedDetail' : true
                }
            });
        }
    },

    onButtonRetract_Click: function(button, e, eOpts){
        var $this       = this,
            $app        = $this.getApplication(),
            $helper     = $app.Helper(),
            $session    = $app.getSession(),
            pegawaiId   = $session.getProfileId(),
            msg         = $this.getMessage('retract_confirm'),
            view        = $this.getMainview({from:button}),
            form        = $this.getForm({root:view}),
            record      = form && form.getRecord(),
            unread      = $this.getUnread({root:view}),
            all         = $this.getAll({root:view}),
            nested      = $this.getNested({root:view}),
            model       = $this.getModel($this.defaultModel).create({});
            
        view.setLoading(true);

        var status = (unread.getValue()) ? 1 : (all.getValue()) ? 2 : (nested.getValue()) ? 3 : NULL;
        $helper.showConfirm({
            confirmTitle: msg[0],
            confirmText: msg[1],
            callback: function(button){
                if(button == 'yes'){
                    record.getDisposisi(function(disposisi){
                        disposisi.cabut({
                        pencabut: pegawaiId,
                        iscabut: status,
                            callback: function(record, operation, success){
                                var message = null;
                                if(success){
                                    record.set({
                                        'disposisi_cabut': record.get('disposisi_cabut'),
                                        'disposisi_cabut_tgl': record.get('disposisi_cabut_tgl')
                                    });
                                    record.commit();
                                    view.setLoading(false);
                                    message = $this.getMessage('retract_success');
                                    form.fireEvent('afterretract', form);
                                }else{
                                    view.setLoading(false);
                                    message = $this.getMessage('retract_failure');
                                    form.fireEvent('retract_failure', form);
                                }
                                $helper.showMsg({success: success, message: message});
                                Ext.callback(view.callback, view, [success, record, eOpts]);
                                view.close();
                            }
                        });
                    })
                } else {
                    view.setLoading(false);
                }
            }
        });
    },

    onPengirim_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({root:form});

        cmp.setLoading(true);
        record.getPengirim(function(pengirim){
            cmp.setLoading(false); 
            $this.doProfileRead(record, mainview);
        });
    },

    onSuratInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = mainview || $this.getMainview(),
            compDetailSurat = $this.getCompDetailSurat({root:mainview});

        cmp.setLoading(true);
        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){
                surat_nomor = surat.get('surat_nomor');

                if (surat_nomor === null || surat_nomor === ''){
                    surat_nomor = '<span class="alternative">Tidak Ada Nomor Surat</span>';
                }

                compDetailSurat.setValue('<div class="cell-visual cell-visual-left">'+
                    '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-mail-open grey-600-i"></i></div></div>'+
                    '<div class="cell-text">'+
                    '<div class="subtext bold">'+surat.get('surat_perihal')+'</div>'+
                    '<div class="subtext">'+surat.getPengirim()+' - <span class="blue-700-i">'+surat_nomor+'</span></div>'+
                    '<div class="supporttext supporttext-dark">'+surat.getModelDisplay()+'</div>'+
                    '</div>');
                cmp.setLoading(false);
            })
        });
    },

    onSuratPerintahInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = mainview || $this.getMainview(),
            mode = record.get('disposisi_mode'),
            compDetailPerintah = $this.getCompDetailPerintah({root:mainview}),
            perintah = record.get('disposisi_perintah'),
            perintah_nama = record.get('perintah_nama'),
            perintah_uraian = record.get('disposisi_pesan'),
            perintah_icon = '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-quote grey-600-i"></i></div>';

        if (!perintah){
            perintah_nama = '<span class="alternative">Tidak Ada Arahan</span>';
        }
        if (!perintah_uraian){
            perintah_uraian = '<span class="alternative">Tidak Ada Uraian Arahan</span>';
        }
        cmp.setLoading(true);
        compDetailPerintah.setValue('<div class="cell-visual cell-visual-left">'+perintah_icon+'</div>'+
            '<div class="cell-text">'+
            '<div class="subtext bold">'+perintah_nama+'</div>'+
            '<div class="supporttext supporttext-dark">'+perintah_uraian+'</div>'+
            '</div>');
        cmp.setLoading(false);
    },

    onPenerima_LoadAssociate: function(record, form, cmp){
        var store = record.fetchRiwayatPenerima();
        cmp.reconfigure(store);
        
        store.reload();
    },

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            $checkSession = this.getApplication().getSession().getResetSession(),
            controllerSurat = $this.getController($this.controllerSurat),
            controllerSurat2 = $this.getController($this.controllerSurat2);

        view.setLoading(true);
        record.getDisposisi(function(dispo){
            dispo.getSurat(function(surat){
                view.setLoading(true);
                if(surat.get('surat_model') === surat.self.modelType().MODEL_MASUK){
                    view.setLoading(false);
                    controllerSurat.launch({
                        propType: 'masuk',
                        unit: null,
                        model: surat.self.modelType().MODEL_MASUK,
                        mode:'lihat',
                        record: surat
                    });
                }else{
                    view.setLoading(false);
                    controllerSurat2.launch({
                        propType: 'imasuk',
                        unit: null,
                        model: surat.self.modelType().MODEL_IMASUK,
                        mode:'lihat',
                        record: surat
                    });
                }
            })
        });
    },

    doProfileRead: function(record, mainview){
        var $this = this,
            view = mainview || $this.getMainview(),
            cmp = $this.getCompPengirimImage({root:view}),
            t = new Ext.Template("<img src='{url}' style='border-radius: 100%; width:48px; height:48px;'/>");

        if(!record) return;
        cmp.update(t.apply({
            url: Ext.String.urlAppend($this.getApi('profile_image', {
                id: record.get('disposisi_pengirim_id')
            }))
        }));
    }
});