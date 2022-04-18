Ext.define('SIPAS.controller.Sipas.surat.agenda.aktif.Popup', {
	extend: 'SIPAS.controller.Sipas.base.Base',

	views: [
		'Sipas.surat.agenda.aktif.Popup'
	],

	models: [
		'Sipas.Surat'
	],

	refs : [
		{ ref: 'mainview', 	selector: 'sipas_surat_agenda_aktif_popup' },
		{ ref: 'form', 		selector: 'sipas_surat_agenda_aktif_popup > form' }
	],


	init: function(application){
		this.control({
			'sipas_surat_agenda_aktif_popup': {
				show : this.onMainview_Show
			},
            "sipas_surat_agenda_aktif_popup sipas_com_button_save": {
                click: this.onButtonSave_Click
            },
            'sipas_surat_agenda_aktif_popup [name=surat_retensi_tgl]': {
                change: this.onRetensi_Change
            },
		});
	},

	launch: function(config){
		config = Ext.applyIf(config,{
			mode: 'edit',
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

	onRetensi_Change: function(checkbox, newValue, oldValue, eOpts){
        var $this = this,
            mainview = $this.getMainview({from:checkbox}),
            form = $this.getForm({root:mainview}),
            record =      form && form.updateRecord().getRecord();
            // txtInaktif = $this.getTxtInaktif({root:mainview}),
            // txtRetensi = $this.getTxtRetensi({root:mainview});

        if (record) {
            kelas_limitdays = record.get('kelas_limitdays');
            record.set('surat_inaktif_tgl', Ext.Date.add(new Date(newValue), Ext.Date.DAY, (kelas_limitdays)));
            // txtInaktif.setValue(Ext.Date.add(new Date(newValue), Ext.Date.DAY, (kelas_limitdays)));
        }
    },

	onMainview_Show: function(mainview){
		var $this = this,
			$app = $this.getApplication(),
			form = $this.getForm({root:mainview}),
			record = mainview.record;

		if(record){
			form.loadRecord(record);
		}
	},

    onButtonSave_Click: function(button, e, eOpts) {
        var $this =       this,
            $app =        $this.getApplication(),
            $session =    $app.getSession(),
            checkSession = $session.getResetSession(),
            $helper =     $app.Helper(),
            view =        $this.getMainview({from:button}),
            form =        $this.getForm({root:view}),
            record =      form && form.updateRecord().getRecord(),
            now = 		  new Date(),
            retensi_tgl = record.get('surat_retensi_tgl'),
            params = {
				'temporary' : 1
			};

			now.setHours(0,0,0,0);
            retensi_tgl.setHours(0,0,0,0);

		if (now > retensi_tgl){
			$helper.showMsg({success:false, message: 'Tanggal yang dipilih tidak boleh kurang dari hari ini'});
		} else {
			if(! record) return;
	    	$helper.saveRecord({
	            record: record,
	            form: form,
	            wait: true,
	            params: params,
	            message: false,
	            confirm: true,
	            confirmText: 'Apakah anda yakin ?',
	            confirmTitle: 'Konfirmasi Perpanjang Masa Aktif',
	            callback: function(success, record, eOpts, response){
	            	if (success){
	            		$helper.showMsg({success:true, message: 'Berhasil memperpanjang masa aktif surat'});
	            		view.close();
	            	}
	                Ext.callback(view.callback, view, [success, record, eOpts]);
	            }
	        });
		}
    }
});