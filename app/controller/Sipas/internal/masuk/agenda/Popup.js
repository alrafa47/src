Ext.define('SIPAS.controller.Sipas.internal.masuk.agenda.Popup', {
	extend: 'SIPAS.controller.Sipas.base.Base',

	controllers: [
		'Sipas.surat.penerima.List',
		'Sipas.surat.penyetuju.List'
	],

	views: [
		'Sipas.internal.masuk.agenda.Popup'
	],

	models: [
		'Sipas.Surat'
	],

	stores: [
		'Sipas.surat.penerima.List',
		'Sipas.surat.penyetuju.List'
	],

	messages: {
		receiver_empty: 		'Penerima surat tidak boleh kosong',
		invalidMode: 			['Error', 'Mode tidak sesuai'],
		receiver_empty: 		'Penerima surat tidak boleh kosong',
		approver_empty: 		'Penyetuju surat tidak boleh kosong',
    receiver_exist: 		['Info','Staf dengan nama {id} sudah masuk dalam daftar'],
		approver_exist: 		'Penyetuju surat sudah ada',
		korespondensi_empty: 	'Korespondensi Kosong'
	},

	refs : [
		{ ref: 'mainview', 			selector: 'sipas_internal_masuk_agenda_popup' },
		{ ref: 'form', 				selector: 'sipas_internal_masuk_agenda_popup > form' },
		{ ref: 'cmpUrut', 			selector: 'sipas_internal_masuk_agenda_popup > form sipas_surat_penyetuju_list [name=surat_stack_penyetuju_urut]' }
	],

	storePenerima: 'Sipas.surat.penerima.List',
	storePenyetuju: 'Sipas.surat.penyetuju.List',

	controllerLookupPenerima: 'Sipas.staf.penerima.Lookup',


	init: function(application){
		this.control({
			'sipas_internal_masuk_agenda_popup': {
				show: this.onMainview_Show
			},
			'sipas_internal_masuk_agenda_popup sipas_surat_penerima_list sipas_com_button_add': {
                click: this.onButtonAdd_Click
            },
			'sipas_internal_masuk_agenda_popup sipas_surat_penerima_list':{
				loadassociate: this.onPenerima_LoadAssociate
			},
			'sipas_internal_masuk_agenda_popup sipas_surat_penyetuju_list':{
				loadassociate: this.onPenyetuju_LoadAssociate
			}
		});
	},

	launch: function(config){
		config = Ext.applyIf(config,{
			mode: 'view',
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
			case 'add' :
			case 'edit' :
			case 'view' :
			case 'edit_template' :
			case 'ubah' :

				view = $this.createView( (function(c){
					c.requireComponents = [];
					c.removeComponents = [];
					c.readonlyComponents = [];

					if(c.mode === 'view'){
						c.removeComponents.push(
							'#buttonApplyData',
							'sipas_surat_penerima_list button',
							'sipas_surat_penyetuju_list button',
							'sipas_koreksi_stack_list sipas_com_button_add',
							'sipas_koreksi_stack_list sipas_com_button_delete',
							'#columnMoveUp','#columnMoveDown', '#columnDelete','sipas_com_button_delete'
						);
					}

					return c;
				})(config) );

				view.on({
                    close: function (viewCmp) {
                        var form = this.getForm({root:viewCmp}),
                            record = form.getRecord();

                        record && record.reject();
                    },
                    scope: $this
                });
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
			$session = $app.getSession(),
			$helper = $app.Helper(),
			record = mainview.record || this.getModel(this.defaultModel || this.models[0]).create({
				surat_ikeluar_unitpengirim: mainview.unit || $app.getSession().getProfile().unit_id,
				surat_ikeluar_tipe: mainview.tipe || ''
			}),
			profile = $session.getProfile(),
			form = $this.getForm({root:mainview}),
			cmpUrut = $this.getCmpUrut({root:mainview});

		/*clear penerima and penyetuju*/
		var storePenerima = $this.getStore($this.storePenerima);
			storePenerima.removeAll();
		var storePenyetuju = $this.getStore($this.storePenyetuju);
			storePenyetuju.removeAll();

		record.getSurat(function(surat){
			form.loadRecord(record);
		})
	},

	onButtonAdd_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            storePenerima = $this.getStore($this.storePenerima),
            controllerLookup = $this.getController($this.controllerLookupPenerima);

        controllerLookup.launch({
            multiselect: true,
            callback:function(selections){
                for(var i in selections){
                    var find = storePenerima.findRecord('staf_id', selections[i].data.staf_id);
                    if(!find){
                        storePenerima.add(selections[i].data);
                    }else{
                        var msg = $this.getMessage('receiver_exits',{id: selections[i].data.staf_id});
                        $helper.showNotification(msg[0],msg[1]);
                    }
                }
            }
        })
    },

	onPenerima_LoadAssociate: function(record, form, cmp){
		var $this = this,
            storePenerima = cmp.getStore();

        storePenerima.removeAll();
        record.getSurat(function(surat){
            if(surat){
                var store = surat.fetchStackPenerima();
                store.load(function(){
                	window.store = store;
                    store.each(function(record){
                    	storePenerima.add(record);
                    });
                });
            }
        });       
    },

    onPenyetuju_LoadAssociate: function(record, form, cmp){
		var $this = this,
			mainview = $this.getMainview({from:cmp}),
            cmpUrut = $this.getCmpUrut({root:mainview}),
            storePenyetuju = cmp.getStore();

        storePenyetuju.removeAll();
        record.getSurat(function(surat){
            if(surat){
                var store = surat.fetchStackPenyetuju();
                store.load(function(){
                    store.each(function(record){
                    	storePenyetuju.addSorted(record);
                    	if(record.get('surat_stack_penyetuju_urut')){
                    		cmpUrut.setValue(record.get('surat_stack_penyetuju_urut'));
                    	}
                    });
                });
            }
        });  
    }
});