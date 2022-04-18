Ext.define('SIPAS.controller.Sipas.kontak.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        // 'Sipas.media.semua.List',
        // 'Sipas.media.aktif.List',
        // 'Sipas.media.nonaktif.List',
        // 'Sipas.media.Combo'
        'Sipas.kontak.List'
    ],
    models: [
        'Sipas.Kontak'
    ],
    views: [
        'Sipas.kontak.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_kontak_list' }
    ],

    // defaultStore: 'Sipas.kontak.semua.List',
    defaultStore: 'Sipas.kontak.List',
    controllerProperty: 'Sipas.kontak.Prop',

    init: function(application) {
        this.control({
            "sipas_kontak_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_kontak_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_kontak_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_kontak_list": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_kontak_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_kontak_list[dbclickToView=true]': {
                itemdblclick: this.onMainview_DoubleClickShow
            }
        });
    },

    onMainview_DoubleClickShow: function(model, selected, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
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
            $app = $this.getApplication(),
            checkSession = $app.getSession().getResetSession(),
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
            value = combo.getValue(),
            store = $this.getStore(combo.getValue()),
            mainview = $this.getMainview({from:combo}),
            pagingtoolbar = mainview.down('pagingtoolbar');

        mainview.reconfigure(store);
        pagingtoolbar.bindStore(store);
        pagingtoolbar.moveFirst();
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