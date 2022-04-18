Ext.define('SIPAS.controller.Sipas.Home', {
    extend: 'Ext.app.Controller',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    views: [
        'Sipas.Home',
        'Sipas.Viewport'
    ],

    refs: [
        { ref: 'mainview',                      selector: 'sipas_home' },
        { ref: 'viewport',                      selector: 'sipas_viewport', autoCreate: true, xtype:'sipas_viewport' },
        { ref: 'compCopyright',                 selector: 'sipas_home #buttonCopyright' },
        { ref: 'compLicense',                   selector: 'sipas_home #toolbarHeader' },
        { ref: 'compLogo',                      selector: 'sipas_home #containerLogo' },
        { ref: 'cmpMenubar',                    selector: 'sipas_home #toolbarHeader' },
        { ref: 'cmpTaskbar',                    selector: 'sipas_home #toolbarTask' },
        { ref: 'cmpPageContainer',              selector: 'sipas_home sipas_home_page_pane' },
        { ref: 'cmpSidebar',                    selector: 'sipas_home sipas_home_side_pane' }
    ],

    api: {
        'event_home_ready':'sipas/home/ready',
        'event_session_start':'sipas/session/start',
        'event_home_close':'sipas/home/close'
    },

    messages:{
        'greet': 'Hai. Selamat Datang <b>{user}</b>'
    },

    taskClockName: 'SIPAS-updater-clock',

    controllerLogin: 'Sipas.Door',

    init: function(application) {
        application.on({
            'sipas/session/terminate': this.onApp_Terminate,
            scope: this
        });

        this.control({
            'sipas_home #containerLogo': {
                afterrender: this.onCompLogo_AfterRender
            },
            'sipas_home #buttonCopyright': {
                afterrender: this.onCompCopyright_AfterRender
            },
            'sipas_home': {
                afterrender: this.onHome_AfterRender
            }
        })
    },

    onApp_Terminate: function(){
        this.terminate();
    },

    launch: function(config, scope){
        if(Ext.isFunction(config)) config = {callback: config, scope: scope || this};
        config = Ext.applyIf(config || {}, {
            callback: Ext.emptyFn,
            scope: this,
            session: {}
        });
        var $this = this,
            $app = $this.getApplication();
            // console.log($app);
        var    $session = $this.getApplication().getSession(),
            $localStorage = $app.LocalStorage(),
            currentUser = $localStorage.getValue('currentUser'),
            controllerLogin = $this.getController($this.controllerLogin),
            view = null;

        // multi profile feature //
        console.log("Current User", currentUser);
        if(currentUser){
            // Ext.Ajax.on({
            //     beforerequest: function(conn, options) {
            //         // options.headers = options.header || {};
            //         // options.headers['Akun-Id'] = currentUser;
            //     }
            // });
            
            Ext.Ajax.defaultHeaders ={
                'Akun-Id':currentUser
            };
            
            $app.getEmitterLocalConfig(function (emitterconfig) {
                if (emitterconfig) {
                    $app.fireEvent('emitter/connect', emitterconfig);
                }
            }, true);
        }
            
        if(Ext.Object.isEmpty(config.session)){
            $session.check(function(islogin, session, res){
                if(islogin){
                    Ext.callback(config.callback, config.scope, [$this.ready(session), session, $this]);
                }else{
                    controllerLogin.launch(function(view, session, response){
                        Ext.callback(config.callback, config.scope, [$this.ready(session), session, $this]);
                    });
                }
            });
        }else{
            Ext.callback(config.callback, config.scope, [$this.ready(config.session), config.session, $this]);
        }
    },

    ready: function(session)
    {
        var $this = this,
            $app = $this.getApplication(),
            view = this.createView();

        view.on('afterrender', function(view)
        {
            $app.fireEvent($this.getApi('event_session_start'), session);
            $app.fireEvent($this.getApi('event_home_ready'), session);
        });

        $this.getViewport().add(view);
        return view;
    },

    terminate: function() {
        var $this = this,
            $app = $this.getApplication(),
            controllerLogin = $this.getController($this.controllerLogin),
            mainview = $this.getMainview();

        var sidebar = $this.getCmpSidebar({mainview:mainview}),
            pageContainer = $this.getCmpPageContainer({mainview:mainview});

        Ext.defer(function(){
            Ext.WindowManager.each(function(winmodule){
                winmodule.hide();
            });
            pageContainer.getLayout().getLayoutItems().forEach(function(item){
                item.hide();
            });

            Ext.defer(function(){
                pageContainer.hide();
                sidebar.hide();
                
                Ext.defer(function(){
                    mainview && mainview.destroy();

                    $app.fireEvent($this.getApi('event_home_close'));

                    var customLogoutUrl = $app.getMetadata('customLogoutUrl'),
                        useCustomLogout = !!customLogoutUrl;

                    if(useCustomLogout)
                    {
                        window.location.replace(customLogoutUrl);
                        return;
                    }

                    controllerLogin.launch(function(view, session, response){
                        $this.launch({
                            session: session
                        });
                    });
                }, 250);
            }, 100);
        }, 150);
    },

    onHome_AfterRender: function(component, eOpts)
    {
        var $this = this,
            $app = this.getApplication();
            
        var sidebar = this.getCmpSidebar({mainview:component}); sidebar.hide();
        var header = this.getCmpMenubar({mainview:component}); header.hide();

        Ext.defer(function(){
            sidebar.show();
            header.show();

            var content = $app.getMetadata('productBackgroundHome|productBackground');
            if(!content) return;
            component.getEl().applyStyles({
                'background-image': 'url('+content+')',
                'background-repeat': 'no-repeat',
                'background-position': 'center center',
                'background-size': 'auto 36px'
            });
        },150);
    },

    onCompLogo_AfterRender: function(component, eOpts)
    {
        var content = this.getApplication().getMetadata('productLogoHome|productLogo|productIcon') ;
        
        if(!content) return;
        component.getEl().applyStyles({
            'background-image': 'url('+content+')'
        });
    },

    onCompCopyright_AfterRender: function(component, eOpts)
    {
        var metadata = this.getApplication().getMetadata();

        component.setValue(metadata);
    }

});