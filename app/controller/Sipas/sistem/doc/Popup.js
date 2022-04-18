Ext.define('SIPAS.controller.Sipas.sistem.doc.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    launch: function() {
        window.open(this.getApplication().getMetadata('handout'), '_blank');
    }

});