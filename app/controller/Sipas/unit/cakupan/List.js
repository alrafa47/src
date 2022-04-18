Ext.define('SIPAS.controller.Sipas.unit.cakupan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',

    models: [
        'Sipas.unit.Cakupan'
    ],
    
    views: [
        'Sipas.unit.cakupan.List'
    ],

    stores: [
        'Sipas.unit.cakupan.List',
        'Sipas.unit.Combo'
    ],

    messages: {
        'receiver_exits': ['Info','Unit dengan Nama:{id} sudah masuk dalam daftar'],
        'anggota_limit': ['Info','Anggota sudah mencapai {count} anggota. Maximum anggota dalam kelompok adalah 100']
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_unit_cakupan_list' }
    ],

    controllerUnitLookup : 'Sipas.unit.Lookup',

    init: function(application) {
        this.control({
            'sipas_unit_cakupan_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord
            },
            'sipas_unit_cakupan_list #fieldSearch': {
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_unit_cakupan_list #buttonManual': {
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
            formJabatan  = view.up('sipas_unit_cakupan_form'),
            jabatanId = formJabatan.getRecord().get('jabatan_id');
            
        if(!exist){
            store.insert(0, {
                'unit_cakupan_unit': record.get('unit_id'),
                'unit_cakupan_jabatan': jabatanId,
                'jabatan_id': jabatanId,
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
            view = $this.getMainview({from:button}),
            $helper = $this.getApplication().Helper(),
            storeUnitCakupan = view.getStore(),
            controllerLookup = $this.getController($this.controllerUnitLookup),
            formJabatan  = view.up('sipas_unit_cakupan_form'),
            jabatanId = formJabatan.getRecord().get('jabatan_id'),
            timId = view.up('sipas_unit_cakupan_form').down('[name=unit_cakupan_id]');

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var record = selections[i],
                        find = storeUnitCakupan.findRecord('unit_cakupan_unit', record.get('unit_id'));
                        
                    if(!find){
                        // var count_before = storeUnitCakupan.getCount();
                        // if ((count_before + 1) > 100){
                        //     var msg = $this.getMessage('anggota_limit',{count: count_before});
                        //     $helper.showNotification(msg[0],msg[1]);
                        // }else{
                        storeUnitCakupan.add({
                            'unit_cakupan_unit': record.get('unit_id'),
                            'unit_cakupan_jabatan': jabatanId,
                            'jabatan_id': jabatanId,
                            'unit_nama': record.get('unit_nama'),
                            'unit_id': record.get('unit_id')
                        });
                        // }
                    }
                    else{
                        var msg = $this.getMessage('receiver_exits',{id: record.get('unit_nama')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        });
    }
});