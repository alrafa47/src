Ext.define('SIPAS.controller.Sipas.bebas.list.bagi.List', {
    extend: 'SIPAS.controller.Sipas.base.List',

    stores: [
        'Sipas.bebas.list.bagi.List'
    ],

    views: [
        'Sipas.bebas.list.bagi.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_bebas_list_bagi_list' }
    ],

    init: function(application) {
        this.control({
            "sipas_bebas_list_bagi_list sipas_com_button_refresh": {
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