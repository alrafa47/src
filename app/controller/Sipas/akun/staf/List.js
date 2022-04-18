Ext.define('SIPAS.controller.Sipas.akun.staf.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    controllers: [
        'Sipas.akun.staf.Lookup'
    ],

    stores: [
        'Sipas.akun.staf.List'
    ],

    views: [
        'Sipas.akun.staf.List'
    ],

    messages: {
        'receiver_exits': ['Info','Staf dengan NIP:{id} sudah masuk dalam daftar'],
        'anggota_limit': ['Info','Anggota sudah mencapai {count} anggota. Maximum anggota dalam kelompok adalah 100']
    },

    refs: [
        { ref: 'mainview', selector: 'sipas_akun_staf_list'}
    ],

    controllerStafLookup: 'Sipas.akun.staf.Lookup',
    storetimAnggota: 'Sipas.akun.baru.staf.List',

    init: function(application) {
        this.control({
            'sipas_akun_staf_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord
            },
            'sipas_akun_staf_list #fieldSearch': {
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_akun_staf_list #buttonManual': {
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

        var $this   = this,
            store   = view.getStore(),
            $helper = $this.getApplication().Helper(),
            exist       = store.findRecord('staf_asli_id', record.get('staf_id')),
            timId   = view.up('sipas_akun_staf_form').down('[name=akun_id]'),
            // exist   = store.findRecord('staf_isaktif', record.get('staf_id')),
            vtimId  = timId.getValue();

        if(! exist){
            var count_before = store.getCount();
            if ((count_before + 1) > 100){
                var msg = $this.getMessage('anggota_limit',{count: count_before});
                $helper.showNotification(msg[0],msg[1]);
            }else{
                store.add({
                    'staf_asli_id':   record.get('staf_id'),
                    'staf_nama':      record.get('staf_nama'),
                    'anggota_nama':   record.get('staf_nama'),
                    'staf_akun':      vtimId,
                    'staf_kode':      record.get('staf_kode'),
                    'staf_isaktif':   record.get('staf_isaktif'),
                    'jabatan_nama':   record.get('jabatan_nama'),
                    'unit_nama':      record.get('unit_nama')
                });
            }
        }else{
            var msg = $this.getMessage('receiver_exits',{id: record.get('staf_kode')});
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
            controllerLookup = $this.getController($this.controllerStafLookup),
            timId = view.up('sipas_akun_staf_form').down('[name=akun_id]'),
            vtimId = timId.getValue();

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var rec = selections[i],
                        find = storeAnggota.findRecord('staf_asli_id', rec.get('staf_id'));
                        
                    if(!find){
                        var count_before = storeAnggota.getCount();
                        if ((count_before + 1) > 100){
                            var msg = $this.getMessage('anggota_limit',{count: count_before});
                            $helper.showNotification(msg[0],msg[1]);
                        }else{
                            storeAnggota.add({
                                'staf_asli_id': rec.get('staf_id'),
                                'staf_nama': rec.get('staf_nama'),
                                'staf_akun': timId.getValue(),
                                'staf_kode': rec.get('staf_kode'),
                                'staf_isaktif': rec.get('staf_isaktif'),
                                'jabatan_nama': rec.get('jabatan_nama'),
                                'unit_nama': rec.get('unit_nama')
                            });
                        }
                    }else{                        
                        var msg = $this.getMessage('receiver_exits',{id: rec.get('staf_kode')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        });
    }
});