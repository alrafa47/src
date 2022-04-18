Ext.define('SIPAS.controller.Sipas.surat.penerima.staf.Popup', {
	extend: 'SIPAS.controller.Sipas.base.Base',

	controllers:[
		'Sipas.surat.penerima.staf.List'
	],

	views: [
		'Sipas.surat.penerima.staf.Popup'
	],

	api: {
		'createImasuk': 'server.php/sipas/surat_ikeluar/resend',
		'createImasukKeputusan': 'server.php/sipas/surat_keputusan/resend'
	},

    messages: {
    	'invalid': 'Referensi tidak valid',
        'invalidMode': ['Error', 'Mode tidak sesuai'],
        'resend_success': 'Pengiriman Ulang Berhasil',
        'receiver_empty': 'Penerima surat tidak boleh kosong',
        'resend_failure': 'Pengiriman Ulang Gagal',
        'receiver_exist': ['Info','Staf dengan nama {id} sudah masuk dalam daftar']
	},

	refs : [
		{ ref: 'mainview',          	selector: 'sipas_surat_penerima_staf_popup' },
		{ ref: 'form',              	selector: 'sipas_surat_penerima_staf_popup form' },
		{ ref: 'grid',              	selector: 'sipas_surat_penerima_staf_popup form sipas_surat_penerima_staf_list' }
	],

	defaultModel: 'Sipas.surat.StackPenyetuju',

	controllerAgendaPopup 		: 'Sipas.internal.keluar.agenda.Prop',
	
	controllerLookupPenerima: 'Sipas.staf.penerima.Lookup',

	storePenerima: 'Sipas.surat.penerima.staf.List',

	viewViewer: 'Sipas.Viewer',

	init: function(application){
		this.control({
			"sipas_surat_penerima_staf_popup": {
				show : this.onMainview_Show
			},
			'sipas_surat_penerima_staf_popup sipas_surat_penerima_staf_list sipas_com_button_add': {
                click: this.onButtonAdd_Click
            },
			"sipas_surat_penerima_staf_popup #buttonSend": {
				click : this.onButtonSend_Click
			}
		});
	},

	launch: function(config){
		config = Ext.applyIf(config,{
			mode: 'edit',
			record: null,
			tipe: null,
			callback: Ext.emptyFn,
			scope: this
		});

		var $this = this,
			$app = this.getApplication(),
			$helper = $app.Helper(),
			view = null;

		switch(config.mode)
		{
			case 'edit' :

				view = $this.createView( (function(c){
					c.removeComponents = [];
					c.removeComponents.push();
					return c;
				})(config) );

				view.show();
				break;

			default:
				var message = $this.getMessage('invalidMode');
				Ext.Msg.alert(message[0], message[1]);
		}
	},

	onMainview_Show: function(view){
		var $this = this,
			$app = $this.getApplication(),
			$session = $app.getSession(),
			form = $this.getForm({root:view}),
			listPenerima = $this.getGrid({root:view}),
			$helper = $this.getApplication().Helper(),
			record = view.record || $this.getModel($this.defaultModel || $this.models[0]).create({});

		listPenerima.getStore().removeAll();
		if(record){
			$this.getForm({root:view}).loadRecord(record);
		}
	},

	onButtonAdd_Click: function(button, e, eOpts){
		console.log('tambah penerima');
        var $this = this,
            checkSession = $this.getApplication().getSession().getResetSession(),
            $helper = $this.getApplication().Helper(),
            view = $this.getMainview({from:button}),
            listPenerima = $this.getGrid({root:view}),
            storePenerima = listPenerima.getStore($this.storePenerima),
            controllerLookup = $this.getController($this.controllerLookupPenerima);

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var find = storePenerima.findRecord('staf_id', selections[i].data.staf_id);
                    if(!find){
                        storePenerima.add(selections[i].data);
                    }else{
                        $helper.showMsg({message:this.getMessage('receiver_exist', {id: selections[i].data.staf_nama})});
                    }
                }
            }
        })
    },

	onButtonSend_Click: function(button, e, eOpts){
		var $this = this,
			$helper = $this.getApplication().Helper(),
			checkSession = this.getApplication().getSession().getResetSession(),
			mainview = $this.getMainview({from:button}),
			record = mainview.record,
			model = record.get('surat_model'),
			grid = $this.getGrid({root:mainview}),
			store = grid.getStore(),
			url = '',
			params = {
				'user[]':[],
				't[]': [], //tembusan
        // 'b[]': [], //berkas
        'surat': null
			};

		mainview.setLoading(true);

		if(model == 6) {
			url = $this.getApi('createImasukKeputusan')
		} else {
			url = $this.getApi('createImasuk')
		}

		store.each(function(r){
			params['user[]'].push(r.get('staf_id'));
			params['t[]'].push(r.get('surat_stack_istembusan'));
      // params['b[]'].push(r.get('surat_stack_isberkas'));
		});
		
		params['surat'] = record.getId();

        if(!params['user[]'].length){
            $helper.showMsg({success:false, message:$this.getMessage('receiver_empty')});
            mainview.setLoading(false);
            return;
        }

        $helper.showConfirm({
            confirmTitle: 'Konfirmasi Kirim Ulang',
            confirmText : 'Apakah anda yakin mengirim ulang surat ?',
            callback: function(button){
                if(button == 'yes'){
                    Ext.Ajax.request({
			            url: url,
			            params: params,
			            success: function(response, options){
			                var objres = Ext.decode(response.responseText, true) || {},
			                	message = $this.getMessage('resend_success');

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
	}
});