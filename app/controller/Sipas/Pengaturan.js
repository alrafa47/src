Ext.define('SIPAS.controller.Sipas.Pengaturan', {
	extend: 'Ext.app.Controller',

	urlGet: 'server.php/sipas/pengaturan/get_setting',
	urlSet: 'server.php/sipas/pengaturan/set_setting',

	/**
	 * A Set of settings fetch from server.
	 * Should be a Store with Memory Proxy instead of Collection, better purpose and management
	 * @type {Ext.data.Store}
	 */
	settings: null,

	init: function(application){
		Ext.apply(application, {
			getSetting: Ext.Function.alias(this, 'getSetting')
		});
	},

	getSetting: function(settingCode){
		var settings = this.settings || {};
		return settings && settings[settingCode];        
	},

	setSetting: function(settingCode, settingValue){
		this.settings = this.settings || {};

		if(Ext.isObject(settingCode)) this.settings = Ext.apply(this.settings, settingCode);
		if(Ext.isString(settingCode)) this.settings[settingCode] = settingValue;
	},

	getSettings: function(config){
		if(Ext.isFunction(config) || Ext.isString)
		config = Ext.applyIf(config || {},{
			reload: false
		});

		if(config.reload === true){
			this.loadSettings(config);
		}
		return this.settings;
	},

	setSettings: function(settings){
		this.settings = settings;
		return this;
	},

	/**
	 * Load settings from server.
	 *
	 *      Sipas.Setting.loadSettings(function(settings){
	 *         // do whatever with setting 
	 *      });
	 *
	 *      // or like this
	 *      Sipas.Setting.loadSettings({
	 *          url: 'changeUrl' // for one time only
	 *          callback: someCallback
	 *      }); 
	 * 
	 * @return {SIPAS.controller.Sipas.Setting} this
	 */
	loadSettings: function(config, scope){
		var $this = this;
		if(Ext.isFunction(config) || Ext.isString(config)) {
			config = {
				success: config,
				scope: scope || this
			}
		}
		if(Ext.isObject(config)){
			config = Ext.applyIf(config,{
				url: this.urlGet,
				callback: Ext.emptyFn,
				success: Ext.emptyFn,
				failure: Ext.emptyFn,
				scope: this
			});
			Ext.Ajax.request({
				url: this.urlGet,
				callback: function(success, response, options){
					var objres = Ext.decode(response.responseText, true);
					Ext.callback(config.callback, config.scope, [this.settings, response, $this]);
					if(objres && success){
						this.settings = objres;
						Ext.callback(config.succes, config.scope, [this.settings, response, $this]);
					}else{
						Ext.callback(config.failure, config.scope, [response, $this]);
					}
				}
			});
		}
		return this;         
	}

});
