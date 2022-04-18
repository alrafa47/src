Ext.define('SIPAS.controller.Sipas.base.List',{
	extend: 'SIPAS.controller.Sipas.base.View',

    defaultStore: null,

    controllerProperty: null,

    launch: function(config) {
        var $this = this,
            view = this.createView(config);
        return view;
    },

    onGridpanel_AfterRender: function(component, eOpts){
    	var store = component.getStore();
    	store && store.reload();
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

    onButtonEdit_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
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
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'view',
            record: record
        });
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            record = view && view.getSelectionModel().getSelection()[0],
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
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
        var $this = this,            
            $checkSession = $this.getApplication().getSession().getResetSession(),
            view = this.getMainview({from:button}),
        	store = (view && view.getStore()) || this.getStore(this.defaultStore) || this.stores[0];

        store && store.reload();
    }
});