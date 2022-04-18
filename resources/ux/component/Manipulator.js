/**
 * Copyright(c) 2015 Sekawan Media.
 * http://www.sekawanmedia.com/license
 */

/**
 * @version 1.0.0
 * @author Eko Dedy Purnomo <eko.dedy.purnomo@gmail.com>
 * @class Ext.ux.component.Manipulator
 * <p>Just one class to control the component to be required, readonly, disabled, etc</p>
 */
Ext.define('Ext.ux.component.Manipulator', {

    singleton: true,

    /**
     * find match component
     * @param {Boolean} strict                  Set true if only looking for component within matched id 
     * @param {Strting} key                     id/name/itemId/hiddenName component
     * @param {Ext.Component} parent (optional) Finding component will be looking up from here 
     */
    findComponents: function(query, parent, fn, scope){
        if(Ext.isArray(query)) query = query.join(',');
        if(Ext.isEmpty(query)) query = '';
        comps = query instanceof Ext.Component ? [query] : Ext.ComponentQuery.query(query, parent);
        if(Ext.isFunction(fn)){
            Ext.each(comps, fn, scope);
        }
        return comps;
    },

    find: function(){
        this.findComponents.call(this, arguments);
    },


    /**
     * make required component selected
     * @param {Object} config {
     *      {Boolean} action                    true/false to fire require attribute
     *      {Array} items                       list name or id component
     *      {Ext.Component} parent (optional)   finding component will be looking up from here
     * }
     */
    requireComponents: function(config) {
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.applyIf(config,{
            parent: null,
            action: true,
            items: null,
            requireText: 'Wajib diisi'
        });

        config.items = Ext.isObject(config.items) ? config.items : Ext.Array.from(config.items);
        
        var executeAction = function(item, action, requireText){
            if(!(item instanceof Ext.Component)) return;
            requireText = requireText || item.requireText;
            item.afterLabelTextTpl = (action ? "<span style='color:red;font-weight:bold' data-qtip='"+requireText+"'>*</span>" : "");
            item.allowBlank = (!action);
            item.isValid && item.isValid();
        }

        if(Ext.isArray(config.items)){
            for(var key in config.items){
                this.findComponents(config.items[key], config.parent, function(comp){
                   executeAction(comp, config.action, config.requireText);
                });
            }
        }else if(Ext.isObject(config.items)){
            for(var key in config.items){
                this.findComponents(config.items[key], config.parent, function(comp){
                   executeAction(comp, config.items[key], config.requireText);
                });
            }
        }
    },

    require: function(){
        this.requireComponents.call(this, arguments);
    },

    /**
     * remove some component
     * @param {Object} config {
     *      {Boolean} action                    true/false to fire remove
     *      {Array|Object} items                list name or id component
     *      {Ext.Component} parent (optional)   finding component will be looking up from here
     *      {Enum[destroy|show|hide]} mode      mode to remove component, destroy|show|hide
     * }
     */
    removeComponents: function(config) {
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.applyIf(config,{
            parent: null,
            action: true,
            items: null,
            mode: 'destroy'
        });

        config.items = Ext.isObject(config.items) ? config.items : Ext.Array.from(config.items);
        
        var executeAction = function(item, mode, action){
            if( ! (item instanceof Ext.Component) ) return;

            if(action === false){
                switch(mode){
                    case 'show': 
                        item.hide(); 
                        break;
                    case 'hide': 
                        item.show(); 
                        break;
                }
            }else if(action === true){
                switch(mode){
                    case 'show': 
                        item.show(); break;
                    case 'hide': 
                        item.hide(); break;
                    case 'destroy':
                        item.hide();
                        item.destroy();
                        break;
                }
            }
        }

        if(Ext.isArray(config.items)){
            for(var key in config.items){
                this.findComponents(config.items[key], config.parent, function(comp){
                   executeAction(comp, config.mode, config.action);
                });
            }
        }else if(Ext.isObject(config.items)){
            for(var key in config.items){
                this.findComponents(key, config.parent, function(comp){
                   executeAction(comp, config.mode, config.items[key]);
                });
            }
        }
    },

    remove: function(){
        this.removeComponents.call(this, arguments);
    },

    /**
     * Shortcut to removeComponents with show mode
     * @param {Object} config Inherit config
     */
    showComponents: function(config){
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.apply(config, {
            mode    : 'show',
            action  : false
        });
        this.removeComponents(config);
    },

    show: function(){
        this.show.call(this, arguments);
    },

    /**
     * Shortcut to removeComponents with hide mode
     * @param {Object} config Inherit config
     */
    hideComponents: function(config){
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.apply(config, {
            mode    : 'hide'
        });
        this.removeComponents(config);
    },

    hide: function(){
        this.hide.call(this, arguments);
    },

    /**
     * Shortcut to removeComponents with destroy mode
     * @param {Object} config Inherit config
     */
    destroyComponents: function(config){
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.apply(config, {
            mode    : 'destroy'
        });
        this.removeComponents(config);
    },

    destroy: function(){
        this.destroyComponents.call(this, arguments);
    },

    /**
     * disable some component
     * @param {Object} config {
     *      {Boolean} action                        true/false to fire disable
     *      {Array|Object} items                    list name or id component
     *      {Ext.Component} parent (optional)       finding component will be looking up from here
     *      {Enum[readonly|editable|disable]} mode  mode to remove component, readonly|editable|disable
     * }
     */
    disableComponents: function(config) {
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.applyIf(config, {
            parent  : null, 
            action  : true,
            items   : null,
            mode    : 'disable'
        });

        config.items = Ext.isObject(config.items) ? config.items : Ext.Array.from(config.items);
        
        var executeAction = function(item, action, mode){
            switch(mode){
                case 'readonly': (!item.isDestroyed) && item.setReadOnly && item.setReadOnly(action); break;
                case 'editable': (!item.isDestroyed) && item.setEditable && item.setEditable(action); break;
                case 'disable': default: (!item.isDestroyed) && item.setDisabled && item.setDisabled(action); break;
            }
        }

        if(Ext.isArray(config.items)){
            for(var key in config.items){
                this.findComponents(config.items[key], config.parent, function(comp){
                   executeAction(comp, config.action, config.mode);
                });
            }
        }else if(Ext.isObject(config.items)){
            for(var key in config.items){
                this.findComponents(key, config.parent, function(comp){
                   executeAction(comp, config.items[key], config.mode);
                });
            }
        }
    },

    disable: function(){
        this.disableComponents.call(this, arguments);
    },

    /**
     * Shortcut to disableComponents with disable mode and action is false
     * @param {Object} config Inherit config
     */
    enableComponents: function(config){
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.apply(config, {
            mode    : 'disable',
            action  : false
        });
        this.disableComponents(config);
    },

    enable: function(){
        this.enableComponents.call(this, arguments);
    },

    /**
     * Shortcut to disableComponents with readonly mode
     * @param {Object} config Inherit config
     */
    readonlyComponents: function(config){
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.apply(config, {
            mode    : 'readonly'
        });
        this.disableComponents(config);
    },

    readonly: function(){
        this.readonlyComponents.call(this, arguments);
    },

    /**
     * Shortcut to disableComponents with editable mode
     * @param {Object} config Inherit config
     */
    editableComponents: function(config){
        if(Ext.isArray(config))
        {
            config = {items:config};
        }
        config = config || {};
        Ext.applyIf(config, {
            mode    : 'editable'
        });
        this.disableComponents(config);
    },

    editable: function(){
        this.editableComponents.call(this, arguments);
    },

    applyValue: function(config) {
        //config:{parent:@Ext.Component, items:@array(string)}
        config = config || {};
        Ext.applyIf(config,{
            parent: null,
            items: {},
            'default': null
        });

        for(key in config.items){
            var cmp = null;
            if(config.parent instanceof Ext.Component){
                this.findComponents(key, config.parent, function(comp){
                   comp.setValue(config.items[key] || config['default']);
                });
            }
        }
    },

    getValue: function(config) {
        //config:{parent:@Ext.Component, items:@array(string)}
        config = config || {};
        Ext.applyIf(config, {
            parent: null,
            items: [],
            forcevalue: false,
            'default': null
        });

        if(!config.items || config.items.length < 1) return;
        
        var returned_obj = {};
        if(Ext.typeOf(config) == 'array'){
            for(key in config.items){
                var cmp = this.findComponent(config.items[key], config.parent);
                if(cmp){
                    returned_obj[config.items[key]] = cmp.getValue() || config['default'];
                }else if(config.forcevalue === true){
                    returned_obj[config.items[key]] = config['default'];
                }
            }
        }else if(Ext.typeOf(config) == 'object'){
            for(key in config.items){
                var cmp = this.findComponent(config.items[key], config.parent);
                if(cmp){
                    returned_obj[key] = cmp.getValue() || config['default'];
                }else if(config.forcevalue === true){
                    returned_obj[key] = config['default'];
                }
            }
        }
        return returned_obj;
    }
});