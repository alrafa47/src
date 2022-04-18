Ext.define('SIPAS.controller.Sipas.sistem.EventBrowser', {
	extend: 'Ext.app.Controller',

	init: function(application)
    {
		var $this = this,
			$app = application;

		Ext.apply(application, {
			EventBrowser: function(){
				return $this;
			}
		});

		window.addEventListener('storage', function(event)
		{
		    if (event.key == 'sipas-event') {
		    	$app.fireEvent(event.newValue);
		    }
		}, false);
    },

	// this just an alias of Ext.log
	fireEvent: function(event)
	{
		window.localStorage && window.localStorage.setItem('sipas-event', event);
	}
});