Ext.define('SIPAS.controller.Sipas.keluar.session.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.keluar.session.Compact'
    ],
    
    refs:[
        { ref : 'cmpSuratKeluar',        selector: 'sipas_keluar_session_compact sipas_keluar_agenda_list'},
        { ref : 'cmpSuratIKeluar',        selector: 'sipas_keluar_session_compact sipas_internal_keluar_agenda_list'}
    ],

    stafModel: 'Sipas.Staf',

    init: function(application) {
        this.control({
            "sipas_keluar_session_compact": {
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
        var cmpSuratKeluar = this.getCmpSuratKeluar({root:view}),
            cmpSuratIKeluar = this.getCmpSuratIKeluar({root:view});
        this.getController('Sipas.keluar.agenda.List').refresh(cmpSuratKeluar);
        this.getController('Sipas.internal.keluar.agenda.List').refresh(cmpSuratIKeluar);
    },
    onMainview_AfterRender: function(mainview, eOpts){
        var $this = this;
        
        $this.refresh(mainview);
    }
});