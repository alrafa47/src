Ext.define('SIPAS.controller.Sipas.sdoc.editor.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    models: [
        'Sipas.Dokumen'
    ],

    views: [
        'Sipas.sdoc.editor.Popup'
    ],
    refs: [
        {ref: 'mainview',   selector: 'sipas_sdoc_editor_popup'},
        {ref: 'form',       selector: 'sipas_sdoc_editor_popup > form'},
        {ref: 'editor',     selector: 'sipas_sdoc_editor_popup sipas_com_ckeditor'}
    ],

    api: {
        upload : 'server.php/sipas/dokumen/create/sdoc',
        update : 'server.php/sipas/dokumen/update/sdoc'
    },

    init: function(application)
    {
        this.control({
            'sipas_sdoc_editor_popup': {
                afterrender: this.onMainview_AfterRender
            },
            'sipas_sdoc_editor_popup sipas_com_button_save': {
                click: this.onButtonSave_Click
            }
        });
    },

    ispetikan: null,

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'view',
            surat: surat,
            arsip: arsip,
            record: null,
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            surat = config.surat,
            arsip = config.arsip,
            record = $this.createRecord(config.record),
            view = null;

        $this.ispetikan = config.ispetikan;

        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    
                    if(config.mode === 'view'){
                        c.removeComponents = ['#toolbarBottom'];
                        c.readonlyComponents = ['sipas_com_ckeditor'];
                    }
                    return c;
                })(config));
                
                var form = this.getForm({root:view});
                form.loadRecord(record);
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

    /* watermark 'DRAFT' */
    onMainview_AfterRender: function(mainview, e, eOpts)
    {
        var editor = this.getEditor({root:mainview}),
            surat = mainview.surat,  
            surat_setuju = (surat)? surat.get('surat_setuju') : null, 
            surat_model = (surat)? surat.get('surat_model') : null,
            mode = mainview.mode,
            sdoc = mainview.sdoc || {};

            if(mode === 'view'){
              if((surat_model === 2 || surat_model === 4 || surat_model === 6) && surat_setuju !== 2){   
                  sdoc.value = '<div class="draft-state"></div>'+sdoc.value;
              }else{
                  sdoc.value = sdoc.value;  
              }    
            }
        
        editor.setValue(sdoc.value || mainview.value);
        if(sdoc.name)
        {
            mainview.setTitle(mainview.title + ' - ' + sdoc.name);
        }
    },

    onButtonSave_Click: function(button, e, eOpts)
    {
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root: mainview}),
            editor = $this.getEditor({root:mainview}),
            value = editor.getValue(),
            record = form.getRecord(),
            surat = mainview.surat,
            arsip = mainview.arsip,
            dokumenInduk = record.get('dokumen_induk'),
            callback = mainview.callback || Ext.emptyFn,
            scope = mainview.scope || $this,
            sdoc = mainview.sdoc;

        mainview.setLoading(true);
        // sdoc.oldValue = sdoc.value;
        // sdoc.value = btoa(value);
        sdoc.value = btoa(unescape(encodeURIComponent(value)));

        $helper.showConfirm({
            confirmTitle: "Simpan",
            confirmText: "Apakah anda yakin ?",
            callback: function(button){
                if (button == 'yes'){
                    if(mainview.mode === 'add'){
                        Ext.Ajax.request({
                            url: $this.getApi('upload'),
                            params: {
                                'surat_id'          : surat && surat.get('surat_id'),
                                'dokumen_arsip'     : arsip.getId(),
                                'dokumen_nama'      : sdoc.name,
                                'dokumen_file'      : sdoc.value,
                                'dokumen_ispetikan' : $this.ispetikan
                            },
                            success: function(response, eOpts){                                   
                                var res = Ext.decode(response.responseText),
                                success = res.success;
                                mainview.setLoading(false);
                                if(success) {
                                    mainview.close();
                                    $helper.showMsg({success: true, message: 'Berhasil menyimpan online dokumen'});
                                    Ext.callback(callback, scope, [sdoc]);
                                }else{
                                    $helper.showMsg({success: false, message: 'Gagal menyimpan online dokumen'});
                                } 
                            },
                            failure: function(response){
                                mainview.setLoading(false);
                                if(response.status == 500){
                                    $helper.showMsg({success: false, message: 'Terjadi kesalahan server'});
                                }else{
                                    $helper.showMsg({success: false, message: 'Koneksi dengan server terputus'});
                                }
                            }
                        });
                    }else{
                        if(dokumenInduk === null){
                            dokumenInduk = record.get('dokumen_id');
                        }
                        Ext.Ajax.request({
                            url: $this.getApi('update'),
                            params: {
                                'dokumen_arsip'     : record.get('dokumen_arsip'),
                                'dokumen_previous'  : record.get('dokumen_id'),
                                'dokumen_induk'     : dokumenInduk,
                                'dokumen_nama'      : sdoc.name,
                                'dokumen_file'      : sdoc.value,
                                'dokumen_ispetikan' : $this.ispetikan
                            },
                            success: function(response, eOpts){                                             
                                var res = Ext.decode(response.responseText),
                                success = res.success;
                                mainview.setLoading(false);
                                if(success) {
                                    mainview.close();
                                    $helper.showMsg({success: true, message: 'Berhasil menyimpan online dokumen'});
                                    Ext.callback(callback, scope, [sdoc]);
                                }else{
                                    $helper.showMsg({success: false, message: 'Gagal menyimpan online dokumen'});
                                } 
                            },
                            failure: function(response){
                                mainview.setLoading(false);
                                if(response.status == 500){
                                    $helper.showMsg({success: false, message: 'Terjadi kesalahan server'});
                                }else{
                                    $helper.showMsg({success: false, message: 'Koneksi dengan server terputus'});
                                }
                            }
                        });
                    }
                } else {
                    mainview.setLoading(false);
                }
            }
        });
    }
});
