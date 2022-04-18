Ext.define('SIPAS.controller.Sipas.sla.unit.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.sla.Unit'
    ],
    
    views: [
        'Sipas.sla.unit.List'
    ],

    stores: [
        'Sipas.sla.unit.List',
        'Sipas.sla.aktif.Combo'
    ],

    refs:[
        { ref: 'mainview', selector: 'sipas_sla_unit_list' }
    ],

    controllerSlaLookup : 'Sipas.sla.Lookup',

    init: function(application) {
        this.control({
            'sipas_sla_unit_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord
            },
            'sipas_sla_unit_list #fieldSearch': {
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_sla_unit_list #buttonManual': {
                click: this.onMainview_buttonManual_Click
            }
        });
    },

    onMainview_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel, treepanel'),
            record = selected && selected[0];

        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_delete']
        });
    },

    onMainview_AppendRecord: function(view, record){
        if(! record) return;

        var store = view.getStore(),
            exist = store.findRecord('sla_id', record.get('sla_id')),
            form  = view.up('sipas_sla_unit_form'),
            unitId = form.getRecord().get('unit_id');
            
        if(!exist){
            store.insert(0, {
                'sla_unit_sla': record.get('sla_id'),
                'sla_unit_unit': unitId,
                'unit_id': unitId,
                'unit_nama': record.get('unit_nama'),
                'sla_id': record.get('sla_id'),
                'sla_nama': record.get('sla_nama')
            });
        }
    },

    onMainview_ActionRemoveRecord: function(view, rowIdx, colIdx, item, e, record, row){
        view.getStore().remove(record);
    },

    onMainview_fieldSearch_Select: function(combo, selection, eOpts){
        var view = this.getMainview({from:combo});

        if(selection.length){
            view && view.fireEvent('appendrecord', view, selection[0]);   
            combo.setValue();
        }
    },

    onMainview_buttonManual_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            $helper = $this.getApplication().Helper(),
            storeSLAUnit = view.getStore(),
            controllerLookup = $this.getController($this.controllerSlaLookup),
            unitId = view.up('sipas_sla_unit_form').down('[name=sla_unit_id]');

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var record = selections[i],
                        find = storeSLAUnit.findRecord('sla_unit_sla', record.get('sla_id'));
                        
                    if(!find){
                        var count_before = storeSLAUnit.getCount();
                        if ((count_before + 1) > 100){
                            var msg = $this.getMessage('anggota_limit',{count: count_before});
                            $helper.showNotification(msg[0],msg[1]);
                        }else{
                            storeSLAUnit.add({
                                'sla_unit_sla': record.get('sla_id'),
                                'sla_unit_unit': unitId,
                                'unit_id': unitId,
                                'unit_nama': record.get('unit_nama'),
                                'sla_id': record.get('sla_id'),
                                'sla_nama': record.get('sla_nama')
                            });
                        }
                    }else{
                        var msg = $this.getMessage('receiver_exits',{id: record.get('staf_kode')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        });
    }
});