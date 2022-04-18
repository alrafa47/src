Ext.define('SIPAS.controller.Sipas.jabatan.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.jabatan.Compact'
    ],
    refs:[
        { ref : 'mainview', selector: 'sipas_jabatan_compact'}
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
        this.getController('Sipas.jabatan.List').refresh();
        this.getController('Sipas.jabatan.Treelist').refresh();
    }

});
