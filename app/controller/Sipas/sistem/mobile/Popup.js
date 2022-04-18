Ext.define('SIPAS.controller.Sipas.sistem.mobile.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	 'Sipas.sistem.mobile.Popup'
    ],

    refs: [
    	{ref: 'mainview', 		selector: 'sipas_sistem_mobile_popup'},
        {ref: 'imgDownload',    selector: 'sipas_sistem_mobile_popup #imgDownload'},
        {ref: 'textDownload',   selector: 'sipas_sistem_mobile_popup #textDownload'}
    ],

    init: function(application){
    	this.control({
    		'sipas_sistem_mobile_popup': {
                'show': this.onMainview_Show,
                'loaddownload': this.onMainview_LoadDownload
            },
            'sipas_sistem_mobile_popup #buttonLinkDownload': {
                'click': this.onButtonLinkDownload_Click
            },
            'sipas_sistem_mobile_popup #buttonServer': {
                'click': this.onButtonServer_Click
            },
            'sipas_sistem_mobile_popup #buttonProfile': {
                'click': this.onButtonProfile_Click
            }
    	});
    },

    launch: function(config)
    {
        var mainview = this.createView(config);

        mainview.show();
    },

    onMainview_Show: function(mainview)
    {
    	mainview.fireEvent('loaddownload', mainview);
    },

    onMainview_LoadDownload: function(mainview)
    {
    	var img = this.getImgDownload({root:mainview}),
    		text = this.getTextDownload({root:mainview}),
            // url = window.location.href + this.getApplication().mobile;
    		url = window.location.href + this.getApplication().getMetadata('mobile');

    	var qr = new QRCode(img.getEl().dom, {
			text: url,
			width: img.getWidth(),
			height: img.getHeight()
		});

        text.setValue(url);
    },

    onButtonLinkDownload_Click: function(button, e, eOpts){
        window.open(this.getApplication().getMetadata('mobile'), '_blank');
    },

    onButtonServer_Click: function(button, e, eOpts){
        // this.getController('Sipas.sistem.mobile.server.Popup').launch();
        this.getController('Sipas.sistem.mobile.url.Popup').launch();
    },

    onButtonProfile_Click: function(button, e, eOpts){
        // this.getController('Sipas.sistem.mobile.server.Popup').launch();
        this.getController('Sipas.sistem.mobile.url.Popup').launch();
    }

});