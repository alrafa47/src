Ext.define('SIPAS.controller.Sipas.surat.agenda.nomor.Popup', {
	extend: 'SIPAS.controller.Sipas.base.Base',

	views: [
		'Sipas.surat.agenda.nomor.Popup'
	],

	models: [
		'Sipas.Surat'
	],

	messages: {
		nomor_empty: 'Nomor surat tidak boleh kosong'
	},

	refs : [
		{ ref: 'mainview', 		selector: 'sipas_surat_agenda_nomor_popup' },
		{ ref: 'form', 			selector: 'sipas_surat_agenda_nomor_popup > form' },
		{ ref: 'cmpNomor', 		selector: 'sipas_surat_agenda_nomor_popup > form [name=surat_nomor]' },
		{ ref: 'cmpUrut', 		selector: 'sipas_surat_agenda_nomor_popup > form [name=surat_nomor_urut]' },
		{ ref: 'cmpBackdate', 	selector: 'sipas_surat_agenda_nomor_popup > form [name=surat_nomor_backdate]' },
		{ ref: 'cmpAsli', 		selector: 'sipas_surat_agenda_nomor_popup > form [name=surat_nomor_asli]' }
	],

	api: {
        'next_nomor'        : 'server.php/sipas/surat/next/nomor',
        'check_nomor'       : 'server.php/sipas/surat/check_nomor'
    },

	init: function(application){
		this.control({
            "sipas_surat_agenda_nomor_popup": {
                show : this.onMainview_Show,
                close : this.onMainview_Close,
                loadnomor : this.onMainview_LoadNomor
            },
            "sipas_surat_agenda_nomor_popup sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            "sipas_surat_agenda_nomor_popup #refNomor": {
                click: this.onButtonRef_Click
            },
            "sipas_surat_agenda_nomor_popup [name=surat_nomor_urut]": {
                change: this.onUrut_Change
            }
		});
	},

	controllerLookupSuratKeluar : 'Sipas.keluar.agenda.Popup',
	controllerLookupSuratKeluarInternal : 'Sipas.internal.keluar.agenda.Lookup',

	configNomor :{},

	launch: function(config){
		config = Ext.applyIf(config,{
			mode: 'edit',
			booking: null,
			unit: null,
			tipe: null,
			record: null,
			callback: Ext.emptyFn,
			scope: this
		});

		var $this = this,
			$app = this.getApplication(),
			$helper = $app.Helper(),
			view = null;

		switch(config.mode)
		{
			case 'view' :
			case 'ubah' :

				view = $this.createView( (function(c){
					c.requireComponents = [];
					c.removeComponents = [];
					c.readonlyComponents = [];

					if(c.booking === 1){
						c.removeComponents.push('#formNormal', '#formNormal [name=surat_nomor]', '#formNormal [name=surat_nomor_urut]');
					}else{
						c.removeComponents.push('#formBooking', '#formBooking [name=surat_nomor]', '#formBooking [name=surat_nomor_urut]');
					}

					if(c.mode === 'view'){
						
					}

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

	onMainview_Show: function(mainview){
		var $this = this,
			$app = $this.getApplication(),
			form = $this.getForm({root:mainview}),
			record = mainview.record;

		if(record){
			form.loadRecord(record);

			mainview.fireEvent('loadnomor', mainview);
		}
	},

	onMainview_LoadNomor: function(mainview, e, eOpts){
        var $this = this,
        	record = mainview.record,
            tipe = record.get('surat_jenis'),
            scope = record.get('surat_unit'),
            cmp = $this.getCmpNomor({root:mainview}),
            urut = $this.getCmpUrut({root:mainview}),
            backdate = $this.getCmpBackdate({root:mainview}),
            asli = $this.getCmpAsli({root:mainview}),
            params = {
            	'id': record.getId(),
            	'model': record.getModelType(),
            	'tipe': tipe,
            	'tgl': record.get('surat_tanggal'),
            	'unit': scope
            };

        // console.log(record.get('surat_nomor'));
        if((record.get('surat_setuju') == 0 && record.get('surat_nomor_urut')) || record.get('surat_setuju') == 4){
        	params = {
            	'id': record.getId(),
            	'model': record.getModelType(),
            	'tipe': tipe,
            	'unit': scope,
	            'beri_ulang': 1
            };
        }

        cmp && cmp.setLoading(true);
        Ext.Ajax.request({
            url: $this.getApi('next_nomor'),
            params: params,
            callback: function(options, success, response){
                cmp && cmp.setLoading(false);
            },
            success: function(response, options){
                var objres = Ext.decode(response.responseText, true) || {};
		        // console.log(backdate.backdate);

                $this.configNomor = objres.config;
                cmp && cmp.setValue(objres.next);
                asli && asli.setValue(objres.next);
                urut && urut.setValue(objres.urut);
                backdate && backdate.setValue(objres.backdate);
            },
            failure: function(response, options){}
        });
    },

	onMainview_Close: function(mainview, e, eOpts){
        var $this = this,
        	record = mainview.record,
            cmp = $this.getCmpNomor({root:mainview}),
            urut = $this.getCmpUrut({root:mainview}),
            backdate = $this.getCmpBackdate({root:mainview}),
            asli = $this.getCmpAsli({root:mainview});

        if (mainview.mode !== 'update' && (!mainview.backdate || !mainview.urut)) {
        	if (mainview.mode !== 'close') {
        		cmp && cmp.setValue(null);
		        asli && asli.setValue(null);
		        urut && urut.setValue(null);
		        backdate && backdate.setValue(null);
        	}
        }
    },

    onButtonRef_Click: function(button, e, eOpts){
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form && form.updateRecord().getRecord(),
            controllerLookupSuratKeluar = $this.getController($this.controllerLookupSuratKeluar),
            controllerLookupSuratKeluarInternal = $this.getController($this.controllerLookupSuratKeluarInternal);
        
        if(record.get('surat_model') === 2){
        	controllerLookupSuratKeluar.launch({
		        record: record,
		        mode: 'view',
		        callback: function(selection){         
		        }
		    });
        }else{
        	controllerLookupSuratKeluarInternal.launch({
		        record: record,
		        mode: 'view',
		        callback: function(selection){         
		        }
		    });
        }
    },

    onButtonSave_Click: function(button, e, eOpts) {
        var $this =       this,
            $app =        $this.getApplication(),
            $session =    $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper =     $app.Helper(),
            view =        $this.getMainview({from:button}),
            backdate = 	  $this.getCmpBackdate({root:view}).getValue(),
            // booking_nomor = $app.LocalSetting().get('use_booking_nomor'),
            form =        $this.getForm({root:view}),
            record =      form && form.updateRecord().getRecord(),
            params = {
				'internal' : 1
			};
		
        if(! record) return;
        if(backdate != 0){
        	$helper.saveRecord({
	            record: record,
	            form: form,
	            wait: true,
	            params:params,
	            message: false,
	            confirm: true,
	            confirmText: 'Apakah anda yakin ?',
	            confirmTitle: 'Simpan Surat',
	            callback: function(success, record, eOpts, response){
	                $helper.showMsg({success: true, message: 'Berhasil Memberikan Nomor Surat'});
	                view.mode = 'update';
	                Ext.callback(view.callback, view, [success, record, eOpts]);
	                view.close();
	            }
	        });
        }else{
        	if(view.booking === 1){
        		record.set('surat_nomor_asli', record.get('surat_nomor'));
        		params = {
	            	'internal' : 1,
	            	'config_booking' :1,
	            	'updated' : 1,
	            	'config': Ext.encode($this.configNomor)
        		};
				$helper.saveRecord({
		            record: record,
		            form: form,
		            wait: true,
		            params: params,
		            message: false,
		            confirm: true,
		            confirmText: 'Apakah anda yakin ?',
		            confirmTitle: 'Simpan Surat',
		            callback: function(success, record, eOpts, response){
		            	$helper.showMsg({success: true, message: 'Berhasil Memberikan Nomor Surat'});
		            	view.mode = 'update';
		            	Ext.callback(view.callback, view, [success, record, eOpts]);
		            	view.close();
		            }
		        });
        	}else{
        		params = {
	            	'internal' : 1,
	            	'updated' : 1,
	            	'config': Ext.encode($this.configNomor)
        		};

            	view.setLoading(true);
				Ext.Ajax.request({
		            url: $this.getApi('check_nomor'),
		            params: {
		            	'urut': record.get('surat_nomor_urut'),
		            	'terpusat': record.get('jenis_terpusat'),
		            	'config': Ext.encode($this.configNomor)
		            },
		            callback: function(options, success, response){
		                view.setLoading(false);
		            },
		            success: function(response, options){
		                var objres = Ext.decode(response.responseText, 1) || {};

		                if(objres.exist > 0){
		                	view.mode = 'close';
		                	view.close();
		                	$this.launch({
				                record : record,
				                mode: 'ubah',
				                callback: function(success, record, operation){
				                    Ext.callback(view.callback, view, [success, record, operation]);
				                }
				            });
		                	$helper.showMsg({success: false, message: 'Nomor surat telah terpakai, surat akan diberi nomor baru'});
		                }else{
		                	$helper.saveRecord({
					            record: record,
					            form: form,
					            wait: true,
					            params: params,
					            message: false,
					            confirm: true,
					            confirmText: 'Apakah anda yakin ?',
					            confirmTitle: 'Simpan Surat',
					            callback: function(success, record, eOpts, response){
					            	view.mode = 'close';
					                view.close();
					            	$helper.showMsg({success: true, message: 'Berhasil Memberikan Nomor Surat'});
					                Ext.callback(view.callback, view, [success, record, eOpts]);
					            }
					        });
		                }

		            },
		            failure: function(response, options){}
		        });
        	}
        }
    },

    onUrut_Change:function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            mainview = $this.getMainview({from:checkbox}),
            booking = mainview.booking,
            cmp = $this.getCmpNomor({root:mainview}),
            form = $this.getForm({root:mainview}),
            record = form && form.updateRecord().getRecord();

        if(booking){
        	val = record.get('surat_nomor');
	        hasil = val.replace(oldValue, newValue);
	        cmp.setValue(hasil);
        }
    }
});