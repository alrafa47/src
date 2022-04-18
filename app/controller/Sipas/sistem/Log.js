Ext.define('SIPAS.controller.Sipas.sistem.Log', {
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.util.MixedCollection'
	],

	logs: null,

	init: function(application){

		// this class is supposed to be listen and or serve any logging information
		// could be syncable with server or vise versa
		
		application.on({
			'sipas/log/error/push': Ext.emptyFn,
			'sipas/log/success/push': Ext.emptyFn,
			'sipas/log/info/push': Ext.emptyFn
		})

	},

	getDataSource: function(){
		if(!(this.logs instanceof Ext.util.MixedCollection)){
			this.logs = Ext.create('Ext.util.MixedCollection',{});
		}
		return this.logs;
	},

	// this just an alias of Ext.log
	log: function(){
		Ext.log.apply(arguments)
	}



});