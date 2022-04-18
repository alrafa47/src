Ext.define('SIPAS.controller.Sipas.staf.tim.Popup', {
    extend: 'SIPAS.controller.Sipas.base.Prop',

    controllers:[
        'Sipas.staf.tim.Form'
    ],

    models: [
    	'Sipas.staf.tim.Anggota'
    ],

    views: [
        'Sipas.staf.tim.Popup'
    ],

    refs:[
        { ref: 'mainview',  selector: 'sipas_staf_tim_popup' },
        { ref: 'form',      selector: 'sipas_staf_tim_popup form' },
        { ref: 'comboKel',  selector: 'sipas_staf_tim_popup form #comboKelompok' },
        { ref: 'cmpNama',	selector: 'sipas_staf_tim_popup form [name=anggota_nama]' },
        { ref: 'cmpJab',	selector: 'sipas_staf_tim_popup form [name=anggota_jabatan_nama]' },
        { ref: 'cmpUnit',	selector: 'sipas_staf_tim_popup form [name=anggota_unit_nama]' },
        { ref: 'listKel',	selector: 'sipas_staf_tim_popup #listKelompok' }
    ],

    messages: {
        'message_success': ['Berhasil',' Data berhasil diperbarui'],
        'group_exits': ['Info','Kelompok {tim_nama} sudah masuk dalam daftar']
    },

    api: {
        'create' : 'server.php/sipas/staf_tim_anggota/create'
    },

    storeAnggotaTim: 'Sipas.staf.tim.anggota.tim.List',

    init: function(application) {
        this.control({
            'sipas_staf_tim_popup': {
                show: this.onMainview_Show,
                loadKelompok: this.onListKelompok_Load
            },
            'sipas_staf_tim_popup sipas_com_button_save': {
                click: this.onButtonSave_Click
            },
            'sipas_staf_tim_popup #comboKelompok': {
                select: this.onComboKelompok_Select
            },
            'sipas_staf_tim_popup #listKelompok': {
                removerecord: this.onMainview_ActionRemoveRecord
            }
        })
    },

    launch: function(config)
    {
        config = Ext.apply({
            mode: 'add',
            record: null,
            callback: Ext.emptyFn
        },config);
        
        var $this = this,
            $helper = this.getApplication().Helper(),
            record = this.createRecord(config.record),
            view = null;
            
        switch(config.mode)
        {
            case 'add' :
                view = $this.createView((function(c){
                    c.removeComponents = [];
                    c.readonlyComponents = [];
                    c.requireComponents = [];
                    c.removeComponents = [];
                    
                    return c;
                })(config));
                view.show();
                break;
            
            default:
                var message = $this.getMessage('invalidMode');
                Ext.Msg.alert(message[0], message[1]);
        }
    },

    onMainview_Show: function(mainview){
        var $this = this,
        	form = $this.getForm({root:mainview}),
        	cmpNama = $this.getCmpNama({root:mainview}),
        	cmpJab = $this.getCmpJab({root:mainview}),
        	cmpUnit = $this.getCmpUnit({root:mainview}),
            record = mainview.record;

        if(!form) return;
    	mainview.fireEvent('loadKelompok', mainview);
        
        form.loadRecord(record);
    },

    onComboKelompok_Select: function(combo, selection, eOpts){
    	var $this = this,
    		mainview = $this.getMainview({from:combo}),
    		record = mainview.record,
    		listKelompok = $this.getListKel({root:mainview}),
    		select = selection && selection[0],
    		store = listKelompok.getStore(),
    		exist = store.findRecord('staf_tim_anggota_tim', select.getId()),
    		msg = $this.getMessage('group_exits',{tim_nama: select.get('staf_tim_nama')});

    	if(exist) $helper.showNotification(msg[0],msg[1]);
    	else
    	{
            store.add({
                'staf_tim_anggota_staf' : record.getId(),
                'staf_tim_anggota_tim'	: select.getId(),
                'staf_tim_nama'			: select.get('staf_tim_nama')
            });
    	}
    },

	onListKelompok_Load: function(mainview){
		var $this = this,
			record = mainview.record,
			stafId = record.getId(),
			listKelompok = $this.getListKel({root:mainview}),
			store = listKelompok.getStore(),
			proxy = store.getProxy();

		store.removeAll();
		store.removeFilter();
		proxy.url = 'server.php/sipas/staf_tim_anggota/readKelompok?id='+stafId;
		store.reload();
	},

    onMainview_ActionRemoveRecord: function(view, rowIdx, colIdx, item, e, record, row){
        view.getStore().remove(record);
    },

    onButtonSave_Click: function(button, e, eOpts){
        var $this = this,
            $helper = $this.getApplication().Helper(),
            checkSession = $this.getApplication().getSession().getResetSession(),
            mainview = $this.getMainview({from:button}),
            grid = $this.getListKel({root:mainview}),
            record = mainview.record,
            store = grid.getStore(),
            items = store.data.items,
            message_success = $this.getMessage('message_success'),
            tim = [];

        if(!store.getModifiedRecords().length && !store.getRemovedRecords().length) return;

        grid.setLoading(true);
        $helper.showConfirm({
            confirmTitle: 'Simpan Perubahan',
            confirmText : 'Apakah anda yakin ?',
            callback: function(button){
                if(button == 'yes'){
                    store.sync({
                        callback: function(success, response){
                            var record = Ext.decode(response.responseText, true);
                                Ext.callback(mainview.callback, mainview, [success, record, eOpts]);
                                store.reload();
                                grid.setLoading(false);
                                mainview.close();
                        },
                        success: function(){
                            grid.setLoading(false);
                            $helper.showMessage({success: true, message: message_success});
                        }
                    });
                } else {
                    grid.setLoading(false);
                }
            }
        });
    }

});