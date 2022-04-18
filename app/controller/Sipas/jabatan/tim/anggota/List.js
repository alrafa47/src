Ext.define('SIPAS.controller.Sipas.jabatan.tim.anggota.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    controllers: [
        'Sipas.jabatan.Lookup'
    ],

    stores: [
        'Sipas.jabatan.tim.anggota.List'
    ],

    views: [
        'Sipas.jabatan.tim.anggota.List'
    ],

    messages: {
        'receiver_exits': ['Info','Jabatan dengan Nama:{nama} sudah masuk dalam daftar'],
        'anggota_limit': ['Info','Anggota sudah mencapai {count} anggota. Maximum anggota dalam kelompok adalah 100']
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_jabatan_tim_anggota_list'}
    ],

    controllerJabatanLookup: 'Sipas.jabatan.Lookup',
    storetimAnggota: 'Sipas.jabatan.tim.anggota.List',

    init: function(application) {
        this.control({
            'sipas_jabatan_tim_anggota_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord
            },
            'sipas_jabatan_tim_anggota_list #fieldSearch': {
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_jabatan_tim_anggota_list #buttonManual': {
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

        var $this       = this,
            store       = view.getStore(),
            $helper     = $this.getApplication().Helper(),
            exist       = store.findRecord('jabatan_tim_anggota_jabatan', record.get('jabatan_id')),
            timId       = view.up('sipas_jabatan_tim_anggota_form').down('[name=jabatan_tim_id]'),
            vtimId      = timId.getValue();

        if(! exist){
            var count_before = store.getCount();
            if ((count_before + 1) > 100){
                var msg = $this.getMessage('anggota_limit',{count: count_before});
                $helper.showNotification(msg[0],msg[1]);
            }else{
                store.add({
                    'jabatan_tim_anggota_jabatan': record.get('jabatan_id'),
                    'jabatan_id': record.get('jabatan_id'),
                    'jabatan_tim_anggota_nama': record.get('jabatan_nama'),
                    'anggota_nama': record.get('jabatan_nama'),
                    'jabatan_tim_anggota_tim': vtimId,
                    'jabatan_tim_id': vtimId,
                    'anggota_kode': record.get('jabatan_kode'),
                    'jabatan_nama': record.get('jabatan_nama'),
                    'unit_nama': record.get('unit_nama')
                });
            }
        }else{
            var msg = $this.getMessage('receiver_exits',{nama: record.get('jabatan_nama')});
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
            storeAnggota = view.getStore(),
            controllerLookup = $this.getController($this.controllerJabatanLookup),
            timId = view.up('sipas_jabatan_tim_anggota_form').down('[name=jabatan_tim_id]'),
            vtimId = timId.getValue();

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var rec = selections[i],
                        find = storeAnggota.findRecord('jabatan_tim_anggota_jabatan', rec.get('jabatan_id'));
                        
                    if(!find){
                        var count_before = storeAnggota.getCount();
                        if ((count_before + 1) > 100){
                            var msg = $this.getMessage('anggota_limit',{count: count_before});
                            $helper.showNotification(msg[0],msg[1]);
                        }else{
                            storeAnggota.add({
                                'jabatan_tim_anggota_jabatan':    rec.get('jabatan_id'),
                                'jabatan_id':                  rec.get('jabatan_id'),
                                'jabatan_tim_anggota_nama':    rec.get('jabatan_nama'),
                                'anggota_nama':             rec.get('jabatan_nama'),
                                'jabatan_tim_anggota_tim':     timId.getValue(),
                                'jabatan_tim_id':              timId.getValue(),
                                'anggota_kode':             rec.get('jabatan_kode'),
                                'jabatan_nama':             rec.get('jabatan_nama'),
                                'unit_nama':                rec.get('unit_nama')
                            });
                        }
                    }else{
                        var msg = $this.getMessage('receiver_exits',{nama: rec.get('jabatan_nama')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        });
    }
});