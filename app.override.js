Ext.onReady(function(){
    Ext.define('SIPAS.controller.Sipas.CustomOverride', {
        extend: 'Ext.app.Controller',

        init: function(){
            this.control({
            });
        }
    }, function(c){
        Ext.create(c).init();
    });
 //    Ext.override(Ext.data.Connection, {
 //        timeout:1800000
	// });
	// Ext.override(Ext.data.proxy.Ajax, {
	//     timeout:1800000
	// });
});