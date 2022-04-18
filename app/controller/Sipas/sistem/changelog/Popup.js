Ext.define('SIPAS.controller.Sipas.sistem.changelog.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    api: {
        preview: 'CHANGELOG.md'
    },

    views: [
        'Sipas.sistem.changelog.Popup'
    ],
    
    refs:[
        { ref: 'mainview', selector: 'sipas_sistem_changelog_popup' },
        { ref: 'preview',  selector: 'sipas_sistem_changelog_popup #frame' }
    ],

    init: function(application){
        this.control({
            'sipas_sistem_changelog_popup': {
                show: this.onMainview_DoLoad
            }
        });
    },

    launch: function(config) {
       var $this = this,
            view = $this.createView(config);

        view.show();
    },

    onMainview_DoLoad: function(mainview){
        mainview = mainview || this.getMainview();
        
        var previews = this.getPreview({root:mainview}),
        	url = this.getApi('preview') || 'about:blank';

        Ext.Ajax.request({
            url: url,
            success: function(response){
                var p = response.responseText;
                previews.update(marked(p));
            }
        });
    }

});
