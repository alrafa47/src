Ext.define('SIPAS.controller.Sipas.staf.akun.Lookup', {
    extend: 'SIPAS.controller.Sipas.base.Lookup',

    requires: [
        'Ext.ux.controller.Hasview',
        'Ext.ux.controller.Template'
    ],

    mixins: {
        hasview: 'Ext.ux.controller.Hasview',
        template: 'Ext.ux.controller.Template'
    },

    stores: [
        'Sipas.staf.akun.List'
    ],

    views: [
        'Sipas.staf.akun.Lookup'
    ],

    refs: [
        { ref: 'mainview',  selector: 'sipas_staf_akun_lookup'},
        { ref: 'grid',      selector: 'sipas_staf_akun_lookup gridpanel, sipas_staf_akun_lookup treepanel' },
        { ref: 'putin',     selector: 'sipas_staf_akun_lookup sipas_com_button_putin' }
    ],

    defaultStore: 'Sipas.staf.akun.List',
    controllerProperty: 'Sipas.akun.Prop',

    init: function(application) {
        this.control({
            "sipas_staf_akun_lookup sipas_com_button_putin": {
                click: this.onButtonPutin_Click
            },
            "sipas_staf_akun_lookup grid": {
                selectionchange: this.onGridpanel_SelectionChange,
                afterrender: this.onGridpanel_AfterRender
            },
            "sipas_staf_akun_lookup sipas_com_button_add": {
                click: this.onButtonAdd_Click
            }
        });
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            grid = $this.getGrid({root:view}),
            controllerProperty = $this.getController($this.controllerProperty);

        controllerProperty.launch({
            mode:'add',
            callback: function(success, record){
                if(success && grid){
                    grid.getStore().insert(0, record);
                    // view.fireEvent('refresh',view);
                    // $this.refresh(view);
                }
            }
        });
    }

});