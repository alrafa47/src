Ext.define('SIPAS.controller.Sipas.unit.jabatan.Treelist', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    stores: [
        'Sipas.unit.jabatan.semua.Treelist',
        'Sipas.unit.jabatan.aktif.Treelist',
        'Sipas.unit.jabatan.nonaktif.Treelist'
    ],
    models: [
        'Sipas.Jabatan'
    ],
    views: [
        'Sipas.jabatan.Treelist'
    ],
    refs:[
        { ref : 'mainview', selector: 'sipas_unit_jabatan_treelist'},
        { ref : 'form', selector: 'sipas_unit_jabatan_treelist > form'}
    ],

    defaultStore: 'Sipas.unit.jabatan.semua.Treelist',

    controllerProperty: 'Sipas.jabatan.Prop',

    init: function(application) {
        this.control({
            "sipas_unit_jabatan_treelist sipas_com_button_add": {
                click: this.onButtonAdd_Click
            },
            "sipas_unit_jabatan_treelist sipas_com_button_refresh": {
                click: this.onButtonRefresh_Click
            },
            "sipas_unit_jabatan_treelist": {
                selectionchange: this.onGridpanel_SelectionChange
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        if(view){
            view.on('afterrender', function(){
                view.getStore().load();
            });
        }
        return view;
    },

    refresh: function() {
        this.getStore(this.defaultStore || this.stores[0]).reload();
    },

    onButtonAdd_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            controllerProperty = $this.controllerProperty,
            selectionModel = view.getSelectionModel(),
            parentRecord = selectionModel.getSelection()[0] || view.getStore().getRootNode();

        $this.getController(controllerProperty).launch({
            mode:'add',
            parentRecord: parentRecord,
            callback: function(success, record){
                if(success && view){
                    parentRecord.appendChild(record);
                    parentRecord.set('leaf', false);
                    parentRecord.expand();
                    record.set('leaf', true);
                    selectionModel.select(record);
                }
            }
        });
    },

    onButtonRefresh_Click: function(button, e, eOpts) {
        var view = this.getMainview({from:button}),
            form = this.getForm({root:view});

        view.getStore().reload();
        form.loadRecord(view.getStore().create({}));
    },

    onGridpanel_SelectionChange: function(model, selected, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            form = $this.getForm({root:view}),
            record = selected && selected[0];
        form.loadRecord(record || view.getStore().create({}));
        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
        });
    }

});
