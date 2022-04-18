Ext.define('SIPAS.controller.Sipas.session.profile.Entity', {
	extend: 'Ext.app.Controller',

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

	controllers: [
		'Sipas.session.profile.viewer.Pane',
		'Sipas.session.profile.editor.Pane',
		'Sipas.session.profile.editor.pgs.Form',
    'Sipas.session.profile.editor.pgs.List',
		'Sipas.session.profile.editor.atasan.Form',
    'Sipas.session.profile.editor.atasan.List',
    'Sipas.session.profile.editor.wakil.Form',
    'Sipas.session.profile.editor.wakil.List',
		'Sipas.session.profile.editor.wakil.atasan.Form',
    'Sipas.session.profile.editor.wakil.atasan.List',
    'Sipas.session.profile.editor.wakil.asisten.Form',
    'Sipas.session.profile.editor.wakil.asisten.List'
	],

	models: [
		'Sipas.Staf'
	],

	refs: [
		{ ref: 'cmpSession', selector: 'sipas_home_side_pane #buttonSession' }
	],

	api: {
		profile_thumb: 'server.php/sipas/staf/get_image/foto/thumb?id={id}&_dc={dc}'
	},


	init: function(application){
		application.on({
			'sipas/home/ready': this.onApp_HomeReady,
			scope: this
		});

		// start the plugin for sipas
		application.on({
			'sipas/session/profile/read': this.onApp_ProfileRead,
			scope: this
		});
	},

	onApp_HomeReady: function(session){
		this.getApplication().fireEvent('sipas/session/profile/read', session && session.profile);
	},

	onApp_ProfileRead: function(profile, session){
		var cmp = this.getCmpSession(),
			record = (profile && profile.isRecord && profile.isRecord && profile) || this.getModel(this.defaultModel || this.models[0]).create(profile),
			url = this.getApi('profile_thumb',{
                id: record && record.getId(),
                dc: Date.now()
            });
		
		if(!(record && cmp)) return;

		cmp.setText(Ext.String.ellipsis(record.get('staf_nama'), 20, 1));
		cmp.setIcon(url);
	}

});