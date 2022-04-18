Ext.define('SIPAS.controller.Sipas.staf.upload.tandatangan.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.Dokumen'
    ],

    views: [
        'Sipas.staf.upload.tandatangan.Popup'
    ],

    refs: [
        { ref: 'mainview',          selector: 'sipas_staf_upload_tandatangan_popup'},
        { ref: 'form',              selector: 'sipas_staf_upload_tandatangan_popup > form'},
        { ref: 'containerImage',    selector: 'sipas_staf_upload_tandatangan_popup > form #containerImage'},
        { ref: 'filefield',         selector: 'sipas_staf_upload_tandatangan_popup > form filefield#fileUpload'}
    ],

    api: {
        set_image_ttd   : 'server.php/sipas/staf/set_image/ttd?id={id}',
        get_image_ttd   : 'server.php/sipas/staf/get_image/ttd?id={id}'
    },

    messages: {
        invalidlink: ['Tautan tidak valid', 'Silahkan masukkan alamat tautan yang valid'],
        upload_failed_max : 'Gagal mengunggah dokumen karena File terlalu Besar.',
        upload_failed_ext : 'File tidak termasuk dalam tipe file yang di izinkan untuk di unggah',
        rename_success    : 'Berhasil mengubah Dokumen',
        max               : 'Berkas upload ulang surat ini sudah mencapai batas'
    },

    init: function()
    {
        this.control({
            'sipas_staf_upload_tandatangan_popup' :{
                show: this.onMainview_Show
            },
            'sipas_staf_upload_tandatangan_popup form filefield#fileUpload' : {
                change: this.onFileUpload_Change
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
            callback: Ext.emptyFn
        },config);

        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = null;
            
        switch(config.mode)
        {
            case 'add' :
            case 'edit' :
            case 'view' :

                view = $this.createView((function(c){
                    c.requireComponents     = [];
                    c.removeComponents      = [];
                    c.readonlyComponents    = [];
                    c.hideComponent         = [];

                    if (c.mode === 'view'){
                        c.removeComponents.push('#toolbarAction');
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
            $session = $app.getSession(),
            $settings = $app.LocalSetting(),
            form = $this.getForm({root:mainview}),
            record = mainview.record;

        form.loadRecord(record);
        $this.loadImage(mainview);
    },

    onFileUpload_Change: function(filefield, value, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:filefield}),
            form = $this.getForm({root:view}),
            record = form && form.getRecord(),
            id = record.getId();

        view.setLoading(true);
        form.submit({
            url : $this.getApi('set_image_ttd', {
                id: id
            }),
            success: function ( result, request ) {
                $helper.showMsg({
                    success:true,
                    message:'Tanda tangan berhasil disimpan'
                });
                view.setLoading(false);
                $this.loadImage(view);
            },
            failure: function ( result, request ) {
                view.setLoading(false);
                var objres = Ext.decode(request.response.responseText, true) || {};
                $helper.showMsg({
                    success:false,
                    message:objres.message || $this.getMessage('message_invalid')
                });
            }
        });
    },

    loadImage: function(view) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = view || $this.getMainview(),
            form = $this.getForm({root:view}),
            containerImage = $this.getContainerImage({root:view}),
            record = form && form.getRecord();

        if(!record) return;
        containerImage.setLoading(true);
        Ext.ComponentQuery.query('[name=container_ttd]', view).forEach(function(comp){
            var t = new Ext.Template("<img src='{url}' style='height:160px; width:280px;'/>");
            comp.update(t.apply({
                url: Ext.String.urlAppend($this.getApi('get_image_ttd', {
                    id: record.getId()
                }), '_dc='+Date.now())
            }));
        });
        containerImage.setLoading(false);
    }
});