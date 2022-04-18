Ext.define('SIPAS.controller.Sipas.staf.upload.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.staf.upload.Pane'
    ],

    api: {
        set_image_foto	: 'server.php/sipas/staf/set_image/foto?id={id}',
        get_image_foto  : 'server.php/sipas/staf/get_image/foto?id={id}',
        set_image_ttd   : 'server.php/sipas/staf/set_image/ttd?id={id}',
        get_image_ttd   : 'server.php/sipas/staf/get_image/ttd?id={id}'
    },

    refs : [
        { ref: 'mainview',          selector: 'sipas_staf_upload_pane'},
        { ref: 'form',              selector: 'sipas_staf_upload_pane > form'}
    ],

    messages: {
        upload_success: 'Upload berhasil',
        upload_failed:  'Upload gagal',
        response_invalid: 'Server tidak memberikan valid response',
        message_invalid: 'Gagal menampilkan pesan',
        image_uploading: 'Mengupload gambar'
    },

    init: function(application) {
        this.control({
			'sipas_staf_upload_pane': {
				afterrender: this.onMainview_AfterRender
			},
			'sipas_staf_upload_pane filefield[cls*=setImage]': {
                change: this.onFilefieldChange
            }
        });
    },

    launch: function(config) {
        var $this = this,
            record = config.record,
            reference = config.reference,
            $helper = $this.getApplication().Helper(),
            view = $this.createView(Ext.apply({
                removeComponents: (config.mode == 'view') ? [
                    'filefield'
                ] : []
            },config));
            
        view || view.config(reference);
        return view;
    },

    onFilefieldChange: function(filefield, value, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
			view = $this.getMainview(),
			record = view.record,
			id = (record && record.getId()) || view.reference,
			filename = filefield.getName(),
            imageContainer = filefield.getContainerImage(),
			url = $this.getApi('set_image_'+filename, {
				id: id
			});

        imageContainer.setLoading(true);
        filefield.up('form').getForm().submit({
            url : url,
            success: function ( result, request ) {
				imageContainer.setLoading(false);
                $this.loadImage(filename, view);
            },
            failure: function ( result, request ) {
				imageContainer.setLoading(false);
                var objres = Ext.decode(request.response.responseText, true) || {};
				$helper.showMsg({
					success:false,
					message:objres.message || $this.getMessage('message_invalid')
				});
            }
        });
    },

	onMainview_AfterRender: function(component, e, eOpts){
		this.loadImage('foto', component);
		this.loadImage('ttd', component);
	},

    loadImage: function(section, view) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = view || $this.getMainview();

        Ext.ComponentQuery.query('[name=container_'+section+']', view).forEach(function(comp){
            var t = new Ext.Template("<img src='{url}' />");
            comp.update(t.apply({
                url: Ext.String.urlAppend($this.getApi('get_image_'+section, {
					id: view.reference
				}), '_dc='+Date.now())
            }));
        });
    }

});
