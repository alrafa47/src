Ext.define('SIPAS.controller.Sipas.draft.session.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.draft.session.Compact'
    ],
    
    refs:[
        { ref : 'cmpKoreksiSurat',       selector: 'sipas_draft_session_compact sipas_koreksi_session_list'},
        { ref : 'cmpSuratKeluar',        selector: 'sipas_draft_session_compact sipas_keluar_agenda_list'},
        { ref : 'cmpSuratIKeluar',       selector: 'sipas_draft_session_compact sipas_internal_keluar_agenda_list'}
    ],

    stafModel: 'Sipas.Staf',

    init: function(application) {
        this.control({
            "sipas_draft_session_compact": {
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
        var cmpKoreksiSurat = this.getCmpKoreksiSurat({root:view}),
            cmpSuratKeluar = this.getCmpSuratKeluar({root:view}),
            cmpSuratIKeluar = this.getCmpSuratIKeluar({root:view}),
            storeKoreksi = cmpKoreksiSurat.getStore();

        storeKoreksi.removeAll();
        storeKoreksi.getProxy().url = 'server.php/sipas/draft/read';

        this.getController('Sipas.koreksi.session.List').refresh(cmpKoreksiSurat);
        this.getController('Sipas.keluar.agenda.List').refresh(cmpSuratKeluar);
        this.getController('Sipas.internal.keluar.agenda.List').refresh(cmpSuratIKeluar);
    },

    onMainview_AfterRender: function(mainview, eOpts){
        var $this = this;
        
        $this.refresh(mainview);
    }
});