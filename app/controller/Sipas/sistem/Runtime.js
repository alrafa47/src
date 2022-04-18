Ext.define('SIPAS.controller.Sipas.sistem.Runtime', function(){

	var runtimeConfig = null;

return {
	extend: 'SIPAS.controller.Sipas.base.Base',

	runtimeConfigFile: 'runtime.json',

	messages: {
		'runtime_error': ['Gagal Menyiapkan Aplikasi','Gagal melakukan konfigurasi aplikasi, pastikan file konfigurasi sesuai. Informasi lebih lanjut hubungi administrator.']
	},

    init: function(application)
    {
		var $this = this;
		Ext.apply(application, {
			Runtime: function(){
				return $this;
			},
			loadRuntimeConfig: Ext.Function.alias(this, 'loadRuntimeConfig'),
			getRuntimeConfig: Ext.Function.alias(this, 'getValue'),
			setRuntimeConfig: Ext.Function.alias(this, 'setValue')
		});
    },

	loadConfig: function(callback, scope) // callback(runtimeConfig)
	{
		var callback = callback || Ext.emptyFn, 
			scope = scope || this;

		var $this = this,
			url = this.runtimeConfigFile;

		if(runtimeConfig)
		{
			Ext.callback(callback, scope, [runtimeConfig, $this]);
			return runtimeConfig;
		}
			
		Ext.Ajax.request({
			url: url,
			success: function(response, operation){
				runtimeConfig = Ext.decode(response.responseText, 1);
				Ext.callback(callback, scope, [runtimeConfig, $this]);
			},
			failure: function(){
				var msg = $this.getMessage('runtime_invalid');
				Ext.Msg.alert(msg[0], msg[1]);
			}
		});
	},

	getValue: function()
	{
		if(arguments.length > 0)
        {
        	var key = arguments[0];
         	return runtimeConfig.hasOwnProperty(key) ? runtimeConfig[key] : null;
        }
        return runtimeConfig;
	}
}
});