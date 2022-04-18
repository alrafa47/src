Ext.define('SIPAS.controller.Sipas.arsip.pane.ItemComponent', {
    extend: 'SIPAS.controller.Sipas.base.View',

    views:[
        'Sipas.arsip.Pane'
    ],
    
    refs : [
        { ref: 'mainview', selector: 'sipas_arsip_pane'},
        { ref: 'dataview', selector: 'sipas_arsip_pane dataview'}
    ],

    api: {
        destroy     : 'server.php/sipas/dokumen/destroy',
        view        : 'server.php/sipas/dokumen/view?id={dokumen_id}',
        download    : 'server.php/sipas/dokumen/download?id={dokumen_id}'
    },

    messages: {
        'invalidMode': ['Peringatan', 'Berkas dengan format .link tidak dapat di unduh'],
        'approver_empty': 'Harap memilih penyetuju surat untuk data online dokumen',
        'receiver_empty': 'Harap memilih penerima surat untuk data online dokumen',
        'receiver_limit': 'Batas penerima maksimal hanya 50 pegawai',
        'receiver_invalid': 'Penerima tidak memiliki akses untuk menjadi penerima, mohon ganti penerima'
    },

    viewViewer: 'Sipas.Viewer',

    init: function(application)
    {
        this.control({
            'sipas_arsip_pane button#buttonMenuArsip menu menuitem[action]': {
                click: this.onMainview_Action
            },
            'sipas_arsip_pane': {
                doitemopen: this.onMainview_DoItemOpen,
                doitemdownload: this.onMainview_DoItemDownload,
                doitemedit: this.onMainview_DoItemEdit,
                doitemdelete: this.onMainview_DoItemDelete,
                doitemlog: this.onMainview_DoItemLog
            }
        });
    },

    onMainview_Action: function(component, e, eOpts)
    {
        var mainview = this.getMainview({from:component}),
            action = component.action,
            menu = component.up('menu'),
            record = menu.record;
        
        mainview.fireEvent('do'+'item'+action, mainview, record);
    },

    onMainview_DoItemOpen: function(mainview, record)
    {
        var $this = this,
            controllerEditor = $this.getController('Sipas.arsip.preview.Popup'),
            file = record.get('dokumen_file'),
            name = record.get('dokumen_nama'),
            surat = mainview.surat,
            staf = mainview.staf,
            arsip = mainview.arsip;

        controllerEditor.launch({
            record: record,
            surat : surat,           
            arsip : arsip
        });
    },

    onMainview_DoItemDownload: function(mainview, record)
    {
        var $this = this,
            extension = record.get('dokumen_ext');

        if(record)
        {
            switch(extension){
                case '.link':
                    var message = $this.getMessage('invalidMode');
                    Ext.Msg.alert(message[0], message[1]);
                    break;
                default:
                    window.open(location.href+$this.getApi('download', {dokumen_id:record.getId()}), '_blank');
                    break;
            }
        }
    },

    onMainview_DoItemEdit: function(mainview, record)
    {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            checkSession = this.getApplication().getSession().getResetSession(),
            dataview = $this.getDataview({root:mainview}),
            form = mainview && mainview.up('form'),
            panePenyetuju = form.down('#panePenyetuju'),
            storePenyetuju = panePenyetuju && panePenyetuju.getStore(),
            panePenerima = form.down('#panePenerima'),
            storePenerima = panePenerima && panePenerima.getStore(),
            recordSurat = form && form.updateRecord().getRecord(),
            store = dataview && dataview.getStore(),
            extension = record.get('dokumen_ext'),
            controllerLink = $this.getController('Sipas.arsip.link.Prop'),
            controllerSdoc = $this.getController('Sipas.arsip.sdoc.Prop'),
            controllerUnggah = $this.getController('Sipas.arsip.unggah.Prop'),
            jabatan_ispenerima = [],
            surat = mainview.surat,
            staf = mainview.staf,
            view = $this.getMainview(),
            mode = view.mode;

        if (mode == 'add_disposisi') {
            controllerUnggah.launch({
                record : record,
                staf : staf,
                store: store,
                mode: 'edit_disposisi'
            });
        }else{
            if(extension === '.link'){
                controllerLink.launch({
                    record : record,
                    staf : staf,
                    mode: 'edit',
                    callback: function(link)
                    {
                        record = store.model.create({
                            'dokumen_nama': link,
                            'dokumen_arsip': mainview.record && mainview.record.getId()
                        });
                        
                        store.insert(0, record);
                        mainview.setLoading(true);
                        store.reload();
                        mainview.setLoading(false);
                    },
                    scope: $this
                });
            }else if(extension === '.sdoc'){
                if(mode == 'ubah'){    
                    params = {
                        'upy[]' : [], //penyetuju
                        'upy_p[]' : [], //penyetuju_profil
                        'upn[]' : [], //penerima
                        'upn_p[]' : [], //penerima_profil
                        't[]' : [], //tembusan
                        // 'b[]': [],
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

                    if((recordSurat.get('surat_model') == '2' || recordSurat.get('surat_model') == '4') && !params['upy[]'].length){
                        $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
                        return;
                    }

                    if(recordSurat.get('surat_model') == '1'  && !params['upn[]'].length){
                        $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                        return;
                    }

                    if(recordSurat.get('surat_model') == '4' ){
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
                    params = {
                        // 'b[]': [],
                        'sdoc' : 1
                    };
                }else{
                     params = {
                        'py[]' : [],
                        'py_p[]' : [],
                        'pn[]' : [],
                        'pn_p[]' : [],
                        't[]' : [],
                        // 'b[]': [],
                        'temp' : 1,
                        'sdoc' : 1
                    };        

                    storePenyetuju && storePenyetuju.each(function(r){
                        params['py[]'].push(r.get('staf_id'));

                        if (r.get('surat_stack_profil')) {
                          params['py_p[]'].push(r.get('surat_stack_profil'));
                        }else{
                            params['py_p[]'].push(r.get('staf_profil'));
                        }
                    });

                    storePenerima && storePenerima.each(function(r){
                        params['pn[]'].push(r.get('staf_id'));
                        params['t[]'].push(r.get('surat_stack_istembusan'));
                        // params['b[]'].push(r.get('surat_stack_isberkas'));
                        if (!r.get('jabatan_ispenerima')) jabatan_ispenerima.push(r.get('jabatan_ispenerima'));

                        if (r.get('surat_stack_profil')) {
                            params['pn_p[]'].push(r.get('surat_stack_profil'));
                        }else{
                            params['pn_p[]'].push(r.get('staf_profil'));
                        }
                    });

                    if((recordSurat.get('surat_model') == '2' || recordSurat.get('surat_model') == '4') && Ext.Array.contains(['add','edit', 'reply'], view.mode) && !params['py[]'].length){
                        $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
                        return;
                    }

                    if(recordSurat.get('surat_model') == '1' && Ext.Array.contains(['add','edit'], view.mode) && !params['pn[]'].length){
                        $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
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

                    if(Ext.Array.contains(['add','edit'], view.mode) && params['pn[]'].length > 50){
                        $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                        return;
                    }
                }

                $helper.saveRecord({
                    form: form,
                    record: recordSurat,
                    params: params,
                    message: false,
                    wait: true,
                    callback: function(success, records, eOpts, response){  
                        controllerSdoc.launch({
                            record : record,
                            surat : surat,
                            staf : staf,
                            mode: 'edit',
                            callback: function(sdoc)
                            {
                                record = store.model.create({
                                    'dokumen_nama': sdoc,
                                    'dokumen_arsip': mainview.record && mainview.record.getId()
                                });
                                
                                store.insert(0, record);
                                store.reload();
                            },
                            scope: this
                        });
                    }
                });
            }else{
                controllerUnggah.launch({
                    record : record,
                    store: store,
                    staf : staf,
                    mode: 'edit'
                });
            }
        }
    },

    onMainview_DoItemDelete: function(mainview, record)
    {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            dataview = this.getDataview({root:mainview}),
            store = dataview && dataview.getStore(),
            dokumenId = record.get('dokumen_id');

        $helper.showConfirm({
            confirmTitle: 'Konfirmasi Hapus Berkas',
            confirmText : 'Apakah anda yakin untuk menghapus berkas ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('destroy'),
                        params: {
                            'dokumen_id' : dokumenId,
                            'dokumen_properti' : record.get('dokumen_properti')
                        },
                        success: function(response, eOpts){
                            mainview.setLoading(true);
                            store.reload();
                            mainview.setLoading(false);
                            // store.loadPage(1);
                            // store.nextPage({
                            //   addRecords: true
                            // });
                            $helper.showMsg({success: true, message: 'Berhasil Menghapus Berkas'});
                        }
                    });
                }
            }
        });
    },

    onMainview_DoItemLog: function(mainview, record)
    {
        var $this = this,
            controllerLog = $this.getController('Sipas.arsip.log.Popup');

        controllerLog.launch({
            record : record,
            mode: 'view'
        });
    },

    onProses_DoItem: function(mainview, record){

    }
});