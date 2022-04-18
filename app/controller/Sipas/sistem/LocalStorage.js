Ext.define('SIPAS.controller.Sipas.sistem.LocalStorage', {
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.util.LocalStorage'
	],

	_localstorage: null,

	init: function(application)
	{
		var $this = this;
		Ext.apply(application, {
			getLocalStorage: function () {
				return $this;
			},
			LocalStorage: function(){
				return $this;
			}
		});
	},

	settings: function()
	{
		if(!this._localstorage)
		{
			this._localstorage = new Ext.util.LocalStorage({id: 'webapp'});
		}
		return this._localstorage;
	},

	getValue: function(settingCode, callback, scope)
	{
		var callback = callback || Ext.emptyFn, 
			scope = scope || this,
			value = this.settings().getItem(settingCode);

		if(Ext.isString(value))
		{
			if(value.toLowerCase() == 'true')
			{
				value = true;
			}
			else if(value.toLowerCase() == 'false')
			{
				value = false;
			}
		}

		Ext.callback(callback, scope, [value]);
		return value;
	},

	setValue: function(settingCode, settingValue, callback, scope)
	{
		var settings = this.settings();

		if(Ext.isString(settingCode))
		{
			var s = {};
			s[settingCode] = settingValue;
			settingCode = s;
		}
		if(Ext.isObject(settingCode))
		{
			Ext.Object.each(settingCode, function(k, v)
			{
				if(Ext.isObject(v)) v = Ext.encode(v);
				settings.setItem(k, v);
			});
		}

		Ext.callback(callback || Ext.emptyFn, scope || this, []);

		return this;
	},

	getValues: function(callback, scope)
	{
		var settings = this.settings(),
			data = {};
		
		Ext.Array.each(settings.getKeys(), function(v, i)
		{
			data[v] = settings.getItem(v);
		});

		Ext.callback(callback || Ext.emptyFn, scope || this, [data]);
		
		return data;
	},

	getSettings: function()
	{
		this.getValues.apply(this, arguments);
	},

	setValues: function(data, callback, scope)
	{
		return this.setValue.apply(this, [data, null, callback, scope]);
	},

	saveValue: function()
	{
		return this.setValue.apply(this, arguments);
	},

	loadSettings: function(config, scope)
	{
		// not implemented yet 
	},

	remove: function(settingCode, callback, scope)
	{
		var callback = callback || Ext.emptyFn,
			scope = scope || this;

		var settings = this.settings();

		settings.removeItem(settingCode);

		Ext.callback(callback, scope);
	}

});
