Ext.define('Ext.ux.controller.Template', {

	templates: null,

	api: null,

	messages: null,

	getTemplate: function(tplName, params, tplProperty)
	{
		var $this = this,
			template = null;
		
		var thisTpl = this[tplProperty] || this.templates;
		params = params || {};
		
		if ( thisTpl && thisTpl[tplName] ) {
            template = Ext.clone(thisTpl[tplName]);
			if( Ext.isArray(template) || Ext.isObject(template) ){	
				for(var i in template){
					template[i] = (Ext.isString(template[i])) ? (new Ext.Template(template[i])).apply(params) : template[i];
				}
			}else if(Ext.isString(template)){
				template = (new Ext.Template(template)).apply(params);
			}
		}
		return template;	
	},

	getApi: function(tplName, params)
	{
		return this.getTemplate.call(this, tplName, params, 'api');
	},

	getMessage: function(tplName, params)
	{
		return this.getTemplate.call(this, tplName, params, 'messages');
	},

	setTemplate: function(tplName, tplValue, tplProperty)
	{
		var thisTpl = this[tplProperty] || this.templates;

		if(!Ext.isArray(thisTpl) || !Ext.isObject(thisTpl)) thisTpl = {};
		if(Ext.isObject(tplName)) thisTpl = Ext.apply(thisTpl, tplName);
		if(Ext.isString(tplName)) thisTpl[tplName] = tplValue;
		
		this[tplProperty] = thisTpl;
	},

	setApi: function(apiName, apiValue)
	{
		this.setTemplate.call(this, apiName, apiValue, 'api');
	},

	setMessage: function(messageName, messageValue)
	{
		this.setTemplate.call(this, apiName, apiValue, 'messages');
	}
	
});