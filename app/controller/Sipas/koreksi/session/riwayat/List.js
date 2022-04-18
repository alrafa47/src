Ext.define('SIPAS.controller.Sipas.koreksi.session.riwayat.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.koreksi.session.riwayat.List'
    ],

    models: [
        'Sipas.koreksi.Riwayat'
    ],
    
    stores:[
        'Sipas.koreksi.session.riwayat.List',
        'Sipas.staf.Lookup'
    ],

    messages: {
        'receiver_exits': ['Info','Staf dengan NIP:{id} sudah masuk dalam daftar']
    },

    refs :[
        { ref: 'mainview', selector: 'sipas_koreksi_session_riwayat_list' }
    ],

    launch: function(config) {
        var $this =     this,
            $app =      $this.getApplication(),
            $session =  $app.getSession(),
            $helper =   $this.getApplication().Helper(),
            reference = config.reference,
            sessionId = $session.getProfileId(),
            view =      $this.createView(config);

        return view;
    },

    onGridpanel_Load: function(grid, record){
        
        var load = function(r){
            var s = r.fetchPenerima(); // assume record is Surat
            
        grid.reconfigure(s);
            s.reload({
                callback: function(){
                } 
            });
        }
    }
});