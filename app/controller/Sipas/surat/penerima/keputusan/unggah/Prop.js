Ext.define('SIPAS.controller.Sipas.surat.penerima.keputusan.unggah.Prop', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    // models: [
    //     'Sipas.Dokumen'
    // ],

    views: [
        'Sipas.surat.penerima.keputusan.unggah.Prop'
    ],

    refs: [
        { ref: 'mainview',      selector: 'sipas_surat_penerima_keputusan_unggah_prop'},
        { ref: 'form',          selector: 'sipas_surat_penerima_keputusan_unggah_prop > form'},
        { ref: 'cmpNama',       selector: 'sipas_surat_penerima_keputusan_unggah_prop > form [name=file_nama]'},
        { ref: 'filefield',     selector: 'sipas_surat_penerima_keputusan_unggah_prop > form #fileUpload'}
    ],

    api: {
        upload      : 'server.php/sipas/dokumen/create/dokumen',
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
            'sipas_surat_penerima_keputusan_unggah_prop' :{
                show: this.onMainview_Show
            },
            'sipas_surat_penerima_keputusan_unggah_prop form filefield#fileUpload' : {
                change: this.onFileUpload_Change
            },
            'sipas_surat_penerima_keputusan_unggah_prop form sipas_com_button_upload' :{
                click: this.onButtonUpload_Click
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
            case 'add'  :
            case 'edit' :
            case 'view' :
                view = $this.createView((function(c){
                    // c.requireComponents     = [];
                    // c.removeComponents      = [];
                    // c.readonlyComponents    = [];
                    // c.hideComponent         = [];
                    
                    // if(config.mode === 'view'){
                    //     c.readonlyComponents = ['[name=dokumen_nama]','#upload','#picture','#pdf'];
                    //     c.removeComponents = ['[name=dokumen_islihat]'];
                    // }
                    // if (config.mode === 'add'){
                    //     c.removeComponents = ['[name=dokumen_islihat]'];
                    // }
                    // if (config.mode === 'edit'){
                    //     c.removeComponents = ['[name=dokumen_islihat]'];
                    // }

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
        var $this = this;
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
                    'sipas_com_button_upload': false
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
                    'sipas_com_button_upload': true
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

    onButtonUpload_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            cmpNama = $this.getCmpNama({root:view}),
            form = $this.getForm({root:view}),
            api = 'server.php/sipas/surat_keputusan/set_template_kolektif';

        if (!cmpNama.getValue()){
            $helper.showMsg({success:false, message: 'Silahkan pilih file'});
            return;
        }

        view.setLoading(true);
        form.getForm().submit({
            url: api,
            // headers: Ext.apply({}, Ext.Ajax.defaultHeaders, {
            //   'Akun-Id':currentUser
            // } ),
            params: null,
            success: function(form, action){
                view.close();
                if(action.result.success) {
                    $helper.showMsg({success:true, message: $this.getMessage('upload_success')});
                    Ext.callback(view.callback, view, [action.result]);
                } else {
                    $helper.showMsg({success:false, message: 'Data tidak ditemukan'});
                }
            },
            failure: function(form, action){
                var result = action.result;
                view.setLoading(false);
                view.close();
                
                if(result) $helper.showMsg({success:false, message: result.message});
                else $helper.showMsg({success:false, message: $this.getMessage('upload_failed_max')});
                
                // record.set('dokumen_progress', 3);
                // record.commit();
            }
        });
    }
});