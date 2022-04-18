Ext.define('SIPAS.controller.Sipas.internal.keluar.agenda.Popup', {
	extend: 'SIPAS.controller.Sipas.base.Base',

	views: [
		'Sipas.internal.keluar.agenda.Popup'
	],

	stores: [
		'Sipas.internal.keluar.agenda.Popup'
	],

	// models: [
	// 	'Sipas.surat.Stack'
	// ],

	refs : [
		{ ref: 'mainview',          	selector: 'sipas_internal_keluar_agenda_popup' },
		{ ref: 'form',              	selector: 'sipas_internal_keluar_agenda_popup form#formSurat' },
		{ ref: 'grid',              	selector: 'sipas_internal_keluar_agenda_popup form#formSurat grid' }
	],

	defaultModel: 'Sipas.surat.StackPenyetuju',

	controllerAgendaPopup 		: 'Sipas.internal.keluar.agenda.Prop',

	viewViewer: 'Sipas.Viewer',

	init: function(application){
		this.control({
			"sipas_internal_keluar_agenda_popup": {
				show : this.onMainview_Show
			},
			"sipas_internal_keluar_agenda_popup sipas_com_button_view": {
				click: this.onButtonViewSurat_Click
			},
			"sipas_internal_keluar_agenda_popup sipas_internal_keluar_agenda_penyetujuan": {
				loadassociate: this.onPenyetuju_LoadAssociate
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
			view = null;

		switch(config.mode)
		{
			case 'view' :
			case 'edit' :

				view = $this.createView( (function(c){
					c.removeComponents = ['#btnMore'];
					c.removeComponents.push(
							'[name=surat_pengirim]',
							'sipas_surat_penyetuju_list button'
						)
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
			$app = this.getApplication(),
			$session = $app.getSession(),
			form = $this.getForm({root:view}),
			$helper = $this.getApplication().Helper(),
			record = view.record || this.getModel(this.defaultModel || this.models[0]).create({});
		if(record){
			$this.getForm({root:view}).loadRecord(record);
		}
	},

    onButtonViewSurat_Click: function(button, e, eOpts) {
        var $this = this,
            view = $this.getMainview({from:button}),
            form = $this.getForm({root:view}),
            record = form.getRecord(),
            controllerAgendaPopup = $this.getController($this.controllerAgendaPopup);

        record.getSurat(function(surat){
        	surat.getInternal(function(internal){
        		controllerAgendaPopup.launch({
		            mode: 'view',
		            record: record,
		            callback: function(){
		            	// view.close();
		            }
		        });
        	})
        });
    },

    onPenyetuju_LoadAssociate: function(record, form, cmp){
		var $this = this,
			mainview = $this.getMainview({from:cmp}),
            storePenyetuju = cmp.getStore();

        storePenyetuju.removeAll();
        record.getSurat(function(surat){
            if(surat){
                var store = surat.fetchStackPenyetuju();
                store.load(function(){
                    store.each(function(record){
                    	storePenyetuju.add(record);
                    });
                });
            }
        });  
    }
});