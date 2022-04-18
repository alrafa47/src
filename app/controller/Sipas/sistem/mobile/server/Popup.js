Ext.define('SIPAS.controller.Sipas.sistem.mobile.server.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
    	 'Sipas.sistem.mobile.server.Popup'
    ],

    refs: [
    	{ref: 'mainview', 		selector: 'sipas_sistem_mobile_server_popup'},
    	{ref: 'imgServer',   	selector: 'sipas_sistem_mobile_server_popup #imgServer'},
        {ref: 'textServer',   	selector: 'sipas_sistem_mobile_server_popup #textServer'}
    ],

    init: function(application){
    	this.control({
    		'sipas_sistem_mobile_server_popup': {
                'show': this.onMainview_Show,
                'loadserver': this.onMainview_LoadServer
            },
            'sipas_sistem_mobile_server_popup #buttonDownload': {
    			'click': this.onButtonDownload_Click
    		}
    	});
    },

    launch: function(config) {
        // window.open(this.getApplication().mobile, '_blank');
        var mainview = this.createView(config);

        mainview.show();
    },

    onMainview_Show: function(mainview)
    {
    	mainview.fireEvent('loadserver', mainview);
    },

    onMainview_LoadServer: function(mainview)
    {
    	var img = this.getImgServer({root:mainview}),
    		text = this.getTextServer({root:mainview}),
    		url = window.location.href;

    	var qr = new QRCode(img.getEl().dom, {
            text: url,
            width: img.getWidth(),
            height: img.getHeight()
        });
        text.setValue(url);
    },

    onButtonDownload_Click: function(button, e, eOpts){
        window.open(this.getApplication().mobile, '_blank');
    }

});