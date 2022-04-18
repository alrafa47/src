Ext.define('SIPAS.controller.Sipas.sistem.featureable.ComponentHandler', {
    extend: 'SIPAS.controller.Sipas.base.Base',    

    init: function()
    {
        this.control({
            'container': {
                // 'beforeadd': this.onContainer_BeforeAdd
            },
            'component[featureable=true]': {
                'afterrender': this.onComponent_AfterRender
            }
        })
    },

    onContainer_BeforeAdd: function(container, component, index, eOpts)
    {
        if(!!component.featureable)
        {
            var $app = this.getApplication(),
                $feature = $app.Feature(),
                action = $feature.getFeatureAccess(component.featureName);

            if(action !== true){
                return false;
            }
        }
    },

    onComponent_AfterRender: function(component, eOpts)
    {
        var $app = this.getApplication(),
            $feature = $app.Feature(),
            action = $feature.getFeatureAccess(component.featureName),
            parent = component.ownerCt || {};

        if(action !== true){
            if(component instanceof Ext.window.Window){
                component.on('show', function(){
                    component.hide().destroy();
                }, this, {
                    single: true
                });
            }else{
                parent && parent.remove && parent.on('afterrender', function()
                {
                    switch(component.featureMode)
                    {
                        case 'disable': component.disable && component.disable(); break;
                        case 'hide': component.hide(); break;
                        case 'destroy': component.hide().destroy(); break;
                        default: parent.remove(component, true);
                    }
                }, this, {
                    single: true
                });
            }
        }
    }

});