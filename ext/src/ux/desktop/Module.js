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
    maximized: true,

    windowConfigDefault: {
        parentRoleable: true
    },

    app: null, // given from desktopApp
    
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.addEvents(
            'modulecreated',
            'windowcreated',
            'layoutready'
        );
        this.init();
        if(this.autoCreate){
            this.createModule();
        }
    },

    createModule: function(fn, scope){        
        var $this = this, m;
        // var mApp = $this.getModule();

        // if(mApp){
        //     Ext.callback(fn || Ext.emptyFn, scope || $this, [mApp]);
        // }else{
            Ext.require($this.appBootstrap, function(){
                m = Ext.create($this.appBootstrap);
                $this.fireEvent('modulecreated', $this);
                Ext.callback(fn || Ext.emptyFn, scope || $this, [m]);
            });
        // }

        return $this;
    },

    getModule: function(autoCreate, fn, scope){
        if( Ext.ClassManager.isCreated(this.appBootstrap)){
            var m = eval(this.appBootstrap);
            var mAppName = m.prototype.name;
            var mApp = eval(m.prototype.name);
            if(mApp.getApplication){
                Ext.callback(fn || Ext.emptyFn, scope || this, [mApp.getApplication()]);
                return mApp.getApplication();
            }else{
                this.createModule(fn, scope);
            }
        }else if(autoCreate){
            this.createModule(fn, scope);
        }
    },

    getIcon: function(size, defaultIcon){
        if( size ){
            if( Ext.isString(this.icons) ){
                return (new Ext.Template(this.icons)).apply({'size':size});
            }else{
                return this.icons[size] || defaultIcon;
            }
        }
    },

    createWindow: function(config){
        var $this = this,
            module = null,
            desktopApp = $this.app,
            desktop = desktopApp.getDesktop(),
            win = desktop.getWindow($this.getId());
        
        if(!win){
            config = Ext.applyIf(config || {}, {
                module: $this,
                id: $this.getId(),
                title: $this.getName(),
                iconCls: $this.getIcon('16'),
                iconClsNoload: $this.getIcon('16'),
                iconClsLoad: 'loading small',
                maskLoading: $this.maskLoading,
                width: $this.width || 860,
                height: $this.height || 460,
                maximized: $this.maximized,
                roleable: $this.true,
                parentRoleable: $this.parentRoleable,
                isLayoutReady: false,
                layout:{
                    type:'fit'
                }
            });
            config = Ext.applyIf(config, this.windowConfigDefault);

            win = desktop.createWindow(config);

            $this.fireEvent('windowcreated', $this);

            win.on({
                scope: win,
                show: function(comp){
                    if(! this.isLayoutReady){
                        this.setIconCls(this.iconClsLoad);
                        if(this.maskLoading){
                            this.body.mask('Loading');
                        }
                    }
                },
                afterlayout: function(comp){
                    if(this.isLayoutReady){
                        this.setIconCls(comp.iconClsNoload);
                        if(this.maskLoading){
                            this.body.unmask();
                        }
                    }
                }
            });

            if( ! $this.useFrame ){
                $this.getModule(true, function(m){
                    if(m && m.getMainview && Ext.isFunction(m.getMainview)){
                        m.getApplication().moduleView = win;
                        win.add(m.getMainview());
                    }
                    win.isLayoutReady = true;
                    $this.fireEventArgs('layoutready', $this, [win]);

                    Ext.ux.role.Roleable.applyRoleTo('[roleable=true]', win, desktopApp.roleCollection);

                    win.doLayout();
                });
            }
        }
        return win;
    },

    init: Ext.emptyFn
});