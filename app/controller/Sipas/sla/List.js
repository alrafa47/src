Ext.define('SIPAS.controller.Sipas.sla.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.sla.semua.List',
        'Sipas.sla.aktif.List',
        'Sipas.sla.nonaktif.List'
    ],

    models: [
        'Sipas.Sla'
    ],

    views: [
        'Sipas.sla.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_sla_list'}
    ],

    defaultStore: 'Sipas.sla.aktif.List',

    controllerProperty: 'Sipas.sla.Prop',

    init: function(application) {
        this.control({
            "sipas_sla_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_sla_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_sla_list #Aktif": {
                select: this.onComboStatus_Select
            },
            "sipas_sla_list": {
                itemclick: this.onMainview_ClickShow
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
                    view.getView().getStore(this.defaultStore).reload();
                }
            }
        });
    },


    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    },

    onComboStatus_Select: function(combo, selection, eOpts){
        var $this = this,
            value = combo.getValue(),
            mainview = $this.getMainview({from:combo}),
            store = mainview.getStore();
         
        switch(value){
            case 1:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/sla/aktif';
            break;
            case 2:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/sla/nonaktif';
            break;
            default:
                store.removeAll();
                store.getProxy().url = 'server.php/sipas/sla/read';
            break;
        }
        mainview.down('pagingtoolbar').moveFirst();
        // store.reload();
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
    }

});