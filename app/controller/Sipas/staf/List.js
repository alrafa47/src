Ext.define('SIPAS.controller.Sipas.staf.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.staf.semua.List',
        'Sipas.staf.aktif.List',
        'Sipas.staf.nonaktif.List',
        'Sipas.staf.Combo'
    ],
    models: [
        'Sipas.Staf'
    ],
    views: [
        'Sipas.staf.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_staf_list'}
    ],

    controllerProperty: 'Sipas.staf.Prop',
    controllerPropertyImpt: 'Sipas.staf.impt.Prop',

    init: function(application) {
        this.control({
            "sipas_staf_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_staf_list #btnImport": {
                click: this.onButtonImpt_Click
            },
            "sipas_staf_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            // "sipas_staf_list combobox[name=tampilcombo]": {
            //     afterrender:this.onComboStatus_AfterRender,
            //     select: this.onComboStatus_Select
            // },
            "sipas_staf_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_staf_list": {
                refresh: this.onMainview_Refresh,
                selectionchange: this.onGridpanel_SelectionChange
                // itemdblclick: this.onMainview_DoubleClick
            },
            'sipas_staf_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_staf_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
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
            record: record,
            callback: function(success, record, eOpts){
                view && view.getStore().reload();
            }
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
                    view.fireEvent('refresh',view);
                    // $this.refresh(view);
                }
            }
        });
    },

    onButtonImpt_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            controllerProperty = $this.getController($this.controllerPropertyImpt);

        controllerProperty.launch({
            mode:'view',
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.fireEvent('refresh',view);
                    // $this.refresh(view);
                }
            }
        });
    },

    onMainview_DoubleClick: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        if($session.getRuleAccess('staf_update')){
            controllerProperty.launch({
                mailValue: view.mailValue,
                mode:'edit',
                record: record,
                callback: function(success, record){
                    if(success && view){
                        $this.refresh(view);
                    }
                }
            });
        }else{
            controllerProperty.launch({
                mailValue: view.mailValue,
                mode:'view',
                record: record,
                callback: function(success, record){
                    if(success && view){
                        $this.refresh(view);
                    }
                }
            });
        }
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button});
        view.fireEvent('refresh',view);
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
    
    onMainview_Refresh: function(mainview){
        mainview && mainview.getStore().reload();
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().clearFilter(true);
                // view.fireEvent('refresh',view);
                $this.refresh(view);
            });
        }
        return view;
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/staf/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/staf/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/staf/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    }
    
    // onComboStatus_AfterRender: function(component , eOpts){
    //     component.setValue(2);
    //     var value = component.getValue(),
    //         mainview = this.getMainview({from: component}),
    //         store = mainview.getStore(),
    //         proxy = store.getProxy();
            
    //     proxy.url = 'server.php/sipas/staf/read/'+value;
    //     store.reload();
    // },

    // onComboStatus_Select: function(combo, selection, eOpts){
    //     var value = combo.getValue(),
    //         mainview = this.getMainview({from: combo}),
    //         store = mainview.getStore(),
    //         proxy = store.getProxy();
            
    //     proxy.url = 'server.php/sipas/staf/read/'+value;
    //     store.reload();
    // }

});
