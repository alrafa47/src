Ext.define('SIPAS.controller.Sipas.sistem.Entity', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.sistem.Runtime',
        'Sipas.sistem.License',
        'Sipas.sistem.LocalStorage',
        'Sipas.sistem.featureable.Feature',
        'Sipas.sistem.featureable.ComponentHandler',
        'Sipas.sistem.languageable.Language',
        'Sipas.sistem.languageable.ComponentHandler',
        'Sipas.sistem.roleable.ComponentHandler',
        'Sipas.sistem.Log',
        'Sipas.sistem.EventBrowser',

        'Sipas.sistem.setting.Pane',
        'Sipas.sistem.backuprestore.Entity',
        'Sipas.sistem.about.Popup',
        'Sipas.sistem.doc.Popup',
        'Sipas.sistem.mobile.Popup',
        'Sipas.sistem.mobile.url.Popup',
        'Sipas.sistem.changelog.Popup',
        'Sipas.sistem.log.audit.List',
        'Sipas.sistem.log.audit.Popup',
        'Sipas.sistem.log.audit.Prop',

        'Sipas.sistem.EmitterClient',
        'Sipas.sistem.EventWorker'
    ]
	
});