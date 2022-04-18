Ext.define('SIPAS.controller.Sipas.session.profile.editor.wakil.asisten.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    views: [
        'Sipas.session.profile.editor.wakil.asisten.List'
    ],

    stores: [
        'Sipas.jabatan.wakil.asisten.List',
        'Sipas.jabatan.wakil.Combo'
    ],

    messages: {
        'receiver_exits': ['Info','jabatan dengan Nama:{name} sudah masuk dalam daftar'],
        'not_allowed': ['Peingatan','Anda tidak bisa menambahkan diri anda sendiri sebagai asisten']
    },

    api: {
        batas_hirarki : "server.php/sipas/jabatan/wakil?mode={mode}&jabatan={jabatan}",
        jabatan_aktif : "server.php/sipas/jabatan/wakil"
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_session_profile_editor_wakil_asisten_list' },
        { ref: 'fieldSearch', selector: 'sipas_session_profile_editor_wakil_asisten_list #fieldSearch' }
    ],

    controllerjabatanLookup : 'Sipas.jabatan.wakil.Lookup',
    modeljabatanWakil : 'Sipas.jabatan.Wakil',

    init: function(application) {
        this.control({
            'sipas_session_profile_editor_wakil_asisten_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord
            },
            'sipas_session_profile_editor_wakil_asisten_list #fieldSearch': {
                focus: this.onFieldSearch_Focus,
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_session_profile_editor_wakil_asisten_list #buttonManual': {
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
            store.getProxy().url = $this.getApi('batas_hirarki', {mode:'asisten', jabatan:$profile.jabd});
        } else {
            store.getProxy().url = $this.getApi('jabatan_aktif');
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

        var store = view.getStore(),
            rec = view.record;

            // exist = store.findRecord('jabatan_wakil_asisten', record.get('jabatan_id'));

        // if(exist){
            store.insert(0, {
                'jabatan_wakil_asisten': rec.get('jabatan_id'),
                'jabatan_wakil_asisten_jabatan_nama': record.get('jabatan_nama'),
                'jabatan_wakil_asisten_jabatan_kode': record.get('jabatan_kode'),
                'jabatan_wakil_asisten_jabatan_isaktif': record.get('jabatan_isaktif')
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
            me = $session.getProfile(),
            now = new Date(),
            view = $this.getMainview({from:button}),
            batas_hirarki = $app.LocalSetting().get('use_asistensi_batas_hirarki'),
            storeAnggota = view.getStore(),
            controllerLookup = $this.getController($this.controllerjabatanLookup);

        var config = {
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var rec = selections[i],
                        find = storeAnggota.findRecord('jabatan_wakil_asisten', rec.get('jabatan_id'));
                        
                    if(!find){
                        var count_before = storeAnggota.getCount();
                        if ((count_before + 1) > 100){
                            var msg = $this.getMessage('anggota_limit',{count: count_before});
                            $helper.showNotification(msg[0],msg[1]);
                        }else{
                            storeAnggota.add({
                                'jabatan_wakil_jabatan': me.jabatan_id,
                                'jabatan_wakil_asisten': rec.get('jabatan_id'),
                                'jabatan_wakil_asisten_jabatan_nama': rec.get('jabatan_nama'),
                                'jabatan_wakil_asisten_jabatan_kode': rec.get('jabatan_kode'),
                                'jabatan_wakil_asisten_jabatan_isaktif': rec.get('jabatan_isaktif')
                            });

                        }
                    }else{
                        var msg = $this.getMessage('receiver_exits',{name: rec.get('jabatan_nama')});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        }

        // for batas hirarki jabatan atur pimpinan & asisten
        if (batas_hirarki){
            config['url'] = $this.getApi('batas_hirarki', {mode:'asisten', jabatan:me.jabatan_id});
        } else {
            config['url'] = $this.getApi('jabatan_aktif');
        }

        controllerLookup.launch(config);
    }
});