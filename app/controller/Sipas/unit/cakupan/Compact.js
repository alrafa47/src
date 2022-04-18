Ext.define('SIPAS.controller.Sipas.unit.cakupan.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.unit.cakupan.Form',
        'Sipas.jabatan.Treelist'
    ],

    views: [
        'Sipas.unit.cakupan.Compact'
    ],

    stores: [
        'Sipas.unit.cakupan.List'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_unit_cakupan_compact' },
        { ref: 'form',      selector: 'sipas_unit_cakupan_compact sipas_unit_cakupan_form' },
        { ref: 'grid',      selector: 'sipas_unit_cakupan_compact sipas_jabatan_treelist' }
    ],

    controllerJabatanTreelist: 'Sipas.jabatan.Treelist',
    storeUnitCombo: 'Sipas.unit.Combo',

    init: function(application) {
        this.control({
            'sipas_unit_cakupan_compact sipas_jabatan_treelist': {
                selectionchange: this.onGridunit_SelectionChange
            },
            'sipas_unit_cakupan_compact sipas_com_button_add': {
                click: this.onButtonAdd_Click
            }
        })
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        $this.getStore($this.storeUnitCombo).reload();

        $this.getController($this.controllerJabatanTreelist).refresh();

        return view;
    },

    onGridunit_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:model.view}),
            form = $this.getForm({root:view}),
            record = selected && selected[0];
            
        if(record){
            // form.loadRecord(record);
            $helper.disableComponent({
                action: (selected.length != 1),
                parent: view,
                items: ['sipas_com_button_view','sipas_com_button_edit','sipas_com_button_delete']
            });

            form.setDisabled(selected.length != 1);
            if(selected.length){
                form.loadRecord(selected[0]);
            }else{
                form.reset(true);
            }
        }
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
    }

});