Ext.define('SIPAS.controller.Sipas.session.ComponentHandler', {
    extend: 'SIPAS.controller.Sipas.base.Base',    

    init: function(application) {
        this.control({
            'container': {
                // beforeadd: 'onContainer_BeforeAdd'
            },
            'component[roleable=true]': {
                afterrender: 'onComponent_AfterRender'
            } 
        });
    },

    onContainer_BeforeAdd: function(container, component, index, eOpts)
    {
        if(!!component.roleable)
        {
            var $session = this.getApplication().Session();
                action = $session.getRuleAccess(component.roleName);

            if(component.roleAction == 'hide')
            {
                component.hide();
                return;
            }

            if(action !== true){
                return false;
            }
        }
    },

    onComponent_AfterRender: function(component, eOpts)
    {
        var $app = this.getApplication(),
            $session = $app.getSession(),
            action = $session.getRuleAccess(component.roleName),
            parent = component.ownerCt || {};

        if(action !== true){
            if(component instanceof Ext.window.Window){
                component.on('show', function(){
                    component.hide().destroy();
                }, this, {
                    single: true
                });
            }else{
                parent && parent.remove && parent.on('afterrender', function(){
                    if(component.roleAction == 'hide')
                    {
                        component.hide();
                        return;
                    }
                    
                    parent.remove(component, true);
                }, this, {
                    single: true
                });
            }
        }
    }

});