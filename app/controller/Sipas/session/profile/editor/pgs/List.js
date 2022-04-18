Ext.define('SIPAS.controller.Sipas.session.profile.editor.pgs.List', {
    extend: 'SIPAS.controller.Sipas.base.Base',
    
    views: [
        'Sipas.session.profile.editor.pgs.List'
    ],

    stores: [
        'Sipas.staf.wakil.pgs.List',
        'Sipas.staf.wakil.asisten.Combo',
        'Sipas.staf.wakil.pgs.Combo'
    ],

    messages: {
        'receiver_exits': ['Info','Staf dengan NIP:{id} sudah masuk dalam daftar'],
        'not_allowed': ['Peringatan','Anda tidak bisa menambahkan diri anda sendiri sebagai pengganti sementara'],
        'staf_overload': 'Pengganti sementara tidak boleh lebih dari satu',
        'pgs_konfirm': 'Anda sudah konfirmasi pgs'
    },

    api: {
        'staf_aktif' : "server.php/sipas/staf/wakil",
        'check_isexist' : "server.php/sipas/staf/isexist_pgs?mode={mode}&jabatan={jabatan}",
        'konfirm' : "server.php/sipas/staf_wakil_pgs/konfirmasi"
    },

    refs:[
        { ref: 'mainview', selector: 'sipas_session_profile_editor_pgs_list' },
        { ref: 'fieldSearch', selector: 'sipas_session_profile_editor_pgs_list #fieldSearch' }
    ],

    controllerStafLookup : 'Sipas.staf.wakil.Lookup',
    modelStafWakil : 'Sipas.staf.Wakil',

    init: function(application) {
        this.control({
            'sipas_session_profile_editor_pgs_list': {
                selectionchange:    this.onMainview_SelectionChange,
                appendrecord:       this.onMainview_AppendRecord,
                removerecord:       this.onMainview_ActionRemoveRecord,
                konfirm:            this.onMainview_ActionKonfirm
            },
            'sipas_session_profile_editor_pgs_list #fieldSearch': {
                focus: this.onFieldSearch_Focus,
                select: this.onMainview_fieldSearch_Select
            },
            'sipas_session_profile_editor_pgs_list #buttonManual': {
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
            store = cmp.getStore();

        store.getProxy().url = $this.getApi('staf_aktif');
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
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            store = view.getStore(),
            $session = $app.getSession(),
            me = $session.getProfileId(),
            now = new Date(Ext.Date.format(new Date(), 'Y-m-d'));
            // exist = store.findRecord('staf_wakil_asisten', record.get('staf_id'));

        if(store.getCount() >= 1){
            $helper.showMsg({success:false, message:$this.getMessage('staf_overload')});
            return;
        }
        // if(exist){
            store.insert(0, {
                'staf_id': record.get('staf_id'),
                'staf_nama': record.get('staf_nama'),
                'staf_unit': record.get('staf_unit'),
                'unit_nama': record.get('unit_nama'),
                'staf_jabatan': record.get('staf_jabatan'),
                'jabatan_nama': record.get('jabatan_nama'),
                'staf_wakil_staf': me,
                'staf_wakil_asisten': record.get('staf_id'),
                'staf_wakil_asisten_nama': record.get('staf_nama'),
                'staf_wakil_asisten_unit': record.get('staf_unit'),
                'staf_wakil_asisten_unit_nama': record.get('unit_nama'),
                'staf_wakil_asisten_jabatan': record.get('staf_jabatan'),
                'staf_wakil_asisten_jabatan_nama': record.get('jabatan_nama'),
                'staf_wakil_tgl_mulai': now,
                'staf_wakil_tgl_selesai': now
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
            $feature = $this.getController('Sipas.sistem.featureable.Feature'),
            // batas_hirarki = $app.LocalSetting().get('use_asistensi_batas_hirarki'),
            view = $this.getMainview({from:button}),
            storeAnggota = view.getStore(),
            controllerLookup = $this.getController($this.controllerStafLookup),
            $session = $app.getSession(),
            me = $session.getProfileId(),
            $profile = $session.getProfile(),
            now = new Date(Ext.Date.format(new Date(), 'Y-m-d'));

        if(storeAnggota.getCount() >= 1){
            $helper.showMsg({success:false, message:$this.getMessage('staf_overload')});
            return;
        }

        var config = {
            multiselect: false,
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
                                'staf_id': rec.get('staf_id'),
                                'staf_nama': rec.get('staf_nama'),
                                'staf_unit': rec.get('staf_unit'),
                                'unit_nama': rec.get('unit_nama'),
                                'staf_jabatan': rec.get('staf_jabatan'),
                                'jabatan_nama': rec.get('jabatan_nama'),
                                'staf_wakil_staf': me,
                                'staf_wakil_asisten': rec.get('staf_id'),
                                'staf_wakil_asisten_nama': rec.get('staf_nama'),
                                'staf_wakil_asisten_unit': rec.get('staf_unit'),
                                'staf_wakil_asisten_unit_nama': rec.get('unit_nama'),
                                'staf_wakil_asisten_jabatan': rec.get('staf_jabatan'),
                                'staf_wakil_asisten_jabatan_nama': rec.get('jabatan_nama'),
                                'staf_wakil_tgl_mulai': now,
                                'staf_wakil_tgl_selesai': now

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
        // if (batas_hirarki){
        //     config['url'] = $this.getApi('batas_hirarki', {mode:'asisten', jabatan:$profile.jabatan_id});
        // } else {
            config['url'] = $this.getApi('staf_aktif');
        // }

        controllerLookup.launch(config);
    },

    onMainview_ActionKonfirm: function(view, rowIdx, colIdx, item, e, record, row){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper = $this.getApplication().Helper();
        
        if(record.get('staf_wakil_konfirmasi_asisten_status') == 2){
            $helper.showMsg({success:false, message:$this.getMessage('pgs_konfirm')});
            return;
        }else{
            view.setLoading(true);
            $helper.showConfirm({
                confirmTitle: 'Konfirmasi Pgs',
                confirmText : 'Apakah anda yakin ingin konfirmasi pgs ?',
                callback: function(button){
                    if(button == 'yes'){
                        Ext.Ajax.request({
                            url: $this.getApi('konfirm'),
                            params: {
                                'id' : record.getId()   
                            },
                            success: function(response, eOpts){
                                var res = Ext.decode(response.responseText),
                                    success = res.success;
                                view.setLoading(false);
                                if(!success){
                                    $helper.showMsg({success:false, message:'Gagal konfirmasi pgs'});
                                    return;
                                }
                                if(success){
                                    $helper.showMsg({success:true, message:'Berhasil konfirmasi pgs'});
                                    record.reload();
                                }
                            }
                        });
                    }else{
                        view.setLoading(false);
                    }
                }
            });
        }
    }
});