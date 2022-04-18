Ext.define('SIPAS.controller.Sipas.session.Entity', {
	extend: 'Ext.app.Controller',

    controllers: [
    	'Sipas.session.Session',
        'Sipas.session.Setting',
        'Sipas.session.ActivityMonitor',
        'Sipas.session.login.Container',
        'Sipas.session.changepassword.Popup',
        'Sipas.session.notification.Entity',
        'Sipas.session.profile.Entity',
        'Sipas.session.ganti.Akun',
        'Sipas.session.notification.agenda.Entity'
    ]	
});