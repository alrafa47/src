Ext.define('SIPAS.controller.Sipas.masuk.session.Prop', {
	extend: 'SIPAS.controller.Sipas.base.Base',

    views: [
        'Sipas.masuk.session.Prop'
    ],

    stores: [
		'Sipas.aksi.Combo'
	],

	models: [
		'Sipas.disposisi.Masuk',
		'Sipas.Surat'
	],

	api: {
		'resi' : 'server.php/sipas/surat/resi/surat_masuk?id={id}'
	},

	messages: {
		receiver_empty: 'Penerima surat tidak boleh kosong'
	},

	refs : [
		{ ref: 'mainview',           selector: 'sipas_masuk_session_prop' },
		{ ref: 'form',               selector: 'sipas_masuk_session_prop form#formSurat' },
		{ ref: 'cmpTanggal',         selector: 'sipas_masuk_session_prop form#formSurat [name=surat_tanggal]' },
		{ ref: 'cmpAdditionalInfo',  selector: 'sipas_masuk_session_prop form#formSurat [name=keterangan]' },
		{ ref: 'cmpKeterangan',      selector: 'sipas_masuk_session_prop form#formSurat [name=surat_masuk_keterangan]' },
		{ ref: 'btnKonfProses', 	 selector: 'sipas_masuk_session_prop button#btnKonfProses'},
        { ref: 'compJenisSurat',     selector: 'sipas_masuk_session_prop form sipas_com_surat_pane #jenisSurat'},
        { ref: 'compPengirimSurat',  selector: 'sipas_masuk_session_prop form sipas_com_surat_pane #suratPengirim'},
        { ref: 'compDetailPengirim', selector: 'sipas_masuk_session_prop form#pengirimDetail'},
        { ref: 'compDetailBerkas',   selector: 'sipas_masuk_session_prop form#suratBerkas'},
        { ref: 'aksiCombo',          selector: 'sipas_masuk_session_prop form combobox[name=disposisi_masuk_aksi]'}
	],

	defaultWindowReport: {
        height: 640, 
        width: 670,
        maximizable: true,
        modal: true
    },

	modelSurat : 'Sipas.Surat',
	modelDisposisi: 'Sipas.Disposisi',
    controllerDisposisiList: 'Sipas.masuk.session.kotak.List',

	controllerSurat 			: 'Sipas.masuk.agenda.Prop',
    controllerSurat2            : 'Sipas.internal.masuk.agenda.Prop',
	controllerEkspedisi 		: 'Sipas.surat.ekspedisi.Popup',
	controllerKorespondensi		: 'Sipas.korespondensi.Popup',
	controllerForwardProperty	: 'Sipas.disposisi.forward.Prop',
    controllerHistoryPopup		: 'Sipas.disposisi.riwayat.Popup',
    controllerLog               : 'Sipas.disposisi.log.Popup',

	viewViewer: 'Sipas.Viewer',

	init: function(application){
		this.control({
			"sipas_masuk_session_prop": {
				show : this.onMainview_Show
			},
            'sipas_masuk_session_prop sipas_com_button_save': {
                click: this.onMainview_DoSave
            },
			"sipas_masuk_session_prop sipas_com_button_view": {
				click: this.onButtonViewSurat_Click
			},
            'sipas_masuk_session_prop sipas_com_surat_pane':{
                loadassociate: this.onSuratInfo_LoadAssociate
            },
            'sipas_masuk_session_prop #berkasContainer' : {
                loadassociate: this.onSuratBerkasInfo_LoadAssociate
            },
			"sipas_masuk_session_prop toolbar#toolbarControl sipas_com_button_expedition": {
				click: this.onButtonExpedition_Click
			},
			"sipas_masuk_session_prop toolbar#toolbarControl sipas_com_button_correspondent": {
                click: this.onButtonCorespondent_Click
            },
            "sipas_masuk_session_prop sipas_com_button_disposisi[action=disposisi]": {
                click: this.onButtonDisposisi_DoDisposisi
            },
            "sipas_masuk_session_prop sipas_com_button_disposisi[action=riwayat]": {
                click: this.onButtonDisposisi_DoHistory
            },
			'sipas_masuk_session_prop button#btnKonfProses': {
                click: this.onButtonKonfProses_Click
            },
            'sipas_masuk_session_prop #toolClose':{
                click: this.onToolClose_Click
            },
            'sipas_masuk_session_prop button#btnKonfBerkas': {
                click: this.onButtonKonfBerkas_Click
            },
            'sipas_masuk_session_prop #buttonLog1' : {
                click: this.onButtonViewLog_Click
            },
            'sipas_masuk_session_prop [name=disposisi_masuk_aksi]': {
                loadassociate: this.onComboParent_LoadAssociate,
                focus: this.onComboParent_Focus
            }
		});
	},

	launch: function(config){
		config = Ext.applyIf(config,{
			mode: 'view',
			record: null,
			callback: Ext.emptyFn,
			scope: this
		});

		var $this = this,
			$app = this.getApplication(),
			$helper = $app.Helper(),
            record = config.record || $this.getModel(this.models[0]).create({}),
			view = null;

		switch(config.mode)
		{
            case 'edit' :
            case 'view' :

				view = $this.createView( (function(c){
					c.removeComponents = ['#btnMore'];
                    c.readonlyComponents = ['[name=surat_masuk_keterangan]'];

					return c;
				})(config) );

                view.show();
                break;

			case 'destroy' :
				$helper.destroyRecord({
					record: config.record,
					callback: config.callback,
					confirm: true
				})
				break;

			default:
				var message = $this.getMessage('invalidMode');
				Ext.Msg.alert(message[0], message[1]);
		}
	},

	onMainview_Show: function(view){
		var $this = this,
			$app = $this.getApplication(),
			$helper = $app.Helper(),
            $session = $app.getSession(),
            cmpJenis = $this.getCompJenisSurat({root:view}),
            form = $this.getForm({root:view}),
            comboA = $this.getAksiCombo({root:view}),
			record = view.record || $this.getModel($this.models[0]).create({}),
            isTembusan = (record.get('disposisi_masuk_istembusan')) ? true : false,
            isBerkas = (record.get('disposisi_masuk_isberkas')) ? true : false,
            isTerima = (record.get('disposisi_masuk_isberkasterima')) ? true : false;;

		/*patch title*/
		switch(view.mode){
			case 'view': view.setTitle('Surat Masuk'); break;
		}

        $helper.hideComponent({
                parent: view,
                items: {
                    '#penerimaContainer' : isTembusan,
                    '#tembusanContainer' : !isTembusan,
                    '#berkasContainer' : !isBerkas
                }
            });

        if(record){

            if(comboA){
                comboA.getStore().reload();
            }

            record.getDisposisi(function(dispo){
                dispo.getSurat(function(surat){
                    $this.getForm({root:view}).loadRecord(record);
                })
            });
		}

        if(isTerima){
            $helper.hideComponent({
                parent: view,
                items: {
                    '#sttsBerkas' : false,
                    '#sttsBerkas1' : true
                }
            });
        }else{
            $helper.hideComponent({
                parent: view,
                items: {
                    '#sttsBerkas' : true,
                    '#sttsBerkas1' : false
                }
            });
        }
  
        if(isBerkas && isTerima){
            $helper.hideComponent({
                parent: view,
                items: {
                    'disposisi_masuk_berkasterima_tgl' : !isBerkas,
                    '#btnKonfBerkas' : isTerima
                }
            });
        }
	},

    onSuratInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = mainview || $this.getMainview(),
            // cmpJenis = $this.getCompJenisSurat({root:mainview}),
            // compPengirimSurat = $this.getCompPengirimSurat({root:mainview}),
            compDetailPengirim = $this.getCompDetailPengirim({root:mainview}),
            surat_nomor = record.get('surat_nomor');

        cmp.setLoading(true);
        if (surat_nomor === null || surat_nomor === ''){
            surat_nomor = '<span class="alternative">Tidak Ada Nomor Surat</span>';
        }

        record.getDisposisi(function(disposisi){
            disposisi.getSurat(function(surat){    
                compDetailPengirim.setValue('<div class="cell-visual cell-visual-left">'+
                    '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-mail-open grey-600-i"></i></div></div>'+
                    '<div class="cell-text">'+
                    '<div class="subtext bold">'+record.get('surat_perihal')+'</div>'+
                    '<div class="subtext">'+surat.getPengirim()+' - <span class="blue-700-i">'+surat_nomor+'</span></div>'+
                    '<div class="supporttext supporttext-dark">'+surat.getModelDisplay()+'</div>'+
                    '</div>');
                cmp.setLoading(false);
            });
        });
    },

    onSuratBerkasInfo_LoadAssociate: function(record, form, cmp){
        var $this   = this,
            $app    = $this.getApplication(),
            mainview = mainview || $this.getMainview(),
            compSuratBerkas = $this.getCompDetailBerkas({root:mainview}),
            terima_berkas = record.get('disposisi_masuk_berkasterima_tgl');

        cmp.setLoading(true);
        if (terima_berkas === null || terima_berkas === ''){
            terima_berkas = 'Berkas belum diterima';
        } else {
            terima_berkas = 'Dikonfirmasi pada '+Ext.util.Format.date(terima_berkas, 'd M Y H:i');
        }

        compSuratBerkas.setValue('<div class="cell-visual cell-visual-left">'+
            '<div class="img img-circle img-32"><i class="bigger-1-25 icon ion-md-copy grey-600-i"></i></div></div>'+
            '<div class="cell-text">'+
            '<div class="subtext bold">Disertai surat asli</div>'+
            '<div class="supporttext supporttext-dark">'+terima_berkas+'</div>'+
            '</div>');
        cmp.setLoading(false);
    },

    onButtonViewLog_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerLog = $this.getController($this.controllerLog);

        view.setLoading(true);
        controllerLog.launch({
            mode:'view',
            record: record
        });
        view.setLoading(false);
    },

    onButtonKonfBerkas_Click: function(button, e, eOpts)
    {
        var $this = this,
            form = $this.getForm({from:button}),
            $app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId();
            record = form && form.updateRecord().getRecord(),
            isTerima = record.get('disposisi_masuk_isberkasterima');

        if(isTerima === true){
            form.getForm().reset();
            $helper.showMsg({success: false, message: 'Berkas Sudah Dikonfirmasi'});
        }else{
            $helper.showConfirm({
                confirmTitle: 'Konfirmasi Penerimaan Berkas',
                confirmText : 'Apakah anda yakin untuk mengkonfirmasi penerimaan berkas ?',
                callback: function(button){
                    if(button == 'yes'){
                        record.isTerimaBerkas({
                            staf: pegawaiId,
                            callback: function(staf, operation, success){
                                if(success){
                                }
                            }
                        });
                        form.getForm().reset();
                        if(record.get('disposisi_masuk_berkasterima_tgl')){
                            $helper.hideComponent({
                                parent: form,
                                items: {
                                    '#sttsBerkas1' : true,
                                    '#btnKonfBerkas' : true,
                                    '#sttsBerkas' : false
                                }
                            });
                        }
                        form.loadRecord(record);
                        $helper.showMsg({success: true, message: 'Berhasil Mengkonfirmasi'});
                    }
                }
            });  
        }
    },

    onToolClose_Click: function(tool, e, eOpts){
        var $this = this,
            disController = $this.getController($this.controllerDisposisiList),
            mainview = $this.getMainview({from:tool}),
            form = $this.getForm({root:mainview});

        mainview.close();
        disController.refresh();
    },

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerSurat = $this.getController($this.controllerSurat),
            controllerSurat2 = $this.getController($this.controllerSurat2);

        view.setLoading(true);
        record.forward && record.forward();
        record.getDisposisi(function(dispo){
            dispo.getSurat(function(surat){
                view.setLoading(true);
                if(surat.get('surat_model') === surat.self.modelType().MODEL_MASUK){
                    view.setLoading(false);
                    controllerSurat.launch({
                        propType: 'masuk',
                        unit: null,
                        model: surat.self.modelType().MODEL_MASUK,
                        mode:'lihat',
                        record: surat
                    });
                }else{
                    view.setLoading(false);
                    controllerSurat2.launch({
                        propType: 'imasuk',
                        unit: null,
                        model: surat.self.modelType().MODEL_IMASUK,
                        mode:'view',
                        record: surat
                    });
                }
            })
        });
    },

	onButtonExpedition_Click: function(button, e, eOpts){
		var $this = this,
			view = $this.getMainview({from:button}),
			form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            controllerEkspedisi = $this.getController($this.controllerEkspedisi);

		view.setLoading(true);
        // record.getSurat(function(surat){
            view.setLoading(false);
            controllerEkspedisi.launch({
                record: record
                // callback: function(success){
                // }
            });
        // });
	},

	onButtonKonfProses_Click: function(button, e, eOpts){
        var $this = this,
        	$app = $this.getApplication(),
            $helper = $app.Helper(),
            $session = $app.getSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            btnKonfProses = $this.getBtnKonfProses({root:view}),
            record = form && form.updateRecord().getRecord();

        var pic = (record.get('disposisi_masuk_penerima_id') ? record.get('disposisi_masuk_penerima_id') : $session.getProfile().staf_id);

        $helper.showConfirm({
        	confirmTitle: 'Konfirmasi Proses Surat',
            confirmText : 'Apakah anda yakin untuk mengkonfirmasi proses surat ?',
            callback: function(button){
                if(button == 'yes'){
                    record.getSurat(function(surat){
			            surat.processed({
			                staf_id: pic,
			                date: new Date(),
			                callback: function(surat, operation, success){                    
			                    if(success){
			                        $helper.disableComponent({
			                            parent: view,
			                            items: ['#btnKonfProses']
			                        });
			                        $helper.showMsg({success: true, message: 'Berhasil Mengkonfirmasi'});
			                        btnKonfProses.setText('Proses selesai sudah dikonfirmasi');
			                    }
			                    Ext.callback(view.callback, view, [success, record, eOpts]);
			                },
			                scope: $this
			            });            
			        });
                }
            }
        });
    },

    onMainview_DoSave: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            $session = $this.getApplication().getSession(),
            mainview = $this.getMainview({from:button}),
            pegawaiId = $session.getProfileId();
            form = $this.getForm({root:mainview}),
            record = form && form.updateRecord().getRecord();
        
        record.commit();

        if(! record) return;
        record.saveAksi({
            staf: pegawaiId,
            callback: function(staf, operation, success){
                if(success){
                    $helper.showMsg({success: true, message: 'Berhasil menyimpan arahan'});
                }
            }
        });
        // $helper.saveRecord({
        //     record: record,
        //     form: form,
        //     wait: true,
        //     confirm: true,
        //     confirmText: 'Apakah anda yakin untuk menyimpan arahan ?',
        //     confirmTitle: 'Simpan Arahan',
        //     message: true,
        //     callback: function(success, record, eOpts, response){
        //         Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
        //     }
        // });
    },

    onButtonCorespondent_Click: function(button, e, eOpts){
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
        	controllerKorespondensi = $this.getController($this.controllerKorespondensi),
            record = form && form.updateRecord().getRecord();
            korespondensiView = controllerKorespondensi.launch();

        korespondensiView.setLoading(true);
        record.getSurat(function(surat){
            if(surat){
                surat.getKorespondensi(function(korespondensi){
                    if(korespondensi){
                        controllerKorespondensi.loadByRecord(korespondensi);
                    }
                    korespondensiView.setLoading(false);
                });
            }else{
                korespondensiView.setLoading(false);
            }
        });
    },

    onButtonDisposisi_DoDisposisi: function(button, e, eOpts){
        var $this = this,
            $app = $this.getApplication(),
            mainview = $this.getMainview({from:button}),
            form = $this.getForm({root:mainview}),
            property = $this.getController($this.controllerForwardProperty),
            $session = $app.getSession(),
            pegawaiId = $session.getProfileId(),
            record = form && form.updateRecord().getRecord(),
            recordForward = $this.getModel($this.modelDisposisi).create({
                'disposisi_induk':          record.getId(),
                'disposisi_tgl':            new Date(),
                'disposisi_staf':           record.get('disposisi_masuk_penerima_id'),
                'disposisi_pelaku':         pegawaiId,
                'disposisi_surat':          record.get('disposisi_surat'),
                'disposisi_pengirim_id':    record.get('disposisi_masuk_penerima_id'),
                'disposisi_pengirim_nama':  record.get('disposisi_masuk_penerima_nama'),
                'disposisi_pengirim_unit_nama': record.get('disposisi_masuk_penerima_unit_nama'),
                'surat_id':                     record.get('surat_id'),
                'surat_agenda':                 record.get('surat_agenda'),
                'surat_nomor':                  record.get('surat_nomor')
            });

        // recordForward.setInduk(record);
        property.launch({
            mode: 'disposisi',
            record: recordForward,
            selfAsPenerima:record,
            callback: function(){
                if(record && record.get('disposisi_masuk_id')){
                    record.forwarding({
                        staf: pegawaiId,
                        callback: function(staf, operation, success){
                            if(success){
                            }
                        }
                    });
                }else{
                    record.getDisposisiPenerima(function(dispen){
                        dispen.forwarding({
                            staf: pegawaiId,
                            callback: function(staf, operation, success){
                                if(success){
                                }
                            }
                        });
                    });
                }
            }
        });
    },

    onButtonDisposisi_DoHistory: function(button)
    {
        var $this = this,
            history = $this.getController($this.controllerHistoryPopup),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord();

        history.launch({
            record: record,
            selfAsPenerima: record
        });
    },

	printReport: function(id, title){
        var viewer = this.getView(this.viewViewer),
            view = viewer.create(Ext.apply(this.defaultWindowReport, {})).show().load(this.getApi('resi', {
                id: id
            }));
        view.setTitle(title);
    },

    // setKeterangan: function(view, record){
    // 	var $this = this,
    //         cmpKeterangan = $this.getCmpKeterangan({root:view});

    //     record.getSurat(function(surat){
    //             surat.getMasuk(function(surat_masuk){
    //             if(surat_masuk){
    //                 cmpKeterangan.setValue(surat_masuk.get('surat_masuk_keterangan'));
    //             }
    //         });
    //     });
    // },

    // setAdditionalInfo: function(view, record){
    //  var $this = this,
    // 		view = view || $this.getMainview(),
    // 		cmpAdditionalInfo = $this.getCmpAdditionalInfo({root:view}),
    // 		record = record;

    // 	if(record.get('surat_pengirim')){
    // 		cmpAdditionalInfo.setValue('Anda mendapat <b>Surat Masuk</b> dari <b>'+record.get('surat_pengirim')+'</b> pada '+Ext.Date.format(record.get('disposisi_tanggal'), 'd M Y H:i'));
    // 	}else{
    // 		cmpAdditionalInfo.setValue('Anda mendapat <b>Surat Masuk</b> dari <b>'+record.get('pembuat_unit_nama')+'</b> pada '+Ext.Date.format(record.get('disposisi_tanggal'), 'd M Y H:i'));
    // 	}
    // },

    loadButtonKonf: function(view, record){
    	var $this = this,
            $helper = $this.getApplication().Helper(),
            btnKonfProses = $this.getBtnKonfProses({root:view}),
            record = record || view.updateRecord().getRecord();
        
    	if(record.get('surat_proses_status')== record.self.statusPenyetujuan().DONE){
            $helper.disableComponent({
                parent: view,
                items:[
                    '#btnKonfProses'
                ]
            });
            btnKonfProses.setText('Proses selesai sudah dikonfirmasi');
        }
    },

    // parent
    onComboParent_LoadAssociate: function(record, form, cmp)
    {
        if(!record.get(cmp.getName())) return;

        cmp.setLoading(true);

        if(record){
            cmp.setLoading(false);
            cmp.setValue(record);
        }
    },

    onComboParent_Focus: function(combobox, e, eOpts)
    {
        var store = combobox.getStore();

        // only load combo list when its not readonly and store is empty
        if(!combobox.readOnly && !store.getCount())
        {
            store.removeFilter(true);
            store.load();
        }
    }
});