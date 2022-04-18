Ext.define('SIPAS.controller.Sipas.unit.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.unit.List',
        'Sipas.unit.Treelist'
    ],

    views: [
        'Sipas.unit.Compact'
    ],
    
    refs:[
        { ref:'mainview', selector: 'sipas_unit_compact' }
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
        this.getController('Sipas.unit.List').refresh();
        this.getController('Sipas.unit.Treelist').refresh();
    }

});
