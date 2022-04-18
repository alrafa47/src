Ext.define('SIPAS.controller.Sipas.sistem.log.audit.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.sistem.log.audit.List'
    ],
    models: [
        'Sipas.properti.Log'
    ],
    views: [
        'Sipas.sistem.log.audit.List'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_sistem_log_audit_list' }
    ],

    defaultStore: 'Sipas.sistem.log.audit.List',
    controllerProperty: 'Sipas.sistem.log.audit.Prop',

    init: function(application) {
        this.control({
            "sipas_sistem_log_audit_list sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_sistem_log_audit_list": {
                selectionchange: this.onGridpanel_SelectionChange
            },
            'sipas_sistem_log_audit_list[clickToView=true]': {
                itemclick: this.onMainview_ClickShow
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

        controllerProperty.launch({
            mailValue: view.mailValue,
            mode:'view',
            record: record
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
    },

    refresh: function(view) {
        var view = view || this.getMainview(),
            $this = this,
            newStore = view.getStore();

        newStore.reload();
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