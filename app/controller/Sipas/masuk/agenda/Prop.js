Ext.define('SIPAS.controller.Sipas.masuk.agenda.Prop', {
	extend: 'SIPAS.controller.Sipas.surat.agenda.Prop',

	views: [
		'Sipas.surat.agenda.Prop'
	],

	stores: [
		'Sipas.retensi.Combo',
		'Sipas.surat.kontak.Combo',
		'Sipas.surat.penerima.List',
		'Sipas.surat.penyetuju.List'
	],

    api: {
        delete      : 'server.php/sipas/surat_masuk/destroy',
        resi        : 'server.php/sipas/surat/resi/surat?id={id}&download={download}',
        download    : 'server.php/sipas/dokumen/download/{id}',
        musnah      : 'server.php/sipas/surat/musnahSurat',
        arsip       : 'server.php/sipas/surat/arsipSurat'
    },

    modelDisposisi: 'Sipas.Disposisi',
    controllerDistribusi: 'Sipas.masuk.agenda.distribusi.Prop',
    // controllerDistribusi: 'Sipas.surat.penerima.tembusan.Popup',
    controllerSuratKeluar: 'Sipas.keluar.agenda.Prop',
    controllerEkspedisi: 'Sipas.surat.ekspedisi.Popup',

    _click: 0,

	init: function(application){
		this.control({
			"sipas_surat_agenda_prop sipas_com_button_save[propType=masuk]": {
				click: this.onButtonSave_Click
			},
			"sipas_surat_agenda_prop #buttonSaveSend[propType=masuk]": {
				click: this.onButtonSaveSend_Click
			},
			"sipas_surat_agenda_prop #perubahan[propType=masuk]": {
				click: this.onButtonEdit_Click
			},
			"sipas_surat_agenda_prop #buttonDelete[propType=masuk]": {
				click: this.onButtonDelete_Click
			},
            "sipas_surat_agenda_prop #buttonDeletePermanen[propType=masuk]": {
                click: this.onButtonDeletePermanen_Click
            },
            'sipas_surat_agenda_prop sipas_arsip_pane[propType=masuk]':{
                loadassociate: this.onArsip_LoadAssociate
            },
            'sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane[propType=masuk]':{
                loadassociate: this.onKorespondensi_LoadAssociate
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_putin[propType=masuk]": {
                click: this.onPilihKorespondensi_Click
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_close#resetKorespondensi": {
                click: this.onButtonKorespondensiClear_Click
            },
            "sipas_surat_agenda_prop #toolbarControlMasuk sipas_com_button_disposisi[propType=masuk]": {
                click: this.onButtonDistribusi_Click
            },
            "sipas_surat_agenda_prop #toolbarControlMasuk sipas_com_button_putin": {
                click: this.onButtonReply_Click
            },
            "sipas_surat_agenda_prop sipas_surat_informasi_pane sipas_surat_informasi_distribusi_pane sipas_com_button_expedition": {
                click: this.onButtonExpedition_Click
            },
            "sipas_surat_agenda_prop sipas_com_surat_korespondensi_pane sipas_com_button_correspondent": {
                click: this.onButtonKorespondensi_Click
            },
            'sipas_surat_agenda_prop #toolbarControlMasuk sipas_com_button_print':{
                click: this.onButtonPrintResi_Click
            },
            'sipas_surat_agenda_prop sipas_surat_penerima_list[propType=masuk]':{
                loadassociate: this.onPenerima_LoadAssociate
            },
            "sipas_surat_agenda_prop #buttonMusnah[propType=masuk]": {
                click: this.onButtonMusnah_Click
            },
            "sipas_surat_agenda_prop #buttonArsip[propType=masuk]": {
                click: this.onButtonArsip_Click
            }
		});
	},
    
	onButtonSave_Click: function(button, e, eOpts, record){
		var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            storePenerima = $this.getStore($this.storePenerima),
            stafId = $session.getProfileId(),
            params = {
                'user[]' : [],
                'user_p[]': [], //user_profile
                't[]': [], //tembusan
                // 'b[]': [],
                'temp' : 1,
                'log' : 2
			};

		storePenerima.each(function(r){
			params['user[]'].push(r.get('staf_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if (r.get('surat_stack_profil')) {
                params['user_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['user_p[]'].push(r.get('staf_profil'));
            }
		});

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    
        if(params['user[]'].length > 50){
            $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
            return;
        }

		if(! record) return;
		$helper.saveRecord({
			form: form,
			record: record,
			params: params,
			wait: true,
			message: true,
            confirm: true,
            confirmText: 'Apakah anda yakin ?',
            confirmTitle: 'Simpan Surat',
			callback: function(success, record, eOpts, response){
				if(success)view.close();
			}
		});
	},

    onButtonEdit_Click: function(button, e, eOpts){
        var $this = this,
            $checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'masuk',
            unit: view.unit,
            mode:'edit',
            model: record.self.modelType().MODEL_MASUK,
            record: record,
            callback: function(success, record, eOpts){
                Ext.callback(view.callback, view, [success, record, eOpts]);
            }
        });
        view.close(); /*important do not remove*/
    },

    onButtonReply_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            record = form && form.updateRecord().getRecord(),
            scopeValue = record.get('surat_unit'),
            $suratkeluar = $this.getController($this.controllerSuratKeluar);

        $suratkeluar.launch({
            propType: 'keluar',
            unit: scopeValue,
            model: record.self.modelType().MODEL_KELUAR,
            mode:'reply',
            record: record,
            callback: function(success, record, eOpts){
                if(success)view.close();
            }
        });
        view.close();
    },

    onButtonDelete_Click: function(button, e, eOpts) {
        var $this = this,
            $checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        $this.launch({
            propType: 'masuk',
            unit: view.unit,
            mode:'destroy',
            model: record.self.modelType().MODEL_MASUK,
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
            $checkSession = $session.getResetSession(),
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
        })
    },

	onButtonSaveSend_Click: function(button, e, eOpts, record){
		var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            storePenerima = $this.getStore($this.storePenerima),
            stafId = $session.getProfileId(),
            $feature    = $this.getController('Sipas.sistem.featureable.Feature'),
            selesai   = $feature.getFeatureAccess('surat_selesai'),
            useretensi = record.get('surat_useretensi'),
            retensi_tgl = record.get('surat_retensi_tgl'),
            cmpBerkasExist = $this.getCmpBerkasExist({root:view}),
            useBalas = $this.getCmpUseBalas({root:view}).getValue(),
            btnKirim = button,
            params = {
                'user[]' : [],
                'user_p[]': [],
                't[]': [],
                // 'b[]': [],
                'log' : 3,
                'send_approval' : 1
            };

        storePenerima.each(function(r){
            params['user[]'].push(r.get('staf_id'));
            params['t[]'].push(r.get('surat_stack_istembusan'));
            // params['b[]'].push(r.get('surat_stack_isberkas'));
            if (r.get('surat_stack_profil')) {
                params['user_p[]'].push(r.get('surat_stack_profil'));
            }else{
                params['user_p[]'].push(r.get('staf_profil'));
            }
        });

        /*validasi ketika masa aktif dicentang, tp tanggal masa kosong*/
        if (useretensi && !retensi_tgl) {
            $helper.showMsg({success:false, message:$this.getMessage('retensi_empty')});
            return;
        }    

        /*validate receiver on add mode*/
        if(Ext.Array.contains(['add','edit'], view.mode) && !params['user[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
            return;
        }else if(Ext.Array.contains(['add','edit'], view.mode) && params['user[]'].length > 50){
            $helper.showMsg({title:'Info', message:$this.getMessage('receiver_limit')});
            return;
        }
        
        $this._click++;
        if($this._click <= 1){
            $helper.showConfirm({
                confirmTitle: 'Distribusi Surat',
                confirmText : 'Apakah anda yakin ?',
                callback: function(button){
                    if(button == 'yes'){
                        if(useBalas){
                            record.set({
                                'surat_setuju_staf' : stafId,
                                'surat_setuju_tgl' : new Date(),
                                'surat_distribusi_staf' : stafId,
                                'surat_distribusi_tgl' : new Date()
                            });
                        }else{
                            if(selesai){
                                record.set({
                                    'surat_setuju_staf' : stafId,
                                    'surat_setuju_tgl' : new Date(),
                                    'surat_distribusi_staf' : stafId,
                                    'surat_distribusi_tgl' : new Date()
                                });
                            }else{
                                record.set({
                                    'surat_setuju_staf' : stafId,
                                    'surat_setuju_tgl' : new Date(),
                                    'surat_distribusi_staf' : stafId,
                                    'surat_distribusi_tgl' : new Date(),
                                    'surat_selesai_staf' : stafId,
                                    'surat_selesai_tgl' : new Date()
                                });
                            }
                        }

                        if(! record) return;
                        if(!form.getForm().isValid()){
                            $this._click = 0;
                            btnKirim.setDisabled(false);
                        }

                        $helper.saveRecord({
                            form: form,
                            record: record,
                            params: params,
                            message: false,
                            wait: true,
                            callback: function(success, record, eOpts, response){    
                                $this._click = 0;
                                if (success){
                                    btnKirim.setDisabled(false);
                                    $helper.showMsg({success: true, message: 'Berhasil Mendistribusikan Surat'});
                                    view.close();
                                }
                            }
                        });
                    }else if (button == 'no'){
                        $this._click = 0;
                        btnKirim.setDisabled(false);
                    }else{
                        /*when message box closed*/
                        $this._click = 0;
                        btnKirim.setDisabled(false);
                    }
                }
            });
            btnKirim.setDisabled(true);
        }
	},

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            $surat = $this.getController($this.controllerSurat);

        view.setLoading(true);
        record.getKorespondensiSuratKeluar(function(surat){
            $surat.launch(surat, function(){
                view.setLoading(false);
            });
        });
    },

	onChange_RetensiTgl: function(field, newValue, oldValue, eOpts){
        var $this   = this,
            view    = $this.getMainview({from:field}),            
            $app    = $this.getApplication(),
            $helper = $app.Helper(),
            tgl     = new Date(newValue),
            now     = new Date(Date.now());
        now.setHours(0,0,0,0);         
        
        if(view.mode !== 'view' && (tgl < now)){
            $helper.showMsg({success:false, message:$this.getMessage('invalid_retensi')});
        }
    },

	printReport: function(id, title){
        var viewer = this.getView(this.viewViewer),
            download = this.getApi('resi', {id:id, download:1}),
            view = viewer.create(Ext.apply(this.defaultWindowReport/*, {enableDownload:true, downloadUrl:download}*/)).show().load(this.getApi('resi', {
                id: id
            }));
        view.setTitle(title);
    },

    printEkspedisi: function(id){
        var viewer = this.getView(this.viewViewer),
            download = this.getApi('ekspedisi', {id:id, download:1});
            viewer.create(Ext.apply(this.defaultWindowReport, {enableDownload:true, downloadUrl:download})).show().load(this.getApi('ekspedisi', {
                id: id
            }));
    },

    printResi: function(id, title){
        var viewer = this.getView(this.viewViewer),
            download = this.getApi('resi', {id:id, download:1}),
            view = viewer.create(Ext.apply(this.defaultWindowReportResi/*, {enableDownload:true, downloadUrl:download}*/)).show().load(this.getApi('resi', {
                id: id
            }));
        view.setTitle(title);
    },

    onButtonPrintResi_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = this.getForm({root:view}),
            record = form.getRecord();
            
    	$this.printResi(record.get('surat_id'), 'Cetak Resi');
    },

    onPilihKorespondensi_Click: function(button, e, eOpts){
        var $this = this,
            $checkSession = $this.getApplication().getSession().getResetSession(),
            controllerLookup = $this.getController($this.controllerLookupSuratKeluar);
        
        controllerLookup.launch({
            multiselect: false,
            afterload: function(records, success, store, viewInstance, grid){
               
            },
            callback: function(selection){
                $this.setKorespondensi(selection[0], $this.getMainview({from:button}));         
            }
        });
    },

    onButtonMusnah_Click:function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            $session = $app.getSession(),
            $checkSession = $session.getResetSession(),
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
            $checkSession = $session.getResetSession(),
            $helper = $app.Helper(),
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
    }
});