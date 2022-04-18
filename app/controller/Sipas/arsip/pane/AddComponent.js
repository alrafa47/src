Ext.define('SIPAS.controller.Sipas.arsip.pane.AddComponent', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.arsip.pane.AddScanComponent',
        'Sipas.arsip.link.Prop',
        'Sipas.arsip.sdoc.Prop',
        'Sipas.arsip.unggah.Prop'
    ],

    views:[
        'Sipas.arsip.Pane'
    ],

    messages: {
        'approver_empty': 'Harap memilih penyetuju surat untuk data online dokumen',
        'petikan_empty': 'Harap memilih petikan surat untuk data online dokumen',
        'receiver_empty': 'Harap memilih penerima surat untuk data online dokumen',
        'receiver_invalid': 'Penerima tidak memiliki akses untuk menjadi penerima, mohon ganti penerima',
        'receiver_limit': 'Batas penerima maksimal hanya 50 pegawai',
        'approval_progress': 'Dokumen tidak bisa ditambahkan saat proses penyetujuan'
    },
    
    refs : [
        { ref: 'mainview',      selector: 'sipas_arsip_pane'},
        { ref: 'dataview',      selector: 'sipas_arsip_pane dataview'}
    ],

    init: function(application)
    {
        this.control({
            'sipas_arsip_pane > toolbar button#buttonAdd menu menuitem[action=upload_scan]' : {
                click: this.onMenuItem_UploadScanAction_Click
            },
            'sipas_arsip_pane > toolbar button#buttonAdd menu menuitem[action=link]' : {
                click: this.onMenuItem_LinkAction_Click
            },
            'sipas_arsip_pane > toolbar button#buttonAdd menu menuitem[action=sdoc]' : {
                click: this.onMenuItem_SDocAction_Click
            }
        });
    },

    onMenuItem_UploadScanAction_Click: function(menuitem, e, eOpts)
    {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            controllerUnggah = $this.getController('Sipas.arsip.unggah.Prop'),
            view = $this.getMainview(),
            dataview = $this.getDataview({root:view}),
            store = dataview.getStore(),
            record = view.record,
            surat = view.surat,
            arsip = view.arsip,
            staf = view.staf,
            mode = view.mode;

        if (mode != 'add_disposisi') {
            if(surat && surat.get('surat_model') === 2 || surat && surat.get('surat_model') === 4 || surat && surat.get('surat_model') === 6 && surat.get('surat_setuju') === 2){
                controllerUnggah.launch({
                    arsip : arsip,
                    surat : surat,
                    record : record,
                    store: store,
                    staf: staf,
                    mode: 'add',
                    callback: function(success, record, eOpts, response)
                    {
                        record = store.model.create({
                            'dokumen_nama': record.get('dokumen_nama'),
                            'dokumen_arsip': arsip && arsip.getId(),
                            'dokumen_reupload': 1
                        });
                        
                        store.insert(0, record);
                        view.setLoading(true);
                        store.reload();
                        view.setLoading(false);
                        // store.nextPage({
                        //   addRecords: true
                        // });
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                    },
                    scope: this
                });
            }else{
                controllerUnggah.launch({
                    arsip : arsip,
                    surat : surat,
                    record : record,
                    store: store,
                    staf: staf,
                    mode: 'add',
                    callback: function(record)
                    {
                        record = store.model.create({
                            'dokumen_nama': record.get('dokumen_nama'),
                            'dokumen_arsip': arsip && arsip.getId(),
                            'dokumen_reupload': 0
                        });
                        
                        store.insert(0, record);
                        store.reload();
                    },
                    scope: this
                });
            }
        }else{
            if(surat && surat.get('surat_model') === 2 || surat && surat.get('surat_model') === 4 || surat && surat.get('surat_model') === 6 && surat.get('surat_setuju') === 2){
                controllerUnggah.launch({
                    arsip : arsip,
                    surat : surat,
                    record : record,
                    store: store,
                    staf: staf,
                    mode: 'add_disposisi',
                    callback: function(success, record, eOpts, response)
                    {
                        record = store.model.create({
                            'dokumen_nama': record.get('dokumen_nama'),
                            'dokumen_arsip': arsip && arsip.getId()
                        });
                        
                        store.insert(0, record);
                        view.setLoading(true);
                        store.reload();
                        view.setLoading(false);
                        // store.nextPage({
                        //   addRecords: true
                        // });
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                    },
                    scope: this
                });
            }else{
                controllerUnggah.launch({
                    arsip : arsip,
                    surat : surat,
                    record : record,
                    store: store,
                    staf: staf,
                    mode: 'add_disposisi',
                    callback: function(record)
                    {
                        record = store.model.create({
                            'dokumen_nama': record.get('dokumen_nama'),
                            'dokumen_arsip': arsip && arsip.getId()
                        });
                        
                        store.insert(0, record);
                        store.reload();
                    },
                    scope: this
                });
            }
        }
    },

    onMenuItem_LinkAction_Click: function(menuitem, e, eOpts) {
        var $this  = this,
            view   = $this.getMainview(),
            controllerLinkProp = $this.getController('Sipas.arsip.link.Prop'),
            store = view.down('dataview').getStore(),
            record = view.record,
            surat  = view.surat,
            arsip  = view.arsip,
            staf  = view.staf,
            mode = view.mode;

            controllerLinkProp.launch({
                arsip : arsip,
                surat : surat,
                staf: staf,
                mode  : 'add',
                callback: function(link){
                    record = store.model.create({
                        'dokumen_nama': link,
                        'dokumen_arsip': arsip && arsip.getId(),
                        'dokumen_reupload': 0
                    });
                    
                    store.insert(0, record);
                    view.setLoading(true);
                    store.reload();
                    view.setLoading(false);
                    // store.loadPage(1);
                    // store.nextPage({
                    //   addRecords: true
                    // });
                },
                scope: this
            });
    },

    onMenuItem_SDocAction_Click: function(menuitem, e, eOpts)
    {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            checkSession = $app.getSession().getResetSession(),
            $localStore = $app.getLocalStorage(),
            $idSalin = $localStore.getValue('idSalin'),
            view = $this.getMainview(),
            controllerSdoc = $this.getController('Sipas.arsip.sdoc.Prop'),
            store = view.down('dataview').getStore(),
            form = view && view.up('form'),
            panePenyetuju = form.down('#panePenyetuju'),
            panePetikan = form.down('#panePetikan'),
            panePenerima = form.down('#panePenerima'),
            storePenyetuju = panePenyetuju && panePenyetuju.getStore(),
            storePetikan = panePetikan && panePetikan.getStore(),
            storePenerima = panePenerima && panePenerima.getStore(),
            recordSurat = form && form.updateRecord().getRecord(),
            jabatan_ispenerima = [],
            record = view.record,
            surat  = view.surat,
            mode = view.mode,
            staf = view.staf,
            arsip  = view.arsip;

        if(mode == 'ubah'){    
            params = {
                'upy[]' : [],
                'upy_p[]' : [],
                'upn[]' : [],
                'upn_p[]' : [],
                'upt[]' : [],
                'upt_p[]' : [],
                't[]': [],
                // 'b[]': [],
                'utsk[]': [],
                'utsk_p[]': [],
                'sdoc' : 1
            };        

            storePenyetuju && storePenyetuju.each(function(r){
                params['upy[]'].push(r.get('staf_id'));
                if (r.get('surat_stack_profil')) {
                  params['upy_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['upy_p[]'].push(r.get('staf_profil'));
                }
            });

            if(recordSurat.get('surat_model') == '6'){
                storePenerima && storePenerima.each(function(r){
                    params['utsk[]'].push(r.get('staf_id'));
                    if(r.get('surat_stack_profil')) {
                        params['utsk_p[]'].push(r.get('surat_stack_profil'));
                    } else {
                        params['utsk_p[]'].push(r.get('staf_profil'));
                    }
                });

                if(Ext.Array.contains(['ubah'], view.mode) && (record && record.get('surat_penerimask_total')  < 1 || surat && surat.get('surat_penerimask_total') < 1)){
                    $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                    return;
                }

                if(recordSurat.get('surat_model_sub') == 2) {
                    storePetikan.each(function(r){
                        params['upt[]'].push(r.get('staf_id'));
                        if (r.get('surat_stack_profil')) {
                            params['upt_p[]'].push(r.get('surat_stack_profil'));
                        }else{
                            params['upt_p[]'].push(r.get('staf_profil'));
                        }
                    });
    
                    if(storePetikan.data.length <= 0) {
                        $helper.showMsg({success:false, message:$this.getMessage('petikan_empty')});
                        return;
                    }
                }
            }else{
                storePenerima && storePenerima.each(function(r){
                    params['upn[]'].push(r.get('staf_id'));
                    params['t[]'].push(r.get('surat_stack_istembusan'));
                    // params['b[]'].push(r.get('surat_stack_isberkas'));
                    if (!r.get('jabatan_ispenerima')) jabatan_ispenerima.push(r.get('jabatan_ispenerima'));
                    if (r.get('surat_stack_profil')) {
                        params['upn_p[]'].push(r.get('surat_stack_profil'));
                    }else{
                        params['upn_p[]'].push(r.get('staf_profil'));
                    }
                });
            }

            if((recordSurat.get('surat_model') == '2' || recordSurat.get('surat_model') == '4' || recordSurat.get('surat_model') == '6') && !params['upy[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
                return;
            }

            if(recordSurat.get('surat_model') == '1' && !params['upn[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                return;
            }

            if(recordSurat.get('surat_model') == '4'){
                if (!params['upn[]'].length) {
                    $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                    return;    
                }else{
                    var cmpJenis = form.down('[name=surat_jenis]'),
                        jenis = cmpJenis.valueModels[0],
                        jenis_batasipenerima = jenis.get('jenis_batasipenerima');

                    if (jenis_batasipenerima && (jabatan_ispenerima.length) > 0) {
                        $helper.showMsg({success:false, message:$this.getMessage('receiver_invalid')});
                        return;    
                    }
                }
            }
            
            if(params['upn[]'].length > 50){
                $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                return;
            }
        }else if(surat.get('surat_setuju') == 2){
            if(surat.get('surat_model') == 6) {
                params = {
                    // 'b[]': [],
                    'sdoc' : 1,
                    'pn[]' : [],
                    'pn_p[]' : []
                };
            } else {
                params = {
                    // 'b[]': [],
                    'sdoc' : 1,
                };
            }
        }else{
            params = {
                'py[]' : [], //penyetuju
                'py_p[]' : [], //penyetuju_profil
                'pt[]' : [], //petikan
                'pt_p[]' : [], //petikan_profil
                'pn[]' : [], //penerima
                'pn_p[]' : [], //penerima_profil
                't[]': [], //tembusan
                'tsk[]' : [], //tembusansk
                'tsk_p[]' : [], //tembusansk_profil
                // 'b[]': [],
                'temp' : 1,
                'sdoc' : 1,
                'salin' : $idSalin
            };        

            storePenyetuju && storePenyetuju.each(function(r){
                params['py[]'].push(r.get('staf_id'));
                if (r.get('surat_stack_profil')) {
                  params['py_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['py_p[]'].push(r.get('staf_profil'));
                }
            });

            if(Ext.Array.contains(['add','edit'], view.mode) && recordSurat.get('surat_model_sub') == '2'){
                storePetikan.each(function(r){
                    params['pt[]'].push(r.get('staf_id'));
                    if (r.get('surat_stack_profil')) {
                        params['pt_p[]'].push(r.get('surat_stack_profil'));
                    }else{
                        params['pt_p[]'].push(r.get('staf_profil'));
                    }
                });
                    
                if(storePetikan.data.length <= 0) {
                    $helper.showMsg({success:false, message:$this.getMessage('petikan_empty')});
                    return;
                }
            }

            if(recordSurat.get('surat_model') == '6') {
                storePenerima && storePenerima.each(function(r){
                    params['tsk[]'].push(r.get('staf_id'));
                    if(r.get('surat_stack_profil')) {
                        params['tsk_p[]'].push(r.get('surat_stack_profil'));
                    } else {
                        params['tsk_p[]'].push(r.get('staf_profil'));

                    }
                });

                if(Ext.Array.contains(['add','edit'], view.mode) && recordSurat.get('surat_penerimask_total') < 1){
                    $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                    return;
                }
            }else{
                storePenerima && storePenerima.each(function(r){
                    params['pn[]'].push(r.get('staf_id'));
                    params['t[]'].push(r.get('surat_stack_istembusan'));
                    // params['b[]'].push(r.get('surat_stack_isberkas'));
                    if(!r.get('jabatan_ispenerima')){
                        jabatan_ispenerima.push(r.get('jabatan_ispenerima'));
                    }
                    if (r.get('surat_stack_profil')) {
                       params['pn_p[]'].push(r.get('surat_stack_profil'));
                    }else{
                       params['pn_p[]'].push(r.get('staf_profil'));
                    }
                });
                
            }

            if(Ext.Array.contains(['add','edit', 'reply'], view.mode) && (recordSurat.get('surat_model') == '2' || recordSurat.get('surat_model') == '4' || recordSurat.get('surat_model') == '6') && !params['py[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
                return;
            }

            if(Ext.Array.contains(['add','edit'], view.mode) && recordSurat.get('surat_model') == '1' && !params['pn[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                return;
            }

            if(Ext.Array.contains(['add','edit'], view.mode) && params['pn[]'].length > 50){
                $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                return;
            }

            if(recordSurat.get('surat_model') == '4' && Ext.Array.contains(['add','edit'], view.mode)){
                if (!params['pn[]'].length) {
                    $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                    return;    
                }else{
                    var cmpJenis = form.down('[name=surat_jenis]'),
                        jenis = cmpJenis.valueModels[0],
                        jenis_batasipenerima = jenis.get('jenis_batasipenerima');

                    if (jenis_batasipenerima && (jabatan_ispenerima.length) > 0) {
                        $helper.showMsg({success:false, message:$this.getMessage('receiver_invalid')});
                        return;    
                    }
                }
            }
        }

        if(recordSurat.get('surat_model') == 6) {
            var penerimask = recordSurat.fetchPenerimask();
            penerimask.load({
                callback: function(){
                    penerimask.each(function(r){
                        if(mode == 'ubah') {
                            params['upn[]'].push(r.get('staf_id'));
                            if (r.get('surat_penerimask_profil')) {
                                params['upn_p[]'].push(r.get('surat_penerimask_profil'));
                            }else{
                                params['upn_p[]'].push(r.get('staf_profil'));
                            }
                        } else {
                            params['pn[]'].push(r.get('staf_id'));
                            if (r.get('surat_penerimask_profil')) {
                                params['pn_p[]'].push(r.get('surat_penerimask_profil'));
                            }else{
                                params['pn_p[]'].push(r.get('staf_profil'));
                            }
                        }
                    });

                    $helper.saveRecord({
                        form: form,
                        record: recordSurat,
                        params: params,
                        message: false,
                        wait: true,
                        callback: function(success, record, eOpts, response){
                            $localStore.remove('idSalin');
                            controllerSdoc.launch({
                                arsip : arsip,
                                surat : surat,
                                record : record,
                                staf: staf,
                                mode: 'add',
                                callback: function(sdoc)
                                {
                                    record = store.model.create({
                                        'dokumen_nama': sdoc.name,
                                        'dokumen_arsip': arsip && arsip.getId(),
                                        'dokumen_reupload': 0
                                    });
                                    store.insert(0, record);
                                    view.setLoading(true);
                                    store.reload();
                                    view.setLoading(false);
                                },
                                scope: this
                            });
                        }
                    });
                }
            });
        } else {
            $helper.saveRecord({
                form: form,
                record: recordSurat,
                params: params,
                message: false,
                wait: true,
                callback: function(success, record, eOpts, response){
                    $localStore.remove('idSalin');
                    controllerSdoc.launch({
                        arsip : arsip,
                        surat : surat,
                        record : record,
                        staf: staf,
                        mode: 'add',
                        callback: function(sdoc)
                        {
                            record = store.model.create({
                                'dokumen_nama': sdoc.name,
                                'dokumen_arsip': arsip && arsip.getId(),
                                'dokumen_reupload': 0
                            });
                            store.insert(0, record);
                            view.setLoading(true);
                            store.reload();
                            view.setLoading(false);
                        },
                        scope: this
                    });
                }
            });
        }
    }

});