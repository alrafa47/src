Ext.define('SIPAS.controller.Sipas.session.profile.viewer.Pane', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.ux.controller.Hasview',
        'Ext.ux.controller.Template'
    ],

    mixins:{
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    views: [
        'Sipas.session.profile.viewer.Pane'
    ],

    models: [
        'Sipas.Staf'
    ],

    refs : [
        { ref: 'mainview',          selector: 'sipas_session_profile_viewer_pane'},
        { ref: 'cmpProfilePicture', selector: 'sipas_session_profile_viewer_pane #containerProfile #containerImage'},
        { ref: 'btnProfile', selector: 'sipas_session_profile_viewer_pane #buttonProfile'}
    ],

    api: {
        'profile'               : 'server.php/sipas/account/info/profile',
        'profile_image'         : 'server.php/sipas/staf/get_image/foto?id={id}&dc={dc}'
    },

    defaultModel: 'Sipas.Staf',

    init: function(application) {
        application.on({
            'sipas/session/profile/read': this.onApp_ProfileRead,
            scope: this
        })
        this.control({
            'sipas_session_profile_viewer_pane': {
                afterrender: this.onMainview_AfterRender
            },
            'sipas_session_profile_viewer_pane button#buttonProfile':{
                loadassociate: this.onButtonProfile_LoadAssociate,
                click: this.onButtonProfile_Click
            }
        });
    },

    onApp_ProfileRead: function(profile)
    {
        var view = this.getMainview(),
            btn = this.getBtnProfile({root:view}),
            cmp = this.getCmpProfilePicture({root:view}),
            t = new Ext.Template("<img src='{url}' style='border-radius: 100%'/>"),
            record = (profile && profile.isRecord && profile.isRecord && profile) || this.getModel(this.defaultModel || this.models[0]).create(profile);

        view && view.loadRecord(record);
        
        btn && btn.setIcon(this.getApi('profile_image',{
            id: record && record.getId(),
            dc: Date.now()
        }));

        cmp && cmp.update(t.apply({
            url: this.getApi('profile_image',{
                id: record && record.getId(),
                dc: Date.now()
            })
        }));
    },

    onMainview_AfterRender: function()
    {
        var content = this.getApplication().getMetadata('productBackgroundProfile');
        
        if(!content) return;
        component.getEl().applyStyles({
            'background-image': 'url('+content+')'
        });
    },

    onButtonProfile_LoadAssociate: function(record, form, cmp)
    {
        cmp.setValue(record.getData());
    },

    onButtonProfile_Click: function(button, e, eOpts)
    {
        this.getApplication().fireEvent('sipas/page/boot', button.bootstrap, button.popupLauncher);
    }
});
