Ext.define('SIPAS.controller.Sipas.keluar.agenda.Prop', {
    extend: 'SIPAS.controller.Sipas.surat.agenda.Prop',

    views: [
        'Sipas.surat.agenda.Prop'
    ],

    stores: [
        'Sipas.surat.kontak.Combo',
        'Sipas.retensi.Combo',
        'Sipas.surat.penyetuju.List'
    ],

    api: {
        batasReupload   : 'server.php/sipas/surat/batasReupload',
        delete          : 'server.php/sipas/surat_keluar/destroy',
        batal           : 'server.php/sipas/surat/batalSurat',
        print_approval  : 'server.php/sipas/surat/printApproval?id={id}',
        musnah          : 'server.php/sipas/surat/musnahSurat',
        arsip           : 'server.php/sipas/surat/arsipSurat',
        next_nomor      : 'server.php/sipas/surat/next/nomor'
    },
    salin: null,
    modelDisposisi: 'Sipas.Disposisi',
    controllerDistribusi: 'Sipas.surat.penerima.tembusan.Popup',
    controllerPopupTembusan: 'Sipas.surat.tembusan.Popup',
    controllerPopupTembusanStack: 'Sipas.surat.tembusan.stack.Popup',

    _click: 0,

    init: function(application){
        this.control({
            // "sipas_surat_agenda_prop combobox[name=surat_tujuan][propType=keluar]" :{
            //     loadassociate: this.onComboTemplate_LoadAssociate
            // },
            "sipas_surat_agenda_prop [name=surat_tanggal][propType=keluar]":{
                change: this.onChange_Tgl
            },
            "sipas_surat_agenda_prop sipas_com_button_save[propType=keluar]": {
                click: this.onButtonSave_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_saveedit[propType=keluar]": {
                click: this.onButtonSaveEdit_Click
            },
            "sipas_surat_agenda_prop #buttonSaveSend[propType=keluar]": {
                click: this.onButtonSaveSend_Click
            },
            "sipas_surat_agenda_prop #simpanSetujui[propType=keluar]": {
                click: this.onButtonSimpanSetujui_Click
            },
            'sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane[propType=keluar]':{
                loadassociate: this.onKorespondensi_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_putin[propType=keluar]": {
                click: this.onPilihKorespondensi_Click
            },
            // "sipas_surat_agenda_prop combobox[name=surat_tujuan][propType=skeluar]" :{
            //     loadassociate: this.onComboTemplate_LoadAssociate
            // },
            "sipas_surat_agenda_prop [name=surat_tanggal][propType=skeluar]":{
                change: this.onChange_TglSession
            },
            "sipas_surat_agenda_prop sipas_com_button_save[propType=skeluar]": {
                click: this.onButtonSave_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_saveedit[propType=skeluar]": {
                click: this.onButtonSaveEdit_Click
            },
            "sipas_surat_agenda_prop #buttonSaveSend[propType=skeluar]": {
                click: this.onButtonSaveSend_Click
            },
            "sipas_surat_agenda_prop #simpanSetujui[propType=skeluar]": {
                click: this.onButtonSimpanSetujui_Click
            },
            'sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane[propType=skeluar]':{
                loadassociate: this.onKorespondensi_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_putin[propType=skeluar]": {
                click: this.onPilihKorespondensi_Click
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_close": {
                click: this.onButtonKorespondensiClear_Click
            },
            "sipas_surat_agenda_prop #perubahan[propType=keluar]": {
                click: this.onButtonEdit_Click
            },
            "sipas_surat_agenda_prop #perubahanBank[propType=keluar]": {
                click: this.onButtonEditBank_Click
            },
            'sipas_surat_agenda_prop sipas_arsip_pane[propType=keluar]':{
                loadassociate: this.onArsip_LoadAssociate
            },
            "sipas_surat_agenda_prop #ubah[propType=keluar]": {
                click: this.onButtonUbah_Click
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju[propType=keluar]": {
                click: this.onButtonPenyetuju_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_delete[propType=keluar]": {
                click: this.onButtonDelete_Click
            },
            "sipas_surat_agenda_prop #buttonDeletePermanen[propType=keluar]": {
                click: this.onButtonDeletePermanen_Click
            },
            "sipas_surat_agenda_prop sipas_surat_penyetuju_list[propType=keluar]":{
                loadassociate: this.onPenyetuju_LoadAssociate
            },
            'sipas_surat_agenda_prop sipas_surat_penerima_list[propType=keluar]':{
                loadassociate: this.onPenerima_LoadAssociate
            },
            "sipas_surat_agenda_prop #textPengirim[propType=keluar]":{
                loadassociate: this.onTextPengirim_LoadAssociate
            },
            // "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #riwayatPersetujuan[propType=keluar]": {
            //     click: this.onButtonRiwayat_Click
            // },
            'sipas_surat_agenda_prop sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=show_history]' : {
                click: this.onButtonRiwayat_Click
            },
            'sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=print_approval]' : {
                click: this.onButtonPrintApproval_Click
            },
            "sipas_surat_agenda_prop #perubahan[propType=skeluar]": {
                click: this.onButtonEditSession_Click
            },
            'sipas_surat_agenda_prop sipas_arsip_pane[propType=skeluar]':{
                loadassociate: this.onArsip_LoadAssociate
            },
            "sipas_surat_agenda_prop #ubah[propType=skeluar]": {
                click: this.onButtonUbah_Click
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju[propType=skeluar]": {
                click: this.onButtonPenyetuju_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_delete[propType=skeluar]": {
                click: this.onButtonDeleteSession_Click
            },
            "sipas_surat_agenda_prop sipas_surat_penyetuju_list[propType=skeluar]":{
                loadassociate: this.onPenyetuju_LoadAssociate
            },
            'sipas_surat_agenda_prop sipas_surat_penerima_list[propType=skeluar]':{
                loadassociate: this.onPenerima_LoadAssociate
            },
            "sipas_surat_agenda_prop #textPengirim[propType=skeluar]":{
                loadassociate: this.onTextPengirim_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #riwayatPersetujuan[propType=skeluar]": {
                click: this.onButtonRiwayat_Click
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_ekspedisi_keluar_pane #btnEkspedisiKeluar": {
                click: this.onButtonEkspedisiKeluar_Click
            },
            'sipas_surat_agenda_prop #kirimTembusan[propType=keluar]': {
                click: this.onButtonDistribusi_Click
            },
            'sipas_surat_agenda_prop #kirimTembusan[propType=skeluar]': {
                click: this.onButtonDistribusi_Click
            },
            "sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarTembusan": {
                click: this.onButtonPenerimaTembusan_Click
            },
            "sipas_surat_agenda_prop #batalNomor[propType=keluar]": {
                click: this.onButtonBatalNomor_Click
            },
            "sipas_surat_agenda_prop #batalNomor[propType=skeluar]": {
                click: this.onButtonBatalNomor_Click
            },
            'sipas_surat_agenda_prop form button#btnSalinNomor[propType=keluar]': {
                click: this.onButtonSalinNomor_Click
            },
            'sipas_surat_agenda_prop form button#btnSalinNomor[propType=skeluar]': {
                click: this.onButtonSalinNomor_Click
            },
            "sipas_surat_agenda_prop #buttonMusnah[propType=skeluar]": {
                click: this.onButtonMusnah_Click
            },
            "sipas_surat_agenda_prop #buttonMusnah[propType=keluar]": {
                click: this.onButtonMusnah_Click
            },
            "sipas_surat_agenda_prop #buttonArsip[propType=skeluar]": {
                click: this.onButtonArsip_Click
            },
            "sipas_surat_agenda_prop #buttonArsip[propType=keluar]": {
                click: this.onButtonArsip_Click
            }
            // "sipas_surat_agenda_prop container#containerAtributs #kelas_kode": {
            //     select: this.onComboKelas_Change
            // }
        });
    },

    // onComboKelas_Change: function(combo, selection, eOpts){
    //     var $this = this,
    //         view = $this.getMainview({from:combo});

    //     view.fireEvent('loadkode', view);
    // },

    // onComboTemplate_LoadAssociate: function(record, form, cmp){
    //     var associatedId = cmp.getValue(),
    //         associatedRecord = null,
    //         model =  Ext.ModelManager.getModel(cmp.getStore().model);

    //     if(associatedId){
    //         model.load(associatedId, {
    //             success: function(record, operation) {
    //                 cmp.setValue(record);
    //             }
    //         });
    //     }else{
    //     }
    // },

    onChange_Tgl: function(field, newValue, oldValue, eOpts){
        var $this   = this,
            $app    = $this.getApplication(),
            $helper     = $app.Helper(),
            $session     = $app.getSession(),
            view        = $this.getMainview({from:field}),
            cmpBackdatedInfo = $this.getCmpBackdatedInfo({root:view}),
            record      = view.record,
            surat_nomor = record && record.get('surat_nomor'),
            surat_tanggal    = new Date(Ext.Date.format(newValue, 'Y-m-d')),
            pembuatan_tanggal = new Date(Ext.Date.format(new Date(), 'Y-m-d')),
            nomor_backdate = $app.LocalSetting().get('use_nomor_backdate');

        /*check backdate*/
        if(!surat_nomor && (surat_tanggal < pembuatan_tanggal) && (view.mode != 'view' || view.mode != 'ubah' || view.mode != 'lihat')){
            if(!$session.getRuleAccess('keluar_backdate')){
                if(!view.backdate){
                    $helper.disableComponent({
                        parent: view,
                        items:{
                            '#buttonSaveSend' : false,
                            '#simpanSetujui' : false,
                            '#btnNomorSurat' : false,
                            '#btnSalinNomor' : false
                        }
                    });
                    $helper.hideComponent({
                        parent: view,
                        items:{
                            '#infobackDate' : true,
                            '[name=surat_keluar_backdated_info]' : false
                        }
                    });
                }else{
                    $helper.disableComponent({
                        parent: view,
                        items:{
                            '#buttonSaveSend' : true,
                            '#simpanSetujui' : true,
                            '#btnNomorSurat' : true,
                            '#btnSalinNomor' : true
                        }
                    });
                    $helper.hideComponent({
                        parent: view,
                        items:{
                            '#infobackDate' : false,
                            '[name=surat_keluar_backdated_info]' : false
                        }
                    });
                }
            }else{
                $helper.disableComponent({
                    parent: view,
                    items:{
                        '#buttonSaveSend' : false,
                        '#simpanSetujui' : false,
                        '#btnNomorSurat' : false,
                        '#btnSalinNomor' : false
                    }
                });
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#infobackDate' : true,
                        '[name=surat_keluar_backdated_info]' : false
                    }
                });
            }
            cmpBackdatedInfo.setValue('*Surat ini menggunakan tanggal backdate');
        }else{
            $helper.disableComponent({
                parent: view,
                items:{
                    '#buttonSaveSend' : false,
                    '#simpanSetujui' : false,
                    '#btnNomorSurat' : false,
                    '#btnSalinNomor' : false
                }
            });
            $helper.hideComponent({
                parent: view,
                items:{
                    '#infobackDate' : true,
                    '[name=surat_keluar_backdated_info]' : true
                }
            });
        }
    },

    onChange_TglSession: function(field, newValue, oldValue, eOpts){
        var $this   = this,
            $app    = $this.getApplication(),
            $helper     = $app.Helper(),
            $session     = $app.Session(),
            view        = $this.getMainview({from:field}),
            cmpBackdatedInfo = $this.getCmpBackdatedInfo({root:view}),
            record      = view.record,
            surat_tanggal    = new Date(newValue),
            pembuatan_tanggal = new Date(record.get('surat_properti_buat_tgl')) || new Date(Date.now()),
            // rules       = session.session.rules,
            nomor_backdate = $app.LocalSetting().get('use_nomor_backdate');
            pembuatan_tanggal.setHours(0,0,0,0);

        /*check backdate*/
        if(surat_tanggal < pembuatan_tanggal && view.mode != 'view'){
            if(!$session.getRuleAccess('keluar_session_eksternal_backdate')){
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#buttonSaveSend' : true,
                        '#simpanSetujui' : true,
                        '[name=surat_keluar_backdated_info]' : false
                    }
                });
            }else{
                $helper.hideComponent({
                    parent: view,
                    items:{
                        '#buttonSaveSend' : false,
                        '#simpanSetujui' : false,
                        '[name=surat_keluar_backdated_info]' : false
                    }
                });
            }
            cmpBackdatedInfo.setValue('*Surat ini menggunakan Backdate');
            if(nomor_backdate && record.get('surat_nomor') === null){
            }
        }else{
            $helper.hideComponent({
                parent: view,
                items:{
                    '#buttonSaveSend' : false,
                    '#simpanSetujui' : false,
                    '[name=surat_keluar_backdated_info]' : true
                }
            });
        }
    },

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'keluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            model: record.self.modelType().MODEL_KELUAR,
            record: record,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonEditBank_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'keluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            akses:'view_bank',
            model: record.self.modelType().MODEL_KELUAR,
            record: record,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonEditSession_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'skeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            model: record.self.modelType().MODEL_KELUAR,
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonUbah_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'keluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'ubah',
            model: record.self.modelType().MODEL_KELUAR,
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'keluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'destroy',
            model: record.self.modelType().MODEL_KELUAR,
            record: record,
            callback: function(success, record){
                if(success)view.close();
                // Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonBatalNomor_Click:function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            params = {
                'id': record.getId()
            };

        $helper.showConfirm({
            confirmTitle: 'Batal Nomor',
            confirmText : 'Apakah anda yakin membatalkan nomor surat ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('batal'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal batal nomor'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil batal nomor'});
                                view.close();
                                Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        });
    },

    onButtonDeletePermanen_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            params = {
                'permanen' : 1,
                'id': record.getId(),
                'properti': record.get('surat_properti'),
                'arsip': record.get('surat_arsip'),
                'korespon': record.get('surat_korespondensi_surat'),
                'kores': record.get('surat_korespondensi')
            };

        $helper.showConfirm({
            confirmTitle: 'Hapus Surat',
            confirmText : 'Apakah anda yakin hapus surat ini secara permanen ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('delete'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal hapus surat'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil hapus surat'});
                                view.close();
                                // Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        });
    },

    onButtonDeleteSession_Click: function(button, e, eOpts) {
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'skeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'destroy',
            model: record.self.modelType().MODEL_KELUAR,
            record: record,
            callback: function(success, record){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonSave_Click: function(button, e, eOpts, record) {
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $localStore = $app.getLocalStorage(),
            checkSession = $session.getResetSession(),
            $helper = $this.getApplication().Helper(),
            booking_nomor = $app.LocalSetting().get('use_booking_nomor'),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            storePenyetuju = $this.getStore($this.storePenyetuju),
            storePenerima = $this.getStore($this.storePenerima),
            stafId = $session.getProfileId(),
            params = {
                'salin' : $this.salin,
                'py[]' : [],
                'py_p[]' : [],
                'pn[]' : [],
                'pn_p[]' : [],
                // 'b[]' : [],
                'temp' : 1,
                'log' : 2
            };

        storePenyetuju.each(function(r){
            params['py[]'].push(r.get('staf_id'));
            if (r.get('surat_stack_profil')) {
                params['py_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['py_p[]'].push(r.get('staf_profil'));
            }
        });

        storePenerima.each(function(r){
            params['pn[]'].push(r.get('staf_id'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if (r.get('surat_stack_profil')) {
                params['pn_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['pn_p[]'].push(r.get('staf_profil'));
            }
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        if(params['pn[]'].length > 50){
            $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
            return;
        }

        $helper.showConfirm({
            confirmTitle: 'Simpan Surat',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    $localStore.remove('idSalin');
                    if(record.get('surat_setuju') !== 4){
                        record.set({
                            'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_INIT,
                            'surat_setuju_staf' : stafId,
                            'surat_setuju_tgl' : new Date()
                        });
                    }

                    if(! record) return;
                    $helper.saveRecord({
                        record: record,
                        form: form,
                        params: params,
                        wait: true,
                        message: true,
                        callback: function(success, record, eOpts, response){
                            view.close();
                            // Ext.callback(view.callback, view, [success, record, eOpts]);
                        }
                    });
                }
            }
        });
    },

    onButtonSaveEdit_Click: function(button, e, eOpts, record) {
        var $this =       this,
            $app =        $this.getApplication(),
            $helper =     $this.getApplication().Helper(),
            view =        $this.getMainview({from:button}),
            form =        $this.getForm({root:view}),
            record =      form && form.updateRecord().getRecord(),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            storePenyetuju = $this.getStore($this.storePenyetuju),
            storePenerima = $this.getStore($this.storePenerima),
            penyetuju_terakhir = [],
            params =      {
                'salin' : $this.salin,
                'upy[]' : [],
                'upy_p[]' : [],
                'upn[]' : [],
                'upn_p[]' : [],
                // 'b[]' : [],
                'log' : 10
            };

            storePenyetuju.each(function(r){
                params['upy[]'].push(r.get('staf_id'));
                penyetuju_terakhir.push(r.get('jabatan_isnomor'));
                if (r.get('surat_stack_profil')) {
                    params['upy_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['upy_p[]'].push(r.get('staf_profil'));
                }
            });

            storePenerima.each(function(r){
                params['upn[]'].push(r.get('staf_id'));
                // params['b[]'].push(r.get('surat_stack_isberkas'));
                if (r.get('surat_stack_profil')) {
                    params['upn_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['upn_p[]'].push(r.get('staf_profil'));
                }
            });

            /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
            if (useretensi && !retensi_tgl) {
                $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
                return;
            }    

            if(Ext.Array.contains(['ubah'], view.mode) && params['upn[]'].length > 50){
                $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                return;
            }

        if(! record) return;
        $helper.saveRecord({
            record: record,
            form: form,
            wait: true,
            message: true,
            confirm: true,
            confirmText: 'Apakah anda yakin ?',
            confirmTitle: 'Simpan Surat',
            params: params,
            callback: function(success, record, eOpts, response){
                view.close();
                // Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonSaveSend_Click: function(button, e, eOpts, record){
        var $this =       this,
            $app =        $this.getApplication(),
            $session =    $app.getSession(),
            $localStore = $app.getLocalStorage(),
            checkSession = $session.getResetSession(),
            $helper =     $this.getApplication().Helper(),
            view =        $this.getMainview({from:button}),
            form =        $this.getForm({root:view}),
            record =      form && form.updateRecord().getRecord(),
            storePenyetuju = $this.getStore($this.storePenyetuju),
            storePenerima = $this.getStore($this.storePenerima),
            stafId        = $session.getProfileId(),
            jenis_isbatas = record.get('jenis_isbatas'),
            batas_jumlah  = record.get('jenis_batas_jumlah'),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            btnAjukan = button,
            penyetuju_terakhir = [],
            params =      {
                'salin' : $this.salin,
                'py[]' : [],
                'py_p[]' : [],
                'pn[]' : [],
                'pn_p[]' : [],
                'booking' : 1,
                // 'b[]': [],
                'check' : 1,
                'temp' : 2,
                'log' : 3,
                'approve': 1
            };

        storePenyetuju.each(function(r){
            params['py[]'].push(r.get('staf_id'));
            penyetuju_terakhir.push(r.get('jabatan_isnomor'));
            if (r.get('surat_stack_profil')) {
                params['py_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['py_p[]'].push(r.get('staf_profil'));
            }
        });

        storePenerima.each(function(r){
            params['pn[]'].push(r.get('staf_id'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if (r.get('surat_stack_profil')) {
                params['pn_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['pn_p[]'].push(r.get('staf_profil'));
            }
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        /*validate approver on add mode*/
        if(Ext.Array.contains(['add','edit'], view.mode) && !params['py[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
            return;
        }else{
            hasil = penyetuju_terakhir.length;
            indeks = hasil-1;
            penyetujuTerakhir = storePenyetuju && storePenyetuju.getAt(indeks);
            if(penyetujuTerakhir.get('jabatan_isnomor') == 0){
                $helper.showMsg({success:false, message:$this.getMessage('invalid_jabatan')});
                return;
            }
        }
        if(Ext.Array.contains(['add','edit'], view.mode) && params['pn[]'].length > 50){
            $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
            return;
        }

        $this._click++;
        if($this._click <= 1){
            if (jenis_isbatas) {
                Ext.Ajax.request({
                    url: $this.getApi('batasReupload'),
                    params: {
                        'staf_id'       : stafId,
                        'jenis'         : record.get('surat_jenis'),
                        'unit'          : record.get('surat_unit'),
                        'model'         : record.get('surat_model')
                    },
                    success : function(response, eOpts){
                        var objres = Ext.decode(response.responseText, 1) || {};
                        if(objres.count_surat >= batas_jumlah){
                            $this._click = 0;
                            $helper.showMsg({success:false, message:'Anda belum re-upload berkas disurat sebelumnya dengan jenis <b>'+record.get('jenis_nama')});
                            return;
                        }else{
                            $helper.showConfirm({
                                confirmTitle: 'Kirim Surat',
                                confirmText : 'Apakah anda yakin ?',
                                callback: function(button){
                                    if(button == 'yes'){
                                        if(! record) return;
                                        if(!form.getForm().isValid()){
                                            $this._click = 0;
                                            btnAjukan.setDisabled(false);
                                        }else{
                                            if(record.get('surat_setuju') === 4){
                                                record.set({
                                                    'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_REVISION,
                                                    'surat_setuju_staf' : stafId,
                                                    'surat_setuju_tgl' : new Date()
                                                    /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                    'surat_distribusi_staf' : stafId, 
                                                    'surat_distribusi_tgl' : new Date() */
                                                });
                                            }else{
                                                record.set({
                                                    'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_PROCESS,
                                                    'surat_setuju_staf' : stafId,
                                                    'surat_setuju_tgl' : new Date()
                                                    /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                    'surat_distribusi_staf' : stafId, 
                                                    'surat_distribusi_tgl' : new Date() */
                                                });
                                            }
                                        }

                                        $helper.saveRecord({
                                            record: record,
                                            form: form,
                                            wait: true,
                                            message: true,
                                            params: params,
                                            callback: function(success, records, response){
                                                $localStore.remove('idSalin');
                                                var res = Ext.decode(response.responseText);
                                                    $this._click = 0;

                                                if (success){
                                                    btnAjukan.setDisabled(false);
                                                    $helper.showMsg({success: true, message: 'Berhasil Mengirim Surat'});
                                                    // Ext.callback(view.callback, view, [success, record, eOpts]);
                                                    view.close();
                                                } else {
                                                    btnAjukan.setDisabled(false);
                                                    if(record.get('surat_setuju') === 3){
                                                        record.set({
                                                            'surat_setuju' : 4,
                                                            'surat_setuju_staf' : stafId,
                                                            'surat_setuju_tgl' : new Date()
                                                            /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                            'surat_distribusi_staf' : stafId, 
                                                            'surat_distribusi_tgl' : new Date() */
                                                        });
                                                    }else{
                                                        record.set({
                                                            'surat_setuju' : 0,
                                                            'surat_setuju_staf' : null,
                                                            'surat_setuju_tgl' : null
                                                            /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                            'surat_distribusi_staf' : stafId, 
                                                            'surat_distribusi_tgl' : new Date() */
                                                        });
                                                    }
                                                    $helper.showMsg({success: false, message: (res.message || 'Gagal Menyimpan Surat')});
                                                }
                                            }
                                        });
                                    }else if (button == 'no'){
                                        $this._click = 0;
                                        btnAjukan.setDisabled(false);
                                    }else{
                                        /*when message box closed*/
                                        $this._click = 0;
                                        btnAjukan.setDisabled(false);
                                    }
                                }
                            });
                            btnAjukan.setDisabled(true);
                        }
                    }
                });
            }else{
                $helper.showConfirm({
                    confirmTitle: 'Kirim Surat',
                    confirmText : 'Apakah anda yakin ?',
                    callback: function(button){
                        if(button == 'yes'){
                            if(! record) return;
                            if(!form.getForm().isValid()){
                                $this._click = 0;
                                btnAjukan.setDisabled(false);
                            }else{
                                if(record.get('surat_setuju') === 4){
                                    record.set({
                                        'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_REVISION,
                                        'surat_setuju_staf' : stafId,
                                        'surat_setuju_tgl' : new Date()
                                        /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                        'surat_distribusi_staf' : stafId, 
                                        'surat_distribusi_tgl' : new Date() */
                                    });
                                }else{
                                    record.set({
                                        'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_PROCESS,
                                        'surat_setuju_staf' : stafId,
                                        'surat_setuju_tgl' : new Date()
                                        /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                        'surat_distribusi_staf' : stafId, 
                                        'surat_distribusi_tgl' : new Date() */
                                    });
                                }
                            }

                            $helper.saveRecord({
                                record: record,
                                form: form,
                                wait: true,
                                message: true,
                                params: params,
                                callback: function(success, records, response){
                                    $localStore.remove('idSalin');
                                    var res = Ext.decode(response.responseText);
                                        $this._click = 0;
                                    if (success){
                                        btnAjukan.setDisabled(false);
                                        $helper.showMsg({success: true, message: 'Berhasil Mengirim Surat'});
                                        // Ext.callback(view.callback, view, [success, record, eOpts]);
                                        view.close();
                                    } else {                                    
                                        btnAjukan.setDisabled(false);
                                        if(record.get('surat_setuju') === 3){
                                            record.set({
                                                'surat_setuju' : 4,
                                                'surat_setuju_staf' : stafId,
                                                'surat_setuju_tgl' : new Date()
                                                /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                'surat_distribusi_staf' : stafId, 
                                                'surat_distribusi_tgl' : new Date() */
                                            });
                                        }else{
                                            record.set({
                                                'surat_setuju' : 0,
                                                'surat_setuju_staf' : null,
                                                'surat_setuju_tgl' : null
                                                /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                'surat_distribusi_staf' : stafId, 
                                                'surat_distribusi_tgl' : new Date() */
                                            });
                                        }
                                        $helper.showMsg({success: false, message: (res.message || 'Gagal Menyimpan Surat')});
                                    }
                                }
                            });
                        }else if (button == 'no'){
                            $this._click = 0;
                            btnAjukan.setDisabled(false);
                        }else{
                            /*when message box closed*/
                            $this._click = 0;
                            btnAjukan.setDisabled(false);
                        }
                    }
                });
                btnAjukan.setDisabled(true);
            }
        }
    },

    onButtonSimpanSetujui_Click: function(button, e, eOpts, record){
        var $this       = this,
            $app        = $this.getApplication(),
            $session    = $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper     = $this.getApplication().Helper(),
            view        = $this.getMainview({from:button}),
            form        = $this.getForm({root:view}),
            record      = form && form.updateRecord().getRecord(),
            stafId      = $session.getProfileId(),
            profile      = $session.getProfile(),
            jenis_isbatas = record.get('jenis_isbatas'),
            batas_jumlah  = record.get('jenis_batas_jumlah'),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            storePenerima = $this.getStore($this.storePenerima),
            btnAjukan = button,
            params = {
                'salin' : $this.salin,
                'setujui' : 1,
                'pn[]' : [],
                'pn_p[]' : [],
                // 'b[]' : [],
                'check' : 1,
                'log' : 4
            };

        storePenerima.each(function(r){
            params['pn[]'].push(r.get('staf_id'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if (r.get('surat_stack_profil')) {
                params['pn_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['pn_p[]'].push(r.get('staf_profil'));
            }
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        /*validate receiver on add mode*/
        if(Ext.Array.contains(['add','edit'], view.mode)){
            penyetujuTerakhir = $session.getProfile().jabatan_isnomor;
            if(penyetujuTerakhir==null){
                $helper.showMsg({success:false, message:$this.getMessage('invalid_eselon')});
                return;
            }
        }

        $this._click++;
        if($this._click <= 1){
            if (jenis_isbatas) {
                Ext.Ajax.request({
                    url: $this.getApi('batasReupload'),
                    params: {
                        'staf_id'       : stafId,
                        'jenis'         : record.get('surat_jenis'),
                        'unit'          : record.get('surat_unit'),
                        'model'         : record.get('surat_model')
                    },
                    success : function(response, eOpts){
                        var objres = Ext.decode(response.responseText, 1) || {};
                        if(objres.count_surat >= batas_jumlah){
                            $this._click = 0;
                            $helper.showMsg({success:false, message:'Anda belum re-upload berkas disurat sebelumnya dengan jenis <b>'+record.get('jenis_nama')});
                            return;
                        }else{
                            $helper.showConfirm({
                                confirmTitle: 'Menyetujui Surat',
                                confirmText : 'Apakah anda yakin langsung menyetujui surat ?',
                                callback: function(button){
                                    if(button == 'yes'){
                                        if(! record) return;
                                        if(!form.getForm().isValid()){
                                            $this._click = 0;
                                            btnAjukan.setDisabled(false);
                                        }else{
                                            record.set({
                                                'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                                                'surat_setuju_staf' : stafId,
                                                'surat_setuju_staf' : profile.staf_profil,
                                                'surat_setuju_tgl' : new Date()
                                                /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                    'surat_distribusi_staf' : stafId, 
                                                    'surat_distribusi_tgl' : new Date() */
                                            });
                                        }

                                        $helper.saveRecord({
                                            record: record,
                                            form: form,
                                            wait: true,
                                            message: false,
                                            params: params,
                                            callback: function(success, record, eOpts, response){
                                                $this._click = 0;

                                                if(success){
                                                    btnAjukan.setDisabled(false);
                                                    $helper.showMsg({success: true, message: 'Berhasil Menyetujui Surat'});
                                                    // Ext.callback(view.callback, view, [success, record, eOpts]);
                                                    view.close();
                                                } else {
                                                    btnAjukan.setDisabled(false);
                                                    record.set({
                                                        'surat_setuju' : 0,
                                                        'surat_setuju_staf' : null,
                                                        'surat_setuju_profil' : null,
                                                        'surat_setuju_tgl' : null
                                                        /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                        'surat_distribusi_staf' : stafId, 
                                                        'surat_distribusi_tgl' : new Date() */
                                                    });
                                                    $helper.showMsg({success: false, message: 'Anda tidak bisa backdate pada tanggal ini'});
                                                    Ext.callback(view.callback, view, [success, record, eOpts]);
                                                }
                                            }
                                        });
                                    }else if (button == 'no'){
                                        $this._click = 0;
                                        btnAjukan.setDisabled(false);
                                    }else{
                                        /*when message box closed*/
                                        $this._click = 0;
                                        btnAjukan.setDisabled(false);
                                    }
                                }
                            });
                            btnAjukan.setDisabled(true);
                        }
                    }
                });
            }else{
                $helper.showConfirm({
                    confirmTitle: 'Menyetujui Surat',
                    confirmText : 'Apakah anda yakin langsung menyetujui surat ?',
                    callback: function(button){
                        if(button == 'yes'){
                            if(! record) return;
                            if(!form.getForm().isValid()){
                                $this._click = 0;
                                btnAjukan.setDisabled(false);
                            }else{
                                record.set({
                                    'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_APPROVE,
                                    'surat_setuju_staf' : stafId,
                                    'surat_setuju_tgl' : new Date()
                                    /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                        'surat_distribusi_staf' : stafId, 
                                        'surat_distribusi_tgl' : new Date() */
                                });
                            }
                                
                            $helper.saveRecord({
                                record: record,
                                form: form,
                                wait: true,
                                message: false,
                                params: params,
                                callback: function(success, record, eOpts, response){
                                    $this._click = 0;

                                    if(success){
                                        btnAjukan.setDisabled(false);
                                        $helper.showMsg({success: true, message: 'Berhasil Menyetujui Surat'});
                                        // Ext.callback(view.callback, view, [success, record, eOpts]);
                                        view.close();
                                    } else {
                                        btnAjukan.setDisabled(false);
                                        record.set({
                                                'surat_setuju' : 0,
                                                'surat_setuju_staf' : null,
                                                'surat_setuju_tgl' : null
                                                /*agenda keluar didistribusikan ketika dikirim lewat ekspedisi
                                                'surat_distribusi_staf' : stafId, 
                                                'surat_distribusi_tgl' : new Date() */
                                            });
                                        $helper.showMsg({success: false, message: 'Anda tidak bisa backdate pada tanggal ini'});
                                        Ext.callback(view.callback, view, [success, record, eOpts]);
                                    }
                                }
                            });
                        }else if (button == 'no'){
                            $this._click = 0;
                            btnAjukan.setDisabled(false);
                        }else{
                            /*when message box closed*/
                            $this._click = 0;
                            btnAjukan.setDisabled(false);
                        }
                    }
                });
                btnAjukan.setDisabled(true);
            }
        }
    },

    onPilihKorespondensi_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            controllerLookup = $this.getController($this.controllerLookupSuratMasuk);
        
        controllerLookup.launch({
            multiselect: false,
            afterload: function(records, success, store, viewInstance, grid){
               
            },
            callback: function(selection){
                $this.setKorespondensi(selection[0], $this.getMainview({from:button}));         
            }
        });
    },

    onButtonPenyetuju_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropPenyetuju),
            record = form && form.updateRecord().getRecord();

        controllerProp.launch({
            mode:'view',
            record: record,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        // view.close(); important do not remove
    },

    onButtonRiwayat_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropRiwayat),
            record = form && form.updateRecord().getRecord();

        if (record.get('surat_model') === 2){
            controllerProp.launch({
                mode:'view',
                record: record,
                callback: function(success, record, eOpts){
                    // if(success)view.close();
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        }
        // view.close(); important do not remove
    },

    onButtonPrintApproval_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            viewer = $this.getView($this.viewViewer),
            record = form.getRecord();

        
        if(record){
            if (record.get('surat_model') === 2){
                link = window.location.href+$this.getApi('print_approval', {id:record.getId()});
                var view = viewer.create({
                    modal: true,
                    height: 600,
                    width: 1024,
                    maximizable: true
                }).show().load(link);
                view.setTitle('Cetak Lembar Penyetujuan');
            }
        }
    },

    onButtonEkspedisiKeluar_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerPopup = $this.getController($this.controllerPopupEkspedisiKeluar),
            record = form && form.updateRecord().getRecord();

        controllerPopup.launch({
            mode:'view',
            record: record,
            callback: function(success, record, eOpts){
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonResendTembusan_Click: function(button, e, eOpts){
        var $this = this,
            controllerResendTembusan = $this.getController($this.controllerResendTembusan),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        controllerResendTembusan.launch({
            record: record,
            callback: function(success, record, eOpts){
            }
        });
    },

    onTextPengirim_LoadAssociate: function(record, form, cmp){
        var $this = this,
            $app = $this.getApplication(),
            $pengaturan = $app.LocalSetting(),
            lock = $pengaturan.get('use_unit_pengirim'),
            pengirim_default = $pengaturan.get('unit_pengirim');
        
        cmp.setLoading(true);

        if(lock == "1"){
            cmp.setLoading(false);
            cmp.setValue(pengirim_default);
            // cmp.setReadOnly(true);
        }else{
            cmp.setLoading(false);
            // cmp.setReadOnly(false);
            cmp.setValue(record.get('unit_nama'));
        }
    },

    onButtonPenerimaTembusan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPopupTembusan),
            controllerPropStack = $this.getController($this.controllerPopupTembusanStack),
            record = form && form.updateRecord().getRecord(),
            surat_setuju = record.get('surat_setuju');

        if(record.get('surat_model') == 2) {
            if (surat_setuju == '2'){
                controllerProp.launch({
                    mode:'view',
                    record: record,
                    callback: function(success, record, eOpts){
                        // if(success)view.close();
                        Ext.callback(view.callback, view, [success, record, eOpts]);
                    }
                });
                // view.close(); important do not remove
            } else {
                controllerPropStack.launch({
                    mode:'view',
                    record: record,
                    callback: function(success, record, eOpts){
                        // if(success)view.close();
                        Ext.callback(view.callback, view, [success, record, eOpts]);
                    }
                });
                // view.close(); important do not remove
            }
        }
    },

    onButtonSalinNomor_Click: function(button, e, eOpts){
        var $this       = this,
            $app        = $this.getApplication(),
            $helper     = $app.Helper(),
            $session    = $app.getSession(),
            $localStore = $app.getLocalStorage(),
            checkSession = $session.getResetSession(),
            stafId      = $session.getProfileId(),
            mainview    = $this.getMainview({from:button}),
            form        = $this.getForm({root:mainview}),
            add         = $this.getBtnAddPenyetuju({root:mainview}),
            del         = $this.getColumnDeletePenyetuju({root:mainview}),
            up          = $this.getColumnMoveUpPenyetuju({root:mainview}), 
            down        = $this.getColumnMoveDownPenyetuju({root:mainview}),
            record      = form && form.updateRecord().getRecord(),
            txtKetNomor = $this.getTxtKetNomor({root:mainview}),
            btnNomor    = $this.getBtnNomor({root:mainview}),
            cmpNomor    = $this.getCmpNomor({root:mainview}),
            jenis       = $this.getCmpJenis({root:mainview}),
            kelas       = $this.getCmpKelas({root:mainview}),
            tanggal     = $this.getCmpTanggal({root:mainview}),
            btnSalinNomor = $this.getBtnSalinNomor({root:mainview}),
            btnHirarkiKelas =  $this.getBtnHirarkiKelas({root:mainview}),
            controllerSalinNomor = $this.getController($this.controllerSalinNomor),
            // controllerNomor = $this.getController($this.controllerNomor),
            panePenyetuju  = mainview.down('#panePenyetuju'),
            panePenerima   = mainview.down('#panePenerima'),
            storePenyetuju = panePenyetuju && panePenyetuju.getStore(),
            storePenerima  = panePenerima && panePenerima.getStore(),
            jenis_isbatas  = record.get('jenis_isbatas'),
            batas_jumlah   = record.get('jenis_batas_jumlah'),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            penyetuju_terakhir = [],
            jabatan_ispenerima = [],
            params = {
                'py[]' : [],
                'py_p[]' : [],
                'pn[]' : [],
                'pn_p[]' : [],
                // 'b[]': [],
                'temp' : 1,
                'sdoc' : 1,
                'check' : 1,
                'pilih' : 1
            };

        if(mainview.mode == 'view'){
            controllerSalinNomor.launch({
                record : record,
                mode: 'ubah',
                callback: function(selection){
                    var records = selection[0];

                    $this.salin = records.get('surat_id');
                    $localStore.setValue('idSalin', $this.salin);
                    mainview.mode = 'edit';
                    if(records.get('surat_nomor')){
                        Ext.Ajax.request({
                            url: $this.getApi('next_nomor'),
                            params: params = {
                                'id': record.getId(),
                                'id_salin': records.getId(),
                                'model': records.getModelType(),
                                'salin_nomor': 1
                            },
                            success: function(response, options){
                                var objres = Ext.decode(response.responseText, true) || {};
                                // cmp && cmp.setValue(objres.next);
                                record.set({
                                    'surat_tanggal'             : records.get('surat_tanggal'),
                                    'surat_nomor_tgl'           : records.get('surat_nomor_tgl'),
                                    'surat_nomor_staf'          : records.get('surat_nomor_staf'),
                                    'surat_nomor_otomatis'      : records.get('surat_nomor_otomatis'),
                                    'surat_nomor_booking'       : records.get('surat_nomor_booking'),
                                    'surat_nomor_format'        : records.get('surat_nomor_format'),
                                    'surat_nomor_urut'          : records.get('surat_nomor_urut'),
                                    'surat_nomor_backdate'      : records.get('surat_nomor_backdate'),
                                    'surat_isbackdate'          : records.get('surat_isbackdate')
                                });
                                cmpNomor.setValue(objres.next);
                                tanggal.setValue(records.get('surat_tanggal'));
                                btnNomor.hide();
                                if(btnSalinNomor){
                                    btnSalinNomor.hide();
                                }
                                
                                btnHirarkiKelas && btnHirarkiKelas.hide();
                                txtKetNomor.hide();
                                add.hide();
                                del.hide();
                                up.hide();
                                down.hide();

                                jenis.setReadOnly(true);
                                kelas.setReadOnly(true);
                                tanggal.setReadOnly(true);
                            },
                            failure: function(response, options){}
                        });
                    }else{
                        cmpNomor.setValue('');
                        tanggal.setValue('');
                        btnNomor.show();
                        btnSalinNomor.show();
                        btnHirarkiKelas && btnHirarkiKelas.hide();
                        txtKetNomor.show();
                        add.show();
                        del.show();
                        up.show();
                        down.show();

                        jenis.setReadOnly(false);
                        kelas.setReadOnly(false);
                        tanggal.setReadOnly(false);
                    }

                    if(!records.get('surat_agenda')){
                        view.fireEvent('loadagenda', view);
                    }
                }
            });
        }else{
            storePenyetuju && storePenyetuju.each(function(r){
                params['py[]'].push(r.get('staf_id'));
                penyetuju_terakhir.push(r.get('jabatan_isnomor'));
                if (r.get('surat_stack_profil')) {
                    params['py_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['py_p[]'].push(r.get('staf_profil'));
                }
            });

            storePenerima && storePenerima.each(function(r){
                params['pn[]'].push(r.get('staf_id'));
                // params['b[]'].push(r.get('surat_stack_isberkas'));
                if (r.get('surat_stack_profil')) {
                    params['pn_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['pn_p[]'].push(r.get('staf_profil'));
                }
                if(!r.get('jabatan_ispenerima')) jabatan_ispenerima.push(r.get('jabatan_ispenerima'));   
            });

            /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
            if (useretensi && !retensi_tgl) {
                $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
                return;
            }    

            if(!params['py[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
                return;
            }else{
                hasil = penyetuju_terakhir.length;
                indeks = hasil-1;
                penyetujuTerakhir = storePenyetuju && storePenyetuju.getAt(indeks);
                if(penyetujuTerakhir.get('jabatan_isnomor')==0){
                    $helper.showMsg({success:false, message:$this.getMessage('invalid_jabatan')});
                    return;
                }
            }

            if (jenis_isbatas) {
                Ext.Ajax.request({
                    url: $this.getApi('batasReupload'),
                    params: {
                        'staf_id'       : stafId,
                        'jenis'         : record.get('surat_jenis'),
                        'unit'          : record.get('surat_unit'),
                        'model'         : record.get('surat_model')
                    },

                    success : function(response, eOpts){
                        var objres = Ext.decode(response.responseText, 1) || {};
                        if(objres.count_surat >= batas_jumlah){
                            $helper.showMsg({success:false, message:'Anda belum re-upload berkas disurat sebelumnya dengan jenis <b>'+record.get('jenis_nama')});
                            return;
                        }else{
                            $helper.saveRecord({
                                form: form,
                                record: record,
                                params: params,
                                message: false,
                                wait: true,
                                callback: function(success, records, eOpts, response){
                                    if (success){
                                        controllerSalinNomor.launch({
                                            record : records,
                                            mode: 'ubah',
                                            callback: function(selection){
                                                var records = selection[0];

                                                $this.salin = records.get('surat_id');
                                                $localStore.setValue('idSalin', $this.salin);
                                                mainview.mode = 'edit';
                                                // form.loadRecord(records);
                                                // records.reload();
                                                if(records.get('surat_nomor')){
                                                    Ext.Ajax.request({
                                                        url: $this.getApi('next_nomor'),
                                                        params: params = {
                                                            'id': record.getId(),
                                                            'id_salin': records.getId(),
                                                            'model': records.getModelType(),
                                                            'salin_nomor': 1
                                                        },
                                                        success: function(response, options){
                                                            var objres = Ext.decode(response.responseText, true) || {};
                                                            // cmp && cmp.setValue(objres.next);
                                                            record.set({
                                                                'surat_tanggal'             : records.get('surat_tanggal'),
                                                                'surat_nomor_tgl'           : records.get('surat_nomor_tgl'),
                                                                'surat_nomor_staf'          : records.get('surat_nomor_staf'),
                                                                'surat_nomor_otomatis'      : records.get('surat_nomor_otomatis'),
                                                                'surat_nomor_booking'       : records.get('surat_nomor_booking'),
                                                                'surat_nomor_format'        : records.get('surat_nomor_format'),
                                                                'surat_nomor_urut'          : records.get('surat_nomor_urut'),
                                                                'surat_nomor_backdate'      : records.get('surat_nomor_backdate'),
                                                                'surat_isbackdate'          : records.get('surat_isbackdate')
                                                            });
                                                            cmpNomor.setValue(objres.next);
                                                            tanggal.setValue(records.get('surat_tanggal'));
                                                            btnNomor.hide();
                                                            if(btnSalinNomor){
                                                                btnSalinNomor.hide();
                                                            }
                                                            
                                                            btnHirarkiKelas && btnHirarkiKelas.hide();
                                                            txtKetNomor.hide();
                                                            add.hide();
                                                            del.hide();
                                                            up.hide();
                                                            down.hide();

                                                            jenis.setReadOnly(true);
                                                            kelas.setReadOnly(true);
                                                            tanggal.setReadOnly(true);
                                                        },
                                                        failure: function(response, options){}
                                                    });
                                                    
                                                }else{
                                                    cmpNomor.setValue('');
                                                    tanggal.setValue('');
                                                    btnNomor.show();
                                                    btnSalinNomor.show();
                                                    btnHirarkiKelas && btnHirarkiKelas.hide();
                                                    txtKetNomor.show();
                                                    add.show();
                                                    del.show();
                                                    up.show();
                                                    down.show();

                                                    jenis.setReadOnly(false);
                                                    kelas.setReadOnly(false);
                                                    tanggal.setReadOnly(false);
                                                }

                                                if(!records.get('surat_agenda')){
                                                    view.fireEvent('loadagenda', view);
                                                }
                                            }
                                        });
                                    } else {
                                        $helper.showMsg({success: false, message: ('Anda tidak bisa backdate pada tanggal ini')});
                                    }
                                }
                            });
                        }
                    }
                });
            }else{
                $helper.saveRecord({
                    form: form,
                    record: record,
                    params: params,
                    message: false,
                    wait: true,
                    callback: function(success, records, eOpts, response){
                        if (success){
                            controllerSalinNomor.launch({
                                record : records,
                                mode: 'ubah',
                                callback: function(selection){
                                    var records = selection[0];

                                    $this.salin = records.get('surat_id');
                                    $localStore.setValue('idSalin', $this.salin);
                                    mainview.mode = 'edit';
                                    // form.loadRecord(records);
                                    // records.reload();
                                    if(records.get('surat_nomor')){
                                        Ext.Ajax.request({
                                            url: $this.getApi('next_nomor'),
                                            params: params = {
                                                'id': record.getId(),
                                                'id_salin': records.getId(),
                                                'model': records.getModelType(),
                                                'salin_nomor': 1
                                            },
                                            success: function(response, options){
                                                var objres = Ext.decode(response.responseText, true) || {};
                                                record.set({
                                                    'surat_tanggal'             : records.get('surat_tanggal'),
                                                    'surat_nomor_tgl'           : records.get('surat_nomor_tgl'),
                                                    'surat_nomor_staf'          : records.get('surat_nomor_staf'),
                                                    'surat_nomor_otomatis'      : records.get('surat_nomor_otomatis'),
                                                    'surat_nomor_booking'       : records.get('surat_nomor_booking'),
                                                    'surat_nomor_format'        : records.get('surat_nomor_format'),
                                                    'surat_nomor_urut'          : records.get('surat_nomor_urut'),
                                                    'surat_nomor_backdate'      : records.get('surat_nomor_backdate'),
                                                    'surat_isbackdate'          : records.get('surat_isbackdate')
                                                });
                                                cmpNomor.setValue(objres.next);
                                                tanggal.setValue(records.get('surat_tanggal'));
                                                btnNomor.hide();
                                                if(btnSalinNomor){
                                                    btnSalinNomor.hide();
                                                }
                                                
                                                btnHirarkiKelas && btnHirarkiKelas.hide();
                                                txtKetNomor.hide();
                                                add.hide();
                                                del.hide();
                                                up.hide();
                                                down.hide();

                                                jenis.setReadOnly(true);
                                                kelas.setReadOnly(true);
                                                tanggal.setReadOnly(true);
                                            },
                                            failure: function(response, options){}
                                        });
                                    }else{
                                        cmpNomor.setValue('');
                                        tanggal.setValue('');
                                        btnNomor.show();
                                        btnSalinNomor.show();
                                        btnHirarkiKelas && btnHirarkiKelas.hide();
                                        txtKetNomor.show();
                                        add.show();
                                        del.show();
                                        up.show();
                                        down.show();

                                        jenis.setReadOnly(false);
                                        kelas.setReadOnly(false);
                                        tanggal.setReadOnly(false);
                                    }

                                    if(!records.get('surat_agenda')){
                                        view.fireEvent('loadagenda', view);
                                    }
                                }
                            });
                        } else {
                            $helper.showMsg({success: false, message: ('Anda tidak bisa backdate pada tanggal ini')});
                        }
                    }
                });
            }
        }
    },

    onButtonMusnah_Click:function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            params = {
                'id': record.getId()
            };

            $helper.showConfirm({
            confirmTitle: 'Musnahkan Surat',
            confirmText : 'Apakah anda yakin ingin memusnahkan surat ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('musnah'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal musnah surat'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil musnah surat'});
                                // form.loadRecord(record);
                                view.close();
                                Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        });
    },

    onButtonArsip_Click:function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            params = {
                'id': record.getId()
            };

            $helper.showConfirm({
            confirmTitle: 'Arsipkan Surat',
            confirmText : 'Apakah anda yakin ingin mengarsipkan surat ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
                        url: $this.getApi('arsip'),
                        params: params,
                        success: function(response, eOpts){
                            var res = Ext.decode(response.responseText),
                                success = res.success;
                            view.setLoading(false);
                            if(!success){
                                $helper.showMsg({success:false, message:'Gagal mengarsipkan surat'});
                                return;
                            }
                            if(success){
                                $helper.showMsg({success:true, message:'Berhasil mengarsipkan surat'});
                                view.close();
                                Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        });
    }
});