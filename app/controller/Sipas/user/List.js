Ext.define('SIPAS.controller.Sipas.user.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.User'
    ],

    stores: [
        'Sipas.user.List'
    ],
    
    views: [
        'Sipas.user.List'
    ],
    
    refs: [
        {ref: 'mainview', selector: 'sipas_user_list'}
    ],

    defaultStore: 'Sipas.user.List',
    controllerProperty: 'Sipas.user.Prop',

    init: function(application) {
        this.control({
            "sipas_user_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_user_list sipas_com_button_view": {
                click: this.onButtonView_Click
            },
            "sipas_user_list sipas_com_button_edit": {
                click: this.onButtonEdit_Click
            },
            "sipas_user_list sipas_com_button_delete": {
                click: this.onButtonDelete_Click
            },
            "sipas_user_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_user_list": {
                selectionchange: this.onGridpanel_SelectionChange
            }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            controllerProperty = $this.controllerProperty;

        $this.getController(controllerProperty).launch({
            mode:'add',
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.getView().refresh();
                }
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.controllerProperty;

        $this.getController(this.controllerProperty).launch({
            mode:'edit',
            record: record,
            callback: function(success, record){
                if(success && view){
                    view.getView().refresh();
                }
            }
        });
    },

    onButtonView_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.controllerProperty;

        $this.getController(this.controllerProperty).launch({
            mode:'view',
            record: record
        });
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.controllerProperty;

        $this.getController($this.controllerProperty).launch({
            mode:'destroy',
            record: record,
            callback: function(success, record){
                if(success && view){
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
            $helper = this.getApplication().Helper(),
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
            view = $this.createView(config);

        if(view){
            view.on('afterrender', function(){
                $this.refresh();
            });
        }
        return view;
    }

});
