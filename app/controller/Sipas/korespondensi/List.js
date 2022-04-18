Ext.define('SIPAS.controller.Sipas.korespondensi.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    views: [],

    models:[
        'Sipas.Korespondensi'
    ],

    stores: [],
    refs: [],

    launch: function() {
        var $this = this,
            view = $this.createView();

        view.on({
            afterrender: function(){
                $this.refresh(view);
            }
        });
        return view;
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var checkSession = this.getApplication().getSession().getResetSession(),
            mainview = this.getMainview({from:button});
        this.refresh(mainview);
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            mainview = $this.getMainview({from:model.view}),
            record = mainview && mainview.getSelectionModel().getSelection()[0],
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'view',
            record: record,
            callback: function(success, record){
                if(success && view){
                    view.getView().refresh();
                }
            }
        });
    },

    onComboInstansi_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: combo}),
            store = mainview.getStore(),
            valueInstansi = combo.getValue(),
            proxy = store.getProxy();

        store.removeAll();
        proxy.url = $this.getApi('datasource',{instansi:valueInstansi});

        store.clearFilter(true);
        store.reload();
    },

    onComboInstansi_AfterRender: function (component, eOpts) {
        component.getStore().reload();
    },

    onComboUnit_Select: function(combo, selection, eOpts){
        var $this = this,
            mainview = $this.getMainview({from: combo}),
            store = mainview.getStore(),
            valueUnit = combo.getValue(),
            proxy = store.getProxy();

        store.removeAll();
        proxy.url = $this.getApi('datasource',{unit:valueUnit});

        store.clearFilter(true);
        store.reload();
    },

    onComboUnit_AfterRender: function (component, eOpts) {
        component.getStore().reload();
    },

    onMinusButton_Click: function(button, e, e0pts){

    },

    refresh: function(mainview) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
        
        // mainview.getStore().reload();
    }
});