Ext.define('SIPAS.controller.Sipas.Door', {
    extend: 'Ext.app.Controller',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    controllers: [
        'Sipas.session.login.Container'
    ],

    views: [
        'Sipas.Door',
        'Sipas.Viewport'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_door' },
        { ref: 'cmpLogin',  selector: 'sipas_door sipas_session_login_container'},
        { ref: 'cmpInfo',   selector: 'sipas_door #description'},
        { ref: 'viewport',  selector: 'sipas_viewport', autoCreate: true, xtype: 'sipas_viewport'}
    ],

    messages: {
        'error':'Gagal membaca pesan dari server'
    },

    init: function(application) {
        this.control({
            'sipas_door': {
                afterrender: this.onMainview_AfterRender
            },
            'sipas_door sipas_session_login_container': {
                authed: this.onLoginPage_Authed
            },
            'sipas_door sipas_com_button_valuable#description': {
                afterrender: this.onButtonInfo_AfterRender,
                click: this.onButton_Click
            },
            'sipas_door #containerLogo': {
                afterrender: this.onContainerLogo_AfterRender
            }
        });
    },

    launch: function(callback, scope) 
    {
        var $app = this.getApplication(),
            customLoginUrl = $app.getMetadata('customLoginUrl'),
            useCustomLogin = !!customLoginUrl;

        if(useCustomLogin)
        {
            window.location.replace(customLoginUrl);
            return;
        }

        var view = this.createView({
                callback: callback,
                scope: scope
            });

        this.getViewport().add(view);
        return view;
    },

    onMainview_AfterRender: function(component, eOpts)
    {
        var cmpLogin = this.getCmpLogin({mainview: component}); cmpLogin.hide();
        var cmpInfo = this.getCmpInfo({mainview: component}); cmpInfo.hide();

        Ext.defer(function(){
            cmpLogin.show();
            cmpInfo.show();
        }, 250);
    },

    onButtonInfo_AfterRender: function(button, eOpts)
    {
        var $app = this.getApplication();

        button.setValue($app.getMetadata());
    },

    onContainerLogo_AfterRender: function(component, eOpts)
    {
        var $app = this.getApplication();

        var logo = $app.getMetadata('productLogoDoor') || $app.getMetadata('productLogo') || $app.getMetadata('productIcon');
        component.getEl().applyStyles({
            'background-image': 'url('+logo+')',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-size': 'contain'
        });
    },

    onButton_Click: function(button, e, eOpts)
    {
        this.getApplication().fireEvent('sipas/page/boot', button.bootstrap, !button.pageLauncher);
    },

    onLoginPage_Authed: function(view, session, response)
    {
        var mainview = this.getMainview({from:view});
        var btnInfo = this.getCmpInfo({root:mainview}); btnInfo.hide();
        view.hide();

        Ext.defer(function(){
            mainview.destroy();
            Ext.callback(mainview.callback, mainview.scope, [mainview, session, response]);
        }, 250);
    }

});
