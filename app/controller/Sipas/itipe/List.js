Ext.define('SIPAS.controller.Sipas.itipe.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.itipe.aktif.Combo',
        'Sipas.itipe.semua.List',
        'Sipas.itipe.aktif.List',
        'Sipas.itipe.nonaktif.List',
        'Sipas.itipe.Combo'
    ],
    models: [
        'Sipas.Itipe'
    ],
    views: [
        'Sipas.itipe.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_itipe_list' }
    ],

    api: {
        datasource: 'server.php/sipas/itipe/read/list'
    },

    defaultStore: 'Sipas.itipe.aktif.List',
    controllerProperty: 'Sipas.itipe.Prop',

    init: function(application) {
        this.control({
            "sipas_itipe_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_itipe_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_itipe_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_itipe_list": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_itipe_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_itipe_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'add',
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.getView().refresh();
                }
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
        });
    },

    refresh: function() {
        var store = this.getStore(this.defaultStore || this.stores[0]),
            proxy = store.getProxy();

        // store.removeAll();
        // proxy.url = this.getApi('datasource');
        // store.clearFilter(true);
        store.reload();
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh();
            });
        }
        return view;
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            store = $this.getStore(combo.getValue()),
            mainview = $this.getMainview({from:combo}),
            pagingtoolbar = mainview.down('pagingtoolbar');

        mainview.reconfigure(store);
        pagingtoolbar.bindStore(store);
        pagingtoolbar.moveFirst();
        // store.reload();
    }
});