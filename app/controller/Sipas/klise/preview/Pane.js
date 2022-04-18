Ext.define('SIPAS.controller.Sipas.klise.preview.Pane', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    api: {
        preview: 'server.php/sipas/klise/preview?id={id}'
    },

    views: [
        'Sipas.klise.preview.Pane'
    ],
    
    refs:[
        { ref: 'mainview', selector: 'sipas_klise_preview_pane' },
        { ref: 'preview',  selector: 'sipas_klise_preview_pane #iframe' }
    ],

    init: function(application){
        this.control({
            'sipas_klise_preview_pane': {
                doload: this.onMainview_DoLoad
            }
        });
    },

    launch: function(config) {
       var $this = this,
            view = $this.createView(config);

        return view;
    },

    onMainview_DoLoad: function(mainview, r){
        if(r instanceof Ext.data.Model){
            r = r.getId();    
        }

        mainview = mainview || this.getMainview();
        
        var preview = this.getPreview({root:mainview}),
            url = this.getApi('preview',{
                id: r
            }) || 'about:blank';

        preview && preview.load(url);
    }

});
