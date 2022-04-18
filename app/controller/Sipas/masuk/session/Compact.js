Ext.define('SIPAS.controller.Sipas.masuk.session.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.masuk.session.Compact'
    ],
    
    refs:[
        { ref : 'cmpKotakMasuk',       selector: 'sipas_masuk_session_compact sipas_masuk_session_list'},
        { ref : 'cmpDisposisiMasuk',   selector: 'sipas_masuk_session_compact sipas_disposisi_session_list'},
        { ref : 'cmpNotaDinas',        selector: 'sipas_masuk_session_compact sipas_notadinas_session_list'}
    ],

    init: function(application) {
        this.control({
            "sipas_masuk_session_compact": {
                afterrender: this.onMainview_AfterRender
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = null;

        view = $this.createView(config);
        if(view){
            view.on('afterrender', function(){
                
            });
        }        
        return view;
    },

    refresh: function(view) {
        var cmpKotakMasuk = this.getCmpKotakMasuk({root:view}),
            cmpDisposisiMasuk = this.getCmpDisposisiMasuk({root:view}),
            cmpNotaDinas = this.getCmpNotaDinas({root:view});

        this.getController('Sipas.masuk.session.kotak.List').refresh(cmpKotakMasuk);
        this.getController('Sipas.disposisi.session.List').refresh(cmpDisposisiMasuk);
        this.getController('Sipas.notadinas.session.List').refresh(cmpNotaDinas);
    },

    onMainview_AfterRender: function(mainview, eOpts){
        var $this = this;
        
        $this.refresh(mainview);
    }
});