Ext.define('SIPAS.controller.Sipas.base.Base', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.ux.controller.Hasview',
        'Ext.ux.controller.Template'
    ],

    // by default we use hasview and template
    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    }

});