Ext.define('SIPAS.controller.Sipas.internal.keluar.agenda.Prop', {
	extend: 'SIPAS.controller.Sipas.surat.agenda.Prop',

	controllers: [
		'Sipas.internal.keluar.agenda.prop.TemplateComponent'
	],

	views: [
		'Sipas.surat.agenda.Prop'
	],

	stores: [
		'Sipas.surat.scope.Combo',
		'Sipas.unit.Combo',
		'Sipas.surat.penerima.List',
		'Sipas.surat.penyetuju.List'
	],

    api: {
        batasReupload   : 'server.php/sipas/surat/batasReupload',
        delete          : 'server.php/sipas/surat_ikeluar/destroy',
        print_approval  : 'server.php/sipas/surat/printApproval?id={id}',
        batal           : 'server.php/sipas/surat/batalSurat',
        musnah          : 'server.php/sipas/surat/musnahSurat',
        arsip           : 'server.php/sipas/surat/arsipSurat',
        next_nomor      : 'server.php/sipas/surat/next/nomor'
    },

    salin: null,
	storePenerima: 'Sipas.surat.penerima.List',
	storePenyetuju: 'Sipas.surat.penyetuju.List',
    
    controllerProperty: 'Sipas.internal.keluar.agenda.Prop',
    controllerPopup: 'Sipas.internal.keluar.agenda.Popup',
    controllerAtribut: 'Sipas.surat.atribut.Pane',
    controllerSetting: 'Sipas.sistem.setting.Pane',
    controllerResend: 'Sipas.surat.penerima.Popup',

    _click: 0,
	
	init: function(application){
		this.control({
			'sipas_surat_agenda_prop sipas_com_button_save[propType=ikeluar]': {
				click : this.onButtonSave_Click
			},
            "sipas_surat_agenda_prop [name=surat_tanggal][propType=ikeluar]":{
                change: this.onChange_Tgl
            },
			'sipas_surat_agenda_prop #perubahan[propType=ikeluar]': {
                click: this.onButtonEdit_Click
            },
            'sipas_surat_agenda_prop #perubahanBank[propType=ikeluar]': {
                click: this.onButtonEditBank_Click
            },
            'sipas_surat_agenda_prop #buttonResend': {
                click: this.onButtonResend_Click
            },
            'sipas_surat_agenda_prop #ubah[propType=ikeluar]': {
                click: this.onButtonUbah_Click
            },
			'sipas_surat_agenda_prop sipas_com_button_savesend[propType=ikeluar]': {
				click : this.onButtonSaveSend_Click
			},
            "sipas_surat_agenda_prop #simpanSetujui[propType=ikeluar]": {
                click: this.onButtonSimpanSetujui_Click
            },
            'sipas_surat_agenda_prop sipas_com_button_save[propType=sikeluar]': {
                click : this.onButtonSave_Click
            },
            "sipas_surat_agenda_prop [name=surat_tanggal][propType=sikeluar]":{
                change: this.onChange_TglSession
            },
            'sipas_surat_agenda_prop #perubahan[propType=sikeluar]': {
                click: this.onButtonEditSession_Click
            },
            'sipas_surat_agenda_prop #ubah[propType=sikeluar]': {
                click: this.onButtonUbah_Click
            },
            'sipas_surat_agenda_prop sipas_com_button_savesend[propType=sikeluar]': {
                click : this.onButtonSaveSend_Click
            },
            "sipas_surat_agenda_prop #simpanSetujui[propType=sikeluar]": {
                click: this.onButtonSimpanSetujui_Click
            },
			'sipas_surat_agenda_prop combobox[name=surat_itipe]': {
				select : this.onComboTipe_Select
			},
            'sipas_surat_agenda_prop sipas_arsip_pane[propType=ikeluar]':{
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_surat_agenda_prop sipas_arsip_pane[propType=sikeluar]':{
                loadassociate: this.onArsip_LoadAssociate
            },
			'sipas_surat_agenda_prop combobox[name=surat_unit]': {
				select : this.onComboDepPengirim_Select
			},
			"sipas_surat_agenda_prop #buttonDelete[propType=ikeluar]": {
                click: this.onButtonDelete_Click
            },
            "sipas_surat_agenda_prop #buttonDeletePermanen[propType=ikeluar]": {
                click: this.onButtonDeletePermanen_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_saveedit[propType=ikeluar]": {
                click: this.onButtonSaveEdit_Click
            },
			'sipas_surat_agenda_prop sipas_surat_penerima_list[propType=ikeluar]':{
				loadassociate: this.onPenerima_LoadAssociate
			},
			'sipas_surat_agenda_prop sipas_surat_penyetuju_list[propType=ikeluar]':{
				loadassociate: this.onPenyetuju_LoadAssociate
			},
			'sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane[propType=ikeluar]':{
                loadassociate: this.onKorespondensi_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_putin[propType=ikeluar]": {
                click: this.onPilihKorespondensi_Click
            },
            "sipas_surat_agenda_prop #buttonDelete[propType=sikeluar]": {
                click: this.onButtonDeleteSession_Click
            },
            "sipas_surat_agenda_prop sipas_com_button_saveedit[propType=sikeluar]": {
                click: this.onButtonSaveEdit_Click
            },
            'sipas_surat_agenda_prop sipas_surat_penerima_list[propType=sikeluar]':{
                loadassociate: this.onPenerima_LoadAssociate
            },
            'sipas_surat_agenda_prop sipas_surat_penyetuju_list[propType=sikeluar]':{
                loadassociate: this.onPenyetuju_LoadAssociate
            },
            'sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane[propType=sikeluar]':{
                loadassociate: this.onKorespondensi_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_putin[propType=sikeluar]": {
                click: this.onPilihKorespondensi_Click
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_close": {
                click: this.onButtonKorespondensiClear_Click
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju[propType=ikeluar]": {
                click: this.onButtonPenyetuju_Click
            },
            "sipas_surat_agenda_prop #tanggal[propType=ikeluar]":{
                loadassociate: this.onTglSurat_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #daftarPenyetuju[propType=sikeluar]": {
                click: this.onButtonPenyetuju_Click
            },
            "sipas_surat_agenda_prop #tanggal[propType=sikeluar]":{
                loadassociate: this.onTglSurat_LoadAssociate
            },
            "sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem#btndaftarPenerima": {
                click: this.onButtonPenerima_Click
            },
            // "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #riwayatPersetujuan[propType=ikeluar]": {
            //     click: this.onButtonRiwayatPenyetuju_Click
            // },
            // "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_penyetujuan_pane #riwayatPersetujuan[propType=sikeluar]": {
            //     click: this.onButtonRiwayatPenyetuju_Click
            // },
            'sipas_surat_agenda_prop sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=show_history]' : {
                click: this.onButtonRiwayatPenyetuju_Click
            },
            'sipas_surat_agenda_prop form sipas_surat_informasi_penyetujuan_pane button#btnMore menu menuitem[action=print_approval]' : {
                click: this.onButtonPrintApproval_Click
            },
            "sipas_surat_agenda_prop #batalNomor[propType=ikeluar]": {
                click: this.onButtonBatalNomor_Click
            },
            "sipas_surat_agenda_prop #batalNomor[propType=sikeluar]": {
                click: this.onButtonBatalNomor_Click
            },
            'sipas_surat_agenda_prop form button#btnSalinNomor[propType=ikeluar]': {
                click: this.onButtonSalinNomor_Click
            },
            'sipas_surat_agenda_prop form button#btnSalinNomor[propType=sikeluar]': {
                click: this.onButtonSalinNomor_Click
            },
            "sipas_surat_agenda_prop #buttonMusnah[propType=ikeluar]": {
                click: this.onButtonMusnah_Click
            },
            "sipas_surat_agenda_prop #buttonMusnah[propType=sikeluar]": {
                click: this.onButtonMusnah_Click
            },
            "sipas_surat_agenda_prop #buttonArsip[propType=ikeluar]": {
                click: this.onButtonArsip_Click
            },
            "sipas_surat_agenda_prop #buttonArsip[propType=sikeluar]": {
                click: this.onButtonArsip_Click
            }
		});
	},

    onCheckbox_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:checkbox}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            // storePenerima = $this.getStore($this.storePenerima),
            // cmpBerkasExist = $this.getCmpBerkasExist({root:view}),
            useSla = $this.getCmpUseSla({root:view}).getValue(),
            params = {
                'user[]' : []
            };

        if(useSla !== 1){
            // record.set({
            //     'surat_setuju_staf' : stafId,
            //     'surat_setuju_tgl' : new Date(),
            //     'surat_distribusi_staf' : stafId,
            //     'surat_distribusi_tgl' : new Date()
            // });
        }else{
            // adding sLA please add surat_usesla and please add proptype at checkbox surat_usesla //
            record.set({
                'surat_usesla' : 1
            });
            // record.set({
            //     'surat_setuju_staf' : stafId,
            //     'surat_setuju_tgl' : new Date(),
            //     'surat_distribusi_staf' : stafId,
            //     'surat_distribusi_tgl' : new Date(),
            //     'surat_selesai_staf' : stafId,
            //     'surat_selesai_tgl' : new Date()
            // });
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
        var $this   = this,
            $app    = $this.getApplication(),
            $helper     = $app.Helper(),
            $session     = $app.Session(),
            view        = $this.getMainview({from:field}),
            cmpBackdatedInfo = $this.getCmpBackdatedInfo({root:view}),
            record      = view.record,
            surat_nomor = record && record.get('surat_nomor'),
            surat_tanggal    = new Date(Ext.Date.format(newValue, 'Y-m-d')),
            pembuatan_tanggal = new Date(Ext.Date.format(new Date(), 'Y-m-d'));
            // rules       = session.session.rules;

        /*check backdate*/
        if(!surat_nomor && (surat_tanggal < pembuatan_tanggal) && (view.mode != 'view' || view.mode != 'ubah' || view.mode != 'lihat')){
            if(!$session.getRuleAccess('surat_internal_keluar_backdate')){
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
            pembuatan_tanggal = (record.get('surat_properti_buat_tgl'))? new Date(record.get('surat_properti_buat_tgl')) : new Date(Date.now());
            // rules       = session.session.rules;
            pembuatan_tanggal.setHours(0,0,0,0);

        /*check backdate*/
        if(surat_tanggal < pembuatan_tanggal && (view.mode != 'view' || view.mode != 'ubah' || view.mode != 'lihat')){
            if(!$session.getRuleAccess('keluar_session_internal_backdate')){
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

	// onComboDepPengirim_LoadAssociate: function(record, form, cmp){
	// 	var store = cmp.getStore(),
	// 		value = cmp.getValue(),
	// 		urlFallback = store.urlFallback,
	// 		currentUnit = store.getById(value);

	// 	if(!currentUnit){
	// 		if(!value) return;
	// 		cmp.setLoading(true);
	// 		Ext.Ajax.request({
	// 			params: {id: value},
	// 			method: 'get',
	// 			url: store.urlFallback,
	// 			headers: {'Content-Type':'application/json'},
	// 			callback: function(){
	// 				cmp.setLoading(false);
	// 			},
	// 			success: function(response){
	// 				var objres = Ext.decode(response.responseText, 1) || {},
	// 					data = objres.data;
	// 				// var recordInstered = store.insert(0, data);
	// 				// cmp.getStore().load({
	// 		  //           callback: function(record, operation, success){
	// 				// 		cmp.setValue(recordInstered[0]);
	// 		  //           }
	// 		  //       });
	// 			}
	// 		});
	// 	}
	// },

    onButtonList_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.getRecord(),
            controllerPopup = $this.getController($this.controllerPopup);

        controllerPopup.launch({
            mode:'view',
            record: record
        });
    },

	onComboTipe_Select: function(combo, records, eOpts){
		var tipe = combo.getValue(),
			$this = this,
			mainview = $this.getMainview({from:combo});

		if(!mainview) return;
		mainview.fireEvent('loadagenda', mainview, tipe);
		mainview.fireEvent('loadnomor', mainview, tipe);
	},

	onButtonSave_Click: function(button, e, eOpts){
        var $this 		= this,
            $app 		= $this.getApplication(),
            $localStore = $app.getLocalStorage(),
            checkSession = $app.getSession().getResetSession(),
            $helper 	= $this.getApplication().Helper(),
            booking_nomor = $app.LocalSetting().get('use_booking_nomor'),
            view 		= $this.getMainview({from:button}),
            form 		= $this.getForm({root:view}),
            record 		= form && form.updateRecord().getRecord(),
            useretensi  = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            storePenerima 	= $this.getStore($this.storePenerima),
            storePenyetuju 	= $this.getStore($this.storePenyetuju),
            jabatan_ispenerima = [],
            params = {
                'salin' : $this.salin,
                'temp' : 1,
                'pn[]' : [],
                'pn_p[]' : [],
                'py[]' : [],
                'py_p[]' : [],
                't[]': [],
                // 'b[]': [],
                'log' : 2
            };

        storePenerima.each(function(r){
            params['pn[]'].push(r.get('staf_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if(!r.get('jabatan_ispenerima')) jabatan_ispenerima.push(r.get('jabatan_ispenerima'));   

            if (r.get('surat_stack_profil')) {
                params['pn_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['pn_p[]'].push(r.get('staf_profil'));
            }
        });
        
        storePenyetuju.each(function(r){
            params['py[]'].push(r.get('staf_id'));
            if (r.get('surat_stack_profil')) {
                params['py_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['py_p[]'].push(r.get('staf_profil'));
            }
        });

        if(params['pn[]'].length > 50){
            $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
            return;
        }else if (view.penerima && (jabatan_ispenerima.length > 0)) {
            $helper.showMsg({success:false, message:$this.getMessage('invalid_penerima')});
            return;
        }

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        $helper.showConfirm({
            confirmTitle: 'Simpan Surat',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    if(! record) return;
                    $helper.saveRecord({
                        record: record,
                        form: form,
                        params: params,
                        wait: true,
                        message: true,
                        callback: function(success, record, eOpts, response){
                            $localStore.remove('idSalin');
                            view.close();
                        }
                    });
                }
            }
        });
    },

    onButtonResend_Click: function(button, e, eOpts){
        var $this = this,
            controllerResend = $this.getController($this.controllerResend),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        controllerResend.launch({
            record: record,
            callback: function(success, record, eOpts){
                view.close();
            }
        });
    },

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'ikeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            model: record.self.modelType().MODEL_IKELUAR,
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
            propType: 'ikeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            akses:'view_bank',
            model: record.self.modelType().MODEL_IKELUAR,
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
            propType: 'sikeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'edit',
            model: record.self.modelType().MODEL_IKELUAR,
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
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'ikeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'ubah',
            model: record.self.modelType().MODEL_IKELUAR,
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
            propType: 'ikeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'destroy',
            model: record.self.modelType().MODEL_IKELUAR,
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                // Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

    onButtonDeletePermanen_Click: function(button, e, eOpts) {
        var $this = this,
            $app = $this.getApplication(),
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
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'sikeluar',
            unit: view.unit,
            tipe: view.tipe,
            mode:'destroy',
            model: record.self.modelType().MODEL_IKELUAR,
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
    },

	onButtonSaveEdit_Click: function(button, e, eOpts){
        var $this 		= this,
            $app 		= $this.getApplication(),
            $helper 	= $this.getApplication().Helper(),
            view 		= $this.getMainview({from:button}),
            form 		= $this.getForm({root:view}),
            storePenyetuju  = $this.getStore($this.storePenyetuju),
            storePenerima   = $this.getStore($this.storePenerima),
            record 		= form && form.updateRecord().getRecord(),            
            useretensi  = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            jabatan_ispenerima = [],
            params		= {
                'salin' : $this.salin,
                'upn[]' : [],
                'upn_p[]' : [],
                't[]': [],
                // 'b[]': [],
                'upy[]' : [],
                'upy_p[]' : [],
                'log' : 10
            };

        storePenerima.each(function(r){
            params['upn[]'].push(r.get('staf_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if (!r.get('jabatan_ispenerima')) jabatan_ispenerima.push(r.get('jabatan_ispenerima'));

            if (r.get('surat_stack_profil')) {
                params['upn_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['upn_p[]'].push(r.get('staf_profil'));
            }
        });

        storePenyetuju.each(function(r){
            params['upy[]'].push(r.get('staf_id'));
            if (r.get('surat_stack_profil')) {
                params['upy_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['upy_p[]'].push(r.get('staf_profil'));
            }
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        if(Ext.Array.contains(['ubah'], view.mode) && !params['upn[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
            return;
        }else{
            if(Ext.Array.contains(['ubah'], view.mode) && params['upn[]'].length > 50){
                $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                return;
            }else if (view.penerima && (jabatan_ispenerima.length > 0)) {
                $helper.showMsg({success:false, message:$this.getMessage('invalid_penerima')});
                return;
            }
            
        }

        if(! record) return;
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
                // Ext.callback(view.callback, view, [success, records, eOpts]);
                view.close();
            }
        });
    },

    onButtonSaveSend_Click: function(button, e, eOpts){
        var $this 			= this,
            $app 			= $this.getApplication(),
            $session 		= $app.getSession(),
            $localStore = $app.getLocalStorage(),
            checkSession    = $session.getResetSession(),
            $helper 		= $this.getApplication().Helper(),
            view 			= $this.getMainview({from:button}),
            form 			= $this.getForm({root:view}),
            record 			= form && form.updateRecord().getRecord(),
            storePenerima 	= $this.getStore($this.storePenerima),
            storePenyetuju 	= $this.getStore($this.storePenyetuju),
            stafId 		    = $session.getProfileId(),
            jenis_isbatas   = record.get('jenis_isbatas'),
            batas_jumlah    = record.get('jenis_batas_jumlah'),
            useretensi      = record.get('surat_useretensi'),
            retensi_tgl     = record.get('surat_retensi_tgl'),
            penyetuju_terakhir = [],
            jabatan_ispenerima = [],
            surat_korespondensi = null,
            surat_korespondensi_surat = null,
            btnAjukan = button,
            params = {
                'salin' : $this.salin,
                'pn[]' : [], //penerima
                'pn_p[]' : [], //penerima_profil
                'unit[]': [],
                'py[]' : [], //penyetuju
                'py_p[]' : [], //penyetuju_profil
                'booking' : 1,
                't[]': [], //tembusan
                // 'b[]': [], //berkas
                'check' : 1,
                'temp' : 2,
                'log' : 3,
                'approve' : 1
            };

        storePenerima.each(function(r){
            params['pn[]'].push(r.get('staf_id'));
            params['unit[]'].push(r.get('unit_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if(!r.get('jabatan_ispenerima')) jabatan_ispenerima.push(r.get('jabatan_ispenerima'));   

            if (r.get('surat_stack_profil')) {
                params['pn_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['pn_p[]'].push(r.get('staf_profil'));
            }
        });

        storePenyetuju.each(function(r){
            params['py[]'].push(r.get('staf_id'));
            penyetuju_terakhir.push(r.get('jabatan_isnomor'));
            if (r.get('surat_stack_profil')) {
                params['py_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['py_p[]'].push(r.get('staf_profil'));
            }
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        /*validate receiver on add mode*/
		if(Ext.Array.contains(['add','edit'], view.mode) && !params['pn[]'].length){
			$helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
			return;
		}else{
            if(Ext.Array.contains(['add','edit'], view.mode) && params['pn[]'].length > 50){
                $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                return;
            }else if (view.penerima && (jabatan_ispenerima.length > 0)) {
                $helper.showMsg({success:false, message:$this.getMessage('invalid_penerima')});
                return;
            }
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
                                            
                                        $helper.saveRecord({
                                            record: record,
                                            form: form,
                                            wait: true,
                                            // waitText: 'Sedang Mengirim Data, Silahkan tunggu...',
                                            message: true,
                                            params: params,
                                            callback: function(success, records, response){
                                                $localStore.remove('idSalin');
                                                var res = Ext.decode(response.responseText);
                                                    $this._click = 0;
                                                if(success){
                                                    btnAjukan.setDisabled(false);
                                                    $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                                    // Ext.callback(view.callback, view, [success, record, eOpts]);
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
                                        // Ext.callback(view.callback, view, [success, record, eOpts]);
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
    },

    onButtonSimpanSetujui_Click: function(button, e, eOpts){
        var $this           = this,
            $app            = $this.getApplication(),
            $session        = $app.getSession(),
            $helper         = $this.getApplication().Helper(),
            view            = $this.getMainview({from:button}),
            form            = $this.getForm({root:view}),
            record          = form && form.updateRecord().getRecord(),
            storePenerima   = $this.getStore($this.storePenerima),
            storePenyetuju  = $this.getStore($this.storePenyetuju),
            stafId          = $session.getProfileId(),
            jenis           = $this.getCmpJenis().valueModels[0],
            jenis_isbatas   = record.get('jenis_isbatas'),
            batas_jumlah    = record.get('jenis_batas_jumlah'),
            useretensi      = record.get('surat_useretensi'),
            retensi_tgl     = record.get('surat_retensi_tgl'),
            surat_korespondensi = null,
            surat_korespondensi_surat = null,
            jabatan_ispenerima = [],
            btnAjukan = button,
            params = {
                'salin' : $this.salin,
                'pn[]' : [],
                'pn_p[]' : [],
                'setujui' : 1,
                't[]': [],
                // 'b[]': [],
                'check' : 1,
                'log' : 4
            };

        storePenerima.each(function(r){
            params['pn[]'].push(r.get('staf_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if(!r.get('jabatan_ispenerima')) jabatan_ispenerima.push(r.get('jabatan_ispenerima'));   

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

        /*validate receiver on add mode*/
        if(Ext.Array.contains(['add','edit'], view.mode) && !params['pn[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
            return;
        }else{
            if(Ext.Array.contains(['add','edit'], view.mode) && params['pn[]'].length > 50){
                $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
                return;
            }else if (view.penerima && (jabatan_ispenerima.length > 0)) {
                $helper.showMsg({success:false, message:$this.getMessage('invalid_penerima')});
                return;
            }
        }

        if(record.get('surat_korespondensi') != null || record.get('surat_korespondensi_surat') != null){
            var surat_korespondensi = record.get('surat_korespondensi'),
                surat_korespondensi_surat = record.get('surat_korespondensi_surat');
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
                                                'surat_setuju_staf': stafId,
                                                'surat_setuju_tgl' : new Date(),
                                                'surat_korespondensi': surat_korespondensi,
                                                'surat_korespondensi_surat': surat_korespondensi_surat
                                            });
                                        }

                                        $helper.saveRecord({
                                            record: record,
                                            form: form,
                                            wait: true,
                                            waitText: 'Sedang Mengirim Data, Silahkan tunggu...',
                                            message: false,
                                            params: params,
                                            callback: function(success, record, eOpts, response){
                                                $this._click = 0;

                                                if(success){
                                                    btnAjukan.setDisabled(false);
                                                    $helper.showMsg({success: true, message: 'Berhasil Mengirim dan Menyetujui Surat'});
                                                    // Ext.callback(view.callback, view, [success, record, eOpts]);
                                                    view.close();
                                                } else {
                                                    btnAjukan.setDisabled(false);
                                                    record.set({
                                                            'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_INIT,
                                                            'surat_setuju_staf' : null,
                                                            'surat_setuju_tgl' : null,
                                                            'surat_korespondensi': null,
                                                            'surat_korespondensi_surat': null
                                                        });
                                                    $helper.showMsg({success: false, message: 'Anda tidak bisa backdate pada tanggal ini. Mohon mengganti tanggal surat.'});
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
                                    'surat_setuju_staf': stafId,
                                    'surat_setuju_tgl' : new Date(),
                                    'surat_korespondensi': surat_korespondensi,
                                    'surat_korespondensi_surat': surat_korespondensi_surat
                                });
                            }
                                
                            $helper.saveRecord({
                                record: record,
                                form: form,
                                wait: true,
                                waitText: 'Sedang Mengirim Data, Silahkan tunggu...',
                                message: false,
                                params: params,
                                callback: function(success, record, eOpts, response){
                                    $this._click = 0;

                                    if(success){
                                        btnAjukan.setDisabled(false);
                                        $helper.showMsg({success: true, message: 'Berhasil Mengirim dan Menyetujui Surat'});
                                        // Ext.callback(view.callback, view, [success, record, eOpts]);
                                        view.close();
                                    } else {
                                        btnAjukan.setDisabled(false);
                                        record.set({
                                                'surat_setuju' : record.self.statusPenyetujuan().PERSETUJUAN_INIT,
                                                'surat_setuju_staf' : null,
                                                'surat_setuju_tgl' : null,
                                                'surat_korespondensi': null,
                                                'surat_korespondensi_surat': null
                                            });
                                        $helper.showMsg({success: false, message: 'Anda tidak bisa backdate pada tanggal ini. Mohon mengganti tanggal surat.'});
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
                // if(success)view.close();
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        // view.close(); important do not remove
    },

    onButtonPenerima_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPopupPenerima),
            record = form && form.updateRecord().getRecord();

        if(record.get('surat_model') == 4) {
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

    onButtonRiwayatPenyetuju_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            controllerProp = $this.getController($this.controllerPropRiwayat),
            record = form && form.updateRecord().getRecord();

        if (record.get('surat_model') === 4){
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
            if (record.get('surat_model') === 4){
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
            $app        = $this.getApplication(),
            $helper     = $app.Helper(),
            $session    = $app.getSession(),
            checkSession = $session.getResetSession(),
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
                params['t[]'].push(r.get('surat_stack_istembusan'));
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
                                // Ext.callback(view.callback, view, [success, record, eOpts]);
                            }
                        }
                    });
                }
            }
        });
    }
});