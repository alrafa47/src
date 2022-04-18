Ext.define('SIPAS.controller.Sipas.jabatan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.jabatan.semua.List',
        'Sipas.jabatan.aktif.List',
        'Sipas.jabatan.nonaktif.List'
    ],
    models: [
        'Sipas.Jabatan'
    ],
    views: [
        'Sipas.jabatan.List'
    ],
    refs:[
        { ref : 'mainview', selector: 'sipas_jabatan_list'}
    ],

    defaultStore: 'Sipas.jabatan.semua.List',
    controllerProperty: 'Sipas.jabatan.Prop',

    init: function(application) {
        this.control({
            "sipas_jabatan_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_jabatan_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_jabatan_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_jabatan_list": {
                refresh: this.onMainview_Refresh,
                selectionchange: this.onGridpanel_SelectionChange
                // itemdblclick: this.onMainview_DoubleClick
            },
            'sipas_jabatan_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_jabatan_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().clearFilter(true);
                view.fireEvent('refresh',view);
            });
        }
        return view;
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
    },

    onMainview_Refresh: function(mainview){
        mainview && mainview.getStore().reload();
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record
            // callback: function(success, record, eOpts){
            //     if(success && view){
            //         $this.refresh(view);
            //     }
            // }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app        = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record,
            callback: function(success, record, eOpts){
                if(success && view){
                    $this.refresh(view);
                }
            }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'add',
            callback: function(success, record, eOpts){
                if(success && view){
                    // view.getStore().insert(0, record);
                    // view.fireEvent('refresh',view);
                    $this.refresh(view);
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

        if($session.getRuleAccess('jabatan_update')){
            controllerProperty.launch({
                mailValue: view.mailValue,
                mode:'edit',
                record: record,
                callback: function(success, record, eOpts){
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
                callback: function(success, record, eOpts){
                    if(success && view){
                        $this.refresh(view);
                    }
                }
            });
        }
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button});
        this.refresh(view);
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
                store.getProxy().url = 'server.php/sipas/jabatan/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/jabatan/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/jabatan/read';
            break;
        }

        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected && selected[0];
            
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
        });
    }
});
