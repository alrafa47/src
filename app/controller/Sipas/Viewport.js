Ext.define('SIPAS.controller.Sipas.Viewport', {
    extend: 'Ext.app.Controller',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview'
    },

    views: [
        'Sipas.Viewport'
    ],


    refs: [
        { ref: 'viewport', selector: 'sipas_viewport', xtype:'sipas_viewport', autoCreate:true },
    	{ ref: 'mainview', selector: 'sipas_viewport', xtype:'sipas_viewport', autoCreate:true }
    ],

    launch: function() {
    	return this.getViewport();
    }

});
