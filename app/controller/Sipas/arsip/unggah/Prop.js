Ext.define('SIPAS.controller.Sipas.arsip.unggah.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    models: [
        'Sipas.Dokumen'
    ],

    views: [
        'Sipas.arsip.unggah.Prop'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_arsip_unggah_prop'},
        { ref: 'form',          selector: 'sipas_arsip_unggah_prop > form'},
        { ref: 'cmpNama',       selector: 'sipas_arsip_unggah_prop > form [name=dokumen_nama]'},
        { ref: 'cmpLihat',      selector: 'sipas_arsip_unggah_prop > form [name=dokumen_islihat]'},
        { ref: 'btnSave',       selector: 'sipas_arsip_unggah_prop > form sipas_com_button_save'},
        { ref: 'filefield',     selector: 'sipas_arsip_unggah_prop > form #fileUpload'}
    ],

    api: {
        upload_disposisi   : 'server.php/sipas/dokumen/create/disposisi',
        update_disposisi   : 'server.php/sipas/dokumen/update/disposisi',

        upload      : 'server.php/sipas/dokumen/create/dokumen',
        update      : 'server.php/sipas/dokumen/update/dokumen',
        rename      : 'server.php/sipas/dokumen/update/rename',

        view        : 'server.php/sipas/dokumen/view/{id}',
        preview     : 'server.php/sipas/dokumen/preview/{id}',
        download    : 'server.php/sipas/dokumen/download/{id}',
        available   : 'server.php/sipas/dokumen/available/{id}',
        list        : 'server.php/sipas/dokumen/list/{id}',
        isMaxs      : 'server.php/sipas/dokumen/isMaxs?id={id}&&max={max}'
    },

    messages: {
        invalidlink: ['Tautan tidak valid', 'Silahkan masukkan alamat tautan yang valid'],
        upload_failed_max : 'Gagal mengunggah dokumen karena File terlalu Besar.',
        upload_failed_ext : 'File tidak termasuk dalam tipe file yang di izinkan untuk di unggah',
        rename_success    : 'Berhasil mengubah Dokumen',
        upload_success    : 'Berhasil mengunggah Dokumen',
        max               : 'Berkas upload ulang surat ini sudah mencapai batas'
    },

    init: function()
    {
        this.control({
            'sipas_arsip_unggah_prop' :{
                show: this.onMainview_Show
            },
            'sipas_arsip_unggah_prop form filefield#fileUpload' : {
                change: this.onFileUpload_Change
            },
            'sipas_arsip_unggah_prop form button#picture' : {
                click: this.onButtonScan_Click
            },
            'sipas_arsip_unggah_prop form button#pdf' : {
                click: this.onButtonScan_Click
            },
            'sipas_arsip_unggah_prop form sipas_com_button_save' :{
                click: this.onButtonSave_Click
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            record: null,
            arsip: null,
            surat: null,
            staf: null,
            callback: Ext.emptyFn
        },config);

        var $this    = this,
            $helper  = $this.getApplication().Helper(),
            surat    = config.surat,
            arsip    = config.arsip,
            staf     = config.staf,
            $app     = $this.getApplication(),
            view     = null;
            
        switch(config.mode)
        {
            case 'add_disposisi' :
            case 'edit_disposisi' :
            case 'add'  :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    c.hideComponent         = [];
                    
                    if(config.mode === 'view'){
                        c.readonlyComponents = ['[name=dokumen_nama]','#upload','#picture','#pdf'];
                        c.removeComponents = ['[name=dokumen_islihat]'];
                    }
                    if (config.mode === 'add'){
                        c.removeComponents = ['[name=dokumen_islihat]'];
                    }
                    if (config.mode === 'edit'){
                        c.removeComponents = ['[name=dokumen_islihat]'];
                    }

                    return c;
                })(config));

                view.show();
                break;
            
            case 'destroy' :
                $helper.destroyRecord({
                    record: record,
                    callback: config.callback,
                    scope: config.scope,
                    confirm: true
                })
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $pengaturan = $app.LocalSetting(),
            jumlah = $pengaturan.get('reupload_berkas_jumlah'),
            jumlah_masuk = $pengaturan.get('reupload_berkas_surat_masuk_jumlah'),
            now = new Date(),
            mode = mainview.mode,
            surat = mainview.surat,
            arsip = mainview.arsip,
            record = mainview.record,
            store = mainview.store,
            staf = mainview.staf,
            form = $this.getForm({root:mainview}),
            cmpNama = $this.getCmpNama({root:mainview});

        if(mode === 'add' || mode === 'add_disposisi'){
            if(((surat && surat.get('surat_model') === 2 || surat && surat.get('surat_model') === 4 || surat && surat.get('surat_model') === 6) && surat && surat.get('surat_setuju') === 2) || 
                (surat && surat.get('surat_model') === 1 || (surat && surat.get('surat_model') === 3 && surat && surat.get('surat_setuju') == 1)) && surat && surat.get('surat_isdistribusi') === 1){

                if(jumlah == '0' || jumlah == null || !jumlah || jumlah_masuk == '0' || jumlah_masuk == null || !jumlah_masuk){
                    cmpNama.setValue('Dokumen '+ Ext.util.Format.date(new Date()));
                }else{

                    if (surat && surat.get('surat_model') === 2 || surat && surat.get('surat_model') === 4 || surat && surat.get('surat_model') === 6){
                        max = jumlah;
                    }else if(surat && surat.get('surat_model') === 1 || surat && surat.get('surat_model') === 3){
                        max = jumlah_masuk;
                    }

                    mainview.setLoading(true);
                    Ext.Ajax.request({
                        url: $this.getApi('isMaxs', {id: arsip.getId(), max: max}),
                        callback: function(options, success, response){
                            mainview.setLoading(false);
                        },
                        success: function(response, options){
                            var objres = Ext.decode(response.responseText, true) || {},
                                max = objres.max;

                            if(max == '1'){
                                $helper.showMsg({success:false, message:$this.getMessage('max')});
                                mainview.close();
                            }else{
                                cmpNama.setValue('Dokumen '+ Ext.util.Format.date(new Date()));
                            }
                        },
                        failure: function(response, options){}
                    });
                }
            }else{
                cmpNama.setValue('Dokumen '+ Ext.util.Format.date(new Date()));
            }
        }else{
            form.loadRecord(record);
            $helper.disableComponent({
                parent: mainview,
                items: {
                    'sipas_com_button_save': false
                }
            });
        }
    },

    onFileUpload_Change: function(filefield, value, eOpts){
        var $this = this,
            dokumenInduk = null,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:filefield}),
            cmpNama = $this.getCmpNama({root:view}),
            file_path = value,
            filename_full = file_path.replace(/^.*[\\\/]/, ''),
            filename_only = filename_full.replace(/\.[^/.]+$/, '');

        cmpNama.setValue(filename_only);
        if (filefield.getValue()){
            $helper.disableComponent({
                parent: view,
                items: {
                    'sipas_com_button_save': false
                }
            });
            $helper.hideComponent({
                parent: view,
                items: {
                    '#iconDoc': false
                }
            });
        } else {
            $helper.disableComponent({
                parent: view,
                items: {
                    'sipas_com_button_save': true
                }
            });
            $helper.hideComponent({
                parent: view,
                items: {
                    '#iconDoc': true
                }
            });
        }
    },

    onButtonScan_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            controllerScan = $this.getController('Sipas.arsip.pane.AddScanComponent');

        controllerScan.onButtonScan_Click(button, mainview);
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            dokumenInduk = null,
            $helper = $this.getApplication().Helper(),
            $localStorage = $this.getApplication().LocalStorage(),
            currentUser = $localStorage.getValue('currentUser'),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            cmpNama = $this.getCmpNama({root:view}),
            cmpLihat = $this.getCmpLihat({root:view}),
            filefield = $this.getFilefield({root:view}),
            mode = view.mode,
            store = view.store,
            surat = view.surat,
            arsip = view.arsip,
            staf = view.staf,
            model = surat && surat.get('surat_model'),
            setuju = surat && surat.get('surat_setuju'),
            distribusi = surat && surat.get('surat_isdistribusi');

        if (!cmpNama.getValue()){
            $helper.showMsg({success:false, message: 'Silahkan isi nama dokumen'});
            return;
        }
        view.setLoading(true);

        if (mode === 'add_disposisi'){ // create disposisi
            var record = store.model.create({
                dokumen_nama: cmpNama.getValue(),
                dokumen_preview: null,
                dokumen_file: null
            });

            store.insert(0, record);
            record.set('dokumen_progress', 1);
            record.commit();

            form.getForm().submit({
                url: $this.getApi('upload_disposisi'),
                headers: Ext.apply({}, Ext.Ajax.defaultHeaders, {
                  'Akun-Id':currentUser
                } ),
                params: {
                    surat_id 		: surat && surat.getId(),
                    dokumen_arsip 	: arsip && arsip.getId(),
                    dokumen_islihat : cmpLihat.getValue(),
                    staf_id         : currentUser,
                    staf 			: staf
                },
                success: function(form, action){
                    record.set((action.result && action.result.data) || {});
                    $helper.showMsg({success:true, message: $this.getMessage('upload_success')});
                    view.setLoading(false);
                    view.close();
                    record.set('dokumen_progress', 2);
                    record.commit();
                    store.reload();
                },
                failure: function(form, action){
                    var result = action.result;
                    view.setLoading(false);
                    view.close();
                    
                    if(result) $helper.showMsg({success:false, message: result.message});
                    else $helper.showMsg({success:false, message: $this.getMessage('upload_failed_max')});
                    
                    record.set('dokumen_progress', 3);
                    record.commit();
                }
            });
        } else if(mode === 'edit_disposisi') { 
            if (filefield.getValue()){ // update disposisi
                record = form.getRecord();

                dokumenInduk = record.get('dokumen_induk');
                if(dokumenInduk === null){
                    dokumenInduk = record.get('dokumen_id');
                }
                form.getForm().submit({
                    url: $this.getApi('update_disposisi'),
                    params: {
                        dokumen_arsip     : record.get('dokumen_arsip'),
                        dokumen_previous  : record.get('dokumen_id'),
                        dokumen_induk     : dokumenInduk,
                        dokumen_islihat   : cmpLihat.getValue(),
                        dokumen_nama      : cmpNama.getValue(),
                        staf_id : currentUser,
                        staf 			  : staf
                    },
                    success: function(form, action){
                        record.set((action.result && action.result.data) || {});
                        $helper.showMsg({success:true, message: $this.getMessage('upload_success')});
                        view.setLoading(false);
                        view.close();
                        record.set('dokumen_progress', 2);
                        record.commit();
                        store.reload();
                    },
                    failure: function(form, action){
                        var result = action.result;
                        view.setLoading(false);
                        view.close();
                        
                        if(result) $helper.showMsg({success:false, message: result.message});
                        else $helper.showMsg({success:false, message: $this.getMessage('upload_failed_max')});
                        
                        record.set('dokumen_progress', 3);
                        record.commit();
                    }
                });
            }else { // rename
                record = form.updateRecord().getRecord();

                form.getForm().submit({
                    url: $this.getApi('rename'),
                    params: {
                        dokumen_arsip     : record.get('dokumen_arsip'),
                        dokumen_previous  : record.get('dokumen_id'),
                        dokumen_nama      : cmpNama.getValue(),
                        dokumen_id        : record.get('dokumen_id'),
                        dokumen_islihat   : cmpLihat.getValue(),
                        isrename          : true
                    },
                    success: function(form, action){
                        $helper.showMsg({success:true, message: $this.getMessage('rename_success')});
                        view.setLoading(false);
                        view.close();
                        store.reload();
                    },
                    failure: function(form, action){
                        var result = action.result;
                        view.setLoading(false);
                        view.close();
                    }
                });
            }
        }  else {
            if (mode === 'add'){ // create
                var record = store.model.create({
                        dokumen_nama: cmpNama.getValue(),
                        dokumen_preview: null,
                        dokumen_file: null
                    });

                store.insert(0, record);
                record.set('dokumen_progress', 1);
                record.commit();

                if(((model === 2 || model === 4 || model === 6) && setuju === 2) || ((model === 1) && distribusi === 1) || ((model === 3) && distribusi === 1 && setuju === 1)){
                    reupload = 1;
                }else{
                    reupload = 0;
                }
                form.getForm().submit({
                    url: $this.getApi('upload'),
                    headers: Ext.apply({}, Ext.Ajax.defaultHeaders, {
                      'Akun-Id':currentUser
                    } ),
                    params: {
                        surat_id 			: surat && surat.getId(),
                        dokumen_arsip 		: arsip && arsip.getId(),
                        dokumen_reupload    : reupload,
                        staf_id 	        : currentUser
                    },
                    success: function(form, action){
                        record.set((action.result && action.result.data) || {});
                        $helper.showMsg({success:true, message: $this.getMessage('upload_success')});
                        view.setLoading(false);
                        view.close();
                        record.set('dokumen_progress', 2);
                        record.commit();
                        store.reload();
                    },
                    failure: function(form, action){
                        var result = action.result;
                        view.setLoading(false);
                        view.close();
                        
                        if(result) $helper.showMsg({success:false, message: result.message});
                        else $helper.showMsg({success:false, message: $this.getMessage('upload_failed_max')});
                        
                        record.set('dokumen_progress', 3);
                        record.commit();
                    }
                });
            } else {
                if (filefield.getValue()){ // update
                    record = form.getRecord();

                    dokumenInduk = record.get('dokumen_induk');
                    if(dokumenInduk === null){
                        dokumenInduk = record.get('dokumen_id');
                    }
                    form.getForm().submit({
                        url: $this.getApi('update'),
                        params: {
                            dokumen_arsip     : record.get('dokumen_arsip'),
                            dokumen_previous  : record.get('dokumen_id'),
                            dokumen_induk     : dokumenInduk,
                            dokumen_nama      : cmpNama.getValue(),
                            staf_id 		  : currentUser
                        },
                        success: function(form, action){
                            record.set((action.result && action.result.data) || {});
                            $helper.showMsg({success:true, message: $this.getMessage('upload_success')});
                            view.setLoading(false);
                            view.close();
                            record.set('dokumen_progress', 2);
                            record.commit();
                            store.reload();
                        },
                        failure: function(form, action){
                            var result = action.result;
                            view.setLoading(false);
                            view.close();
                            
                            if(result) $helper.showMsg({success:false, message: result.message});
                            else $helper.showMsg({success:false, message: $this.getMessage('upload_failed_max')});
                            
                            record.set('dokumen_progress', 3);
                            record.commit();
                        }
                    });
                } else { // rename
                    record = form.updateRecord().getRecord();

                    form.getForm().submit({
                        url: $this.getApi('rename'),
                        params: {
                            dokumen_arsip     : record.get('dokumen_arsip'),
                            dokumen_previous  : record.get('dokumen_id'),
                            dokumen_nama      : cmpNama.getValue(),
                            dokumen_id        : record.get('dokumen_id'),
                            isrename          : true
                        },
                        success: function(form, action){
                            $helper.showMsg({success:true, message: $this.getMessage('rename_success')});
                            view.setLoading(false);
                            view.close();
                            store.reload();
                        },
                        failure: function(form, action){
                            var result = action.result;
                            view.setLoading(false);
                            view.close();
                        }
                    });
                }
            }
        }
    }
});