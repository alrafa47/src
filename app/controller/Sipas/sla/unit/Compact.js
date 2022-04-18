Ext.define('SIPAS.controller.Sipas.sla.unit.Compact', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    controllers: [
        'Sipas.unit.Compact',
        'Sipas.sla.unit.Form'
    ],

    views: [
        'Sipas.sla.unit.Compact'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_sla_unit_compact' },
        { ref: 'form',      selector: 'sipas_sla_unit_compact sipas_sla_unit_form' },
        { ref: 'grid',      selector: 'sipas_sla_unit_compact sipas_unit_list' }
    ],

    controllerUnitCompact: 'Sipas.unit.Compact',
    storeSLACombo: 'Sipas.sla.aktif.Combo',

    init: function(application) {
        this.control({
            'sipas_sla_unit_compact sipas_unit_compact sipas_unit_list[clickToView=false]': {
                selectionchange: this.onMainview_SelectionChange
            },
            'sipas_sla_unit_compact sipas_unit_compact sipas_unit_treelist[clickToView=false]': {
                selectionchange: this.onMainview_SelectionChange
            }
        })
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        $this.getStore($this.storeSLACombo).reload();
        $this.getController($this.controllerUnitCompact).refresh();

        return view;
    },

    onMainview_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            view = $this.getMainview({from:model.view}),
            form = $this.getForm({root:view}),
            record = selected && selected[0];
            
        if(record){
            // form.loadRecord(record);
            form.setDisabled(selected.length != 1);
            if(selected.length){
                form.loadRecord(selected[0]);
            }else{
                form.reset(true);
            }
        }
    }

});