Ext.define('SIPAS.controller.Sipas.golongan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.golongan.semua.List',
        'Sipas.golongan.aktif.List',
        'Sipas.golongan.nonaktif.List'
    ],
    
    models: [
        'Sipas.Golongan'
    ],

    views: [
        'Sipas.golongan.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_golongan_list' }
    ],

    defaultStore: 'Sipas.golongan.semua.List',

    controllerProperty: 'Sipas.golongan.Prop',

    init: function(application) {
        this.control({
            "sipas_golongan_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_golongan_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_golongan_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_golongan_list": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_golongan_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_golongan_list[dbclickToView=true]': {
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
            checkSession = $this.getApplication().getSession().getResetSession(),
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

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/golongan/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/golongan/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/golongan/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
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
                $this.refresh();
            });
        }
        return view;
    }
});