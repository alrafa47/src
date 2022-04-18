Ext.define('SIPAS.controller.Sipas.masuk.agenda.distribusi.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    controllers: [
        'Sipas.masuk.agenda.distribusi.penerima.List'
    ],
    
    views: [
        'Sipas.masuk.agenda.distribusi.Prop'
    ],

    models: [
        'Sipas.Surat'
    ],

    stores: [
        'Sipas.masuk.agenda.distribusi.penerima.List'
    ],

    messages:{
        receiver_invalid:   '<b>Penerima Surat Masuk</b> tidak boleh kosong!',
        receiver_exist:     ['Error', 'Staf dengan Nama: {id} sudah terdaftar']
    },

    api: {
        auth:   'server.php/sipas/disposisi_masuk/isexist/'
    },

    refs: [
        { ref: 'mainview',      selector: 'sipas_masuk_agenda_distribusi_prop' },
        { ref: 'form',          selector: 'sipas_masuk_agenda_distribusi_prop > form' },
        { ref: 'compPenerima',  selector: 'sipas_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_list'},
        { ref: 'compJabatan',   selector: 'sipas_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_jabatan_list'},
        { ref: 'compCode',      selector: 'sipas_masuk_agenda_distribusi_prop #fieldCode'},
        { ref: 'compJenisSurat', selector:'sipas_masuk_agenda_distribusi_prop sipas_com_surat_pane #jenisSurat'},
        { ref: 'compPengirimSurat', selector: 'sipas_masuk_agenda_distribusi_prop sipas_com_surat_pane #suratPengirim'},
        { ref: 'compDetailSurat', selector: 'sipas_masuk_agenda_distribusi_prop sipas_com_surat_pane #suratDetail'}
    ],

    defaultWindowReport: {
        height: 640, 
        width: 800,
        maximizable: true,
        modal: true
    },

    defaultModel: 'Sipas.Disposisi',
    controllerSurat: 'Sipas.surat.Prop',
    controllerProperty: 'Sipas.masuk.agenda.Prop',
    controllerStafLookup  : 'Sipas.staf.penerima.Lookup',

    init: function(application) {
        this.control({
            'sipas_masuk_agenda_distribusi_prop': {
                dosave: this.onMainview_DoSave
            },
            'sipas_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_list' : {
                loadassociate: this.onPenerima_LoadAssociate
            },
            'sipas_masuk_agenda_distribusi_prop sipas_com_surat_pane' : {
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            'sipas_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_list sipas_com_button_plus': {
                click: this.onButtonTambahPenerima_Click
            },
            'sipas_masuk_agenda_distribusi_prop sipas_com_surat_pane sipas_com_button_view' : {
                click: this.onButtonView_Click
            },
            'sipas_masuk_agenda_distribusi_prop #toolbarAction button[action]': {
                click: this.onButtonAction_Click
            //},
            //'sipas_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_jabatan_list sipas_com_button_plus': {
            //    click: this.onButtonTambahPenerimaJabatan_Click
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'distribusi',
            record: this.getModel(this.defaultModel || this.models[0]).create({}),
            selfAsPenerima: config.selfAsPenerima,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            record = config.record || $this.getModel(this.defaultModel || this.models[0]).create({}),
            view = null;
            
        switch(config.mode)
        {
            case 'distribusi' :
                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = ['#btnMore'];
                    c.readonlyComponents    = [];
                    
                    return c;
                })(config));
                
                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp}),
                            $helper = $this.getApplication().Helper(),
                            penerimaList = $this.getCompPenerima({root:viewCmp}),
                            cmpJenis = $this.getCompJenisSurat({root:viewCmp});
                            penerimaList.getStore().removeAll();
                            form.loadRecord(record);

                        $helper.hideComponent({
                            parent: viewCmp,
                            items: {
                            '#pengirim' : true
                            }
                        });
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
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_DoSave: function(mainview, button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
            form = $this.getForm({root:mainview}),
            record = form && form.updateRecord().getRecord(),
            listPenerima = $this.getCompPenerima({root:mainview}),
            storePenerima = listPenerima.getStore(),
            invalidMsg = $this.getMessage('receiver_invalid'),
            count_exist = 0,
            name_exist = '',
            params = {
                'user[]' : [],
                'nama[]' : [],
                't[]': [], //tembusan
                // 'b[]': [], //berkas
                'approval' : 'distribusi',
                'induk' : false, /*if induk true then it's disposisi not surat*/
                'surat_id' : record && record.get('surat_id')
            };

        if(storePenerima.getCount() <= 0){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_invalid')});
            return;
        } else{
            storePenerima.each(function(r){
                params['user[]'].push(r.get('staf_id'));
                params['nama[]'].push(r.get('staf_nama'));
                params['t[]'].push(r.get('disposisi_masuk_istembusan'));
                // params['b[]'].push(r.get('disposisi_masuk_isberkas'));
            });
            if(params['user[]'].length > 50){
                $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                return;
            }
            if(! record) return;
            
            Ext.Ajax.request({
                url: $this.getApi('auth'),
                params: params,
                success: function(response, eOpts){
                    var objres = Ext.decode(response.responseText, 1) || {};
                    
                    if(objres.exist > 0){

                        Ext.Array.each(objres.exist_name, function(rec) {
                            name_exist = (name_exist == '')? name_exist+' '+rec : name_exist+', '+rec;
                        });                        

                        $helper.saveRecord({
                            record: record,
                            form: form,
                            wait: true,
                            waitText: 'Mendistribusikan surat...',
                            params: params,
                            message: false,
                            confirm: true,
                            confirmText: name_exist+' sudah pernah mendapatkan surat ini. Lanjutkan ?',
                            confirmTitle: 'Konfirmasi Penerima Distribusi',
                            callback: function(success, record, eOpts, response){
                                if(success) {
                                    $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                }else{
                                    $helper.showMsg({success: false, message: 'Gagal Mendistribusikan Surat'});
                                }
                                mainview.close();
                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                            }
                        });
                    }else{
                        $helper.saveRecord({
                            record: record,
                            form: form,
                            wait: true,
                            params: params,
                            message: false,
                            confirm: true,
                            confirmText: 'Apakah anda yakin ingin mendistribusikan surat ?',
                            confirmTitle: 'Konfirmasi Distribusi',
                            callback: function(success, record, eOpts, response){
                                if(success) {
                                    $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                }else{
                                    $helper.showMsg({success: false, message: 'Gagal Mendistribusikan Surat'});
                                }
                                mainview.close();
                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                            }
                        });
                    }
                    
                }
            });
        }
    },

    isExist: function(staf_id, surat_id){
        var $this = this;

        Ext.Ajax.request({
            url: $this.getApi('auth'),
            params: {
                'staf_id' : staf_id,
                'surat_id' : surat_id
            },
            success: function(response, eOpts){
                var objres = Ext.decode(response.responseText, 1) || {};
                return objres.exist;
            }
        });
        
    },

    onButtonTambahPenerima_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            listPenerima = $this.getCompPenerima({root:mainview}),
            storePenerima = listPenerima.getStore(),
            controllerLookup = $this.getController($this.controllerStafLookup);

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var find = storePenerima.findRecord('staf_id', selections[i].data.staf_id);
                    if(!find){
                        storePenerima.add(selections[i].data);
                    }else{
                        var msg = $this.getMessage('receiver_exist',{id: selections[i].data.staf_nama});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        })    
    },

    onPengirim_LoadAssociate: function(record, form, cmp){
        cmp.setLoading(true);
        record.getSurat(function(pengirim){
            cmp.setLoading(false); 
            if(pengirim){
                cmp.form.loadRecord(pengirim);
            }
        });
    },

    onSuratInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = $this.getMainview({from:cmp}),
            compDetailSurat = $this.getCompDetailSurat({root:mainview});

        cmp.setLoading(true);
        record.getSurat(function(surat){
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
        });
    },

    onPenerima_LoadAssociate: function(record, form, cmp){
        var store = record.fetchPenerima();
        cmp.reconfigure(store);
        cmp.record = record;
        record.getId() && store.reload();
    },

    onButtonAction_Click: function(button, e, eOpts){
        var mainview = this.getMainview({from:button});
        mainview && mainview.fireEvent(button.action, mainview);
    },

    onButtonView_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            controllerProperty = $this.getController($this.controllerProperty);

        record.getSurat(function(pengirim){
            controllerProperty.launch({
                propType: 'masuk',
                unit: null,
                model: pengirim.self.modelType().MODEL_MASUK,
                mode:'view',
                record: pengirim
            });
        });
    }

    // onButtonTambahPenerimaJabatan_Click: function(button, e, eOpts){
    //     console.log('tambah penerima');
    //     var $this = this,
    //         $helper = $this.getApplication().Helper(),
    //         mainview = $this.getMainview({from:button}),
    //         listPenerima = $this.getCompJabatan({root:mainview}),
    //         storePenerima = listPenerima.getStore(),
    //         controllerLookup = $this.getController($this.controllerStafLookup);

    //     controllerLookup.launch({
    //         multiselect: true,
    //         callback:function(selections){
    //             for(var i in selections){
    //                 var find = storePenerima.findRecord('staf_id', selections[i].data.staf_id);
    //                 if(!find){
    //                     storePenerima.add(selections[i].data);
    //                 }else{
    //                     var msg = $this.getMessage('receiver_exist',{id: selections[i].data.staf_nama});
    //                     $helper.showNotification(msg[0],msg[1]);
    //                 }
    //             }
    //         }
    //     })    
    // }
});