Ext.define('SIPAS.controller.Sipas.korespondensi.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.korespondensi.Compact'
    ],

    refs:[
        { ref : 'mainview', selector: 'sipas_korespondensi_compact'}
    ],


    launch: function(container) {
        var $this = this,
            view = this.createView();

        if(view){
            view.on('afterrender', function(){
                $this.refresh();
            });
        }

        return view;
    },

    refresh: function() {
        this.getController('Sipas.korespondensi.eksternal.List').refresh();
        this.getController('Sipas.korespondensi.internal.List').refresh();
    }

});
