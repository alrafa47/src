Ext.define('SIPAS.controller.Sipas.surat.libnomor.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.surat.libnomor.List'
    ],
    
    models: [
        'Sipas.surat.Libnomor'
    ],

    views: [
        'Sipas.surat.libnomor.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_surat_libnomor_list' }
    ],

    defaultStore: 'Sipas.surat.libnomor.List',
    controllerProperty: 'Sipas.surat.libnomor.Prop',

    init: function(application) {
        this.control({
            "sipas_surat_libnomor_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            'sipas_surat_libnomor_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            "sipas_surat_libnomor_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            }
        });
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

    onButtonAdd_Click: function (button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({ from: button }),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode: 'add',
            callback: function (success, record) {                
                if (success && view) {
                    view.getStore().insert(0, record);
                    view.getStore().reload();
                }
            }
        });
    },

    onMainview_ClickShow: function(model, selected, eOpts) {
        var $this = this,
            view = $this.getMainview({from:model.view}),
            record = selected,
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record,
            callback: function(success, record, eOpts){
                if(success) $this.refresh();
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        this.refresh();
    },

    refresh: function(view) {
        var $this = this,
            view = view || $this.getMainview(),
            newStore = view.getStore();

        newStore.reload();
    } 
});