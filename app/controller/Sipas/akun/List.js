Ext.define('SIPAS.controller.Sipas.akun.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.akun.List'
    ],
    models: [
        'Sipas.Akun'
    ],
    views: [
        'Sipas.akun.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_akun_list'}
    ],

    defaultStore: 'Sipas.akun.List',

    controllerProperty: 'Sipas.akun.Prop',

    init: function(application) {
        this.control({
            "sipas_akun_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_akun_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_akun_list": {
                refresh: this.onMainview_Refresh,
                selectionchange: this.onGridpanel_SelectionChange
                // itemdblclick: this.onMainview_DoubleClick
            },
            "sipas_akun_list #Aktif": {
                select: this.onComboStatus_Select
            },
            'sipas_akun_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_akun_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

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
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        if(!view.isProfile){
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
        }
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
                    view.fireEvent('refresh',view);
                    // $this.refresh(view);
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

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this;
        view.getStore().reload();
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().clearFilter(true);
                $this.refresh();
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
                store.getProxy().url = 'server.php/sipas/akun/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/akun/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/akun/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
    },

    onMainview_Refresh: function(mainview){
        mainview && mainview.getStore().reload();
    }

});
