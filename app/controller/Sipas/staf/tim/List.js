Ext.define('SIPAS.controller.Sipas.staf.tim.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.staf.tim.List'
    ],
    models: [
        'Sipas.staf.Tim'
    ],
    views: [
        'Sipas.staf.tim.List'
    ],

    refs: [
        { ref: 'mainview', selector: 'sipas_staf_tim_list'}
    ],

    defaultStore: 'Sipas.staf.tim.List',

    controllerProperty: 'Sipas.staf.tim.Prop',

    init: function(application) {
        this.control({
            "sipas_staf_tim_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_staf_tim_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_staf_tim_list": {
                selectionchange: this.onGridpanel_SelectionChange
                // itemdblclick: this.onMainview_DoubleClick
            },
            'sipas_staf_tim_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_staf_tim_list[dbclickToView=true]': {
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
            $app        = $this.getApplication(),
            $helper = $app.Helper(),
            $session    = $app.getSession(),
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
    }

});
