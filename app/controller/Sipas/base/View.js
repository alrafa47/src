Ext.define('SIPAS.controller.Sipas.base.View', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    onMainview_Action: function(component, e, eOpts)
    {
        var mainview = this.getMainview({from:mainview}),
            action = component.action;

        mainview.fireEvent('do'+action, mainview);
    }

});