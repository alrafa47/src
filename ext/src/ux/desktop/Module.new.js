/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.ux.desktop.Module', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    config: {
        id: null,
        name: null,
        description: null,
        version: null,
        url: null,
        namespace: null,
        appBootstrap: null,
        appPath: null,
        mainview: null
    },

    icons: 'icon-{size} application', // or object as each size
    useShortcut: true,
    useLauncher: true,
    useQuicklaunch: false,
    useTray: false,
    useFrame: false,
    frameUrl: null,
    autoCreate: false,
    maskLoading: true,
    useTaskButton: true,

    app: null, // given from desktop

    constructor: function(config) {
        this.mixins.observable.constructor.call(this, config);
        this.init();
        if (this.autoCreate) {
            this.createModule();
        }
    },

    // createModule: function(fn, scope) {
    //     var $this = this;
    //     var mApp = $this.getModule();

    //     if (mApp) {
    //         Ext.callback(fn || Ext.emptyFn, scope || $this, [mApp]);
    //     } else {
    //         Ext.require($this.appBootstrap, function() {
    //             Ext.create($this.appBootstrap);
    //             Ext.callback(fn || Ext.emptyFn, scope || $this, [$this.getModule()]);
    //         });
    //     }
    //     return $this;
    // },

    // getModule: function(autoCreate, fn, scope) {
    //     var autoCreate = true;
    //     if (Ext.ClassManager.isCreated(this.appBootstrap)) {
    //         var m = eval(this.appBootstrap);
    //         var mAppName = m.prototype.name;
    //         var mApp = eval(m.prototype.name);
    //         if (mApp.getApplication) {
    //             Ext.callback(fn || Ext.emptyFn, scope || this, [mApp.getApplication()]);
    //             return mApp.getApplication();
    //         }
    //     } else if (autoCreate) {
    //         this.createModule(fn, scope);
    //     }
    // },

    getModule: function(fn, scope) {
        var bootstrap = eval(this.appBootstrap) || {};
        if (Ext.isFunction(bootstrap.getModule)) {
            console.log('module: requesting');
            bootstrap.getModule(fn, scope);
            console.log('module: after requesting');
        }
    },

    getIcon: function(size, defaultIcon) {
        if (size) {
            if (Ext.isString(this.icons)) {
                return (new Ext.Template(this.icons)).apply({
                    'size': size
                });
            } else {
                return this.icons[size] || defaultIcon;
            }
        }
    },

    createWindow: function(config) {
        console.log('window: create')
        var $this = this;
        var module = null;
        var desktop = $this.app.getDesktop();

        var win = desktop.getWindow($this.getId());
        if (!win) {
            config = Ext.apply(config || {}, {
                module: $this,
                id: $this.getId(),
                title: $this.getName(),
                iconCls: $this.getIcon('16'),
                iconClsNoload: $this.getIcon('16'),
                iconClsLoad: 'loading small',
                maskLoading: $this.maskLoading,
                width: 860,
                height: 540,
                maximized: true,
                isLayoutReady: false,
                layout: {
                    type: 'fit'
                }
            });

            win = desktop.createWindow(config);

            win.on({
                scope: win,
                show: function(comp) {
                    if (!this.isLayoutReady) {
                        this.setIconCls(this.iconClsLoad);
                        if (this.maskLoading) {
                            this.body.mask('Loading');
                        }
                    }
                },
                afterlayout: function(comp) {
                    if (this.isLayoutReady) {
                        this.setIconCls(comp.iconClsNoload);
                        if (this.maskLoading) {
                            this.body.unmask();
                        }
                    }
                }
            });
            if (!$this.useFrame) {
                $this.getModule(function(m) {
                    if (m && Ext.isFunction(m.getMainview)) {
                        m.getApplication().moduleView = win;
                        win.add(m.getMainview());
                    }
                    win.isLayoutReady = true;
                    win.doLayout();
                });
            }
        }
        console.log('window: created');
        win.show();
        return win;
    },

    init: Ext.emptyFn
});