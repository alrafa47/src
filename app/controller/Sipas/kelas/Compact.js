Ext.define('SIPAS.controller.Sipas.kelas.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.kelas.Compact'
    ],
    refs:[
        { ref : 'mainview', selector: 'sipas_kelas_compact'}
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
        this.getController('Sipas.kelas.List').refresh();
        this.getController('Sipas.kelas.Treelist').refresh();
    }

});
