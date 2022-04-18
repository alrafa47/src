Ext.define('SIPAS.controller.Sipas.peran.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.User'
    ],

    stores: [
        'Sipas.peran.semua.List',
        'Sipas.peran.aktif.List',
        'Sipas.peran.nonaktif.List',
        'Sipas.peran.Combo'
    ],
    
    views: [
        'Sipas.peran.List'
    ],
    
    refs: [
        {ref: 'mainview', selector: 'sipas_peran_list'}
    ],

    defaultStore: 'Sipas.peran.aktif.List',
    controllerProperty: 'Sipas.peran.Prop',

    init: function(application) {
        this.control({
            "sipas_peran_list sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_peran_list": {
                // refresh: this.onMainview_Refresh,
                selectionchange: this.onGridpanel_SelectionChange
                // itemdblclick: this.onMainview_DoubleClick
            },
            'sipas_peran_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
            },
            'sipas_peran_list[dbclickToView=true]': {
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
            // callback: function(success, record){
            //     if(success && view){
            //         $this.refresh(view);
            //     }
            // }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            selectionModel = view && view.getSelectionModel(),
            controllerProperty = $this.controllerProperty;

        $this.getController(controllerProperty).launch({
            mode:'add',
            callback: function(success, record){
                if(success && view){
                    view.getStore().insert(0, record);
                    view.getView().refresh();
                    // selectionModel.select(record);
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

        if($session.getRuleAccess('hakakses_update')){
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
        var view = (view && view.down('gridpanel')) || this.getMainview(),
            $this = this;

        view.getStore().reload();
    },

    // onMainview_Refresh: function(mainview){
    //     mainview && mainview.getStore().reload();
    // },

    launch: function(config) {
       var $this = this,
            view = $this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().clearFilter(true);
                $this.refresh(view);
            });
        }
        return view;
    }

});
