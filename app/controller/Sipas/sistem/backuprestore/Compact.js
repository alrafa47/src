Ext.define('SIPAS.controller.Sipas.sistem.backuprestore.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.sistem.backup.Pane',
        'Sipas.sistem.backup.progress.Pane',
        'Sipas.sistem.restore.backup.Pane',
        'Sipas.sistem.restore.Pane'
    ],

    views: [
        'Sipas.sistem.backuprestore.Compact'
    ],
    
    refs:[
        { ref:'mainview', selector: 'sipas_sistem_backuprestore_compact' }
    ],

    launch: function(container){
        var $this = this,
            viewInstance = this.createView();

        viewInstance.on('afterrender',function(){
            $this.refresh();
        });
        return viewInstance;
    },

    refresh: function(){
        this.getController('Sipas.sistem.backup.Pane').refresh();
        this.getController('Sipas.sistem.backup.progress.Pane').refresh();
        this.getController('Sipas.sistem.restore.backup.Pane').refresh();
        this.getController('Sipas.sistem.restore.Pane').refresh();
    }

});
