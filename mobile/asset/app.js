Zepto(function(){
	var getUrlParameter = function(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};

	var download = getUrlParameter('download');

	if(download == 'android' || download == 'ios')
	{
		$(function(){
			$.getJSON('manifest.json',function(data){
				var manifest = (data || {})[download] || {},
					url = manifest.downloadUrl;

				if(url)
				{
					window.location.assign(url);
				}
			});
		});
	}else
	{

	}
});