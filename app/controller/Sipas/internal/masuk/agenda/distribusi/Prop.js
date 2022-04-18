Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.distribusi.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.internal.masuk.agenda.distribusi.penerima.List'
    ],
    
    views: [
        'Sipas.internal.masuk.agenda.distribusi.Prop'
    ],

    models: [
        'Sipas.Disposisi',
        'Sipas.Staf'
    ],

    stores: [
        'Sipas.internal.masuk.agenda.distribusi.penerima.List'
    ],

    messages:{
        receiver_invalid:   '<b>Penerima Surat Masuk</b> tidak boleh kosong!',
        receiver_exist:     ['Info', 'Staf dengan nama {id} sudah masuk dalam daftar']
    },

    api: {
        auth:   'server.php/sipas/disposisi_masuk/isexist/',
        staf:   'server.php/sipas/staf?id={id}'
    },

    refs: [
        { ref: 'mainview',          selector: 'sipas_internal_masuk_agenda_distribusi_prop' },
        { ref: 'form',              selector: 'sipas_internal_masuk_agenda_distribusi_prop > form' },
        { ref: 'compPenerima',      selector: 'sipas_internal_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_list'},
        { ref: 'compCode',          selector: 'sipas_internal_masuk_agenda_distribusi_prop #fieldCode'},
        { ref: 'compJenisSurat',    selector: 'sipas_internal_masuk_agenda_distribusi_prop sipas_com_surat_pane #jenisSurat'},
        { ref: 'compDetailSurat',   selector: 'sipas_internal_masuk_agenda_distribusi_prop sipas_com_surat_pane #suratDetail'},
        { ref: 'btnKirim',          selector: 'sipas_internal_masuk_agenda_distribusi_prop sipas_com_button_disposisi'}
    ],

    modelStaf: 'Sipas.Staf',
    controllerStafLookup  : 'Sipas.staf.penerima.Lookup',

    _click: 0,

    init: function(application) {
        this.control({
            'sipas_internal_masuk_agenda_distribusi_prop': {
                show: this.onMainview_Show,
                dosave: this.onMainview_DoSave
            },
            'sipas_internal_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_list' : {
                loadassociate: this.onPenerima_LoadAssociate
            },
            'sipas_internal_masuk_agenda_distribusi_prop sipas_disposisi_forward_penerima_list sipas_com_button_plus': {
                click: this.onButtonTambahPenerima_Click
            },
            'sipas_internal_masuk_agenda_distribusi_prop #toolbarAction button[action]': {
                click: this.onButtonAction_Click
            },
            'sipas_internal_masuk_agenda_distribusi_prop sipas_com_surat_pane':{
                loadassociate: this.onSuratInfo_LoadAssociate
            }
        });
    },

    launch: function(config){
        config = Ext.apply({
            mode: 'distribusi',
            surat: null,
            record: this.getModel(this.defaultModel || this.models[0]).create({}),
            recordIMasuk: config.selfAsPenerima,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            role_lihat = $session.getRuleAccess('surat_internal_masuk_lihat'),
            $helper = $this.getApplication().Helper(),
            record = config.record || $this.getModel($this.models[0]).create({}),
            view = null;
            
        switch(config.mode)
        {
            case 'distribusi' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    
                    if (role_lihat) {
                        c.removeComponents.push('#infoSurat', '#lihatSurat');
                    }
                    return c;
                })(config));
                
                view.on({
                    show: function(viewCmp){
                        var form = $this.getForm({root:viewCmp}),
                            penerimaList = $this.getCompPenerima({root:viewCmp}),
                            cmpJenis = $this.getCompJenisSurat({root:viewCmp});
                            penerimaList.getStore().removeAll();
                            form.loadRecord(record);                       
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

    onMainview_Show: function(mainview){
        var $this   = this,
            $app    = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            role_lihat = $session.getRuleAccess('surat_internal_masuk_lihat'),
            form    = $this.getForm({root:mainview}),
            record  = mainview.record || $this.getModel($this.models[0]).create({});

        if (role_lihat) {
            $helper.disableComponent({
                parent: mainview,
                items:{
                    '#infoSurat' : true,
                    '#lihatSurat' : true
                }
            });
        }else{
            mainview.setTitle('Distribusi Surat Masuk Internal');
            $helper.disableComponent({
                parent: mainview,
                items:{
                    '#infoSurat' : false,
                    '#lihatSurat' : false
                }
            });
        }

        if(record && form){
            form.setLoading(true);
            record.getSurat(function(surat){
                form.setLoading(false);
                form.loadRecord(record);
            });
        }
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
            // mode: listPenerima.mode,
            callback:function(selections){
//                 Ext.Array.each(selections, function(r){
//                     var find = storePenerima.getById(r.getId());
//                     if(!find){
//                         storePenerima.add(r);
//                     }else{
//                         var msg = $this.getMessage('receiver_exist',{id: r.get('staf_id')});
//                         $helper.showNotification(msg[0],msg[1]);
//                     }
//                 });

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

    onMainview_DoSave: function(mainview, button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            checkSession = this.getApplication().getSession().getResetSession(),
            $helper = $app.Helper(),
            form = $this.getForm({root:mainview}),
            record = form && form.updateRecord().getRecord(),
            listPenerima = $this.getCompPenerima({root:mainview}),
            storePenerima = listPenerima.getStore(),
            invalidMsg = $this.getMessage('receiver_invalid'),
            btnKirim = $this.getBtnKirim({root:mainview}),
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
        }
        else{
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
            $this._click++;
            if ($this._click <= 1) {
                Ext.Ajax.request({
                    url: $this.getApi('auth'),
                    params: params,
                    success: function(response, eOpts){
                        var objres = Ext.decode(response.responseText, 1) || {};

                        if(objres.exist > 0){

                            Ext.Array.each(objres.exist_name, function(rec) {
                                name_exist = (name_exist == '')? name_exist+' '+rec : name_exist+', '+rec;
                            });

                            $helper.showConfirm({
                                confirmTitle: 'Konfirmasi Penerima Distribusi',
                                confirmText : name_exist+' sudah pernah mendapatkan surat ini. Lanjutkan ?',
                                callback: function(button){
                                    if(button == 'yes'){
                                        if(!form.getForm().isValid()){
                                            $this._click = 0;
                                            btnKirim.setDisabled(false);
                                        }
                                        $helper.saveRecord({
                                            record: record,
                                            form: form,
                                            wait: true,
                                            waitText: 'Mendistribusikan surat...',
                                            params: params,
                                            message: false,
                                            callback: function(success, record, eOpts){
                                                $this._click = 0;
                                                if(success) {
                                                    btnKirim.setDisabled(false);
                                                    $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                                }else{
                                                    btnKirim.setDisabled(false);
                                                    $helper.showMsg({success: false, message: 'Gagal Mendistribusikan Surat'});
                                                }
                                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                                                mainview.close();
                                            }
                                        });
                                   
                                    }else if (button == 'no'){
                                        $this._click = 0;
                                        btnKirim.setDisabled(false);
                                    }else{
                                        /*when message box closed*/
                                        $this._click = 0;
                                        btnKirim.setDisabled(false);
                                    }
                                }
                            });
                            btnKirim.setDisabled(true);
                        }else{
                            $helper.showConfirm({
                            confirmTitle: 'Kirim Surat',
                            confirmText : 'Apakah anda yakin untuk mengirim surat ?',
                            callback: function(button){
                                if(button == 'yes'){
                                    $helper.saveRecord({
                                        record: record,
                                        form: form,
                                        wait: true,
                                        waitText: 'Mendistribusikan surat...',
                                        params: params,
                                        message: false,
                                        callback: function(success, record, eOpts){
                                            $this._click = 0;

                                            if(success) {
                                                btnKirim.setDisabled(false);
                                                $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                            }else{
                                                btnKirim.setDisabled(false);
                                                $helper.showMsg({success: false, message: 'Gagal Mendistribusikan Surat'});
                                            }
                                            Ext.callback(mainview.callback, mainview, [success, record, eOpts]);                    
                                            mainview.close();
                                        }
                                    });
                                }else if (button == 'no'){
                                    $this._click = 0;
                                    btnKirim.setDisabled(false);
                                }else{
                                    /*when message box closed*/
                                    $this._click = 0;
                                    btnKirim.setDisabled(false);
                                }
                                
                            }
                        });
                        }
                        
                    }
                });
            }
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

    onPenerima_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            storePenerima = cmp.getStore(),
            surat = mainview.surat,
            penerima = surat.fetchPenerima();

        storePenerima.removeAll();
        penerima.load(function(){
            penerima.each(function(record){
                record.getStaf(function(staf){
                    var find = storePenerima.findRecord('staf_id', staf.get('staf_id'));
                    if(!find){
                        staf.set({
                            'disposisi_masuk_istembusan' : record.get('surat_stack_istembusan')
                        });
                        storePenerima.addSorted(staf);
                    }
                });
            });
        });
        // var store = record.fetchPenerimaStore();
        // cmp.reconfigure(store);
        // cmp.record = record;
        // record.getId() && store.reload();
    },

    onButtonAction_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            mainview = this.getMainview({from:button});
        
        mainview && mainview.fireEvent(button.action, mainview);
    },

    onSuratInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = $this.getMainview({from:cmp}),
            compDetailSurat = $this.getCompDetailSurat({root:mainview}),
            surat_nomor = record.get('surat_nomor');

        cmp.setLoading(true);
        if (surat_nomor === null || surat_nomor === ''){
            surat_nomor = '<span class="alternative">Tidak Ada Nomor Surat</span>';
        }
        record.getSurat(function(surat){
            compDetailSurat.setValue('<div style="display:flex"><div class="cell-visual cell-visual-left">'+
                '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-mail-open grey-600-i"></i></div></div>'+
                '<div class="cell-text">'+
                '<div class="subtext bold">'+surat.get('surat_perihal')+'</div>'+
                '<div class="subtext">'+surat.getPengirim()+' - <span class="blue-700-i">'+surat_nomor+'</span></div>'+
                '<div class="supporttext supporttext-dark">Surat Masuk Internal</div>'+
                '<div class="supporttext supporttext-dark">Tgl. Surat '+Ext.util.Format.date(surat.get('surat_tanggal'), 'd M Y')+'</div>'+
                '<div class="supporttext supporttext-dark">Jenis: '+surat.get('jenis_nama')+'</div>'+
                '<div class="supporttext supporttext-dark">Klasifikasi: '+surat.get('kelas_nama')+'</div>'+
                '</div></div>');
            cmp.setLoading(false);
        });
    }
});