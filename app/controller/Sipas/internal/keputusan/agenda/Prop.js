Ext.define('SIPAS.controller.Sipas.internal.keputusan.agenda.Prop', {
	extend: 'SIPAS.controller.Sipas.surat.agenda.Prop',

	controllers: [
		'Sipas.internal.keputusan.agenda.prop.TemplateComponent'
	],

	views: [
		'Sipas.surat.agenda.Prop'
	],

	stores: [
		'Sipas.surat.scope.Combo',
		'Sipas.unit.Combo',
		'Sipas.surat.penyetuju.List',
		'Sipas.surat.petikan.List',
        'Sipas.surat.tembusan.List'
	],

    api: {
        batasReupload   : 'server.php/sipas/surat/batasReupload',
        delete          : 'server.php/sipas/surat_keputusan/destroy',
        print_approval  : 'server.php/sipas/surat/printApproval?id={id}',
        batal           : 'server.php/sipas/surat/batalSurat',
        musnah          : 'server.php/sipas/surat/musnahSurat',
        arsip           : 'server.php/sipas/surat/arsipSurat',
        next_nomor      : 'server.php/sipas/surat/next/nomor',
        reset_penerimask : 'server.php/sipas/surat_penerimask/reset_penerimask?id={id}'
    },

    salin: null,
	storePenerima: 'Sipas.surat.penerima.List',
	storePenyetuju: 'Sipas.surat.penyetuju.List',
	storePetikan: 'Sipas.surat.petikan.List',
	storeTembusan: 'Sipas.surat.tembusan.List',
    
    controllerPropPetikan : 'Sipas.surat.petikan.Prop',
    controllerProperty: 'Sipas.internal.keputusan.agenda.Prop',
    controllerAtribut: 'Sipas.surat.atribut.Pane',
    controllerSetting: 'Sipas.sistem.setting.Pane',
    controllerResend: 'Sipas.surat.penerima.Popup',
    controllerResendJabatan: 'Sipas.surat.penerima.jabatan.Popup',
    controllerPenerimaskPopup: 'Sipas.surat.penerima.keputusan.Popup',

    _click: 0,
	
	init: function(application){
		this.control({
            'sipas_surat_agenda_prop': {
                beforeclose: this.onMainview_BeforeClose
            },
			'sipas_surat_agenda_prop sipas_com_button_save[propType=keputusan]': {
				click : this.onButtonSave_Click
			},
            "sipas_surat_agenda_prop [name=surat_tanggal][propType=keputusan]":{
                change: this.onChange_Tgl
            },
			'sipas_surat_agenda_prop #perubahan[propType=keputusan]': {
                click: this.onButtonEdit_Click
            },
            'sipas_surat_agenda_prop #perubahanBank[propType=keputusan]': {
                click: this.onButtonEditBank_Click
            },
            'sipas_surat_agenda_prop #buttonResendKeputusan': {
                click: this.onButtonResend_Click
            },
            'sipas_surat_agenda_prop #ubah[propType=keputusan]': {
                click: this.onButtonUbah_Click
            },
			'sipas_surat_agenda_prop sipas_com_button_savesend[propType=keputusan]': {
				click : this.onButtonSaveSend_Click
			},
			'sipas_surat_agenda_prop sipas_com_button_savedistribute[propType=keputusan]': {
				click : this.onButtonSaveSend_Click
			},
			'sipas_surat_agenda_prop combobox[name=surat_itipe]': {
				select : this.onComboTipe_Select
			},
            'sipas_surat_agenda_prop sipas_arsip_pane[propType=keputusan]':{
                loadassociate: this.onArsip_LoadAssociate
            },
			'sipas_surat_agenda_prop combobox[name=surat_unit]': {
				select : this.onComboDepPengirim_Select
			},
			"sipas_surat_agenda_prop #buttonDelete[propType=keputusan]": {
                click: this.onButtonDelete_Click
            },
            "sipas_surat_agenda_prop #buttonDeletePermanen[propType=keputusan]": {
                click: this.onButtonDeletePermanen_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_saveedit[propType=keputusan]": {
                click: this.onButtonSaveEdit_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_disposisi[propType=keputusan]": {
                click: this.onButtonDistribusikan_Click
            },
			'sipas_surat_agenda_prop sipas_surat_penerima_list[propType=keputusan]':{
				loadassociate: this.onPenerima_LoadAssociate
			},
			'sipas_surat_agenda_prop sipas_surat_penyetuju_list[propType=keputusan]':{
				loadassociate: this.onPenyetuju_LoadAssociate
			},
			'sipas_surat_agenda_prop sipas_surat_petikan_list[propType=keputusan]':{
				loadassociate: this.onPetikan_LoadAssociate
			},
			'sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane[propType=keputusan]':{
                loadassociate: this.onKorespondensi_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_putin[propType=keputusan]": {
                click: this.onPilihKorespondensi_Click
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_close": {
                click: this.onButtonKorespondensiClear_Click
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju[propType=keputusan]": {
                click: this.onButtonPenyetuju_Click
            },
            "sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarPetikan": {
                click: this.onButtonPetikan_Click
            },
            "sipas_surat_agenda_prop #tanggal[propType=keputusan]":{
                loadassociate: this.onTglSurat_LoadAssociate
            },
            "sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarPenerima": {
                click: this.onButtonPenerima_Click
            },
            'sipas_surat_agenda_prop sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=show_history]' : {
                click: this.onButtonRiwayatPenyetuju_Click
            },
            'sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=print_approval]' : {
                click: this.onButtonPrintApproval_Click
            },
            "sipas_surat_agenda_prop #batalNomor[propType=keputusan]": {
                click: this.onButtonBatalNomor_Click
            },
            'sipas_surat_agenda_prop form button#btnSalinNomor[propType=keputusan]': {
                click: this.onButtonSalinNomor_Click
            },
            "sipas_surat_agenda_prop #buttonMusnah[propType=keputusan]": {
                click: this.onButtonMusnah_Click
            },
            "sipas_surat_agenda_prop #buttonArsip[propType=keputusan]": {
                click: this.onButtonArsip_Click
            },
            "sipas_surat_agenda_prop #paneTembusansk[propType=keputusan]": {
                loadassociate: this.onTembusansk_LoadAssociate
            },
            "sipas_surat_agenda_prop #buttonListPenerimask[propType=keputusan]": {
                click: this.onButtonPenerimaskList_Click
            },
            'sipas_surat_agenda_prop combobox[name=surat_jenis_sub]': {
                beforeselect: this.onComboJenisSub_BeforeSelect,
                loadassociate: this.onComboJenisSub_LoadAssociate
            },
            "sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarTembusan": {
                click: this.onButtonPenerimaTembusan_Click
            },
		})
	},

    onMainview_BeforeClose: function(mainview, eOpts)
    {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            storeArsip = mainview.down('dataview').getStore(),
            record = mainview.record;

        if(record.get('surat_model_sub') == 2 && storeArsip.data.length > 0 && mainview.penerimask_changed) {
        	mainview.penerimask_changed = false;
        	$helper.showMsg({title:'Info', message:$this.getMessage('alert_penerimask_changed')});
        	return false;
        }
    },

	onComboDepPengirim_Select: function(combo, records, eOpts){
		var $this = this,
			scope = combo.getValue(),
			mainview = $this.getMainview({from:combo}),
			cmpTipe  = $this.getCmpTipe({root:mainview}),
			tipe = cmpTipe.getValue();

		if(!mainview) return;

		mainview.fireEvent('loadnomor', mainview, tipe, scope);
		mainview.fireEvent('loadagenda', mainview, tipe, scope);
	},

    onChange_Tgl: function(field, newValue, oldValue, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.Session(),
            view = $this.getMainview({from:field}),
            cmpBackdatedInfo = $this.getCmpBackdatedInfo({root:view}),
            record = view.record,
            surat_nomor = record && record.get('surat_nomor'),
            surat_tanggal = new Date(Ext.Date.format(newValue, 'Y-m-d')),
            pembuatan_tanggal = new Date(Ext.Date.format(new Date(), 'Y-m-d'));

        /*check backdate*/
        if(!surat_nomor && (surat_tanggal < pembuatan_tanggal) && (view.mode != 'view' || view.mode != 'ubah' || view.mode != 'lihat')){
            if(!$session.getRuleAccess('surat_internal_keputusan_backdate')){
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

	onComboTipe_Select: function(combo, records, eOpts){
		var tipe = combo.getValue(),
			$this = this,
			mainview = $this.getMainview({from:combo});

		if(!mainview) return;
		mainview.fireEvent('loadagenda', mainview, tipe);
		mainview.fireEvent('loadnomor', mainview, tipe);
	},

    onButtonResend_Click: function(button, e, eOpts){
        var $this = this,
            controllerResend = $this.getController($this.controllerResend),
            controllerResendJabatan = $this.getController($this.controllerResendJabatan),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            model_sub = record.get('surat_model_sub');

        if(model_sub == 2) {
            controllerResend.launch({
                record: record,
                tipe: 'kolektif',
                callback: function(success, record, eOpts){
                    view.close();
                }
            });
        } else {
            controllerResendJabatan.launch({
                record: record,
                tipe: 'kolektif',
                callback: function(success, record, eOpts){
                    view.close();
                }
            });
        }
    },

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'keputusan',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            model: record.self.modelType().MODEL_KEPUTUSAN,
            model_sub: record.get('surat_model_sub'),
            record: record,
            callback: function(success, record, eOpts){                
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
            propType: 'keputusan',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            akses:'view_bank',
            model: record.self.modelType().MODEL_KEPUTUSAN,
            model_sub: record.get('surat_model_sub'),
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonUbah_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'keputusan',
            unit: view.unit,
            tipe: view.tipe,
            mode:'ubah',
            model: record.self.modelType().MODEL_KEPUTUSAN,
            model_sub: record.get('surat_model_sub'),
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
            propType: 'keputusan',
            unit: view.unit,
            tipe: view.tipe,
            mode:'destroy',
            model: record.self.modelType().MODEL_KEPUTUSAN,
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
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
                            }
                        }
                    });
                }
            }
        });
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $localStore = $app.getLocalStorage(),
            $session = $app.getSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            storePenyetuju = $this.getStore($this.storePenyetuju),
            storePetikan = $this.getStore($this.storePetikan),
            storePenerima = $this.getStore($this.storePenerima),
            storeArsip = view.down('dataview').getStore(),
            penerima = record.fetchPenerimask(),
            isaccepted = false,
            params = {
                'salin' : $this.salin,
                'py[]' : [],
                'py_p[]' : [],
                'pt[]' : [],
                'pt_p[]' : [],
                'pn[]': [],
                'pn_p[]': [],
                'tsk[]': [],
                'tsk_p[]': [],
                'temp' : 1,
                'log' : 2
            };

        if(record.get('surat_model_sub') == 1 && record.get('surat_setuju') == 2 && !record.get('surat_distribusi_tgl')) {
            params['log'] = 29;
            isaccepted = true;
        } else if(record.get('surat_model_sub') == 2 && record.get('surat_petikan_setuju') == 2 && !record.get('surat_distribusi_tgl')) {
            params['log'] = 29;
            isaccepted = true;
        }

        if(isaccepted) {
        	/*validate receiver on add or edit mode*/
			if(Ext.Array.contains(['add','edit'], view.mode) && (record.get('surat_penerimask_total')  < 1)){
				$helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
				return;
			}
        }

        storePenyetuju.each(function(r){
            params['py[]'].push(r.get('staf_id'));
            if (r.get('surat_stack_profil')) {
                params['py_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['py_p[]'].push(r.get('staf_profil'));
            }
        });

        storePenerima.each(function(r){
            params['tsk[]'].push(r.get('staf_id'));
            if(r.get('surat_stack_profil')) {
                params['tsk_p[]'].push(r.get('surat_stack_profil'));
            } else {
                params['tsk_p[]'].push(r.get('staf_profil'));
            }
        });

        if(record.get('surat_model_sub') == 2) {
            storePetikan.each(function(r){
                params['pt[]'].push(r.get('staf_id'));
                if (r.get('surat_stack_profil')) {
                    params['pt_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['pt_p[]'].push(r.get('staf_profil'));
                }
            });

            if(storeArsip.data.length > 0 && view.penerimask_changed) {
                view.penerimask_changed = false;
                $helper.showMsg({title:'Info', message:$this.getMessage('alert_penerimask_changed')});
                return;
            }
        }

        // penerima.each(function(r){
        //     params['pn[]'].push(r.get('staf_id'));
        //     if (r.get('surat_penerimask_profil')) {
        //         params['pn_p[]'].push(r.get('surat_penerimask_profil'));
        //     }else{
        //         params['pn_p[]'].push(r.get('staf_profil'));
        //     }
        // });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }

        penerima.load({
            callback: function(){
                penerima.each(function(r){
                    params['pn[]'].push(r.get('staf_id'));
                    if (r.get('surat_penerimask_profil')) {
                        params['pn_p[]'].push(r.get('surat_penerimask_profil'));
                    }else{
                        params['pn_p[]'].push(r.get('staf_profil'));
                    }
                });

                if(!record) return;
                $helper.saveRecord({
                    record: record,
                    form: form,
                    params: params,
                    wait: true,
                    message: true,
                    confirm: true,
                    confirmText: 'Apakah anda yakin ?',
                    confirmTitle: 'Simpan Surat',
                    callback: function(success, record, eOpts, response){
                        $localStore.remove('idSalin');
                        view.close();
                    }
                });
            }
        });

    },

	onButtonSaveEdit_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            petikan_terakhir = [],            
            storePenyetuju = $this.getStore($this.storePenyetuju),
            storePetikan = $this.getStore($this.storePetikan),
            storePenerima = $this.getStore($this.storePenerima),
            storeArsip = view.down('dataview').getStore(),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            dokumen_petikan = [],
            penerima = record.fetchPenerimask(),
            params		= {
                'upy[]' : [], //penyetuju
                'upy_p[]' : [], //penyetuju_profil
                'upt[]' : [], //petikan
                'upt_p[]' : [], //petikan_profil
                'upn[]' : [], //penerima
                'upn_p[]' : [], //perima_profil
                'utsk[]': [], //tembusansk
                'utsk_p[]': [], //tembusansk_profil
                'salin' : $this.salin,
                'log' : 10
            };

        storePenyetuju.each(function(r){
            params['upy[]'].push(r.get('staf_id'));
            if (r.get('surat_stack_profil')) {
                params['upy_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['upy_p[]'].push(r.get('staf_profil'));
            }
        });

        storePenerima.each(function(r){
            params['utsk[]'].push(r.get('staf_id'));
            if(r.get('surat_stack_profil')) {
                params['utsk_p[]'].push(r.get('surat_stack_profil'));
            } else {
                params['utsk_p[]'].push(r.get('staf_profil'));
            }
        });

        penerima.each(function(r){
            params['upn[]'].push(r.get('staf_id'));
            if (r.get('surat_penerimask_profil')) {
                params['upn_p[]'].push(r.get('surat_penerimask_profil'));
            }else{
                params['upn_p[]'].push(r.get('staf_profil'));
            }
        });

        storeArsip.each(function(r){
            if(r.get('dokumen_ispetikan') == 1){
                dokumen_petikan.push(r.get('dokumen_id'));
            }
        });

        if(storeArsip.data.length < 1){
            $helper.showMsg({success:false, message:'Anda belum menambahkan berkas'});
            return; 
        }else if(dokumen_petikan.length < 1){
            if (record.get('surat_model_sub') == 2) {
                $helper.showMsg({success:false, message:$this.getMessage('invalid_berkas_petikan')});
            } else {
                $helper.showMsg({success:false, message:$this.getMessage('invalid_berkas_skperorangan')});
            }
            return;
        }

        /*validate approver on add mode*/
        if(Ext.Array.contains(['add','edit','ubah'], view.mode) && !params['upy[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
            return;
        }

        /*validate approver on add mode*/
        if(record.get('surat_model_sub') == 2) {
            storePetikan.each(function(r){
                params['upt[]'].push(r.get('staf_id'));
                petikan_terakhir.push(r.get('jabatan_isnomor'));
                if (r.get('surat_stack_profil')) {
                    params['upt_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['upt_p[]'].push(r.get('staf_profil'));
                }
            });

            if(Ext.Array.contains(['add','edit','ubah'], view.mode) && !params['upt[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('petikan_empty')});
                return;
            }else{
                hasil = petikan_terakhir.length;
                indeks = hasil-1;
                petikanTerakhir = storePetikan && storePetikan.getAt(indeks);
                if(petikanTerakhir.get('jabatan_isnomor')==0){
                    $helper.showMsg({success:false, message:$this.getMessage('invalid_jabatan')});
                    return;
                }
            }
        }

        /*validate receiver on add or edit mode*/
        if(Ext.Array.contains(['add','edit', 'ubah'], view.mode) && record.get('surat_penerimask_total')  < 1){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
            return;
        }

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        if(!record) return;
        $helper.saveRecord({
            record: record,
            form: form,
            params: params,
            wait: true,
            message: true,
            confirm: true,
            confirmText: 'Apakah anda yakin ?',
            confirmTitle: 'Simpan Surat',
            callback: function(success, record, eOpts, response){
                view.close();
            }
        });
    },

    onButtonDistribusikan_Click: function(button, e, eOpts){
        var $this = this,
			$helper = $this.getApplication().Helper(),
			checkSession = this.getApplication().getSession().getResetSession(),
			mainview = $this.getMainview({from:button}),
			form = $this.getForm({root:mainview}),
			record = form && form.updateRecord().getRecord(),
            storeArsip = mainview.down('dataview').getStore(),
			params = {
                'surat': null
			};

        if(storeArsip.data.length > 0 && mainview.penerimask_changed) {
            mainview.penerimask_changed = false;
            $helper.showMsg({title:'Info', message:$this.getMessage('alert_penerimask_changed')});
            return;
        }

        mainview.setLoading(true);
		params['surat'] = record.getId();

        $helper.showConfirm({
            confirmTitle: 'Konfirmasi Distribusi Surat',
            confirmText : 'Apakah anda yakin mendistribusikan surat ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
			            url: 'server.php/sipas/surat_keputusan/distribute',
			            params: params,
			            success: function(response, options){
			                var objres = Ext.decode(response.responseText, true) || {},
			                	message = 'Berhasil mendistribusikan surat';

							$helper.showMsg({success:true, message:message});
							mainview.setLoading(false);
							mainview.close();
							
							Ext.callback(mainview.callback, mainview, [message, record, eOpts]);
			            }
			        });
                } else {
                	mainview.setLoading(false);
                }
            }
        });
    },

    onButtonSaveSend_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $localStore = $app.getLocalStorage(),
            $session = $app.getSession(),
            $helper = $app.Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            storePenyetuju = $this.getStore($this.storePenyetuju),
            storePetikan = $this.getStore($this.storePetikan),
            storePenerima = $this.getStore($this.storePenerima),
            storeArsip = view.down('dataview').getStore(),
            staf = $session.getProfile(),
            stafId = $session.getProfileId(),
            jenis_isbatas = record.get('jenis_isbatas'),
            batas_jumlah = record.get('jenis_batas_jumlah'),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            penyetuju_terakhir = [],
            petikan_terakhir = [],
            jabatan_ispenerima = [],
            dokumen_petikan = [],
            surat_korespondensi = null,
            surat_korespondensi_surat = null,
            btnAjukan = button,
            penerima = record.fetchPenerimask(),
            params = {
                'py[]' : [], //penyetuju
                'py_p[]' : [], //penyutu_profil
                'pt[]' : [], //petikan
                'pt_p[]' : [], //petikan_profil
                'pn[]' : [], //penerima
                'pn_p[]' : [], //penerima_profil
                'tsk[]': [], //tembusansk
                'tsk_p[]': [], //tembusansk_profil
                'salin' : $this.salin,
                'unit[]': [],
                'booking' : 1,
                'check' : 1,
                'temp' : 2,
                'log' : 3,
                'approve' : 1,
                'distribute' : 0
            };

        if(record.get('surat_model_sub') == 1 && record.get('surat_setuju') == 2 && !record.get('surat_distribusi_tgl')) {
            params['distribute'] = 1;
            params['log'] = 30;
        } else if(record.get('surat_model_sub') == 2 && record.get('surat_petikan_setuju') == 2 && !record.get('surat_distribusi_tgl')) {
            params['distribute'] = 1;
            params['log'] = 30;
        }

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
            params['tsk[]'].push(r.get('staf_id'));
            if(r.get('surat_stack_profil')) {
                params['tsk_p[]'].push(r.get('surat_stack_profil'));
            } else {
                params['tsk_p[]'].push(r.get('staf_profil'));
            }
        });

        // penerima.each(function(r){
        //     params['pn[]'].push(r.get('staf_id'));
        //     if (r.get('surat_penerimask_profil')) {
        //         params['pn_p[]'].push(r.get('surat_penerimask_profil'));
        //     }else{
        //         params['pn_p[]'].push(r.get('staf_profil'));
        //     }
        // });

        storeArsip.each(function(r){
            if(r.get('dokumen_ispetikan') == 1){
                dokumen_petikan.push(r.get('dokumen_id'));
            }
        });

        if(storeArsip.data.length < 1){
            $helper.showMsg({success:false, message:'Anda belum menambahkan berkas'});
            return; 
        }else if(dokumen_petikan.length < 1){
            if (record.get('surat_model_sub') == 2) {
                $helper.showMsg({success:false, message:$this.getMessage('invalid_berkas_petikan')});
            } else {
                $helper.showMsg({success:false, message:$this.getMessage('invalid_berkas_skperorangan')});
            }
            return;
        }

        /*validate petikan on add or edit mode*/
        if(record.get('surat_model_sub') == 2) {
            storePetikan.each(function(r){
                params['pt[]'].push(r.get('staf_id'));
                petikan_terakhir.push(r.get('jabatan_isnomor'));
                if (r.get('surat_stack_profil')) {
                    params['pt_p[]'].push(r.get('surat_stack_profil'));
                }else{
                    params['pt_p[]'].push(r.get('staf_profil'));
                }
            });

            if(Ext.Array.contains(['add','edit'], view.mode) && !params['pt[]'].length){
                $helper.showMsg({success:false, message:$this.getMessage('petikan_empty')});
                return;
            }else{
                hasil = petikan_terakhir.length;
                indeks = hasil-1;
                petikanTerakhir = storePetikan && storePetikan.getAt(indeks);
                if(petikanTerakhir.get('jabatan_isnomor')==0){
                    $helper.showMsg({success:false, message:$this.getMessage('invalid_jabatan')});
                    return;
                }
            }

            if(storeArsip.data.length > 0 && view.penerimask_changed) {
                view.penerimask_changed = false;
                $helper.showMsg({title:'Info', message:$this.getMessage('alert_penerimask_changed')});
                return;
            }
        }

        /*validate approver on add or edit mode*/
        if(Ext.Array.contains(['add','edit'], view.mode) && !params['py[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
            return;
        }

        /*validate receiver on add or edit mode*/
        if(Ext.Array.contains(['add','edit'], view.mode) && (record.get('surat_penerimask_total')  < 1)){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
            return;
        }

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }

        penerima.load({
            callback: function(){
                penerima.each(function(r){
                    params['pn[]'].push(r.get('staf_id'));
                    if (r.get('surat_penerimask_profil')) {
                        params['pn_p[]'].push(r.get('surat_penerimask_profil'));
                    }else{
                        params['pn_p[]'].push(r.get('staf_profil'));
                    }
                });
                
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
                                        confirmTitle: 'Ajukan Penyetujuan',
                                        confirmText : 'Apakah anda yakin ingin mengajukan persetujuan?',
                                        callback: function(button){
                                            if(button == 'yes'){
                                                if(! record) return;
                                                if(!form.getForm().isValid()){
                                                    $this._click = 0;
                                                    btnAjukan.setDisabled(false);
                                                }else{
                                                    if(record.get('surat_korespondensi') != null || record.get('surat_korespondensi_surat') != null){
                                                        var surat_korespondensi = record.get('surat_korespondensi'),
                                                            surat_korespondensi_surat = record.get('surat_korespondensi_surat');
                                                    }
        
                                                    if(!params['distribute']) {
                                                        if(record.get('surat_setuju') === record.self.statusPenyetujuan().PERSETUJUAN_DECLINE){ //PERSETUJUAN_DECLINE
                                                            record.set({
                                                                'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_REVISION,
                                                                'surat_setuju_staf' : stafId,
                                                                'surat_setuju_tgl' : new Date(),
                                                                'surat_korespondensi': surat_korespondensi,
                                                                'surat_korespondensi_surat': surat_korespondensi_surat
                                                            });
                                                        }else{
                                                            record.set({
                                                                'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_PROCESS,
                                                                'surat_setuju_staf' : stafId,
                                                                'surat_setuju_tgl' : new Date(),
                                                                'surat_korespondensi': surat_korespondensi,
                                                                'surat_korespondensi_surat': surat_korespondensi_surat
                                                            });
                                                        }
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
                                                        if(success){
                                                            btnAjukan.setDisabled(false);
                                                            $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                                            view.close();
                                                        } else {
                                                            btnAjukan.setDisabled(false);
                                                            if(record.get('surat_setuju') === record.self.statusPenyetujuan().PERSETUJUAN_REVISION){ //PERSETUJUAN_DECLINE
                                                                record.set({
                                                                    'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_DECLINE,
                                                                    'surat_setuju_staf' : stafId,
                                                                    'surat_setuju_tgl' : new Date(),
                                                                    'surat_korespondensi': surat_korespondensi,
                                                                    'surat_korespondensi_surat': surat_korespondensi_surat
                                                                });
                                                            }else{
                                                                record.set({
                                                                    'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_INIT,
                                                                    'surat_setuju_staf' : null,
                                                                    'surat_setuju_tgl' : null,
                                                                    'surat_korespondensi': null,
                                                                    'surat_korespondensi_surat': null
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
                            confirmTitle: 'Ajukan Penyetujuan',
                            confirmText : 'Apakah anda yakin ingin mengajukan persetujuan?',
                            callback: function(button){
                                if(button == 'yes'){
                                    if(! record) return;
                                    if(!form.getForm().isValid()){
                                        $this._click = 0;
                                        btnAjukan.setDisabled(false);
                                    }else{
                                        if(record.get('surat_korespondensi') != null || record.get('surat_korespondensi_surat') != null){
                                            var surat_korespondensi = record.get('surat_korespondensi'),
                                                surat_korespondensi_surat = record.get('surat_korespondensi_surat');
                                        }
        
                                        if(!params['distribute']) {
                                            if(record.get('surat_setuju') === record.self.statusPenyetujuan().PERSETUJUAN_DECLINE){ //PERSETUJUAN_DECLINE
                                                record.set({
                                                    'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_REVISION,
                                                    'surat_setuju_staf' : stafId,
                                                    'surat_setuju_tgl' : new Date(),
                                                    'surat_korespondensi': surat_korespondensi,
                                                    'surat_korespondensi_surat': surat_korespondensi_surat
                                                });
                                            }else{
                                                record.set({
                                                    'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_PROCESS,
                                                    'surat_setuju_staf' : stafId,
                                                    'surat_setuju_tgl' : new Date(),
                                                    'surat_korespondensi': surat_korespondensi,
                                                    'surat_korespondensi_surat': surat_korespondensi_surat
                                                });
                                            }
                                        }
                                    }
        
                                    $helper.saveRecord({
                                        record: record,
                                        form: form,
                                        wait: true,
                                        waitText: 'Sedang Mengirim Data, Silahkan tunggu...',
                                        message: true,
                                        params: params,
                                        callback: function(success, records, response){
                                            $localStore.remove('idSalin');
                                            var res = Ext.decode(response.responseText);
                                                $this._click = 0;
        
                                            if(success){
                                                btnAjukan.setDisabled(false);
                                                $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                                view.close();
                                            } else {
                                                btnAjukan.setDisabled(false);
                                                if(record.get('surat_setuju') === record.self.statusPenyetujuan().PERSETUJUAN_REVISION){ //PERSETUJUAN_DECLINE
                                                    record.set({
                                                        'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_DECLINE,
                                                        'surat_setuju_staf' : stafId,
                                                        'surat_setuju_tgl' : new Date(),
                                                        'surat_korespondensi': surat_korespondensi,
                                                        'surat_korespondensi_surat': surat_korespondensi_surat
                                                    });
                                                }else{
                                                    record.set({
                                                        'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_INIT,
                                                        'surat_setuju_staf' : null,
                                                        'surat_setuju_tgl' : null,
                                                        'surat_korespondensi': null,
                                                        'surat_korespondensi_surat': null
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
            }
        });
        
    },

    onPilihKorespondensi_Click: function(button, e, eOpts){
        var $this = this,
            controllerLookup = $this.getController($this.controllerLookupSuratIMasuk);
        
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
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonPetikan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropPetikan),
            record = form && form.updateRecord().getRecord();

        controllerProp.launch({
            mode:'view',
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonPenerima_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPopupPenerima),
            // controllerPropJabatan = $this.getController($this.controllerPopupPenerimaJabatan),
            record = form && form.updateRecord().getRecord();

        if(record.get('surat_model') == 6) {
            controllerProp.launch({
                mode:'view',
                record: record,
                type: 'penerima',
                callback: function(success, record, eOpts){                
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        }
    },

    onButtonRiwayatPenyetuju_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropRiwayat),
            record = form && form.updateRecord().getRecord();

        if (record.get('surat_model') === 6){
            controllerProp.launch({
                mode:'view',
                record: record,
                callback: function(success, record, eOpts){                    
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        }
    },

    onButtonPrintApproval_Click: function(button, e, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            viewer = $this.getView($this.viewViewer),
            record = form.getRecord();

        if(record){
            if (record.get('surat_model') === 6){
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

    onTglSurat_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:cmp}),
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $app.Helper(),
            $pengaturan = $app.LocalSetting(),
            lock = $pengaturan.get('use_lock_internal_tgl');
        
        cmp.setLoading(true);
        if(lock === "1"){
            cmp.setLoading(false);
            cmp.setReadOnly(true);
        }else if(mainview.mode === 'view' || mainview.mode === 'lihat'){
            cmp.setLoading(false);
            cmp.setReadOnly(true);
        }
        else{
            cmp.setLoading(false);
            cmp.setReadOnly(false);
        }
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

    onButtonSalinNomor_Click: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $localStore = $app.getLocalStorage(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            add = $this.getBtnAddPenyetuju({root:mainview}),
            del = $this.getColumnDeletePenyetuju({root:mainview}),
            up = $this.getColumnMoveUpPenyetuju({root:mainview}), 
            down = $this.getColumnMoveDownPenyetuju({root:mainview}),
            record = form && form.updateRecord().getRecord(),
            txtKetNomor = $this.getTxtKetNomor({root:mainview}),
            btnNomor = $this.getBtnNomor({root:mainview}),
            btnSalinNomor = $this.getBtnSalinNomor({root:mainview}),
            cmpNomor = $this.getCmpNomor({root:mainview}),
            jenis =  $this.getCmpJenis({root:mainview}),
            kelas =  $this.getCmpKelas({root:mainview}),
            btnHirarkiKelas =  $this.getBtnHirarkiKelas({root:mainview}),
            tanggal =  $this.getCmpTanggal({root:mainview}),
            controllerSalinNomor = $this.getController($this.controllerSalinNomor),
            // controllerNomor = $this.getController($this.controllerNomor),
            panePenyetuju = mainview.down('#panePenyetuju'),
            panePenerima = mainview.down('#panePenerima'),
            storePenyetuju = panePenyetuju && panePenyetuju.getStore(),
            storePenerima = panePenerima && panePenerima.getStore(),
            $app          = $this.getApplication(),
            $session      = $app.getSession(),
            stafId        = $session.getProfileId(),
            jenis_isbatas = record.get('jenis_isbatas'),
            batas_jumlah  = record.get('jenis_batas_jumlah'),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            penyetuju_terakhir = [],
            jabatan_ispenerima = [],
            params = {
                'py[]' : [],
                'py_p[]' : [],
                'pn[]' : [],
                'pn_p[]' : [],
                't[]': [],
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
                params['t[]'].push(0);
                // params['b[]'].push(1);
                params['pn_p[]'].push(r.get('surat_penerimask_profil'));
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
                            $helper.showMsg({success:false, message:'Anda belum re-upload berkas disurat sebelumnya dengan jenis <b>'+record.get('jenis_nama').get('jenis_nama')});
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
                            })
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
                                view.close();
                                // Ext.callback(view.callback, view, [success, record, eOpts]);
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
                            }
                        }
                    });
                }
            }
        });
    },

    onTembusansk_LoadAssociate: function(record, form, cmp){
        var $this = this,
            mainview = $this.getMainview({from:form}),
            storeTembusan = cmp.getStore(),
            model = record.get('surat_model');

        storeTembusan.removeAll();
        if(model == 6) cmp.setTitle('<b style="color:#04408c; font-size: 13px">Tembusan ('+storeTembusan.data.length+')</b>');
        
        if(record && mainview.mode != 'add'){
            cmp.setLoading(true);
            var store = record.fetchTembusansk();
            store.load(function(){
                store.each(function(record){
                    record.set({
                        'jabatan_id' : record.get('jabatan_penerima_id'),
                        'jabatan_nama' : record.get('jabatan_penerima_nama')
                    });
                    record.commit();
                    storeTembusan.addSorted(record);                        
                });
                cmp.setLoading(false);
                if(model == 6) cmp.setTitle('<b style="color:#04408c; font-size: 13px">Tembusan ('+storeTembusan.data.length+')</b>');
            });
        }
    },

    onButtonPenerimaskList_Click: function(button, e, eOpts) {
        var $this = this,
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            controllerPopup = $this.getController($this.controllerPenerimaskPopup),
            cmpJenisSub =  $this.getCmpJenisSub({root:view}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            btnListPenerimask = $this.getBtnListPenerimask({root:view}),
            newStore = record.fetchPenerimask(),
            sub_tipe = 0,
            mode = view.mode,
            storePenyetuju = $this.getStore($this.storePenyetuju),
            storePetikan = $this.getStore($this.storePetikan),
            storePenerima = $this.getStore($this.storePenerima),
            params = {
				'py[]' : [],
				'py_p[]' : [],
				'pt[]' : [],
				'pt_p[]' : [],
				'pn[]' : [],
				'pn_p[]' : [],
				't[]': [],
				'tsk[]' : [],
				'tsk_p[]' : [],
				// 'b[]': [],
				'temp' : 1
			};

        if(cmpJenisSub.valueModels.length > 0) {
            sub_tipe = cmpJenisSub.valueModels[0].get('sub_tipe');
        }

        controllerPopup.launch({
            mode: mode,
            recSurat: record,
            sub_tipe: sub_tipe,
            idsurat: record.get('surat_id'),
            callback:function(success, records){
                if(success) {
                    btnListPenerimask.setText(newStore.data.length + ' Penerima');
                    view.penerimask_changed = true;
                    record.set({
                    	'surat_penerimask_total' : newStore.data.length
                    });

                    //save surat
                    var penerimask = record.fetchPenerimask();

                    storePenyetuju && storePenyetuju.each(function(r){
						params['py[]'].push(r.get('staf_id'));
						if (r.get('surat_stack_profil')) {
						  params['py_p[]'].push(r.get('surat_stack_profil'));
						}else{
							params['py_p[]'].push(r.get('staf_profil'));
						}
					});

					if(Ext.Array.contains(['add','edit'], view.mode) && record.get('surat_model_sub') == '2'){
						storePetikan.each(function(r){
							params['pt[]'].push(r.get('staf_id'));
							if (r.get('surat_stack_profil')) {
								params['pt_p[]'].push(r.get('surat_stack_profil'));
							}else{
								params['pt_p[]'].push(r.get('staf_profil'));
							}
						});

						if(storePetikan.data.length <= 0) {
							$helper.showMsg({success:false, message:$this.getMessage('petikan_empty')});
							return;
						}
					}

                    penerimask && penerimask.each(function(r){
                        params['pn[]'].push(r.get('staf_id'));
                        if (r.get('surat_penerimask_profil')) {
                            params['pn_p[]'].push(r.get('surat_penerimask_profil'));
                        }else{
                            params['pn_p[]'].push(r.get('staf_profil'));
                        }
                    });

                    storePenerima.each(function(r){
                        params['tsk[]'].push(r.get('staf_id'));
						if(r.get('surat_stack_profil')) {
							params['tsk_p[]'].push(r.get('surat_stack_profil'));
						} else {
							params['tsk_p[]'].push(r.get('staf_profil'));
						}
                    });

                    if(Ext.Array.contains(['add','edit'], view.mode) && record.get('surat_penerimask_total') < 1){
                        $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
                        return;
                    }

					if(Ext.Array.contains(['add','edit', 'reply'], view.mode) && !params['py[]'].length){
						$helper.showMsg({success:false, message:$this.getMessage('approver_empty')});
						return;
					}

                    view.setLoading(true);
					$helper.saveRecord({
						form: form,
						record: record,
						params: params,
						message: false,
						wait: true,
						callback: function(success, record, eOpts, response){
							view.setLoading(false);
                            $helper.showMessage({success: true, title: 'Berhasil', message: 'Berhasil menyimpan data'});
						}
					});
                }
            }
        });
    },

    onComboJenisSub_BeforeSelect: function(combo, selection, index, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:combo}),
            record = mainview.record,
            $helper = $this.getApplication().Helper();
            
        if(combo.valueModels.length > 0 && (combo.valueModels[0].get('sub_tipe') != selection.get('sub_tipe'))){
            Ext.Ajax.request({
                url: $this.getApi('reset_penerimask', {id:record.get('surat_id')}),
                success: function(response){
                    var objres = Ext.decode(response.responseText, true) || {};
                    $helper.showMsg({success:true, message:'Data pada penerima SK telah direset'});
                }
            });
        }
    },

    onComboJenisSub_LoadAssociate: function(record, form, cmp){
        if(!record.get('surat_jenis_sub')) return;

        cmp.setLoading(true);
        record.getJenisSub(function(r)
        {
            cmp.setLoading(false);
            // if(cmp.getStore().getCount()) {
            //     cmp.setValue(record.get('surat_jenis_sub'));
            // } else {
                cmp.setValue(r);
            // }
        });
    },

    onButtonPenerimaTembusan_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPopupPenerima),
            // controllerPropJabatan = $this.getController($this.controllerPopupPenerimaJabatan),
            record = form && form.updateRecord().getRecord();

        if(record.get('surat_model') == 6) {
            controllerProp.launch({
                mode:'view',
                record: record,
                type: 'tembusan',
                callback: function(success, record, eOpts){                
                    Ext.callback(view.callback, view, [success, record, eOpts]);
                }
            });
        }
    },
});