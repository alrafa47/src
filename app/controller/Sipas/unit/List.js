Ext.define('SIPAS.controller.Sipas.unit.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.unit.semua.List',
        'Sipas.unit.aktif.List',
        'Sipas.unit.nonaktif.List'
    ],
    models: [
        'Sipas.Unit'
    ],
    views: [
        'Sipas.unit.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_unit_list'}
    ],

    defaultStore: 'Sipas.unit.semua.List',

    controllerProperty: 'Sipas.unit.Prop',

    init: function(application) {
        this.control({
            "sipas_unit_list sipas_com_button_add": {
                click: this.onButtonAdd_Click 
            },
            "sipas_unit_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_unit_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_unit_list": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_unit_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_unit_list[dbclickToView=true]': {
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
            // callback: function(success, record){
            //     if(success && view){
            //         $this.refresh(view);
            //     }
            // }
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
            // callback: function(success, record){
            //     if(success && view){
            //         $this.refresh(view);
            //     }
            // }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'add',
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.getView().refresh();
                    // $this.refresh(view);
                }
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var mainview = this.getMainview({from: button});
        this.refresh(mainview);
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
            checkSession = $this.getApplication().getSession().getResetSession(),
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/unit/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/unit/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/unit/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    refresh: function(mainview) {
        var mainview = mainview || this.getMainview(),
            store = mainview.getStore();
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
    }
});