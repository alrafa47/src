Ext.define('SIPAS.controller.Sipas.bebas.List', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.List',

    stores: [
        'Sipas.bebas.List'
    ],

    views: [
        'Sipas.bebas.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_bebas_list' },
        { ref: 'compScope', selector: 'sipas_bebas_list #comboScope' }
    ],

    api: {
        datasource: 'server.php/sipas/surat_bebas/read/{mailValue}?scope={scope}'
    },

    defaultStore: 'Sipas.bebas.List',
    controllerProperty: 'Sipas.bebas.Prop',

    init: function(application) {
        this.control({
            "sipas_bebas_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);
        return view;
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
        view.getSelectionModel().deselectAll();
    }    
});