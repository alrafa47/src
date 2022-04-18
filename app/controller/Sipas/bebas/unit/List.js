Ext.define('SIPAS.controller.Sipas.bebas.unit.List', {
    extend: 'SIPAS.controller.Sipas.base.List',

    stores: [
        'Sipas.bebas.unit.List',
        'Sipas.bebas.unit.Combo'
    ],

    views: [
        'Sipas.bebas.unit.List'
    ],

    messages: {
        'receiver_exits': 'Unit dengan Nama {id} sudah masuk dalam daftar'
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_bebas_unit_list' }
    ],

    controllerUnitLookup: 'Sipas.unit.Lookup',

    init: function(application) {
        this.control({
            'sipas_bebas_unit_list': {
                load : this.onMainview_Load,
                appendrecord: this.onMainview_AppendRecord,
                removerecord: this.onMainview_ActionRemoveRecord
            },
            'sipas_bebas_unit_list #fieldSearch': {
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_bebas_unit_list #buttonManual': {
                click: this.onMainview_buttonManual_Click
            }
        });
    },

    launch: function(config) {
        var $this = this,
            view = this.createView(config);

        return view;
    },

    onMainview_Load: function(mainview, record){
        var $this = this;

        if(record.isArsip()){
            newStore = record.fetchArsipBagi();
            mainview.record = record;
            mainview.reconfigure(newStore);
            newStore.reload();

        }else if(record.isBagi()){
            record.getArsip(function(arsip){
                newStore = arsip.fetchArsipBagi();
                mainview.record = arsip;
                mainview.reconfigure(newStore);
                newStore.reload();
            });
        }        
    },

    onMainview_AppendRecord: function(view, record){
        if(! record) return;
        var $this       = this,
            store       = view.getStore(),
            $helper     = $this.getApplication().Helper(),
            exist       = store.findRecord('arsip_bagi_unit', record.get('unit_id')),
            arsip_rec   = view.record,
            unitId  = view.unit;

        if(! exist){
            store.add({
                'arsip_bagi_arsip': arsip_rec.get('arsip_id'),
                'arsip_unit': arsip_rec.get('arsip_unit'),
                'unit_id' : record.get('unit_id'),
                'arsip_bagi_unit_nama' : record.get('unit_nama'),
                'arsip_bagi_unit' : record.get('unit_id')
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
            storeUnit = view.getStore(),
            controllerLookup = $this.getController($this.controllerUnitLookup),
            arsip_rec = view.record,
            vtimId = arsip_rec.get('arsip_id');

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var record = selections[i],
                        find = storeUnit.findRecord('arsip_bagi_unit', record.get('unit_id'));
                    if(!find){
                        storeUnit.add({
                            'arsip_unit': arsip_rec.get('arsip_unit'),
                            'unit_id' : record.get('unit_id'),
                            'arsip_bagi_unit_nama' : record.get('unit_nama'),
                            'arsip_bagi_arsip': arsip_rec.get('arsip_id'),
                            'arsip_bagi_unit' : record.get('unit_id')
                        });
                    }else{
                        var msg = $this.getMessage('receiver_exits',{id: record.get('unit_nama')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        });
    }
});