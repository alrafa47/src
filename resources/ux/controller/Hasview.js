/**
 * Copyright(c) 2015 Sekawan Media.
 * http://www.sekawanmedia.com/license
 */

/**
 * @version 1.0.0
 * @author Eko Dedy Purnomo <eko.dedy.purnomo@gmail.com>
 * @class Ext.ux.Hasview
 * <p>Easy to control one view on each controller</p>
 */
Ext.define('Ext.ux.controller.Hasview', {

    requires: [
        'Ext.ux.component.Manipulator'
    ],

    /**
     * @cfg {String} readonlyViewComponents
     * Component to be readonly in 'view' mode
     */
    readonlyViewComponents: ['textfield','textarea','combobox','triggerfield','radio','checkbox', 'htmleditor'],

    /**
     * @cfg {String} delegateView
     * String view name which want to be used as default view, createView function will return this instance
     */
    delegateView: null,
    
    /**
     * @cfg {String} delegateViewSelector
     * String view name which want to be used as default view, createView function will return this instance
     */
    delegateViewSelector: null,

    /**
     * Retrieve the deletgated view instance
     *
     * @param {Ext.Component} component (optional) Ext.Component instance to lookup the delegated view from
     * @param {Boolean} inside Boolean looking up from inside, false will lookup from outside the component
     */
    getDelegateView: function(component, inside){
        if(! component){
            return Ext.ComponentQuery.query(this.delegateViewSelector)[0] || undefined;
        }
        if(inside){
            return component.down(this.delegateViewSelector);
        }else{
            return component.up(this.delegateViewSelector);
        }
    },

    /**
     * Retrieve the deletgated view instance
     *
     * @param {Ext.Component} component (optional) Ext.Component instance to lookup the delegated view from
     * @param {Boolean} inside Boolean looking up from inside, false will lookup from outside the component
     */
    createView: function(config) {
        config = Ext.applyIf(config || {},{
            mode: null,
            withDefaultReadonlyComponent: true,
            requireComponents: null,
            readonlyComponents: null,
            removeComponents:  null,
            disableComponents:  null,
            callback: Ext.emptyFn
        });

        var $this = this,
            manipulator = Ext.ux.component.Manipulator,
            viewName = $this.delegateView || $this.views[0],
            view = viewName && $this.getView(viewName);

        if(Ext.Array.contains(['readonly','view'], config.mode) && config.withDefaultReadonlyComponent){
            config.readonlyComponents = Ext.Array.merge(config.readonlyComponents, $this.readonlyViewComponents);
        }

        var viewInstance = view && view.create(config);

        if( ! viewInstance ) return;

        manipulator.requireComponents({
            parent: viewInstance,
            items: config.requireComponents
        });
        manipulator.readonlyComponents({
            parent: viewInstance,
            items: config.readonlyComponents
        });
        manipulator.disableComponents({
            parent: viewInstance,
            items: config.disableComponents
        });
        manipulator.removeComponents({
            parent: viewInstance,
            items: config.removeComponents
        });
        viewInstance.callback = config.callback;

        return viewInstance
    }

});
