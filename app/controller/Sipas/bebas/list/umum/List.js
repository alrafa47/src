Ext.define('SIPAS.controller.Sipas.bebas.list.umum.List', {
    extend: 'SIPAS.controller.Sipas.base.List',

    stores: [
        'Sipas.bebas.list.umum.List'
    ],

    views: [
        'Sipas.bebas.list.umum.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_bebas_list_umum_list' }
    ],

    init: function(application) {
        this.control({
            "sipas_bebas_list_umum_list sipas_com_button_refresh": {
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