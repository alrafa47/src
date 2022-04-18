Ext.define('SIPAS.controller.Sipas.session.Setting', {
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.util.MixedCollection'
	],

	mixins: {
        template: 'Ext.ux.controller.Template'
    },

	api: {
		datasource:'server.php/sipas/account/info/setting'
	},

	settings: null,

	init: function(application){
		var $this = this;

		Ext.apply(application, {
			LocalSetting: function(){
				return $this;
			},
			SessionSetting: function(){
				return $this;
			}
		});
		Ext.apply(this, {
			get: Ext.Function.alias(this, 'getSetting'),
			set: Ext.Function.alias(this, 'setSetting')
		});

		application.on({
			'sipas/session/start': this.onApp_SessionStart,
			'sipas/session/terminate': this.onApp_SessionTerminate,
			scope: this
		});
	},

	onApp_SessionStart: function()
	{
		var $this = this,
			$app = this.getApplication(),
			$session = $app.Session(),
			datastore = this.getDataSource();

		datastore.removeAll();
		datastore.addAll($session.getSession().setting);
	},

	onApp_SessionTerminate: function()
	{
		var datastore = this.getDataSource();

		datastore.removeAll();
	},

	getDataSource: function()
	{
		if(!(this.settings instanceof Ext.util.MixedCollection)){
			this.settings = Ext.create('Ext.util.MixedCollection',{});
		}
		return this.settings;
	},

	getSetting: function(name)
	{
		var s = this.getDataSource(),
			v = s.get(name);
		return v;
	},

	setSetting: function(name, value)
	{
		var s = this.getDataSource();

		s.set(name, value);
		return this;
	},

	load: function()
	{
		Ext.Ajax.request({
			url: this.getApi('datasource'),
			success: function(response){
				var objres = Ext.decode(response.responseText, true);
			}
		});
	}

});
