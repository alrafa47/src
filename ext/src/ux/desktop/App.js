/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.ux.desktop.App', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    requires: [
        'Ext.container.Viewport',
        'Ext.ux.desktop.Desktop'
    ],

    require_modules: [],

    isReady: false,
    modules: null,
    autoCreateDesktop: false,
    useQuickTips: true,

    constructor: function (config) {
        var me = this;
        me.addEvents(
            'ready',
            'beforeunload'
        );

        me.mixins.observable.constructor.call(this, config);

        if (Ext.isReady) {
            Ext.Function.defer(me.init, 10, me);
        } else {
            Ext.onReady(me.init, me);
        }
    },

    init: function() {
        var me = this, desktopCfg;

        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }

        me.modules = me.getModules();
        if (me.modules) {
            me.initModules(me.modules);
        }

        if( me.autoCreateDesktop ){
            me.viewport = me.createViewport();
            me.desktop = me.createDesktop();
        }

        Ext.EventManager.on(window, 'beforeunload', me.onUnload, me);

        me.isReady = true;
        me.fireEvent('ready', me);
    },

    createViewport: function(){
        var me = this;
        me.viewport = me.viewport || Ext.create('Ext.container.Viewport',{
            layout: 'fit'
        });
        return me.viewport;
    },

    createDesktop: function(config){
        var me = this;
        var viewport = me.viewport || me.createViewport();
        var desktopCfg = Ext.apply(me.getDesktopConfig(), config);

        me.desktop = Ext.create('Ext.ux.desktop.Desktop', desktopCfg);
        me.viewport.add(me.desktop);
        
        me.refreshShortcutView();
        return me.desktop;
    },

    refreshShortcutView: function(){
        var me = this;
        Ext.each(me.modules, function(module){
            if(module.useShortcut === true){
                me.desktop.shortcutsView.store.add({
                    iconCls: module.getIcon('48'),
                    name: module.name,
                    module: module.id,
                    role: module.role,
                    roleable: module.roleable
                });
            }
        });
        // me.desktop.shortcutsView.refresh();
    },

    /**
     * This method returns the configuration object for the Desktop object. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getDesktopConfig: function () {
        var me = this, cfg = {
            app: me,
            taskbarConfig: me.getTaskbarConfig()
        };

        Ext.apply(cfg, me.desktopConfig);
        return cfg;
    },

    /* edited */
    // getModules: Ext.emptyFn,
    getModules: function(){
        var modulesAux = [];
        Ext.each(this.require_modules, function(item) {
            modulesAux.push(Ext.create(item));
        }, this);
        return modulesAux;
    },

    /**
     * This method returns the configuration object for the Start Button. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getStartConfig: function () {
        var me = this,
            cfg = {
                app: me,
                menu: []
            },
            launcher;

        Ext.apply(cfg, me.startConfig);

        Ext.each(me.modules, function (module) {
            var launcher = {
                handler: module.handler || Ext.bind(me.createWindow, me, [module]),
                text: module.name,
                module: module,
                roleable: module.roleable,
                role: module.role,
                iconCls: module.getIcon('16')
            };
            
            if(module.useLauncher){
                cfg.menu.push(launcher);
            }
        });

        return cfg;
    },

    createWindow: function(module) {
        console.log(module);
        var win = module.createWindow();
        win && win.show && win.show();
    },

    /**
     * This method returns the configuration object for the TaskBar. A derived class
     * can override this method, call the base version to build the config and then
     * modify the returned object before returning it.
     */
    getTaskbarConfig: function () {
        var me = this, cfg = {
            app: me,
            startConfig: me.getStartConfig()
        };

        Ext.apply(cfg, me.taskbarConfig);
        return cfg;
    },

    initModules : function(modules) {
        var me = this;
        Ext.each(modules, function (module) {
            module.app = me;
        });
    },

    getModule : function(name) {
    	var ms = this.modules;
        for (var i = 0, len = ms.length; i < len; i++) {
            var m = ms[i];
            if (m.id == name || m.appType == name) {
                return m;
            }
        }
        return null;
    },

    onReady: function(fn, scope) {
        if (this.isReady) {
            fn.call(scope, this);
        } else {
            this.on({
                ready: fn,
                scope: scope,
                single: true
            });
        }
    },

    getDesktop : function() {
        return this.desktop;
    },

    onUnload : function(e) {
        if (this.fireEvent('beforeunload', this) === false) {
            e.stopEvent();
        }
    }

});
