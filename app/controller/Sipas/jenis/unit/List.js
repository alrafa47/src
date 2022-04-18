Ext.define('SIPAS.controller.Sipas.jenis.unit.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.jenis.Unit'
    ],
    
    views: [
        'Sipas.jenis.unit.List'
    ],

    stores: [
        'Sipas.jenis.unit.List',
        'Sipas.jenis.unit.Combo'
    ],

    messages: {
        'receiver_exits': ['Info','Unit dengan Nama:{id} sudah masuk dalam daftar'],
        'anggota_limit': ['Info','Anggota sudah mencapai {count} anggota. Maximum anggota dalam kelompok adalah 100']
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_jenis_unit_list' }
    ],

    controllerUnitLookup : 'Sipas.unit.Lookup',

    init: function(application) {
        this.control({
            'sipas_jenis_unit_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord
            },
            'sipas_jenis_unit_list #fieldSearch': {
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_jenis_unit_list #buttonManual': {
                click: this.onMainview_buttonManual_Click
            }
        });
    },

    onMainview_SelectionChange: function(model, selected, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = model.view.up('gridpanel,treepanel'),
            record = selected && selected[0];

        $helper.disableComponent({
            action: (selected.length != 1),
            parent: view,
            items: ['sipas_com_button_delete']
        });
    },

    onMainview_AppendRecord: function(view, record){
        if(! record) return;

        var $this = this,
            store = view.getStore(),
            exist = store.findRecord('unit_id', record.get('unit_id')),
            formJenis  = view.up('sipas_jenis_unit_form'),
            jenisId = formJenis.getRecord().get('jenis_id');
        if(!exist){
            store.insert(0, {
                'jenis_unit_unit': record.get('unit_id'),
                'jenis_unit_jenis': jenisId,
                'jenis_id': jenisId,
                'unit_nama': record.get('unit_nama'),
                'unit_id': record.get('unit_id')
            });
        }else{
            var msg = $this.getMessage('receiver_exits',{id: record.get('unit_nama')});
            $helper.showNotification(msg[0],msg[1]);
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
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:button}),
            storeUnit = mainview.getStore(),
            controllerLookup = $this.getController($this.controllerUnitLookup);

        controllerLookup.launch({
            multiselect: false,
            callback:function(selections){
                Ext.Array.each(selections, function(r){
                    var find = storeUnit.getById(r.getId());
                    if(!find){
                        mainview && mainview.fireEvent('appendrecord', mainview, selections[0]);
                    }else{
                        var msg = $this.getMessage('receiver_exist',{id: r.get('unit_id')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                });
            }
        });
    }
});