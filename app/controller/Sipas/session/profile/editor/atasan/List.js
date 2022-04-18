Ext.define('SIPAS.controller.Sipas.session.profile.editor.atasan.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    views: [
        'Sipas.session.profile.editor.atasan.List'
    ],

    stores: [
        'Sipas.staf.wakil.atasan.List',
        'Sipas.staf.wakil.asisten.Combo',
        'Sipas.staf.wakil.atasan.Combo'
    ],

    messages: {
        'receiver_exits': ['Info','Staf dengan NIP:{id} sudah masuk dalam daftar'],
        'not_allowed': ['Peingatan','Anda tidak bisa menambahkan diri anda sendiri sebagai pimpinan']
    },

    api: {
        'staf_aktif' : "server.php/sipas/staf/wakil",
        'batas_hirarki' : "server.php/sipas/staf/wakil?mode={mode}&jabatan={jabatan}"
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_session_profile_editor_atasan_list' },
        { ref: 'fieldSearch', selector: 'sipas_session_profile_editor_atasan_list #fieldSearch' }
    ],

    controllerStafLookup : 'Sipas.staf.wakil.Lookup',
    modelStafWakil : 'Sipas.staf.Wakil',

    init: function(application) {
        this.control({
            'sipas_session_profile_editor_atasan_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord
            },
            'sipas_session_profile_editor_atasan_list #fieldSearch': {
                focus: this.onFieldSearch_Focus,
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_session_profile_editor_atasan_list #buttonManual': {
                click: this.onMainview_buttonManual_Click
            }
        });
    },

    onFieldSearch_Focus: function(cmp, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $profile = $session.getProfile(),
            mainview = $this.getMainview({from:cmp}),
            batas_hirarki = $app.LocalSetting().get('use_asistensi_batas_hirarki'),
            store = cmp.getStore();

        // for batas hirarki jabatan atur pimpinan & asisten
        if (batas_hirarki){
            store.getProxy().url = $this.getApi('batas_hirarki', {mode:'pimpinan', jabatan:$profile.jabatan_induk});
        } else {
            store.getProxy().url = $this.getApi('staf_aktif');
        }
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

        var store = view.getStore();
            // exist = store.findRecord('staf_wakil_staf', record.get('staf_id'));

        // if(exist){
            store.insert(0, {
                'staf_wakil_staf': record.get('staf_id'),
                'staf_wakil_staf_nama': record.get('staf_nama'),
                'staf_wakil_staf_unit': record.get('staf_unit'),
                'staf_wakil_staf_unit_nama': record.get('unit_nama'),
                'staf_wakil_staf_jabatan': record.get('staf_jabatan'),
                'staf_wakil_staf_jabatan_nama': record.get('jabatan_nama')
            });
        // }
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
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            $profile = $session.getProfile(),
            now = new Date(),
            me = $session.getProfileId(),
            batas_hirarki = $app.LocalSetting().get('use_asistensi_batas_hirarki'),
            view = $this.getMainview({from:button}),
            $helper = $this.getApplication().Helper(),
            storeAnggota = view.getStore(),
            controllerLookup = $this.getController($this.controllerStafLookup);
            // timId = view.up('sipas_staf_wakil_form').down('[name=staf_wakil_id]');
            // vtimId = timId.getValue();

        var config = {
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var rec = selections[i],
                        find = storeAnggota.findRecord('staf_wakil_staf', rec.get('staf_id'));
                        
                    if(!find){
                        var count_before = storeAnggota.getCount();
                        if ((count_before + 1) > 100){
                            var msg = $this.getMessage('anggota_limit',{count: count_before});
                            $helper.showNotification(msg[0],msg[1]);
                        }else{
                            storeAnggota.add({
                                'staf_wakil_staf': rec.get('staf_id'),
                                'staf_wakil_staf_nama': rec.get('staf_nama'),
                                'staf_wakil_staf_unit': rec.get('staf_unit'),
                                'staf_wakil_staf_unit_nama': rec.get('unit_nama'),
                                'staf_wakil_staf_jabatan': rec.get('staf_jabatan'),
                                'staf_wakil_staf_jabatan_nama': rec.get('jabatan_nama')
                            });
                        }
                    }else{
                        var msg = $this.getMessage('receiver_exits',{id: rec.get('staf_kode')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        }

        // for batas hirarki jabatan atur pimpinan & asisten
        if (batas_hirarki){
            config['url'] = $this.getApi('batas_hirarki', {mode:'pimpinan', jabatan:$profile.jabatan_induk});
        } else {
            config['url'] = $this.getApi('staf_aktif');
        }

        controllerLookup.launch(config);
    }
});