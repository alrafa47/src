Ext.define('SIPAS.controller.Sipas.ekspedisi.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.ekspedisi.semua.List',
        'Sipas.ekspedisi.aktif.List',
        'Sipas.ekspedisi.nonaktif.List'
    ],
    models: [
        'Sipas.Ekspedisi'
    ],
    views: [
        'Sipas.ekspedisi.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_ekspedisi_list' }
    ],

    defaultStore: 'Sipas.ekspedisi.aktif.List',
    // aktifStore: 'Sipas.ekspedisi.list.Aktif',
    // nonAktifStore: 'Sipas.ekspedisi.list.Nonaktif',
    // aktifStore: 'Sipas.ekspedisi.status.Combo',
    // nonaktifStore: 'Sipas.ekspedisi.status.Combo',
    controllerProperty: 'Sipas.ekspedisi.Prop',

    init: function(application) {
        this.control({
            "sipas_ekspedisi_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_ekspedisi_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_ekspedisi_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_ekspedisi_list": {
                // refresh: this.onMainview_Refresh,
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_ekspedisi_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_ekspedisi_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper     = $app.Helper(),
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
        var $this = this,
            view = $this.getMainview({from:button});
        this.refresh(view);
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

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/ekspedisi/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/ekspedisi/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/ekspedisi/read';
            break;
        }

        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    // onComboStatus_Select: function(combo, selection, eOpts){
    //     var value = combo.getValue(),
    //         mainview = this.getMainview({from: combo}),
    //         store = mainview.getStore(),
    //         proxy = store.getProxy();
            
    //     proxy.url = 'server.php/sipas/ekspedisi/read/'+value;
    //     store.reload();
    // },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            pagingtoolbar = view.down('pagingtoolbar'),
            newStore = view.getStore();
        view.getStore().reload();

        /*changing paging toolbar store based on mainview's store*/
        // pagingtoolbar.bindStore(newStore);
        // pagingtoolbar.getStore().load({
        //     callback: function(record, operation, success){
        //     }
        // });
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
    }
});