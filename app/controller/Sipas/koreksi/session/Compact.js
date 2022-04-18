Ext.define('SIPAS.controller.Sipas.koreksi.session.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.koreksi.session.Compact'
    ],
    refs:[
        { ref : 'mainview', selector: 'sipas_koreksi_session_compact'}
    ],


    launch: function(container) {
        var $this = this,
            viewInstance = this.createView();

        viewInstance.on('afterrender',function(){
            $this.refresh();
        });
        return viewInstance;
    },

    refresh: function() {
        this.getController('Sipas.koreksi.session.List').refresh();
        this.getController('Sipas.koreksi.session.pengajuan.List').refresh();
    }

});